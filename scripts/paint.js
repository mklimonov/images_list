$(function(){
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');
    var bMouseDown = false;

    /*
     * 
     * Drawing function
     */
    function paint(){
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
        };

        if (document.querySelector('#image')){
            image.src = document.querySelector('#image').src;
        }

        $('#paint').mousedown(function(e) { // mouse down handler
            bMouseDown = true;
        });
        $('#paint').mouseup(function(e) { // mouse up handler
            bMouseDown = false;
        });
        $('#paint').mousemove(function(e) { // mouse move handler
            if (bMouseDown) {
                var canvasOffset = $(canvas).offset();
                var canvasX = Math.floor(e.pageX - canvasOffset.left);
                var canvasY = Math.floor(e.pageY - canvasOffset.top);

                var imageData = ctx.getImageData(canvasX, canvasY, 1, 1);
                var pixel = imageData.data;
                pixel[0] = 0;     // Red       
                pixel[1] = 0;   // Green       
                pixel[2] = 0;   // Blue       
                pixel[3] = 255; // Alpha channel  

                ctx.putImageData(imageData, canvasX, canvasY); 
            }
        });
    }

    paint();

    $('#download').click(function(){
        //window.open(canvas.toDataURL("image/png"));
        window.open(canvas.toDataURL());
    });

    $('#save').click(function(){
        $( "#secure" ).dialog( "open" );
    });

    $('#update').click(function(){
        update();
    });

    var password = $( "#password" );
    var tips = $( ".validateTips" );
    var status = $( ".status" );
    
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
                    Save: function() {
                        var bValid = true;
                        bValid = bValid && checkLength( password, "password", 5, 16 );
                        bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
                        if (bValid){
                            save();
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


    function save(){
            $.ajax({
                url  : '/paint/save',
                type : 'POST',
                data : {
                    data : canvas.toDataURL("image/png"),
                    password : MD5( password.val() )
                },
                complete : function(data, status){
                    if ((status == 'success') && (data.responseText)){
                        updateStatus(data.responseText);
                        setTimeout("document.location.href='/'", 1500);
                        $( "#secure" ).dialog("close");
                        $( "#stat_mes" ).dialog( "open" );
                    }
                    /*if (status == 'success'){
                        updateStatus('Image Saved');
                        $( "#stat_mes" ).dialog( "open" );
                        setTimeout("document.location.href='/'", 1500);
                    }*/
                },
                error : function(data, status){
                    updateStatus('Error. Image has not been saved. Wait and try again.');
                    $( "#stat_mes" ).dialog( "open" );
                }
        });
    }

    function update(){
            $.ajax({
                url  : '/paint/update',
                type : 'POST',
                data : {
                    data : canvas.toDataURL(),
                    name: document.querySelector('#image').src
                    //password : MD5( password.val() )//MD5($('#pass').val())

                },
                complete : function(data, status){
                    if ((status == 'success') && (data.responseText)){
                        updateStatus(data.responseText);
                        setTimeout("document.location.href='/'", 1500);
                        $( "#stat_mes" ).dialog( "open" );
                    }
                    /*if (status == 'success'){
                        updateStatus('Image Updated');
                        $( "#stat_mes" ).dialog( "open" );
                        setTimeout("document.location.href='/'", 1500);
                    }*/
                },
                error : function(data, status){
                    updateStatus('Error. Image has not been updated. Wait and try again.');
                    $( "#stat_mes" ).dialog( "open" );
                }
        });
    }    
});