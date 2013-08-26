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
    
    function loadImage(dataURL) {
        //var canvas = document.getElementById('#paint');
        //var context = canvas.getContext('2d');

        // load image from data url
        var img = new Image();
        img.onload = function() {
          ctx.drawImage(this, 0, 0);
        };

        img.src = dataURL;
    }
        
    function init(){
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
 
        //$('#paint').sketch();
    }
    
    init();
    
    $('.download').click(function(){
        window.open(canvas.toDataURL("image/png"));
    });
    
    $('.save').click(function(){
        $.ajax({
            url  : '/paint/save',
            type : 'POST',
            data : {data : canvas.toDataURL("image/png")},
            complete : function(data, status){
                if (status == 'success'){
                    alert('Saved');
                }
            },
            error : function(data, status){
                alert('Error');
            }
        });
    });
    
})