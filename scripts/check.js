$(function(){
    
    var password = $( "#password" );
    var tips = $( ".validateTips" );
    var buttonElementId;
    var id;
    
    $(':button').click(function() {
        buttonElementId = $(this).attr('id');
        id = $(this).siblings('input');
        $( "#secure" ).dialog( "open" );
    });
    
    /*$('#edit').click(function(){
        $( "#secure" ).dialog( "open" );
    });
    
    $('#del').click(function(){
        $( "#secure" ).dialog( "open" );
    });*/
    
    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }
    
    function checkLength( o, n, min, max ) {
        if ( o.val().length > max || o.val().length < min ) {
            o.addClass( "ui-state-error" );
            updateTips( "Length of " + n + " must be between " +
                min + " and " + max + "." );
            return false;
        } else {
            return true;
        }
    }
    
    function checkRegexp( o, regexp, n ) {
        if ( !( regexp.test( o.val() ) ) ) {
            o.addClass( "ui-state-error" );
            updateTips( n );
            return false;
        } else {
            return true;
        }
    }
    
    $( "#secure" ).dialog({
            autoOpen: false,
            resizable: false,
            width: 500,
            height:220,
            modal: false,
                buttons: {
                    Save: function() {
                        var bValid = true;
                        bValid = bValid && checkLength( password, "password", 5, 16 );
                        bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
                        if (bValid){
                            if (buttonElementId == 'edit'){
                                edit();
                            }
                            if (buttonElementId == 'del'){
                                del();
                            }
                            $( this ).dialog( "close" );
                        }
                    },
                    Cancel: function() {
                        $( this ).dialog( "close" );
                    }
                }
     });
         
   function edit(){
            $.ajax({
                url  : '/paint/edit',
                type : 'POST',
                data : {
                    id: id.val(),
                    password : MD5( password.val() )//MD5($('#pass').val())
                },
                complete : function(data, status){
                    if (status == 'success'){
                        $('.tools').append('<p>Image Saved.</p>');
                        $('#pass').val('');
                    }
                },
                error : function(data, status){
                    $('.tools').append('<p>Error. Image not saved.</p>')
                }
        });
    }      
    
    function del(){
            $.ajax({
                url  : '/paint/del',
                type : 'POST',
                data : {
                    id: id.val(),
                    password : MD5( password.val() )//MD5($('#pass').val())
                },
                complete : function(data, status){
                    if (status == 'success'){
                        $('.tools').append('<p>Image Saved.</p>');
                        $('#pass').val('');
                    }
                },
                error : function(data, status){
                    $('.tools').append('<p>Error. Image not saved.</p>')
                }
        });
    }    
})