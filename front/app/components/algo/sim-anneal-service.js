module.exports = function(vrp){
    vrp.service('$simAnneal', simAnnealService);
    simAnnealService.$inject = ['$q', '$permutation', '$apee', '$double', 'pointFactory'];

    function simAnnealService($q, $permutation, $apee, $double, pointFactory){
        const BFLIMIT = 5e5;
        class SimAnnealSolution {
            constructor(points){
                this.points = [];
                this.cost = -1;
                if (points){
                    this.setPoints(points);
                }
            }

            get length(){
                return this.points.length;
            }

            setPoints(points){
                this.points.splice(0, this.points.length, ...points);
                this.cost = this.getCost();
                return this;
            }

            getCost(){
                return SimAnnealSolution.calculateCost(this.points);
            }

            export(){
                return this.points.map((point) => [point.x, point.y].join()).join('\n');
            }

            equals(solution){
                if (this === solution){
                    return true;
                }
                if (!(solution instanceof SimAnnealSolution)){
                    return false;
                }
                const startIndex = solution.points.findIndex((point) => point.equals(this.points[0]));
                return startIndex > -1
                    && this.cost === solution.cost
                    && this.length === solution.length
                    && this.points.every((p, i, a) => p.equals(solution.points[(i + startIndex) % a.length]));
            }

            static calculateCost(points){
                return points.reduce((res, point) => {
                    if (res.prev){
                        res.cost += res.prev.getDistance(point);
                    }
                    res.prev = point;
                    return res;
                }, {cost: 0, prev: null}).cost
            }
        }
        class SimAnneal extends $apee.APEventEmitter {
            constructor (base, maxTemperature, minTemperature, isClosed){
                super();
                if (base.length < 3){
                    throw new Error('SimAnneal accepts only sequences with length 3+');
                }
                const last = base[base.length - 1];
                if (isClosed && last && base[0] && !last.equals(base[0])){
                    base.push(base[0]);
                }
                this._base = base;
                this._state = $permutation.getRandomPermutation($permutation.getNumberSequence(base.length, 0));
                this._step = 1;
                this._start = maxTemperature;
                this._temperature = maxTemperature;
                this._limit = minTemperature;
                this._results = [];
                this._solutions = [];
                this._exact = null;
                if (this._base.length < 10){
                    this.bruteForce().then((result) => {
                        this._exact = new SimAnnealSolution(result.state);
                    })
                }
                this._hash = this.hashCode();
            }

            get currentCost() {
                return this.calculateCost(this._state);
            }
            get currentState() {
                return this._state;
            }
            set currentState(state) {
                this._state.splice(0, this._state.length, ...state);
            }
            get points(){
                return this.getState();
            }
            get isDone(){
                return (this._temperature <= this._limit || (this._exact && this._exact.cost === this.currentCost)) && this.stop();
            }
            set isDone(bool){
                if (!!bool){
                    this.stop()
                }
            }
            get isRunning(){
                return this._step > 1 && this._temperature > this._limit;
            }
            get info(){
                return `Route length: ${this.currentCost} Step: ${this._step} Temperature: ${this._temperature}`
            }
            get solutions(){
                return this._solutions;
            }

            hashCode(){
                return this._base.reduce((res, item) => {
                    if (!res){
                        res = $double.doubleToLongBits(item.x);
                        res = Math.imul(31, res) + item.y | 0;
                    } else {
                        res = Math.imul(31, res) + item.x | 0;
                        res = Math.imul(31, res) + item.y | 0;
                    }
                    return res;
                }, 0)
            }

            getState(state = this._state){
                return state.map((v) => this._base[v])
            }

            calculateCost(state){
                const points = this.getState(state);
                return SimAnnealSolution.calculateCost(points);
            }

            calculateProbability(deltaCost){
                return Math.exp(-1 * deltaCost / this._temperature)
            }

            decreaseTemperature(){
                this._temperature = (this._start * 0.3) / this._step;
                this._step++;
            }

            getCandidate(){
                let a = Math.floor(Math.random() * this._state.length);
                let b = Math.floor(Math.random() * this._state.length);
                if (a > b){
                    [a, b] = [b, a]
                }
                const segment = this._state.slice(a, b).reverse();
                return [...this._state.slice(0, a), ...segment, ...this._state.slice(b)]
            }

            bruteForce(limit = BFLIMIT){
                return $q((resolve) => {
                    const items = $permutation.getNumberSequence(this._base.length, 0);
                    const result = $permutation.getLimitedPermutations(items, limit).reduce((res, state) => {
                        const cost = this.calculateCost(state);
                        if (res.cost < 0 || cost < res.cost){
                            res.cost = cost;
                            res.state = this.getState(state);
                        }
                        return res;
                    }, {state: null, cost: -1});
                    resolve(result);
                })
            }

            benchmark(limit = BFLIMIT){
                const start = moment();
                return this.bruteForce(limit).then((result) => {
                    const end = moment();
                    let duration = end.diff(start);
                    const bench = math.divide(duration, limit);
                    const total = math.factorial(this._base.length);
                    const estimate = moment.duration(total * bench);

                    return Object.assign({bench, duration, estimate, limit, total}, result)
                })
            }

            next(){
                if (this.isDone || this._step > 100000){
                    this.stop();
                    return false;
                }

                const candidate = this.getCandidate();
                const candidateCost = this.calculateCost(candidate);
                const currentCost = this.currentCost;
                const deltaCost = candidateCost - currentCost;
                if (deltaCost < 0){
                    this.currentState = candidate;
                } else {
                    const probability = this.calculateProbability(deltaCost);
                    const trigger = Math.random();
                    if (trigger <= probability){
                        this.currentState = candidate;
                    }
                }
                this.decreaseTemperature();

                this._results.push(currentCost);
                return currentCost;
            }

            stop(){
                if (this._step === 1){
                    return
                }
                this._temperature = 0;
                return this.addSolution();
            }

            reset(){
                this._step = 1;
                this._temperature = this._start;
                this._results = [];
                this._state = $permutation.getRandomPermutation($permutation.getNumberSequence(this._base.length, 0));
                return this;
            }

            addSolution(points = this.points){
                const solution = new SimAnnealSolution(points);
                const prevSolution = this.getLastSolution();
                if (!prevSolution || !prevSolution.equals(solution)){
                    this._solutions.push(solution);
                }
                return this;
            }

            getLastSolution(){
                return this._solutions[this._solutions.length - 1]
            }

            getBestSolution(){
                return this._solutions.reduce((a, b) => a.cost < b.cost ? a : b)
            }

            getSolution(idx){
                return this._solutions[idx]
            }

            static calculateSegmentCost(pointA, pointB){
                return Math.round(Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2)))
            }
        }
        this.getPresetInstance = (base, maxT, minT, isClosed) => {
            const instance = new SimAnneal(base, maxT, minT, isClosed);
            return instance.addSolution(instance._base);
        };
        this.getInstance = (amount, range, maxT, minT, isClosed) => {
            const base = pointFactory.getRandomPoints(amount, range, range);
            return new SimAnneal(base, maxT, minT, isClosed);
        };
        this.SimAnneal = SimAnneal;
    }
};