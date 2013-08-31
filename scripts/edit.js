$(function(){    
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');
    var bMouseDown = false;
        
    function edit_image(){
    // drawing active image
        var image = new Image();
        image.onload = function () {
            ctx.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
        }
        image.src = document.querySelector('#image').src;

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
                pixel[0] = 30;     // Red       
                pixel[1] = 0;   // Green       
                pixel[2] = 230;   // Blue       
                pixel[3] = 255; // Alpha channel  
                
                ctx.putImageData(imageData, canvasX, canvasY); 
            }
        });
    }
    
    edit_image();
    
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
                        save();
                        $( this ).dialog( "close" );
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
        height:220,
        modal: false,
            buttons: {
                Ok: function() {
                    $( this ).dialog( "close" );
                }
            }
    });

    $('#save').click(function(){
        $( "#secure" ).dialog( "open" );
    });
    
    $('#download').click(function(){
        window.open(canvas.toDataURL());
    });
});