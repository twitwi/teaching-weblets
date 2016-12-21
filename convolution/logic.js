
var start = function() {
    
    var im = document.getElementById('image');
    var fi = document.getElementById('filter');

    im.onclick = function(e) {
        fi.style.left = (e.clientX-fi.width/2)+"px";
        fi.style.top = (e.clientY-fi.height/2)+"px";
    };
    fi.onclick = im.onclick;
    
};
start();
