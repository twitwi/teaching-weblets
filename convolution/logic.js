

var start = function() {
    
    var data = rawConvData.values;
    var dataMin = rawConvData.min;
    var dataMax = rawConvData.max;
    
    var im = document.getElementById('image');
    var fi = document.getElementById('filter');
    var tx = document.getElementById('lastvalue');
    var cvs = document.getElementById('cvs');

    cvs.width = im.width;
    cvs.height = im.height;
    cvs.style.left = im.width+"px";
    
    var showValue = function(x, y, cx, cy) {
        var v = data[y][x];
        var vcolor = (v - dataMin) / (dataMax - dataMin);
        var color = hsv2rgb(200 - 200*vcolor, 1, 1);
        tx.textContent = v.toFixed(2);
        tx.style.left = cx+"px";
        tx.style.top = (cy-20)+"px";
        tx.style.color = color;

        var ctx = cvs.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(cx, cy, 1, 1);
        
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



// https://gist.github.com/schinckel/1588489#file-hsv2rgb-js

var hsv2rgb = function(h,s,v) {
  //var h = hsv.hue, s = hsv.sat, v = hsv.val;
  var rgb, i, data = [];
  if (s === 0) {
    rgb = [v,v,v];
  } else {
    h = h / 60;
    i = Math.floor(h);
    data = [v*(1-s), v*(1-s*(h-i)), v*(1-s*(1-(h-i)))];
    switch(i) {
      case 0:
        rgb = [v, data[2], data[0]];
        break;
      case 1:
        rgb = [data[1], v, data[0]];
        break;
      case 2:
        rgb = [data[0], v, data[2]];
        break;
      case 3:
        rgb = [data[0], data[1], v];
        break;
      case 4:
        rgb = [data[2], data[0], v];
        break;
      default:
        rgb = [v, data[0], data[1]];
        break;
    }
  }
  return '#' + rgb.map(function(x){ 
    return ("0" + Math.round(x*255).toString(16)).slice(-2);
  }).join('');
};
