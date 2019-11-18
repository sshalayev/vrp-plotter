module.exports = function(vrp){
    vrp.service('GeneticFactory', geneticFactoryService);
    geneticFactoryService.$inject = ['$permutation'];

    function geneticFactoryService($permutation){
        class Gene {
            constructor(code = []){
                this._code = code;
                this.vulnerability = 0;
            }

            get code () {
                return this._code.slice()
            }

            set code (code) {
                this._code.splice(0, this._code.length, ...code);
            }

            get size (){
                return this._code.length;
            }

            get genom (){
                const max = this._code.slice().sort((a, b) => b - a)[0];
                const pad = (`${max}`).length;
                return this._code.map((v) => ('' + v).padStart(pad, '0')).join()
            }

            isEqual(genom){
                return this.genom === genom;
            }

            reproduce (gene) {
                const children = [];
                const cellSet = $permutation.getNumberSequence(this.code.length);
                const mutualSet = this.code.map((val, idx) => {
                    if (val === gene.code[idx]){
                        cellSet.splice(cellSet.indexOf(val), 1);
                        return val;
                    }
                    return null;
                });
                if (cellSet.length === 0) {
                    return [
                        this.mutate(),
                        this.mutate()
                    ]
                }
                $permutation.getRandomLimitedPermutations(cellSet, MAX_CHILDREN).forEach((mut) => {
                    const child = new Gene(mutualSet.map((val) => val || mut.shift()));
                    children.push(child);
                });
                return children;
            }

            mutate(depth = Math.floor(this.size / 3)){
                const mcells = [];
                const sample = this.code;
                do {
                    const idx = Math.floor(Math.random() * this.size);
                    if (mcells.indexOf(sample[idx]) === -1){
                        mcells.push(sample[idx]);
                        sample[idx] = null;
                    }
                } while (mcells.length < depth);
                return new Gene(sample.map(v => v || mcells.shift()))
            }

        }

        class Generation {
            constructor(num){
                this.number = num;
                this._spieces = [];
            }
            get spieces () {
                return this._spieces.slice();
            }
            set spieces (arr) {
                this._spieces.splice(0, this._spieces.length);
                if (arr && Array.isArray(arr)){
                    this._spieces.push(...arr);
                }
            }
            get size() {
                return this._spieces.length
            }
            get avgVulnerability () {
                return this._spieces.reduce((res, gene) => res + (gene.vulnerability / this.size), 0)
            }
            get minVulnerability () {
                return this._spieces.reduce((res, gene) => !res || gene.vulnerability < res ? gene.vulnerability : res, null)
            }
            get maxVulnerability () {
                return this._spieces.reduce((res, gene) => !res || gene.vulnerability > res ? gene.vulnerability : res, null)
            }
            get minVulnerableSample () {
                return  this._spieces.find((gene) => gene.vulnerability === this.minVulnerability)
            }
            get maxVulnerableSample () {
                return  this._spieces.find((gene) => gene.vulnerability === this.maxVulnerability)
            }
            get csv () {
                return this._spieces.map((gene) => `${this.number},--,${gene.genom},${gene.vulnerability}`).join('\n')
            }
            get summary () {
                const out = [
                    `Generation ${this.number}`,
                    `Population: ${this.size}`,
                    `Vulnerability (min/avg/max): ${this.minVulnerability} / ${this.avgVulnerability} / ${this.maxVulnerability}`,
                    `Most viable sample: ${this.minVulnerableSample.genom}`,
                    '--'
                ];
                return out.join('\n');
            }
        }

        class Population {
            constructor (config) {
                this.generations = [];
                this.size = config.size;
                this.probe = config.probe;
                this.survive = config.survive || 0.25;
                this.genomLength = config.genomLength;
                this.sample = config.sample;
                this.minVulnerableGene = null;
            }

            get absMinVulnerability () {
                const sampleTotal = this.sample.reduce((res, val) => res + val, 0);
                const geneTotal = (this.sample.length + 1) * this.sample.length / 2;
                return sampleTotal - geneTotal;
            }

            get minVulnerability () {
                return this.probe($permutation.getOptimalPermutation(this.sample))
            }

            populate () {
                const items = $permutation.getNumberSequence(this.genomLength);
                const generation = new Generation(0);
                generation.spieces = $permutation.getRandomLimitedPermutations(items, this.size).map((seq) => {
                    const newGene = new Gene(seq);
                    newGene.vulnerability = this.probe(newGene.code);
                    return newGene;
                });
                this.generations.push(generation);
                return this;
            }

            select (genIdx = this.generations.length - 1) {
                const maxNumber = Math.floor(this.generations[genIdx].size * this.survive);
                return this.generations[genIdx].spieces
                    .sort((genA, genB) => genA.vulnerability - genB.vulnerability)
                    .slice(0, maxNumber)
                    .sort((genA, genB) => genA.genom - genB.genom)
            }
            breed(maxGenerations = 1000, stopOnMinimum = true){
                const oldGeneration = this.select();
                if (oldGeneration.length < 2 || maxGenerations === 1){
                    this.minVulnerableGene = this.findRelativeMin();
                    return this;
                }
                const newGeneration = new Generation(this.generations.length);
                newGeneration.spieces = oldGeneration.reduce((res, gene, idx) => {
                    const nextGene = oldGeneration[idx + 1];
                    let children;
                    if (nextGene){
                        children = gene.reproduce(nextGene).map((child) => {
                            child.vulnerability = this.probe(child.code);
                            return child;
                        });
                        res.push(...children);
                    }
                    return res
                }, []);
                this.generations.push(newGeneration);
                if (newGeneration.minVulnerability === this.minVulnerability && stopOnMinimum){
                    this.minVulnerableGene = newGeneration.minVulnerableSample;
                }
                return this.minVulnerableGene ? this : this.breed(maxGenerations - 1);
            }
            findRelativeMin(){
                let mvs;
                this.generations.forEach((gnr) => {
                    const sample = gnr.minVulnerableSample;
                    if (!mvs || mvs.vulnerability > sample.vulnerability){
                        mvs = sample;
                    }
                });
                return mvs;
            }
        }

        this.getGene = (code) => {
            return new Gene(code);
        };
        this.getGeneration = (size) => {
            return new Generation(size);
        };
        this.getPopulation = (config) => {
            return new Population(config);
        }
    }
};