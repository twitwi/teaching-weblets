
var data = rawConvData.values;

var start = function() {
    
    var im = document.getElementById('image');
    var fi = document.getElementById('filter');
    var tx = document.getElementById('lastvalue');

    var showValue = function(x, y) {
        tx.textContent = data[y][x];
    };
    

    var onMove = function(e) {
        fi.style.left = (e.clientX-fi.width/2)+"px";
        fi.style.top = (e.clientY-fi.height/2)+"px";
        showValue(e.clientX, e.clientY);
    };
    im.addEventListener('mousemove', onMove);
    fi.addEventListener('mousemove', onMove);
    
};
start();
