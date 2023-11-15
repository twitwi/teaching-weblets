

var start = function() {
    
    var data = rawConvData.values;
    var dataMin = rawConvData.min;
    var dataMax = rawConvData.max;

    var base = document.getElementById('cont');
    var im = document.getElementById('image');
    var fi = document.getElementById('filter');
    var tx = document.getElementById('lastvalue');
    var mod = document.getElementById('model');
    var cvs = document.getElementById('cvs');

    cvs.width = im.width;
    cvs.height = im.height;
    cvs.style.left = im.width+"px";
    mod.style.left = im.width+"px";

    var marvelous = false;
    
    var showValue = function(x, y, boxx, boxy) {
        var v = data[y][x];
        var vcolor = (v - dataMin) / (dataMax - dataMin);
        var color = hsv2rgb(200 - 200*vcolor, 1, 1);

        tx.textContent = v.toFixed(2);
        tx.style.left = boxx+"px";
        tx.style.top = (boxy-20)+"px";
        tx.style.color = color;

        var ctx = cvs.getContext("2d");
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);

        if (marvelous) {
            revealSomePointsAround(x, y, 50, 2000);
        }

    };

    var revealSomePointsAround = function(basex, basey, ran, nbp) {
        var ctx = cvs.getContext("2d");
        var w = im.width;
        var h = im.height;

        for (var i = 0; i<nbp; i++) {
            var x = basex + getRandomIntInclusive(-ran, ran);
            var y = basey + getRandomIntInclusive(-ran, ran);
            if (x>=0 && y>=0 && x<w && y<h) {
                var v = data[y][x];
                var vcolor = (v - dataMin) / (dataMax - dataMin);
                var color = hsv2rgb(200 - 200*vcolor, 1, 1);
                ctx.fillStyle = color;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    };

    var onMove = function(e) {
        marvelous = e.shiftKey;
        var x = e.pageX;
        var y = e.pageY;
        var boxx = x - fi.width/2;
        var boxy = y - fi.height/2;
        fi.style.left = boxx+"px";
        fi.style.top = boxy+"px";
        showValue(x, y, boxx, boxy);
    };
    
    im.addEventListener('mousemove', onMove);
    fi.addEventListener('mousemove', onMove);
    tx.addEventListener('mousemove', onMove);
    fi.addEventListener('click', function(e) {
        revealSomePointsAround(e.clientX, e.clientY, 20, 1000);
        revealSomePointsAround(e.clientX, e.clientY, 50, 1000);
    });
    
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

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
