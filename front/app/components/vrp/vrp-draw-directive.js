module.exports = function(vrp) {
    vrp.directive('vrpDraw', vrpDrawDirective);
    vrpDrawDirective.$inject = [];

    function vrpDrawDirective() {
        return {
            restrict: 'E',
            scope: {},
            template: require('./vrp-draw-tpl.html'),
            bindToController: true,
            controller: 'VrpDrawController',
            controllerAs: 'ctrl'
        };
    }

    vrp.controller('VrpDrawController', VrpDrawController);
    VrpDrawController.$inject = ['$scope', '$element', 'vrpPlotter'];

    function VrpDrawController($scope, $element, vrpPlotter) {
        const vrpElem = $('.vrp-point-container');

        this.vrpData = null;
        this.filters = {
            showDist: false,
            showCapDemand: false
        };
        this.plotter = vrpPlotter.getInstance(vrpElem);

        $scope.$watch('ctrl.filters.showDist', (nval) => {
            $('.vrp-distance').toggleClass('vrp-point-hidden', !nval);
        });

        $scope.$watch('ctrl.filters.showCapDemand', (nval) => {
            $('.vrp-capacity').toggleClass('vrp-point-hidden', !nval);
        });

        this.plotVRP = () => {
            if (!this.vrpData){
                return;
            }
            const vrp = JSON.parse(this.vrpData);
            if (!this.plotter.vrp){
                this.plotter.setVRP(vrp);
            }
            this.plotter.plotVRP();
        };

        this.plotSolution = () => {
            if (!this.vrpData){
                return;
            }
            const vrp = JSON.parse(this.vrpData);
            if (!this.plotter.vrp){
                this.plotter.setVRP(vrp);
            }
            this.plotter.plotSolution();
        };
    }
};