/*$(function(){
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');

    var sketch = document.querySelector('#sketch');
    var sketch_style = getComputedStyle(sketch);
    canvas.width = parseInt(sketch_style.getPropertyValue('width'));
    canvas.height = parseInt(sketch_style.getPropertyValue('height'));

    var mouse = {x: 0, y: 0};

    /* Mouse Capturing Work /
    canvas.addEventListener('mousemove', function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
    }, false);

    /* Drawing on Paint App /
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'blue';

    canvas.addEventListener('mousedown', function(e) {
        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
        canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    var onPaint = function() {
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
    };
})*/



$(function(){
    var canvas = document.querySelector('#paint');
    var ctx = canvas.getContext('2d');
    var bMouseDown = false;
    
  /*  function loadImage(dataURL) {
        //var canvas = document.getElementById('#paint');
        //var context = canvas.getContext('2d');

        // load image from data url
        var img = new Image();
        img.onload = function() {
          ctx.drawImage(this, 0, 0);
        };

        img.src = dataURL;
    }*/
        
/*    function paint(){
       var mouse = {x: 0, y: 0};

        /* Mouse Capturing Work ///
        canvas.addEventListener('mousemove', function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            
            //var imageData = ctx.getImageData(mouse.x, mouse.y, 1, 1);
            //ctx.putImageData(imageData, mouse.x, mouse.y);
        }, false);

        /* Drawing on Paint App ///
        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'blue';

        canvas.addEventListener('mousedown', function(e) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);

        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);

        var onPaint = function() {
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };
    }*/
    
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
                pixel[0] = 30;     // Red       
                pixel[1] = 0;   // Green       
                pixel[2] = 230;   // Blue       
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
    
    function updateStatus( t ) {
        status
            .text( t )
            .addClass( "ui-state-highlight" );
        setTimeout(function() {
            tips.removeClass( "ui-state-highlight", 1500 );
        }, 500 );
    }
    
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
    
    
    function save(){
            $.ajax({
                url  : '/paint/save',
                type : 'POST',
                data : {
                    data : canvas.toDataURL("image/png"),
                    password : MD5( password.val() )//MD5($('#pass').val())
                },
                complete : function(data, status){
                    if (status == 'success'){
                        updateStatus('Image Saved');
                        $( "#stat_mes" ).dialog( "open" );
                        setTimeout("document.location.href='/'", 1500);
                        //window.location = '/paint';
                        /*$('.tools').append('<p>Image Saved.</p>');
                        $('#pass').val('');*/
                    }
                },
                error : function(data, status){
                    updateStatus('Error. Image has not been saved. Wait and try again.');
                    $( "#stat_mes" ).dialog( "open" );
                    //$('.tools').append('<p>Error. Image not saved.</p>');
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
                    if (status == 'success'){
                        updateStatus('Image Updated');
                        $( "#stat_mes" ).dialog( "open" );
                        setTimeout("document.location.href='/'", 1500);

                        //window.location = '/paint';
                        /*$('.tools').append('<p>Image Saved.</p>');
                        $('#pass').val('');*/
                    }
                },
                error : function(data, status){
                    updateStatus('Error. Image has not been updated. Wait and try again.');
                    $( "#stat_mes" ).dialog( "open" );
                    //$('.tools').append('<p>Error. Image not saved.</p>');
                }
        });
    }
    /*
    $('.save').click(function(){
        if ($('#pass').val().length >= 6){
            $.ajax({
                url  : '/paint/save',
                type : 'POST',
                data : {
                    data : canvas.toDataURL("image/png"),
                    password : MD5($('#pass').val())
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
        else{
            $('.tools').append('<p>Set the password and click Save button</p>');
        }
    });*/
    
});