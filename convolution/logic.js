
var start = function() {
    
    var im = document.getElementById('image');
    var fi = document.getElementById('filter');

    im.onclick = function(e) {
        fi.style.left = e.clientX+"px";
        fi.style.top = e.clientY+"px";
    };
    
};
start();
