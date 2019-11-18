/**
 * Created by User on 16.05.17.
 */

const angularResourceUtil = require('webpack-angular-resource-plugin');
// STYLES

angularResourceUtil.requireAll(require.context("./components/", true, /.css$/));
angularResourceUtil.requireAll(require.context("./../css/", true, /.css$/));

const vrp = require('./app.js');

const contextConstants = require.context('./constants/', true, /.+\.js$/);
contextConstants.keys().map(function (key) { contextConstants.apply(null, [key])(vrp) });

const contextControllers = require.context('./controllers/', true, /.+\.js$/);
contextControllers.keys().map(function (key) { contextControllers.apply(null, [key])(vrp) });

const contextDirectives = require.context('./directives/', true, /.+\.js$/);
contextDirectives.keys().map(function (key) { contextDirectives.apply(null, [key])(vrp) });

const contextServices = require.context('./services/', true, /.+\.js$/);
contextServices.keys().map(function (key) { contextServices.apply(null, [key])(vrp) });

const contextComponents = require.context('./components/', true, /.+\.js$/);
contextComponents.keys().map(function (key) { contextComponents.apply(null, [key])(vrp) });






