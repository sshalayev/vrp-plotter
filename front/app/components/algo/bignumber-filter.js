module.exports = function(vrp){
    vrp.filter('bignumber', bignumberFilter);
    vrp.filter('pownumber', pownumberFilter);
    function bignumberFilter(){
        return (val) => {
            return math.format(val, {lowerExp: -300, upperExp: 300})
        }
    }
    function pownumberFilter(){
        return (val) => {
            const parts = math.format(val, {lowerExp: -2, upperExp: 2, precision: 3}).split('e+');
            let result = '~' + parts[0];
            if (parts[1]){
                result += ` x 10^${parts[1]}`
            }
            return result;
        }
    }
};