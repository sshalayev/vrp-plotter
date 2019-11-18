webpackJsonp([0],{

/***/ 299:
/***/ (function(module, exports) {

module.exports = "<div class=\"algo-container\" layout=\"column\" layout-align=\"start center\" md-theme=\"algo\" ap-md-color=\"{'background-color': 'algo::primary'}\">\r\n    <md-tabs md-border-bottom md-selected=\"vm.activeTabIndex\">\r\n        <md-tab label=\"TSP\">\r\n            <div class=\"algo-wrapper\">\r\n                <route-draw></route-draw>\r\n            </div>\r\n        </md-tab>\r\n        <md-tab label=\"k-Means\">\r\n            <div class=\"algo-wrapper\">\r\n                <k-mean></k-mean>\r\n            </div>\r\n        </md-tab>\r\n        <md-tab label=\"VRP\">\r\n            <div class=\"algo-wrapper\">\r\n                <vrp-draw></vrp-draw>\r\n            </div>\r\n        </md-tab>\r\n    </md-tabs>\r\n</div>\r\n<div>WTF???</div>"

/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by User on 16.05.17.
 */

const angularResourceUtil = __webpack_require__(109);
// STYLES

angularResourceUtil.requireAll(__webpack_require__(750));
angularResourceUtil.requireAll(__webpack_require__(752));

const vrp = __webpack_require__(757);

const contextConstants = __webpack_require__(760);
contextConstants.keys().map(function (key) { contextConstants.apply(null, [key])(vrp) });

const contextControllers = __webpack_require__(763);
contextControllers.keys().map(function (key) { contextControllers.apply(null, [key])(vrp) });

const contextDirectives = __webpack_require__(765);
contextDirectives.keys().map(function (key) { contextDirectives.apply(null, [key])(vrp) });

const contextServices = __webpack_require__(768);
contextServices.keys().map(function (key) { contextServices.apply(null, [key])(vrp) });

const contextComponents = __webpack_require__(776);
contextComponents.keys().map(function (key) { contextComponents.apply(null, [key])(vrp) });








/***/ }),

/***/ 750:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./tsp/route-draw.css": 751
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 750;

/***/ }),

/***/ 751:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 752:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./aggrid.css": 753,
	"./checkio.css": 754,
	"./main.css": 755,
	"./scrollpad.css": 756
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 752;

/***/ }),

/***/ 753:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 754:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 755:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 756:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 757:
/***/ (function(module, exports, __webpack_require__) {


const angular = __webpack_require__(106);
const math = __webpack_require__(237);

math.config({number: 'BigNumber', precision: 64});

const vrp = angular.module('VRPPlotter', [
    __webpack_require__(295),
    __webpack_require__(108),
    __webpack_require__(758),
    __webpack_require__(296),
    __webpack_require__(107),
    __webpack_require__(298),
    __webpack_require__(297)
]);

const algotpl = __webpack_require__(299);
console.log(algotpl);
vrp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$mdThemingProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('red')
            .accentPalette('orange')
            .warnPalette('purple');

        $mdThemingProvider.theme('algo')
            .primaryPalette('blue')
            .accentPalette('orange')
            .warnPalette('pink');

        $urlRouterProvider.otherwise('/algo');

        $stateProvider
            .state("algo", {
                controller: 'RouteController',
                controllerAs: 'vm',
                template: __webpack_require__(299),
                url: "/algo",
                onEnter: function ($rootScope) {
                    $rootScope.pageTitle = 'Routing algorithms demo';
                }
            });
        console.log($stateProvider);
    }]);

vrp.run(
    ['$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;

            $rootScope.$on('$stateChangeSuccess', function (event, to, toParams, from, fromParams) {
                $rootScope.preState = {
                    name: from.name,
                    url: from.url,
                    params: fromParams
                };
                $rootScope.curState = {
                    name: to.name,
                    url: to.url,
                    params: toParams
                };
            });
        }
    ]
);
module.exports = vrp;

/***/ }),

/***/ 758:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(759);
module.exports = 'ngResource';


/***/ }),

/***/ 759:
/***/ (function(module, exports) {

/**
 * @license AngularJS v1.7.8
 * (c) 2010-2018 Google, Inc. http://angularjs.org
 * License: MIT
 */
(function(window, angular) {'use strict';

var $resourceMinErr = angular.$$minErr('$resource');

// Helper functions and regex to lookup a dotted path on an object
// stopping at undefined/null.  The path must be composed of ASCII
// identifiers (just like $parse)
var MEMBER_NAME_REGEX = /^(\.[a-zA-Z_$@][0-9a-zA-Z_$@]*)+$/;

function isValidDottedPath(path) {
  return (path != null && path !== '' && path !== 'hasOwnProperty' &&
      MEMBER_NAME_REGEX.test('.' + path));
}

function lookupDottedPath(obj, path) {
  if (!isValidDottedPath(path)) {
    throw $resourceMinErr('badmember', 'Dotted member path "@{0}" is invalid.', path);
  }
  var keys = path.split('.');
  for (var i = 0, ii = keys.length; i < ii && angular.isDefined(obj); i++) {
    var key = keys[i];
    obj = (obj !== null) ? obj[key] : undefined;
  }
  return obj;
}

/**
 * Create a shallow copy of an object and clear other fields from the destination
 */
function shallowClearAndCopy(src, dst) {
  dst = dst || {};

  angular.forEach(dst, function(value, key) {
    delete dst[key];
  });

  for (var key in src) {
    if (src.hasOwnProperty(key) && !(key.charAt(0) === '$' && key.charAt(1) === '$')) {
      dst[key] = src[key];
    }
  }

  return dst;
}

/**
 * @ngdoc module
 * @name ngResource
 * @description
 *
 * The `ngResource` module provides interaction support with RESTful services
 * via the $resource service.
 *
 * See {@link ngResource.$resourceProvider} and {@link ngResource.$resource} for usage.
 */

/**
 * @ngdoc provider
 * @name $resourceProvider
 *
 * @description
 *
 * Use `$resourceProvider` to change the default behavior of the {@link ngResource.$resource}
 * service.
 *
 * ## Dependencies
 * Requires the {@link ngResource } module to be installed.
 *
 */

/**
 * @ngdoc service
 * @name $resource
 * @requires $http
 * @requires ng.$log
 * @requires $q
 * @requires ng.$timeout
 *
 * @description
 * A factory which creates a resource object that lets you interact with
 * [RESTful](http://en.wikipedia.org/wiki/Representational_State_Transfer) server-side data sources.
 *
 * The returned resource object has action methods which provide high-level behaviors without
 * the need to interact with the low level {@link ng.$http $http} service.
 *
 * Requires the {@link ngResource `ngResource`} module to be installed.
 *
 * By default, trailing slashes will be stripped from the calculated URLs,
 * which can pose problems with server backends that do not expect that
 * behavior.  This can be disabled by configuring the `$resourceProvider` like
 * this:
 *
 * ```js
     app.config(['$resourceProvider', function($resourceProvider) {
       // Don't strip trailing slashes from calculated URLs
       $resourceProvider.defaults.stripTrailingSlashes = false;
     }]);
 * ```
 *
 * @param {string} url A parameterized URL template with parameters prefixed by `:` as in
 *   `/user/:username`. If you are using a URL with a port number (e.g.
 *   `http://example.com:8080/api`), it will be respected.
 *
 *   If you are using a url with a suffix, just add the suffix, like this:
 *   `$resource('http://example.com/resource.json')` or `$resource('http://example.com/:id.json')`
 *   or even `$resource('http://example.com/resource/:resource_id.:format')`
 *   If the parameter before the suffix is empty, :resource_id in this case, then the `/.` will be
 *   collapsed down to a single `.`.  If you need this sequence to appear and not collapse then you
 *   can escape it with `/\.`.
 *
 * @param {Object=} paramDefaults Default values for `url` parameters. These can be overridden in
 *   `actions` methods. If a parameter value is a function, it will be called every time
 *   a param value needs to be obtained for a request (unless the param was overridden). The
 *   function will be passed the current data value as an argument.
 *
 *   Each key value in the parameter object is first bound to url template if present and then any
 *   excess keys are appended to the url search query after the `?`.
 *
 *   Given a template `/path/:verb` and parameter `{verb: 'greet', salutation: 'Hello'}` results in
 *   URL `/path/greet?salutation=Hello`.
 *
 *   If the parameter value is prefixed with `@`, then the value for that parameter will be
 *   extracted from the corresponding property on the `data` object (provided when calling actions
 *   with a request body).
 *   For example, if the `defaultParam` object is `{someParam: '@someProp'}` then the value of
 *   `someParam` will be `data.someProp`.
 *   Note that the parameter will be ignored, when calling a "GET" action method (i.e. an action
 *   method that does not accept a request body).
 *
 * @param {Object.<Object>=} actions Hash with declaration of custom actions that will be available
 *   in addition to the default set of resource actions (see below). If a custom action has the same
 *   key as a default action (e.g. `save`), then the default action will be *overwritten*, and not
 *   extended.
 *
 *   The declaration should be created in the format of {@link ng.$http#usage $http.config}:
 *
 *       {
 *         action1: {method:?, params:?, isArray:?, headers:?, ...},
 *         action2: {method:?, params:?, isArray:?, headers:?, ...},
 *         ...
 *       }
 *
 *   Where:
 *
 *   - **`action`** – {string} – The name of action. This name becomes the name of the method on
 *     your resource object.
 *   - **`method`** – {string} – Case insensitive HTTP method (e.g. `GET`, `POST`, `PUT`,
 *     `DELETE`, `JSONP`, etc).
 *   - **`params`** – {Object=} – Optional set of pre-bound parameters for this action. If any of
 *     the parameter value is a function, it will be called every time when a param value needs to
 *     be obtained for a request (unless the param was overridden). The function will be passed the
 *     current data value as an argument.
 *   - **`url`** – {string} – Action specific `url` override. The url templating is supported just
 *     like for the resource-level urls.
 *   - **`isArray`** – {boolean=} – If true then the returned object for this action is an array,
 *     see `returns` section.
 *   - **`transformRequest`** –
 *     `{function(data, headersGetter)|Array.<function(data, headersGetter)>}` –
 *     Transform function or an array of such functions. The transform function takes the http
 *     request body and headers and returns its transformed (typically serialized) version.
 *     By default, transformRequest will contain one function that checks if the request data is
 *     an object and serializes it using `angular.toJson`. To prevent this behavior, set
 *     `transformRequest` to an empty array: `transformRequest: []`
 *   - **`transformResponse`** –
 *     `{function(data, headersGetter, status)|Array.<function(data, headersGetter, status)>}` –
 *     Transform function or an array of such functions. The transform function takes the HTTP
 *     response body, headers and status and returns its transformed (typically deserialized)
 *     version.
 *     By default, transformResponse will contain one function that checks if the response looks
 *     like a JSON string and deserializes it using `angular.fromJson`. To prevent this behavior,
 *     set `transformResponse` to an empty array: `transformResponse: []`
 *   - **`cache`** – `{boolean|Cache}` – A boolean value or object created with
 *     {@link ng.$cacheFactory `$cacheFactory`} to enable or disable caching of the HTTP response.
 *     See {@link $http#caching $http Caching} for more information.
 *   - **`timeout`** – `{number}` – Timeout in milliseconds.<br />
 *     **Note:** In contrast to {@link ng.$http#usage $http.config}, {@link ng.$q promises} are
 *     **not** supported in `$resource`, because the same value would be used for multiple requests.
 *     If you are looking for a way to cancel requests, you should use the `cancellable` option.
 *   - **`cancellable`** – `{boolean}` – If true, the request made by a "non-instance" call will be
 *     cancelled (if not already completed) by calling `$cancelRequest()` on the call's return
 *     value. Calling `$cancelRequest()` for a non-cancellable or an already completed/cancelled
 *     request will have no effect.
 *   - **`withCredentials`** – `{boolean}` – Whether to set the `withCredentials` flag on the
 *     XHR object. See
 *     [XMLHttpRequest.withCredentials](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/withCredentials)
 *     for more information.
 *   - **`responseType`** – `{string}` – See
 *     [XMLHttpRequest.responseType](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/responseType).
 *   - **`interceptor`** – `{Object=}` – The interceptor object has four optional methods -
 *     `request`, `requestError`, `response`, and `responseError`. See
 *     {@link ng.$http#interceptors $http interceptors} for details. Note that
 *     `request`/`requestError` interceptors are applied before calling `$http`, thus before any
 *     global `$http` interceptors. Also, rejecting or throwing an error inside the `request`
 *     interceptor will result in calling the `responseError` interceptor.
 *     The resource instance or collection is available on the `resource` property of the
 *     `http response` object passed to `response`/`responseError` interceptors.
 *     Keep in mind that the associated promise will be resolved with the value returned by the
 *     response interceptors. Make sure you return an appropriate value and not the `response`
 *     object passed as input. For reference, the default `response` interceptor (which gets applied
 *     if you don't specify a custom one) returns `response.resource`.<br />
 *     See {@link ngResource.$resource#using-interceptors below} for an example of using
 *     interceptors in `$resource`.
 *   - **`hasBody`** – `{boolean}` – If true, then the request will have a body.
 *     If not specified, then only POST, PUT and PATCH requests will have a body. *
 * @param {Object} options Hash with custom settings that should extend the
 *   default `$resourceProvider` behavior.  The supported options are:
 *
 *   - **`stripTrailingSlashes`** – {boolean} – If true then the trailing
 *   slashes from any calculated URL will be stripped. (Defaults to true.)
 *   - **`cancellable`** – {boolean} – If true, the request made by a "non-instance" call will be
 *   cancelled (if not already completed) by calling `$cancelRequest()` on the call's return value.
 *   This can be overwritten per action. (Defaults to false.)
 *
 * @returns {Object} A resource "class" object with methods for the default set of resource actions
 *   optionally extended with custom `actions`. The default set contains these actions:
 *   ```js
 *   {
 *     'get':    {method: 'GET'},
 *     'save':   {method: 'POST'},
 *     'query':  {method: 'GET', isArray: true},
 *     'remove': {method: 'DELETE'},
 *     'delete': {method: 'DELETE'}
 *   }
 *   ```
 *
 *   Calling these methods invoke {@link ng.$http} with the specified http method, destination and
 *   parameters. When the data is returned from the server then the object is an instance of the
 *   resource class. The actions `save`, `remove` and `delete` are available on it as methods with
 *   the `$` prefix. This allows you to easily perform CRUD operations (create, read, update,
 *   delete) on server-side data like this:
 *   ```js
 *   var User = $resource('/user/:userId', {userId: '@id'});
 *   User.get({userId: 123}).$promise.then(function(user) {
 *     user.abc = true;
 *     user.$save();
 *   });
 *   ```
 *
 *   It is important to realize that invoking a `$resource` object method immediately returns an
 *   empty reference (object or array depending on `isArray`). Once the data is returned from the
 *   server the existing reference is populated with the actual data. This is a useful trick since
 *   usually the resource is assigned to a model which is then rendered by the view. Having an empty
 *   object results in no rendering, once the data arrives from the server then the object is
 *   populated with the data and the view automatically re-renders itself showing the new data. This
 *   means that in most cases one never has to write a callback function for the action methods.
 *
 *   The action methods on the class object or instance object can be invoked with the following
 *   parameters:
 *
 *   - "class" actions without a body: `Resource.action([parameters], [success], [error])`
 *   - "class" actions with a body: `Resource.action([parameters], postData, [success], [error])`
 *   - instance actions: `instance.$action([parameters], [success], [error])`
 *
 *
 *   When calling instance methods, the instance itself is used as the request body (if the action
 *   should have a body). By default, only actions using `POST`, `PUT` or `PATCH` have request
 *   bodies, but you can use the `hasBody` configuration option to specify whether an action
 *   should have a body or not (regardless of its HTTP method).
 *
 *
 *   Success callback is called with (value (Object|Array), responseHeaders (Function),
 *   status (number), statusText (string)) arguments, where `value` is the populated resource
 *   instance or collection object. The error callback is called with (httpResponse) argument.
 *
 *   Class actions return an empty instance (with the additional properties listed below).
 *   Instance actions return a promise for the operation.
 *
 *   The Resource instances and collections have these additional properties:
 *
 *   - `$promise`: The {@link ng.$q promise} of the original server interaction that created this
 *     instance or collection.
 *
 *     On success, the promise is resolved with the same resource instance or collection object,
 *     updated with data from server. This makes it easy to use in the
 *     {@link ngRoute.$routeProvider `resolve` section of `$routeProvider.when()`} to defer view
 *     rendering until the resource(s) are loaded.
 *
 *     On failure, the promise is rejected with the {@link ng.$http http response} object.
 *
 *     If an interceptor object was provided, the promise will instead be resolved with the value
 *     returned by the response interceptor (on success) or responceError interceptor (on failure).
 *
 *   - `$resolved`: `true` after first server interaction is completed (either with success or
 *      rejection), `false` before that. Knowing if the Resource has been resolved is useful in
 *      data-binding. If there is a response/responseError interceptor and it returns a promise,
 *      `$resolved` will wait for that too.
 *
 *   The Resource instances and collections have these additional methods:
 *
 *   - `$cancelRequest`: If there is a cancellable, pending request related to the instance or
 *      collection, calling this method will abort the request.
 *
 *   The Resource instances have these additional methods:
 *
 *   - `toJSON`: It returns a simple object without any of the extra properties added as part of
 *     the Resource API. This object can be serialized through {@link angular.toJson} safely
 *     without attaching AngularJS-specific fields. Notice that `JSON.stringify` (and
 *     `angular.toJson`) automatically use this method when serializing a Resource instance
 *     (see [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON%28%29_behavior)).
 *
 * @example
 *
 * ### Basic usage
 *
   ```js
     // Define a CreditCard class
     var CreditCard = $resource('/users/:userId/cards/:cardId',
       {userId: 123, cardId: '@id'}, {
         charge: {method: 'POST', params: {charge: true}}
       });

     // We can retrieve a collection from the server
     var cards = CreditCard.query();
         // GET: /users/123/cards
         // server returns: [{id: 456, number: '1234', name: 'Smith'}]

     // Wait for the request to complete
     cards.$promise.then(function() {
       var card = cards[0];

       // Each item is an instance of CreditCard
       expect(card instanceof CreditCard).toEqual(true);

       // Non-GET methods are mapped onto the instances
       card.name = 'J. Smith';
       card.$save();
           // POST: /users/123/cards/456 {id: 456, number: '1234', name: 'J. Smith'}
           // server returns: {id: 456, number: '1234', name: 'J. Smith'}

       // Our custom method is mapped as well (since it uses POST)
       card.$charge({amount: 9.99});
           // POST: /users/123/cards/456?amount=9.99&charge=true {id: 456, number: '1234', name: 'J. Smith'}
     });

     // We can create an instance as well
     var newCard = new CreditCard({number: '0123'});
     newCard.name = 'Mike Smith';

     var savePromise = newCard.$save();
         // POST: /users/123/cards {number: '0123', name: 'Mike Smith'}
         // server returns: {id: 789, number: '0123', name: 'Mike Smith'}

     savePromise.then(function() {
       // Once the promise is resolved, the created instance
       // is populated with the data returned by the server
       expect(newCard.id).toEqual(789);
     });
   ```
 *
 * The object returned from a call to `$resource` is a resource "class" which has one "static"
 * method for each action in the definition.
 *
 * Calling these methods invokes `$http` on the `url` template with the given HTTP `method`,
 * `params` and `headers`.
 *
 * @example
 *
 * ### Accessing the response
 *
 * When the data is returned from the server then the object is an instance of the resource type and
 * all of the non-GET methods are available with `$` prefix. This allows you to easily support CRUD
 * operations (create, read, update, delete) on server-side data.
 *
   ```js
     var User = $resource('/users/:userId', {userId: '@id'});
     User.get({userId: 123}).$promise.then(function(user) {
       user.abc = true;
       user.$save();
     });
   ```
 *
 * It's worth noting that the success callback for `get`, `query` and other methods gets called with
 * the resource instance (populated with the data that came from the server) as well as an `$http`
 * header getter function, the HTTP status code and the response status text. So one could rewrite
 * the above example and get access to HTTP headers as follows:
 *
   ```js
     var User = $resource('/users/:userId', {userId: '@id'});
     User.get({userId: 123}, function(user, getResponseHeaders) {
       user.abc = true;
       user.$save(function(user, putResponseHeaders) {
         // `user` => saved `User` object
         // `putResponseHeaders` => `$http` header getter
       });
     });
   ```
 *
 * @example
 *
 * ### Creating custom actions
 *
 * In this example we create a custom method on our resource to make a PUT request:
 *
   ```js
      var app = angular.module('app', ['ngResource']);

      // Some APIs expect a PUT request in the format URL/object/ID
      // Here we are creating an 'update' method
      app.factory('Notes', ['$resource', function($resource) {
        return $resource('/notes/:id', {id: '@id'}, {
          update: {method: 'PUT'}
        });
      }]);

      // In our controller we get the ID from the URL using `$location`
      app.controller('NotesCtrl', ['$location', 'Notes', function($location, Notes) {
        // First, retrieve the corresponding `Note` object from the server
        // (Assuming a URL of the form `.../notes?id=XYZ`)
        var noteId = $location.search().id;
        var note = Notes.get({id: noteId});

        note.$promise.then(function() {
          note.content = 'Hello, world!';

          // Now call `update` to save the changes on the server
          Notes.update(note);
              // This will PUT /notes/ID with the note object as the request payload

          // Since `update` is a non-GET method, it will also be available on the instance
          // (prefixed with `$`), so we could replace the `Note.update()` call with:
          //note.$update();
        });
      }]);
   ```
 *
 * @example
 *
 * ### Cancelling requests
 *
 * If an action's configuration specifies that it is cancellable, you can cancel the request related
 * to an instance or collection (as long as it is a result of a "non-instance" call):
 *
   ```js
     // ...defining the `Hotel` resource...
     var Hotel = $resource('/api/hotels/:id', {id: '@id'}, {
       // Let's make the `query()` method cancellable
       query: {method: 'get', isArray: true, cancellable: true}
     });

     // ...somewhere in the PlanVacationController...
     ...
     this.onDestinationChanged = function onDestinationChanged(destination) {
       // We don't care about any pending request for hotels
       // in a different destination any more
       if (this.availableHotels) {
         this.availableHotels.$cancelRequest();
       }

       // Let's query for hotels in `destination`
       // (calls: /api/hotels?location=<destination>)
       this.availableHotels = Hotel.query({location: destination});
     };
   ```
 *
 * @example
 *
 * ### Using interceptors
 *
 * You can use interceptors to transform the request or response, perform additional operations, and
 * modify the returned instance/collection. The following example, uses `request` and `response`
 * interceptors to augment the returned instance with additional info:
 *
   ```js
     var Thing = $resource('/api/things/:id', {id: '@id'}, {
       save: {
         method: 'POST',
         interceptor: {
           request: function(config) {
             // Before the request is sent out, store a timestamp on the request config
             config.requestTimestamp = Date.now();
             return config;
           },
           response: function(response) {
             // Get the instance from the response object
             var instance = response.resource;

             // Augment the instance with a custom `saveLatency` property, computed as the time
             // between sending the request and receiving the response.
             instance.saveLatency = Date.now() - response.config.requestTimestamp;

             // Return the instance
             return instance;
           }
         }
       }
     });

     Thing.save({foo: 'bar'}).$promise.then(function(thing) {
       console.log('That thing was saved in ' + thing.saveLatency + 'ms.');
     });
   ```
 *
 */
angular.module('ngResource', ['ng']).
  info({ angularVersion: '1.7.8' }).
  provider('$resource', function ResourceProvider() {
    var PROTOCOL_AND_IPV6_REGEX = /^https?:\/\/\[[^\]]*][^/]*/;

    var provider = this;

    /**
     * @ngdoc property
     * @name $resourceProvider#defaults
     * @description
     * Object containing default options used when creating `$resource` instances.
     *
     * The default values satisfy a wide range of usecases, but you may choose to overwrite any of
     * them to further customize your instances. The available properties are:
     *
     * - **stripTrailingSlashes** – `{boolean}` – If true, then the trailing slashes from any
     *   calculated URL will be stripped.<br />
     *   (Defaults to true.)
     * - **cancellable** – `{boolean}` – If true, the request made by a "non-instance" call will be
     *   cancelled (if not already completed) by calling `$cancelRequest()` on the call's return
     *   value. For more details, see {@link ngResource.$resource}. This can be overwritten per
     *   resource class or action.<br />
     *   (Defaults to false.)
     * - **actions** - `{Object.<Object>}` - A hash with default actions declarations. Actions are
     *   high-level methods corresponding to RESTful actions/methods on resources. An action may
     *   specify what HTTP method to use, what URL to hit, if the return value will be a single
     *   object or a collection (array) of objects etc. For more details, see
     *   {@link ngResource.$resource}. The actions can also be enhanced or overwritten per resource
     *   class.<br />
     *   The default actions are:
     *   ```js
     *   {
     *     get: {method: 'GET'},
     *     save: {method: 'POST'},
     *     query: {method: 'GET', isArray: true},
     *     remove: {method: 'DELETE'},
     *     delete: {method: 'DELETE'}
     *   }
     *   ```
     *
     * #### Example
     *
     * For example, you can specify a new `update` action that uses the `PUT` HTTP verb:
     *
     * ```js
     *   angular.
     *     module('myApp').
     *     config(['$resourceProvider', function ($resourceProvider) {
     *       $resourceProvider.defaults.actions.update = {
     *         method: 'PUT'
     *       };
     *     }]);
     * ```
     *
     * Or you can even overwrite the whole `actions` list and specify your own:
     *
     * ```js
     *   angular.
     *     module('myApp').
     *     config(['$resourceProvider', function ($resourceProvider) {
     *       $resourceProvider.defaults.actions = {
     *         create: {method: 'POST'},
     *         get:    {method: 'GET'},
     *         getAll: {method: 'GET', isArray:true},
     *         update: {method: 'PUT'},
     *         delete: {method: 'DELETE'}
     *       };
     *     });
     * ```
     *
     */
    this.defaults = {
      // Strip slashes by default
      stripTrailingSlashes: true,

      // Make non-instance requests cancellable (via `$cancelRequest()`)
      cancellable: false,

      // Default actions configuration
      actions: {
        'get': {method: 'GET'},
        'save': {method: 'POST'},
        'query': {method: 'GET', isArray: true},
        'remove': {method: 'DELETE'},
        'delete': {method: 'DELETE'}
      }
    };

    this.$get = ['$http', '$log', '$q', '$timeout', function($http, $log, $q, $timeout) {

      var noop = angular.noop,
          forEach = angular.forEach,
          extend = angular.extend,
          copy = angular.copy,
          isArray = angular.isArray,
          isDefined = angular.isDefined,
          isFunction = angular.isFunction,
          isNumber = angular.isNumber,
          encodeUriQuery = angular.$$encodeUriQuery,
          encodeUriSegment = angular.$$encodeUriSegment;

      function Route(template, defaults) {
        this.template = template;
        this.defaults = extend({}, provider.defaults, defaults);
        this.urlParams = {};
      }

      Route.prototype = {
        setUrlParams: function(config, params, actionUrl) {
          var self = this,
            url = actionUrl || self.template,
            val,
            encodedVal,
            protocolAndIpv6 = '';

          var urlParams = self.urlParams = Object.create(null);
          forEach(url.split(/\W/), function(param) {
            if (param === 'hasOwnProperty') {
              throw $resourceMinErr('badname', 'hasOwnProperty is not a valid parameter name.');
            }
            if (!(new RegExp('^\\d+$').test(param)) && param &&
              (new RegExp('(^|[^\\\\]):' + param + '(\\W|$)').test(url))) {
              urlParams[param] = {
                isQueryParamValue: (new RegExp('\\?.*=:' + param + '(?:\\W|$)')).test(url)
              };
            }
          });
          url = url.replace(/\\:/g, ':');
          url = url.replace(PROTOCOL_AND_IPV6_REGEX, function(match) {
            protocolAndIpv6 = match;
            return '';
          });

          params = params || {};
          forEach(self.urlParams, function(paramInfo, urlParam) {
            val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
            if (isDefined(val) && val !== null) {
              if (paramInfo.isQueryParamValue) {
                encodedVal = encodeUriQuery(val, true);
              } else {
                encodedVal = encodeUriSegment(val);
              }
              url = url.replace(new RegExp(':' + urlParam + '(\\W|$)', 'g'), function(match, p1) {
                return encodedVal + p1;
              });
            } else {
              url = url.replace(new RegExp('(/?):' + urlParam + '(\\W|$)', 'g'), function(match,
                  leadingSlashes, tail) {
                if (tail.charAt(0) === '/') {
                  return tail;
                } else {
                  return leadingSlashes + tail;
                }
              });
            }
          });

          // strip trailing slashes and set the url (unless this behavior is specifically disabled)
          if (self.defaults.stripTrailingSlashes) {
            url = url.replace(/\/+$/, '') || '/';
          }

          // Collapse `/.` if found in the last URL path segment before the query.
          // E.g. `http://url.com/id/.format?q=x` becomes `http://url.com/id.format?q=x`.
          url = url.replace(/\/\.(?=\w+($|\?))/, '.');
          // Replace escaped `/\.` with `/.`.
          // (If `\.` comes from a param value, it will be encoded as `%5C.`.)
          config.url = protocolAndIpv6 + url.replace(/\/(\\|%5C)\./, '/.');


          // set params - delegate param encoding to $http
          forEach(params, function(value, key) {
            if (!self.urlParams[key]) {
              config.params = config.params || {};
              config.params[key] = value;
            }
          });
        }
      };


      function resourceFactory(url, paramDefaults, actions, options) {
        var route = new Route(url, options);

        actions = extend({}, provider.defaults.actions, actions);

        function extractParams(data, actionParams) {
          var ids = {};
          actionParams = extend({}, paramDefaults, actionParams);
          forEach(actionParams, function(value, key) {
            if (isFunction(value)) { value = value(data); }
            ids[key] = value && value.charAt && value.charAt(0) === '@' ?
              lookupDottedPath(data, value.substr(1)) : value;
          });
          return ids;
        }

        function defaultResponseInterceptor(response) {
          return response.resource;
        }

        function Resource(value) {
          shallowClearAndCopy(value || {}, this);
        }

        Resource.prototype.toJSON = function() {
          var data = extend({}, this);
          delete data.$promise;
          delete data.$resolved;
          delete data.$cancelRequest;
          return data;
        };

        forEach(actions, function(action, name) {
          var hasBody = action.hasBody === true || (action.hasBody !== false && /^(POST|PUT|PATCH)$/i.test(action.method));
          var numericTimeout = action.timeout;
          var cancellable = isDefined(action.cancellable) ?
              action.cancellable : route.defaults.cancellable;

          if (numericTimeout && !isNumber(numericTimeout)) {
            $log.debug('ngResource:\n' +
                       '  Only numeric values are allowed as `timeout`.\n' +
                       '  Promises are not supported in $resource, because the same value would ' +
                       'be used for multiple requests. If you are looking for a way to cancel ' +
                       'requests, you should use the `cancellable` option.');
            delete action.timeout;
            numericTimeout = null;
          }

          Resource[name] = function(a1, a2, a3, a4) {
            var params = {}, data, onSuccess, onError;

            switch (arguments.length) {
              case 4:
                onError = a4;
                onSuccess = a3;
                // falls through
              case 3:
              case 2:
                if (isFunction(a2)) {
                  if (isFunction(a1)) {
                    onSuccess = a1;
                    onError = a2;
                    break;
                  }

                  onSuccess = a2;
                  onError = a3;
                  // falls through
                } else {
                  params = a1;
                  data = a2;
                  onSuccess = a3;
                  break;
                }
                // falls through
              case 1:
                if (isFunction(a1)) onSuccess = a1;
                else if (hasBody) data = a1;
                else params = a1;
                break;
              case 0: break;
              default:
                throw $resourceMinErr('badargs',
                  'Expected up to 4 arguments [params, data, success, error], got {0} arguments',
                  arguments.length);
            }

            var isInstanceCall = this instanceof Resource;
            var value = isInstanceCall ? data : (action.isArray ? [] : new Resource(data));
            var httpConfig = {};
            var requestInterceptor = action.interceptor && action.interceptor.request || undefined;
            var requestErrorInterceptor = action.interceptor && action.interceptor.requestError ||
              undefined;
            var responseInterceptor = action.interceptor && action.interceptor.response ||
              defaultResponseInterceptor;
            var responseErrorInterceptor = action.interceptor && action.interceptor.responseError ||
              $q.reject;
            var successCallback = onSuccess ? function(val) {
              onSuccess(val, response.headers, response.status, response.statusText);
            } : undefined;
            var errorCallback = onError || undefined;
            var timeoutDeferred;
            var numericTimeoutPromise;
            var response;

            forEach(action, function(value, key) {
              switch (key) {
                default:
                  httpConfig[key] = copy(value);
                  break;
                case 'params':
                case 'isArray':
                case 'interceptor':
                case 'cancellable':
                  break;
              }
            });

            if (!isInstanceCall && cancellable) {
              timeoutDeferred = $q.defer();
              httpConfig.timeout = timeoutDeferred.promise;

              if (numericTimeout) {
                numericTimeoutPromise = $timeout(timeoutDeferred.resolve, numericTimeout);
              }
            }

            if (hasBody) httpConfig.data = data;
            route.setUrlParams(httpConfig,
              extend({}, extractParams(data, action.params || {}), params),
              action.url);

            // Start the promise chain
            var promise = $q.
              resolve(httpConfig).
              then(requestInterceptor).
              catch(requestErrorInterceptor).
              then($http);

            promise = promise.then(function(resp) {
              var data = resp.data;

              if (data) {
                // Need to convert action.isArray to boolean in case it is undefined
                if (isArray(data) !== (!!action.isArray)) {
                  throw $resourceMinErr('badcfg',
                      'Error in resource configuration for action `{0}`. Expected response to ' +
                      'contain an {1} but got an {2} (Request: {3} {4})', name, action.isArray ? 'array' : 'object',
                    isArray(data) ? 'array' : 'object', httpConfig.method, httpConfig.url);
                }
                if (action.isArray) {
                  value.length = 0;
                  forEach(data, function(item) {
                    if (typeof item === 'object') {
                      value.push(new Resource(item));
                    } else {
                      // Valid JSON values may be string literals, and these should not be converted
                      // into objects. These items will not have access to the Resource prototype
                      // methods, but unfortunately there
                      value.push(item);
                    }
                  });
                } else {
                  var promise = value.$promise;     // Save the promise
                  shallowClearAndCopy(data, value);
                  value.$promise = promise;         // Restore the promise
                }
              }

              resp.resource = value;
              response = resp;
              return responseInterceptor(resp);
            }, function(rejectionOrResponse) {
              rejectionOrResponse.resource = value;
              response = rejectionOrResponse;
              return responseErrorInterceptor(rejectionOrResponse);
            });

            promise = promise['finally'](function() {
              value.$resolved = true;
              if (!isInstanceCall && cancellable) {
                value.$cancelRequest = noop;
                $timeout.cancel(numericTimeoutPromise);
                timeoutDeferred = numericTimeoutPromise = httpConfig.timeout = null;
              }
            });

            // Run the `success`/`error` callbacks, but do not let them affect the returned promise.
            promise.then(successCallback, errorCallback);

            if (!isInstanceCall) {
              // we are creating instance / collection
              // - set the initial promise
              // - return the instance / collection
              value.$promise = promise;
              value.$resolved = false;
              if (cancellable) value.$cancelRequest = cancelRequest;

              return value;
            }

            // instance call
            return promise;

            function cancelRequest(value) {
              promise.catch(noop);
              if (timeoutDeferred !== null) {
                timeoutDeferred.resolve(value);
              }
            }
          };


          Resource.prototype['$' + name] = function(params, success, error) {
            if (isFunction(params)) {
              error = success; success = params; params = {};
            }
            var result = Resource[name].call(this, params, this, success, error);
            return result.$promise || result;
          };
        });

        return Resource;
      }

      return resourceFactory;
    }];
  });


})(window, window.angular);


/***/ }),

/***/ 760:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./api-requests.js": 761,
	"./md-constants.js": 762
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 760;

/***/ }),

/***/ 761:
/***/ (function(module, exports) {

module.exports = function(vrp) {
    vrp.constant('apiRequestConfig', {

    });
};


/***/ }),

/***/ 762:
/***/ (function(module, exports) {

/**
 * Created by user on 12.09.2016.
 * Material Design constants
 */
module.exports = function(vrp) {
    vrp.constant('mdConstants', {
        avatarSize: 40,
        paddingSize: 16,
        stdTextColor: 'rgba(0, 0, 0, 0.87)'
    });
};


/***/ }),

/***/ 763:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./route-controller.js": 764
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 763;

/***/ }),

/***/ 764:
/***/ (function(module, exports) {

module.exports = function(vrp) {
    vrp.controller('RouteController', RouteController);
    RouteController.$inject = ['$scope'];

    function RouteController ($scope) {
        this.activeTabIndex = 0;
        console.log('Route Ctrl init')
    }
};

/***/ }),

/***/ 765:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ap-md-color.js": 766,
	"./resizer.js": 767
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 765;

/***/ }),

/***/ 766:
/***/ (function(module, exports) {

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


/***/ }),

/***/ 767:
/***/ (function(module, exports) {

/**
 * Created by user on 22.05.2017.
 */
module.exports = (vrp) => {
    vrp.directive('resizer', resizerDirective);
    resizerDirective.$inject = ['$q', '$timeout', 'resizeSensor'];
    function resizerDirective($q, $timeout, resizeSensor) {
        return {
            restrict: 'A',
            link: link
        };
        function link (scope, element, attrs) {
            const rs = resizeSensor.getInstance(element.parent());
            const offset = parseInt(attrs.resizer, 10) || 0;

            isAttached(element.parent()).then((info) => {
                updateSize(element, info.rect.width, info.rect.height);
                rs.attachResizeEvent(() => {
                    let w, h;
                    try {
                        h = element.parent()[0].offsetHeight;
                        w = element.parent()[0].offsetWidth;
                        console.log(`RS fired: ${w} x ${h}`);
                        if (h && !isNaN(h) && h !== element[0].offsetHeight) {
                            updateSize(element, w, h + offset);
                        }
                    } catch (e) {}
                });
            });
            scope.$on('$destroy', () => {
                rs.detachResizeEvent();
                rs.queue.flush();
            })
        }

        function updateSize (el, w, h) {
            el.removeAttr('style').css({
                'width': w + 'px',
                'height': h + 'px'
            })
        }

        function isAttached (elem, count = 0) {
            let elemRect;
            return $q((resolve) => {
                $timeout(() => {
                    try {
                        elemRect = elem[0].getBoundingClientRect();
                        if ((elemRect.width && elemRect.height) || count > 10000) {
                            resolve({rect: elemRect, count: count});
                        } else {
                            throw 'Element not in DOM yet'
                        }
                    } catch (e) {
                        if (count < 10000) {
                            return isAttached(elem, count + 100);
                        } else {
                            resolve({
                                rect: {width: 0, height: 0},
                                count: count
                            })
                        }
                    }
                }, 100);
            })
        }
    }
}

/***/ }),

/***/ 768:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./api-request-provider.js": 769,
	"./color-def-service.js": 770,
	"./double-service.js": 771,
	"./event-emitter-service.js": 772,
	"./resize-sensor.js": 773,
	"./slash-param-serializer.js": 774,
	"./storage-provider.js": 775
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 768;

/***/ }),

/***/ 769:
/***/ (function(module, exports) {

/*Provider to produce independent instances of API requests.
 * Usage: apiRequestService.byName(name).send(params,data).then()
 * @name: name of config template
 * @params: object to serialize and add to the URL. By default serialized to URL string, but can be overriden with custom service
 *       by setting paramSerializer property in config template. slashParamSerializer converts params to /key1/value1/key2/value2/
 * @data: object passed within request body
 * */
module.exports = function(vrp) {
    vrp.provider('apiRequest', ['apiRequestConfig', function (config) {

        this.$get = ['apiRequestConfig', '$http', '$injector', function (config, $http, $injector) {
            function ApiRequest(obj) {
                angular.extend(this, obj);
            }

            ApiRequest.prototype = {
                baseUrl: '/api/v1',
                send: function (params, data) {
                    params = params || {};
                    data = data || {};

                    //inject param serializer service if property is set
                    if (this.paramSerializer) {
                        this.paramSerializer = $injector.get(this.paramSerializer);
                        this.url += this.paramSerializer(params);
                        params = {};
                    }
                    var config = {
                        method: this.method,
                        headers: {'Content-Type': 'application/json'},
                        url: /^http.+$/.test(this.url) ? this.url : this.baseUrl + this.url,
                        params: angular.extend({}, this.params, params),
                        data: angular.extend({}, this.data, data)
                    };
                    if (this.method == 'GET') {
                        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                    }

                    return $http(config).then(function (response) {
                        return response;
                    });
                }
            };
            /**
             * Create new instance of ApiRequest using config object
             * predefined in constnts
             * @param name {String} Key for config object in constants
             * @returns {*} configured ApiRequest instance
             */
            function byName (name) {
                if (config.hasOwnProperty(name)) {
                    return new ApiRequest(config[name]);
                } else {
                    return false;
                }
            }

            function byCfg (cfg) {
                return new ApiRequest(cfg);
            }

            /**
             * Create new instance of ApiRequest using config object
             * received from server
             * @param request {Object} Request metadata
             * @param request.url {String} '/pmo/reports/empl-load',
             * @param request.method {String} 'POST',
             * @param request.body {Array} list of fields to send in the body,
             * @param request.params {Array} list of fields to be slash-serialized to URL,
             * @param request.query {Array} list of fields to send as url-query
             * @param content {Object} actual data to be included into request
             * @returns {*} prepared config to get ApiRequest instance and store to Redis
             */
            function getConfig (request, content) {
                var httpConfig = {
                    url: request.url + '/',
                    method: request.method
                };

                var parts = request.params
                    .map(function (key) {return content.params[key]})
                    .filter(function (v) {return !!v})
                    .map(function (v) {
                        return encodeURIComponent(v.toString())
                            .replace(/%20/g, '+')
                            .replace(/[\.\*\!\~\(\)]/g, '')
                            .replace(/\%\w{2}/g, '');
                    });

                httpConfig.url += parts.join('/');
                if (content.query) {
                    httpConfig.params = {};
                    angular.forEach(content.query, function(val, key) {
                        if (val instanceof Date) {
                            val = moment(val).format('MM/DD/YYYY');
                        }
                        this[key] = val;
                    }, httpConfig.params);
                }
                httpConfig.data = request.body.reduce(function (obj, val) {
                    obj[val] = content[val];
                    return obj;
                }, {});
                return httpConfig;
            }

            return {
                byName: byName,
                byCfg: byCfg,
                getConfig: getConfig
            }
        }];
    }]);
};


/***/ }),

/***/ 770:
/***/ (function(module, exports) {

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



/***/ }),

/***/ 771:
/***/ (function(module, exports) {

module.exports = (vrp) => {
    vrp.service('$double', doubleService);
    doubleService.$inject = [];

    function doubleService(){
        this.doubleToLongBits = (number, precisionBits = 23, exponentBits = 8) => {
            var bias = Math.pow(2, exponentBits - 1) - 1, minExp = -bias + 1, maxExp = bias, minUnnormExp = minExp - precisionBits,
                status = isNaN(n = parseFloat(number)) || !Number.isFinite(n) ? n : 0,
                exp = 0, len = 2 * bias + 1 + precisionBits + 3, bin = new Array(len),
                signal = (n = status !== 0 ? 0 : n) < 0, n = Math.abs(n), intPart = Math.floor(n), floatPart = n - intPart,
                i, lastBit, rounded, j, result;
            for(i = len; i; bin[--i] = 0);
            for(i = bias + 2; intPart && i; bin[--i] = intPart % 2, intPart = Math.floor(intPart / 2));
            for(i = bias + 1; floatPart > 0 && i; (bin[++i] = ((floatPart *= 2) >= 1) - 0) && --floatPart);
            for(i = -1; ++i < len && !bin[i];);
            if(bin[(lastBit = precisionBits - 1 + (i = (exp = bias + 1 - i) >= minExp && exp <= maxExp ? i + 1 : bias + 1 - (exp = minExp - 1))) + 1]){
                if(!(rounded = bin[lastBit]))
                    for(j = lastBit + 2; !rounded && j < len; rounded = bin[j++]);
                for(j = lastBit + 1; rounded && --j >= 0; (bin[j] = !bin[j] - 0) && (rounded = 0));
            }
            for(i = i - 2 < 0 ? -1 : i - 3; ++i < len && !bin[i];);

            (exp = bias + 1 - i) >= minExp && exp <= maxExp ? ++i : exp < minExp &&
                (exp !== bias + 1 - len && exp < minUnnormExp && this.warn("encodeFloat::float underflow"), i = bias + 1 - (exp = minExp - 1));
            (intPart || status !== 0) && (this.warn(intPart ? "encodeFloat::float overflow" : "encodeFloat::" + status),
                exp = maxExp + 1, i = bias + 2, status === -Infinity ? signal = 1 : isNaN(status) && (bin[i] = 1));
            for(n = Math.abs(exp + bias), j = exponentBits + 1, result = ""; --j; result = (n % 2) + result, n = n >>= 1);
            for(n = 0, j = 0, i = (result = (signal ? "1" : "0") + result + bin.slice(i, i + precisionBits).join("")).length, r = [];
                i; n += (1 << j) * result.charAt(--i), j === 7 && (r[r.length] = n, n = 0), j = (j + 1) % 8);
            r[r.length] = n || 0;
            r.reverse();
            return parseInt(r.map(v => v.toString(2).padStart(8, '0')).join(''), 2);
        }
    }
};

/***/ }),

/***/ 772:
/***/ (function(module, exports) {

/**
 * Created by user on 07.02.2018.
 */
module.exports = (vrp) => {
    vrp.service('$apee', eventEmitterService);
    eventEmitterService.$inject = [];

    function eventEmitterService(){
        const rooms = [];

        class APEventEmitter {
            constructor (id) {
                this.id = id || generateId();
                this.listeners = {};
                this.oneTimers = [];
            }

            on(type, callback) {
                if (!(type in this.listeners)) {
                    this.listeners[type] = [];
                }
                this.listeners[type].push(callback);
            }
            once(type, callback) {
                this.oneTimers.push({type, callback});
            }
            off(type, callback) {
                if (!(type in this.listeners)) {
                    return
                }
                const len = this.listeners[type].length;
                for (let i = 0; i < len; ++i) {
                    if (this.listeners[type][i] !== callback) {
                        this.listeners[type].push(callback);
                    }
                }
                this.listeners[type].splice(0, len);
                this.oneTimers = this.oneTimers.filter((item) => item.type !== type && item.callback !== callback);
            }
            emit(type, data) {
                if (!(type in this.listeners)) {
                    return
                }
                const stack = this.listeners[type];
                stack.forEach((cb) => {
                    cb.call(this, data)
                });
                this.oneTimers = this.oneTimers.filter((item) => {
                    if (item.type === type){
                        item.callback.call(this, data);
                        return false;
                    }
                    return true;
                });
            }
            removeAllListeners(){
                this.listeners = {};
            }
        }
        this.getInstance = (id) => {
            let idx = rooms.findIndex((ee) => ee.id === id);
            if (idx === -1) {
                rooms.push(new APEventEmitter(id));
                idx = rooms.length - 1
            }
            return rooms[idx]
        };
        this.destroyInstance = (id) => {
            const idx = rooms.findIndex((ee) => ee.id === id);
            if (idx > -1) {
                rooms.splice(idx, 1);
            }
        };
        this.ee = new APEventEmitter('svc');

        this.APEventEmitter = APEventEmitter;

        function generateId(len = 8) {
            let id = '';
            for (let i = 0; i < len; ++i) {
                id += Math.floor(Math.random() * 36).toString(36);
            }
            return id;
        }
    }
};

/***/ }),

/***/ 773:
/***/ (function(module, exports) {

/**
* Created by user on 05.10.2016.
*/
module.exports = function(vrp) {
    vrp.service('resizeSensor', resizeSensorService);

    resizeSensorService.$inject = ['$window', '$timeout'];

    function resizeSensorService($window, $timeout) {
        // Only used for the dirty checking, so the event callback count is limted to max 1 call per fps per sensor.
        // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
        // would generate too many unnecessary events.
        const requestAnimationFrame = $window.requestAnimationFrame ||
            $window.mozRequestAnimationFrame ||
            $window.webkitRequestAnimationFrame ||
            function (fn) {
                return $timeout(fn, 20);
            };

        class EventQueue {
            constructor () {
                this.q = [];
            }
            get length () {return this.q.length}
            add (ev) {
                this.q.push(ev);
            }
            call () {
                this.q.forEach((item) => {
                    item.call();
                })
            }
            remove (ev) {
                let filtered = this.q.filter((item) => item !== ev);
                this.q.splice(0, this.q.length, ...filtered);
            }
            flush () {
                this.q.splice(0, this.q.length);
            }
        }

        class ResizeSensor {
            constructor (element) {
                const baseStyle = {
                    'position': 'absolute',
                    'left': 0, 'top': 0, 'right': 0, 'bottom': 0,
                    'overflow': 'hidden',
                    'z-index': -1,
                    'visibility': 'hidden'
                };
                const childStyle = {
                    'position': 'absolute',
                    'left': 0,
                    'top': 0,
                    'transition': 'all 0s'
                };
                this.element = element;
                this.queue = new EventQueue();
                this.expandChild = angular.element('<div>').css(childStyle);
                this.shrinkChild = angular.element('<div>').css(angular.extend({}, childStyle, {width: '200%', height: '200%'}));
                this.expand = angular.element('<div>').addClass("resize-sensor-expand").css(baseStyle).append(this.expandChild);
                this.shrink = angular.element('<div>').addClass("resize-sensor-shrink").css(baseStyle).append(this.shrinkChild);
                this.sensor = angular.element('<div>').addClass('resize-sensor').css(baseStyle).append(this.expand).append(this.shrink);
                this.dirty = false;
                this.passive = true;
                this.frame = 0;
            }

            reset () {
                if (!this.passive) {
                    this.expandChild[0].style.width = 100000 + 'px';
                    this.expandChild[0].style.height = 100000 + 'px';
                    this.expand[0].scrollLeft = 100000;
                    this.expand[0].scrollTop = 100000;
                    this.shrink[0].scrollLeft = 100000;
                    this.shrink[0].scrollTop = 100000;
                }
            }

            dirtyCheck () {
                if (!this.queue || this.passive) {
                    return;
                }
                if (this.dirty) {
                    this.queue.call();
                    this.dirty = false;
                }
                //else if (frame % 200 == 0) {
                //    this.onScroll();
                //}
                this.frame = requestAnimationFrame(this.dirtyCheck.bind(this));
            }

            onScroll () {
                this.cachedWidth = this.element[0].offsetWidth;
                this.cachedHeight = this.element[0].offsetHeight;
                if (this.cachedWidth !== this.lastWidth || this.cachedHeight !== this.lastHeight) {
                    this.dirty = true;
                    this.lastWidth = this.cachedWidth;
                    this.lastHeight = this.cachedHeight;
                }
                this.reset();
            }

            addScrollEvent (type) {
                if (this[type][0].attachEvent) {
                    this[type][0].attachEvent('onscroll', this.onScroll.bind(this));
                } else {
                    this[type][0].addEventListener('scroll', this.onScroll.bind(this));
                }
            }
            removeScrollEvent (type) {
                if (this[type][0].detachEvent) {
                    this[type][0].detachEvent('onscroll', this.onScroll.bind(this));
                } else {
                    this[type][0].removeEventListener('scroll', this.onScroll.bind(this));
                }
            }

            attachResizeEvent (cb) {
                this.queue.add(cb);
                this.passive = false;
                this.element.append(this.sensor);

                if (getComputedStyle(this.element[0], 'position') === 'static') {
                    this.element[0].style.position = 'relative';
                }
                this.reset();
                requestAnimationFrame(this.dirtyCheck.bind(this));
                this.addScrollEvent('expand');
                this.addScrollEvent('shrink');
            }

            detachResizeEvent () {
                if (this.queue && this.queue.length > 0) {
                    this.queue.flush();
                }
                this.passive = true;
                this.removeScrollEvent('expand');
                this.removeScrollEvent('shrink');
                this.sensor.remove();
            }
        }

        /**
         * @param {HTMLElement} element
         * @param {String}      prop
         * @returns {String|Number}
         */
        function getComputedStyle(element, prop) {
            if (element.currentStyle) {
                return element.currentStyle[prop];
            } else if ($window.getComputedStyle) {
                return $window.getComputedStyle(element, null).getPropertyValue(prop);
            } else {
                return element.style[prop];
            }
        }

        this.getInstance = (element) => {
            return new ResizeSensor(element);
        };
    }
};




/***/ }),

/***/ 774:
/***/ (function(module, exports) {

module.exports = function(vrp) {
    vrp.service('slashParamSerializer', function () {
        function serializeValue(v) {
            if (angular.isObject(v)) {
                return angular.isDate(v) ? v.toISOString() : angular.toJson(v);
            }
            return v;
        }

        return function ldParamSerializer(params) {
            if (!params) return '';
            var parts = [];
            var value;
            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    parts.push(key);
                    if (params[key] && !angular.isObject(params[key])) {
                        value = encodeURIComponent(params[key].toString())
                            .replace(/%20/g, '+')
                            .replace(/[\.\*\!\~\(\)]/g, '')
                            .replace(/\%\w{2}/g, '');
                        parts.push(value);
                    }
                }
            }
            return '/' + parts.join('/');
        }
    });
};


/***/ }),

/***/ 775:
/***/ (function(module, exports) {

/**
 * Created by user on 12.04.2016.
 */
module.exports = function(vrp) {
    vrp.constant('$apstoreConfig', {
        storageType: 'localStorage'
    });
    vrp.provider('$apstore', ['$apstoreConfig', function (config) {
        Object.defineProperties(this, {
            storageType: {
                get: function() { return config.storageType; },
                set: function(value) { config.storageType = value; }
            }
        });

        this.$get = ['$apstoreConfig', '$window', '$log', function (config, $window, $log) {
            var $apstore = {};
            var bkpstore = {};

            // Check if localStorage or sessionStorage is available or enabled
            var isStorageAvailable = (function() {
                try {
                    var supported = config.storageType in $window && $window[config.storageType] !== null;

                    if (supported) {
                        var key = Math.random().toString(36).substring(7);
                        $window[config.storageType].setItem(key, '');
                        $window[config.storageType].removeItem(key);
                    }

                    return supported;
                } catch (e) {
                    return false;
                }
            })();
            if (!isStorageAvailable) {
                $log.warn(config.storageType + ' is not available.');
            }
            $apstore.setStorageType = function(type) {
                config.storageType = type;
            };
            $apstore.get = function(key) {
                var result;
                if (isStorageAvailable) {
                    result = $window[config.storageType].getItem(key);
                    if (!angular.isDefined(result)) return null;
                    if (angular.isDate(result)) return new Date(result);
                    if (angular.isArray(result) || angular.isObject(result)) return result;
                    if (angular.isString(result)) {
                        try {
                            result = angular.fromJson(result);
                            return result;
                        } catch (e) {
                            return result;
                        }
                    }
                } else {
                    return result = bkpstore[key];
                }
            };
            $apstore.set = function(key, value) {
                if (isStorageAvailable) {
                    if (angular.isObject(value) || angular.isArray(value)) {
                        value = angular.toJson(value);
                    }
                    return $window[config.storageType].setItem(key, value);
                } else {
                    return bkpstore[key] = value;
                }
            };
            $apstore.remove = function(key) {
                return isStorageAvailable ? $window[config.storageType].removeItem(key): delete bkpstore[key];
            };
            $apstore.clear = function() {
                return isStorageAvailable ? $window[config.storageType].clear(): bkpstore = {};
            };
            $apstore.key = function(num) {
                return isStorageAvailable ? $window[config.storageType].key(num): bkpstore[Object.keys(bkpstore)[num]];
            };
            $apstore.allKeys = function() {
                if (isStorageAvailable) {
                    var length = $window[config.storageType].length;
                    var results = [];
                    for (var i = 0; i < length; i++) {
                        results.push($window[config.storageType].key(i));
                    }
                } else {
                    results = Object.keys(bkpstore);
                }
                return results;
            };
            $apstore.findKeys = function(regexp) {
                var all_keys = $lstore.allKeys();
                return all_keys.filter(function (v) { return regexp.test(v) });
            };
            return $apstore;
        }];
    }]);
};


/***/ }),

/***/ 776:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./algo/bignumber-filter.js": 777,
	"./algo/genetic-factory.js": 778,
	"./algo/permutation-service.js": 779,
	"./algo/point-factory.js": 780,
	"./algo/sim-anneal-service.js": 781,
	"./k-mean/k-mean-directive.js": 782,
	"./k-mean/k-mean-service.js": 784,
	"./tsp/route-draw-directive.js": 785,
	"./tsp/route-plotter-service.js": 787,
	"./vrp/vrp-draw-directive.js": 788,
	"./vrp/vrp-plotter-service.js": 790
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 776;

/***/ }),

/***/ 777:
/***/ (function(module, exports) {

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

/***/ }),

/***/ 778:
/***/ (function(module, exports) {

module.exports = function(vrp){
    vrp.service('GeneticFactory', geneticFactoryService);
    geneticFactoryService.$inject = ['$permutation'];

    function geneticFactoryService($permutation){
        class Gene {
            constructor(code = []){
                this._code = code;
                this.vulnerability = 0;
            }

            get code () {
                return this._code.slice()
            }

            set code (code) {
                this._code.splice(0, this._code.length, ...code);
            }

            get size (){
                return this._code.length;
            }

            get genom (){
                const max = this._code.slice().sort((a, b) => b - a)[0];
                const pad = (`${max}`).length;
                return this._code.map((v) => ('' + v).padStart(pad, '0')).join()
            }

            isEqual(genom){
                return this.genom === genom;
            }

            reproduce (gene) {
                const children = [];
                const cellSet = $permutation.getNumberSequence(this.code.length);
                const mutualSet = this.code.map((val, idx) => {
                    if (val === gene.code[idx]){
                        cellSet.splice(cellSet.indexOf(val), 1);
                        return val;
                    }
                    return null;
                });
                if (cellSet.length === 0) {
                    return [
                        this.mutate(),
                        this.mutate()
                    ]
                }
                $permutation.getRandomLimitedPermutations(cellSet, MAX_CHILDREN).forEach((mut) => {
                    const child = new Gene(mutualSet.map((val) => val || mut.shift()));
                    children.push(child);
                });
                return children;
            }

            mutate(depth = Math.floor(this.size / 3)){
                const mcells = [];
                const sample = this.code;
                do {
                    const idx = Math.floor(Math.random() * this.size);
                    if (mcells.indexOf(sample[idx]) === -1){
                        mcells.push(sample[idx]);
                        sample[idx] = null;
                    }
                } while (mcells.length < depth);
                return new Gene(sample.map(v => v || mcells.shift()))
            }

        }

        class Generation {
            constructor(num){
                this.number = num;
                this._spieces = [];
            }
            get spieces () {
                return this._spieces.slice();
            }
            set spieces (arr) {
                this._spieces.splice(0, this._spieces.length);
                if (arr && Array.isArray(arr)){
                    this._spieces.push(...arr);
                }
            }
            get size() {
                return this._spieces.length
            }
            get avgVulnerability () {
                return this._spieces.reduce((res, gene) => res + (gene.vulnerability / this.size), 0)
            }
            get minVulnerability () {
                return this._spieces.reduce((res, gene) => !res || gene.vulnerability < res ? gene.vulnerability : res, null)
            }
            get maxVulnerability () {
                return this._spieces.reduce((res, gene) => !res || gene.vulnerability > res ? gene.vulnerability : res, null)
            }
            get minVulnerableSample () {
                return  this._spieces.find((gene) => gene.vulnerability === this.minVulnerability)
            }
            get maxVulnerableSample () {
                return  this._spieces.find((gene) => gene.vulnerability === this.maxVulnerability)
            }
            get csv () {
                return this._spieces.map((gene) => `${this.number},--,${gene.genom},${gene.vulnerability}`).join('\n')
            }
            get summary () {
                const out = [
                    `Generation ${this.number}`,
                    `Population: ${this.size}`,
                    `Vulnerability (min/avg/max): ${this.minVulnerability} / ${this.avgVulnerability} / ${this.maxVulnerability}`,
                    `Most viable sample: ${this.minVulnerableSample.genom}`,
                    '--'
                ];
                return out.join('\n');
            }
        }

        class Population {
            constructor (config) {
                this.generations = [];
                this.size = config.size;
                this.probe = config.probe;
                this.survive = config.survive || 0.25;
                this.genomLength = config.genomLength;
                this.sample = config.sample;
                this.minVulnerableGene = null;
            }

            get absMinVulnerability () {
                const sampleTotal = this.sample.reduce((res, val) => res + val, 0);
                const geneTotal = (this.sample.length + 1) * this.sample.length / 2;
                return sampleTotal - geneTotal;
            }

            get minVulnerability () {
                return this.probe($permutation.getOptimalPermutation(this.sample))
            }

            populate () {
                const items = $permutation.getNumberSequence(this.genomLength);
                const generation = new Generation(0);
                generation.spieces = $permutation.getRandomLimitedPermutations(items, this.size).map((seq) => {
                    const newGene = new Gene(seq);
                    newGene.vulnerability = this.probe(newGene.code);
                    return newGene;
                });
                this.generations.push(generation);
                return this;
            }

            select (genIdx = this.generations.length - 1) {
                const maxNumber = Math.floor(this.generations[genIdx].size * this.survive);
                return this.generations[genIdx].spieces
                    .sort((genA, genB) => genA.vulnerability - genB.vulnerability)
                    .slice(0, maxNumber)
                    .sort((genA, genB) => genA.genom - genB.genom)
            }
            breed(maxGenerations = 1000, stopOnMinimum = true){
                const oldGeneration = this.select();
                if (oldGeneration.length < 2 || maxGenerations === 1){
                    this.minVulnerableGene = this.findRelativeMin();
                    return this;
                }
                const newGeneration = new Generation(this.generations.length);
                newGeneration.spieces = oldGeneration.reduce((res, gene, idx) => {
                    const nextGene = oldGeneration[idx + 1];
                    let children;
                    if (nextGene){
                        children = gene.reproduce(nextGene).map((child) => {
                            child.vulnerability = this.probe(child.code);
                            return child;
                        });
                        res.push(...children);
                    }
                    return res
                }, []);
                this.generations.push(newGeneration);
                if (newGeneration.minVulnerability === this.minVulnerability && stopOnMinimum){
                    this.minVulnerableGene = newGeneration.minVulnerableSample;
                }
                return this.minVulnerableGene ? this : this.breed(maxGenerations - 1);
            }
            findRelativeMin(){
                let mvs;
                this.generations.forEach((gnr) => {
                    const sample = gnr.minVulnerableSample;
                    if (!mvs || mvs.vulnerability > sample.vulnerability){
                        mvs = sample;
                    }
                });
                return mvs;
            }
        }

        this.getGene = (code) => {
            return new Gene(code);
        };
        this.getGeneration = (size) => {
            return new Generation(size);
        };
        this.getPopulation = (config) => {
            return new Population(config);
        }
    }
};

/***/ }),

/***/ 779:
/***/ (function(module, exports) {

module.exports = function(vrp){
    vrp.factory('$permutation', permutationFactory);
    permutationFactory.$inject = ['$q'];


    function permutationFactory($q){
        class Permutation {
            static getAllPermutations(items){
                if (items.length < 2) {
                    return items.length === 1 ? [items]: [];
                }
                const permutations = [];

                // Get all permutations of length (n - 1).
                const prevItems = items.slice(0, -1);
                // Insert last option into every possible position of every previous permutation.
                const lastItem = items.slice(-1);

                const prevPermutations = Permutation.getAllPermutations(prevItems);
                for (let i = 0; i < prevPermutations.length; i++) {
                    const currentPermutation = prevPermutations[i];
                    // Insert last option into every possible position of currentPermutation.
                    for (let j = 0; j <= currentPermutation.length; j++) {
                        const permutationPrefix = currentPermutation.slice(0, j);
                        const permutationSuffix = currentPermutation.slice(j);
                        permutations.push(permutationPrefix.concat(lastItem, permutationSuffix));
                    }
                }
                return permutations;
            }

            static getAllPermutationsAsync(items){
                if (items.length < 2) {
                    return $q.resolve(items.length === 1 ? [items]: []);
                }
                const lastItem = items.pop();

                return Permutation.getAllPermutationsAsync(items).then((prevPermutations) => {
                    return prevPermutations.map((currentPermutation) => {
                        return currentPermutation.reduce((r, v, i) => {
                            return [...r, [...currentPermutation.slice(0, i + 1), lastItem, ...currentPermutation.slice(i + 1)]];
                        }, [[lastItem, ...currentPermutation]]);
                    }).reduce((a, b) => a.concat(b))
                });
            }

            static getLimitedPermutations(items, limit){
                const limitBase = findNearestFactorial(limit);
                console.log(`To get ${limit} samples we set base at ${limitBase}`);
                const mainSet = Permutation.getAllPermutations(items.slice(0, limitBase));

                const steps = math.ceil(limit / mainSet.length);
                return mainSet.reduce((res, item) => {
                    for(let i = 0; i < steps; i++){
                        let extSet = Permutation.getRandomPermutation(items.slice(limitBase));
                        res.push(item.concat(extSet))
                    }
                    return res;
                }, [])
            }

            static getRandomLimitedPermutations(items, limit){
                if (items.length < 2) {
                    return items.length === 1 ? [items]: [];
                }
                const maxNum = math.factorial(items.length);
                if (limit >= maxNum){
                    return Permutation.getAllPermutations(items);
                }
                const permutations = [];
                do {
                    const newPermutation = Permutation.getRandomPermutation(items);
                    const idx = permutations.findIndex((perm) => perm.join() === newPermutation.join());
                    if (idx === -1){
                        permutations.push(newPermutation);
                    }
                } while (permutations.length < limit);
                return permutations;
            }

            static getRandomPermutation(items) {
                const src = items.slice();
                return items.map(() => {
                    const idx = Math.floor(Math.random() * src.length);
                    return src.splice(idx, 1)[0];
                });
            }

            static getNonUniqueNumberSequence(len, minTotal = (len + 1) * len / 2) {
                const maxTotal = len * len;
                const targetTotal = minTotal + Math.floor(Math.random() * (maxTotal - minTotal));
                let sum = len;
                const result = Array.apply(null, Array(len)).fill(1);
                do {
                    const idx = Math.floor(Math.random() * len);
                    if (result[idx] < len) {
                        result[idx]++;
                        sum++;
                    }
                } while (sum < targetTotal);
                return result;
            }

            static getNumberSequence(len, start = 1){
                return Array.apply(null, Array(len)).map((v, i) => i + start);
            }

            static getOptimalPermutation(items){
                return items.map((v, i) => {
                    return {val: v, idx: i}
                }).sort((a, b) => a.val - b.val).map((v, i) => {
                    v.cell = i + 1;
                    return v;
                }).sort((a, b) => a.idx - b.idx).map((v) => v.cell);
            }
        }
        window.Permutation = Permutation;
        return Permutation;
    }

    function findNearestFactorial(target, base = 1){
        return math.factorial(base + 1) > target ? base : findNearestFactorial(target, base + 1)
    }
};

/***/ }),

/***/ 780:
/***/ (function(module, exports) {

module.exports = (vrp) => {
    vrp.service('pointFactory', pointFactory);
    pointFactory.$inject = [];

    function pointFactory(){
        class RPoint {
            constructor(x, y){
                this.x = x;
                this.y = y;
            }
            move(dx, dy){
                this.x += dx;
                this.y += dy;
                return this;
            }
            moveTo(x, y){
                this.x = x;
                this.y = y;
                return this;
            }
            getDistance(rpoint){
                const dx = Math.abs(rpoint.x - this.x);
                const dy = Math.abs(rpoint.y - this.y);
                return Math.sqrt((dx * dx) + (dy * dy))
            }
            getMidPoint(rpoint){
                const mx = this.x + (rpoint.x - this.x) / 2;
                const my = this.y + (rpoint.y - this.y) / 2;
                const copy = new this.constructor(mx, my);
                return Object.assign(copy, this._getPropsCopy());
            }
            getScaled(sf){
                const copy = new this.constructor(this.x * sf, this.y * sf);
                return Object.assign(copy, this._getPropsCopy());
            }
            clone(){
                const copy = new this.constructor(this.x, this.y);
                return Object.assign(copy, this._getPropsCopy());
            }
            equals(rpoint){
                return this.constructor === rpoint.constructor
                    && this.x === rpoint.x
                    && this.y === rpoint.y;
            }
            toString(){
                return this.x.toFixed(2) + 'x' + this.y.toFixed();
            }
            _getPropsCopy(){
                return Object.keys(this).reduce((res, key) => {
                    if (key !== 'x' && key !== 'y'){
                        res[key] = this[key];
                    }
                    return res;
                }, {})
            }
        }

        class RoutePoint extends RPoint {
            constructor(x, y){
                super(x, y);
                this.cssStyle = new Set();
                this.name = null;
                this.cssStyle.add('vrp-point');
            }

            setCss(css){
                this.cssStyle.add(css);
                return this;
            }

            setName(name){
                this.name = name;
                return this;
            }
        }

        class RVector {
            constructor(start, end){
                this.start = start;
                this.end = end;
            }
            get X(){
                return this.end.x - this.start.x;
            }
            get Y(){
                return this.end.y - this.start.y;
            }
            get length(){
                return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
            }

            _add(rvector){
                this.end.move(rvector.X, rvector.Y);
                return this;
            }
            _move(dx, dy){
                this.start.move(dx, dy);
                this.end.move(dx, dy);
                return this;
            }
            translate(dx, dy){
                return this.clone()._move(dx, dy);
            }
            sum(rvector){
                return this.clone()._add(rvector);
            }
            mean(rvector){
                const dx = rvector.start.x - this.start.x;
                const dy = rvector.start.y - this.start.y;
                const mv = rvector.translate(dx, dy);
                mv.end.x = (mv.end.x + this.end.x) / 2;
                mv.end.y = (mv.end.y + this.end.y) / 2;
                return mv;
            }
            clone(){
                return new RVector(this.start.clone(), this.end.clone())
            }
        }

        this.RPoint = RPoint;
        this.RVector = RVector;
        this.RoutePoint = RoutePoint;

        this.getPoint = (x, y) => {
            return new RPoint(x, y);
        };
        this.getRoutePoint = (x, y) => {
            return new RoutePoint(x, y);
        };
        this.getRandomPoints = (amount, maxX, maxY) => {
            return new Array(amount).fill(0).map(() => new RPoint(this.getRandomCoord(maxX), this.getRandomCoord(maxY)));
        };
        this.getRandomPoint = (maxX, maxY) => {
            return new RPoint(this.getRandomCoord(maxX), this.getRandomCoord(maxY))
        };
        this.getRandomCoord = (max) => {
            return Math.floor(Math.random() * max);
        };
    }
};

/***/ }),

/***/ 781:
/***/ (function(module, exports) {

module.exports = function(vrp){
    vrp.service('$simAnneal', simAnnealService);
    simAnnealService.$inject = ['$q', '$permutation', '$apee', '$double', 'pointFactory'];

    function simAnnealService($q, $permutation, $apee, $double, pointFactory){
        const BFLIMIT = 5e5;
        class SimAnnealSolution {
            constructor(points){
                this.points = [];
                this.cost = -1;
                if (points){
                    this.setPoints(points);
                }
            }

            get length(){
                return this.points.length;
            }

            setPoints(points){
                this.points.splice(0, this.points.length, ...points);
                this.cost = this.getCost();
                return this;
            }

            getCost(){
                return SimAnnealSolution.calculateCost(this.points);
            }

            export(){
                return this.points.map((point) => [point.x, point.y].join()).join('\n');
            }

            equals(solution){
                if (this === solution){
                    return true;
                }
                if (!(solution instanceof SimAnnealSolution)){
                    return false;
                }
                const startIndex = solution.points.findIndex((point) => point.equals(this.points[0]));
                return startIndex > -1
                    && this.cost === solution.cost
                    && this.length === solution.length
                    && this.points.every((p, i, a) => p.equals(solution.points[(i + startIndex) % a.length]));
            }

            static calculateCost(points){
                return points.reduce((res, point) => {
                    if (res.prev){
                        res.cost += res.prev.getDistance(point);
                    }
                    res.prev = point;
                    return res;
                }, {cost: 0, prev: null}).cost
            }
        }
        class SimAnneal extends $apee.APEventEmitter {
            constructor (base, maxTemperature, minTemperature, isClosed){
                super();
                if (base.length < 3){
                    throw new Error('SimAnneal accepts only sequences with length 3+');
                }
                const last = base[base.length - 1];
                if (isClosed && last && base[0] && !last.equals(base[0])){
                    base.push(base[0]);
                }
                this._base = base;
                this._state = $permutation.getRandomPermutation($permutation.getNumberSequence(base.length, 0));
                this._step = 1;
                this._start = maxTemperature;
                this._temperature = maxTemperature;
                this._limit = minTemperature;
                this._results = [];
                this._solutions = [];
                this._exact = null;
                if (this._base.length < 10){
                    this.bruteForce().then((result) => {
                        this._exact = new SimAnnealSolution(result.state);
                    })
                }
                this._hash = this.hashCode();
            }

            get currentCost() {
                return this.calculateCost(this._state);
            }
            get currentState() {
                return this._state;
            }
            set currentState(state) {
                this._state.splice(0, this._state.length, ...state);
            }
            get points(){
                return this.getState();
            }
            get isDone(){
                return (this._temperature <= this._limit || (this._exact && this._exact.cost === this.currentCost)) && this.stop();
            }
            set isDone(bool){
                if (!!bool){
                    this.stop()
                }
            }
            get isRunning(){
                return this._step > 1 && this._temperature > this._limit;
            }
            get info(){
                return `Route length: ${this.currentCost} Step: ${this._step} Temperature: ${this._temperature}`
            }
            get solutions(){
                return this._solutions;
            }

            hashCode(){
                return this._base.reduce((res, item) => {
                    if (!res){
                        res = $double.doubleToLongBits(item.x);
                        res = Math.imul(31, res) + item.y | 0;
                    } else {
                        res = Math.imul(31, res) + item.x | 0;
                        res = Math.imul(31, res) + item.y | 0;
                    }
                    return res;
                }, 0)
            }

            getState(state = this._state){
                return state.map((v) => this._base[v])
            }

            calculateCost(state){
                const points = this.getState(state);
                return SimAnnealSolution.calculateCost(points);
            }

            calculateProbability(deltaCost){
                return Math.exp(-1 * deltaCost / this._temperature)
            }

            decreaseTemperature(){
                this._temperature = (this._start * 0.3) / this._step;
                this._step++;
            }

            getCandidate(){
                let a = Math.floor(Math.random() * this._state.length);
                let b = Math.floor(Math.random() * this._state.length);
                if (a > b){
                    [a, b] = [b, a]
                }
                const segment = this._state.slice(a, b).reverse();
                return [...this._state.slice(0, a), ...segment, ...this._state.slice(b)]
            }

            bruteForce(limit = BFLIMIT){
                return $q((resolve) => {
                    const items = $permutation.getNumberSequence(this._base.length, 0);
                    const result = $permutation.getLimitedPermutations(items, limit).reduce((res, state) => {
                        const cost = this.calculateCost(state);
                        if (res.cost < 0 || cost < res.cost){
                            res.cost = cost;
                            res.state = this.getState(state);
                        }
                        return res;
                    }, {state: null, cost: -1});
                    resolve(result);
                })
            }

            benchmark(limit = BFLIMIT){
                const start = moment();
                return this.bruteForce(limit).then((result) => {
                    const end = moment();
                    let duration = end.diff(start);
                    const bench = math.divide(duration, limit);
                    const total = math.factorial(this._base.length);
                    const estimate = moment.duration(total * bench);

                    return Object.assign({bench, duration, estimate, limit, total}, result)
                })
            }

            next(){
                if (this.isDone || this._step > 100000){
                    this.stop();
                    return false;
                }

                const candidate = this.getCandidate();
                const candidateCost = this.calculateCost(candidate);
                const currentCost = this.currentCost;
                const deltaCost = candidateCost - currentCost;
                if (deltaCost < 0){
                    this.currentState = candidate;
                } else {
                    const probability = this.calculateProbability(deltaCost);
                    const trigger = Math.random();
                    if (trigger <= probability){
                        this.currentState = candidate;
                    }
                }
                this.decreaseTemperature();

                this._results.push(currentCost);
                return currentCost;
            }

            stop(){
                if (this._step === 1){
                    return
                }
                this._temperature = 0;
                return this.addSolution();
            }

            reset(){
                this._step = 1;
                this._temperature = this._start;
                this._results = [];
                this._state = $permutation.getRandomPermutation($permutation.getNumberSequence(this._base.length, 0));
                return this;
            }

            addSolution(points = this.points){
                const solution = new SimAnnealSolution(points);
                const prevSolution = this.getLastSolution();
                if (!prevSolution || !prevSolution.equals(solution)){
                    this._solutions.push(solution);
                }
                return this;
            }

            getLastSolution(){
                return this._solutions[this._solutions.length - 1]
            }

            getBestSolution(){
                return this._solutions.reduce((a, b) => a.cost < b.cost ? a : b)
            }

            getSolution(idx){
                return this._solutions[idx]
            }

            static calculateSegmentCost(pointA, pointB){
                return Math.round(Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2)))
            }
        }
        this.getPresetInstance = (base, maxT, minT, isClosed) => {
            const instance = new SimAnneal(base, maxT, minT, isClosed);
            return instance.addSolution(instance._base);
        };
        this.getInstance = (amount, range, maxT, minT, isClosed) => {
            const base = pointFactory.getRandomPoints(amount, range, range);
            return new SimAnneal(base, maxT, minT, isClosed);
        };
        this.SimAnneal = SimAnneal;
    }
};

/***/ }),

/***/ 782:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (vrp) => {
    vrp.directive('kMean', kMeanDirective);
    kMeanDirective.$inject = [];

    function kMeanDirective(){
        return {
            restrict: 'E',
            scope: {},
            template: __webpack_require__(783),
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

/***/ }),

/***/ 783:
/***/ (function(module, exports) {

module.exports = "<div layout=\"column\" ng-style=\"{'max-width': (ctrl.mapWidth + 160) + 'px'}\" flex>\r\n    <div class=\"algo-controls\" layout=\"row\" layout-align=\"space-between start\">\r\n        <div layout=\"column\" flex=\"45\">\r\n            <md-slider-container>\r\n                <span>Width</span>\r\n                <md-slider min=\"500\" max=\"1200\" ng-model=\"ctrl.mapWidth\" aria-label=\"map width\" class=\"md-warn\"></md-slider>\r\n                <md-input-container>\r\n                    <input type=\"number\" ng-model=\"ctrl.mapWidth\" aria-label=\"map width\" aria-controls=\"map-size-slider\">\r\n                </md-input-container>\r\n            </md-slider-container>\r\n            <md-slider-container>\r\n                <span>Height</span>\r\n                <md-slider min=\"500\" max=\"1200\" ng-model=\"ctrl.mapHeight\" aria-label=\"map height\" class=\"md-warn\"></md-slider>\r\n                <md-input-container>\r\n                    <input type=\"number\" ng-model=\"ctrl.mapHeight\" aria-label=\"map height\" aria-controls=\"map-size-slider\">\r\n                </md-input-container>\r\n            </md-slider-container>\r\n\r\n        </div>\r\n        <div layout=\"column\" flex=\"45\">\r\n            <md-slider-container>\r\n                <span>Points</span>\r\n                <md-slider min=\"4\" max=\"300\" ng-model=\"ctrl.pointCount\" aria-label=\"points\" class=\"md-warn\"></md-slider>\r\n                <md-input-container>\r\n                    <input type=\"number\" ng-model=\"ctrl.pointCount\" aria-label=\"points number\" aria-controls=\"points-number-slider\">\r\n                </md-input-container>\r\n            </md-slider-container>\r\n            <md-slider-container>\r\n                <span>Clusters</span>\r\n                <md-slider min=\"2\" max=\"10\" ng-model=\"ctrl.clusterCount\" aria-label=\"points\" class=\"md-warn\"></md-slider>\r\n                <md-input-container>\r\n                    <input type=\"number\" ng-model=\"ctrl.clusterCount\" aria-label=\"cluster count\">\r\n                </md-input-container>\r\n            </md-slider-container>\r\n            <div layout=\"row\" layout-align=\"center\">\r\n                <div flex></div>\r\n                <md-button ng-click=\"ctrl.rebuild()\" aria-label=\"rebuild\">New</md-button>\r\n                <md-button ng-click=\"ctrl.resetClusters()\" aria-label=\"reset clusters\">Reset</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.runClusteringStep()\" aria-label=\"run clustering step\">Next</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"algo-draw-scroller\">\r\n        <div class=\"k-mean-container\" ng-style=\"{'height': ctrl.mapHeight + 'px', 'width': ctrl.mapWidth + 'px'}\">\r\n            <div class=\"k-mean-layer\">\r\n                <div class=\"k-mean-point-wrapper\">\r\n                    <div ng-repeat=\"point in ctrl.kmean.points\" class=\"k-mean-point\" ng-style=\"{'top': point.y + 'px', 'left': point.x + 'px'}\"></div>\r\n                </div>\r\n            </div>\r\n            <div class=\"k-mean-layer\" ng-repeat=\"cluster in ctrl.kmean.clusters\" ng-style=\"{'z-index': (cluster.index + 1) * 10}\">\r\n                <div class=\"k-mean-point-wrapper\">\r\n                    <div class=\"k-mean-point\" ng-repeat=\"point in cluster.points\" ng-style=\"{'top': point.y + 'px', 'left': point.x + 'px', 'border-color': ctrl.colors[cluster.index]}\"></div>\r\n                    <div class=\"k-mean-point k-mean-centroid\"\r\n                         ng-style=\"{'top': cluster.centroid.y + 'px',\r\n                     'left': cluster.centroid.x + 'px',\r\n                     'border-color': ctrl.colors[cluster.index],\r\n                     'background-color': ctrl.colors[cluster.index]}\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 784:
/***/ (function(module, exports) {

module.exports = (vrp) => {
    vrp.service('$kmean', kMeanService);
    kMeanService.$inject = ['pointFactory'];

    function kMeanService(pointFactory){
        class Cluster {
            constructor(index, centroid){
                this.index = index;
                this.centroid = centroid;
                this.points = [];
            }

            get size(){
                return this.points.length;
            }

            calculateCentroid(){
                const [avgX, avgY] = this.points.reduce((res, rp) => [res[0] + rp.x, res[1] + rp.y], [0, 0]).map((coord) => coord / this.size);
                this.centroid = new pointFactory.RPoint(avgX, avgY);
                return this;
            }

            addPoint(rpoint){
                const idx = this.points.findIndex((p) => p.equals(rpoint));
                if (idx === -1){
                    this.points.push(rpoint);
                }
                return this;
            }

            removePoint(rpoint){
                const idx = this.points.findIndex((p) => p.equals(rpoint));
                if (idx > -1){
                    this.points.splice(idx, 1);
                }
                return this;
            }

            reset(){
                return this.points.splice(0, this.points.length);
            }

            equals(cluster){
                return this.size === cluster.size && this.points.reduce((res, point) => {
                    const idx = cluster.points.findIndex((cpt) => cpt.equals(point));
                    return idx > -1 ? res + 1 : res;
                }, 0) === this.size;
            }
        }
        class KMeanClusters{
            constructor (npoints, nclusters, width, height){
                if (nclusters >= npoints){
                    throw new RangeError('There should be lass clusters than points');
                }
                this.width = width;
                this.height = height || width;
                this.points = pointFactory.getRandomPoints(npoints, width, height);
                this.clusters = new Array(nclusters).fill(0).map((v, i) => new Cluster(i, pointFactory.getRandomPoint(this.width, this.height)))
            }

            get maxDistance(){
                return Math.sqrt((this.width * this.width) + (this.height * this.height))
            }

            clusteringStep(){
                this.resetAllClusters();
                this.points.forEach((point, pidx) => {
                    const index = this.clusters.reduce((res, cluster, idx) => {
                        const dist = point.getDistance(cluster.centroid);
                        //console.log(`Distance between points ${point.toString()} and ${cluster.centroid.toString()} = ${dist}. Max distance is ${this.maxDistance}`);
                        return res[0] < dist ? res : [dist, idx]
                    }, [this.maxDistance, -1]);
                    //console.log(`Point ${pidx}: ${point.toString()} belongs to the cluster ${index}`);
                    this.clusters[index[1]] && this.clusters[index[1]].addPoint(point);
                });
                this.recalcAllClusters();
            }

            recalcAllClusters(){
                return this.clusters.forEach((cluster) => cluster.calculateCentroid());
            }
            resetAllClusters(){
                return this.clusters.forEach((cluster) => cluster.reset());
            }
        }

        this.getInstance = (npoints, nclusters, width, height) => {
            return new KMeanClusters(npoints, nclusters, width, height);
        }
    }
};

/***/ }),

/***/ 785:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {module.exports = function(vrp){
    vrp.directive('routeDraw', routeDrawDirective);
    routeDrawDirective.$inject = ['$q', '$timeout'];

    function routeDrawDirective($q, $timeout){
        return {
            restrict: 'E',
            scope: {},
            template: __webpack_require__(786),
            bindToController: true,
            controller: 'RouteDrawController',
            controllerAs: 'ctrl'
        };
    }

    vrp.controller('RouteDrawController', RouteDrawController);
    RouteDrawController.$inject = ['$element', '$timeout', '$simAnneal', 'pointFactory'];

    function RouteDrawController($element, $timeout, $simAnneal, pointFactory){
        const colors = [
            '#2196F3',
            '#F44336',
            '#FFC107',
            '#4CAF50',
            '#FF9800',
            '#009688',
            '#9C27B0',
            '#FFEB3B',
            '#3F51B5',
            '#CDDC39'
        ];
        this.mapSize = $element[0].offsetWidth - 16;
        this.maxTemp = 10;
        this.minTemp = 0.00005;
        this.pointsNumber = 20;
        this.simAnneal = null;
        this.bestRoute = null;
        this.usePreset = false;
        this.isClosed = false;
        this.preset = null;
        this.colorIterator = colors.values();

        this.rebuildRoute = (reset) => {
            const drawElem = $('.route-draw-container');
            const routeInfo = drawElem.find('.route-info');
            const canvas = document.getElementById('current_search');
            const ctx = canvas.getContext('2d');

            const preset = buildPreset(this.preset);

            if (reset || !this.simAnneal){
                this.simAnneal = this.usePreset
                    ? $simAnneal.getPresetInstance(preset, this.maxTemp, this.minTemp, this.isClosed)
                    : $simAnneal.getInstance(this.pointsNumber, this.mapSize, this.maxTemp, this.minTemp, this.isClosed);
                drawPoints(this.simAnneal.points, drawElem);
            }
            this.simAnneal.reset();
            clearCanvas(ctx);
            drawRouteSequence(ctx, this.simAnneal, routeInfo);
        };

        this.drawSolution = (idx) => {
            if (!this.simAnneal){
                return;
            }
            const scanvas = document.getElementById('solution_' + idx);
            if (!scanvas){
                return $timeout(() => this.drawSolution(idx), 50);
            }
            return $timeout(() => {
                const solution = this.simAnneal.getSolution(idx);
                const sctx = scanvas.getContext('2d');
                solution.color = this.getColor();
                drawRoute(sctx, solution.points, solution.color);
            }, 0)
        };

        this.addSolution = () => {
            if (!this.preset){
                return;
            }
            const points = buildPreset(this.preset);
            if (!this.simAnneal){
                const drawElem = $('.route-draw-container');
                drawPoints(points, drawElem);
                this.simAnneal = $simAnneal.getPresetInstance(points, this.maxTemp, this.minTemp);
            } else {
                this.simAnneal.addSolution(points);
            }
        };

        this.focusSolution = (idx) => {
            const drawElem = $('.route-draw-container');
            drawElem.find('.route-solution').each((i, elem) => {
                $(elem).toggleClass('focused-solution', i === idx);
            });
        };

        this.downloadSolution = (idx) => {
            const scanvas = document.getElementById('current_search');
            const dataUrl = scanvas.toDataURL();
            initDownload(dataUrl);
        };

        this.stopRouteSearch = () => {
            if (!this.simAnneal){
                return;
            }
            this.simAnneal.stop();
            console.log(this.simAnneal.getLastSolution().export())
        };

        this.getColor = () => {
            let item = this.colorIterator.next();
            if (!item.value){
                this.colorIterator = colors.values();
                item = this.colorIterator.next();
            }
            return item.value;
        };

        function buildPreset(data){
            return data ? data.split('\n').map((str) =>
                pointFactory.getPoint(...str
                    .split(',')
                    .map((v) => parseInt(v))
                )
            ) : [];
        }

        function drawRouteSequence(ctx, simAnneal, infoElem, minCost){
            if (simAnneal.isDone){
                console.log(`Processing is done with cost of ${simAnneal.getLastSolution().cost}. ${simAnneal.solutions.length} solutions in stock`);
                console.log(simAnneal.getLastSolution().export());
                clearCanvas(ctx);
                return;
            }

            const currentCost = simAnneal.currentCost;
            if (!minCost || minCost > currentCost){
                clearCanvas(ctx);
                drawRoute(ctx, simAnneal.points);
                minCost = currentCost;
            }
            infoElem.html(`min. cost: <b>${minCost}</b>. ${simAnneal.info}`);

            if (simAnneal.next()) {
                $timeout(() => {
                    drawRouteSequence(ctx, simAnneal, infoElem, minCost);
                }, 5)
            }
        }

        function drawPoints(points, container){
            $(container).find('.route-point').remove();
            const sf = getScaleFactor(points);

            points.forEach((point) => {
                const pt = sf !== 1 ? point.getScaled(sf) : point.clone();
                const px = Math.round(pt.x);
                const py = Math.round(pt.y);
                const pid = ['rp', point.x, point.y].join('_');
                if (!document.getElementById(pid)){
                    const pointElem = angular.element(`<div class="route-point" id="rp_${point.x}_${point.y}"><span>${point.x}x${point.y}</span></div>`);
                    pointElem.css({
                        top: py + 'px',
                        left: px + 'px'
                    });
                    container.append(pointElem);
                }
            })
        }

        function drawRoute(ctx, points, color = '#0D47A1'){
            const sf = getScaleFactor(points);
            const pts = sf !== 1 ? points.map((pt) => pt.getScaled(sf)) : points.slice();

            ctx.strokeStyle = color;
            ctx.lineWidth = 2;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';

            ctx.beginPath();
            ctx.moveTo(pts[0].x, pts[0].y);
            pts.slice(1).forEach((point) => {
                ctx.lineTo(point.x, point.y);
            });
            ctx.stroke();
            markStartEndPoints(points);
        }

        function markStartEndPoints(points){
            const drawElem = $('.route-draw-container');
            const fid = `#rp_${points[0].x}_${points[0].y}`;
            const lid = `#rp_${points[points.length - 1].x}_${points[points.length - 1].y}`;
            const fclass = 'route-point-first';
            const lclass = 'route-point-last';
            drawElem.find('.route-point').removeClass(fclass).removeClass(lclass);
            drawElem.find(fid).addClass(fclass);
            drawElem.find(lid).addClass(lclass);
        }

        function clearCanvas(ctx){
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        }

        function factorial(val, res = 1){
            return val > 0 ? factorial(val - 1, val * res) : res;
        }

        function getScaleFactor(points){
            const cnv = document.getElementById('current_search');
            if (!cnv){
                return 1
            }
            const maxDim = points.map((pt) => Math.max(pt.x, pt.y)).sort((a, b) => b - a)[0];
            return cnv.width / maxDim;
        }

        function initDownload (url) {
            const anchor = document.createElement('a');
            anchor.setAttribute('href', url);
            anchor.setAttribute('download', 'route.png');
            const ev = new MouseEvent('click');
            anchor.dispatchEvent(ev);
        }

        function formattedFactorial(num){
            const fact = factorial(num);
            const pow = parseInt(fact.toString().split('e+')[1]);
            return Math.round(fact / Math.pow(10, pow)).toString() + ('0').repeat(pow)
        }
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),

/***/ 786:
/***/ (function(module, exports) {

module.exports = "<div layout=\"column\" flex>\r\n    <div class=\"algo-controls\" layout=\"row\" layout-align=\"space-between start\">\r\n        <div layout=\"column\" flex=\"60\">\r\n            <div layout=\"row\" layout-align=\"space-between center\">\r\n                <div flex=\"45\">\r\n                    <md-switch ng-model=\"ctrl.usePreset\" aria-label=\"Use Preset\">\r\n                        Preset Points\r\n                    </md-switch>\r\n                </div>\r\n                <div flex=\"45\">\r\n                    <md-checkbox ng-model=\"ctrl.isClosed\" aria-label=\"Closed route\">\r\n                        Closed route\r\n                    </md-checkbox>\r\n                </div>\r\n            </div>\r\n            <div layout=\"column\" flex ng-if=\"ctrl.usePreset\">\r\n                <md-input-container class=\"md-block\">\r\n                    <label>Points</label>\r\n                    <textarea ng-model=\"ctrl.preset\" rows=\"3\" max-rows=\"3\"></textarea>\r\n                </md-input-container>\r\n            </div>\r\n            <div layout=\"column\" flex ng-if=\"!ctrl.usePreset\">\r\n                <md-slider-container>\r\n                    <span>Size</span>\r\n                    <md-slider min=\"500\" max=\"1200\" ng-model=\"ctrl.mapSize\" aria-label=\"red\" id=\"map-size-slider\"\r\n                               class=\"md-warn\">\r\n                    </md-slider>\r\n                    <md-input-container>\r\n                        <input type=\"number\" ng-model=\"ctrl.mapSize\" aria-label=\"map size\" aria-controls=\"map-size-slider\">\r\n                    </md-input-container>\r\n                </md-slider-container>\r\n                <md-slider-container>\r\n                    <span>Points</span>\r\n                    <md-slider min=\"4\" max=\"100\" ng-model=\"ctrl.pointsNumber\" aria-label=\"red\" id=\"points-number-slider\"\r\n                               class=\"md-warn\">\r\n                    </md-slider>\r\n                    <md-input-container>\r\n                        <input type=\"number\" ng-model=\"ctrl.pointsNumber\" aria-label=\"points number\" aria-controls=\"points-number-slider\">\r\n                    </md-input-container>\r\n                </md-slider-container>\r\n            </div>\r\n        </div>\r\n        <div layout=\"column\" flex=\"30\">\r\n            <div layout=\"row\" layout-align=\"space-between center\">\r\n                <div flex=\"45\">\r\n                    <md-input-container class=\"no-errors\">\r\n                        <label>max. T</label>\r\n                        <input type=\"number\" ng-model=\"ctrl.maxTemp\" aria-label=\"initial temperature\">\r\n                    </md-input-container>\r\n                </div>\r\n                <div flex=\"45\">\r\n                    <md-input-container class=\"no-errors\">\r\n                        <label>min. T</label>\r\n                        <input type=\"number\" ng-model=\"ctrl.minTemp\" aria-label=\"minimal temperature\">\r\n                    </md-input-container>\r\n                </div>\r\n            </div>\r\n            <div layout=\"row\" layout-align=\"space-between center\">\r\n                <div flex></div>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.rebuildRoute()\" aria-label=\"rebuild route\" ng-disabled=\"ctrl.simAnneal && ctrl.simAnneal.isRunning\">Repeat</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.rebuildRoute(true)\" aria-label=\"rebuild route\" ng-disabled=\"ctrl.simAnneal && ctrl.simAnneal.isRunning\">Search</md-button>\r\n            </div>\r\n            <div layout=\"row\" layout-align=\"center\">\r\n                <div flex></div>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.addSolution()\" aria-label=\"rebuild route\" ng-disabled=\"!ctrl.preset\">Add</md-button>\r\n                <md-button class=\"md-warn\" ng-click=\"ctrl.stopRouteSearch()\" aria-label=\"stop route search\" ng-disabled=\"!ctrl.simAnneal || !ctrl.simAnneal.isRunning\">Stop</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"algo-benchmark\"  ng-if=\"ctrl.bestRoute\">\r\n        <div>\r\n            <p><strong>Permutations</strong></p>\r\n            <p>{{ctrl.bestRoute.limit | pownumber}} / {{ctrl.bestRoute.total | pownumber}}</p>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div>\r\n            <p><strong>Duration</strong><br>{{ctrl.bestRoute.duration}}ms</p>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div>\r\n            <p><strong>Single sample</strong><br>{{ctrl.bestRoute.bench}}ms</p>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div>\r\n            <p><strong>Est. calc. time</strong><br>{{ctrl.bestRoute.estimate.years() | pownumber}} years</p>\r\n        </div>\r\n        <div>\r\n            <p><strong>Start cost</strong><br>{{ctrl.bestRoute.cost}}</p>\r\n        </div>\r\n    </div>\r\n    <!--<div class=\"algo-best-route\" ng-if=\"ctrl.bestRoute && ctrl.pointsNumber < 10\">\r\n        <div ng-repeat=\"item in ctrl.bestRoute.state track by $index\">{{item.x}} x {{item.y}}</div>\r\n    </div>-->\r\n    <div class=\"algo-solutions\">\r\n        <div layout=\"row\"\r\n             layout-align=\"start center\"\r\n             ng-repeat=\"solution in ctrl.simAnneal.solutions\"\r\n             ng-mouseenter=\"ctrl.focusSolution($index)\"\r\n             ng-mouseleave=\"ctrl.focusSolution(-1)\" ng-click=\"ctrl.downloadSolution($index)\">\r\n            <div class=\"legend-bullet\" ng-style=\"{'background-color': solution.color}\"></div>\r\n            <div flex>{{solution.cost}}</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"algo-draw-scroller\">\r\n        <div class=\"route-draw-container\" ng-style=\"{'min-width': ctrl.mapSize + 'px', 'min-height': ctrl.mapSize + 'px'}\">\r\n            <div class=\"route-info\"></div>\r\n            <div class=\"route-solution\"\r\n                 ng-repeat=\"solution in ctrl.simAnneal.solutions\">\r\n                <canvas width=\"{{ctrl.mapSize}}\" height=\"{{ctrl.mapSize}}\" id=\"solution_{{$index}}\"></canvas>\r\n                <div ng-init=\"ctrl.drawSolution($index)\"></div>\r\n            </div>\r\n            <div class=\"route-current-search\">\r\n                <canvas width=\"{{ctrl.mapSize}}\" height=\"{{ctrl.mapSize}}\" id=\"current_search\"></canvas>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 787:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {module.exports = function(vrp){
    vrp.service('routePlotter', routePlotter);
    routePlotter.$inject = ['pointFactory'];

    function routePlotter(pointFactory){
        const COLORS = [
            '#2196F3',
            '#F44336',
            '#FFC107',
            '#4CAF50',
            '#FF9800',
            '#009688',
            '#9C27B0',
            '#FFEB3B',
            '#3F51B5',
            '#CDDC39'
        ];



        class RoutePlotter {
            constructor(element){
                this.element = $(element);
                this.routeInfo = this.element.find('.route-info');
                this.canvas = document.getElementById('current_search');
                this.ctx = this.canvas.getContext('2d');
                this.colorIterator = COLORS.values();
                this.sf = 1;
            }

            getColor(){
                let item = this.colorIterator.next();
                if (!item.value){
                    this.colorIterator = COLORS.values();
                    item = this.colorIterator.next();
                }
                return item.value;
            }

            getPointElem(point){
                const elem =  $(document.createElement('div')).text(point.name);
                point.cssStyle.forEach((css) => {
                    elem.addClass(css);
                });
                return elem;
            }

            getBestSolution(vrp = this.vrp){
                return vrp.solutions.reduce((res, sol) => sol.cost < res.cost ? sol : res, {cost: Number.MAX_VALUE})
            }
            setVehicles(vrp){
                if (!vrp.vehicles){
                    return this;
                }
                vrp.vehicles.forEach((vhc) => {
                    const {x, y} = vhc.startLocation ? vhc.startLocation.coord : vhc.location.coord;
                    const point = new RoutePoint(x, y)
                        .setCss('material-icons')
                        .setCss('vrp-vehicle')
                        .setName('local_shipping');
                    this.vehicles.set(vhc.id, point);
                });
                return this;
            }
            setShipments(vrp){
                if (!vrp.shipments){
                    return this;
                }
                vrp.shipments.forEach((shipment) => {
                    const {x: px, y: py} = shipment.pickup.location.coord;
                    const {x: dx, y: dy} = shipment.delivery.location.coord;
                    const ploc = new RoutePoint(px, py).setCss('vrp-pickup').setName(shipment.id);
                    const dloc = new RoutePoint(dx, dy).setCss('vrp-delivery').setName(shipment.id);
                    this.shipments.set(shipment.id, {
                        pickup: ploc,
                        delivery: dloc,
                        capacity: shipment.capacityDemand || 0,
                        dist: Math.round(ploc.getDistance(dloc) * 10) / 10
                    });
                });
                return this;
            }
            setRoutes(vrp){
                if (!vrp.solutions){
                    return this;
                }
                const bestSolution = this.getBestSolution(vrp);
                bestSolution.routes.forEach((route) => {
                    const points = route.act.reduce((res, act) => {
                        if (this.shipments.has(act.shipmentId)){
                            const shp = this.shipments.get(act.shipmentId);
                            res.push(act.type.startsWith('pickup') ? shp.pickup : shp.delivery)
                        }
                        return res;
                    }, []);
                    if (this.vehicles.has(route.vehicleId)){
                        points.unshift(this.vehicles.get(route.vehicleId));
                    }
                    this.routes.set(route.vehicleId, {color: this.getColor(), points})
                });
                return this;
            }
            setVRP(vrp){
                this.vrp = vrp;
                return this.setVehicles(vrp)
                    .setShipments(vrp)
                    .setRoutes(vrp);
            }

            addPoint(point){
                const realPoint = point.getScaled(this.sf);
                const {x, y} = realPoint;
                const elem = this.getPointElem(point);
                elem.css({
                    top: y - 12 + 'px',
                    left: x - 12 + 'px'
                });
                this.element.append(elem);
                return elem;
            }

            addShipment(shipment){
                if (!shipment){
                    return;
                }
                const {pickup: ploc, delivery: dloc} = shipment;

                this.addPoint(ploc);
                this.addPoint(dloc);
                this.drawRoute([ploc, dloc]);
                this.addCapacity(shipment);
                return this;
            }

            addCapacity(shipment){
                if (!shipment){
                    return;
                }
                const {pickup: ploc, capacity: capacity} = shipment;
                const elem = angular.element('<div class="vrp-capacity"><div class="vrp-capacity-link"></div>' +
                    `<div class="vrp-capacity-data">${capacity}</div></div>`);
                const rp = ploc.getScaled(this.sf);
                elem.css({
                    top: rp.y + 12 + 'px',
                    left: rp.x - 12 + 'px'
                }).addClass('vrp-point-hidden');
                this.element.append(elem);
                return elem;
            }

            drawRoute(points, color){
                this.ctx.strokeStyle = color || 'rgba(0, 0, 0, .20)';
                this.ctx.lineWidth = 2;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.setLineDash(color ? [] : [8, 8]);

                const realPoints = points.map((point) => point.getScaled(this.sf));

                this.ctx.beginPath();
                this.ctx.moveTo(realPoints[0].x, realPoints[0].y);
                realPoints.slice(1).forEach((point, idx) => {
                    const dist = points[idx].getDistance(points[idx + 1]).toFixed(1);
                    const mid = points[idx].getMidPoint(points[idx + 1])
                        .setCss('vrp-distance')
                        .setCss('vrp-point-hidden')
                        .setName(dist);
                    const colorStyle = {'background-color': color || '#455A64'};
                    this.addPoint(mid).css(colorStyle);
                    this.ctx.lineTo(point.x, point.y);
                });
                this.ctx.stroke();
                return this;
            }

            drawSolution(){
                this.routes.forEach((item) => {
                    this.drawRoute(item.points, item.color);
                });
                return this;
            }

            plotVRP(){
                if (!this.vrp){
                    return
                }
                this.vehicles.forEach((point) => {
                    this.addPoint(point, TYPES.vehicle);
                });
                this.shipments.forEach((shp) => {
                    this.addShipment(shp);
                });

            }

            plotSolution(){
                const bestSolution = this.vrp.solutions.reduce((res, sol) => {
                    return sol.cost < res.cost ? sol : res;
                }, {cost: Number.MAX_VALUE});
                this.drawSolution(bestSolution);
            }

            reset(){
                this.shipments.clear();
                this.vehicles.clear();
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.element.find('.vrp-point').remove();
            }

            setScale(sf){
                this.sf = sf;
                return this;
            }

        }

        this.getInstance = (elem) => {
            return new RoutePlotter(elem);
        }
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),

/***/ 788:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {module.exports = function(vrp) {
    vrp.directive('vrpDraw', vrpDrawDirective);
    vrpDrawDirective.$inject = [];

    function vrpDrawDirective() {
        return {
            restrict: 'E',
            scope: {},
            template: __webpack_require__(789),
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),

/***/ 789:
/***/ (function(module, exports) {

module.exports = "<div layout=\"column\" flex>\r\n    <div class=\"algo-controls\" layout=\"row\" layout-align=\"space-between start\">\r\n        <div layout=\"column\" flex=\"50\">\r\n            <md-input-container class=\"md-block\">\r\n                <label>VRP</label>\r\n                <textarea ng-model=\"ctrl.vrpData\" rows=\"6\" max-rows=\"6\"></textarea>\r\n            </md-input-container>\r\n        </div>\r\n        <div layout=\"column\" flex=\"40\">\r\n            <div layout=\"column\" flex>\r\n                <md-switch ng-model=\"ctrl.filters.showDist\" aria-label=\"Show Distances\">\r\n                    Show distances\r\n                </md-switch>\r\n                <md-switch ng-model=\"ctrl.filters.showCapDemand\" aria-label=\"Show required capacity\">\r\n                    Show required capacity\r\n                </md-switch>\r\n            </div>\r\n            <div layout=\"row\">\r\n                <div flex></div>\r\n                <md-button ng-click=\"ctrl.plotter.reset()\" aria-label=\"reset\" ng-disabled=\"!ctrl.plotter\">Reset</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.plotSolution()\" aria-label=\"draw Solution\" ng-disabled=\"!ctrl.plotter\">Solution</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.plotVRP()\" aria-label=\"draw VRP\" ng-disabled=\"!ctrl.plotter\">VRP</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"algo-draw-scroller\">\r\n        <div class=\"vrp-draw-container\">\r\n            <div class=\"vrp-point-container\">\r\n                <canvas width=\"800\" height=\"800\"></canvas>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 790:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {module.exports = function(vrp){
    vrp.service('vrpPlotter', vrpPlotter);
    vrpPlotter.$inject = ['pointFactory'];

    function vrpPlotter(pointFactory){
        const TYPES = {
            delivery: {
                cssClass: 'vrp-delivery material-icons',
                icon: 'archive'
            },
            pickup: {
                cssClass: 'vrp-pickup material-icons',
                icon: 'unarchive'
            },
            vehicle: {
                cssClass: 'vrp-vehicle material-icons',
                icon: 'local_shipping'
            }
        };
        const COLORS = [
            '#2196F3',
            '#F44336',
            '#FFC107',
            '#4CAF50',
            '#FF9800',
            '#009688',
            '#9C27B0',
            '#FFEB3B',
            '#3F51B5',
            '#CDDC39'
        ];

        class RoutePoint extends pointFactory.RPoint {
            constructor(x, y){
                super(x, y);
                this.cssStyle = new Set();
                this.name = null;
                this.cssStyle.add('vrp-point');
            }

            setCss(css){
                this.cssStyle.add(css);
                return this;
            }

            setName(name){
                this.name = name;
                return this;
            }
        }

        class VRPPlotter {
            constructor(element){
                this.element = $(element);
                this.canvas = this.element.find('canvas')[0];
                this.ctx = this.canvas.getContext('2d');
                this.shipments = new Map();
                this.services = new Map();
                this.vehicles = new Map();
                this.routes = new Map();
                this.colorIterator = COLORS.values();
                this.sf = 1;
                this.vrp = null;
            }

            getColor(){
                let item = this.colorIterator.next();
                if (!item.value){
                    this.colorIterator = COLORS.values();
                    item = this.colorIterator.next();
                }
                return item.value;
            }

            getPointElem(point){
                const elem =  $(document.createElement('div')).text(point.name);
                point.cssStyle.forEach((css) => {
                    elem.addClass(css);
                });
                return elem;
            }

            getBestSolution(vrp = this.vrp){
                return vrp.solutions.reduce((res, sol) => sol.cost < res.cost ? sol : res, {cost: Number.MAX_VALUE})
            }
            setVehicles(vrp){
                if (!vrp.vehicles){
                    return this;
                }
                vrp.vehicles.forEach((vhc) => {
                    const vhcLoc = {
                        start: null,
                        end: null
                    };
                    if (vhc.startLocation){
                        const {x, y} = vhc.startLocation.coord;
                        vhcLoc.start = new RoutePoint(x, y)
                            .setCss('material-icons')
                            .setCss('vrp-vehicle')
                            .setName('local_shipping');
                    }
                    if (vhc.endLocation){
                        const {x, y} = vhc.endLocation.coord;
                        vhcLoc.end = new RoutePoint(x, y)
                            .setCss('material-icons')
                            .setCss('vrp-vehicle')
                            .setName('local_shipping');
                    }
                    this.vehicles.set(vhc.id, vhcLoc);
                });
                return this;
            }
            setShipments(vrp){
                if (!vrp.shipments || !vrp.shipments.length){
                    return this;
                }
                vrp.shipments.forEach((shipment) => {
                    const {x: px, y: py} = shipment.pickup.location.coord;
                    const {x: dx, y: dy} = shipment.delivery.location.coord;
                    const ploc = new RoutePoint(px, py).setCss('vrp-pickup').setName(shipment.id.slice(3));
                    const dloc = new RoutePoint(dx, dy).setCss('vrp-delivery').setName(shipment.id.slice(3));
                    this.shipments.set(shipment.id, {
                        pickup: ploc,
                        delivery: dloc,
                        capacity: shipment.capacityDemand[0] || 0,
                        dist: Math.round(ploc.getDistance(dloc) * 10) / 10
                    });
                });
                return this;
            }
            setServices(vrp){
                if (!vrp.services || !vrp.services.length){
                    return this;
                }
                vrp.services.forEach((service) => {
                    const {x, y} = service.location.coord;
                    const loc = new RoutePoint(x, y).setCss('vrp-' + service.type).setName(service.id.slice(3));
                    this.services.set(service.id, {
                        location: loc,
                        capacity: service.capacityDemand[0] || 0
                    });
                });
                return this;
            }
            setRoutes(vrp){
                if (!vrp.solutions){
                    return this;
                }
                const bestSolution = this.getBestSolution(vrp);
                bestSolution.routes.forEach((route, idx) => {
                    const points = route.act.reduce((res, act) => {
                        if (this.shipments.has(act.jobId)){
                            const shp = this.shipments.get(act.jobId);
                            res.push(act.type.startsWith('pickup') ? shp.pickup : shp.delivery)
                        }
                        if (this.services.has(act.jobId)){
                            const svc = this.services.get(act.jobId);
                            res.push(svc.location)
                        }
                        return res;
                    }, []);
                    if (this.vehicles.has(route.vehicleId)){
                        const vhcLoc = this.vehicles.get(route.vehicleId);
                        vhcLoc.start && points.unshift(vhcLoc.start);
                        vhcLoc.end && points.push(vhcLoc.end);
                    }
                    this.routes.set('route' + idx, {color: this.getColor(), points})
                });
                return this;
            }
            setVRP(vrp){
                this.vrp = vrp;
                return this.setVehicles(vrp)
                    .setShipments(vrp)
                    .setServices(vrp)
                    .setRoutes(vrp)
                    .setScale(vrp);
            }

            addPoint(point){
                const realPoint = point.getScaled(this.sf);
                const {x, y} = realPoint;
                const elem = this.getPointElem(point);
                elem.css({
                    top: y - 12 + 'px',
                    left: x - 12 + 'px'
                });
                this.element.append(elem);
                return elem;
            }

            addService(service){
                if (!service){
                    return;
                }
                const {location: loc} = service;

                this.addPoint(loc);
                this.addServiceCapacity(service);
                return this;
            }

            addServiceCapacity(service){
                if (!service){
                    return;
                }
                const {location: loc, capacity: capacity} = service;
                const elem = angular.element('<div class="vrp-capacity"><div class="vrp-capacity-link"></div>' +
                    `<div class="vrp-capacity-data">${capacity}</div></div>`);
                const rp = loc.getScaled(this.sf);
                elem.css({
                    top: rp.y + 12 + 'px',
                    left: rp.x - 12 + 'px'
                }).addClass('vrp-point-hidden');
                this.element.append(elem);
                return elem;
            }

            addShipment(shipment){
                if (!shipment){
                    return;
                }
                const {pickup: ploc, delivery: dloc} = shipment;

                this.addPoint(ploc);
                this.addPoint(dloc);
                this.drawRoute([ploc, dloc]);
                this.addShipmentCapacity(shipment);
                return this;
            }

            addShipmentCapacity(shipment){
                if (!shipment){
                    return;
                }
                const {pickup: ploc, capacity: capacity} = shipment;
                const elem = angular.element('<div class="vrp-capacity"><div class="vrp-capacity-link"></div>' +
                    `<div class="vrp-capacity-data">${capacity}</div></div>`);
                const rp = ploc.getScaled(this.sf);
                elem.css({
                    top: rp.y + 12 + 'px',
                    left: rp.x - 12 + 'px'
                }).addClass('vrp-point-hidden');
                this.element.append(elem);
                return elem;
            }

            drawRoute(points, color){
                this.ctx.strokeStyle = color || 'rgba(0, 0, 0, .20)';
                this.ctx.lineWidth = 2;
                this.ctx.lineCap = 'round';
                this.ctx.lineJoin = 'round';
                this.ctx.setLineDash(color ? [] : [8, 8]);

                const realPoints = points.map((point) => point.getScaled(this.sf));

                this.ctx.beginPath();
                this.ctx.moveTo(realPoints[0].x, realPoints[0].y);
                realPoints.slice(1).forEach((point, idx) => {
                    const dist = points[idx].getDistance(points[idx + 1]).toFixed(1);
                    const mid = points[idx].getMidPoint(points[idx + 1])
                        .setCss('vrp-distance')
                        .setCss('vrp-point-hidden')
                        .setName(dist);
                    const colorStyle = {'background-color': color || '#455A64'};
                    this.addPoint(mid).css(colorStyle);
                    this.ctx.lineTo(point.x, point.y);
                });
                this.ctx.stroke();
                return this;
            }

            drawSolution(){
                this.routes.forEach((item) => {
                    this.drawRoute(item.points, item.color);
                });
                return this;
            }

            plotVRP(){
                if (!this.vrp){
                    return
                }
                this.vehicles.forEach((vhc) => {
                    this.addPoint(vhc.start, TYPES.vehicle);
                    if (vhc.end && !vhc.end.equals(vhc.start)){
                        this.addPoint(vhc.end, TYPES.vehicle);
                    }
                });
                this.shipments.forEach((shp) => {
                    this.addShipment(shp);
                });
                this.services.forEach((svc) => {
                    this.addService(svc);
                });
            }

            plotSolution(){
                const bestSolution = this.vrp.solutions.reduce((res, sol) => {
                    return sol.cost < res.cost ? sol : res;
                }, {cost: Number.MAX_VALUE});
                console.log(bestSolution);
                this.drawSolution(bestSolution);
            }

            reset(){
                this.shipments.clear();
                this.services.clear();
                this.vehicles.clear();
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.element.find('.vrp-point').remove();
                this.sf = 1;
            }

            setScale(vrp){
                if (vrp){
                    const vhcMax = vrp.vehicles.map((vhc) => {
                        let smax = 0;
                        let emax = 0;
                        if (vhc.startLocation){
                            let {x, y} = vhc.startLocation.coord;
                            smax = Math.max(x, y)
                        }
                        if (vhc.endLocation){
                            let {x, y} = vhc.endLocation.coord;
                            emax = Math.max(x, y)
                        }
                        return Math.max(smax, emax);
                    }).sort((a, b) => b - a)[0] || 0;

                    const svcMax = vrp.services.map((svc) => Math.max(svc.location.coord.x, svc.location.coord.y)).sort((a, b) => b - a)[0] || 0;

                    const shpMax = vrp.shipments.map((shp) => {
                        let pmax = 0;
                        let dmax = 0;
                        if (shp.pickup.location){
                            let {x, y} = shp.pickup.location.coord;
                            pmax = Math.max(x, y)
                        }
                        if (shp.delivery.location){
                            let {x, y} = shp.delivery.location.coord;
                            dmax = Math.max(x, y)
                        }
                        return Math.max(pmax, dmax);
                    }).sort((a, b) => b - a)[0] || 0;

                    this.sf = this.canvas.width / Math.max(vhcMax, svcMax, shpMax);
                }
                return this;
            }

        }

        this.getInstance = (elem) => {
            return new VRPPlotter(elem);
        }
    }
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ })

},[749]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvdGVtcGxhdGVzL2FsZ28uaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMgLmNzcyQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLWRyYXcuY3NzIiwid2VicGFjazovLy8uL2NzcyAuY3NzJCIsIndlYnBhY2s6Ly8vLi9jc3MvYWdncmlkLmNzcyIsIndlYnBhY2s6Ly8vLi9jc3MvY2hlY2tpby5jc3MiLCJ3ZWJwYWNrOi8vLy4vY3NzL21haW4uY3NzIiwid2VicGFjazovLy8uL2Nzcy9zY3JvbGxwYWQuY3NzIiwid2VicGFjazovLy8uL2FwcC9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcmVzb3VyY2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcmVzb3VyY2UvYW5ndWxhci1yZXNvdXJjZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29uc3RhbnRzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9jb25zdGFudHMvYXBpLXJlcXVlc3RzLmpzIiwid2VicGFjazovLy8uL2FwcC9jb25zdGFudHMvbWQtY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL2FwcC9jb250cm9sbGVycyAuK1xcLmpzJCIsIndlYnBhY2s6Ly8vLi9hcHAvY29udHJvbGxlcnMvcm91dGUtY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZGlyZWN0aXZlcyAuK1xcLmpzJCIsIndlYnBhY2s6Ly8vLi9hcHAvZGlyZWN0aXZlcy9hcC1tZC1jb2xvci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvZGlyZWN0aXZlcy9yZXNpemVyLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcyAuK1xcLmpzJCIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvYXBpLXJlcXVlc3QtcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzL2NvbG9yLWRlZi1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9kb3VibGUtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvZXZlbnQtZW1pdHRlci1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9yZXNpemUtc2Vuc29yLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9zbGFzaC1wYXJhbS1zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9zdG9yYWdlLXByb3ZpZGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2FsZ28vYmlnbnVtYmVyLWZpbHRlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL2dlbmV0aWMtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL3Blcm11dGF0aW9uLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYWxnby9wb2ludC1mYWN0b3J5LmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2FsZ28vc2ltLWFubmVhbC1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvay1tZWFuL2stbWVhbi1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3RzcC9yb3V0ZS1kcmF3LWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtcGxvdHRlci1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvdnJwL3ZycC1kcmF3LXRwbC5odG1sIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtcGxvdHRlci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUlBQWlJLG9DQUFvQyxtbUI7Ozs7Ozs7QUNBcks7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixtQkFBTyxDQUFDLEdBQWlDO0FBQ3JFOztBQUVBLCtCQUErQix3QkFBK0M7QUFDOUUsK0JBQStCLHdCQUEyQzs7QUFFMUUsWUFBWSxtQkFBTyxDQUFDLEdBQVU7O0FBRTlCLHlCQUF5Qix3QkFBZ0Q7QUFDekUsNENBQTRDLDJDQUEyQzs7QUFFdkYsMkJBQTJCLHdCQUFrRDtBQUM3RSw4Q0FBOEMsNkNBQTZDOztBQUUzRiwwQkFBMEIsd0JBQWlEO0FBQzNFLDZDQUE2Qyw0Q0FBNEM7O0FBRXpGLHdCQUF3Qix3QkFBK0M7QUFDdkUsMkNBQTJDLDBDQUEwQzs7QUFFckYsMEJBQTBCLHdCQUFpRDtBQUMzRSw2Q0FBNkMsNENBQTRDOzs7Ozs7Ozs7Ozs7OztBQ3pCekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDakJBLHlDOzs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDcEJBLHlDOzs7Ozs7O0FDQUEseUM7Ozs7Ozs7QUNBQSx5Qzs7Ozs7OztBQ0FBLHlDOzs7Ozs7OztBQ0NB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OztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsOEJBQThCLGtCQUFrQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHOzs7QUFHSCxDQUFDOzs7Ozs7OztBQzk0QkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7Ozs7QUNsQkE7QUFDQTs7QUFFQSxLQUFLO0FBQ0w7Ozs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7OztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Qjs7Ozs7OztBQ2pCQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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M0hBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixJQUFJO0FBQ3JCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDM0lBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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ImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImFsZ28tY29udGFpbmVyXFxcIiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgbGF5b3V0LWFsaWduPVxcXCJzdGFydCBjZW50ZXJcXFwiIG1kLXRoZW1lPVxcXCJhbGdvXFxcIiBhcC1tZC1jb2xvcj1cXFwieydiYWNrZ3JvdW5kLWNvbG9yJzogJ2FsZ286OnByaW1hcnknfVxcXCI+XFxyXFxuICAgIDxtZC10YWJzIG1kLWJvcmRlci1ib3R0b20gbWQtc2VsZWN0ZWQ9XFxcInZtLmFjdGl2ZVRhYkluZGV4XFxcIj5cXHJcXG4gICAgICAgIDxtZC10YWIgbGFiZWw9XFxcIlRTUFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxnby13cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHJvdXRlLWRyYXc+PC9yb3V0ZS1kcmF3PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9tZC10YWI+XFxyXFxuICAgICAgICA8bWQtdGFiIGxhYmVsPVxcXCJrLU1lYW5zXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLXdyYXBwZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ay1tZWFuPjwvay1tZWFuPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9tZC10YWI+XFxyXFxuICAgICAgICA8bWQtdGFiIGxhYmVsPVxcXCJWUlBcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZ28td3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDx2cnAtZHJhdz48L3ZycC1kcmF3PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9tZC10YWI+XFxyXFxuICAgIDwvbWQtdGFicz5cXHJcXG48L2Rpdj5cXHJcXG48ZGl2PldURj8/PzwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvdGVtcGxhdGVzL2FsZ28uaHRtbFxuLy8gbW9kdWxlIGlkID0gMjk5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFVzZXIgb24gMTYuMDUuMTcuXHJcbiAqL1xyXG5cclxuY29uc3QgYW5ndWxhclJlc291cmNlVXRpbCA9IHJlcXVpcmUoJ3dlYnBhY2stYW5ndWxhci1yZXNvdXJjZS1wbHVnaW4nKTtcclxuLy8gU1RZTEVTXHJcblxyXG5hbmd1bGFyUmVzb3VyY2VVdGlsLnJlcXVpcmVBbGwocmVxdWlyZS5jb250ZXh0KFwiLi9jb21wb25lbnRzL1wiLCB0cnVlLCAvLmNzcyQvKSk7XHJcbmFuZ3VsYXJSZXNvdXJjZVV0aWwucmVxdWlyZUFsbChyZXF1aXJlLmNvbnRleHQoXCIuLy4uL2Nzcy9cIiwgdHJ1ZSwgLy5jc3MkLykpO1xyXG5cclxuY29uc3QgdnJwID0gcmVxdWlyZSgnLi9hcHAuanMnKTtcclxuXHJcbmNvbnN0IGNvbnRleHRDb25zdGFudHMgPSByZXF1aXJlLmNvbnRleHQoJy4vY29uc3RhbnRzLycsIHRydWUsIC8uK1xcLmpzJC8pO1xyXG5jb250ZXh0Q29uc3RhbnRzLmtleXMoKS5tYXAoZnVuY3Rpb24gKGtleSkgeyBjb250ZXh0Q29uc3RhbnRzLmFwcGx5KG51bGwsIFtrZXldKSh2cnApIH0pO1xyXG5cclxuY29uc3QgY29udGV4dENvbnRyb2xsZXJzID0gcmVxdWlyZS5jb250ZXh0KCcuL2NvbnRyb2xsZXJzLycsIHRydWUsIC8uK1xcLmpzJC8pO1xyXG5jb250ZXh0Q29udHJvbGxlcnMua2V5cygpLm1hcChmdW5jdGlvbiAoa2V5KSB7IGNvbnRleHRDb250cm9sbGVycy5hcHBseShudWxsLCBba2V5XSkodnJwKSB9KTtcclxuXHJcbmNvbnN0IGNvbnRleHREaXJlY3RpdmVzID0gcmVxdWlyZS5jb250ZXh0KCcuL2RpcmVjdGl2ZXMvJywgdHJ1ZSwgLy4rXFwuanMkLyk7XHJcbmNvbnRleHREaXJlY3RpdmVzLmtleXMoKS5tYXAoZnVuY3Rpb24gKGtleSkgeyBjb250ZXh0RGlyZWN0aXZlcy5hcHBseShudWxsLCBba2V5XSkodnJwKSB9KTtcclxuXHJcbmNvbnN0IGNvbnRleHRTZXJ2aWNlcyA9IHJlcXVpcmUuY29udGV4dCgnLi9zZXJ2aWNlcy8nLCB0cnVlLCAvLitcXC5qcyQvKTtcclxuY29udGV4dFNlcnZpY2VzLmtleXMoKS5tYXAoZnVuY3Rpb24gKGtleSkgeyBjb250ZXh0U2VydmljZXMuYXBwbHkobnVsbCwgW2tleV0pKHZycCkgfSk7XHJcblxyXG5jb25zdCBjb250ZXh0Q29tcG9uZW50cyA9IHJlcXVpcmUuY29udGV4dCgnLi9jb21wb25lbnRzLycsIHRydWUsIC8uK1xcLmpzJC8pO1xyXG5jb250ZXh0Q29tcG9uZW50cy5rZXlzKCkubWFwKGZ1bmN0aW9uIChrZXkpIHsgY29udGV4dENvbXBvbmVudHMuYXBwbHkobnVsbCwgW2tleV0pKHZycCkgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3NDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL3RzcC9yb3V0ZS1kcmF3LmNzc1wiOiA3NTFcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3NTA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cyAuY3NzJFxuLy8gbW9kdWxlIGlkID0gNzUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDc1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWdncmlkLmNzc1wiOiA3NTMsXG5cdFwiLi9jaGVja2lvLmNzc1wiOiA3NTQsXG5cdFwiLi9tYWluLmNzc1wiOiA3NTUsXG5cdFwiLi9zY3JvbGxwYWQuY3NzXCI6IDc1NlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDc1MjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NzcyAuY3NzJFxuLy8gbW9kdWxlIGlkID0gNzUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jc3MvYWdncmlkLmNzc1xuLy8gbW9kdWxlIGlkID0gNzUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jc3MvY2hlY2tpby5jc3Ncbi8vIG1vZHVsZSBpZCA9IDc1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY3NzL21haW4uY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Nzcy9zY3JvbGxwYWQuY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbmNvbnN0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmNvbnN0IG1hdGggPSByZXF1aXJlKCdtYXRoanMnKTtcclxuXHJcbm1hdGguY29uZmlnKHtudW1iZXI6ICdCaWdOdW1iZXInLCBwcmVjaXNpb246IDY0fSk7XHJcblxyXG5jb25zdCB2cnAgPSBhbmd1bGFyLm1vZHVsZSgnVlJQUGxvdHRlcicsIFtcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItdWktcm91dGVyJyksXHJcbiAgICByZXF1aXJlKCdhbmd1bGFyLWFuaW1hdGUnKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItcmVzb3VyY2UnKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItbWVzc2FnZXMnKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItYXJpYScpLFxyXG4gICAgcmVxdWlyZSgnYW5ndWxhci1tYXRlcmlhbCcpLFxyXG4gICAgcmVxdWlyZSgnYW5ndWxhci1maWx0ZXInKVxyXG5dKTtcclxuXHJcbmNvbnN0IGFsZ290cGwgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9hbGdvLmh0bWwnKTtcclxuY29uc29sZS5sb2coYWxnb3RwbCk7XHJcbnZycC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLCAnJG1kVGhlbWluZ1Byb3ZpZGVyJyxcclxuICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgcmVxdWlyZUJhc2U6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgncmVkJylcclxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ29yYW5nZScpXHJcbiAgICAgICAgICAgIC53YXJuUGFsZXR0ZSgncHVycGxlJyk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnYWxnbycpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKVxyXG4gICAgICAgICAgICAud2FyblBhbGV0dGUoJ3BpbmsnKTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FsZ28nKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKFwiYWxnb1wiLCB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUm91dGVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9hbGdvLmh0bWwnKSxcclxuICAgICAgICAgICAgICAgIHVybDogXCIvYWxnb1wiLFxyXG4gICAgICAgICAgICAgICAgb25FbnRlcjogZnVuY3Rpb24gKCRyb290U2NvcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnBhZ2VUaXRsZSA9ICdSb3V0aW5nIGFsZ29yaXRobXMgZGVtbyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZVByb3ZpZGVyKTtcclxuICAgIH1dKTtcclxuXHJcbnZycC5ydW4oXHJcbiAgICBbJyRyb290U2NvcGUnLCAnJHN0YXRlJywgJyRzdGF0ZVBhcmFtcycsXHJcbiAgICAgICAgZnVuY3Rpb24gKCRyb290U2NvcGUsICRzdGF0ZSwgJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJHN0YXRlID0gJHN0YXRlO1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZVBhcmFtcyA9ICRzdGF0ZVBhcmFtcztcclxuXHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJG9uKCckc3RhdGVDaGFuZ2VTdWNjZXNzJywgZnVuY3Rpb24gKGV2ZW50LCB0bywgdG9QYXJhbXMsIGZyb20sIGZyb21QYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUucHJlU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogZnJvbS5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogZnJvbS51cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBmcm9tUGFyYW1zXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5jdXJTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiB0by5uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybDogdG8udXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogdG9QYXJhbXNcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIF1cclxuKTtcclxubW9kdWxlLmV4cG9ydHMgPSB2cnA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvYXBwLmpzXG4vLyBtb2R1bGUgaWQgPSA3NTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwicmVxdWlyZSgnLi9hbmd1bGFyLXJlc291cmNlJyk7XG5tb2R1bGUuZXhwb3J0cyA9ICduZ1Jlc291cmNlJztcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcmVzb3VyY2UvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDc1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEBsaWNlbnNlIEFuZ3VsYXJKUyB2MS43LjhcbiAqIChjKSAyMDEwLTIwMTggR29vZ2xlLCBJbmMuIGh0dHA6Ly9hbmd1bGFyanMub3JnXG4gKiBMaWNlbnNlOiBNSVRcbiAqL1xuKGZ1bmN0aW9uKHdpbmRvdywgYW5ndWxhcikgeyd1c2Ugc3RyaWN0JztcblxudmFyICRyZXNvdXJjZU1pbkVyciA9IGFuZ3VsYXIuJCRtaW5FcnIoJyRyZXNvdXJjZScpO1xuXG4vLyBIZWxwZXIgZnVuY3Rpb25zIGFuZCByZWdleCB0byBsb29rdXAgYSBkb3R0ZWQgcGF0aCBvbiBhbiBvYmplY3Rcbi8vIHN0b3BwaW5nIGF0IHVuZGVmaW5lZC9udWxsLiAgVGhlIHBhdGggbXVzdCBiZSBjb21wb3NlZCBvZiBBU0NJSVxuLy8gaWRlbnRpZmllcnMgKGp1c3QgbGlrZSAkcGFyc2UpXG52YXIgTUVNQkVSX05BTUVfUkVHRVggPSAvXihcXC5bYS16QS1aXyRAXVswLTlhLXpBLVpfJEBdKikrJC87XG5cbmZ1bmN0aW9uIGlzVmFsaWREb3R0ZWRQYXRoKHBhdGgpIHtcbiAgcmV0dXJuIChwYXRoICE9IG51bGwgJiYgcGF0aCAhPT0gJycgJiYgcGF0aCAhPT0gJ2hhc093blByb3BlcnR5JyAmJlxuICAgICAgTUVNQkVSX05BTUVfUkVHRVgudGVzdCgnLicgKyBwYXRoKSk7XG59XG5cbmZ1bmN0aW9uIGxvb2t1cERvdHRlZFBhdGgob2JqLCBwYXRoKSB7XG4gIGlmICghaXNWYWxpZERvdHRlZFBhdGgocGF0aCkpIHtcbiAgICB0aHJvdyAkcmVzb3VyY2VNaW5FcnIoJ2JhZG1lbWJlcicsICdEb3R0ZWQgbWVtYmVyIHBhdGggXCJAezB9XCIgaXMgaW52YWxpZC4nLCBwYXRoKTtcbiAgfVxuICB2YXIga2V5cyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgZm9yICh2YXIgaSA9IDAsIGlpID0ga2V5cy5sZW5ndGg7IGkgPCBpaSAmJiBhbmd1bGFyLmlzRGVmaW5lZChvYmopOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICBvYmogPSAob2JqICE9PSBudWxsKSA/IG9ialtrZXldIDogdW5kZWZpbmVkO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgc2hhbGxvdyBjb3B5IG9mIGFuIG9iamVjdCBhbmQgY2xlYXIgb3RoZXIgZmllbGRzIGZyb20gdGhlIGRlc3RpbmF0aW9uXG4gKi9cbmZ1bmN0aW9uIHNoYWxsb3dDbGVhckFuZENvcHkoc3JjLCBkc3QpIHtcbiAgZHN0ID0gZHN0IHx8IHt9O1xuXG4gIGFuZ3VsYXIuZm9yRWFjaChkc3QsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICBkZWxldGUgZHN0W2tleV07XG4gIH0pO1xuXG4gIGZvciAodmFyIGtleSBpbiBzcmMpIHtcbiAgICBpZiAoc3JjLmhhc093blByb3BlcnR5KGtleSkgJiYgIShrZXkuY2hhckF0KDApID09PSAnJCcgJiYga2V5LmNoYXJBdCgxKSA9PT0gJyQnKSkge1xuICAgICAgZHN0W2tleV0gPSBzcmNba2V5XTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZHN0O1xufVxuXG4vKipcbiAqIEBuZ2RvYyBtb2R1bGVcbiAqIEBuYW1lIG5nUmVzb3VyY2VcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFRoZSBgbmdSZXNvdXJjZWAgbW9kdWxlIHByb3ZpZGVzIGludGVyYWN0aW9uIHN1cHBvcnQgd2l0aCBSRVNUZnVsIHNlcnZpY2VzXG4gKiB2aWEgdGhlICRyZXNvdXJjZSBzZXJ2aWNlLlxuICpcbiAqIFNlZSB7QGxpbmsgbmdSZXNvdXJjZS4kcmVzb3VyY2VQcm92aWRlcn0gYW5kIHtAbGluayBuZ1Jlc291cmNlLiRyZXNvdXJjZX0gZm9yIHVzYWdlLlxuICovXG5cbi8qKlxuICogQG5nZG9jIHByb3ZpZGVyXG4gKiBAbmFtZSAkcmVzb3VyY2VQcm92aWRlclxuICpcbiAqIEBkZXNjcmlwdGlvblxuICpcbiAqIFVzZSBgJHJlc291cmNlUHJvdmlkZXJgIHRvIGNoYW5nZSB0aGUgZGVmYXVsdCBiZWhhdmlvciBvZiB0aGUge0BsaW5rIG5nUmVzb3VyY2UuJHJlc291cmNlfVxuICogc2VydmljZS5cbiAqXG4gKiAjIyBEZXBlbmRlbmNpZXNcbiAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSZXNvdXJjZSB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gKlxuICovXG5cbi8qKlxuICogQG5nZG9jIHNlcnZpY2VcbiAqIEBuYW1lICRyZXNvdXJjZVxuICogQHJlcXVpcmVzICRodHRwXG4gKiBAcmVxdWlyZXMgbmcuJGxvZ1xuICogQHJlcXVpcmVzICRxXG4gKiBAcmVxdWlyZXMgbmcuJHRpbWVvdXRcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEEgZmFjdG9yeSB3aGljaCBjcmVhdGVzIGEgcmVzb3VyY2Ugb2JqZWN0IHRoYXQgbGV0cyB5b3UgaW50ZXJhY3Qgd2l0aFxuICogW1JFU1RmdWxdKGh0dHA6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvUmVwcmVzZW50YXRpb25hbF9TdGF0ZV9UcmFuc2Zlcikgc2VydmVyLXNpZGUgZGF0YSBzb3VyY2VzLlxuICpcbiAqIFRoZSByZXR1cm5lZCByZXNvdXJjZSBvYmplY3QgaGFzIGFjdGlvbiBtZXRob2RzIHdoaWNoIHByb3ZpZGUgaGlnaC1sZXZlbCBiZWhhdmlvcnMgd2l0aG91dFxuICogdGhlIG5lZWQgdG8gaW50ZXJhY3Qgd2l0aCB0aGUgbG93IGxldmVsIHtAbGluayBuZy4kaHR0cCAkaHR0cH0gc2VydmljZS5cbiAqXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nUmVzb3VyY2UgYG5nUmVzb3VyY2VgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICpcbiAqIEJ5IGRlZmF1bHQsIHRyYWlsaW5nIHNsYXNoZXMgd2lsbCBiZSBzdHJpcHBlZCBmcm9tIHRoZSBjYWxjdWxhdGVkIFVSTHMsXG4gKiB3aGljaCBjYW4gcG9zZSBwcm9ibGVtcyB3aXRoIHNlcnZlciBiYWNrZW5kcyB0aGF0IGRvIG5vdCBleHBlY3QgdGhhdFxuICogYmVoYXZpb3IuICBUaGlzIGNhbiBiZSBkaXNhYmxlZCBieSBjb25maWd1cmluZyB0aGUgYCRyZXNvdXJjZVByb3ZpZGVyYCBsaWtlXG4gKiB0aGlzOlxuICpcbiAqIGBgYGpzXG4gICAgIGFwcC5jb25maWcoWyckcmVzb3VyY2VQcm92aWRlcicsIGZ1bmN0aW9uKCRyZXNvdXJjZVByb3ZpZGVyKSB7XG4gICAgICAgLy8gRG9uJ3Qgc3RyaXAgdHJhaWxpbmcgc2xhc2hlcyBmcm9tIGNhbGN1bGF0ZWQgVVJMc1xuICAgICAgICRyZXNvdXJjZVByb3ZpZGVyLmRlZmF1bHRzLnN0cmlwVHJhaWxpbmdTbGFzaGVzID0gZmFsc2U7XG4gICAgIH1dKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgQSBwYXJhbWV0ZXJpemVkIFVSTCB0ZW1wbGF0ZSB3aXRoIHBhcmFtZXRlcnMgcHJlZml4ZWQgYnkgYDpgIGFzIGluXG4gKiAgIGAvdXNlci86dXNlcm5hbWVgLiBJZiB5b3UgYXJlIHVzaW5nIGEgVVJMIHdpdGggYSBwb3J0IG51bWJlciAoZS5nLlxuICogICBgaHR0cDovL2V4YW1wbGUuY29tOjgwODAvYXBpYCksIGl0IHdpbGwgYmUgcmVzcGVjdGVkLlxuICpcbiAqICAgSWYgeW91IGFyZSB1c2luZyBhIHVybCB3aXRoIGEgc3VmZml4LCBqdXN0IGFkZCB0aGUgc3VmZml4LCBsaWtlIHRoaXM6XG4gKiAgIGAkcmVzb3VyY2UoJ2h0dHA6Ly9leGFtcGxlLmNvbS9yZXNvdXJjZS5qc29uJylgIG9yIGAkcmVzb3VyY2UoJ2h0dHA6Ly9leGFtcGxlLmNvbS86aWQuanNvbicpYFxuICogICBvciBldmVuIGAkcmVzb3VyY2UoJ2h0dHA6Ly9leGFtcGxlLmNvbS9yZXNvdXJjZS86cmVzb3VyY2VfaWQuOmZvcm1hdCcpYFxuICogICBJZiB0aGUgcGFyYW1ldGVyIGJlZm9yZSB0aGUgc3VmZml4IGlzIGVtcHR5LCA6cmVzb3VyY2VfaWQgaW4gdGhpcyBjYXNlLCB0aGVuIHRoZSBgLy5gIHdpbGwgYmVcbiAqICAgY29sbGFwc2VkIGRvd24gdG8gYSBzaW5nbGUgYC5gLiAgSWYgeW91IG5lZWQgdGhpcyBzZXF1ZW5jZSB0byBhcHBlYXIgYW5kIG5vdCBjb2xsYXBzZSB0aGVuIHlvdVxuICogICBjYW4gZXNjYXBlIGl0IHdpdGggYC9cXC5gLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0PX0gcGFyYW1EZWZhdWx0cyBEZWZhdWx0IHZhbHVlcyBmb3IgYHVybGAgcGFyYW1ldGVycy4gVGhlc2UgY2FuIGJlIG92ZXJyaWRkZW4gaW5cbiAqICAgYGFjdGlvbnNgIG1ldGhvZHMuIElmIGEgcGFyYW1ldGVyIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIGV2ZXJ5IHRpbWVcbiAqICAgYSBwYXJhbSB2YWx1ZSBuZWVkcyB0byBiZSBvYnRhaW5lZCBmb3IgYSByZXF1ZXN0ICh1bmxlc3MgdGhlIHBhcmFtIHdhcyBvdmVycmlkZGVuKS4gVGhlXG4gKiAgIGZ1bmN0aW9uIHdpbGwgYmUgcGFzc2VkIHRoZSBjdXJyZW50IGRhdGEgdmFsdWUgYXMgYW4gYXJndW1lbnQuXG4gKlxuICogICBFYWNoIGtleSB2YWx1ZSBpbiB0aGUgcGFyYW1ldGVyIG9iamVjdCBpcyBmaXJzdCBib3VuZCB0byB1cmwgdGVtcGxhdGUgaWYgcHJlc2VudCBhbmQgdGhlbiBhbnlcbiAqICAgZXhjZXNzIGtleXMgYXJlIGFwcGVuZGVkIHRvIHRoZSB1cmwgc2VhcmNoIHF1ZXJ5IGFmdGVyIHRoZSBgP2AuXG4gKlxuICogICBHaXZlbiBhIHRlbXBsYXRlIGAvcGF0aC86dmVyYmAgYW5kIHBhcmFtZXRlciBge3ZlcmI6ICdncmVldCcsIHNhbHV0YXRpb246ICdIZWxsbyd9YCByZXN1bHRzIGluXG4gKiAgIFVSTCBgL3BhdGgvZ3JlZXQ/c2FsdXRhdGlvbj1IZWxsb2AuXG4gKlxuICogICBJZiB0aGUgcGFyYW1ldGVyIHZhbHVlIGlzIHByZWZpeGVkIHdpdGggYEBgLCB0aGVuIHRoZSB2YWx1ZSBmb3IgdGhhdCBwYXJhbWV0ZXIgd2lsbCBiZVxuICogICBleHRyYWN0ZWQgZnJvbSB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBvbiB0aGUgYGRhdGFgIG9iamVjdCAocHJvdmlkZWQgd2hlbiBjYWxsaW5nIGFjdGlvbnNcbiAqICAgd2l0aCBhIHJlcXVlc3QgYm9keSkuXG4gKiAgIEZvciBleGFtcGxlLCBpZiB0aGUgYGRlZmF1bHRQYXJhbWAgb2JqZWN0IGlzIGB7c29tZVBhcmFtOiAnQHNvbWVQcm9wJ31gIHRoZW4gdGhlIHZhbHVlIG9mXG4gKiAgIGBzb21lUGFyYW1gIHdpbGwgYmUgYGRhdGEuc29tZVByb3BgLlxuICogICBOb3RlIHRoYXQgdGhlIHBhcmFtZXRlciB3aWxsIGJlIGlnbm9yZWQsIHdoZW4gY2FsbGluZyBhIFwiR0VUXCIgYWN0aW9uIG1ldGhvZCAoaS5lLiBhbiBhY3Rpb25cbiAqICAgbWV0aG9kIHRoYXQgZG9lcyBub3QgYWNjZXB0IGEgcmVxdWVzdCBib2R5KS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdC48T2JqZWN0Pj19IGFjdGlvbnMgSGFzaCB3aXRoIGRlY2xhcmF0aW9uIG9mIGN1c3RvbSBhY3Rpb25zIHRoYXQgd2lsbCBiZSBhdmFpbGFibGVcbiAqICAgaW4gYWRkaXRpb24gdG8gdGhlIGRlZmF1bHQgc2V0IG9mIHJlc291cmNlIGFjdGlvbnMgKHNlZSBiZWxvdykuIElmIGEgY3VzdG9tIGFjdGlvbiBoYXMgdGhlIHNhbWVcbiAqICAga2V5IGFzIGEgZGVmYXVsdCBhY3Rpb24gKGUuZy4gYHNhdmVgKSwgdGhlbiB0aGUgZGVmYXVsdCBhY3Rpb24gd2lsbCBiZSAqb3ZlcndyaXR0ZW4qLCBhbmQgbm90XG4gKiAgIGV4dGVuZGVkLlxuICpcbiAqICAgVGhlIGRlY2xhcmF0aW9uIHNob3VsZCBiZSBjcmVhdGVkIGluIHRoZSBmb3JtYXQgb2Yge0BsaW5rIG5nLiRodHRwI3VzYWdlICRodHRwLmNvbmZpZ306XG4gKlxuICogICAgICAge1xuICogICAgICAgICBhY3Rpb24xOiB7bWV0aG9kOj8sIHBhcmFtczo/LCBpc0FycmF5Oj8sIGhlYWRlcnM6PywgLi4ufSxcbiAqICAgICAgICAgYWN0aW9uMjoge21ldGhvZDo/LCBwYXJhbXM6PywgaXNBcnJheTo/LCBoZWFkZXJzOj8sIC4uLn0sXG4gKiAgICAgICAgIC4uLlxuICogICAgICAgfVxuICpcbiAqICAgV2hlcmU6XG4gKlxuICogICAtICoqYGFjdGlvbmAqKiDigJMge3N0cmluZ30g4oCTIFRoZSBuYW1lIG9mIGFjdGlvbi4gVGhpcyBuYW1lIGJlY29tZXMgdGhlIG5hbWUgb2YgdGhlIG1ldGhvZCBvblxuICogICAgIHlvdXIgcmVzb3VyY2Ugb2JqZWN0LlxuICogICAtICoqYG1ldGhvZGAqKiDigJMge3N0cmluZ30g4oCTIENhc2UgaW5zZW5zaXRpdmUgSFRUUCBtZXRob2QgKGUuZy4gYEdFVGAsIGBQT1NUYCwgYFBVVGAsXG4gKiAgICAgYERFTEVURWAsIGBKU09OUGAsIGV0YykuXG4gKiAgIC0gKipgcGFyYW1zYCoqIOKAkyB7T2JqZWN0PX0g4oCTIE9wdGlvbmFsIHNldCBvZiBwcmUtYm91bmQgcGFyYW1ldGVycyBmb3IgdGhpcyBhY3Rpb24uIElmIGFueSBvZlxuICogICAgIHRoZSBwYXJhbWV0ZXIgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaXQgd2lsbCBiZSBjYWxsZWQgZXZlcnkgdGltZSB3aGVuIGEgcGFyYW0gdmFsdWUgbmVlZHMgdG9cbiAqICAgICBiZSBvYnRhaW5lZCBmb3IgYSByZXF1ZXN0ICh1bmxlc3MgdGhlIHBhcmFtIHdhcyBvdmVycmlkZGVuKS4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgcGFzc2VkIHRoZVxuICogICAgIGN1cnJlbnQgZGF0YSB2YWx1ZSBhcyBhbiBhcmd1bWVudC5cbiAqICAgLSAqKmB1cmxgKiog4oCTIHtzdHJpbmd9IOKAkyBBY3Rpb24gc3BlY2lmaWMgYHVybGAgb3ZlcnJpZGUuIFRoZSB1cmwgdGVtcGxhdGluZyBpcyBzdXBwb3J0ZWQganVzdFxuICogICAgIGxpa2UgZm9yIHRoZSByZXNvdXJjZS1sZXZlbCB1cmxzLlxuICogICAtICoqYGlzQXJyYXlgKiog4oCTIHtib29sZWFuPX0g4oCTIElmIHRydWUgdGhlbiB0aGUgcmV0dXJuZWQgb2JqZWN0IGZvciB0aGlzIGFjdGlvbiBpcyBhbiBhcnJheSxcbiAqICAgICBzZWUgYHJldHVybnNgIHNlY3Rpb24uXG4gKiAgIC0gKipgdHJhbnNmb3JtUmVxdWVzdGAqKiDigJNcbiAqICAgICBge2Z1bmN0aW9uKGRhdGEsIGhlYWRlcnNHZXR0ZXIpfEFycmF5LjxmdW5jdGlvbihkYXRhLCBoZWFkZXJzR2V0dGVyKT59YCDigJNcbiAqICAgICBUcmFuc2Zvcm0gZnVuY3Rpb24gb3IgYW4gYXJyYXkgb2Ygc3VjaCBmdW5jdGlvbnMuIFRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gdGFrZXMgdGhlIGh0dHBcbiAqICAgICByZXF1ZXN0IGJvZHkgYW5kIGhlYWRlcnMgYW5kIHJldHVybnMgaXRzIHRyYW5zZm9ybWVkICh0eXBpY2FsbHkgc2VyaWFsaXplZCkgdmVyc2lvbi5cbiAqICAgICBCeSBkZWZhdWx0LCB0cmFuc2Zvcm1SZXF1ZXN0IHdpbGwgY29udGFpbiBvbmUgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlIHJlcXVlc3QgZGF0YSBpc1xuICogICAgIGFuIG9iamVjdCBhbmQgc2VyaWFsaXplcyBpdCB1c2luZyBgYW5ndWxhci50b0pzb25gLiBUbyBwcmV2ZW50IHRoaXMgYmVoYXZpb3IsIHNldFxuICogICAgIGB0cmFuc2Zvcm1SZXF1ZXN0YCB0byBhbiBlbXB0eSBhcnJheTogYHRyYW5zZm9ybVJlcXVlc3Q6IFtdYFxuICogICAtICoqYHRyYW5zZm9ybVJlc3BvbnNlYCoqIOKAk1xuICogICAgIGB7ZnVuY3Rpb24oZGF0YSwgaGVhZGVyc0dldHRlciwgc3RhdHVzKXxBcnJheS48ZnVuY3Rpb24oZGF0YSwgaGVhZGVyc0dldHRlciwgc3RhdHVzKT59YCDigJNcbiAqICAgICBUcmFuc2Zvcm0gZnVuY3Rpb24gb3IgYW4gYXJyYXkgb2Ygc3VjaCBmdW5jdGlvbnMuIFRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gdGFrZXMgdGhlIEhUVFBcbiAqICAgICByZXNwb25zZSBib2R5LCBoZWFkZXJzIGFuZCBzdGF0dXMgYW5kIHJldHVybnMgaXRzIHRyYW5zZm9ybWVkICh0eXBpY2FsbHkgZGVzZXJpYWxpemVkKVxuICogICAgIHZlcnNpb24uXG4gKiAgICAgQnkgZGVmYXVsdCwgdHJhbnNmb3JtUmVzcG9uc2Ugd2lsbCBjb250YWluIG9uZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGUgcmVzcG9uc2UgbG9va3NcbiAqICAgICBsaWtlIGEgSlNPTiBzdHJpbmcgYW5kIGRlc2VyaWFsaXplcyBpdCB1c2luZyBgYW5ndWxhci5mcm9tSnNvbmAuIFRvIHByZXZlbnQgdGhpcyBiZWhhdmlvcixcbiAqICAgICBzZXQgYHRyYW5zZm9ybVJlc3BvbnNlYCB0byBhbiBlbXB0eSBhcnJheTogYHRyYW5zZm9ybVJlc3BvbnNlOiBbXWBcbiAqICAgLSAqKmBjYWNoZWAqKiDigJMgYHtib29sZWFufENhY2hlfWAg4oCTIEEgYm9vbGVhbiB2YWx1ZSBvciBvYmplY3QgY3JlYXRlZCB3aXRoXG4gKiAgICAge0BsaW5rIG5nLiRjYWNoZUZhY3RvcnkgYCRjYWNoZUZhY3RvcnlgfSB0byBlbmFibGUgb3IgZGlzYWJsZSBjYWNoaW5nIG9mIHRoZSBIVFRQIHJlc3BvbnNlLlxuICogICAgIFNlZSB7QGxpbmsgJGh0dHAjY2FjaGluZyAkaHR0cCBDYWNoaW5nfSBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqICAgLSAqKmB0aW1lb3V0YCoqIOKAkyBge251bWJlcn1gIOKAkyBUaW1lb3V0IGluIG1pbGxpc2Vjb25kcy48YnIgLz5cbiAqICAgICAqKk5vdGU6KiogSW4gY29udHJhc3QgdG8ge0BsaW5rIG5nLiRodHRwI3VzYWdlICRodHRwLmNvbmZpZ30sIHtAbGluayBuZy4kcSBwcm9taXNlc30gYXJlXG4gKiAgICAgKipub3QqKiBzdXBwb3J0ZWQgaW4gYCRyZXNvdXJjZWAsIGJlY2F1c2UgdGhlIHNhbWUgdmFsdWUgd291bGQgYmUgdXNlZCBmb3IgbXVsdGlwbGUgcmVxdWVzdHMuXG4gKiAgICAgSWYgeW91IGFyZSBsb29raW5nIGZvciBhIHdheSB0byBjYW5jZWwgcmVxdWVzdHMsIHlvdSBzaG91bGQgdXNlIHRoZSBgY2FuY2VsbGFibGVgIG9wdGlvbi5cbiAqICAgLSAqKmBjYW5jZWxsYWJsZWAqKiDigJMgYHtib29sZWFufWAg4oCTIElmIHRydWUsIHRoZSByZXF1ZXN0IG1hZGUgYnkgYSBcIm5vbi1pbnN0YW5jZVwiIGNhbGwgd2lsbCBiZVxuICogICAgIGNhbmNlbGxlZCAoaWYgbm90IGFscmVhZHkgY29tcGxldGVkKSBieSBjYWxsaW5nIGAkY2FuY2VsUmVxdWVzdCgpYCBvbiB0aGUgY2FsbCdzIHJldHVyblxuICogICAgIHZhbHVlLiBDYWxsaW5nIGAkY2FuY2VsUmVxdWVzdCgpYCBmb3IgYSBub24tY2FuY2VsbGFibGUgb3IgYW4gYWxyZWFkeSBjb21wbGV0ZWQvY2FuY2VsbGVkXG4gKiAgICAgcmVxdWVzdCB3aWxsIGhhdmUgbm8gZWZmZWN0LlxuICogICAtICoqYHdpdGhDcmVkZW50aWFsc2AqKiDigJMgYHtib29sZWFufWAg4oCTIFdoZXRoZXIgdG8gc2V0IHRoZSBgd2l0aENyZWRlbnRpYWxzYCBmbGFnIG9uIHRoZVxuICogICAgIFhIUiBvYmplY3QuIFNlZVxuICogICAgIFtYTUxIdHRwUmVxdWVzdC53aXRoQ3JlZGVudGlhbHNdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC93aXRoQ3JlZGVudGlhbHMpXG4gKiAgICAgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKiAgIC0gKipgcmVzcG9uc2VUeXBlYCoqIOKAkyBge3N0cmluZ31gIOKAkyBTZWVcbiAqICAgICBbWE1MSHR0cFJlcXVlc3QucmVzcG9uc2VUeXBlXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3QvcmVzcG9uc2VUeXBlKS5cbiAqICAgLSAqKmBpbnRlcmNlcHRvcmAqKiDigJMgYHtPYmplY3Q9fWAg4oCTIFRoZSBpbnRlcmNlcHRvciBvYmplY3QgaGFzIGZvdXIgb3B0aW9uYWwgbWV0aG9kcyAtXG4gKiAgICAgYHJlcXVlc3RgLCBgcmVxdWVzdEVycm9yYCwgYHJlc3BvbnNlYCwgYW5kIGByZXNwb25zZUVycm9yYC4gU2VlXG4gKiAgICAge0BsaW5rIG5nLiRodHRwI2ludGVyY2VwdG9ycyAkaHR0cCBpbnRlcmNlcHRvcnN9IGZvciBkZXRhaWxzLiBOb3RlIHRoYXRcbiAqICAgICBgcmVxdWVzdGAvYHJlcXVlc3RFcnJvcmAgaW50ZXJjZXB0b3JzIGFyZSBhcHBsaWVkIGJlZm9yZSBjYWxsaW5nIGAkaHR0cGAsIHRodXMgYmVmb3JlIGFueVxuICogICAgIGdsb2JhbCBgJGh0dHBgIGludGVyY2VwdG9ycy4gQWxzbywgcmVqZWN0aW5nIG9yIHRocm93aW5nIGFuIGVycm9yIGluc2lkZSB0aGUgYHJlcXVlc3RgXG4gKiAgICAgaW50ZXJjZXB0b3Igd2lsbCByZXN1bHQgaW4gY2FsbGluZyB0aGUgYHJlc3BvbnNlRXJyb3JgIGludGVyY2VwdG9yLlxuICogICAgIFRoZSByZXNvdXJjZSBpbnN0YW5jZSBvciBjb2xsZWN0aW9uIGlzIGF2YWlsYWJsZSBvbiB0aGUgYHJlc291cmNlYCBwcm9wZXJ0eSBvZiB0aGVcbiAqICAgICBgaHR0cCByZXNwb25zZWAgb2JqZWN0IHBhc3NlZCB0byBgcmVzcG9uc2VgL2ByZXNwb25zZUVycm9yYCBpbnRlcmNlcHRvcnMuXG4gKiAgICAgS2VlcCBpbiBtaW5kIHRoYXQgdGhlIGFzc29jaWF0ZWQgcHJvbWlzZSB3aWxsIGJlIHJlc29sdmVkIHdpdGggdGhlIHZhbHVlIHJldHVybmVkIGJ5IHRoZVxuICogICAgIHJlc3BvbnNlIGludGVyY2VwdG9ycy4gTWFrZSBzdXJlIHlvdSByZXR1cm4gYW4gYXBwcm9wcmlhdGUgdmFsdWUgYW5kIG5vdCB0aGUgYHJlc3BvbnNlYFxuICogICAgIG9iamVjdCBwYXNzZWQgYXMgaW5wdXQuIEZvciByZWZlcmVuY2UsIHRoZSBkZWZhdWx0IGByZXNwb25zZWAgaW50ZXJjZXB0b3IgKHdoaWNoIGdldHMgYXBwbGllZFxuICogICAgIGlmIHlvdSBkb24ndCBzcGVjaWZ5IGEgY3VzdG9tIG9uZSkgcmV0dXJucyBgcmVzcG9uc2UucmVzb3VyY2VgLjxiciAvPlxuICogICAgIFNlZSB7QGxpbmsgbmdSZXNvdXJjZS4kcmVzb3VyY2UjdXNpbmctaW50ZXJjZXB0b3JzIGJlbG93fSBmb3IgYW4gZXhhbXBsZSBvZiB1c2luZ1xuICogICAgIGludGVyY2VwdG9ycyBpbiBgJHJlc291cmNlYC5cbiAqICAgLSAqKmBoYXNCb2R5YCoqIOKAkyBge2Jvb2xlYW59YCDigJMgSWYgdHJ1ZSwgdGhlbiB0aGUgcmVxdWVzdCB3aWxsIGhhdmUgYSBib2R5LlxuICogICAgIElmIG5vdCBzcGVjaWZpZWQsIHRoZW4gb25seSBQT1NULCBQVVQgYW5kIFBBVENIIHJlcXVlc3RzIHdpbGwgaGF2ZSBhIGJvZHkuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEhhc2ggd2l0aCBjdXN0b20gc2V0dGluZ3MgdGhhdCBzaG91bGQgZXh0ZW5kIHRoZVxuICogICBkZWZhdWx0IGAkcmVzb3VyY2VQcm92aWRlcmAgYmVoYXZpb3IuICBUaGUgc3VwcG9ydGVkIG9wdGlvbnMgYXJlOlxuICpcbiAqICAgLSAqKmBzdHJpcFRyYWlsaW5nU2xhc2hlc2AqKiDigJMge2Jvb2xlYW59IOKAkyBJZiB0cnVlIHRoZW4gdGhlIHRyYWlsaW5nXG4gKiAgIHNsYXNoZXMgZnJvbSBhbnkgY2FsY3VsYXRlZCBVUkwgd2lsbCBiZSBzdHJpcHBlZC4gKERlZmF1bHRzIHRvIHRydWUuKVxuICogICAtICoqYGNhbmNlbGxhYmxlYCoqIOKAkyB7Ym9vbGVhbn0g4oCTIElmIHRydWUsIHRoZSByZXF1ZXN0IG1hZGUgYnkgYSBcIm5vbi1pbnN0YW5jZVwiIGNhbGwgd2lsbCBiZVxuICogICBjYW5jZWxsZWQgKGlmIG5vdCBhbHJlYWR5IGNvbXBsZXRlZCkgYnkgY2FsbGluZyBgJGNhbmNlbFJlcXVlc3QoKWAgb24gdGhlIGNhbGwncyByZXR1cm4gdmFsdWUuXG4gKiAgIFRoaXMgY2FuIGJlIG92ZXJ3cml0dGVuIHBlciBhY3Rpb24uIChEZWZhdWx0cyB0byBmYWxzZS4pXG4gKlxuICogQHJldHVybnMge09iamVjdH0gQSByZXNvdXJjZSBcImNsYXNzXCIgb2JqZWN0IHdpdGggbWV0aG9kcyBmb3IgdGhlIGRlZmF1bHQgc2V0IG9mIHJlc291cmNlIGFjdGlvbnNcbiAqICAgb3B0aW9uYWxseSBleHRlbmRlZCB3aXRoIGN1c3RvbSBgYWN0aW9uc2AuIFRoZSBkZWZhdWx0IHNldCBjb250YWlucyB0aGVzZSBhY3Rpb25zOlxuICogICBgYGBqc1xuICogICB7XG4gKiAgICAgJ2dldCc6ICAgIHttZXRob2Q6ICdHRVQnfSxcbiAqICAgICAnc2F2ZSc6ICAge21ldGhvZDogJ1BPU1QnfSxcbiAqICAgICAncXVlcnknOiAge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9LFxuICogICAgICdyZW1vdmUnOiB7bWV0aG9kOiAnREVMRVRFJ30sXG4gKiAgICAgJ2RlbGV0ZSc6IHttZXRob2Q6ICdERUxFVEUnfVxuICogICB9XG4gKiAgIGBgYFxuICpcbiAqICAgQ2FsbGluZyB0aGVzZSBtZXRob2RzIGludm9rZSB7QGxpbmsgbmcuJGh0dHB9IHdpdGggdGhlIHNwZWNpZmllZCBodHRwIG1ldGhvZCwgZGVzdGluYXRpb24gYW5kXG4gKiAgIHBhcmFtZXRlcnMuIFdoZW4gdGhlIGRhdGEgaXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmVyIHRoZW4gdGhlIG9iamVjdCBpcyBhbiBpbnN0YW5jZSBvZiB0aGVcbiAqICAgcmVzb3VyY2UgY2xhc3MuIFRoZSBhY3Rpb25zIGBzYXZlYCwgYHJlbW92ZWAgYW5kIGBkZWxldGVgIGFyZSBhdmFpbGFibGUgb24gaXQgYXMgbWV0aG9kcyB3aXRoXG4gKiAgIHRoZSBgJGAgcHJlZml4LiBUaGlzIGFsbG93cyB5b3UgdG8gZWFzaWx5IHBlcmZvcm0gQ1JVRCBvcGVyYXRpb25zIChjcmVhdGUsIHJlYWQsIHVwZGF0ZSxcbiAqICAgZGVsZXRlKSBvbiBzZXJ2ZXItc2lkZSBkYXRhIGxpa2UgdGhpczpcbiAqICAgYGBganNcbiAqICAgdmFyIFVzZXIgPSAkcmVzb3VyY2UoJy91c2VyLzp1c2VySWQnLCB7dXNlcklkOiAnQGlkJ30pO1xuICogICBVc2VyLmdldCh7dXNlcklkOiAxMjN9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAqICAgICB1c2VyLmFiYyA9IHRydWU7XG4gKiAgICAgdXNlci4kc2F2ZSgpO1xuICogICB9KTtcbiAqICAgYGBgXG4gKlxuICogICBJdCBpcyBpbXBvcnRhbnQgdG8gcmVhbGl6ZSB0aGF0IGludm9raW5nIGEgYCRyZXNvdXJjZWAgb2JqZWN0IG1ldGhvZCBpbW1lZGlhdGVseSByZXR1cm5zIGFuXG4gKiAgIGVtcHR5IHJlZmVyZW5jZSAob2JqZWN0IG9yIGFycmF5IGRlcGVuZGluZyBvbiBgaXNBcnJheWApLiBPbmNlIHRoZSBkYXRhIGlzIHJldHVybmVkIGZyb20gdGhlXG4gKiAgIHNlcnZlciB0aGUgZXhpc3RpbmcgcmVmZXJlbmNlIGlzIHBvcHVsYXRlZCB3aXRoIHRoZSBhY3R1YWwgZGF0YS4gVGhpcyBpcyBhIHVzZWZ1bCB0cmljayBzaW5jZVxuICogICB1c3VhbGx5IHRoZSByZXNvdXJjZSBpcyBhc3NpZ25lZCB0byBhIG1vZGVsIHdoaWNoIGlzIHRoZW4gcmVuZGVyZWQgYnkgdGhlIHZpZXcuIEhhdmluZyBhbiBlbXB0eVxuICogICBvYmplY3QgcmVzdWx0cyBpbiBubyByZW5kZXJpbmcsIG9uY2UgdGhlIGRhdGEgYXJyaXZlcyBmcm9tIHRoZSBzZXJ2ZXIgdGhlbiB0aGUgb2JqZWN0IGlzXG4gKiAgIHBvcHVsYXRlZCB3aXRoIHRoZSBkYXRhIGFuZCB0aGUgdmlldyBhdXRvbWF0aWNhbGx5IHJlLXJlbmRlcnMgaXRzZWxmIHNob3dpbmcgdGhlIG5ldyBkYXRhLiBUaGlzXG4gKiAgIG1lYW5zIHRoYXQgaW4gbW9zdCBjYXNlcyBvbmUgbmV2ZXIgaGFzIHRvIHdyaXRlIGEgY2FsbGJhY2sgZnVuY3Rpb24gZm9yIHRoZSBhY3Rpb24gbWV0aG9kcy5cbiAqXG4gKiAgIFRoZSBhY3Rpb24gbWV0aG9kcyBvbiB0aGUgY2xhc3Mgb2JqZWN0IG9yIGluc3RhbmNlIG9iamVjdCBjYW4gYmUgaW52b2tlZCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAqICAgcGFyYW1ldGVyczpcbiAqXG4gKiAgIC0gXCJjbGFzc1wiIGFjdGlvbnMgd2l0aG91dCBhIGJvZHk6IGBSZXNvdXJjZS5hY3Rpb24oW3BhcmFtZXRlcnNdLCBbc3VjY2Vzc10sIFtlcnJvcl0pYFxuICogICAtIFwiY2xhc3NcIiBhY3Rpb25zIHdpdGggYSBib2R5OiBgUmVzb3VyY2UuYWN0aW9uKFtwYXJhbWV0ZXJzXSwgcG9zdERhdGEsIFtzdWNjZXNzXSwgW2Vycm9yXSlgXG4gKiAgIC0gaW5zdGFuY2UgYWN0aW9uczogYGluc3RhbmNlLiRhY3Rpb24oW3BhcmFtZXRlcnNdLCBbc3VjY2Vzc10sIFtlcnJvcl0pYFxuICpcbiAqXG4gKiAgIFdoZW4gY2FsbGluZyBpbnN0YW5jZSBtZXRob2RzLCB0aGUgaW5zdGFuY2UgaXRzZWxmIGlzIHVzZWQgYXMgdGhlIHJlcXVlc3QgYm9keSAoaWYgdGhlIGFjdGlvblxuICogICBzaG91bGQgaGF2ZSBhIGJvZHkpLiBCeSBkZWZhdWx0LCBvbmx5IGFjdGlvbnMgdXNpbmcgYFBPU1RgLCBgUFVUYCBvciBgUEFUQ0hgIGhhdmUgcmVxdWVzdFxuICogICBib2RpZXMsIGJ1dCB5b3UgY2FuIHVzZSB0aGUgYGhhc0JvZHlgIGNvbmZpZ3VyYXRpb24gb3B0aW9uIHRvIHNwZWNpZnkgd2hldGhlciBhbiBhY3Rpb25cbiAqICAgc2hvdWxkIGhhdmUgYSBib2R5IG9yIG5vdCAocmVnYXJkbGVzcyBvZiBpdHMgSFRUUCBtZXRob2QpLlxuICpcbiAqXG4gKiAgIFN1Y2Nlc3MgY2FsbGJhY2sgaXMgY2FsbGVkIHdpdGggKHZhbHVlIChPYmplY3R8QXJyYXkpLCByZXNwb25zZUhlYWRlcnMgKEZ1bmN0aW9uKSxcbiAqICAgc3RhdHVzIChudW1iZXIpLCBzdGF0dXNUZXh0IChzdHJpbmcpKSBhcmd1bWVudHMsIHdoZXJlIGB2YWx1ZWAgaXMgdGhlIHBvcHVsYXRlZCByZXNvdXJjZVxuICogICBpbnN0YW5jZSBvciBjb2xsZWN0aW9uIG9iamVjdC4gVGhlIGVycm9yIGNhbGxiYWNrIGlzIGNhbGxlZCB3aXRoIChodHRwUmVzcG9uc2UpIGFyZ3VtZW50LlxuICpcbiAqICAgQ2xhc3MgYWN0aW9ucyByZXR1cm4gYW4gZW1wdHkgaW5zdGFuY2UgKHdpdGggdGhlIGFkZGl0aW9uYWwgcHJvcGVydGllcyBsaXN0ZWQgYmVsb3cpLlxuICogICBJbnN0YW5jZSBhY3Rpb25zIHJldHVybiBhIHByb21pc2UgZm9yIHRoZSBvcGVyYXRpb24uXG4gKlxuICogICBUaGUgUmVzb3VyY2UgaW5zdGFuY2VzIGFuZCBjb2xsZWN0aW9ucyBoYXZlIHRoZXNlIGFkZGl0aW9uYWwgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gYCRwcm9taXNlYDogVGhlIHtAbGluayBuZy4kcSBwcm9taXNlfSBvZiB0aGUgb3JpZ2luYWwgc2VydmVyIGludGVyYWN0aW9uIHRoYXQgY3JlYXRlZCB0aGlzXG4gKiAgICAgaW5zdGFuY2Ugb3IgY29sbGVjdGlvbi5cbiAqXG4gKiAgICAgT24gc3VjY2VzcywgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgd2l0aCB0aGUgc2FtZSByZXNvdXJjZSBpbnN0YW5jZSBvciBjb2xsZWN0aW9uIG9iamVjdCxcbiAqICAgICB1cGRhdGVkIHdpdGggZGF0YSBmcm9tIHNlcnZlci4gVGhpcyBtYWtlcyBpdCBlYXN5IHRvIHVzZSBpbiB0aGVcbiAqICAgICB7QGxpbmsgbmdSb3V0ZS4kcm91dGVQcm92aWRlciBgcmVzb2x2ZWAgc2VjdGlvbiBvZiBgJHJvdXRlUHJvdmlkZXIud2hlbigpYH0gdG8gZGVmZXIgdmlld1xuICogICAgIHJlbmRlcmluZyB1bnRpbCB0aGUgcmVzb3VyY2UocykgYXJlIGxvYWRlZC5cbiAqXG4gKiAgICAgT24gZmFpbHVyZSwgdGhlIHByb21pc2UgaXMgcmVqZWN0ZWQgd2l0aCB0aGUge0BsaW5rIG5nLiRodHRwIGh0dHAgcmVzcG9uc2V9IG9iamVjdC5cbiAqXG4gKiAgICAgSWYgYW4gaW50ZXJjZXB0b3Igb2JqZWN0IHdhcyBwcm92aWRlZCwgdGhlIHByb21pc2Ugd2lsbCBpbnN0ZWFkIGJlIHJlc29sdmVkIHdpdGggdGhlIHZhbHVlXG4gKiAgICAgcmV0dXJuZWQgYnkgdGhlIHJlc3BvbnNlIGludGVyY2VwdG9yIChvbiBzdWNjZXNzKSBvciByZXNwb25jZUVycm9yIGludGVyY2VwdG9yIChvbiBmYWlsdXJlKS5cbiAqXG4gKiAgIC0gYCRyZXNvbHZlZGA6IGB0cnVlYCBhZnRlciBmaXJzdCBzZXJ2ZXIgaW50ZXJhY3Rpb24gaXMgY29tcGxldGVkIChlaXRoZXIgd2l0aCBzdWNjZXNzIG9yXG4gKiAgICAgIHJlamVjdGlvbiksIGBmYWxzZWAgYmVmb3JlIHRoYXQuIEtub3dpbmcgaWYgdGhlIFJlc291cmNlIGhhcyBiZWVuIHJlc29sdmVkIGlzIHVzZWZ1bCBpblxuICogICAgICBkYXRhLWJpbmRpbmcuIElmIHRoZXJlIGlzIGEgcmVzcG9uc2UvcmVzcG9uc2VFcnJvciBpbnRlcmNlcHRvciBhbmQgaXQgcmV0dXJucyBhIHByb21pc2UsXG4gKiAgICAgIGAkcmVzb2x2ZWRgIHdpbGwgd2FpdCBmb3IgdGhhdCB0b28uXG4gKlxuICogICBUaGUgUmVzb3VyY2UgaW5zdGFuY2VzIGFuZCBjb2xsZWN0aW9ucyBoYXZlIHRoZXNlIGFkZGl0aW9uYWwgbWV0aG9kczpcbiAqXG4gKiAgIC0gYCRjYW5jZWxSZXF1ZXN0YDogSWYgdGhlcmUgaXMgYSBjYW5jZWxsYWJsZSwgcGVuZGluZyByZXF1ZXN0IHJlbGF0ZWQgdG8gdGhlIGluc3RhbmNlIG9yXG4gKiAgICAgIGNvbGxlY3Rpb24sIGNhbGxpbmcgdGhpcyBtZXRob2Qgd2lsbCBhYm9ydCB0aGUgcmVxdWVzdC5cbiAqXG4gKiAgIFRoZSBSZXNvdXJjZSBpbnN0YW5jZXMgaGF2ZSB0aGVzZSBhZGRpdGlvbmFsIG1ldGhvZHM6XG4gKlxuICogICAtIGB0b0pTT05gOiBJdCByZXR1cm5zIGEgc2ltcGxlIG9iamVjdCB3aXRob3V0IGFueSBvZiB0aGUgZXh0cmEgcHJvcGVydGllcyBhZGRlZCBhcyBwYXJ0IG9mXG4gKiAgICAgdGhlIFJlc291cmNlIEFQSS4gVGhpcyBvYmplY3QgY2FuIGJlIHNlcmlhbGl6ZWQgdGhyb3VnaCB7QGxpbmsgYW5ndWxhci50b0pzb259IHNhZmVseVxuICogICAgIHdpdGhvdXQgYXR0YWNoaW5nIEFuZ3VsYXJKUy1zcGVjaWZpYyBmaWVsZHMuIE5vdGljZSB0aGF0IGBKU09OLnN0cmluZ2lmeWAgKGFuZFxuICogICAgIGBhbmd1bGFyLnRvSnNvbmApIGF1dG9tYXRpY2FsbHkgdXNlIHRoaXMgbWV0aG9kIHdoZW4gc2VyaWFsaXppbmcgYSBSZXNvdXJjZSBpbnN0YW5jZVxuICogICAgIChzZWUgW01ETl0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvSlNPTi9zdHJpbmdpZnkjdG9KU09OJTI4JTI5X2JlaGF2aW9yKSkuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAjIyMgQmFzaWMgdXNhZ2VcbiAqXG4gICBgYGBqc1xuICAgICAvLyBEZWZpbmUgYSBDcmVkaXRDYXJkIGNsYXNzXG4gICAgIHZhciBDcmVkaXRDYXJkID0gJHJlc291cmNlKCcvdXNlcnMvOnVzZXJJZC9jYXJkcy86Y2FyZElkJyxcbiAgICAgICB7dXNlcklkOiAxMjMsIGNhcmRJZDogJ0BpZCd9LCB7XG4gICAgICAgICBjaGFyZ2U6IHttZXRob2Q6ICdQT1NUJywgcGFyYW1zOiB7Y2hhcmdlOiB0cnVlfX1cbiAgICAgICB9KTtcblxuICAgICAvLyBXZSBjYW4gcmV0cmlldmUgYSBjb2xsZWN0aW9uIGZyb20gdGhlIHNlcnZlclxuICAgICB2YXIgY2FyZHMgPSBDcmVkaXRDYXJkLnF1ZXJ5KCk7XG4gICAgICAgICAvLyBHRVQ6IC91c2Vycy8xMjMvY2FyZHNcbiAgICAgICAgIC8vIHNlcnZlciByZXR1cm5zOiBbe2lkOiA0NTYsIG51bWJlcjogJzEyMzQnLCBuYW1lOiAnU21pdGgnfV1cblxuICAgICAvLyBXYWl0IGZvciB0aGUgcmVxdWVzdCB0byBjb21wbGV0ZVxuICAgICBjYXJkcy4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgIHZhciBjYXJkID0gY2FyZHNbMF07XG5cbiAgICAgICAvLyBFYWNoIGl0ZW0gaXMgYW4gaW5zdGFuY2Ugb2YgQ3JlZGl0Q2FyZFxuICAgICAgIGV4cGVjdChjYXJkIGluc3RhbmNlb2YgQ3JlZGl0Q2FyZCkudG9FcXVhbCh0cnVlKTtcblxuICAgICAgIC8vIE5vbi1HRVQgbWV0aG9kcyBhcmUgbWFwcGVkIG9udG8gdGhlIGluc3RhbmNlc1xuICAgICAgIGNhcmQubmFtZSA9ICdKLiBTbWl0aCc7XG4gICAgICAgY2FyZC4kc2F2ZSgpO1xuICAgICAgICAgICAvLyBQT1NUOiAvdXNlcnMvMTIzL2NhcmRzLzQ1NiB7aWQ6IDQ1NiwgbnVtYmVyOiAnMTIzNCcsIG5hbWU6ICdKLiBTbWl0aCd9XG4gICAgICAgICAgIC8vIHNlcnZlciByZXR1cm5zOiB7aWQ6IDQ1NiwgbnVtYmVyOiAnMTIzNCcsIG5hbWU6ICdKLiBTbWl0aCd9XG5cbiAgICAgICAvLyBPdXIgY3VzdG9tIG1ldGhvZCBpcyBtYXBwZWQgYXMgd2VsbCAoc2luY2UgaXQgdXNlcyBQT1NUKVxuICAgICAgIGNhcmQuJGNoYXJnZSh7YW1vdW50OiA5Ljk5fSk7XG4gICAgICAgICAgIC8vIFBPU1Q6IC91c2Vycy8xMjMvY2FyZHMvNDU2P2Ftb3VudD05Ljk5JmNoYXJnZT10cnVlIHtpZDogNDU2LCBudW1iZXI6ICcxMjM0JywgbmFtZTogJ0ouIFNtaXRoJ31cbiAgICAgfSk7XG5cbiAgICAgLy8gV2UgY2FuIGNyZWF0ZSBhbiBpbnN0YW5jZSBhcyB3ZWxsXG4gICAgIHZhciBuZXdDYXJkID0gbmV3IENyZWRpdENhcmQoe251bWJlcjogJzAxMjMnfSk7XG4gICAgIG5ld0NhcmQubmFtZSA9ICdNaWtlIFNtaXRoJztcblxuICAgICB2YXIgc2F2ZVByb21pc2UgPSBuZXdDYXJkLiRzYXZlKCk7XG4gICAgICAgICAvLyBQT1NUOiAvdXNlcnMvMTIzL2NhcmRzIHtudW1iZXI6ICcwMTIzJywgbmFtZTogJ01pa2UgU21pdGgnfVxuICAgICAgICAgLy8gc2VydmVyIHJldHVybnM6IHtpZDogNzg5LCBudW1iZXI6ICcwMTIzJywgbmFtZTogJ01pa2UgU21pdGgnfVxuXG4gICAgIHNhdmVQcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgLy8gT25jZSB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCwgdGhlIGNyZWF0ZWQgaW5zdGFuY2VcbiAgICAgICAvLyBpcyBwb3B1bGF0ZWQgd2l0aCB0aGUgZGF0YSByZXR1cm5lZCBieSB0aGUgc2VydmVyXG4gICAgICAgZXhwZWN0KG5ld0NhcmQuaWQpLnRvRXF1YWwoNzg5KTtcbiAgICAgfSk7XG4gICBgYGBcbiAqXG4gKiBUaGUgb2JqZWN0IHJldHVybmVkIGZyb20gYSBjYWxsIHRvIGAkcmVzb3VyY2VgIGlzIGEgcmVzb3VyY2UgXCJjbGFzc1wiIHdoaWNoIGhhcyBvbmUgXCJzdGF0aWNcIlxuICogbWV0aG9kIGZvciBlYWNoIGFjdGlvbiBpbiB0aGUgZGVmaW5pdGlvbi5cbiAqXG4gKiBDYWxsaW5nIHRoZXNlIG1ldGhvZHMgaW52b2tlcyBgJGh0dHBgIG9uIHRoZSBgdXJsYCB0ZW1wbGF0ZSB3aXRoIHRoZSBnaXZlbiBIVFRQIGBtZXRob2RgLFxuICogYHBhcmFtc2AgYW5kIGBoZWFkZXJzYC5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICMjIyBBY2Nlc3NpbmcgdGhlIHJlc3BvbnNlXG4gKlxuICogV2hlbiB0aGUgZGF0YSBpcyByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2ZXIgdGhlbiB0aGUgb2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIHRoZSByZXNvdXJjZSB0eXBlIGFuZFxuICogYWxsIG9mIHRoZSBub24tR0VUIG1ldGhvZHMgYXJlIGF2YWlsYWJsZSB3aXRoIGAkYCBwcmVmaXguIFRoaXMgYWxsb3dzIHlvdSB0byBlYXNpbHkgc3VwcG9ydCBDUlVEXG4gKiBvcGVyYXRpb25zIChjcmVhdGUsIHJlYWQsIHVwZGF0ZSwgZGVsZXRlKSBvbiBzZXJ2ZXItc2lkZSBkYXRhLlxuICpcbiAgIGBgYGpzXG4gICAgIHZhciBVc2VyID0gJHJlc291cmNlKCcvdXNlcnMvOnVzZXJJZCcsIHt1c2VySWQ6ICdAaWQnfSk7XG4gICAgIFVzZXIuZ2V0KHt1c2VySWQ6IDEyM30pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICAgICAgIHVzZXIuYWJjID0gdHJ1ZTtcbiAgICAgICB1c2VyLiRzYXZlKCk7XG4gICAgIH0pO1xuICAgYGBgXG4gKlxuICogSXQncyB3b3J0aCBub3RpbmcgdGhhdCB0aGUgc3VjY2VzcyBjYWxsYmFjayBmb3IgYGdldGAsIGBxdWVyeWAgYW5kIG90aGVyIG1ldGhvZHMgZ2V0cyBjYWxsZWQgd2l0aFxuICogdGhlIHJlc291cmNlIGluc3RhbmNlIChwb3B1bGF0ZWQgd2l0aCB0aGUgZGF0YSB0aGF0IGNhbWUgZnJvbSB0aGUgc2VydmVyKSBhcyB3ZWxsIGFzIGFuIGAkaHR0cGBcbiAqIGhlYWRlciBnZXR0ZXIgZnVuY3Rpb24sIHRoZSBIVFRQIHN0YXR1cyBjb2RlIGFuZCB0aGUgcmVzcG9uc2Ugc3RhdHVzIHRleHQuIFNvIG9uZSBjb3VsZCByZXdyaXRlXG4gKiB0aGUgYWJvdmUgZXhhbXBsZSBhbmQgZ2V0IGFjY2VzcyB0byBIVFRQIGhlYWRlcnMgYXMgZm9sbG93czpcbiAqXG4gICBgYGBqc1xuICAgICB2YXIgVXNlciA9ICRyZXNvdXJjZSgnL3VzZXJzLzp1c2VySWQnLCB7dXNlcklkOiAnQGlkJ30pO1xuICAgICBVc2VyLmdldCh7dXNlcklkOiAxMjN9LCBmdW5jdGlvbih1c2VyLCBnZXRSZXNwb25zZUhlYWRlcnMpIHtcbiAgICAgICB1c2VyLmFiYyA9IHRydWU7XG4gICAgICAgdXNlci4kc2F2ZShmdW5jdGlvbih1c2VyLCBwdXRSZXNwb25zZUhlYWRlcnMpIHtcbiAgICAgICAgIC8vIGB1c2VyYCA9PiBzYXZlZCBgVXNlcmAgb2JqZWN0XG4gICAgICAgICAvLyBgcHV0UmVzcG9uc2VIZWFkZXJzYCA9PiBgJGh0dHBgIGhlYWRlciBnZXR0ZXJcbiAgICAgICB9KTtcbiAgICAgfSk7XG4gICBgYGBcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICMjIyBDcmVhdGluZyBjdXN0b20gYWN0aW9uc1xuICpcbiAqIEluIHRoaXMgZXhhbXBsZSB3ZSBjcmVhdGUgYSBjdXN0b20gbWV0aG9kIG9uIG91ciByZXNvdXJjZSB0byBtYWtlIGEgUFVUIHJlcXVlc3Q6XG4gKlxuICAgYGBganNcbiAgICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJywgWyduZ1Jlc291cmNlJ10pO1xuXG4gICAgICAvLyBTb21lIEFQSXMgZXhwZWN0IGEgUFVUIHJlcXVlc3QgaW4gdGhlIGZvcm1hdCBVUkwvb2JqZWN0L0lEXG4gICAgICAvLyBIZXJlIHdlIGFyZSBjcmVhdGluZyBhbiAndXBkYXRlJyBtZXRob2RcbiAgICAgIGFwcC5mYWN0b3J5KCdOb3RlcycsIFsnJHJlc291cmNlJywgZnVuY3Rpb24oJHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiAkcmVzb3VyY2UoJy9ub3Rlcy86aWQnLCB7aWQ6ICdAaWQnfSwge1xuICAgICAgICAgIHVwZGF0ZToge21ldGhvZDogJ1BVVCd9XG4gICAgICAgIH0pO1xuICAgICAgfV0pO1xuXG4gICAgICAvLyBJbiBvdXIgY29udHJvbGxlciB3ZSBnZXQgdGhlIElEIGZyb20gdGhlIFVSTCB1c2luZyBgJGxvY2F0aW9uYFxuICAgICAgYXBwLmNvbnRyb2xsZXIoJ05vdGVzQ3RybCcsIFsnJGxvY2F0aW9uJywgJ05vdGVzJywgZnVuY3Rpb24oJGxvY2F0aW9uLCBOb3Rlcykge1xuICAgICAgICAvLyBGaXJzdCwgcmV0cmlldmUgdGhlIGNvcnJlc3BvbmRpbmcgYE5vdGVgIG9iamVjdCBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgICAgLy8gKEFzc3VtaW5nIGEgVVJMIG9mIHRoZSBmb3JtIGAuLi4vbm90ZXM/aWQ9WFlaYClcbiAgICAgICAgdmFyIG5vdGVJZCA9ICRsb2NhdGlvbi5zZWFyY2goKS5pZDtcbiAgICAgICAgdmFyIG5vdGUgPSBOb3Rlcy5nZXQoe2lkOiBub3RlSWR9KTtcblxuICAgICAgICBub3RlLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgbm90ZS5jb250ZW50ID0gJ0hlbGxvLCB3b3JsZCEnO1xuXG4gICAgICAgICAgLy8gTm93IGNhbGwgYHVwZGF0ZWAgdG8gc2F2ZSB0aGUgY2hhbmdlcyBvbiB0aGUgc2VydmVyXG4gICAgICAgICAgTm90ZXMudXBkYXRlKG5vdGUpO1xuICAgICAgICAgICAgICAvLyBUaGlzIHdpbGwgUFVUIC9ub3Rlcy9JRCB3aXRoIHRoZSBub3RlIG9iamVjdCBhcyB0aGUgcmVxdWVzdCBwYXlsb2FkXG5cbiAgICAgICAgICAvLyBTaW5jZSBgdXBkYXRlYCBpcyBhIG5vbi1HRVQgbWV0aG9kLCBpdCB3aWxsIGFsc28gYmUgYXZhaWxhYmxlIG9uIHRoZSBpbnN0YW5jZVxuICAgICAgICAgIC8vIChwcmVmaXhlZCB3aXRoIGAkYCksIHNvIHdlIGNvdWxkIHJlcGxhY2UgdGhlIGBOb3RlLnVwZGF0ZSgpYCBjYWxsIHdpdGg6XG4gICAgICAgICAgLy9ub3RlLiR1cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XSk7XG4gICBgYGBcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICMjIyBDYW5jZWxsaW5nIHJlcXVlc3RzXG4gKlxuICogSWYgYW4gYWN0aW9uJ3MgY29uZmlndXJhdGlvbiBzcGVjaWZpZXMgdGhhdCBpdCBpcyBjYW5jZWxsYWJsZSwgeW91IGNhbiBjYW5jZWwgdGhlIHJlcXVlc3QgcmVsYXRlZFxuICogdG8gYW4gaW5zdGFuY2Ugb3IgY29sbGVjdGlvbiAoYXMgbG9uZyBhcyBpdCBpcyBhIHJlc3VsdCBvZiBhIFwibm9uLWluc3RhbmNlXCIgY2FsbCk6XG4gKlxuICAgYGBganNcbiAgICAgLy8gLi4uZGVmaW5pbmcgdGhlIGBIb3RlbGAgcmVzb3VyY2UuLi5cbiAgICAgdmFyIEhvdGVsID0gJHJlc291cmNlKCcvYXBpL2hvdGVscy86aWQnLCB7aWQ6ICdAaWQnfSwge1xuICAgICAgIC8vIExldCdzIG1ha2UgdGhlIGBxdWVyeSgpYCBtZXRob2QgY2FuY2VsbGFibGVcbiAgICAgICBxdWVyeToge21ldGhvZDogJ2dldCcsIGlzQXJyYXk6IHRydWUsIGNhbmNlbGxhYmxlOiB0cnVlfVxuICAgICB9KTtcblxuICAgICAvLyAuLi5zb21ld2hlcmUgaW4gdGhlIFBsYW5WYWNhdGlvbkNvbnRyb2xsZXIuLi5cbiAgICAgLi4uXG4gICAgIHRoaXMub25EZXN0aW5hdGlvbkNoYW5nZWQgPSBmdW5jdGlvbiBvbkRlc3RpbmF0aW9uQ2hhbmdlZChkZXN0aW5hdGlvbikge1xuICAgICAgIC8vIFdlIGRvbid0IGNhcmUgYWJvdXQgYW55IHBlbmRpbmcgcmVxdWVzdCBmb3IgaG90ZWxzXG4gICAgICAgLy8gaW4gYSBkaWZmZXJlbnQgZGVzdGluYXRpb24gYW55IG1vcmVcbiAgICAgICBpZiAodGhpcy5hdmFpbGFibGVIb3RlbHMpIHtcbiAgICAgICAgIHRoaXMuYXZhaWxhYmxlSG90ZWxzLiRjYW5jZWxSZXF1ZXN0KCk7XG4gICAgICAgfVxuXG4gICAgICAgLy8gTGV0J3MgcXVlcnkgZm9yIGhvdGVscyBpbiBgZGVzdGluYXRpb25gXG4gICAgICAgLy8gKGNhbGxzOiAvYXBpL2hvdGVscz9sb2NhdGlvbj08ZGVzdGluYXRpb24+KVxuICAgICAgIHRoaXMuYXZhaWxhYmxlSG90ZWxzID0gSG90ZWwucXVlcnkoe2xvY2F0aW9uOiBkZXN0aW5hdGlvbn0pO1xuICAgICB9O1xuICAgYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAjIyMgVXNpbmcgaW50ZXJjZXB0b3JzXG4gKlxuICogWW91IGNhbiB1c2UgaW50ZXJjZXB0b3JzIHRvIHRyYW5zZm9ybSB0aGUgcmVxdWVzdCBvciByZXNwb25zZSwgcGVyZm9ybSBhZGRpdGlvbmFsIG9wZXJhdGlvbnMsIGFuZFxuICogbW9kaWZ5IHRoZSByZXR1cm5lZCBpbnN0YW5jZS9jb2xsZWN0aW9uLiBUaGUgZm9sbG93aW5nIGV4YW1wbGUsIHVzZXMgYHJlcXVlc3RgIGFuZCBgcmVzcG9uc2VgXG4gKiBpbnRlcmNlcHRvcnMgdG8gYXVnbWVudCB0aGUgcmV0dXJuZWQgaW5zdGFuY2Ugd2l0aCBhZGRpdGlvbmFsIGluZm86XG4gKlxuICAgYGBganNcbiAgICAgdmFyIFRoaW5nID0gJHJlc291cmNlKCcvYXBpL3RoaW5ncy86aWQnLCB7aWQ6ICdAaWQnfSwge1xuICAgICAgIHNhdmU6IHtcbiAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgaW50ZXJjZXB0b3I6IHtcbiAgICAgICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgICAgICAgICAgLy8gQmVmb3JlIHRoZSByZXF1ZXN0IGlzIHNlbnQgb3V0LCBzdG9yZSBhIHRpbWVzdGFtcCBvbiB0aGUgcmVxdWVzdCBjb25maWdcbiAgICAgICAgICAgICBjb25maWcucmVxdWVzdFRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgICAgfSxcbiAgICAgICAgICAgcmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgLy8gR2V0IHRoZSBpbnN0YW5jZSBmcm9tIHRoZSByZXNwb25zZSBvYmplY3RcbiAgICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSByZXNwb25zZS5yZXNvdXJjZTtcblxuICAgICAgICAgICAgIC8vIEF1Z21lbnQgdGhlIGluc3RhbmNlIHdpdGggYSBjdXN0b20gYHNhdmVMYXRlbmN5YCBwcm9wZXJ0eSwgY29tcHV0ZWQgYXMgdGhlIHRpbWVcbiAgICAgICAgICAgICAvLyBiZXR3ZWVuIHNlbmRpbmcgdGhlIHJlcXVlc3QgYW5kIHJlY2VpdmluZyB0aGUgcmVzcG9uc2UuXG4gICAgICAgICAgICAgaW5zdGFuY2Uuc2F2ZUxhdGVuY3kgPSBEYXRlLm5vdygpIC0gcmVzcG9uc2UuY29uZmlnLnJlcXVlc3RUaW1lc3RhbXA7XG5cbiAgICAgICAgICAgICAvLyBSZXR1cm4gdGhlIGluc3RhbmNlXG4gICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICAgfVxuICAgICB9KTtcblxuICAgICBUaGluZy5zYXZlKHtmb286ICdiYXInfSkuJHByb21pc2UudGhlbihmdW5jdGlvbih0aGluZykge1xuICAgICAgIGNvbnNvbGUubG9nKCdUaGF0IHRoaW5nIHdhcyBzYXZlZCBpbiAnICsgdGhpbmcuc2F2ZUxhdGVuY3kgKyAnbXMuJyk7XG4gICAgIH0pO1xuICAgYGBgXG4gKlxuICovXG5hbmd1bGFyLm1vZHVsZSgnbmdSZXNvdXJjZScsIFsnbmcnXSkuXG4gIGluZm8oeyBhbmd1bGFyVmVyc2lvbjogJzEuNy44JyB9KS5cbiAgcHJvdmlkZXIoJyRyZXNvdXJjZScsIGZ1bmN0aW9uIFJlc291cmNlUHJvdmlkZXIoKSB7XG4gICAgdmFyIFBST1RPQ09MX0FORF9JUFY2X1JFR0VYID0gL15odHRwcz86XFwvXFwvXFxbW15cXF1dKl1bXi9dKi87XG5cbiAgICB2YXIgcHJvdmlkZXIgPSB0aGlzO1xuXG4gICAgLyoqXG4gICAgICogQG5nZG9jIHByb3BlcnR5XG4gICAgICogQG5hbWUgJHJlc291cmNlUHJvdmlkZXIjZGVmYXVsdHNcbiAgICAgKiBAZGVzY3JpcHRpb25cbiAgICAgKiBPYmplY3QgY29udGFpbmluZyBkZWZhdWx0IG9wdGlvbnMgdXNlZCB3aGVuIGNyZWF0aW5nIGAkcmVzb3VyY2VgIGluc3RhbmNlcy5cbiAgICAgKlxuICAgICAqIFRoZSBkZWZhdWx0IHZhbHVlcyBzYXRpc2Z5IGEgd2lkZSByYW5nZSBvZiB1c2VjYXNlcywgYnV0IHlvdSBtYXkgY2hvb3NlIHRvIG92ZXJ3cml0ZSBhbnkgb2ZcbiAgICAgKiB0aGVtIHRvIGZ1cnRoZXIgY3VzdG9taXplIHlvdXIgaW5zdGFuY2VzLiBUaGUgYXZhaWxhYmxlIHByb3BlcnRpZXMgYXJlOlxuICAgICAqXG4gICAgICogLSAqKnN0cmlwVHJhaWxpbmdTbGFzaGVzKiog4oCTIGB7Ym9vbGVhbn1gIOKAkyBJZiB0cnVlLCB0aGVuIHRoZSB0cmFpbGluZyBzbGFzaGVzIGZyb20gYW55XG4gICAgICogICBjYWxjdWxhdGVkIFVSTCB3aWxsIGJlIHN0cmlwcGVkLjxiciAvPlxuICAgICAqICAgKERlZmF1bHRzIHRvIHRydWUuKVxuICAgICAqIC0gKipjYW5jZWxsYWJsZSoqIOKAkyBge2Jvb2xlYW59YCDigJMgSWYgdHJ1ZSwgdGhlIHJlcXVlc3QgbWFkZSBieSBhIFwibm9uLWluc3RhbmNlXCIgY2FsbCB3aWxsIGJlXG4gICAgICogICBjYW5jZWxsZWQgKGlmIG5vdCBhbHJlYWR5IGNvbXBsZXRlZCkgYnkgY2FsbGluZyBgJGNhbmNlbFJlcXVlc3QoKWAgb24gdGhlIGNhbGwncyByZXR1cm5cbiAgICAgKiAgIHZhbHVlLiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUge0BsaW5rIG5nUmVzb3VyY2UuJHJlc291cmNlfS4gVGhpcyBjYW4gYmUgb3ZlcndyaXR0ZW4gcGVyXG4gICAgICogICByZXNvdXJjZSBjbGFzcyBvciBhY3Rpb24uPGJyIC8+XG4gICAgICogICAoRGVmYXVsdHMgdG8gZmFsc2UuKVxuICAgICAqIC0gKiphY3Rpb25zKiogLSBge09iamVjdC48T2JqZWN0Pn1gIC0gQSBoYXNoIHdpdGggZGVmYXVsdCBhY3Rpb25zIGRlY2xhcmF0aW9ucy4gQWN0aW9ucyBhcmVcbiAgICAgKiAgIGhpZ2gtbGV2ZWwgbWV0aG9kcyBjb3JyZXNwb25kaW5nIHRvIFJFU1RmdWwgYWN0aW9ucy9tZXRob2RzIG9uIHJlc291cmNlcy4gQW4gYWN0aW9uIG1heVxuICAgICAqICAgc3BlY2lmeSB3aGF0IEhUVFAgbWV0aG9kIHRvIHVzZSwgd2hhdCBVUkwgdG8gaGl0LCBpZiB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYmUgYSBzaW5nbGVcbiAgICAgKiAgIG9iamVjdCBvciBhIGNvbGxlY3Rpb24gKGFycmF5KSBvZiBvYmplY3RzIGV0Yy4gRm9yIG1vcmUgZGV0YWlscywgc2VlXG4gICAgICogICB7QGxpbmsgbmdSZXNvdXJjZS4kcmVzb3VyY2V9LiBUaGUgYWN0aW9ucyBjYW4gYWxzbyBiZSBlbmhhbmNlZCBvciBvdmVyd3JpdHRlbiBwZXIgcmVzb3VyY2VcbiAgICAgKiAgIGNsYXNzLjxiciAvPlxuICAgICAqICAgVGhlIGRlZmF1bHQgYWN0aW9ucyBhcmU6XG4gICAgICogICBgYGBqc1xuICAgICAqICAge1xuICAgICAqICAgICBnZXQ6IHttZXRob2Q6ICdHRVQnfSxcbiAgICAgKiAgICAgc2F2ZToge21ldGhvZDogJ1BPU1QnfSxcbiAgICAgKiAgICAgcXVlcnk6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfSxcbiAgICAgKiAgICAgcmVtb3ZlOiB7bWV0aG9kOiAnREVMRVRFJ30sXG4gICAgICogICAgIGRlbGV0ZToge21ldGhvZDogJ0RFTEVURSd9XG4gICAgICogICB9XG4gICAgICogICBgYGBcbiAgICAgKlxuICAgICAqICMjIyMgRXhhbXBsZVxuICAgICAqXG4gICAgICogRm9yIGV4YW1wbGUsIHlvdSBjYW4gc3BlY2lmeSBhIG5ldyBgdXBkYXRlYCBhY3Rpb24gdGhhdCB1c2VzIHRoZSBgUFVUYCBIVFRQIHZlcmI6XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICAgYW5ndWxhci5cbiAgICAgKiAgICAgbW9kdWxlKCdteUFwcCcpLlxuICAgICAqICAgICBjb25maWcoWyckcmVzb3VyY2VQcm92aWRlcicsIGZ1bmN0aW9uICgkcmVzb3VyY2VQcm92aWRlcikge1xuICAgICAqICAgICAgICRyZXNvdXJjZVByb3ZpZGVyLmRlZmF1bHRzLmFjdGlvbnMudXBkYXRlID0ge1xuICAgICAqICAgICAgICAgbWV0aG9kOiAnUFVUJ1xuICAgICAqICAgICAgIH07XG4gICAgICogICAgIH1dKTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIE9yIHlvdSBjYW4gZXZlbiBvdmVyd3JpdGUgdGhlIHdob2xlIGBhY3Rpb25zYCBsaXN0IGFuZCBzcGVjaWZ5IHlvdXIgb3duOlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAgIGFuZ3VsYXIuXG4gICAgICogICAgIG1vZHVsZSgnbXlBcHAnKS5cbiAgICAgKiAgICAgY29uZmlnKFsnJHJlc291cmNlUHJvdmlkZXInLCBmdW5jdGlvbiAoJHJlc291cmNlUHJvdmlkZXIpIHtcbiAgICAgKiAgICAgICAkcmVzb3VyY2VQcm92aWRlci5kZWZhdWx0cy5hY3Rpb25zID0ge1xuICAgICAqICAgICAgICAgY3JlYXRlOiB7bWV0aG9kOiAnUE9TVCd9LFxuICAgICAqICAgICAgICAgZ2V0OiAgICB7bWV0aG9kOiAnR0VUJ30sXG4gICAgICogICAgICAgICBnZXRBbGw6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OnRydWV9LFxuICAgICAqICAgICAgICAgdXBkYXRlOiB7bWV0aG9kOiAnUFVUJ30sXG4gICAgICogICAgICAgICBkZWxldGU6IHttZXRob2Q6ICdERUxFVEUnfVxuICAgICAqICAgICAgIH07XG4gICAgICogICAgIH0pO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICovXG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgIC8vIFN0cmlwIHNsYXNoZXMgYnkgZGVmYXVsdFxuICAgICAgc3RyaXBUcmFpbGluZ1NsYXNoZXM6IHRydWUsXG5cbiAgICAgIC8vIE1ha2Ugbm9uLWluc3RhbmNlIHJlcXVlc3RzIGNhbmNlbGxhYmxlICh2aWEgYCRjYW5jZWxSZXF1ZXN0KClgKVxuICAgICAgY2FuY2VsbGFibGU6IGZhbHNlLFxuXG4gICAgICAvLyBEZWZhdWx0IGFjdGlvbnMgY29uZmlndXJhdGlvblxuICAgICAgYWN0aW9uczoge1xuICAgICAgICAnZ2V0Jzoge21ldGhvZDogJ0dFVCd9LFxuICAgICAgICAnc2F2ZSc6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICAgICdxdWVyeSc6IHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfSxcbiAgICAgICAgJ3JlbW92ZSc6IHttZXRob2Q6ICdERUxFVEUnfSxcbiAgICAgICAgJ2RlbGV0ZSc6IHttZXRob2Q6ICdERUxFVEUnfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLiRnZXQgPSBbJyRodHRwJywgJyRsb2cnLCAnJHEnLCAnJHRpbWVvdXQnLCBmdW5jdGlvbigkaHR0cCwgJGxvZywgJHEsICR0aW1lb3V0KSB7XG5cbiAgICAgIHZhciBub29wID0gYW5ndWxhci5ub29wLFxuICAgICAgICAgIGZvckVhY2ggPSBhbmd1bGFyLmZvckVhY2gsXG4gICAgICAgICAgZXh0ZW5kID0gYW5ndWxhci5leHRlbmQsXG4gICAgICAgICAgY29weSA9IGFuZ3VsYXIuY29weSxcbiAgICAgICAgICBpc0FycmF5ID0gYW5ndWxhci5pc0FycmF5LFxuICAgICAgICAgIGlzRGVmaW5lZCA9IGFuZ3VsYXIuaXNEZWZpbmVkLFxuICAgICAgICAgIGlzRnVuY3Rpb24gPSBhbmd1bGFyLmlzRnVuY3Rpb24sXG4gICAgICAgICAgaXNOdW1iZXIgPSBhbmd1bGFyLmlzTnVtYmVyLFxuICAgICAgICAgIGVuY29kZVVyaVF1ZXJ5ID0gYW5ndWxhci4kJGVuY29kZVVyaVF1ZXJ5LFxuICAgICAgICAgIGVuY29kZVVyaVNlZ21lbnQgPSBhbmd1bGFyLiQkZW5jb2RlVXJpU2VnbWVudDtcblxuICAgICAgZnVuY3Rpb24gUm91dGUodGVtcGxhdGUsIGRlZmF1bHRzKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZTtcbiAgICAgICAgdGhpcy5kZWZhdWx0cyA9IGV4dGVuZCh7fSwgcHJvdmlkZXIuZGVmYXVsdHMsIGRlZmF1bHRzKTtcbiAgICAgICAgdGhpcy51cmxQYXJhbXMgPSB7fTtcbiAgICAgIH1cblxuICAgICAgUm91dGUucHJvdG90eXBlID0ge1xuICAgICAgICBzZXRVcmxQYXJhbXM6IGZ1bmN0aW9uKGNvbmZpZywgcGFyYW1zLCBhY3Rpb25VcmwpIHtcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICB1cmwgPSBhY3Rpb25VcmwgfHwgc2VsZi50ZW1wbGF0ZSxcbiAgICAgICAgICAgIHZhbCxcbiAgICAgICAgICAgIGVuY29kZWRWYWwsXG4gICAgICAgICAgICBwcm90b2NvbEFuZElwdjYgPSAnJztcblxuICAgICAgICAgIHZhciB1cmxQYXJhbXMgPSBzZWxmLnVybFBhcmFtcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgZm9yRWFjaCh1cmwuc3BsaXQoL1xcVy8pLCBmdW5jdGlvbihwYXJhbSkge1xuICAgICAgICAgICAgaWYgKHBhcmFtID09PSAnaGFzT3duUHJvcGVydHknKSB7XG4gICAgICAgICAgICAgIHRocm93ICRyZXNvdXJjZU1pbkVycignYmFkbmFtZScsICdoYXNPd25Qcm9wZXJ0eSBpcyBub3QgYSB2YWxpZCBwYXJhbWV0ZXIgbmFtZS4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKG5ldyBSZWdFeHAoJ15cXFxcZCskJykudGVzdChwYXJhbSkpICYmIHBhcmFtICYmXG4gICAgICAgICAgICAgIChuZXcgUmVnRXhwKCcoXnxbXlxcXFxcXFxcXSk6JyArIHBhcmFtICsgJyhcXFxcV3wkKScpLnRlc3QodXJsKSkpIHtcbiAgICAgICAgICAgICAgdXJsUGFyYW1zW3BhcmFtXSA9IHtcbiAgICAgICAgICAgICAgICBpc1F1ZXJ5UGFyYW1WYWx1ZTogKG5ldyBSZWdFeHAoJ1xcXFw/Lio9OicgKyBwYXJhbSArICcoPzpcXFxcV3wkKScpKS50ZXN0KHVybClcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFxcXDovZywgJzonKTtcbiAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShQUk9UT0NPTF9BTkRfSVBWNl9SRUdFWCwgZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgICAgICAgIHByb3RvY29sQW5kSXB2NiA9IG1hdGNoO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgcGFyYW1zID0gcGFyYW1zIHx8IHt9O1xuICAgICAgICAgIGZvckVhY2goc2VsZi51cmxQYXJhbXMsIGZ1bmN0aW9uKHBhcmFtSW5mbywgdXJsUGFyYW0pIHtcbiAgICAgICAgICAgIHZhbCA9IHBhcmFtcy5oYXNPd25Qcm9wZXJ0eSh1cmxQYXJhbSkgPyBwYXJhbXNbdXJsUGFyYW1dIDogc2VsZi5kZWZhdWx0c1t1cmxQYXJhbV07XG4gICAgICAgICAgICBpZiAoaXNEZWZpbmVkKHZhbCkgJiYgdmFsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIGlmIChwYXJhbUluZm8uaXNRdWVyeVBhcmFtVmFsdWUpIHtcbiAgICAgICAgICAgICAgICBlbmNvZGVkVmFsID0gZW5jb2RlVXJpUXVlcnkodmFsLCB0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbmNvZGVkVmFsID0gZW5jb2RlVXJpU2VnbWVudCh2YWwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJzonICsgdXJsUGFyYW0gKyAnKFxcXFxXfCQpJywgJ2cnKSwgZnVuY3Rpb24obWF0Y2gsIHAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVuY29kZWRWYWwgKyBwMTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShuZXcgUmVnRXhwKCcoLz8pOicgKyB1cmxQYXJhbSArICcoXFxcXFd8JCknLCAnZycpLCBmdW5jdGlvbihtYXRjaCxcbiAgICAgICAgICAgICAgICAgIGxlYWRpbmdTbGFzaGVzLCB0YWlsKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhaWwuY2hhckF0KDApID09PSAnLycpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0YWlsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gbGVhZGluZ1NsYXNoZXMgKyB0YWlsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBzdHJpcCB0cmFpbGluZyBzbGFzaGVzIGFuZCBzZXQgdGhlIHVybCAodW5sZXNzIHRoaXMgYmVoYXZpb3IgaXMgc3BlY2lmaWNhbGx5IGRpc2FibGVkKVxuICAgICAgICAgIGlmIChzZWxmLmRlZmF1bHRzLnN0cmlwVHJhaWxpbmdTbGFzaGVzKSB7XG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFwvKyQvLCAnJykgfHwgJy8nO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENvbGxhcHNlIGAvLmAgaWYgZm91bmQgaW4gdGhlIGxhc3QgVVJMIHBhdGggc2VnbWVudCBiZWZvcmUgdGhlIHF1ZXJ5LlxuICAgICAgICAgIC8vIEUuZy4gYGh0dHA6Ly91cmwuY29tL2lkLy5mb3JtYXQ/cT14YCBiZWNvbWVzIGBodHRwOi8vdXJsLmNvbS9pZC5mb3JtYXQ/cT14YC5cbiAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZSgvXFwvXFwuKD89XFx3KygkfFxcPykpLywgJy4nKTtcbiAgICAgICAgICAvLyBSZXBsYWNlIGVzY2FwZWQgYC9cXC5gIHdpdGggYC8uYC5cbiAgICAgICAgICAvLyAoSWYgYFxcLmAgY29tZXMgZnJvbSBhIHBhcmFtIHZhbHVlLCBpdCB3aWxsIGJlIGVuY29kZWQgYXMgYCU1Qy5gLilcbiAgICAgICAgICBjb25maWcudXJsID0gcHJvdG9jb2xBbmRJcHY2ICsgdXJsLnJlcGxhY2UoL1xcLyhcXFxcfCU1QylcXC4vLCAnLy4nKTtcblxuXG4gICAgICAgICAgLy8gc2V0IHBhcmFtcyAtIGRlbGVnYXRlIHBhcmFtIGVuY29kaW5nIHRvICRodHRwXG4gICAgICAgICAgZm9yRWFjaChwYXJhbXMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIGlmICghc2VsZi51cmxQYXJhbXNba2V5XSkge1xuICAgICAgICAgICAgICBjb25maWcucGFyYW1zID0gY29uZmlnLnBhcmFtcyB8fCB7fTtcbiAgICAgICAgICAgICAgY29uZmlnLnBhcmFtc1trZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cblxuICAgICAgZnVuY3Rpb24gcmVzb3VyY2VGYWN0b3J5KHVybCwgcGFyYW1EZWZhdWx0cywgYWN0aW9ucywgb3B0aW9ucykge1xuICAgICAgICB2YXIgcm91dGUgPSBuZXcgUm91dGUodXJsLCBvcHRpb25zKTtcblxuICAgICAgICBhY3Rpb25zID0gZXh0ZW5kKHt9LCBwcm92aWRlci5kZWZhdWx0cy5hY3Rpb25zLCBhY3Rpb25zKTtcblxuICAgICAgICBmdW5jdGlvbiBleHRyYWN0UGFyYW1zKGRhdGEsIGFjdGlvblBhcmFtcykge1xuICAgICAgICAgIHZhciBpZHMgPSB7fTtcbiAgICAgICAgICBhY3Rpb25QYXJhbXMgPSBleHRlbmQoe30sIHBhcmFtRGVmYXVsdHMsIGFjdGlvblBhcmFtcyk7XG4gICAgICAgICAgZm9yRWFjaChhY3Rpb25QYXJhbXMsIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkgeyB2YWx1ZSA9IHZhbHVlKGRhdGEpOyB9XG4gICAgICAgICAgICBpZHNba2V5XSA9IHZhbHVlICYmIHZhbHVlLmNoYXJBdCAmJiB2YWx1ZS5jaGFyQXQoMCkgPT09ICdAJyA/XG4gICAgICAgICAgICAgIGxvb2t1cERvdHRlZFBhdGgoZGF0YSwgdmFsdWUuc3Vic3RyKDEpKSA6IHZhbHVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBpZHM7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkZWZhdWx0UmVzcG9uc2VJbnRlcmNlcHRvcihyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5yZXNvdXJjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIFJlc291cmNlKHZhbHVlKSB7XG4gICAgICAgICAgc2hhbGxvd0NsZWFyQW5kQ29weSh2YWx1ZSB8fCB7fSwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBSZXNvdXJjZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGRhdGEgPSBleHRlbmQoe30sIHRoaXMpO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhLiRwcm9taXNlO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhLiRyZXNvbHZlZDtcbiAgICAgICAgICBkZWxldGUgZGF0YS4kY2FuY2VsUmVxdWVzdDtcbiAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgfTtcblxuICAgICAgICBmb3JFYWNoKGFjdGlvbnMsIGZ1bmN0aW9uKGFjdGlvbiwgbmFtZSkge1xuICAgICAgICAgIHZhciBoYXNCb2R5ID0gYWN0aW9uLmhhc0JvZHkgPT09IHRydWUgfHwgKGFjdGlvbi5oYXNCb2R5ICE9PSBmYWxzZSAmJiAvXihQT1NUfFBVVHxQQVRDSCkkL2kudGVzdChhY3Rpb24ubWV0aG9kKSk7XG4gICAgICAgICAgdmFyIG51bWVyaWNUaW1lb3V0ID0gYWN0aW9uLnRpbWVvdXQ7XG4gICAgICAgICAgdmFyIGNhbmNlbGxhYmxlID0gaXNEZWZpbmVkKGFjdGlvbi5jYW5jZWxsYWJsZSkgP1xuICAgICAgICAgICAgICBhY3Rpb24uY2FuY2VsbGFibGUgOiByb3V0ZS5kZWZhdWx0cy5jYW5jZWxsYWJsZTtcblxuICAgICAgICAgIGlmIChudW1lcmljVGltZW91dCAmJiAhaXNOdW1iZXIobnVtZXJpY1RpbWVvdXQpKSB7XG4gICAgICAgICAgICAkbG9nLmRlYnVnKCduZ1Jlc291cmNlOlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICBPbmx5IG51bWVyaWMgdmFsdWVzIGFyZSBhbGxvd2VkIGFzIGB0aW1lb3V0YC5cXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgUHJvbWlzZXMgYXJlIG5vdCBzdXBwb3J0ZWQgaW4gJHJlc291cmNlLCBiZWNhdXNlIHRoZSBzYW1lIHZhbHVlIHdvdWxkICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAnYmUgdXNlZCBmb3IgbXVsdGlwbGUgcmVxdWVzdHMuIElmIHlvdSBhcmUgbG9va2luZyBmb3IgYSB3YXkgdG8gY2FuY2VsICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAncmVxdWVzdHMsIHlvdSBzaG91bGQgdXNlIHRoZSBgY2FuY2VsbGFibGVgIG9wdGlvbi4nKTtcbiAgICAgICAgICAgIGRlbGV0ZSBhY3Rpb24udGltZW91dDtcbiAgICAgICAgICAgIG51bWVyaWNUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBSZXNvdXJjZVtuYW1lXSA9IGZ1bmN0aW9uKGExLCBhMiwgYTMsIGE0KSB7XG4gICAgICAgICAgICB2YXIgcGFyYW1zID0ge30sIGRhdGEsIG9uU3VjY2Vzcywgb25FcnJvcjtcblxuICAgICAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBvbkVycm9yID0gYTQ7XG4gICAgICAgICAgICAgICAgb25TdWNjZXNzID0gYTM7XG4gICAgICAgICAgICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihhMikpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGExKSkge1xuICAgICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MgPSBhMTtcbiAgICAgICAgICAgICAgICAgICAgb25FcnJvciA9IGEyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgb25TdWNjZXNzID0gYTI7XG4gICAgICAgICAgICAgICAgICBvbkVycm9yID0gYTM7XG4gICAgICAgICAgICAgICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHBhcmFtcyA9IGExO1xuICAgICAgICAgICAgICAgICAgZGF0YSA9IGEyO1xuICAgICAgICAgICAgICAgICAgb25TdWNjZXNzID0gYTM7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oYTEpKSBvblN1Y2Nlc3MgPSBhMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChoYXNCb2R5KSBkYXRhID0gYTE7XG4gICAgICAgICAgICAgICAgZWxzZSBwYXJhbXMgPSBhMTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAwOiBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyAkcmVzb3VyY2VNaW5FcnIoJ2JhZGFyZ3MnLFxuICAgICAgICAgICAgICAgICAgJ0V4cGVjdGVkIHVwIHRvIDQgYXJndW1lbnRzIFtwYXJhbXMsIGRhdGEsIHN1Y2Nlc3MsIGVycm9yXSwgZ290IHswfSBhcmd1bWVudHMnLFxuICAgICAgICAgICAgICAgICAgYXJndW1lbnRzLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpc0luc3RhbmNlQ2FsbCA9IHRoaXMgaW5zdGFuY2VvZiBSZXNvdXJjZTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGlzSW5zdGFuY2VDYWxsID8gZGF0YSA6IChhY3Rpb24uaXNBcnJheSA/IFtdIDogbmV3IFJlc291cmNlKGRhdGEpKTtcbiAgICAgICAgICAgIHZhciBodHRwQ29uZmlnID0ge307XG4gICAgICAgICAgICB2YXIgcmVxdWVzdEludGVyY2VwdG9yID0gYWN0aW9uLmludGVyY2VwdG9yICYmIGFjdGlvbi5pbnRlcmNlcHRvci5yZXF1ZXN0IHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0RXJyb3JJbnRlcmNlcHRvciA9IGFjdGlvbi5pbnRlcmNlcHRvciAmJiBhY3Rpb24uaW50ZXJjZXB0b3IucmVxdWVzdEVycm9yIHx8XG4gICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciByZXNwb25zZUludGVyY2VwdG9yID0gYWN0aW9uLmludGVyY2VwdG9yICYmIGFjdGlvbi5pbnRlcmNlcHRvci5yZXNwb25zZSB8fFxuICAgICAgICAgICAgICBkZWZhdWx0UmVzcG9uc2VJbnRlcmNlcHRvcjtcbiAgICAgICAgICAgIHZhciByZXNwb25zZUVycm9ySW50ZXJjZXB0b3IgPSBhY3Rpb24uaW50ZXJjZXB0b3IgJiYgYWN0aW9uLmludGVyY2VwdG9yLnJlc3BvbnNlRXJyb3IgfHxcbiAgICAgICAgICAgICAgJHEucmVqZWN0O1xuICAgICAgICAgICAgdmFyIHN1Y2Nlc3NDYWxsYmFjayA9IG9uU3VjY2VzcyA/IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgICBvblN1Y2Nlc3ModmFsLCByZXNwb25zZS5oZWFkZXJzLCByZXNwb25zZS5zdGF0dXMsIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICAgICAgICAgICAgfSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciBlcnJvckNhbGxiYWNrID0gb25FcnJvciB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgdGltZW91dERlZmVycmVkO1xuICAgICAgICAgICAgdmFyIG51bWVyaWNUaW1lb3V0UHJvbWlzZTtcbiAgICAgICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICAgICAgZm9yRWFjaChhY3Rpb24sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgaHR0cENvbmZpZ1trZXldID0gY29weSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwYXJhbXMnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2lzQXJyYXknOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2ludGVyY2VwdG9yJzpcbiAgICAgICAgICAgICAgICBjYXNlICdjYW5jZWxsYWJsZSc6XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmICghaXNJbnN0YW5jZUNhbGwgJiYgY2FuY2VsbGFibGUpIHtcbiAgICAgICAgICAgICAgdGltZW91dERlZmVycmVkID0gJHEuZGVmZXIoKTtcbiAgICAgICAgICAgICAgaHR0cENvbmZpZy50aW1lb3V0ID0gdGltZW91dERlZmVycmVkLnByb21pc2U7XG5cbiAgICAgICAgICAgICAgaWYgKG51bWVyaWNUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgbnVtZXJpY1RpbWVvdXRQcm9taXNlID0gJHRpbWVvdXQodGltZW91dERlZmVycmVkLnJlc29sdmUsIG51bWVyaWNUaW1lb3V0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoaGFzQm9keSkgaHR0cENvbmZpZy5kYXRhID0gZGF0YTtcbiAgICAgICAgICAgIHJvdXRlLnNldFVybFBhcmFtcyhodHRwQ29uZmlnLFxuICAgICAgICAgICAgICBleHRlbmQoe30sIGV4dHJhY3RQYXJhbXMoZGF0YSwgYWN0aW9uLnBhcmFtcyB8fCB7fSksIHBhcmFtcyksXG4gICAgICAgICAgICAgIGFjdGlvbi51cmwpO1xuXG4gICAgICAgICAgICAvLyBTdGFydCB0aGUgcHJvbWlzZSBjaGFpblxuICAgICAgICAgICAgdmFyIHByb21pc2UgPSAkcS5cbiAgICAgICAgICAgICAgcmVzb2x2ZShodHRwQ29uZmlnKS5cbiAgICAgICAgICAgICAgdGhlbihyZXF1ZXN0SW50ZXJjZXB0b3IpLlxuICAgICAgICAgICAgICBjYXRjaChyZXF1ZXN0RXJyb3JJbnRlcmNlcHRvcikuXG4gICAgICAgICAgICAgIHRoZW4oJGh0dHApO1xuXG4gICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3ApIHtcbiAgICAgICAgICAgICAgdmFyIGRhdGEgPSByZXNwLmRhdGE7XG5cbiAgICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAvLyBOZWVkIHRvIGNvbnZlcnQgYWN0aW9uLmlzQXJyYXkgdG8gYm9vbGVhbiBpbiBjYXNlIGl0IGlzIHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KGRhdGEpICE9PSAoISFhY3Rpb24uaXNBcnJheSkpIHtcbiAgICAgICAgICAgICAgICAgIHRocm93ICRyZXNvdXJjZU1pbkVycignYmFkY2ZnJyxcbiAgICAgICAgICAgICAgICAgICAgICAnRXJyb3IgaW4gcmVzb3VyY2UgY29uZmlndXJhdGlvbiBmb3IgYWN0aW9uIGB7MH1gLiBFeHBlY3RlZCByZXNwb25zZSB0byAnICtcbiAgICAgICAgICAgICAgICAgICAgICAnY29udGFpbiBhbiB7MX0gYnV0IGdvdCBhbiB7Mn0gKFJlcXVlc3Q6IHszfSB7NH0pJywgbmFtZSwgYWN0aW9uLmlzQXJyYXkgPyAnYXJyYXknIDogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgIGlzQXJyYXkoZGF0YSkgPyAnYXJyYXknIDogJ29iamVjdCcsIGh0dHBDb25maWcubWV0aG9kLCBodHRwQ29uZmlnLnVybCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhY3Rpb24uaXNBcnJheSkge1xuICAgICAgICAgICAgICAgICAgdmFsdWUubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgIGZvckVhY2goZGF0YSwgZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaChuZXcgUmVzb3VyY2UoaXRlbSkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkIEpTT04gdmFsdWVzIG1heSBiZSBzdHJpbmcgbGl0ZXJhbHMsIGFuZCB0aGVzZSBzaG91bGQgbm90IGJlIGNvbnZlcnRlZFxuICAgICAgICAgICAgICAgICAgICAgIC8vIGludG8gb2JqZWN0cy4gVGhlc2UgaXRlbXMgd2lsbCBub3QgaGF2ZSBhY2Nlc3MgdG8gdGhlIFJlc291cmNlIHByb3RvdHlwZVxuICAgICAgICAgICAgICAgICAgICAgIC8vIG1ldGhvZHMsIGJ1dCB1bmZvcnR1bmF0ZWx5IHRoZXJlXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWUucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHZhciBwcm9taXNlID0gdmFsdWUuJHByb21pc2U7ICAgICAvLyBTYXZlIHRoZSBwcm9taXNlXG4gICAgICAgICAgICAgICAgICBzaGFsbG93Q2xlYXJBbmRDb3B5KGRhdGEsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIHZhbHVlLiRwcm9taXNlID0gcHJvbWlzZTsgICAgICAgICAvLyBSZXN0b3JlIHRoZSBwcm9taXNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmVzcC5yZXNvdXJjZSA9IHZhbHVlO1xuICAgICAgICAgICAgICByZXNwb25zZSA9IHJlc3A7XG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25zZUludGVyY2VwdG9yKHJlc3ApO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24ocmVqZWN0aW9uT3JSZXNwb25zZSkge1xuICAgICAgICAgICAgICByZWplY3Rpb25PclJlc3BvbnNlLnJlc291cmNlID0gdmFsdWU7XG4gICAgICAgICAgICAgIHJlc3BvbnNlID0gcmVqZWN0aW9uT3JSZXNwb25zZTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlRXJyb3JJbnRlcmNlcHRvcihyZWplY3Rpb25PclJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwcm9taXNlID0gcHJvbWlzZVsnZmluYWxseSddKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICB2YWx1ZS4kcmVzb2x2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICBpZiAoIWlzSW5zdGFuY2VDYWxsICYmIGNhbmNlbGxhYmxlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUuJGNhbmNlbFJlcXVlc3QgPSBub29wO1xuICAgICAgICAgICAgICAgICR0aW1lb3V0LmNhbmNlbChudW1lcmljVGltZW91dFByb21pc2UpO1xuICAgICAgICAgICAgICAgIHRpbWVvdXREZWZlcnJlZCA9IG51bWVyaWNUaW1lb3V0UHJvbWlzZSA9IGh0dHBDb25maWcudGltZW91dCA9IG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBSdW4gdGhlIGBzdWNjZXNzYC9gZXJyb3JgIGNhbGxiYWNrcywgYnV0IGRvIG5vdCBsZXQgdGhlbSBhZmZlY3QgdGhlIHJldHVybmVkIHByb21pc2UuXG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oc3VjY2Vzc0NhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTtcblxuICAgICAgICAgICAgaWYgKCFpc0luc3RhbmNlQ2FsbCkge1xuICAgICAgICAgICAgICAvLyB3ZSBhcmUgY3JlYXRpbmcgaW5zdGFuY2UgLyBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgIC8vIC0gc2V0IHRoZSBpbml0aWFsIHByb21pc2VcbiAgICAgICAgICAgICAgLy8gLSByZXR1cm4gdGhlIGluc3RhbmNlIC8gY29sbGVjdGlvblxuICAgICAgICAgICAgICB2YWx1ZS4kcHJvbWlzZSA9IHByb21pc2U7XG4gICAgICAgICAgICAgIHZhbHVlLiRyZXNvbHZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICBpZiAoY2FuY2VsbGFibGUpIHZhbHVlLiRjYW5jZWxSZXF1ZXN0ID0gY2FuY2VsUmVxdWVzdDtcblxuICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGluc3RhbmNlIGNhbGxcbiAgICAgICAgICAgIHJldHVybiBwcm9taXNlO1xuXG4gICAgICAgICAgICBmdW5jdGlvbiBjYW5jZWxSZXF1ZXN0KHZhbHVlKSB7XG4gICAgICAgICAgICAgIHByb21pc2UuY2F0Y2gobm9vcCk7XG4gICAgICAgICAgICAgIGlmICh0aW1lb3V0RGVmZXJyZWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aW1lb3V0RGVmZXJyZWQucmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICBSZXNvdXJjZS5wcm90b3R5cGVbJyQnICsgbmFtZV0gPSBmdW5jdGlvbihwYXJhbXMsIHN1Y2Nlc3MsIGVycm9yKSB7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihwYXJhbXMpKSB7XG4gICAgICAgICAgICAgIGVycm9yID0gc3VjY2Vzczsgc3VjY2VzcyA9IHBhcmFtczsgcGFyYW1zID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gUmVzb3VyY2VbbmFtZV0uY2FsbCh0aGlzLCBwYXJhbXMsIHRoaXMsIHN1Y2Nlc3MsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQuJHByb21pc2UgfHwgcmVzdWx0O1xuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBSZXNvdXJjZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc291cmNlRmFjdG9yeTtcbiAgICB9XTtcbiAgfSk7XG5cblxufSkod2luZG93LCB3aW5kb3cuYW5ndWxhcik7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hbmd1bGFyLXJlc291cmNlL2FuZ3VsYXItcmVzb3VyY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBpLXJlcXVlc3RzLmpzXCI6IDc2MSxcblx0XCIuL21kLWNvbnN0YW50cy5qc1wiOiA3NjJcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3NjA7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29uc3RhbnRzIC4rXFwuanMkXG4vLyBtb2R1bGUgaWQgPSA3NjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5jb25zdGFudCgnYXBpUmVxdWVzdENvbmZpZycsIHtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29uc3RhbnRzL2FwaS1yZXF1ZXN0cy5qc1xuLy8gbW9kdWxlIGlkID0gNzYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMTIuMDkuMjAxNi5cclxuICogTWF0ZXJpYWwgRGVzaWduIGNvbnN0YW50c1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5jb25zdGFudCgnbWRDb25zdGFudHMnLCB7XHJcbiAgICAgICAgYXZhdGFyU2l6ZTogNDAsXHJcbiAgICAgICAgcGFkZGluZ1NpemU6IDE2LFxyXG4gICAgICAgIHN0ZFRleHRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC44NyknXHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29uc3RhbnRzL21kLWNvbnN0YW50cy5qc1xuLy8gbW9kdWxlIGlkID0gNzYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9yb3V0ZS1jb250cm9sbGVyLmpzXCI6IDc2NFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDc2MztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb250cm9sbGVycyAuK1xcLmpzJFxuLy8gbW9kdWxlIGlkID0gNzYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuY29udHJvbGxlcignUm91dGVDb250cm9sbGVyJywgUm91dGVDb250cm9sbGVyKTtcclxuICAgIFJvdXRlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBSb3V0ZUNvbnRyb2xsZXIgKCRzY29wZSkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlVGFiSW5kZXggPSAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSb3V0ZSBDdHJsIGluaXQnKVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbnRyb2xsZXJzL3JvdXRlLWNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXAtbWQtY29sb3IuanNcIjogNzY2LFxuXHRcIi4vcmVzaXplci5qc1wiOiA3Njdcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3NjU7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZGlyZWN0aXZlcyAuK1xcLmpzJFxuLy8gbW9kdWxlIGlkID0gNzY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHBhc3RvciBvbiA2LzI1LzIwMTYuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLmRpcmVjdGl2ZSgnYXBNZENvbG9yJywgYXBNZENvbG9yRGlyZWN0aXZlKTtcclxuICAgIGFwTWRDb2xvckRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbWRUaGVtaW5nJywgJyRtZENvbG9yUGFsZXR0ZScsICckY29sb3JkZWYnXTtcclxuICAgIGZ1bmN0aW9uIGFwTWRDb2xvckRpcmVjdGl2ZSgkbWRUaGVtaW5nLCAkbWRDb2xvclBhbGV0dGUsICRjb2xvcmRlZikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIC8vc2NvcGU6IHtcclxuICAgICAgICAgICAgLy8gICAgbWRDb2xvcjogJz1hcE1kQ29sb3InXHJcbiAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgbGluazogbGlua1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHt9O1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCRtZENvbG9yUGFsZXR0ZSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJG1kVGhlbWluZy5USEVNRVMuZGVmYXVsdCk7XHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9IHNjb3BlLiRldmFsKGF0dHJzLmFwTWRDb2xvcik7XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY29sb3IsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtrZXldID0gJGNvbG9yZGVmLmdldENvbG9yKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LmNzcyhzdHlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL2FwLW1kLWNvbG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3NjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMi4wNS4yMDE3LlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuZGlyZWN0aXZlKCdyZXNpemVyJywgcmVzaXplckRpcmVjdGl2ZSk7XHJcbiAgICByZXNpemVyRGlyZWN0aXZlLiRpbmplY3QgPSBbJyRxJywgJyR0aW1lb3V0JywgJ3Jlc2l6ZVNlbnNvciddO1xyXG4gICAgZnVuY3Rpb24gcmVzaXplckRpcmVjdGl2ZSgkcSwgJHRpbWVvdXQsIHJlc2l6ZVNlbnNvcikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIGxpbms6IGxpbmtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZ1bmN0aW9uIGxpbmsgKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICBjb25zdCBycyA9IHJlc2l6ZVNlbnNvci5nZXRJbnN0YW5jZShlbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gcGFyc2VJbnQoYXR0cnMucmVzaXplciwgMTApIHx8IDA7XHJcblxyXG4gICAgICAgICAgICBpc0F0dGFjaGVkKGVsZW1lbnQucGFyZW50KCkpLnRoZW4oKGluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVNpemUoZWxlbWVudCwgaW5mby5yZWN0LndpZHRoLCBpbmZvLnJlY3QuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJzLmF0dGFjaFJlc2l6ZUV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdywgaDtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoID0gZWxlbWVudC5wYXJlbnQoKVswXS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBlbGVtZW50LnBhcmVudCgpWzBdLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUlMgZmlyZWQ6ICR7d30geCAke2h9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoICYmICFpc05hTihoKSAmJiBoICE9PSBlbGVtZW50WzBdLm9mZnNldEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU2l6ZShlbGVtZW50LCB3LCBoICsgb2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBycy5kZXRhY2hSZXNpemVFdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgcnMucXVldWUuZmx1c2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVNpemUgKGVsLCB3LCBoKSB7XHJcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHIoJ3N0eWxlJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICd3aWR0aCc6IHcgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IGggKyAncHgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpc0F0dGFjaGVkIChlbGVtLCBjb3VudCA9IDApIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1SZWN0O1xyXG4gICAgICAgICAgICByZXR1cm4gJHEoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtUmVjdCA9IGVsZW1bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZWxlbVJlY3Qud2lkdGggJiYgZWxlbVJlY3QuaGVpZ2h0KSB8fCBjb3VudCA+IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtyZWN0OiBlbGVtUmVjdCwgY291bnQ6IGNvdW50fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyAnRWxlbWVudCBub3QgaW4gRE9NIHlldCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50IDwgMTAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc0F0dGFjaGVkKGVsZW0sIGNvdW50ICsgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3Q6IHt3aWR0aDogMCwgaGVpZ2h0OiAwfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogY291bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2RpcmVjdGl2ZXMvcmVzaXplci5qc1xuLy8gbW9kdWxlIGlkID0gNzY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hcGktcmVxdWVzdC1wcm92aWRlci5qc1wiOiA3NjksXG5cdFwiLi9jb2xvci1kZWYtc2VydmljZS5qc1wiOiA3NzAsXG5cdFwiLi9kb3VibGUtc2VydmljZS5qc1wiOiA3NzEsXG5cdFwiLi9ldmVudC1lbWl0dGVyLXNlcnZpY2UuanNcIjogNzcyLFxuXHRcIi4vcmVzaXplLXNlbnNvci5qc1wiOiA3NzMsXG5cdFwiLi9zbGFzaC1wYXJhbS1zZXJpYWxpemVyLmpzXCI6IDc3NCxcblx0XCIuL3N0b3JhZ2UtcHJvdmlkZXIuanNcIjogNzc1XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNzY4O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzIC4rXFwuanMkXG4vLyBtb2R1bGUgaWQgPSA3Njhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypQcm92aWRlciB0byBwcm9kdWNlIGluZGVwZW5kZW50IGluc3RhbmNlcyBvZiBBUEkgcmVxdWVzdHMuXHJcbiAqIFVzYWdlOiBhcGlSZXF1ZXN0U2VydmljZS5ieU5hbWUobmFtZSkuc2VuZChwYXJhbXMsZGF0YSkudGhlbigpXHJcbiAqIEBuYW1lOiBuYW1lIG9mIGNvbmZpZyB0ZW1wbGF0ZVxyXG4gKiBAcGFyYW1zOiBvYmplY3QgdG8gc2VyaWFsaXplIGFuZCBhZGQgdG8gdGhlIFVSTC4gQnkgZGVmYXVsdCBzZXJpYWxpemVkIHRvIFVSTCBzdHJpbmcsIGJ1dCBjYW4gYmUgb3ZlcnJpZGVuIHdpdGggY3VzdG9tIHNlcnZpY2VcclxuICogICAgICAgYnkgc2V0dGluZyBwYXJhbVNlcmlhbGl6ZXIgcHJvcGVydHkgaW4gY29uZmlnIHRlbXBsYXRlLiBzbGFzaFBhcmFtU2VyaWFsaXplciBjb252ZXJ0cyBwYXJhbXMgdG8gL2tleTEvdmFsdWUxL2tleTIvdmFsdWUyL1xyXG4gKiBAZGF0YTogb2JqZWN0IHBhc3NlZCB3aXRoaW4gcmVxdWVzdCBib2R5XHJcbiAqICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAucHJvdmlkZXIoJ2FwaVJlcXVlc3QnLCBbJ2FwaVJlcXVlc3RDb25maWcnLCBmdW5jdGlvbiAoY29uZmlnKSB7XHJcblxyXG4gICAgICAgIHRoaXMuJGdldCA9IFsnYXBpUmVxdWVzdENvbmZpZycsICckaHR0cCcsICckaW5qZWN0b3InLCBmdW5jdGlvbiAoY29uZmlnLCAkaHR0cCwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIEFwaVJlcXVlc3Qob2JqKSB7XHJcbiAgICAgICAgICAgICAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCBvYmopO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBBcGlSZXF1ZXN0LnByb3RvdHlwZSA9IHtcclxuICAgICAgICAgICAgICAgIGJhc2VVcmw6ICcvYXBpL3YxJyxcclxuICAgICAgICAgICAgICAgIHNlbmQ6IGZ1bmN0aW9uIChwYXJhbXMsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEgfHwge307XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vaW5qZWN0IHBhcmFtIHNlcmlhbGl6ZXIgc2VydmljZSBpZiBwcm9wZXJ0eSBpcyBzZXRcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbVNlcmlhbGl6ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbVNlcmlhbGl6ZXIgPSAkaW5qZWN0b3IuZ2V0KHRoaXMucGFyYW1TZXJpYWxpemVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy51cmwgKz0gdGhpcy5wYXJhbVNlcmlhbGl6ZXIocGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBjb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAvXmh0dHAuKyQvLnRlc3QodGhpcy51cmwpID8gdGhpcy51cmwgOiB0aGlzLmJhc2VVcmwgKyB0aGlzLnVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBhbmd1bGFyLmV4dGVuZCh7fSwgdGhpcy5wYXJhbXMsIHBhcmFtcyksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGFuZ3VsYXIuZXh0ZW5kKHt9LCB0aGlzLmRhdGEsIGRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tZXRob2QgPT0gJ0dFVCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnLmhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAoY29uZmlnKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIEFwaVJlcXVlc3QgdXNpbmcgY29uZmlnIG9iamVjdFxyXG4gICAgICAgICAgICAgKiBwcmVkZWZpbmVkIGluIGNvbnN0bnRzXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSBuYW1lIHtTdHJpbmd9IEtleSBmb3IgY29uZmlnIG9iamVjdCBpbiBjb25zdGFudHNcclxuICAgICAgICAgICAgICogQHJldHVybnMgeyp9IGNvbmZpZ3VyZWQgQXBpUmVxdWVzdCBpbnN0YW5jZVxyXG4gICAgICAgICAgICAgKi9cclxuICAgICAgICAgICAgZnVuY3Rpb24gYnlOYW1lIChuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcGlSZXF1ZXN0KGNvbmZpZ1tuYW1lXSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYnlDZmcgKGNmZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcGlSZXF1ZXN0KGNmZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKlxyXG4gICAgICAgICAgICAgKiBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIEFwaVJlcXVlc3QgdXNpbmcgY29uZmlnIG9iamVjdFxyXG4gICAgICAgICAgICAgKiByZWNlaXZlZCBmcm9tIHNlcnZlclxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gcmVxdWVzdCB7T2JqZWN0fSBSZXF1ZXN0IG1ldGFkYXRhXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSByZXF1ZXN0LnVybCB7U3RyaW5nfSAnL3Btby9yZXBvcnRzL2VtcGwtbG9hZCcsXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSByZXF1ZXN0Lm1ldGhvZCB7U3RyaW5nfSAnUE9TVCcsXHJcbiAgICAgICAgICAgICAqIEBwYXJhbSByZXF1ZXN0LmJvZHkge0FycmF5fSBsaXN0IG9mIGZpZWxkcyB0byBzZW5kIGluIHRoZSBib2R5LFxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gcmVxdWVzdC5wYXJhbXMge0FycmF5fSBsaXN0IG9mIGZpZWxkcyB0byBiZSBzbGFzaC1zZXJpYWxpemVkIHRvIFVSTCxcclxuICAgICAgICAgICAgICogQHBhcmFtIHJlcXVlc3QucXVlcnkge0FycmF5fSBsaXN0IG9mIGZpZWxkcyB0byBzZW5kIGFzIHVybC1xdWVyeVxyXG4gICAgICAgICAgICAgKiBAcGFyYW0gY29udGVudCB7T2JqZWN0fSBhY3R1YWwgZGF0YSB0byBiZSBpbmNsdWRlZCBpbnRvIHJlcXVlc3RcclxuICAgICAgICAgICAgICogQHJldHVybnMgeyp9IHByZXBhcmVkIGNvbmZpZyB0byBnZXQgQXBpUmVxdWVzdCBpbnN0YW5jZSBhbmQgc3RvcmUgdG8gUmVkaXNcclxuICAgICAgICAgICAgICovXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldENvbmZpZyAocmVxdWVzdCwgY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGh0dHBDb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiByZXF1ZXN0LnVybCArICcvJyxcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHJlcXVlc3QubWV0aG9kXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHJlcXVlc3QucGFyYW1zXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcChmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGNvbnRlbnQucGFyYW1zW2tleV19KVxyXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKHYpIHtyZXR1cm4gISF2fSlcclxuICAgICAgICAgICAgICAgICAgICAubWFwKGZ1bmN0aW9uICh2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodi50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xcLlxcKlxcIVxcflxcKFxcKV0vZywgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwlXFx3ezJ9L2csICcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBodHRwQ29uZmlnLnVybCArPSBwYXJ0cy5qb2luKCcvJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY29udGVudC5xdWVyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0dHBDb25maWcucGFyYW1zID0ge307XHJcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNvbnRlbnQucXVlcnksIGZ1bmN0aW9uKHZhbCwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWwgaW5zdGFuY2VvZiBEYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSBtb21lbnQodmFsKS5mb3JtYXQoJ01NL0REL1lZWVknKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgaHR0cENvbmZpZy5wYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaHR0cENvbmZpZy5kYXRhID0gcmVxdWVzdC5ib2R5LnJlZHVjZShmdW5jdGlvbiAob2JqLCB2YWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpbdmFsXSA9IGNvbnRlbnRbdmFsXTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfSwge30pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGh0dHBDb25maWc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBieU5hbWU6IGJ5TmFtZSxcclxuICAgICAgICAgICAgICAgIGJ5Q2ZnOiBieUNmZyxcclxuICAgICAgICAgICAgICAgIGdldENvbmZpZzogZ2V0Q29uZmlnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XTtcclxuICAgIH1dKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvYXBpLXJlcXVlc3QtcHJvdmlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ3JlYXRlZCBieSBwYXN0b3Igb24gOC8yMS8yMDE2LlxyXG4gKiBTaW1wbGUgc2VydmljZSB0byBnZXQgY3NzLWZvcm1hdHRlZCBjb2xvcnMgZnJvbSBtZFRoZW1pbmcgYW5kIG1kQ29sb3JQYWxldHRlJ3NcclxuICogVmFsaWQgc3RyaW5nIGZvcm1hdHM6XHJcbiAqICdwYWxldHRlOjpsaWdodC1ibHVlOjpBMjAwJ1xyXG4gKiAncGFsZXR0ZTo6cmVkOjoyMDAnXHJcbiAqICdjdXN0b21UaGVtZTo6cHJpbWFyeSdcclxuICogJ2N1c3RvbVRoZW1lOjpwcmltYXJ5OjpodWUtMidcclxuICogJ3dhcm4nXHJcbiAqICdhY2NlbnQ6Omh1ZS0yJ1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5zZXJ2aWNlKCckY29sb3JkZWYnLCBjb2xvckRlZlNlcnZpY2UpO1xyXG4gICAgY29sb3JEZWZTZXJ2aWNlLiRpbmplY3QgPSBbJyRtZFRoZW1pbmcnLCAnJG1kQ29sb3JQYWxldHRlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gY29sb3JEZWZTZXJ2aWNlKCRtZFRoZW1pbmcsICRtZENvbG9yUGFsZXR0ZSkge1xyXG4gICAgICAgIGNvbnN0IGludGVudGlvbnMgPSBbJ3ByaW1hcnknLCAnYWNjZW50JywgJ3dhcm4nLCAnYmFja2dyb3VuZCddO1xyXG5cclxuICAgICAgICB0aGlzLmdldFJHQiA9IChkZWZTdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgZGVmU3RyaW5nID0gZGVmU3RyaW5nIHx8ICdwcmltYXJ5JztcclxuICAgICAgICAgICAgY29uc3QgZGVmQXJyYXkgPSBkZWZTdHJpbmcuc3BsaXQoJzo6Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yRGVmID0ge307XHJcbiAgICAgICAgICAgIGxldCBpbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmQXJyYXlbMF0gPT09ICdwYWxldHRlJykge1xyXG4gICAgICAgICAgICAgICAgY29sb3JEZWYucGFsZXR0ZSA9IGRlZkFycmF5WzFdO1xyXG4gICAgICAgICAgICAgICAgY29sb3JEZWYudmFyaWFudCA9IGRlZkFycmF5WzJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGludGVudGlvbnMuaW5kZXhPZihkZWZBcnJheVswXSkgPiAtMSkgeyAvL2RlZkFycmF5WzBdICE9PSAnZGVmYXVsdCcgfHxcclxuICAgICAgICAgICAgICAgICAgICBkZWZBcnJheS51bnNoaWZ0KCdkZWZhdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRlZkFycmF5WzJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmQXJyYXlbMl0gPSAnZGVmYXVsdCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnRlbnQgPSAkbWRUaGVtaW5nLlRIRU1FU1tkZWZBcnJheVswXV0uY29sb3JzW2RlZkFycmF5WzFdXTtcclxuICAgICAgICAgICAgICAgIGNvbG9yRGVmLnBhbGV0dGUgPSBpbnRlbnQubmFtZTtcclxuICAgICAgICAgICAgICAgIGNvbG9yRGVmLnZhcmlhbnQgPSBpbnRlbnQuaHVlc1tkZWZBcnJheVsyXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICRtZENvbG9yUGFsZXR0ZVtjb2xvckRlZi5wYWxldHRlXVtjb2xvckRlZi52YXJpYW50XS52YWx1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0Q29sb3IgPSAoZGVmU3RyaW5nLCBvcGFjaXR5ID0gMSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXNDb2xvciA9IHRoaXMuZ2V0UkdCKGRlZlN0cmluZyk7XHJcbiAgICAgICAgICAgIHJldHVybiBgcmdiYSgke3Jlc0NvbG9yLmpvaW4oJywgJyl9LCAke29wYWNpdHl9KWA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm51bVRvQ29sb3IgPSAobnVtKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bVRvUmdiYShudW0pLm1hcCgocmdiYSkgPT4gdGhpcy5yZ2JhVG9DU1MocmdiYSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5udW1Ub1JnYmEgPSAobnVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghbnVtKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbWzAsIDAsIDAsIDAuMTJdLCBbMCwgMCwgMCwgMC43OF1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc2hhZGVzID0gWzUwMCwgNDAwLCA2MDAsIDMwMCwgNzAwXTtcclxuICAgICAgICAgICAgY29uc3QgcGFsZXR0ZXMgPSBPYmplY3Qua2V5cygkbWRDb2xvclBhbGV0dGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjb2RlID0gbnVtLnRvU3RyaW5nKDEwKS5wYWRTdGFydCg1LCAnMCcpO1xyXG4gICAgICAgICAgICBjb25zdCBtYWluID0gcGFsZXR0ZXNbcGFyc2VJbnQoY29kZS5zbGljZSgtMikpICUgcGFsZXR0ZXMubGVuZ3RoXTtcclxuICAgICAgICAgICAgY29uc3Qgc2hhZGUgPSBzaGFkZXNbcGFyc2VJbnQoY29kZS5zbGljZSgwLCAtMikpICUgc2hhZGVzLmxlbmd0aF0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFskbWRDb2xvclBhbGV0dGVbbWFpbl1bc2hhZGVdLnZhbHVlLmNvbmNhdChbMV0pLCAkbWRDb2xvclBhbGV0dGVbbWFpbl1bc2hhZGVdLmNvbnRyYXN0LnNsaWNlKCldXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJnYmFUb0NTUyA9IChhcnIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGByZ2JhKCR7YXJyLmpvaW4oKX0pYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL2NvbG9yLWRlZi1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuc2VydmljZSgnJGRvdWJsZScsIGRvdWJsZVNlcnZpY2UpO1xyXG4gICAgZG91YmxlU2VydmljZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gZG91YmxlU2VydmljZSgpe1xyXG4gICAgICAgIHRoaXMuZG91YmxlVG9Mb25nQml0cyA9IChudW1iZXIsIHByZWNpc2lvbkJpdHMgPSAyMywgZXhwb25lbnRCaXRzID0gOCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgYmlhcyA9IE1hdGgucG93KDIsIGV4cG9uZW50Qml0cyAtIDEpIC0gMSwgbWluRXhwID0gLWJpYXMgKyAxLCBtYXhFeHAgPSBiaWFzLCBtaW5Vbm5vcm1FeHAgPSBtaW5FeHAgLSBwcmVjaXNpb25CaXRzLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzID0gaXNOYU4obiA9IHBhcnNlRmxvYXQobnVtYmVyKSkgfHwgIU51bWJlci5pc0Zpbml0ZShuKSA/IG4gOiAwLFxyXG4gICAgICAgICAgICAgICAgZXhwID0gMCwgbGVuID0gMiAqIGJpYXMgKyAxICsgcHJlY2lzaW9uQml0cyArIDMsIGJpbiA9IG5ldyBBcnJheShsZW4pLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsID0gKG4gPSBzdGF0dXMgIT09IDAgPyAwIDogbikgPCAwLCBuID0gTWF0aC5hYnMobiksIGludFBhcnQgPSBNYXRoLmZsb29yKG4pLCBmbG9hdFBhcnQgPSBuIC0gaW50UGFydCxcclxuICAgICAgICAgICAgICAgIGksIGxhc3RCaXQsIHJvdW5kZWQsIGosIHJlc3VsdDtcclxuICAgICAgICAgICAgZm9yKGkgPSBsZW47IGk7IGJpblstLWldID0gMCk7XHJcbiAgICAgICAgICAgIGZvcihpID0gYmlhcyArIDI7IGludFBhcnQgJiYgaTsgYmluWy0taV0gPSBpbnRQYXJ0ICUgMiwgaW50UGFydCA9IE1hdGguZmxvb3IoaW50UGFydCAvIDIpKTtcclxuICAgICAgICAgICAgZm9yKGkgPSBiaWFzICsgMTsgZmxvYXRQYXJ0ID4gMCAmJiBpOyAoYmluWysraV0gPSAoKGZsb2F0UGFydCAqPSAyKSA+PSAxKSAtIDApICYmIC0tZmxvYXRQYXJ0KTtcclxuICAgICAgICAgICAgZm9yKGkgPSAtMTsgKytpIDwgbGVuICYmICFiaW5baV07KTtcclxuICAgICAgICAgICAgaWYoYmluWyhsYXN0Qml0ID0gcHJlY2lzaW9uQml0cyAtIDEgKyAoaSA9IChleHAgPSBiaWFzICsgMSAtIGkpID49IG1pbkV4cCAmJiBleHAgPD0gbWF4RXhwID8gaSArIDEgOiBiaWFzICsgMSAtIChleHAgPSBtaW5FeHAgLSAxKSkpICsgMV0pe1xyXG4gICAgICAgICAgICAgICAgaWYoIShyb3VuZGVkID0gYmluW2xhc3RCaXRdKSlcclxuICAgICAgICAgICAgICAgICAgICBmb3IoaiA9IGxhc3RCaXQgKyAyOyAhcm91bmRlZCAmJiBqIDwgbGVuOyByb3VuZGVkID0gYmluW2orK10pO1xyXG4gICAgICAgICAgICAgICAgZm9yKGogPSBsYXN0Qml0ICsgMTsgcm91bmRlZCAmJiAtLWogPj0gMDsgKGJpbltqXSA9ICFiaW5bal0gLSAwKSAmJiAocm91bmRlZCA9IDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IoaSA9IGkgLSAyIDwgMCA/IC0xIDogaSAtIDM7ICsraSA8IGxlbiAmJiAhYmluW2ldOyk7XHJcblxyXG4gICAgICAgICAgICAoZXhwID0gYmlhcyArIDEgLSBpKSA+PSBtaW5FeHAgJiYgZXhwIDw9IG1heEV4cCA/ICsraSA6IGV4cCA8IG1pbkV4cCAmJlxyXG4gICAgICAgICAgICAgICAgKGV4cCAhPT0gYmlhcyArIDEgLSBsZW4gJiYgZXhwIDwgbWluVW5ub3JtRXhwICYmIHRoaXMud2FybihcImVuY29kZUZsb2F0OjpmbG9hdCB1bmRlcmZsb3dcIiksIGkgPSBiaWFzICsgMSAtIChleHAgPSBtaW5FeHAgLSAxKSk7XHJcbiAgICAgICAgICAgIChpbnRQYXJ0IHx8IHN0YXR1cyAhPT0gMCkgJiYgKHRoaXMud2FybihpbnRQYXJ0ID8gXCJlbmNvZGVGbG9hdDo6ZmxvYXQgb3ZlcmZsb3dcIiA6IFwiZW5jb2RlRmxvYXQ6OlwiICsgc3RhdHVzKSxcclxuICAgICAgICAgICAgICAgIGV4cCA9IG1heEV4cCArIDEsIGkgPSBiaWFzICsgMiwgc3RhdHVzID09PSAtSW5maW5pdHkgPyBzaWduYWwgPSAxIDogaXNOYU4oc3RhdHVzKSAmJiAoYmluW2ldID0gMSkpO1xyXG4gICAgICAgICAgICBmb3IobiA9IE1hdGguYWJzKGV4cCArIGJpYXMpLCBqID0gZXhwb25lbnRCaXRzICsgMSwgcmVzdWx0ID0gXCJcIjsgLS1qOyByZXN1bHQgPSAobiAlIDIpICsgcmVzdWx0LCBuID0gbiA+Pj0gMSk7XHJcbiAgICAgICAgICAgIGZvcihuID0gMCwgaiA9IDAsIGkgPSAocmVzdWx0ID0gKHNpZ25hbCA/IFwiMVwiIDogXCIwXCIpICsgcmVzdWx0ICsgYmluLnNsaWNlKGksIGkgKyBwcmVjaXNpb25CaXRzKS5qb2luKFwiXCIpKS5sZW5ndGgsIHIgPSBbXTtcclxuICAgICAgICAgICAgICAgIGk7IG4gKz0gKDEgPDwgaikgKiByZXN1bHQuY2hhckF0KC0taSksIGogPT09IDcgJiYgKHJbci5sZW5ndGhdID0gbiwgbiA9IDApLCBqID0gKGogKyAxKSAlIDgpO1xyXG4gICAgICAgICAgICByW3IubGVuZ3RoXSA9IG4gfHwgMDtcclxuICAgICAgICAgICAgci5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChyLm1hcCh2ID0+IHYudG9TdHJpbmcoMikucGFkU3RhcnQoOCwgJzAnKSkuam9pbignJyksIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9kb3VibGUtc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMDcuMDIuMjAxOC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLnNlcnZpY2UoJyRhcGVlJywgZXZlbnRFbWl0dGVyU2VydmljZSk7XHJcbiAgICBldmVudEVtaXR0ZXJTZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBldmVudEVtaXR0ZXJTZXJ2aWNlKCl7XHJcbiAgICAgICAgY29uc3Qgcm9vbXMgPSBbXTtcclxuXHJcbiAgICAgICAgY2xhc3MgQVBFdmVudEVtaXR0ZXIge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciAoaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSBpZCB8fCBnZW5lcmF0ZUlkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmVUaW1lcnMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb24odHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uY2UodHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25lVGltZXJzLnB1c2goe3R5cGUsIGNhbGxiYWNrfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2ZmKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISh0eXBlIGluIHRoaXMubGlzdGVuZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVuID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1t0eXBlXVtpXSAhPT0gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0uc3BsaWNlKDAsIGxlbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uZVRpbWVycyA9IHRoaXMub25lVGltZXJzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50eXBlICE9PSB0eXBlICYmIGl0ZW0uY2FsbGJhY2sgIT09IGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbWl0KHR5cGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFjayA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgc3RhY2suZm9yRWFjaCgoY2IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYi5jYWxsKHRoaXMsIGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25lVGltZXJzID0gdGhpcy5vbmVUaW1lcnMuZmlsdGVyKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlbW92ZUFsbExpc3RlbmVycygpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZHggPSByb29tcy5maW5kSW5kZXgoKGVlKSA9PiBlZS5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcm9vbXMucHVzaChuZXcgQVBFdmVudEVtaXR0ZXIoaWQpKTtcclxuICAgICAgICAgICAgICAgIGlkeCA9IHJvb21zLmxlbmd0aCAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcm9vbXNbaWR4XVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5kZXN0cm95SW5zdGFuY2UgPSAoaWQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWR4ID0gcm9vbXMuZmluZEluZGV4KChlZSkgPT4gZWUuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByb29tcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5lZSA9IG5ldyBBUEV2ZW50RW1pdHRlcignc3ZjJyk7XHJcblxyXG4gICAgICAgIHRoaXMuQVBFdmVudEVtaXR0ZXIgPSBBUEV2ZW50RW1pdHRlcjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVJZChsZW4gPSA4KSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpZCArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzNikudG9TdHJpbmcoMzYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvZXZlbnQtZW1pdHRlci1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiogQ3JlYXRlZCBieSB1c2VyIG9uIDA1LjEwLjIwMTYuXHJcbiovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuc2VydmljZSgncmVzaXplU2Vuc29yJywgcmVzaXplU2Vuc29yU2VydmljZSk7XHJcblxyXG4gICAgcmVzaXplU2Vuc29yU2VydmljZS4kaW5qZWN0ID0gWyckd2luZG93JywgJyR0aW1lb3V0J107XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzaXplU2Vuc29yU2VydmljZSgkd2luZG93LCAkdGltZW91dCkge1xyXG4gICAgICAgIC8vIE9ubHkgdXNlZCBmb3IgdGhlIGRpcnR5IGNoZWNraW5nLCBzbyB0aGUgZXZlbnQgY2FsbGJhY2sgY291bnQgaXMgbGltdGVkIHRvIG1heCAxIGNhbGwgcGVyIGZwcyBwZXIgc2Vuc29yLlxyXG4gICAgICAgIC8vIEluIGNvbWJpbmF0aW9uIHdpdGggdGhlIGV2ZW50IGJhc2VkIHJlc2l6ZSBzZW5zb3IgdGhpcyBzYXZlcyBjcHUgdGltZSwgYmVjYXVzZSB0aGUgc2Vuc29yIGlzIHRvbyBmYXN0IGFuZFxyXG4gICAgICAgIC8vIHdvdWxkIGdlbmVyYXRlIHRvbyBtYW55IHVubmVjZXNzYXJ5IGV2ZW50cy5cclxuICAgICAgICBjb25zdCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSAkd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICAkd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICAkd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkdGltZW91dChmbiwgMjApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjbGFzcyBFdmVudFF1ZXVlIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGxlbmd0aCAoKSB7cmV0dXJuIHRoaXMucS5sZW5ndGh9XHJcbiAgICAgICAgICAgIGFkZCAoZXYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucS5wdXNoKGV2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jYWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlbW92ZSAoZXYpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZCA9IHRoaXMucS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGV2KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucS5zcGxpY2UoMCwgdGhpcy5xLmxlbmd0aCwgLi4uZmlsdGVyZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZsdXNoICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucS5zcGxpY2UoMCwgdGhpcy5xLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIFJlc2l6ZVNlbnNvciB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlU3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IDAsICd0b3AnOiAwLCAncmlnaHQnOiAwLCAnYm90dG9tJzogMCxcclxuICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAnei1pbmRleCc6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICd2aXNpYmlsaXR5JzogJ2hpZGRlbidcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZFN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uJzogJ2FsbCAwcydcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZSA9IG5ldyBFdmVudFF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZENoaWxkID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PicpLmNzcyhjaGlsZFN0eWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hyaW5rQ2hpbGQgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+JykuY3NzKGFuZ3VsYXIuZXh0ZW5kKHt9LCBjaGlsZFN0eWxlLCB7d2lkdGg6ICcyMDAlJywgaGVpZ2h0OiAnMjAwJSd9KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZCA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj4nKS5hZGRDbGFzcyhcInJlc2l6ZS1zZW5zb3ItZXhwYW5kXCIpLmNzcyhiYXNlU3R5bGUpLmFwcGVuZCh0aGlzLmV4cGFuZENoaWxkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hyaW5rID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PicpLmFkZENsYXNzKFwicmVzaXplLXNlbnNvci1zaHJpbmtcIikuY3NzKGJhc2VTdHlsZSkuYXBwZW5kKHRoaXMuc2hyaW5rQ2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5zb3IgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+JykuYWRkQ2xhc3MoJ3Jlc2l6ZS1zZW5zb3InKS5jc3MoYmFzZVN0eWxlKS5hcHBlbmQodGhpcy5leHBhbmQpLmFwcGVuZCh0aGlzLnNocmluayk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYXNzaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmRDaGlsZFswXS5zdHlsZS53aWR0aCA9IDEwMDAwMCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmRDaGlsZFswXS5zdHlsZS5oZWlnaHQgPSAxMDAwMDAgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kWzBdLnNjcm9sbExlZnQgPSAxMDAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmRbMF0uc2Nyb2xsVG9wID0gMTAwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hyaW5rWzBdLnNjcm9sbExlZnQgPSAxMDAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaHJpbmtbMF0uc2Nyb2xsVG9wID0gMTAwMDAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkaXJ0eUNoZWNrICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5xdWV1ZSB8fCB0aGlzLnBhc3NpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVldWUuY2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vZWxzZSBpZiAoZnJhbWUgJSAyMDAgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhpcy5vblNjcm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZGlydHlDaGVjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb25TY3JvbGwgKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRXaWR0aCA9IHRoaXMuZWxlbWVudFswXS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkSGVpZ2h0ID0gdGhpcy5lbGVtZW50WzBdLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlZFdpZHRoICE9PSB0aGlzLmxhc3RXaWR0aCB8fCB0aGlzLmNhY2hlZEhlaWdodCAhPT0gdGhpcy5sYXN0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0V2lkdGggPSB0aGlzLmNhY2hlZFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEhlaWdodCA9IHRoaXMuY2FjaGVkSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTY3JvbGxFdmVudCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbdHlwZV1bMF0uYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3R5cGVdWzBdLmF0dGFjaEV2ZW50KCdvbnNjcm9sbCcsIHRoaXMub25TY3JvbGwuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdHlwZV1bMF0uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZW1vdmVTY3JvbGxFdmVudCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbdHlwZV1bMF0uZGV0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3R5cGVdWzBdLmRldGFjaEV2ZW50KCdvbnNjcm9sbCcsIHRoaXMub25TY3JvbGwuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdHlwZV1bMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXR0YWNoUmVzaXplRXZlbnQgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlLmFkZChjYik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy5zZW5zb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFswXSwgJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50WzBdLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmRpcnR5Q2hlY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNjcm9sbEV2ZW50KCdleHBhbmQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2Nyb2xsRXZlbnQoJ3NocmluaycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXRhY2hSZXNpemVFdmVudCAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5xdWV1ZSAmJiB0aGlzLnF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTY3JvbGxFdmVudCgnZXhwYW5kJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNjcm9sbEV2ZW50KCdzaHJpbmsnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Vuc29yLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcHJvcFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd8TnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgcHJvcCkge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jdXJyZW50U3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmN1cnJlbnRTdHlsZVtwcm9wXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgkd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnN0eWxlW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNpemVTZW5zb3IoZWxlbWVudCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9yZXNpemUtc2Vuc29yLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5zZXJ2aWNlKCdzbGFzaFBhcmFtU2VyaWFsaXplcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBzZXJpYWxpemVWYWx1ZSh2KSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KHYpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc0RhdGUodikgPyB2LnRvSVNPU3RyaW5nKCkgOiBhbmd1bGFyLnRvSnNvbih2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBsZFBhcmFtU2VyaWFsaXplcihwYXJhbXMpIHtcclxuICAgICAgICAgICAgaWYgKCFwYXJhbXMpIHJldHVybiAnJztcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gW107XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXNba2V5XSAmJiAhYW5ndWxhci5pc09iamVjdChwYXJhbXNba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0udG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXC5cXCpcXCFcXH5cXChcXCldL2csICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcJVxcd3syfS9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJy8nICsgcGFydHMuam9pbignLycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9zbGFzaC1wYXJhbS1zZXJpYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAxMi4wNC4yMDE2LlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5jb25zdGFudCgnJGFwc3RvcmVDb25maWcnLCB7XHJcbiAgICAgICAgc3RvcmFnZVR5cGU6ICdsb2NhbFN0b3JhZ2UnXHJcbiAgICB9KTtcclxuICAgIHZycC5wcm92aWRlcignJGFwc3RvcmUnLCBbJyRhcHN0b3JlQ29uZmlnJywgZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcclxuICAgICAgICAgICAgc3RvcmFnZVR5cGU6IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBjb25maWcuc3RvcmFnZVR5cGU7IH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7IGNvbmZpZy5zdG9yYWdlVHlwZSA9IHZhbHVlOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kZ2V0ID0gWyckYXBzdG9yZUNvbmZpZycsICckd2luZG93JywgJyRsb2cnLCBmdW5jdGlvbiAoY29uZmlnLCAkd2luZG93LCAkbG9nKSB7XHJcbiAgICAgICAgICAgIHZhciAkYXBzdG9yZSA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgYmtwc3RvcmUgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGxvY2FsU3RvcmFnZSBvciBzZXNzaW9uU3RvcmFnZSBpcyBhdmFpbGFibGUgb3IgZW5hYmxlZFxyXG4gICAgICAgICAgICB2YXIgaXNTdG9yYWdlQXZhaWxhYmxlID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gY29uZmlnLnN0b3JhZ2VUeXBlIGluICR3aW5kb3cgJiYgJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdICE9PSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5zZXRJdGVtKGtleSwgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIGlmICghaXNTdG9yYWdlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9nLndhcm4oY29uZmlnLnN0b3JhZ2VUeXBlICsgJyBpcyBub3QgYXZhaWxhYmxlLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRhcHN0b3JlLnNldFN0b3JhZ2VUeXBlID0gZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLnN0b3JhZ2VUeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUuZ2V0ID0gZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9ICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChyZXN1bHQpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RhdGUocmVzdWx0KSkgcmV0dXJuIG5ldyBEYXRlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShyZXN1bHQpIHx8IGFuZ3VsYXIuaXNPYmplY3QocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhbmd1bGFyLmZyb21Kc29uKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ID0gYmtwc3RvcmVba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KHZhbHVlKSB8fCBhbmd1bGFyLmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYW5ndWxhci50b0pzb24odmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBia3BzdG9yZVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRhcHN0b3JlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzU3RvcmFnZUF2YWlsYWJsZSA/ICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk6IGRlbGV0ZSBia3BzdG9yZVtrZXldO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkYXBzdG9yZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzU3RvcmFnZUF2YWlsYWJsZSA/ICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5jbGVhcigpOiBia3BzdG9yZSA9IHt9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkYXBzdG9yZS5rZXkgPSBmdW5jdGlvbihudW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc1N0b3JhZ2VBdmFpbGFibGUgPyAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0ua2V5KG51bSk6IGJrcHN0b3JlW09iamVjdC5rZXlzKGJrcHN0b3JlKVtudW1dXTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUuYWxsS2V5cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLmtleShpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gT2JqZWN0LmtleXMoYmtwc3RvcmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRhcHN0b3JlLmZpbmRLZXlzID0gZnVuY3Rpb24ocmVnZXhwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxsX2tleXMgPSAkbHN0b3JlLmFsbEtleXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxfa2V5cy5maWx0ZXIoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHJlZ2V4cC50ZXN0KHYpIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gJGFwc3RvcmU7XHJcbiAgICAgICAgfV07XHJcbiAgICB9XSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL3N0b3JhZ2UtcHJvdmlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWxnby9iaWdudW1iZXItZmlsdGVyLmpzXCI6IDc3Nyxcblx0XCIuL2FsZ28vZ2VuZXRpYy1mYWN0b3J5LmpzXCI6IDc3OCxcblx0XCIuL2FsZ28vcGVybXV0YXRpb24tc2VydmljZS5qc1wiOiA3NzksXG5cdFwiLi9hbGdvL3BvaW50LWZhY3RvcnkuanNcIjogNzgwLFxuXHRcIi4vYWxnby9zaW0tYW5uZWFsLXNlcnZpY2UuanNcIjogNzgxLFxuXHRcIi4vay1tZWFuL2stbWVhbi1kaXJlY3RpdmUuanNcIjogNzgyLFxuXHRcIi4vay1tZWFuL2stbWVhbi1zZXJ2aWNlLmpzXCI6IDc4NCxcblx0XCIuL3RzcC9yb3V0ZS1kcmF3LWRpcmVjdGl2ZS5qc1wiOiA3ODUsXG5cdFwiLi90c3Avcm91dGUtcGxvdHRlci1zZXJ2aWNlLmpzXCI6IDc4Nyxcblx0XCIuL3ZycC92cnAtZHJhdy1kaXJlY3RpdmUuanNcIjogNzg4LFxuXHRcIi4vdnJwL3ZycC1wbG90dGVyLXNlcnZpY2UuanNcIjogNzkwXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNzc2O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMgLitcXC5qcyRcbi8vIG1vZHVsZSBpZCA9IDc3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCl7XHJcbiAgICB2cnAuZmlsdGVyKCdiaWdudW1iZXInLCBiaWdudW1iZXJGaWx0ZXIpO1xyXG4gICAgdnJwLmZpbHRlcigncG93bnVtYmVyJywgcG93bnVtYmVyRmlsdGVyKTtcclxuICAgIGZ1bmN0aW9uIGJpZ251bWJlckZpbHRlcigpe1xyXG4gICAgICAgIHJldHVybiAodmFsKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXRoLmZvcm1hdCh2YWwsIHtsb3dlckV4cDogLTMwMCwgdXBwZXJFeHA6IDMwMH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcG93bnVtYmVyRmlsdGVyKCl7XHJcbiAgICAgICAgcmV0dXJuICh2YWwpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcGFydHMgPSBtYXRoLmZvcm1hdCh2YWwsIHtsb3dlckV4cDogLTIsIHVwcGVyRXhwOiAyLCBwcmVjaXNpb246IDN9KS5zcGxpdCgnZSsnKTtcclxuICAgICAgICAgICAgbGV0IHJlc3VsdCA9ICd+JyArIHBhcnRzWzBdO1xyXG4gICAgICAgICAgICBpZiAocGFydHNbMV0pe1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IGAgeCAxMF4ke3BhcnRzWzFdfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2FsZ28vYmlnbnVtYmVyLWZpbHRlci5qc1xuLy8gbW9kdWxlIGlkID0gNzc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5zZXJ2aWNlKCdHZW5ldGljRmFjdG9yeScsIGdlbmV0aWNGYWN0b3J5U2VydmljZSk7XHJcbiAgICBnZW5ldGljRmFjdG9yeVNlcnZpY2UuJGluamVjdCA9IFsnJHBlcm11dGF0aW9uJ107XHJcblxyXG4gICAgZnVuY3Rpb24gZ2VuZXRpY0ZhY3RvcnlTZXJ2aWNlKCRwZXJtdXRhdGlvbil7XHJcbiAgICAgICAgY2xhc3MgR2VuZSB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGNvZGUgPSBbXSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2RlID0gY29kZTtcclxuICAgICAgICAgICAgICAgIHRoaXMudnVsbmVyYWJpbGl0eSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBjb2RlICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2RlLnNsaWNlKClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0IGNvZGUgKGNvZGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvZGUuc3BsaWNlKDAsIHRoaXMuX2NvZGUubGVuZ3RoLCAuLi5jb2RlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IHNpemUgKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29kZS5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBnZW5vbSAoKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1heCA9IHRoaXMuX2NvZGUuc2xpY2UoKS5zb3J0KChhLCBiKSA9PiBiIC0gYSlbMF07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwYWQgPSAoYCR7bWF4fWApLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2RlLm1hcCgodikgPT4gKCcnICsgdikucGFkU3RhcnQocGFkLCAnMCcpKS5qb2luKClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaXNFcXVhbChnZW5vbSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5vbSA9PT0gZ2Vub207XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlcHJvZHVjZSAoZ2VuZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBbXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGxTZXQgPSAkcGVybXV0YXRpb24uZ2V0TnVtYmVyU2VxdWVuY2UodGhpcy5jb2RlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtdXR1YWxTZXQgPSB0aGlzLmNvZGUubWFwKCh2YWwsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWwgPT09IGdlbmUuY29kZVtpZHhdKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFNldC5zcGxpY2UoY2VsbFNldC5pbmRleE9mKHZhbCksIDEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGNlbGxTZXQubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tdXRhdGUoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tdXRhdGUoKVxyXG4gICAgICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRwZXJtdXRhdGlvbi5nZXRSYW5kb21MaW1pdGVkUGVybXV0YXRpb25zKGNlbGxTZXQsIE1BWF9DSElMRFJFTikuZm9yRWFjaCgobXV0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGQgPSBuZXcgR2VuZShtdXR1YWxTZXQubWFwKCh2YWwpID0+IHZhbCB8fCBtdXQuc2hpZnQoKSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGRyZW47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG11dGF0ZShkZXB0aCA9IE1hdGguZmxvb3IodGhpcy5zaXplIC8gMykpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWNlbGxzID0gW107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzYW1wbGUgPSB0aGlzLmNvZGU7XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobWNlbGxzLmluZGV4T2Yoc2FtcGxlW2lkeF0pID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1jZWxscy5wdXNoKHNhbXBsZVtpZHhdKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlW2lkeF0gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKG1jZWxscy5sZW5ndGggPCBkZXB0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEdlbmUoc2FtcGxlLm1hcCh2ID0+IHYgfHwgbWNlbGxzLnNoaWZ0KCkpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3MgR2VuZXJhdGlvbiB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKG51bSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm51bWJlciA9IG51bTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWVjZXMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgc3BpZWNlcyAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3BpZWNlcy5zbGljZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldCBzcGllY2VzIChhcnIpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NwaWVjZXMuc3BsaWNlKDAsIHRoaXMuX3NwaWVjZXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGlmIChhcnIgJiYgQXJyYXkuaXNBcnJheShhcnIpKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGllY2VzLnB1c2goLi4uYXJyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgc2l6ZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGllY2VzLmxlbmd0aFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBhdmdWdWxuZXJhYmlsaXR5ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGllY2VzLnJlZHVjZSgocmVzLCBnZW5lKSA9PiByZXMgKyAoZ2VuZS52dWxuZXJhYmlsaXR5IC8gdGhpcy5zaXplKSwgMClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbWluVnVsbmVyYWJpbGl0eSAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3BpZWNlcy5yZWR1Y2UoKHJlcywgZ2VuZSkgPT4gIXJlcyB8fCBnZW5lLnZ1bG5lcmFiaWxpdHkgPCByZXMgPyBnZW5lLnZ1bG5lcmFiaWxpdHkgOiByZXMsIG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IG1heFZ1bG5lcmFiaWxpdHkgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwaWVjZXMucmVkdWNlKChyZXMsIGdlbmUpID0+ICFyZXMgfHwgZ2VuZS52dWxuZXJhYmlsaXR5ID4gcmVzID8gZ2VuZS52dWxuZXJhYmlsaXR5IDogcmVzLCBudWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBtaW5WdWxuZXJhYmxlU2FtcGxlICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgdGhpcy5fc3BpZWNlcy5maW5kKChnZW5lKSA9PiBnZW5lLnZ1bG5lcmFiaWxpdHkgPT09IHRoaXMubWluVnVsbmVyYWJpbGl0eSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbWF4VnVsbmVyYWJsZVNhbXBsZSAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHRoaXMuX3NwaWVjZXMuZmluZCgoZ2VuZSkgPT4gZ2VuZS52dWxuZXJhYmlsaXR5ID09PSB0aGlzLm1heFZ1bG5lcmFiaWxpdHkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGNzdiAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3BpZWNlcy5tYXAoKGdlbmUpID0+IGAke3RoaXMubnVtYmVyfSwtLSwke2dlbmUuZ2Vub219LCR7Z2VuZS52dWxuZXJhYmlsaXR5fWApLmpvaW4oJ1xcbicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IHN1bW1hcnkgKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb3V0ID0gW1xyXG4gICAgICAgICAgICAgICAgICAgIGBHZW5lcmF0aW9uICR7dGhpcy5udW1iZXJ9YCxcclxuICAgICAgICAgICAgICAgICAgICBgUG9wdWxhdGlvbjogJHt0aGlzLnNpemV9YCxcclxuICAgICAgICAgICAgICAgICAgICBgVnVsbmVyYWJpbGl0eSAobWluL2F2Zy9tYXgpOiAke3RoaXMubWluVnVsbmVyYWJpbGl0eX0gLyAke3RoaXMuYXZnVnVsbmVyYWJpbGl0eX0gLyAke3RoaXMubWF4VnVsbmVyYWJpbGl0eX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGBNb3N0IHZpYWJsZSBzYW1wbGU6ICR7dGhpcy5taW5WdWxuZXJhYmxlU2FtcGxlLmdlbm9tfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgJy0tJ1xyXG4gICAgICAgICAgICAgICAgXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvdXQuam9pbignXFxuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIFBvcHVsYXRpb24ge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciAoY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpemUgPSBjb25maWcuc2l6ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucHJvYmUgPSBjb25maWcucHJvYmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cnZpdmUgPSBjb25maWcuc3Vydml2ZSB8fCAwLjI1O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5vbUxlbmd0aCA9IGNvbmZpZy5nZW5vbUxlbmd0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2FtcGxlID0gY29uZmlnLnNhbXBsZTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWluVnVsbmVyYWJsZUdlbmUgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgYWJzTWluVnVsbmVyYWJpbGl0eSAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzYW1wbGVUb3RhbCA9IHRoaXMuc2FtcGxlLnJlZHVjZSgocmVzLCB2YWwpID0+IHJlcyArIHZhbCwgMCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnZW5lVG90YWwgPSAodGhpcy5zYW1wbGUubGVuZ3RoICsgMSkgKiB0aGlzLnNhbXBsZS5sZW5ndGggLyAyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNhbXBsZVRvdGFsIC0gZ2VuZVRvdGFsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgbWluVnVsbmVyYWJpbGl0eSAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9iZSgkcGVybXV0YXRpb24uZ2V0T3B0aW1hbFBlcm11dGF0aW9uKHRoaXMuc2FtcGxlKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcG9wdWxhdGUgKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSAkcGVybXV0YXRpb24uZ2V0TnVtYmVyU2VxdWVuY2UodGhpcy5nZW5vbUxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnZW5lcmF0aW9uID0gbmV3IEdlbmVyYXRpb24oMCk7XHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0aW9uLnNwaWVjZXMgPSAkcGVybXV0YXRpb24uZ2V0UmFuZG9tTGltaXRlZFBlcm11dGF0aW9ucyhpdGVtcywgdGhpcy5zaXplKS5tYXAoKHNlcSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld0dlbmUgPSBuZXcgR2VuZShzZXEpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0dlbmUudnVsbmVyYWJpbGl0eSA9IHRoaXMucHJvYmUobmV3R2VuZS5jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3R2VuZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0aW9ucy5wdXNoKGdlbmVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlbGVjdCAoZ2VuSWR4ID0gdGhpcy5nZW5lcmF0aW9ucy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhOdW1iZXIgPSBNYXRoLmZsb29yKHRoaXMuZ2VuZXJhdGlvbnNbZ2VuSWR4XS5zaXplICogdGhpcy5zdXJ2aXZlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRpb25zW2dlbklkeF0uc3BpZWNlc1xyXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0KChnZW5BLCBnZW5CKSA9PiBnZW5BLnZ1bG5lcmFiaWxpdHkgLSBnZW5CLnZ1bG5lcmFiaWxpdHkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNsaWNlKDAsIG1heE51bWJlcilcclxuICAgICAgICAgICAgICAgICAgICAuc29ydCgoZ2VuQSwgZ2VuQikgPT4gZ2VuQS5nZW5vbSAtIGdlbkIuZ2Vub20pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYnJlZWQobWF4R2VuZXJhdGlvbnMgPSAxMDAwLCBzdG9wT25NaW5pbXVtID0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvbGRHZW5lcmF0aW9uID0gdGhpcy5zZWxlY3QoKTtcclxuICAgICAgICAgICAgICAgIGlmIChvbGRHZW5lcmF0aW9uLmxlbmd0aCA8IDIgfHwgbWF4R2VuZXJhdGlvbnMgPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVnVsbmVyYWJsZUdlbmUgPSB0aGlzLmZpbmRSZWxhdGl2ZU1pbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3R2VuZXJhdGlvbiA9IG5ldyBHZW5lcmF0aW9uKHRoaXMuZ2VuZXJhdGlvbnMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIG5ld0dlbmVyYXRpb24uc3BpZWNlcyA9IG9sZEdlbmVyYXRpb24ucmVkdWNlKChyZXMsIGdlbmUsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5leHRHZW5lID0gb2xkR2VuZXJhdGlvbltpZHggKyAxXTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRHZW5lKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4gPSBnZW5lLnJlcHJvZHVjZShuZXh0R2VuZSkubWFwKChjaGlsZCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hpbGQudnVsbmVyYWJpbGl0eSA9IHRoaXMucHJvYmUoY2hpbGQuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2hpbGQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMucHVzaCguLi5jaGlsZHJlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNcclxuICAgICAgICAgICAgICAgIH0sIFtdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGlvbnMucHVzaChuZXdHZW5lcmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChuZXdHZW5lcmF0aW9uLm1pblZ1bG5lcmFiaWxpdHkgPT09IHRoaXMubWluVnVsbmVyYWJpbGl0eSAmJiBzdG9wT25NaW5pbXVtKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZ1bG5lcmFibGVHZW5lID0gbmV3R2VuZXJhdGlvbi5taW5WdWxuZXJhYmxlU2FtcGxlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWluVnVsbmVyYWJsZUdlbmUgPyB0aGlzIDogdGhpcy5icmVlZChtYXhHZW5lcmF0aW9ucyAtIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmRSZWxhdGl2ZU1pbigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IG12cztcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGlvbnMuZm9yRWFjaCgoZ25yKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2FtcGxlID0gZ25yLm1pblZ1bG5lcmFibGVTYW1wbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFtdnMgfHwgbXZzLnZ1bG5lcmFiaWxpdHkgPiBzYW1wbGUudnVsbmVyYWJpbGl0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG12cyA9IHNhbXBsZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtdnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0R2VuZSA9IChjb2RlKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZShjb2RlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0R2VuZXJhdGlvbiA9IChzaXplKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZXJhdGlvbihzaXplKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0UG9wdWxhdGlvbiA9IChjb25maWcpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQb3B1bGF0aW9uKGNvbmZpZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvYWxnby9nZW5ldGljLWZhY3RvcnkuanNcbi8vIG1vZHVsZSBpZCA9IDc3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCl7XHJcbiAgICB2cnAuZmFjdG9yeSgnJHBlcm11dGF0aW9uJywgcGVybXV0YXRpb25GYWN0b3J5KTtcclxuICAgIHBlcm11dGF0aW9uRmFjdG9yeS4kaW5qZWN0ID0gWyckcSddO1xyXG5cclxuXHJcbiAgICBmdW5jdGlvbiBwZXJtdXRhdGlvbkZhY3RvcnkoJHEpe1xyXG4gICAgICAgIGNsYXNzIFBlcm11dGF0aW9uIHtcclxuICAgICAgICAgICAgc3RhdGljIGdldEFsbFBlcm11dGF0aW9ucyhpdGVtcyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcy5sZW5ndGggPT09IDEgPyBbaXRlbXNdOiBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcm11dGF0aW9ucyA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEdldCBhbGwgcGVybXV0YXRpb25zIG9mIGxlbmd0aCAobiAtIDEpLlxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJldkl0ZW1zID0gaXRlbXMuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgLy8gSW5zZXJ0IGxhc3Qgb3B0aW9uIGludG8gZXZlcnkgcG9zc2libGUgcG9zaXRpb24gb2YgZXZlcnkgcHJldmlvdXMgcGVybXV0YXRpb24uXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0SXRlbSA9IGl0ZW1zLnNsaWNlKC0xKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2UGVybXV0YXRpb25zID0gUGVybXV0YXRpb24uZ2V0QWxsUGVybXV0YXRpb25zKHByZXZJdGVtcyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByZXZQZXJtdXRhdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50UGVybXV0YXRpb24gPSBwcmV2UGVybXV0YXRpb25zW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEluc2VydCBsYXN0IG9wdGlvbiBpbnRvIGV2ZXJ5IHBvc3NpYmxlIHBvc2l0aW9uIG9mIGN1cnJlbnRQZXJtdXRhdGlvbi5cclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8PSBjdXJyZW50UGVybXV0YXRpb24ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybXV0YXRpb25QcmVmaXggPSBjdXJyZW50UGVybXV0YXRpb24uc2xpY2UoMCwgaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBlcm11dGF0aW9uU3VmZml4ID0gY3VycmVudFBlcm11dGF0aW9uLnNsaWNlKGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtdXRhdGlvbnMucHVzaChwZXJtdXRhdGlvblByZWZpeC5jb25jYXQobGFzdEl0ZW0sIHBlcm11dGF0aW9uU3VmZml4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcm11dGF0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldEFsbFBlcm11dGF0aW9uc0FzeW5jKGl0ZW1zKXtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRxLnJlc29sdmUoaXRlbXMubGVuZ3RoID09PSAxID8gW2l0ZW1zXTogW10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdEl0ZW0gPSBpdGVtcy5wb3AoKTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUGVybXV0YXRpb24uZ2V0QWxsUGVybXV0YXRpb25zQXN5bmMoaXRlbXMpLnRoZW4oKHByZXZQZXJtdXRhdGlvbnMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldlBlcm11dGF0aW9ucy5tYXAoKGN1cnJlbnRQZXJtdXRhdGlvbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudFBlcm11dGF0aW9uLnJlZHVjZSgociwgdiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5yLCBbLi4uY3VycmVudFBlcm11dGF0aW9uLnNsaWNlKDAsIGkgKyAxKSwgbGFzdEl0ZW0sIC4uLmN1cnJlbnRQZXJtdXRhdGlvbi5zbGljZShpICsgMSldXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgW1tsYXN0SXRlbSwgLi4uY3VycmVudFBlcm11dGF0aW9uXV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldExpbWl0ZWRQZXJtdXRhdGlvbnMoaXRlbXMsIGxpbWl0KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpbWl0QmFzZSA9IGZpbmROZWFyZXN0RmFjdG9yaWFsKGxpbWl0KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBUbyBnZXQgJHtsaW1pdH0gc2FtcGxlcyB3ZSBzZXQgYmFzZSBhdCAke2xpbWl0QmFzZX1gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1haW5TZXQgPSBQZXJtdXRhdGlvbi5nZXRBbGxQZXJtdXRhdGlvbnMoaXRlbXMuc2xpY2UoMCwgbGltaXRCYXNlKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RlcHMgPSBtYXRoLmNlaWwobGltaXQgLyBtYWluU2V0Lmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbWFpblNldC5yZWR1Y2UoKHJlcywgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzdGVwczsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGV4dFNldCA9IFBlcm11dGF0aW9uLmdldFJhbmRvbVBlcm11dGF0aW9uKGl0ZW1zLnNsaWNlKGxpbWl0QmFzZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMucHVzaChpdGVtLmNvbmNhdChleHRTZXQpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwgW10pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXRSYW5kb21MaW1pdGVkUGVybXV0YXRpb25zKGl0ZW1zLCBsaW1pdCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcy5sZW5ndGggPT09IDEgPyBbaXRlbXNdOiBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IG1heE51bSA9IG1hdGguZmFjdG9yaWFsKGl0ZW1zLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGltaXQgPj0gbWF4TnVtKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUGVybXV0YXRpb24uZ2V0QWxsUGVybXV0YXRpb25zKGl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHBlcm11dGF0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Blcm11dGF0aW9uID0gUGVybXV0YXRpb24uZ2V0UmFuZG9tUGVybXV0YXRpb24oaXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHBlcm11dGF0aW9ucy5maW5kSW5kZXgoKHBlcm0pID0+IHBlcm0uam9pbigpID09PSBuZXdQZXJtdXRhdGlvbi5qb2luKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybXV0YXRpb25zLnB1c2gobmV3UGVybXV0YXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKHBlcm11dGF0aW9ucy5sZW5ndGggPCBsaW1pdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVybXV0YXRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0UmFuZG9tUGVybXV0YXRpb24oaXRlbXMpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNyYyA9IGl0ZW1zLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzcmMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3JjLnNwbGljZShpZHgsIDEpWzBdO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXROb25VbmlxdWVOdW1iZXJTZXF1ZW5jZShsZW4sIG1pblRvdGFsID0gKGxlbiArIDEpICogbGVuIC8gMikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4VG90YWwgPSBsZW4gKiBsZW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXRUb3RhbCA9IG1pblRvdGFsICsgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heFRvdGFsIC0gbWluVG90YWwpKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdW0gPSBsZW47XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBBcnJheS5hcHBseShudWxsLCBBcnJheShsZW4pKS5maWxsKDEpO1xyXG4gICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGxlbik7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdFtpZHhdIDwgbGVuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpZHhdKys7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSsrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKHN1bSA8IHRhcmdldFRvdGFsKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXROdW1iZXJTZXF1ZW5jZShsZW4sIHN0YXJ0ID0gMSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkobGVuKSkubWFwKCh2LCBpKSA9PiBpICsgc3RhcnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0T3B0aW1hbFBlcm11dGF0aW9uKGl0ZW1zKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcy5tYXAoKHYsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3ZhbDogdiwgaWR4OiBpfVxyXG4gICAgICAgICAgICAgICAgfSkuc29ydCgoYSwgYikgPT4gYS52YWwgLSBiLnZhbCkubWFwKCh2LCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdi5jZWxsID0gaSArIDE7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgICAgICAgICB9KS5zb3J0KChhLCBiKSA9PiBhLmlkeCAtIGIuaWR4KS5tYXAoKHYpID0+IHYuY2VsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LlBlcm11dGF0aW9uID0gUGVybXV0YXRpb247XHJcbiAgICAgICAgcmV0dXJuIFBlcm11dGF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmROZWFyZXN0RmFjdG9yaWFsKHRhcmdldCwgYmFzZSA9IDEpe1xyXG4gICAgICAgIHJldHVybiBtYXRoLmZhY3RvcmlhbChiYXNlICsgMSkgPiB0YXJnZXQgPyBiYXNlIDogZmluZE5lYXJlc3RGYWN0b3JpYWwodGFyZ2V0LCBiYXNlICsgMSlcclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2FsZ28vcGVybXV0YXRpb24tc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLnNlcnZpY2UoJ3BvaW50RmFjdG9yeScsIHBvaW50RmFjdG9yeSk7XHJcbiAgICBwb2ludEZhY3RvcnkuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvaW50RmFjdG9yeSgpe1xyXG4gICAgICAgIGNsYXNzIFJQb2ludCB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW92ZShkeCwgZHkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IGR4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IGR5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW92ZVRvKHgsIHkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXREaXN0YW5jZShycG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSBNYXRoLmFicyhycG9pbnQueCAtIHRoaXMueCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkeSA9IE1hdGguYWJzKHJwb2ludC55IC0gdGhpcy55KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoKGR4ICogZHgpICsgKGR5ICogZHkpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldE1pZFBvaW50KHJwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBteCA9IHRoaXMueCArIChycG9pbnQueCAtIHRoaXMueCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXkgPSB0aGlzLnkgKyAocnBvaW50LnkgLSB0aGlzLnkpIC8gMjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihteCwgbXkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29weSwgdGhpcy5fZ2V0UHJvcHNDb3B5KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldFNjYWxlZChzZil7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3B5ID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy54ICogc2YsIHRoaXMueSAqIHNmKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvcHksIHRoaXMuX2dldFByb3BzQ29weSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbG9uZSgpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29weSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvcHksIHRoaXMuX2dldFByb3BzQ29weSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlcXVhbHMocnBvaW50KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yID09PSBycG9pbnQuY29uc3RydWN0b3JcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnggPT09IHJwb2ludC54XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy55ID09PSBycG9pbnQueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b1N0cmluZygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMueC50b0ZpeGVkKDIpICsgJ3gnICsgdGhpcy55LnRvRml4ZWQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfZ2V0UHJvcHNDb3B5KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcykucmVkdWNlKChyZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICd4JyAmJiBrZXkgIT09ICd5Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc1trZXldID0gdGhpc1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIFJvdXRlUG9pbnQgZXh0ZW5kcyBSUG9pbnQge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICAgICAgICAgIHN1cGVyKHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3NTdHlsZSA9IG5ldyBTZXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzc1N0eWxlLmFkZCgndnJwLXBvaW50Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldENzcyhjc3Mpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3NTdHlsZS5hZGQoY3NzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXROYW1lKG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGFzcyBSVmVjdG9yIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3Ioc3RhcnQsIGVuZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZCA9IGVuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgWCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5kLnggLSB0aGlzLnN0YXJ0Lng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IFkoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuZC55IC0gdGhpcy5zdGFydC55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBsZW5ndGgoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5YLCAyKSArIE1hdGgucG93KHRoaXMuWSwgMikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfYWRkKHJ2ZWN0b3Ipe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmQubW92ZShydmVjdG9yLlgsIHJ2ZWN0b3IuWSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfbW92ZShkeCwgZHkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydC5tb3ZlKGR4LCBkeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZC5tb3ZlKGR4LCBkeSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmFuc2xhdGUoZHgsIGR5KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuX21vdmUoZHgsIGR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdW0ocnZlY3Rvcil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLl9hZGQocnZlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVhbihydmVjdG9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGR4ID0gcnZlY3Rvci5zdGFydC54IC0gdGhpcy5zdGFydC54O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHkgPSBydmVjdG9yLnN0YXJ0LnkgLSB0aGlzLnN0YXJ0Lnk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtdiA9IHJ2ZWN0b3IudHJhbnNsYXRlKGR4LCBkeSk7XHJcbiAgICAgICAgICAgICAgICBtdi5lbmQueCA9IChtdi5lbmQueCArIHRoaXMuZW5kLngpIC8gMjtcclxuICAgICAgICAgICAgICAgIG12LmVuZC55ID0gKG12LmVuZC55ICsgdGhpcy5lbmQueSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG12O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsb25lKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJWZWN0b3IodGhpcy5zdGFydC5jbG9uZSgpLCB0aGlzLmVuZC5jbG9uZSgpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlJQb2ludCA9IFJQb2ludDtcclxuICAgICAgICB0aGlzLlJWZWN0b3IgPSBSVmVjdG9yO1xyXG4gICAgICAgIHRoaXMuUm91dGVQb2ludCA9IFJvdXRlUG9pbnQ7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UG9pbnQgPSAoeCwgeSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJQb2ludCh4LCB5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0Um91dGVQb2ludCA9ICh4LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUm91dGVQb2ludCh4LCB5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZG9tUG9pbnRzID0gKGFtb3VudCwgbWF4WCwgbWF4WSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEFycmF5KGFtb3VudCkuZmlsbCgwKS5tYXAoKCkgPT4gbmV3IFJQb2ludCh0aGlzLmdldFJhbmRvbUNvb3JkKG1heFgpLCB0aGlzLmdldFJhbmRvbUNvb3JkKG1heFkpKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldFJhbmRvbVBvaW50ID0gKG1heFgsIG1heFkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSUG9pbnQodGhpcy5nZXRSYW5kb21Db29yZChtYXhYKSwgdGhpcy5nZXRSYW5kb21Db29yZChtYXhZKSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZG9tQ29vcmQgPSAobWF4KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL3BvaW50LWZhY3RvcnkuanNcbi8vIG1vZHVsZSBpZCA9IDc4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCl7XHJcbiAgICB2cnAuc2VydmljZSgnJHNpbUFubmVhbCcsIHNpbUFubmVhbFNlcnZpY2UpO1xyXG4gICAgc2ltQW5uZWFsU2VydmljZS4kaW5qZWN0ID0gWyckcScsICckcGVybXV0YXRpb24nLCAnJGFwZWUnLCAnJGRvdWJsZScsICdwb2ludEZhY3RvcnknXTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaW1Bbm5lYWxTZXJ2aWNlKCRxLCAkcGVybXV0YXRpb24sICRhcGVlLCAkZG91YmxlLCBwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNvbnN0IEJGTElNSVQgPSA1ZTU7XHJcbiAgICAgICAgY2xhc3MgU2ltQW5uZWFsU29sdXRpb24ge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcihwb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29zdCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQb2ludHMocG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGxlbmd0aCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0UG9pbnRzKHBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5zcGxpY2UoMCwgdGhpcy5wb2ludHMubGVuZ3RoLCAuLi5wb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3N0ID0gdGhpcy5nZXRDb3N0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0Q29zdCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNpbUFubmVhbFNvbHV0aW9uLmNhbGN1bGF0ZUNvc3QodGhpcy5wb2ludHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBleHBvcnQoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50cy5tYXAoKHBvaW50KSA9PiBbcG9pbnQueCwgcG9pbnQueV0uam9pbigpKS5qb2luKCdcXG4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXF1YWxzKHNvbHV0aW9uKXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzID09PSBzb2x1dGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIShzb2x1dGlvbiBpbnN0YW5jZW9mIFNpbUFubmVhbFNvbHV0aW9uKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHNvbHV0aW9uLnBvaW50cy5maW5kSW5kZXgoKHBvaW50KSA9PiBwb2ludC5lcXVhbHModGhpcy5wb2ludHNbMF0pKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZGV4ID4gLTFcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmNvc3QgPT09IHNvbHV0aW9uLmNvc3RcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmxlbmd0aCA9PT0gc29sdXRpb24ubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5wb2ludHMuZXZlcnkoKHAsIGksIGEpID0+IHAuZXF1YWxzKHNvbHV0aW9uLnBvaW50c1soaSArIHN0YXJ0SW5kZXgpICUgYS5sZW5ndGhdKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBjYWxjdWxhdGVDb3N0KHBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzLnJlZHVjZSgocmVzLCBwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMucHJldil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5jb3N0ICs9IHJlcy5wcmV2LmdldERpc3RhbmNlKHBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnByZXYgPSBwb2ludDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwge2Nvc3Q6IDAsIHByZXY6IG51bGx9KS5jb3N0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2xhc3MgU2ltQW5uZWFsIGV4dGVuZHMgJGFwZWUuQVBFdmVudEVtaXR0ZXIge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciAoYmFzZSwgbWF4VGVtcGVyYXR1cmUsIG1pblRlbXBlcmF0dXJlLCBpc0Nsb3NlZCl7XHJcbiAgICAgICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2UubGVuZ3RoIDwgMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaW1Bbm5lYWwgYWNjZXB0cyBvbmx5IHNlcXVlbmNlcyB3aXRoIGxlbmd0aCAzKycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IGJhc2VbYmFzZS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0Nsb3NlZCAmJiBsYXN0ICYmIGJhc2VbMF0gJiYgIWxhc3QuZXF1YWxzKGJhc2VbMF0pKXtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlLnB1c2goYmFzZVswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYXNlID0gYmFzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gJHBlcm11dGF0aW9uLmdldFJhbmRvbVBlcm11dGF0aW9uKCRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZShiYXNlLmxlbmd0aCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RlcCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCA9IG1heFRlbXBlcmF0dXJlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcGVyYXR1cmUgPSBtYXhUZW1wZXJhdHVyZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gbWluVGVtcGVyYXR1cmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb2x1dGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V4YWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iYXNlLmxlbmd0aCA8IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJydXRlRm9yY2UoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXhhY3QgPSBuZXcgU2ltQW5uZWFsU29sdXRpb24ocmVzdWx0LnN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzaCA9IHRoaXMuaGFzaENvZGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGN1cnJlbnRDb3N0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlQ29zdCh0aGlzLl9zdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5zcGxpY2UoMCwgdGhpcy5fc3RhdGUubGVuZ3RoLCAuLi5zdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IHBvaW50cygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgaXNEb25lKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX3RlbXBlcmF0dXJlIDw9IHRoaXMuX2xpbWl0IHx8ICh0aGlzLl9leGFjdCAmJiB0aGlzLl9leGFjdC5jb3N0ID09PSB0aGlzLmN1cnJlbnRDb3N0KSkgJiYgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0IGlzRG9uZShib29sKXtcclxuICAgICAgICAgICAgICAgIGlmICghIWJvb2wpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGlzUnVubmluZygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXAgPiAxICYmIHRoaXMuX3RlbXBlcmF0dXJlID4gdGhpcy5fbGltaXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGluZm8oKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgUm91dGUgbGVuZ3RoOiAke3RoaXMuY3VycmVudENvc3R9IFN0ZXA6ICR7dGhpcy5fc3RlcH0gVGVtcGVyYXR1cmU6ICR7dGhpcy5fdGVtcGVyYXR1cmV9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBzb2x1dGlvbnMoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb2x1dGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhhc2hDb2RlKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFzZS5yZWR1Y2UoKHJlcywgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gJGRvdWJsZS5kb3VibGVUb0xvbmdCaXRzKGl0ZW0ueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IE1hdGguaW11bCgzMSwgcmVzKSArIGl0ZW0ueSB8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gTWF0aC5pbXVsKDMxLCByZXMpICsgaXRlbS54IHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gTWF0aC5pbXVsKDMxLCByZXMpICsgaXRlbS55IHwgMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH0sIDApXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldFN0YXRlKHN0YXRlID0gdGhpcy5fc3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLm1hcCgodikgPT4gdGhpcy5fYmFzZVt2XSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FsY3VsYXRlQ29zdChzdGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2ludHMgPSB0aGlzLmdldFN0YXRlKHN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTaW1Bbm5lYWxTb2x1dGlvbi5jYWxjdWxhdGVDb3N0KHBvaW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZVByb2JhYmlsaXR5KGRlbHRhQ29zdCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5leHAoLTEgKiBkZWx0YUNvc3QgLyB0aGlzLl90ZW1wZXJhdHVyZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGVjcmVhc2VUZW1wZXJhdHVyZSgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcGVyYXR1cmUgPSAodGhpcy5fc3RhcnQgKiAwLjMpIC8gdGhpcy5fc3RlcDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0ZXArKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0Q2FuZGlkYXRlKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX3N0YXRlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX3N0YXRlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYSA+IGIpe1xyXG4gICAgICAgICAgICAgICAgICAgIFthLCBiXSA9IFtiLCBhXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IHRoaXMuX3N0YXRlLnNsaWNlKGEsIGIpLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbLi4udGhpcy5fc3RhdGUuc2xpY2UoMCwgYSksIC4uLnNlZ21lbnQsIC4uLnRoaXMuX3N0YXRlLnNsaWNlKGIpXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicnV0ZUZvcmNlKGxpbWl0ID0gQkZMSU1JVCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9ICRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZSh0aGlzLl9iYXNlLmxlbmd0aCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gJHBlcm11dGF0aW9uLmdldExpbWl0ZWRQZXJtdXRhdGlvbnMoaXRlbXMsIGxpbWl0KS5yZWR1Y2UoKHJlcywgc3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29zdCA9IHRoaXMuY2FsY3VsYXRlQ29zdChzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29zdCA8IDAgfHwgY29zdCA8IHJlcy5jb3N0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5jb3N0ID0gY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge3N0YXRlOiBudWxsLCBjb3N0OiAtMX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJlbmNobWFyayhsaW1pdCA9IEJGTElNSVQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBtb21lbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJydXRlRm9yY2UobGltaXQpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IG1vbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGVuZC5kaWZmKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiZW5jaCA9IG1hdGguZGl2aWRlKGR1cmF0aW9uLCBsaW1pdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSBtYXRoLmZhY3RvcmlhbCh0aGlzLl9iYXNlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXN0aW1hdGUgPSBtb21lbnQuZHVyYXRpb24odG90YWwgKiBiZW5jaCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtiZW5jaCwgZHVyYXRpb24sIGVzdGltYXRlLCBsaW1pdCwgdG90YWx9LCByZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuZXh0KCl7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0RvbmUgfHwgdGhpcy5fc3RlcCA+IDEwMDAwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHRoaXMuZ2V0Q2FuZGlkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5kaWRhdGVDb3N0ID0gdGhpcy5jYWxjdWxhdGVDb3N0KGNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Q29zdCA9IHRoaXMuY3VycmVudENvc3Q7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YUNvc3QgPSBjYW5kaWRhdGVDb3N0IC0gY3VycmVudENvc3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFDb3N0IDwgMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBjYW5kaWRhdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JhYmlsaXR5ID0gdGhpcy5jYWxjdWxhdGVQcm9iYWJpbGl0eShkZWx0YUNvc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyaWdnZXIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmlnZ2VyIDw9IHByb2JhYmlsaXR5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBjYW5kaWRhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZWFzZVRlbXBlcmF0dXJlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzdWx0cy5wdXNoKGN1cnJlbnRDb3N0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Q29zdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RvcCgpe1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0ZXAgPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcGVyYXR1cmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkU29sdXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzZXQoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0ZXAgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcGVyYXR1cmUgPSB0aGlzLl9zdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gJHBlcm11dGF0aW9uLmdldFJhbmRvbVBlcm11dGF0aW9uKCRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZSh0aGlzLl9iYXNlLmxlbmd0aCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFNvbHV0aW9uKHBvaW50cyA9IHRoaXMucG9pbnRzKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHV0aW9uID0gbmV3IFNpbUFubmVhbFNvbHV0aW9uKHBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2U29sdXRpb24gPSB0aGlzLmdldExhc3RTb2x1dGlvbigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2U29sdXRpb24gfHwgIXByZXZTb2x1dGlvbi5lcXVhbHMoc29sdXRpb24pKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb2x1dGlvbnMucHVzaChzb2x1dGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0TGFzdFNvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc29sdXRpb25zW3RoaXMuX3NvbHV0aW9ucy5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRCZXN0U29sdXRpb24oKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb2x1dGlvbnMucmVkdWNlKChhLCBiKSA9PiBhLmNvc3QgPCBiLmNvc3QgPyBhIDogYilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0U29sdXRpb24oaWR4KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb2x1dGlvbnNbaWR4XVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgY2FsY3VsYXRlU2VnbWVudENvc3QocG9pbnRBLCBwb2ludEIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5zcXJ0KE1hdGgucG93KChwb2ludEEueCAtIHBvaW50Qi54KSwgMikgKyBNYXRoLnBvdygocG9pbnRBLnkgLSBwb2ludEIueSksIDIpKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFByZXNldEluc3RhbmNlID0gKGJhc2UsIG1heFQsIG1pblQsIGlzQ2xvc2VkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFNpbUFubmVhbChiYXNlLCBtYXhULCBtaW5ULCBpc0Nsb3NlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZS5hZGRTb2x1dGlvbihpbnN0YW5jZS5fYmFzZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGFtb3VudCwgcmFuZ2UsIG1heFQsIG1pblQsIGlzQ2xvc2VkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2UgPSBwb2ludEZhY3RvcnkuZ2V0UmFuZG9tUG9pbnRzKGFtb3VudCwgcmFuZ2UsIHJhbmdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTaW1Bbm5lYWwoYmFzZSwgbWF4VCwgbWluVCwgaXNDbG9zZWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5TaW1Bbm5lYWwgPSBTaW1Bbm5lYWw7XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL3NpbS1hbm5lYWwtc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLmRpcmVjdGl2ZSgna01lYW4nLCBrTWVhbkRpcmVjdGl2ZSk7XHJcbiAgICBrTWVhbkRpcmVjdGl2ZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24ga01lYW5EaXJlY3RpdmUoKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2stbWVhbi10cGwuaHRtbCcpLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnS01lYW5Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY3RybCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdnJwLmNvbnRyb2xsZXIoJ0tNZWFuQ29udHJvbGxlcicsIEtNZWFuQ29udHJvbGxlcik7XHJcbiAgICBLTWVhbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGttZWFuJywgJyRjb2xvcmRlZiddO1xyXG5cclxuICAgIGZ1bmN0aW9uIEtNZWFuQ29udHJvbGxlcigka21lYW4sICRjb2xvcmRlZil7XHJcbiAgICAgICAgdGhpcy5wb2ludENvdW50ID0gMTAwO1xyXG4gICAgICAgIHRoaXMuY2x1c3RlckNvdW50ID0gMztcclxuICAgICAgICB0aGlzLm1hcFdpZHRoID0gNjQwO1xyXG4gICAgICAgIHRoaXMubWFwSGVpZ2h0ID0gNDgwO1xyXG4gICAgICAgIHRoaXMua21lYW4gPSAka21lYW4uZ2V0SW5zdGFuY2UodGhpcy5wb2ludENvdW50LCB0aGlzLmNsdXN0ZXJDb3VudCwgdGhpcy5tYXBXaWR0aCwgdGhpcy5tYXBIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuY29sb3JzID0gWycjRjQ0MzM2JywgJyMyMTk2RjMnLCAnI0ZGOTgwMCcsICcjOEJDMzRBJywgJyM5QzI3QjAnLCAnIzAwOTY4OCcsICcjRkZDMTA3JywgJyM0Q0FGNTAnLCAnI0U5MUU2MycsICcjMDBCQ0Q0J107XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXRDbHVzdGVycyA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rbWVhbiAmJiB0aGlzLmttZWFuLnJlc2V0QWxsQ2x1c3RlcnMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJ1bkNsdXN0ZXJpbmdTdGVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmttZWFuICYmIHRoaXMua21lYW4uY2x1c3RlcmluZ1N0ZXAoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVidWlsZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rbWVhbiA9ICRrbWVhbi5nZXRJbnN0YW5jZSh0aGlzLnBvaW50Q291bnQsIHRoaXMuY2x1c3RlckNvdW50LCB0aGlzLm1hcFdpZHRoLCB0aGlzLm1hcEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvay1tZWFuL2stbWVhbi1kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDc4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgbmctc3R5bGU9XFxcInsnbWF4LXdpZHRoJzogKGN0cmwubWFwV2lkdGggKyAxNjApICsgJ3B4J31cXFwiIGZsZXg+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tY29udHJvbHNcXFwiIGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gc3RhcnRcXFwiPlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8c3Bhbj5XaWR0aDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjUwMFxcXCIgbWF4PVxcXCIxMjAwXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXBXaWR0aFxcXCIgYXJpYS1sYWJlbD1cXFwibWFwIHdpZHRoXFxcIiBjbGFzcz1cXFwibWQtd2FyblxcXCI+PC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXBXaWR0aFxcXCIgYXJpYS1sYWJlbD1cXFwibWFwIHdpZHRoXFxcIiBhcmlhLWNvbnRyb2xzPVxcXCJtYXAtc2l6ZS1zbGlkZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L21kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPG1kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuPkhlaWdodDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjUwMFxcXCIgbWF4PVxcXCIxMjAwXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXBIZWlnaHRcXFwiIGFyaWEtbGFiZWw9XFxcIm1hcCBoZWlnaHRcXFwiIGNsYXNzPVxcXCJtZC13YXJuXFxcIj48L21kLXNsaWRlcj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLm1hcEhlaWdodFxcXCIgYXJpYS1sYWJlbD1cXFwibWFwIGhlaWdodFxcXCIgYXJpYS1jb250cm9scz1cXFwibWFwLXNpemUtc2xpZGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPC9tZC1zbGlkZXItY29udGFpbmVyPlxcclxcblxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgPG1kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuPlBvaW50czwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjRcXFwiIG1heD1cXFwiMzAwXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5wb2ludENvdW50XFxcIiBhcmlhLWxhYmVsPVxcXCJwb2ludHNcXFwiIGNsYXNzPVxcXCJtZC13YXJuXFxcIj48L21kLXNsaWRlcj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLnBvaW50Q291bnRcXFwiIGFyaWEtbGFiZWw9XFxcInBvaW50cyBudW1iZXJcXFwiIGFyaWEtY29udHJvbHM9XFxcInBvaW50cy1udW1iZXItc2xpZGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPC9tZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8c3Bhbj5DbHVzdGVyczwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjJcXFwiIG1heD1cXFwiMTBcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLmNsdXN0ZXJDb3VudFxcXCIgYXJpYS1sYWJlbD1cXFwicG9pbnRzXFxcIiBjbGFzcz1cXFwibWQtd2FyblxcXCI+PC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5jbHVzdGVyQ291bnRcXFwiIGFyaWEtbGFiZWw9XFxcImNsdXN0ZXIgY291bnRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L21kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJjZW50ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gbmctY2xpY2s9XFxcImN0cmwucmVidWlsZCgpXFxcIiBhcmlhLWxhYmVsPVxcXCJyZWJ1aWxkXFxcIj5OZXc8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cXFwiY3RybC5yZXNldENsdXN0ZXJzKClcXFwiIGFyaWEtbGFiZWw9XFxcInJlc2V0IGNsdXN0ZXJzXFxcIj5SZXNldDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5ydW5DbHVzdGVyaW5nU3RlcCgpXFxcIiBhcmlhLWxhYmVsPVxcXCJydW4gY2x1c3RlcmluZyBzdGVwXFxcIj5OZXh0PC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tZHJhdy1zY3JvbGxlclxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrLW1lYW4tY29udGFpbmVyXFxcIiBuZy1zdHlsZT1cXFwieydoZWlnaHQnOiBjdHJsLm1hcEhlaWdodCArICdweCcsICd3aWR0aCc6IGN0cmwubWFwV2lkdGggKyAncHgnfVxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLWxheWVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLXBvaW50LXdyYXBwZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XFxcInBvaW50IGluIGN0cmwua21lYW4ucG9pbnRzXFxcIiBjbGFzcz1cXFwiay1tZWFuLXBvaW50XFxcIiBuZy1zdHlsZT1cXFwieyd0b3AnOiBwb2ludC55ICsgJ3B4JywgJ2xlZnQnOiBwb2ludC54ICsgJ3B4J31cXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrLW1lYW4tbGF5ZXJcXFwiIG5nLXJlcGVhdD1cXFwiY2x1c3RlciBpbiBjdHJsLmttZWFuLmNsdXN0ZXJzXFxcIiBuZy1zdHlsZT1cXFwieyd6LWluZGV4JzogKGNsdXN0ZXIuaW5kZXggKyAxKSAqIDEwfVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImstbWVhbi1wb2ludC13cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImstbWVhbi1wb2ludFxcXCIgbmctcmVwZWF0PVxcXCJwb2ludCBpbiBjbHVzdGVyLnBvaW50c1xcXCIgbmctc3R5bGU9XFxcInsndG9wJzogcG9pbnQueSArICdweCcsICdsZWZ0JzogcG9pbnQueCArICdweCcsICdib3JkZXItY29sb3InOiBjdHJsLmNvbG9yc1tjbHVzdGVyLmluZGV4XX1cXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLXBvaW50IGstbWVhbi1jZW50cm9pZFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgbmctc3R5bGU9XFxcInsndG9wJzogY2x1c3Rlci5jZW50cm9pZC55ICsgJ3B4JyxcXHJcXG4gICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IGNsdXN0ZXIuY2VudHJvaWQueCArICdweCcsXFxyXFxuICAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1jb2xvcic6IGN0cmwuY29sb3JzW2NsdXN0ZXIuaW5kZXhdLFxcclxcbiAgICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogY3RybC5jb2xvcnNbY2x1c3Rlci5pbmRleF19XFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDc4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5zZXJ2aWNlKCcka21lYW4nLCBrTWVhblNlcnZpY2UpO1xyXG4gICAga01lYW5TZXJ2aWNlLiRpbmplY3QgPSBbJ3BvaW50RmFjdG9yeSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGtNZWFuU2VydmljZShwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNsYXNzIENsdXN0ZXIge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihpbmRleCwgY2VudHJvaWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZW50cm9pZCA9IGNlbnRyb2lkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IHNpemUoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZUNlbnRyb2lkKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbYXZnWCwgYXZnWV0gPSB0aGlzLnBvaW50cy5yZWR1Y2UoKHJlcywgcnApID0+IFtyZXNbMF0gKyBycC54LCByZXNbMV0gKyBycC55XSwgWzAsIDBdKS5tYXAoKGNvb3JkKSA9PiBjb29yZCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbnRyb2lkID0gbmV3IHBvaW50RmFjdG9yeS5SUG9pbnQoYXZnWCwgYXZnWSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkUG9pbnQocnBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMucG9pbnRzLmZpbmRJbmRleCgocCkgPT4gcC5lcXVhbHMocnBvaW50KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludHMucHVzaChycG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlbW92ZVBvaW50KHJwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnBvaW50cy5maW5kSW5kZXgoKHApID0+IHAuZXF1YWxzKHJwb2ludCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNldCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLnNwbGljZSgwLCB0aGlzLnBvaW50cy5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlcXVhbHMoY2x1c3Rlcil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaXplID09PSBjbHVzdGVyLnNpemUgJiYgdGhpcy5wb2ludHMucmVkdWNlKChyZXMsIHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY2x1c3Rlci5wb2ludHMuZmluZEluZGV4KChjcHQpID0+IGNwdC5lcXVhbHMocG9pbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWR4ID4gLTEgPyByZXMgKyAxIDogcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwgMCkgPT09IHRoaXMuc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjbGFzcyBLTWVhbkNsdXN0ZXJze1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciAobnBvaW50cywgbmNsdXN0ZXJzLCB3aWR0aCwgaGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIGlmIChuY2x1c3RlcnMgPj0gbnBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZXJlIHNob3VsZCBiZSBsYXNzIGNsdXN0ZXJzIHRoYW4gcG9pbnRzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCB3aWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzID0gcG9pbnRGYWN0b3J5LmdldFJhbmRvbVBvaW50cyhucG9pbnRzLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3RlcnMgPSBuZXcgQXJyYXkobmNsdXN0ZXJzKS5maWxsKDApLm1hcCgodiwgaSkgPT4gbmV3IENsdXN0ZXIoaSwgcG9pbnRGYWN0b3J5LmdldFJhbmRvbVBvaW50KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBtYXhEaXN0YW5jZSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgodGhpcy53aWR0aCAqIHRoaXMud2lkdGgpICsgKHRoaXMuaGVpZ2h0ICogdGhpcy5oZWlnaHQpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjbHVzdGVyaW5nU3RlcCgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldEFsbENsdXN0ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5mb3JFYWNoKChwb2ludCwgcGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jbHVzdGVycy5yZWR1Y2UoKHJlcywgY2x1c3RlciwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5nZXREaXN0YW5jZShjbHVzdGVyLmNlbnRyb2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgRGlzdGFuY2UgYmV0d2VlbiBwb2ludHMgJHtwb2ludC50b1N0cmluZygpfSBhbmQgJHtjbHVzdGVyLmNlbnRyb2lkLnRvU3RyaW5nKCl9ID0gJHtkaXN0fS4gTWF4IGRpc3RhbmNlIGlzICR7dGhpcy5tYXhEaXN0YW5jZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1swXSA8IGRpc3QgPyByZXMgOiBbZGlzdCwgaWR4XVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIFt0aGlzLm1heERpc3RhbmNlLCAtMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYFBvaW50ICR7cGlkeH06ICR7cG9pbnQudG9TdHJpbmcoKX0gYmVsb25ncyB0byB0aGUgY2x1c3RlciAke2luZGV4fWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2x1c3RlcnNbaW5kZXhbMV1dICYmIHRoaXMuY2x1c3RlcnNbaW5kZXhbMV1dLmFkZFBvaW50KHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGNBbGxDbHVzdGVycygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZWNhbGNBbGxDbHVzdGVycygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2x1c3RlcnMuZm9yRWFjaCgoY2x1c3RlcikgPT4gY2x1c3Rlci5jYWxjdWxhdGVDZW50cm9pZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNldEFsbENsdXN0ZXJzKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbHVzdGVycy5mb3JFYWNoKChjbHVzdGVyKSA9PiBjbHVzdGVyLnJlc2V0KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKG5wb2ludHMsIG5jbHVzdGVycywgd2lkdGgsIGhlaWdodCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEtNZWFuQ2x1c3RlcnMobnBvaW50cywgbmNsdXN0ZXJzLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9rLW1lYW4vay1tZWFuLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCl7XHJcbiAgICB2cnAuZGlyZWN0aXZlKCdyb3V0ZURyYXcnLCByb3V0ZURyYXdEaXJlY3RpdmUpO1xyXG4gICAgcm91dGVEcmF3RGlyZWN0aXZlLiRpbmplY3QgPSBbJyRxJywgJyR0aW1lb3V0J107XHJcblxyXG4gICAgZnVuY3Rpb24gcm91dGVEcmF3RGlyZWN0aXZlKCRxLCAkdGltZW91dCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9yb3V0ZS1kcmF3LXRwbC5odG1sJyksXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSb3V0ZURyYXdDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY3RybCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZycC5jb250cm9sbGVyKCdSb3V0ZURyYXdDb250cm9sbGVyJywgUm91dGVEcmF3Q29udHJvbGxlcik7XHJcbiAgICBSb3V0ZURyYXdDb250cm9sbGVyLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyR0aW1lb3V0JywgJyRzaW1Bbm5lYWwnLCAncG9pbnRGYWN0b3J5J107XHJcblxyXG4gICAgZnVuY3Rpb24gUm91dGVEcmF3Q29udHJvbGxlcigkZWxlbWVudCwgJHRpbWVvdXQsICRzaW1Bbm5lYWwsIHBvaW50RmFjdG9yeSl7XHJcbiAgICAgICAgY29uc3QgY29sb3JzID0gW1xyXG4gICAgICAgICAgICAnIzIxOTZGMycsXHJcbiAgICAgICAgICAgICcjRjQ0MzM2JyxcclxuICAgICAgICAgICAgJyNGRkMxMDcnLFxyXG4gICAgICAgICAgICAnIzRDQUY1MCcsXHJcbiAgICAgICAgICAgICcjRkY5ODAwJyxcclxuICAgICAgICAgICAgJyMwMDk2ODgnLFxyXG4gICAgICAgICAgICAnIzlDMjdCMCcsXHJcbiAgICAgICAgICAgICcjRkZFQjNCJyxcclxuICAgICAgICAgICAgJyMzRjUxQjUnLFxyXG4gICAgICAgICAgICAnI0NEREMzOSdcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMubWFwU2l6ZSA9ICRlbGVtZW50WzBdLm9mZnNldFdpZHRoIC0gMTY7XHJcbiAgICAgICAgdGhpcy5tYXhUZW1wID0gMTA7XHJcbiAgICAgICAgdGhpcy5taW5UZW1wID0gMC4wMDAwNTtcclxuICAgICAgICB0aGlzLnBvaW50c051bWJlciA9IDIwO1xyXG4gICAgICAgIHRoaXMuc2ltQW5uZWFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJlc3RSb3V0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy51c2VQcmVzZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzQ2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmVzZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29sb3JJdGVyYXRvciA9IGNvbG9ycy52YWx1ZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWJ1aWxkUm91dGUgPSAocmVzZXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZHJhd0VsZW0gPSAkKCcucm91dGUtZHJhdy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgY29uc3Qgcm91dGVJbmZvID0gZHJhd0VsZW0uZmluZCgnLnJvdXRlLWluZm8nKTtcclxuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRfc2VhcmNoJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcHJlc2V0ID0gYnVpbGRQcmVzZXQodGhpcy5wcmVzZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc2V0IHx8ICF0aGlzLnNpbUFubmVhbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpbUFubmVhbCA9IHRoaXMudXNlUHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgPyAkc2ltQW5uZWFsLmdldFByZXNldEluc3RhbmNlKHByZXNldCwgdGhpcy5tYXhUZW1wLCB0aGlzLm1pblRlbXAsIHRoaXMuaXNDbG9zZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAkc2ltQW5uZWFsLmdldEluc3RhbmNlKHRoaXMucG9pbnRzTnVtYmVyLCB0aGlzLm1hcFNpemUsIHRoaXMubWF4VGVtcCwgdGhpcy5taW5UZW1wLCB0aGlzLmlzQ2xvc2VkKTtcclxuICAgICAgICAgICAgICAgIGRyYXdQb2ludHModGhpcy5zaW1Bbm5lYWwucG9pbnRzLCBkcmF3RWxlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zaW1Bbm5lYWwucmVzZXQoKTtcclxuICAgICAgICAgICAgY2xlYXJDYW52YXMoY3R4KTtcclxuICAgICAgICAgICAgZHJhd1JvdXRlU2VxdWVuY2UoY3R4LCB0aGlzLnNpbUFubmVhbCwgcm91dGVJbmZvKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdTb2x1dGlvbiA9IChpZHgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNpbUFubmVhbCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb2x1dGlvbl8nICsgaWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzY2FudmFzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkdGltZW91dCgoKSA9PiB0aGlzLmRyYXdTb2x1dGlvbihpZHgpLCA1MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHV0aW9uID0gdGhpcy5zaW1Bbm5lYWwuZ2V0U29sdXRpb24oaWR4KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjdHggPSBzY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgICAgICBzb2x1dGlvbi5jb2xvciA9IHRoaXMuZ2V0Q29sb3IoKTtcclxuICAgICAgICAgICAgICAgIGRyYXdSb3V0ZShzY3R4LCBzb2x1dGlvbi5wb2ludHMsIHNvbHV0aW9uLmNvbG9yKTtcclxuICAgICAgICAgICAgfSwgMClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZFNvbHV0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucHJlc2V0KXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSBidWlsZFByZXNldCh0aGlzLnByZXNldCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zaW1Bbm5lYWwpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHJhd0VsZW0gPSAkKCcucm91dGUtZHJhdy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGRyYXdQb2ludHMocG9pbnRzLCBkcmF3RWxlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpbUFubmVhbCA9ICRzaW1Bbm5lYWwuZ2V0UHJlc2V0SW5zdGFuY2UocG9pbnRzLCB0aGlzLm1heFRlbXAsIHRoaXMubWluVGVtcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpbUFubmVhbC5hZGRTb2x1dGlvbihwb2ludHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5mb2N1c1NvbHV0aW9uID0gKGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkcmF3RWxlbSA9ICQoJy5yb3V0ZS1kcmF3LWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICBkcmF3RWxlbS5maW5kKCcucm91dGUtc29sdXRpb24nKS5lYWNoKChpLCBlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW0pLnRvZ2dsZUNsYXNzKCdmb2N1c2VkLXNvbHV0aW9uJywgaSA9PT0gaWR4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5kb3dubG9hZFNvbHV0aW9uID0gKGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRfc2VhcmNoJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFVcmwgPSBzY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgICAgICAgICBpbml0RG93bmxvYWQoZGF0YVVybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9wUm91dGVTZWFyY2ggPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zaW1Bbm5lYWwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2ltQW5uZWFsLnN0b3AoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zaW1Bbm5lYWwuZ2V0TGFzdFNvbHV0aW9uKCkuZXhwb3J0KCkpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDb2xvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNvbG9ySXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICBpZiAoIWl0ZW0udmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvckl0ZXJhdG9yID0gY29sb3JzLnZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuY29sb3JJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRQcmVzZXQoZGF0YSl7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhID8gZGF0YS5zcGxpdCgnXFxuJykubWFwKChzdHIpID0+XHJcbiAgICAgICAgICAgICAgICBwb2ludEZhY3RvcnkuZ2V0UG9pbnQoLi4uc3RyXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgICAgICAgICAubWFwKCh2KSA9PiBwYXJzZUludCh2KSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSA6IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhd1JvdXRlU2VxdWVuY2UoY3R4LCBzaW1Bbm5lYWwsIGluZm9FbGVtLCBtaW5Db3N0KXtcclxuICAgICAgICAgICAgaWYgKHNpbUFubmVhbC5pc0RvbmUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFByb2Nlc3NpbmcgaXMgZG9uZSB3aXRoIGNvc3Qgb2YgJHtzaW1Bbm5lYWwuZ2V0TGFzdFNvbHV0aW9uKCkuY29zdH0uICR7c2ltQW5uZWFsLnNvbHV0aW9ucy5sZW5ndGh9IHNvbHV0aW9ucyBpbiBzdG9ja2ApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2ltQW5uZWFsLmdldExhc3RTb2x1dGlvbigpLmV4cG9ydCgpKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyQ2FudmFzKGN0eCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb3N0ID0gc2ltQW5uZWFsLmN1cnJlbnRDb3N0O1xyXG4gICAgICAgICAgICBpZiAoIW1pbkNvc3QgfHwgbWluQ29zdCA+IGN1cnJlbnRDb3N0KXtcclxuICAgICAgICAgICAgICAgIGNsZWFyQ2FudmFzKGN0eCk7XHJcbiAgICAgICAgICAgICAgICBkcmF3Um91dGUoY3R4LCBzaW1Bbm5lYWwucG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIG1pbkNvc3QgPSBjdXJyZW50Q29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmZvRWxlbS5odG1sKGBtaW4uIGNvc3Q6IDxiPiR7bWluQ29zdH08L2I+LiAke3NpbUFubmVhbC5pbmZvfWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNpbUFubmVhbC5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3Um91dGVTZXF1ZW5jZShjdHgsIHNpbUFubmVhbCwgaW5mb0VsZW0sIG1pbkNvc3QpO1xyXG4gICAgICAgICAgICAgICAgfSwgNSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhd1BvaW50cyhwb2ludHMsIGNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgICQoY29udGFpbmVyKS5maW5kKCcucm91dGUtcG9pbnQnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2YgPSBnZXRTY2FsZUZhY3Rvcihwb2ludHMpO1xyXG5cclxuICAgICAgICAgICAgcG9pbnRzLmZvckVhY2goKHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwdCA9IHNmICE9PSAxID8gcG9pbnQuZ2V0U2NhbGVkKHNmKSA6IHBvaW50LmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBweCA9IE1hdGgucm91bmQocHQueCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBweSA9IE1hdGgucm91bmQocHQueSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwaWQgPSBbJ3JwJywgcG9pbnQueCwgcG9pbnQueV0uam9pbignXycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2ludEVsZW0gPSBhbmd1bGFyLmVsZW1lbnQoYDxkaXYgY2xhc3M9XCJyb3V0ZS1wb2ludFwiIGlkPVwicnBfJHtwb2ludC54fV8ke3BvaW50Lnl9XCI+PHNwYW4+JHtwb2ludC54fXgke3BvaW50Lnl9PC9zcGFuPjwvZGl2PmApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50RWxlbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHB5ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcHggKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChwb2ludEVsZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhd1JvdXRlKGN0eCwgcG9pbnRzLCBjb2xvciA9ICcjMEQ0N0ExJyl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNmID0gZ2V0U2NhbGVGYWN0b3IocG9pbnRzKTtcclxuICAgICAgICAgICAgY29uc3QgcHRzID0gc2YgIT09IDEgPyBwb2ludHMubWFwKChwdCkgPT4gcHQuZ2V0U2NhbGVkKHNmKSkgOiBwb2ludHMuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMjtcclxuICAgICAgICAgICAgY3R4LmxpbmVDYXAgPSAncm91bmQnO1xyXG4gICAgICAgICAgICBjdHgubGluZUpvaW4gPSAncm91bmQnO1xyXG5cclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHB0c1swXS54LCBwdHNbMF0ueSk7XHJcbiAgICAgICAgICAgIHB0cy5zbGljZSgxKS5mb3JFYWNoKChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgbWFya1N0YXJ0RW5kUG9pbnRzKHBvaW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYXJrU3RhcnRFbmRQb2ludHMocG9pbnRzKXtcclxuICAgICAgICAgICAgY29uc3QgZHJhd0VsZW0gPSAkKCcucm91dGUtZHJhdy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgY29uc3QgZmlkID0gYCNycF8ke3BvaW50c1swXS54fV8ke3BvaW50c1swXS55fWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpZCA9IGAjcnBfJHtwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLnh9XyR7cG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXS55fWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGZjbGFzcyA9ICdyb3V0ZS1wb2ludC1maXJzdCc7XHJcbiAgICAgICAgICAgIGNvbnN0IGxjbGFzcyA9ICdyb3V0ZS1wb2ludC1sYXN0JztcclxuICAgICAgICAgICAgZHJhd0VsZW0uZmluZCgnLnJvdXRlLXBvaW50JykucmVtb3ZlQ2xhc3MoZmNsYXNzKS5yZW1vdmVDbGFzcyhsY2xhc3MpO1xyXG4gICAgICAgICAgICBkcmF3RWxlbS5maW5kKGZpZCkuYWRkQ2xhc3MoZmNsYXNzKTtcclxuICAgICAgICAgICAgZHJhd0VsZW0uZmluZChsaWQpLmFkZENsYXNzKGxjbGFzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGVhckNhbnZhcyhjdHgpe1xyXG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZhY3RvcmlhbCh2YWwsIHJlcyA9IDEpe1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsID4gMCA/IGZhY3RvcmlhbCh2YWwgLSAxLCB2YWwgKiByZXMpIDogcmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U2NhbGVGYWN0b3IocG9pbnRzKXtcclxuICAgICAgICAgICAgY29uc3QgY252ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRfc2VhcmNoJyk7XHJcbiAgICAgICAgICAgIGlmICghY252KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbWF4RGltID0gcG9pbnRzLm1hcCgocHQpID0+IE1hdGgubWF4KHB0LngsIHB0LnkpKS5zb3J0KChhLCBiKSA9PiBiIC0gYSlbMF07XHJcbiAgICAgICAgICAgIHJldHVybiBjbnYud2lkdGggLyBtYXhEaW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0RG93bmxvYWQgKHVybCkge1xyXG4gICAgICAgICAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xyXG4gICAgICAgICAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICdyb3V0ZS5wbmcnKTtcclxuICAgICAgICAgICAgY29uc3QgZXYgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snKTtcclxuICAgICAgICAgICAgYW5jaG9yLmRpc3BhdGNoRXZlbnQoZXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZm9ybWF0dGVkRmFjdG9yaWFsKG51bSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY3QgPSBmYWN0b3JpYWwobnVtKTtcclxuICAgICAgICAgICAgY29uc3QgcG93ID0gcGFyc2VJbnQoZmFjdC50b1N0cmluZygpLnNwbGl0KCdlKycpWzFdKTtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoZmFjdCAvIE1hdGgucG93KDEwLCBwb3cpKS50b1N0cmluZygpICsgKCcwJykucmVwZWF0KHBvdylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy1kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDc4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYWxnby1jb250cm9sc1xcXCIgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBzdGFydFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCI2MFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIGNlbnRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLXN3aXRjaCBuZy1tb2RlbD1cXFwiY3RybC51c2VQcmVzZXRcXFwiIGFyaWEtbGFiZWw9XFxcIlVzZSBQcmVzZXRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIFByZXNldCBQb2ludHNcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtc3dpdGNoPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtY2hlY2tib3ggbmctbW9kZWw9XFxcImN0cmwuaXNDbG9zZWRcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlZCByb3V0ZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xvc2VkIHJvdXRlXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLWNoZWNrYm94PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4IG5nLWlmPVxcXCJjdHJsLnVzZVByZXNldFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgY2xhc3M9XFxcIm1kLWJsb2NrXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Qb2ludHM8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG5nLW1vZGVsPVxcXCJjdHJsLnByZXNldFxcXCIgcm93cz1cXFwiM1xcXCIgbWF4LXJvd3M9XFxcIjNcXFwiPjwvdGV4dGFyZWE+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXggbmctaWY9XFxcIiFjdHJsLnVzZVByZXNldFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+U2l6ZTwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCI1MDBcXFwiIG1heD1cXFwiMTIwMFxcXCIgbmctbW9kZWw9XFxcImN0cmwubWFwU2l6ZVxcXCIgYXJpYS1sYWJlbD1cXFwicmVkXFxcIiBpZD1cXFwibWFwLXNpemUtc2xpZGVyXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibWQtd2FyblxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLXNsaWRlcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwubWFwU2l6ZVxcXCIgYXJpYS1sYWJlbD1cXFwibWFwIHNpemVcXFwiIGFyaWEtY29udHJvbHM9XFxcIm1hcC1zaXplLXNsaWRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvaW50czwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCI0XFxcIiBtYXg9XFxcIjEwMFxcXCIgbmctbW9kZWw9XFxcImN0cmwucG9pbnRzTnVtYmVyXFxcIiBhcmlhLWxhYmVsPVxcXCJyZWRcXFwiIGlkPVxcXCJwb2ludHMtbnVtYmVyLXNsaWRlclxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1kLXdhcm5cXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLnBvaW50c051bWJlclxcXCIgYXJpYS1sYWJlbD1cXFwicG9pbnRzIG51bWJlclxcXCIgYXJpYS1jb250cm9scz1cXFwicG9pbnRzLW51bWJlci1zbGlkZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiMzBcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBjZW50ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg9XFxcIjQ1XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgY2xhc3M9XFxcIm5vLWVycm9yc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPm1heC4gVDwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwubWF4VGVtcFxcXCIgYXJpYS1sYWJlbD1cXFwiaW5pdGlhbCB0ZW1wZXJhdHVyZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibm8tZXJyb3JzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+bWluLiBUPC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5taW5UZW1wXFxcIiBhcmlhLWxhYmVsPVxcXCJtaW5pbWFsIHRlbXBlcmF0dXJlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gY2VudGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5yZWJ1aWxkUm91dGUoKVxcXCIgYXJpYS1sYWJlbD1cXFwicmVidWlsZCByb3V0ZVxcXCIgbmctZGlzYWJsZWQ9XFxcImN0cmwuc2ltQW5uZWFsICYmIGN0cmwuc2ltQW5uZWFsLmlzUnVubmluZ1xcXCI+UmVwZWF0PC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gY2xhc3M9XFxcIm1kLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLnJlYnVpbGRSb3V0ZSh0cnVlKVxcXCIgYXJpYS1sYWJlbD1cXFwicmVidWlsZCByb3V0ZVxcXCIgbmctZGlzYWJsZWQ9XFxcImN0cmwuc2ltQW5uZWFsICYmIGN0cmwuc2ltQW5uZWFsLmlzUnVubmluZ1xcXCI+U2VhcmNoPC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJjZW50ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gY2xhc3M9XFxcIm1kLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLmFkZFNvbHV0aW9uKClcXFwiIGFyaWEtbGFiZWw9XFxcInJlYnVpbGQgcm91dGVcXFwiIG5nLWRpc2FibGVkPVxcXCIhY3RybC5wcmVzZXRcXFwiPkFkZDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC13YXJuXFxcIiBuZy1jbGljaz1cXFwiY3RybC5zdG9wUm91dGVTZWFyY2goKVxcXCIgYXJpYS1sYWJlbD1cXFwic3RvcCByb3V0ZSBzZWFyY2hcXFwiIG5nLWRpc2FibGVkPVxcXCIhY3RybC5zaW1Bbm5lYWwgfHwgIWN0cmwuc2ltQW5uZWFsLmlzUnVubmluZ1xcXCI+U3RvcDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLWJlbmNobWFya1xcXCIgIG5nLWlmPVxcXCJjdHJsLmJlc3RSb3V0ZVxcXCI+XFxyXFxuICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgIDxwPjxzdHJvbmc+UGVybXV0YXRpb25zPC9zdHJvbmc+PC9wPlxcclxcbiAgICAgICAgICAgIDxwPnt7Y3RybC5iZXN0Um91dGUubGltaXQgfCBwb3dudW1iZXJ9fSAvIHt7Y3RybC5iZXN0Um91dGUudG90YWwgfCBwb3dudW1iZXJ9fTwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPG1kLWRpdmlkZXI+PC9tZC1kaXZpZGVyPlxcclxcbiAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICA8cD48c3Ryb25nPkR1cmF0aW9uPC9zdHJvbmc+PGJyPnt7Y3RybC5iZXN0Um91dGUuZHVyYXRpb259fW1zPC9wPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8bWQtZGl2aWRlcj48L21kLWRpdmlkZXI+XFxyXFxuICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgIDxwPjxzdHJvbmc+U2luZ2xlIHNhbXBsZTwvc3Ryb25nPjxicj57e2N0cmwuYmVzdFJvdXRlLmJlbmNofX1tczwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPG1kLWRpdmlkZXI+PC9tZC1kaXZpZGVyPlxcclxcbiAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICA8cD48c3Ryb25nPkVzdC4gY2FsYy4gdGltZTwvc3Ryb25nPjxicj57e2N0cmwuYmVzdFJvdXRlLmVzdGltYXRlLnllYXJzKCkgfCBwb3dudW1iZXJ9fSB5ZWFyczwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICA8cD48c3Ryb25nPlN0YXJ0IGNvc3Q8L3N0cm9uZz48YnI+e3tjdHJsLmJlc3RSb3V0ZS5jb3N0fX08L3A+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDwhLS08ZGl2IGNsYXNzPVxcXCJhbGdvLWJlc3Qtcm91dGVcXFwiIG5nLWlmPVxcXCJjdHJsLmJlc3RSb3V0ZSAmJiBjdHJsLnBvaW50c051bWJlciA8IDEwXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbmctcmVwZWF0PVxcXCJpdGVtIGluIGN0cmwuYmVzdFJvdXRlLnN0YXRlIHRyYWNrIGJ5ICRpbmRleFxcXCI+e3tpdGVtLnh9fSB4IHt7aXRlbS55fX08L2Rpdj5cXHJcXG4gICAgPC9kaXY+LS0+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tc29sdXRpb25zXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiXFxyXFxuICAgICAgICAgICAgIGxheW91dC1hbGlnbj1cXFwic3RhcnQgY2VudGVyXFxcIlxcclxcbiAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcInNvbHV0aW9uIGluIGN0cmwuc2ltQW5uZWFsLnNvbHV0aW9uc1xcXCJcXHJcXG4gICAgICAgICAgICAgbmctbW91c2VlbnRlcj1cXFwiY3RybC5mb2N1c1NvbHV0aW9uKCRpbmRleClcXFwiXFxyXFxuICAgICAgICAgICAgIG5nLW1vdXNlbGVhdmU9XFxcImN0cmwuZm9jdXNTb2x1dGlvbigtMSlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLmRvd25sb2FkU29sdXRpb24oJGluZGV4KVxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kLWJ1bGxldFxcXCIgbmctc3R5bGU9XFxcInsnYmFja2dyb3VuZC1jb2xvcic6IHNvbHV0aW9uLmNvbG9yfVxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBmbGV4Pnt7c29sdXRpb24uY29zdH19PC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tZHJhdy1zY3JvbGxlclxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3V0ZS1kcmF3LWNvbnRhaW5lclxcXCIgbmctc3R5bGU9XFxcInsnbWluLXdpZHRoJzogY3RybC5tYXBTaXplICsgJ3B4JywgJ21pbi1oZWlnaHQnOiBjdHJsLm1hcFNpemUgKyAncHgnfVxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm91dGUtaW5mb1xcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm91dGUtc29sdXRpb25cXFwiXFxyXFxuICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcInNvbHV0aW9uIGluIGN0cmwuc2ltQW5uZWFsLnNvbHV0aW9uc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxjYW52YXMgd2lkdGg9XFxcInt7Y3RybC5tYXBTaXplfX1cXFwiIGhlaWdodD1cXFwie3tjdHJsLm1hcFNpemV9fVxcXCIgaWQ9XFxcInNvbHV0aW9uX3t7JGluZGV4fX1cXFwiPjwvY2FudmFzPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLWluaXQ9XFxcImN0cmwuZHJhd1NvbHV0aW9uKCRpbmRleClcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvdXRlLWN1cnJlbnQtc2VhcmNoXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGNhbnZhcyB3aWR0aD1cXFwie3tjdHJsLm1hcFNpemV9fVxcXCIgaGVpZ2h0PVxcXCJ7e2N0cmwubWFwU2l6ZX19XFxcIiBpZD1cXFwiY3VycmVudF9zZWFyY2hcXFwiPjwvY2FudmFzPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNzg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5zZXJ2aWNlKCdyb3V0ZVBsb3R0ZXInLCByb3V0ZVBsb3R0ZXIpO1xyXG4gICAgcm91dGVQbG90dGVyLiRpbmplY3QgPSBbJ3BvaW50RmFjdG9yeSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJvdXRlUGxvdHRlcihwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNvbnN0IENPTE9SUyA9IFtcclxuICAgICAgICAgICAgJyMyMTk2RjMnLFxyXG4gICAgICAgICAgICAnI0Y0NDMzNicsXHJcbiAgICAgICAgICAgICcjRkZDMTA3JyxcclxuICAgICAgICAgICAgJyM0Q0FGNTAnLFxyXG4gICAgICAgICAgICAnI0ZGOTgwMCcsXHJcbiAgICAgICAgICAgICcjMDA5Njg4JyxcclxuICAgICAgICAgICAgJyM5QzI3QjAnLFxyXG4gICAgICAgICAgICAnI0ZGRUIzQicsXHJcbiAgICAgICAgICAgICcjM0Y1MUI1JyxcclxuICAgICAgICAgICAgJyNDRERDMzknXHJcbiAgICAgICAgXTtcclxuXHJcblxyXG5cclxuICAgICAgICBjbGFzcyBSb3V0ZVBsb3R0ZXIge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlSW5mbyA9IHRoaXMuZWxlbWVudC5maW5kKCcucm91dGUtaW5mbycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudF9zZWFyY2gnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JJdGVyYXRvciA9IENPTE9SUy52YWx1ZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2YgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRDb2xvcigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNvbG9ySXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9ySXRlcmF0b3IgPSBDT0xPUlMudmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuY29sb3JJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0UG9pbnRFbGVtKHBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSAgJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkudGV4dChwb2ludC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHBvaW50LmNzc1N0eWxlLmZvckVhY2goKGNzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkQ2xhc3MoY3NzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldEJlc3RTb2x1dGlvbih2cnAgPSB0aGlzLnZycCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdnJwLnNvbHV0aW9ucy5yZWR1Y2UoKHJlcywgc29sKSA9PiBzb2wuY29zdCA8IHJlcy5jb3N0ID8gc29sIDogcmVzLCB7Y29zdDogTnVtYmVyLk1BWF9WQUxVRX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VmVoaWNsZXModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnZlaGljbGVzKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZycC52ZWhpY2xlcy5mb3JFYWNoKCh2aGMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSB2aGMuc3RhcnRMb2NhdGlvbiA/IHZoYy5zdGFydExvY2F0aW9uLmNvb3JkIDogdmhjLmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gbmV3IFJvdXRlUG9pbnQoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygnbWF0ZXJpYWwtaWNvbnMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtdmVoaWNsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXROYW1lKCdsb2NhbF9zaGlwcGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZXMuc2V0KHZoYy5pZCwgcG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRTaGlwbWVudHModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnNoaXBtZW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2cnAuc2hpcG1lbnRzLmZvckVhY2goKHNoaXBtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3g6IHB4LCB5OiBweX0gPSBzaGlwbWVudC5waWNrdXAubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3g6IGR4LCB5OiBkeX0gPSBzaGlwbWVudC5kZWxpdmVyeS5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbG9jID0gbmV3IFJvdXRlUG9pbnQocHgsIHB5KS5zZXRDc3MoJ3ZycC1waWNrdXAnKS5zZXROYW1lKHNoaXBtZW50LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkbG9jID0gbmV3IFJvdXRlUG9pbnQoZHgsIGR5KS5zZXRDc3MoJ3ZycC1kZWxpdmVyeScpLnNldE5hbWUoc2hpcG1lbnQuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRzLnNldChzaGlwbWVudC5pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWNrdXA6IHBsb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5OiBkbG9jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eTogc2hpcG1lbnQuY2FwYWNpdHlEZW1hbmQgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdDogTWF0aC5yb3VuZChwbG9jLmdldERpc3RhbmNlKGRsb2MpICogMTApIC8gMTBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0Um91dGVzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC5zb2x1dGlvbnMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYmVzdFNvbHV0aW9uID0gdGhpcy5nZXRCZXN0U29sdXRpb24odnJwKTtcclxuICAgICAgICAgICAgICAgIGJlc3RTb2x1dGlvbi5yb3V0ZXMuZm9yRWFjaCgocm91dGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2ludHMgPSByb3V0ZS5hY3QucmVkdWNlKChyZXMsIGFjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGlwbWVudHMuaGFzKGFjdC5zaGlwbWVudElkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaHAgPSB0aGlzLnNoaXBtZW50cy5nZXQoYWN0LnNoaXBtZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goYWN0LnR5cGUuc3RhcnRzV2l0aCgncGlja3VwJykgPyBzaHAucGlja3VwIDogc2hwLmRlbGl2ZXJ5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlaGljbGVzLmhhcyhyb3V0ZS52ZWhpY2xlSWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnVuc2hpZnQodGhpcy52ZWhpY2xlcy5nZXQocm91dGUudmVoaWNsZUlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVzLnNldChyb3V0ZS52ZWhpY2xlSWQsIHtjb2xvcjogdGhpcy5nZXRDb2xvcigpLCBwb2ludHN9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRWUlAodnJwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudnJwID0gdnJwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0VmVoaWNsZXModnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRTaGlwbWVudHModnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRSb3V0ZXModnJwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkUG9pbnQocG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbFBvaW50ID0gcG9pbnQuZ2V0U2NhbGVkKHRoaXMuc2YpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gcmVhbFBvaW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZ2V0UG9pbnRFbGVtKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHkgLSAxMiArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogeCAtIDEyICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFNoaXBtZW50KHNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmICghc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwaWNrdXA6IHBsb2MsIGRlbGl2ZXJ5OiBkbG9jfSA9IHNoaXBtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQocGxvYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KGRsb2MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Um91dGUoW3Bsb2MsIGRsb2NdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FwYWNpdHkoc2hpcG1lbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZENhcGFjaXR5KHNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmICghc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwaWNrdXA6IHBsb2MsIGNhcGFjaXR5OiBjYXBhY2l0eX0gPSBzaGlwbWVudDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHlcIj48ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5LWxpbmtcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eS1kYXRhXCI+JHtjYXBhY2l0eX08L2Rpdj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJwID0gcGxvYy5nZXRTY2FsZWQodGhpcy5zZik7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBycC55ICsgMTIgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJwLnggLSAxMiArICdweCdcclxuICAgICAgICAgICAgICAgIH0pLmFkZENsYXNzKCd2cnAtcG9pbnQtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRyYXdSb3V0ZShwb2ludHMsIGNvbG9yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgLjIwKSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZUNhcCA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChjb2xvciA/IFtdIDogWzgsIDhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsUG9pbnRzID0gcG9pbnRzLm1hcCgocG9pbnQpID0+IHBvaW50LmdldFNjYWxlZCh0aGlzLnNmKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8ocmVhbFBvaW50c1swXS54LCByZWFsUG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICAgICAgcmVhbFBvaW50cy5zbGljZSgxKS5mb3JFYWNoKChwb2ludCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50c1tpZHhdLmdldERpc3RhbmNlKHBvaW50c1tpZHggKyAxXSkudG9GaXhlZCgxKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtaWQgPSBwb2ludHNbaWR4XS5nZXRNaWRQb2ludChwb2ludHNbaWR4ICsgMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC1kaXN0YW5jZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC1wb2ludC1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0TmFtZShkaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvclN0eWxlID0geydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3IgfHwgJyM0NTVBNjQnfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KG1pZCkuY3NzKGNvbG9yU3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZHJhd1NvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Um91dGUoaXRlbS5wb2ludHMsIGl0ZW0uY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxvdFZSUCgpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZycCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzLmZvckVhY2goKHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChwb2ludCwgVFlQRVMudmVoaWNsZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRzLmZvckVhY2goKHNocCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2hpcG1lbnQoc2hwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxvdFNvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiZXN0U29sdXRpb24gPSB0aGlzLnZycC5zb2x1dGlvbnMucmVkdWNlKChyZXMsIHNvbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzb2wuY29zdCA8IHJlcy5jb3N0ID8gc29sIDogcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwge2Nvc3Q6IE51bWJlci5NQVhfVkFMVUV9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NvbHV0aW9uKGJlc3RTb2x1dGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc2V0KCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmQoJy52cnAtcG9pbnQnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0U2NhbGUoc2Ype1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZiA9IHNmO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGVsZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZVBsb3R0ZXIoZWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLXBsb3R0ZXItc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuZGlyZWN0aXZlKCd2cnBEcmF3JywgdnJwRHJhd0RpcmVjdGl2ZSk7XHJcbiAgICB2cnBEcmF3RGlyZWN0aXZlLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiB2cnBEcmF3RGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdnJwLWRyYXctdHBsLmh0bWwnKSxcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1ZycERyYXdDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY3RybCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZycC5jb250cm9sbGVyKCdWcnBEcmF3Q29udHJvbGxlcicsIFZycERyYXdDb250cm9sbGVyKTtcclxuICAgIFZycERyYXdDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICd2cnBQbG90dGVyJ107XHJcblxyXG4gICAgZnVuY3Rpb24gVnJwRHJhd0NvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgdnJwUGxvdHRlcikge1xyXG4gICAgICAgIGNvbnN0IHZycEVsZW0gPSAkKCcudnJwLXBvaW50LWNvbnRhaW5lcicpO1xyXG5cclxuICAgICAgICB0aGlzLnZycERhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHtcclxuICAgICAgICAgICAgc2hvd0Rpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93Q2FwRGVtYW5kOiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5wbG90dGVyID0gdnJwUGxvdHRlci5nZXRJbnN0YW5jZSh2cnBFbGVtKTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY3RybC5maWx0ZXJzLnNob3dEaXN0JywgKG52YWwpID0+IHtcclxuICAgICAgICAgICAgJCgnLnZycC1kaXN0YW5jZScpLnRvZ2dsZUNsYXNzKCd2cnAtcG9pbnQtaGlkZGVuJywgIW52YWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjdHJsLmZpbHRlcnMuc2hvd0NhcERlbWFuZCcsIChudmFsKSA9PiB7XHJcbiAgICAgICAgICAgICQoJy52cnAtY2FwYWNpdHknKS50b2dnbGVDbGFzcygndnJwLXBvaW50LWhpZGRlbicsICFudmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5wbG90VlJQID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudnJwRGF0YSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgdnJwID0gSlNPTi5wYXJzZSh0aGlzLnZycERhdGEpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucGxvdHRlci52cnApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbG90dGVyLnNldFZSUCh2cnApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGxvdHRlci5wbG90VlJQKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5wbG90U29sdXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy52cnBEYXRhKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCB2cnAgPSBKU09OLnBhcnNlKHRoaXMudnJwRGF0YSk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wbG90dGVyLnZycCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsb3R0ZXIuc2V0VlJQKHZycCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wbG90dGVyLnBsb3RTb2x1dGlvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy92cnAvdnJwLWRyYXctZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA3ODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tY29udHJvbHNcXFwiIGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gc3RhcnRcXFwiPlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiNTBcXFwiPlxcclxcbiAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgY2xhc3M9XFxcIm1kLWJsb2NrXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGxhYmVsPlZSUDwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBuZy1tb2RlbD1cXFwiY3RybC52cnBEYXRhXFxcIiByb3dzPVxcXCI2XFxcIiBtYXgtcm93cz1cXFwiNlxcXCI+PC90ZXh0YXJlYT5cXHJcXG4gICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiNDBcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zd2l0Y2ggbmctbW9kZWw9XFxcImN0cmwuZmlsdGVycy5zaG93RGlzdFxcXCIgYXJpYS1sYWJlbD1cXFwiU2hvdyBEaXN0YW5jZXNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgU2hvdyBkaXN0YW5jZXNcXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1zd2l0Y2g+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zd2l0Y2ggbmctbW9kZWw9XFxcImN0cmwuZmlsdGVycy5zaG93Q2FwRGVtYW5kXFxcIiBhcmlhLWxhYmVsPVxcXCJTaG93IHJlcXVpcmVkIGNhcGFjaXR5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIFNob3cgcmVxdWlyZWQgY2FwYWNpdHlcXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1zd2l0Y2g+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cXFwiY3RybC5wbG90dGVyLnJlc2V0KClcXFwiIGFyaWEtbGFiZWw9XFxcInJlc2V0XFxcIiBuZy1kaXNhYmxlZD1cXFwiIWN0cmwucGxvdHRlclxcXCI+UmVzZXQ8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBjbGFzcz1cXFwibWQtcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcImN0cmwucGxvdFNvbHV0aW9uKClcXFwiIGFyaWEtbGFiZWw9XFxcImRyYXcgU29sdXRpb25cXFwiIG5nLWRpc2FibGVkPVxcXCIhY3RybC5wbG90dGVyXFxcIj5Tb2x1dGlvbjwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5wbG90VlJQKClcXFwiIGFyaWEtbGFiZWw9XFxcImRyYXcgVlJQXFxcIiBuZy1kaXNhYmxlZD1cXFwiIWN0cmwucGxvdHRlclxcXCI+VlJQPC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tZHJhdy1zY3JvbGxlclxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ2cnAtZHJhdy1jb250YWluZXJcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInZycC1wb2ludC1jb250YWluZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8Y2FudmFzIHdpZHRoPVxcXCI4MDBcXFwiIGhlaWdodD1cXFwiODAwXFxcIj48L2NhbnZhcz5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdnJwL3ZycC1kcmF3LXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA3ODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApe1xyXG4gICAgdnJwLnNlcnZpY2UoJ3ZycFBsb3R0ZXInLCB2cnBQbG90dGVyKTtcclxuICAgIHZycFBsb3R0ZXIuJGluamVjdCA9IFsncG9pbnRGYWN0b3J5J107XHJcblxyXG4gICAgZnVuY3Rpb24gdnJwUGxvdHRlcihwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNvbnN0IFRZUEVTID0ge1xyXG4gICAgICAgICAgICBkZWxpdmVyeToge1xyXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICd2cnAtZGVsaXZlcnkgbWF0ZXJpYWwtaWNvbnMnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2FyY2hpdmUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBpY2t1cDoge1xyXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICd2cnAtcGlja3VwIG1hdGVyaWFsLWljb25zJyxcclxuICAgICAgICAgICAgICAgIGljb246ICd1bmFyY2hpdmUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZlaGljbGU6IHtcclxuICAgICAgICAgICAgICAgIGNzc0NsYXNzOiAndnJwLXZlaGljbGUgbWF0ZXJpYWwtaWNvbnMnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2xvY2FsX3NoaXBwaW5nJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBDT0xPUlMgPSBbXHJcbiAgICAgICAgICAgICcjMjE5NkYzJyxcclxuICAgICAgICAgICAgJyNGNDQzMzYnLFxyXG4gICAgICAgICAgICAnI0ZGQzEwNycsXHJcbiAgICAgICAgICAgICcjNENBRjUwJyxcclxuICAgICAgICAgICAgJyNGRjk4MDAnLFxyXG4gICAgICAgICAgICAnIzAwOTY4OCcsXHJcbiAgICAgICAgICAgICcjOUMyN0IwJyxcclxuICAgICAgICAgICAgJyNGRkVCM0InLFxyXG4gICAgICAgICAgICAnIzNGNTFCNScsXHJcbiAgICAgICAgICAgICcjQ0REQzM5J1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGNsYXNzIFJvdXRlUG9pbnQgZXh0ZW5kcyBwb2ludEZhY3RvcnkuUlBvaW50IHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgICAgICAgICBzdXBlcih4LCB5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzU3R5bGUgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3NTdHlsZS5hZGQoJ3ZycC1wb2ludCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRDc3MoY3NzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzU3R5bGUuYWRkKGNzcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0TmFtZShuYW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3MgVlJQUGxvdHRlciB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5lbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwbWVudHMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvckl0ZXJhdG9yID0gQ09MT1JTLnZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZiA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZycCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldENvbG9yKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY29sb3JJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0udmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3JJdGVyYXRvciA9IENPTE9SUy52YWx1ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5jb2xvckl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRQb2ludEVsZW0ocG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9ICAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS50ZXh0KHBvaW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9pbnQuY3NzU3R5bGUuZm9yRWFjaCgoY3NzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRDbGFzcyhjc3MpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0QmVzdFNvbHV0aW9uKHZycCA9IHRoaXMudnJwKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2cnAuc29sdXRpb25zLnJlZHVjZSgocmVzLCBzb2wpID0+IHNvbC5jb3N0IDwgcmVzLmNvc3QgPyBzb2wgOiByZXMsIHtjb3N0OiBOdW1iZXIuTUFYX1ZBTFVFfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRWZWhpY2xlcyh2cnApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2cnAudmVoaWNsZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdnJwLnZlaGljbGVzLmZvckVhY2goKHZoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZoY0xvYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogbnVsbFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZoYy5zdGFydExvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gdmhjLnN0YXJ0TG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZoY0xvYy5zdGFydCA9IG5ldyBSb3V0ZVBvaW50KHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCdtYXRlcmlhbC1pY29ucycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtdmVoaWNsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0TmFtZSgnbG9jYWxfc2hpcHBpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZoYy5lbmRMb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHZoYy5lbmRMb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmhjTG9jLmVuZCA9IG5ldyBSb3V0ZVBvaW50KHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCdtYXRlcmlhbC1pY29ucycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtdmVoaWNsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0TmFtZSgnbG9jYWxfc2hpcHBpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcy5zZXQodmhjLmlkLCB2aGNMb2MpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRTaGlwbWVudHModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnNoaXBtZW50cyB8fCAhdnJwLnNoaXBtZW50cy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdnJwLnNoaXBtZW50cy5mb3JFYWNoKChzaGlwbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4OiBweCwgeTogcHl9ID0gc2hpcG1lbnQucGlja3VwLmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4OiBkeCwgeTogZHl9ID0gc2hpcG1lbnQuZGVsaXZlcnkubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxvYyA9IG5ldyBSb3V0ZVBvaW50KHB4LCBweSkuc2V0Q3NzKCd2cnAtcGlja3VwJykuc2V0TmFtZShzaGlwbWVudC5pZC5zbGljZSgzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGxvYyA9IG5ldyBSb3V0ZVBvaW50KGR4LCBkeSkuc2V0Q3NzKCd2cnAtZGVsaXZlcnknKS5zZXROYW1lKHNoaXBtZW50LmlkLnNsaWNlKDMpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cy5zZXQoc2hpcG1lbnQuaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlja3VwOiBwbG9jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxpdmVyeTogZGxvYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHk6IHNoaXBtZW50LmNhcGFjaXR5RGVtYW5kWzBdIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Q6IE1hdGgucm91bmQocGxvYy5nZXREaXN0YW5jZShkbG9jKSAqIDEwKSAvIDEwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFNlcnZpY2VzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC5zZXJ2aWNlcyB8fCAhdnJwLnNlcnZpY2VzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2cnAuc2VydmljZXMuZm9yRWFjaCgoc2VydmljZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHNlcnZpY2UubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jID0gbmV3IFJvdXRlUG9pbnQoeCwgeSkuc2V0Q3NzKCd2cnAtJyArIHNlcnZpY2UudHlwZSkuc2V0TmFtZShzZXJ2aWNlLmlkLnNsaWNlKDMpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VzLnNldChzZXJ2aWNlLmlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBsb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5OiBzZXJ2aWNlLmNhcGFjaXR5RGVtYW5kWzBdIHx8IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0Um91dGVzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC5zb2x1dGlvbnMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYmVzdFNvbHV0aW9uID0gdGhpcy5nZXRCZXN0U29sdXRpb24odnJwKTtcclxuICAgICAgICAgICAgICAgIGJlc3RTb2x1dGlvbi5yb3V0ZXMuZm9yRWFjaCgocm91dGUsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IHJvdXRlLmFjdC5yZWR1Y2UoKHJlcywgYWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaXBtZW50cy5oYXMoYWN0LmpvYklkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaHAgPSB0aGlzLnNoaXBtZW50cy5nZXQoYWN0LmpvYklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGFjdC50eXBlLnN0YXJ0c1dpdGgoJ3BpY2t1cCcpID8gc2hwLnBpY2t1cCA6IHNocC5kZWxpdmVyeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlcy5oYXMoYWN0LmpvYklkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdmMgPSB0aGlzLnNlcnZpY2VzLmdldChhY3Quam9iSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goc3ZjLmxvY2F0aW9uKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlaGljbGVzLmhhcyhyb3V0ZS52ZWhpY2xlSWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmhjTG9jID0gdGhpcy52ZWhpY2xlcy5nZXQocm91dGUudmVoaWNsZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmhjTG9jLnN0YXJ0ICYmIHBvaW50cy51bnNoaWZ0KHZoY0xvYy5zdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZoY0xvYy5lbmQgJiYgcG9pbnRzLnB1c2godmhjTG9jLmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVzLnNldCgncm91dGUnICsgaWR4LCB7Y29sb3I6IHRoaXMuZ2V0Q29sb3IoKSwgcG9pbnRzfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VlJQKHZycCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZycCA9IHZycDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFZlaGljbGVzKHZycClcclxuICAgICAgICAgICAgICAgICAgICAuc2V0U2hpcG1lbnRzKHZycClcclxuICAgICAgICAgICAgICAgICAgICAuc2V0U2VydmljZXModnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRSb3V0ZXModnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRTY2FsZSh2cnApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRQb2ludChwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsUG9pbnQgPSBwb2ludC5nZXRTY2FsZWQodGhpcy5zZik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSByZWFsUG9pbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5nZXRQb2ludEVsZW0ocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgZWxlbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogeSAtIDEyICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB4IC0gMTIgKyAncHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkU2VydmljZShzZXJ2aWNlKXtcclxuICAgICAgICAgICAgICAgIGlmICghc2VydmljZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qge2xvY2F0aW9uOiBsb2N9ID0gc2VydmljZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KGxvYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcnZpY2VDYXBhY2l0eShzZXJ2aWNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTZXJ2aWNlQ2FwYWNpdHkoc2VydmljZSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtsb2NhdGlvbjogbG9jLCBjYXBhY2l0eTogY2FwYWNpdHl9ID0gc2VydmljZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHlcIj48ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5LWxpbmtcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eS1kYXRhXCI+JHtjYXBhY2l0eX08L2Rpdj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJwID0gbG9jLmdldFNjYWxlZCh0aGlzLnNmKTtcclxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHJwLnkgKyAxMiArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogcnAueCAtIDEyICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkQ2xhc3MoJ3ZycC1wb2ludC1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkU2hpcG1lbnQoc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzaGlwbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BpY2t1cDogcGxvYywgZGVsaXZlcnk6IGRsb2N9ID0gc2hpcG1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChwbG9jKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQoZGxvYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdSb3V0ZShbcGxvYywgZGxvY10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTaGlwbWVudENhcGFjaXR5KHNoaXBtZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTaGlwbWVudENhcGFjaXR5KHNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmICghc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwaWNrdXA6IHBsb2MsIGNhcGFjaXR5OiBjYXBhY2l0eX0gPSBzaGlwbWVudDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHlcIj48ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5LWxpbmtcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eS1kYXRhXCI+JHtjYXBhY2l0eX08L2Rpdj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJwID0gcGxvYy5nZXRTY2FsZWQodGhpcy5zZik7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBycC55ICsgMTIgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJwLnggLSAxMiArICdweCdcclxuICAgICAgICAgICAgICAgIH0pLmFkZENsYXNzKCd2cnAtcG9pbnQtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRyYXdSb3V0ZShwb2ludHMsIGNvbG9yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgLjIwKSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZUNhcCA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChjb2xvciA/IFtdIDogWzgsIDhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsUG9pbnRzID0gcG9pbnRzLm1hcCgocG9pbnQpID0+IHBvaW50LmdldFNjYWxlZCh0aGlzLnNmKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8ocmVhbFBvaW50c1swXS54LCByZWFsUG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICAgICAgcmVhbFBvaW50cy5zbGljZSgxKS5mb3JFYWNoKChwb2ludCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50c1tpZHhdLmdldERpc3RhbmNlKHBvaW50c1tpZHggKyAxXSkudG9GaXhlZCgxKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtaWQgPSBwb2ludHNbaWR4XS5nZXRNaWRQb2ludChwb2ludHNbaWR4ICsgMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC1kaXN0YW5jZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC1wb2ludC1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0TmFtZShkaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvclN0eWxlID0geydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3IgfHwgJyM0NTVBNjQnfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KG1pZCkuY3NzKGNvbG9yU3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZHJhd1NvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Um91dGUoaXRlbS5wb2ludHMsIGl0ZW0uY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxvdFZSUCgpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZycCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzLmZvckVhY2goKHZoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQodmhjLnN0YXJ0LCBUWVBFUy52ZWhpY2xlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmhjLmVuZCAmJiAhdmhjLmVuZC5lcXVhbHModmhjLnN0YXJ0KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQodmhjLmVuZCwgVFlQRVMudmVoaWNsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cy5mb3JFYWNoKChzaHApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNoaXBtZW50KHNocCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZXMuZm9yRWFjaCgoc3ZjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJ2aWNlKHN2Yyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxvdFNvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiZXN0U29sdXRpb24gPSB0aGlzLnZycC5zb2x1dGlvbnMucmVkdWNlKChyZXMsIHNvbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzb2wuY29zdCA8IHJlcy5jb3N0ID8gc29sIDogcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwge2Nvc3Q6IE51bWJlci5NQVhfVkFMVUV9KTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGJlc3RTb2x1dGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdTb2x1dGlvbihiZXN0U29sdXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNldCgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwbWVudHMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCcudnJwLXBvaW50JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNmID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0U2NhbGUodnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICh2cnApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZoY01heCA9IHZycC52ZWhpY2xlcy5tYXAoKHZoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgc21heCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBlbWF4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZoYy5zdGFydExvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7eCwgeX0gPSB2aGMuc3RhcnRMb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNtYXggPSBNYXRoLm1heCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aGMuZW5kTG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHt4LCB5fSA9IHZoYy5lbmRMb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVtYXggPSBNYXRoLm1heCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLm1heChzbWF4LCBlbWF4KTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5zb3J0KChhLCBiKSA9PiBiIC0gYSlbMF0gfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ZjTWF4ID0gdnJwLnNlcnZpY2VzLm1hcCgoc3ZjKSA9PiBNYXRoLm1heChzdmMubG9jYXRpb24uY29vcmQueCwgc3ZjLmxvY2F0aW9uLmNvb3JkLnkpKS5zb3J0KChhLCBiKSA9PiBiIC0gYSlbMF0gfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hwTWF4ID0gdnJwLnNoaXBtZW50cy5tYXAoKHNocCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcG1heCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkbWF4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNocC5waWNrdXAubG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHt4LCB5fSA9IHNocC5waWNrdXAubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbWF4ID0gTWF0aC5tYXgoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hwLmRlbGl2ZXJ5LmxvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7eCwgeX0gPSBzaHAuZGVsaXZlcnkubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkbWF4ID0gTWF0aC5tYXgoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5tYXgocG1heCwgZG1heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuc29ydCgoYSwgYikgPT4gYiAtIGEpWzBdIHx8IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2YgPSB0aGlzLmNhbnZhcy53aWR0aCAvIE1hdGgubWF4KHZoY01heCwgc3ZjTWF4LCBzaHBNYXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGVsZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWUlBQbG90dGVyKGVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL3ZycC92cnAtcGxvdHRlci1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3OTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==