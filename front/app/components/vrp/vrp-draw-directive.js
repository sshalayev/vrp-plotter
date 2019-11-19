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
    VrpDrawController.$inject = ['$scope', '$element', 'vrpPlotter', 'apiRequest'];

    function VrpDrawController($scope, $element, vrpPlotter, apiRequest) {
        const vrpElem = $('.vrp-point-container');
        const setRequest = apiRequest.getInstance({
            url: '/api/vrp',
            method: 'GET'
        });
        const listRequest = apiRequest.getInstance({
            url: '/api/vrp/:set',
            method: 'GET',
            paramSerializer: 'tplQuerySerializer'
        });
        const solutionRequest = apiRequest.getInstance({
            url: '/api/vrp/:set/:solution',
            method: 'GET',
            paramSerializer: 'tplQuerySerializer'
        });
        const summaryRequest = apiRequest.getInstance({
            url: '/api/vrp/all/:folder',
            method: 'GET',
            paramSerializer: 'tplQuerySerializer'
        });

        this.vrpData = null;
        this.solutionSets = [];
        this.solutionList = [];
        this.solutionListLoading = false;
        this.filters = {
            showDist: false,
            showCapDemand: false,
            showCustomSolutionInput: false
        };
        this.selectedSet = null;
        this.selectedSolution = null;
        this.routes = [];
        this.plotter = vrpPlotter.getInstance(vrpElem);

        setRequest.send().then((resp) => {
            this.solutionSets = resp.data.slice();
        });
        summaryRequest.send({folder: '2000-2'}).then((resp) => {
            console.log(resp.data);
        });

        $scope.$watch('ctrl.filters.showDist', (nval) => {
            $('.vrp-distance').toggleClass('vrp-point-hidden', !nval);
        });

        $scope.$watch('ctrl.filters.showCapDemand', (nval) => {
            $('.vrp-capacity').toggleClass('vrp-point-hidden', !nval);
        });

        this.handleSetChange = () => {
            listRequest.send({set: this.selectedSet}).then((resp) => {
                this.solutionList = resp.data.slice();
            })
        };

        this.handleSolutionChange = () => {
            solutionRequest.send({set: this.selectedSet, solution: this.selectedSolution}).then((resp) => {
                if (resp.data){
                    this.routes = [];
                    this.plotter
                        .reset()
                        .setVRP(resp.data)
                        .plotVRP();
                }
            })
        };

        this.plotVRP = () => {
            if (!this.vrpData && !this.plotter.vrp){
                return;
            }
            if (this.vrpData){
                const vrp = JSON.parse(this.vrpData);
                this.plotter.reset().setVRP(vrp);
            }
            this.plotter.plotVRP();
        };

        this.plotSolution = () => {
            if (!this.vrpData && !this.plotter.vrp){
                return;
            }
            if (this.vrpData){
                const vrp = JSON.parse(this.vrpData);
                this.plotter.reset().setVRP(vrp);
            }
            this.routes = [...this.plotter.routes.values()];
            console.log(this.routes.reduce((res, item) => res + item.distance, 0))
            this.plotter.plotSolution();
        };
    }
};