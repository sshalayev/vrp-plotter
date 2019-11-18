module.exports = function(vrp){
    vrp.directive('routeDraw', routeDrawDirective);
    routeDrawDirective.$inject = ['$q', '$timeout'];

    function routeDrawDirective($q, $timeout){
        return {
            restrict: 'E',
            scope: {},
            template: require('./route-draw-tpl.html'),
            bindToController: true,
            controller: 'RouteDrawController',
            controllerAs: 'ctrl'
        };
    }

    vrp.controller('RouteDrawController', RouteDrawController);
    RouteDrawController.$inject = ['$element', '$timeout', '$simAnneal', 'pointFactory'];

    function RouteDrawController($element, $timeout, $simAnneal, pointFactory){
        const colors = [
            '#2196F3',
            '#F44336',
            '#FFC107',
            '#4CAF50',
            '#FF9800',
            '#009688',
            '#9C27B0',
            '#FFEB3B',
            '#3F51B5',
            '#CDDC39'
        ];
        this.mapSize = $element[0].offsetWidth - 16;
        this.maxTemp = 10;
        this.minTemp = 0.00005;
        this.pointsNumber = 20;
        this.simAnneal = null;
        this.bestRoute = null;
        this.usePreset = false;
        this.isClosed = false;
        this.preset = null;
        this.colorIterator = colors.values();

        this.rebuildRoute = (reset) => {
            const drawElem = $('.route-draw-container');
            const routeInfo = drawElem.find('.route-info');
            const canvas = document.getElementById('current_search');
            const ctx = canvas.getContext('2d');

            const preset = buildPreset(this.preset);

            if (reset || !this.simAnneal){
                this.simAnneal = this.usePreset
                    ? $simAnneal.getPresetInstance(preset, this.maxTemp, this.minTemp, this.isClosed)
                    : $simAnneal.getInstance(this.pointsNumber, this.mapSize, this.maxTemp, this.minTemp, this.isClosed);
                drawPoints(this.simAnneal.points, drawElem);
            }
            this.simAnneal.reset();
            clearCanvas(ctx);
            drawRouteSequence(ctx, this.simAnneal, routeInfo);
        };

        this.drawSolution = (idx) => {
            if (!this.simAnneal){
                return;
            }
            const scanvas = document.getElementById('solution_' + idx);
            if (!scanvas){
                return $timeout(() => this.drawSolution(idx), 50);
            }
            return $timeout(() => {
                const solution = this.simAnneal.getSolution(idx);
                const sctx = scanvas.getContext('2d');
                solution.color = this.getColor();
                drawRoute(sctx, solution.points, solution.color);
            }, 0)
        };

        this.addSolution = () => {
            if (!this.preset){
                return;
            }
            const points = buildPreset(this.preset);
            if (!this.simAnneal){
                const drawElem = $('.route-draw-container');
                drawPoints(points, drawElem);
                this.simAnneal = $simAnneal.getPresetInstance(points, this.maxTemp, this.minTemp);
            } else {
                this.simAnneal.addSolution(points);
            }
        };

        this.focusSolution = (idx) => {
            const drawElem = $('.route-draw-container');
            drawElem.find('.route-solution').each((i, elem) => {
                $(elem).toggleClass('focused-solution', i === idx);
            });
        };

        this.downloadSolution = (idx) => {
            const scanvas = document.getElementById('current_search');
            const dataUrl = scanvas.toDataURL();
            initDownload(dataUrl);
        };

        this.stopRouteSearch = () => {
            if (!this.simAnneal){
                return;
            }
            this.simAnneal.stop();
            console.log(this.simAnneal.getLastSolution().export())
        };

        this.getColor = () => {
            let item = this.colorIterator.next();
            if (!item.value){
                this.colorIterator = colors.values();
                item = this.colorIterator.next();
            }
            return item.value;
        };

        function buildPreset(data){
            return data ? data.split('\n').map((str) =>
                pointFactory.getPoint(...str
                    .split(',')
                    .map((v) => parseInt(v))
                )
            ) : [];
        }

        function drawRouteSequence(ctx, simAnneal, infoElem, minCost){
            if (simAnneal.isDone){
                console.log(`Processing is done with cost of ${simAnneal.getLastSolution().cost}. ${simAnneal.solutions.length} solutions in stock`);
                console.log(simAnneal.getLastSolution().export());
                clearCanvas(ctx);
                return;
            }

            const currentCost = simAnneal.currentCost;
            if (!minCost || minCost > currentCost){
                clearCanvas(ctx);
                drawRoute(ctx, simAnneal.points);
                minCost = currentCost;
            }
            infoElem.html(`min. cost: <b>${minCost}</b>. ${simAnneal.info}`);

            if (simAnneal.next()) {
                $timeout(() => {
                    drawRouteSequence(ctx, simAnneal, infoElem, minCost);
                }, 5)
            }
        }

        function drawPoints(points, container){
            $(container).find('.route-point').remove();
            const sf = getScaleFactor(points);

            points.forEach((point) => {
                const pt = sf !== 1 ? point.getScaled(sf) : point.clone();
                const px = Math.round(pt.x);
                const py = Math.round(pt.y);
                const pid = ['rp', point.x, point.y].join('_');
                if (!document.getElementById(pid)){
                    const pointElem = angular.element(`<div class="route-point" id="rp_${point.x}_${point.y}"><span>${point.x}x${point.y}</span></div>`);
                    pointElem.css({
                        top: py + 'px',
                        left: px + 'px'
                    });
                    container.append(pointElem);
                }
            })
        }

        function drawRoute(ctx, points, color = '#0D47A1'){
            const sf = getScaleFactor(points);
            const pts = sf !== 1 ? points.map((pt) => pt.getScaled(sf)) : points.slice();

            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            pts.slice(1).forEach((point) => {
                ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
            markStartEndPoints(points);
        }

        function markStartEndPoints(points){
            const drawElem = $('.route-draw-container');
            const fid = `#rp_${points[0].x}_${points[0].y}`;
            const lid = `#rp_${points[points.length - 1].x}_${points[points.length - 1].y}`;
            const fclass = 'route-point-first';
            const lclass = 'route-point-last';
            drawElem.find('.route-point').removeClass(fclass).removeClass(lclass);
            drawElem.find(fid).addClass(fclass);
            drawElem.find(lid).addClass(lclass);
        }

        function clearCanvas(ctx){
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        function factorial(val, res = 1){
            return val > 0 ? factorial(val - 1, val * res) : res;
        }

        function getScaleFactor(points){
            const cnv = document.getElementById('current_search');
            if (!cnv){
                return 1
            }
            const maxDim = points.map((pt) => Math.max(pt.x, pt.y)).sort((a, b) => b - a)[0];
            return cnv.width / maxDim;
        }

        function initDownload (url) {
            const anchor = document.createElement('a');
            anchor.setAttribute('href', url);
            anchor.setAttribute('download', 'route.png');
            const ev = new MouseEvent('click');
            anchor.dispatchEvent(ev);
        }

        function formattedFactorial(num){
            const fact = factorial(num);
            const pow = parseInt(fact.toString().split('e+')[1]);
            return Math.round(fact / Math.pow(10, pow)).toString() + ('0').repeat(pow)
        }
    }
};