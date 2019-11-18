const angularResourceUtil = require('webpack-angular-resource-plugin');
// STYLES
angularResourceUtil.requireAll(require.context("./node_modules/angular-material/", true, /angular-material\.min\.css$/));

require('expose-loader?$!expose-loader?jQuery!jquery');
require('expose-loader?moment!moment');
require('expose-loader?Guid!guid');
require('expose-loader?Immutable!immutable');
require('expose-loader?math!mathjs');
require('expose-loader?angular!angular');
require('angular-ui-router');
require('angular-messages');
require('angular-aria');
require('angular-animate');
require('angular-sanitize');
require('angular-filter');
require('angular-material');
