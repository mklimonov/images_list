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
        
    function paint(){
        /*if (document.images[0]){
            if (document.images[0].src){
                //ctx.drawImage(document.images[0], 0, 0);
                loadImage(document.images[0].src);
            }
        }
        
        $('.imagedata').css({'display' : 'none'});
        */
       
        //var sketch = document.querySelector('#sketch');
        //var sketch_style = getComputedStyle(sketch);
        //canvas.width = parseInt(sketch_style.getPropertyValue('width'));
        //canvas.height = parseInt(sketch_style.getPropertyValue('height'));

        var mouse = {x: 0, y: 0};

        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
            
            //var imageData = ctx.getImageData(mouse.x, mouse.y, 1, 1);
            //ctx.putImageData(imageData, mouse.x, mouse.y);
        }, false);

        /* Drawing on Paint App */
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
    }
    
    paint();
    
    $('#download').click(function(){
        window.open(canvas.toDataURL("image/png"));
    });
    
    $('#save').click(function(){
        $( "#secure" ).dialog( "open" );
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
                        /*$('.tools').append('<p>Image Saved.</p>');
                        $('#pass').val('');*/
                    }
                },
                error : function(data, status){
                    updateStatus('Error. Image has not been saved.');
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
    
})