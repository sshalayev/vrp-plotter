module.exports = (vrp) => {
    vrp.service('$dbscan', dbscanService);
    dbscanService.$inject = ['$permutation'];

    function dbscanService($permutation){
        const _points = [];
        const _epsFactor = 0.6;
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

            get length(){
                return this.points.size
            }

            get size(){
                return this.points.size
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
                    if (npoints.length < this.minPts){
                        continue;
                    }
                    const cluster = new Cluster();
                    cluster.addPoint(base);
                    npoints.forEach((npt) => {
                        cluster.addPoint(npt);
                    });
                    clusters.push(cluster);
                }
                //console.log(`${this.eps};${clusters.length}`);
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

        this.cluster = (points, clusterCount, noiseRate = 0.3) => {
            matrixSample(points);
            let clusters = [];
            let fuse = 0;
            let eps = 2;
            let bestEps = 2;
            let max = -Infinity;

            while (eps < 600){
                if (fuse > 5){
                    break;
                }
                const dbscan = new JSDBSCAN(eps);
                const currentClusters = dbscan.cluster(points);
                const noise = 1 - (currentClusters.reduce((res, cluster) => res + cluster.size, 0) / points.length);
                const diff = Math.abs(clusterCount - currentClusters.length);
                if (max < currentClusters.length){
                    max = currentClusters.length;
                }
                if (currentClusters.length === 1 && max > currentClusters.length){
                    fuse++
                }
                if (diff < Math.abs(clusterCount - clusters.length) && noise < noiseRate){
                    clusters = currentClusters;
                    bestEps = eps;
                }

                eps += 0.5;
            }
            console.log('Best eps: ' + bestEps);
            return clusters;
        };

        function sample(points){
            const dists = $permutation.getAllCombination(points, 2).map((pair) => pair[0].getDistance(pair[1])).sort((a,b) => a - b);
            const mid = dists.slice(Math.round(dists.length / 3), Math.round(dists.length * 2 / 3));
            const dsum = dists.reduce((res, dist) => res + dist);
            const sum = mid.reduce((res, dist) => res + dist);
            const deps = ((dsum / dists.length) - dists[0]) * _epsFactor;
            const eps = ((sum / mid.length) - mid[0]) * _epsFactor;
            console.log(`fAVG: ${dsum / dists.length} fMIN: ${dists[0]} fMAX: ${dists[dists.length - 1]} fEPS: ${deps}`);
            console.log(`mAVG: ${sum / mid.length} mMIN: ${mid[0]} mMAX: ${mid[mid.length - 1]} mEPS: ${eps}`);
            return eps;
        }

        function matrixSample(points){
            const knn = 3;
            const matrix = Immutable.Map().asMutable();
            const dists = [];
            let maxDist = 0;
            let minDist = Number.MAX_VALUE;
            $permutation.getAllCombination(points, 2).forEach((pair) => {
                const [a, b] = pair;
                const dist = a.getDistance(b);
                dists.push(dist);
                matrix.setIn([a, b], dist);
                matrix.setIn([b, a], dist);
                if (dist > maxDist){
                    maxDist = dist;
                }
                if (dist < minDist){
                    minDist = dist;
                }
            });
            const vari = getVariance(dists, true);
            const stddev = Math.sqrt(vari);
            console.log('Variance: ' + vari);
            console.log('Deviation: ' + stddev);
        }

        function getRandomPoint(points){
            const rand = Math.floor(Math.random() * points.length);
            return points[rand];
        }

        function getMean(values){
            if (!values || !values.length) return NaN;
            return values.reduce((r, v) => r + v, 0) / values.length;
        }

        function getVariance(values, bias){
            if (!values || !values.length) return NaN;

            const mean = getMean(values);
            const n = values.length - +bias;
            return values.reduce((r, v) => r + Math.pow(v - mean, 2), 0) / n
        }
    }
};