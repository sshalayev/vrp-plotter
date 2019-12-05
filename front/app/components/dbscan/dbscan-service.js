module.exports = (vrp) => {
    vrp.service('$dbscan', dbscanService);
    dbscanService.$inject = ['$permutation'];

    function dbscanService($permutation){
        const _points = [];
        const _epsFactor = 0.8;
        const _sampleCount = 100;
        const _pointStatus = {
            NOISE: -1,
            NOT_VISITED: 0,
            PART_OF_CLUSTER: 1
        };

        Object.defineProperties(this, {
            points: {
                get: () => _points,
                set: (pts) => _points.splice(0, _points.length, ...pts)
            },
            epsFactor: {
                get: () => _epsFactor
            },
            sampleCount: {
                get: () => _sampleCount
            },
            pointStatus: {
                get: () => _pointStatus
            }
        });


        class Cluster {
            constructor() {
                this.points = Immutable.Set().asMutable();
            }

            addPoint(point) {
                this.points.add(point);
            }

            getPoints() {
                return this.points.valueSeq().toArray();
            }

            setPoints(points){
                points.forEach((pt) => {
                    this.points.add(pt)
                });
                return this;
            }

            equals(obj){
                if (obj === this) return true;
                if(!obj || obj.constructor !== this.constructor) return false;
                return this.points.size === obj.points.size
                    && this.points.every((pt) => obj.points.has(pt))
                    && obj.points.every((pt) => this.points.has(pt))
            }
        }

        class JSDBSCAN {
            constructor(eps, minPts = 2, distanceCalculator = JSDBSCAN.euclideanDistance) {
                this.eps = eps;
                this.minPts = minPts;
                this.distanceCalculator = distanceCalculator;
            }

            getEps() {
                return this.eps;
            }

            setEps(eps){
                this.eps = eps;
                return this;
            }

            getMinPts() {
                return this.minPts;
            }

            setMinPts(minPts) {
                this.minPts = minPts;
                return this;
            }

            cluster(pts){
                const start = Date.now();
                const clusters = [];
                const points = Immutable.Set(pts).asMutable();
                let counter = 0;
                while(points.size > 0 && ++counter < 1000){
                    const base = getRandomPoint(points.toArray());
                    const npoints = this.findNeighbors(base, points.delete(base));
                    if (!npoints.length){
                        continue;
                    }
                    const cluster = new Cluster();
                    cluster.addPoint(base);
                    npoints.forEach((npt) => {
                        cluster.addPoint(npt);
                    });
                    clusters.push(cluster);
                }
                console.log(`PTS: ${pts.length} EPS: ${this.eps} CL: ${clusters.length} MS: ${Date.now() - start}`);
                return clusters;
            }

            findNeighbors(point, points){
                return points.toArray().reduce((res, pt) => {
                    if(this.distanceCalculator(pt, point) <= this.eps){
                        points.delete(pt);
                        res.push(pt);
                        res.push(...this.findNeighbors(pt, points));
                    }
                    return res;
                }, []);
            }

            static euclideanDistance (ptA, ptB) {
                return ptA.getDistance(ptB);
            };

        }

        this.cluster = (points, clusterCount) => {
            sample(points);
            let clusters = [];
            let fuse = 0;
            let eps = 2;
            while (eps < 600){
                if (fuse > 20){
                    break;
                }
                const dbscan = new JSDBSCAN(eps);
                clusters = dbscan.cluster(points);

                if (clusters.length === 1){
                    fuse++
                }
                eps += 2;
            }
            return clusters;
        };

        function _sample(points){
            let min = Number.MAX_VALUE, sum = 0;
            for (let i = 0; i < _sampleCount; i++) {
                const [pt1, pt2] = $permutation.getRandomPermutation(points);
                const dist = pt1.getDistance(pt2);
                if (dist < min) min = dist;
                sum += dist
            }
            return ((sum / _sampleCount) - min) * _epsFactor
        }

        function sample(points){
            const dists = $permutation.getAllCombination(points, 2).map((pair) => pair[0].getDistance(pair[1])).sort((a,b) => a - b);
            const mid = dists.slice(Math.round(dists.length / 3), Math.round(dists.length * 2 / 3));
            const dsum = dists.reduce((res, dist) => res + dist);
            const sum = mid.reduce((res, dist) => res + dist);
            const eps = ((sum / mid.length) - mid[0]) * _epsFactor;
            console.log(`FAVG: ${dsum / dists.length} FMIN: ${dists[0]} FMAX: ${dists[dists.length - 1]}`);
            console.log(`MAVG: ${sum / mid.length} MMIN: ${mid[0]} MMAX: ${mid[mid.length - 1]}`);
            return eps;
        }

        function getRandomPoint(points){
            const rand = Math.floor(Math.random() * points.length);
            return points[rand];
        }
    }
};