const fs = require('fs');
const npath = require('path');
const {Map: ImmMap} = require('immutable');
const resourcePath = npath.join(__dirname, './../resources');

exports.getSet = async (req, res) => {
    try {
        const data = await getSolutionSets();
        res.status(200).send(data)
    } catch(err){
        console.warn(err);
        res.status(400).send(err);
    }

};

exports.getList = async (req, res) => {
    try {
        const sset = req.params ? req.params.solution_set : await getSolutionSets()[0];
        const data = await getSolutionList(sset);
        res.status(200).send(data.map((fname) => fname.slice(0, -5)))
    } catch(err){
        console.warn(err);
        res.status(400).send(err);
    }
};

exports.getSolution = async (req, res) => {
    const {solution_set: sset, solution_name: sname} = req.params;
    if (!sset || !sname){
        return res.status(400).send({message: 'Missing solution name'})
    }
    try {
        const data = await getSolution(sset, sname + '.json');
        res.status(200).send(data.vrp)
    } catch(err){
        console.warn(err);
        res.status(400).send(err);
    }
};

exports.getSetSummary = async (req, res) => {
    try {
        const sset = req.params ? req.params.folder : await getSolutionSets()[0];
        const data = await getSetSummary(sset);
        res.status(200).send(data)
    } catch(err){
        console.warn(err);
        res.status(400).send(err);
    }
};

exports.getFullSummary = async (req, res) => {
    try {
        const data = await getFullSummary();
        res.status(200).send(data)
    } catch(err){
        console.warn(err);
        res.status(400).send(err);
    }
};

function getSolutionSets(){
    return fs.promises.readdir(resourcePath, {withFileTypes: true}).then((delist) => {
        return delist.filter((de) => de.isDirectory()).map((de) => de.name)
    })
}

function getSolutionList(setName){
    const setPath = npath.join(resourcePath, setName);
    return fs.promises.readdir(setPath, {withFileTypes: true}).then((delist) => {
        return delist.filter((de) => de.isFile() && de.name.endsWith('.json')).map((de) => de.name)
    })
}

function getSolution(setName, vrpName){
    const vrpPath = npath.join(resourcePath, setName, vrpName);
    return fs.promises.readFile(vrpPath, 'utf8').then((json) => {
        const vrp = JSON.parse(json);
        return {
            vrp,
            cost: vrp.solutions.reduce((res, sol) => sol.cost < res ? sol.cost : res, Number.MAX_VALUE)
        }
    })
}

async function getSetSummary(setName){
    const solutions = await getSolutionList(setName);
    const res = {};
    for(let sname of solutions){
        const solution = await getSolution(setName, sname);
        res[sname.slice(0, -5)] = solution.cost;
    }
    return res;
}

async function getFullSummary(){
    const sets = await getSolutionSets();
    const summaryMap = ImmMap().asMutable();
    for(let sset of sets){
        const summary = await getSetSummary(sset);
        summaryMap.set(sset, summary);
    }
    return summaryMap.toJS()
}