/**
 * Created by pastor on 6/25/2016.
 */
module.exports = function(vrp) {
    vrp.directive('apMdColor', apMdColorDirective);
    apMdColorDirective.$inject = ['$mdTheming', '$mdColorPalette', '$colordef'];
    function apMdColorDirective($mdTheming, $mdColorPalette, $colordef) {
        return {
            restrict: 'A',
            //scope: {
            //    mdColor: '=apMdColor'
            //},
            link: link
        };

        function link(scope, element, attrs) {
            var style = {};
            //console.log($mdColorPalette);
            //console.log($mdTheming.THEMES.default);
            var color = scope.$eval(attrs.apMdColor);

            angular.forEach(color, function (value, key) {
                style[key] = $colordef.getColor(value);
            });

            element.css(style);
        }
    }
};
