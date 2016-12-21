

var start = function() {
    
    var data = rawConvData.values;
    var dataMin = rawConvData.min;
    var dataMax = rawConvData.max;
    
    var im = document.getElementById('image');
    var fi = document.getElementById('filter');
    var tx = document.getElementById('lastvalue');

    var showValue = function(x, y, cx, cy) {
        tx.textContent = data[y][x].toFixed(2);
        tx.style.left = cx+"px";
        tx.style.top = (cy-20)+"px";
    };

    var onMove = function(e) {
        var x = e.clientX - fi.width/2;
        var y = e.clientY - fi.height/2;
        fi.style.left = x+"px";
        fi.style.top = y+"px";
        showValue(e.clientX, e.clientY, x, y);
    };
    
    im.addEventListener('mousemove', onMove);
    fi.addEventListener('mousemove', onMove);
    tx.addEventListener('mousemove', onMove);
    
};
start();
