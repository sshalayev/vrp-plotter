module.exports = (vrp) => {
    vrp.directive('dbscan', dbscanDirective);
    dbscanDirective.$inject = [];

    function dbscanDirective(){
        return {
            restrict: 'E',
            scope: {},
            template: require('./dbscan-tpl.html'),
            bindToController: true,
            controller: 'DbscanController',
            controllerAs: 'ctrl'
        }
    }

    vrp.controller('DbscanController', DbscanController);
    DbscanController.$inject = ['$scope','$timeout', '$dbscan', '$colordef', 'pointFactory'];

    function DbscanController($scope, $timeout, $dbscan, $colordef, pointFactory){
        const STYLES = ['red-back', 'blue-back', 'orange-back', 'lime-back', 'purple-back', 'aqua-back', 'yellow-back', 'green-back', 'pink-back', 'cyan-back'];
        const COLORS = ['#F44336', '#2196F3', '#FF9800', '#8BC34A', '#9C27B0', '#009688', '#FFC107', '#4CAF50', '#E91E63', '#00BCD4'];
        this.pointCount = 100;
        this.randomPoints = true;
        this.rawPoints = null;
        this.clusterStyleMap = Immutable.Map().asMutable();
        this.style = getItem(STYLES);

        this.points = [];
        this.clusters = [];

        this.resetPoints = () => {
            const pointsElem = $('.dbs-point-container');
            if (this.randomPoints){
                this.points = pointFactory.getRandomPoints(this.pointCount, pointsElem.width(), pointsElem.height());
            } else {
                this.points = this.rawPoints.split('\n').map((pair) => pointFactory.getPoint(...pair.trim().split(',').map(v => parseInt(v))))
            }
            $scope.$applyAsync();
        };

        this.resetClusters = () => {
            this.clusterStyleMap.forEach((className) => {
                $('.dbs-point').removeClass(className);
            });
            this.clusterStyleMap.clear();
            this.clusters = $dbscan.cluster(this.points, 5).filter((cluster) => cluster.getPoints().length > 1);
            console.log(this.clusters)
            this.clusters.forEach((cluster) => {
                const className = this.style.next().value;
                this.clusterStyleMap.set(cluster, className);
                $timeout(() => {
                    cluster.getPoints().forEach((pt) => {
                        const elem = document.getElementById(pt.toString());
                        $(elem).addClass(className);
                    })
                }, 100);
            })
        };

        function* getItem(list){
            let i = 0;
            while(true){
                yield list[(i++ % list.length)]
            }
        }
    }
};