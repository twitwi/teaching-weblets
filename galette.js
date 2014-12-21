angular
    .module('galette', [])
    .controller('Galette', ['$scope', function($scope) {
        $scope.nSlices = 9;
        $scope.scale = 500;
        $scope.R = 1;
        $scope.r = .1;
        $scope.PI = Math.PI;
        $scope.marginRatio = 0.92;
        $scope.angles = [];
        $scope.cosD = function(d) {return Math.cos(d/180*Math.PI);}
        $scope.sinD = function(d) {return Math.sin(d/180*Math.PI);}
        $scope.cos = Math.cos;
        $scope.sin = Math.sin;
        $scope.max = Math.max;
        $scope.update = function() {
            $scope.angles.length = $scope.nSlices;
            for (var i = 0; i < $scope.nSlices; i++) {
                var v = i * 360.0 / $scope.nSlices;
                $scope.angles[i] = v;
            }
            /* // old
                        $scope.z = (function(){
                            var theta = 360.0 / $scope.nSlices;
                            var y = $scope.r;
                            var a = $scope.r / $scope.sinD(theta);
                            var x = a * (1 + $scope.cosD(theta));
                            return Math.sqrt(x*x + y*y);
                        })();
                        var rPossible = $scope.R - $scope.r;
                        var rOk = $scope.R - $scope.r - $scope.z;
                        if (rOk < 0) {
                            $scope.probaOk = 0;
                        } else {
                            $scope.probaOk = rOk*rOk / (rPossible*rPossible);
                        }
                        /*/
            var theta = Math.PI * 2 / $scope.nSlices;
            var rPossible = $scope.R - $scope.r;
            var r = $scope.r;
            var a = $scope.r / Math.sin(theta);
            var x = a * (1 + Math.cos(theta));
            var beta = Math.asin(r / rPossible);
            var w = Math.sqrt(rPossible*rPossible - r*r);//rPossible * Math.cos(beta);
            if (w < x) {
                $scope.probaOk = 0;                            
            } else {
                var areaKo = rPossible*rPossible*beta/2 + (w*r)/2 - (x*r)/2;
                areaKo *= 2;
                var areaTotal = rPossible*rPossible*theta/2;
                $scope.probaOk = (areaTotal - areaKo) / areaTotal;
            }
            $scope.geom = {
                x: x,
                y: r,
                a: a,
                beta: beta,
                theta: theta,
                w: w
            };
            //*/
            console.log($scope.probaOk);
        };
        $scope.update();
    }]);
