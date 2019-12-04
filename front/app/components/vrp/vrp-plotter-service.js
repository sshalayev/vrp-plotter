module.exports = function(vrp){
    vrp.service('vrpPlotter', vrpPlotter);
    vrpPlotter.$inject = ['pointFactory'];

    function vrpPlotter(pointFactory){
        const TYPES = {
            delivery: {
                cssClass: 'vrp-delivery material-icons',
                icon: 'archive'
            },
            pickup: {
                cssClass: 'vrp-pickup material-icons',
                icon: 'unarchive'
            },
            vehicle: {
                cssClass: 'vrp-vehicle material-icons',
                icon: 'local_shipping'
            }
        };
        const COLORS = [
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

        class RoutePoint extends pointFactory.RPoint {
            constructor(x, y){
                super(x, y);
                this.cssStyle = [];
                this.name = null;
                this.cssStyle.push('vrp-point');
            }

            setCss(css){
                this.cssStyle.push(css);
                return this;
            }

            setName(name){
                this.name = name;
                return this;
            }
        }

        class VRPPlotter {
            constructor(element){
                this.element = $(element);
                this.canvas = this.element.find('canvas')[0];
                this.ctx = this.canvas.getContext('2d');
                this.shipments = new Map();
                this.services = new Map();
                this.vehicles = new Map();
                this.routes = new Map();
                this.colorIterator = COLORS.values();
                this.transX = (x) => x;
                this.transY = (y) => y;
                this.vrp = null;
                this.best = null;
            }

            get isEmpty(){
                return !this.vrp;
            }

            getColor(){
                let item = this.colorIterator.next();
                if (!item.value){
                    this.colorIterator = COLORS.values();
                    item = this.colorIterator.next();
                }
                return item.value;
            }

            getPointElem(point){
                const elem =  $(document.createElement('div')).text(point.name);
                point.cssStyle.forEach((css) => {
                    elem.addClass(css);
                });
                return elem;
            }

            getBestSolution(vrp = this.vrp){
                return vrp.solutions.reduce((res, sol) => sol.cost < res.cost ? sol : res, {cost: Number.MAX_VALUE})
            }
            setVehicles(vrp){
                if (!vrp.vehicles){
                    return this;
                }
                vrp.vehicles.forEach((vhc) => {
                    const vhcLoc = {
                        start: null,
                        end: null,
                        rtp: vhc.returnToDepot
                    };
                    if (vhc.startLocation){
                        const {x, y} = vhc.startLocation.coord;
                        vhcLoc.start = new RoutePoint(x, y)
                            .setCss('material-icons')
                            .setCss('vrp-vehicle')
                            .setName('local_shipping');
                    }
                    if (vhc.endLocation){
                        const {x, y} = vhc.endLocation.coord;
                        vhcLoc.end = new RoutePoint(x, y)
                            .setCss('material-icons')
                            .setCss('vrp-vehicle')
                            .setName('local_shipping');
                        if (!vhc.returnToDepot && vhcLoc.end.equals(vhcLoc.start)){
                            vhcLoc.end = null;
                        }
                    }
                    this.vehicles.set(vhc.id, vhcLoc);
                });
                return this;
            }
            setShipments(vrp){
                if (!vrp.shipments || !vrp.shipments.length){
                    return this;
                }
                vrp.shipments.forEach((shipment) => {
                    const {x: px, y: py} = shipment.pickup.location.coord;
                    const {x: dx, y: dy} = shipment.delivery.location.coord;
                    const ploc = new RoutePoint(px, py).setCss('vrp-pickup').setName(shipment.id.slice(3));
                    const dloc = new RoutePoint(dx, dy).setCss('vrp-delivery').setName(shipment.id.slice(3));
                    this.shipments.set(shipment.id, {
                        pickup: ploc,
                        delivery: dloc,
                        capacity: shipment.capacityDemand[0] || 0,
                        dist: Math.round(ploc.getDistance(dloc) * 10) / 10
                    });
                });
                return this;
            }
            setServices(vrp){
                if (!vrp.services || !vrp.services.length){
                    return this;
                }
                vrp.services.forEach((service) => {
                    const {x, y} = service.location.coord;
                    const loc = new RoutePoint(x, y).setCss('vrp-' + service.type).setName(service.id.slice(3));
                    this.services.set(service.id, {
                        location: loc,
                        capacity: service.capacityDemand[0] || 0
                    });
                });
                return this;
            }
            setRoutes(vrp){
                if (!vrp.solutions){
                    return this;
                }
                this.best = this.getBestSolution(vrp);
                this.best.routes.forEach((route, idx) => {
                    const vehicle = this.vehicles.get(route.vehicleId);
                    if (!vehicle){
                        return;
                    }
                    const summary = route.act.reduce((res, act) => {
                        const prevLoc = res.points[res.points.length - 1];
                        let loc = null;
                        let capacity = 0;
                        if (this.shipments.has(act.jobId)){
                            const shp = this.shipments.get(act.jobId);
                            loc = shp.delivery;
                            if (act.type.startsWith('pickup')){
                                loc = shp.pickup;
                                capacity = shp.capacity
                            }
                        }
                        if (this.services.has(act.jobId)){
                            const svc = this.services.get(act.jobId);
                            loc = svc.location;
                            capacity = svc.capacity;
                        }
                        res.points.push(loc);
                        res.distance += prevLoc.getDistance(loc);
                        res.capacity += capacity;
                        return res;
                    }, {
                        points: [vehicle.start],
                        distance: 0,
                        capacity: 0
                    });
                    if (vehicle.end){
                        summary.distance += summary.points[summary.points.length - 1].getDistance(vehicle.end);
                        summary.points.push(vehicle.end);
                    }
                    summary.color = this.getColor();
                    summary.vehicleId = route.vehicleId;

                    this.routes.set('route' + idx, summary)
                });
                this.best.unassignedJobs.forEach((job) => {
                    if (this.shipments.has(job.id)){
                        const shp = this.shipments.get(job.id);
                        shp.delivery.setCss('vrp-unassigned');
                        shp.pickup.setCss('vrp-unassigned');
                    }
                    if (this.services.has(job.id)){
                        const svc = this.services.get(job.id);
                        svc.location.setCss('vrp-unassigned');
                    }
                });
                return this;
            }
            setVRP(vrp = {}){
                this.vrp = vrp;
                return this.setScale(vrp)
                    .setVehicles(vrp)
                    .setShipments(vrp)
                    .setServices(vrp)
                    .setRoutes(vrp);
            }

            addPoint(point){
                const realPoint = point.getTransformed(this.transX, this.transY);
                const {x, y} = realPoint;
                const elem = this.getPointElem(point);
                elem.css({
                    top: y - 12 + 'px',
                    left: x - 12 + 'px'
                }).attr('id', point.toString());
                this.element.append(elem);
                return elem;
            }

            addService(service){
                if (!service){
                    return;
                }
                const {location: loc} = service;

                this.addPoint(loc);
                this.addServiceCapacity(service);
                return this;
            }

            addServiceCapacity(service){
                if (!service){
                    return;
                }
                const {location: loc, capacity: capacity} = service;
                const elem = angular.element('<div class="vrp-capacity"><div class="vrp-capacity-link"></div>' +
                    `<div class="vrp-capacity-data">${capacity}</div></div>`);
                const rp = loc.getTransformed(this.transX, this.transY);
                elem.css({
                    top: rp.y + 10 + 'px',
                    left: rp.x - 10 + 'px'
                }).addClass('vrp-point-hidden');
                this.element.append(elem);
                return elem;
            }

            addShipment(shipment){
                if (!shipment){
                    return;
                }
                const {pickup: ploc, delivery: dloc} = shipment;

                this.addPoint(ploc);
                this.addPoint(dloc);
                this.drawRoute([ploc, dloc]);
                this.addShipmentCapacity(shipment);
                return this;
            }

            addShipmentCapacity(shipment){
                if (!shipment){
                    return;
                }
                const {pickup: ploc, capacity: capacity} = shipment;
                const elem = angular.element('<div class="vrp-capacity"><div class="vrp-capacity-link"></div>' +
                    `<div class="vrp-capacity-data">${capacity}</div></div>`);
                const rp = ploc.getTransformed(this.transX, this.transY);
                elem.css({
                    top: rp.y + 8 + 'px',
                    left: rp.x - 16 + 'px'
                }).addClass('vrp-point-hidden');
                this.element.append(elem);
                return elem;
            }

            drawRoute(points, color){
                this.ctx.strokeStyle = color || 'rgba(0, 0, 0, .20)';
                this.ctx.lineWidth = 2;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.setLineDash(color ? [] : [8, 8]);

                const realPoints = points.map((point) => point.getTransformed(this.transX, this.transY));

                this.ctx.beginPath();
                this.ctx.moveTo(realPoints[0].x, realPoints[0].y);
                realPoints.slice(1).forEach((point, idx) => {
                    const dist = points[idx].getDistance(points[idx + 1]).toFixed(1);
                    const mid = points[idx].getMidPoint(points[idx + 1])
                        .setCss('vrp-distance')
                        .setCss('vrp-point-hidden')
                        .setName(dist);
                    const colorStyle = {'background-color': color || '#455A64'};
                    this.addPoint(mid).css(colorStyle);
                    this.ctx.lineTo(point.x, point.y);
                });
                this.ctx.stroke();
                return this;
            }

            drawSolution(){
                this.routes.forEach((item) => {
                    this.drawRoute(item.points, item.color);
                });
                return this;
            }

            plotVRP(){
                if (!this.vrp){
                    return
                }
                this.vehicles.forEach((vhc) => {
                    this.addPoint(vhc.start, TYPES.vehicle);
                    if (vhc.end && !vhc.end.equals(vhc.start)){
                        this.addPoint(vhc.end, TYPES.vehicle);
                    }
                });
                this.shipments.forEach((shp) => {
                    this.addShipment(shp);
                });
                this.services.forEach((svc) => {
                    this.addService(svc);
                });
            }

            plotSolution(){
                this.drawSolution();
            }

            reset(){
                this.shipments.clear();
                this.services.clear();
                this.vehicles.clear();
                this.routes.clear();
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.element.find('.vrp-point, .vrp-capacity').remove();
                this.transX = (x) => x;
                this.transY = (y) => y;
                this.vrp = null;
                this.best = null;
                return this;
            }

            setScale(vrp){
                if (vrp){
                    const vhcLocs = vrp.vehicles.reduce((res, vhc) => {
                        if (vhc.startLocation){
                            let {x, y} = vhc.startLocation.coord;
                            res[0].push(x);
                            res[1].push(y);
                        }
                        if (vhc.endLocation){
                            let {x, y} = vhc.endLocation.coord;
                            res[0].push(x);
                            res[1].push(y);
                        }
                        return res;
                    }, [[], []]);

                    const svcLocs = vrp.services.reduce((res, svc) => {
                        const {x, y} = svc.location.coord;
                        res[0].push(x);
                        res[1].push(y);
                        return res;
                    }, [[], []]);

                    const shpLocs = vrp.shipments.reduce((res, shp) => {
                        if (shp.pickup.location){
                            let {x, y} = shp.pickup.location.coord;
                            res[0].push(x);
                            res[1].push(y);
                        }
                        if (shp.delivery.location){
                            let {x, y} = shp.delivery.location.coord;
                            res[0].push(x);
                            res[1].push(y);
                        }
                        return res;
                    }, [[], []]);

                    const xMinMax = vhcLocs[0].concat(svcLocs[0]).concat(shpLocs[0]).sort((a, b) => a - b);
                    const yMinMax = vhcLocs[1].concat(svcLocs[1]).concat(shpLocs[1]).sort((a, b) => a - b);
                    const ymin = yMinMax.shift();
                    const ymax = yMinMax.pop();
                    const xmin = xMinMax.shift();
                    const xmax = xMinMax.pop();
                    const maxDim = Math.max((xmax-xmin), (ymax-ymin));

                    console.log([xmin, xmax, ymin, ymax, maxDim]);

                    // const vhcMax = vrp.vehicles.map((vhc) => {
                    //     let smax = 0;
                    //     let emax = 0;
                    //     if (vhc.startLocation){
                    //         let {x, y} = vhc.startLocation.coord;
                    //         smax = Math.max(x, y)
                    //     }
                    //     if (vhc.endLocation){
                    //         let {x, y} = vhc.endLocation.coord;
                    //         emax = Math.max(x, y)
                    //     }
                    //     return Math.max(smax, emax);
                    // }).sort((a, b) => b - a)[0] || 0;
                    //
                    // const svcMax = vrp.services.map((svc) => Math.max(svc.location.coord.x, svc.location.coord.y)).sort((a, b) => b - a)[0] || 0;
                    //
                    // const shpMax = vrp.shipments.map((shp) => {
                    //     let pmax = 0;
                    //     let dmax = 0;
                    //     if (shp.pickup.location){
                    //         let {x, y} = shp.pickup.location.coord;
                    //         pmax = Math.max(x, y)
                    //     }
                    //     if (shp.delivery.location){
                    //         let {x, y} = shp.delivery.location.coord;
                    //         dmax = Math.max(x, y)
                    //     }
                    //     return Math.max(pmax, dmax);
                    // }).sort((a, b) => b - a)[0] || 0;

                    const scale = this.canvas.width / maxDim;
                    console.log(`Scale: ${scale}`);
                    this.transX = (x) => {
                        return (x - xmin) * scale;
                    };
                    this.transY = (y) => {
                        return (y - ymin) * scale;
                    };
                }
                return this;
            }

        }

        this.getInstance = (elem) => {
            return new VRPPlotter(elem);
        }
    }
};