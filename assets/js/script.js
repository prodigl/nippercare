$(document).ready(function() {
    var oldData = localStorage.getItem('childs_data');
    /*var vaccinationData = [];
    var recordByRecord = {};
    for(var i = 1; i <=10; i++){
        recordByRecord.name = 'Vac '+i;
        recordByRecord.date = '02-09-2017';
        vaccinationData.push(recordByRecord);
    }*/
    function checkForVac(){
        var childsForVac = [];
        var vacData = localStorage.getItem('vacData');
        if(oldData != null && vacData != null){
            var vacData = JSON.parse(vacData);
            var childsData = JSON.parse(oldData);
            var childsForVac = [];
            $.each(childsData, function(key,value){

                $.each(vacData,function(vKey,vValue){
                    var date1 = new Date(value.child_birth);
                    var date2 = new Date(vValue.date);
                    var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
                    console.log(diffDays);
                    if(diffDays <= 10){
                        var childAncvac = {};
                        childAncvac.child = value.child_name;
                        childAncvac.vac = vValue.name;
                        childsForVac.push(childAncvac);
                    }
                });
            });
        }

        if(childsForVac.length != 0){
            setTimeout(function(){
                $.each(childsForVac, function(key,val){
                    $('.data-table tbody tr').each(function(){
                        if($(this).find('.ch-name').text() == val.child){
                            $(this).addClass('bg-red').css('background-color','#ef9a9a').attr('title',val.vac+' is comming!');
                        }
                    })
                });
            },500)
        }
    }

    // localStorage.setItem('vacData',JSON.stringify(vaccinationData));
    var hideElem = '';
    drawTable();
    $('.save-child').click(function(){
        if($('.child-name').val().trim() != '' && $('.child-birth').val().trim() != ''){

            var oldData = localStorage.getItem('childs_data');
            if(oldData != null){
                oldData = JSON.parse(oldData);
                var childData = oldData;
                var childName = $('.child-name').val().trim();
                var childDob = $('.child-birth').val().trim();
                childData.push({child_name: childName, child_birth: childDob});
                localStorage.setItem('childs_data',JSON.stringify(childData));
                hideElem.delay(500).fadeIn(500);
                $('#modal').slideUp(300);
                drawTable();
                $('.child-name').val('');
                $('.child-birth').val('');
                alert('Child Addedd Successfully!');
            }else{
                var childData = [];
                var childName = $('.child-name').val().trim();
                var childDob = $('.child-birth').val().trim();
                childData.push({child_name: childName, child_birth: childDob});
                localStorage.setItem('childs_data',JSON.stringify(childData));
                hideElem.delay(500).fadeIn(500);
                $('#modal').slideUp(300);
                drawTable();
                $('.child-name').val('');
                $('.child-birth').val('');
                alert('Child Addedd Successfully!');
            }
        }else{
            if($('.child-name').val().trim() == ''){
                $('.child-name').css('border','1px solid red');
            }
            if($('.child-birth').val().trim() == ''){

                $('.child-birth').css('border','1px solid red');
            }
            
            alert('Please fill required fields!');
        }
    });
    $('.child-name').on('focus', function(){
        $(this).css('border','1px solid #e8e8e8'); 
    });
    $('.child-birth').on('focus', function(){
        $(this).css('border','1px solid #e8e8e8'); 
    });
    
    $('.modal-trigger').click(function(){
        console.log('here');
        $('#modal').slideDown(300);
        hideElem = $(this);
        hideElem.hide();
    });
    
    $('.close-dialog').click(function(){
        hideElem.delay(500).fadeIn(500);
        $('#modal').slideUp(300);
    });

    function drawTable(){
        var html = '';
        var childData = localStorage.getItem('childs_data');
        if(childData != null){
            childData = JSON.parse(childData);
            var index = 1;
            $.each(childData, function(key,value){
                html += `
                        <tr>
                            <td>`+index+`</td>
                            <td class="ch-name">`+value.child_name+`</td>
                            <td>`+value.child_birth+`</td>
                        </tr>`
                ;
                index++;
            });
            $('.data-table tbody').html(html);
        }
        checkForVac();
    }
});