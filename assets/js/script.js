$(document).ready(function() {
    var oldData = localStorage.getItem('childs_data');
    var vaccinationData = [];
    var recordByRecord = {};
    for(var i = 1; i <=10; i++){
        recordByRecord.name = 'Vac '+i;
        recordByRecord.date = '02-09-2017';
        vaccinationData.push(recordByRecord);
    }
    localStorage.setItem('vacData',JSON.stringify(vaccinationData));
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
                            <td>`+value.child_name+`</td>
                            <td>`+value.child_birth+`</td>
                        </tr>`
                ;
                index++;
            });
            $('.data-table tbody').html(html);
        }
    }
});