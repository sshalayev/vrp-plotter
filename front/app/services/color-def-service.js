/**
 * Created by pastor on 8/21/2016.
 * Simple service to get css-formatted colors from mdTheming and mdColorPalette's
 * Valid string formats:
 * 'palette::light-blue::A200'
 * 'palette::red::200'
 * 'customTheme::primary'
 * 'customTheme::primary::hue-2'
 * 'warn'
 * 'accent::hue-2'
 */
module.exports = function(vrp) {
    vrp.service('$colordef', colorDefService);
    colorDefService.$inject = ['$mdTheming', '$mdColorPalette'];

    function colorDefService($mdTheming, $mdColorPalette) {
        const intentions = ['primary', 'accent', 'warn', 'background'];

        this.getRGB = (defString) => {
            defString = defString || 'primary';
            const defArray = defString.split('::');
            const colorDef = {};
            let intent;

            if (defArray[0] === 'palette') {
                colorDef.palette = defArray[1];
                colorDef.variant = defArray[2];
            } else {
                if (intentions.indexOf(defArray[0]) > -1) { //defArray[0] !== 'default' ||
                    defArray.unshift('default');
                }
                if (!defArray[2]) {
                    defArray[2] = 'default';
                }
                intent = $mdTheming.THEMES[defArray[0]].colors[defArray[1]];
                colorDef.palette = intent.name;
                colorDef.variant = intent.hues[defArray[2]];
            }
            return $mdColorPalette[colorDef.palette][colorDef.variant].value;
        };
        this.getColor = (defString, opacity = 1) => {
            const resColor = this.getRGB(defString);
            return `rgba(${resColor.join(', ')}, ${opacity})`;
        };
        this.numToColor = (num) => {
            return this.numToRgba(num).map((rgba) => this.rgbaToCSS(rgba));
        };
        this.numToRgba = (num) => {
            if (!num){
                return [[0, 0, 0, 0.12], [0, 0, 0, 0.78]]
            }
            const shades = [500, 400, 600, 300, 700];
            const palettes = Object.keys($mdColorPalette);
            const code = num.toString(10).padStart(5, '0');
            const main = palettes[parseInt(code.slice(-2)) % palettes.length];
            const shade = shades[parseInt(code.slice(0, -2)) % shades.length].toString();
            return [$mdColorPalette[main][shade].value.concat([1]), $mdColorPalette[main][shade].contrast.slice()]
        };
        this.rgbaToCSS = (arr) => {
            return `rgba(${arr.join()})`
        }
    }
};

