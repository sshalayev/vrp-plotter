module.exports = (vrp) => {
    vrp.service('$dbscan', dbscanService);
    dbscanService.$inject = ['$permutation'];

    function dbscanService($permutation){
        const _points = [];
        const _epsFactor = 0.8;
        const _sampleCount = 100;
        const _pointStatus = {
            NOISE: 0,
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

            equals(obj){
                if (obj === this) return true;
                if(!obj || obj.constructor !== this.constructor) return false;
                return this.points.size === obj.points.size
                    && this.points.intersect(obj.points).size === this.points.size
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

            cluster(points) {
                const clusters = [];
                const visited = Immutable.Map().asMutable();
                console.log(this.getNeighbors(points[0], points))
                points.forEach((point) => {
                    if (!visited.has(point)) {
                        const neighbors = this.getNeighbors(point, points);
                        if (neighbors.length >= this.minPts) {
                            const cluster = new Cluster();
                            clusters.push(this.expandCluster(cluster, point, neighbors, points, visited));
                        }
                    } else {
                        visited.set(point, _pointStatus.NOISE)
                    }
                });
                return clusters;
            }

            expandCluster(cluster, point, neighbors, points, visited) {
                cluster.addPoint(point);
                visited.set(point, _pointStatus.PART_OF_CLUSTER);
                let seeds = neighbors.slice(1);
                seeds.forEach((current) => {
                    if (!visited.has(current)) {
                        let currentNeighbors = this.getNeighbors(current, points);
                        if (currentNeighbors.length >= this.minPts) {
                            seeds = this.merge(seeds, currentNeighbors);
                        }
                    }
                    if (visited.get(current) === _pointStatus.NOISE) {
                        visited.set(current, _pointStatus.PART_OF_CLUSTER);
                        cluster.addPoint(current);
                    }
                });
                return cluster;
            }

            getNeighbors(point, points) {
                return points.reduce((res, neighbor) => {
                    if (point !== neighbor && this.distanceCalculator(neighbor, point) <= this.eps) {
                        res.push(neighbor);
                    }
                    return res;
                }, []);
            }

            _merge(one, two) {
                const oneSet = new Set(one);
                two.forEach((item) => {
                    if (!oneSet.has(item)) {
                        one.push(item)
                    }
                });
                return one;
            }

            merge(one, two){
                return Immutable.Set.of(one).union(two).valueSeq().toArray()
            }

            static euclideanDistance (ptA, ptB) {
                return ptA.getDistance(ptB);
            };

        }

        this.cluster = (points) => {
            const eps = sample(points);
            console.log(eps);
            const dbscan = new JSDBSCAN(eps);
            return dbscan.cluster(points);
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
            console.log('sample start');
            const dists = $permutation.getAllCombination(points, 2).map((pair) => pair[0].getDistance(pair[1])).sort((a,b) => a - b);
            const mid = dists.slice(Math.round(dists.length / 3), Math.round(dists.length * 2 / 3));
            const sum = mid.reduce((res, dist) => res + dist);
            const eps = ((sum / mid.length) - dists[0]) * _epsFactor;
            console.log('sample finished ' + eps);
            return eps;
        }
    }
};