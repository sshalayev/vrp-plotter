webpackJsonp([0],{

/***/ 748:
/***/ (function(module, exports, __webpack_require__) {

/**
 * Created by User on 16.05.17.
 */

const angularResourceUtil = __webpack_require__(109);
// STYLES

angularResourceUtil.requireAll(__webpack_require__(749));
angularResourceUtil.requireAll(__webpack_require__(752));

const vrp = __webpack_require__(757);

const contextConstants = __webpack_require__(761);
contextConstants.keys().map(function (key) { contextConstants.apply(null, [key])(vrp) });

const contextControllers = __webpack_require__(764);
contextControllers.keys().map(function (key) { contextControllers.apply(null, [key])(vrp) });

const contextDirectives = __webpack_require__(766);
contextDirectives.keys().map(function (key) { contextDirectives.apply(null, [key])(vrp) });

const contextServices = __webpack_require__(769);
contextServices.keys().map(function (key) { contextServices.apply(null, [key])(vrp) });

const contextComponents = __webpack_require__(777);
contextComponents.keys().map(function (key) { contextComponents.apply(null, [key])(vrp) });








/***/ }),

/***/ 749:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./algo/colors.css": 810,
	"./dbscan/dbscan.css": 806,
	"./k-mean/k-mean.css": 808,
	"./tsp/route-draw.css": 750,
	"./vrp/vrp-draw.css": 751
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
webpackContext.id = 749;

/***/ }),

/***/ 750:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

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
                template: __webpack_require__(760),
                url: "/algo",
                onEnter: function ($rootScope) {
                    $rootScope.pageTitle = 'Routing algorithms demo';
                }
            });
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
/***/ (function(module, exports) {

module.exports = "<div class=\"algo-container\" layout=\"column\" layout-align=\"start center\" md-theme=\"algo\" ap-md-color=\"{'background-color': 'algo::primary'}\">\r\n    <md-tabs md-border-bottom md-selected=\"vm.activeTabIndex\">\r\n        <md-tab label=\"VRP\">\r\n            <div class=\"algo-wrapper\">\r\n                <vrp-draw></vrp-draw>\r\n            </div>\r\n        </md-tab>\r\n        <md-tab label=\"TSP\">\r\n            <div class=\"algo-wrapper\">\r\n                <route-draw></route-draw>\r\n            </div>\r\n        </md-tab>\r\n        <md-tab label=\"k-Means\">\r\n            <div class=\"algo-wrapper\">\r\n                <k-mean></k-mean>\r\n            </div>\r\n        </md-tab>\r\n        <md-tab label=\"DBSCAN\">\r\n            <div class=\"algo-wrapper\">\r\n                <dbscan></dbscan>\r\n            </div>\r\n        </md-tab>\r\n    </md-tabs>\r\n</div>"

/***/ }),

/***/ 761:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./api-requests.js": 762,
	"./md-constants.js": 763
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
webpackContext.id = 761;

/***/ }),

/***/ 762:
/***/ (function(module, exports) {

module.exports = function(vrp) {
    vrp.constant('apiRequestConfig', {

    });
};


/***/ }),

/***/ 763:
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

/***/ 764:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./route-controller.js": 765
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
webpackContext.id = 764;

/***/ }),

/***/ 765:
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

/***/ 766:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./ap-md-color.js": 767,
	"./resizer.js": 768
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
webpackContext.id = 766;

/***/ }),

/***/ 767:
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

/***/ 768:
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

/***/ 769:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./color-def-service.js": 770,
	"./date-utils-provider.js": 771,
	"./double-service.js": 772,
	"./event-emitter-service.js": 773,
	"./resize-sensor.js": 774,
	"./slash-param-serializer.js": 775,
	"./storage-provider.js": 776
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
webpackContext.id = 769;

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
    vrp.provider('dateUtils', dateUtilsProvider);
    dateUtilsProvider.$inject = [];

    function dateUtilsProvider() {
        const _dateRegExp = {
            humanDate: /^\d+([.\-\/\\])\d+[.\-\/\\]\d+$/,
            monthDate: /^[A-Za-z]+[\s\-_'.]+\d{2,4}$/,
            dotnetDate: /\/Date\([\d\-]+\)\//,
            unixDate: /^\d{13,}$/,
            isoDate: /^\d{4}-\d{2}-\d{2}T.*$/
        };
        const _dateFormat = {
            humanDate: ['DD.MM.YYYY', 'DD.MM.YY', 'DD-MM-YYYY', 'YYYY-MM-DD', 'DD-MM-YY', 'MM/DD/YY', 'MM/DD/YYYY'],
            monthDate: ['MMM YYYY', 'MMM YY', 'MMMM YYYY', 'MM.YY', 'MM/YY', 'MM.YYYY', 'MM/YYYY']
        };
        let _instance = null;

        class APDateUtils {
            constructor(){
                this._dateRegExp = _dateRegExp;
                this._dateFormat = _dateFormat;
            }
            get dateRegExp(){
                return this._dateRegExp
            }
            get dateFormat(){
                return this._dateFormat
            }
            get now(){
                return moment().startOf('D').toDate()
            }
            get prevMonth(){
                return moment().subtract(1, 'M').startOf('D').toDate()
            }
            get nextMonth(){
                moment().add(1, 'M').startOf('D').toDate()
            }
            get prevYear(){
                return moment().subtract(1, 'Y').startOf('D').toDate()
            }
            get nextYear(){
                moment().add(1, 'Y').startOf('D').toDate()
            }

            startOfMonth(month = new Date().getMonth(), year = new Date().getFullYear(), date = new Date()){
                if (month instanceof Date){
                    return moment(this.utcAsLocal(month)).startOf('M').startOf('D').toDate()
                }
                return moment([year, month, 15]).startOf('M').startOf('D').toDate()
            }
            endOfMonth (month = new Date().getMonth(), year = new Date().getFullYear(), date = new Date()){
                if (month instanceof Date){
                    return moment(this.utcAsLocal(month)).endOf('M').startOf('D').toDate()
                }
                return moment([year, month, 15]).endOf('M').startOf('D').toDate()
            }
            parseDate(input) {
                let output = false;
                if (!input){
                    return false;
                }
                if (typeof(input) === 'string'){
                    if (this.dateRegExp.humanDate.test(input)) {
                        output = moment(input, this.dateFormat.humanDate, true);
                    }
                    else if (this.dateRegExp.monthDate.test(input)){
                        output = moment(input.replace(/[^A-Za-z0-9]/g, ' ').replace(/\s+/g, ' ').trim(), this.dateFormat.monthDate, true);
                    }
                    else if (this.dateRegExp.unixDate.test(input)){
                        output = moment(parseInt(input))
                    }
                    else if (this.dateRegExp.dotnetDate.test(input) || this.dateRegExp.isoDate.test(input)){
                        output = moment(input)
                    }
                }
                else if (input instanceof Date || this.dateRegExp.unixDate.test(input.toString())){
                    output = moment(input);
                }

                return output && output.isValid() && output.toDate();
            }
            formatDate(date){
                return date ? moment(date).format('DD.MM.YY') : ''
            }
            getFormat(dateString = ''){
                dateString = dateString.trim();
                const formats = this.dateRegExp.humanDate.test(dateString) ? this.dateFormat.humanDate : this.dateFormat.monthDate;
                return formats.find((item) => dateString.length === item.length && moment(dateString, item, true).isValid());
            }
            findMonthName(part, format) {
                const mdate = moment([2000, 0, 1]);
                const monthFormat = format.replace(/[^M]/g,'');
                for (let i = 0; i < 12; i++){
                    let monthName = mdate.format(monthFormat);
                    if (monthName.toLowerCase().startsWith(part.toLowerCase())){
                        return monthName;
                    }
                    mdate.add(1, 'month');
                }
                return null;
            }
            localAsUtc(date){
                const tz = date.getTimezoneOffset();
                const tdate = new Date(date);
                if (date.getHours() === 0 && tz !== 0){
                    if (tz > 0){
                        tdate.setMinutes(-1 * tz);
                    } else {
                        tdate.setHours(this.getTZHours(date));
                    }
                }
                return tdate;
            }
            utcAsLocal(date){
                if (date.getHours() !== 0){
                    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
                }
                return new Date(date);
            }
            getTZHours(date){
                const tz = date.getTimezoneOffset();
                return tz > 0 ? 24 - Math.ceil(tz / 60) : Math.floor(Math.abs(tz) / 60);
            }
            sameDate(dateA, dateB){
                try {
                    return dateA.getFullYear() === dateB.getFullYear() &&
                        dateA.getMonth() === dateB.getMonth() &&
                        dateA.getDate() === dateB.getDate();
                } catch(e) {
                    return false;
                }
            }
            maxDate(...dates){
                const validDates = dates.filter((d) => !!d && d instanceof Date);
                return validDates.length ? validDates.reduce((res, date) => date >= res ? date : res, new Date(null)) : null;
            }
            minDate(...dates){
                const validDates = dates.filter((d) => !!d && d instanceof Date);
                return validDates.length ? validDates.reduce((res, date) => date <= res ? date : res, new Date()) : null;
            }
            isWeekend(date){
                const dayNum = date.getDay();
                return dayNum === 0 || dayNum === 6;
            }
            getDateFilter(start, end){
                return (d) => (!start || !start.getTime || d.getTime() >= start.getTime()) && (!end || !end.getTime || d.getTime() <= end.getTime())
            }
            getDateArray(start, end){
                const sd = moment.isMoment(start) ? start : moment(start);
                const ed = moment.isMoment(end) ? end : moment(end);
                const res = [];
                do {
                    res[res.length] = sd.toDate();
                    sd.add(1, 'd');
                } while (sd.isSameOrBefore(ed));
                return res;
            }
            transformObject(obj, isSrcLocal){
                const handler = isSrcLocal ? this.localAsUtc.bind(this) : this.utcAsLocal.bind(this);
                if (!obj){
                    return obj;
                }
                else if (typeof(obj) === 'string'){
                    let result;
                    try {
                        result = JSON.parse(obj);
                        return JSON.stringify(this.transformObject(result, isSrcLocal));
                    } catch(e) {
                        result = this.parseDate(obj);
                        return result ? handler(result) : obj;
                    }
                }
                else if (obj instanceof Date){
                    const date = this.parseDate(obj);
                    return date ? handler(date) : obj;
                }
                else if (Array.isArray(obj)){
                    return obj.map((item) => this.transformObject(item, isSrcLocal))
                }
                else if (typeof(obj) === 'object'){
                    return Object.keys(obj).reduce((res, key) => {
                        res[key] = this.transformObject(obj[key], isSrcLocal);
                        return res;
                    }, {})
                }
                else {
                    return obj;
                }
            }
        }

        _instance = new APDateUtils();
        Object.defineProperties(this, {
            utils: {
                get: () => _instance
            }
        });
        this.$get = function() {
            return _instance;
        };
    }
};

/***/ }),

/***/ 772:
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

/***/ 773:
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

/***/ 774:
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

/***/ 775:
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

/***/ 776:
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

/***/ 777:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./algo/bignumber-filter.js": 778,
	"./algo/genetic-factory.js": 779,
	"./algo/permutation-service.js": 780,
	"./algo/point-factory.js": 781,
	"./algo/sim-anneal-service.js": 782,
	"./api/api-request-provider.js": 783,
	"./api/slash-param-serializer.js": 784,
	"./api/tpl-query-serializer.js": 785,
	"./dbscan/dbscan-directive.js": 805,
	"./dbscan/dbscan-service.js": 804,
	"./k-mean/k-mean-directive.js": 786,
	"./k-mean/k-mean-service.js": 788,
	"./tsp/route-draw-directive.js": 789,
	"./tsp/route-plotter-service.js": 791,
	"./vrp/vrp-draw-directive.js": 792,
	"./vrp/vrp-plotter-service.js": 794
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
webpackContext.id = 777;

/***/ }),

/***/ 778:
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

/***/ 779:
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

/***/ 780:
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

            static getAllCombination(items, combSize){
                if (items.length < 1 || combSize < 1){
                    return []
                }
                if (combSize === 1){
                    return items.map((item) => [item]);
                }
                const _items = [...items];
                const combinations = [];
                while(_items.length > 1){
                    const a = _items.pop();
                    for(let b of _items){
                        combinations.push([a, b])
                    }
                }
                return combinations;
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

/***/ 781:
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
            getTransformed(xTransFn, yTransFn){
                const copy = new this.constructor(xTransFn(this.x), yTransFn(this.y));
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
                return `[x=${this.x}][y=${this.y}]`;
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

        this.getPoint = (x, y) => {
            return new RPoint(x, y);
        };
        this.getRandomPoints = (amount, maxX, maxY) => {
            const points = Immutable.Set().asMutable();
            while(points.size < amount){
                const pt = new RPoint(this.getRandomCoord(maxX), this.getRandomCoord(maxY));
                points.add(pt);
            }
            return points.valueSeq().toArray();
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

/***/ 782:
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

/***/ 783:
/***/ (function(module, exports) {

/*Provider to produce independent instances of API requests.
 * Usage: $aprequest.byName(name).send(params,data).then()
 * @name: name of config template
 * @params: object to serialize and add to the URL. By default serialized to URL string, but can be overriden with custom service
 *       by setting paramSerializer property in config template. slashParamSerializer converts params to /key1/value1/key2/value2/
 * @data: object passed within request body
 * */
module.exports = (vrp) => {
    vrp.provider('apiRequest', [function () {

        this.$get = ['$timeout', '$q', '$http', '$injector', function ($timeout, $q, $http, $injector) {
            const inject = this.$inject;
            class ApiRequest {
                constructor (obj) {
                    this._params = obj.params;
                    this._data = obj.data;
                    this._url = obj.url;
                    this._method = obj.method;
                    this._headers = {'Content-Type': 'application/json'};
                    if (obj.headers){
                        Object.assign(this._headers, obj.headers);
                    }
                    if (obj.paramSerializer){
                        this.paramSerializer = $injector.get(obj.paramSerializer);
                        if (this._params && this.paramSerializer){
                            this._url = this.paramSerializer(this._params, this._url)
                        }
                    }
                }

                get params(){
                    return !this.paramSerializer ? Object.assign({}, this._params) : null;
                }
                get data(){
                    return Object.assign({}, this._data);
                }
                get url(){
                    return this._url;
                }
                get method(){
                    return this._method;
                }
                get headers(){
                    return this._headers;
                }

                buildUrl(params){
                    if (!this.paramSerializer || !params){
                        return this._url;
                    }
                    return this.paramSerializer(params, this._url);
                }

                send (params, data, urlFormatArgs = null) {
                    if (this.params) {
                        angular.extend(params || {}, this.params)
                    }
                    if (this.data) {
                        angular.extend(data || {}, this.data)
                    }

                    if(urlFormatArgs) {
                        let format = {
                            create : (function() {
                                let regexp = /{([^{]+)}/g;

                                return function(str, o) {
                                    return str.replace(regexp, function(ignore, key){
                                        return !(key = o[key]) ? '' : key;
                                    });
                                }
                            })()
                        };

                        this.formattedUrl = format.create(this.url, urlFormatArgs);
                    } else {
                        this.formattedUrl = this.buildUrl(params);
                    }

                    const config = {
                        method: this.method,
                        headers: this.headers,
                        url: /^\/.+/.test(this.formattedUrl ) ? this.formattedUrl  : `/${this.formattedUrl }`,
                        params: this.paramSerializer ? null : params,
                        data: data
                    };
                    return $http(config).then((response) => {
                        return response;
                    });
                }

                sendMultipart(params, data){
                    const fd = new FormData();
                    Object.keys(data).forEach((key) => {
                        if (data[key] instanceof File){
                            fd.append(key, data[key], data[key].name)
                        } else {
                            fd.append(key, data[key]);
                        }
                    });
                    const url = params ? this.buildUrl(params) : this.url;
                    const config = {
                        headers: {'Content-Type': undefined},
                        transformRequest: angular.identity
                    };
                    return $http[this.method.toLowerCase()](url, fd, config);
                }
            }

            function byConfig (config) {
                return new ApiRequest(config);
            }

            function restful (params, method = 'GET', url = '/api/') {
                const config = {
                    method,
                    url,
                    params,
                    paramSerializer: 'slashParamSerializer'
                };
                return new ApiRequest(config);
            }

            return {
                getInstance: byConfig,
                getRestInstance: restful
            }
        }];
    }]);
};


/***/ }),

/***/ 784:
/***/ (function(module, exports) {

module.exports = (apfront) => {
    apfront.service('slashParamSerializer', function () {
        function serializeValue(v) {
            if (angular.isObject(v)) {
                return angular.isDate(v) ? v.toISOString() : angular.toJson(v);
            }
            return v;
        }

        return function paramSerializer(params, url) {
            if (!params) return url;

            return url + Object.keys(params).reduce((res, key) => {
                let pair = [key];
                if (params[key] && !angular.isObject(params[key])) {
                    pair.push(encodeURIComponent(params[key].toString())
                        .replace(/%20/g, '+')
                        .replace(/[\.\*\-\!\~\(\)]/g, '')
                        .replace(/\%\w{2}/g, ''));
                }
                return [...res, ...pair]
            }, []).join('/');
        }
    });
};


/***/ }),

/***/ 785:
/***/ (function(module, exports) {

module.exports = function(apfront) {
    apfront.service('tplQuerySerializer', tplQuerySerializer);
    tplQuerySerializer.$inject = ['$httpParamSerializer', 'dateUtils'];

    function tplQuerySerializer($httpParamSerializer, $apDateUtils) {
        return function (params, url) {
            if (!params) {
                return url
            }
            const query = {};
            let parsedUrl = Object.keys(params).reduce((res, key) => {
                if (!res.includes(':' + key)){
                    const date = $apDateUtils.parseDate(params[key]);
                    query[key] = date ? $apDateUtils.localAsUtc(date) : params[key];
                }
                return res.replace(':' + key, encodeURIComponent(params[key] ? params[key].toString() : '0'))
            }, url);

            return Object.keys(query).length ? parsedUrl + '?' + $httpParamSerializer(query) : parsedUrl;
        }
    }
};

/***/ }),

/***/ 786:
/***/ (function(module, exports, __webpack_require__) {

module.exports = (vrp) => {
    vrp.directive('kMean', kMeanDirective);
    kMeanDirective.$inject = [];

    function kMeanDirective(){
        return {
            restrict: 'E',
            scope: {},
            template: __webpack_require__(787),
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

/***/ 787:
/***/ (function(module, exports) {

module.exports = "<div layout=\"column\" ng-style=\"{'max-width': (ctrl.mapWidth + 160) + 'px'}\" flex>\r\n    <div class=\"algo-controls\" layout=\"row\" layout-align=\"space-between start\">\r\n        <div layout=\"column\" flex=\"45\">\r\n            <md-slider-container>\r\n                <span>Width</span>\r\n                <md-slider min=\"500\" max=\"1200\" ng-model=\"ctrl.mapWidth\" aria-label=\"map width\" class=\"md-warn\"></md-slider>\r\n                <md-input-container>\r\n                    <input type=\"number\" ng-model=\"ctrl.mapWidth\" aria-label=\"map width\" aria-controls=\"map-size-slider\">\r\n                </md-input-container>\r\n            </md-slider-container>\r\n            <md-slider-container>\r\n                <span>Height</span>\r\n                <md-slider min=\"500\" max=\"1200\" ng-model=\"ctrl.mapHeight\" aria-label=\"map height\" class=\"md-warn\"></md-slider>\r\n                <md-input-container>\r\n                    <input type=\"number\" ng-model=\"ctrl.mapHeight\" aria-label=\"map height\" aria-controls=\"map-size-slider\">\r\n                </md-input-container>\r\n            </md-slider-container>\r\n\r\n        </div>\r\n        <div layout=\"column\" flex=\"45\">\r\n            <md-slider-container>\r\n                <span>Points</span>\r\n                <md-slider min=\"4\" max=\"300\" ng-model=\"ctrl.pointCount\" aria-label=\"points\" class=\"md-warn\"></md-slider>\r\n                <md-input-container>\r\n                    <input type=\"number\" ng-model=\"ctrl.pointCount\" aria-label=\"points number\" aria-controls=\"points-number-slider\">\r\n                </md-input-container>\r\n            </md-slider-container>\r\n            <md-slider-container>\r\n                <span>Clusters</span>\r\n                <md-slider min=\"2\" max=\"10\" ng-model=\"ctrl.clusterCount\" aria-label=\"points\" class=\"md-warn\"></md-slider>\r\n                <md-input-container>\r\n                    <input type=\"number\" ng-model=\"ctrl.clusterCount\" aria-label=\"cluster count\">\r\n                </md-input-container>\r\n            </md-slider-container>\r\n            <div layout=\"row\" layout-align=\"center\">\r\n                <div flex></div>\r\n                <md-button ng-click=\"ctrl.rebuild()\" aria-label=\"rebuild\">New</md-button>\r\n                <md-button ng-click=\"ctrl.resetClusters()\" aria-label=\"reset clusters\">Reset</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.runClusteringStep()\" aria-label=\"run clustering step\">Next</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"algo-draw-scroller\">\r\n        <div class=\"k-mean-container\" ng-style=\"{'height': ctrl.mapHeight + 'px', 'width': ctrl.mapWidth + 'px'}\">\r\n            <div class=\"k-mean-layer\">\r\n                <div class=\"k-mean-point-wrapper\">\r\n                    <div ng-repeat=\"point in ctrl.kmean.points\" class=\"k-mean-point\" ng-style=\"{'top': point.y + 'px', 'left': point.x + 'px'}\"></div>\r\n                </div>\r\n            </div>\r\n            <div class=\"k-mean-layer\" ng-repeat=\"cluster in ctrl.kmean.clusters\" ng-style=\"{'z-index': (cluster.index + 1) * 10}\">\r\n                <div class=\"k-mean-point-wrapper\">\r\n                    <div class=\"k-mean-point\" ng-repeat=\"point in cluster.points\" ng-style=\"{'top': point.y + 'px', 'left': point.x + 'px', 'border-color': ctrl.colors[cluster.index]}\"></div>\r\n                    <div class=\"k-mean-point k-mean-centroid\"\r\n                         ng-style=\"{'top': cluster.centroid.y + 'px',\r\n                     'left': cluster.centroid.x + 'px',\r\n                     'border-color': ctrl.colors[cluster.index],\r\n                     'background-color': ctrl.colors[cluster.index]}\"></div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 788:
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

/***/ 789:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {module.exports = function(vrp){
    vrp.directive('routeDraw', routeDrawDirective);
    routeDrawDirective.$inject = ['$q', '$timeout'];

    function routeDrawDirective($q, $timeout){
        return {
            restrict: 'E',
            scope: {},
            template: __webpack_require__(790),
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

/***/ 790:
/***/ (function(module, exports) {

module.exports = "<div layout=\"column\" flex>\r\n    <div class=\"algo-controls\" layout=\"row\" layout-align=\"space-between start\">\r\n        <div layout=\"column\" flex=\"60\">\r\n            <div layout=\"row\" layout-align=\"space-between center\">\r\n                <div flex=\"45\">\r\n                    <md-switch ng-model=\"ctrl.usePreset\" aria-label=\"Use Preset\">\r\n                        Preset Points\r\n                    </md-switch>\r\n                </div>\r\n                <div flex=\"45\">\r\n                    <md-checkbox ng-model=\"ctrl.isClosed\" aria-label=\"Closed route\">\r\n                        Closed route\r\n                    </md-checkbox>\r\n                </div>\r\n            </div>\r\n            <div layout=\"column\" flex ng-if=\"ctrl.usePreset\">\r\n                <md-input-container class=\"md-block\">\r\n                    <label>Points</label>\r\n                    <textarea ng-model=\"ctrl.preset\" rows=\"3\" max-rows=\"3\"></textarea>\r\n                </md-input-container>\r\n            </div>\r\n            <div layout=\"column\" flex ng-if=\"!ctrl.usePreset\">\r\n                <md-slider-container>\r\n                    <span>Size</span>\r\n                    <md-slider min=\"500\" max=\"1200\" ng-model=\"ctrl.mapSize\" aria-label=\"red\" id=\"map-size-slider\"\r\n                               class=\"md-warn\">\r\n                    </md-slider>\r\n                    <md-input-container>\r\n                        <input type=\"number\" ng-model=\"ctrl.mapSize\" aria-label=\"map size\" aria-controls=\"map-size-slider\">\r\n                    </md-input-container>\r\n                </md-slider-container>\r\n                <md-slider-container>\r\n                    <span>Points</span>\r\n                    <md-slider min=\"4\" max=\"100\" ng-model=\"ctrl.pointsNumber\" aria-label=\"red\" id=\"points-number-slider\"\r\n                               class=\"md-warn\">\r\n                    </md-slider>\r\n                    <md-input-container>\r\n                        <input type=\"number\" ng-model=\"ctrl.pointsNumber\" aria-label=\"points number\" aria-controls=\"points-number-slider\">\r\n                    </md-input-container>\r\n                </md-slider-container>\r\n            </div>\r\n        </div>\r\n        <div layout=\"column\" flex=\"30\">\r\n            <div layout=\"row\" layout-align=\"space-between center\">\r\n                <div flex=\"45\">\r\n                    <md-input-container class=\"no-errors\">\r\n                        <label>max. T</label>\r\n                        <input type=\"number\" ng-model=\"ctrl.maxTemp\" aria-label=\"initial temperature\">\r\n                    </md-input-container>\r\n                </div>\r\n                <div flex=\"45\">\r\n                    <md-input-container class=\"no-errors\">\r\n                        <label>min. T</label>\r\n                        <input type=\"number\" ng-model=\"ctrl.minTemp\" aria-label=\"minimal temperature\">\r\n                    </md-input-container>\r\n                </div>\r\n            </div>\r\n            <div layout=\"row\" layout-align=\"space-between center\">\r\n                <div flex></div>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.rebuildRoute()\" aria-label=\"rebuild route\" ng-disabled=\"ctrl.simAnneal && ctrl.simAnneal.isRunning\">Repeat</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.rebuildRoute(true)\" aria-label=\"rebuild route\" ng-disabled=\"ctrl.simAnneal && ctrl.simAnneal.isRunning\">Search</md-button>\r\n            </div>\r\n            <div layout=\"row\" layout-align=\"center\">\r\n                <div flex></div>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.addSolution()\" aria-label=\"rebuild route\" ng-disabled=\"!ctrl.preset\">Add</md-button>\r\n                <md-button class=\"md-warn\" ng-click=\"ctrl.stopRouteSearch()\" aria-label=\"stop route search\" ng-disabled=\"!ctrl.simAnneal || !ctrl.simAnneal.isRunning\">Stop</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"algo-benchmark\"  ng-if=\"ctrl.bestRoute\">\r\n        <div>\r\n            <p><strong>Permutations</strong></p>\r\n            <p>{{ctrl.bestRoute.limit | pownumber}} / {{ctrl.bestRoute.total | pownumber}}</p>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div>\r\n            <p><strong>Duration</strong><br>{{ctrl.bestRoute.duration}}ms</p>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div>\r\n            <p><strong>Single sample</strong><br>{{ctrl.bestRoute.bench}}ms</p>\r\n        </div>\r\n        <md-divider></md-divider>\r\n        <div>\r\n            <p><strong>Est. calc. time</strong><br>{{ctrl.bestRoute.estimate.years() | pownumber}} years</p>\r\n        </div>\r\n        <div>\r\n            <p><strong>Start cost</strong><br>{{ctrl.bestRoute.cost}}</p>\r\n        </div>\r\n    </div>\r\n    <!--<div class=\"algo-best-route\" ng-if=\"ctrl.bestRoute && ctrl.pointsNumber < 10\">\r\n        <div ng-repeat=\"item in ctrl.bestRoute.state track by $index\">{{item.x}} x {{item.y}}</div>\r\n    </div>-->\r\n    <div class=\"algo-solutions\">\r\n        <div layout=\"row\"\r\n             layout-align=\"start center\"\r\n             ng-repeat=\"solution in ctrl.simAnneal.solutions\"\r\n             ng-mouseenter=\"ctrl.focusSolution($index)\"\r\n             ng-mouseleave=\"ctrl.focusSolution(-1)\" ng-click=\"ctrl.downloadSolution($index)\">\r\n            <div class=\"legend-bullet\" ng-style=\"{'background-color': solution.color}\"></div>\r\n            <div flex>{{solution.cost}}</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"algo-draw-scroller\">\r\n        <div class=\"route-draw-container\" ng-style=\"{'min-width': ctrl.mapSize + 'px', 'min-height': ctrl.mapSize + 'px'}\">\r\n            <div class=\"route-info\"></div>\r\n            <div class=\"route-solution\"\r\n                 ng-repeat=\"solution in ctrl.simAnneal.solutions\">\r\n                <canvas width=\"{{ctrl.mapSize}}\" height=\"{{ctrl.mapSize}}\" id=\"solution_{{$index}}\"></canvas>\r\n                <div ng-init=\"ctrl.drawSolution($index)\"></div>\r\n            </div>\r\n            <div class=\"route-current-search\">\r\n                <canvas width=\"{{ctrl.mapSize}}\" height=\"{{ctrl.mapSize}}\" id=\"current_search\"></canvas>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 791:
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

/***/ 792:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {module.exports = function(vrp) {
    vrp.directive('vrpDraw', vrpDrawDirective);
    vrpDrawDirective.$inject = [];

    function vrpDrawDirective() {
        return {
            restrict: 'E',
            scope: {},
            template: __webpack_require__(793),
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
        const setSummaryRequest = apiRequest.getInstance({
            url: '/api/vrp/all/:folder',
            method: 'GET',
            paramSerializer: 'tplQuerySerializer'
        });
        const fullSummaryRequest = apiRequest.getInstance({
            url: '/api/vrp/all',
            method: 'GET'
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
        // fullSummaryRequest.send().then((resp) => {
        //     const summary = Immutable.fromJS(resp.data);
        //     const columns = summary.keySeq().toArray().sort();
        //     const rows = summary.flatten(0).keySeq().toArray().sort();
        //     const grid = [['problem', ...columns]].concat(rows.map((row) => [row, ...columns.map((col) => summary.getIn([col, row]))]));
        //     console.log(grid.map((row) => row.join('\t')).join('\n'));
        // });

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),

/***/ 793:
/***/ (function(module, exports) {

module.exports = "<div layout=\"column\" flex>\r\n    <div class=\"vrp-controls\" layout=\"row\" layout-align=\"space-between start\">\r\n        <div layout=\"column\" flex=\"50\">\r\n            <md-switch ng-model=\"ctrl.filters.showCustomSolutionInput\" aria-label=\"Show Distances\">\r\n                Show custom solution input\r\n            </md-switch>\r\n            <div layout=\"row\" layout-align=\"space-between center\" ng-show=\"!ctrl.filters.showCustomSolutionInput\">\r\n                <md-input-container flex=\"45\">\r\n                    <label>Solution Set</label>\r\n                    <md-select name=\"solution_set\"\r\n                               placeholder=\"select solution set\"\r\n                               ng-model=\"ctrl.selectedSet\"\r\n                               ng-change=\"ctrl.handleSetChange()\">\r\n                        <md-option ng-value=\"item\" ng-repeat=\"item in ctrl.solutionSets\" ng-selected=\"$first\">{{item}}</md-option>\r\n                    </md-select>\r\n                </md-input-container>\r\n                <md-input-container flex=\"45\">\r\n                    <label>Solution</label>\r\n                    <md-select name=\"solution\"\r\n                               placeholder=\"select solution\"\r\n                               ng-model=\"ctrl.selectedSolution\"\r\n                               ng-change=\"ctrl.handleSolutionChange()\"\r\n                               ng-disabled=\"ctrl.solutionListLoading\">\r\n                        <md-option md-option-empty ng-value=\"null\">none</md-option>\r\n                        <md-option ng-value=\"item\" ng-repeat=\"item in ctrl.solutionList\">{{item}}</md-option>\r\n                    </md-select>\r\n                </md-input-container>\r\n            </div>\r\n            <md-input-container class=\"md-block\" ng-show=\"ctrl.filters.showCustomSolutionInput\">\r\n                <label>VRP</label>\r\n                <textarea ng-model=\"ctrl.vrpData\" rows=\"6\" max-rows=\"6\"></textarea>\r\n            </md-input-container>\r\n        </div>\r\n        <div layout=\"column\" flex=\"40\">\r\n            <div layout=\"column\" flex>\r\n                <md-switch ng-model=\"ctrl.filters.showDist\" aria-label=\"Show Distances\">\r\n                    Show distances\r\n                </md-switch>\r\n                <md-switch ng-model=\"ctrl.filters.showCapDemand\" aria-label=\"Show required capacity\">\r\n                    Show required capacity\r\n                </md-switch>\r\n            </div>\r\n            <div layout=\"row\">\r\n                <div flex></div>\r\n                <md-button ng-click=\"ctrl.plotter.reset()\" aria-label=\"reset\" ng-disabled=\"!ctrl.plotter\">Reset</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.plotSolution()\" aria-label=\"draw Solution\" ng-disabled=\"!ctrl.plotter\">Solution</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.plotVRP()\" aria-label=\"draw VRP\" ng-disabled=\"!ctrl.plotter\">VRP</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"vrp-cost\">\r\n        Solution cost: <span>{{ctrl.plotter && ctrl.plotter.best ? ctrl.plotter.best.cost : 0 | number : 2}}</span>\r\n    </div>\r\n    <div class=\"vrp-routes\">\r\n        <div class=\"vrp-routes-item\" ng-repeat=\"item in ctrl.routes\">\r\n            <div class=\"vrp-route-bullet\" ng-style=\"{'background-color': item.color}\"></div>\r\n            <div><strong>{{item.vehicleId}}</strong></div>\r\n            <div>d: {{item.distance | number : 2}}</div>\r\n            <div>c: {{item.capacity}}</div>\r\n        </div>\r\n    </div>\r\n    <div class=\"vrp-draw-scroller\">\r\n        <div class=\"vrp-draw-container\">\r\n            <div class=\"vrp-point-container\">\r\n                <canvas width=\"800\" height=\"800\"></canvas>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ }),

/***/ 794:
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
                this.cssStyle = [];
                this.name = null;
                this.cssStyle.push('vrp-point');
            }

            setCss(css){
                this.cssStyle.push(css);
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
                this.transX = (x) => x;
                this.transY = (y) => y;
                this.vrp = null;
                this.best = null;
            }

            get isEmpty(){
                return !this.vrp;
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
                        end: null,
                        rtp: vhc.returnToDepot
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
                        if (!vhc.returnToDepot && vhcLoc.end.equals(vhcLoc.start)){
                            vhcLoc.end = null;
                        }
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
                this.best = this.getBestSolution(vrp);
                this.best.routes.forEach((route, idx) => {
                    const vehicle = this.vehicles.get(route.vehicleId);
                    if (!vehicle){
                        return;
                    }
                    const summary = route.act.reduce((res, act) => {
                        const prevLoc = res.points[res.points.length - 1];
                        let loc = null;
                        let capacity = 0;
                        if (this.shipments.has(act.jobId)){
                            const shp = this.shipments.get(act.jobId);
                            loc = shp.delivery;
                            if (act.type.startsWith('pickup')){
                                loc = shp.pickup;
                                capacity = shp.capacity
                            }
                        }
                        if (this.services.has(act.jobId)){
                            const svc = this.services.get(act.jobId);
                            loc = svc.location;
                            capacity = svc.capacity;
                        }
                        res.points.push(loc);
                        res.distance += prevLoc.getDistance(loc);
                        res.capacity += capacity;
                        return res;
                    }, {
                        points: [vehicle.start],
                        distance: 0,
                        capacity: 0
                    });
                    if (vehicle.end){
                        summary.distance += summary.points[summary.points.length - 1].getDistance(vehicle.end);
                        summary.points.push(vehicle.end);
                    }
                    summary.color = this.getColor();
                    summary.vehicleId = route.vehicleId;

                    this.routes.set('route' + idx, summary)
                });
                this.best.unassignedJobs.forEach((job) => {
                    if (this.shipments.has(job.id)){
                        const shp = this.shipments.get(job.id);
                        shp.delivery.setCss('vrp-unassigned');
                        shp.pickup.setCss('vrp-unassigned');
                    }
                    if (this.services.has(job.id)){
                        const svc = this.services.get(job.id);
                        svc.location.setCss('vrp-unassigned');
                    }
                });
                return this;
            }
            setVRP(vrp = {}){
                this.vrp = vrp;
                return this.setScale(vrp)
                    .setVehicles(vrp)
                    .setShipments(vrp)
                    .setServices(vrp)
                    .setRoutes(vrp);
            }

            addPoint(point){
                const realPoint = point.getTransformed(this.transX, this.transY);
                const {x, y} = realPoint;
                const elem = this.getPointElem(point);
                elem.css({
                    top: y - 12 + 'px',
                    left: x - 12 + 'px'
                }).attr('id', point.toString());
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
                const rp = loc.getTransformed(this.transX, this.transY);
                elem.css({
                    top: rp.y + 10 + 'px',
                    left: rp.x - 10 + 'px'
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
                const rp = ploc.getTransformed(this.transX, this.transY);
                elem.css({
                    top: rp.y + 8 + 'px',
                    left: rp.x - 16 + 'px'
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

                const realPoints = points.map((point) => point.getTransformed(this.transX, this.transY));

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
                this.drawSolution();
            }

            reset(){
                this.shipments.clear();
                this.services.clear();
                this.vehicles.clear();
                this.routes.clear();
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.element.find('.vrp-point, .vrp-capacity').remove();
                this.transX = (x) => x;
                this.transY = (y) => y;
                this.vrp = null;
                this.best = null;
                return this;
            }

            setScale(vrp){
                if (vrp){
                    const vhcLocs = vrp.vehicles.reduce((res, vhc) => {
                        if (vhc.startLocation){
                            let {x, y} = vhc.startLocation.coord;
                            res[0].push(x);
                            res[1].push(y);
                        }
                        if (vhc.endLocation){
                            let {x, y} = vhc.endLocation.coord;
                            res[0].push(x);
                            res[1].push(y);
                        }
                        return res;
                    }, [[], []]);

                    const svcLocs = vrp.services.reduce((res, svc) => {
                        const {x, y} = svc.location.coord;
                        res[0].push(x);
                        res[1].push(y);
                        return res;
                    }, [[], []]);

                    const shpLocs = vrp.shipments.reduce((res, shp) => {
                        if (shp.pickup.location){
                            let {x, y} = shp.pickup.location.coord;
                            res[0].push(x);
                            res[1].push(y);
                        }
                        if (shp.delivery.location){
                            let {x, y} = shp.delivery.location.coord;
                            res[0].push(x);
                            res[1].push(y);
                        }
                        return res;
                    }, [[], []]);

                    const xMinMax = vhcLocs[0].concat(svcLocs[0]).concat(shpLocs[0]).sort((a, b) => a - b);
                    const yMinMax = vhcLocs[1].concat(svcLocs[1]).concat(shpLocs[1]).sort((a, b) => a - b);
                    const ymin = yMinMax.shift();
                    const ymax = yMinMax.pop();
                    const xmin = xMinMax.shift();
                    const xmax = xMinMax.pop();
                    const maxDim = Math.max((xmax-xmin), (ymax-ymin));

                    console.log([xmin, xmax, ymin, ymax, maxDim]);

                    // const vhcMax = vrp.vehicles.map((vhc) => {
                    //     let smax = 0;
                    //     let emax = 0;
                    //     if (vhc.startLocation){
                    //         let {x, y} = vhc.startLocation.coord;
                    //         smax = Math.max(x, y)
                    //     }
                    //     if (vhc.endLocation){
                    //         let {x, y} = vhc.endLocation.coord;
                    //         emax = Math.max(x, y)
                    //     }
                    //     return Math.max(smax, emax);
                    // }).sort((a, b) => b - a)[0] || 0;
                    //
                    // const svcMax = vrp.services.map((svc) => Math.max(svc.location.coord.x, svc.location.coord.y)).sort((a, b) => b - a)[0] || 0;
                    //
                    // const shpMax = vrp.shipments.map((shp) => {
                    //     let pmax = 0;
                    //     let dmax = 0;
                    //     if (shp.pickup.location){
                    //         let {x, y} = shp.pickup.location.coord;
                    //         pmax = Math.max(x, y)
                    //     }
                    //     if (shp.delivery.location){
                    //         let {x, y} = shp.delivery.location.coord;
                    //         dmax = Math.max(x, y)
                    //     }
                    //     return Math.max(pmax, dmax);
                    // }).sort((a, b) => b - a)[0] || 0;

                    const scale = this.canvas.width / maxDim;
                    console.log(`Scale: ${scale}`);
                    this.transX = (x) => {
                        return (x - xmin) * scale;
                    };
                    this.transY = (y) => {
                        return (y - ymin) * scale;
                    };
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

/***/ }),

/***/ 804:
/***/ (function(module, exports) {

module.exports = (vrp) => {
    vrp.service('$dbscan', dbscanService);
    dbscanService.$inject = ['$permutation'];

    function dbscanService($permutation){
        const _points = [];
        const _epsFactor = 0.6;
        const _sampleCount = 100;
        const _pointStatus = {
            NOISE: -1,
            NOT_VISITED: 0,
            PART_OF_CLUSTER: 1
        };

        Object.defineProperties(this, {
            points: {
                get: () => _points,
                set: (pts) => _points.splice(0, _points.length, ...pts)
            },
            epsFactor: {
                get: () => _epsFactor
            },
            sampleCount: {
                get: () => _sampleCount
            },
            pointStatus: {
                get: () => _pointStatus
            }
        });


        class Cluster {
            constructor() {
                this.points = Immutable.Set().asMutable();
            }

            get length(){
                return this.points.size
            }

            get size(){
                return this.points.size
            }

            addPoint(point) {
                this.points.add(point);
            }

            getPoints() {
                return this.points.valueSeq().toArray();
            }

            setPoints(points){
                points.forEach((pt) => {
                    this.points.add(pt)
                });
                return this;
            }

            equals(obj){
                if (obj === this) return true;
                if(!obj || obj.constructor !== this.constructor) return false;
                return this.points.size === obj.points.size
                    && this.points.every((pt) => obj.points.has(pt))
                    && obj.points.every((pt) => this.points.has(pt))
            }
        }

        class JSDBSCAN {
            constructor(eps, minPts = 2, distanceCalculator = JSDBSCAN.euclideanDistance) {
                this.eps = eps;
                this.minPts = minPts;
                this.distanceCalculator = distanceCalculator;
            }

            getEps() {
                return this.eps;
            }

            setEps(eps){
                this.eps = eps;
                return this;
            }

            getMinPts() {
                return this.minPts;
            }

            setMinPts(minPts) {
                this.minPts = minPts;
                return this;
            }

            cluster(pts){
                const start = Date.now();
                const clusters = [];
                const points = Immutable.Set(pts).asMutable();
                let counter = 0;
                while(points.size > 0 && ++counter < 1000){
                    const base = getRandomPoint(points.toArray());
                    const npoints = this.findNeighbors(base, points.delete(base));
                    if (npoints.length < this.minPts){
                        continue;
                    }
                    const cluster = new Cluster();
                    cluster.addPoint(base);
                    npoints.forEach((npt) => {
                        cluster.addPoint(npt);
                    });
                    clusters.push(cluster);
                }
                //console.log(`${this.eps};${clusters.length}`);
                return clusters;
            }

            findNeighbors(point, points){
                return points.toArray().reduce((res, pt) => {
                    if(this.distanceCalculator(pt, point) <= this.eps){
                        points.delete(pt);
                        res.push(pt);
                        res.push(...this.findNeighbors(pt, points));
                    }
                    return res;
                }, []);
            }

            static euclideanDistance (ptA, ptB) {
                return ptA.getDistance(ptB);
            };

        }

        this.cluster = (points, clusterCount, noiseRate = 0.3) => {
            matrixSample(points);
            let clusters = [];
            let fuse = 0;
            let eps = 2;
            let bestEps = 2;
            let max = -Infinity;

            while (eps < 600){
                if (fuse > 5){
                    break;
                }
                const dbscan = new JSDBSCAN(eps);
                const currentClusters = dbscan.cluster(points);
                const noise = 1 - (currentClusters.reduce((res, cluster) => res + cluster.size, 0) / points.length);
                const diff = Math.abs(clusterCount - currentClusters.length);
                if (max < currentClusters.length){
                    max = currentClusters.length;
                }
                if (currentClusters.length === 1 && max > currentClusters.length){
                    fuse++
                }
                if (diff < Math.abs(clusterCount - clusters.length) && noise < noiseRate){
                    clusters = currentClusters;
                    bestEps = eps;
                }

                eps += 0.5;
            }
            console.log('Best eps: ' + bestEps);
            return clusters;
        };

        function sample(points){
            const dists = $permutation.getAllCombination(points, 2).map((pair) => pair[0].getDistance(pair[1])).sort((a,b) => a - b);
            const mid = dists.slice(Math.round(dists.length / 3), Math.round(dists.length * 2 / 3));
            const dsum = dists.reduce((res, dist) => res + dist);
            const sum = mid.reduce((res, dist) => res + dist);
            const deps = ((dsum / dists.length) - dists[0]) * _epsFactor;
            const eps = ((sum / mid.length) - mid[0]) * _epsFactor;
            console.log(`fAVG: ${dsum / dists.length} fMIN: ${dists[0]} fMAX: ${dists[dists.length - 1]} fEPS: ${deps}`);
            console.log(`mAVG: ${sum / mid.length} mMIN: ${mid[0]} mMAX: ${mid[mid.length - 1]} mEPS: ${eps}`);
            return eps;
        }

        function matrixSample(points){
            const knn = 3;
            const matrix = Immutable.Map().asMutable();
            const dists = [];
            let maxDist = 0;
            let minDist = Number.MAX_VALUE;
            $permutation.getAllCombination(points, 2).forEach((pair) => {
                const [a, b] = pair;
                const dist = a.getDistance(b);
                dists.push(dist);
                matrix.setIn([a, b], dist);
                matrix.setIn([b, a], dist);
                if (dist > maxDist){
                    maxDist = dist;
                }
                if (dist < minDist){
                    minDist = dist;
                }
            });
            const vari = getVariance(dists, true);
            const stddev = Math.sqrt(vari);
            console.log('Variance: ' + vari);
            console.log('Deviation: ' + stddev);
        }

        function getRandomPoint(points){
            const rand = Math.floor(Math.random() * points.length);
            return points[rand];
        }

        function getMean(values){
            if (!values || !values.length) return NaN;
            return values.reduce((r, v) => r + v, 0) / values.length;
        }

        function getVariance(values, bias){
            if (!values || !values.length) return NaN;

            const mean = getMean(values);
            const n = values.length - +bias;
            return values.reduce((r, v) => r + Math.pow(v - mean, 2), 0) / n
        }
    }
};

/***/ }),

/***/ 805:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {module.exports = (vrp) => {
    vrp.directive('dbscan', dbscanDirective);
    dbscanDirective.$inject = [];

    function dbscanDirective(){
        return {
            restrict: 'E',
            scope: {},
            template: __webpack_require__(811),
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
        this.pointCount = 300;
        this.clusterCount = 5;
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
            this.clusters = $dbscan.cluster(this.points, this.clusterCount).filter((cluster) => cluster.getPoints().length > 1);
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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43)))

/***/ }),

/***/ 806:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 808:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 810:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 811:
/***/ (function(module, exports) {

module.exports = "<div layout=\"column\" flex>\r\n    <div class=\"dbs-controls\" layout=\"row\" layout-align=\"space-between start\">\r\n        <div layout=\"column\" flex=\"40\">\r\n            <md-switch ng-model=\"ctrl.randomPoints\" aria-label=\"use random points\">\r\n                random points\r\n            </md-switch>\r\n            <div layout=\"column\" ng-show=\"ctrl.randomPoints\">\r\n                <md-slider-container>\r\n                    <span>Points</span>\r\n                    <md-slider min=\"20\" max=\"500\" ng-model=\"ctrl.pointCount\" aria-label=\"point count\" class=\"md-warn\"></md-slider>\r\n                    <md-input-container>\r\n                        <input type=\"number\" ng-model=\"ctrl.pointCount\" aria-label=\"point count\">\r\n                    </md-input-container>\r\n                </md-slider-container>\r\n                <md-slider-container>\r\n                    <span>Clusters</span>\r\n                    <md-slider min=\"2\" max=\"20\" ng-model=\"ctrl.clusterCount\" aria-label=\"cluster count\" class=\"md-warn\"></md-slider>\r\n                    <md-input-container>\r\n                        <input type=\"number\" ng-model=\"ctrl.clusterCount\" aria-label=\"point count\">\r\n                    </md-input-container>\r\n                </md-slider-container>\r\n            </div>\r\n            <md-input-container class=\"md-block\" ng-show=\"!ctrl.randomPoints\">\r\n                <label>Points</label>\r\n                <textarea ng-model=\"ctrl.rawPoints\" rows=\"6\" max-rows=\"6\"></textarea>\r\n            </md-input-container>\r\n        </div>\r\n        <div layout=\"column\" flex=\"50\">\r\n            <div flex></div>\r\n            <div layout=\"row\">\r\n                <md-button ng-click=\"ctrl.resetPoints()\" aria-label=\"reset\">Reset</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.resetClusters()\" aria-label=\"cluster points\">Cluster</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"dbs-draw-scroller\">\r\n        <div class=\"dbs-draw-container\">\r\n            <div class=\"dbs-point-container\">\r\n                <div class=\"dbs-point\"\r\n                     ng-repeat=\"point in ctrl.points\"\r\n                     id=\"{{point.toString()}}\"\r\n                     ng-style=\"{'top': point.y + 'px', 'left': point.x + 'px'}\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ })

},[748]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMgLmNzcyQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLWRyYXcuY3NzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy5jc3MiLCJ3ZWJwYWNrOi8vLy4vY3NzIC5jc3MkIiwid2VicGFjazovLy8uL2Nzcy9hZ2dyaWQuY3NzIiwid2VicGFjazovLy8uL2Nzcy9jaGVja2lvLmNzcyIsIndlYnBhY2s6Ly8vLi9jc3MvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vY3NzL3Njcm9sbHBhZC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yZXNvdXJjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yZXNvdXJjZS9hbmd1bGFyLXJlc291cmNlLmpzIiwid2VicGFjazovLy8uL2FwcC90ZW1wbGF0ZXMvYWxnby5odG1sIiwid2VicGFjazovLy8uL2FwcC9jb25zdGFudHMgLitcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnN0YW50cy9hcGktcmVxdWVzdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnN0YW50cy9tZC1jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnRyb2xsZXJzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9jb250cm9sbGVycy9yb3V0ZS1jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL2FwLW1kLWNvbG9yLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL3Jlc2l6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9jb2xvci1kZWYtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvZGF0ZS11dGlscy1wcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvZG91YmxlLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzL2V2ZW50LWVtaXR0ZXItc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvcmVzaXplLXNlbnNvci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvc2xhc2gtcGFyYW0tc2VyaWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvc3RvcmFnZS1wcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cyAuK1xcLmpzJCIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL2JpZ251bWJlci1maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYWxnby9nZW5ldGljLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYWxnby9wZXJtdXRhdGlvbi1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2FsZ28vcG9pbnQtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL3NpbS1hbm5lYWwtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hcGkvYXBpLXJlcXVlc3QtcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXBpL3NsYXNoLXBhcmFtLXNlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXBpL3RwbC1xdWVyeS1zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvay1tZWFuL2stbWVhbi1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3RzcC9yb3V0ZS1kcmF3LWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtcGxvdHRlci1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvdnJwL3ZycC1kcmF3LXRwbC5odG1sIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtcGxvdHRlci1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2Ric2Nhbi9kYnNjYW4tc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9rLW1lYW4vay1tZWFuLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL2NvbG9ycy5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvZGJzY2FuL2Ric2Nhbi10cGwuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsbUJBQU8sQ0FBQyxHQUFpQztBQUNyRTs7QUFFQSwrQkFBK0Isd0JBQStDO0FBQzlFLCtCQUErQix3QkFBMkM7O0FBRTFFLFlBQVksbUJBQU8sQ0FBQyxHQUFVOztBQUU5Qix5QkFB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQzdJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLE9BQU8sTUFBTSxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUk7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUM3SEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBLEU7Ozs7Ozs7O0FDbEVBLHlDOzs7Ozs7O0FDQUEseUM7Ozs7Ozs7QUNBQSx5Qzs7Ozs7OztBQ0FBLDZ3RUFBNndFLGtCQUFrQix1Q0FBdUMsOENBQThDLDBFIiwiZmlsZSI6ImFwcC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBVc2VyIG9uIDE2LjA1LjE3LlxyXG4gKi9cclxuXHJcbmNvbnN0IGFuZ3VsYXJSZXNvdXJjZVV0aWwgPSByZXF1aXJlKCd3ZWJwYWNrLWFuZ3VsYXItcmVzb3VyY2UtcGx1Z2luJyk7XHJcbi8vIFNUWUxFU1xyXG5cclxuYW5ndWxhclJlc291cmNlVXRpbC5yZXF1aXJlQWxsKHJlcXVpcmUuY29udGV4dChcIi4vY29tcG9uZW50cy9cIiwgdHJ1ZSwgLy5jc3MkLykpO1xyXG5hbmd1bGFyUmVzb3VyY2VVdGlsLnJlcXVpcmVBbGwocmVxdWlyZS5jb250ZXh0KFwiLi8uLi9jc3MvXCIsIHRydWUsIC8uY3NzJC8pKTtcclxuXHJcbmNvbnN0IHZycCA9IHJlcXVpcmUoJy4vYXBwLmpzJyk7XHJcblxyXG5jb25zdCBjb250ZXh0Q29uc3RhbnRzID0gcmVxdWlyZS5jb250ZXh0KCcuL2NvbnN0YW50cy8nLCB0cnVlLCAvLitcXC5qcyQvKTtcclxuY29udGV4dENvbnN0YW50cy5rZXlzKCkubWFwKGZ1bmN0aW9uIChrZXkpIHsgY29udGV4dENvbnN0YW50cy5hcHBseShudWxsLCBba2V5XSkodnJwKSB9KTtcclxuXHJcbmNvbnN0IGNvbnRleHRDb250cm9sbGVycyA9IHJlcXVpcmUuY29udGV4dCgnLi9jb250cm9sbGVycy8nLCB0cnVlLCAvLitcXC5qcyQvKTtcclxuY29udGV4dENvbnRyb2xsZXJzLmtleXMoKS5tYXAoZnVuY3Rpb24gKGtleSkgeyBjb250ZXh0Q29udHJvbGxlcnMuYXBwbHkobnVsbCwgW2tleV0pKHZycCkgfSk7XHJcblxyXG5jb25zdCBjb250ZXh0RGlyZWN0aXZlcyA9IHJlcXVpcmUuY29udGV4dCgnLi9kaXJlY3RpdmVzLycsIHRydWUsIC8uK1xcLmpzJC8pO1xyXG5jb250ZXh0RGlyZWN0aXZlcy5rZXlzKCkubWFwKGZ1bmN0aW9uIChrZXkpIHsgY29udGV4dERpcmVjdGl2ZXMuYXBwbHkobnVsbCwgW2tleV0pKHZycCkgfSk7XHJcblxyXG5jb25zdCBjb250ZXh0U2VydmljZXMgPSByZXF1aXJlLmNvbnRleHQoJy4vc2VydmljZXMvJywgdHJ1ZSwgLy4rXFwuanMkLyk7XHJcbmNvbnRleHRTZXJ2aWNlcy5rZXlzKCkubWFwKGZ1bmN0aW9uIChrZXkpIHsgY29udGV4dFNlcnZpY2VzLmFwcGx5KG51bGwsIFtrZXldKSh2cnApIH0pO1xyXG5cclxuY29uc3QgY29udGV4dENvbXBvbmVudHMgPSByZXF1aXJlLmNvbnRleHQoJy4vY29tcG9uZW50cy8nLCB0cnVlLCAvLitcXC5qcyQvKTtcclxuY29udGV4dENvbXBvbmVudHMua2V5cygpLm1hcChmdW5jdGlvbiAoa2V5KSB7IGNvbnRleHRDb21wb25lbnRzLmFwcGx5KG51bGwsIFtrZXldKSh2cnApIH0pO1xyXG5cclxuXHJcblxyXG5cclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hbGdvL2NvbG9ycy5jc3NcIjogODEwLFxuXHRcIi4vZGJzY2FuL2Ric2Nhbi5jc3NcIjogODA2LFxuXHRcIi4vay1tZWFuL2stbWVhbi5jc3NcIjogODA4LFxuXHRcIi4vdHNwL3JvdXRlLWRyYXcuY3NzXCI6IDc1MCxcblx0XCIuL3ZycC92cnAtZHJhdy5jc3NcIjogNzUxXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNzQ5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMgLmNzcyRcbi8vIG1vZHVsZSBpZCA9IDc0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLWRyYXcuY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDc1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWdncmlkLmNzc1wiOiA3NTMsXG5cdFwiLi9jaGVja2lvLmNzc1wiOiA3NTQsXG5cdFwiLi9tYWluLmNzc1wiOiA3NTUsXG5cdFwiLi9zY3JvbGxwYWQuY3NzXCI6IDc1NlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDc1MjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NzcyAuY3NzJFxuLy8gbW9kdWxlIGlkID0gNzUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jc3MvYWdncmlkLmNzc1xuLy8gbW9kdWxlIGlkID0gNzUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jc3MvY2hlY2tpby5jc3Ncbi8vIG1vZHVsZSBpZCA9IDc1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY3NzL21haW4uY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Nzcy9zY3JvbGxwYWQuY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbmNvbnN0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmNvbnN0IG1hdGggPSByZXF1aXJlKCdtYXRoanMnKTtcclxuXHJcbm1hdGguY29uZmlnKHtudW1iZXI6ICdCaWdOdW1iZXInLCBwcmVjaXNpb246IDY0fSk7XHJcblxyXG5jb25zdCB2cnAgPSBhbmd1bGFyLm1vZHVsZSgnVlJQUGxvdHRlcicsIFtcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItdWktcm91dGVyJyksXHJcbiAgICByZXF1aXJlKCdhbmd1bGFyLWFuaW1hdGUnKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItcmVzb3VyY2UnKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItbWVzc2FnZXMnKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItYXJpYScpLFxyXG4gICAgcmVxdWlyZSgnYW5ndWxhci1tYXRlcmlhbCcpLFxyXG4gICAgcmVxdWlyZSgnYW5ndWxhci1maWx0ZXInKVxyXG5dKTtcclxuXHJcbnZycC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLCAnJG1kVGhlbWluZ1Byb3ZpZGVyJyxcclxuICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgcmVxdWlyZUJhc2U6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgncmVkJylcclxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ29yYW5nZScpXHJcbiAgICAgICAgICAgIC53YXJuUGFsZXR0ZSgncHVycGxlJyk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnYWxnbycpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKVxyXG4gICAgICAgICAgICAud2FyblBhbGV0dGUoJ3BpbmsnKTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FsZ28nKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKFwiYWxnb1wiLCB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUm91dGVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9hbGdvLmh0bWwnKSxcclxuICAgICAgICAgICAgICAgIHVybDogXCIvYWxnb1wiLFxyXG4gICAgICAgICAgICAgICAgb25FbnRlcjogZnVuY3Rpb24gKCRyb290U2NvcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnBhZ2VUaXRsZSA9ICdSb3V0aW5nIGFsZ29yaXRobXMgZGVtbyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfV0pO1xyXG5cclxudnJwLnJ1bihcclxuICAgIFsnJHJvb3RTY29wZScsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJyxcclxuICAgICAgICBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kc3RhdGUgPSAkc3RhdGU7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIHRvLCB0b1BhcmFtcywgZnJvbSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5wcmVTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBmcm9tLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBmcm9tLnVybCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGZyb21QYXJhbXNcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmN1clN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0by51cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB0b1BhcmFtc1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG4pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHZycDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDc1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2FuZ3VsYXItcmVzb3VyY2UnKTtcbm1vZHVsZS5leHBvcnRzID0gJ25nUmVzb3VyY2UnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yZXNvdXJjZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQGxpY2Vuc2UgQW5ndWxhckpTIHYxLjcuOFxuICogKGMpIDIwMTAtMjAxOCBHb29nbGUsIEluYy4gaHR0cDovL2FuZ3VsYXJqcy5vcmdcbiAqIExpY2Vuc2U6IE1JVFxuICovXG4oZnVuY3Rpb24od2luZG93LCBhbmd1bGFyKSB7J3VzZSBzdHJpY3QnO1xuXG52YXIgJHJlc291cmNlTWluRXJyID0gYW5ndWxhci4kJG1pbkVycignJHJlc291cmNlJyk7XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgYW5kIHJlZ2V4IHRvIGxvb2t1cCBhIGRvdHRlZCBwYXRoIG9uIGFuIG9iamVjdFxuLy8gc3RvcHBpbmcgYXQgdW5kZWZpbmVkL251bGwuICBUaGUgcGF0aCBtdXN0IGJlIGNvbXBvc2VkIG9mIEFTQ0lJXG4vLyBpZGVudGlmaWVycyAoanVzdCBsaWtlICRwYXJzZSlcbnZhciBNRU1CRVJfTkFNRV9SRUdFWCA9IC9eKFxcLlthLXpBLVpfJEBdWzAtOWEtekEtWl8kQF0qKSskLztcblxuZnVuY3Rpb24gaXNWYWxpZERvdHRlZFBhdGgocGF0aCkge1xuICByZXR1cm4gKHBhdGggIT0gbnVsbCAmJiBwYXRoICE9PSAnJyAmJiBwYXRoICE9PSAnaGFzT3duUHJvcGVydHknICYmXG4gICAgICBNRU1CRVJfTkFNRV9SRUdFWC50ZXN0KCcuJyArIHBhdGgpKTtcbn1cblxuZnVuY3Rpb24gbG9va3VwRG90dGVkUGF0aChvYmosIHBhdGgpIHtcbiAgaWYgKCFpc1ZhbGlkRG90dGVkUGF0aChwYXRoKSkge1xuICAgIHRocm93ICRyZXNvdXJjZU1pbkVycignYmFkbWVtYmVyJywgJ0RvdHRlZCBtZW1iZXIgcGF0aCBcIkB7MH1cIiBpcyBpbnZhbGlkLicsIHBhdGgpO1xuICB9XG4gIHZhciBrZXlzID0gcGF0aC5zcGxpdCgnLicpO1xuICBmb3IgKHZhciBpID0gMCwgaWkgPSBrZXlzLmxlbmd0aDsgaSA8IGlpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKG9iaik7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIG9iaiA9IChvYmogIT09IG51bGwpID8gb2JqW2tleV0gOiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBzaGFsbG93IGNvcHkgb2YgYW4gb2JqZWN0IGFuZCBjbGVhciBvdGhlciBmaWVsZHMgZnJvbSB0aGUgZGVzdGluYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0NsZWFyQW5kQ29weShzcmMsIGRzdCkge1xuICBkc3QgPSBkc3QgfHwge307XG5cbiAgYW5ndWxhci5mb3JFYWNoKGRzdCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIGRlbGV0ZSBkc3Rba2V5XTtcbiAgfSk7XG5cbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhKGtleS5jaGFyQXQoMCkgPT09ICckJyAmJiBrZXkuY2hhckF0KDEpID09PSAnJCcpKSB7XG4gICAgICBkc3Rba2V5XSA9IHNyY1trZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkc3Q7XG59XG5cbi8qKlxuICogQG5nZG9jIG1vZHVsZVxuICogQG5hbWUgbmdSZXNvdXJjZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGBuZ1Jlc291cmNlYCBtb2R1bGUgcHJvdmlkZXMgaW50ZXJhY3Rpb24gc3VwcG9ydCB3aXRoIFJFU1RmdWwgc2VydmljZXNcbiAqIHZpYSB0aGUgJHJlc291cmNlIHNlcnZpY2UuXG4gKlxuICogU2VlIHtAbGluayBuZ1Jlc291cmNlLiRyZXNvdXJjZVByb3ZpZGVyfSBhbmQge0BsaW5rIG5nUmVzb3VyY2UuJHJlc291cmNlfSBmb3IgdXNhZ2UuXG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgcHJvdmlkZXJcbiAqIEBuYW1lICRyZXNvdXJjZVByb3ZpZGVyXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVXNlIGAkcmVzb3VyY2VQcm92aWRlcmAgdG8gY2hhbmdlIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSB7QGxpbmsgbmdSZXNvdXJjZS4kcmVzb3VyY2V9XG4gKiBzZXJ2aWNlLlxuICpcbiAqICMjIERlcGVuZGVuY2llc1xuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1Jlc291cmNlIH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cbiAqXG4gKi9cblxuLyoqXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5hbWUgJHJlc291cmNlXG4gKiBAcmVxdWlyZXMgJGh0dHBcbiAqIEByZXF1aXJlcyBuZy4kbG9nXG4gKiBAcmVxdWlyZXMgJHFcbiAqIEByZXF1aXJlcyBuZy4kdGltZW91dFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQSBmYWN0b3J5IHdoaWNoIGNyZWF0ZXMgYSByZXNvdXJjZSBvYmplY3QgdGhhdCBsZXRzIHlvdSBpbnRlcmFjdCB3aXRoXG4gKiBbUkVTVGZ1bF0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9SZXByZXNlbnRhdGlvbmFsX1N0YXRlX1RyYW5zZmVyKSBzZXJ2ZXItc2lkZSBkYXRhIHNvdXJjZXMuXG4gKlxuICogVGhlIHJldHVybmVkIHJlc291cmNlIG9iamVjdCBoYXMgYWN0aW9uIG1ldGhvZHMgd2hpY2ggcHJvdmlkZSBoaWdoLWxldmVsIGJlaGF2aW9ycyB3aXRob3V0XG4gKiB0aGUgbmVlZCB0byBpbnRlcmFjdCB3aXRoIHRoZSBsb3cgbGV2ZWwge0BsaW5rIG5nLiRodHRwICRodHRwfSBzZXJ2aWNlLlxuICpcbiAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSZXNvdXJjZSBgbmdSZXNvdXJjZWB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gKlxuICogQnkgZGVmYXVsdCwgdHJhaWxpbmcgc2xhc2hlcyB3aWxsIGJlIHN0cmlwcGVkIGZyb20gdGhlIGNhbGN1bGF0ZWQgVVJMcyxcbiAqIHdoaWNoIGNhbiBwb3NlIHByb2JsZW1zIHdpdGggc2VydmVyIGJhY2tlbmRzIHRoYXQgZG8gbm90IGV4cGVjdCB0aGF0XG4gKiBiZWhhdmlvci4gIFRoaXMgY2FuIGJlIGRpc2FibGVkIGJ5IGNvbmZpZ3VyaW5nIHRoZSBgJHJlc291cmNlUHJvdmlkZXJgIGxpa2VcbiAqIHRoaXM6XG4gKlxuICogYGBganNcbiAgICAgYXBwLmNvbmZpZyhbJyRyZXNvdXJjZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJlc291cmNlUHJvdmlkZXIpIHtcbiAgICAgICAvLyBEb24ndCBzdHJpcCB0cmFpbGluZyBzbGFzaGVzIGZyb20gY2FsY3VsYXRlZCBVUkxzXG4gICAgICAgJHJlc291cmNlUHJvdmlkZXIuZGVmYXVsdHMuc3RyaXBUcmFpbGluZ1NsYXNoZXMgPSBmYWxzZTtcbiAgICAgfV0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBBIHBhcmFtZXRlcml6ZWQgVVJMIHRlbXBsYXRlIHdpdGggcGFyYW1ldGVycyBwcmVmaXhlZCBieSBgOmAgYXMgaW5cbiAqICAgYC91c2VyLzp1c2VybmFtZWAuIElmIHlvdSBhcmUgdXNpbmcgYSBVUkwgd2l0aCBhIHBvcnQgbnVtYmVyIChlLmcuXG4gKiAgIGBodHRwOi8vZXhhbXBsZS5jb206ODA4MC9hcGlgKSwgaXQgd2lsbCBiZSByZXNwZWN0ZWQuXG4gKlxuICogICBJZiB5b3UgYXJlIHVzaW5nIGEgdXJsIHdpdGggYSBzdWZmaXgsIGp1c3QgYWRkIHRoZSBzdWZmaXgsIGxpa2UgdGhpczpcbiAqICAgYCRyZXNvdXJjZSgnaHR0cDovL2V4YW1wbGUuY29tL3Jlc291cmNlLmpzb24nKWAgb3IgYCRyZXNvdXJjZSgnaHR0cDovL2V4YW1wbGUuY29tLzppZC5qc29uJylgXG4gKiAgIG9yIGV2ZW4gYCRyZXNvdXJjZSgnaHR0cDovL2V4YW1wbGUuY29tL3Jlc291cmNlLzpyZXNvdXJjZV9pZC46Zm9ybWF0JylgXG4gKiAgIElmIHRoZSBwYXJhbWV0ZXIgYmVmb3JlIHRoZSBzdWZmaXggaXMgZW1wdHksIDpyZXNvdXJjZV9pZCBpbiB0aGlzIGNhc2UsIHRoZW4gdGhlIGAvLmAgd2lsbCBiZVxuICogICBjb2xsYXBzZWQgZG93biB0byBhIHNpbmdsZSBgLmAuICBJZiB5b3UgbmVlZCB0aGlzIHNlcXVlbmNlIHRvIGFwcGVhciBhbmQgbm90IGNvbGxhcHNlIHRoZW4geW91XG4gKiAgIGNhbiBlc2NhcGUgaXQgd2l0aCBgL1xcLmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q9fSBwYXJhbURlZmF1bHRzIERlZmF1bHQgdmFsdWVzIGZvciBgdXJsYCBwYXJhbWV0ZXJzLiBUaGVzZSBjYW4gYmUgb3ZlcnJpZGRlbiBpblxuICogICBgYWN0aW9uc2AgbWV0aG9kcy4gSWYgYSBwYXJhbWV0ZXIgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaXQgd2lsbCBiZSBjYWxsZWQgZXZlcnkgdGltZVxuICogICBhIHBhcmFtIHZhbHVlIG5lZWRzIHRvIGJlIG9idGFpbmVkIGZvciBhIHJlcXVlc3QgKHVubGVzcyB0aGUgcGFyYW0gd2FzIG92ZXJyaWRkZW4pLiBUaGVcbiAqICAgZnVuY3Rpb24gd2lsbCBiZSBwYXNzZWQgdGhlIGN1cnJlbnQgZGF0YSB2YWx1ZSBhcyBhbiBhcmd1bWVudC5cbiAqXG4gKiAgIEVhY2gga2V5IHZhbHVlIGluIHRoZSBwYXJhbWV0ZXIgb2JqZWN0IGlzIGZpcnN0IGJvdW5kIHRvIHVybCB0ZW1wbGF0ZSBpZiBwcmVzZW50IGFuZCB0aGVuIGFueVxuICogICBleGNlc3Mga2V5cyBhcmUgYXBwZW5kZWQgdG8gdGhlIHVybCBzZWFyY2ggcXVlcnkgYWZ0ZXIgdGhlIGA/YC5cbiAqXG4gKiAgIEdpdmVuIGEgdGVtcGxhdGUgYC9wYXRoLzp2ZXJiYCBhbmQgcGFyYW1ldGVyIGB7dmVyYjogJ2dyZWV0Jywgc2FsdXRhdGlvbjogJ0hlbGxvJ31gIHJlc3VsdHMgaW5cbiAqICAgVVJMIGAvcGF0aC9ncmVldD9zYWx1dGF0aW9uPUhlbGxvYC5cbiAqXG4gKiAgIElmIHRoZSBwYXJhbWV0ZXIgdmFsdWUgaXMgcHJlZml4ZWQgd2l0aCBgQGAsIHRoZW4gdGhlIHZhbHVlIGZvciB0aGF0IHBhcmFtZXRlciB3aWxsIGJlXG4gKiAgIGV4dHJhY3RlZCBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnR5IG9uIHRoZSBgZGF0YWAgb2JqZWN0IChwcm92aWRlZCB3aGVuIGNhbGxpbmcgYWN0aW9uc1xuICogICB3aXRoIGEgcmVxdWVzdCBib2R5KS5cbiAqICAgRm9yIGV4YW1wbGUsIGlmIHRoZSBgZGVmYXVsdFBhcmFtYCBvYmplY3QgaXMgYHtzb21lUGFyYW06ICdAc29tZVByb3AnfWAgdGhlbiB0aGUgdmFsdWUgb2ZcbiAqICAgYHNvbWVQYXJhbWAgd2lsbCBiZSBgZGF0YS5zb21lUHJvcGAuXG4gKiAgIE5vdGUgdGhhdCB0aGUgcGFyYW1ldGVyIHdpbGwgYmUgaWdub3JlZCwgd2hlbiBjYWxsaW5nIGEgXCJHRVRcIiBhY3Rpb24gbWV0aG9kIChpLmUuIGFuIGFjdGlvblxuICogICBtZXRob2QgdGhhdCBkb2VzIG5vdCBhY2NlcHQgYSByZXF1ZXN0IGJvZHkpLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0LjxPYmplY3Q+PX0gYWN0aW9ucyBIYXNoIHdpdGggZGVjbGFyYXRpb24gb2YgY3VzdG9tIGFjdGlvbnMgdGhhdCB3aWxsIGJlIGF2YWlsYWJsZVxuICogICBpbiBhZGRpdGlvbiB0byB0aGUgZGVmYXVsdCBzZXQgb2YgcmVzb3VyY2UgYWN0aW9ucyAoc2VlIGJlbG93KS4gSWYgYSBjdXN0b20gYWN0aW9uIGhhcyB0aGUgc2FtZVxuICogICBrZXkgYXMgYSBkZWZhdWx0IGFjdGlvbiAoZS5nLiBgc2F2ZWApLCB0aGVuIHRoZSBkZWZhdWx0IGFjdGlvbiB3aWxsIGJlICpvdmVyd3JpdHRlbiosIGFuZCBub3RcbiAqICAgZXh0ZW5kZWQuXG4gKlxuICogICBUaGUgZGVjbGFyYXRpb24gc2hvdWxkIGJlIGNyZWF0ZWQgaW4gdGhlIGZvcm1hdCBvZiB7QGxpbmsgbmcuJGh0dHAjdXNhZ2UgJGh0dHAuY29uZmlnfTpcbiAqXG4gKiAgICAgICB7XG4gKiAgICAgICAgIGFjdGlvbjE6IHttZXRob2Q6PywgcGFyYW1zOj8sIGlzQXJyYXk6PywgaGVhZGVyczo/LCAuLi59LFxuICogICAgICAgICBhY3Rpb24yOiB7bWV0aG9kOj8sIHBhcmFtczo/LCBpc0FycmF5Oj8sIGhlYWRlcnM6PywgLi4ufSxcbiAqICAgICAgICAgLi4uXG4gKiAgICAgICB9XG4gKlxuICogICBXaGVyZTpcbiAqXG4gKiAgIC0gKipgYWN0aW9uYCoqIOKAkyB7c3RyaW5nfSDigJMgVGhlIG5hbWUgb2YgYWN0aW9uLiBUaGlzIG5hbWUgYmVjb21lcyB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kIG9uXG4gKiAgICAgeW91ciByZXNvdXJjZSBvYmplY3QuXG4gKiAgIC0gKipgbWV0aG9kYCoqIOKAkyB7c3RyaW5nfSDigJMgQ2FzZSBpbnNlbnNpdGl2ZSBIVFRQIG1ldGhvZCAoZS5nLiBgR0VUYCwgYFBPU1RgLCBgUFVUYCxcbiAqICAgICBgREVMRVRFYCwgYEpTT05QYCwgZXRjKS5cbiAqICAgLSAqKmBwYXJhbXNgKiog4oCTIHtPYmplY3Q9fSDigJMgT3B0aW9uYWwgc2V0IG9mIHByZS1ib3VuZCBwYXJhbWV0ZXJzIGZvciB0aGlzIGFjdGlvbi4gSWYgYW55IG9mXG4gKiAgICAgdGhlIHBhcmFtZXRlciB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCBldmVyeSB0aW1lIHdoZW4gYSBwYXJhbSB2YWx1ZSBuZWVkcyB0b1xuICogICAgIGJlIG9idGFpbmVkIGZvciBhIHJlcXVlc3QgKHVubGVzcyB0aGUgcGFyYW0gd2FzIG92ZXJyaWRkZW4pLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBwYXNzZWQgdGhlXG4gKiAgICAgY3VycmVudCBkYXRhIHZhbHVlIGFzIGFuIGFyZ3VtZW50LlxuICogICAtICoqYHVybGAqKiDigJMge3N0cmluZ30g4oCTIEFjdGlvbiBzcGVjaWZpYyBgdXJsYCBvdmVycmlkZS4gVGhlIHVybCB0ZW1wbGF0aW5nIGlzIHN1cHBvcnRlZCBqdXN0XG4gKiAgICAgbGlrZSBmb3IgdGhlIHJlc291cmNlLWxldmVsIHVybHMuXG4gKiAgIC0gKipgaXNBcnJheWAqKiDigJMge2Jvb2xlYW49fSDigJMgSWYgdHJ1ZSB0aGVuIHRoZSByZXR1cm5lZCBvYmplY3QgZm9yIHRoaXMgYWN0aW9uIGlzIGFuIGFycmF5LFxuICogICAgIHNlZSBgcmV0dXJuc2Agc2VjdGlvbi5cbiAqICAgLSAqKmB0cmFuc2Zvcm1SZXF1ZXN0YCoqIOKAk1xuICogICAgIGB7ZnVuY3Rpb24oZGF0YSwgaGVhZGVyc0dldHRlcil8QXJyYXkuPGZ1bmN0aW9uKGRhdGEsIGhlYWRlcnNHZXR0ZXIpPn1gIOKAk1xuICogICAgIFRyYW5zZm9ybSBmdW5jdGlvbiBvciBhbiBhcnJheSBvZiBzdWNoIGZ1bmN0aW9ucy4gVGhlIHRyYW5zZm9ybSBmdW5jdGlvbiB0YWtlcyB0aGUgaHR0cFxuICogICAgIHJlcXVlc3QgYm9keSBhbmQgaGVhZGVycyBhbmQgcmV0dXJucyBpdHMgdHJhbnNmb3JtZWQgKHR5cGljYWxseSBzZXJpYWxpemVkKSB2ZXJzaW9uLlxuICogICAgIEJ5IGRlZmF1bHQsIHRyYW5zZm9ybVJlcXVlc3Qgd2lsbCBjb250YWluIG9uZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGUgcmVxdWVzdCBkYXRhIGlzXG4gKiAgICAgYW4gb2JqZWN0IGFuZCBzZXJpYWxpemVzIGl0IHVzaW5nIGBhbmd1bGFyLnRvSnNvbmAuIFRvIHByZXZlbnQgdGhpcyBiZWhhdmlvciwgc2V0XG4gKiAgICAgYHRyYW5zZm9ybVJlcXVlc3RgIHRvIGFuIGVtcHR5IGFycmF5OiBgdHJhbnNmb3JtUmVxdWVzdDogW11gXG4gKiAgIC0gKipgdHJhbnNmb3JtUmVzcG9uc2VgKiog4oCTXG4gKiAgICAgYHtmdW5jdGlvbihkYXRhLCBoZWFkZXJzR2V0dGVyLCBzdGF0dXMpfEFycmF5LjxmdW5jdGlvbihkYXRhLCBoZWFkZXJzR2V0dGVyLCBzdGF0dXMpPn1gIOKAk1xuICogICAgIFRyYW5zZm9ybSBmdW5jdGlvbiBvciBhbiBhcnJheSBvZiBzdWNoIGZ1bmN0aW9ucy4gVGhlIHRyYW5zZm9ybSBmdW5jdGlvbiB0YWtlcyB0aGUgSFRUUFxuICogICAgIHJlc3BvbnNlIGJvZHksIGhlYWRlcnMgYW5kIHN0YXR1cyBhbmQgcmV0dXJucyBpdHMgdHJhbnNmb3JtZWQgKHR5cGljYWxseSBkZXNlcmlhbGl6ZWQpXG4gKiAgICAgdmVyc2lvbi5cbiAqICAgICBCeSBkZWZhdWx0LCB0cmFuc2Zvcm1SZXNwb25zZSB3aWxsIGNvbnRhaW4gb25lIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZSByZXNwb25zZSBsb29rc1xuICogICAgIGxpa2UgYSBKU09OIHN0cmluZyBhbmQgZGVzZXJpYWxpemVzIGl0IHVzaW5nIGBhbmd1bGFyLmZyb21Kc29uYC4gVG8gcHJldmVudCB0aGlzIGJlaGF2aW9yLFxuICogICAgIHNldCBgdHJhbnNmb3JtUmVzcG9uc2VgIHRvIGFuIGVtcHR5IGFycmF5OiBgdHJhbnNmb3JtUmVzcG9uc2U6IFtdYFxuICogICAtICoqYGNhY2hlYCoqIOKAkyBge2Jvb2xlYW58Q2FjaGV9YCDigJMgQSBib29sZWFuIHZhbHVlIG9yIG9iamVjdCBjcmVhdGVkIHdpdGhcbiAqICAgICB7QGxpbmsgbmcuJGNhY2hlRmFjdG9yeSBgJGNhY2hlRmFjdG9yeWB9IHRvIGVuYWJsZSBvciBkaXNhYmxlIGNhY2hpbmcgb2YgdGhlIEhUVFAgcmVzcG9uc2UuXG4gKiAgICAgU2VlIHtAbGluayAkaHR0cCNjYWNoaW5nICRodHRwIENhY2hpbmd9IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogICAtICoqYHRpbWVvdXRgKiog4oCTIGB7bnVtYmVyfWAg4oCTIFRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzLjxiciAvPlxuICogICAgICoqTm90ZToqKiBJbiBjb250cmFzdCB0byB7QGxpbmsgbmcuJGh0dHAjdXNhZ2UgJGh0dHAuY29uZmlnfSwge0BsaW5rIG5nLiRxIHByb21pc2VzfSBhcmVcbiAqICAgICAqKm5vdCoqIHN1cHBvcnRlZCBpbiBgJHJlc291cmNlYCwgYmVjYXVzZSB0aGUgc2FtZSB2YWx1ZSB3b3VsZCBiZSB1c2VkIGZvciBtdWx0aXBsZSByZXF1ZXN0cy5cbiAqICAgICBJZiB5b3UgYXJlIGxvb2tpbmcgZm9yIGEgd2F5IHRvIGNhbmNlbCByZXF1ZXN0cywgeW91IHNob3VsZCB1c2UgdGhlIGBjYW5jZWxsYWJsZWAgb3B0aW9uLlxuICogICAtICoqYGNhbmNlbGxhYmxlYCoqIOKAkyBge2Jvb2xlYW59YCDigJMgSWYgdHJ1ZSwgdGhlIHJlcXVlc3QgbWFkZSBieSBhIFwibm9uLWluc3RhbmNlXCIgY2FsbCB3aWxsIGJlXG4gKiAgICAgY2FuY2VsbGVkIChpZiBub3QgYWxyZWFkeSBjb21wbGV0ZWQpIGJ5IGNhbGxpbmcgYCRjYW5jZWxSZXF1ZXN0KClgIG9uIHRoZSBjYWxsJ3MgcmV0dXJuXG4gKiAgICAgdmFsdWUuIENhbGxpbmcgYCRjYW5jZWxSZXF1ZXN0KClgIGZvciBhIG5vbi1jYW5jZWxsYWJsZSBvciBhbiBhbHJlYWR5IGNvbXBsZXRlZC9jYW5jZWxsZWRcbiAqICAgICByZXF1ZXN0IHdpbGwgaGF2ZSBubyBlZmZlY3QuXG4gKiAgIC0gKipgd2l0aENyZWRlbnRpYWxzYCoqIOKAkyBge2Jvb2xlYW59YCDigJMgV2hldGhlciB0byBzZXQgdGhlIGB3aXRoQ3JlZGVudGlhbHNgIGZsYWcgb24gdGhlXG4gKiAgICAgWEhSIG9iamVjdC4gU2VlXG4gKiAgICAgW1hNTEh0dHBSZXF1ZXN0LndpdGhDcmVkZW50aWFsc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L3dpdGhDcmVkZW50aWFscylcbiAqICAgICBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqICAgLSAqKmByZXNwb25zZVR5cGVgKiog4oCTIGB7c3RyaW5nfWAg4oCTIFNlZVxuICogICAgIFtYTUxIdHRwUmVxdWVzdC5yZXNwb25zZVR5cGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9yZXNwb25zZVR5cGUpLlxuICogICAtICoqYGludGVyY2VwdG9yYCoqIOKAkyBge09iamVjdD19YCDigJMgVGhlIGludGVyY2VwdG9yIG9iamVjdCBoYXMgZm91ciBvcHRpb25hbCBtZXRob2RzIC1cbiAqICAgICBgcmVxdWVzdGAsIGByZXF1ZXN0RXJyb3JgLCBgcmVzcG9uc2VgLCBhbmQgYHJlc3BvbnNlRXJyb3JgLiBTZWVcbiAqICAgICB7QGxpbmsgbmcuJGh0dHAjaW50ZXJjZXB0b3JzICRodHRwIGludGVyY2VwdG9yc30gZm9yIGRldGFpbHMuIE5vdGUgdGhhdFxuICogICAgIGByZXF1ZXN0YC9gcmVxdWVzdEVycm9yYCBpbnRlcmNlcHRvcnMgYXJlIGFwcGxpZWQgYmVmb3JlIGNhbGxpbmcgYCRodHRwYCwgdGh1cyBiZWZvcmUgYW55XG4gKiAgICAgZ2xvYmFsIGAkaHR0cGAgaW50ZXJjZXB0b3JzLiBBbHNvLCByZWplY3Rpbmcgb3IgdGhyb3dpbmcgYW4gZXJyb3IgaW5zaWRlIHRoZSBgcmVxdWVzdGBcbiAqICAgICBpbnRlcmNlcHRvciB3aWxsIHJlc3VsdCBpbiBjYWxsaW5nIHRoZSBgcmVzcG9uc2VFcnJvcmAgaW50ZXJjZXB0b3IuXG4gKiAgICAgVGhlIHJlc291cmNlIGluc3RhbmNlIG9yIGNvbGxlY3Rpb24gaXMgYXZhaWxhYmxlIG9uIHRoZSBgcmVzb3VyY2VgIHByb3BlcnR5IG9mIHRoZVxuICogICAgIGBodHRwIHJlc3BvbnNlYCBvYmplY3QgcGFzc2VkIHRvIGByZXNwb25zZWAvYHJlc3BvbnNlRXJyb3JgIGludGVyY2VwdG9ycy5cbiAqICAgICBLZWVwIGluIG1pbmQgdGhhdCB0aGUgYXNzb2NpYXRlZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgdGhlXG4gKiAgICAgcmVzcG9uc2UgaW50ZXJjZXB0b3JzLiBNYWtlIHN1cmUgeW91IHJldHVybiBhbiBhcHByb3ByaWF0ZSB2YWx1ZSBhbmQgbm90IHRoZSBgcmVzcG9uc2VgXG4gKiAgICAgb2JqZWN0IHBhc3NlZCBhcyBpbnB1dC4gRm9yIHJlZmVyZW5jZSwgdGhlIGRlZmF1bHQgYHJlc3BvbnNlYCBpbnRlcmNlcHRvciAod2hpY2ggZ2V0cyBhcHBsaWVkXG4gKiAgICAgaWYgeW91IGRvbid0IHNwZWNpZnkgYSBjdXN0b20gb25lKSByZXR1cm5zIGByZXNwb25zZS5yZXNvdXJjZWAuPGJyIC8+XG4gKiAgICAgU2VlIHtAbGluayBuZ1Jlc291cmNlLiRyZXNvdXJjZSN1c2luZy1pbnRlcmNlcHRvcnMgYmVsb3d9IGZvciBhbiBleGFtcGxlIG9mIHVzaW5nXG4gKiAgICAgaW50ZXJjZXB0b3JzIGluIGAkcmVzb3VyY2VgLlxuICogICAtICoqYGhhc0JvZHlgKiog4oCTIGB7Ym9vbGVhbn1gIOKAkyBJZiB0cnVlLCB0aGVuIHRoZSByZXF1ZXN0IHdpbGwgaGF2ZSBhIGJvZHkuXG4gKiAgICAgSWYgbm90IHNwZWNpZmllZCwgdGhlbiBvbmx5IFBPU1QsIFBVVCBhbmQgUEFUQ0ggcmVxdWVzdHMgd2lsbCBoYXZlIGEgYm9keS4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgSGFzaCB3aXRoIGN1c3RvbSBzZXR0aW5ncyB0aGF0IHNob3VsZCBleHRlbmQgdGhlXG4gKiAgIGRlZmF1bHQgYCRyZXNvdXJjZVByb3ZpZGVyYCBiZWhhdmlvci4gIFRoZSBzdXBwb3J0ZWQgb3B0aW9ucyBhcmU6XG4gKlxuICogICAtICoqYHN0cmlwVHJhaWxpbmdTbGFzaGVzYCoqIOKAkyB7Ym9vbGVhbn0g4oCTIElmIHRydWUgdGhlbiB0aGUgdHJhaWxpbmdcbiAqICAgc2xhc2hlcyBmcm9tIGFueSBjYWxjdWxhdGVkIFVSTCB3aWxsIGJlIHN0cmlwcGVkLiAoRGVmYXVsdHMgdG8gdHJ1ZS4pXG4gKiAgIC0gKipgY2FuY2VsbGFibGVgKiog4oCTIHtib29sZWFufSDigJMgSWYgdHJ1ZSwgdGhlIHJlcXVlc3QgbWFkZSBieSBhIFwibm9uLWluc3RhbmNlXCIgY2FsbCB3aWxsIGJlXG4gKiAgIGNhbmNlbGxlZCAoaWYgbm90IGFscmVhZHkgY29tcGxldGVkKSBieSBjYWxsaW5nIGAkY2FuY2VsUmVxdWVzdCgpYCBvbiB0aGUgY2FsbCdzIHJldHVybiB2YWx1ZS5cbiAqICAgVGhpcyBjYW4gYmUgb3ZlcndyaXR0ZW4gcGVyIGFjdGlvbi4gKERlZmF1bHRzIHRvIGZhbHNlLilcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBBIHJlc291cmNlIFwiY2xhc3NcIiBvYmplY3Qgd2l0aCBtZXRob2RzIGZvciB0aGUgZGVmYXVsdCBzZXQgb2YgcmVzb3VyY2UgYWN0aW9uc1xuICogICBvcHRpb25hbGx5IGV4dGVuZGVkIHdpdGggY3VzdG9tIGBhY3Rpb25zYC4gVGhlIGRlZmF1bHQgc2V0IGNvbnRhaW5zIHRoZXNlIGFjdGlvbnM6XG4gKiAgIGBgYGpzXG4gKiAgIHtcbiAqICAgICAnZ2V0JzogICAge21ldGhvZDogJ0dFVCd9LFxuICogICAgICdzYXZlJzogICB7bWV0aG9kOiAnUE9TVCd9LFxuICogICAgICdxdWVyeSc6ICB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZX0sXG4gKiAgICAgJ3JlbW92ZSc6IHttZXRob2Q6ICdERUxFVEUnfSxcbiAqICAgICAnZGVsZXRlJzoge21ldGhvZDogJ0RFTEVURSd9XG4gKiAgIH1cbiAqICAgYGBgXG4gKlxuICogICBDYWxsaW5nIHRoZXNlIG1ldGhvZHMgaW52b2tlIHtAbGluayBuZy4kaHR0cH0gd2l0aCB0aGUgc3BlY2lmaWVkIGh0dHAgbWV0aG9kLCBkZXN0aW5hdGlvbiBhbmRcbiAqICAgcGFyYW1ldGVycy4gV2hlbiB0aGUgZGF0YSBpcyByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2ZXIgdGhlbiB0aGUgb2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIHRoZVxuICogICByZXNvdXJjZSBjbGFzcy4gVGhlIGFjdGlvbnMgYHNhdmVgLCBgcmVtb3ZlYCBhbmQgYGRlbGV0ZWAgYXJlIGF2YWlsYWJsZSBvbiBpdCBhcyBtZXRob2RzIHdpdGhcbiAqICAgdGhlIGAkYCBwcmVmaXguIFRoaXMgYWxsb3dzIHlvdSB0byBlYXNpbHkgcGVyZm9ybSBDUlVEIG9wZXJhdGlvbnMgKGNyZWF0ZSwgcmVhZCwgdXBkYXRlLFxuICogICBkZWxldGUpIG9uIHNlcnZlci1zaWRlIGRhdGEgbGlrZSB0aGlzOlxuICogICBgYGBqc1xuICogICB2YXIgVXNlciA9ICRyZXNvdXJjZSgnL3VzZXIvOnVzZXJJZCcsIHt1c2VySWQ6ICdAaWQnfSk7XG4gKiAgIFVzZXIuZ2V0KHt1c2VySWQ6IDEyM30pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICogICAgIHVzZXIuYWJjID0gdHJ1ZTtcbiAqICAgICB1c2VyLiRzYXZlKCk7XG4gKiAgIH0pO1xuICogICBgYGBcbiAqXG4gKiAgIEl0IGlzIGltcG9ydGFudCB0byByZWFsaXplIHRoYXQgaW52b2tpbmcgYSBgJHJlc291cmNlYCBvYmplY3QgbWV0aG9kIGltbWVkaWF0ZWx5IHJldHVybnMgYW5cbiAqICAgZW1wdHkgcmVmZXJlbmNlIChvYmplY3Qgb3IgYXJyYXkgZGVwZW5kaW5nIG9uIGBpc0FycmF5YCkuIE9uY2UgdGhlIGRhdGEgaXMgcmV0dXJuZWQgZnJvbSB0aGVcbiAqICAgc2VydmVyIHRoZSBleGlzdGluZyByZWZlcmVuY2UgaXMgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhLiBUaGlzIGlzIGEgdXNlZnVsIHRyaWNrIHNpbmNlXG4gKiAgIHVzdWFsbHkgdGhlIHJlc291cmNlIGlzIGFzc2lnbmVkIHRvIGEgbW9kZWwgd2hpY2ggaXMgdGhlbiByZW5kZXJlZCBieSB0aGUgdmlldy4gSGF2aW5nIGFuIGVtcHR5XG4gKiAgIG9iamVjdCByZXN1bHRzIGluIG5vIHJlbmRlcmluZywgb25jZSB0aGUgZGF0YSBhcnJpdmVzIGZyb20gdGhlIHNlcnZlciB0aGVuIHRoZSBvYmplY3QgaXNcbiAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGRhdGEgYW5kIHRoZSB2aWV3IGF1dG9tYXRpY2FsbHkgcmUtcmVuZGVycyBpdHNlbGYgc2hvd2luZyB0aGUgbmV3IGRhdGEuIFRoaXNcbiAqICAgbWVhbnMgdGhhdCBpbiBtb3N0IGNhc2VzIG9uZSBuZXZlciBoYXMgdG8gd3JpdGUgYSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhlIGFjdGlvbiBtZXRob2RzLlxuICpcbiAqICAgVGhlIGFjdGlvbiBtZXRob2RzIG9uIHRoZSBjbGFzcyBvYmplY3Qgb3IgaW5zdGFuY2Ugb2JqZWN0IGNhbiBiZSBpbnZva2VkIHdpdGggdGhlIGZvbGxvd2luZ1xuICogICBwYXJhbWV0ZXJzOlxuICpcbiAqICAgLSBcImNsYXNzXCIgYWN0aW9ucyB3aXRob3V0IGEgYm9keTogYFJlc291cmNlLmFjdGlvbihbcGFyYW1ldGVyc10sIFtzdWNjZXNzXSwgW2Vycm9yXSlgXG4gKiAgIC0gXCJjbGFzc1wiIGFjdGlvbnMgd2l0aCBhIGJvZHk6IGBSZXNvdXJjZS5hY3Rpb24oW3BhcmFtZXRlcnNdLCBwb3N0RGF0YSwgW3N1Y2Nlc3NdLCBbZXJyb3JdKWBcbiAqICAgLSBpbnN0YW5jZSBhY3Rpb25zOiBgaW5zdGFuY2UuJGFjdGlvbihbcGFyYW1ldGVyc10sIFtzdWNjZXNzXSwgW2Vycm9yXSlgXG4gKlxuICpcbiAqICAgV2hlbiBjYWxsaW5nIGluc3RhbmNlIG1ldGhvZHMsIHRoZSBpbnN0YW5jZSBpdHNlbGYgaXMgdXNlZCBhcyB0aGUgcmVxdWVzdCBib2R5IChpZiB0aGUgYWN0aW9uXG4gKiAgIHNob3VsZCBoYXZlIGEgYm9keSkuIEJ5IGRlZmF1bHQsIG9ubHkgYWN0aW9ucyB1c2luZyBgUE9TVGAsIGBQVVRgIG9yIGBQQVRDSGAgaGF2ZSByZXF1ZXN0XG4gKiAgIGJvZGllcywgYnV0IHlvdSBjYW4gdXNlIHRoZSBgaGFzQm9keWAgY29uZmlndXJhdGlvbiBvcHRpb24gdG8gc3BlY2lmeSB3aGV0aGVyIGFuIGFjdGlvblxuICogICBzaG91bGQgaGF2ZSBhIGJvZHkgb3Igbm90IChyZWdhcmRsZXNzIG9mIGl0cyBIVFRQIG1ldGhvZCkuXG4gKlxuICpcbiAqICAgU3VjY2VzcyBjYWxsYmFjayBpcyBjYWxsZWQgd2l0aCAodmFsdWUgKE9iamVjdHxBcnJheSksIHJlc3BvbnNlSGVhZGVycyAoRnVuY3Rpb24pLFxuICogICBzdGF0dXMgKG51bWJlciksIHN0YXR1c1RleHQgKHN0cmluZykpIGFyZ3VtZW50cywgd2hlcmUgYHZhbHVlYCBpcyB0aGUgcG9wdWxhdGVkIHJlc291cmNlXG4gKiAgIGluc3RhbmNlIG9yIGNvbGxlY3Rpb24gb2JqZWN0LiBUaGUgZXJyb3IgY2FsbGJhY2sgaXMgY2FsbGVkIHdpdGggKGh0dHBSZXNwb25zZSkgYXJndW1lbnQuXG4gKlxuICogICBDbGFzcyBhY3Rpb25zIHJldHVybiBhbiBlbXB0eSBpbnN0YW5jZSAod2l0aCB0aGUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGxpc3RlZCBiZWxvdykuXG4gKiAgIEluc3RhbmNlIGFjdGlvbnMgcmV0dXJuIGEgcHJvbWlzZSBmb3IgdGhlIG9wZXJhdGlvbi5cbiAqXG4gKiAgIFRoZSBSZXNvdXJjZSBpbnN0YW5jZXMgYW5kIGNvbGxlY3Rpb25zIGhhdmUgdGhlc2UgYWRkaXRpb25hbCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgJHByb21pc2VgOiBUaGUge0BsaW5rIG5nLiRxIHByb21pc2V9IG9mIHRoZSBvcmlnaW5hbCBzZXJ2ZXIgaW50ZXJhY3Rpb24gdGhhdCBjcmVhdGVkIHRoaXNcbiAqICAgICBpbnN0YW5jZSBvciBjb2xsZWN0aW9uLlxuICpcbiAqICAgICBPbiBzdWNjZXNzLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSBzYW1lIHJlc291cmNlIGluc3RhbmNlIG9yIGNvbGxlY3Rpb24gb2JqZWN0LFxuICogICAgIHVwZGF0ZWQgd2l0aCBkYXRhIGZyb20gc2VydmVyLiBUaGlzIG1ha2VzIGl0IGVhc3kgdG8gdXNlIGluIHRoZVxuICogICAgIHtAbGluayBuZ1JvdXRlLiRyb3V0ZVByb3ZpZGVyIGByZXNvbHZlYCBzZWN0aW9uIG9mIGAkcm91dGVQcm92aWRlci53aGVuKClgfSB0byBkZWZlciB2aWV3XG4gKiAgICAgcmVuZGVyaW5nIHVudGlsIHRoZSByZXNvdXJjZShzKSBhcmUgbG9hZGVkLlxuICpcbiAqICAgICBPbiBmYWlsdXJlLCB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIHRoZSB7QGxpbmsgbmcuJGh0dHAgaHR0cCByZXNwb25zZX0gb2JqZWN0LlxuICpcbiAqICAgICBJZiBhbiBpbnRlcmNlcHRvciBvYmplY3Qgd2FzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSB3aWxsIGluc3RlYWQgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgdmFsdWVcbiAqICAgICByZXR1cm5lZCBieSB0aGUgcmVzcG9uc2UgaW50ZXJjZXB0b3IgKG9uIHN1Y2Nlc3MpIG9yIHJlc3BvbmNlRXJyb3IgaW50ZXJjZXB0b3IgKG9uIGZhaWx1cmUpLlxuICpcbiAqICAgLSBgJHJlc29sdmVkYDogYHRydWVgIGFmdGVyIGZpcnN0IHNlcnZlciBpbnRlcmFjdGlvbiBpcyBjb21wbGV0ZWQgKGVpdGhlciB3aXRoIHN1Y2Nlc3Mgb3JcbiAqICAgICAgcmVqZWN0aW9uKSwgYGZhbHNlYCBiZWZvcmUgdGhhdC4gS25vd2luZyBpZiB0aGUgUmVzb3VyY2UgaGFzIGJlZW4gcmVzb2x2ZWQgaXMgdXNlZnVsIGluXG4gKiAgICAgIGRhdGEtYmluZGluZy4gSWYgdGhlcmUgaXMgYSByZXNwb25zZS9yZXNwb25zZUVycm9yIGludGVyY2VwdG9yIGFuZCBpdCByZXR1cm5zIGEgcHJvbWlzZSxcbiAqICAgICAgYCRyZXNvbHZlZGAgd2lsbCB3YWl0IGZvciB0aGF0IHRvby5cbiAqXG4gKiAgIFRoZSBSZXNvdXJjZSBpbnN0YW5jZXMgYW5kIGNvbGxlY3Rpb25zIGhhdmUgdGhlc2UgYWRkaXRpb25hbCBtZXRob2RzOlxuICpcbiAqICAgLSBgJGNhbmNlbFJlcXVlc3RgOiBJZiB0aGVyZSBpcyBhIGNhbmNlbGxhYmxlLCBwZW5kaW5nIHJlcXVlc3QgcmVsYXRlZCB0byB0aGUgaW5zdGFuY2Ugb3JcbiAqICAgICAgY29sbGVjdGlvbiwgY2FsbGluZyB0aGlzIG1ldGhvZCB3aWxsIGFib3J0IHRoZSByZXF1ZXN0LlxuICpcbiAqICAgVGhlIFJlc291cmNlIGluc3RhbmNlcyBoYXZlIHRoZXNlIGFkZGl0aW9uYWwgbWV0aG9kczpcbiAqXG4gKiAgIC0gYHRvSlNPTmA6IEl0IHJldHVybnMgYSBzaW1wbGUgb2JqZWN0IHdpdGhvdXQgYW55IG9mIHRoZSBleHRyYSBwcm9wZXJ0aWVzIGFkZGVkIGFzIHBhcnQgb2ZcbiAqICAgICB0aGUgUmVzb3VyY2UgQVBJLiBUaGlzIG9iamVjdCBjYW4gYmUgc2VyaWFsaXplZCB0aHJvdWdoIHtAbGluayBhbmd1bGFyLnRvSnNvbn0gc2FmZWx5XG4gKiAgICAgd2l0aG91dCBhdHRhY2hpbmcgQW5ndWxhckpTLXNwZWNpZmljIGZpZWxkcy4gTm90aWNlIHRoYXQgYEpTT04uc3RyaW5naWZ5YCAoYW5kXG4gKiAgICAgYGFuZ3VsYXIudG9Kc29uYCkgYXV0b21hdGljYWxseSB1c2UgdGhpcyBtZXRob2Qgd2hlbiBzZXJpYWxpemluZyBhIFJlc291cmNlIGluc3RhbmNlXG4gKiAgICAgKHNlZSBbTUROXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9KU09OL3N0cmluZ2lmeSN0b0pTT04lMjglMjlfYmVoYXZpb3IpKS5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICMjIyBCYXNpYyB1c2FnZVxuICpcbiAgIGBgYGpzXG4gICAgIC8vIERlZmluZSBhIENyZWRpdENhcmQgY2xhc3NcbiAgICAgdmFyIENyZWRpdENhcmQgPSAkcmVzb3VyY2UoJy91c2Vycy86dXNlcklkL2NhcmRzLzpjYXJkSWQnLFxuICAgICAgIHt1c2VySWQ6IDEyMywgY2FyZElkOiAnQGlkJ30sIHtcbiAgICAgICAgIGNoYXJnZToge21ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHtjaGFyZ2U6IHRydWV9fVxuICAgICAgIH0pO1xuXG4gICAgIC8vIFdlIGNhbiByZXRyaWV2ZSBhIGNvbGxlY3Rpb24gZnJvbSB0aGUgc2VydmVyXG4gICAgIHZhciBjYXJkcyA9IENyZWRpdENhcmQucXVlcnkoKTtcbiAgICAgICAgIC8vIEdFVDogL3VzZXJzLzEyMy9jYXJkc1xuICAgICAgICAgLy8gc2VydmVyIHJldHVybnM6IFt7aWQ6IDQ1NiwgbnVtYmVyOiAnMTIzNCcsIG5hbWU6ICdTbWl0aCd9XVxuXG4gICAgIC8vIFdhaXQgZm9yIHRoZSByZXF1ZXN0IHRvIGNvbXBsZXRlXG4gICAgIGNhcmRzLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgdmFyIGNhcmQgPSBjYXJkc1swXTtcblxuICAgICAgIC8vIEVhY2ggaXRlbSBpcyBhbiBpbnN0YW5jZSBvZiBDcmVkaXRDYXJkXG4gICAgICAgZXhwZWN0KGNhcmQgaW5zdGFuY2VvZiBDcmVkaXRDYXJkKS50b0VxdWFsKHRydWUpO1xuXG4gICAgICAgLy8gTm9uLUdFVCBtZXRob2RzIGFyZSBtYXBwZWQgb250byB0aGUgaW5zdGFuY2VzXG4gICAgICAgY2FyZC5uYW1lID0gJ0ouIFNtaXRoJztcbiAgICAgICBjYXJkLiRzYXZlKCk7XG4gICAgICAgICAgIC8vIFBPU1Q6IC91c2Vycy8xMjMvY2FyZHMvNDU2IHtpZDogNDU2LCBudW1iZXI6ICcxMjM0JywgbmFtZTogJ0ouIFNtaXRoJ31cbiAgICAgICAgICAgLy8gc2VydmVyIHJldHVybnM6IHtpZDogNDU2LCBudW1iZXI6ICcxMjM0JywgbmFtZTogJ0ouIFNtaXRoJ31cblxuICAgICAgIC8vIE91ciBjdXN0b20gbWV0aG9kIGlzIG1hcHBlZCBhcyB3ZWxsIChzaW5jZSBpdCB1c2VzIFBPU1QpXG4gICAgICAgY2FyZC4kY2hhcmdlKHthbW91bnQ6IDkuOTl9KTtcbiAgICAgICAgICAgLy8gUE9TVDogL3VzZXJzLzEyMy9jYXJkcy80NTY/YW1vdW50PTkuOTkmY2hhcmdlPXRydWUge2lkOiA0NTYsIG51bWJlcjogJzEyMzQnLCBuYW1lOiAnSi4gU21pdGgnfVxuICAgICB9KTtcblxuICAgICAvLyBXZSBjYW4gY3JlYXRlIGFuIGluc3RhbmNlIGFzIHdlbGxcbiAgICAgdmFyIG5ld0NhcmQgPSBuZXcgQ3JlZGl0Q2FyZCh7bnVtYmVyOiAnMDEyMyd9KTtcbiAgICAgbmV3Q2FyZC5uYW1lID0gJ01pa2UgU21pdGgnO1xuXG4gICAgIHZhciBzYXZlUHJvbWlzZSA9IG5ld0NhcmQuJHNhdmUoKTtcbiAgICAgICAgIC8vIFBPU1Q6IC91c2Vycy8xMjMvY2FyZHMge251bWJlcjogJzAxMjMnLCBuYW1lOiAnTWlrZSBTbWl0aCd9XG4gICAgICAgICAvLyBzZXJ2ZXIgcmV0dXJuczoge2lkOiA3ODksIG51bWJlcjogJzAxMjMnLCBuYW1lOiAnTWlrZSBTbWl0aCd9XG5cbiAgICAgc2F2ZVByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAvLyBPbmNlIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkLCB0aGUgY3JlYXRlZCBpbnN0YW5jZVxuICAgICAgIC8vIGlzIHBvcHVsYXRlZCB3aXRoIHRoZSBkYXRhIHJldHVybmVkIGJ5IHRoZSBzZXJ2ZXJcbiAgICAgICBleHBlY3QobmV3Q2FyZC5pZCkudG9FcXVhbCg3ODkpO1xuICAgICB9KTtcbiAgIGBgYFxuICpcbiAqIFRoZSBvYmplY3QgcmV0dXJuZWQgZnJvbSBhIGNhbGwgdG8gYCRyZXNvdXJjZWAgaXMgYSByZXNvdXJjZSBcImNsYXNzXCIgd2hpY2ggaGFzIG9uZSBcInN0YXRpY1wiXG4gKiBtZXRob2QgZm9yIGVhY2ggYWN0aW9uIGluIHRoZSBkZWZpbml0aW9uLlxuICpcbiAqIENhbGxpbmcgdGhlc2UgbWV0aG9kcyBpbnZva2VzIGAkaHR0cGAgb24gdGhlIGB1cmxgIHRlbXBsYXRlIHdpdGggdGhlIGdpdmVuIEhUVFAgYG1ldGhvZGAsXG4gKiBgcGFyYW1zYCBhbmQgYGhlYWRlcnNgLlxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogIyMjIEFjY2Vzc2luZyB0aGUgcmVzcG9uc2VcbiAqXG4gKiBXaGVuIHRoZSBkYXRhIGlzIHJldHVybmVkIGZyb20gdGhlIHNlcnZlciB0aGVuIHRoZSBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIHJlc291cmNlIHR5cGUgYW5kXG4gKiBhbGwgb2YgdGhlIG5vbi1HRVQgbWV0aG9kcyBhcmUgYXZhaWxhYmxlIHdpdGggYCRgIHByZWZpeC4gVGhpcyBhbGxvd3MgeW91IHRvIGVhc2lseSBzdXBwb3J0IENSVURcbiAqIG9wZXJhdGlvbnMgKGNyZWF0ZSwgcmVhZCwgdXBkYXRlLCBkZWxldGUpIG9uIHNlcnZlci1zaWRlIGRhdGEuXG4gKlxuICAgYGBganNcbiAgICAgdmFyIFVzZXIgPSAkcmVzb3VyY2UoJy91c2Vycy86dXNlcklkJywge3VzZXJJZDogJ0BpZCd9KTtcbiAgICAgVXNlci5nZXQoe3VzZXJJZDogMTIzfSkuJHByb21pc2UudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgdXNlci5hYmMgPSB0cnVlO1xuICAgICAgIHVzZXIuJHNhdmUoKTtcbiAgICAgfSk7XG4gICBgYGBcbiAqXG4gKiBJdCdzIHdvcnRoIG5vdGluZyB0aGF0IHRoZSBzdWNjZXNzIGNhbGxiYWNrIGZvciBgZ2V0YCwgYHF1ZXJ5YCBhbmQgb3RoZXIgbWV0aG9kcyBnZXRzIGNhbGxlZCB3aXRoXG4gKiB0aGUgcmVzb3VyY2UgaW5zdGFuY2UgKHBvcHVsYXRlZCB3aXRoIHRoZSBkYXRhIHRoYXQgY2FtZSBmcm9tIHRoZSBzZXJ2ZXIpIGFzIHdlbGwgYXMgYW4gYCRodHRwYFxuICogaGVhZGVyIGdldHRlciBmdW5jdGlvbiwgdGhlIEhUVFAgc3RhdHVzIGNvZGUgYW5kIHRoZSByZXNwb25zZSBzdGF0dXMgdGV4dC4gU28gb25lIGNvdWxkIHJld3JpdGVcbiAqIHRoZSBhYm92ZSBleGFtcGxlIGFuZCBnZXQgYWNjZXNzIHRvIEhUVFAgaGVhZGVycyBhcyBmb2xsb3dzOlxuICpcbiAgIGBgYGpzXG4gICAgIHZhciBVc2VyID0gJHJlc291cmNlKCcvdXNlcnMvOnVzZXJJZCcsIHt1c2VySWQ6ICdAaWQnfSk7XG4gICAgIFVzZXIuZ2V0KHt1c2VySWQ6IDEyM30sIGZ1bmN0aW9uKHVzZXIsIGdldFJlc3BvbnNlSGVhZGVycykge1xuICAgICAgIHVzZXIuYWJjID0gdHJ1ZTtcbiAgICAgICB1c2VyLiRzYXZlKGZ1bmN0aW9uKHVzZXIsIHB1dFJlc3BvbnNlSGVhZGVycykge1xuICAgICAgICAgLy8gYHVzZXJgID0+IHNhdmVkIGBVc2VyYCBvYmplY3RcbiAgICAgICAgIC8vIGBwdXRSZXNwb25zZUhlYWRlcnNgID0+IGAkaHR0cGAgaGVhZGVyIGdldHRlclxuICAgICAgIH0pO1xuICAgICB9KTtcbiAgIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogIyMjIENyZWF0aW5nIGN1c3RvbSBhY3Rpb25zXG4gKlxuICogSW4gdGhpcyBleGFtcGxlIHdlIGNyZWF0ZSBhIGN1c3RvbSBtZXRob2Qgb24gb3VyIHJlc291cmNlIHRvIG1ha2UgYSBQVVQgcmVxdWVzdDpcbiAqXG4gICBgYGBqc1xuICAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUmVzb3VyY2UnXSk7XG5cbiAgICAgIC8vIFNvbWUgQVBJcyBleHBlY3QgYSBQVVQgcmVxdWVzdCBpbiB0aGUgZm9ybWF0IFVSTC9vYmplY3QvSURcbiAgICAgIC8vIEhlcmUgd2UgYXJlIGNyZWF0aW5nIGFuICd1cGRhdGUnIG1ldGhvZFxuICAgICAgYXBwLmZhY3RvcnkoJ05vdGVzJywgWyckcmVzb3VyY2UnLCBmdW5jdGlvbigkcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuICRyZXNvdXJjZSgnL25vdGVzLzppZCcsIHtpZDogJ0BpZCd9LCB7XG4gICAgICAgICAgdXBkYXRlOiB7bWV0aG9kOiAnUFVUJ31cbiAgICAgICAgfSk7XG4gICAgICB9XSk7XG5cbiAgICAgIC8vIEluIG91ciBjb250cm9sbGVyIHdlIGdldCB0aGUgSUQgZnJvbSB0aGUgVVJMIHVzaW5nIGAkbG9jYXRpb25gXG4gICAgICBhcHAuY29udHJvbGxlcignTm90ZXNDdHJsJywgWyckbG9jYXRpb24nLCAnTm90ZXMnLCBmdW5jdGlvbigkbG9jYXRpb24sIE5vdGVzKSB7XG4gICAgICAgIC8vIEZpcnN0LCByZXRyaWV2ZSB0aGUgY29ycmVzcG9uZGluZyBgTm90ZWAgb2JqZWN0IGZyb20gdGhlIHNlcnZlclxuICAgICAgICAvLyAoQXNzdW1pbmcgYSBVUkwgb2YgdGhlIGZvcm0gYC4uLi9ub3Rlcz9pZD1YWVpgKVxuICAgICAgICB2YXIgbm90ZUlkID0gJGxvY2F0aW9uLnNlYXJjaCgpLmlkO1xuICAgICAgICB2YXIgbm90ZSA9IE5vdGVzLmdldCh7aWQ6IG5vdGVJZH0pO1xuXG4gICAgICAgIG5vdGUuJHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBub3RlLmNvbnRlbnQgPSAnSGVsbG8sIHdvcmxkISc7XG5cbiAgICAgICAgICAvLyBOb3cgY2FsbCBgdXBkYXRlYCB0byBzYXZlIHRoZSBjaGFuZ2VzIG9uIHRoZSBzZXJ2ZXJcbiAgICAgICAgICBOb3Rlcy51cGRhdGUobm90ZSk7XG4gICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBQVVQgL25vdGVzL0lEIHdpdGggdGhlIG5vdGUgb2JqZWN0IGFzIHRoZSByZXF1ZXN0IHBheWxvYWRcblxuICAgICAgICAgIC8vIFNpbmNlIGB1cGRhdGVgIGlzIGEgbm9uLUdFVCBtZXRob2QsIGl0IHdpbGwgYWxzbyBiZSBhdmFpbGFibGUgb24gdGhlIGluc3RhbmNlXG4gICAgICAgICAgLy8gKHByZWZpeGVkIHdpdGggYCRgKSwgc28gd2UgY291bGQgcmVwbGFjZSB0aGUgYE5vdGUudXBkYXRlKClgIGNhbGwgd2l0aDpcbiAgICAgICAgICAvL25vdGUuJHVwZGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1dKTtcbiAgIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogIyMjIENhbmNlbGxpbmcgcmVxdWVzdHNcbiAqXG4gKiBJZiBhbiBhY3Rpb24ncyBjb25maWd1cmF0aW9uIHNwZWNpZmllcyB0aGF0IGl0IGlzIGNhbmNlbGxhYmxlLCB5b3UgY2FuIGNhbmNlbCB0aGUgcmVxdWVzdCByZWxhdGVkXG4gKiB0byBhbiBpbnN0YW5jZSBvciBjb2xsZWN0aW9uIChhcyBsb25nIGFzIGl0IGlzIGEgcmVzdWx0IG9mIGEgXCJub24taW5zdGFuY2VcIiBjYWxsKTpcbiAqXG4gICBgYGBqc1xuICAgICAvLyAuLi5kZWZpbmluZyB0aGUgYEhvdGVsYCByZXNvdXJjZS4uLlxuICAgICB2YXIgSG90ZWwgPSAkcmVzb3VyY2UoJy9hcGkvaG90ZWxzLzppZCcsIHtpZDogJ0BpZCd9LCB7XG4gICAgICAgLy8gTGV0J3MgbWFrZSB0aGUgYHF1ZXJ5KClgIG1ldGhvZCBjYW5jZWxsYWJsZVxuICAgICAgIHF1ZXJ5OiB7bWV0aG9kOiAnZ2V0JywgaXNBcnJheTogdHJ1ZSwgY2FuY2VsbGFibGU6IHRydWV9XG4gICAgIH0pO1xuXG4gICAgIC8vIC4uLnNvbWV3aGVyZSBpbiB0aGUgUGxhblZhY2F0aW9uQ29udHJvbGxlci4uLlxuICAgICAuLi5cbiAgICAgdGhpcy5vbkRlc3RpbmF0aW9uQ2hhbmdlZCA9IGZ1bmN0aW9uIG9uRGVzdGluYXRpb25DaGFuZ2VkKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgLy8gV2UgZG9uJ3QgY2FyZSBhYm91dCBhbnkgcGVuZGluZyByZXF1ZXN0IGZvciBob3RlbHNcbiAgICAgICAvLyBpbiBhIGRpZmZlcmVudCBkZXN0aW5hdGlvbiBhbnkgbW9yZVxuICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUhvdGVscykge1xuICAgICAgICAgdGhpcy5hdmFpbGFibGVIb3RlbHMuJGNhbmNlbFJlcXVlc3QoKTtcbiAgICAgICB9XG5cbiAgICAgICAvLyBMZXQncyBxdWVyeSBmb3IgaG90ZWxzIGluIGBkZXN0aW5hdGlvbmBcbiAgICAgICAvLyAoY2FsbHM6IC9hcGkvaG90ZWxzP2xvY2F0aW9uPTxkZXN0aW5hdGlvbj4pXG4gICAgICAgdGhpcy5hdmFpbGFibGVIb3RlbHMgPSBIb3RlbC5xdWVyeSh7bG9jYXRpb246IGRlc3RpbmF0aW9ufSk7XG4gICAgIH07XG4gICBgYGBcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICMjIyBVc2luZyBpbnRlcmNlcHRvcnNcbiAqXG4gKiBZb3UgY2FuIHVzZSBpbnRlcmNlcHRvcnMgdG8gdHJhbnNmb3JtIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlLCBwZXJmb3JtIGFkZGl0aW9uYWwgb3BlcmF0aW9ucywgYW5kXG4gKiBtb2RpZnkgdGhlIHJldHVybmVkIGluc3RhbmNlL2NvbGxlY3Rpb24uIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSwgdXNlcyBgcmVxdWVzdGAgYW5kIGByZXNwb25zZWBcbiAqIGludGVyY2VwdG9ycyB0byBhdWdtZW50IHRoZSByZXR1cm5lZCBpbnN0YW5jZSB3aXRoIGFkZGl0aW9uYWwgaW5mbzpcbiAqXG4gICBgYGBqc1xuICAgICB2YXIgVGhpbmcgPSAkcmVzb3VyY2UoJy9hcGkvdGhpbmdzLzppZCcsIHtpZDogJ0BpZCd9LCB7XG4gICAgICAgc2F2ZToge1xuICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICBpbnRlcmNlcHRvcjoge1xuICAgICAgICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgICAgICAgICAvLyBCZWZvcmUgdGhlIHJlcXVlc3QgaXMgc2VudCBvdXQsIHN0b3JlIGEgdGltZXN0YW1wIG9uIHRoZSByZXF1ZXN0IGNvbmZpZ1xuICAgICAgICAgICAgIGNvbmZpZy5yZXF1ZXN0VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICAgICB9LFxuICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAvLyBHZXQgdGhlIGluc3RhbmNlIGZyb20gdGhlIHJlc3BvbnNlIG9iamVjdFxuICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHJlc3BvbnNlLnJlc291cmNlO1xuXG4gICAgICAgICAgICAgLy8gQXVnbWVudCB0aGUgaW5zdGFuY2Ugd2l0aCBhIGN1c3RvbSBgc2F2ZUxhdGVuY3lgIHByb3BlcnR5LCBjb21wdXRlZCBhcyB0aGUgdGltZVxuICAgICAgICAgICAgIC8vIGJldHdlZW4gc2VuZGluZyB0aGUgcmVxdWVzdCBhbmQgcmVjZWl2aW5nIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICBpbnN0YW5jZS5zYXZlTGF0ZW5jeSA9IERhdGUubm93KCkgLSByZXNwb25zZS5jb25maWcucmVxdWVzdFRpbWVzdGFtcDtcblxuICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH0pO1xuXG4gICAgIFRoaW5nLnNhdmUoe2ZvbzogJ2Jhcid9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHRoaW5nKSB7XG4gICAgICAgY29uc29sZS5sb2coJ1RoYXQgdGhpbmcgd2FzIHNhdmVkIGluICcgKyB0aGluZy5zYXZlTGF0ZW5jeSArICdtcy4nKTtcbiAgICAgfSk7XG4gICBgYGBcbiAqXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Jlc291cmNlJywgWyduZyddKS5cbiAgaW5mbyh7IGFuZ3VsYXJWZXJzaW9uOiAnMS43LjgnIH0pLlxuICBwcm92aWRlcignJHJlc291cmNlJywgZnVuY3Rpb24gUmVzb3VyY2VQcm92aWRlcigpIHtcbiAgICB2YXIgUFJPVE9DT0xfQU5EX0lQVjZfUkVHRVggPSAvXmh0dHBzPzpcXC9cXC9cXFtbXlxcXV0qXVteL10qLztcblxuICAgIHZhciBwcm92aWRlciA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgcHJvcGVydHlcbiAgICAgKiBAbmFtZSAkcmVzb3VyY2VQcm92aWRlciNkZWZhdWx0c1xuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIE9iamVjdCBjb250YWluaW5nIGRlZmF1bHQgb3B0aW9ucyB1c2VkIHdoZW4gY3JlYXRpbmcgYCRyZXNvdXJjZWAgaW5zdGFuY2VzLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWVzIHNhdGlzZnkgYSB3aWRlIHJhbmdlIG9mIHVzZWNhc2VzLCBidXQgeW91IG1heSBjaG9vc2UgdG8gb3ZlcndyaXRlIGFueSBvZlxuICAgICAqIHRoZW0gdG8gZnVydGhlciBjdXN0b21pemUgeW91ciBpbnN0YW5jZXMuIFRoZSBhdmFpbGFibGUgcHJvcGVydGllcyBhcmU6XG4gICAgICpcbiAgICAgKiAtICoqc3RyaXBUcmFpbGluZ1NsYXNoZXMqKiDigJMgYHtib29sZWFufWAg4oCTIElmIHRydWUsIHRoZW4gdGhlIHRyYWlsaW5nIHNsYXNoZXMgZnJvbSBhbnlcbiAgICAgKiAgIGNhbGN1bGF0ZWQgVVJMIHdpbGwgYmUgc3RyaXBwZWQuPGJyIC8+XG4gICAgICogICAoRGVmYXVsdHMgdG8gdHJ1ZS4pXG4gICAgICogLSAqKmNhbmNlbGxhYmxlKiog4oCTIGB7Ym9vbGVhbn1gIOKAkyBJZiB0cnVlLCB0aGUgcmVxdWVzdCBtYWRlIGJ5IGEgXCJub24taW5zdGFuY2VcIiBjYWxsIHdpbGwgYmVcbiAgICAgKiAgIGNhbmNlbGxlZCAoaWYgbm90IGFscmVhZHkgY29tcGxldGVkKSBieSBjYWxsaW5nIGAkY2FuY2VsUmVxdWVzdCgpYCBvbiB0aGUgY2FsbCdzIHJldHVyblxuICAgICAqICAgdmFsdWUuIEZvciBtb3JlIGRldGFpbHMsIHNlZSB7QGxpbmsgbmdSZXNvdXJjZS4kcmVzb3VyY2V9LiBUaGlzIGNhbiBiZSBvdmVyd3JpdHRlbiBwZXJcbiAgICAgKiAgIHJlc291cmNlIGNsYXNzIG9yIGFjdGlvbi48YnIgLz5cbiAgICAgKiAgIChEZWZhdWx0cyB0byBmYWxzZS4pXG4gICAgICogLSAqKmFjdGlvbnMqKiAtIGB7T2JqZWN0LjxPYmplY3Q+fWAgLSBBIGhhc2ggd2l0aCBkZWZhdWx0IGFjdGlvbnMgZGVjbGFyYXRpb25zLiBBY3Rpb25zIGFyZVxuICAgICAqICAgaGlnaC1sZXZlbCBtZXRob2RzIGNvcnJlc3BvbmRpbmcgdG8gUkVTVGZ1bCBhY3Rpb25zL21ldGhvZHMgb24gcmVzb3VyY2VzLiBBbiBhY3Rpb24gbWF5XG4gICAgICogICBzcGVjaWZ5IHdoYXQgSFRUUCBtZXRob2QgdG8gdXNlLCB3aGF0IFVSTCB0byBoaXQsIGlmIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICAgb2JqZWN0IG9yIGEgY29sbGVjdGlvbiAoYXJyYXkpIG9mIG9iamVjdHMgZXRjLiBGb3IgbW9yZSBkZXRhaWxzLCBzZWVcbiAgICAgKiAgIHtAbGluayBuZ1Jlc291cmNlLiRyZXNvdXJjZX0uIFRoZSBhY3Rpb25zIGNhbiBhbHNvIGJlIGVuaGFuY2VkIG9yIG92ZXJ3cml0dGVuIHBlciByZXNvdXJjZVxuICAgICAqICAgY2xhc3MuPGJyIC8+XG4gICAgICogICBUaGUgZGVmYXVsdCBhY3Rpb25zIGFyZTpcbiAgICAgKiAgIGBgYGpzXG4gICAgICogICB7XG4gICAgICogICAgIGdldDoge21ldGhvZDogJ0dFVCd9LFxuICAgICAqICAgICBzYXZlOiB7bWV0aG9kOiAnUE9TVCd9LFxuICAgICAqICAgICBxdWVyeToge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9LFxuICAgICAqICAgICByZW1vdmU6IHttZXRob2Q6ICdERUxFVEUnfSxcbiAgICAgKiAgICAgZGVsZXRlOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAgICAgKiAgIH1cbiAgICAgKiAgIGBgYFxuICAgICAqXG4gICAgICogIyMjIyBFeGFtcGxlXG4gICAgICpcbiAgICAgKiBGb3IgZXhhbXBsZSwgeW91IGNhbiBzcGVjaWZ5IGEgbmV3IGB1cGRhdGVgIGFjdGlvbiB0aGF0IHVzZXMgdGhlIGBQVVRgIEhUVFAgdmVyYjpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogICBhbmd1bGFyLlxuICAgICAqICAgICBtb2R1bGUoJ215QXBwJykuXG4gICAgICogICAgIGNvbmZpZyhbJyRyZXNvdXJjZVByb3ZpZGVyJywgZnVuY3Rpb24gKCRyZXNvdXJjZVByb3ZpZGVyKSB7XG4gICAgICogICAgICAgJHJlc291cmNlUHJvdmlkZXIuZGVmYXVsdHMuYWN0aW9ucy51cGRhdGUgPSB7XG4gICAgICogICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICogICAgICAgfTtcbiAgICAgKiAgICAgfV0pO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogT3IgeW91IGNhbiBldmVuIG92ZXJ3cml0ZSB0aGUgd2hvbGUgYGFjdGlvbnNgIGxpc3QgYW5kIHNwZWNpZnkgeW91ciBvd246XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICAgYW5ndWxhci5cbiAgICAgKiAgICAgbW9kdWxlKCdteUFwcCcpLlxuICAgICAqICAgICBjb25maWcoWyckcmVzb3VyY2VQcm92aWRlcicsIGZ1bmN0aW9uICgkcmVzb3VyY2VQcm92aWRlcikge1xuICAgICAqICAgICAgICRyZXNvdXJjZVByb3ZpZGVyLmRlZmF1bHRzLmFjdGlvbnMgPSB7XG4gICAgICogICAgICAgICBjcmVhdGU6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICogICAgICAgICBnZXQ6ICAgIHttZXRob2Q6ICdHRVQnfSxcbiAgICAgKiAgICAgICAgIGdldEFsbDoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6dHJ1ZX0sXG4gICAgICogICAgICAgICB1cGRhdGU6IHttZXRob2Q6ICdQVVQnfSxcbiAgICAgKiAgICAgICAgIGRlbGV0ZToge21ldGhvZDogJ0RFTEVURSd9XG4gICAgICogICAgICAgfTtcbiAgICAgKiAgICAgfSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKi9cbiAgICB0aGlzLmRlZmF1bHRzID0ge1xuICAgICAgLy8gU3RyaXAgc2xhc2hlcyBieSBkZWZhdWx0XG4gICAgICBzdHJpcFRyYWlsaW5nU2xhc2hlczogdHJ1ZSxcblxuICAgICAgLy8gTWFrZSBub24taW5zdGFuY2UgcmVxdWVzdHMgY2FuY2VsbGFibGUgKHZpYSBgJGNhbmNlbFJlcXVlc3QoKWApXG4gICAgICBjYW5jZWxsYWJsZTogZmFsc2UsXG5cbiAgICAgIC8vIERlZmF1bHQgYWN0aW9ucyBjb25maWd1cmF0aW9uXG4gICAgICBhY3Rpb25zOiB7XG4gICAgICAgICdnZXQnOiB7bWV0aG9kOiAnR0VUJ30sXG4gICAgICAgICdzYXZlJzoge21ldGhvZDogJ1BPU1QnfSxcbiAgICAgICAgJ3F1ZXJ5Jzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9LFxuICAgICAgICAncmVtb3ZlJzoge21ldGhvZDogJ0RFTEVURSd9LFxuICAgICAgICAnZGVsZXRlJzoge21ldGhvZDogJ0RFTEVURSd9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuJGdldCA9IFsnJGh0dHAnLCAnJGxvZycsICckcScsICckdGltZW91dCcsIGZ1bmN0aW9uKCRodHRwLCAkbG9nLCAkcSwgJHRpbWVvdXQpIHtcblxuICAgICAgdmFyIG5vb3AgPSBhbmd1bGFyLm5vb3AsXG4gICAgICAgICAgZm9yRWFjaCA9IGFuZ3VsYXIuZm9yRWFjaCxcbiAgICAgICAgICBleHRlbmQgPSBhbmd1bGFyLmV4dGVuZCxcbiAgICAgICAgICBjb3B5ID0gYW5ndWxhci5jb3B5LFxuICAgICAgICAgIGlzQXJyYXkgPSBhbmd1bGFyLmlzQXJyYXksXG4gICAgICAgICAgaXNEZWZpbmVkID0gYW5ndWxhci5pc0RlZmluZWQsXG4gICAgICAgICAgaXNGdW5jdGlvbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbixcbiAgICAgICAgICBpc051bWJlciA9IGFuZ3VsYXIuaXNOdW1iZXIsXG4gICAgICAgICAgZW5jb2RlVXJpUXVlcnkgPSBhbmd1bGFyLiQkZW5jb2RlVXJpUXVlcnksXG4gICAgICAgICAgZW5jb2RlVXJpU2VnbWVudCA9IGFuZ3VsYXIuJCRlbmNvZGVVcmlTZWdtZW50O1xuXG4gICAgICBmdW5jdGlvbiBSb3V0ZSh0ZW1wbGF0ZSwgZGVmYXVsdHMpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gZXh0ZW5kKHt9LCBwcm92aWRlci5kZWZhdWx0cywgZGVmYXVsdHMpO1xuICAgICAgICB0aGlzLnVybFBhcmFtcyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBSb3V0ZS5wcm90b3R5cGUgPSB7XG4gICAgICAgIHNldFVybFBhcmFtczogZnVuY3Rpb24oY29uZmlnLCBwYXJhbXMsIGFjdGlvblVybCkge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHVybCA9IGFjdGlvblVybCB8fCBzZWxmLnRlbXBsYXRlLFxuICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgZW5jb2RlZFZhbCxcbiAgICAgICAgICAgIHByb3RvY29sQW5kSXB2NiA9ICcnO1xuXG4gICAgICAgICAgdmFyIHVybFBhcmFtcyA9IHNlbGYudXJsUGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBmb3JFYWNoKHVybC5zcGxpdCgvXFxXLyksIGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICAgICAgICBpZiAocGFyYW0gPT09ICdoYXNPd25Qcm9wZXJ0eScpIHtcbiAgICAgICAgICAgICAgdGhyb3cgJHJlc291cmNlTWluRXJyKCdiYWRuYW1lJywgJ2hhc093blByb3BlcnR5IGlzIG5vdCBhIHZhbGlkIHBhcmFtZXRlciBuYW1lLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEobmV3IFJlZ0V4cCgnXlxcXFxkKyQnKS50ZXN0KHBhcmFtKSkgJiYgcGFyYW0gJiZcbiAgICAgICAgICAgICAgKG5ldyBSZWdFeHAoJyhefFteXFxcXFxcXFxdKTonICsgcGFyYW0gKyAnKFxcXFxXfCQpJykudGVzdCh1cmwpKSkge1xuICAgICAgICAgICAgICB1cmxQYXJhbXNbcGFyYW1dID0ge1xuICAgICAgICAgICAgICAgIGlzUXVlcnlQYXJhbVZhbHVlOiAobmV3IFJlZ0V4cCgnXFxcXD8uKj06JyArIHBhcmFtICsgJyg/OlxcXFxXfCQpJykpLnRlc3QodXJsKVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXFxcOi9nLCAnOicpO1xuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKFBST1RPQ09MX0FORF9JUFY2X1JFR0VYLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICAgICAgcHJvdG9jb2xBbmRJcHY2ID0gbWF0Y2g7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgICAgICAgZm9yRWFjaChzZWxmLnVybFBhcmFtcywgZnVuY3Rpb24ocGFyYW1JbmZvLCB1cmxQYXJhbSkge1xuICAgICAgICAgICAgdmFsID0gcGFyYW1zLmhhc093blByb3BlcnR5KHVybFBhcmFtKSA/IHBhcmFtc1t1cmxQYXJhbV0gOiBzZWxmLmRlZmF1bHRzW3VybFBhcmFtXTtcbiAgICAgICAgICAgIGlmIChpc0RlZmluZWQodmFsKSAmJiB2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKHBhcmFtSW5mby5pc1F1ZXJ5UGFyYW1WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGVuY29kZWRWYWwgPSBlbmNvZGVVcmlRdWVyeSh2YWwsIHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuY29kZWRWYWwgPSBlbmNvZGVVcmlTZWdtZW50KHZhbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UobmV3IFJlZ0V4cCgnOicgKyB1cmxQYXJhbSArICcoXFxcXFd8JCknLCAnZycpLCBmdW5jdGlvbihtYXRjaCwgcDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlZFZhbCArIHAxO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJygvPyk6JyArIHVybFBhcmFtICsgJyhcXFxcV3wkKScsICdnJyksIGZ1bmN0aW9uKG1hdGNoLFxuICAgICAgICAgICAgICAgICAgbGVhZGluZ1NsYXNoZXMsIHRhaWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFpbC5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhaWw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWFkaW5nU2xhc2hlcyArIHRhaWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIHN0cmlwIHRyYWlsaW5nIHNsYXNoZXMgYW5kIHNldCB0aGUgdXJsICh1bmxlc3MgdGhpcyBiZWhhdmlvciBpcyBzcGVjaWZpY2FsbHkgZGlzYWJsZWQpXG4gICAgICAgICAgaWYgKHNlbGYuZGVmYXVsdHMuc3RyaXBUcmFpbGluZ1NsYXNoZXMpIHtcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC8rJC8sICcnKSB8fCAnLyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29sbGFwc2UgYC8uYCBpZiBmb3VuZCBpbiB0aGUgbGFzdCBVUkwgcGF0aCBzZWdtZW50IGJlZm9yZSB0aGUgcXVlcnkuXG4gICAgICAgICAgLy8gRS5nLiBgaHR0cDovL3VybC5jb20vaWQvLmZvcm1hdD9xPXhgIGJlY29tZXMgYGh0dHA6Ly91cmwuY29tL2lkLmZvcm1hdD9xPXhgLlxuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC9cXC4oPz1cXHcrKCR8XFw/KSkvLCAnLicpO1xuICAgICAgICAgIC8vIFJlcGxhY2UgZXNjYXBlZCBgL1xcLmAgd2l0aCBgLy5gLlxuICAgICAgICAgIC8vIChJZiBgXFwuYCBjb21lcyBmcm9tIGEgcGFyYW0gdmFsdWUsIGl0IHdpbGwgYmUgZW5jb2RlZCBhcyBgJTVDLmAuKVxuICAgICAgICAgIGNvbmZpZy51cmwgPSBwcm90b2NvbEFuZElwdjYgKyB1cmwucmVwbGFjZSgvXFwvKFxcXFx8JTVDKVxcLi8sICcvLicpO1xuXG5cbiAgICAgICAgICAvLyBzZXQgcGFyYW1zIC0gZGVsZWdhdGUgcGFyYW0gZW5jb2RpbmcgdG8gJGh0dHBcbiAgICAgICAgICBmb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLnVybFBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICAgIGNvbmZpZy5wYXJhbXMgPSBjb25maWcucGFyYW1zIHx8IHt9O1xuICAgICAgICAgICAgICBjb25maWcucGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuXG4gICAgICBmdW5jdGlvbiByZXNvdXJjZUZhY3RvcnkodXJsLCBwYXJhbURlZmF1bHRzLCBhY3Rpb25zLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciByb3V0ZSA9IG5ldyBSb3V0ZSh1cmwsIG9wdGlvbnMpO1xuXG4gICAgICAgIGFjdGlvbnMgPSBleHRlbmQoe30sIHByb3ZpZGVyLmRlZmF1bHRzLmFjdGlvbnMsIGFjdGlvbnMpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGV4dHJhY3RQYXJhbXMoZGF0YSwgYWN0aW9uUGFyYW1zKSB7XG4gICAgICAgICAgdmFyIGlkcyA9IHt9O1xuICAgICAgICAgIGFjdGlvblBhcmFtcyA9IGV4dGVuZCh7fSwgcGFyYW1EZWZhdWx0cywgYWN0aW9uUGFyYW1zKTtcbiAgICAgICAgICBmb3JFYWNoKGFjdGlvblBhcmFtcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7IHZhbHVlID0gdmFsdWUoZGF0YSk7IH1cbiAgICAgICAgICAgIGlkc1trZXldID0gdmFsdWUgJiYgdmFsdWUuY2hhckF0ICYmIHZhbHVlLmNoYXJBdCgwKSA9PT0gJ0AnID9cbiAgICAgICAgICAgICAgbG9va3VwRG90dGVkUGF0aChkYXRhLCB2YWx1ZS5zdWJzdHIoMSkpIDogdmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGlkcztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRlZmF1bHRSZXNwb25zZUludGVyY2VwdG9yKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlc291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gUmVzb3VyY2UodmFsdWUpIHtcbiAgICAgICAgICBzaGFsbG93Q2xlYXJBbmRDb3B5KHZhbHVlIHx8IHt9LCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFJlc291cmNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGV4dGVuZCh7fSwgdGhpcyk7XG4gICAgICAgICAgZGVsZXRlIGRhdGEuJHByb21pc2U7XG4gICAgICAgICAgZGVsZXRlIGRhdGEuJHJlc29sdmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhLiRjYW5jZWxSZXF1ZXN0O1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvckVhY2goYWN0aW9ucywgZnVuY3Rpb24oYWN0aW9uLCBuYW1lKSB7XG4gICAgICAgICAgdmFyIGhhc0JvZHkgPSBhY3Rpb24uaGFzQm9keSA9PT0gdHJ1ZSB8fCAoYWN0aW9uLmhhc0JvZHkgIT09IGZhbHNlICYmIC9eKFBPU1R8UFVUfFBBVENIKSQvaS50ZXN0KGFjdGlvbi5tZXRob2QpKTtcbiAgICAgICAgICB2YXIgbnVtZXJpY1RpbWVvdXQgPSBhY3Rpb24udGltZW91dDtcbiAgICAgICAgICB2YXIgY2FuY2VsbGFibGUgPSBpc0RlZmluZWQoYWN0aW9uLmNhbmNlbGxhYmxlKSA/XG4gICAgICAgICAgICAgIGFjdGlvbi5jYW5jZWxsYWJsZSA6IHJvdXRlLmRlZmF1bHRzLmNhbmNlbGxhYmxlO1xuXG4gICAgICAgICAgaWYgKG51bWVyaWNUaW1lb3V0ICYmICFpc051bWJlcihudW1lcmljVGltZW91dCkpIHtcbiAgICAgICAgICAgICRsb2cuZGVidWcoJ25nUmVzb3VyY2U6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIE9ubHkgbnVtZXJpYyB2YWx1ZXMgYXJlIGFsbG93ZWQgYXMgYHRpbWVvdXRgLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICBQcm9taXNlcyBhcmUgbm90IHN1cHBvcnRlZCBpbiAkcmVzb3VyY2UsIGJlY2F1c2UgdGhlIHNhbWUgdmFsdWUgd291bGQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICdiZSB1c2VkIGZvciBtdWx0aXBsZSByZXF1ZXN0cy4gSWYgeW91IGFyZSBsb29raW5nIGZvciBhIHdheSB0byBjYW5jZWwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICdyZXF1ZXN0cywgeW91IHNob3VsZCB1c2UgdGhlIGBjYW5jZWxsYWJsZWAgb3B0aW9uLicpO1xuICAgICAgICAgICAgZGVsZXRlIGFjdGlvbi50aW1lb3V0O1xuICAgICAgICAgICAgbnVtZXJpY1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIFJlc291cmNlW25hbWVdID0gZnVuY3Rpb24oYTEsIGEyLCBhMywgYTQpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7fSwgZGF0YSwgb25TdWNjZXNzLCBvbkVycm9yO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIG9uRXJyb3IgPSBhNDtcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3MgPSBhMztcbiAgICAgICAgICAgICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGEyKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oYTEpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcyA9IGExO1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yID0gYTI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MgPSBhMjtcbiAgICAgICAgICAgICAgICAgIG9uRXJyb3IgPSBhMztcbiAgICAgICAgICAgICAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGFyYW1zID0gYTE7XG4gICAgICAgICAgICAgICAgICBkYXRhID0gYTI7XG4gICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MgPSBhMztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihhMSkpIG9uU3VjY2VzcyA9IGExO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0JvZHkpIGRhdGEgPSBhMTtcbiAgICAgICAgICAgICAgICBlbHNlIHBhcmFtcyA9IGExO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDA6IGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93ICRyZXNvdXJjZU1pbkVycignYmFkYXJncycsXG4gICAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgdXAgdG8gNCBhcmd1bWVudHMgW3BhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3JdLCBnb3QgezB9IGFyZ3VtZW50cycsXG4gICAgICAgICAgICAgICAgICBhcmd1bWVudHMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGlzSW5zdGFuY2VDYWxsID0gdGhpcyBpbnN0YW5jZW9mIFJlc291cmNlO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gaXNJbnN0YW5jZUNhbGwgPyBkYXRhIDogKGFjdGlvbi5pc0FycmF5ID8gW10gOiBuZXcgUmVzb3VyY2UoZGF0YSkpO1xuICAgICAgICAgICAgdmFyIGh0dHBDb25maWcgPSB7fTtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0SW50ZXJjZXB0b3IgPSBhY3Rpb24uaW50ZXJjZXB0b3IgJiYgYWN0aW9uLmludGVyY2VwdG9yLnJlcXVlc3QgfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RFcnJvckludGVyY2VwdG9yID0gYWN0aW9uLmludGVyY2VwdG9yICYmIGFjdGlvbi5pbnRlcmNlcHRvci5yZXF1ZXN0RXJyb3IgfHxcbiAgICAgICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlSW50ZXJjZXB0b3IgPSBhY3Rpb24uaW50ZXJjZXB0b3IgJiYgYWN0aW9uLmludGVyY2VwdG9yLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICAgIGRlZmF1bHRSZXNwb25zZUludGVyY2VwdG9yO1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlRXJyb3JJbnRlcmNlcHRvciA9IGFjdGlvbi5pbnRlcmNlcHRvciAmJiBhY3Rpb24uaW50ZXJjZXB0b3IucmVzcG9uc2VFcnJvciB8fFxuICAgICAgICAgICAgICAkcS5yZWplY3Q7XG4gICAgICAgICAgICB2YXIgc3VjY2Vzc0NhbGxiYWNrID0gb25TdWNjZXNzID8gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgIG9uU3VjY2Vzcyh2YWwsIHJlc3BvbnNlLmhlYWRlcnMsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICB9IDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIGVycm9yQ2FsbGJhY2sgPSBvbkVycm9yIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciB0aW1lb3V0RGVmZXJyZWQ7XG4gICAgICAgICAgICB2YXIgbnVtZXJpY1RpbWVvdXRQcm9taXNlO1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgICAgICBmb3JFYWNoKGFjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBodHRwQ29uZmlnW2tleV0gPSBjb3B5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BhcmFtcyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnaXNBcnJheSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnaW50ZXJjZXB0b3InOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGxhYmxlJzpcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFpc0luc3RhbmNlQ2FsbCAmJiBjYW5jZWxsYWJsZSkge1xuICAgICAgICAgICAgICB0aW1lb3V0RGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgICBodHRwQ29uZmlnLnRpbWVvdXQgPSB0aW1lb3V0RGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICAgICAgICBpZiAobnVtZXJpY1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBudW1lcmljVGltZW91dFByb21pc2UgPSAkdGltZW91dCh0aW1lb3V0RGVmZXJyZWQucmVzb2x2ZSwgbnVtZXJpY1RpbWVvdXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChoYXNCb2R5KSBodHRwQ29uZmlnLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgcm91dGUuc2V0VXJsUGFyYW1zKGh0dHBDb25maWcsXG4gICAgICAgICAgICAgIGV4dGVuZCh7fSwgZXh0cmFjdFBhcmFtcyhkYXRhLCBhY3Rpb24ucGFyYW1zIHx8IHt9KSwgcGFyYW1zKSxcbiAgICAgICAgICAgICAgYWN0aW9uLnVybCk7XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IHRoZSBwcm9taXNlIGNoYWluXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLlxuICAgICAgICAgICAgICByZXNvbHZlKGh0dHBDb25maWcpLlxuICAgICAgICAgICAgICB0aGVuKHJlcXVlc3RJbnRlcmNlcHRvcikuXG4gICAgICAgICAgICAgIGNhdGNoKHJlcXVlc3RFcnJvckludGVyY2VwdG9yKS5cbiAgICAgICAgICAgICAgdGhlbigkaHR0cCk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3AuZGF0YTtcblxuICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gY29udmVydCBhY3Rpb24uaXNBcnJheSB0byBib29sZWFuIGluIGNhc2UgaXQgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoZGF0YSkgIT09ICghIWFjdGlvbi5pc0FycmF5KSkge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgJHJlc291cmNlTWluRXJyKCdiYWRjZmcnLFxuICAgICAgICAgICAgICAgICAgICAgICdFcnJvciBpbiByZXNvdXJjZSBjb25maWd1cmF0aW9uIGZvciBhY3Rpb24gYHswfWAuIEV4cGVjdGVkIHJlc3BvbnNlIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICdjb250YWluIGFuIHsxfSBidXQgZ290IGFuIHsyfSAoUmVxdWVzdDogezN9IHs0fSknLCBuYW1lLCBhY3Rpb24uaXNBcnJheSA/ICdhcnJheScgOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgaXNBcnJheShkYXRhKSA/ICdhcnJheScgOiAnb2JqZWN0JywgaHR0cENvbmZpZy5tZXRob2QsIGh0dHBDb25maWcudXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgZm9yRWFjaChkYXRhLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKG5ldyBSZXNvdXJjZShpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWQgSlNPTiB2YWx1ZXMgbWF5IGJlIHN0cmluZyBsaXRlcmFscywgYW5kIHRoZXNlIHNob3VsZCBub3QgYmUgY29udmVydGVkXG4gICAgICAgICAgICAgICAgICAgICAgLy8gaW50byBvYmplY3RzLiBUaGVzZSBpdGVtcyB3aWxsIG5vdCBoYXZlIGFjY2VzcyB0byB0aGUgUmVzb3VyY2UgcHJvdG90eXBlXG4gICAgICAgICAgICAgICAgICAgICAgLy8gbWV0aG9kcywgYnV0IHVuZm9ydHVuYXRlbHkgdGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSB2YWx1ZS4kcHJvbWlzZTsgICAgIC8vIFNhdmUgdGhlIHByb21pc2VcbiAgICAgICAgICAgICAgICAgIHNoYWxsb3dDbGVhckFuZENvcHkoZGF0YSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgdmFsdWUuJHByb21pc2UgPSBwcm9taXNlOyAgICAgICAgIC8vIFJlc3RvcmUgdGhlIHByb21pc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXNwLnJlc291cmNlID0gdmFsdWU7XG4gICAgICAgICAgICAgIHJlc3BvbnNlID0gcmVzcDtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlSW50ZXJjZXB0b3IocmVzcCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZWplY3Rpb25PclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHJlamVjdGlvbk9yUmVzcG9uc2UucmVzb3VyY2UgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZWplY3Rpb25PclJlc3BvbnNlO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VFcnJvckludGVyY2VwdG9yKHJlamVjdGlvbk9yUmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlWydmaW5hbGx5J10oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhbHVlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGlmICghaXNJbnN0YW5jZUNhbGwgJiYgY2FuY2VsbGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS4kY2FuY2VsUmVxdWVzdCA9IG5vb3A7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKG51bWVyaWNUaW1lb3V0UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgdGltZW91dERlZmVycmVkID0gbnVtZXJpY1RpbWVvdXRQcm9taXNlID0gaHR0cENvbmZpZy50aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFJ1biB0aGUgYHN1Y2Nlc3NgL2BlcnJvcmAgY2FsbGJhY2tzLCBidXQgZG8gbm90IGxldCB0aGVtIGFmZmVjdCB0aGUgcmV0dXJuZWQgcHJvbWlzZS5cbiAgICAgICAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICBpZiAoIWlzSW5zdGFuY2VDYWxsKSB7XG4gICAgICAgICAgICAgIC8vIHdlIGFyZSBjcmVhdGluZyBpbnN0YW5jZSAvIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgLy8gLSBzZXQgdGhlIGluaXRpYWwgcHJvbWlzZVxuICAgICAgICAgICAgICAvLyAtIHJldHVybiB0aGUgaW5zdGFuY2UgLyBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgIHZhbHVlLiRwcm9taXNlID0gcHJvbWlzZTtcbiAgICAgICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChjYW5jZWxsYWJsZSkgdmFsdWUuJGNhbmNlbFJlcXVlc3QgPSBjYW5jZWxSZXF1ZXN0O1xuXG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW5zdGFuY2UgY2FsbFxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhbmNlbFJlcXVlc3QodmFsdWUpIHtcbiAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChub29wKTtcbiAgICAgICAgICAgICAgaWYgKHRpbWVvdXREZWZlcnJlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXREZWZlcnJlZC5yZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cblxuICAgICAgICAgIFJlc291cmNlLnByb3RvdHlwZVsnJCcgKyBuYW1lXSA9IGZ1bmN0aW9uKHBhcmFtcywgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgZXJyb3IgPSBzdWNjZXNzOyBzdWNjZXNzID0gcGFyYW1zOyBwYXJhbXMgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBSZXNvdXJjZVtuYW1lXS5jYWxsKHRoaXMsIHBhcmFtcywgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFJlc291cmNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzb3VyY2VGYWN0b3J5O1xuICAgIH1dO1xuICB9KTtcblxuXG59KSh3aW5kb3csIHdpbmRvdy5hbmd1bGFyKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcmVzb3VyY2UvYW5ndWxhci1yZXNvdXJjZS5qc1xuLy8gbW9kdWxlIGlkID0gNzU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJhbGdvLWNvbnRhaW5lclxcXCIgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGxheW91dC1hbGlnbj1cXFwic3RhcnQgY2VudGVyXFxcIiBtZC10aGVtZT1cXFwiYWxnb1xcXCIgYXAtbWQtY29sb3I9XFxcInsnYmFja2dyb3VuZC1jb2xvcic6ICdhbGdvOjpwcmltYXJ5J31cXFwiPlxcclxcbiAgICA8bWQtdGFicyBtZC1ib3JkZXItYm90dG9tIG1kLXNlbGVjdGVkPVxcXCJ2bS5hY3RpdmVUYWJJbmRleFxcXCI+XFxyXFxuICAgICAgICA8bWQtdGFiIGxhYmVsPVxcXCJWUlBcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZ28td3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDx2cnAtZHJhdz48L3ZycC1kcmF3PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9tZC10YWI+XFxyXFxuICAgICAgICA8bWQtdGFiIGxhYmVsPVxcXCJUU1BcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZ28td3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxyb3V0ZS1kcmF3Pjwvcm91dGUtZHJhdz5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvbWQtdGFiPlxcclxcbiAgICAgICAgPG1kLXRhYiBsYWJlbD1cXFwiay1NZWFuc1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxnby13cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGstbWVhbj48L2stbWVhbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvbWQtdGFiPlxcclxcbiAgICAgICAgPG1kLXRhYiBsYWJlbD1cXFwiREJTQ0FOXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLXdyYXBwZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGJzY2FuPjwvZGJzY2FuPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9tZC10YWI+XFxyXFxuICAgIDwvbWQtdGFicz5cXHJcXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3RlbXBsYXRlcy9hbGdvLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDc2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXBpLXJlcXVlc3RzLmpzXCI6IDc2Mixcblx0XCIuL21kLWNvbnN0YW50cy5qc1wiOiA3NjNcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3NjE7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29uc3RhbnRzIC4rXFwuanMkXG4vLyBtb2R1bGUgaWQgPSA3NjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5jb25zdGFudCgnYXBpUmVxdWVzdENvbmZpZycsIHtcclxuXHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29uc3RhbnRzL2FwaS1yZXF1ZXN0cy5qc1xuLy8gbW9kdWxlIGlkID0gNzYyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMTIuMDkuMjAxNi5cclxuICogTWF0ZXJpYWwgRGVzaWduIGNvbnN0YW50c1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5jb25zdGFudCgnbWRDb25zdGFudHMnLCB7XHJcbiAgICAgICAgYXZhdGFyU2l6ZTogNDAsXHJcbiAgICAgICAgcGFkZGluZ1NpemU6IDE2LFxyXG4gICAgICAgIHN0ZFRleHRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC44NyknXHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29uc3RhbnRzL21kLWNvbnN0YW50cy5qc1xuLy8gbW9kdWxlIGlkID0gNzYzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9yb3V0ZS1jb250cm9sbGVyLmpzXCI6IDc2NVxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDc2NDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb250cm9sbGVycyAuK1xcLmpzJFxuLy8gbW9kdWxlIGlkID0gNzY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuY29udHJvbGxlcignUm91dGVDb250cm9sbGVyJywgUm91dGVDb250cm9sbGVyKTtcclxuICAgIFJvdXRlQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBSb3V0ZUNvbnRyb2xsZXIgKCRzY29wZSkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlVGFiSW5kZXggPSAwO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSb3V0ZSBDdHJsIGluaXQnKVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbnRyb2xsZXJzL3JvdXRlLWNvbnRyb2xsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXAtbWQtY29sb3IuanNcIjogNzY3LFxuXHRcIi4vcmVzaXplci5qc1wiOiA3Njhcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3NjY7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZGlyZWN0aXZlcyAuK1xcLmpzJFxuLy8gbW9kdWxlIGlkID0gNzY2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHBhc3RvciBvbiA2LzI1LzIwMTYuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLmRpcmVjdGl2ZSgnYXBNZENvbG9yJywgYXBNZENvbG9yRGlyZWN0aXZlKTtcclxuICAgIGFwTWRDb2xvckRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckbWRUaGVtaW5nJywgJyRtZENvbG9yUGFsZXR0ZScsICckY29sb3JkZWYnXTtcclxuICAgIGZ1bmN0aW9uIGFwTWRDb2xvckRpcmVjdGl2ZSgkbWRUaGVtaW5nLCAkbWRDb2xvclBhbGV0dGUsICRjb2xvcmRlZikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIC8vc2NvcGU6IHtcclxuICAgICAgICAgICAgLy8gICAgbWRDb2xvcjogJz1hcE1kQ29sb3InXHJcbiAgICAgICAgICAgIC8vfSxcclxuICAgICAgICAgICAgbGluazogbGlua1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IHt9O1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCRtZENvbG9yUGFsZXR0ZSk7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJG1kVGhlbWluZy5USEVNRVMuZGVmYXVsdCk7XHJcbiAgICAgICAgICAgIHZhciBjb2xvciA9IHNjb3BlLiRldmFsKGF0dHJzLmFwTWRDb2xvcik7XHJcblxyXG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goY29sb3IsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICAgICAgICAgICAgICBzdHlsZVtrZXldID0gJGNvbG9yZGVmLmdldENvbG9yKHZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBlbGVtZW50LmNzcyhzdHlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL2FwLW1kLWNvbG9yLmpzXG4vLyBtb2R1bGUgaWQgPSA3Njdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAyMi4wNS4yMDE3LlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuZGlyZWN0aXZlKCdyZXNpemVyJywgcmVzaXplckRpcmVjdGl2ZSk7XHJcbiAgICByZXNpemVyRGlyZWN0aXZlLiRpbmplY3QgPSBbJyRxJywgJyR0aW1lb3V0JywgJ3Jlc2l6ZVNlbnNvciddO1xyXG4gICAgZnVuY3Rpb24gcmVzaXplckRpcmVjdGl2ZSgkcSwgJHRpbWVvdXQsIHJlc2l6ZVNlbnNvcikge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnQScsXHJcbiAgICAgICAgICAgIGxpbms6IGxpbmtcclxuICAgICAgICB9O1xyXG4gICAgICAgIGZ1bmN0aW9uIGxpbmsgKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICBjb25zdCBycyA9IHJlc2l6ZVNlbnNvci5nZXRJbnN0YW5jZShlbGVtZW50LnBhcmVudCgpKTtcclxuICAgICAgICAgICAgY29uc3Qgb2Zmc2V0ID0gcGFyc2VJbnQoYXR0cnMucmVzaXplciwgMTApIHx8IDA7XHJcblxyXG4gICAgICAgICAgICBpc0F0dGFjaGVkKGVsZW1lbnQucGFyZW50KCkpLnRoZW4oKGluZm8pID0+IHtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVNpemUoZWxlbWVudCwgaW5mby5yZWN0LndpZHRoLCBpbmZvLnJlY3QuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHJzLmF0dGFjaFJlc2l6ZUV2ZW50KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdywgaDtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoID0gZWxlbWVudC5wYXJlbnQoKVswXS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBlbGVtZW50LnBhcmVudCgpWzBdLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUlMgZmlyZWQ6ICR7d30geCAke2h9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChoICYmICFpc05hTihoKSAmJiBoICE9PSBlbGVtZW50WzBdLm9mZnNldEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlU2l6ZShlbGVtZW50LCB3LCBoICsgb2Zmc2V0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNjb3BlLiRvbignJGRlc3Ryb3knLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBycy5kZXRhY2hSZXNpemVFdmVudCgpO1xyXG4gICAgICAgICAgICAgICAgcnMucXVldWUuZmx1c2goKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVNpemUgKGVsLCB3LCBoKSB7XHJcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHIoJ3N0eWxlJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICd3aWR0aCc6IHcgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgJ2hlaWdodCc6IGggKyAncHgnXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpc0F0dGFjaGVkIChlbGVtLCBjb3VudCA9IDApIHtcclxuICAgICAgICAgICAgbGV0IGVsZW1SZWN0O1xyXG4gICAgICAgICAgICByZXR1cm4gJHEoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtUmVjdCA9IGVsZW1bMF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZWxlbVJlY3Qud2lkdGggJiYgZWxlbVJlY3QuaGVpZ2h0KSB8fCBjb3VudCA+IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtyZWN0OiBlbGVtUmVjdCwgY291bnQ6IGNvdW50fSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyAnRWxlbWVudCBub3QgaW4gRE9NIHlldCdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvdW50IDwgMTAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpc0F0dGFjaGVkKGVsZW0sIGNvdW50ICsgMTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY3Q6IHt3aWR0aDogMCwgaGVpZ2h0OiAwfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudDogY291bnRcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2RpcmVjdGl2ZXMvcmVzaXplci5qc1xuLy8gbW9kdWxlIGlkID0gNzY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9jb2xvci1kZWYtc2VydmljZS5qc1wiOiA3NzAsXG5cdFwiLi9kYXRlLXV0aWxzLXByb3ZpZGVyLmpzXCI6IDc3MSxcblx0XCIuL2RvdWJsZS1zZXJ2aWNlLmpzXCI6IDc3Mixcblx0XCIuL2V2ZW50LWVtaXR0ZXItc2VydmljZS5qc1wiOiA3NzMsXG5cdFwiLi9yZXNpemUtc2Vuc29yLmpzXCI6IDc3NCxcblx0XCIuL3NsYXNoLXBhcmFtLXNlcmlhbGl6ZXIuanNcIjogNzc1LFxuXHRcIi4vc3RvcmFnZS1wcm92aWRlci5qc1wiOiA3NzZcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3Njk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMgLitcXC5qcyRcbi8vIG1vZHVsZSBpZCA9IDc2OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ3JlYXRlZCBieSBwYXN0b3Igb24gOC8yMS8yMDE2LlxyXG4gKiBTaW1wbGUgc2VydmljZSB0byBnZXQgY3NzLWZvcm1hdHRlZCBjb2xvcnMgZnJvbSBtZFRoZW1pbmcgYW5kIG1kQ29sb3JQYWxldHRlJ3NcclxuICogVmFsaWQgc3RyaW5nIGZvcm1hdHM6XHJcbiAqICdwYWxldHRlOjpsaWdodC1ibHVlOjpBMjAwJ1xyXG4gKiAncGFsZXR0ZTo6cmVkOjoyMDAnXHJcbiAqICdjdXN0b21UaGVtZTo6cHJpbWFyeSdcclxuICogJ2N1c3RvbVRoZW1lOjpwcmltYXJ5OjpodWUtMidcclxuICogJ3dhcm4nXHJcbiAqICdhY2NlbnQ6Omh1ZS0yJ1xyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5zZXJ2aWNlKCckY29sb3JkZWYnLCBjb2xvckRlZlNlcnZpY2UpO1xyXG4gICAgY29sb3JEZWZTZXJ2aWNlLiRpbmplY3QgPSBbJyRtZFRoZW1pbmcnLCAnJG1kQ29sb3JQYWxldHRlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gY29sb3JEZWZTZXJ2aWNlKCRtZFRoZW1pbmcsICRtZENvbG9yUGFsZXR0ZSkge1xyXG4gICAgICAgIGNvbnN0IGludGVudGlvbnMgPSBbJ3ByaW1hcnknLCAnYWNjZW50JywgJ3dhcm4nLCAnYmFja2dyb3VuZCddO1xyXG5cclxuICAgICAgICB0aGlzLmdldFJHQiA9IChkZWZTdHJpbmcpID0+IHtcclxuICAgICAgICAgICAgZGVmU3RyaW5nID0gZGVmU3RyaW5nIHx8ICdwcmltYXJ5JztcclxuICAgICAgICAgICAgY29uc3QgZGVmQXJyYXkgPSBkZWZTdHJpbmcuc3BsaXQoJzo6Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yRGVmID0ge307XHJcbiAgICAgICAgICAgIGxldCBpbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoZGVmQXJyYXlbMF0gPT09ICdwYWxldHRlJykge1xyXG4gICAgICAgICAgICAgICAgY29sb3JEZWYucGFsZXR0ZSA9IGRlZkFycmF5WzFdO1xyXG4gICAgICAgICAgICAgICAgY29sb3JEZWYudmFyaWFudCA9IGRlZkFycmF5WzJdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKGludGVudGlvbnMuaW5kZXhPZihkZWZBcnJheVswXSkgPiAtMSkgeyAvL2RlZkFycmF5WzBdICE9PSAnZGVmYXVsdCcgfHxcclxuICAgICAgICAgICAgICAgICAgICBkZWZBcnJheS51bnNoaWZ0KCdkZWZhdWx0Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRlZkFycmF5WzJdKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmQXJyYXlbMl0gPSAnZGVmYXVsdCc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpbnRlbnQgPSAkbWRUaGVtaW5nLlRIRU1FU1tkZWZBcnJheVswXV0uY29sb3JzW2RlZkFycmF5WzFdXTtcclxuICAgICAgICAgICAgICAgIGNvbG9yRGVmLnBhbGV0dGUgPSBpbnRlbnQubmFtZTtcclxuICAgICAgICAgICAgICAgIGNvbG9yRGVmLnZhcmlhbnQgPSBpbnRlbnQuaHVlc1tkZWZBcnJheVsyXV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICRtZENvbG9yUGFsZXR0ZVtjb2xvckRlZi5wYWxldHRlXVtjb2xvckRlZi52YXJpYW50XS52YWx1ZTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0Q29sb3IgPSAoZGVmU3RyaW5nLCBvcGFjaXR5ID0gMSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCByZXNDb2xvciA9IHRoaXMuZ2V0UkdCKGRlZlN0cmluZyk7XHJcbiAgICAgICAgICAgIHJldHVybiBgcmdiYSgke3Jlc0NvbG9yLmpvaW4oJywgJyl9LCAke29wYWNpdHl9KWA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm51bVRvQ29sb3IgPSAobnVtKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm51bVRvUmdiYShudW0pLm1hcCgocmdiYSkgPT4gdGhpcy5yZ2JhVG9DU1MocmdiYSkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5udW1Ub1JnYmEgPSAobnVtKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghbnVtKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbWzAsIDAsIDAsIDAuMTJdLCBbMCwgMCwgMCwgMC43OF1dXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc2hhZGVzID0gWzUwMCwgNDAwLCA2MDAsIDMwMCwgNzAwXTtcclxuICAgICAgICAgICAgY29uc3QgcGFsZXR0ZXMgPSBPYmplY3Qua2V5cygkbWRDb2xvclBhbGV0dGUpO1xyXG4gICAgICAgICAgICBjb25zdCBjb2RlID0gbnVtLnRvU3RyaW5nKDEwKS5wYWRTdGFydCg1LCAnMCcpO1xyXG4gICAgICAgICAgICBjb25zdCBtYWluID0gcGFsZXR0ZXNbcGFyc2VJbnQoY29kZS5zbGljZSgtMikpICUgcGFsZXR0ZXMubGVuZ3RoXTtcclxuICAgICAgICAgICAgY29uc3Qgc2hhZGUgPSBzaGFkZXNbcGFyc2VJbnQoY29kZS5zbGljZSgwLCAtMikpICUgc2hhZGVzLmxlbmd0aF0udG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgcmV0dXJuIFskbWRDb2xvclBhbGV0dGVbbWFpbl1bc2hhZGVdLnZhbHVlLmNvbmNhdChbMV0pLCAkbWRDb2xvclBhbGV0dGVbbWFpbl1bc2hhZGVdLmNvbnRyYXN0LnNsaWNlKCldXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnJnYmFUb0NTUyA9IChhcnIpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGByZ2JhKCR7YXJyLmpvaW4oKX0pYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL2NvbG9yLWRlZi1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAucHJvdmlkZXIoJ2RhdGVVdGlscycsIGRhdGVVdGlsc1Byb3ZpZGVyKTtcclxuICAgIGRhdGVVdGlsc1Byb3ZpZGVyLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBkYXRlVXRpbHNQcm92aWRlcigpIHtcclxuICAgICAgICBjb25zdCBfZGF0ZVJlZ0V4cCA9IHtcclxuICAgICAgICAgICAgaHVtYW5EYXRlOiAvXlxcZCsoWy5cXC1cXC9cXFxcXSlcXGQrWy5cXC1cXC9cXFxcXVxcZCskLyxcclxuICAgICAgICAgICAgbW9udGhEYXRlOiAvXltBLVphLXpdK1tcXHNcXC1fJy5dK1xcZHsyLDR9JC8sXHJcbiAgICAgICAgICAgIGRvdG5ldERhdGU6IC9cXC9EYXRlXFwoW1xcZFxcLV0rXFwpXFwvLyxcclxuICAgICAgICAgICAgdW5peERhdGU6IC9eXFxkezEzLH0kLyxcclxuICAgICAgICAgICAgaXNvRGF0ZTogL15cXGR7NH0tXFxkezJ9LVxcZHsyfVQuKiQvXHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBfZGF0ZUZvcm1hdCA9IHtcclxuICAgICAgICAgICAgaHVtYW5EYXRlOiBbJ0RELk1NLllZWVknLCAnREQuTU0uWVknLCAnREQtTU0tWVlZWScsICdZWVlZLU1NLUREJywgJ0RELU1NLVlZJywgJ01NL0REL1lZJywgJ01NL0REL1lZWVknXSxcclxuICAgICAgICAgICAgbW9udGhEYXRlOiBbJ01NTSBZWVlZJywgJ01NTSBZWScsICdNTU1NIFlZWVknLCAnTU0uWVknLCAnTU0vWVknLCAnTU0uWVlZWScsICdNTS9ZWVlZJ11cclxuICAgICAgICB9O1xyXG4gICAgICAgIGxldCBfaW5zdGFuY2UgPSBudWxsO1xyXG5cclxuICAgICAgICBjbGFzcyBBUERhdGVVdGlscyB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRlUmVnRXhwID0gX2RhdGVSZWdFeHA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9kYXRlRm9ybWF0ID0gX2RhdGVGb3JtYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGRhdGVSZWdFeHAoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlUmVnRXhwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGRhdGVGb3JtYXQoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kYXRlRm9ybWF0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IG5vdygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCgpLnN0YXJ0T2YoJ0QnKS50b0RhdGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBwcmV2TW9udGgoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnTScpLnN0YXJ0T2YoJ0QnKS50b0RhdGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBuZXh0TW9udGgoKXtcclxuICAgICAgICAgICAgICAgIG1vbWVudCgpLmFkZCgxLCAnTScpLnN0YXJ0T2YoJ0QnKS50b0RhdGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBwcmV2WWVhcigpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCgpLnN1YnRyYWN0KDEsICdZJykuc3RhcnRPZignRCcpLnRvRGF0ZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IG5leHRZZWFyKCl7XHJcbiAgICAgICAgICAgICAgICBtb21lbnQoKS5hZGQoMSwgJ1knKS5zdGFydE9mKCdEJykudG9EYXRlKClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhcnRPZk1vbnRoKG1vbnRoID0gbmV3IERhdGUoKS5nZXRNb250aCgpLCB5ZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBkYXRlID0gbmV3IERhdGUoKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9udGggaW5zdGFuY2VvZiBEYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMudXRjQXNMb2NhbChtb250aCkpLnN0YXJ0T2YoJ00nKS5zdGFydE9mKCdEJykudG9EYXRlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQoW3llYXIsIG1vbnRoLCAxNV0pLnN0YXJ0T2YoJ00nKS5zdGFydE9mKCdEJykudG9EYXRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbmRPZk1vbnRoIChtb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSwgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSwgZGF0ZSA9IG5ldyBEYXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnRoIGluc3RhbmNlb2YgRGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLnV0Y0FzTG9jYWwobW9udGgpKS5lbmRPZignTScpLnN0YXJ0T2YoJ0QnKS50b0RhdGUoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudChbeWVhciwgbW9udGgsIDE1XSkuZW5kT2YoJ00nKS5zdGFydE9mKCdEJykudG9EYXRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwYXJzZURhdGUoaW5wdXQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBvdXRwdXQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGlmICghaW5wdXQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YoaW5wdXQpID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZVJlZ0V4cC5odW1hbkRhdGUudGVzdChpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gbW9tZW50KGlucHV0LCB0aGlzLmRhdGVGb3JtYXQuaHVtYW5EYXRlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kYXRlUmVnRXhwLm1vbnRoRGF0ZS50ZXN0KGlucHV0KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbWVudChpbnB1dC5yZXBsYWNlKC9bXkEtWmEtejAtOV0vZywgJyAnKS5yZXBsYWNlKC9cXHMrL2csICcgJykudHJpbSgpLCB0aGlzLmRhdGVGb3JtYXQubW9udGhEYXRlLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kYXRlUmVnRXhwLnVuaXhEYXRlLnRlc3QoaW5wdXQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gbW9tZW50KHBhcnNlSW50KGlucHV0KSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5kYXRlUmVnRXhwLmRvdG5ldERhdGUudGVzdChpbnB1dCkgfHwgdGhpcy5kYXRlUmVnRXhwLmlzb0RhdGUudGVzdChpbnB1dCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBtb21lbnQoaW5wdXQpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaW5wdXQgaW5zdGFuY2VvZiBEYXRlIHx8IHRoaXMuZGF0ZVJlZ0V4cC51bml4RGF0ZS50ZXN0KGlucHV0LnRvU3RyaW5nKCkpKXtcclxuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBtb21lbnQoaW5wdXQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBvdXRwdXQgJiYgb3V0cHV0LmlzVmFsaWQoKSAmJiBvdXRwdXQudG9EYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9ybWF0RGF0ZShkYXRlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRlID8gbW9tZW50KGRhdGUpLmZvcm1hdCgnREQuTU0uWVknKSA6ICcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0Rm9ybWF0KGRhdGVTdHJpbmcgPSAnJyl7XHJcbiAgICAgICAgICAgICAgICBkYXRlU3RyaW5nID0gZGF0ZVN0cmluZy50cmltKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmb3JtYXRzID0gdGhpcy5kYXRlUmVnRXhwLmh1bWFuRGF0ZS50ZXN0KGRhdGVTdHJpbmcpID8gdGhpcy5kYXRlRm9ybWF0Lmh1bWFuRGF0ZSA6IHRoaXMuZGF0ZUZvcm1hdC5tb250aERhdGU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWF0cy5maW5kKChpdGVtKSA9PiBkYXRlU3RyaW5nLmxlbmd0aCA9PT0gaXRlbS5sZW5ndGggJiYgbW9tZW50KGRhdGVTdHJpbmcsIGl0ZW0sIHRydWUpLmlzVmFsaWQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluZE1vbnRoTmFtZShwYXJ0LCBmb3JtYXQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1kYXRlID0gbW9tZW50KFsyMDAwLCAwLCAxXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtb250aEZvcm1hdCA9IGZvcm1hdC5yZXBsYWNlKC9bXk1dL2csJycpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMjsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbW9udGhOYW1lID0gbWRhdGUuZm9ybWF0KG1vbnRoRm9ybWF0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobW9udGhOYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aChwYXJ0LnRvTG93ZXJDYXNlKCkpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbnRoTmFtZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbWRhdGUuYWRkKDEsICdtb250aCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbG9jYWxBc1V0YyhkYXRlKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR6ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGRhdGUgPSBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRlLmdldEhvdXJzKCkgPT09IDAgJiYgdHogIT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eiA+IDApe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZGF0ZS5zZXRNaW51dGVzKC0xICogdHopO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkYXRlLnNldEhvdXJzKHRoaXMuZ2V0VFpIb3VycyhkYXRlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRkYXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHV0Y0FzTG9jYWwoZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5nZXRIb3VycygpICE9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZS5nZXRVVENGdWxsWWVhcigpLCBkYXRlLmdldFVUQ01vbnRoKCksIGRhdGUuZ2V0VVRDRGF0ZSgpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXRUWkhvdXJzKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHogPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHogPiAwID8gMjQgLSBNYXRoLmNlaWwodHogLyA2MCkgOiBNYXRoLmZsb29yKE1hdGguYWJzKHR6KSAvIDYwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzYW1lRGF0ZShkYXRlQSwgZGF0ZUIpe1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZUEuZ2V0RnVsbFllYXIoKSA9PT0gZGF0ZUIuZ2V0RnVsbFllYXIoKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlQS5nZXRNb250aCgpID09PSBkYXRlQi5nZXRNb250aCgpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVBLmdldERhdGUoKSA9PT0gZGF0ZUIuZ2V0RGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1heERhdGUoLi4uZGF0ZXMpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWREYXRlcyA9IGRhdGVzLmZpbHRlcigoZCkgPT4gISFkICYmIGQgaW5zdGFuY2VvZiBEYXRlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZERhdGVzLmxlbmd0aCA/IHZhbGlkRGF0ZXMucmVkdWNlKChyZXMsIGRhdGUpID0+IGRhdGUgPj0gcmVzID8gZGF0ZSA6IHJlcywgbmV3IERhdGUobnVsbCkpIDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtaW5EYXRlKC4uLmRhdGVzKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkRGF0ZXMgPSBkYXRlcy5maWx0ZXIoKGQpID0+ICEhZCAmJiBkIGluc3RhbmNlb2YgRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWREYXRlcy5sZW5ndGggPyB2YWxpZERhdGVzLnJlZHVjZSgocmVzLCBkYXRlKSA9PiBkYXRlIDw9IHJlcyA/IGRhdGUgOiByZXMsIG5ldyBEYXRlKCkpIDogbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpc1dlZWtlbmQoZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYXlOdW0gPSBkYXRlLmdldERheSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRheU51bSA9PT0gMCB8fCBkYXlOdW0gPT09IDY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0RGF0ZUZpbHRlcihzdGFydCwgZW5kKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAoZCkgPT4gKCFzdGFydCB8fCAhc3RhcnQuZ2V0VGltZSB8fCBkLmdldFRpbWUoKSA+PSBzdGFydC5nZXRUaW1lKCkpICYmICghZW5kIHx8ICFlbmQuZ2V0VGltZSB8fCBkLmdldFRpbWUoKSA8PSBlbmQuZ2V0VGltZSgpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldERhdGVBcnJheShzdGFydCwgZW5kKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNkID0gbW9tZW50LmlzTW9tZW50KHN0YXJ0KSA/IHN0YXJ0IDogbW9tZW50KHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVkID0gbW9tZW50LmlzTW9tZW50KGVuZCkgPyBlbmQgOiBtb21lbnQoZW5kKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc1tyZXMubGVuZ3RoXSA9IHNkLnRvRGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNkLmFkZCgxLCAnZCcpO1xyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoc2QuaXNTYW1lT3JCZWZvcmUoZWQpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJhbnNmb3JtT2JqZWN0KG9iaiwgaXNTcmNMb2NhbCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVyID0gaXNTcmNMb2NhbCA/IHRoaXMubG9jYWxBc1V0Yy5iaW5kKHRoaXMpIDogdGhpcy51dGNBc0xvY2FsLmJpbmQodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIW9iail7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZihvYmopID09PSAnc3RyaW5nJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeSh0aGlzLnRyYW5zZm9ybU9iamVjdChyZXN1bHQsIGlzU3JjTG9jYWwpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5wYXJzZURhdGUob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCA/IGhhbmRsZXIocmVzdWx0KSA6IG9iajtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gdGhpcy5wYXJzZURhdGUob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZSA/IGhhbmRsZXIoZGF0ZSkgOiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KG9iaikpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmoubWFwKChpdGVtKSA9PiB0aGlzLnRyYW5zZm9ybU9iamVjdChpdGVtLCBpc1NyY0xvY2FsKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZihvYmopID09PSAnb2JqZWN0Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iaikucmVkdWNlKChyZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNba2V5XSA9IHRoaXMudHJhbnNmb3JtT2JqZWN0KG9ialtrZXldLCBpc1NyY0xvY2FsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIF9pbnN0YW5jZSA9IG5ldyBBUERhdGVVdGlscygpO1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcclxuICAgICAgICAgICAgdXRpbHM6IHtcclxuICAgICAgICAgICAgICAgIGdldDogKCkgPT4gX2luc3RhbmNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgcmV0dXJuIF9pbnN0YW5jZTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL2RhdGUtdXRpbHMtcHJvdmlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc3MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5zZXJ2aWNlKCckZG91YmxlJywgZG91YmxlU2VydmljZSk7XHJcbiAgICBkb3VibGVTZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBkb3VibGVTZXJ2aWNlKCl7XHJcbiAgICAgICAgdGhpcy5kb3VibGVUb0xvbmdCaXRzID0gKG51bWJlciwgcHJlY2lzaW9uQml0cyA9IDIzLCBleHBvbmVudEJpdHMgPSA4KSA9PiB7XHJcbiAgICAgICAgICAgIHZhciBiaWFzID0gTWF0aC5wb3coMiwgZXhwb25lbnRCaXRzIC0gMSkgLSAxLCBtaW5FeHAgPSAtYmlhcyArIDEsIG1heEV4cCA9IGJpYXMsIG1pblVubm9ybUV4cCA9IG1pbkV4cCAtIHByZWNpc2lvbkJpdHMsXHJcbiAgICAgICAgICAgICAgICBzdGF0dXMgPSBpc05hTihuID0gcGFyc2VGbG9hdChudW1iZXIpKSB8fCAhTnVtYmVyLmlzRmluaXRlKG4pID8gbiA6IDAsXHJcbiAgICAgICAgICAgICAgICBleHAgPSAwLCBsZW4gPSAyICogYmlhcyArIDEgKyBwcmVjaXNpb25CaXRzICsgMywgYmluID0gbmV3IEFycmF5KGxlbiksXHJcbiAgICAgICAgICAgICAgICBzaWduYWwgPSAobiA9IHN0YXR1cyAhPT0gMCA/IDAgOiBuKSA8IDAsIG4gPSBNYXRoLmFicyhuKSwgaW50UGFydCA9IE1hdGguZmxvb3IobiksIGZsb2F0UGFydCA9IG4gLSBpbnRQYXJ0LFxyXG4gICAgICAgICAgICAgICAgaSwgbGFzdEJpdCwgcm91bmRlZCwgaiwgcmVzdWx0O1xyXG4gICAgICAgICAgICBmb3IoaSA9IGxlbjsgaTsgYmluWy0taV0gPSAwKTtcclxuICAgICAgICAgICAgZm9yKGkgPSBiaWFzICsgMjsgaW50UGFydCAmJiBpOyBiaW5bLS1pXSA9IGludFBhcnQgJSAyLCBpbnRQYXJ0ID0gTWF0aC5mbG9vcihpbnRQYXJ0IC8gMikpO1xyXG4gICAgICAgICAgICBmb3IoaSA9IGJpYXMgKyAxOyBmbG9hdFBhcnQgPiAwICYmIGk7IChiaW5bKytpXSA9ICgoZmxvYXRQYXJ0ICo9IDIpID49IDEpIC0gMCkgJiYgLS1mbG9hdFBhcnQpO1xyXG4gICAgICAgICAgICBmb3IoaSA9IC0xOyArK2kgPCBsZW4gJiYgIWJpbltpXTspO1xyXG4gICAgICAgICAgICBpZihiaW5bKGxhc3RCaXQgPSBwcmVjaXNpb25CaXRzIC0gMSArIChpID0gKGV4cCA9IGJpYXMgKyAxIC0gaSkgPj0gbWluRXhwICYmIGV4cCA8PSBtYXhFeHAgPyBpICsgMSA6IGJpYXMgKyAxIC0gKGV4cCA9IG1pbkV4cCAtIDEpKSkgKyAxXSl7XHJcbiAgICAgICAgICAgICAgICBpZighKHJvdW5kZWQgPSBiaW5bbGFzdEJpdF0pKVxyXG4gICAgICAgICAgICAgICAgICAgIGZvcihqID0gbGFzdEJpdCArIDI7ICFyb3VuZGVkICYmIGogPCBsZW47IHJvdW5kZWQgPSBiaW5baisrXSk7XHJcbiAgICAgICAgICAgICAgICBmb3IoaiA9IGxhc3RCaXQgKyAxOyByb3VuZGVkICYmIC0taiA+PSAwOyAoYmluW2pdID0gIWJpbltqXSAtIDApICYmIChyb3VuZGVkID0gMCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcihpID0gaSAtIDIgPCAwID8gLTEgOiBpIC0gMzsgKytpIDwgbGVuICYmICFiaW5baV07KTtcclxuXHJcbiAgICAgICAgICAgIChleHAgPSBiaWFzICsgMSAtIGkpID49IG1pbkV4cCAmJiBleHAgPD0gbWF4RXhwID8gKytpIDogZXhwIDwgbWluRXhwICYmXHJcbiAgICAgICAgICAgICAgICAoZXhwICE9PSBiaWFzICsgMSAtIGxlbiAmJiBleHAgPCBtaW5Vbm5vcm1FeHAgJiYgdGhpcy53YXJuKFwiZW5jb2RlRmxvYXQ6OmZsb2F0IHVuZGVyZmxvd1wiKSwgaSA9IGJpYXMgKyAxIC0gKGV4cCA9IG1pbkV4cCAtIDEpKTtcclxuICAgICAgICAgICAgKGludFBhcnQgfHwgc3RhdHVzICE9PSAwKSAmJiAodGhpcy53YXJuKGludFBhcnQgPyBcImVuY29kZUZsb2F0OjpmbG9hdCBvdmVyZmxvd1wiIDogXCJlbmNvZGVGbG9hdDo6XCIgKyBzdGF0dXMpLFxyXG4gICAgICAgICAgICAgICAgZXhwID0gbWF4RXhwICsgMSwgaSA9IGJpYXMgKyAyLCBzdGF0dXMgPT09IC1JbmZpbml0eSA/IHNpZ25hbCA9IDEgOiBpc05hTihzdGF0dXMpICYmIChiaW5baV0gPSAxKSk7XHJcbiAgICAgICAgICAgIGZvcihuID0gTWF0aC5hYnMoZXhwICsgYmlhcyksIGogPSBleHBvbmVudEJpdHMgKyAxLCByZXN1bHQgPSBcIlwiOyAtLWo7IHJlc3VsdCA9IChuICUgMikgKyByZXN1bHQsIG4gPSBuID4+PSAxKTtcclxuICAgICAgICAgICAgZm9yKG4gPSAwLCBqID0gMCwgaSA9IChyZXN1bHQgPSAoc2lnbmFsID8gXCIxXCIgOiBcIjBcIikgKyByZXN1bHQgKyBiaW4uc2xpY2UoaSwgaSArIHByZWNpc2lvbkJpdHMpLmpvaW4oXCJcIikpLmxlbmd0aCwgciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgaTsgbiArPSAoMSA8PCBqKSAqIHJlc3VsdC5jaGFyQXQoLS1pKSwgaiA9PT0gNyAmJiAocltyLmxlbmd0aF0gPSBuLCBuID0gMCksIGogPSAoaiArIDEpICUgOCk7XHJcbiAgICAgICAgICAgIHJbci5sZW5ndGhdID0gbiB8fCAwO1xyXG4gICAgICAgICAgICByLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHIubWFwKHYgPT4gdi50b1N0cmluZygyKS5wYWRTdGFydCg4LCAnMCcpKS5qb2luKCcnKSwgMik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL2RvdWJsZS1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAwNy4wMi4yMDE4LlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuc2VydmljZSgnJGFwZWUnLCBldmVudEVtaXR0ZXJTZXJ2aWNlKTtcclxuICAgIGV2ZW50RW1pdHRlclNlcnZpY2UuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGV2ZW50RW1pdHRlclNlcnZpY2UoKXtcclxuICAgICAgICBjb25zdCByb29tcyA9IFtdO1xyXG5cclxuICAgICAgICBjbGFzcyBBUEV2ZW50RW1pdHRlciB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yIChpZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pZCA9IGlkIHx8IGdlbmVyYXRlSWQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uZVRpbWVycyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvbih0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb25jZSh0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmVUaW1lcnMucHVzaCh7dHlwZSwgY2FsbGJhY2t9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvZmYodHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsZW4gPSB0aGlzLmxpc3RlbmVyc1t0eXBlXS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGlzdGVuZXJzW3R5cGVdW2ldICE9PSBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5zcGxpY2UoMCwgbGVuKTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25lVGltZXJzID0gdGhpcy5vbmVUaW1lcnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnR5cGUgIT09IHR5cGUgJiYgaXRlbS5jYWxsYmFjayAhPT0gY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVtaXQodHlwZSwgZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YWNrID0gdGhpcy5saXN0ZW5lcnNbdHlwZV07XHJcbiAgICAgICAgICAgICAgICBzdGFjay5mb3JFYWNoKChjYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNiLmNhbGwodGhpcywgZGF0YSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmVUaW1lcnMgPSB0aGlzLm9uZVRpbWVycy5maWx0ZXIoKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSB0eXBlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5jYWxsYmFjay5jYWxsKHRoaXMsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVtb3ZlQWxsTGlzdGVuZXJzKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0SW5zdGFuY2UgPSAoaWQpID0+IHtcclxuICAgICAgICAgICAgbGV0IGlkeCA9IHJvb21zLmZpbmRJbmRleCgoZWUpID0+IGVlLmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPT09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByb29tcy5wdXNoKG5ldyBBUEV2ZW50RW1pdHRlcihpZCkpO1xyXG4gICAgICAgICAgICAgICAgaWR4ID0gcm9vbXMubGVuZ3RoIC0gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByb29tc1tpZHhdXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmRlc3Ryb3lJbnN0YW5jZSA9IChpZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpZHggPSByb29tcy5maW5kSW5kZXgoKGVlKSA9PiBlZS5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJvb21zLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmVlID0gbmV3IEFQRXZlbnRFbWl0dGVyKCdzdmMnKTtcclxuXHJcbiAgICAgICAgdGhpcy5BUEV2ZW50RW1pdHRlciA9IEFQRXZlbnRFbWl0dGVyO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZUlkKGxlbiA9IDgpIHtcclxuICAgICAgICAgICAgbGV0IGlkID0gJyc7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgIGlkICs9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDM2KS50b1N0cmluZygzNik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9ldmVudC1lbWl0dGVyLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc3M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuKiBDcmVhdGVkIGJ5IHVzZXIgb24gMDUuMTAuMjAxNi5cclxuKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5zZXJ2aWNlKCdyZXNpemVTZW5zb3InLCByZXNpemVTZW5zb3JTZXJ2aWNlKTtcclxuXHJcbiAgICByZXNpemVTZW5zb3JTZXJ2aWNlLiRpbmplY3QgPSBbJyR3aW5kb3cnLCAnJHRpbWVvdXQnXTtcclxuXHJcbiAgICBmdW5jdGlvbiByZXNpemVTZW5zb3JTZXJ2aWNlKCR3aW5kb3csICR0aW1lb3V0KSB7XHJcbiAgICAgICAgLy8gT25seSB1c2VkIGZvciB0aGUgZGlydHkgY2hlY2tpbmcsIHNvIHRoZSBldmVudCBjYWxsYmFjayBjb3VudCBpcyBsaW10ZWQgdG8gbWF4IDEgY2FsbCBwZXIgZnBzIHBlciBzZW5zb3IuXHJcbiAgICAgICAgLy8gSW4gY29tYmluYXRpb24gd2l0aCB0aGUgZXZlbnQgYmFzZWQgcmVzaXplIHNlbnNvciB0aGlzIHNhdmVzIGNwdSB0aW1lLCBiZWNhdXNlIHRoZSBzZW5zb3IgaXMgdG9vIGZhc3QgYW5kXHJcbiAgICAgICAgLy8gd291bGQgZ2VuZXJhdGUgdG9vIG1hbnkgdW5uZWNlc3NhcnkgZXZlbnRzLlxyXG4gICAgICAgIGNvbnN0IHJlcXVlc3RBbmltYXRpb25GcmFtZSA9ICR3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgICR3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgICR3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIChmbikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICR0aW1lb3V0KGZuLCAyMCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIGNsYXNzIEV2ZW50UXVldWUge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnEgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbGVuZ3RoICgpIHtyZXR1cm4gdGhpcy5xLmxlbmd0aH1cclxuICAgICAgICAgICAgYWRkIChldikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xLnB1c2goZXYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNhbGwgKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNhbGwoKTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVtb3ZlIChldikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkID0gdGhpcy5xLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gZXYpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xLnNwbGljZSgwLCB0aGlzLnEubGVuZ3RoLCAuLi5maWx0ZXJlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmx1c2ggKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xLnNwbGljZSgwLCB0aGlzLnEubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3MgUmVzaXplU2Vuc29yIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogMCwgJ3RvcCc6IDAsICdyaWdodCc6IDAsICdib3R0b20nOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICdvdmVyZmxvdyc6ICdoaWRkZW4nLFxyXG4gICAgICAgICAgICAgICAgICAgICd6LWluZGV4JzogLTEsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Zpc2liaWxpdHknOiAnaGlkZGVuJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkU3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RvcCc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3RyYW5zaXRpb24nOiAnYWxsIDBzJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlID0gbmV3IEV2ZW50UXVldWUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kQ2hpbGQgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+JykuY3NzKGNoaWxkU3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaHJpbmtDaGlsZCA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj4nKS5jc3MoYW5ndWxhci5leHRlbmQoe30sIGNoaWxkU3R5bGUsIHt3aWR0aDogJzIwMCUnLCBoZWlnaHQ6ICcyMDAlJ30pKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PicpLmFkZENsYXNzKFwicmVzaXplLXNlbnNvci1leHBhbmRcIikuY3NzKGJhc2VTdHlsZSkuYXBwZW5kKHRoaXMuZXhwYW5kQ2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaHJpbmsgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+JykuYWRkQ2xhc3MoXCJyZXNpemUtc2Vuc29yLXNocmlua1wiKS5jc3MoYmFzZVN0eWxlKS5hcHBlbmQodGhpcy5zaHJpbmtDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnNvciA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj4nKS5hZGRDbGFzcygncmVzaXplLXNlbnNvcicpLmNzcyhiYXNlU3R5bGUpLmFwcGVuZCh0aGlzLmV4cGFuZCkuYXBwZW5kKHRoaXMuc2hyaW5rKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFzc2l2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzZXQgKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBhc3NpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZENoaWxkWzBdLnN0eWxlLndpZHRoID0gMTAwMDAwICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZENoaWxkWzBdLnN0eWxlLmhlaWdodCA9IDEwMDAwMCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmRbMF0uc2Nyb2xsTGVmdCA9IDEwMDAwMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZFswXS5zY3JvbGxUb3AgPSAxMDAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaHJpbmtbMF0uc2Nyb2xsTGVmdCA9IDEwMDAwMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNocmlua1swXS5zY3JvbGxUb3AgPSAxMDAwMDA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpcnR5Q2hlY2sgKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnF1ZXVlIHx8IHRoaXMucGFzc2l2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRpcnR5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWV1ZS5jYWxsKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9lbHNlIGlmIChmcmFtZSAlIDIwMCA9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyAgICB0aGlzLm9uU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgICAgICAvL31cclxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWUgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5kaXJ0eUNoZWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBvblNjcm9sbCAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZFdpZHRoID0gdGhpcy5lbGVtZW50WzBdLm9mZnNldFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRIZWlnaHQgPSB0aGlzLmVsZW1lbnRbMF0ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2FjaGVkV2lkdGggIT09IHRoaXMubGFzdFdpZHRoIHx8IHRoaXMuY2FjaGVkSGVpZ2h0ICE9PSB0aGlzLmxhc3RIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcnR5ID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RXaWR0aCA9IHRoaXMuY2FjaGVkV2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0SGVpZ2h0ID0gdGhpcy5jYWNoZWRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFNjcm9sbEV2ZW50ICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc1t0eXBlXVswXS5hdHRhY2hFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdHlwZV1bMF0uYXR0YWNoRXZlbnQoJ29uc2Nyb2xsJywgdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1t0eXBlXVswXS5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlbW92ZVNjcm9sbEV2ZW50ICh0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpc1t0eXBlXVswXS5kZXRhY2hFdmVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdHlwZV1bMF0uZGV0YWNoRXZlbnQoJ29uc2Nyb2xsJywgdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1t0eXBlXVswXS5yZW1vdmVFdmVudExpc3RlbmVyKCdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhdHRhY2hSZXNpemVFdmVudCAoY2IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVldWUuYWRkKGNiKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGFzc2l2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZCh0aGlzLnNlbnNvcik7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGdldENvbXB1dGVkU3R5bGUodGhpcy5lbGVtZW50WzBdLCAncG9zaXRpb24nKSA9PT0gJ3N0YXRpYycpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRbMF0uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZGlydHlDaGVjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2Nyb2xsRXZlbnQoJ2V4cGFuZCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTY3JvbGxFdmVudCgnc2hyaW5rJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRldGFjaFJlc2l6ZUV2ZW50ICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnF1ZXVlICYmIHRoaXMucXVldWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVldWUuZmx1c2goKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucGFzc2l2ZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNjcm9sbEV2ZW50KCdleHBhbmQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2Nyb2xsRXZlbnQoJ3NocmluaycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5zb3IucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnRcclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICBwcm9wXHJcbiAgICAgICAgICogQHJldHVybnMge1N0cmluZ3xOdW1iZXJ9XHJcbiAgICAgICAgICovXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBwcm9wKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmN1cnJlbnRTdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuY3VycmVudFN0eWxlW3Byb3BdO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICR3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQuc3R5bGVbcHJvcF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0SW5zdGFuY2UgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJlc2l6ZVNlbnNvcihlbGVtZW50KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL3Jlc2l6ZS1zZW5zb3IuanNcbi8vIG1vZHVsZSBpZCA9IDc3NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLnNlcnZpY2UoJ3NsYXNoUGFyYW1TZXJpYWxpemVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHNlcmlhbGl6ZVZhbHVlKHYpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3QodikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzRGF0ZSh2KSA/IHYudG9JU09TdHJpbmcoKSA6IGFuZ3VsYXIudG9Kc29uKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGxkUGFyYW1TZXJpYWxpemVyKHBhcmFtcykge1xyXG4gICAgICAgICAgICBpZiAoIXBhcmFtcykgcmV0dXJuICcnO1xyXG4gICAgICAgICAgICB2YXIgcGFydHMgPSBbXTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gcGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtc1trZXldICYmICFhbmd1bGFyLmlzT2JqZWN0KHBhcmFtc1trZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba2V5XS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xcLlxcKlxcIVxcflxcKFxcKV0vZywgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwlXFx3ezJ9L2csICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAnLycgKyBwYXJ0cy5qb2luKCcvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL3NsYXNoLXBhcmFtLXNlcmlhbGl6ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc3NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDEyLjA0LjIwMTYuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLmNvbnN0YW50KCckYXBzdG9yZUNvbmZpZycsIHtcclxuICAgICAgICBzdG9yYWdlVHlwZTogJ2xvY2FsU3RvcmFnZSdcclxuICAgIH0pO1xyXG4gICAgdnJwLnByb3ZpZGVyKCckYXBzdG9yZScsIFsnJGFwc3RvcmVDb25maWcnLCBmdW5jdGlvbiAoY29uZmlnKSB7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xyXG4gICAgICAgICAgICBzdG9yYWdlVHlwZToge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbmZpZy5zdG9yYWdlVHlwZTsgfSxcclxuICAgICAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHsgY29uZmlnLnN0b3JhZ2VUeXBlID0gdmFsdWU7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLiRnZXQgPSBbJyRhcHN0b3JlQ29uZmlnJywgJyR3aW5kb3cnLCAnJGxvZycsIGZ1bmN0aW9uIChjb25maWcsICR3aW5kb3csICRsb2cpIHtcclxuICAgICAgICAgICAgdmFyICRhcHN0b3JlID0ge307XHJcbiAgICAgICAgICAgIHZhciBia3BzdG9yZSA9IHt9O1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgbG9jYWxTdG9yYWdlIG9yIHNlc3Npb25TdG9yYWdlIGlzIGF2YWlsYWJsZSBvciBlbmFibGVkXHJcbiAgICAgICAgICAgIHZhciBpc1N0b3JhZ2VBdmFpbGFibGUgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdXBwb3J0ZWQgPSBjb25maWcuc3RvcmFnZVR5cGUgaW4gJHdpbmRvdyAmJiAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0gIT09IG51bGw7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzdXBwb3J0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGtleSA9IE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZyg3KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLnNldEl0ZW0oa2V5LCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydGVkO1xyXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICAgICAgaWYgKCFpc1N0b3JhZ2VBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICRsb2cud2Fybihjb25maWcuc3RvcmFnZVR5cGUgKyAnIGlzIG5vdCBhdmFpbGFibGUuJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJGFwc3RvcmUuc2V0U3RvcmFnZVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25maWcuc3RvcmFnZVR5cGUgPSB0eXBlO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkYXBzdG9yZS5nZXQgPSBmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLmdldEl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHJlc3VsdCkpIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGF0ZShyZXN1bHQpKSByZXR1cm4gbmV3IERhdGUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KHJlc3VsdCkgfHwgYW5ndWxhci5pc09iamVjdChyZXN1bHQpKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHJlc3VsdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFuZ3VsYXIuZnJvbUpzb24ocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgPSBia3BzdG9yZVtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkYXBzdG9yZS5zZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3QodmFsdWUpIHx8IGFuZ3VsYXIuaXNBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBhbmd1bGFyLnRvSnNvbih2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksIHZhbHVlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJrcHN0b3JlW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUucmVtb3ZlID0gZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNTdG9yYWdlQXZhaWxhYmxlID8gJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLnJlbW92ZUl0ZW0oa2V5KTogZGVsZXRlIGJrcHN0b3JlW2tleV07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRhcHN0b3JlLmNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNTdG9yYWdlQXZhaWxhYmxlID8gJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLmNsZWFyKCk6IGJrcHN0b3JlID0ge307XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRhcHN0b3JlLmtleSA9IGZ1bmN0aW9uKG51bSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzU3RvcmFnZUF2YWlsYWJsZSA/ICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5rZXkobnVtKTogYmtwc3RvcmVbT2JqZWN0LmtleXMoYmtwc3RvcmUpW251bV1dO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkYXBzdG9yZS5hbGxLZXlzID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNTdG9yYWdlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9ICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaCgkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0ua2V5KGkpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdHMgPSBPYmplY3Qua2V5cyhia3BzdG9yZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUuZmluZEtleXMgPSBmdW5jdGlvbihyZWdleHApIHtcclxuICAgICAgICAgICAgICAgIHZhciBhbGxfa2V5cyA9ICRsc3RvcmUuYWxsS2V5cygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsbF9rZXlzLmZpbHRlcihmdW5jdGlvbiAodikgeyByZXR1cm4gcmVnZXhwLnRlc3QodikgfSk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHJldHVybiAkYXBzdG9yZTtcclxuICAgICAgICB9XTtcclxuICAgIH1dKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvc3RvcmFnZS1wcm92aWRlci5qc1xuLy8gbW9kdWxlIGlkID0gNzc2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hbGdvL2JpZ251bWJlci1maWx0ZXIuanNcIjogNzc4LFxuXHRcIi4vYWxnby9nZW5ldGljLWZhY3RvcnkuanNcIjogNzc5LFxuXHRcIi4vYWxnby9wZXJtdXRhdGlvbi1zZXJ2aWNlLmpzXCI6IDc4MCxcblx0XCIuL2FsZ28vcG9pbnQtZmFjdG9yeS5qc1wiOiA3ODEsXG5cdFwiLi9hbGdvL3NpbS1hbm5lYWwtc2VydmljZS5qc1wiOiA3ODIsXG5cdFwiLi9hcGkvYXBpLXJlcXVlc3QtcHJvdmlkZXIuanNcIjogNzgzLFxuXHRcIi4vYXBpL3NsYXNoLXBhcmFtLXNlcmlhbGl6ZXIuanNcIjogNzg0LFxuXHRcIi4vYXBpL3RwbC1xdWVyeS1zZXJpYWxpemVyLmpzXCI6IDc4NSxcblx0XCIuL2Ric2Nhbi9kYnNjYW4tZGlyZWN0aXZlLmpzXCI6IDgwNSxcblx0XCIuL2Ric2Nhbi9kYnNjYW4tc2VydmljZS5qc1wiOiA4MDQsXG5cdFwiLi9rLW1lYW4vay1tZWFuLWRpcmVjdGl2ZS5qc1wiOiA3ODYsXG5cdFwiLi9rLW1lYW4vay1tZWFuLXNlcnZpY2UuanNcIjogNzg4LFxuXHRcIi4vdHNwL3JvdXRlLWRyYXctZGlyZWN0aXZlLmpzXCI6IDc4OSxcblx0XCIuL3RzcC9yb3V0ZS1wbG90dGVyLXNlcnZpY2UuanNcIjogNzkxLFxuXHRcIi4vdnJwL3ZycC1kcmF3LWRpcmVjdGl2ZS5qc1wiOiA3OTIsXG5cdFwiLi92cnAvdnJwLXBsb3R0ZXItc2VydmljZS5qc1wiOiA3OTRcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3Nzc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cyAuK1xcLmpzJFxuLy8gbW9kdWxlIGlkID0gNzc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5maWx0ZXIoJ2JpZ251bWJlcicsIGJpZ251bWJlckZpbHRlcik7XHJcbiAgICB2cnAuZmlsdGVyKCdwb3dudW1iZXInLCBwb3dudW1iZXJGaWx0ZXIpO1xyXG4gICAgZnVuY3Rpb24gYmlnbnVtYmVyRmlsdGVyKCl7XHJcbiAgICAgICAgcmV0dXJuICh2YWwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGguZm9ybWF0KHZhbCwge2xvd2VyRXhwOiAtMzAwLCB1cHBlckV4cDogMzAwfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwb3dudW1iZXJGaWx0ZXIoKXtcclxuICAgICAgICByZXR1cm4gKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IG1hdGguZm9ybWF0KHZhbCwge2xvd2VyRXhwOiAtMiwgdXBwZXJFeHA6IDIsIHByZWNpc2lvbjogM30pLnNwbGl0KCdlKycpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJ34nICsgcGFydHNbMF07XHJcbiAgICAgICAgICAgIGlmIChwYXJ0c1sxXSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gYCB4IDEwXiR7cGFydHNbMV19YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvYWxnby9iaWdudW1iZXItZmlsdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3Nzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApe1xyXG4gICAgdnJwLnNlcnZpY2UoJ0dlbmV0aWNGYWN0b3J5JywgZ2VuZXRpY0ZhY3RvcnlTZXJ2aWNlKTtcclxuICAgIGdlbmV0aWNGYWN0b3J5U2VydmljZS4kaW5qZWN0ID0gWyckcGVybXV0YXRpb24nXTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZW5ldGljRmFjdG9yeVNlcnZpY2UoJHBlcm11dGF0aW9uKXtcclxuICAgICAgICBjbGFzcyBHZW5lIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoY29kZSA9IFtdKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52dWxuZXJhYmlsaXR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGNvZGUgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGUuc2xpY2UoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXQgY29kZSAoY29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29kZS5zcGxpY2UoMCwgdGhpcy5fY29kZS5sZW5ndGgsIC4uLmNvZGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgc2l6ZSAoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2RlLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGdlbm9tICgpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4ID0gdGhpcy5fY29kZS5zbGljZSgpLnNvcnQoKGEsIGIpID0+IGIgLSBhKVswXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhZCA9IChgJHttYXh9YCkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGUubWFwKCh2KSA9PiAoJycgKyB2KS5wYWRTdGFydChwYWQsICcwJykpLmpvaW4oKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpc0VxdWFsKGdlbm9tKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbm9tID09PSBnZW5vbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVwcm9kdWNlIChnZW5lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbFNldCA9ICRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZSh0aGlzLmNvZGUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG11dHVhbFNldCA9IHRoaXMuY29kZS5tYXAoKHZhbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gZ2VuZS5jb2RlW2lkeF0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsU2V0LnNwbGljZShjZWxsU2V0LmluZGV4T2YodmFsKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbFNldC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm11dGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm11dGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJHBlcm11dGF0aW9uLmdldFJhbmRvbUxpbWl0ZWRQZXJtdXRhdGlvbnMoY2VsbFNldCwgTUFYX0NISUxEUkVOKS5mb3JFYWNoKChtdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IG5ldyBHZW5lKG11dHVhbFNldC5tYXAoKHZhbCkgPT4gdmFsIHx8IG11dC5zaGlmdCgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbXV0YXRlKGRlcHRoID0gTWF0aC5mbG9vcih0aGlzLnNpemUgLyAzKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtY2VsbHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZSA9IHRoaXMuY29kZTtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtY2VsbHMuaW5kZXhPZihzYW1wbGVbaWR4XSkgPT09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWNlbGxzLnB1c2goc2FtcGxlW2lkeF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGVbaWR4XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAobWNlbGxzLmxlbmd0aCA8IGRlcHRoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZShzYW1wbGUubWFwKHYgPT4gdiB8fCBtY2VsbHMuc2hpZnQoKSkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGFzcyBHZW5lcmF0aW9uIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IobnVtKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZWNlcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBzcGllY2VzICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGllY2VzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0IHNwaWVjZXMgKGFycikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZWNlcy5zcGxpY2UoMCwgdGhpcy5fc3BpZWNlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyciAmJiBBcnJheS5pc0FycmF5KGFycikpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwaWVjZXMucHVzaCguLi5hcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBzaXplKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwaWVjZXMubGVuZ3RoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGF2Z1Z1bG5lcmFiaWxpdHkgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwaWVjZXMucmVkdWNlKChyZXMsIGdlbmUpID0+IHJlcyArIChnZW5lLnZ1bG5lcmFiaWxpdHkgLyB0aGlzLnNpemUpLCAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBtaW5WdWxuZXJhYmlsaXR5ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGllY2VzLnJlZHVjZSgocmVzLCBnZW5lKSA9PiAhcmVzIHx8IGdlbmUudnVsbmVyYWJpbGl0eSA8IHJlcyA/IGdlbmUudnVsbmVyYWJpbGl0eSA6IHJlcywgbnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbWF4VnVsbmVyYWJpbGl0eSAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3BpZWNlcy5yZWR1Y2UoKHJlcywgZ2VuZSkgPT4gIXJlcyB8fCBnZW5lLnZ1bG5lcmFiaWxpdHkgPiByZXMgPyBnZW5lLnZ1bG5lcmFiaWxpdHkgOiByZXMsIG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IG1pblZ1bG5lcmFibGVTYW1wbGUgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9zcGllY2VzLmZpbmQoKGdlbmUpID0+IGdlbmUudnVsbmVyYWJpbGl0eSA9PT0gdGhpcy5taW5WdWxuZXJhYmlsaXR5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBtYXhWdWxuZXJhYmxlU2FtcGxlICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgdGhpcy5fc3BpZWNlcy5maW5kKChnZW5lKSA9PiBnZW5lLnZ1bG5lcmFiaWxpdHkgPT09IHRoaXMubWF4VnVsbmVyYWJpbGl0eSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgY3N2ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGllY2VzLm1hcCgoZ2VuZSkgPT4gYCR7dGhpcy5udW1iZXJ9LC0tLCR7Z2VuZS5nZW5vbX0sJHtnZW5lLnZ1bG5lcmFiaWxpdHl9YCkuam9pbignXFxuJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgc3VtbWFyeSAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvdXQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgYEdlbmVyYXRpb24gJHt0aGlzLm51bWJlcn1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGBQb3B1bGF0aW9uOiAke3RoaXMuc2l6ZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGBWdWxuZXJhYmlsaXR5IChtaW4vYXZnL21heCk6ICR7dGhpcy5taW5WdWxuZXJhYmlsaXR5fSAvICR7dGhpcy5hdmdWdWxuZXJhYmlsaXR5fSAvICR7dGhpcy5tYXhWdWxuZXJhYmlsaXR5fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYE1vc3QgdmlhYmxlIHNhbXBsZTogJHt0aGlzLm1pblZ1bG5lcmFibGVTYW1wbGUuZ2Vub219YCxcclxuICAgICAgICAgICAgICAgICAgICAnLS0nXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dC5qb2luKCdcXG4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3MgUG9wdWxhdGlvbiB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yIChjb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9iZSA9IGNvbmZpZy5wcm9iZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Vydml2ZSA9IGNvbmZpZy5zdXJ2aXZlIHx8IDAuMjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbm9tTGVuZ3RoID0gY29uZmlnLmdlbm9tTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYW1wbGUgPSBjb25maWcuc2FtcGxlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5taW5WdWxuZXJhYmxlR2VuZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBhYnNNaW5WdWxuZXJhYmlsaXR5ICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZVRvdGFsID0gdGhpcy5zYW1wbGUucmVkdWNlKChyZXMsIHZhbCkgPT4gcmVzICsgdmFsLCAwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVUb3RhbCA9ICh0aGlzLnNhbXBsZS5sZW5ndGggKyAxKSAqIHRoaXMuc2FtcGxlLmxlbmd0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2FtcGxlVG90YWwgLSBnZW5lVG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBtaW5WdWxuZXJhYmlsaXR5ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2JlKCRwZXJtdXRhdGlvbi5nZXRPcHRpbWFsUGVybXV0YXRpb24odGhpcy5zYW1wbGUpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwb3B1bGF0ZSAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9ICRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZSh0aGlzLmdlbm9tTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRpb24gPSBuZXcgR2VuZXJhdGlvbigwKTtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRpb24uc3BpZWNlcyA9ICRwZXJtdXRhdGlvbi5nZXRSYW5kb21MaW1pdGVkUGVybXV0YXRpb25zKGl0ZW1zLCB0aGlzLnNpemUpLm1hcCgoc2VxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3R2VuZSA9IG5ldyBHZW5lKHNlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R2VuZS52dWxuZXJhYmlsaXR5ID0gdGhpcy5wcm9iZShuZXdHZW5lLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdHZW5lO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRpb25zLnB1c2goZ2VuZXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZWN0IChnZW5JZHggPSB0aGlzLmdlbmVyYXRpb25zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1heE51bWJlciA9IE1hdGguZmxvb3IodGhpcy5nZW5lcmF0aW9uc1tnZW5JZHhdLnNpemUgKiB0aGlzLnN1cnZpdmUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGlvbnNbZ2VuSWR4XS5zcGllY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGdlbkEsIGdlbkIpID0+IGdlbkEudnVsbmVyYWJpbGl0eSAtIGdlbkIudnVsbmVyYWJpbGl0eSlcclxuICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgbWF4TnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0KChnZW5BLCBnZW5CKSA9PiBnZW5BLmdlbm9tIC0gZ2VuQi5nZW5vbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVlZChtYXhHZW5lcmF0aW9ucyA9IDEwMDAsIHN0b3BPbk1pbmltdW0gPSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZEdlbmVyYXRpb24gPSB0aGlzLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZEdlbmVyYXRpb24ubGVuZ3RoIDwgMiB8fCBtYXhHZW5lcmF0aW9ucyA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WdWxuZXJhYmxlR2VuZSA9IHRoaXMuZmluZFJlbGF0aXZlTWluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdHZW5lcmF0aW9uID0gbmV3IEdlbmVyYXRpb24odGhpcy5nZW5lcmF0aW9ucy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgbmV3R2VuZXJhdGlvbi5zcGllY2VzID0gb2xkR2VuZXJhdGlvbi5yZWR1Y2UoKHJlcywgZ2VuZSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dEdlbmUgPSBvbGRHZW5lcmF0aW9uW2lkeCArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dEdlbmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IGdlbmUucmVwcm9kdWNlKG5leHRHZW5lKS5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC52dWxuZXJhYmlsaXR5ID0gdGhpcy5wcm9iZShjaGlsZC5jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKC4uLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0aW9ucy5wdXNoKG5ld0dlbmVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0dlbmVyYXRpb24ubWluVnVsbmVyYWJpbGl0eSA9PT0gdGhpcy5taW5WdWxuZXJhYmlsaXR5ICYmIHN0b3BPbk1pbmltdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVnVsbmVyYWJsZUdlbmUgPSBuZXdHZW5lcmF0aW9uLm1pblZ1bG5lcmFibGVTYW1wbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5taW5WdWxuZXJhYmxlR2VuZSA/IHRoaXMgOiB0aGlzLmJyZWVkKG1heEdlbmVyYXRpb25zIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluZFJlbGF0aXZlTWluKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXZzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0aW9ucy5mb3JFYWNoKChnbnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYW1wbGUgPSBnbnIubWluVnVsbmVyYWJsZVNhbXBsZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW12cyB8fCBtdnMudnVsbmVyYWJpbGl0eSA+IHNhbXBsZS52dWxuZXJhYmlsaXR5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXZzID0gc2FtcGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG12cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRHZW5lID0gKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHZW5lKGNvZGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRHZW5lcmF0aW9uID0gKHNpemUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0aW9uKHNpemUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRQb3B1bGF0aW9uID0gKGNvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvcHVsYXRpb24oY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL2dlbmV0aWMtZmFjdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gNzc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5mYWN0b3J5KCckcGVybXV0YXRpb24nLCBwZXJtdXRhdGlvbkZhY3RvcnkpO1xyXG4gICAgcGVybXV0YXRpb25GYWN0b3J5LiRpbmplY3QgPSBbJyRxJ107XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHBlcm11dGF0aW9uRmFjdG9yeSgkcSl7XHJcbiAgICAgICAgY2xhc3MgUGVybXV0YXRpb24ge1xyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0QWxsUGVybXV0YXRpb25zKGl0ZW1zKXtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA9PT0gMSA/IFtpdGVtc106IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVybXV0YXRpb25zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCBwZXJtdXRhdGlvbnMgb2YgbGVuZ3RoIChuIC0gMSkuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2SXRlbXMgPSBpdGVtcy5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgbGFzdCBvcHRpb24gaW50byBldmVyeSBwb3NzaWJsZSBwb3NpdGlvbiBvZiBldmVyeSBwcmV2aW91cyBwZXJtdXRhdGlvbi5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RJdGVtID0gaXRlbXMuc2xpY2UoLTEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZQZXJtdXRhdGlvbnMgPSBQZXJtdXRhdGlvbi5nZXRBbGxQZXJtdXRhdGlvbnMocHJldkl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldlBlcm11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQZXJtdXRhdGlvbiA9IHByZXZQZXJtdXRhdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5zZXJ0IGxhc3Qgb3B0aW9uIGludG8gZXZlcnkgcG9zc2libGUgcG9zaXRpb24gb2YgY3VycmVudFBlcm11dGF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGN1cnJlbnRQZXJtdXRhdGlvbi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJtdXRhdGlvblByZWZpeCA9IGN1cnJlbnRQZXJtdXRhdGlvbi5zbGljZSgwLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybXV0YXRpb25TdWZmaXggPSBjdXJyZW50UGVybXV0YXRpb24uc2xpY2Uoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm11dGF0aW9ucy5wdXNoKHBlcm11dGF0aW9uUHJlZml4LmNvbmNhdChsYXN0SXRlbSwgcGVybXV0YXRpb25TdWZmaXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVybXV0YXRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0QWxsUGVybXV0YXRpb25zQXN5bmMoaXRlbXMpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVzb2x2ZShpdGVtcy5sZW5ndGggPT09IDEgPyBbaXRlbXNdOiBbXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0SXRlbSA9IGl0ZW1zLnBvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBQZXJtdXRhdGlvbi5nZXRBbGxQZXJtdXRhdGlvbnNBc3luYyhpdGVtcykudGhlbigocHJldlBlcm11dGF0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2UGVybXV0YXRpb25zLm1hcCgoY3VycmVudFBlcm11dGF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGVybXV0YXRpb24ucmVkdWNlKChyLCB2LCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnIsIFsuLi5jdXJyZW50UGVybXV0YXRpb24uc2xpY2UoMCwgaSArIDEpLCBsYXN0SXRlbSwgLi4uY3VycmVudFBlcm11dGF0aW9uLnNsaWNlKGkgKyAxKV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBbW2xhc3RJdGVtLCAuLi5jdXJyZW50UGVybXV0YXRpb25dXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0TGltaXRlZFBlcm11dGF0aW9ucyhpdGVtcywgbGltaXQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGltaXRCYXNlID0gZmluZE5lYXJlc3RGYWN0b3JpYWwobGltaXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRvIGdldCAke2xpbWl0fSBzYW1wbGVzIHdlIHNldCBiYXNlIGF0ICR7bGltaXRCYXNlfWApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFpblNldCA9IFBlcm11dGF0aW9uLmdldEFsbFBlcm11dGF0aW9ucyhpdGVtcy5zbGljZSgwLCBsaW1pdEJhc2UpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwcyA9IG1hdGguY2VpbChsaW1pdCAvIG1haW5TZXQubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYWluU2V0LnJlZHVjZSgocmVzLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0ZXBzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXh0U2V0ID0gUGVybXV0YXRpb24uZ2V0UmFuZG9tUGVybXV0YXRpb24oaXRlbXMuc2xpY2UobGltaXRCYXNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGl0ZW0uY29uY2F0KGV4dFNldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCBbXSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldFJhbmRvbUxpbWl0ZWRQZXJtdXRhdGlvbnMoaXRlbXMsIGxpbWl0KXtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA9PT0gMSA/IFtpdGVtc106IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4TnVtID0gbWF0aC5mYWN0b3JpYWwoaXRlbXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsaW1pdCA+PSBtYXhOdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQZXJtdXRhdGlvbi5nZXRBbGxQZXJtdXRhdGlvbnMoaXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVybXV0YXRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UGVybXV0YXRpb24gPSBQZXJtdXRhdGlvbi5nZXRSYW5kb21QZXJtdXRhdGlvbihpdGVtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gcGVybXV0YXRpb25zLmZpbmRJbmRleCgocGVybSkgPT4gcGVybS5qb2luKCkgPT09IG5ld1Blcm11dGF0aW9uLmpvaW4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtdXRhdGlvbnMucHVzaChuZXdQZXJtdXRhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAocGVybXV0YXRpb25zLmxlbmd0aCA8IGxpbWl0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwZXJtdXRhdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXRSYW5kb21QZXJtdXRhdGlvbihpdGVtcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gaXRlbXMuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcy5tYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNyYy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzcmMuc3BsaWNlKGlkeCwgMSlbMF07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldE5vblVuaXF1ZU51bWJlclNlcXVlbmNlKGxlbiwgbWluVG90YWwgPSAobGVuICsgMSkgKiBsZW4gLyAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhUb3RhbCA9IGxlbiAqIGxlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFRvdGFsID0gbWluVG90YWwgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4VG90YWwgLSBtaW5Ub3RhbCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1bSA9IGxlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5LmFwcGx5KG51bGwsIEFycmF5KGxlbikpLmZpbGwoMSk7XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2lkeF0gPCBsZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2lkeF0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoc3VtIDwgdGFyZ2V0VG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldE51bWJlclNlcXVlbmNlKGxlbiwgc3RhcnQgPSAxKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5hcHBseShudWxsLCBBcnJheShsZW4pKS5tYXAoKHYsIGkpID0+IGkgKyBzdGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXRPcHRpbWFsUGVybXV0YXRpb24oaXRlbXMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcCgodiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7dmFsOiB2LCBpZHg6IGl9XHJcbiAgICAgICAgICAgICAgICB9KS5zb3J0KChhLCBiKSA9PiBhLnZhbCAtIGIudmFsKS5tYXAoKHYsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2LmNlbGwgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgICAgIH0pLnNvcnQoKGEsIGIpID0+IGEuaWR4IC0gYi5pZHgpLm1hcCgodikgPT4gdi5jZWxsKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldEFsbENvbWJpbmF0aW9uKGl0ZW1zLCBjb21iU2l6ZSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoIDwgMSB8fCBjb21iU2l6ZSA8IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbWJTaXplID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKChpdGVtKSA9PiBbaXRlbV0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgX2l0ZW1zID0gWy4uLml0ZW1zXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbWJpbmF0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUoX2l0ZW1zLmxlbmd0aCA+IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBfaXRlbXMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBiIG9mIF9pdGVtcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbWJpbmF0aW9ucy5wdXNoKFthLCBiXSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29tYmluYXRpb25zO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHdpbmRvdy5QZXJtdXRhdGlvbiA9IFBlcm11dGF0aW9uO1xyXG4gICAgICAgIHJldHVybiBQZXJtdXRhdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBmaW5kTmVhcmVzdEZhY3RvcmlhbCh0YXJnZXQsIGJhc2UgPSAxKXtcclxuICAgICAgICByZXR1cm4gbWF0aC5mYWN0b3JpYWwoYmFzZSArIDEpID4gdGFyZ2V0ID8gYmFzZSA6IGZpbmROZWFyZXN0RmFjdG9yaWFsKHRhcmdldCwgYmFzZSArIDEpXHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL3Blcm11dGF0aW9uLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc4MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5zZXJ2aWNlKCdwb2ludEZhY3RvcnknLCBwb2ludEZhY3RvcnkpO1xyXG4gICAgcG9pbnRGYWN0b3J5LiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBwb2ludEZhY3RvcnkoKXtcclxuICAgICAgICBjbGFzcyBSUG9pbnQge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vdmUoZHgsIGR5KXtcclxuICAgICAgICAgICAgICAgIHRoaXMueCArPSBkeDtcclxuICAgICAgICAgICAgICAgIHRoaXMueSArPSBkeTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1vdmVUbyh4LCB5KXtcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0RGlzdGFuY2UocnBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGR4ID0gTWF0aC5hYnMocnBvaW50LnggLSB0aGlzLngpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHkgPSBNYXRoLmFicyhycG9pbnQueSAtIHRoaXMueSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KChkeCAqIGR4KSArIChkeSAqIGR5KSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXRNaWRQb2ludChycG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXggPSB0aGlzLnggKyAocnBvaW50LnggLSB0aGlzLngpIC8gMjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG15ID0gdGhpcy55ICsgKHJwb2ludC55IC0gdGhpcy55KSAvIDI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3B5ID0gbmV3IHRoaXMuY29uc3RydWN0b3IobXgsIG15KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvcHksIHRoaXMuX2dldFByb3BzQ29weSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXRTY2FsZWQoc2Ype1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29weSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMueCAqIHNmLCB0aGlzLnkgKiBzZik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjb3B5LCB0aGlzLl9nZXRQcm9wc0NvcHkoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0VHJhbnNmb3JtZWQoeFRyYW5zRm4sIHlUcmFuc0ZuKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih4VHJhbnNGbih0aGlzLngpLCB5VHJhbnNGbih0aGlzLnkpKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvcHksIHRoaXMuX2dldFByb3BzQ29weSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbG9uZSgpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29weSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHRoaXMueCwgdGhpcy55KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvcHksIHRoaXMuX2dldFByb3BzQ29weSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlcXVhbHMocnBvaW50KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbnN0cnVjdG9yID09PSBycG9pbnQuY29uc3RydWN0b3JcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnggPT09IHJwb2ludC54XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy55ID09PSBycG9pbnQueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0b1N0cmluZygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGBbeD0ke3RoaXMueH1dW3k9JHt0aGlzLnl9XWA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX2dldFByb3BzQ29weSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMpLnJlZHVjZSgocmVzLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoa2V5ICE9PSAneCcgJiYga2V5ICE9PSAneScpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNba2V5XSA9IHRoaXNba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGFzcyBSVmVjdG9yIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3Ioc3RhcnQsIGVuZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZCA9IGVuZDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgWCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5kLnggLSB0aGlzLnN0YXJ0Lng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IFkoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuZC55IC0gdGhpcy5zdGFydC55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBsZW5ndGgoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy5YLCAyKSArIE1hdGgucG93KHRoaXMuWSwgMikpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBfYWRkKHJ2ZWN0b3Ipe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmQubW92ZShydmVjdG9yLlgsIHJ2ZWN0b3IuWSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfbW92ZShkeCwgZHkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydC5tb3ZlKGR4LCBkeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZC5tb3ZlKGR4LCBkeSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmFuc2xhdGUoZHgsIGR5KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuX21vdmUoZHgsIGR5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzdW0ocnZlY3Rvcil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLl9hZGQocnZlY3Rvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVhbihydmVjdG9yKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGR4ID0gcnZlY3Rvci5zdGFydC54IC0gdGhpcy5zdGFydC54O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHkgPSBydmVjdG9yLnN0YXJ0LnkgLSB0aGlzLnN0YXJ0Lnk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtdiA9IHJ2ZWN0b3IudHJhbnNsYXRlKGR4LCBkeSk7XHJcbiAgICAgICAgICAgICAgICBtdi5lbmQueCA9IChtdi5lbmQueCArIHRoaXMuZW5kLngpIC8gMjtcclxuICAgICAgICAgICAgICAgIG12LmVuZC55ID0gKG12LmVuZC55ICsgdGhpcy5lbmQueSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG12O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsb25lKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFJWZWN0b3IodGhpcy5zdGFydC5jbG9uZSgpLCB0aGlzLmVuZC5jbG9uZSgpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLlJQb2ludCA9IFJQb2ludDtcclxuICAgICAgICB0aGlzLlJWZWN0b3IgPSBSVmVjdG9yO1xyXG5cclxuICAgICAgICB0aGlzLmdldFBvaW50ID0gKHgsIHkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSUG9pbnQoeCwgeSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldFJhbmRvbVBvaW50cyA9IChhbW91bnQsIG1heFgsIG1heFkpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gSW1tdXRhYmxlLlNldCgpLmFzTXV0YWJsZSgpO1xyXG4gICAgICAgICAgICB3aGlsZShwb2ludHMuc2l6ZSA8IGFtb3VudCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwdCA9IG5ldyBSUG9pbnQodGhpcy5nZXRSYW5kb21Db29yZChtYXhYKSwgdGhpcy5nZXRSYW5kb21Db29yZChtYXhZKSk7XHJcbiAgICAgICAgICAgICAgICBwb2ludHMuYWRkKHB0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcG9pbnRzLnZhbHVlU2VxKCkudG9BcnJheSgpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRSYW5kb21Qb2ludCA9IChtYXhYLCBtYXhZKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUlBvaW50KHRoaXMuZ2V0UmFuZG9tQ29vcmQobWF4WCksIHRoaXMuZ2V0UmFuZG9tQ29vcmQobWF4WSkpXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldFJhbmRvbUNvb3JkID0gKG1heCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4KTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvYWxnby9wb2ludC1mYWN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSA3ODFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApe1xyXG4gICAgdnJwLnNlcnZpY2UoJyRzaW1Bbm5lYWwnLCBzaW1Bbm5lYWxTZXJ2aWNlKTtcclxuICAgIHNpbUFubmVhbFNlcnZpY2UuJGluamVjdCA9IFsnJHEnLCAnJHBlcm11dGF0aW9uJywgJyRhcGVlJywgJyRkb3VibGUnLCAncG9pbnRGYWN0b3J5J107XHJcblxyXG4gICAgZnVuY3Rpb24gc2ltQW5uZWFsU2VydmljZSgkcSwgJHBlcm11dGF0aW9uLCAkYXBlZSwgJGRvdWJsZSwgcG9pbnRGYWN0b3J5KXtcclxuICAgICAgICBjb25zdCBCRkxJTUlUID0gNWU1O1xyXG4gICAgICAgIGNsYXNzIFNpbUFubmVhbFNvbHV0aW9uIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IocG9pbnRzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvc3QgPSAtMTtcclxuICAgICAgICAgICAgICAgIGlmIChwb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBsZW5ndGgoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFBvaW50cyhwb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMuc3BsaWNlKDAsIHRoaXMucG9pbnRzLmxlbmd0aCwgLi4ucG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29zdCA9IHRoaXMuZ2V0Q29zdCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldENvc3QoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTaW1Bbm5lYWxTb2x1dGlvbi5jYWxjdWxhdGVDb3N0KHRoaXMucG9pbnRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXhwb3J0KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMubWFwKChwb2ludCkgPT4gW3BvaW50LngsIHBvaW50LnldLmpvaW4oKSkuam9pbignXFxuJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVxdWFscyhzb2x1dGlvbil7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcyA9PT0gc29sdXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCEoc29sdXRpb24gaW5zdGFuY2VvZiBTaW1Bbm5lYWxTb2x1dGlvbikpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSBzb2x1dGlvbi5wb2ludHMuZmluZEluZGV4KChwb2ludCkgPT4gcG9pbnQuZXF1YWxzKHRoaXMucG9pbnRzWzBdKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhcnRJbmRleCA+IC0xXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5jb3N0ID09PSBzb2x1dGlvbi5jb3N0XHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5sZW5ndGggPT09IHNvbHV0aW9uLmxlbmd0aFxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMucG9pbnRzLmV2ZXJ5KChwLCBpLCBhKSA9PiBwLmVxdWFscyhzb2x1dGlvbi5wb2ludHNbKGkgKyBzdGFydEluZGV4KSAlIGEubGVuZ3RoXSkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgY2FsY3VsYXRlQ29zdChwb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvaW50cy5yZWR1Y2UoKHJlcywgcG9pbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzLnByZXYpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuY29zdCArPSByZXMucHJldi5nZXREaXN0YW5jZShwb2ludCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5wcmV2ID0gcG9pbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH0sIHtjb3N0OiAwLCBwcmV2OiBudWxsfSkuY29zdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsYXNzIFNpbUFubmVhbCBleHRlbmRzICRhcGVlLkFQRXZlbnRFbWl0dGVyIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IgKGJhc2UsIG1heFRlbXBlcmF0dXJlLCBtaW5UZW1wZXJhdHVyZSwgaXNDbG9zZWQpe1xyXG4gICAgICAgICAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICAgICAgICAgIGlmIChiYXNlLmxlbmd0aCA8IDMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2ltQW5uZWFsIGFjY2VwdHMgb25seSBzZXF1ZW5jZXMgd2l0aCBsZW5ndGggMysnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3QgPSBiYXNlW2Jhc2UubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDbG9zZWQgJiYgbGFzdCAmJiBiYXNlWzBdICYmICFsYXN0LmVxdWFscyhiYXNlWzBdKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFzZS5wdXNoKGJhc2VbMF0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fYmFzZSA9IGJhc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICRwZXJtdXRhdGlvbi5nZXRSYW5kb21QZXJtdXRhdGlvbigkcGVybXV0YXRpb24uZ2V0TnVtYmVyU2VxdWVuY2UoYmFzZS5sZW5ndGgsIDApKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0ZXAgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnQgPSBtYXhUZW1wZXJhdHVyZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RlbXBlcmF0dXJlID0gbWF4VGVtcGVyYXR1cmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9saW1pdCA9IG1pblRlbXBlcmF0dXJlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc29sdXRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9leGFjdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmFzZS5sZW5ndGggPCAxMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5icnV0ZUZvcmNlKCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2V4YWN0ID0gbmV3IFNpbUFubmVhbFNvbHV0aW9uKHJlc3VsdC5zdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2hhc2ggPSB0aGlzLmhhc2hDb2RlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBjdXJyZW50Q29zdCgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbGN1bGF0ZUNvc3QodGhpcy5fc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBjdXJyZW50U3RhdGUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUuc3BsaWNlKDAsIHRoaXMuX3N0YXRlLmxlbmd0aCwgLi4uc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBwb2ludHMoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFN0YXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGlzRG9uZSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICh0aGlzLl90ZW1wZXJhdHVyZSA8PSB0aGlzLl9saW1pdCB8fCAodGhpcy5fZXhhY3QgJiYgdGhpcy5fZXhhY3QuY29zdCA9PT0gdGhpcy5jdXJyZW50Q29zdCkpICYmIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldCBpc0RvbmUoYm9vbCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoISFib29sKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBpc1J1bm5pbmcoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGVwID4gMSAmJiB0aGlzLl90ZW1wZXJhdHVyZSA+IHRoaXMuX2xpbWl0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBpbmZvKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYFJvdXRlIGxlbmd0aDogJHt0aGlzLmN1cnJlbnRDb3N0fSBTdGVwOiAke3RoaXMuX3N0ZXB9IFRlbXBlcmF0dXJlOiAke3RoaXMuX3RlbXBlcmF0dXJlfWBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgc29sdXRpb25zKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc29sdXRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBoYXNoQ29kZSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2Jhc2UucmVkdWNlKChyZXMsIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9ICRkb3VibGUuZG91YmxlVG9Mb25nQml0cyhpdGVtLngpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBNYXRoLmltdWwoMzEsIHJlcykgKyBpdGVtLnkgfCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IE1hdGguaW11bCgzMSwgcmVzKSArIGl0ZW0ueCB8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IE1hdGguaW11bCgzMSwgcmVzKSArIGl0ZW0ueSB8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRTdGF0ZShzdGF0ZSA9IHRoaXMuX3N0YXRlKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGF0ZS5tYXAoKHYpID0+IHRoaXMuX2Jhc2Vbdl0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZUNvc3Qoc3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gdGhpcy5nZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU2ltQW5uZWFsU29sdXRpb24uY2FsY3VsYXRlQ29zdChwb2ludHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYWxjdWxhdGVQcm9iYWJpbGl0eShkZWx0YUNvc3Qpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZXhwKC0xICogZGVsdGFDb3N0IC8gdGhpcy5fdGVtcGVyYXR1cmUpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRlY3JlYXNlVGVtcGVyYXR1cmUoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RlbXBlcmF0dXJlID0gKHRoaXMuX3N0YXJ0ICogMC4zKSAvIHRoaXMuX3N0ZXA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGVwKys7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldENhbmRpZGF0ZSgpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLl9zdGF0ZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLl9zdGF0ZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGEgPiBiKXtcclxuICAgICAgICAgICAgICAgICAgICBbYSwgYl0gPSBbYiwgYV1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNlZ21lbnQgPSB0aGlzLl9zdGF0ZS5zbGljZShhLCBiKS5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnRoaXMuX3N0YXRlLnNsaWNlKDAsIGEpLCAuLi5zZWdtZW50LCAuLi50aGlzLl9zdGF0ZS5zbGljZShiKV1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnJ1dGVGb3JjZShsaW1pdCA9IEJGTElNSVQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRxKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXRlbXMgPSAkcGVybXV0YXRpb24uZ2V0TnVtYmVyU2VxdWVuY2UodGhpcy5fYmFzZS5sZW5ndGgsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9ICRwZXJtdXRhdGlvbi5nZXRMaW1pdGVkUGVybXV0YXRpb25zKGl0ZW1zLCBsaW1pdCkucmVkdWNlKChyZXMsIHN0YXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvc3QgPSB0aGlzLmNhbGN1bGF0ZUNvc3Qoc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzLmNvc3QgPCAwIHx8IGNvc3QgPCByZXMuY29zdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuY29zdCA9IGNvc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMuc3RhdGUgPSB0aGlzLmdldFN0YXRlKHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtzdGF0ZTogbnVsbCwgY29zdDogLTF9KTtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBiZW5jaG1hcmsobGltaXQgPSBCRkxJTUlUKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXJ0ID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5icnV0ZUZvcmNlKGxpbWl0KS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbmQgPSBtb21lbnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZHVyYXRpb24gPSBlbmQuZGlmZihzdGFydCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmVuY2ggPSBtYXRoLmRpdmlkZShkdXJhdGlvbiwgbGltaXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRvdGFsID0gbWF0aC5mYWN0b3JpYWwodGhpcy5fYmFzZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVzdGltYXRlID0gbW9tZW50LmR1cmF0aW9uKHRvdGFsICogYmVuY2gpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7YmVuY2gsIGR1cmF0aW9uLCBlc3RpbWF0ZSwgbGltaXQsIHRvdGFsfSwgcmVzdWx0KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbmV4dCgpe1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNEb25lIHx8IHRoaXMuX3N0ZXAgPiAxMDAwMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5kaWRhdGUgPSB0aGlzLmdldENhbmRpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuZGlkYXRlQ29zdCA9IHRoaXMuY2FsY3VsYXRlQ29zdChjYW5kaWRhdGUpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudENvc3QgPSB0aGlzLmN1cnJlbnRDb3N0O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGVsdGFDb3N0ID0gY2FuZGlkYXRlQ29zdCAtIGN1cnJlbnRDb3N0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhQ29zdCA8IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gY2FuZGlkYXRlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9iYWJpbGl0eSA9IHRoaXMuY2FsY3VsYXRlUHJvYmFiaWxpdHkoZGVsdGFDb3N0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyID0gTWF0aC5yYW5kb20oKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHJpZ2dlciA8PSBwcm9iYWJpbGl0eSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gY2FuZGlkYXRlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuZGVjcmVhc2VUZW1wZXJhdHVyZSgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdHMucHVzaChjdXJyZW50Q29zdCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudENvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0b3AoKXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zdGVwID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX3RlbXBlcmF0dXJlID0gMDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFkZFNvbHV0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc2V0KCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGVwID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3RlbXBlcmF0dXJlID0gdGhpcy5fc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZSA9ICRwZXJtdXRhdGlvbi5nZXRSYW5kb21QZXJtdXRhdGlvbigkcGVybXV0YXRpb24uZ2V0TnVtYmVyU2VxdWVuY2UodGhpcy5fYmFzZS5sZW5ndGgsIDApKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTb2x1dGlvbihwb2ludHMgPSB0aGlzLnBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzb2x1dGlvbiA9IG5ldyBTaW1Bbm5lYWxTb2x1dGlvbihwb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJldlNvbHV0aW9uID0gdGhpcy5nZXRMYXN0U29sdXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGlmICghcHJldlNvbHV0aW9uIHx8ICFwcmV2U29sdXRpb24uZXF1YWxzKHNvbHV0aW9uKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc29sdXRpb25zLnB1c2goc29sdXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldExhc3RTb2x1dGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvbHV0aW9uc1t0aGlzLl9zb2x1dGlvbnMubGVuZ3RoIC0gMV1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0QmVzdFNvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc29sdXRpb25zLnJlZHVjZSgoYSwgYikgPT4gYS5jb3N0IDwgYi5jb3N0ID8gYSA6IGIpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldFNvbHV0aW9uKGlkeCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc29sdXRpb25zW2lkeF1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGNhbGN1bGF0ZVNlZ21lbnRDb3N0KHBvaW50QSwgcG9pbnRCKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGguc3FydChNYXRoLnBvdygocG9pbnRBLnggLSBwb2ludEIueCksIDIpICsgTWF0aC5wb3coKHBvaW50QS55IC0gcG9pbnRCLnkpLCAyKSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRQcmVzZXRJbnN0YW5jZSA9IChiYXNlLCBtYXhULCBtaW5ULCBpc0Nsb3NlZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBTaW1Bbm5lYWwoYmFzZSwgbWF4VCwgbWluVCwgaXNDbG9zZWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2UuYWRkU29sdXRpb24oaW5zdGFuY2UuX2Jhc2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRJbnN0YW5jZSA9IChhbW91bnQsIHJhbmdlLCBtYXhULCBtaW5ULCBpc0Nsb3NlZCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBiYXNlID0gcG9pbnRGYWN0b3J5LmdldFJhbmRvbVBvaW50cyhhbW91bnQsIHJhbmdlLCByYW5nZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgU2ltQW5uZWFsKGJhc2UsIG1heFQsIG1pblQsIGlzQ2xvc2VkKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuU2ltQW5uZWFsID0gU2ltQW5uZWFsO1xyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvYWxnby9zaW0tYW5uZWFsLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc4MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKlByb3ZpZGVyIHRvIHByb2R1Y2UgaW5kZXBlbmRlbnQgaW5zdGFuY2VzIG9mIEFQSSByZXF1ZXN0cy5cclxuICogVXNhZ2U6ICRhcHJlcXVlc3QuYnlOYW1lKG5hbWUpLnNlbmQocGFyYW1zLGRhdGEpLnRoZW4oKVxyXG4gKiBAbmFtZTogbmFtZSBvZiBjb25maWcgdGVtcGxhdGVcclxuICogQHBhcmFtczogb2JqZWN0IHRvIHNlcmlhbGl6ZSBhbmQgYWRkIHRvIHRoZSBVUkwuIEJ5IGRlZmF1bHQgc2VyaWFsaXplZCB0byBVUkwgc3RyaW5nLCBidXQgY2FuIGJlIG92ZXJyaWRlbiB3aXRoIGN1c3RvbSBzZXJ2aWNlXHJcbiAqICAgICAgIGJ5IHNldHRpbmcgcGFyYW1TZXJpYWxpemVyIHByb3BlcnR5IGluIGNvbmZpZyB0ZW1wbGF0ZS4gc2xhc2hQYXJhbVNlcmlhbGl6ZXIgY29udmVydHMgcGFyYW1zIHRvIC9rZXkxL3ZhbHVlMS9rZXkyL3ZhbHVlMi9cclxuICogQGRhdGE6IG9iamVjdCBwYXNzZWQgd2l0aGluIHJlcXVlc3QgYm9keVxyXG4gKiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5wcm92aWRlcignYXBpUmVxdWVzdCcsIFtmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgIHRoaXMuJGdldCA9IFsnJHRpbWVvdXQnLCAnJHEnLCAnJGh0dHAnLCAnJGluamVjdG9yJywgZnVuY3Rpb24gKCR0aW1lb3V0LCAkcSwgJGh0dHAsICRpbmplY3Rvcikge1xyXG4gICAgICAgICAgICBjb25zdCBpbmplY3QgPSB0aGlzLiRpbmplY3Q7XHJcbiAgICAgICAgICAgIGNsYXNzIEFwaVJlcXVlc3Qge1xyXG4gICAgICAgICAgICAgICAgY29uc3RydWN0b3IgKG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BhcmFtcyA9IG9iai5wYXJhbXM7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGF0YSA9IG9iai5kYXRhO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VybCA9IG9iai51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWV0aG9kID0gb2JqLm1ldGhvZDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZWFkZXJzID0geydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbid9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGVhZGVycyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5faGVhZGVycywgb2JqLmhlYWRlcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnBhcmFtU2VyaWFsaXplcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGFyYW1TZXJpYWxpemVyID0gJGluamVjdG9yLmdldChvYmoucGFyYW1TZXJpYWxpemVyKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX3BhcmFtcyAmJiB0aGlzLnBhcmFtU2VyaWFsaXplcil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91cmwgPSB0aGlzLnBhcmFtU2VyaWFsaXplcih0aGlzLl9wYXJhbXMsIHRoaXMuX3VybClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBnZXQgcGFyYW1zKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLnBhcmFtU2VyaWFsaXplciA/IE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX3BhcmFtcykgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2V0IGRhdGEoKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZXQgdXJsKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdldCBtZXRob2QoKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWV0aG9kO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2V0IGhlYWRlcnMoKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVycztcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBidWlsZFVybChwYXJhbXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYXJhbVNlcmlhbGl6ZXIgfHwgIXBhcmFtcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBhcmFtU2VyaWFsaXplcihwYXJhbXMsIHRoaXMuX3VybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZCAocGFyYW1zLCBkYXRhLCB1cmxGb3JtYXRBcmdzID0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmV4dGVuZChwYXJhbXMgfHwge30sIHRoaXMucGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKGRhdGEgfHwge30sIHRoaXMuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmKHVybEZvcm1hdEFyZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZvcm1hdCA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyZWF0ZSA6IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVnZXhwID0gL3soW157XSspfS9nO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oc3RyLCBvKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZShyZWdleHAsIGZ1bmN0aW9uKGlnbm9yZSwga2V5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAhKGtleSA9IG9ba2V5XSkgPyAnJyA6IGtleTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZWRVcmwgPSBmb3JtYXQuY3JlYXRlKHRoaXMudXJsLCB1cmxGb3JtYXRBcmdzKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdHRlZFVybCA9IHRoaXMuYnVpbGRVcmwocGFyYW1zKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogdGhpcy5oZWFkZXJzLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IC9eXFwvLisvLnRlc3QodGhpcy5mb3JtYXR0ZWRVcmwgKSA/IHRoaXMuZm9ybWF0dGVkVXJsICA6IGAvJHt0aGlzLmZvcm1hdHRlZFVybCB9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB0aGlzLnBhcmFtU2VyaWFsaXplciA/IG51bGwgOiBwYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGFcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cChjb25maWcpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kTXVsdGlwYXJ0KHBhcmFtcywgZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmQgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhkYXRhKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFba2V5XSBpbnN0YW5jZW9mIEZpbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmQuYXBwZW5kKGtleSwgZGF0YVtrZXldLCBkYXRhW2tleV0ubmFtZSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZkLmFwcGVuZChrZXksIGRhdGFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBwYXJhbXMgPyB0aGlzLmJ1aWxkVXJsKHBhcmFtcykgOiB0aGlzLnVybDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogdW5kZWZpbmVkfSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtUmVxdWVzdDogYW5ndWxhci5pZGVudGl0eVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwW3RoaXMubWV0aG9kLnRvTG93ZXJDYXNlKCldKHVybCwgZmQsIGNvbmZpZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIGJ5Q29uZmlnIChjb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXBpUmVxdWVzdChjb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiByZXN0ZnVsIChwYXJhbXMsIG1ldGhvZCA9ICdHRVQnLCB1cmwgPSAnL2FwaS8nKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgICAgIHVybCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXMsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1TZXJpYWxpemVyOiAnc2xhc2hQYXJhbVNlcmlhbGl6ZXInXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcGlSZXF1ZXN0KGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBnZXRJbnN0YW5jZTogYnlDb25maWcsXHJcbiAgICAgICAgICAgICAgICBnZXRSZXN0SW5zdGFuY2U6IHJlc3RmdWxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1dO1xyXG4gICAgfV0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2FwaS9hcGktcmVxdWVzdC1wcm92aWRlci5qc1xuLy8gbW9kdWxlIGlkID0gNzgzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKGFwZnJvbnQpID0+IHtcclxuICAgIGFwZnJvbnQuc2VydmljZSgnc2xhc2hQYXJhbVNlcmlhbGl6ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gc2VyaWFsaXplVmFsdWUodikge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc09iamVjdCh2KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNEYXRlKHYpID8gdi50b0lTT1N0cmluZygpIDogYW5ndWxhci50b0pzb24odik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcGFyYW1TZXJpYWxpemVyKHBhcmFtcywgdXJsKSB7XHJcbiAgICAgICAgICAgIGlmICghcGFyYW1zKSByZXR1cm4gdXJsO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHVybCArIE9iamVjdC5rZXlzKHBhcmFtcykucmVkdWNlKChyZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhaXIgPSBba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXNba2V5XSAmJiAhYW5ndWxhci5pc09iamVjdChwYXJhbXNba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWlyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1trZXldLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvW1xcLlxcKlxcLVxcIVxcflxcKFxcKV0vZywgJycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCVcXHd7Mn0vZywgJycpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBbLi4ucmVzLCAuLi5wYWlyXVxyXG4gICAgICAgICAgICB9LCBbXSkuam9pbignLycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2FwaS9zbGFzaC1wYXJhbS1zZXJpYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3ODRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhcGZyb250KSB7XHJcbiAgICBhcGZyb250LnNlcnZpY2UoJ3RwbFF1ZXJ5U2VyaWFsaXplcicsIHRwbFF1ZXJ5U2VyaWFsaXplcik7XHJcbiAgICB0cGxRdWVyeVNlcmlhbGl6ZXIuJGluamVjdCA9IFsnJGh0dHBQYXJhbVNlcmlhbGl6ZXInLCAnZGF0ZVV0aWxzJ107XHJcblxyXG4gICAgZnVuY3Rpb24gdHBsUXVlcnlTZXJpYWxpemVyKCRodHRwUGFyYW1TZXJpYWxpemVyLCAkYXBEYXRlVXRpbHMpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHBhcmFtcywgdXJsKSB7XHJcbiAgICAgICAgICAgIGlmICghcGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdXJsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSB7fTtcclxuICAgICAgICAgICAgbGV0IHBhcnNlZFVybCA9IE9iamVjdC5rZXlzKHBhcmFtcykucmVkdWNlKChyZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZXMuaW5jbHVkZXMoJzonICsga2V5KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9ICRhcERhdGVVdGlscy5wYXJzZURhdGUocGFyYW1zW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXJ5W2tleV0gPSBkYXRlID8gJGFwRGF0ZVV0aWxzLmxvY2FsQXNVdGMoZGF0ZSkgOiBwYXJhbXNba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXMucmVwbGFjZSgnOicgKyBrZXksIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba2V5XSA/IHBhcmFtc1trZXldLnRvU3RyaW5nKCkgOiAnMCcpKVxyXG4gICAgICAgICAgICB9LCB1cmwpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHF1ZXJ5KS5sZW5ndGggPyBwYXJzZWRVcmwgKyAnPycgKyAkaHR0cFBhcmFtU2VyaWFsaXplcihxdWVyeSkgOiBwYXJzZWRVcmw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvYXBpL3RwbC1xdWVyeS1zZXJpYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3ODVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuZGlyZWN0aXZlKCdrTWVhbicsIGtNZWFuRGlyZWN0aXZlKTtcclxuICAgIGtNZWFuRGlyZWN0aXZlLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBrTWVhbkRpcmVjdGl2ZSgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vay1tZWFuLXRwbC5odG1sJyksXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdLTWVhbkNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdjdHJsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2cnAuY29udHJvbGxlcignS01lYW5Db250cm9sbGVyJywgS01lYW5Db250cm9sbGVyKTtcclxuICAgIEtNZWFuQ29udHJvbGxlci4kaW5qZWN0ID0gWycka21lYW4nLCAnJGNvbG9yZGVmJ107XHJcblxyXG4gICAgZnVuY3Rpb24gS01lYW5Db250cm9sbGVyKCRrbWVhbiwgJGNvbG9yZGVmKXtcclxuICAgICAgICB0aGlzLnBvaW50Q291bnQgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5jbHVzdGVyQ291bnQgPSAzO1xyXG4gICAgICAgIHRoaXMubWFwV2lkdGggPSA2NDA7XHJcbiAgICAgICAgdGhpcy5tYXBIZWlnaHQgPSA0ODA7XHJcbiAgICAgICAgdGhpcy5rbWVhbiA9ICRrbWVhbi5nZXRJbnN0YW5jZSh0aGlzLnBvaW50Q291bnQsIHRoaXMuY2x1c3RlckNvdW50LCB0aGlzLm1hcFdpZHRoLCB0aGlzLm1hcEhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5jb2xvcnMgPSBbJyNGNDQzMzYnLCAnIzIxOTZGMycsICcjRkY5ODAwJywgJyM4QkMzNEEnLCAnIzlDMjdCMCcsICcjMDA5Njg4JywgJyNGRkMxMDcnLCAnIzRDQUY1MCcsICcjRTkxRTYzJywgJyMwMEJDRDQnXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNldENsdXN0ZXJzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmttZWFuICYmIHRoaXMua21lYW4ucmVzZXRBbGxDbHVzdGVycygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucnVuQ2x1c3RlcmluZ1N0ZXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua21lYW4gJiYgdGhpcy5rbWVhbi5jbHVzdGVyaW5nU3RlcCgpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWJ1aWxkID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmttZWFuID0gJGttZWFuLmdldEluc3RhbmNlKHRoaXMucG9pbnRDb3VudCwgdGhpcy5jbHVzdGVyQ291bnQsIHRoaXMubWFwV2lkdGgsIHRoaXMubWFwSGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9rLW1lYW4vay1tZWFuLWRpcmVjdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNzg2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBuZy1zdHlsZT1cXFwieydtYXgtd2lkdGgnOiAoY3RybC5tYXBXaWR0aCArIDE2MCkgKyAncHgnfVxcXCIgZmxleD5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYWxnby1jb250cm9sc1xcXCIgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBzdGFydFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgPG1kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuPldpZHRoPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc2xpZGVyIG1pbj1cXFwiNTAwXFxcIiBtYXg9XFxcIjEyMDBcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLm1hcFdpZHRoXFxcIiBhcmlhLWxhYmVsPVxcXCJtYXAgd2lkdGhcXFwiIGNsYXNzPVxcXCJtZC13YXJuXFxcIj48L21kLXNsaWRlcj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLm1hcFdpZHRoXFxcIiBhcmlhLWxhYmVsPVxcXCJtYXAgd2lkdGhcXFwiIGFyaWEtY29udHJvbHM9XFxcIm1hcC1zaXplLXNsaWRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDwvbWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8bWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4+SGVpZ2h0PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc2xpZGVyIG1pbj1cXFwiNTAwXFxcIiBtYXg9XFxcIjEyMDBcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLm1hcEhlaWdodFxcXCIgYXJpYS1sYWJlbD1cXFwibWFwIGhlaWdodFxcXCIgY2xhc3M9XFxcIm1kLXdhcm5cXFwiPjwvbWQtc2xpZGVyPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwubWFwSGVpZ2h0XFxcIiBhcmlhLWxhYmVsPVxcXCJtYXAgaGVpZ2h0XFxcIiBhcmlhLWNvbnRyb2xzPVxcXCJtYXAtc2l6ZS1zbGlkZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L21kLXNsaWRlci1jb250YWluZXI+XFxyXFxuXFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg9XFxcIjQ1XFxcIj5cXHJcXG4gICAgICAgICAgICA8bWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4+UG9pbnRzPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc2xpZGVyIG1pbj1cXFwiNFxcXCIgbWF4PVxcXCIzMDBcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLnBvaW50Q291bnRcXFwiIGFyaWEtbGFiZWw9XFxcInBvaW50c1xcXCIgY2xhc3M9XFxcIm1kLXdhcm5cXFwiPjwvbWQtc2xpZGVyPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwucG9pbnRDb3VudFxcXCIgYXJpYS1sYWJlbD1cXFwicG9pbnRzIG51bWJlclxcXCIgYXJpYS1jb250cm9scz1cXFwicG9pbnRzLW51bWJlci1zbGlkZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L21kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPG1kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuPkNsdXN0ZXJzPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc2xpZGVyIG1pbj1cXFwiMlxcXCIgbWF4PVxcXCIxMFxcXCIgbmctbW9kZWw9XFxcImN0cmwuY2x1c3RlckNvdW50XFxcIiBhcmlhLWxhYmVsPVxcXCJwb2ludHNcXFwiIGNsYXNzPVxcXCJtZC13YXJuXFxcIj48L21kLXNsaWRlcj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLmNsdXN0ZXJDb3VudFxcXCIgYXJpYS1sYWJlbD1cXFwiY2x1c3RlciBjb3VudFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDwvbWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcImNlbnRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cXFwiY3RybC5yZWJ1aWxkKClcXFwiIGFyaWEtbGFiZWw9XFxcInJlYnVpbGRcXFwiPk5ldzwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIG5nLWNsaWNrPVxcXCJjdHJsLnJlc2V0Q2x1c3RlcnMoKVxcXCIgYXJpYS1sYWJlbD1cXFwicmVzZXQgY2x1c3RlcnNcXFwiPlJlc2V0PC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gY2xhc3M9XFxcIm1kLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLnJ1bkNsdXN0ZXJpbmdTdGVwKClcXFwiIGFyaWEtbGFiZWw9XFxcInJ1biBjbHVzdGVyaW5nIHN0ZXBcXFwiPk5leHQ8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYWxnby1kcmF3LXNjcm9sbGVyXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImstbWVhbi1jb250YWluZXJcXFwiIG5nLXN0eWxlPVxcXCJ7J2hlaWdodCc6IGN0cmwubWFwSGVpZ2h0ICsgJ3B4JywgJ3dpZHRoJzogY3RybC5tYXBXaWR0aCArICdweCd9XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrLW1lYW4tbGF5ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrLW1lYW4tcG9pbnQtd3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cXFwicG9pbnQgaW4gY3RybC5rbWVhbi5wb2ludHNcXFwiIGNsYXNzPVxcXCJrLW1lYW4tcG9pbnRcXFwiIG5nLXN0eWxlPVxcXCJ7J3RvcCc6IHBvaW50LnkgKyAncHgnLCAnbGVmdCc6IHBvaW50LnggKyAncHgnfVxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImstbWVhbi1sYXllclxcXCIgbmctcmVwZWF0PVxcXCJjbHVzdGVyIGluIGN0cmwua21lYW4uY2x1c3RlcnNcXFwiIG5nLXN0eWxlPVxcXCJ7J3otaW5kZXgnOiAoY2x1c3Rlci5pbmRleCArIDEpICogMTB9XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLXBvaW50LXdyYXBwZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLXBvaW50XFxcIiBuZy1yZXBlYXQ9XFxcInBvaW50IGluIGNsdXN0ZXIucG9pbnRzXFxcIiBuZy1zdHlsZT1cXFwieyd0b3AnOiBwb2ludC55ICsgJ3B4JywgJ2xlZnQnOiBwb2ludC54ICsgJ3B4JywgJ2JvcmRlci1jb2xvcic6IGN0cmwuY29sb3JzW2NsdXN0ZXIuaW5kZXhdfVxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrLW1lYW4tcG9pbnQgay1tZWFuLWNlbnRyb2lkXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICBuZy1zdHlsZT1cXFwieyd0b3AnOiBjbHVzdGVyLmNlbnRyb2lkLnkgKyAncHgnLFxcclxcbiAgICAgICAgICAgICAgICAgICAgICdsZWZ0JzogY2x1c3Rlci5jZW50cm9pZC54ICsgJ3B4JyxcXHJcXG4gICAgICAgICAgICAgICAgICAgICAnYm9yZGVyLWNvbG9yJzogY3RybC5jb2xvcnNbY2x1c3Rlci5pbmRleF0sXFxyXFxuICAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBjdHJsLmNvbG9yc1tjbHVzdGVyLmluZGV4XX1cXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvay1tZWFuL2stbWVhbi10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNzg3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLnNlcnZpY2UoJyRrbWVhbicsIGtNZWFuU2VydmljZSk7XHJcbiAgICBrTWVhblNlcnZpY2UuJGluamVjdCA9IFsncG9pbnRGYWN0b3J5J107XHJcblxyXG4gICAgZnVuY3Rpb24ga01lYW5TZXJ2aWNlKHBvaW50RmFjdG9yeSl7XHJcbiAgICAgICAgY2xhc3MgQ2x1c3RlciB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGluZGV4LCBjZW50cm9pZCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbnRyb2lkID0gY2VudHJvaWQ7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgc2l6ZSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FsY3VsYXRlQ2VudHJvaWQoKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFthdmdYLCBhdmdZXSA9IHRoaXMucG9pbnRzLnJlZHVjZSgocmVzLCBycCkgPT4gW3Jlc1swXSArIHJwLngsIHJlc1sxXSArIHJwLnldLCBbMCwgMF0pLm1hcCgoY29vcmQpID0+IGNvb3JkIC8gdGhpcy5zaXplKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VudHJvaWQgPSBuZXcgcG9pbnRGYWN0b3J5LlJQb2ludChhdmdYLCBhdmdZKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRQb2ludChycG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5wb2ludHMuZmluZEluZGV4KChwKSA9PiBwLmVxdWFscyhycG9pbnQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChpZHggPT09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5wdXNoKHJwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVtb3ZlUG9pbnQocnBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMucG9pbnRzLmZpbmRJbmRleCgocCkgPT4gcC5lcXVhbHMocnBvaW50KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWR4ID4gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLnNwbGljZShpZHgsIDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc2V0KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMuc3BsaWNlKDAsIHRoaXMucG9pbnRzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGVxdWFscyhjbHVzdGVyKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNpemUgPT09IGNsdXN0ZXIuc2l6ZSAmJiB0aGlzLnBvaW50cy5yZWR1Y2UoKHJlcywgcG9pbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBjbHVzdGVyLnBvaW50cy5maW5kSW5kZXgoKGNwdCkgPT4gY3B0LmVxdWFscyhwb2ludCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpZHggPiAtMSA/IHJlcyArIDEgOiByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCAwKSA9PT0gdGhpcy5zaXplO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNsYXNzIEtNZWFuQ2x1c3RlcnN7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yIChucG9pbnRzLCBuY2x1c3RlcnMsIHdpZHRoLCBoZWlnaHQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKG5jbHVzdGVycyA+PSBucG9pbnRzKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVGhlcmUgc2hvdWxkIGJlIGxhc3MgY2x1c3RlcnMgdGhhbiBwb2ludHMnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMgPSBwb2ludEZhY3RvcnkuZ2V0UmFuZG9tUG9pbnRzKG5wb2ludHMsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jbHVzdGVycyA9IG5ldyBBcnJheShuY2x1c3RlcnMpLmZpbGwoMCkubWFwKCh2LCBpKSA9PiBuZXcgQ2x1c3RlcihpLCBwb2ludEZhY3RvcnkuZ2V0UmFuZG9tUG9pbnQodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IG1heERpc3RhbmNlKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KCh0aGlzLndpZHRoICogdGhpcy53aWR0aCkgKyAodGhpcy5oZWlnaHQgKiB0aGlzLmhlaWdodCkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNsdXN0ZXJpbmdTdGVwKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0QWxsQ2x1c3RlcnMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLmZvckVhY2goKHBvaW50LCBwaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmNsdXN0ZXJzLnJlZHVjZSgocmVzLCBjbHVzdGVyLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50LmdldERpc3RhbmNlKGNsdXN0ZXIuY2VudHJvaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBEaXN0YW5jZSBiZXR3ZWVuIHBvaW50cyAke3BvaW50LnRvU3RyaW5nKCl9IGFuZCAke2NsdXN0ZXIuY2VudHJvaWQudG9TdHJpbmcoKX0gPSAke2Rpc3R9LiBNYXggZGlzdGFuY2UgaXMgJHt0aGlzLm1heERpc3RhbmNlfWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzWzBdIDwgZGlzdCA/IHJlcyA6IFtkaXN0LCBpZHhdXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgW3RoaXMubWF4RGlzdGFuY2UsIC0xXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgUG9pbnQgJHtwaWR4fTogJHtwb2ludC50b1N0cmluZygpfSBiZWxvbmdzIHRvIHRoZSBjbHVzdGVyICR7aW5kZXh9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbHVzdGVyc1tpbmRleFsxXV0gJiYgdGhpcy5jbHVzdGVyc1tpbmRleFsxXV0uYWRkUG9pbnQocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlY2FsY0FsbENsdXN0ZXJzKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlY2FsY0FsbENsdXN0ZXJzKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbHVzdGVycy5mb3JFYWNoKChjbHVzdGVyKSA9PiBjbHVzdGVyLmNhbGN1bGF0ZUNlbnRyb2lkKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlc2V0QWxsQ2x1c3RlcnMoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsdXN0ZXJzLmZvckVhY2goKGNsdXN0ZXIpID0+IGNsdXN0ZXIucmVzZXQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0SW5zdGFuY2UgPSAobnBvaW50cywgbmNsdXN0ZXJzLCB3aWR0aCwgaGVpZ2h0KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgS01lYW5DbHVzdGVycyhucG9pbnRzLCBuY2x1c3RlcnMsIHdpZHRoLCBoZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzg4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5kaXJlY3RpdmUoJ3JvdXRlRHJhdycsIHJvdXRlRHJhd0RpcmVjdGl2ZSk7XHJcbiAgICByb3V0ZURyYXdEaXJlY3RpdmUuJGluamVjdCA9IFsnJHEnLCAnJHRpbWVvdXQnXTtcclxuXHJcbiAgICBmdW5jdGlvbiByb3V0ZURyYXdEaXJlY3RpdmUoJHEsICR0aW1lb3V0KXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3JvdXRlLWRyYXctdHBsLmh0bWwnKSxcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1JvdXRlRHJhd0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdjdHJsJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdnJwLmNvbnRyb2xsZXIoJ1JvdXRlRHJhd0NvbnRyb2xsZXInLCBSb3V0ZURyYXdDb250cm9sbGVyKTtcclxuICAgIFJvdXRlRHJhd0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJGVsZW1lbnQnLCAnJHRpbWVvdXQnLCAnJHNpbUFubmVhbCcsICdwb2ludEZhY3RvcnknXTtcclxuXHJcbiAgICBmdW5jdGlvbiBSb3V0ZURyYXdDb250cm9sbGVyKCRlbGVtZW50LCAkdGltZW91dCwgJHNpbUFubmVhbCwgcG9pbnRGYWN0b3J5KXtcclxuICAgICAgICBjb25zdCBjb2xvcnMgPSBbXHJcbiAgICAgICAgICAgICcjMjE5NkYzJyxcclxuICAgICAgICAgICAgJyNGNDQzMzYnLFxyXG4gICAgICAgICAgICAnI0ZGQzEwNycsXHJcbiAgICAgICAgICAgICcjNENBRjUwJyxcclxuICAgICAgICAgICAgJyNGRjk4MDAnLFxyXG4gICAgICAgICAgICAnIzAwOTY4OCcsXHJcbiAgICAgICAgICAgICcjOUMyN0IwJyxcclxuICAgICAgICAgICAgJyNGRkVCM0InLFxyXG4gICAgICAgICAgICAnIzNGNTFCNScsXHJcbiAgICAgICAgICAgICcjQ0REQzM5J1xyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5tYXBTaXplID0gJGVsZW1lbnRbMF0ub2Zmc2V0V2lkdGggLSAxNjtcclxuICAgICAgICB0aGlzLm1heFRlbXAgPSAxMDtcclxuICAgICAgICB0aGlzLm1pblRlbXAgPSAwLjAwMDA1O1xyXG4gICAgICAgIHRoaXMucG9pbnRzTnVtYmVyID0gMjA7XHJcbiAgICAgICAgdGhpcy5zaW1Bbm5lYWwgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYmVzdFJvdXRlID0gbnVsbDtcclxuICAgICAgICB0aGlzLnVzZVByZXNldCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNDbG9zZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnByZXNldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5jb2xvckl0ZXJhdG9yID0gY29sb3JzLnZhbHVlcygpO1xyXG5cclxuICAgICAgICB0aGlzLnJlYnVpbGRSb3V0ZSA9IChyZXNldCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkcmF3RWxlbSA9ICQoJy5yb3V0ZS1kcmF3LWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICBjb25zdCByb3V0ZUluZm8gPSBkcmF3RWxlbS5maW5kKCcucm91dGUtaW5mbycpO1xyXG4gICAgICAgICAgICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudF9zZWFyY2gnKTtcclxuICAgICAgICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwcmVzZXQgPSBidWlsZFByZXNldCh0aGlzLnByZXNldCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocmVzZXQgfHwgIXRoaXMuc2ltQW5uZWFsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2ltQW5uZWFsID0gdGhpcy51c2VQcmVzZXRcclxuICAgICAgICAgICAgICAgICAgICA/ICRzaW1Bbm5lYWwuZ2V0UHJlc2V0SW5zdGFuY2UocHJlc2V0LCB0aGlzLm1heFRlbXAsIHRoaXMubWluVGVtcCwgdGhpcy5pc0Nsb3NlZClcclxuICAgICAgICAgICAgICAgICAgICA6ICRzaW1Bbm5lYWwuZ2V0SW5zdGFuY2UodGhpcy5wb2ludHNOdW1iZXIsIHRoaXMubWFwU2l6ZSwgdGhpcy5tYXhUZW1wLCB0aGlzLm1pblRlbXAsIHRoaXMuaXNDbG9zZWQpO1xyXG4gICAgICAgICAgICAgICAgZHJhd1BvaW50cyh0aGlzLnNpbUFubmVhbC5wb2ludHMsIGRyYXdFbGVtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNpbUFubmVhbC5yZXNldCgpO1xyXG4gICAgICAgICAgICBjbGVhckNhbnZhcyhjdHgpO1xyXG4gICAgICAgICAgICBkcmF3Um91dGVTZXF1ZW5jZShjdHgsIHRoaXMuc2ltQW5uZWFsLCByb3V0ZUluZm8pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZHJhd1NvbHV0aW9uID0gKGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2ltQW5uZWFsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBzY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvbHV0aW9uXycgKyBpZHgpO1xyXG4gICAgICAgICAgICBpZiAoIXNjYW52YXMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICR0aW1lb3V0KCgpID0+IHRoaXMuZHJhd1NvbHV0aW9uKGlkeCksIDUwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc29sdXRpb24gPSB0aGlzLnNpbUFubmVhbC5nZXRTb2x1dGlvbihpZHgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2N0eCA9IHNjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgICAgIHNvbHV0aW9uLmNvbG9yID0gdGhpcy5nZXRDb2xvcigpO1xyXG4gICAgICAgICAgICAgICAgZHJhd1JvdXRlKHNjdHgsIHNvbHV0aW9uLnBvaW50cywgc29sdXRpb24uY29sb3IpO1xyXG4gICAgICAgICAgICB9LCAwKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuYWRkU29sdXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5wcmVzZXQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IGJ1aWxkUHJlc2V0KHRoaXMucHJlc2V0KTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNpbUFubmVhbCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkcmF3RWxlbSA9ICQoJy5yb3V0ZS1kcmF3LWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICAgICAgZHJhd1BvaW50cyhwb2ludHMsIGRyYXdFbGVtKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2ltQW5uZWFsID0gJHNpbUFubmVhbC5nZXRQcmVzZXRJbnN0YW5jZShwb2ludHMsIHRoaXMubWF4VGVtcCwgdGhpcy5taW5UZW1wKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2ltQW5uZWFsLmFkZFNvbHV0aW9uKHBvaW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmZvY3VzU29sdXRpb24gPSAoaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyYXdFbGVtID0gJCgnLnJvdXRlLWRyYXctY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGRyYXdFbGVtLmZpbmQoJy5yb3V0ZS1zb2x1dGlvbicpLmVhY2goKGksIGVsZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICQoZWxlbSkudG9nZ2xlQ2xhc3MoJ2ZvY3VzZWQtc29sdXRpb24nLCBpID09PSBpZHgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmRvd25sb2FkU29sdXRpb24gPSAoaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudF9zZWFyY2gnKTtcclxuICAgICAgICAgICAgY29uc3QgZGF0YVVybCA9IHNjYW52YXMudG9EYXRhVVJMKCk7XHJcbiAgICAgICAgICAgIGluaXREb3dubG9hZChkYXRhVXJsKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnN0b3BSb3V0ZVNlYXJjaCA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNpbUFubmVhbCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zaW1Bbm5lYWwuc3RvcCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNpbUFubmVhbC5nZXRMYXN0U29sdXRpb24oKS5leHBvcnQoKSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmdldENvbG9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY29sb3JJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgIGlmICghaXRlbS52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9ySXRlcmF0b3IgPSBjb2xvcnMudmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5jb2xvckl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBidWlsZFByZXNldChkYXRhKXtcclxuICAgICAgICAgICAgcmV0dXJuIGRhdGEgPyBkYXRhLnNwbGl0KCdcXG4nKS5tYXAoKHN0cikgPT5cclxuICAgICAgICAgICAgICAgIHBvaW50RmFjdG9yeS5nZXRQb2ludCguLi5zdHJcclxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJywnKVxyXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKHYpID0+IHBhcnNlSW50KHYpKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICApIDogW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBkcmF3Um91dGVTZXF1ZW5jZShjdHgsIHNpbUFubmVhbCwgaW5mb0VsZW0sIG1pbkNvc3Qpe1xyXG4gICAgICAgICAgICBpZiAoc2ltQW5uZWFsLmlzRG9uZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgUHJvY2Vzc2luZyBpcyBkb25lIHdpdGggY29zdCBvZiAke3NpbUFubmVhbC5nZXRMYXN0U29sdXRpb24oKS5jb3N0fS4gJHtzaW1Bbm5lYWwuc29sdXRpb25zLmxlbmd0aH0gc29sdXRpb25zIGluIHN0b2NrYCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhzaW1Bbm5lYWwuZ2V0TGFzdFNvbHV0aW9uKCkuZXhwb3J0KCkpO1xyXG4gICAgICAgICAgICAgICAgY2xlYXJDYW52YXMoY3R4KTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgY3VycmVudENvc3QgPSBzaW1Bbm5lYWwuY3VycmVudENvc3Q7XHJcbiAgICAgICAgICAgIGlmICghbWluQ29zdCB8fCBtaW5Db3N0ID4gY3VycmVudENvc3Qpe1xyXG4gICAgICAgICAgICAgICAgY2xlYXJDYW52YXMoY3R4KTtcclxuICAgICAgICAgICAgICAgIGRyYXdSb3V0ZShjdHgsIHNpbUFubmVhbC5wb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgbWluQ29zdCA9IGN1cnJlbnRDb3N0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGluZm9FbGVtLmh0bWwoYG1pbi4gY29zdDogPGI+JHttaW5Db3N0fTwvYj4uICR7c2ltQW5uZWFsLmluZm99YCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoc2ltQW5uZWFsLm5leHQoKSkge1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyYXdSb3V0ZVNlcXVlbmNlKGN0eCwgc2ltQW5uZWFsLCBpbmZvRWxlbSwgbWluQ29zdCk7XHJcbiAgICAgICAgICAgICAgICB9LCA1KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBkcmF3UG9pbnRzKHBvaW50cywgY29udGFpbmVyKXtcclxuICAgICAgICAgICAgJChjb250YWluZXIpLmZpbmQoJy5yb3V0ZS1wb2ludCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICBjb25zdCBzZiA9IGdldFNjYWxlRmFjdG9yKHBvaW50cyk7XHJcblxyXG4gICAgICAgICAgICBwb2ludHMuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHB0ID0gc2YgIT09IDEgPyBwb2ludC5nZXRTY2FsZWQoc2YpIDogcG9pbnQuY2xvbmUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHB4ID0gTWF0aC5yb3VuZChwdC54KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHB5ID0gTWF0aC5yb3VuZChwdC55KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBpZCA9IFsncnAnLCBwb2ludC54LCBwb2ludC55XS5qb2luKCdfJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHBpZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50RWxlbSA9IGFuZ3VsYXIuZWxlbWVudChgPGRpdiBjbGFzcz1cInJvdXRlLXBvaW50XCIgaWQ9XCJycF8ke3BvaW50Lnh9XyR7cG9pbnQueX1cIj48c3Bhbj4ke3BvaW50Lnh9eCR7cG9pbnQueX08L3NwYW4+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRFbGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogcHkgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBweCArICdweCdcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBjb250YWluZXIuYXBwZW5kKHBvaW50RWxlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBkcmF3Um91dGUoY3R4LCBwb2ludHMsIGNvbG9yID0gJyMwRDQ3QTEnKXtcclxuICAgICAgICAgICAgY29uc3Qgc2YgPSBnZXRTY2FsZUZhY3Rvcihwb2ludHMpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHMgPSBzZiAhPT0gMSA/IHBvaW50cy5tYXAoKHB0KSA9PiBwdC5nZXRTY2FsZWQoc2YpKSA6IHBvaW50cy5zbGljZSgpO1xyXG5cclxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY29sb3I7XHJcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgICAgICBjdHgubGluZUNhcCA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgIGN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XHJcblxyXG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8ocHRzWzBdLngsIHB0c1swXS55KTtcclxuICAgICAgICAgICAgcHRzLnNsaWNlKDEpLmZvckVhY2goKHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjdHgubGluZVRvKHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICBtYXJrU3RhcnRFbmRQb2ludHMocG9pbnRzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIG1hcmtTdGFydEVuZFBvaW50cyhwb2ludHMpe1xyXG4gICAgICAgICAgICBjb25zdCBkcmF3RWxlbSA9ICQoJy5yb3V0ZS1kcmF3LWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICBjb25zdCBmaWQgPSBgI3JwXyR7cG9pbnRzWzBdLnh9XyR7cG9pbnRzWzBdLnl9YDtcclxuICAgICAgICAgICAgY29uc3QgbGlkID0gYCNycF8ke3BvaW50c1twb2ludHMubGVuZ3RoIC0gMV0ueH1fJHtwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLnl9YDtcclxuICAgICAgICAgICAgY29uc3QgZmNsYXNzID0gJ3JvdXRlLXBvaW50LWZpcnN0JztcclxuICAgICAgICAgICAgY29uc3QgbGNsYXNzID0gJ3JvdXRlLXBvaW50LWxhc3QnO1xyXG4gICAgICAgICAgICBkcmF3RWxlbS5maW5kKCcucm91dGUtcG9pbnQnKS5yZW1vdmVDbGFzcyhmY2xhc3MpLnJlbW92ZUNsYXNzKGxjbGFzcyk7XHJcbiAgICAgICAgICAgIGRyYXdFbGVtLmZpbmQoZmlkKS5hZGRDbGFzcyhmY2xhc3MpO1xyXG4gICAgICAgICAgICBkcmF3RWxlbS5maW5kKGxpZCkuYWRkQ2xhc3MobGNsYXNzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGNsZWFyQ2FudmFzKGN0eCl7XHJcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY3R4LmNhbnZhcy53aWR0aCwgY3R4LmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZmFjdG9yaWFsKHZhbCwgcmVzID0gMSl7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWwgPiAwID8gZmFjdG9yaWFsKHZhbCAtIDEsIHZhbCAqIHJlcykgOiByZXM7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBnZXRTY2FsZUZhY3Rvcihwb2ludHMpe1xyXG4gICAgICAgICAgICBjb25zdCBjbnYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudF9zZWFyY2gnKTtcclxuICAgICAgICAgICAgaWYgKCFjbnYpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBtYXhEaW0gPSBwb2ludHMubWFwKChwdCkgPT4gTWF0aC5tYXgocHQueCwgcHQueSkpLnNvcnQoKGEsIGIpID0+IGIgLSBhKVswXTtcclxuICAgICAgICAgICAgcmV0dXJuIGNudi53aWR0aCAvIG1heERpbTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluaXREb3dubG9hZCAodXJsKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGFuY2hvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcclxuICAgICAgICAgICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgnaHJlZicsIHVybCk7XHJcbiAgICAgICAgICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2Rvd25sb2FkJywgJ3JvdXRlLnBuZycpO1xyXG4gICAgICAgICAgICBjb25zdCBldiA9IG5ldyBNb3VzZUV2ZW50KCdjbGljaycpO1xyXG4gICAgICAgICAgICBhbmNob3IuZGlzcGF0Y2hFdmVudChldik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmb3JtYXR0ZWRGYWN0b3JpYWwobnVtKXtcclxuICAgICAgICAgICAgY29uc3QgZmFjdCA9IGZhY3RvcmlhbChudW0pO1xyXG4gICAgICAgICAgICBjb25zdCBwb3cgPSBwYXJzZUludChmYWN0LnRvU3RyaW5nKCkuc3BsaXQoJ2UrJylbMV0pO1xyXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChmYWN0IC8gTWF0aC5wb3coMTAsIHBvdykpLnRvU3RyaW5nKCkgKyAoJzAnKS5yZXBlYXQocG93KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL3RzcC9yb3V0ZS1kcmF3LWRpcmVjdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNzg5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLWNvbnRyb2xzXFxcIiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg9XFxcIjYwXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gY2VudGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtc3dpdGNoIG5nLW1vZGVsPVxcXCJjdHJsLnVzZVByZXNldFxcXCIgYXJpYS1sYWJlbD1cXFwiVXNlIFByZXNldFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgUHJlc2V0IFBvaW50c1xcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1zd2l0Y2g+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg9XFxcIjQ1XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1jaGVja2JveCBuZy1tb2RlbD1cXFwiY3RybC5pc0Nsb3NlZFxcXCIgYXJpYS1sYWJlbD1cXFwiQ2xvc2VkIHJvdXRlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBDbG9zZWQgcm91dGVcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtY2hlY2tib3g+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXggbmctaWY9XFxcImN0cmwudXNlUHJlc2V0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibWQtYmxvY2tcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlBvaW50czwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbmctbW9kZWw9XFxcImN0cmwucHJlc2V0XFxcIiByb3dzPVxcXCIzXFxcIiBtYXgtcm93cz1cXFwiM1xcXCI+PC90ZXh0YXJlYT5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleCBuZy1pZj1cXFwiIWN0cmwudXNlUHJlc2V0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TaXplPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjUwMFxcXCIgbWF4PVxcXCIxMjAwXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXBTaXplXFxcIiBhcmlhLWxhYmVsPVxcXCJyZWRcXFwiIGlkPVxcXCJtYXAtc2l6ZS1zbGlkZXJcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtZC13YXJuXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtc2xpZGVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXBTaXplXFxcIiBhcmlhLWxhYmVsPVxcXCJtYXAgc2l6ZVxcXCIgYXJpYS1jb250cm9scz1cXFwibWFwLXNpemUtc2xpZGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+UG9pbnRzPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjRcXFwiIG1heD1cXFwiMTAwXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5wb2ludHNOdW1iZXJcXFwiIGFyaWEtbGFiZWw9XFxcInJlZFxcXCIgaWQ9XFxcInBvaW50cy1udW1iZXItc2xpZGVyXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibWQtd2FyblxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLXNsaWRlcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwucG9pbnRzTnVtYmVyXFxcIiBhcmlhLWxhYmVsPVxcXCJwb2ludHMgbnVtYmVyXFxcIiBhcmlhLWNvbnRyb2xzPVxcXCJwb2ludHMtbnVtYmVyLXNsaWRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCIzMFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIGNlbnRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibm8tZXJyb3JzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+bWF4LiBUPC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXhUZW1wXFxcIiBhcmlhLWxhYmVsPVxcXCJpbml0aWFsIHRlbXBlcmF0dXJlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyIGNsYXNzPVxcXCJuby1lcnJvcnNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5taW4uIFQ8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLm1pblRlbXBcXFwiIGFyaWEtbGFiZWw9XFxcIm1pbmltYWwgdGVtcGVyYXR1cmVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBjZW50ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gY2xhc3M9XFxcIm1kLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLnJlYnVpbGRSb3V0ZSgpXFxcIiBhcmlhLWxhYmVsPVxcXCJyZWJ1aWxkIHJvdXRlXFxcIiBuZy1kaXNhYmxlZD1cXFwiY3RybC5zaW1Bbm5lYWwgJiYgY3RybC5zaW1Bbm5lYWwuaXNSdW5uaW5nXFxcIj5SZXBlYXQ8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBjbGFzcz1cXFwibWQtcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcImN0cmwucmVidWlsZFJvdXRlKHRydWUpXFxcIiBhcmlhLWxhYmVsPVxcXCJyZWJ1aWxkIHJvdXRlXFxcIiBuZy1kaXNhYmxlZD1cXFwiY3RybC5zaW1Bbm5lYWwgJiYgY3RybC5zaW1Bbm5lYWwuaXNSdW5uaW5nXFxcIj5TZWFyY2g8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcImNlbnRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBjbGFzcz1cXFwibWQtcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcImN0cmwuYWRkU29sdXRpb24oKVxcXCIgYXJpYS1sYWJlbD1cXFwicmVidWlsZCByb3V0ZVxcXCIgbmctZGlzYWJsZWQ9XFxcIiFjdHJsLnByZXNldFxcXCI+QWRkPC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gY2xhc3M9XFxcIm1kLXdhcm5cXFwiIG5nLWNsaWNrPVxcXCJjdHJsLnN0b3BSb3V0ZVNlYXJjaCgpXFxcIiBhcmlhLWxhYmVsPVxcXCJzdG9wIHJvdXRlIHNlYXJjaFxcXCIgbmctZGlzYWJsZWQ9XFxcIiFjdHJsLnNpbUFubmVhbCB8fCAhY3RybC5zaW1Bbm5lYWwuaXNSdW5uaW5nXFxcIj5TdG9wPC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tYmVuY2htYXJrXFxcIiAgbmctaWY9XFxcImN0cmwuYmVzdFJvdXRlXFxcIj5cXHJcXG4gICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgPHA+PHN0cm9uZz5QZXJtdXRhdGlvbnM8L3N0cm9uZz48L3A+XFxyXFxuICAgICAgICAgICAgPHA+e3tjdHJsLmJlc3RSb3V0ZS5saW1pdCB8IHBvd251bWJlcn19IC8ge3tjdHJsLmJlc3RSb3V0ZS50b3RhbCB8IHBvd251bWJlcn19PC9wPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8bWQtZGl2aWRlcj48L21kLWRpdmlkZXI+XFxyXFxuICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgIDxwPjxzdHJvbmc+RHVyYXRpb248L3N0cm9uZz48YnI+e3tjdHJsLmJlc3RSb3V0ZS5kdXJhdGlvbn19bXM8L3A+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxtZC1kaXZpZGVyPjwvbWQtZGl2aWRlcj5cXHJcXG4gICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgPHA+PHN0cm9uZz5TaW5nbGUgc2FtcGxlPC9zdHJvbmc+PGJyPnt7Y3RybC5iZXN0Um91dGUuYmVuY2h9fW1zPC9wPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8bWQtZGl2aWRlcj48L21kLWRpdmlkZXI+XFxyXFxuICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgIDxwPjxzdHJvbmc+RXN0LiBjYWxjLiB0aW1lPC9zdHJvbmc+PGJyPnt7Y3RybC5iZXN0Um91dGUuZXN0aW1hdGUueWVhcnMoKSB8IHBvd251bWJlcn19IHllYXJzPC9wPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgIDxwPjxzdHJvbmc+U3RhcnQgY29zdDwvc3Ryb25nPjxicj57e2N0cmwuYmVzdFJvdXRlLmNvc3R9fTwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPCEtLTxkaXYgY2xhc3M9XFxcImFsZ28tYmVzdC1yb3V0ZVxcXCIgbmctaWY9XFxcImN0cmwuYmVzdFJvdXRlICYmIGN0cmwucG9pbnRzTnVtYmVyIDwgMTBcXFwiPlxcclxcbiAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XFxcIml0ZW0gaW4gY3RybC5iZXN0Um91dGUuc3RhdGUgdHJhY2sgYnkgJGluZGV4XFxcIj57e2l0ZW0ueH19IHgge3tpdGVtLnl9fTwvZGl2PlxcclxcbiAgICA8L2Rpdj4tLT5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYWxnby1zb2x1dGlvbnNcXFwiPlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCJcXHJcXG4gICAgICAgICAgICAgbGF5b3V0LWFsaWduPVxcXCJzdGFydCBjZW50ZXJcXFwiXFxyXFxuICAgICAgICAgICAgIG5nLXJlcGVhdD1cXFwic29sdXRpb24gaW4gY3RybC5zaW1Bbm5lYWwuc29sdXRpb25zXFxcIlxcclxcbiAgICAgICAgICAgICBuZy1tb3VzZWVudGVyPVxcXCJjdHJsLmZvY3VzU29sdXRpb24oJGluZGV4KVxcXCJcXHJcXG4gICAgICAgICAgICAgbmctbW91c2VsZWF2ZT1cXFwiY3RybC5mb2N1c1NvbHV0aW9uKC0xKVxcXCIgbmctY2xpY2s9XFxcImN0cmwuZG93bmxvYWRTb2x1dGlvbigkaW5kZXgpXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJsZWdlbmQtYnVsbGV0XFxcIiBuZy1zdHlsZT1cXFwieydiYWNrZ3JvdW5kLWNvbG9yJzogc29sdXRpb24uY29sb3J9XFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGZsZXg+e3tzb2x1dGlvbi5jb3N0fX08L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYWxnby1kcmF3LXNjcm9sbGVyXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInJvdXRlLWRyYXctY29udGFpbmVyXFxcIiBuZy1zdHlsZT1cXFwieydtaW4td2lkdGgnOiBjdHJsLm1hcFNpemUgKyAncHgnLCAnbWluLWhlaWdodCc6IGN0cmwubWFwU2l6ZSArICdweCd9XFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3V0ZS1pbmZvXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3V0ZS1zb2x1dGlvblxcXCJcXHJcXG4gICAgICAgICAgICAgICAgIG5nLXJlcGVhdD1cXFwic29sdXRpb24gaW4gY3RybC5zaW1Bbm5lYWwuc29sdXRpb25zXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGNhbnZhcyB3aWR0aD1cXFwie3tjdHJsLm1hcFNpemV9fVxcXCIgaGVpZ2h0PVxcXCJ7e2N0cmwubWFwU2l6ZX19XFxcIiBpZD1cXFwic29sdXRpb25fe3skaW5kZXh9fVxcXCI+PC9jYW52YXM+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgbmctaW5pdD1cXFwiY3RybC5kcmF3U29sdXRpb24oJGluZGV4KVxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm91dGUtY3VycmVudC1zZWFyY2hcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8Y2FudmFzIHdpZHRoPVxcXCJ7e2N0cmwubWFwU2l6ZX19XFxcIiBoZWlnaHQ9XFxcInt7Y3RybC5tYXBTaXplfX1cXFwiIGlkPVxcXCJjdXJyZW50X3NlYXJjaFxcXCI+PC9jYW52YXM+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL3RzcC9yb3V0ZS1kcmF3LXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA3OTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApe1xyXG4gICAgdnJwLnNlcnZpY2UoJ3JvdXRlUGxvdHRlcicsIHJvdXRlUGxvdHRlcik7XHJcbiAgICByb3V0ZVBsb3R0ZXIuJGluamVjdCA9IFsncG9pbnRGYWN0b3J5J107XHJcblxyXG4gICAgZnVuY3Rpb24gcm91dGVQbG90dGVyKHBvaW50RmFjdG9yeSl7XHJcbiAgICAgICAgY29uc3QgQ09MT1JTID0gW1xyXG4gICAgICAgICAgICAnIzIxOTZGMycsXHJcbiAgICAgICAgICAgICcjRjQ0MzM2JyxcclxuICAgICAgICAgICAgJyNGRkMxMDcnLFxyXG4gICAgICAgICAgICAnIzRDQUY1MCcsXHJcbiAgICAgICAgICAgICcjRkY5ODAwJyxcclxuICAgICAgICAgICAgJyMwMDk2ODgnLFxyXG4gICAgICAgICAgICAnIzlDMjdCMCcsXHJcbiAgICAgICAgICAgICcjRkZFQjNCJyxcclxuICAgICAgICAgICAgJyMzRjUxQjUnLFxyXG4gICAgICAgICAgICAnI0NEREMzOSdcclxuICAgICAgICBdO1xyXG5cclxuXHJcblxyXG4gICAgICAgIGNsYXNzIFJvdXRlUGxvdHRlciB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVJbmZvID0gdGhpcy5lbGVtZW50LmZpbmQoJy5yb3V0ZS1pbmZvJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50X3NlYXJjaCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvckl0ZXJhdG9yID0gQ09MT1JTLnZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZiA9IDE7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldENvbG9yKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY29sb3JJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0udmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3JJdGVyYXRvciA9IENPTE9SUy52YWx1ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5jb2xvckl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRQb2ludEVsZW0ocG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9ICAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS50ZXh0KHBvaW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9pbnQuY3NzU3R5bGUuZm9yRWFjaCgoY3NzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRDbGFzcyhjc3MpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0QmVzdFNvbHV0aW9uKHZycCA9IHRoaXMudnJwKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2cnAuc29sdXRpb25zLnJlZHVjZSgocmVzLCBzb2wpID0+IHNvbC5jb3N0IDwgcmVzLmNvc3QgPyBzb2wgOiByZXMsIHtjb3N0OiBOdW1iZXIuTUFYX1ZBTFVFfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRWZWhpY2xlcyh2cnApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2cnAudmVoaWNsZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdnJwLnZlaGljbGVzLmZvckVhY2goKHZoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHZoYy5zdGFydExvY2F0aW9uID8gdmhjLnN0YXJ0TG9jYXRpb24uY29vcmQgOiB2aGMubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBuZXcgUm91dGVQb2ludCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCdtYXRlcmlhbC1pY29ucycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC12ZWhpY2xlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldE5hbWUoJ2xvY2FsX3NoaXBwaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcy5zZXQodmhjLmlkLCBwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFNoaXBtZW50cyh2cnApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2cnAuc2hpcG1lbnRzKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZycC5zaGlwbWVudHMuZm9yRWFjaCgoc2hpcG1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7eDogcHgsIHk6IHB5fSA9IHNoaXBtZW50LnBpY2t1cC5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7eDogZHgsIHk6IGR5fSA9IHNoaXBtZW50LmRlbGl2ZXJ5LmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsb2MgPSBuZXcgUm91dGVQb2ludChweCwgcHkpLnNldENzcygndnJwLXBpY2t1cCcpLnNldE5hbWUoc2hpcG1lbnQuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRsb2MgPSBuZXcgUm91dGVQb2ludChkeCwgZHkpLnNldENzcygndnJwLWRlbGl2ZXJ5Jykuc2V0TmFtZShzaGlwbWVudC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwbWVudHMuc2V0KHNoaXBtZW50LmlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpY2t1cDogcGxvYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsaXZlcnk6IGRsb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5OiBzaGlwbWVudC5jYXBhY2l0eURlbWFuZCB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0OiBNYXRoLnJvdW5kKHBsb2MuZ2V0RGlzdGFuY2UoZGxvYykgKiAxMCkgLyAxMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRSb3V0ZXModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnNvbHV0aW9ucyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiZXN0U29sdXRpb24gPSB0aGlzLmdldEJlc3RTb2x1dGlvbih2cnApO1xyXG4gICAgICAgICAgICAgICAgYmVzdFNvbHV0aW9uLnJvdXRlcy5mb3JFYWNoKChyb3V0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IHJvdXRlLmFjdC5yZWR1Y2UoKHJlcywgYWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaXBtZW50cy5oYXMoYWN0LnNoaXBtZW50SWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNocCA9IHRoaXMuc2hpcG1lbnRzLmdldChhY3Quc2hpcG1lbnRJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXMucHVzaChhY3QudHlwZS5zdGFydHNXaXRoKCdwaWNrdXAnKSA/IHNocC5waWNrdXAgOiBzaHAuZGVsaXZlcnkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMudmVoaWNsZXMuaGFzKHJvdXRlLnZlaGljbGVJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMudW5zaGlmdCh0aGlzLnZlaGljbGVzLmdldChyb3V0ZS52ZWhpY2xlSWQpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXMuc2V0KHJvdXRlLnZlaGljbGVJZCwge2NvbG9yOiB0aGlzLmdldENvbG9yKCksIHBvaW50c30pXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFZSUCh2cnApe1xyXG4gICAgICAgICAgICAgICAgdGhpcy52cnAgPSB2cnA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRWZWhpY2xlcyh2cnApXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFNoaXBtZW50cyh2cnApXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFJvdXRlcyh2cnApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRQb2ludChwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsUG9pbnQgPSBwb2ludC5nZXRTY2FsZWQodGhpcy5zZik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSByZWFsUG9pbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5nZXRQb2ludEVsZW0ocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgZWxlbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogeSAtIDEyICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB4IC0gMTIgKyAncHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkU2hpcG1lbnQoc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzaGlwbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BpY2t1cDogcGxvYywgZGVsaXZlcnk6IGRsb2N9ID0gc2hpcG1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChwbG9jKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQoZGxvYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdSb3V0ZShbcGxvYywgZGxvY10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRDYXBhY2l0eShzaGlwbWVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkQ2FwYWNpdHkoc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzaGlwbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BpY2t1cDogcGxvYywgY2FwYWNpdHk6IGNhcGFjaXR5fSA9IHNoaXBtZW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eVwiPjxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHktbGlua1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5LWRhdGFcIj4ke2NhcGFjaXR5fTwvZGl2PjwvZGl2PmApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcnAgPSBwbG9jLmdldFNjYWxlZCh0aGlzLnNmKTtcclxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHJwLnkgKyAxMiArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogcnAueCAtIDEyICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkQ2xhc3MoJ3ZycC1wb2ludC1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZHJhd1JvdXRlKHBvaW50cywgY29sb3Ipe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvciB8fCAncmdiYSgwLCAwLCAwLCAuMjApJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lQ2FwID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVKb2luID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKGNvbG9yID8gW10gOiBbOCwgOF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxQb2ludHMgPSBwb2ludHMubWFwKChwb2ludCkgPT4gcG9pbnQuZ2V0U2NhbGVkKHRoaXMuc2YpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhyZWFsUG9pbnRzWzBdLngsIHJlYWxQb2ludHNbMF0ueSk7XHJcbiAgICAgICAgICAgICAgICByZWFsUG9pbnRzLnNsaWNlKDEpLmZvckVhY2goKHBvaW50LCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnRzW2lkeF0uZ2V0RGlzdGFuY2UocG9pbnRzW2lkeCArIDFdKS50b0ZpeGVkKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pZCA9IHBvaW50c1tpZHhdLmdldE1pZFBvaW50KHBvaW50c1tpZHggKyAxXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygndnJwLWRpc3RhbmNlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygndnJwLXBvaW50LWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXROYW1lKGRpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yU3R5bGUgPSB7J2JhY2tncm91bmQtY29sb3InOiBjb2xvciB8fCAnIzQ1NUE2NCd9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQobWlkKS5jc3MoY29sb3JTdHlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkcmF3U29sdXRpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdSb3V0ZShpdGVtLnBvaW50cywgaXRlbS5jb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbG90VlJQKCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudnJwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZXMuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KHBvaW50LCBUWVBFUy52ZWhpY2xlKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwbWVudHMuZm9yRWFjaCgoc2hwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTaGlwbWVudChzaHApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbG90U29sdXRpb24oKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJlc3RTb2x1dGlvbiA9IHRoaXMudnJwLnNvbHV0aW9ucy5yZWR1Y2UoKHJlcywgc29sKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNvbC5jb3N0IDwgcmVzLmNvc3QgPyBzb2wgOiByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCB7Y29zdDogTnVtYmVyLk1BWF9WQUxVRX0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U29sdXRpb24oYmVzdFNvbHV0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzZXQoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZCgnLnZycC1wb2ludCcpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRTY2FsZShzZil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNmID0gc2Y7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0SW5zdGFuY2UgPSAoZWxlbSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJvdXRlUGxvdHRlcihlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtcGxvdHRlci1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3OTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5kaXJlY3RpdmUoJ3ZycERyYXcnLCB2cnBEcmF3RGlyZWN0aXZlKTtcclxuICAgIHZycERyYXdEaXJlY3RpdmUuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZycERyYXdEaXJlY3RpdmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi92cnAtZHJhdy10cGwuaHRtbCcpLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnVnJwRHJhd0NvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICdjdHJsJ1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdnJwLmNvbnRyb2xsZXIoJ1ZycERyYXdDb250cm9sbGVyJywgVnJwRHJhd0NvbnRyb2xsZXIpO1xyXG4gICAgVnJwRHJhd0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRlbGVtZW50JywgJ3ZycFBsb3R0ZXInLCAnYXBpUmVxdWVzdCddO1xyXG5cclxuICAgIGZ1bmN0aW9uIFZycERyYXdDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsIHZycFBsb3R0ZXIsIGFwaVJlcXVlc3QpIHtcclxuICAgICAgICBjb25zdCB2cnBFbGVtID0gJCgnLnZycC1wb2ludC1jb250YWluZXInKTtcclxuICAgICAgICBjb25zdCBzZXRSZXF1ZXN0ID0gYXBpUmVxdWVzdC5nZXRJbnN0YW5jZSh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvdnJwJyxcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGxpc3RSZXF1ZXN0ID0gYXBpUmVxdWVzdC5nZXRJbnN0YW5jZSh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvdnJwLzpzZXQnLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBwYXJhbVNlcmlhbGl6ZXI6ICd0cGxRdWVyeVNlcmlhbGl6ZXInXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgc29sdXRpb25SZXF1ZXN0ID0gYXBpUmVxdWVzdC5nZXRJbnN0YW5jZSh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvdnJwLzpzZXQvOnNvbHV0aW9uJyxcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgcGFyYW1TZXJpYWxpemVyOiAndHBsUXVlcnlTZXJpYWxpemVyJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHNldFN1bW1hcnlSZXF1ZXN0ID0gYXBpUmVxdWVzdC5nZXRJbnN0YW5jZSh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvdnJwL2FsbC86Zm9sZGVyJyxcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgcGFyYW1TZXJpYWxpemVyOiAndHBsUXVlcnlTZXJpYWxpemVyJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IGZ1bGxTdW1tYXJ5UmVxdWVzdCA9IGFwaVJlcXVlc3QuZ2V0SW5zdGFuY2Uoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXBpL3ZycC9hbGwnLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMudnJwRGF0YSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zb2x1dGlvblNldHMgPSBbXTtcclxuICAgICAgICB0aGlzLnNvbHV0aW9uTGlzdCA9IFtdO1xyXG4gICAgICAgIHRoaXMuc29sdXRpb25MaXN0TG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZmlsdGVycyA9IHtcclxuICAgICAgICAgICAgc2hvd0Rpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93Q2FwRGVtYW5kOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0N1c3RvbVNvbHV0aW9uSW5wdXQ6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNlbGVjdGVkU29sdXRpb24gPSBudWxsO1xyXG4gICAgICAgIHRoaXMucm91dGVzID0gW107XHJcbiAgICAgICAgdGhpcy5wbG90dGVyID0gdnJwUGxvdHRlci5nZXRJbnN0YW5jZSh2cnBFbGVtKTtcclxuXHJcbiAgICAgICAgc2V0UmVxdWVzdC5zZW5kKCkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNvbHV0aW9uU2V0cyA9IHJlc3AuZGF0YS5zbGljZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIGZ1bGxTdW1tYXJ5UmVxdWVzdC5zZW5kKCkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgIC8vICAgICBjb25zdCBzdW1tYXJ5ID0gSW1tdXRhYmxlLmZyb21KUyhyZXNwLmRhdGEpO1xyXG4gICAgICAgIC8vICAgICBjb25zdCBjb2x1bW5zID0gc3VtbWFyeS5rZXlTZXEoKS50b0FycmF5KCkuc29ydCgpO1xyXG4gICAgICAgIC8vICAgICBjb25zdCByb3dzID0gc3VtbWFyeS5mbGF0dGVuKDApLmtleVNlcSgpLnRvQXJyYXkoKS5zb3J0KCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGdyaWQgPSBbWydwcm9ibGVtJywgLi4uY29sdW1uc11dLmNvbmNhdChyb3dzLm1hcCgocm93KSA9PiBbcm93LCAuLi5jb2x1bW5zLm1hcCgoY29sKSA9PiBzdW1tYXJ5LmdldEluKFtjb2wsIHJvd10pKV0pKTtcclxuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coZ3JpZC5tYXAoKHJvdykgPT4gcm93LmpvaW4oJ1xcdCcpKS5qb2luKCdcXG4nKSk7XHJcbiAgICAgICAgLy8gfSk7XHJcblxyXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2N0cmwuZmlsdGVycy5zaG93RGlzdCcsIChudmFsKSA9PiB7XHJcbiAgICAgICAgICAgICQoJy52cnAtZGlzdGFuY2UnKS50b2dnbGVDbGFzcygndnJwLXBvaW50LWhpZGRlbicsICFudmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY3RybC5maWx0ZXJzLnNob3dDYXBEZW1hbmQnLCAobnZhbCkgPT4ge1xyXG4gICAgICAgICAgICAkKCcudnJwLWNhcGFjaXR5JykudG9nZ2xlQ2xhc3MoJ3ZycC1wb2ludC1oaWRkZW4nLCAhbnZhbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlU2V0Q2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBsaXN0UmVxdWVzdC5zZW5kKHtzZXQ6IHRoaXMuc2VsZWN0ZWRTZXR9KS50aGVuKChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvbHV0aW9uTGlzdCA9IHJlc3AuZGF0YS5zbGljZSgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuaGFuZGxlU29sdXRpb25DaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHNvbHV0aW9uUmVxdWVzdC5zZW5kKHtzZXQ6IHRoaXMuc2VsZWN0ZWRTZXQsIHNvbHV0aW9uOiB0aGlzLnNlbGVjdGVkU29sdXRpb259KS50aGVuKChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVzcC5kYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxvdHRlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVzZXQoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0VlJQKHJlc3AuZGF0YSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnBsb3RWUlAoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnBsb3RWUlAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy52cnBEYXRhICYmICF0aGlzLnBsb3R0ZXIudnJwKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy52cnBEYXRhKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZycCA9IEpTT04ucGFyc2UodGhpcy52cnBEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxvdHRlci5yZXNldCgpLnNldFZSUCh2cnApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucGxvdHRlci5wbG90VlJQKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5wbG90U29sdXRpb24gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy52cnBEYXRhICYmICF0aGlzLnBsb3R0ZXIudnJwKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy52cnBEYXRhKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZycCA9IEpTT04ucGFyc2UodGhpcy52cnBEYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucGxvdHRlci5yZXNldCgpLnNldFZSUCh2cnApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMucm91dGVzID0gWy4uLnRoaXMucGxvdHRlci5yb3V0ZXMudmFsdWVzKCldO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnJvdXRlcy5yZWR1Y2UoKHJlcywgaXRlbSkgPT4gcmVzICsgaXRlbS5kaXN0YW5jZSwgMCkpXHJcbiAgICAgICAgICAgIHRoaXMucGxvdHRlci5wbG90U29sdXRpb24oKTtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdnJwL3ZycC1kcmF3LWRpcmVjdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNzkyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ2cnAtY29udHJvbHNcXFwiIGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gc3RhcnRcXFwiPlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiNTBcXFwiPlxcclxcbiAgICAgICAgICAgIDxtZC1zd2l0Y2ggbmctbW9kZWw9XFxcImN0cmwuZmlsdGVycy5zaG93Q3VzdG9tU29sdXRpb25JbnB1dFxcXCIgYXJpYS1sYWJlbD1cXFwiU2hvdyBEaXN0YW5jZXNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICBTaG93IGN1c3RvbSBzb2x1dGlvbiBpbnB1dFxcclxcbiAgICAgICAgICAgIDwvbWQtc3dpdGNoPlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBjZW50ZXJcXFwiIG5nLXNob3c9XFxcIiFjdHJsLmZpbHRlcnMuc2hvd0N1c3RvbVNvbHV0aW9uSW5wdXRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyIGZsZXg9XFxcIjQ1XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Tb2x1dGlvbiBTZXQ8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLXNlbGVjdCBuYW1lPVxcXCJzb2x1dGlvbl9zZXRcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJzZWxlY3Qgc29sdXRpb24gc2V0XFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiY3RybC5zZWxlY3RlZFNldFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2hhbmdlPVxcXCJjdHJsLmhhbmRsZVNldENoYW5nZSgpXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bWQtb3B0aW9uIG5nLXZhbHVlPVxcXCJpdGVtXFxcIiBuZy1yZXBlYXQ9XFxcIml0ZW0gaW4gY3RybC5zb2x1dGlvblNldHNcXFwiIG5nLXNlbGVjdGVkPVxcXCIkZmlyc3RcXFwiPnt7aXRlbX19PC9tZC1vcHRpb24+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLXNlbGVjdD5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNvbHV0aW9uPC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1zZWxlY3QgbmFtZT1cXFwic29sdXRpb25cXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVxcXCJzZWxlY3Qgc29sdXRpb25cXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJjdHJsLnNlbGVjdGVkU29sdXRpb25cXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNoYW5nZT1cXFwiY3RybC5oYW5kbGVTb2x1dGlvbkNoYW5nZSgpXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1kaXNhYmxlZD1cXFwiY3RybC5zb2x1dGlvbkxpc3RMb2FkaW5nXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bWQtb3B0aW9uIG1kLW9wdGlvbi1lbXB0eSBuZy12YWx1ZT1cXFwibnVsbFxcXCI+bm9uZTwvbWQtb3B0aW9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtZC1vcHRpb24gbmctdmFsdWU9XFxcIml0ZW1cXFwiIG5nLXJlcGVhdD1cXFwiaXRlbSBpbiBjdHJsLnNvbHV0aW9uTGlzdFxcXCI+e3tpdGVtfX08L21kLW9wdGlvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtc2VsZWN0PlxcclxcbiAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyIGNsYXNzPVxcXCJtZC1ibG9ja1xcXCIgbmctc2hvdz1cXFwiY3RybC5maWx0ZXJzLnNob3dDdXN0b21Tb2x1dGlvbklucHV0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGxhYmVsPlZSUDwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBuZy1tb2RlbD1cXFwiY3RybC52cnBEYXRhXFxcIiByb3dzPVxcXCI2XFxcIiBtYXgtcm93cz1cXFwiNlxcXCI+PC90ZXh0YXJlYT5cXHJcXG4gICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiNDBcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zd2l0Y2ggbmctbW9kZWw9XFxcImN0cmwuZmlsdGVycy5zaG93RGlzdFxcXCIgYXJpYS1sYWJlbD1cXFwiU2hvdyBEaXN0YW5jZXNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgU2hvdyBkaXN0YW5jZXNcXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1zd2l0Y2g+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zd2l0Y2ggbmctbW9kZWw9XFxcImN0cmwuZmlsdGVycy5zaG93Q2FwRGVtYW5kXFxcIiBhcmlhLWxhYmVsPVxcXCJTaG93IHJlcXVpcmVkIGNhcGFjaXR5XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIFNob3cgcmVxdWlyZWQgY2FwYWNpdHlcXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1zd2l0Y2g+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cXFwiY3RybC5wbG90dGVyLnJlc2V0KClcXFwiIGFyaWEtbGFiZWw9XFxcInJlc2V0XFxcIiBuZy1kaXNhYmxlZD1cXFwiIWN0cmwucGxvdHRlclxcXCI+UmVzZXQ8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBjbGFzcz1cXFwibWQtcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcImN0cmwucGxvdFNvbHV0aW9uKClcXFwiIGFyaWEtbGFiZWw9XFxcImRyYXcgU29sdXRpb25cXFwiIG5nLWRpc2FibGVkPVxcXCIhY3RybC5wbG90dGVyXFxcIj5Tb2x1dGlvbjwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5wbG90VlJQKClcXFwiIGFyaWEtbGFiZWw9XFxcImRyYXcgVlJQXFxcIiBuZy1kaXNhYmxlZD1cXFwiIWN0cmwucGxvdHRlclxcXCI+VlJQPC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInZycC1jb3N0XFxcIj5cXHJcXG4gICAgICAgIFNvbHV0aW9uIGNvc3Q6IDxzcGFuPnt7Y3RybC5wbG90dGVyICYmIGN0cmwucGxvdHRlci5iZXN0ID8gY3RybC5wbG90dGVyLmJlc3QuY29zdCA6IDAgfCBudW1iZXIgOiAyfX08L3NwYW4+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ2cnAtcm91dGVzXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInZycC1yb3V0ZXMtaXRlbVxcXCIgbmctcmVwZWF0PVxcXCJpdGVtIGluIGN0cmwucm91dGVzXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ2cnAtcm91dGUtYnVsbGV0XFxcIiBuZy1zdHlsZT1cXFwieydiYWNrZ3JvdW5kLWNvbG9yJzogaXRlbS5jb2xvcn1cXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXY+PHN0cm9uZz57e2l0ZW0udmVoaWNsZUlkfX08L3N0cm9uZz48L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2PmQ6IHt7aXRlbS5kaXN0YW5jZSB8IG51bWJlciA6IDJ9fTwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXY+Yzoge3tpdGVtLmNhcGFjaXR5fX08L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidnJwLWRyYXctc2Nyb2xsZXJcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidnJwLWRyYXctY29udGFpbmVyXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ2cnAtcG9pbnQtY29udGFpbmVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGNhbnZhcyB3aWR0aD1cXFwiODAwXFxcIiBoZWlnaHQ9XFxcIjgwMFxcXCI+PC9jYW52YXM+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNzkzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5zZXJ2aWNlKCd2cnBQbG90dGVyJywgdnJwUGxvdHRlcik7XHJcbiAgICB2cnBQbG90dGVyLiRpbmplY3QgPSBbJ3BvaW50RmFjdG9yeSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZycFBsb3R0ZXIocG9pbnRGYWN0b3J5KXtcclxuICAgICAgICBjb25zdCBUWVBFUyA9IHtcclxuICAgICAgICAgICAgZGVsaXZlcnk6IHtcclxuICAgICAgICAgICAgICAgIGNzc0NsYXNzOiAndnJwLWRlbGl2ZXJ5IG1hdGVyaWFsLWljb25zJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdhcmNoaXZlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBwaWNrdXA6IHtcclxuICAgICAgICAgICAgICAgIGNzc0NsYXNzOiAndnJwLXBpY2t1cCBtYXRlcmlhbC1pY29ucycsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAndW5hcmNoaXZlJ1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB2ZWhpY2xlOiB7XHJcbiAgICAgICAgICAgICAgICBjc3NDbGFzczogJ3ZycC12ZWhpY2xlIG1hdGVyaWFsLWljb25zJyxcclxuICAgICAgICAgICAgICAgIGljb246ICdsb2NhbF9zaGlwcGluZydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgQ09MT1JTID0gW1xyXG4gICAgICAgICAgICAnIzIxOTZGMycsXHJcbiAgICAgICAgICAgICcjRjQ0MzM2JyxcclxuICAgICAgICAgICAgJyNGRkMxMDcnLFxyXG4gICAgICAgICAgICAnIzRDQUY1MCcsXHJcbiAgICAgICAgICAgICcjRkY5ODAwJyxcclxuICAgICAgICAgICAgJyMwMDk2ODgnLFxyXG4gICAgICAgICAgICAnIzlDMjdCMCcsXHJcbiAgICAgICAgICAgICcjRkZFQjNCJyxcclxuICAgICAgICAgICAgJyMzRjUxQjUnLFxyXG4gICAgICAgICAgICAnI0NEREMzOSdcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBjbGFzcyBSb3V0ZVBvaW50IGV4dGVuZHMgcG9pbnRGYWN0b3J5LlJQb2ludCB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgICAgICAgICAgc3VwZXIoeCwgeSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzc1N0eWxlID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3NTdHlsZS5wdXNoKCd2cnAtcG9pbnQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0Q3NzKGNzcyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzc1N0eWxlLnB1c2goY3NzKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXROYW1lKG5hbWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGFzcyBWUlBQbG90dGVyIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMgPSB0aGlzLmVsZW1lbnQuZmluZCgnY2FudmFzJylbMF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cyA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9ySXRlcmF0b3IgPSBDT0xPUlMudmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zWCA9ICh4KSA9PiB4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc1kgPSAoeSkgPT4geTtcclxuICAgICAgICAgICAgICAgIHRoaXMudnJwID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVzdCA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBpc0VtcHR5KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMudnJwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRDb2xvcigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNvbG9ySXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9ySXRlcmF0b3IgPSBDT0xPUlMudmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuY29sb3JJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0UG9pbnRFbGVtKHBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSAgJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkudGV4dChwb2ludC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHBvaW50LmNzc1N0eWxlLmZvckVhY2goKGNzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkQ2xhc3MoY3NzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldEJlc3RTb2x1dGlvbih2cnAgPSB0aGlzLnZycCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdnJwLnNvbHV0aW9ucy5yZWR1Y2UoKHJlcywgc29sKSA9PiBzb2wuY29zdCA8IHJlcy5jb3N0ID8gc29sIDogcmVzLCB7Y29zdDogTnVtYmVyLk1BWF9WQUxVRX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VmVoaWNsZXModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnZlaGljbGVzKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZycC52ZWhpY2xlcy5mb3JFYWNoKCh2aGMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aGNMb2MgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0OiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ0cDogdmhjLnJldHVyblRvRGVwb3RcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aGMuc3RhcnRMb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHZoYy5zdGFydExvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aGNMb2Muc3RhcnQgPSBuZXcgUm91dGVQb2ludCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygnbWF0ZXJpYWwtaWNvbnMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygndnJwLXZlaGljbGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldE5hbWUoJ2xvY2FsX3NoaXBwaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aGMuZW5kTG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSB2aGMuZW5kTG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZoY0xvYy5lbmQgPSBuZXcgUm91dGVQb2ludCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygnbWF0ZXJpYWwtaWNvbnMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygndnJwLXZlaGljbGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNldE5hbWUoJ2xvY2FsX3NoaXBwaW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdmhjLnJldHVyblRvRGVwb3QgJiYgdmhjTG9jLmVuZC5lcXVhbHModmhjTG9jLnN0YXJ0KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2aGNMb2MuZW5kID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzLnNldCh2aGMuaWQsIHZoY0xvYyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFNoaXBtZW50cyh2cnApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2cnAuc2hpcG1lbnRzIHx8ICF2cnAuc2hpcG1lbnRzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2cnAuc2hpcG1lbnRzLmZvckVhY2goKHNoaXBtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3g6IHB4LCB5OiBweX0gPSBzaGlwbWVudC5waWNrdXAubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3g6IGR4LCB5OiBkeX0gPSBzaGlwbWVudC5kZWxpdmVyeS5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbG9jID0gbmV3IFJvdXRlUG9pbnQocHgsIHB5KS5zZXRDc3MoJ3ZycC1waWNrdXAnKS5zZXROYW1lKHNoaXBtZW50LmlkLnNsaWNlKDMpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkbG9jID0gbmV3IFJvdXRlUG9pbnQoZHgsIGR5KS5zZXRDc3MoJ3ZycC1kZWxpdmVyeScpLnNldE5hbWUoc2hpcG1lbnQuaWQuc2xpY2UoMykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRzLnNldChzaGlwbWVudC5pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWNrdXA6IHBsb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5OiBkbG9jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eTogc2hpcG1lbnQuY2FwYWNpdHlEZW1hbmRbMF0gfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdDogTWF0aC5yb3VuZChwbG9jLmdldERpc3RhbmNlKGRsb2MpICogMTApIC8gMTBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0U2VydmljZXModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnNlcnZpY2VzIHx8ICF2cnAuc2VydmljZXMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZycC5zZXJ2aWNlcy5mb3JFYWNoKChzZXJ2aWNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gc2VydmljZS5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2MgPSBuZXcgUm91dGVQb2ludCh4LCB5KS5zZXRDc3MoJ3ZycC0nICsgc2VydmljZS50eXBlKS5zZXROYW1lKHNlcnZpY2UuaWQuc2xpY2UoMykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZXMuc2V0KHNlcnZpY2UuaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb246IGxvYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHk6IHNlcnZpY2UuY2FwYWNpdHlEZW1hbmRbMF0gfHwgMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRSb3V0ZXModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnNvbHV0aW9ucyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3QgPSB0aGlzLmdldEJlc3RTb2x1dGlvbih2cnApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXN0LnJvdXRlcy5mb3JFYWNoKChyb3V0ZSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVoaWNsZSA9IHRoaXMudmVoaWNsZXMuZ2V0KHJvdXRlLnZlaGljbGVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF2ZWhpY2xlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdW1tYXJ5ID0gcm91dGUuYWN0LnJlZHVjZSgocmVzLCBhY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJldkxvYyA9IHJlcy5wb2ludHNbcmVzLnBvaW50cy5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGxvYyA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjYXBhY2l0eSA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaXBtZW50cy5oYXMoYWN0LmpvYklkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaHAgPSB0aGlzLnNoaXBtZW50cy5nZXQoYWN0LmpvYklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYyA9IHNocC5kZWxpdmVyeTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY3QudHlwZS5zdGFydHNXaXRoKCdwaWNrdXAnKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jID0gc2hwLnBpY2t1cDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eSA9IHNocC5jYXBhY2l0eVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2VzLmhhcyhhY3Quam9iSWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN2YyA9IHRoaXMuc2VydmljZXMuZ2V0KGFjdC5qb2JJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2MgPSBzdmMubG9jYXRpb247XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eSA9IHN2Yy5jYXBhY2l0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMucG9pbnRzLnB1c2gobG9jKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmRpc3RhbmNlICs9IHByZXZMb2MuZ2V0RGlzdGFuY2UobG9jKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmNhcGFjaXR5ICs9IGNhcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzOiBbdmVoaWNsZS5zdGFydF0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eTogMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2ZWhpY2xlLmVuZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkuZGlzdGFuY2UgKz0gc3VtbWFyeS5wb2ludHNbc3VtbWFyeS5wb2ludHMubGVuZ3RoIC0gMV0uZ2V0RGlzdGFuY2UodmVoaWNsZS5lbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5LnBvaW50cy5wdXNoKHZlaGljbGUuZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeS5jb2xvciA9IHRoaXMuZ2V0Q29sb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5LnZlaGljbGVJZCA9IHJvdXRlLnZlaGljbGVJZDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXMuc2V0KCdyb3V0ZScgKyBpZHgsIHN1bW1hcnkpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVzdC51bmFzc2lnbmVkSm9icy5mb3JFYWNoKChqb2IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGlwbWVudHMuaGFzKGpvYi5pZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaHAgPSB0aGlzLnNoaXBtZW50cy5nZXQoam9iLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hwLmRlbGl2ZXJ5LnNldENzcygndnJwLXVuYXNzaWduZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hwLnBpY2t1cC5zZXRDc3MoJ3ZycC11bmFzc2lnbmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNlcnZpY2VzLmhhcyhqb2IuaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ZjID0gdGhpcy5zZXJ2aWNlcy5nZXQoam9iLmlkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ZjLmxvY2F0aW9uLnNldENzcygndnJwLXVuYXNzaWduZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFZSUCh2cnAgPSB7fSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZycCA9IHZycDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFNjYWxlKHZycClcclxuICAgICAgICAgICAgICAgICAgICAuc2V0VmVoaWNsZXModnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRTaGlwbWVudHModnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRTZXJ2aWNlcyh2cnApXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFJvdXRlcyh2cnApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRQb2ludChwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsUG9pbnQgPSBwb2ludC5nZXRUcmFuc2Zvcm1lZCh0aGlzLnRyYW5zWCwgdGhpcy50cmFuc1kpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gcmVhbFBvaW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZ2V0UG9pbnRFbGVtKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHkgLSAxMiArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogeCAtIDEyICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSkuYXR0cignaWQnLCBwb2ludC50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkU2VydmljZShzZXJ2aWNlKXtcclxuICAgICAgICAgICAgICAgIGlmICghc2VydmljZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qge2xvY2F0aW9uOiBsb2N9ID0gc2VydmljZTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KGxvYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcnZpY2VDYXBhY2l0eShzZXJ2aWNlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTZXJ2aWNlQ2FwYWNpdHkoc2VydmljZSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtsb2NhdGlvbjogbG9jLCBjYXBhY2l0eTogY2FwYWNpdHl9ID0gc2VydmljZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHlcIj48ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5LWxpbmtcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eS1kYXRhXCI+JHtjYXBhY2l0eX08L2Rpdj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJwID0gbG9jLmdldFRyYW5zZm9ybWVkKHRoaXMudHJhbnNYLCB0aGlzLnRyYW5zWSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBycC55ICsgMTAgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJwLnggLSAxMCArICdweCdcclxuICAgICAgICAgICAgICAgIH0pLmFkZENsYXNzKCd2cnAtcG9pbnQtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFNoaXBtZW50KHNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmICghc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwaWNrdXA6IHBsb2MsIGRlbGl2ZXJ5OiBkbG9jfSA9IHNoaXBtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQocGxvYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KGRsb2MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Um91dGUoW3Bsb2MsIGRsb2NdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2hpcG1lbnRDYXBhY2l0eShzaGlwbWVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkU2hpcG1lbnRDYXBhY2l0eShzaGlwbWVudCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7cGlja3VwOiBwbG9jLCBjYXBhY2l0eTogY2FwYWNpdHl9ID0gc2hpcG1lbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5XCI+PGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eS1saW5rXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHktZGF0YVwiPiR7Y2FwYWNpdHl9PC9kaXY+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBycCA9IHBsb2MuZ2V0VHJhbnNmb3JtZWQodGhpcy50cmFuc1gsIHRoaXMudHJhbnNZKTtcclxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHJwLnkgKyA4ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBycC54IC0gMTYgKyAncHgnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRDbGFzcygndnJwLXBvaW50LWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZChlbGVtKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkcmF3Um91dGUocG9pbnRzLCBjb2xvcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGNvbG9yIHx8ICdyZ2JhKDAsIDAsIDAsIC4yMCknO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVDYXAgPSAncm91bmQnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZUpvaW4gPSAncm91bmQnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc2V0TGluZURhc2goY29sb3IgPyBbXSA6IFs4LCA4XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbFBvaW50cyA9IHBvaW50cy5tYXAoKHBvaW50KSA9PiBwb2ludC5nZXRUcmFuc2Zvcm1lZCh0aGlzLnRyYW5zWCwgdGhpcy50cmFuc1kpKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4Lm1vdmVUbyhyZWFsUG9pbnRzWzBdLngsIHJlYWxQb2ludHNbMF0ueSk7XHJcbiAgICAgICAgICAgICAgICByZWFsUG9pbnRzLnNsaWNlKDEpLmZvckVhY2goKHBvaW50LCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnRzW2lkeF0uZ2V0RGlzdGFuY2UocG9pbnRzW2lkeCArIDFdKS50b0ZpeGVkKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1pZCA9IHBvaW50c1tpZHhdLmdldE1pZFBvaW50KHBvaW50c1tpZHggKyAxXSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygndnJwLWRpc3RhbmNlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygndnJwLXBvaW50LWhpZGRlbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXROYW1lKGRpc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbG9yU3R5bGUgPSB7J2JhY2tncm91bmQtY29sb3InOiBjb2xvciB8fCAnIzQ1NUE2NCd9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQobWlkKS5jc3MoY29sb3JTdHlsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVRvKHBvaW50LngsIHBvaW50LnkpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkcmF3U29sdXRpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyYXdSb3V0ZShpdGVtLnBvaW50cywgaXRlbS5jb2xvcik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbG90VlJQKCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMudnJwKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZXMuZm9yRWFjaCgodmhjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludCh2aGMuc3RhcnQsIFRZUEVTLnZlaGljbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aGMuZW5kICYmICF2aGMuZW5kLmVxdWFscyh2aGMuc3RhcnQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludCh2aGMuZW5kLCBUWVBFUy52ZWhpY2xlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRzLmZvckVhY2goKHNocCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2hpcG1lbnQoc2hwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcy5mb3JFYWNoKChzdmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNlcnZpY2Uoc3ZjKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwbG90U29sdXRpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NvbHV0aW9uKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc2V0KCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCcudnJwLXBvaW50LCAudnJwLWNhcGFjaXR5JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zWCA9ICh4KSA9PiB4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc1kgPSAoeSkgPT4geTtcclxuICAgICAgICAgICAgICAgIHRoaXMudnJwID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVzdCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0U2NhbGUodnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICh2cnApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZoY0xvY3MgPSB2cnAudmVoaWNsZXMucmVkdWNlKChyZXMsIHZoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmhjLnN0YXJ0TG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHt4LCB5fSA9IHZoYy5zdGFydExvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzBdLnB1c2goeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNbMV0ucHVzaCh5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodmhjLmVuZExvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7eCwgeX0gPSB2aGMuZW5kTG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNbMF0ucHVzaCh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1sxXS5wdXNoKHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgW1tdLCBbXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdmNMb2NzID0gdnJwLnNlcnZpY2VzLnJlZHVjZSgocmVzLCBzdmMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gc3ZjLmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNbMF0ucHVzaCh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzFdLnB1c2goeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgW1tdLCBbXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzaHBMb2NzID0gdnJwLnNoaXBtZW50cy5yZWR1Y2UoKHJlcywgc2hwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaHAucGlja3VwLmxvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7eCwgeX0gPSBzaHAucGlja3VwLmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzBdLnB1c2goeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNbMV0ucHVzaCh5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hwLmRlbGl2ZXJ5LmxvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7eCwgeX0gPSBzaHAuZGVsaXZlcnkubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNbMF0ucHVzaCh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1sxXS5wdXNoKHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgW1tdLCBbXV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB4TWluTWF4ID0gdmhjTG9jc1swXS5jb25jYXQoc3ZjTG9jc1swXSkuY29uY2F0KHNocExvY3NbMF0pLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB5TWluTWF4ID0gdmhjTG9jc1sxXS5jb25jYXQoc3ZjTG9jc1sxXSkuY29uY2F0KHNocExvY3NbMV0pLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB5bWluID0geU1pbk1heC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHltYXggPSB5TWluTWF4LnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHhtaW4gPSB4TWluTWF4LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeG1heCA9IHhNaW5NYXgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWF4RGltID0gTWF0aC5tYXgoKHhtYXgteG1pbiksICh5bWF4LXltaW4pKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coW3htaW4sIHhtYXgsIHltaW4sIHltYXgsIG1heERpbV0pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCB2aGNNYXggPSB2cnAudmVoaWNsZXMubWFwKCh2aGMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IHNtYXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgZW1heCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmICh2aGMuc3RhcnRMb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQge3gsIHl9ID0gdmhjLnN0YXJ0TG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBzbWF4ID0gTWF0aC5tYXgoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAodmhjLmVuZExvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCB7eCwgeX0gPSB2aGMuZW5kTG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBlbWF4ID0gTWF0aC5tYXgoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gTWF0aC5tYXgoc21heCwgZW1heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSkuc29ydCgoYSwgYikgPT4gYiAtIGEpWzBdIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBzdmNNYXggPSB2cnAuc2VydmljZXMubWFwKChzdmMpID0+IE1hdGgubWF4KHN2Yy5sb2NhdGlvbi5jb29yZC54LCBzdmMubG9jYXRpb24uY29vcmQueSkpLnNvcnQoKGEsIGIpID0+IGIgLSBhKVswXSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc2hwTWF4ID0gdnJwLnNoaXBtZW50cy5tYXAoKHNocCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgcG1heCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBkbWF4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHNocC5waWNrdXAubG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHt4LCB5fSA9IHNocC5waWNrdXAubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBwbWF4ID0gTWF0aC5tYXgoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoc2hwLmRlbGl2ZXJ5LmxvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCB7eCwgeX0gPSBzaHAuZGVsaXZlcnkubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkbWF4ID0gTWF0aC5tYXgoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICByZXR1cm4gTWF0aC5tYXgocG1heCwgZG1heCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gfSkuc29ydCgoYSwgYikgPT4gYiAtIGEpWzBdIHx8IDA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNjYWxlID0gdGhpcy5jYW52YXMud2lkdGggLyBtYXhEaW07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFNjYWxlOiAke3NjYWxlfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNYID0gKHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh4IC0geG1pbikgKiBzY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJhbnNZID0gKHkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh5IC0geW1pbikgKiBzY2FsZTtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGVsZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWUlBQbG90dGVyKGVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL3ZycC92cnAtcGxvdHRlci1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3OTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuc2VydmljZSgnJGRic2NhbicsIGRic2NhblNlcnZpY2UpO1xyXG4gICAgZGJzY2FuU2VydmljZS4kaW5qZWN0ID0gWyckcGVybXV0YXRpb24nXTtcclxuXHJcbiAgICBmdW5jdGlvbiBkYnNjYW5TZXJ2aWNlKCRwZXJtdXRhdGlvbil7XHJcbiAgICAgICAgY29uc3QgX3BvaW50cyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IF9lcHNGYWN0b3IgPSAwLjY7XHJcbiAgICAgICAgY29uc3QgX3NhbXBsZUNvdW50ID0gMTAwO1xyXG4gICAgICAgIGNvbnN0IF9wb2ludFN0YXR1cyA9IHtcclxuICAgICAgICAgICAgTk9JU0U6IC0xLFxyXG4gICAgICAgICAgICBOT1RfVklTSVRFRDogMCxcclxuICAgICAgICAgICAgUEFSVF9PRl9DTFVTVEVSOiAxXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xyXG4gICAgICAgICAgICBwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIGdldDogKCkgPT4gX3BvaW50cyxcclxuICAgICAgICAgICAgICAgIHNldDogKHB0cykgPT4gX3BvaW50cy5zcGxpY2UoMCwgX3BvaW50cy5sZW5ndGgsIC4uLnB0cylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXBzRmFjdG9yOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6ICgpID0+IF9lcHNGYWN0b3JcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2FtcGxlQ291bnQ6IHtcclxuICAgICAgICAgICAgICAgIGdldDogKCkgPT4gX3NhbXBsZUNvdW50XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBvaW50U3RhdHVzOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6ICgpID0+IF9wb2ludFN0YXR1c1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjbGFzcyBDbHVzdGVyIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cyA9IEltbXV0YWJsZS5TZXQoKS5hc011dGFibGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGxlbmd0aCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLnNpemVcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IHNpemUoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50cy5zaXplXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFBvaW50KHBvaW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5hZGQocG9pbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRQb2ludHMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMudmFsdWVTZXEoKS50b0FycmF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFBvaW50cyhwb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgcG9pbnRzLmZvckVhY2goKHB0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludHMuYWRkKHB0KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXF1YWxzKG9iail7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqID09PSB0aGlzKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKCFvYmogfHwgb2JqLmNvbnN0cnVjdG9yICE9PSB0aGlzLmNvbnN0cnVjdG9yKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMuc2l6ZSA9PT0gb2JqLnBvaW50cy5zaXplXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5wb2ludHMuZXZlcnkoKHB0KSA9PiBvYmoucG9pbnRzLmhhcyhwdCkpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgb2JqLnBvaW50cy5ldmVyeSgocHQpID0+IHRoaXMucG9pbnRzLmhhcyhwdCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIEpTREJTQ0FOIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoZXBzLCBtaW5QdHMgPSAyLCBkaXN0YW5jZUNhbGN1bGF0b3IgPSBKU0RCU0NBTi5ldWNsaWRlYW5EaXN0YW5jZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcHMgPSBlcHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1pblB0cyA9IG1pblB0cztcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzdGFuY2VDYWxjdWxhdG9yID0gZGlzdGFuY2VDYWxjdWxhdG9yO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRFcHMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lcHM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldEVwcyhlcHMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcHMgPSBlcHM7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0TWluUHRzKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMubWluUHRzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRNaW5QdHMobWluUHRzKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1pblB0cyA9IG1pblB0cztcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjbHVzdGVyKHB0cyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbHVzdGVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gSW1tdXRhYmxlLlNldChwdHMpLmFzTXV0YWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGNvdW50ZXIgPSAwO1xyXG4gICAgICAgICAgICAgICAgd2hpbGUocG9pbnRzLnNpemUgPiAwICYmICsrY291bnRlciA8IDEwMDApe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2UgPSBnZXRSYW5kb21Qb2ludChwb2ludHMudG9BcnJheSgpKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBucG9pbnRzID0gdGhpcy5maW5kTmVpZ2hib3JzKGJhc2UsIHBvaW50cy5kZWxldGUoYmFzZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChucG9pbnRzLmxlbmd0aCA8IHRoaXMubWluUHRzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNsdXN0ZXIgPSBuZXcgQ2x1c3RlcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIuYWRkUG9pbnQoYmFzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbnBvaW50cy5mb3JFYWNoKChucHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2x1c3Rlci5hZGRQb2ludChucHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXJzLnB1c2goY2x1c3Rlcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGAke3RoaXMuZXBzfTske2NsdXN0ZXJzLmxlbmd0aH1gKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjbHVzdGVycztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZmluZE5laWdoYm9ycyhwb2ludCwgcG9pbnRzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb2ludHMudG9BcnJheSgpLnJlZHVjZSgocmVzLCBwdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZGlzdGFuY2VDYWxjdWxhdG9yKHB0LCBwb2ludCkgPD0gdGhpcy5lcHMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludHMuZGVsZXRlKHB0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2gocHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMucHVzaCguLi50aGlzLmZpbmROZWlnaGJvcnMocHQsIHBvaW50cykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZXVjbGlkZWFuRGlzdGFuY2UgKHB0QSwgcHRCKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHRBLmdldERpc3RhbmNlKHB0Qik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbHVzdGVyID0gKHBvaW50cywgY2x1c3RlckNvdW50LCBub2lzZVJhdGUgPSAwLjMpID0+IHtcclxuICAgICAgICAgICAgbWF0cml4U2FtcGxlKHBvaW50cyk7XHJcbiAgICAgICAgICAgIGxldCBjbHVzdGVycyA9IFtdO1xyXG4gICAgICAgICAgICBsZXQgZnVzZSA9IDA7XHJcbiAgICAgICAgICAgIGxldCBlcHMgPSAyO1xyXG4gICAgICAgICAgICBsZXQgYmVzdEVwcyA9IDI7XHJcbiAgICAgICAgICAgIGxldCBtYXggPSAtSW5maW5pdHk7XHJcblxyXG4gICAgICAgICAgICB3aGlsZSAoZXBzIDwgNjAwKXtcclxuICAgICAgICAgICAgICAgIGlmIChmdXNlID4gNSl7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkYnNjYW4gPSBuZXcgSlNEQlNDQU4oZXBzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDbHVzdGVycyA9IGRic2Nhbi5jbHVzdGVyKHBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBub2lzZSA9IDEgLSAoY3VycmVudENsdXN0ZXJzLnJlZHVjZSgocmVzLCBjbHVzdGVyKSA9PiByZXMgKyBjbHVzdGVyLnNpemUsIDApIC8gcG9pbnRzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWZmID0gTWF0aC5hYnMoY2x1c3RlckNvdW50IC0gY3VycmVudENsdXN0ZXJzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF4IDwgY3VycmVudENsdXN0ZXJzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWF4ID0gY3VycmVudENsdXN0ZXJzLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Q2x1c3RlcnMubGVuZ3RoID09PSAxICYmIG1heCA+IGN1cnJlbnRDbHVzdGVycy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIGZ1c2UrK1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGRpZmYgPCBNYXRoLmFicyhjbHVzdGVyQ291bnQgLSBjbHVzdGVycy5sZW5ndGgpICYmIG5vaXNlIDwgbm9pc2VSYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICBjbHVzdGVycyA9IGN1cnJlbnRDbHVzdGVycztcclxuICAgICAgICAgICAgICAgICAgICBiZXN0RXBzID0gZXBzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGVwcyArPSAwLjU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0Jlc3QgZXBzOiAnICsgYmVzdEVwcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBjbHVzdGVycztcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBzYW1wbGUocG9pbnRzKXtcclxuICAgICAgICAgICAgY29uc3QgZGlzdHMgPSAkcGVybXV0YXRpb24uZ2V0QWxsQ29tYmluYXRpb24ocG9pbnRzLCAyKS5tYXAoKHBhaXIpID0+IHBhaXJbMF0uZ2V0RGlzdGFuY2UocGFpclsxXSkpLnNvcnQoKGEsYikgPT4gYSAtIGIpO1xyXG4gICAgICAgICAgICBjb25zdCBtaWQgPSBkaXN0cy5zbGljZShNYXRoLnJvdW5kKGRpc3RzLmxlbmd0aCAvIDMpLCBNYXRoLnJvdW5kKGRpc3RzLmxlbmd0aCAqIDIgLyAzKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRzdW0gPSBkaXN0cy5yZWR1Y2UoKHJlcywgZGlzdCkgPT4gcmVzICsgZGlzdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHN1bSA9IG1pZC5yZWR1Y2UoKHJlcywgZGlzdCkgPT4gcmVzICsgZGlzdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlcHMgPSAoKGRzdW0gLyBkaXN0cy5sZW5ndGgpIC0gZGlzdHNbMF0pICogX2Vwc0ZhY3RvcjtcclxuICAgICAgICAgICAgY29uc3QgZXBzID0gKChzdW0gLyBtaWQubGVuZ3RoKSAtIG1pZFswXSkgKiBfZXBzRmFjdG9yO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgZkFWRzogJHtkc3VtIC8gZGlzdHMubGVuZ3RofSBmTUlOOiAke2Rpc3RzWzBdfSBmTUFYOiAke2Rpc3RzW2Rpc3RzLmxlbmd0aCAtIDFdfSBmRVBTOiAke2RlcHN9YCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBtQVZHOiAke3N1bSAvIG1pZC5sZW5ndGh9IG1NSU46ICR7bWlkWzBdfSBtTUFYOiAke21pZFttaWQubGVuZ3RoIC0gMV19IG1FUFM6ICR7ZXBzfWApO1xyXG4gICAgICAgICAgICByZXR1cm4gZXBzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWF0cml4U2FtcGxlKHBvaW50cyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGtubiA9IDM7XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdHJpeCA9IEltbXV0YWJsZS5NYXAoKS5hc011dGFibGUoKTtcclxuICAgICAgICAgICAgY29uc3QgZGlzdHMgPSBbXTtcclxuICAgICAgICAgICAgbGV0IG1heERpc3QgPSAwO1xyXG4gICAgICAgICAgICBsZXQgbWluRGlzdCA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICAgICAgICAgICRwZXJtdXRhdGlvbi5nZXRBbGxDb21iaW5hdGlvbihwb2ludHMsIDIpLmZvckVhY2goKHBhaXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFthLCBiXSA9IHBhaXI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gYS5nZXREaXN0YW5jZShiKTtcclxuICAgICAgICAgICAgICAgIGRpc3RzLnB1c2goZGlzdCk7XHJcbiAgICAgICAgICAgICAgICBtYXRyaXguc2V0SW4oW2EsIGJdLCBkaXN0KTtcclxuICAgICAgICAgICAgICAgIG1hdHJpeC5zZXRJbihbYiwgYV0sIGRpc3QpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpc3QgPiBtYXhEaXN0KXtcclxuICAgICAgICAgICAgICAgICAgICBtYXhEaXN0ID0gZGlzdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgbWluRGlzdCl7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluRGlzdCA9IGRpc3Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjb25zdCB2YXJpID0gZ2V0VmFyaWFuY2UoZGlzdHMsIHRydWUpO1xyXG4gICAgICAgICAgICBjb25zdCBzdGRkZXYgPSBNYXRoLnNxcnQodmFyaSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdWYXJpYW5jZTogJyArIHZhcmkpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRGV2aWF0aW9uOiAnICsgc3RkZGV2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFJhbmRvbVBvaW50KHBvaW50cyl7XHJcbiAgICAgICAgICAgIGNvbnN0IHJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBwb2ludHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHBvaW50c1tyYW5kXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldE1lYW4odmFsdWVzKXtcclxuICAgICAgICAgICAgaWYgKCF2YWx1ZXMgfHwgIXZhbHVlcy5sZW5ndGgpIHJldHVybiBOYU47XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZXMucmVkdWNlKChyLCB2KSA9PiByICsgdiwgMCkgLyB2YWx1ZXMubGVuZ3RoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0VmFyaWFuY2UodmFsdWVzLCBiaWFzKXtcclxuICAgICAgICAgICAgaWYgKCF2YWx1ZXMgfHwgIXZhbHVlcy5sZW5ndGgpIHJldHVybiBOYU47XHJcblxyXG4gICAgICAgICAgICBjb25zdCBtZWFuID0gZ2V0TWVhbih2YWx1ZXMpO1xyXG4gICAgICAgICAgICBjb25zdCBuID0gdmFsdWVzLmxlbmd0aCAtICtiaWFzO1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWVzLnJlZHVjZSgociwgdikgPT4gciArIE1hdGgucG93KHYgLSBtZWFuLCAyKSwgMCkgLyBuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvZGJzY2FuL2Ric2Nhbi1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA4MDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuZGlyZWN0aXZlKCdkYnNjYW4nLCBkYnNjYW5EaXJlY3RpdmUpO1xyXG4gICAgZGJzY2FuRGlyZWN0aXZlLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBkYnNjYW5EaXJlY3RpdmUoKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2Ric2Nhbi10cGwuaHRtbCcpLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnRGJzY2FuQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2N0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZycC5jb250cm9sbGVyKCdEYnNjYW5Db250cm9sbGVyJywgRGJzY2FuQ29udHJvbGxlcik7XHJcbiAgICBEYnNjYW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsJyR0aW1lb3V0JywgJyRkYnNjYW4nLCAnJGNvbG9yZGVmJywgJ3BvaW50RmFjdG9yeSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIERic2NhbkNvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJGRic2NhbiwgJGNvbG9yZGVmLCBwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNvbnN0IFNUWUxFUyA9IFsncmVkLWJhY2snLCAnYmx1ZS1iYWNrJywgJ29yYW5nZS1iYWNrJywgJ2xpbWUtYmFjaycsICdwdXJwbGUtYmFjaycsICdhcXVhLWJhY2snLCAneWVsbG93LWJhY2snLCAnZ3JlZW4tYmFjaycsICdwaW5rLWJhY2snLCAnY3lhbi1iYWNrJ107XHJcbiAgICAgICAgY29uc3QgQ09MT1JTID0gWycjRjQ0MzM2JywgJyMyMTk2RjMnLCAnI0ZGOTgwMCcsICcjOEJDMzRBJywgJyM5QzI3QjAnLCAnIzAwOTY4OCcsICcjRkZDMTA3JywgJyM0Q0FGNTAnLCAnI0U5MUU2MycsICcjMDBCQ0Q0J107XHJcbiAgICAgICAgdGhpcy5wb2ludENvdW50ID0gMzAwO1xyXG4gICAgICAgIHRoaXMuY2x1c3RlckNvdW50ID0gNTtcclxuICAgICAgICB0aGlzLnJhbmRvbVBvaW50cyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yYXdQb2ludHMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY2x1c3RlclN0eWxlTWFwID0gSW1tdXRhYmxlLk1hcCgpLmFzTXV0YWJsZSgpO1xyXG4gICAgICAgIHRoaXMuc3R5bGUgPSBnZXRJdGVtKFNUWUxFUyk7XHJcblxyXG4gICAgICAgIHRoaXMucG9pbnRzID0gW107XHJcbiAgICAgICAgdGhpcy5jbHVzdGVycyA9IFtdO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2V0UG9pbnRzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludHNFbGVtID0gJCgnLmRicy1wb2ludC1jb250YWluZXInKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucmFuZG9tUG9pbnRzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzID0gcG9pbnRGYWN0b3J5LmdldFJhbmRvbVBvaW50cyh0aGlzLnBvaW50Q291bnQsIHBvaW50c0VsZW0ud2lkdGgoKSwgcG9pbnRzRWxlbS5oZWlnaHQoKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cyA9IHRoaXMucmF3UG9pbnRzLnNwbGl0KCdcXG4nKS5tYXAoKHBhaXIpID0+IHBvaW50RmFjdG9yeS5nZXRQb2ludCguLi5wYWlyLnRyaW0oKS5zcGxpdCgnLCcpLm1hcCh2ID0+IHBhcnNlSW50KHYpKSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJHNjb3BlLiRhcHBseUFzeW5jKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNldENsdXN0ZXJzID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNsdXN0ZXJTdHlsZU1hcC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcclxuICAgICAgICAgICAgICAgICQoJy5kYnMtcG9pbnQnKS5yZW1vdmVDbGFzcyhjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5jbHVzdGVyU3R5bGVNYXAuY2xlYXIoKTtcclxuICAgICAgICAgICAgdGhpcy5jbHVzdGVycyA9ICRkYnNjYW4uY2x1c3Rlcih0aGlzLnBvaW50cywgdGhpcy5jbHVzdGVyQ291bnQpLmZpbHRlcigoY2x1c3RlcikgPT4gY2x1c3Rlci5nZXRQb2ludHMoKS5sZW5ndGggPiAxKTtcclxuICAgICAgICAgICAgdGhpcy5jbHVzdGVycy5mb3JFYWNoKChjbHVzdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnN0eWxlLm5leHQoKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3RlclN0eWxlTWFwLnNldChjbHVzdGVyLCBjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIuZ2V0UG9pbnRzKCkuZm9yRWFjaCgocHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHB0LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW0pLmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24qIGdldEl0ZW0obGlzdCl7XHJcbiAgICAgICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBsaXN0WyhpKysgJSBsaXN0Lmxlbmd0aCldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLWRpcmVjdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gODA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLmNzc1xuLy8gbW9kdWxlIGlkID0gODA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9rLW1lYW4vay1tZWFuLmNzc1xuLy8gbW9kdWxlIGlkID0gODA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL2NvbG9ycy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDgxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiZGJzLWNvbnRyb2xzXFxcIiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg9XFxcIjQwXFxcIj5cXHJcXG4gICAgICAgICAgICA8bWQtc3dpdGNoIG5nLW1vZGVsPVxcXCJjdHJsLnJhbmRvbVBvaW50c1xcXCIgYXJpYS1sYWJlbD1cXFwidXNlIHJhbmRvbSBwb2ludHNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICByYW5kb20gcG9pbnRzXFxyXFxuICAgICAgICAgICAgPC9tZC1zd2l0Y2g+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgbmctc2hvdz1cXFwiY3RybC5yYW5kb21Qb2ludHNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvaW50czwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCIyMFxcXCIgbWF4PVxcXCI1MDBcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLnBvaW50Q291bnRcXFwiIGFyaWEtbGFiZWw9XFxcInBvaW50IGNvdW50XFxcIiBjbGFzcz1cXFwibWQtd2FyblxcXCI+PC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLnBvaW50Q291bnRcXFwiIGFyaWEtbGFiZWw9XFxcInBvaW50IGNvdW50XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q2x1c3RlcnM8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtc2xpZGVyIG1pbj1cXFwiMlxcXCIgbWF4PVxcXCIyMFxcXCIgbmctbW9kZWw9XFxcImN0cmwuY2x1c3RlckNvdW50XFxcIiBhcmlhLWxhYmVsPVxcXCJjbHVzdGVyIGNvdW50XFxcIiBjbGFzcz1cXFwibWQtd2FyblxcXCI+PC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLmNsdXN0ZXJDb3VudFxcXCIgYXJpYS1sYWJlbD1cXFwicG9pbnQgY291bnRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyIGNsYXNzPVxcXCJtZC1ibG9ja1xcXCIgbmctc2hvdz1cXFwiIWN0cmwucmFuZG9tUG9pbnRzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGxhYmVsPlBvaW50czwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBuZy1tb2RlbD1cXFwiY3RybC5yYXdQb2ludHNcXFwiIHJvd3M9XFxcIjZcXFwiIG1heC1yb3dzPVxcXCI2XFxcIj48L3RleHRhcmVhPlxcclxcbiAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCI1MFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBmbGV4PjwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIG5nLWNsaWNrPVxcXCJjdHJsLnJlc2V0UG9pbnRzKClcXFwiIGFyaWEtbGFiZWw9XFxcInJlc2V0XFxcIj5SZXNldDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5yZXNldENsdXN0ZXJzKClcXFwiIGFyaWEtbGFiZWw9XFxcImNsdXN0ZXIgcG9pbnRzXFxcIj5DbHVzdGVyPC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImRicy1kcmF3LXNjcm9sbGVyXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImRicy1kcmF3LWNvbnRhaW5lclxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiZGJzLXBvaW50LWNvbnRhaW5lclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRicy1wb2ludFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcInBvaW50IGluIGN0cmwucG9pbnRzXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgIGlkPVxcXCJ7e3BvaW50LnRvU3RyaW5nKCl9fVxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICBuZy1zdHlsZT1cXFwieyd0b3AnOiBwb2ludC55ICsgJ3B4JywgJ2xlZnQnOiBwb2ludC54ICsgJ3B4J31cXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA4MTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==