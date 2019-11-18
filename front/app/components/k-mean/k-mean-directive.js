module.exports = (vrp) => {
    vrp.directive('kMean', kMeanDirective);
    kMeanDirective.$inject = [];

    function kMeanDirective(){
        return {
            restrict: 'E',
            scope: {},
            template: require('./k-mean-tpl.html'),
            bindToController: true,
            controller: 'KMeanController',
            controllerAs: 'ctrl'
        }
    }

    vrp.controller('KMeanController', KMeanController);
    KMeanController.$inject = ['$kmean', '$colordef'];

    function KMeanController($kmean, $colordef){
        this.pointCount = 100;
        this.clusterCount = 3;
        this.mapWidth = 640;
        this.mapHeight = 480;
        this.kmean = $kmean.getInstance(this.pointCount, this.clusterCount, this.mapWidth, this.mapHeight);
        this.colors = ['#F44336', '#2196F3', '#FF9800', '#8BC34A', '#9C27B0', '#009688', '#FFC107', '#4CAF50', '#E91E63', '#00BCD4'];

        this.resetClusters = () => {
            this.kmean && this.kmean.resetAllClusters();
        };

        this.runClusteringStep = () => {
            this.kmean && this.kmean.clusteringStep()
        };

        this.rebuild = () => {
            this.kmean = $kmean.getInstance(this.pointCount, this.clusterCount, this.mapWidth, this.mapHeight);
        }
    }
};