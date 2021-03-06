$(function(){
    
    var password = $( "#password" );
    var tips = $( ".validateTips" );
    var status = $( ".status" );
    var buttonElementId;
    var id;
    
    $(':button').click(function() {
        buttonElementId = $(this).attr('id');
        id = $(this).siblings('input');
        password.val('');
        $( "#secure" ).dialog( "open" );
    });
    
    /*$('#edit').click(function(){
        $( "#secure" ).dialog( "open" );
    });
    
    $('#del').click(function(){
        $( "#secure" ).dialog( "open" );
    });*/
    
    /*
     * Update message for user
     * @param string t
     */
   function updateStatus( t ) {
        status
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }
    
    /*
     * Update message for user
     * @param string t
     */
    function updateTips( t ) {
        tips
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }
    
    /*
     * Checking password length
     * @param string o
     * @param string n
     * @param int min
     * @param int max
     * @returns true - if the password is correct length else false
     */
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
    
    /*
     * Searches 0 for a match to the regular expression given in regexp. 
     * @param string o
     * @param string regexp
     * @param string n
     * @returns true - if the password is correct length else false
     */
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
            height:225,
            modal: false,
                buttons: {
                    Ok: function() {
                        var bValid = true;
                        bValid = bValid && checkLength( password, "password", 5, 16 );
                        bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
                        if (bValid){
                            if (buttonElementId == 'edit'){
                                check_pass();
                                //edit();
                            }
                            if (buttonElementId == 'del'){
                                del();
                            }
                            //$( this ).dialog( "close" );
                        }
                    },
                    Cancel: function() {
                        $( this ).dialog( "close" );
                    }
                }
     });
     
    $( "#stat_mes" ).dialog({
        autoOpen: false,
        resizable: false,
        width: 500,
        height:225,
        modal: false,
            buttons: {
                Ok: function() {
                    $( this ).dialog( "close" );
                }
            }
    });
    
    function check_pass(){
        $.ajax({
            url  : '/paint/check_pass',
            type : 'POST',
            data : {
                id: id.val(),
                password : MD5( password.val() )//MD5($('#pass').val())
            },
            complete : function(data, status){
                if ((status == 'success') && (data.responseText == 'true')){
                    edit();
                }
                else{
                    updateStatus(data.responseText);
                    $( "#secure" ).dialog("close");
                    $( "#stat_mes" ).dialog( "open" ); 
                }
            },
            error : function(data, status){
                updateStatus('Error. Image has not been removed');
                $( "#secure" ).dialog("close");
                $( "#stat_mes" ).dialog( "open" );
                //$('.tools').append('<p>Error. Image not saved.</p>')
            }
    });
    }    
    
   function edit(){
       //$().redirect('paint/edit', {'id': id.val(), 'password': MD5( password.val() )});
       $().redirect('paint/edit', {'id': id.val()});
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
                if ((status == 'success') && (data.responseText)){
                    //updateStatus('Image removed');
                    updateStatus(data.responseText);
                    setTimeout("document.location.href='/'", 1500);
                    $( "#secure" ).dialog("close");
                    $( "#stat_mes" ).dialog( "open" );
                }
            },
            error : function(data, status){
                updateStatus('Error. Image has not been removed');
                $( "#stat_mes" ).dialog( "open" );
                //$('.tools').append('<p>Error. Image not saved.</p>')
            }
    });
    }    
})