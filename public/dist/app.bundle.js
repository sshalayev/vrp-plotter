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
        const _epsFactor = 0.8;
        const _sampleCount = 100;
        const _pointStatus = {
            NOISE: 0,
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

            addPoint(point) {
                this.points.add(point);
            }

            getPoints() {
                return this.points.valueSeq().toArray();
            }

            equals(obj){
                if (obj === this) return true;
                if(!obj || obj.constructor !== this.constructor) return false;
                return this.points.size === obj.points.size
                    && this.points.intersect(obj.points).size === this.points.size
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

            cluster(points) {
                const clusters = [];
                const visited = Immutable.Map().asMutable();
                console.log(this.getNeighbors(points[0], points))
                points.forEach((point) => {
                    if (!visited.has(point)) {
                        const neighbors = this.getNeighbors(point, points);
                        if (neighbors.length >= this.minPts) {
                            const cluster = new Cluster();
                            clusters.push(this.expandCluster(cluster, point, neighbors, points, visited));
                        }
                    } else {
                        visited.set(point, _pointStatus.NOISE)
                    }
                });
                return clusters;
            }

            expandCluster(cluster, point, neighbors, points, visited) {
                cluster.addPoint(point);
                visited.set(point, _pointStatus.PART_OF_CLUSTER);
                let seeds = neighbors.slice(1);
                seeds.forEach((current) => {
                    if (!visited.has(current)) {
                        let currentNeighbors = this.getNeighbors(current, points);
                        if (currentNeighbors.length >= this.minPts) {
                            seeds = this.merge(seeds, currentNeighbors);
                        }
                    }
                    if (visited.get(current) === _pointStatus.NOISE) {
                        visited.set(current, _pointStatus.PART_OF_CLUSTER);
                        cluster.addPoint(current);
                    }
                });
                return cluster;
            }

            getNeighbors(point, points) {
                return points.reduce((res, neighbor) => {
                    if (point !== neighbor && this.distanceCalculator(neighbor, point) <= this.eps) {
                        res.push(neighbor);
                    }
                    return res;
                }, []);
            }

            _merge(one, two) {
                const oneSet = new Set(one);
                two.forEach((item) => {
                    if (!oneSet.has(item)) {
                        one.push(item)
                    }
                });
                return one;
            }

            merge(one, two){
                return Immutable.Set.of(one).union(two).valueSeq().toArray()
            }

            static euclideanDistance (ptA, ptB) {
                return ptA.getDistance(ptB);
            };

        }

        this.cluster = (points) => {
            const eps = sample(points);
            console.log(eps);
            const dbscan = new JSDBSCAN(eps);
            return dbscan.cluster(points);
        };

        function _sample(points){
            let min = Number.MAX_VALUE, sum = 0;
            for (let i = 0; i < _sampleCount; i++) {
                const [pt1, pt2] = $permutation.getRandomPermutation(points);
                const dist = pt1.getDistance(pt2);
                if (dist < min) min = dist;
                sum += dist
            }
            return ((sum / _sampleCount) - min) * _epsFactor
        }

        function sample(points){
            console.log('sample start');
            const dists = $permutation.getAllCombination(points, 2).map((pair) => pair[0].getDistance(pair[1])).sort((a,b) => a - b);
            const mid = dists.slice(Math.round(dists.length / 3), Math.round(dists.length * 2 / 3));
            const sum = mid.reduce((res, dist) => res + dist);
            const eps = ((sum / mid.length) - dists[0]) * _epsFactor;
            console.log('sample finished ' + eps);
            return eps;
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
            this.clusters = $dbscan.cluster(this.points).filter((cluster) => cluster.getPoints().length > 1);
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

module.exports = "<div layout=\"column\" flex>\r\n    <div class=\"dbs-controls\" layout=\"row\" layout-align=\"space-between start\">\r\n        <div layout=\"column\" flex=\"40\">\r\n            <md-slider-container ng-if=\"ctrl.randomPoints\">\r\n                <span>Points</span>\r\n                <md-slider min=\"50\" max=\"500\" ng-model=\"ctrl.pointCount\" aria-label=\"point count\" class=\"md-warn\"></md-slider>\r\n                <md-input-container>\r\n                    <input type=\"number\" ng-model=\"ctrl.pointCount\" aria-label=\"point count\">\r\n                </md-input-container>\r\n            </md-slider-container>\r\n            <md-input-container class=\"md-block\" ng-show=\"!ctrl.randomPoints\">\r\n                <label>VRP</label>\r\n                <textarea ng-model=\"ctrl.rawPoints\" rows=\"6\" max-rows=\"6\"></textarea>\r\n            </md-input-container>\r\n        </div>\r\n        <div layout=\"column\" flex=\"50\">\r\n            <div flex></div>\r\n            <div layout=\"row\">\r\n                <div flex>\r\n                    <md-switch ng-model=\"ctrl.randomPoints\" aria-label=\"use random points\">\r\n                        random points\r\n                    </md-switch>\r\n                </div>\r\n                <md-button ng-click=\"ctrl.resetPoints()\" aria-label=\"reset\">Reset</md-button>\r\n                <md-button class=\"md-primary\" ng-click=\"ctrl.resetClusters()\" aria-label=\"cluster points\">Cluster</md-button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n    <div class=\"dbs-draw-scroller\">\r\n        <div class=\"dbs-draw-container\">\r\n            <div class=\"dbs-point-container\">\r\n                <div class=\"dbs-point\"\r\n                     ng-repeat=\"point in ctrl.points\"\r\n                     id=\"{{point.toString()}}\"\r\n                     ng-style=\"{'top': point.y + 'px', 'left': point.x + 'px'}\"></div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>"

/***/ })

},[748]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMgLmNzcyQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLWRyYXcuY3NzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy5jc3MiLCJ3ZWJwYWNrOi8vLy4vY3NzIC5jc3MkIiwid2VicGFjazovLy8uL2Nzcy9hZ2dyaWQuY3NzIiwid2VicGFjazovLy8uL2Nzcy9jaGVja2lvLmNzcyIsIndlYnBhY2s6Ly8vLi9jc3MvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vY3NzL3Njcm9sbHBhZC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yZXNvdXJjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yZXNvdXJjZS9hbmd1bGFyLXJlc291cmNlLmpzIiwid2VicGFjazovLy8uL2FwcC90ZW1wbGF0ZXMvYWxnby5odG1sIiwid2VicGFjazovLy8uL2FwcC9jb25zdGFudHMgLitcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnN0YW50cy9hcGktcmVxdWVzdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnN0YW50cy9tZC1jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnRyb2xsZXJzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9jb250cm9sbGVycy9yb3V0ZS1jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL2FwLW1kLWNvbG9yLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL3Jlc2l6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9jb2xvci1kZWYtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvZGF0ZS11dGlscy1wcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvZG91YmxlLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzL2V2ZW50LWVtaXR0ZXItc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvcmVzaXplLXNlbnNvci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvc2xhc2gtcGFyYW0tc2VyaWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvc3RvcmFnZS1wcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cyAuK1xcLmpzJCIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL2JpZ251bWJlci1maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYWxnby9nZW5ldGljLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYWxnby9wZXJtdXRhdGlvbi1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2FsZ28vcG9pbnQtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL3NpbS1hbm5lYWwtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hcGkvYXBpLXJlcXVlc3QtcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXBpL3NsYXNoLXBhcmFtLXNlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXBpL3RwbC1xdWVyeS1zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvay1tZWFuL2stbWVhbi1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3RzcC9yb3V0ZS1kcmF3LWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtcGxvdHRlci1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvdnJwL3ZycC1kcmF3LXRwbC5odG1sIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtcGxvdHRlci1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2Ric2Nhbi9kYnNjYW4tc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9rLW1lYW4vay1tZWFuLmNzcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL2NvbG9ycy5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvZGJzY2FuL2Ric2Nhbi10cGwuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEIsbUJBQU8sQ0FBQyxHQUFpQztBQUNyRTs7QUFFQSwrQkFBK0Isd0JBQStDO0FBQzlFLCtCQUErQix3QkFBMkM7O0FBRTFFLFlBQVksbUJBQU8sQ0FBQyxHQUFVOztBQUU5Qix5QkFBeUIsd0JBQWdEO0FBQ3pFLDRDQUE0QywyQ0FBMkM7O0FBRXZGLDJCQUEyQix3QkFBa0Q7QUFDN0UsOENBQThDLDZDQUE2Qzs7QUFFM0YsMEJBQTBCLHdCQUFpRDtBQUMzRSw2Q0FBNkMsNENBQTRDOztBQUV6Rix3QkFBd0Isd0JBQStDO0FBQ3ZFLDJDQUEyQywwQ0FBMEM7O0FBRXJGLDBCQUEwQix3QkFBaUQ7QUFDM0UsNkNBQTZDLDRDQUE0Qzs7Ozs7Ozs7Ozs7Ozs7QUN6QnpGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDckJBLHlDOzs7Ozs7O0FDQUEseUM7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7Ozs7QUNwQkEseUM7Ozs7Ozs7QUNBQSx5Qzs7Ozs7OztBQ0FBLHlDOzs7Ozs7O0FDQUEseUM7Ozs7Ozs7O0FDQ0EsZ0JBQWdCLG1CQUFPLENBQUMsR0FBUztBQUNqQyxhQUFhLG1CQUFPLENBQUMsR0FBUTs7QUFFN0IsYUFBYSxtQ0FBbUM7O0FBRWhEO0FBQ0EsSUFBSSxtQkFBTyxDQUFDLEdBQW1CO0FBQy9CLElBQUksbUJBQU8sQ0FBQyxHQUFpQjtBQUM3QixJQUFJLG1CQUFPLENBQUMsR0FBa0I7QUFDOUIsSUFBSSxtQkFBTyxDQUFDLEdBQWtCO0FBQzlCLElBQUksbUJBQU8sQ0FBQyxHQUFjO0FBQzFCLElBQUksbUJBQU8sQ0FBQyxHQUFrQjtBQUM5QixJQUFJLG1CQUFPLENBQUMsR0FBZ0I7QUFDNUI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsbUJBQU8sQ0FBQyxHQUF1QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxxQjs7Ozs7OztBQ3BFQSxtQkFBTyxDQUFDLEdBQW9CO0FBQzVCOzs7Ozs7OztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7O0FBRTVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw4REFBOEQsRUFBRTtBQUNoRTtBQUNBO0FBQ0EsbUNBQW1DLGtDQUFrQztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG1DQUFtQyxNQUFNLDJCQUEyQjtBQUM1RTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBa0U7QUFDbEU7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHFCQUFxQjtBQUNqRTtBQUNBLGlCQUFpQiw4QkFBOEI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxtQ0FBbUM7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCx1QkFBdUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGlCQUFpQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlEQUF5RCxrQ0FBa0M7QUFDM0Y7QUFDQTtBQUNBLHFCQUFxQiw4Q0FBOEM7QUFDbkUscUJBQXFCLDhDQUE4QztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBLHVCQUF1QixRQUFRO0FBQy9CO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCO0FBQ0Esd0JBQXdCLFNBQVM7QUFDakM7QUFDQTtBQUNBLFNBQVMsb0VBQW9FO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsb0ZBQW9GO0FBQzdGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixjQUFjO0FBQ3JDLFFBQVEsdUNBQXVDO0FBQy9DLFlBQVksa0NBQWtDO0FBQzlDLHlCQUF5QixPQUFPO0FBQ2hDLGlDQUFpQyxrQ0FBa0MsR0FBRyxxQkFBcUI7QUFDM0Y7QUFDQTtBQUNBLDZCQUE2QixRQUFRO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxRQUFRO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QixPQUFPO0FBQ3JDO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckM7QUFDQSxRQUFRLCtDQUErQztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9EQUFvRDtBQUNoRTtBQUNBLHlCQUF5QixRQUFRO0FBQ2pDO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBLDRCQUE0QixRQUFRO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsY0FBYztBQUNoQyxrQkFBa0IsZUFBZTtBQUNqQyxrQkFBa0IsNkJBQTZCO0FBQy9DLGtCQUFrQixpQkFBaUI7QUFDbkMsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxlQUFlO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsY0FBYztBQUMxRCxlQUFlLFlBQVk7QUFDM0I7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwRUFBMEU7QUFDbEY7QUFDQTtBQUNBLHFEQUFxRCw2QkFBNkI7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxxQkFBcUI7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMkJBQTJCO0FBQ25DLGtCQUFrQix5QkFBeUI7QUFDM0MsUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsdUNBQXVDOztBQUVyRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUMsK0JBQStCOztBQUUvQjtBQUNBLHFCQUFxQixhQUFhO0FBQ2xDLGtFQUFrRTtBQUNsRSxNQUFNOztBQUVOO0FBQ0EsbUNBQW1DLGVBQWU7QUFDbEQ7O0FBRUE7QUFDQSxvQ0FBb0M7QUFDcEMsNkJBQTZCOztBQUU3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGNBQWM7QUFDM0QsZUFBZSxZQUFZO0FBQzNCO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxjQUFjO0FBQzNELGVBQWUsWUFBWTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLFVBQVU7QUFDbEQsbUJBQW1CO0FBQ25CLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsV0FBVzs7QUFFekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFVBQVU7QUFDekQ7QUFDQSxlQUFlO0FBQ2YsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkMsc0JBQXNCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxVQUFVO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07O0FBRU4saUJBQWlCLFdBQVc7QUFDNUI7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBCQUEwQjtBQUNsQztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxRQUFRO0FBQzlDO0FBQ0E7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQztBQUNBLHVDQUF1QywyQkFBMkI7QUFDbEU7QUFDQTtBQUNBLHlCQUF5QixnQkFBZ0I7QUFDekM7QUFDQTtBQUNBO0FBQ0EsVUFBVSwyQkFBMkI7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsY0FBYztBQUMvQixrQkFBa0IsZUFBZTtBQUNqQyxtQkFBbUIsNkJBQTZCO0FBQ2hELG9CQUFvQixpQkFBaUI7QUFDckMsb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkMsd0JBQXdCLGNBQWM7QUFDdEMsd0JBQXdCLDRCQUE0QjtBQUNwRCx3QkFBd0IsY0FBYztBQUN0Qyx3QkFBd0I7QUFDeEI7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdCQUFnQixjQUFjO0FBQzlCLGlCQUFpQixlQUFlO0FBQ2hDLGtCQUFrQiw2QkFBNkI7QUFDL0MsbUJBQW1CLGlCQUFpQjtBQUNwQyxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOzs7QUFHQTtBQUNBOztBQUVBLDJCQUEyQjs7QUFFM0I7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBLG9DQUFvQyxxQkFBcUI7QUFDekQ7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHlDQUF5QztBQUN6Qzs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkJBQTJCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1GQUFtRixFQUFFO0FBQ3JGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLHlDQUF5QztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxFQUFFO0FBQ3RFLG1DQUFtQyxFQUFFLGFBQWEsRUFBRSxZQUFZLEVBQUUsRUFBRSxFQUFFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkIsaUJBQWlCO0FBQ2pCLCtDQUErQztBQUMvQztBQUNBLDJDQUEyQztBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLDhCQUE4QixrQkFBa0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7O0FBR0gsQ0FBQzs7Ozs7Ozs7QUM5NEJELGlJQUFpSSxvQ0FBb0MsK3VCOzs7Ozs7O0FDQXJLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDbEJBO0FBQ0E7O0FBRUEsS0FBSztBQUNMOzs7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELEVBQUUsS0FBSyxFQUFFO0FBQzFEO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw2QkFBNkI7QUFDbEUseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLHVDQUF1QyxvQkFBb0I7QUFDM0Q7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLEM7Ozs7Ozs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYiwyREFBMkQ7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsb0JBQW9CLElBQUksUUFBUTtBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixXQUFXO0FBQ3RDO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDOURBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsSUFBSTtBQUNuRDtBQUNBLDJCQUEyQixJQUFJO0FBQy9CLDBCQUEwQixFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsUUFBUTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixJQUFJO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQzFNQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsR0FBRztBQUMzQiw2QkFBNkIsY0FBYztBQUMzQyw2QkFBNkIsb0JBQW9CO0FBQ2pELHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBLHdDQUF3QyxxQkFBcUI7QUFDN0Qsb0NBQW9DLHFCQUFxQjtBQUN6RDtBQUNBLDJDQUEyQyxzQkFBc0I7O0FBRWpFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEVBQTRFLEtBQUs7QUFDakY7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLFNBQVM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLFNBQVM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUNyRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlGQUFpRixlQUFlLDhCQUE4QjtBQUM5SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0IsbUJBQW1CLE9BQU87QUFDMUIscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxFQUFFO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywyQkFBMkIsRUFBRTtBQUM5RCxzQ0FBc0MsNEJBQTRCO0FBQ2xFO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxZQUFZO0FBQy9DO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELHdCQUF3QjtBQUM3RTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7Ozs7Ozs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsOEJBQThCO0FBQ25FO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLHdDQUF3QztBQUNwRjtBQUNBO0FBQ0EsbUNBQW1DLFNBQVM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxJQUFJO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsWUFBWSxNQUFNLFdBQVcsR0FBRyxtQkFBbUI7QUFDekc7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLFlBQVk7QUFDOUMsbUNBQW1DLFVBQVU7QUFDN0Msb0RBQW9ELHNCQUFzQixLQUFLLHNCQUFzQixLQUFLLHNCQUFzQjtBQUNoSSwyQ0FBMkMsK0JBQStCO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQzdNQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLDZCQUE2QjtBQUM1RDtBQUNBO0FBQ0EsbUNBQW1DLGdDQUFnQztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBLHNDQUFzQyxNQUFNLDBCQUEwQixVQUFVO0FBQ2hGOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0MsV0FBVztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQzdJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLE9BQU8sTUFBTSxPQUFPO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLElBQUk7QUFDckI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUM3SEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLGtCQUFrQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUMxS0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixzQkFBc0IsbUJBQU8sQ0FBQyxHQUFtQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakIsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7QUNsRUEseUM7Ozs7Ozs7QUNBQSx5Qzs7Ozs7OztBQ0FBLHlDOzs7Ozs7O0FDQUEsdXlEQUF1eUQsa0JBQWtCLHVDQUF1Qyw4Q0FBOEMsMEUiLCJmaWxlIjoiYXBwLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IFVzZXIgb24gMTYuMDUuMTcuXHJcbiAqL1xyXG5cclxuY29uc3QgYW5ndWxhclJlc291cmNlVXRpbCA9IHJlcXVpcmUoJ3dlYnBhY2stYW5ndWxhci1yZXNvdXJjZS1wbHVnaW4nKTtcclxuLy8gU1RZTEVTXHJcblxyXG5hbmd1bGFyUmVzb3VyY2VVdGlsLnJlcXVpcmVBbGwocmVxdWlyZS5jb250ZXh0KFwiLi9jb21wb25lbnRzL1wiLCB0cnVlLCAvLmNzcyQvKSk7XHJcbmFuZ3VsYXJSZXNvdXJjZVV0aWwucmVxdWlyZUFsbChyZXF1aXJlLmNvbnRleHQoXCIuLy4uL2Nzcy9cIiwgdHJ1ZSwgLy5jc3MkLykpO1xyXG5cclxuY29uc3QgdnJwID0gcmVxdWlyZSgnLi9hcHAuanMnKTtcclxuXHJcbmNvbnN0IGNvbnRleHRDb25zdGFudHMgPSByZXF1aXJlLmNvbnRleHQoJy4vY29uc3RhbnRzLycsIHRydWUsIC8uK1xcLmpzJC8pO1xyXG5jb250ZXh0Q29uc3RhbnRzLmtleXMoKS5tYXAoZnVuY3Rpb24gKGtleSkgeyBjb250ZXh0Q29uc3RhbnRzLmFwcGx5KG51bGwsIFtrZXldKSh2cnApIH0pO1xyXG5cclxuY29uc3QgY29udGV4dENvbnRyb2xsZXJzID0gcmVxdWlyZS5jb250ZXh0KCcuL2NvbnRyb2xsZXJzLycsIHRydWUsIC8uK1xcLmpzJC8pO1xyXG5jb250ZXh0Q29udHJvbGxlcnMua2V5cygpLm1hcChmdW5jdGlvbiAoa2V5KSB7IGNvbnRleHRDb250cm9sbGVycy5hcHBseShudWxsLCBba2V5XSkodnJwKSB9KTtcclxuXHJcbmNvbnN0IGNvbnRleHREaXJlY3RpdmVzID0gcmVxdWlyZS5jb250ZXh0KCcuL2RpcmVjdGl2ZXMvJywgdHJ1ZSwgLy4rXFwuanMkLyk7XHJcbmNvbnRleHREaXJlY3RpdmVzLmtleXMoKS5tYXAoZnVuY3Rpb24gKGtleSkgeyBjb250ZXh0RGlyZWN0aXZlcy5hcHBseShudWxsLCBba2V5XSkodnJwKSB9KTtcclxuXHJcbmNvbnN0IGNvbnRleHRTZXJ2aWNlcyA9IHJlcXVpcmUuY29udGV4dCgnLi9zZXJ2aWNlcy8nLCB0cnVlLCAvLitcXC5qcyQvKTtcclxuY29udGV4dFNlcnZpY2VzLmtleXMoKS5tYXAoZnVuY3Rpb24gKGtleSkgeyBjb250ZXh0U2VydmljZXMuYXBwbHkobnVsbCwgW2tleV0pKHZycCkgfSk7XHJcblxyXG5jb25zdCBjb250ZXh0Q29tcG9uZW50cyA9IHJlcXVpcmUuY29udGV4dCgnLi9jb21wb25lbnRzLycsIHRydWUsIC8uK1xcLmpzJC8pO1xyXG5jb250ZXh0Q29tcG9uZW50cy5rZXlzKCkubWFwKGZ1bmN0aW9uIChrZXkpIHsgY29udGV4dENvbXBvbmVudHMuYXBwbHkobnVsbCwgW2tleV0pKHZycCkgfSk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuXHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3NDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL2FsZ28vY29sb3JzLmNzc1wiOiA4MTAsXG5cdFwiLi9kYnNjYW4vZGJzY2FuLmNzc1wiOiA4MDYsXG5cdFwiLi9rLW1lYW4vay1tZWFuLmNzc1wiOiA4MDgsXG5cdFwiLi90c3Avcm91dGUtZHJhdy5jc3NcIjogNzUwLFxuXHRcIi4vdnJwL3ZycC1kcmF3LmNzc1wiOiA3NTFcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3NDk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cyAuY3NzJFxuLy8gbW9kdWxlIGlkID0gNzQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDc1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdnJwL3ZycC1kcmF3LmNzc1xuLy8gbW9kdWxlIGlkID0gNzUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hZ2dyaWQuY3NzXCI6IDc1Myxcblx0XCIuL2NoZWNraW8uY3NzXCI6IDc1NCxcblx0XCIuL21haW4uY3NzXCI6IDc1NSxcblx0XCIuL3Njcm9sbHBhZC5jc3NcIjogNzU2XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNzUyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY3NzIC5jc3MkXG4vLyBtb2R1bGUgaWQgPSA3NTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Nzcy9hZ2dyaWQuY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Nzcy9jaGVja2lvLmNzc1xuLy8gbW9kdWxlIGlkID0gNzU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jc3MvbWFpbi5jc3Ncbi8vIG1vZHVsZSBpZCA9IDc1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY3NzL3Njcm9sbHBhZC5jc3Ncbi8vIG1vZHVsZSBpZCA9IDc1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcclxuY29uc3QgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcclxuY29uc3QgbWF0aCA9IHJlcXVpcmUoJ21hdGhqcycpO1xyXG5cclxubWF0aC5jb25maWcoe251bWJlcjogJ0JpZ051bWJlcicsIHByZWNpc2lvbjogNjR9KTtcclxuXHJcbmNvbnN0IHZycCA9IGFuZ3VsYXIubW9kdWxlKCdWUlBQbG90dGVyJywgW1xyXG4gICAgcmVxdWlyZSgnYW5ndWxhci11aS1yb3V0ZXInKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItYW5pbWF0ZScpLFxyXG4gICAgcmVxdWlyZSgnYW5ndWxhci1yZXNvdXJjZScpLFxyXG4gICAgcmVxdWlyZSgnYW5ndWxhci1tZXNzYWdlcycpLFxyXG4gICAgcmVxdWlyZSgnYW5ndWxhci1hcmlhJyksXHJcbiAgICByZXF1aXJlKCdhbmd1bGFyLW1hdGVyaWFsJyksXHJcbiAgICByZXF1aXJlKCdhbmd1bGFyLWZpbHRlcicpXHJcbl0pO1xyXG5cclxudnJwLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgJyR1cmxSb3V0ZXJQcm92aWRlcicsICckbG9jYXRpb25Qcm92aWRlcicsICckbWRUaGVtaW5nUHJvdmlkZXInLFxyXG4gICAgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkbWRUaGVtaW5nUHJvdmlkZXIpIHtcclxuICAgICAgICAkbG9jYXRpb25Qcm92aWRlci5odG1sNU1vZGUoe1xyXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxyXG4gICAgICAgICAgICByZXF1aXJlQmFzZTogZmFsc2VcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdyZWQnKVxyXG4gICAgICAgICAgICAuYWNjZW50UGFsZXR0ZSgnb3JhbmdlJylcclxuICAgICAgICAgICAgLndhcm5QYWxldHRlKCdwdXJwbGUnKTtcclxuXHJcbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdhbGdvJylcclxuICAgICAgICAgICAgLnByaW1hcnlQYWxldHRlKCdibHVlJylcclxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ29yYW5nZScpXHJcbiAgICAgICAgICAgIC53YXJuUGFsZXR0ZSgncGluaycpO1xyXG5cclxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvYWxnbycpO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoXCJhbGdvXCIsIHtcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSb3V0ZUNvbnRyb2xsZXInLFxyXG4gICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxyXG4gICAgICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2FsZ28uaHRtbCcpLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi9hbGdvXCIsXHJcbiAgICAgICAgICAgICAgICBvbkVudGVyOiBmdW5jdGlvbiAoJHJvb3RTY29wZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICRyb290U2NvcGUucGFnZVRpdGxlID0gJ1JvdXRpbmcgYWxnb3JpdGhtcyBkZW1vJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XSk7XHJcblxyXG52cnAucnVuKFxyXG4gICAgWyckcm9vdFNjb3BlJywgJyRzdGF0ZScsICckc3RhdGVQYXJhbXMnLFxyXG4gICAgICAgIGZ1bmN0aW9uICgkcm9vdFNjb3BlLCAkc3RhdGUsICRzdGF0ZVBhcmFtcykge1xyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRzdGF0ZSA9ICRzdGF0ZTtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kc3RhdGVQYXJhbXMgPSAkc3RhdGVQYXJhbXM7XHJcblxyXG4gICAgICAgICAgICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlU3VjY2VzcycsIGZ1bmN0aW9uIChldmVudCwgdG8sIHRvUGFyYW1zLCBmcm9tLCBmcm9tUGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnByZVN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGZyb20ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGZyb20udXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtczogZnJvbVBhcmFtc1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICRyb290U2NvcGUuY3VyU3RhdGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdG8ubmFtZSxcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHRvLnVybCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRvUGFyYW1zXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICBdXHJcbik7XHJcbm1vZHVsZS5leHBvcnRzID0gdnJwO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2FwcC5qc1xuLy8gbW9kdWxlIGlkID0gNzU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInJlcXVpcmUoJy4vYW5ndWxhci1yZXNvdXJjZScpO1xubW9kdWxlLmV4cG9ydHMgPSAnbmdSZXNvdXJjZSc7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hbmd1bGFyLXJlc291cmNlL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA3NThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBAbGljZW5zZSBBbmd1bGFySlMgdjEuNy44XG4gKiAoYykgMjAxMC0yMDE4IEdvb2dsZSwgSW5jLiBodHRwOi8vYW5ndWxhcmpzLm9yZ1xuICogTGljZW5zZTogTUlUXG4gKi9cbihmdW5jdGlvbih3aW5kb3csIGFuZ3VsYXIpIHsndXNlIHN0cmljdCc7XG5cbnZhciAkcmVzb3VyY2VNaW5FcnIgPSBhbmd1bGFyLiQkbWluRXJyKCckcmVzb3VyY2UnKTtcblxuLy8gSGVscGVyIGZ1bmN0aW9ucyBhbmQgcmVnZXggdG8gbG9va3VwIGEgZG90dGVkIHBhdGggb24gYW4gb2JqZWN0XG4vLyBzdG9wcGluZyBhdCB1bmRlZmluZWQvbnVsbC4gIFRoZSBwYXRoIG11c3QgYmUgY29tcG9zZWQgb2YgQVNDSUlcbi8vIGlkZW50aWZpZXJzIChqdXN0IGxpa2UgJHBhcnNlKVxudmFyIE1FTUJFUl9OQU1FX1JFR0VYID0gL14oXFwuW2EtekEtWl8kQF1bMC05YS16QS1aXyRAXSopKyQvO1xuXG5mdW5jdGlvbiBpc1ZhbGlkRG90dGVkUGF0aChwYXRoKSB7XG4gIHJldHVybiAocGF0aCAhPSBudWxsICYmIHBhdGggIT09ICcnICYmIHBhdGggIT09ICdoYXNPd25Qcm9wZXJ0eScgJiZcbiAgICAgIE1FTUJFUl9OQU1FX1JFR0VYLnRlc3QoJy4nICsgcGF0aCkpO1xufVxuXG5mdW5jdGlvbiBsb29rdXBEb3R0ZWRQYXRoKG9iaiwgcGF0aCkge1xuICBpZiAoIWlzVmFsaWREb3R0ZWRQYXRoKHBhdGgpKSB7XG4gICAgdGhyb3cgJHJlc291cmNlTWluRXJyKCdiYWRtZW1iZXInLCAnRG90dGVkIG1lbWJlciBwYXRoIFwiQHswfVwiIGlzIGludmFsaWQuJywgcGF0aCk7XG4gIH1cbiAgdmFyIGtleXMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gIGZvciAodmFyIGkgPSAwLCBpaSA9IGtleXMubGVuZ3RoOyBpIDwgaWkgJiYgYW5ndWxhci5pc0RlZmluZWQob2JqKTsgaSsrKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaV07XG4gICAgb2JqID0gKG9iaiAhPT0gbnVsbCkgPyBvYmpba2V5XSA6IHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHNoYWxsb3cgY29weSBvZiBhbiBvYmplY3QgYW5kIGNsZWFyIG90aGVyIGZpZWxkcyBmcm9tIHRoZSBkZXN0aW5hdGlvblxuICovXG5mdW5jdGlvbiBzaGFsbG93Q2xlYXJBbmRDb3B5KHNyYywgZHN0KSB7XG4gIGRzdCA9IGRzdCB8fCB7fTtcblxuICBhbmd1bGFyLmZvckVhY2goZHN0LCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgZGVsZXRlIGRzdFtrZXldO1xuICB9KTtcblxuICBmb3IgKHZhciBrZXkgaW4gc3JjKSB7XG4gICAgaWYgKHNyYy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICEoa2V5LmNoYXJBdCgwKSA9PT0gJyQnICYmIGtleS5jaGFyQXQoMSkgPT09ICckJykpIHtcbiAgICAgIGRzdFtrZXldID0gc3JjW2tleV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRzdDtcbn1cblxuLyoqXG4gKiBAbmdkb2MgbW9kdWxlXG4gKiBAbmFtZSBuZ1Jlc291cmNlXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBUaGUgYG5nUmVzb3VyY2VgIG1vZHVsZSBwcm92aWRlcyBpbnRlcmFjdGlvbiBzdXBwb3J0IHdpdGggUkVTVGZ1bCBzZXJ2aWNlc1xuICogdmlhIHRoZSAkcmVzb3VyY2Ugc2VydmljZS5cbiAqXG4gKiBTZWUge0BsaW5rIG5nUmVzb3VyY2UuJHJlc291cmNlUHJvdmlkZXJ9IGFuZCB7QGxpbmsgbmdSZXNvdXJjZS4kcmVzb3VyY2V9IGZvciB1c2FnZS5cbiAqL1xuXG4vKipcbiAqIEBuZ2RvYyBwcm92aWRlclxuICogQG5hbWUgJHJlc291cmNlUHJvdmlkZXJcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqXG4gKiBVc2UgYCRyZXNvdXJjZVByb3ZpZGVyYCB0byBjaGFuZ2UgdGhlIGRlZmF1bHQgYmVoYXZpb3Igb2YgdGhlIHtAbGluayBuZ1Jlc291cmNlLiRyZXNvdXJjZX1cbiAqIHNlcnZpY2UuXG4gKlxuICogIyMgRGVwZW5kZW5jaWVzXG4gKiBSZXF1aXJlcyB0aGUge0BsaW5rIG5nUmVzb3VyY2UgfSBtb2R1bGUgdG8gYmUgaW5zdGFsbGVkLlxuICpcbiAqL1xuXG4vKipcbiAqIEBuZ2RvYyBzZXJ2aWNlXG4gKiBAbmFtZSAkcmVzb3VyY2VcbiAqIEByZXF1aXJlcyAkaHR0cFxuICogQHJlcXVpcmVzIG5nLiRsb2dcbiAqIEByZXF1aXJlcyAkcVxuICogQHJlcXVpcmVzIG5nLiR0aW1lb3V0XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBIGZhY3Rvcnkgd2hpY2ggY3JlYXRlcyBhIHJlc291cmNlIG9iamVjdCB0aGF0IGxldHMgeW91IGludGVyYWN0IHdpdGhcbiAqIFtSRVNUZnVsXShodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1JlcHJlc2VudGF0aW9uYWxfU3RhdGVfVHJhbnNmZXIpIHNlcnZlci1zaWRlIGRhdGEgc291cmNlcy5cbiAqXG4gKiBUaGUgcmV0dXJuZWQgcmVzb3VyY2Ugb2JqZWN0IGhhcyBhY3Rpb24gbWV0aG9kcyB3aGljaCBwcm92aWRlIGhpZ2gtbGV2ZWwgYmVoYXZpb3JzIHdpdGhvdXRcbiAqIHRoZSBuZWVkIHRvIGludGVyYWN0IHdpdGggdGhlIGxvdyBsZXZlbCB7QGxpbmsgbmcuJGh0dHAgJGh0dHB9IHNlcnZpY2UuXG4gKlxuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1Jlc291cmNlIGBuZ1Jlc291cmNlYH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cbiAqXG4gKiBCeSBkZWZhdWx0LCB0cmFpbGluZyBzbGFzaGVzIHdpbGwgYmUgc3RyaXBwZWQgZnJvbSB0aGUgY2FsY3VsYXRlZCBVUkxzLFxuICogd2hpY2ggY2FuIHBvc2UgcHJvYmxlbXMgd2l0aCBzZXJ2ZXIgYmFja2VuZHMgdGhhdCBkbyBub3QgZXhwZWN0IHRoYXRcbiAqIGJlaGF2aW9yLiAgVGhpcyBjYW4gYmUgZGlzYWJsZWQgYnkgY29uZmlndXJpbmcgdGhlIGAkcmVzb3VyY2VQcm92aWRlcmAgbGlrZVxuICogdGhpczpcbiAqXG4gKiBgYGBqc1xuICAgICBhcHAuY29uZmlnKFsnJHJlc291cmNlUHJvdmlkZXInLCBmdW5jdGlvbigkcmVzb3VyY2VQcm92aWRlcikge1xuICAgICAgIC8vIERvbid0IHN0cmlwIHRyYWlsaW5nIHNsYXNoZXMgZnJvbSBjYWxjdWxhdGVkIFVSTHNcbiAgICAgICAkcmVzb3VyY2VQcm92aWRlci5kZWZhdWx0cy5zdHJpcFRyYWlsaW5nU2xhc2hlcyA9IGZhbHNlO1xuICAgICB9XSk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIEEgcGFyYW1ldGVyaXplZCBVUkwgdGVtcGxhdGUgd2l0aCBwYXJhbWV0ZXJzIHByZWZpeGVkIGJ5IGA6YCBhcyBpblxuICogICBgL3VzZXIvOnVzZXJuYW1lYC4gSWYgeW91IGFyZSB1c2luZyBhIFVSTCB3aXRoIGEgcG9ydCBudW1iZXIgKGUuZy5cbiAqICAgYGh0dHA6Ly9leGFtcGxlLmNvbTo4MDgwL2FwaWApLCBpdCB3aWxsIGJlIHJlc3BlY3RlZC5cbiAqXG4gKiAgIElmIHlvdSBhcmUgdXNpbmcgYSB1cmwgd2l0aCBhIHN1ZmZpeCwganVzdCBhZGQgdGhlIHN1ZmZpeCwgbGlrZSB0aGlzOlxuICogICBgJHJlc291cmNlKCdodHRwOi8vZXhhbXBsZS5jb20vcmVzb3VyY2UuanNvbicpYCBvciBgJHJlc291cmNlKCdodHRwOi8vZXhhbXBsZS5jb20vOmlkLmpzb24nKWBcbiAqICAgb3IgZXZlbiBgJHJlc291cmNlKCdodHRwOi8vZXhhbXBsZS5jb20vcmVzb3VyY2UvOnJlc291cmNlX2lkLjpmb3JtYXQnKWBcbiAqICAgSWYgdGhlIHBhcmFtZXRlciBiZWZvcmUgdGhlIHN1ZmZpeCBpcyBlbXB0eSwgOnJlc291cmNlX2lkIGluIHRoaXMgY2FzZSwgdGhlbiB0aGUgYC8uYCB3aWxsIGJlXG4gKiAgIGNvbGxhcHNlZCBkb3duIHRvIGEgc2luZ2xlIGAuYC4gIElmIHlvdSBuZWVkIHRoaXMgc2VxdWVuY2UgdG8gYXBwZWFyIGFuZCBub3QgY29sbGFwc2UgdGhlbiB5b3VcbiAqICAgY2FuIGVzY2FwZSBpdCB3aXRoIGAvXFwuYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdD19IHBhcmFtRGVmYXVsdHMgRGVmYXVsdCB2YWx1ZXMgZm9yIGB1cmxgIHBhcmFtZXRlcnMuIFRoZXNlIGNhbiBiZSBvdmVycmlkZGVuIGluXG4gKiAgIGBhY3Rpb25zYCBtZXRob2RzLiBJZiBhIHBhcmFtZXRlciB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCBldmVyeSB0aW1lXG4gKiAgIGEgcGFyYW0gdmFsdWUgbmVlZHMgdG8gYmUgb2J0YWluZWQgZm9yIGEgcmVxdWVzdCAodW5sZXNzIHRoZSBwYXJhbSB3YXMgb3ZlcnJpZGRlbikuIFRoZVxuICogICBmdW5jdGlvbiB3aWxsIGJlIHBhc3NlZCB0aGUgY3VycmVudCBkYXRhIHZhbHVlIGFzIGFuIGFyZ3VtZW50LlxuICpcbiAqICAgRWFjaCBrZXkgdmFsdWUgaW4gdGhlIHBhcmFtZXRlciBvYmplY3QgaXMgZmlyc3QgYm91bmQgdG8gdXJsIHRlbXBsYXRlIGlmIHByZXNlbnQgYW5kIHRoZW4gYW55XG4gKiAgIGV4Y2VzcyBrZXlzIGFyZSBhcHBlbmRlZCB0byB0aGUgdXJsIHNlYXJjaCBxdWVyeSBhZnRlciB0aGUgYD9gLlxuICpcbiAqICAgR2l2ZW4gYSB0ZW1wbGF0ZSBgL3BhdGgvOnZlcmJgIGFuZCBwYXJhbWV0ZXIgYHt2ZXJiOiAnZ3JlZXQnLCBzYWx1dGF0aW9uOiAnSGVsbG8nfWAgcmVzdWx0cyBpblxuICogICBVUkwgYC9wYXRoL2dyZWV0P3NhbHV0YXRpb249SGVsbG9gLlxuICpcbiAqICAgSWYgdGhlIHBhcmFtZXRlciB2YWx1ZSBpcyBwcmVmaXhlZCB3aXRoIGBAYCwgdGhlbiB0aGUgdmFsdWUgZm9yIHRoYXQgcGFyYW1ldGVyIHdpbGwgYmVcbiAqICAgZXh0cmFjdGVkIGZyb20gdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgb24gdGhlIGBkYXRhYCBvYmplY3QgKHByb3ZpZGVkIHdoZW4gY2FsbGluZyBhY3Rpb25zXG4gKiAgIHdpdGggYSByZXF1ZXN0IGJvZHkpLlxuICogICBGb3IgZXhhbXBsZSwgaWYgdGhlIGBkZWZhdWx0UGFyYW1gIG9iamVjdCBpcyBge3NvbWVQYXJhbTogJ0Bzb21lUHJvcCd9YCB0aGVuIHRoZSB2YWx1ZSBvZlxuICogICBgc29tZVBhcmFtYCB3aWxsIGJlIGBkYXRhLnNvbWVQcm9wYC5cbiAqICAgTm90ZSB0aGF0IHRoZSBwYXJhbWV0ZXIgd2lsbCBiZSBpZ25vcmVkLCB3aGVuIGNhbGxpbmcgYSBcIkdFVFwiIGFjdGlvbiBtZXRob2QgKGkuZS4gYW4gYWN0aW9uXG4gKiAgIG1ldGhvZCB0aGF0IGRvZXMgbm90IGFjY2VwdCBhIHJlcXVlc3QgYm9keSkuXG4gKlxuICogQHBhcmFtIHtPYmplY3QuPE9iamVjdD49fSBhY3Rpb25zIEhhc2ggd2l0aCBkZWNsYXJhdGlvbiBvZiBjdXN0b20gYWN0aW9ucyB0aGF0IHdpbGwgYmUgYXZhaWxhYmxlXG4gKiAgIGluIGFkZGl0aW9uIHRvIHRoZSBkZWZhdWx0IHNldCBvZiByZXNvdXJjZSBhY3Rpb25zIChzZWUgYmVsb3cpLiBJZiBhIGN1c3RvbSBhY3Rpb24gaGFzIHRoZSBzYW1lXG4gKiAgIGtleSBhcyBhIGRlZmF1bHQgYWN0aW9uIChlLmcuIGBzYXZlYCksIHRoZW4gdGhlIGRlZmF1bHQgYWN0aW9uIHdpbGwgYmUgKm92ZXJ3cml0dGVuKiwgYW5kIG5vdFxuICogICBleHRlbmRlZC5cbiAqXG4gKiAgIFRoZSBkZWNsYXJhdGlvbiBzaG91bGQgYmUgY3JlYXRlZCBpbiB0aGUgZm9ybWF0IG9mIHtAbGluayBuZy4kaHR0cCN1c2FnZSAkaHR0cC5jb25maWd9OlxuICpcbiAqICAgICAgIHtcbiAqICAgICAgICAgYWN0aW9uMToge21ldGhvZDo/LCBwYXJhbXM6PywgaXNBcnJheTo/LCBoZWFkZXJzOj8sIC4uLn0sXG4gKiAgICAgICAgIGFjdGlvbjI6IHttZXRob2Q6PywgcGFyYW1zOj8sIGlzQXJyYXk6PywgaGVhZGVyczo/LCAuLi59LFxuICogICAgICAgICAuLi5cbiAqICAgICAgIH1cbiAqXG4gKiAgIFdoZXJlOlxuICpcbiAqICAgLSAqKmBhY3Rpb25gKiog4oCTIHtzdHJpbmd9IOKAkyBUaGUgbmFtZSBvZiBhY3Rpb24uIFRoaXMgbmFtZSBiZWNvbWVzIHRoZSBuYW1lIG9mIHRoZSBtZXRob2Qgb25cbiAqICAgICB5b3VyIHJlc291cmNlIG9iamVjdC5cbiAqICAgLSAqKmBtZXRob2RgKiog4oCTIHtzdHJpbmd9IOKAkyBDYXNlIGluc2Vuc2l0aXZlIEhUVFAgbWV0aG9kIChlLmcuIGBHRVRgLCBgUE9TVGAsIGBQVVRgLFxuICogICAgIGBERUxFVEVgLCBgSlNPTlBgLCBldGMpLlxuICogICAtICoqYHBhcmFtc2AqKiDigJMge09iamVjdD19IOKAkyBPcHRpb25hbCBzZXQgb2YgcHJlLWJvdW5kIHBhcmFtZXRlcnMgZm9yIHRoaXMgYWN0aW9uLiBJZiBhbnkgb2ZcbiAqICAgICB0aGUgcGFyYW1ldGVyIHZhbHVlIGlzIGEgZnVuY3Rpb24sIGl0IHdpbGwgYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgd2hlbiBhIHBhcmFtIHZhbHVlIG5lZWRzIHRvXG4gKiAgICAgYmUgb2J0YWluZWQgZm9yIGEgcmVxdWVzdCAodW5sZXNzIHRoZSBwYXJhbSB3YXMgb3ZlcnJpZGRlbikuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIHBhc3NlZCB0aGVcbiAqICAgICBjdXJyZW50IGRhdGEgdmFsdWUgYXMgYW4gYXJndW1lbnQuXG4gKiAgIC0gKipgdXJsYCoqIOKAkyB7c3RyaW5nfSDigJMgQWN0aW9uIHNwZWNpZmljIGB1cmxgIG92ZXJyaWRlLiBUaGUgdXJsIHRlbXBsYXRpbmcgaXMgc3VwcG9ydGVkIGp1c3RcbiAqICAgICBsaWtlIGZvciB0aGUgcmVzb3VyY2UtbGV2ZWwgdXJscy5cbiAqICAgLSAqKmBpc0FycmF5YCoqIOKAkyB7Ym9vbGVhbj19IOKAkyBJZiB0cnVlIHRoZW4gdGhlIHJldHVybmVkIG9iamVjdCBmb3IgdGhpcyBhY3Rpb24gaXMgYW4gYXJyYXksXG4gKiAgICAgc2VlIGByZXR1cm5zYCBzZWN0aW9uLlxuICogICAtICoqYHRyYW5zZm9ybVJlcXVlc3RgKiog4oCTXG4gKiAgICAgYHtmdW5jdGlvbihkYXRhLCBoZWFkZXJzR2V0dGVyKXxBcnJheS48ZnVuY3Rpb24oZGF0YSwgaGVhZGVyc0dldHRlcik+fWAg4oCTXG4gKiAgICAgVHJhbnNmb3JtIGZ1bmN0aW9uIG9yIGFuIGFycmF5IG9mIHN1Y2ggZnVuY3Rpb25zLiBUaGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHRha2VzIHRoZSBodHRwXG4gKiAgICAgcmVxdWVzdCBib2R5IGFuZCBoZWFkZXJzIGFuZCByZXR1cm5zIGl0cyB0cmFuc2Zvcm1lZCAodHlwaWNhbGx5IHNlcmlhbGl6ZWQpIHZlcnNpb24uXG4gKiAgICAgQnkgZGVmYXVsdCwgdHJhbnNmb3JtUmVxdWVzdCB3aWxsIGNvbnRhaW4gb25lIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZSByZXF1ZXN0IGRhdGEgaXNcbiAqICAgICBhbiBvYmplY3QgYW5kIHNlcmlhbGl6ZXMgaXQgdXNpbmcgYGFuZ3VsYXIudG9Kc29uYC4gVG8gcHJldmVudCB0aGlzIGJlaGF2aW9yLCBzZXRcbiAqICAgICBgdHJhbnNmb3JtUmVxdWVzdGAgdG8gYW4gZW1wdHkgYXJyYXk6IGB0cmFuc2Zvcm1SZXF1ZXN0OiBbXWBcbiAqICAgLSAqKmB0cmFuc2Zvcm1SZXNwb25zZWAqKiDigJNcbiAqICAgICBge2Z1bmN0aW9uKGRhdGEsIGhlYWRlcnNHZXR0ZXIsIHN0YXR1cyl8QXJyYXkuPGZ1bmN0aW9uKGRhdGEsIGhlYWRlcnNHZXR0ZXIsIHN0YXR1cyk+fWAg4oCTXG4gKiAgICAgVHJhbnNmb3JtIGZ1bmN0aW9uIG9yIGFuIGFycmF5IG9mIHN1Y2ggZnVuY3Rpb25zLiBUaGUgdHJhbnNmb3JtIGZ1bmN0aW9uIHRha2VzIHRoZSBIVFRQXG4gKiAgICAgcmVzcG9uc2UgYm9keSwgaGVhZGVycyBhbmQgc3RhdHVzIGFuZCByZXR1cm5zIGl0cyB0cmFuc2Zvcm1lZCAodHlwaWNhbGx5IGRlc2VyaWFsaXplZClcbiAqICAgICB2ZXJzaW9uLlxuICogICAgIEJ5IGRlZmF1bHQsIHRyYW5zZm9ybVJlc3BvbnNlIHdpbGwgY29udGFpbiBvbmUgZnVuY3Rpb24gdGhhdCBjaGVja3MgaWYgdGhlIHJlc3BvbnNlIGxvb2tzXG4gKiAgICAgbGlrZSBhIEpTT04gc3RyaW5nIGFuZCBkZXNlcmlhbGl6ZXMgaXQgdXNpbmcgYGFuZ3VsYXIuZnJvbUpzb25gLiBUbyBwcmV2ZW50IHRoaXMgYmVoYXZpb3IsXG4gKiAgICAgc2V0IGB0cmFuc2Zvcm1SZXNwb25zZWAgdG8gYW4gZW1wdHkgYXJyYXk6IGB0cmFuc2Zvcm1SZXNwb25zZTogW11gXG4gKiAgIC0gKipgY2FjaGVgKiog4oCTIGB7Ym9vbGVhbnxDYWNoZX1gIOKAkyBBIGJvb2xlYW4gdmFsdWUgb3Igb2JqZWN0IGNyZWF0ZWQgd2l0aFxuICogICAgIHtAbGluayBuZy4kY2FjaGVGYWN0b3J5IGAkY2FjaGVGYWN0b3J5YH0gdG8gZW5hYmxlIG9yIGRpc2FibGUgY2FjaGluZyBvZiB0aGUgSFRUUCByZXNwb25zZS5cbiAqICAgICBTZWUge0BsaW5rICRodHRwI2NhY2hpbmcgJGh0dHAgQ2FjaGluZ30gZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKiAgIC0gKipgdGltZW91dGAqKiDigJMgYHtudW1iZXJ9YCDigJMgVGltZW91dCBpbiBtaWxsaXNlY29uZHMuPGJyIC8+XG4gKiAgICAgKipOb3RlOioqIEluIGNvbnRyYXN0IHRvIHtAbGluayBuZy4kaHR0cCN1c2FnZSAkaHR0cC5jb25maWd9LCB7QGxpbmsgbmcuJHEgcHJvbWlzZXN9IGFyZVxuICogICAgICoqbm90Kiogc3VwcG9ydGVkIGluIGAkcmVzb3VyY2VgLCBiZWNhdXNlIHRoZSBzYW1lIHZhbHVlIHdvdWxkIGJlIHVzZWQgZm9yIG11bHRpcGxlIHJlcXVlc3RzLlxuICogICAgIElmIHlvdSBhcmUgbG9va2luZyBmb3IgYSB3YXkgdG8gY2FuY2VsIHJlcXVlc3RzLCB5b3Ugc2hvdWxkIHVzZSB0aGUgYGNhbmNlbGxhYmxlYCBvcHRpb24uXG4gKiAgIC0gKipgY2FuY2VsbGFibGVgKiog4oCTIGB7Ym9vbGVhbn1gIOKAkyBJZiB0cnVlLCB0aGUgcmVxdWVzdCBtYWRlIGJ5IGEgXCJub24taW5zdGFuY2VcIiBjYWxsIHdpbGwgYmVcbiAqICAgICBjYW5jZWxsZWQgKGlmIG5vdCBhbHJlYWR5IGNvbXBsZXRlZCkgYnkgY2FsbGluZyBgJGNhbmNlbFJlcXVlc3QoKWAgb24gdGhlIGNhbGwncyByZXR1cm5cbiAqICAgICB2YWx1ZS4gQ2FsbGluZyBgJGNhbmNlbFJlcXVlc3QoKWAgZm9yIGEgbm9uLWNhbmNlbGxhYmxlIG9yIGFuIGFscmVhZHkgY29tcGxldGVkL2NhbmNlbGxlZFxuICogICAgIHJlcXVlc3Qgd2lsbCBoYXZlIG5vIGVmZmVjdC5cbiAqICAgLSAqKmB3aXRoQ3JlZGVudGlhbHNgKiog4oCTIGB7Ym9vbGVhbn1gIOKAkyBXaGV0aGVyIHRvIHNldCB0aGUgYHdpdGhDcmVkZW50aWFsc2AgZmxhZyBvbiB0aGVcbiAqICAgICBYSFIgb2JqZWN0LiBTZWVcbiAqICAgICBbWE1MSHR0cFJlcXVlc3Qud2l0aENyZWRlbnRpYWxzXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvWE1MSHR0cFJlcXVlc3Qvd2l0aENyZWRlbnRpYWxzKVxuICogICAgIGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogICAtICoqYHJlc3BvbnNlVHlwZWAqKiDigJMgYHtzdHJpbmd9YCDigJMgU2VlXG4gKiAgICAgW1hNTEh0dHBSZXF1ZXN0LnJlc3BvbnNlVHlwZV0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L3Jlc3BvbnNlVHlwZSkuXG4gKiAgIC0gKipgaW50ZXJjZXB0b3JgKiog4oCTIGB7T2JqZWN0PX1gIOKAkyBUaGUgaW50ZXJjZXB0b3Igb2JqZWN0IGhhcyBmb3VyIG9wdGlvbmFsIG1ldGhvZHMgLVxuICogICAgIGByZXF1ZXN0YCwgYHJlcXVlc3RFcnJvcmAsIGByZXNwb25zZWAsIGFuZCBgcmVzcG9uc2VFcnJvcmAuIFNlZVxuICogICAgIHtAbGluayBuZy4kaHR0cCNpbnRlcmNlcHRvcnMgJGh0dHAgaW50ZXJjZXB0b3JzfSBmb3IgZGV0YWlscy4gTm90ZSB0aGF0XG4gKiAgICAgYHJlcXVlc3RgL2ByZXF1ZXN0RXJyb3JgIGludGVyY2VwdG9ycyBhcmUgYXBwbGllZCBiZWZvcmUgY2FsbGluZyBgJGh0dHBgLCB0aHVzIGJlZm9yZSBhbnlcbiAqICAgICBnbG9iYWwgYCRodHRwYCBpbnRlcmNlcHRvcnMuIEFsc28sIHJlamVjdGluZyBvciB0aHJvd2luZyBhbiBlcnJvciBpbnNpZGUgdGhlIGByZXF1ZXN0YFxuICogICAgIGludGVyY2VwdG9yIHdpbGwgcmVzdWx0IGluIGNhbGxpbmcgdGhlIGByZXNwb25zZUVycm9yYCBpbnRlcmNlcHRvci5cbiAqICAgICBUaGUgcmVzb3VyY2UgaW5zdGFuY2Ugb3IgY29sbGVjdGlvbiBpcyBhdmFpbGFibGUgb24gdGhlIGByZXNvdXJjZWAgcHJvcGVydHkgb2YgdGhlXG4gKiAgICAgYGh0dHAgcmVzcG9uc2VgIG9iamVjdCBwYXNzZWQgdG8gYHJlc3BvbnNlYC9gcmVzcG9uc2VFcnJvcmAgaW50ZXJjZXB0b3JzLlxuICogICAgIEtlZXAgaW4gbWluZCB0aGF0IHRoZSBhc3NvY2lhdGVkIHByb21pc2Ugd2lsbCBiZSByZXNvbHZlZCB3aXRoIHRoZSB2YWx1ZSByZXR1cm5lZCBieSB0aGVcbiAqICAgICByZXNwb25zZSBpbnRlcmNlcHRvcnMuIE1ha2Ugc3VyZSB5b3UgcmV0dXJuIGFuIGFwcHJvcHJpYXRlIHZhbHVlIGFuZCBub3QgdGhlIGByZXNwb25zZWBcbiAqICAgICBvYmplY3QgcGFzc2VkIGFzIGlucHV0LiBGb3IgcmVmZXJlbmNlLCB0aGUgZGVmYXVsdCBgcmVzcG9uc2VgIGludGVyY2VwdG9yICh3aGljaCBnZXRzIGFwcGxpZWRcbiAqICAgICBpZiB5b3UgZG9uJ3Qgc3BlY2lmeSBhIGN1c3RvbSBvbmUpIHJldHVybnMgYHJlc3BvbnNlLnJlc291cmNlYC48YnIgLz5cbiAqICAgICBTZWUge0BsaW5rIG5nUmVzb3VyY2UuJHJlc291cmNlI3VzaW5nLWludGVyY2VwdG9ycyBiZWxvd30gZm9yIGFuIGV4YW1wbGUgb2YgdXNpbmdcbiAqICAgICBpbnRlcmNlcHRvcnMgaW4gYCRyZXNvdXJjZWAuXG4gKiAgIC0gKipgaGFzQm9keWAqKiDigJMgYHtib29sZWFufWAg4oCTIElmIHRydWUsIHRoZW4gdGhlIHJlcXVlc3Qgd2lsbCBoYXZlIGEgYm9keS5cbiAqICAgICBJZiBub3Qgc3BlY2lmaWVkLCB0aGVuIG9ubHkgUE9TVCwgUFVUIGFuZCBQQVRDSCByZXF1ZXN0cyB3aWxsIGhhdmUgYSBib2R5LiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBIYXNoIHdpdGggY3VzdG9tIHNldHRpbmdzIHRoYXQgc2hvdWxkIGV4dGVuZCB0aGVcbiAqICAgZGVmYXVsdCBgJHJlc291cmNlUHJvdmlkZXJgIGJlaGF2aW9yLiAgVGhlIHN1cHBvcnRlZCBvcHRpb25zIGFyZTpcbiAqXG4gKiAgIC0gKipgc3RyaXBUcmFpbGluZ1NsYXNoZXNgKiog4oCTIHtib29sZWFufSDigJMgSWYgdHJ1ZSB0aGVuIHRoZSB0cmFpbGluZ1xuICogICBzbGFzaGVzIGZyb20gYW55IGNhbGN1bGF0ZWQgVVJMIHdpbGwgYmUgc3RyaXBwZWQuIChEZWZhdWx0cyB0byB0cnVlLilcbiAqICAgLSAqKmBjYW5jZWxsYWJsZWAqKiDigJMge2Jvb2xlYW59IOKAkyBJZiB0cnVlLCB0aGUgcmVxdWVzdCBtYWRlIGJ5IGEgXCJub24taW5zdGFuY2VcIiBjYWxsIHdpbGwgYmVcbiAqICAgY2FuY2VsbGVkIChpZiBub3QgYWxyZWFkeSBjb21wbGV0ZWQpIGJ5IGNhbGxpbmcgYCRjYW5jZWxSZXF1ZXN0KClgIG9uIHRoZSBjYWxsJ3MgcmV0dXJuIHZhbHVlLlxuICogICBUaGlzIGNhbiBiZSBvdmVyd3JpdHRlbiBwZXIgYWN0aW9uLiAoRGVmYXVsdHMgdG8gZmFsc2UuKVxuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9IEEgcmVzb3VyY2UgXCJjbGFzc1wiIG9iamVjdCB3aXRoIG1ldGhvZHMgZm9yIHRoZSBkZWZhdWx0IHNldCBvZiByZXNvdXJjZSBhY3Rpb25zXG4gKiAgIG9wdGlvbmFsbHkgZXh0ZW5kZWQgd2l0aCBjdXN0b20gYGFjdGlvbnNgLiBUaGUgZGVmYXVsdCBzZXQgY29udGFpbnMgdGhlc2UgYWN0aW9uczpcbiAqICAgYGBganNcbiAqICAge1xuICogICAgICdnZXQnOiAgICB7bWV0aG9kOiAnR0VUJ30sXG4gKiAgICAgJ3NhdmUnOiAgIHttZXRob2Q6ICdQT1NUJ30sXG4gKiAgICAgJ3F1ZXJ5JzogIHttZXRob2Q6ICdHRVQnLCBpc0FycmF5OiB0cnVlfSxcbiAqICAgICAncmVtb3ZlJzoge21ldGhvZDogJ0RFTEVURSd9LFxuICogICAgICdkZWxldGUnOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAqICAgfVxuICogICBgYGBcbiAqXG4gKiAgIENhbGxpbmcgdGhlc2UgbWV0aG9kcyBpbnZva2Uge0BsaW5rIG5nLiRodHRwfSB3aXRoIHRoZSBzcGVjaWZpZWQgaHR0cCBtZXRob2QsIGRlc3RpbmF0aW9uIGFuZFxuICogICBwYXJhbWV0ZXJzLiBXaGVuIHRoZSBkYXRhIGlzIHJldHVybmVkIGZyb20gdGhlIHNlcnZlciB0aGVuIHRoZSBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlXG4gKiAgIHJlc291cmNlIGNsYXNzLiBUaGUgYWN0aW9ucyBgc2F2ZWAsIGByZW1vdmVgIGFuZCBgZGVsZXRlYCBhcmUgYXZhaWxhYmxlIG9uIGl0IGFzIG1ldGhvZHMgd2l0aFxuICogICB0aGUgYCRgIHByZWZpeC4gVGhpcyBhbGxvd3MgeW91IHRvIGVhc2lseSBwZXJmb3JtIENSVUQgb3BlcmF0aW9ucyAoY3JlYXRlLCByZWFkLCB1cGRhdGUsXG4gKiAgIGRlbGV0ZSkgb24gc2VydmVyLXNpZGUgZGF0YSBsaWtlIHRoaXM6XG4gKiAgIGBgYGpzXG4gKiAgIHZhciBVc2VyID0gJHJlc291cmNlKCcvdXNlci86dXNlcklkJywge3VzZXJJZDogJ0BpZCd9KTtcbiAqICAgVXNlci5nZXQoe3VzZXJJZDogMTIzfSkuJHByb21pc2UudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gKiAgICAgdXNlci5hYmMgPSB0cnVlO1xuICogICAgIHVzZXIuJHNhdmUoKTtcbiAqICAgfSk7XG4gKiAgIGBgYFxuICpcbiAqICAgSXQgaXMgaW1wb3J0YW50IHRvIHJlYWxpemUgdGhhdCBpbnZva2luZyBhIGAkcmVzb3VyY2VgIG9iamVjdCBtZXRob2QgaW1tZWRpYXRlbHkgcmV0dXJucyBhblxuICogICBlbXB0eSByZWZlcmVuY2UgKG9iamVjdCBvciBhcnJheSBkZXBlbmRpbmcgb24gYGlzQXJyYXlgKS4gT25jZSB0aGUgZGF0YSBpcyByZXR1cm5lZCBmcm9tIHRoZVxuICogICBzZXJ2ZXIgdGhlIGV4aXN0aW5nIHJlZmVyZW5jZSBpcyBwb3B1bGF0ZWQgd2l0aCB0aGUgYWN0dWFsIGRhdGEuIFRoaXMgaXMgYSB1c2VmdWwgdHJpY2sgc2luY2VcbiAqICAgdXN1YWxseSB0aGUgcmVzb3VyY2UgaXMgYXNzaWduZWQgdG8gYSBtb2RlbCB3aGljaCBpcyB0aGVuIHJlbmRlcmVkIGJ5IHRoZSB2aWV3LiBIYXZpbmcgYW4gZW1wdHlcbiAqICAgb2JqZWN0IHJlc3VsdHMgaW4gbm8gcmVuZGVyaW5nLCBvbmNlIHRoZSBkYXRhIGFycml2ZXMgZnJvbSB0aGUgc2VydmVyIHRoZW4gdGhlIG9iamVjdCBpc1xuICogICBwb3B1bGF0ZWQgd2l0aCB0aGUgZGF0YSBhbmQgdGhlIHZpZXcgYXV0b21hdGljYWxseSByZS1yZW5kZXJzIGl0c2VsZiBzaG93aW5nIHRoZSBuZXcgZGF0YS4gVGhpc1xuICogICBtZWFucyB0aGF0IGluIG1vc3QgY2FzZXMgb25lIG5ldmVyIGhhcyB0byB3cml0ZSBhIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgYWN0aW9uIG1ldGhvZHMuXG4gKlxuICogICBUaGUgYWN0aW9uIG1ldGhvZHMgb24gdGhlIGNsYXNzIG9iamVjdCBvciBpbnN0YW5jZSBvYmplY3QgY2FuIGJlIGludm9rZWQgd2l0aCB0aGUgZm9sbG93aW5nXG4gKiAgIHBhcmFtZXRlcnM6XG4gKlxuICogICAtIFwiY2xhc3NcIiBhY3Rpb25zIHdpdGhvdXQgYSBib2R5OiBgUmVzb3VyY2UuYWN0aW9uKFtwYXJhbWV0ZXJzXSwgW3N1Y2Nlc3NdLCBbZXJyb3JdKWBcbiAqICAgLSBcImNsYXNzXCIgYWN0aW9ucyB3aXRoIGEgYm9keTogYFJlc291cmNlLmFjdGlvbihbcGFyYW1ldGVyc10sIHBvc3REYXRhLCBbc3VjY2Vzc10sIFtlcnJvcl0pYFxuICogICAtIGluc3RhbmNlIGFjdGlvbnM6IGBpbnN0YW5jZS4kYWN0aW9uKFtwYXJhbWV0ZXJzXSwgW3N1Y2Nlc3NdLCBbZXJyb3JdKWBcbiAqXG4gKlxuICogICBXaGVuIGNhbGxpbmcgaW5zdGFuY2UgbWV0aG9kcywgdGhlIGluc3RhbmNlIGl0c2VsZiBpcyB1c2VkIGFzIHRoZSByZXF1ZXN0IGJvZHkgKGlmIHRoZSBhY3Rpb25cbiAqICAgc2hvdWxkIGhhdmUgYSBib2R5KS4gQnkgZGVmYXVsdCwgb25seSBhY3Rpb25zIHVzaW5nIGBQT1NUYCwgYFBVVGAgb3IgYFBBVENIYCBoYXZlIHJlcXVlc3RcbiAqICAgYm9kaWVzLCBidXQgeW91IGNhbiB1c2UgdGhlIGBoYXNCb2R5YCBjb25maWd1cmF0aW9uIG9wdGlvbiB0byBzcGVjaWZ5IHdoZXRoZXIgYW4gYWN0aW9uXG4gKiAgIHNob3VsZCBoYXZlIGEgYm9keSBvciBub3QgKHJlZ2FyZGxlc3Mgb2YgaXRzIEhUVFAgbWV0aG9kKS5cbiAqXG4gKlxuICogICBTdWNjZXNzIGNhbGxiYWNrIGlzIGNhbGxlZCB3aXRoICh2YWx1ZSAoT2JqZWN0fEFycmF5KSwgcmVzcG9uc2VIZWFkZXJzIChGdW5jdGlvbiksXG4gKiAgIHN0YXR1cyAobnVtYmVyKSwgc3RhdHVzVGV4dCAoc3RyaW5nKSkgYXJndW1lbnRzLCB3aGVyZSBgdmFsdWVgIGlzIHRoZSBwb3B1bGF0ZWQgcmVzb3VyY2VcbiAqICAgaW5zdGFuY2Ugb3IgY29sbGVjdGlvbiBvYmplY3QuIFRoZSBlcnJvciBjYWxsYmFjayBpcyBjYWxsZWQgd2l0aCAoaHR0cFJlc3BvbnNlKSBhcmd1bWVudC5cbiAqXG4gKiAgIENsYXNzIGFjdGlvbnMgcmV0dXJuIGFuIGVtcHR5IGluc3RhbmNlICh3aXRoIHRoZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgbGlzdGVkIGJlbG93KS5cbiAqICAgSW5zdGFuY2UgYWN0aW9ucyByZXR1cm4gYSBwcm9taXNlIGZvciB0aGUgb3BlcmF0aW9uLlxuICpcbiAqICAgVGhlIFJlc291cmNlIGluc3RhbmNlcyBhbmQgY29sbGVjdGlvbnMgaGF2ZSB0aGVzZSBhZGRpdGlvbmFsIHByb3BlcnRpZXM6XG4gKlxuICogICAtIGAkcHJvbWlzZWA6IFRoZSB7QGxpbmsgbmcuJHEgcHJvbWlzZX0gb2YgdGhlIG9yaWdpbmFsIHNlcnZlciBpbnRlcmFjdGlvbiB0aGF0IGNyZWF0ZWQgdGhpc1xuICogICAgIGluc3RhbmNlIG9yIGNvbGxlY3Rpb24uXG4gKlxuICogICAgIE9uIHN1Y2Nlc3MsIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkIHdpdGggdGhlIHNhbWUgcmVzb3VyY2UgaW5zdGFuY2Ugb3IgY29sbGVjdGlvbiBvYmplY3QsXG4gKiAgICAgdXBkYXRlZCB3aXRoIGRhdGEgZnJvbSBzZXJ2ZXIuIFRoaXMgbWFrZXMgaXQgZWFzeSB0byB1c2UgaW4gdGhlXG4gKiAgICAge0BsaW5rIG5nUm91dGUuJHJvdXRlUHJvdmlkZXIgYHJlc29sdmVgIHNlY3Rpb24gb2YgYCRyb3V0ZVByb3ZpZGVyLndoZW4oKWB9IHRvIGRlZmVyIHZpZXdcbiAqICAgICByZW5kZXJpbmcgdW50aWwgdGhlIHJlc291cmNlKHMpIGFyZSBsb2FkZWQuXG4gKlxuICogICAgIE9uIGZhaWx1cmUsIHRoZSBwcm9taXNlIGlzIHJlamVjdGVkIHdpdGggdGhlIHtAbGluayBuZy4kaHR0cCBodHRwIHJlc3BvbnNlfSBvYmplY3QuXG4gKlxuICogICAgIElmIGFuIGludGVyY2VwdG9yIG9iamVjdCB3YXMgcHJvdmlkZWQsIHRoZSBwcm9taXNlIHdpbGwgaW5zdGVhZCBiZSByZXNvbHZlZCB3aXRoIHRoZSB2YWx1ZVxuICogICAgIHJldHVybmVkIGJ5IHRoZSByZXNwb25zZSBpbnRlcmNlcHRvciAob24gc3VjY2Vzcykgb3IgcmVzcG9uY2VFcnJvciBpbnRlcmNlcHRvciAob24gZmFpbHVyZSkuXG4gKlxuICogICAtIGAkcmVzb2x2ZWRgOiBgdHJ1ZWAgYWZ0ZXIgZmlyc3Qgc2VydmVyIGludGVyYWN0aW9uIGlzIGNvbXBsZXRlZCAoZWl0aGVyIHdpdGggc3VjY2VzcyBvclxuICogICAgICByZWplY3Rpb24pLCBgZmFsc2VgIGJlZm9yZSB0aGF0LiBLbm93aW5nIGlmIHRoZSBSZXNvdXJjZSBoYXMgYmVlbiByZXNvbHZlZCBpcyB1c2VmdWwgaW5cbiAqICAgICAgZGF0YS1iaW5kaW5nLiBJZiB0aGVyZSBpcyBhIHJlc3BvbnNlL3Jlc3BvbnNlRXJyb3IgaW50ZXJjZXB0b3IgYW5kIGl0IHJldHVybnMgYSBwcm9taXNlLFxuICogICAgICBgJHJlc29sdmVkYCB3aWxsIHdhaXQgZm9yIHRoYXQgdG9vLlxuICpcbiAqICAgVGhlIFJlc291cmNlIGluc3RhbmNlcyBhbmQgY29sbGVjdGlvbnMgaGF2ZSB0aGVzZSBhZGRpdGlvbmFsIG1ldGhvZHM6XG4gKlxuICogICAtIGAkY2FuY2VsUmVxdWVzdGA6IElmIHRoZXJlIGlzIGEgY2FuY2VsbGFibGUsIHBlbmRpbmcgcmVxdWVzdCByZWxhdGVkIHRvIHRoZSBpbnN0YW5jZSBvclxuICogICAgICBjb2xsZWN0aW9uLCBjYWxsaW5nIHRoaXMgbWV0aG9kIHdpbGwgYWJvcnQgdGhlIHJlcXVlc3QuXG4gKlxuICogICBUaGUgUmVzb3VyY2UgaW5zdGFuY2VzIGhhdmUgdGhlc2UgYWRkaXRpb25hbCBtZXRob2RzOlxuICpcbiAqICAgLSBgdG9KU09OYDogSXQgcmV0dXJucyBhIHNpbXBsZSBvYmplY3Qgd2l0aG91dCBhbnkgb2YgdGhlIGV4dHJhIHByb3BlcnRpZXMgYWRkZWQgYXMgcGFydCBvZlxuICogICAgIHRoZSBSZXNvdXJjZSBBUEkuIFRoaXMgb2JqZWN0IGNhbiBiZSBzZXJpYWxpemVkIHRocm91Z2gge0BsaW5rIGFuZ3VsYXIudG9Kc29ufSBzYWZlbHlcbiAqICAgICB3aXRob3V0IGF0dGFjaGluZyBBbmd1bGFySlMtc3BlY2lmaWMgZmllbGRzLiBOb3RpY2UgdGhhdCBgSlNPTi5zdHJpbmdpZnlgIChhbmRcbiAqICAgICBgYW5ndWxhci50b0pzb25gKSBhdXRvbWF0aWNhbGx5IHVzZSB0aGlzIG1ldGhvZCB3aGVuIHNlcmlhbGl6aW5nIGEgUmVzb3VyY2UgaW5zdGFuY2VcbiAqICAgICAoc2VlIFtNRE5dKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0pTT04vc3RyaW5naWZ5I3RvSlNPTiUyOCUyOV9iZWhhdmlvcikpLlxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogIyMjIEJhc2ljIHVzYWdlXG4gKlxuICAgYGBganNcbiAgICAgLy8gRGVmaW5lIGEgQ3JlZGl0Q2FyZCBjbGFzc1xuICAgICB2YXIgQ3JlZGl0Q2FyZCA9ICRyZXNvdXJjZSgnL3VzZXJzLzp1c2VySWQvY2FyZHMvOmNhcmRJZCcsXG4gICAgICAge3VzZXJJZDogMTIzLCBjYXJkSWQ6ICdAaWQnfSwge1xuICAgICAgICAgY2hhcmdlOiB7bWV0aG9kOiAnUE9TVCcsIHBhcmFtczoge2NoYXJnZTogdHJ1ZX19XG4gICAgICAgfSk7XG5cbiAgICAgLy8gV2UgY2FuIHJldHJpZXZlIGEgY29sbGVjdGlvbiBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAgdmFyIGNhcmRzID0gQ3JlZGl0Q2FyZC5xdWVyeSgpO1xuICAgICAgICAgLy8gR0VUOiAvdXNlcnMvMTIzL2NhcmRzXG4gICAgICAgICAvLyBzZXJ2ZXIgcmV0dXJuczogW3tpZDogNDU2LCBudW1iZXI6ICcxMjM0JywgbmFtZTogJ1NtaXRoJ31dXG5cbiAgICAgLy8gV2FpdCBmb3IgdGhlIHJlcXVlc3QgdG8gY29tcGxldGVcbiAgICAgY2FyZHMuJHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICB2YXIgY2FyZCA9IGNhcmRzWzBdO1xuXG4gICAgICAgLy8gRWFjaCBpdGVtIGlzIGFuIGluc3RhbmNlIG9mIENyZWRpdENhcmRcbiAgICAgICBleHBlY3QoY2FyZCBpbnN0YW5jZW9mIENyZWRpdENhcmQpLnRvRXF1YWwodHJ1ZSk7XG5cbiAgICAgICAvLyBOb24tR0VUIG1ldGhvZHMgYXJlIG1hcHBlZCBvbnRvIHRoZSBpbnN0YW5jZXNcbiAgICAgICBjYXJkLm5hbWUgPSAnSi4gU21pdGgnO1xuICAgICAgIGNhcmQuJHNhdmUoKTtcbiAgICAgICAgICAgLy8gUE9TVDogL3VzZXJzLzEyMy9jYXJkcy80NTYge2lkOiA0NTYsIG51bWJlcjogJzEyMzQnLCBuYW1lOiAnSi4gU21pdGgnfVxuICAgICAgICAgICAvLyBzZXJ2ZXIgcmV0dXJuczoge2lkOiA0NTYsIG51bWJlcjogJzEyMzQnLCBuYW1lOiAnSi4gU21pdGgnfVxuXG4gICAgICAgLy8gT3VyIGN1c3RvbSBtZXRob2QgaXMgbWFwcGVkIGFzIHdlbGwgKHNpbmNlIGl0IHVzZXMgUE9TVClcbiAgICAgICBjYXJkLiRjaGFyZ2Uoe2Ftb3VudDogOS45OX0pO1xuICAgICAgICAgICAvLyBQT1NUOiAvdXNlcnMvMTIzL2NhcmRzLzQ1Nj9hbW91bnQ9OS45OSZjaGFyZ2U9dHJ1ZSB7aWQ6IDQ1NiwgbnVtYmVyOiAnMTIzNCcsIG5hbWU6ICdKLiBTbWl0aCd9XG4gICAgIH0pO1xuXG4gICAgIC8vIFdlIGNhbiBjcmVhdGUgYW4gaW5zdGFuY2UgYXMgd2VsbFxuICAgICB2YXIgbmV3Q2FyZCA9IG5ldyBDcmVkaXRDYXJkKHtudW1iZXI6ICcwMTIzJ30pO1xuICAgICBuZXdDYXJkLm5hbWUgPSAnTWlrZSBTbWl0aCc7XG5cbiAgICAgdmFyIHNhdmVQcm9taXNlID0gbmV3Q2FyZC4kc2F2ZSgpO1xuICAgICAgICAgLy8gUE9TVDogL3VzZXJzLzEyMy9jYXJkcyB7bnVtYmVyOiAnMDEyMycsIG5hbWU6ICdNaWtlIFNtaXRoJ31cbiAgICAgICAgIC8vIHNlcnZlciByZXR1cm5zOiB7aWQ6IDc4OSwgbnVtYmVyOiAnMDEyMycsIG5hbWU6ICdNaWtlIFNtaXRoJ31cblxuICAgICBzYXZlUHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgIC8vIE9uY2UgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQsIHRoZSBjcmVhdGVkIGluc3RhbmNlXG4gICAgICAgLy8gaXMgcG9wdWxhdGVkIHdpdGggdGhlIGRhdGEgcmV0dXJuZWQgYnkgdGhlIHNlcnZlclxuICAgICAgIGV4cGVjdChuZXdDYXJkLmlkKS50b0VxdWFsKDc4OSk7XG4gICAgIH0pO1xuICAgYGBgXG4gKlxuICogVGhlIG9iamVjdCByZXR1cm5lZCBmcm9tIGEgY2FsbCB0byBgJHJlc291cmNlYCBpcyBhIHJlc291cmNlIFwiY2xhc3NcIiB3aGljaCBoYXMgb25lIFwic3RhdGljXCJcbiAqIG1ldGhvZCBmb3IgZWFjaCBhY3Rpb24gaW4gdGhlIGRlZmluaXRpb24uXG4gKlxuICogQ2FsbGluZyB0aGVzZSBtZXRob2RzIGludm9rZXMgYCRodHRwYCBvbiB0aGUgYHVybGAgdGVtcGxhdGUgd2l0aCB0aGUgZ2l2ZW4gSFRUUCBgbWV0aG9kYCxcbiAqIGBwYXJhbXNgIGFuZCBgaGVhZGVyc2AuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAjIyMgQWNjZXNzaW5nIHRoZSByZXNwb25zZVxuICpcbiAqIFdoZW4gdGhlIGRhdGEgaXMgcmV0dXJuZWQgZnJvbSB0aGUgc2VydmVyIHRoZW4gdGhlIG9iamVjdCBpcyBhbiBpbnN0YW5jZSBvZiB0aGUgcmVzb3VyY2UgdHlwZSBhbmRcbiAqIGFsbCBvZiB0aGUgbm9uLUdFVCBtZXRob2RzIGFyZSBhdmFpbGFibGUgd2l0aCBgJGAgcHJlZml4LiBUaGlzIGFsbG93cyB5b3UgdG8gZWFzaWx5IHN1cHBvcnQgQ1JVRFxuICogb3BlcmF0aW9ucyAoY3JlYXRlLCByZWFkLCB1cGRhdGUsIGRlbGV0ZSkgb24gc2VydmVyLXNpZGUgZGF0YS5cbiAqXG4gICBgYGBqc1xuICAgICB2YXIgVXNlciA9ICRyZXNvdXJjZSgnL3VzZXJzLzp1c2VySWQnLCB7dXNlcklkOiAnQGlkJ30pO1xuICAgICBVc2VyLmdldCh7dXNlcklkOiAxMjN9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHVzZXIpIHtcbiAgICAgICB1c2VyLmFiYyA9IHRydWU7XG4gICAgICAgdXNlci4kc2F2ZSgpO1xuICAgICB9KTtcbiAgIGBgYFxuICpcbiAqIEl0J3Mgd29ydGggbm90aW5nIHRoYXQgdGhlIHN1Y2Nlc3MgY2FsbGJhY2sgZm9yIGBnZXRgLCBgcXVlcnlgIGFuZCBvdGhlciBtZXRob2RzIGdldHMgY2FsbGVkIHdpdGhcbiAqIHRoZSByZXNvdXJjZSBpbnN0YW5jZSAocG9wdWxhdGVkIHdpdGggdGhlIGRhdGEgdGhhdCBjYW1lIGZyb20gdGhlIHNlcnZlcikgYXMgd2VsbCBhcyBhbiBgJGh0dHBgXG4gKiBoZWFkZXIgZ2V0dGVyIGZ1bmN0aW9uLCB0aGUgSFRUUCBzdGF0dXMgY29kZSBhbmQgdGhlIHJlc3BvbnNlIHN0YXR1cyB0ZXh0LiBTbyBvbmUgY291bGQgcmV3cml0ZVxuICogdGhlIGFib3ZlIGV4YW1wbGUgYW5kIGdldCBhY2Nlc3MgdG8gSFRUUCBoZWFkZXJzIGFzIGZvbGxvd3M6XG4gKlxuICAgYGBganNcbiAgICAgdmFyIFVzZXIgPSAkcmVzb3VyY2UoJy91c2Vycy86dXNlcklkJywge3VzZXJJZDogJ0BpZCd9KTtcbiAgICAgVXNlci5nZXQoe3VzZXJJZDogMTIzfSwgZnVuY3Rpb24odXNlciwgZ2V0UmVzcG9uc2VIZWFkZXJzKSB7XG4gICAgICAgdXNlci5hYmMgPSB0cnVlO1xuICAgICAgIHVzZXIuJHNhdmUoZnVuY3Rpb24odXNlciwgcHV0UmVzcG9uc2VIZWFkZXJzKSB7XG4gICAgICAgICAvLyBgdXNlcmAgPT4gc2F2ZWQgYFVzZXJgIG9iamVjdFxuICAgICAgICAgLy8gYHB1dFJlc3BvbnNlSGVhZGVyc2AgPT4gYCRodHRwYCBoZWFkZXIgZ2V0dGVyXG4gICAgICAgfSk7XG4gICAgIH0pO1xuICAgYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAjIyMgQ3JlYXRpbmcgY3VzdG9tIGFjdGlvbnNcbiAqXG4gKiBJbiB0aGlzIGV4YW1wbGUgd2UgY3JlYXRlIGEgY3VzdG9tIG1ldGhvZCBvbiBvdXIgcmVzb3VyY2UgdG8gbWFrZSBhIFBVVCByZXF1ZXN0OlxuICpcbiAgIGBgYGpzXG4gICAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFsnbmdSZXNvdXJjZSddKTtcblxuICAgICAgLy8gU29tZSBBUElzIGV4cGVjdCBhIFBVVCByZXF1ZXN0IGluIHRoZSBmb3JtYXQgVVJML29iamVjdC9JRFxuICAgICAgLy8gSGVyZSB3ZSBhcmUgY3JlYXRpbmcgYW4gJ3VwZGF0ZScgbWV0aG9kXG4gICAgICBhcHAuZmFjdG9yeSgnTm90ZXMnLCBbJyRyZXNvdXJjZScsIGZ1bmN0aW9uKCRyZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gJHJlc291cmNlKCcvbm90ZXMvOmlkJywge2lkOiAnQGlkJ30sIHtcbiAgICAgICAgICB1cGRhdGU6IHttZXRob2Q6ICdQVVQnfVxuICAgICAgICB9KTtcbiAgICAgIH1dKTtcblxuICAgICAgLy8gSW4gb3VyIGNvbnRyb2xsZXIgd2UgZ2V0IHRoZSBJRCBmcm9tIHRoZSBVUkwgdXNpbmcgYCRsb2NhdGlvbmBcbiAgICAgIGFwcC5jb250cm9sbGVyKCdOb3Rlc0N0cmwnLCBbJyRsb2NhdGlvbicsICdOb3RlcycsIGZ1bmN0aW9uKCRsb2NhdGlvbiwgTm90ZXMpIHtcbiAgICAgICAgLy8gRmlyc3QsIHJldHJpZXZlIHRoZSBjb3JyZXNwb25kaW5nIGBOb3RlYCBvYmplY3QgZnJvbSB0aGUgc2VydmVyXG4gICAgICAgIC8vIChBc3N1bWluZyBhIFVSTCBvZiB0aGUgZm9ybSBgLi4uL25vdGVzP2lkPVhZWmApXG4gICAgICAgIHZhciBub3RlSWQgPSAkbG9jYXRpb24uc2VhcmNoKCkuaWQ7XG4gICAgICAgIHZhciBub3RlID0gTm90ZXMuZ2V0KHtpZDogbm90ZUlkfSk7XG5cbiAgICAgICAgbm90ZS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIG5vdGUuY29udGVudCA9ICdIZWxsbywgd29ybGQhJztcblxuICAgICAgICAgIC8vIE5vdyBjYWxsIGB1cGRhdGVgIHRvIHNhdmUgdGhlIGNoYW5nZXMgb24gdGhlIHNlcnZlclxuICAgICAgICAgIE5vdGVzLnVwZGF0ZShub3RlKTtcbiAgICAgICAgICAgICAgLy8gVGhpcyB3aWxsIFBVVCAvbm90ZXMvSUQgd2l0aCB0aGUgbm90ZSBvYmplY3QgYXMgdGhlIHJlcXVlc3QgcGF5bG9hZFxuXG4gICAgICAgICAgLy8gU2luY2UgYHVwZGF0ZWAgaXMgYSBub24tR0VUIG1ldGhvZCwgaXQgd2lsbCBhbHNvIGJlIGF2YWlsYWJsZSBvbiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAvLyAocHJlZml4ZWQgd2l0aCBgJGApLCBzbyB3ZSBjb3VsZCByZXBsYWNlIHRoZSBgTm90ZS51cGRhdGUoKWAgY2FsbCB3aXRoOlxuICAgICAgICAgIC8vbm90ZS4kdXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfV0pO1xuICAgYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAjIyMgQ2FuY2VsbGluZyByZXF1ZXN0c1xuICpcbiAqIElmIGFuIGFjdGlvbidzIGNvbmZpZ3VyYXRpb24gc3BlY2lmaWVzIHRoYXQgaXQgaXMgY2FuY2VsbGFibGUsIHlvdSBjYW4gY2FuY2VsIHRoZSByZXF1ZXN0IHJlbGF0ZWRcbiAqIHRvIGFuIGluc3RhbmNlIG9yIGNvbGxlY3Rpb24gKGFzIGxvbmcgYXMgaXQgaXMgYSByZXN1bHQgb2YgYSBcIm5vbi1pbnN0YW5jZVwiIGNhbGwpOlxuICpcbiAgIGBgYGpzXG4gICAgIC8vIC4uLmRlZmluaW5nIHRoZSBgSG90ZWxgIHJlc291cmNlLi4uXG4gICAgIHZhciBIb3RlbCA9ICRyZXNvdXJjZSgnL2FwaS9ob3RlbHMvOmlkJywge2lkOiAnQGlkJ30sIHtcbiAgICAgICAvLyBMZXQncyBtYWtlIHRoZSBgcXVlcnkoKWAgbWV0aG9kIGNhbmNlbGxhYmxlXG4gICAgICAgcXVlcnk6IHttZXRob2Q6ICdnZXQnLCBpc0FycmF5OiB0cnVlLCBjYW5jZWxsYWJsZTogdHJ1ZX1cbiAgICAgfSk7XG5cbiAgICAgLy8gLi4uc29tZXdoZXJlIGluIHRoZSBQbGFuVmFjYXRpb25Db250cm9sbGVyLi4uXG4gICAgIC4uLlxuICAgICB0aGlzLm9uRGVzdGluYXRpb25DaGFuZ2VkID0gZnVuY3Rpb24gb25EZXN0aW5hdGlvbkNoYW5nZWQoZGVzdGluYXRpb24pIHtcbiAgICAgICAvLyBXZSBkb24ndCBjYXJlIGFib3V0IGFueSBwZW5kaW5nIHJlcXVlc3QgZm9yIGhvdGVsc1xuICAgICAgIC8vIGluIGEgZGlmZmVyZW50IGRlc3RpbmF0aW9uIGFueSBtb3JlXG4gICAgICAgaWYgKHRoaXMuYXZhaWxhYmxlSG90ZWxzKSB7XG4gICAgICAgICB0aGlzLmF2YWlsYWJsZUhvdGVscy4kY2FuY2VsUmVxdWVzdCgpO1xuICAgICAgIH1cblxuICAgICAgIC8vIExldCdzIHF1ZXJ5IGZvciBob3RlbHMgaW4gYGRlc3RpbmF0aW9uYFxuICAgICAgIC8vIChjYWxsczogL2FwaS9ob3RlbHM/bG9jYXRpb249PGRlc3RpbmF0aW9uPilcbiAgICAgICB0aGlzLmF2YWlsYWJsZUhvdGVscyA9IEhvdGVsLnF1ZXJ5KHtsb2NhdGlvbjogZGVzdGluYXRpb259KTtcbiAgICAgfTtcbiAgIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogIyMjIFVzaW5nIGludGVyY2VwdG9yc1xuICpcbiAqIFlvdSBjYW4gdXNlIGludGVyY2VwdG9ycyB0byB0cmFuc2Zvcm0gdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2UsIHBlcmZvcm0gYWRkaXRpb25hbCBvcGVyYXRpb25zLCBhbmRcbiAqIG1vZGlmeSB0aGUgcmV0dXJuZWQgaW5zdGFuY2UvY29sbGVjdGlvbi4gVGhlIGZvbGxvd2luZyBleGFtcGxlLCB1c2VzIGByZXF1ZXN0YCBhbmQgYHJlc3BvbnNlYFxuICogaW50ZXJjZXB0b3JzIHRvIGF1Z21lbnQgdGhlIHJldHVybmVkIGluc3RhbmNlIHdpdGggYWRkaXRpb25hbCBpbmZvOlxuICpcbiAgIGBgYGpzXG4gICAgIHZhciBUaGluZyA9ICRyZXNvdXJjZSgnL2FwaS90aGluZ3MvOmlkJywge2lkOiAnQGlkJ30sIHtcbiAgICAgICBzYXZlOiB7XG4gICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgIGludGVyY2VwdG9yOiB7XG4gICAgICAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKGNvbmZpZykge1xuICAgICAgICAgICAgIC8vIEJlZm9yZSB0aGUgcmVxdWVzdCBpcyBzZW50IG91dCwgc3RvcmUgYSB0aW1lc3RhbXAgb24gdGhlIHJlcXVlc3QgY29uZmlnXG4gICAgICAgICAgICAgY29uZmlnLnJlcXVlc3RUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgICAgIH0sXG4gICAgICAgICAgIHJlc3BvbnNlOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgIC8vIEdldCB0aGUgaW5zdGFuY2UgZnJvbSB0aGUgcmVzcG9uc2Ugb2JqZWN0XG4gICAgICAgICAgICAgdmFyIGluc3RhbmNlID0gcmVzcG9uc2UucmVzb3VyY2U7XG5cbiAgICAgICAgICAgICAvLyBBdWdtZW50IHRoZSBpbnN0YW5jZSB3aXRoIGEgY3VzdG9tIGBzYXZlTGF0ZW5jeWAgcHJvcGVydHksIGNvbXB1dGVkIGFzIHRoZSB0aW1lXG4gICAgICAgICAgICAgLy8gYmV0d2VlbiBzZW5kaW5nIHRoZSByZXF1ZXN0IGFuZCByZWNlaXZpbmcgdGhlIHJlc3BvbnNlLlxuICAgICAgICAgICAgIGluc3RhbmNlLnNhdmVMYXRlbmN5ID0gRGF0ZS5ub3coKSAtIHJlc3BvbnNlLmNvbmZpZy5yZXF1ZXN0VGltZXN0YW1wO1xuXG4gICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBpbnN0YW5jZVxuICAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICAgICAgICAgfVxuICAgICAgICAgfVxuICAgICAgIH1cbiAgICAgfSk7XG5cbiAgICAgVGhpbmcuc2F2ZSh7Zm9vOiAnYmFyJ30pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24odGhpbmcpIHtcbiAgICAgICBjb25zb2xlLmxvZygnVGhhdCB0aGluZyB3YXMgc2F2ZWQgaW4gJyArIHRoaW5nLnNhdmVMYXRlbmN5ICsgJ21zLicpO1xuICAgICB9KTtcbiAgIGBgYFxuICpcbiAqL1xuYW5ndWxhci5tb2R1bGUoJ25nUmVzb3VyY2UnLCBbJ25nJ10pLlxuICBpbmZvKHsgYW5ndWxhclZlcnNpb246ICcxLjcuOCcgfSkuXG4gIHByb3ZpZGVyKCckcmVzb3VyY2UnLCBmdW5jdGlvbiBSZXNvdXJjZVByb3ZpZGVyKCkge1xuICAgIHZhciBQUk9UT0NPTF9BTkRfSVBWNl9SRUdFWCA9IC9eaHR0cHM/OlxcL1xcL1xcW1teXFxdXSpdW14vXSovO1xuXG4gICAgdmFyIHByb3ZpZGVyID0gdGhpcztcblxuICAgIC8qKlxuICAgICAqIEBuZ2RvYyBwcm9wZXJ0eVxuICAgICAqIEBuYW1lICRyZXNvdXJjZVByb3ZpZGVyI2RlZmF1bHRzXG4gICAgICogQGRlc2NyaXB0aW9uXG4gICAgICogT2JqZWN0IGNvbnRhaW5pbmcgZGVmYXVsdCBvcHRpb25zIHVzZWQgd2hlbiBjcmVhdGluZyBgJHJlc291cmNlYCBpbnN0YW5jZXMuXG4gICAgICpcbiAgICAgKiBUaGUgZGVmYXVsdCB2YWx1ZXMgc2F0aXNmeSBhIHdpZGUgcmFuZ2Ugb2YgdXNlY2FzZXMsIGJ1dCB5b3UgbWF5IGNob29zZSB0byBvdmVyd3JpdGUgYW55IG9mXG4gICAgICogdGhlbSB0byBmdXJ0aGVyIGN1c3RvbWl6ZSB5b3VyIGluc3RhbmNlcy4gVGhlIGF2YWlsYWJsZSBwcm9wZXJ0aWVzIGFyZTpcbiAgICAgKlxuICAgICAqIC0gKipzdHJpcFRyYWlsaW5nU2xhc2hlcyoqIOKAkyBge2Jvb2xlYW59YCDigJMgSWYgdHJ1ZSwgdGhlbiB0aGUgdHJhaWxpbmcgc2xhc2hlcyBmcm9tIGFueVxuICAgICAqICAgY2FsY3VsYXRlZCBVUkwgd2lsbCBiZSBzdHJpcHBlZC48YnIgLz5cbiAgICAgKiAgIChEZWZhdWx0cyB0byB0cnVlLilcbiAgICAgKiAtICoqY2FuY2VsbGFibGUqKiDigJMgYHtib29sZWFufWAg4oCTIElmIHRydWUsIHRoZSByZXF1ZXN0IG1hZGUgYnkgYSBcIm5vbi1pbnN0YW5jZVwiIGNhbGwgd2lsbCBiZVxuICAgICAqICAgY2FuY2VsbGVkIChpZiBub3QgYWxyZWFkeSBjb21wbGV0ZWQpIGJ5IGNhbGxpbmcgYCRjYW5jZWxSZXF1ZXN0KClgIG9uIHRoZSBjYWxsJ3MgcmV0dXJuXG4gICAgICogICB2YWx1ZS4gRm9yIG1vcmUgZGV0YWlscywgc2VlIHtAbGluayBuZ1Jlc291cmNlLiRyZXNvdXJjZX0uIFRoaXMgY2FuIGJlIG92ZXJ3cml0dGVuIHBlclxuICAgICAqICAgcmVzb3VyY2UgY2xhc3Mgb3IgYWN0aW9uLjxiciAvPlxuICAgICAqICAgKERlZmF1bHRzIHRvIGZhbHNlLilcbiAgICAgKiAtICoqYWN0aW9ucyoqIC0gYHtPYmplY3QuPE9iamVjdD59YCAtIEEgaGFzaCB3aXRoIGRlZmF1bHQgYWN0aW9ucyBkZWNsYXJhdGlvbnMuIEFjdGlvbnMgYXJlXG4gICAgICogICBoaWdoLWxldmVsIG1ldGhvZHMgY29ycmVzcG9uZGluZyB0byBSRVNUZnVsIGFjdGlvbnMvbWV0aG9kcyBvbiByZXNvdXJjZXMuIEFuIGFjdGlvbiBtYXlcbiAgICAgKiAgIHNwZWNpZnkgd2hhdCBIVFRQIG1ldGhvZCB0byB1c2UsIHdoYXQgVVJMIHRvIGhpdCwgaWYgdGhlIHJldHVybiB2YWx1ZSB3aWxsIGJlIGEgc2luZ2xlXG4gICAgICogICBvYmplY3Qgb3IgYSBjb2xsZWN0aW9uIChhcnJheSkgb2Ygb2JqZWN0cyBldGMuIEZvciBtb3JlIGRldGFpbHMsIHNlZVxuICAgICAqICAge0BsaW5rIG5nUmVzb3VyY2UuJHJlc291cmNlfS4gVGhlIGFjdGlvbnMgY2FuIGFsc28gYmUgZW5oYW5jZWQgb3Igb3ZlcndyaXR0ZW4gcGVyIHJlc291cmNlXG4gICAgICogICBjbGFzcy48YnIgLz5cbiAgICAgKiAgIFRoZSBkZWZhdWx0IGFjdGlvbnMgYXJlOlxuICAgICAqICAgYGBganNcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgZ2V0OiB7bWV0aG9kOiAnR0VUJ30sXG4gICAgICogICAgIHNhdmU6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICogICAgIHF1ZXJ5OiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZX0sXG4gICAgICogICAgIHJlbW92ZToge21ldGhvZDogJ0RFTEVURSd9LFxuICAgICAqICAgICBkZWxldGU6IHttZXRob2Q6ICdERUxFVEUnfVxuICAgICAqICAgfVxuICAgICAqICAgYGBgXG4gICAgICpcbiAgICAgKiAjIyMjIEV4YW1wbGVcbiAgICAgKlxuICAgICAqIEZvciBleGFtcGxlLCB5b3UgY2FuIHNwZWNpZnkgYSBuZXcgYHVwZGF0ZWAgYWN0aW9uIHRoYXQgdXNlcyB0aGUgYFBVVGAgSFRUUCB2ZXJiOlxuICAgICAqXG4gICAgICogYGBganNcbiAgICAgKiAgIGFuZ3VsYXIuXG4gICAgICogICAgIG1vZHVsZSgnbXlBcHAnKS5cbiAgICAgKiAgICAgY29uZmlnKFsnJHJlc291cmNlUHJvdmlkZXInLCBmdW5jdGlvbiAoJHJlc291cmNlUHJvdmlkZXIpIHtcbiAgICAgKiAgICAgICAkcmVzb3VyY2VQcm92aWRlci5kZWZhdWx0cy5hY3Rpb25zLnVwZGF0ZSA9IHtcbiAgICAgKiAgICAgICAgIG1ldGhvZDogJ1BVVCdcbiAgICAgKiAgICAgICB9O1xuICAgICAqICAgICB9XSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBPciB5b3UgY2FuIGV2ZW4gb3ZlcndyaXRlIHRoZSB3aG9sZSBgYWN0aW9uc2AgbGlzdCBhbmQgc3BlY2lmeSB5b3VyIG93bjpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogICBhbmd1bGFyLlxuICAgICAqICAgICBtb2R1bGUoJ215QXBwJykuXG4gICAgICogICAgIGNvbmZpZyhbJyRyZXNvdXJjZVByb3ZpZGVyJywgZnVuY3Rpb24gKCRyZXNvdXJjZVByb3ZpZGVyKSB7XG4gICAgICogICAgICAgJHJlc291cmNlUHJvdmlkZXIuZGVmYXVsdHMuYWN0aW9ucyA9IHtcbiAgICAgKiAgICAgICAgIGNyZWF0ZToge21ldGhvZDogJ1BPU1QnfSxcbiAgICAgKiAgICAgICAgIGdldDogICAge21ldGhvZDogJ0dFVCd9LFxuICAgICAqICAgICAgICAgZ2V0QWxsOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTp0cnVlfSxcbiAgICAgKiAgICAgICAgIHVwZGF0ZToge21ldGhvZDogJ1BVVCd9LFxuICAgICAqICAgICAgICAgZGVsZXRlOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAgICAgKiAgICAgICB9O1xuICAgICAqICAgICB9KTtcbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqL1xuICAgIHRoaXMuZGVmYXVsdHMgPSB7XG4gICAgICAvLyBTdHJpcCBzbGFzaGVzIGJ5IGRlZmF1bHRcbiAgICAgIHN0cmlwVHJhaWxpbmdTbGFzaGVzOiB0cnVlLFxuXG4gICAgICAvLyBNYWtlIG5vbi1pbnN0YW5jZSByZXF1ZXN0cyBjYW5jZWxsYWJsZSAodmlhIGAkY2FuY2VsUmVxdWVzdCgpYClcbiAgICAgIGNhbmNlbGxhYmxlOiBmYWxzZSxcblxuICAgICAgLy8gRGVmYXVsdCBhY3Rpb25zIGNvbmZpZ3VyYXRpb25cbiAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgJ2dldCc6IHttZXRob2Q6ICdHRVQnfSxcbiAgICAgICAgJ3NhdmUnOiB7bWV0aG9kOiAnUE9TVCd9LFxuICAgICAgICAncXVlcnknOiB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZX0sXG4gICAgICAgICdyZW1vdmUnOiB7bWV0aG9kOiAnREVMRVRFJ30sXG4gICAgICAgICdkZWxldGUnOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0ID0gWyckaHR0cCcsICckbG9nJywgJyRxJywgJyR0aW1lb3V0JywgZnVuY3Rpb24oJGh0dHAsICRsb2csICRxLCAkdGltZW91dCkge1xuXG4gICAgICB2YXIgbm9vcCA9IGFuZ3VsYXIubm9vcCxcbiAgICAgICAgICBmb3JFYWNoID0gYW5ndWxhci5mb3JFYWNoLFxuICAgICAgICAgIGV4dGVuZCA9IGFuZ3VsYXIuZXh0ZW5kLFxuICAgICAgICAgIGNvcHkgPSBhbmd1bGFyLmNvcHksXG4gICAgICAgICAgaXNBcnJheSA9IGFuZ3VsYXIuaXNBcnJheSxcbiAgICAgICAgICBpc0RlZmluZWQgPSBhbmd1bGFyLmlzRGVmaW5lZCxcbiAgICAgICAgICBpc0Z1bmN0aW9uID0gYW5ndWxhci5pc0Z1bmN0aW9uLFxuICAgICAgICAgIGlzTnVtYmVyID0gYW5ndWxhci5pc051bWJlcixcbiAgICAgICAgICBlbmNvZGVVcmlRdWVyeSA9IGFuZ3VsYXIuJCRlbmNvZGVVcmlRdWVyeSxcbiAgICAgICAgICBlbmNvZGVVcmlTZWdtZW50ID0gYW5ndWxhci4kJGVuY29kZVVyaVNlZ21lbnQ7XG5cbiAgICAgIGZ1bmN0aW9uIFJvdXRlKHRlbXBsYXRlLCBkZWZhdWx0cykge1xuICAgICAgICB0aGlzLnRlbXBsYXRlID0gdGVtcGxhdGU7XG4gICAgICAgIHRoaXMuZGVmYXVsdHMgPSBleHRlbmQoe30sIHByb3ZpZGVyLmRlZmF1bHRzLCBkZWZhdWx0cyk7XG4gICAgICAgIHRoaXMudXJsUGFyYW1zID0ge307XG4gICAgICB9XG5cbiAgICAgIFJvdXRlLnByb3RvdHlwZSA9IHtcbiAgICAgICAgc2V0VXJsUGFyYW1zOiBmdW5jdGlvbihjb25maWcsIHBhcmFtcywgYWN0aW9uVXJsKSB7XG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICAgICAgdXJsID0gYWN0aW9uVXJsIHx8IHNlbGYudGVtcGxhdGUsXG4gICAgICAgICAgICB2YWwsXG4gICAgICAgICAgICBlbmNvZGVkVmFsLFxuICAgICAgICAgICAgcHJvdG9jb2xBbmRJcHY2ID0gJyc7XG5cbiAgICAgICAgICB2YXIgdXJsUGFyYW1zID0gc2VsZi51cmxQYXJhbXMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICAgIGZvckVhY2godXJsLnNwbGl0KC9cXFcvKSwgZnVuY3Rpb24ocGFyYW0pIHtcbiAgICAgICAgICAgIGlmIChwYXJhbSA9PT0gJ2hhc093blByb3BlcnR5Jykge1xuICAgICAgICAgICAgICB0aHJvdyAkcmVzb3VyY2VNaW5FcnIoJ2JhZG5hbWUnLCAnaGFzT3duUHJvcGVydHkgaXMgbm90IGEgdmFsaWQgcGFyYW1ldGVyIG5hbWUuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShuZXcgUmVnRXhwKCdeXFxcXGQrJCcpLnRlc3QocGFyYW0pKSAmJiBwYXJhbSAmJlxuICAgICAgICAgICAgICAobmV3IFJlZ0V4cCgnKF58W15cXFxcXFxcXF0pOicgKyBwYXJhbSArICcoXFxcXFd8JCknKS50ZXN0KHVybCkpKSB7XG4gICAgICAgICAgICAgIHVybFBhcmFtc1twYXJhbV0gPSB7XG4gICAgICAgICAgICAgICAgaXNRdWVyeVBhcmFtVmFsdWU6IChuZXcgUmVnRXhwKCdcXFxcPy4qPTonICsgcGFyYW0gKyAnKD86XFxcXFd8JCknKSkudGVzdCh1cmwpXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL1xcXFw6L2csICc6Jyk7XG4gICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoUFJPVE9DT0xfQU5EX0lQVjZfUkVHRVgsIGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICAgICAgICBwcm90b2NvbEFuZElwdjYgPSBtYXRjaDtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgICAgICBmb3JFYWNoKHNlbGYudXJsUGFyYW1zLCBmdW5jdGlvbihwYXJhbUluZm8sIHVybFBhcmFtKSB7XG4gICAgICAgICAgICB2YWwgPSBwYXJhbXMuaGFzT3duUHJvcGVydHkodXJsUGFyYW0pID8gcGFyYW1zW3VybFBhcmFtXSA6IHNlbGYuZGVmYXVsdHNbdXJsUGFyYW1dO1xuICAgICAgICAgICAgaWYgKGlzRGVmaW5lZCh2YWwpICYmIHZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICBpZiAocGFyYW1JbmZvLmlzUXVlcnlQYXJhbVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZW5jb2RlZFZhbCA9IGVuY29kZVVyaVF1ZXJ5KHZhbCwgdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZW5jb2RlZFZhbCA9IGVuY29kZVVyaVNlZ21lbnQodmFsKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShuZXcgUmVnRXhwKCc6JyArIHVybFBhcmFtICsgJyhcXFxcV3wkKScsICdnJyksIGZ1bmN0aW9uKG1hdGNoLCBwMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBlbmNvZGVkVmFsICsgcDE7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UobmV3IFJlZ0V4cCgnKC8/KTonICsgdXJsUGFyYW0gKyAnKFxcXFxXfCQpJywgJ2cnKSwgZnVuY3Rpb24obWF0Y2gsXG4gICAgICAgICAgICAgICAgICBsZWFkaW5nU2xhc2hlcywgdGFpbCkge1xuICAgICAgICAgICAgICAgIGlmICh0YWlsLmNoYXJBdCgwKSA9PT0gJy8nKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdGFpbDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGxlYWRpbmdTbGFzaGVzICsgdGFpbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gc3RyaXAgdHJhaWxpbmcgc2xhc2hlcyBhbmQgc2V0IHRoZSB1cmwgKHVubGVzcyB0aGlzIGJlaGF2aW9yIGlzIHNwZWNpZmljYWxseSBkaXNhYmxlZClcbiAgICAgICAgICBpZiAoc2VsZi5kZWZhdWx0cy5zdHJpcFRyYWlsaW5nU2xhc2hlcykge1xuICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL1xcLyskLywgJycpIHx8ICcvJztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDb2xsYXBzZSBgLy5gIGlmIGZvdW5kIGluIHRoZSBsYXN0IFVSTCBwYXRoIHNlZ21lbnQgYmVmb3JlIHRoZSBxdWVyeS5cbiAgICAgICAgICAvLyBFLmcuIGBodHRwOi8vdXJsLmNvbS9pZC8uZm9ybWF0P3E9eGAgYmVjb21lcyBgaHR0cDovL3VybC5jb20vaWQuZm9ybWF0P3E9eGAuXG4gICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoL1xcL1xcLig/PVxcdysoJHxcXD8pKS8sICcuJyk7XG4gICAgICAgICAgLy8gUmVwbGFjZSBlc2NhcGVkIGAvXFwuYCB3aXRoIGAvLmAuXG4gICAgICAgICAgLy8gKElmIGBcXC5gIGNvbWVzIGZyb20gYSBwYXJhbSB2YWx1ZSwgaXQgd2lsbCBiZSBlbmNvZGVkIGFzIGAlNUMuYC4pXG4gICAgICAgICAgY29uZmlnLnVybCA9IHByb3RvY29sQW5kSXB2NiArIHVybC5yZXBsYWNlKC9cXC8oXFxcXHwlNUMpXFwuLywgJy8uJyk7XG5cblxuICAgICAgICAgIC8vIHNldCBwYXJhbXMgLSBkZWxlZ2F0ZSBwYXJhbSBlbmNvZGluZyB0byAkaHR0cFxuICAgICAgICAgIGZvckVhY2gocGFyYW1zLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBpZiAoIXNlbGYudXJsUGFyYW1zW2tleV0pIHtcbiAgICAgICAgICAgICAgY29uZmlnLnBhcmFtcyA9IGNvbmZpZy5wYXJhbXMgfHwge307XG4gICAgICAgICAgICAgIGNvbmZpZy5wYXJhbXNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG5cbiAgICAgIGZ1bmN0aW9uIHJlc291cmNlRmFjdG9yeSh1cmwsIHBhcmFtRGVmYXVsdHMsIGFjdGlvbnMsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHJvdXRlID0gbmV3IFJvdXRlKHVybCwgb3B0aW9ucyk7XG5cbiAgICAgICAgYWN0aW9ucyA9IGV4dGVuZCh7fSwgcHJvdmlkZXIuZGVmYXVsdHMuYWN0aW9ucywgYWN0aW9ucyk7XG5cbiAgICAgICAgZnVuY3Rpb24gZXh0cmFjdFBhcmFtcyhkYXRhLCBhY3Rpb25QYXJhbXMpIHtcbiAgICAgICAgICB2YXIgaWRzID0ge307XG4gICAgICAgICAgYWN0aW9uUGFyYW1zID0gZXh0ZW5kKHt9LCBwYXJhbURlZmF1bHRzLCBhY3Rpb25QYXJhbXMpO1xuICAgICAgICAgIGZvckVhY2goYWN0aW9uUGFyYW1zLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHsgdmFsdWUgPSB2YWx1ZShkYXRhKTsgfVxuICAgICAgICAgICAgaWRzW2tleV0gPSB2YWx1ZSAmJiB2YWx1ZS5jaGFyQXQgJiYgdmFsdWUuY2hhckF0KDApID09PSAnQCcgP1xuICAgICAgICAgICAgICBsb29rdXBEb3R0ZWRQYXRoKGRhdGEsIHZhbHVlLnN1YnN0cigxKSkgOiB2YWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gaWRzO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGVmYXVsdFJlc3BvbnNlSW50ZXJjZXB0b3IocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UucmVzb3VyY2U7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBSZXNvdXJjZSh2YWx1ZSkge1xuICAgICAgICAgIHNoYWxsb3dDbGVhckFuZENvcHkodmFsdWUgfHwge30sIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgUmVzb3VyY2UucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBkYXRhID0gZXh0ZW5kKHt9LCB0aGlzKTtcbiAgICAgICAgICBkZWxldGUgZGF0YS4kcHJvbWlzZTtcbiAgICAgICAgICBkZWxldGUgZGF0YS4kcmVzb2x2ZWQ7XG4gICAgICAgICAgZGVsZXRlIGRhdGEuJGNhbmNlbFJlcXVlc3Q7XG4gICAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgICAgIH07XG5cbiAgICAgICAgZm9yRWFjaChhY3Rpb25zLCBmdW5jdGlvbihhY3Rpb24sIG5hbWUpIHtcbiAgICAgICAgICB2YXIgaGFzQm9keSA9IGFjdGlvbi5oYXNCb2R5ID09PSB0cnVlIHx8IChhY3Rpb24uaGFzQm9keSAhPT0gZmFsc2UgJiYgL14oUE9TVHxQVVR8UEFUQ0gpJC9pLnRlc3QoYWN0aW9uLm1ldGhvZCkpO1xuICAgICAgICAgIHZhciBudW1lcmljVGltZW91dCA9IGFjdGlvbi50aW1lb3V0O1xuICAgICAgICAgIHZhciBjYW5jZWxsYWJsZSA9IGlzRGVmaW5lZChhY3Rpb24uY2FuY2VsbGFibGUpID9cbiAgICAgICAgICAgICAgYWN0aW9uLmNhbmNlbGxhYmxlIDogcm91dGUuZGVmYXVsdHMuY2FuY2VsbGFibGU7XG5cbiAgICAgICAgICBpZiAobnVtZXJpY1RpbWVvdXQgJiYgIWlzTnVtYmVyKG51bWVyaWNUaW1lb3V0KSkge1xuICAgICAgICAgICAgJGxvZy5kZWJ1ZygnbmdSZXNvdXJjZTpcXG4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgJyAgT25seSBudW1lcmljIHZhbHVlcyBhcmUgYWxsb3dlZCBhcyBgdGltZW91dGAuXFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIFByb21pc2VzIGFyZSBub3Qgc3VwcG9ydGVkIGluICRyZXNvdXJjZSwgYmVjYXVzZSB0aGUgc2FtZSB2YWx1ZSB3b3VsZCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ2JlIHVzZWQgZm9yIG11bHRpcGxlIHJlcXVlc3RzLiBJZiB5b3UgYXJlIGxvb2tpbmcgZm9yIGEgd2F5IHRvIGNhbmNlbCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ3JlcXVlc3RzLCB5b3Ugc2hvdWxkIHVzZSB0aGUgYGNhbmNlbGxhYmxlYCBvcHRpb24uJyk7XG4gICAgICAgICAgICBkZWxldGUgYWN0aW9uLnRpbWVvdXQ7XG4gICAgICAgICAgICBudW1lcmljVGltZW91dCA9IG51bGw7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgUmVzb3VyY2VbbmFtZV0gPSBmdW5jdGlvbihhMSwgYTIsIGEzLCBhNCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtcyA9IHt9LCBkYXRhLCBvblN1Y2Nlc3MsIG9uRXJyb3I7XG5cbiAgICAgICAgICAgIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgb25FcnJvciA9IGE0O1xuICAgICAgICAgICAgICAgIG9uU3VjY2VzcyA9IGEzO1xuICAgICAgICAgICAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oYTIpKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihhMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb25TdWNjZXNzID0gYTE7XG4gICAgICAgICAgICAgICAgICAgIG9uRXJyb3IgPSBhMjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcyA9IGEyO1xuICAgICAgICAgICAgICAgICAgb25FcnJvciA9IGEzO1xuICAgICAgICAgICAgICAgICAgLy8gZmFsbHMgdGhyb3VnaFxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBwYXJhbXMgPSBhMTtcbiAgICAgICAgICAgICAgICAgIGRhdGEgPSBhMjtcbiAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcyA9IGEzO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGExKSkgb25TdWNjZXNzID0gYTE7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFzQm9keSkgZGF0YSA9IGExO1xuICAgICAgICAgICAgICAgIGVsc2UgcGFyYW1zID0gYTE7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgMDogYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhyb3cgJHJlc291cmNlTWluRXJyKCdiYWRhcmdzJyxcbiAgICAgICAgICAgICAgICAgICdFeHBlY3RlZCB1cCB0byA0IGFyZ3VtZW50cyBbcGFyYW1zLCBkYXRhLCBzdWNjZXNzLCBlcnJvcl0sIGdvdCB7MH0gYXJndW1lbnRzJyxcbiAgICAgICAgICAgICAgICAgIGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgaXNJbnN0YW5jZUNhbGwgPSB0aGlzIGluc3RhbmNlb2YgUmVzb3VyY2U7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBpc0luc3RhbmNlQ2FsbCA/IGRhdGEgOiAoYWN0aW9uLmlzQXJyYXkgPyBbXSA6IG5ldyBSZXNvdXJjZShkYXRhKSk7XG4gICAgICAgICAgICB2YXIgaHR0cENvbmZpZyA9IHt9O1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RJbnRlcmNlcHRvciA9IGFjdGlvbi5pbnRlcmNlcHRvciAmJiBhY3Rpb24uaW50ZXJjZXB0b3IucmVxdWVzdCB8fCB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgcmVxdWVzdEVycm9ySW50ZXJjZXB0b3IgPSBhY3Rpb24uaW50ZXJjZXB0b3IgJiYgYWN0aW9uLmludGVyY2VwdG9yLnJlcXVlc3RFcnJvciB8fFxuICAgICAgICAgICAgICB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VJbnRlcmNlcHRvciA9IGFjdGlvbi5pbnRlcmNlcHRvciAmJiBhY3Rpb24uaW50ZXJjZXB0b3IucmVzcG9uc2UgfHxcbiAgICAgICAgICAgICAgZGVmYXVsdFJlc3BvbnNlSW50ZXJjZXB0b3I7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2VFcnJvckludGVyY2VwdG9yID0gYWN0aW9uLmludGVyY2VwdG9yICYmIGFjdGlvbi5pbnRlcmNlcHRvci5yZXNwb25zZUVycm9yIHx8XG4gICAgICAgICAgICAgICRxLnJlamVjdDtcbiAgICAgICAgICAgIHZhciBzdWNjZXNzQ2FsbGJhY2sgPSBvblN1Y2Nlc3MgPyBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgICAgb25TdWNjZXNzKHZhbCwgcmVzcG9uc2UuaGVhZGVycywgcmVzcG9uc2Uuc3RhdHVzLCByZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgICAgICAgICAgIH0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgZXJyb3JDYWxsYmFjayA9IG9uRXJyb3IgfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIHRpbWVvdXREZWZlcnJlZDtcbiAgICAgICAgICAgIHZhciBudW1lcmljVGltZW91dFByb21pc2U7XG4gICAgICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgICAgIGZvckVhY2goYWN0aW9uLCBmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGh0dHBDb25maWdba2V5XSA9IGNvcHkodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGFyYW1zJzpcbiAgICAgICAgICAgICAgICBjYXNlICdpc0FycmF5JzpcbiAgICAgICAgICAgICAgICBjYXNlICdpbnRlcmNlcHRvcic6XG4gICAgICAgICAgICAgICAgY2FzZSAnY2FuY2VsbGFibGUnOlxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIWlzSW5zdGFuY2VDYWxsICYmIGNhbmNlbGxhYmxlKSB7XG4gICAgICAgICAgICAgIHRpbWVvdXREZWZlcnJlZCA9ICRxLmRlZmVyKCk7XG4gICAgICAgICAgICAgIGh0dHBDb25maWcudGltZW91dCA9IHRpbWVvdXREZWZlcnJlZC5wcm9taXNlO1xuXG4gICAgICAgICAgICAgIGlmIChudW1lcmljVGltZW91dCkge1xuICAgICAgICAgICAgICAgIG51bWVyaWNUaW1lb3V0UHJvbWlzZSA9ICR0aW1lb3V0KHRpbWVvdXREZWZlcnJlZC5yZXNvbHZlLCBudW1lcmljVGltZW91dCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGhhc0JvZHkpIGh0dHBDb25maWcuZGF0YSA9IGRhdGE7XG4gICAgICAgICAgICByb3V0ZS5zZXRVcmxQYXJhbXMoaHR0cENvbmZpZyxcbiAgICAgICAgICAgICAgZXh0ZW5kKHt9LCBleHRyYWN0UGFyYW1zKGRhdGEsIGFjdGlvbi5wYXJhbXMgfHwge30pLCBwYXJhbXMpLFxuICAgICAgICAgICAgICBhY3Rpb24udXJsKTtcblxuICAgICAgICAgICAgLy8gU3RhcnQgdGhlIHByb21pc2UgY2hhaW5cbiAgICAgICAgICAgIHZhciBwcm9taXNlID0gJHEuXG4gICAgICAgICAgICAgIHJlc29sdmUoaHR0cENvbmZpZykuXG4gICAgICAgICAgICAgIHRoZW4ocmVxdWVzdEludGVyY2VwdG9yKS5cbiAgICAgICAgICAgICAgY2F0Y2gocmVxdWVzdEVycm9ySW50ZXJjZXB0b3IpLlxuICAgICAgICAgICAgICB0aGVuKCRodHRwKTtcblxuICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2UudGhlbihmdW5jdGlvbihyZXNwKSB7XG4gICAgICAgICAgICAgIHZhciBkYXRhID0gcmVzcC5kYXRhO1xuXG4gICAgICAgICAgICAgIGlmIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgLy8gTmVlZCB0byBjb252ZXJ0IGFjdGlvbi5pc0FycmF5IHRvIGJvb2xlYW4gaW4gY2FzZSBpdCBpcyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShkYXRhKSAhPT0gKCEhYWN0aW9uLmlzQXJyYXkpKSB7XG4gICAgICAgICAgICAgICAgICB0aHJvdyAkcmVzb3VyY2VNaW5FcnIoJ2JhZGNmZycsXG4gICAgICAgICAgICAgICAgICAgICAgJ0Vycm9yIGluIHJlc291cmNlIGNvbmZpZ3VyYXRpb24gZm9yIGFjdGlvbiBgezB9YC4gRXhwZWN0ZWQgcmVzcG9uc2UgdG8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgJ2NvbnRhaW4gYW4gezF9IGJ1dCBnb3QgYW4gezJ9IChSZXF1ZXN0OiB7M30gezR9KScsIG5hbWUsIGFjdGlvbi5pc0FycmF5ID8gJ2FycmF5JyA6ICdvYmplY3QnLFxuICAgICAgICAgICAgICAgICAgICBpc0FycmF5KGRhdGEpID8gJ2FycmF5JyA6ICdvYmplY3QnLCBodHRwQ29uZmlnLm1ldGhvZCwgaHR0cENvbmZpZy51cmwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYWN0aW9uLmlzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgIHZhbHVlLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICBmb3JFYWNoKGRhdGEsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2gobmV3IFJlc291cmNlKGl0ZW0pKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZCBKU09OIHZhbHVlcyBtYXkgYmUgc3RyaW5nIGxpdGVyYWxzLCBhbmQgdGhlc2Ugc2hvdWxkIG5vdCBiZSBjb252ZXJ0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAvLyBpbnRvIG9iamVjdHMuIFRoZXNlIGl0ZW1zIHdpbGwgbm90IGhhdmUgYWNjZXNzIHRvIHRoZSBSZXNvdXJjZSBwcm90b3R5cGVcbiAgICAgICAgICAgICAgICAgICAgICAvLyBtZXRob2RzLCBidXQgdW5mb3J0dW5hdGVseSB0aGVyZVxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9IHZhbHVlLiRwcm9taXNlOyAgICAgLy8gU2F2ZSB0aGUgcHJvbWlzZVxuICAgICAgICAgICAgICAgICAgc2hhbGxvd0NsZWFyQW5kQ29weShkYXRhLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICB2YWx1ZS4kcHJvbWlzZSA9IHByb21pc2U7ICAgICAgICAgLy8gUmVzdG9yZSB0aGUgcHJvbWlzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJlc3AucmVzb3VyY2UgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZXNwO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VJbnRlcmNlcHRvcihyZXNwKTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKHJlamVjdGlvbk9yUmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgcmVqZWN0aW9uT3JSZXNwb25zZS5yZXNvdXJjZSA9IHZhbHVlO1xuICAgICAgICAgICAgICByZXNwb25zZSA9IHJlamVjdGlvbk9yUmVzcG9uc2U7XG4gICAgICAgICAgICAgIHJldHVybiByZXNwb25zZUVycm9ySW50ZXJjZXB0b3IocmVqZWN0aW9uT3JSZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcHJvbWlzZSA9IHByb21pc2VbJ2ZpbmFsbHknXShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaWYgKCFpc0luc3RhbmNlQ2FsbCAmJiBjYW5jZWxsYWJsZSkge1xuICAgICAgICAgICAgICAgIHZhbHVlLiRjYW5jZWxSZXF1ZXN0ID0gbm9vcDtcbiAgICAgICAgICAgICAgICAkdGltZW91dC5jYW5jZWwobnVtZXJpY1RpbWVvdXRQcm9taXNlKTtcbiAgICAgICAgICAgICAgICB0aW1lb3V0RGVmZXJyZWQgPSBudW1lcmljVGltZW91dFByb21pc2UgPSBodHRwQ29uZmlnLnRpbWVvdXQgPSBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gUnVuIHRoZSBgc3VjY2Vzc2AvYGVycm9yYCBjYWxsYmFja3MsIGJ1dCBkbyBub3QgbGV0IHRoZW0gYWZmZWN0IHRoZSByZXR1cm5lZCBwcm9taXNlLlxuICAgICAgICAgICAgcHJvbWlzZS50aGVuKHN1Y2Nlc3NDYWxsYmFjaywgZXJyb3JDYWxsYmFjayk7XG5cbiAgICAgICAgICAgIGlmICghaXNJbnN0YW5jZUNhbGwpIHtcbiAgICAgICAgICAgICAgLy8gd2UgYXJlIGNyZWF0aW5nIGluc3RhbmNlIC8gY29sbGVjdGlvblxuICAgICAgICAgICAgICAvLyAtIHNldCB0aGUgaW5pdGlhbCBwcm9taXNlXG4gICAgICAgICAgICAgIC8vIC0gcmV0dXJuIHRoZSBpbnN0YW5jZSAvIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgdmFsdWUuJHByb21pc2UgPSBwcm9taXNlO1xuICAgICAgICAgICAgICB2YWx1ZS4kcmVzb2x2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgaWYgKGNhbmNlbGxhYmxlKSB2YWx1ZS4kY2FuY2VsUmVxdWVzdCA9IGNhbmNlbFJlcXVlc3Q7XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpbnN0YW5jZSBjYWxsXG4gICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcblxuICAgICAgICAgICAgZnVuY3Rpb24gY2FuY2VsUmVxdWVzdCh2YWx1ZSkge1xuICAgICAgICAgICAgICBwcm9taXNlLmNhdGNoKG5vb3ApO1xuICAgICAgICAgICAgICBpZiAodGltZW91dERlZmVycmVkICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGltZW91dERlZmVycmVkLnJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcblxuXG4gICAgICAgICAgUmVzb3VyY2UucHJvdG90eXBlWyckJyArIG5hbWVdID0gZnVuY3Rpb24ocGFyYW1zLCBzdWNjZXNzLCBlcnJvcikge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24ocGFyYW1zKSkge1xuICAgICAgICAgICAgICBlcnJvciA9IHN1Y2Nlc3M7IHN1Y2Nlc3MgPSBwYXJhbXM7IHBhcmFtcyA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFJlc291cmNlW25hbWVdLmNhbGwodGhpcywgcGFyYW1zLCB0aGlzLCBzdWNjZXNzLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LiRwcm9taXNlIHx8IHJlc3VsdDtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUmVzb3VyY2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXNvdXJjZUZhY3Rvcnk7XG4gICAgfV07XG4gIH0pO1xuXG5cbn0pKHdpbmRvdywgd2luZG93LmFuZ3VsYXIpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yZXNvdXJjZS9hbmd1bGFyLXJlc291cmNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcImFsZ28tY29udGFpbmVyXFxcIiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgbGF5b3V0LWFsaWduPVxcXCJzdGFydCBjZW50ZXJcXFwiIG1kLXRoZW1lPVxcXCJhbGdvXFxcIiBhcC1tZC1jb2xvcj1cXFwieydiYWNrZ3JvdW5kLWNvbG9yJzogJ2FsZ286OnByaW1hcnknfVxcXCI+XFxyXFxuICAgIDxtZC10YWJzIG1kLWJvcmRlci1ib3R0b20gbWQtc2VsZWN0ZWQ9XFxcInZtLmFjdGl2ZVRhYkluZGV4XFxcIj5cXHJcXG4gICAgICAgIDxtZC10YWIgbGFiZWw9XFxcIlZSUFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxnby13cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHZycC1kcmF3PjwvdnJwLWRyYXc+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L21kLXRhYj5cXHJcXG4gICAgICAgIDxtZC10YWIgbGFiZWw9XFxcIlRTUFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxnby13cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPHJvdXRlLWRyYXc+PC9yb3V0ZS1kcmF3PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9tZC10YWI+XFxyXFxuICAgICAgICA8bWQtdGFiIGxhYmVsPVxcXCJrLU1lYW5zXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLXdyYXBwZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ay1tZWFuPjwvay1tZWFuPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9tZC10YWI+XFxyXFxuICAgICAgICA8bWQtdGFiIGxhYmVsPVxcXCJEQlNDQU5cXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZ28td3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkYnNjYW4+PC9kYnNjYW4+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L21kLXRhYj5cXHJcXG4gICAgPC9tZC10YWJzPlxcclxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvdGVtcGxhdGVzL2FsZ28uaHRtbFxuLy8gbW9kdWxlIGlkID0gNzYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hcGktcmVxdWVzdHMuanNcIjogNzYyLFxuXHRcIi4vbWQtY29uc3RhbnRzLmpzXCI6IDc2M1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDc2MTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb25zdGFudHMgLitcXC5qcyRcbi8vIG1vZHVsZSBpZCA9IDc2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLmNvbnN0YW50KCdhcGlSZXF1ZXN0Q29uZmlnJywge1xyXG5cclxuICAgIH0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb25zdGFudHMvYXBpLXJlcXVlc3RzLmpzXG4vLyBtb2R1bGUgaWQgPSA3NjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAxMi4wOS4yMDE2LlxyXG4gKiBNYXRlcmlhbCBEZXNpZ24gY29uc3RhbnRzXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLmNvbnN0YW50KCdtZENvbnN0YW50cycsIHtcclxuICAgICAgICBhdmF0YXJTaXplOiA0MCxcclxuICAgICAgICBwYWRkaW5nU2l6ZTogMTYsXHJcbiAgICAgICAgc3RkVGV4dENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjg3KSdcclxuICAgIH0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb25zdGFudHMvbWQtY29uc3RhbnRzLmpzXG4vLyBtb2R1bGUgaWQgPSA3NjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL3JvdXRlLWNvbnRyb2xsZXIuanNcIjogNzY1XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNzY0O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbnRyb2xsZXJzIC4rXFwuanMkXG4vLyBtb2R1bGUgaWQgPSA3NjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5jb250cm9sbGVyKCdSb3V0ZUNvbnRyb2xsZXInLCBSb3V0ZUNvbnRyb2xsZXIpO1xyXG4gICAgUm91dGVDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIFJvdXRlQ29udHJvbGxlciAoJHNjb3BlKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVUYWJJbmRleCA9IDA7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1JvdXRlIEN0cmwgaW5pdCcpXHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29udHJvbGxlcnMvcm91dGUtY29udHJvbGxlci5qc1xuLy8gbW9kdWxlIGlkID0gNzY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hcC1tZC1jb2xvci5qc1wiOiA3NjcsXG5cdFwiLi9yZXNpemVyLmpzXCI6IDc2OFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDc2NjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzIC4rXFwuanMkXG4vLyBtb2R1bGUgaWQgPSA3NjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgcGFzdG9yIG9uIDYvMjUvMjAxNi5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuZGlyZWN0aXZlKCdhcE1kQ29sb3InLCBhcE1kQ29sb3JEaXJlY3RpdmUpO1xyXG4gICAgYXBNZENvbG9yRGlyZWN0aXZlLiRpbmplY3QgPSBbJyRtZFRoZW1pbmcnLCAnJG1kQ29sb3JQYWxldHRlJywgJyRjb2xvcmRlZiddO1xyXG4gICAgZnVuY3Rpb24gYXBNZENvbG9yRGlyZWN0aXZlKCRtZFRoZW1pbmcsICRtZENvbG9yUGFsZXR0ZSwgJGNvbG9yZGVmKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgLy9zY29wZToge1xyXG4gICAgICAgICAgICAvLyAgICBtZENvbG9yOiAnPWFwTWRDb2xvcidcclxuICAgICAgICAgICAgLy99LFxyXG4gICAgICAgICAgICBsaW5rOiBsaW5rXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgdmFyIHN0eWxlID0ge307XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJG1kQ29sb3JQYWxldHRlKTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkbWRUaGVtaW5nLlRIRU1FUy5kZWZhdWx0KTtcclxuICAgICAgICAgICAgdmFyIGNvbG9yID0gc2NvcGUuJGV2YWwoYXR0cnMuYXBNZENvbG9yKTtcclxuXHJcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChjb2xvciwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlW2tleV0gPSAkY29sb3JkZWYuZ2V0Q29sb3IodmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGVsZW1lbnQuY3NzKHN0eWxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2RpcmVjdGl2ZXMvYXAtbWQtY29sb3IuanNcbi8vIG1vZHVsZSBpZCA9IDc2N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDIyLjA1LjIwMTcuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5kaXJlY3RpdmUoJ3Jlc2l6ZXInLCByZXNpemVyRGlyZWN0aXZlKTtcclxuICAgIHJlc2l6ZXJEaXJlY3RpdmUuJGluamVjdCA9IFsnJHEnLCAnJHRpbWVvdXQnLCAncmVzaXplU2Vuc29yJ107XHJcbiAgICBmdW5jdGlvbiByZXNpemVyRGlyZWN0aXZlKCRxLCAkdGltZW91dCwgcmVzaXplU2Vuc29yKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgbGluazogbGlua1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgZnVuY3Rpb24gbGluayAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJzID0gcmVzaXplU2Vuc29yLmdldEluc3RhbmNlKGVsZW1lbnQucGFyZW50KCkpO1xyXG4gICAgICAgICAgICBjb25zdCBvZmZzZXQgPSBwYXJzZUludChhdHRycy5yZXNpemVyLCAxMCkgfHwgMDtcclxuXHJcbiAgICAgICAgICAgIGlzQXR0YWNoZWQoZWxlbWVudC5wYXJlbnQoKSkudGhlbigoaW5mbykgPT4ge1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2l6ZShlbGVtZW50LCBpbmZvLnJlY3Qud2lkdGgsIGluZm8ucmVjdC5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgcnMuYXR0YWNoUmVzaXplRXZlbnQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB3LCBoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGggPSBlbGVtZW50LnBhcmVudCgpWzBdLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdyA9IGVsZW1lbnQucGFyZW50KClbMF0ub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBSUyBmaXJlZDogJHt3fSB4ICR7aH1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGggJiYgIWlzTmFOKGgpICYmIGggIT09IGVsZW1lbnRbMF0ub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVTaXplKGVsZW1lbnQsIHcsIGggKyBvZmZzZXQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2NvcGUuJG9uKCckZGVzdHJveScsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHJzLmRldGFjaFJlc2l6ZUV2ZW50KCk7XHJcbiAgICAgICAgICAgICAgICBycy5xdWV1ZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlU2l6ZSAoZWwsIHcsIGgpIHtcclxuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cignc3R5bGUnKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgJ3dpZHRoJzogdyArICdweCcsXHJcbiAgICAgICAgICAgICAgICAnaGVpZ2h0JzogaCArICdweCdcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlzQXR0YWNoZWQgKGVsZW0sIGNvdW50ID0gMCkge1xyXG4gICAgICAgICAgICBsZXQgZWxlbVJlY3Q7XHJcbiAgICAgICAgICAgIHJldHVybiAkcSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1SZWN0ID0gZWxlbVswXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChlbGVtUmVjdC53aWR0aCAmJiBlbGVtUmVjdC5oZWlnaHQpIHx8IGNvdW50ID4gMTAwMDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoe3JlY3Q6IGVsZW1SZWN0LCBjb3VudDogY291bnR9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93ICdFbGVtZW50IG5vdCBpbiBET00geWV0J1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnQgPCAxMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlzQXR0YWNoZWQoZWxlbSwgY291bnQgKyAxMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjdDoge3dpZHRoOiAwLCBoZWlnaHQ6IDB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiBjb3VudFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZGlyZWN0aXZlcy9yZXNpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3Njhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL2NvbG9yLWRlZi1zZXJ2aWNlLmpzXCI6IDc3MCxcblx0XCIuL2RhdGUtdXRpbHMtcHJvdmlkZXIuanNcIjogNzcxLFxuXHRcIi4vZG91YmxlLXNlcnZpY2UuanNcIjogNzcyLFxuXHRcIi4vZXZlbnQtZW1pdHRlci1zZXJ2aWNlLmpzXCI6IDc3Myxcblx0XCIuL3Jlc2l6ZS1zZW5zb3IuanNcIjogNzc0LFxuXHRcIi4vc2xhc2gtcGFyYW0tc2VyaWFsaXplci5qc1wiOiA3NzUsXG5cdFwiLi9zdG9yYWdlLXByb3ZpZGVyLmpzXCI6IDc3NlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDc2OTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcyAuK1xcLmpzJFxuLy8gbW9kdWxlIGlkID0gNzY5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHBhc3RvciBvbiA4LzIxLzIwMTYuXHJcbiAqIFNpbXBsZSBzZXJ2aWNlIHRvIGdldCBjc3MtZm9ybWF0dGVkIGNvbG9ycyBmcm9tIG1kVGhlbWluZyBhbmQgbWRDb2xvclBhbGV0dGUnc1xyXG4gKiBWYWxpZCBzdHJpbmcgZm9ybWF0czpcclxuICogJ3BhbGV0dGU6OmxpZ2h0LWJsdWU6OkEyMDAnXHJcbiAqICdwYWxldHRlOjpyZWQ6OjIwMCdcclxuICogJ2N1c3RvbVRoZW1lOjpwcmltYXJ5J1xyXG4gKiAnY3VzdG9tVGhlbWU6OnByaW1hcnk6Omh1ZS0yJ1xyXG4gKiAnd2FybidcclxuICogJ2FjY2VudDo6aHVlLTInXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLnNlcnZpY2UoJyRjb2xvcmRlZicsIGNvbG9yRGVmU2VydmljZSk7XHJcbiAgICBjb2xvckRlZlNlcnZpY2UuJGluamVjdCA9IFsnJG1kVGhlbWluZycsICckbWRDb2xvclBhbGV0dGUnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBjb2xvckRlZlNlcnZpY2UoJG1kVGhlbWluZywgJG1kQ29sb3JQYWxldHRlKSB7XHJcbiAgICAgICAgY29uc3QgaW50ZW50aW9ucyA9IFsncHJpbWFyeScsICdhY2NlbnQnLCAnd2FybicsICdiYWNrZ3JvdW5kJ107XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UkdCID0gKGRlZlN0cmluZykgPT4ge1xyXG4gICAgICAgICAgICBkZWZTdHJpbmcgPSBkZWZTdHJpbmcgfHwgJ3ByaW1hcnknO1xyXG4gICAgICAgICAgICBjb25zdCBkZWZBcnJheSA9IGRlZlN0cmluZy5zcGxpdCgnOjonKTtcclxuICAgICAgICAgICAgY29uc3QgY29sb3JEZWYgPSB7fTtcclxuICAgICAgICAgICAgbGV0IGludGVudDtcclxuXHJcbiAgICAgICAgICAgIGlmIChkZWZBcnJheVswXSA9PT0gJ3BhbGV0dGUnKSB7XHJcbiAgICAgICAgICAgICAgICBjb2xvckRlZi5wYWxldHRlID0gZGVmQXJyYXlbMV07XHJcbiAgICAgICAgICAgICAgICBjb2xvckRlZi52YXJpYW50ID0gZGVmQXJyYXlbMl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaW50ZW50aW9ucy5pbmRleE9mKGRlZkFycmF5WzBdKSA+IC0xKSB7IC8vZGVmQXJyYXlbMF0gIT09ICdkZWZhdWx0JyB8fFxyXG4gICAgICAgICAgICAgICAgICAgIGRlZkFycmF5LnVuc2hpZnQoJ2RlZmF1bHQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghZGVmQXJyYXlbMl0pIHtcclxuICAgICAgICAgICAgICAgICAgICBkZWZBcnJheVsyXSA9ICdkZWZhdWx0JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGludGVudCA9ICRtZFRoZW1pbmcuVEhFTUVTW2RlZkFycmF5WzBdXS5jb2xvcnNbZGVmQXJyYXlbMV1dO1xyXG4gICAgICAgICAgICAgICAgY29sb3JEZWYucGFsZXR0ZSA9IGludGVudC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgY29sb3JEZWYudmFyaWFudCA9IGludGVudC5odWVzW2RlZkFycmF5WzJdXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJG1kQ29sb3JQYWxldHRlW2NvbG9yRGVmLnBhbGV0dGVdW2NvbG9yRGVmLnZhcmlhbnRdLnZhbHVlO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRDb2xvciA9IChkZWZTdHJpbmcsIG9wYWNpdHkgPSAxKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc0NvbG9yID0gdGhpcy5nZXRSR0IoZGVmU3RyaW5nKTtcclxuICAgICAgICAgICAgcmV0dXJuIGByZ2JhKCR7cmVzQ29sb3Iuam9pbignLCAnKX0sICR7b3BhY2l0eX0pYDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubnVtVG9Db2xvciA9IChudW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMubnVtVG9SZ2JhKG51bSkubWFwKChyZ2JhKSA9PiB0aGlzLnJnYmFUb0NTUyhyZ2JhKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLm51bVRvUmdiYSA9IChudW0pID0+IHtcclxuICAgICAgICAgICAgaWYgKCFudW0pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtbMCwgMCwgMCwgMC4xMl0sIFswLCAwLCAwLCAwLjc4XV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBzaGFkZXMgPSBbNTAwLCA0MDAsIDYwMCwgMzAwLCA3MDBdO1xyXG4gICAgICAgICAgICBjb25zdCBwYWxldHRlcyA9IE9iamVjdC5rZXlzKCRtZENvbG9yUGFsZXR0ZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBudW0udG9TdHJpbmcoMTApLnBhZFN0YXJ0KDUsICcwJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1haW4gPSBwYWxldHRlc1twYXJzZUludChjb2RlLnNsaWNlKC0yKSkgJSBwYWxldHRlcy5sZW5ndGhdO1xyXG4gICAgICAgICAgICBjb25zdCBzaGFkZSA9IHNoYWRlc1twYXJzZUludChjb2RlLnNsaWNlKDAsIC0yKSkgJSBzaGFkZXMubGVuZ3RoXS50b1N0cmluZygpO1xyXG4gICAgICAgICAgICByZXR1cm4gWyRtZENvbG9yUGFsZXR0ZVttYWluXVtzaGFkZV0udmFsdWUuY29uY2F0KFsxXSksICRtZENvbG9yUGFsZXR0ZVttYWluXVtzaGFkZV0uY29udHJhc3Quc2xpY2UoKV1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMucmdiYVRvQ1NTID0gKGFycikgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gYHJnYmEoJHthcnIuam9pbigpfSlgXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvY29sb3ItZGVmLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc3MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5wcm92aWRlcignZGF0ZVV0aWxzJywgZGF0ZVV0aWxzUHJvdmlkZXIpO1xyXG4gICAgZGF0ZVV0aWxzUHJvdmlkZXIuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRhdGVVdGlsc1Byb3ZpZGVyKCkge1xyXG4gICAgICAgIGNvbnN0IF9kYXRlUmVnRXhwID0ge1xyXG4gICAgICAgICAgICBodW1hbkRhdGU6IC9eXFxkKyhbLlxcLVxcL1xcXFxdKVxcZCtbLlxcLVxcL1xcXFxdXFxkKyQvLFxyXG4gICAgICAgICAgICBtb250aERhdGU6IC9eW0EtWmEtel0rW1xcc1xcLV8nLl0rXFxkezIsNH0kLyxcclxuICAgICAgICAgICAgZG90bmV0RGF0ZTogL1xcL0RhdGVcXChbXFxkXFwtXStcXClcXC8vLFxyXG4gICAgICAgICAgICB1bml4RGF0ZTogL15cXGR7MTMsfSQvLFxyXG4gICAgICAgICAgICBpc29EYXRlOiAvXlxcZHs0fS1cXGR7Mn0tXFxkezJ9VC4qJC9cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IF9kYXRlRm9ybWF0ID0ge1xyXG4gICAgICAgICAgICBodW1hbkRhdGU6IFsnREQuTU0uWVlZWScsICdERC5NTS5ZWScsICdERC1NTS1ZWVlZJywgJ1lZWVktTU0tREQnLCAnREQtTU0tWVknLCAnTU0vREQvWVknLCAnTU0vREQvWVlZWSddLFxyXG4gICAgICAgICAgICBtb250aERhdGU6IFsnTU1NIFlZWVknLCAnTU1NIFlZJywgJ01NTU0gWVlZWScsICdNTS5ZWScsICdNTS9ZWScsICdNTS5ZWVlZJywgJ01NL1lZWVknXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IF9pbnN0YW5jZSA9IG51bGw7XHJcblxyXG4gICAgICAgIGNsYXNzIEFQRGF0ZVV0aWxzIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGVSZWdFeHAgPSBfZGF0ZVJlZ0V4cDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2RhdGVGb3JtYXQgPSBfZGF0ZUZvcm1hdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgZGF0ZVJlZ0V4cCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVSZWdFeHBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgZGF0ZUZvcm1hdCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RhdGVGb3JtYXRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbm93KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KCkuc3RhcnRPZignRCcpLnRvRGF0ZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IHByZXZNb250aCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCgpLnN1YnRyYWN0KDEsICdNJykuc3RhcnRPZignRCcpLnRvRGF0ZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IG5leHRNb250aCgpe1xyXG4gICAgICAgICAgICAgICAgbW9tZW50KCkuYWRkKDEsICdNJykuc3RhcnRPZignRCcpLnRvRGF0ZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IHByZXZZZWFyKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KCkuc3VidHJhY3QoMSwgJ1knKS5zdGFydE9mKCdEJykudG9EYXRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbmV4dFllYXIoKXtcclxuICAgICAgICAgICAgICAgIG1vbWVudCgpLmFkZCgxLCAnWScpLnN0YXJ0T2YoJ0QnKS50b0RhdGUoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGFydE9mTW9udGgobW9udGggPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCksIHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIGRhdGUgPSBuZXcgRGF0ZSgpKXtcclxuICAgICAgICAgICAgICAgIGlmIChtb250aCBpbnN0YW5jZW9mIERhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQodGhpcy51dGNBc0xvY2FsKG1vbnRoKSkuc3RhcnRPZignTScpLnN0YXJ0T2YoJ0QnKS50b0RhdGUoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudChbeWVhciwgbW9udGgsIDE1XSkuc3RhcnRPZignTScpLnN0YXJ0T2YoJ0QnKS50b0RhdGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVuZE9mTW9udGggKG1vbnRoID0gbmV3IERhdGUoKS5nZXRNb250aCgpLCB5ZWFyID0gbmV3IERhdGUoKS5nZXRGdWxsWWVhcigpLCBkYXRlID0gbmV3IERhdGUoKSl7XHJcbiAgICAgICAgICAgICAgICBpZiAobW9udGggaW5zdGFuY2VvZiBEYXRlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KHRoaXMudXRjQXNMb2NhbChtb250aCkpLmVuZE9mKCdNJykuc3RhcnRPZignRCcpLnRvRGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KFt5ZWFyLCBtb250aCwgMTVdKS5lbmRPZignTScpLnN0YXJ0T2YoJ0QnKS50b0RhdGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHBhcnNlRGF0ZShpbnB1dCkge1xyXG4gICAgICAgICAgICAgICAgbGV0IG91dHB1dCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpbnB1dCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZihpbnB1dCkgPT09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRlUmVnRXhwLmh1bWFuRGF0ZS50ZXN0KGlucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBtb21lbnQoaW5wdXQsIHRoaXMuZGF0ZUZvcm1hdC5odW1hbkRhdGUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmRhdGVSZWdFeHAubW9udGhEYXRlLnRlc3QoaW5wdXQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gbW9tZW50KGlucHV0LnJlcGxhY2UoL1teQS1aYS16MC05XS9nLCAnICcpLnJlcGxhY2UoL1xccysvZywgJyAnKS50cmltKCksIHRoaXMuZGF0ZUZvcm1hdC5tb250aERhdGUsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmRhdGVSZWdFeHAudW5peERhdGUudGVzdChpbnB1dCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBtb21lbnQocGFyc2VJbnQoaW5wdXQpKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmRhdGVSZWdFeHAuZG90bmV0RGF0ZS50ZXN0KGlucHV0KSB8fCB0aGlzLmRhdGVSZWdFeHAuaXNvRGF0ZS50ZXN0KGlucHV0KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbWVudChpbnB1dClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChpbnB1dCBpbnN0YW5jZW9mIERhdGUgfHwgdGhpcy5kYXRlUmVnRXhwLnVuaXhEYXRlLnRlc3QoaW5wdXQudG9TdHJpbmcoKSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbWVudChpbnB1dCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dCAmJiBvdXRwdXQuaXNWYWxpZCgpICYmIG91dHB1dC50b0RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3JtYXREYXRlKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUgPyBtb21lbnQoZGF0ZSkuZm9ybWF0KCdERC5NTS5ZWScpIDogJydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXRGb3JtYXQoZGF0ZVN0cmluZyA9ICcnKXtcclxuICAgICAgICAgICAgICAgIGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnRyaW0oKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGZvcm1hdHMgPSB0aGlzLmRhdGVSZWdFeHAuaHVtYW5EYXRlLnRlc3QoZGF0ZVN0cmluZykgPyB0aGlzLmRhdGVGb3JtYXQuaHVtYW5EYXRlIDogdGhpcy5kYXRlRm9ybWF0Lm1vbnRoRGF0ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtYXRzLmZpbmQoKGl0ZW0pID0+IGRhdGVTdHJpbmcubGVuZ3RoID09PSBpdGVtLmxlbmd0aCAmJiBtb21lbnQoZGF0ZVN0cmluZywgaXRlbSwgdHJ1ZSkuaXNWYWxpZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5kTW9udGhOYW1lKHBhcnQsIGZvcm1hdCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWRhdGUgPSBtb21lbnQoWzIwMDAsIDAsIDFdKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1vbnRoRm9ybWF0ID0gZm9ybWF0LnJlcGxhY2UoL1teTV0vZywnJyk7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEyOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBtb250aE5hbWUgPSBtZGF0ZS5mb3JtYXQobW9udGhGb3JtYXQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtb250aE5hbWUudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHBhcnQudG9Mb3dlckNhc2UoKSkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbW9udGhOYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBtZGF0ZS5hZGQoMSwgJ21vbnRoJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsb2NhbEFzVXRjKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHogPSBkYXRlLmdldFRpbWV6b25lT2Zmc2V0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZGF0ZSA9IG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuZ2V0SG91cnMoKSA9PT0gMCAmJiB0eiAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR6ID4gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRkYXRlLnNldE1pbnV0ZXMoLTEgKiB0eik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGRhdGUuc2V0SG91cnModGhpcy5nZXRUWkhvdXJzKGRhdGUpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGRhdGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdXRjQXNMb2NhbChkYXRlKXtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRlLmdldEhvdXJzKCkgIT09IDApe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZShkYXRlLmdldFVUQ0Z1bGxZZWFyKCksIGRhdGUuZ2V0VVRDTW9udGgoKSwgZGF0ZS5nZXRVVENEYXRlKCkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldFRaSG91cnMoZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eiA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0eiA+IDAgPyAyNCAtIE1hdGguY2VpbCh0eiAvIDYwKSA6IE1hdGguZmxvb3IoTWF0aC5hYnModHopIC8gNjApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNhbWVEYXRlKGRhdGVBLCBkYXRlQil7XHJcbiAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlQS5nZXRGdWxsWWVhcigpID09PSBkYXRlQi5nZXRGdWxsWWVhcigpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGVBLmdldE1vbnRoKCkgPT09IGRhdGVCLmdldE1vbnRoKCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZUEuZ2V0RGF0ZSgpID09PSBkYXRlQi5nZXREYXRlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWF4RGF0ZSguLi5kYXRlcyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZERhdGVzID0gZGF0ZXMuZmlsdGVyKChkKSA9PiAhIWQgJiYgZCBpbnN0YW5jZW9mIERhdGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkRGF0ZXMubGVuZ3RoID8gdmFsaWREYXRlcy5yZWR1Y2UoKHJlcywgZGF0ZSkgPT4gZGF0ZSA+PSByZXMgPyBkYXRlIDogcmVzLCBuZXcgRGF0ZShudWxsKSkgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1pbkRhdGUoLi4uZGF0ZXMpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWREYXRlcyA9IGRhdGVzLmZpbHRlcigoZCkgPT4gISFkICYmIGQgaW5zdGFuY2VvZiBEYXRlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWxpZERhdGVzLmxlbmd0aCA/IHZhbGlkRGF0ZXMucmVkdWNlKChyZXMsIGRhdGUpID0+IGRhdGUgPD0gcmVzID8gZGF0ZSA6IHJlcywgbmV3IERhdGUoKSkgOiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlzV2Vla2VuZChkYXRlKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRheU51bSA9IGRhdGUuZ2V0RGF5KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF5TnVtID09PSAwIHx8IGRheU51bSA9PT0gNjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXREYXRlRmlsdGVyKHN0YXJ0LCBlbmQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIChkKSA9PiAoIXN0YXJ0IHx8ICFzdGFydC5nZXRUaW1lIHx8IGQuZ2V0VGltZSgpID49IHN0YXJ0LmdldFRpbWUoKSkgJiYgKCFlbmQgfHwgIWVuZC5nZXRUaW1lIHx8IGQuZ2V0VGltZSgpIDw9IGVuZC5nZXRUaW1lKCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0RGF0ZUFycmF5KHN0YXJ0LCBlbmQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2QgPSBtb21lbnQuaXNNb21lbnQoc3RhcnQpID8gc3RhcnQgOiBtb21lbnQoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWQgPSBtb21lbnQuaXNNb21lbnQoZW5kKSA/IGVuZCA6IG1vbWVudChlbmQpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzID0gW107XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzW3Jlcy5sZW5ndGhdID0gc2QudG9EYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2QuYWRkKDEsICdkJyk7XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChzZC5pc1NhbWVPckJlZm9yZShlZCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0cmFuc2Zvcm1PYmplY3Qob2JqLCBpc1NyY0xvY2FsKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZXIgPSBpc1NyY0xvY2FsID8gdGhpcy5sb2NhbEFzVXRjLmJpbmQodGhpcykgOiB0aGlzLnV0Y0FzTG9jYWwuYmluZCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmICghb2JqKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mKG9iaikgPT09ICdzdHJpbmcnKXtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2Uob2JqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHRoaXMudHJhbnNmb3JtT2JqZWN0KHJlc3VsdCwgaXNTcmNMb2NhbCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnBhcnNlRGF0ZShvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ID8gaGFuZGxlcihyZXN1bHQpIDogb2JqO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIERhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSB0aGlzLnBhcnNlRGF0ZShvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXRlID8gaGFuZGxlcihkYXRlKSA6IG9iajtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iai5tYXAoKGl0ZW0pID0+IHRoaXMudHJhbnNmb3JtT2JqZWN0KGl0ZW0sIGlzU3JjTG9jYWwpKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodHlwZW9mKG9iaikgPT09ICdvYmplY3QnKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKHJlcywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc1trZXldID0gdGhpcy50cmFuc2Zvcm1PYmplY3Qob2JqW2tleV0sIGlzU3JjTG9jYWwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIHt9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9iajtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgX2luc3RhbmNlID0gbmV3IEFQRGF0ZVV0aWxzKCk7XHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xyXG4gICAgICAgICAgICB1dGlsczoge1xyXG4gICAgICAgICAgICAgICAgZ2V0OiAoKSA9PiBfaW5zdGFuY2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuJGdldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gX2luc3RhbmNlO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvZGF0ZS11dGlscy1wcm92aWRlci5qc1xuLy8gbW9kdWxlIGlkID0gNzcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLnNlcnZpY2UoJyRkb3VibGUnLCBkb3VibGVTZXJ2aWNlKTtcclxuICAgIGRvdWJsZVNlcnZpY2UuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRvdWJsZVNlcnZpY2UoKXtcclxuICAgICAgICB0aGlzLmRvdWJsZVRvTG9uZ0JpdHMgPSAobnVtYmVyLCBwcmVjaXNpb25CaXRzID0gMjMsIGV4cG9uZW50Qml0cyA9IDgpID0+IHtcclxuICAgICAgICAgICAgdmFyIGJpYXMgPSBNYXRoLnBvdygyLCBleHBvbmVudEJpdHMgLSAxKSAtIDEsIG1pbkV4cCA9IC1iaWFzICsgMSwgbWF4RXhwID0gYmlhcywgbWluVW5ub3JtRXhwID0gbWluRXhwIC0gcHJlY2lzaW9uQml0cyxcclxuICAgICAgICAgICAgICAgIHN0YXR1cyA9IGlzTmFOKG4gPSBwYXJzZUZsb2F0KG51bWJlcikpIHx8ICFOdW1iZXIuaXNGaW5pdGUobikgPyBuIDogMCxcclxuICAgICAgICAgICAgICAgIGV4cCA9IDAsIGxlbiA9IDIgKiBiaWFzICsgMSArIHByZWNpc2lvbkJpdHMgKyAzLCBiaW4gPSBuZXcgQXJyYXkobGVuKSxcclxuICAgICAgICAgICAgICAgIHNpZ25hbCA9IChuID0gc3RhdHVzICE9PSAwID8gMCA6IG4pIDwgMCwgbiA9IE1hdGguYWJzKG4pLCBpbnRQYXJ0ID0gTWF0aC5mbG9vcihuKSwgZmxvYXRQYXJ0ID0gbiAtIGludFBhcnQsXHJcbiAgICAgICAgICAgICAgICBpLCBsYXN0Qml0LCByb3VuZGVkLCBqLCByZXN1bHQ7XHJcbiAgICAgICAgICAgIGZvcihpID0gbGVuOyBpOyBiaW5bLS1pXSA9IDApO1xyXG4gICAgICAgICAgICBmb3IoaSA9IGJpYXMgKyAyOyBpbnRQYXJ0ICYmIGk7IGJpblstLWldID0gaW50UGFydCAlIDIsIGludFBhcnQgPSBNYXRoLmZsb29yKGludFBhcnQgLyAyKSk7XHJcbiAgICAgICAgICAgIGZvcihpID0gYmlhcyArIDE7IGZsb2F0UGFydCA+IDAgJiYgaTsgKGJpblsrK2ldID0gKChmbG9hdFBhcnQgKj0gMikgPj0gMSkgLSAwKSAmJiAtLWZsb2F0UGFydCk7XHJcbiAgICAgICAgICAgIGZvcihpID0gLTE7ICsraSA8IGxlbiAmJiAhYmluW2ldOyk7XHJcbiAgICAgICAgICAgIGlmKGJpblsobGFzdEJpdCA9IHByZWNpc2lvbkJpdHMgLSAxICsgKGkgPSAoZXhwID0gYmlhcyArIDEgLSBpKSA+PSBtaW5FeHAgJiYgZXhwIDw9IG1heEV4cCA/IGkgKyAxIDogYmlhcyArIDEgLSAoZXhwID0gbWluRXhwIC0gMSkpKSArIDFdKXtcclxuICAgICAgICAgICAgICAgIGlmKCEocm91bmRlZCA9IGJpbltsYXN0Qml0XSkpXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGogPSBsYXN0Qml0ICsgMjsgIXJvdW5kZWQgJiYgaiA8IGxlbjsgcm91bmRlZCA9IGJpbltqKytdKTtcclxuICAgICAgICAgICAgICAgIGZvcihqID0gbGFzdEJpdCArIDE7IHJvdW5kZWQgJiYgLS1qID49IDA7IChiaW5bal0gPSAhYmluW2pdIC0gMCkgJiYgKHJvdW5kZWQgPSAwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZm9yKGkgPSBpIC0gMiA8IDAgPyAtMSA6IGkgLSAzOyArK2kgPCBsZW4gJiYgIWJpbltpXTspO1xyXG5cclxuICAgICAgICAgICAgKGV4cCA9IGJpYXMgKyAxIC0gaSkgPj0gbWluRXhwICYmIGV4cCA8PSBtYXhFeHAgPyArK2kgOiBleHAgPCBtaW5FeHAgJiZcclxuICAgICAgICAgICAgICAgIChleHAgIT09IGJpYXMgKyAxIC0gbGVuICYmIGV4cCA8IG1pblVubm9ybUV4cCAmJiB0aGlzLndhcm4oXCJlbmNvZGVGbG9hdDo6ZmxvYXQgdW5kZXJmbG93XCIpLCBpID0gYmlhcyArIDEgLSAoZXhwID0gbWluRXhwIC0gMSkpO1xyXG4gICAgICAgICAgICAoaW50UGFydCB8fCBzdGF0dXMgIT09IDApICYmICh0aGlzLndhcm4oaW50UGFydCA/IFwiZW5jb2RlRmxvYXQ6OmZsb2F0IG92ZXJmbG93XCIgOiBcImVuY29kZUZsb2F0OjpcIiArIHN0YXR1cyksXHJcbiAgICAgICAgICAgICAgICBleHAgPSBtYXhFeHAgKyAxLCBpID0gYmlhcyArIDIsIHN0YXR1cyA9PT0gLUluZmluaXR5ID8gc2lnbmFsID0gMSA6IGlzTmFOKHN0YXR1cykgJiYgKGJpbltpXSA9IDEpKTtcclxuICAgICAgICAgICAgZm9yKG4gPSBNYXRoLmFicyhleHAgKyBiaWFzKSwgaiA9IGV4cG9uZW50Qml0cyArIDEsIHJlc3VsdCA9IFwiXCI7IC0tajsgcmVzdWx0ID0gKG4gJSAyKSArIHJlc3VsdCwgbiA9IG4gPj49IDEpO1xyXG4gICAgICAgICAgICBmb3IobiA9IDAsIGogPSAwLCBpID0gKHJlc3VsdCA9IChzaWduYWwgPyBcIjFcIiA6IFwiMFwiKSArIHJlc3VsdCArIGJpbi5zbGljZShpLCBpICsgcHJlY2lzaW9uQml0cykuam9pbihcIlwiKSkubGVuZ3RoLCByID0gW107XHJcbiAgICAgICAgICAgICAgICBpOyBuICs9ICgxIDw8IGopICogcmVzdWx0LmNoYXJBdCgtLWkpLCBqID09PSA3ICYmIChyW3IubGVuZ3RoXSA9IG4sIG4gPSAwKSwgaiA9IChqICsgMSkgJSA4KTtcclxuICAgICAgICAgICAgcltyLmxlbmd0aF0gPSBuIHx8IDA7XHJcbiAgICAgICAgICAgIHIucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gcGFyc2VJbnQoci5tYXAodiA9PiB2LnRvU3RyaW5nKDIpLnBhZFN0YXJ0KDgsICcwJykpLmpvaW4oJycpLCAyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvZG91YmxlLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc3MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDA3LjAyLjIwMTguXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5zZXJ2aWNlKCckYXBlZScsIGV2ZW50RW1pdHRlclNlcnZpY2UpO1xyXG4gICAgZXZlbnRFbWl0dGVyU2VydmljZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gZXZlbnRFbWl0dGVyU2VydmljZSgpe1xyXG4gICAgICAgIGNvbnN0IHJvb21zID0gW107XHJcblxyXG4gICAgICAgIGNsYXNzIEFQRXZlbnRFbWl0dGVyIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IgKGlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlkID0gaWQgfHwgZ2VuZXJhdGVJZCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25lVGltZXJzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9uKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISh0eXBlIGluIHRoaXMubGlzdGVuZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdID0gW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyc1t0eXBlXS5wdXNoKGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvbmNlKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uZVRpbWVycy5wdXNoKHt0eXBlLCBjYWxsYmFja30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9mZih0eXBlLCBjYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgaWYgKCEodHlwZSBpbiB0aGlzLmxpc3RlbmVycykpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxlbiA9IHRoaXMubGlzdGVuZXJzW3R5cGVdLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5saXN0ZW5lcnNbdHlwZV1baV0gIT09IGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnNwbGljZSgwLCBsZW4pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmVUaW1lcnMgPSB0aGlzLm9uZVRpbWVycy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0udHlwZSAhPT0gdHlwZSAmJiBpdGVtLmNhbGxiYWNrICE9PSBjYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW1pdCh0eXBlLCBkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISh0eXBlIGluIHRoaXMubGlzdGVuZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhY2sgPSB0aGlzLmxpc3RlbmVyc1t0eXBlXTtcclxuICAgICAgICAgICAgICAgIHN0YWNrLmZvckVhY2goKGNiKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2IuY2FsbCh0aGlzLCBkYXRhKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uZVRpbWVycyA9IHRoaXMub25lVGltZXJzLmZpbHRlcigoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IHR5cGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmNhbGxiYWNrLmNhbGwodGhpcywgZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZW1vdmVBbGxMaXN0ZW5lcnMoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRJbnN0YW5jZSA9IChpZCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgaWR4ID0gcm9vbXMuZmluZEluZGV4KChlZSkgPT4gZWUuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJvb21zLnB1c2gobmV3IEFQRXZlbnRFbWl0dGVyKGlkKSk7XHJcbiAgICAgICAgICAgICAgICBpZHggPSByb29tcy5sZW5ndGggLSAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJvb21zW2lkeF1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZGVzdHJveUluc3RhbmNlID0gKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHJvb21zLmZpbmRJbmRleCgoZWUpID0+IGVlLmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmIChpZHggPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgcm9vbXMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZWUgPSBuZXcgQVBFdmVudEVtaXR0ZXIoJ3N2YycpO1xyXG5cclxuICAgICAgICB0aGlzLkFQRXZlbnRFbWl0dGVyID0gQVBFdmVudEVtaXR0ZXI7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdlbmVyYXRlSWQobGVuID0gOCkge1xyXG4gICAgICAgICAgICBsZXQgaWQgPSAnJztcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgaWQgKz0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMzYpLnRvU3RyaW5nKDM2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL2V2ZW50LWVtaXR0ZXItc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzczXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4qIENyZWF0ZWQgYnkgdXNlciBvbiAwNS4xMC4yMDE2LlxyXG4qL1xyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLnNlcnZpY2UoJ3Jlc2l6ZVNlbnNvcicsIHJlc2l6ZVNlbnNvclNlcnZpY2UpO1xyXG5cclxuICAgIHJlc2l6ZVNlbnNvclNlcnZpY2UuJGluamVjdCA9IFsnJHdpbmRvdycsICckdGltZW91dCddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2l6ZVNlbnNvclNlcnZpY2UoJHdpbmRvdywgJHRpbWVvdXQpIHtcclxuICAgICAgICAvLyBPbmx5IHVzZWQgZm9yIHRoZSBkaXJ0eSBjaGVja2luZywgc28gdGhlIGV2ZW50IGNhbGxiYWNrIGNvdW50IGlzIGxpbXRlZCB0byBtYXggMSBjYWxsIHBlciBmcHMgcGVyIHNlbnNvci5cclxuICAgICAgICAvLyBJbiBjb21iaW5hdGlvbiB3aXRoIHRoZSBldmVudCBiYXNlZCByZXNpemUgc2Vuc29yIHRoaXMgc2F2ZXMgY3B1IHRpbWUsIGJlY2F1c2UgdGhlIHNlbnNvciBpcyB0b28gZmFzdCBhbmRcclxuICAgICAgICAvLyB3b3VsZCBnZW5lcmF0ZSB0b28gbWFueSB1bm5lY2Vzc2FyeSBldmVudHMuXHJcbiAgICAgICAgY29uc3QgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gJHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgJHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgJHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKGZuKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHRpbWVvdXQoZm4sIDIwKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY2xhc3MgRXZlbnRRdWV1ZSB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBsZW5ndGggKCkge3JldHVybiB0aGlzLnEubGVuZ3RofVxyXG4gICAgICAgICAgICBhZGQgKGV2KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnEucHVzaChldik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2FsbCAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnEuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZW1vdmUgKGV2KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWQgPSB0aGlzLnEuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBldik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnEuc3BsaWNlKDAsIHRoaXMucS5sZW5ndGgsIC4uLmZpbHRlcmVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmbHVzaCAoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnEuc3BsaWNlKDAsIHRoaXMucS5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGFzcyBSZXNpemVTZW5zb3Ige1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZVN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiAwLCAndG9wJzogMCwgJ3JpZ2h0JzogMCwgJ2JvdHRvbSc6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgJ292ZXJmbG93JzogJ2hpZGRlbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3otaW5kZXgnOiAtMSxcclxuICAgICAgICAgICAgICAgICAgICAndmlzaWJpbGl0eSc6ICdoaWRkZW4nXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2hpbGRTdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICAgICAgICAgICAgICdsZWZ0JzogMCxcclxuICAgICAgICAgICAgICAgICAgICAndG9wJzogMCxcclxuICAgICAgICAgICAgICAgICAgICAndHJhbnNpdGlvbic6ICdhbGwgMHMnXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVldWUgPSBuZXcgRXZlbnRRdWV1ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRDaGlsZCA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj4nKS5jc3MoY2hpbGRTdHlsZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNocmlua0NoaWxkID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PicpLmNzcyhhbmd1bGFyLmV4dGVuZCh7fSwgY2hpbGRTdHlsZSwge3dpZHRoOiAnMjAwJScsIGhlaWdodDogJzIwMCUnfSkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmQgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+JykuYWRkQ2xhc3MoXCJyZXNpemUtc2Vuc29yLWV4cGFuZFwiKS5jc3MoYmFzZVN0eWxlKS5hcHBlbmQodGhpcy5leHBhbmRDaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNocmluayA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj4nKS5hZGRDbGFzcyhcInJlc2l6ZS1zZW5zb3Itc2hyaW5rXCIpLmNzcyhiYXNlU3R5bGUpLmFwcGVuZCh0aGlzLnNocmlua0NoaWxkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Vuc29yID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PicpLmFkZENsYXNzKCdyZXNpemUtc2Vuc29yJykuY3NzKGJhc2VTdHlsZSkuYXBwZW5kKHRoaXMuZXhwYW5kKS5hcHBlbmQodGhpcy5zaHJpbmspO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWUgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNldCAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGFzc2l2ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kQ2hpbGRbMF0uc3R5bGUud2lkdGggPSAxMDAwMDAgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kQ2hpbGRbMF0uc3R5bGUuaGVpZ2h0ID0gMTAwMDAwICsgJ3B4JztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZFswXS5zY3JvbGxMZWZ0ID0gMTAwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kWzBdLnNjcm9sbFRvcCA9IDEwMDAwMDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNocmlua1swXS5zY3JvbGxMZWZ0ID0gMTAwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hyaW5rWzBdLnNjcm9sbFRvcCA9IDEwMDAwMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGlydHlDaGVjayAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucXVldWUgfHwgdGhpcy5wYXNzaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGlydHkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlLmNhbGwoKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvL2Vsc2UgaWYgKGZyYW1lICUgMjAwID09IDApIHtcclxuICAgICAgICAgICAgICAgIC8vICAgIHRoaXMub25TY3JvbGwoKTtcclxuICAgICAgICAgICAgICAgIC8vfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmRpcnR5Q2hlY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG9uU2Nyb2xsICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkV2lkdGggPSB0aGlzLmVsZW1lbnRbMF0ub2Zmc2V0V2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhY2hlZEhlaWdodCA9IHRoaXMuZWxlbWVudFswXS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWNoZWRXaWR0aCAhPT0gdGhpcy5sYXN0V2lkdGggfHwgdGhpcy5jYWNoZWRIZWlnaHQgIT09IHRoaXMubGFzdEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFdpZHRoID0gdGhpcy5jYWNoZWRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RIZWlnaHQgPSB0aGlzLmNhY2hlZEhlaWdodDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkU2Nyb2xsRXZlbnQgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzW3R5cGVdWzBdLmF0dGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1t0eXBlXVswXS5hdHRhY2hFdmVudCgnb25zY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3R5cGVdWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVtb3ZlU2Nyb2xsRXZlbnQgKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzW3R5cGVdWzBdLmRldGFjaEV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1t0eXBlXVswXS5kZXRhY2hFdmVudCgnb25zY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3R5cGVdWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGF0dGFjaFJlc2l6ZUV2ZW50IChjYikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZS5hZGQoY2IpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzaXZlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKHRoaXMuc2Vuc29yKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmVsZW1lbnRbMF0sICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudFswXS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5kaXJ0eUNoZWNrLmJpbmQodGhpcykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTY3JvbGxFdmVudCgnZXhwYW5kJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNjcm9sbEV2ZW50KCdzaHJpbmsnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGV0YWNoUmVzaXplRXZlbnQgKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucXVldWUgJiYgdGhpcy5xdWV1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWV1ZS5mbHVzaCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5wYXNzaXZlID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlU2Nyb2xsRXZlbnQoJ2V4cGFuZCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTY3JvbGxFdmVudCgnc2hyaW5rJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbnNvci5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgIHByb3BcclxuICAgICAgICAgKiBAcmV0dXJucyB7U3RyaW5nfE51bWJlcn1cclxuICAgICAgICAgKi9cclxuICAgICAgICBmdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIHByb3ApIHtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuY3VycmVudFN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5jdXJyZW50U3R5bGVbcHJvcF07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoJHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudC5zdHlsZVtwcm9wXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRJbnN0YW5jZSA9IChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmVzaXplU2Vuc29yKGVsZW1lbnQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XHJcblxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvcmVzaXplLXNlbnNvci5qc1xuLy8gbW9kdWxlIGlkID0gNzc0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuc2VydmljZSgnc2xhc2hQYXJhbVNlcmlhbGl6ZXInLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gc2VyaWFsaXplVmFsdWUodikge1xyXG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc09iamVjdCh2KSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNEYXRlKHYpID8gdi50b0lTT1N0cmluZygpIDogYW5ndWxhci50b0pzb24odik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gbGRQYXJhbVNlcmlhbGl6ZXIocGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGlmICghcGFyYW1zKSByZXR1cm4gJyc7XHJcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IFtdO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWU7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocGFyYW1zW2tleV0gJiYgIWFuZ3VsYXIuaXNPYmplY3QocGFyYW1zW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1trZXldLnRvU3RyaW5nKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFwuXFwqXFwhXFx+XFwoXFwpXS9nLCAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXCVcXHd7Mn0vZywgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICcvJyArIHBhcnRzLmpvaW4oJy8nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvc2xhc2gtcGFyYW0tc2VyaWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gNzc1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMTIuMDQuMjAxNi5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuY29uc3RhbnQoJyRhcHN0b3JlQ29uZmlnJywge1xyXG4gICAgICAgIHN0b3JhZ2VUeXBlOiAnbG9jYWxTdG9yYWdlJ1xyXG4gICAgfSk7XHJcbiAgICB2cnAucHJvdmlkZXIoJyRhcHN0b3JlJywgWyckYXBzdG9yZUNvbmZpZycsIGZ1bmN0aW9uIChjb25maWcpIHtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XHJcbiAgICAgICAgICAgIHN0b3JhZ2VUeXBlOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29uZmlnLnN0b3JhZ2VUeXBlOyB9LFxyXG4gICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkgeyBjb25maWcuc3RvcmFnZVR5cGUgPSB2YWx1ZTsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHRoaXMuJGdldCA9IFsnJGFwc3RvcmVDb25maWcnLCAnJHdpbmRvdycsICckbG9nJywgZnVuY3Rpb24gKGNvbmZpZywgJHdpbmRvdywgJGxvZykge1xyXG4gICAgICAgICAgICB2YXIgJGFwc3RvcmUgPSB7fTtcclxuICAgICAgICAgICAgdmFyIGJrcHN0b3JlID0ge307XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBsb2NhbFN0b3JhZ2Ugb3Igc2Vzc2lvblN0b3JhZ2UgaXMgYXZhaWxhYmxlIG9yIGVuYWJsZWRcclxuICAgICAgICAgICAgdmFyIGlzU3RvcmFnZUF2YWlsYWJsZSA9IChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN1cHBvcnRlZCA9IGNvbmZpZy5zdG9yYWdlVHlwZSBpbiAkd2luZG93ICYmICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXSAhPT0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1cHBvcnRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0uc2V0SXRlbShrZXksICcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLnJlbW92ZUl0ZW0oa2V5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdXBwb3J0ZWQ7XHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgICAgICBpZiAoIWlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgJGxvZy53YXJuKGNvbmZpZy5zdG9yYWdlVHlwZSArICcgaXMgbm90IGF2YWlsYWJsZS4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAkYXBzdG9yZS5zZXRTdG9yYWdlVHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbmZpZy5zdG9yYWdlVHlwZSA9IHR5cGU7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRhcHN0b3JlLmdldCA9IGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0uZ2V0SXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQocmVzdWx0KSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEYXRlKHJlc3VsdCkpIHJldHVybiBuZXcgRGF0ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkocmVzdWx0KSB8fCBhbmd1bGFyLmlzT2JqZWN0KHJlc3VsdCkpIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcocmVzdWx0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gYW5ndWxhci5mcm9tSnNvbihyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdCA9IGJrcHN0b3JlW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRhcHN0b3JlLnNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc09iamVjdCh2YWx1ZSkgfHwgYW5ndWxhci5pc0FycmF5KHZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGFuZ3VsYXIudG9Kc29uKHZhbHVlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5zZXRJdGVtKGtleSwgdmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYmtwc3RvcmVba2V5XSA9IHZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkYXBzdG9yZS5yZW1vdmUgPSBmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc1N0b3JhZ2VBdmFpbGFibGUgPyAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpOiBkZWxldGUgYmtwc3RvcmVba2V5XTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUuY2xlYXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc1N0b3JhZ2VBdmFpbGFibGUgPyAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0uY2xlYXIoKTogYmtwc3RvcmUgPSB7fTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUua2V5ID0gZnVuY3Rpb24obnVtKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNTdG9yYWdlQXZhaWxhYmxlID8gJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLmtleShudW0pOiBia3BzdG9yZVtPYmplY3Qua2V5cyhia3BzdG9yZSlbbnVtXV07XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRhcHN0b3JlLmFsbEtleXMgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc1N0b3JhZ2VBdmFpbGFibGUpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKCR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5rZXkoaSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0cyA9IE9iamVjdC5rZXlzKGJrcHN0b3JlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkYXBzdG9yZS5maW5kS2V5cyA9IGZ1bmN0aW9uKHJlZ2V4cCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGFsbF9rZXlzID0gJGxzdG9yZS5hbGxLZXlzKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxsX2tleXMuZmlsdGVyKGZ1bmN0aW9uICh2KSB7IHJldHVybiByZWdleHAudGVzdCh2KSB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuICRhcHN0b3JlO1xyXG4gICAgICAgIH1dO1xyXG4gICAgfV0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9zdG9yYWdlLXByb3ZpZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL2FsZ28vYmlnbnVtYmVyLWZpbHRlci5qc1wiOiA3NzgsXG5cdFwiLi9hbGdvL2dlbmV0aWMtZmFjdG9yeS5qc1wiOiA3NzksXG5cdFwiLi9hbGdvL3Blcm11dGF0aW9uLXNlcnZpY2UuanNcIjogNzgwLFxuXHRcIi4vYWxnby9wb2ludC1mYWN0b3J5LmpzXCI6IDc4MSxcblx0XCIuL2FsZ28vc2ltLWFubmVhbC1zZXJ2aWNlLmpzXCI6IDc4Mixcblx0XCIuL2FwaS9hcGktcmVxdWVzdC1wcm92aWRlci5qc1wiOiA3ODMsXG5cdFwiLi9hcGkvc2xhc2gtcGFyYW0tc2VyaWFsaXplci5qc1wiOiA3ODQsXG5cdFwiLi9hcGkvdHBsLXF1ZXJ5LXNlcmlhbGl6ZXIuanNcIjogNzg1LFxuXHRcIi4vZGJzY2FuL2Ric2Nhbi1kaXJlY3RpdmUuanNcIjogODA1LFxuXHRcIi4vZGJzY2FuL2Ric2Nhbi1zZXJ2aWNlLmpzXCI6IDgwNCxcblx0XCIuL2stbWVhbi9rLW1lYW4tZGlyZWN0aXZlLmpzXCI6IDc4Nixcblx0XCIuL2stbWVhbi9rLW1lYW4tc2VydmljZS5qc1wiOiA3ODgsXG5cdFwiLi90c3Avcm91dGUtZHJhdy1kaXJlY3RpdmUuanNcIjogNzg5LFxuXHRcIi4vdHNwL3JvdXRlLXBsb3R0ZXItc2VydmljZS5qc1wiOiA3OTEsXG5cdFwiLi92cnAvdnJwLWRyYXctZGlyZWN0aXZlLmpzXCI6IDc5Mixcblx0XCIuL3ZycC92cnAtcGxvdHRlci1zZXJ2aWNlLmpzXCI6IDc5NFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDc3NztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzIC4rXFwuanMkXG4vLyBtb2R1bGUgaWQgPSA3Nzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApe1xyXG4gICAgdnJwLmZpbHRlcignYmlnbnVtYmVyJywgYmlnbnVtYmVyRmlsdGVyKTtcclxuICAgIHZycC5maWx0ZXIoJ3Bvd251bWJlcicsIHBvd251bWJlckZpbHRlcik7XHJcbiAgICBmdW5jdGlvbiBiaWdudW1iZXJGaWx0ZXIoKXtcclxuICAgICAgICByZXR1cm4gKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbWF0aC5mb3JtYXQodmFsLCB7bG93ZXJFeHA6IC0zMDAsIHVwcGVyRXhwOiAzMDB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHBvd251bWJlckZpbHRlcigpe1xyXG4gICAgICAgIHJldHVybiAodmFsKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gbWF0aC5mb3JtYXQodmFsLCB7bG93ZXJFeHA6IC0yLCB1cHBlckV4cDogMiwgcHJlY2lzaW9uOiAzfSkuc3BsaXQoJ2UrJyk7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSAnficgKyBwYXJ0c1swXTtcclxuICAgICAgICAgICAgaWYgKHBhcnRzWzFdKXtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBgIHggMTBeJHtwYXJ0c1sxXX1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL2JpZ251bWJlci1maWx0ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc3OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCl7XHJcbiAgICB2cnAuc2VydmljZSgnR2VuZXRpY0ZhY3RvcnknLCBnZW5ldGljRmFjdG9yeVNlcnZpY2UpO1xyXG4gICAgZ2VuZXRpY0ZhY3RvcnlTZXJ2aWNlLiRpbmplY3QgPSBbJyRwZXJtdXRhdGlvbiddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdlbmV0aWNGYWN0b3J5U2VydmljZSgkcGVybXV0YXRpb24pe1xyXG4gICAgICAgIGNsYXNzIEdlbmUge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcihjb2RlID0gW10pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29kZSA9IGNvZGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZ1bG5lcmFiaWxpdHkgPSAwO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgY29kZSAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29kZS5zbGljZSgpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldCBjb2RlIChjb2RlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2RlLnNwbGljZSgwLCB0aGlzLl9jb2RlLmxlbmd0aCwgLi4uY29kZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBzaXplICgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGUubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgZ2Vub20gKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXggPSB0aGlzLl9jb2RlLnNsaWNlKCkuc29ydCgoYSwgYikgPT4gYiAtIGEpWzBdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGFkID0gKGAke21heH1gKS5sZW5ndGg7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29kZS5tYXAoKHYpID0+ICgnJyArIHYpLnBhZFN0YXJ0KHBhZCwgJzAnKSkuam9pbigpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlzRXF1YWwoZ2Vub20pe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2Vub20gPT09IGdlbm9tO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXByb2R1Y2UgKGdlbmUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gW107XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjZWxsU2V0ID0gJHBlcm11dGF0aW9uLmdldE51bWJlclNlcXVlbmNlKHRoaXMuY29kZS5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXV0dWFsU2V0ID0gdGhpcy5jb2RlLm1hcCgodmFsLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsID09PSBnZW5lLmNvZGVbaWR4XSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxTZXQuc3BsaWNlKGNlbGxTZXQuaW5kZXhPZih2YWwpLCAxKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsU2V0Lmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXV0YXRlKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubXV0YXRlKClcclxuICAgICAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAkcGVybXV0YXRpb24uZ2V0UmFuZG9tTGltaXRlZFBlcm11dGF0aW9ucyhjZWxsU2V0LCBNQVhfQ0hJTERSRU4pLmZvckVhY2goKG11dCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkID0gbmV3IEdlbmUobXV0dWFsU2V0Lm1hcCgodmFsKSA9PiB2YWwgfHwgbXV0LnNoaWZ0KCkpKTtcclxuICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkcmVuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtdXRhdGUoZGVwdGggPSBNYXRoLmZsb29yKHRoaXMuc2l6ZSAvIDMpKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1jZWxscyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2FtcGxlID0gdGhpcy5jb2RlO1xyXG4gICAgICAgICAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1jZWxscy5pbmRleE9mKHNhbXBsZVtpZHhdKSA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtY2VsbHMucHVzaChzYW1wbGVbaWR4XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZVtpZHhdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChtY2VsbHMubGVuZ3RoIDwgZGVwdGgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBHZW5lKHNhbXBsZS5tYXAodiA9PiB2IHx8IG1jZWxscy5zaGlmdCgpKSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIEdlbmVyYXRpb24ge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihudW0pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5udW1iZXIgPSBudW07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGllY2VzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IHNwaWVjZXMgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwaWVjZXMuc2xpY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXQgc3BpZWNlcyAoYXJyKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGllY2VzLnNwbGljZSgwLCB0aGlzLl9zcGllY2VzLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXJyICYmIEFycmF5LmlzQXJyYXkoYXJyKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BpZWNlcy5wdXNoKC4uLmFycik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IHNpemUoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3BpZWNlcy5sZW5ndGhcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgYXZnVnVsbmVyYWJpbGl0eSAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3BpZWNlcy5yZWR1Y2UoKHJlcywgZ2VuZSkgPT4gcmVzICsgKGdlbmUudnVsbmVyYWJpbGl0eSAvIHRoaXMuc2l6ZSksIDApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IG1pblZ1bG5lcmFiaWxpdHkgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwaWVjZXMucmVkdWNlKChyZXMsIGdlbmUpID0+ICFyZXMgfHwgZ2VuZS52dWxuZXJhYmlsaXR5IDwgcmVzID8gZ2VuZS52dWxuZXJhYmlsaXR5IDogcmVzLCBudWxsKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBtYXhWdWxuZXJhYmlsaXR5ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGllY2VzLnJlZHVjZSgocmVzLCBnZW5lKSA9PiAhcmVzIHx8IGdlbmUudnVsbmVyYWJpbGl0eSA+IHJlcyA/IGdlbmUudnVsbmVyYWJpbGl0eSA6IHJlcywgbnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbWluVnVsbmVyYWJsZVNhbXBsZSAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIHRoaXMuX3NwaWVjZXMuZmluZCgoZ2VuZSkgPT4gZ2VuZS52dWxuZXJhYmlsaXR5ID09PSB0aGlzLm1pblZ1bG5lcmFiaWxpdHkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IG1heFZ1bG5lcmFibGVTYW1wbGUgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9zcGllY2VzLmZpbmQoKGdlbmUpID0+IGdlbmUudnVsbmVyYWJpbGl0eSA9PT0gdGhpcy5tYXhWdWxuZXJhYmlsaXR5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBjc3YgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwaWVjZXMubWFwKChnZW5lKSA9PiBgJHt0aGlzLm51bWJlcn0sLS0sJHtnZW5lLmdlbm9tfSwke2dlbmUudnVsbmVyYWJpbGl0eX1gKS5qb2luKCdcXG4nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBzdW1tYXJ5ICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG91dCA9IFtcclxuICAgICAgICAgICAgICAgICAgICBgR2VuZXJhdGlvbiAke3RoaXMubnVtYmVyfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYFBvcHVsYXRpb246ICR7dGhpcy5zaXplfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYFZ1bG5lcmFiaWxpdHkgKG1pbi9hdmcvbWF4KTogJHt0aGlzLm1pblZ1bG5lcmFiaWxpdHl9IC8gJHt0aGlzLmF2Z1Z1bG5lcmFiaWxpdHl9IC8gJHt0aGlzLm1heFZ1bG5lcmFiaWxpdHl9YCxcclxuICAgICAgICAgICAgICAgICAgICBgTW9zdCB2aWFibGUgc2FtcGxlOiAke3RoaXMubWluVnVsbmVyYWJsZVNhbXBsZS5nZW5vbX1gLFxyXG4gICAgICAgICAgICAgICAgICAgICctLSdcclxuICAgICAgICAgICAgICAgIF07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0LmpvaW4oJ1xcbicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGFzcyBQb3B1bGF0aW9uIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IgKGNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaXplID0gY29uZmlnLnNpemU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb2JlID0gY29uZmlnLnByb2JlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdXJ2aXZlID0gY29uZmlnLnN1cnZpdmUgfHwgMC4yNTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2Vub21MZW5ndGggPSBjb25maWcuZ2Vub21MZW5ndGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNhbXBsZSA9IGNvbmZpZy5zYW1wbGU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1pblZ1bG5lcmFibGVHZW5lID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGFic01pblZ1bG5lcmFiaWxpdHkgKCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2FtcGxlVG90YWwgPSB0aGlzLnNhbXBsZS5yZWR1Y2UoKHJlcywgdmFsKSA9PiByZXMgKyB2YWwsIDApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuZVRvdGFsID0gKHRoaXMuc2FtcGxlLmxlbmd0aCArIDEpICogdGhpcy5zYW1wbGUubGVuZ3RoIC8gMjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzYW1wbGVUb3RhbCAtIGdlbmVUb3RhbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IG1pblZ1bG5lcmFiaWxpdHkgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvYmUoJHBlcm11dGF0aW9uLmdldE9wdGltYWxQZXJtdXRhdGlvbih0aGlzLnNhbXBsZSkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBvcHVsYXRlICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gJHBlcm11dGF0aW9uLmdldE51bWJlclNlcXVlbmNlKHRoaXMuZ2Vub21MZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGlvbiA9IG5ldyBHZW5lcmF0aW9uKDApO1xyXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGlvbi5zcGllY2VzID0gJHBlcm11dGF0aW9uLmdldFJhbmRvbUxpbWl0ZWRQZXJtdXRhdGlvbnMoaXRlbXMsIHRoaXMuc2l6ZSkubWFwKChzZXEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdHZW5lID0gbmV3IEdlbmUoc2VxKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdHZW5lLnZ1bG5lcmFiaWxpdHkgPSB0aGlzLnByb2JlKG5ld0dlbmUuY29kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld0dlbmU7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGlvbnMucHVzaChnZW5lcmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWxlY3QgKGdlbklkeCA9IHRoaXMuZ2VuZXJhdGlvbnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4TnVtYmVyID0gTWF0aC5mbG9vcih0aGlzLmdlbmVyYXRpb25zW2dlbklkeF0uc2l6ZSAqIHRoaXMuc3Vydml2ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5lcmF0aW9uc1tnZW5JZHhdLnNwaWVjZXNcclxuICAgICAgICAgICAgICAgICAgICAuc29ydCgoZ2VuQSwgZ2VuQikgPT4gZ2VuQS52dWxuZXJhYmlsaXR5IC0gZ2VuQi52dWxuZXJhYmlsaXR5KVxyXG4gICAgICAgICAgICAgICAgICAgIC5zbGljZSgwLCBtYXhOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGdlbkEsIGdlbkIpID0+IGdlbkEuZ2Vub20gLSBnZW5CLmdlbm9tKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGJyZWVkKG1heEdlbmVyYXRpb25zID0gMTAwMCwgc3RvcE9uTWluaW11bSA9IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkR2VuZXJhdGlvbiA9IHRoaXMuc2VsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAob2xkR2VuZXJhdGlvbi5sZW5ndGggPCAyIHx8IG1heEdlbmVyYXRpb25zID09PSAxKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pblZ1bG5lcmFibGVHZW5lID0gdGhpcy5maW5kUmVsYXRpdmVNaW4oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0dlbmVyYXRpb24gPSBuZXcgR2VuZXJhdGlvbih0aGlzLmdlbmVyYXRpb25zLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBuZXdHZW5lcmF0aW9uLnNwaWVjZXMgPSBvbGRHZW5lcmF0aW9uLnJlZHVjZSgocmVzLCBnZW5lLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXh0R2VuZSA9IG9sZEdlbmVyYXRpb25baWR4ICsgMV07XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXh0R2VuZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuID0gZ2VuZS5yZXByb2R1Y2UobmV4dEdlbmUpLm1hcCgoY2hpbGQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkLnZ1bG5lcmFiaWxpdHkgPSB0aGlzLnByb2JlKGNoaWxkLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goLi4uY2hpbGRyZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzXHJcbiAgICAgICAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRpb25zLnB1c2gobmV3R2VuZXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAobmV3R2VuZXJhdGlvbi5taW5WdWxuZXJhYmlsaXR5ID09PSB0aGlzLm1pblZ1bG5lcmFiaWxpdHkgJiYgc3RvcE9uTWluaW11bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WdWxuZXJhYmxlR2VuZSA9IG5ld0dlbmVyYXRpb24ubWluVnVsbmVyYWJsZVNhbXBsZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm1pblZ1bG5lcmFibGVHZW5lID8gdGhpcyA6IHRoaXMuYnJlZWQobWF4R2VuZXJhdGlvbnMgLSAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmaW5kUmVsYXRpdmVNaW4oKXtcclxuICAgICAgICAgICAgICAgIGxldCBtdnM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRpb25zLmZvckVhY2goKGducikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZSA9IGduci5taW5WdWxuZXJhYmxlU2FtcGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghbXZzIHx8IG12cy52dWxuZXJhYmlsaXR5ID4gc2FtcGxlLnZ1bG5lcmFiaWxpdHkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtdnMgPSBzYW1wbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbXZzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEdlbmUgPSAoY29kZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdlbmUoY29kZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldEdlbmVyYXRpb24gPSAoc2l6ZSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEdlbmVyYXRpb24oc2l6ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldFBvcHVsYXRpb24gPSAoY29uZmlnKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUG9wdWxhdGlvbihjb25maWcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2FsZ28vZ2VuZXRpYy1mYWN0b3J5LmpzXG4vLyBtb2R1bGUgaWQgPSA3Nzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApe1xyXG4gICAgdnJwLmZhY3RvcnkoJyRwZXJtdXRhdGlvbicsIHBlcm11dGF0aW9uRmFjdG9yeSk7XHJcbiAgICBwZXJtdXRhdGlvbkZhY3RvcnkuJGluamVjdCA9IFsnJHEnXTtcclxuXHJcblxyXG4gICAgZnVuY3Rpb24gcGVybXV0YXRpb25GYWN0b3J5KCRxKXtcclxuICAgICAgICBjbGFzcyBQZXJtdXRhdGlvbiB7XHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXRBbGxQZXJtdXRhdGlvbnMoaXRlbXMpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMubGVuZ3RoID09PSAxID8gW2l0ZW1zXTogW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJtdXRhdGlvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBHZXQgYWxsIHBlcm11dGF0aW9ucyBvZiBsZW5ndGggKG4gLSAxKS5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZJdGVtcyA9IGl0ZW1zLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgIC8vIEluc2VydCBsYXN0IG9wdGlvbiBpbnRvIGV2ZXJ5IHBvc3NpYmxlIHBvc2l0aW9uIG9mIGV2ZXJ5IHByZXZpb3VzIHBlcm11dGF0aW9uLlxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdEl0ZW0gPSBpdGVtcy5zbGljZSgtMSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcHJldlBlcm11dGF0aW9ucyA9IFBlcm11dGF0aW9uLmdldEFsbFBlcm11dGF0aW9ucyhwcmV2SXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmV2UGVybXV0YXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFBlcm11dGF0aW9uID0gcHJldlBlcm11dGF0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBJbnNlcnQgbGFzdCBvcHRpb24gaW50byBldmVyeSBwb3NzaWJsZSBwb3NpdGlvbiBvZiBjdXJyZW50UGVybXV0YXRpb24uXHJcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPD0gY3VycmVudFBlcm11dGF0aW9uLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBlcm11dGF0aW9uUHJlZml4ID0gY3VycmVudFBlcm11dGF0aW9uLnNsaWNlKDAsIGopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJtdXRhdGlvblN1ZmZpeCA9IGN1cnJlbnRQZXJtdXRhdGlvbi5zbGljZShqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGVybXV0YXRpb25zLnB1c2gocGVybXV0YXRpb25QcmVmaXguY29uY2F0KGxhc3RJdGVtLCBwZXJtdXRhdGlvblN1ZmZpeCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBwZXJtdXRhdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXRBbGxQZXJtdXRhdGlvbnNBc3luYyhpdGVtcyl7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbXMubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkcS5yZXNvbHZlKGl0ZW1zLmxlbmd0aCA9PT0gMSA/IFtpdGVtc106IFtdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RJdGVtID0gaXRlbXMucG9wKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFBlcm11dGF0aW9uLmdldEFsbFBlcm11dGF0aW9uc0FzeW5jKGl0ZW1zKS50aGVuKChwcmV2UGVybXV0YXRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXZQZXJtdXRhdGlvbnMubWFwKChjdXJyZW50UGVybXV0YXRpb24pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQZXJtdXRhdGlvbi5yZWR1Y2UoKHIsIHYsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbLi4uciwgWy4uLmN1cnJlbnRQZXJtdXRhdGlvbi5zbGljZSgwLCBpICsgMSksIGxhc3RJdGVtLCAuLi5jdXJyZW50UGVybXV0YXRpb24uc2xpY2UoaSArIDEpXV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtbbGFzdEl0ZW0sIC4uLmN1cnJlbnRQZXJtdXRhdGlvbl1dKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5yZWR1Y2UoKGEsIGIpID0+IGEuY29uY2F0KGIpKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXRMaW1pdGVkUGVybXV0YXRpb25zKGl0ZW1zLCBsaW1pdCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaW1pdEJhc2UgPSBmaW5kTmVhcmVzdEZhY3RvcmlhbChsaW1pdCk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgVG8gZ2V0ICR7bGltaXR9IHNhbXBsZXMgd2Ugc2V0IGJhc2UgYXQgJHtsaW1pdEJhc2V9YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYWluU2V0ID0gUGVybXV0YXRpb24uZ2V0QWxsUGVybXV0YXRpb25zKGl0ZW1zLnNsaWNlKDAsIGxpbWl0QmFzZSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0ZXBzID0gbWF0aC5jZWlsKGxpbWl0IC8gbWFpblNldC5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG1haW5TZXQucmVkdWNlKChyZXMsIGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc3RlcHM7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBleHRTZXQgPSBQZXJtdXRhdGlvbi5nZXRSYW5kb21QZXJtdXRhdGlvbihpdGVtcy5zbGljZShsaW1pdEJhc2UpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goaXRlbS5jb25jYXQoZXh0U2V0KSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH0sIFtdKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0UmFuZG9tTGltaXRlZFBlcm11dGF0aW9ucyhpdGVtcywgbGltaXQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMubGVuZ3RoID09PSAxID8gW2l0ZW1zXTogW107XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhOdW0gPSBtYXRoLmZhY3RvcmlhbChpdGVtcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpbWl0ID49IG1heE51bSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBlcm11dGF0aW9uLmdldEFsbFBlcm11dGF0aW9ucyhpdGVtcyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwZXJtdXRhdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQZXJtdXRhdGlvbiA9IFBlcm11dGF0aW9uLmdldFJhbmRvbVBlcm11dGF0aW9uKGl0ZW1zKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBwZXJtdXRhdGlvbnMuZmluZEluZGV4KChwZXJtKSA9PiBwZXJtLmpvaW4oKSA9PT0gbmV3UGVybXV0YXRpb24uam9pbigpKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm11dGF0aW9ucy5wdXNoKG5ld1Blcm11dGF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChwZXJtdXRhdGlvbnMubGVuZ3RoIDwgbGltaXQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBlcm11dGF0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldFJhbmRvbVBlcm11dGF0aW9uKGl0ZW1zKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcmMgPSBpdGVtcy5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3JjLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNyYy5zcGxpY2UoaWR4LCAxKVswXTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0Tm9uVW5pcXVlTnVtYmVyU2VxdWVuY2UobGVuLCBtaW5Ub3RhbCA9IChsZW4gKyAxKSAqIGxlbiAvIDIpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1heFRvdGFsID0gbGVuICogbGVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0VG90YWwgPSBtaW5Ub3RhbCArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXhUb3RhbCAtIG1pblRvdGFsKSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3VtID0gbGVuO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gQXJyYXkuYXBwbHkobnVsbCwgQXJyYXkobGVuKSkuZmlsbCgxKTtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBsZW4pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHRbaWR4XSA8IGxlbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRbaWR4XSsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0rKztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChzdW0gPCB0YXJnZXRUb3RhbCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0TnVtYmVyU2VxdWVuY2UobGVuLCBzdGFydCA9IDEpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIEFycmF5LmFwcGx5KG51bGwsIEFycmF5KGxlbikpLm1hcCgodiwgaSkgPT4gaSArIHN0YXJ0KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldE9wdGltYWxQZXJtdXRhdGlvbihpdGVtcyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKCh2LCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHt2YWw6IHYsIGlkeDogaX1cclxuICAgICAgICAgICAgICAgIH0pLnNvcnQoKGEsIGIpID0+IGEudmFsIC0gYi52YWwpLm1hcCgodiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHYuY2VsbCA9IGkgKyAxO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgICAgICAgICAgfSkuc29ydCgoYSwgYikgPT4gYS5pZHggLSBiLmlkeCkubWFwKCh2KSA9PiB2LmNlbGwpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0QWxsQ29tYmluYXRpb24oaXRlbXMsIGNvbWJTaXplKXtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPCAxIHx8IGNvbWJTaXplIDwgMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoY29tYlNpemUgPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcy5tYXAoKGl0ZW0pID0+IFtpdGVtXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBfaXRlbXMgPSBbLi4uaXRlbXNdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29tYmluYXRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICB3aGlsZShfaXRlbXMubGVuZ3RoID4gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYSA9IF9pdGVtcy5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGIgb2YgX2l0ZW1zKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29tYmluYXRpb25zLnB1c2goW2EsIGJdKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBjb21iaW5hdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgd2luZG93LlBlcm11dGF0aW9uID0gUGVybXV0YXRpb247XHJcbiAgICAgICAgcmV0dXJuIFBlcm11dGF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmROZWFyZXN0RmFjdG9yaWFsKHRhcmdldCwgYmFzZSA9IDEpe1xyXG4gICAgICAgIHJldHVybiBtYXRoLmZhY3RvcmlhbChiYXNlICsgMSkgPiB0YXJnZXQgPyBiYXNlIDogZmluZE5lYXJlc3RGYWN0b3JpYWwodGFyZ2V0LCBiYXNlICsgMSlcclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2FsZ28vcGVybXV0YXRpb24tc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzgwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLnNlcnZpY2UoJ3BvaW50RmFjdG9yeScsIHBvaW50RmFjdG9yeSk7XHJcbiAgICBwb2ludEZhY3RvcnkuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIHBvaW50RmFjdG9yeSgpe1xyXG4gICAgICAgIGNsYXNzIFJQb2ludCB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHgsIHkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW92ZShkeCwgZHkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ICs9IGR4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ICs9IGR5O1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbW92ZVRvKHgsIHkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXREaXN0YW5jZShycG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSBNYXRoLmFicyhycG9pbnQueCAtIHRoaXMueCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkeSA9IE1hdGguYWJzKHJwb2ludC55IC0gdGhpcy55KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoKGR4ICogZHgpICsgKGR5ICogZHkpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldE1pZFBvaW50KHJwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBteCA9IHRoaXMueCArIChycG9pbnQueCAtIHRoaXMueCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXkgPSB0aGlzLnkgKyAocnBvaW50LnkgLSB0aGlzLnkpIC8gMjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihteCwgbXkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29weSwgdGhpcy5fZ2V0UHJvcHNDb3B5KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldFNjYWxlZChzZil7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3B5ID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy54ICogc2YsIHRoaXMueSAqIHNmKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKGNvcHksIHRoaXMuX2dldFByb3BzQ29weSgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXRUcmFuc2Zvcm1lZCh4VHJhbnNGbiwgeVRyYW5zRm4pe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29weSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKHhUcmFuc0ZuKHRoaXMueCksIHlUcmFuc0ZuKHRoaXMueSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29weSwgdGhpcy5fZ2V0UHJvcHNDb3B5KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNsb25lKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3B5ID0gbmV3IHRoaXMuY29uc3RydWN0b3IodGhpcy54LCB0aGlzLnkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29weSwgdGhpcy5fZ2V0UHJvcHNDb3B5KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVxdWFscyhycG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29uc3RydWN0b3IgPT09IHJwb2ludC5jb25zdHJ1Y3RvclxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMueCA9PT0gcnBvaW50LnhcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnkgPT09IHJwb2ludC55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRvU3RyaW5nKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYFt4PSR7dGhpcy54fV1beT0ke3RoaXMueX1dYDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBfZ2V0UHJvcHNDb3B5KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcykucmVkdWNlKChyZXMsIGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChrZXkgIT09ICd4JyAmJiBrZXkgIT09ICd5Jyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc1trZXldID0gdGhpc1trZXldO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIFJWZWN0b3Ige1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihzdGFydCwgZW5kKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQgPSBzdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kID0gZW5kO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBYKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmQueCAtIHRoaXMuc3RhcnQueDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgWSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW5kLnkgLSB0aGlzLnN0YXJ0Lnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGxlbmd0aCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLlgsIDIpICsgTWF0aC5wb3codGhpcy5ZLCAyKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9hZGQocnZlY3Rvcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVuZC5tb3ZlKHJ2ZWN0b3IuWCwgcnZlY3Rvci5ZKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9tb3ZlKGR4LCBkeSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0Lm1vdmUoZHgsIGR5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kLm1vdmUoZHgsIGR5KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyYW5zbGF0ZShkeCwgZHkpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5fbW92ZShkeCwgZHkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHN1bShydmVjdG9yKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb25lKCkuX2FkZChydmVjdG9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZWFuKHJ2ZWN0b3Ipe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHggPSBydmVjdG9yLnN0YXJ0LnggLSB0aGlzLnN0YXJ0Lng7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkeSA9IHJ2ZWN0b3Iuc3RhcnQueSAtIHRoaXMuc3RhcnQueTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG12ID0gcnZlY3Rvci50cmFuc2xhdGUoZHgsIGR5KTtcclxuICAgICAgICAgICAgICAgIG12LmVuZC54ID0gKG12LmVuZC54ICsgdGhpcy5lbmQueCkgLyAyO1xyXG4gICAgICAgICAgICAgICAgbXYuZW5kLnkgPSAobXYuZW5kLnkgKyB0aGlzLmVuZC55KSAvIDI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbXY7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xvbmUoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUlZlY3Rvcih0aGlzLnN0YXJ0LmNsb25lKCksIHRoaXMuZW5kLmNsb25lKCkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuUlBvaW50ID0gUlBvaW50O1xyXG4gICAgICAgIHRoaXMuUlZlY3RvciA9IFJWZWN0b3I7XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0UG9pbnQgPSAoeCwgeSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJQb2ludCh4LCB5KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZG9tUG9pbnRzID0gKGFtb3VudCwgbWF4WCwgbWF4WSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSBJbW11dGFibGUuU2V0KCkuYXNNdXRhYmxlKCk7XHJcbiAgICAgICAgICAgIHdoaWxlKHBvaW50cy5zaXplIDwgYW1vdW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHB0ID0gbmV3IFJQb2ludCh0aGlzLmdldFJhbmRvbUNvb3JkKG1heFgpLCB0aGlzLmdldFJhbmRvbUNvb3JkKG1heFkpKTtcclxuICAgICAgICAgICAgICAgIHBvaW50cy5hZGQocHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBwb2ludHMudmFsdWVTZXEoKS50b0FycmF5KCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldFJhbmRvbVBvaW50ID0gKG1heFgsIG1heFkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSUG9pbnQodGhpcy5nZXRSYW5kb21Db29yZChtYXhYKSwgdGhpcy5nZXRSYW5kb21Db29yZChtYXhZKSlcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZG9tQ29vcmQgPSAobWF4KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXgpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL3BvaW50LWZhY3RvcnkuanNcbi8vIG1vZHVsZSBpZCA9IDc4MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCl7XHJcbiAgICB2cnAuc2VydmljZSgnJHNpbUFubmVhbCcsIHNpbUFubmVhbFNlcnZpY2UpO1xyXG4gICAgc2ltQW5uZWFsU2VydmljZS4kaW5qZWN0ID0gWyckcScsICckcGVybXV0YXRpb24nLCAnJGFwZWUnLCAnJGRvdWJsZScsICdwb2ludEZhY3RvcnknXTtcclxuXHJcbiAgICBmdW5jdGlvbiBzaW1Bbm5lYWxTZXJ2aWNlKCRxLCAkcGVybXV0YXRpb24sICRhcGVlLCAkZG91YmxlLCBwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNvbnN0IEJGTElNSVQgPSA1ZTU7XHJcbiAgICAgICAgY2xhc3MgU2ltQW5uZWFsU29sdXRpb24ge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcihwb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29zdCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQb2ludHMocG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGxlbmd0aCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0UG9pbnRzKHBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5zcGxpY2UoMCwgdGhpcy5wb2ludHMubGVuZ3RoLCAuLi5wb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3N0ID0gdGhpcy5nZXRDb3N0KCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0Q29zdCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNpbUFubmVhbFNvbHV0aW9uLmNhbGN1bGF0ZUNvc3QodGhpcy5wb2ludHMpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBleHBvcnQoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50cy5tYXAoKHBvaW50KSA9PiBbcG9pbnQueCwgcG9pbnQueV0uam9pbigpKS5qb2luKCdcXG4nKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXF1YWxzKHNvbHV0aW9uKXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzID09PSBzb2x1dGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoIShzb2x1dGlvbiBpbnN0YW5jZW9mIFNpbUFubmVhbFNvbHV0aW9uKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHNvbHV0aW9uLnBvaW50cy5maW5kSW5kZXgoKHBvaW50KSA9PiBwb2ludC5lcXVhbHModGhpcy5wb2ludHNbMF0pKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGFydEluZGV4ID4gLTFcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmNvc3QgPT09IHNvbHV0aW9uLmNvc3RcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLmxlbmd0aCA9PT0gc29sdXRpb24ubGVuZ3RoXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5wb2ludHMuZXZlcnkoKHAsIGksIGEpID0+IHAuZXF1YWxzKHNvbHV0aW9uLnBvaW50c1soaSArIHN0YXJ0SW5kZXgpICUgYS5sZW5ndGhdKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBjYWxjdWxhdGVDb3N0KHBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzLnJlZHVjZSgocmVzLCBwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMucHJldil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5jb3N0ICs9IHJlcy5wcmV2LmdldERpc3RhbmNlKHBvaW50KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzLnByZXYgPSBwb2ludDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwge2Nvc3Q6IDAsIHByZXY6IG51bGx9KS5jb3N0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2xhc3MgU2ltQW5uZWFsIGV4dGVuZHMgJGFwZWUuQVBFdmVudEVtaXR0ZXIge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciAoYmFzZSwgbWF4VGVtcGVyYXR1cmUsIG1pblRlbXBlcmF0dXJlLCBpc0Nsb3NlZCl7XHJcbiAgICAgICAgICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJhc2UubGVuZ3RoIDwgMyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTaW1Bbm5lYWwgYWNjZXB0cyBvbmx5IHNlcXVlbmNlcyB3aXRoIGxlbmd0aCAzKycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGFzdCA9IGJhc2VbYmFzZS5sZW5ndGggLSAxXTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0Nsb3NlZCAmJiBsYXN0ICYmIGJhc2VbMF0gJiYgIWxhc3QuZXF1YWxzKGJhc2VbMF0pKXtcclxuICAgICAgICAgICAgICAgICAgICBiYXNlLnB1c2goYmFzZVswXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9iYXNlID0gYmFzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gJHBlcm11dGF0aW9uLmdldFJhbmRvbVBlcm11dGF0aW9uKCRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZShiYXNlLmxlbmd0aCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RlcCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydCA9IG1heFRlbXBlcmF0dXJlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcGVyYXR1cmUgPSBtYXhUZW1wZXJhdHVyZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2xpbWl0ID0gbWluVGVtcGVyYXR1cmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zb2x1dGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2V4YWN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9iYXNlLmxlbmd0aCA8IDEwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJydXRlRm9yY2UoKS50aGVuKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXhhY3QgPSBuZXcgU2ltQW5uZWFsU29sdXRpb24ocmVzdWx0LnN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5faGFzaCA9IHRoaXMuaGFzaENvZGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGN1cnJlbnRDb3N0KCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FsY3VsYXRlQ29zdCh0aGlzLl9zdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS5zcGxpY2UoMCwgdGhpcy5fc3RhdGUubGVuZ3RoLCAuLi5zdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IHBvaW50cygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgaXNEb25lKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKHRoaXMuX3RlbXBlcmF0dXJlIDw9IHRoaXMuX2xpbWl0IHx8ICh0aGlzLl9leGFjdCAmJiB0aGlzLl9leGFjdC5jb3N0ID09PSB0aGlzLmN1cnJlbnRDb3N0KSkgJiYgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0IGlzRG9uZShib29sKXtcclxuICAgICAgICAgICAgICAgIGlmICghIWJvb2wpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGlzUnVubmluZygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXAgPiAxICYmIHRoaXMuX3RlbXBlcmF0dXJlID4gdGhpcy5fbGltaXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGluZm8oKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgUm91dGUgbGVuZ3RoOiAke3RoaXMuY3VycmVudENvc3R9IFN0ZXA6ICR7dGhpcy5fc3RlcH0gVGVtcGVyYXR1cmU6ICR7dGhpcy5fdGVtcGVyYXR1cmV9YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBzb2x1dGlvbnMoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb2x1dGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGhhc2hDb2RlKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFzZS5yZWR1Y2UoKHJlcywgaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghcmVzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gJGRvdWJsZS5kb3VibGVUb0xvbmdCaXRzKGl0ZW0ueCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyA9IE1hdGguaW11bCgzMSwgcmVzKSArIGl0ZW0ueSB8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gTWF0aC5pbXVsKDMxLCByZXMpICsgaXRlbS54IHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gTWF0aC5pbXVsKDMxLCByZXMpICsgaXRlbS55IHwgMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgIH0sIDApXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldFN0YXRlKHN0YXRlID0gdGhpcy5fc3RhdGUpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLm1hcCgodikgPT4gdGhpcy5fYmFzZVt2XSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FsY3VsYXRlQ29zdChzdGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2ludHMgPSB0aGlzLmdldFN0YXRlKHN0YXRlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBTaW1Bbm5lYWxTb2x1dGlvbi5jYWxjdWxhdGVDb3N0KHBvaW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZVByb2JhYmlsaXR5KGRlbHRhQ29zdCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5leHAoLTEgKiBkZWx0YUNvc3QgLyB0aGlzLl90ZW1wZXJhdHVyZSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGVjcmVhc2VUZW1wZXJhdHVyZSgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcGVyYXR1cmUgPSAodGhpcy5fc3RhcnQgKiAwLjMpIC8gdGhpcy5fc3RlcDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0ZXArKztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0Q2FuZGlkYXRlKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgYSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX3N0YXRlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBsZXQgYiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX3N0YXRlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYSA+IGIpe1xyXG4gICAgICAgICAgICAgICAgICAgIFthLCBiXSA9IFtiLCBhXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2VnbWVudCA9IHRoaXMuX3N0YXRlLnNsaWNlKGEsIGIpLnJldmVyc2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBbLi4udGhpcy5fc3RhdGUuc2xpY2UoMCwgYSksIC4uLnNlZ21lbnQsIC4uLnRoaXMuX3N0YXRlLnNsaWNlKGIpXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicnV0ZUZvcmNlKGxpbWl0ID0gQkZMSU1JVCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEoKHJlc29sdmUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9ICRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZSh0aGlzLl9iYXNlLmxlbmd0aCwgMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gJHBlcm11dGF0aW9uLmdldExpbWl0ZWRQZXJtdXRhdGlvbnMoaXRlbXMsIGxpbWl0KS5yZWR1Y2UoKHJlcywgc3RhdGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY29zdCA9IHRoaXMuY2FsY3VsYXRlQ29zdChzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXMuY29zdCA8IDAgfHwgY29zdCA8IHJlcy5jb3N0KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5jb3N0ID0gY29zdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5zdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge3N0YXRlOiBudWxsLCBjb3N0OiAtMX0pO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJlbmNobWFyayhsaW1pdCA9IEJGTElNSVQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhcnQgPSBtb21lbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmJydXRlRm9yY2UobGltaXQpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVuZCA9IG1vbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBkdXJhdGlvbiA9IGVuZC5kaWZmKHN0YXJ0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBiZW5jaCA9IG1hdGguZGl2aWRlKGR1cmF0aW9uLCBsaW1pdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdG90YWwgPSBtYXRoLmZhY3RvcmlhbCh0aGlzLl9iYXNlLmxlbmd0aCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXN0aW1hdGUgPSBtb21lbnQuZHVyYXRpb24odG90YWwgKiBiZW5jaCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHtiZW5jaCwgZHVyYXRpb24sIGVzdGltYXRlLCBsaW1pdCwgdG90YWx9LCByZXN1bHQpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBuZXh0KCl7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0RvbmUgfHwgdGhpcy5fc3RlcCA+IDEwMDAwMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZSA9IHRoaXMuZ2V0Q2FuZGlkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYW5kaWRhdGVDb3N0ID0gdGhpcy5jYWxjdWxhdGVDb3N0KGNhbmRpZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Q29zdCA9IHRoaXMuY3VycmVudENvc3Q7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkZWx0YUNvc3QgPSBjYW5kaWRhdGVDb3N0IC0gY3VycmVudENvc3Q7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFDb3N0IDwgMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBjYW5kaWRhdGU7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb2JhYmlsaXR5ID0gdGhpcy5jYWxjdWxhdGVQcm9iYWJpbGl0eShkZWx0YUNvc3QpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRyaWdnZXIgPSBNYXRoLnJhbmRvbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmlnZ2VyIDw9IHByb2JhYmlsaXR5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBjYW5kaWRhdGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kZWNyZWFzZVRlbXBlcmF0dXJlKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzdWx0cy5wdXNoKGN1cnJlbnRDb3N0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Q29zdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RvcCgpe1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3N0ZXAgPT09IDEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcGVyYXR1cmUgPSAwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWRkU29sdXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzZXQoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0ZXAgPSAxO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fdGVtcGVyYXR1cmUgPSB0aGlzLl9zdGFydDtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlID0gJHBlcm11dGF0aW9uLmdldFJhbmRvbVBlcm11dGF0aW9uKCRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZSh0aGlzLl9iYXNlLmxlbmd0aCwgMCkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFNvbHV0aW9uKHBvaW50cyA9IHRoaXMucG9pbnRzKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHV0aW9uID0gbmV3IFNpbUFubmVhbFNvbHV0aW9uKHBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2U29sdXRpb24gPSB0aGlzLmdldExhc3RTb2x1dGlvbigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFwcmV2U29sdXRpb24gfHwgIXByZXZTb2x1dGlvbi5lcXVhbHMoc29sdXRpb24pKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb2x1dGlvbnMucHVzaChzb2x1dGlvbik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0TGFzdFNvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc29sdXRpb25zW3RoaXMuX3NvbHV0aW9ucy5sZW5ndGggLSAxXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRCZXN0U29sdXRpb24oKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb2x1dGlvbnMucmVkdWNlKChhLCBiKSA9PiBhLmNvc3QgPCBiLmNvc3QgPyBhIDogYilcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0U29sdXRpb24oaWR4KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb2x1dGlvbnNbaWR4XVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgY2FsY3VsYXRlU2VnbWVudENvc3QocG9pbnRBLCBwb2ludEIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5zcXJ0KE1hdGgucG93KChwb2ludEEueCAtIHBvaW50Qi54KSwgMikgKyBNYXRoLnBvdygocG9pbnRBLnkgLSBwb2ludEIueSksIDIpKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldFByZXNldEluc3RhbmNlID0gKGJhc2UsIG1heFQsIG1pblQsIGlzQ2xvc2VkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluc3RhbmNlID0gbmV3IFNpbUFubmVhbChiYXNlLCBtYXhULCBtaW5ULCBpc0Nsb3NlZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnN0YW5jZS5hZGRTb2x1dGlvbihpbnN0YW5jZS5fYmFzZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGFtb3VudCwgcmFuZ2UsIG1heFQsIG1pblQsIGlzQ2xvc2VkKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhc2UgPSBwb2ludEZhY3RvcnkuZ2V0UmFuZG9tUG9pbnRzKGFtb3VudCwgcmFuZ2UsIHJhbmdlKTtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBTaW1Bbm5lYWwoYmFzZSwgbWF4VCwgbWluVCwgaXNDbG9zZWQpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5TaW1Bbm5lYWwgPSBTaW1Bbm5lYWw7XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL3NpbS1hbm5lYWwtc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzgyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qUHJvdmlkZXIgdG8gcHJvZHVjZSBpbmRlcGVuZGVudCBpbnN0YW5jZXMgb2YgQVBJIHJlcXVlc3RzLlxyXG4gKiBVc2FnZTogJGFwcmVxdWVzdC5ieU5hbWUobmFtZSkuc2VuZChwYXJhbXMsZGF0YSkudGhlbigpXHJcbiAqIEBuYW1lOiBuYW1lIG9mIGNvbmZpZyB0ZW1wbGF0ZVxyXG4gKiBAcGFyYW1zOiBvYmplY3QgdG8gc2VyaWFsaXplIGFuZCBhZGQgdG8gdGhlIFVSTC4gQnkgZGVmYXVsdCBzZXJpYWxpemVkIHRvIFVSTCBzdHJpbmcsIGJ1dCBjYW4gYmUgb3ZlcnJpZGVuIHdpdGggY3VzdG9tIHNlcnZpY2VcclxuICogICAgICAgYnkgc2V0dGluZyBwYXJhbVNlcmlhbGl6ZXIgcHJvcGVydHkgaW4gY29uZmlnIHRlbXBsYXRlLiBzbGFzaFBhcmFtU2VyaWFsaXplciBjb252ZXJ0cyBwYXJhbXMgdG8gL2tleTEvdmFsdWUxL2tleTIvdmFsdWUyL1xyXG4gKiBAZGF0YTogb2JqZWN0IHBhc3NlZCB3aXRoaW4gcmVxdWVzdCBib2R5XHJcbiAqICovXHJcbm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLnByb3ZpZGVyKCdhcGlSZXF1ZXN0JywgW2Z1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgdGhpcy4kZ2V0ID0gWyckdGltZW91dCcsICckcScsICckaHR0cCcsICckaW5qZWN0b3InLCBmdW5jdGlvbiAoJHRpbWVvdXQsICRxLCAkaHR0cCwgJGluamVjdG9yKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluamVjdCA9IHRoaXMuJGluamVjdDtcclxuICAgICAgICAgICAgY2xhc3MgQXBpUmVxdWVzdCB7XHJcbiAgICAgICAgICAgICAgICBjb25zdHJ1Y3RvciAob2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGFyYW1zID0gb2JqLnBhcmFtcztcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kYXRhID0gb2JqLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXJsID0gb2JqLnVybDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tZXRob2QgPSBvYmoubWV0aG9kO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2hlYWRlcnMgPSB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ307XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oZWFkZXJzKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLl9oZWFkZXJzLCBvYmouaGVhZGVycyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoucGFyYW1TZXJpYWxpemVyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wYXJhbVNlcmlhbGl6ZXIgPSAkaW5qZWN0b3IuZ2V0KG9iai5wYXJhbVNlcmlhbGl6ZXIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fcGFyYW1zICYmIHRoaXMucGFyYW1TZXJpYWxpemVyKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VybCA9IHRoaXMucGFyYW1TZXJpYWxpemVyKHRoaXMuX3BhcmFtcywgdGhpcy5fdXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGdldCBwYXJhbXMoKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIXRoaXMucGFyYW1TZXJpYWxpemVyID8gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5fcGFyYW1zKSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZXQgZGF0YSgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9kYXRhKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdldCB1cmwoKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2V0IG1ldGhvZCgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tZXRob2Q7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZXQgaGVhZGVycygpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWFkZXJzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGJ1aWxkVXJsKHBhcmFtcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBhcmFtU2VyaWFsaXplciB8fCAhcGFyYW1zKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VybDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyYW1TZXJpYWxpemVyKHBhcmFtcywgdGhpcy5fdXJsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzZW5kIChwYXJhbXMsIGRhdGEsIHVybEZvcm1hdEFyZ3MgPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKHBhcmFtcyB8fCB7fSwgdGhpcy5wYXJhbXMpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQoZGF0YSB8fCB7fSwgdGhpcy5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYodXJsRm9ybWF0QXJncykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZm9ybWF0ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3JlYXRlIDogKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCByZWdleHAgPSAveyhbXntdKyl9L2c7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihzdHIsIG8pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4cCwgZnVuY3Rpb24oaWdub3JlLCBrZXkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICEoa2V5ID0gb1trZXldKSA/ICcnIDoga2V5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1hdHRlZFVybCA9IGZvcm1hdC5jcmVhdGUodGhpcy51cmwsIHVybEZvcm1hdEFyZ3MpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVkVXJsID0gdGhpcy5idWlsZFVybChwYXJhbXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB0aGlzLmhlYWRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybDogL15cXC8uKy8udGVzdCh0aGlzLmZvcm1hdHRlZFVybCApID8gdGhpcy5mb3JtYXR0ZWRVcmwgIDogYC8ke3RoaXMuZm9ybWF0dGVkVXJsIH1gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IHRoaXMucGFyYW1TZXJpYWxpemVyID8gbnVsbCA6IHBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZGF0YVxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRodHRwKGNvbmZpZykudGhlbigocmVzcG9uc2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbmRNdWx0aXBhcnQocGFyYW1zLCBkYXRhKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmZCA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGRhdGEpLmZvckVhY2goKGtleSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YVtrZXldIGluc3RhbmNlb2YgRmlsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZC5hcHBlbmQoa2V5LCBkYXRhW2tleV0sIGRhdGFba2V5XS5uYW1lKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmQuYXBwZW5kKGtleSwgZGF0YVtrZXldKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IHBhcmFtcyA/IHRoaXMuYnVpbGRVcmwocGFyYW1zKSA6IHRoaXMudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeydDb250ZW50LVR5cGUnOiB1bmRlZmluZWR9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1SZXF1ZXN0OiBhbmd1bGFyLmlkZW50aXR5XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHBbdGhpcy5tZXRob2QudG9Mb3dlckNhc2UoKV0odXJsLCBmZCwgY29uZmlnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gYnlDb25maWcgKGNvbmZpZykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBBcGlSZXF1ZXN0KGNvbmZpZyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGZ1bmN0aW9uIHJlc3RmdWwgKHBhcmFtcywgbWV0aG9kID0gJ0dFVCcsIHVybCA9ICcvYXBpLycpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcyxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbVNlcmlhbGl6ZXI6ICdzbGFzaFBhcmFtU2VyaWFsaXplcidcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFwaVJlcXVlc3QoY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIGdldEluc3RhbmNlOiBieUNvbmZpZyxcclxuICAgICAgICAgICAgICAgIGdldFJlc3RJbnN0YW5jZTogcmVzdGZ1bFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfV07XHJcbiAgICB9XSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvYXBpL2FwaS1yZXF1ZXN0LXByb3ZpZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3ODNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAoYXBmcm9udCkgPT4ge1xyXG4gICAgYXBmcm9udC5zZXJ2aWNlKCdzbGFzaFBhcmFtU2VyaWFsaXplcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBzZXJpYWxpemVWYWx1ZSh2KSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KHYpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc0RhdGUodikgPyB2LnRvSVNPU3RyaW5nKCkgOiBhbmd1bGFyLnRvSnNvbih2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBwYXJhbVNlcmlhbGl6ZXIocGFyYW1zLCB1cmwpIHtcclxuICAgICAgICAgICAgaWYgKCFwYXJhbXMpIHJldHVybiB1cmw7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdXJsICsgT2JqZWN0LmtleXMocGFyYW1zKS5yZWR1Y2UoKHJlcywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgcGFpciA9IFtrZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtc1trZXldICYmICFhbmd1bGFyLmlzT2JqZWN0KHBhcmFtc1trZXldKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhaXIucHVzaChlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0udG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyUyMC9nLCAnKycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bXFwuXFwqXFwtXFwhXFx+XFwoXFwpXS9nLCAnJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcJVxcd3syfS9nLCAnJykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsuLi5yZXMsIC4uLnBhaXJdXHJcbiAgICAgICAgICAgIH0sIFtdKS5qb2luKCcvJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvYXBpL3NsYXNoLXBhcmFtLXNlcmlhbGl6ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc4NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGFwZnJvbnQpIHtcclxuICAgIGFwZnJvbnQuc2VydmljZSgndHBsUXVlcnlTZXJpYWxpemVyJywgdHBsUXVlcnlTZXJpYWxpemVyKTtcclxuICAgIHRwbFF1ZXJ5U2VyaWFsaXplci4kaW5qZWN0ID0gWyckaHR0cFBhcmFtU2VyaWFsaXplcicsICdkYXRlVXRpbHMnXTtcclxuXHJcbiAgICBmdW5jdGlvbiB0cGxRdWVyeVNlcmlhbGl6ZXIoJGh0dHBQYXJhbVNlcmlhbGl6ZXIsICRhcERhdGVVdGlscykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAocGFyYW1zLCB1cmwpIHtcclxuICAgICAgICAgICAgaWYgKCFwYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB1cmxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgcGFyc2VkVXJsID0gT2JqZWN0LmtleXMocGFyYW1zKS5yZWR1Y2UoKHJlcywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlcy5pbmNsdWRlcygnOicgKyBrZXkpKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRlID0gJGFwRGF0ZVV0aWxzLnBhcnNlRGF0ZShwYXJhbXNba2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlcnlba2V5XSA9IGRhdGUgPyAkYXBEYXRlVXRpbHMubG9jYWxBc1V0YyhkYXRlKSA6IHBhcmFtc1trZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5yZXBsYWNlKCc6JyArIGtleSwgZW5jb2RlVVJJQ29tcG9uZW50KHBhcmFtc1trZXldID8gcGFyYW1zW2tleV0udG9TdHJpbmcoKSA6ICcwJykpXHJcbiAgICAgICAgICAgIH0sIHVybCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMocXVlcnkpLmxlbmd0aCA/IHBhcnNlZFVybCArICc/JyArICRodHRwUGFyYW1TZXJpYWxpemVyKHF1ZXJ5KSA6IHBhcnNlZFVybDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hcGkvdHBsLXF1ZXJ5LXNlcmlhbGl6ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc4NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5kaXJlY3RpdmUoJ2tNZWFuJywga01lYW5EaXJlY3RpdmUpO1xyXG4gICAga01lYW5EaXJlY3RpdmUuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGtNZWFuRGlyZWN0aXZlKCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9rLW1lYW4tdHBsLmh0bWwnKSxcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0tNZWFuQ29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2N0cmwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZycC5jb250cm9sbGVyKCdLTWVhbkNvbnRyb2xsZXInLCBLTWVhbkNvbnRyb2xsZXIpO1xyXG4gICAgS01lYW5Db250cm9sbGVyLiRpbmplY3QgPSBbJyRrbWVhbicsICckY29sb3JkZWYnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBLTWVhbkNvbnRyb2xsZXIoJGttZWFuLCAkY29sb3JkZWYpe1xyXG4gICAgICAgIHRoaXMucG9pbnRDb3VudCA9IDEwMDtcclxuICAgICAgICB0aGlzLmNsdXN0ZXJDb3VudCA9IDM7XHJcbiAgICAgICAgdGhpcy5tYXBXaWR0aCA9IDY0MDtcclxuICAgICAgICB0aGlzLm1hcEhlaWdodCA9IDQ4MDtcclxuICAgICAgICB0aGlzLmttZWFuID0gJGttZWFuLmdldEluc3RhbmNlKHRoaXMucG9pbnRDb3VudCwgdGhpcy5jbHVzdGVyQ291bnQsIHRoaXMubWFwV2lkdGgsIHRoaXMubWFwSGVpZ2h0KTtcclxuICAgICAgICB0aGlzLmNvbG9ycyA9IFsnI0Y0NDMzNicsICcjMjE5NkYzJywgJyNGRjk4MDAnLCAnIzhCQzM0QScsICcjOUMyN0IwJywgJyMwMDk2ODgnLCAnI0ZGQzEwNycsICcjNENBRjUwJywgJyNFOTFFNjMnLCAnIzAwQkNENCddO1xyXG5cclxuICAgICAgICB0aGlzLnJlc2V0Q2x1c3RlcnMgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua21lYW4gJiYgdGhpcy5rbWVhbi5yZXNldEFsbENsdXN0ZXJzKCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5ydW5DbHVzdGVyaW5nU3RlcCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rbWVhbiAmJiB0aGlzLmttZWFuLmNsdXN0ZXJpbmdTdGVwKClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJlYnVpbGQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMua21lYW4gPSAka21lYW4uZ2V0SW5zdGFuY2UodGhpcy5wb2ludENvdW50LCB0aGlzLmNsdXN0ZXJDb3VudCwgdGhpcy5tYXBXaWR0aCwgdGhpcy5tYXBIZWlnaHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA3ODZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIG5nLXN0eWxlPVxcXCJ7J21heC13aWR0aCc6IChjdHJsLm1hcFdpZHRoICsgMTYwKSArICdweCd9XFxcIiBmbGV4PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLWNvbnRyb2xzXFxcIiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg9XFxcIjQ1XFxcIj5cXHJcXG4gICAgICAgICAgICA8bWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4+V2lkdGg8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCI1MDBcXFwiIG1heD1cXFwiMTIwMFxcXCIgbmctbW9kZWw9XFxcImN0cmwubWFwV2lkdGhcXFwiIGFyaWEtbGFiZWw9XFxcIm1hcCB3aWR0aFxcXCIgY2xhc3M9XFxcIm1kLXdhcm5cXFwiPjwvbWQtc2xpZGVyPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwubWFwV2lkdGhcXFwiIGFyaWEtbGFiZWw9XFxcIm1hcCB3aWR0aFxcXCIgYXJpYS1jb250cm9scz1cXFwibWFwLXNpemUtc2xpZGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPC9tZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8c3Bhbj5IZWlnaHQ8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCI1MDBcXFwiIG1heD1cXFwiMTIwMFxcXCIgbmctbW9kZWw9XFxcImN0cmwubWFwSGVpZ2h0XFxcIiBhcmlhLWxhYmVsPVxcXCJtYXAgaGVpZ2h0XFxcIiBjbGFzcz1cXFwibWQtd2FyblxcXCI+PC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXBIZWlnaHRcXFwiIGFyaWEtbGFiZWw9XFxcIm1hcCBoZWlnaHRcXFwiIGFyaWEtY29udHJvbHM9XFxcIm1hcC1zaXplLXNsaWRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDwvbWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb2ludHM8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCI0XFxcIiBtYXg9XFxcIjMwMFxcXCIgbmctbW9kZWw9XFxcImN0cmwucG9pbnRDb3VudFxcXCIgYXJpYS1sYWJlbD1cXFwicG9pbnRzXFxcIiBjbGFzcz1cXFwibWQtd2FyblxcXCI+PC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5wb2ludENvdW50XFxcIiBhcmlhLWxhYmVsPVxcXCJwb2ludHMgbnVtYmVyXFxcIiBhcmlhLWNvbnRyb2xzPVxcXCJwb2ludHMtbnVtYmVyLXNsaWRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDwvbWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8bWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPHNwYW4+Q2x1c3RlcnM8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCIyXFxcIiBtYXg9XFxcIjEwXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5jbHVzdGVyQ291bnRcXFwiIGFyaWEtbGFiZWw9XFxcInBvaW50c1xcXCIgY2xhc3M9XFxcIm1kLXdhcm5cXFwiPjwvbWQtc2xpZGVyPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwuY2x1c3RlckNvdW50XFxcIiBhcmlhLWxhYmVsPVxcXCJjbHVzdGVyIGNvdW50XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPC9tZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwiY2VudGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIG5nLWNsaWNrPVxcXCJjdHJsLnJlYnVpbGQoKVxcXCIgYXJpYS1sYWJlbD1cXFwicmVidWlsZFxcXCI+TmV3PC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gbmctY2xpY2s9XFxcImN0cmwucmVzZXRDbHVzdGVycygpXFxcIiBhcmlhLWxhYmVsPVxcXCJyZXNldCBjbHVzdGVyc1xcXCI+UmVzZXQ8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBjbGFzcz1cXFwibWQtcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcImN0cmwucnVuQ2x1c3RlcmluZ1N0ZXAoKVxcXCIgYXJpYS1sYWJlbD1cXFwicnVuIGNsdXN0ZXJpbmcgc3RlcFxcXCI+TmV4dDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLWRyYXctc2Nyb2xsZXJcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLWNvbnRhaW5lclxcXCIgbmctc3R5bGU9XFxcInsnaGVpZ2h0JzogY3RybC5tYXBIZWlnaHQgKyAncHgnLCAnd2lkdGgnOiBjdHJsLm1hcFdpZHRoICsgJ3B4J31cXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImstbWVhbi1sYXllclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImstbWVhbi1wb2ludC13cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgbmctcmVwZWF0PVxcXCJwb2ludCBpbiBjdHJsLmttZWFuLnBvaW50c1xcXCIgY2xhc3M9XFxcImstbWVhbi1wb2ludFxcXCIgbmctc3R5bGU9XFxcInsndG9wJzogcG9pbnQueSArICdweCcsICdsZWZ0JzogcG9pbnQueCArICdweCd9XFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLWxheWVyXFxcIiBuZy1yZXBlYXQ9XFxcImNsdXN0ZXIgaW4gY3RybC5rbWVhbi5jbHVzdGVyc1xcXCIgbmctc3R5bGU9XFxcInsnei1pbmRleCc6IChjbHVzdGVyLmluZGV4ICsgMSkgKiAxMH1cXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrLW1lYW4tcG9pbnQtd3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrLW1lYW4tcG9pbnRcXFwiIG5nLXJlcGVhdD1cXFwicG9pbnQgaW4gY2x1c3Rlci5wb2ludHNcXFwiIG5nLXN0eWxlPVxcXCJ7J3RvcCc6IHBvaW50LnkgKyAncHgnLCAnbGVmdCc6IHBvaW50LnggKyAncHgnLCAnYm9yZGVyLWNvbG9yJzogY3RybC5jb2xvcnNbY2x1c3Rlci5pbmRleF19XFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImstbWVhbi1wb2ludCBrLW1lYW4tY2VudHJvaWRcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgIG5nLXN0eWxlPVxcXCJ7J3RvcCc6IGNsdXN0ZXIuY2VudHJvaWQueSArICdweCcsXFxyXFxuICAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiBjbHVzdGVyLmNlbnRyb2lkLnggKyAncHgnLFxcclxcbiAgICAgICAgICAgICAgICAgICAgICdib3JkZXItY29sb3InOiBjdHJsLmNvbG9yc1tjbHVzdGVyLmluZGV4XSxcXHJcXG4gICAgICAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGN0cmwuY29sb3JzW2NsdXN0ZXIuaW5kZXhdfVxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9rLW1lYW4vay1tZWFuLXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA3ODdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuc2VydmljZSgnJGttZWFuJywga01lYW5TZXJ2aWNlKTtcclxuICAgIGtNZWFuU2VydmljZS4kaW5qZWN0ID0gWydwb2ludEZhY3RvcnknXTtcclxuXHJcbiAgICBmdW5jdGlvbiBrTWVhblNlcnZpY2UocG9pbnRGYWN0b3J5KXtcclxuICAgICAgICBjbGFzcyBDbHVzdGVyIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoaW5kZXgsIGNlbnRyb2lkKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2VudHJvaWQgPSBjZW50cm9pZDtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzID0gW107XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBzaXplKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYWxjdWxhdGVDZW50cm9pZCgpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW2F2Z1gsIGF2Z1ldID0gdGhpcy5wb2ludHMucmVkdWNlKChyZXMsIHJwKSA9PiBbcmVzWzBdICsgcnAueCwgcmVzWzFdICsgcnAueV0sIFswLCAwXSkubWFwKChjb29yZCkgPT4gY29vcmQgLyB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZW50cm9pZCA9IG5ldyBwb2ludEZhY3RvcnkuUlBvaW50KGF2Z1gsIGF2Z1kpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFBvaW50KHJwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnBvaW50cy5maW5kSW5kZXgoKHApID0+IHAuZXF1YWxzKHJwb2ludCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLnB1c2gocnBvaW50KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZW1vdmVQb2ludChycG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5wb2ludHMuZmluZEluZGV4KChwKSA9PiBwLmVxdWFscyhycG9pbnQpKTtcclxuICAgICAgICAgICAgICAgIGlmIChpZHggPiAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludHMuc3BsaWNlKGlkeCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzZXQoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50cy5zcGxpY2UoMCwgdGhpcy5wb2ludHMubGVuZ3RoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXF1YWxzKGNsdXN0ZXIpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2l6ZSA9PT0gY2x1c3Rlci5zaXplICYmIHRoaXMucG9pbnRzLnJlZHVjZSgocmVzLCBwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IGNsdXN0ZXIucG9pbnRzLmZpbmRJbmRleCgoY3B0KSA9PiBjcHQuZXF1YWxzKHBvaW50KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkeCA+IC0xID8gcmVzICsgMSA6IHJlcztcclxuICAgICAgICAgICAgICAgIH0sIDApID09PSB0aGlzLnNpemU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgY2xhc3MgS01lYW5DbHVzdGVyc3tcclxuICAgICAgICAgICAgY29uc3RydWN0b3IgKG5wb2ludHMsIG5jbHVzdGVycywgd2lkdGgsIGhlaWdodCl7XHJcbiAgICAgICAgICAgICAgICBpZiAobmNsdXN0ZXJzID49IG5wb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdUaGVyZSBzaG91bGQgYmUgbGFzcyBjbHVzdGVycyB0aGFuIHBvaW50cycpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQgfHwgd2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cyA9IHBvaW50RmFjdG9yeS5nZXRSYW5kb21Qb2ludHMobnBvaW50cywgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsdXN0ZXJzID0gbmV3IEFycmF5KG5jbHVzdGVycykuZmlsbCgwKS5tYXAoKHYsIGkpID0+IG5ldyBDbHVzdGVyKGksIHBvaW50RmFjdG9yeS5nZXRSYW5kb21Qb2ludCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgbWF4RGlzdGFuY2UoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLnNxcnQoKHRoaXMud2lkdGggKiB0aGlzLndpZHRoKSArICh0aGlzLmhlaWdodCAqIHRoaXMuaGVpZ2h0KSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2x1c3RlcmluZ1N0ZXAoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRBbGxDbHVzdGVycygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMuZm9yRWFjaCgocG9pbnQsIHBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuY2x1c3RlcnMucmVkdWNlKChyZXMsIGNsdXN0ZXIsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQuZ2V0RGlzdGFuY2UoY2x1c3Rlci5jZW50cm9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYERpc3RhbmNlIGJldHdlZW4gcG9pbnRzICR7cG9pbnQudG9TdHJpbmcoKX0gYW5kICR7Y2x1c3Rlci5jZW50cm9pZC50b1N0cmluZygpfSA9ICR7ZGlzdH0uIE1heCBkaXN0YW5jZSBpcyAke3RoaXMubWF4RGlzdGFuY2V9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNbMF0gPCBkaXN0ID8gcmVzIDogW2Rpc3QsIGlkeF1cclxuICAgICAgICAgICAgICAgICAgICB9LCBbdGhpcy5tYXhEaXN0YW5jZSwgLTFdKTtcclxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGBQb2ludCAke3BpZHh9OiAke3BvaW50LnRvU3RyaW5nKCl9IGJlbG9uZ3MgdG8gdGhlIGNsdXN0ZXIgJHtpbmRleH1gKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsdXN0ZXJzW2luZGV4WzFdXSAmJiB0aGlzLmNsdXN0ZXJzW2luZGV4WzFdXS5hZGRQb2ludChwb2ludCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucmVjYWxjQWxsQ2x1c3RlcnMoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVjYWxjQWxsQ2x1c3RlcnMoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsdXN0ZXJzLmZvckVhY2goKGNsdXN0ZXIpID0+IGNsdXN0ZXIuY2FsY3VsYXRlQ2VudHJvaWQoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVzZXRBbGxDbHVzdGVycygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2x1c3RlcnMuZm9yRWFjaCgoY2x1c3RlcikgPT4gY2x1c3Rlci5yZXNldCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRJbnN0YW5jZSA9IChucG9pbnRzLCBuY2x1c3RlcnMsIHdpZHRoLCBoZWlnaHQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBLTWVhbkNsdXN0ZXJzKG5wb2ludHMsIG5jbHVzdGVycywgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvay1tZWFuL2stbWVhbi1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3ODhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApe1xyXG4gICAgdnJwLmRpcmVjdGl2ZSgncm91dGVEcmF3Jywgcm91dGVEcmF3RGlyZWN0aXZlKTtcclxuICAgIHJvdXRlRHJhd0RpcmVjdGl2ZS4kaW5qZWN0ID0gWyckcScsICckdGltZW91dCddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJvdXRlRHJhd0RpcmVjdGl2ZSgkcSwgJHRpbWVvdXQpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vcm91dGUtZHJhdy10cGwuaHRtbCcpLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnUm91dGVEcmF3Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2N0cmwnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2cnAuY29udHJvbGxlcignUm91dGVEcmF3Q29udHJvbGxlcicsIFJvdXRlRHJhd0NvbnRyb2xsZXIpO1xyXG4gICAgUm91dGVEcmF3Q29udHJvbGxlci4kaW5qZWN0ID0gWyckZWxlbWVudCcsICckdGltZW91dCcsICckc2ltQW5uZWFsJywgJ3BvaW50RmFjdG9yeSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIFJvdXRlRHJhd0NvbnRyb2xsZXIoJGVsZW1lbnQsICR0aW1lb3V0LCAkc2ltQW5uZWFsLCBwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNvbnN0IGNvbG9ycyA9IFtcclxuICAgICAgICAgICAgJyMyMTk2RjMnLFxyXG4gICAgICAgICAgICAnI0Y0NDMzNicsXHJcbiAgICAgICAgICAgICcjRkZDMTA3JyxcclxuICAgICAgICAgICAgJyM0Q0FGNTAnLFxyXG4gICAgICAgICAgICAnI0ZGOTgwMCcsXHJcbiAgICAgICAgICAgICcjMDA5Njg4JyxcclxuICAgICAgICAgICAgJyM5QzI3QjAnLFxyXG4gICAgICAgICAgICAnI0ZGRUIzQicsXHJcbiAgICAgICAgICAgICcjM0Y1MUI1JyxcclxuICAgICAgICAgICAgJyNDRERDMzknXHJcbiAgICAgICAgXTtcclxuICAgICAgICB0aGlzLm1hcFNpemUgPSAkZWxlbWVudFswXS5vZmZzZXRXaWR0aCAtIDE2O1xyXG4gICAgICAgIHRoaXMubWF4VGVtcCA9IDEwO1xyXG4gICAgICAgIHRoaXMubWluVGVtcCA9IDAuMDAwMDU7XHJcbiAgICAgICAgdGhpcy5wb2ludHNOdW1iZXIgPSAyMDtcclxuICAgICAgICB0aGlzLnNpbUFubmVhbCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5iZXN0Um91dGUgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudXNlUHJlc2V0ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc0Nsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMucHJlc2V0ID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNvbG9ySXRlcmF0b3IgPSBjb2xvcnMudmFsdWVzKCk7XHJcblxyXG4gICAgICAgIHRoaXMucmVidWlsZFJvdXRlID0gKHJlc2V0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyYXdFbGVtID0gJCgnLnJvdXRlLWRyYXctY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvdXRlSW5mbyA9IGRyYXdFbGVtLmZpbmQoJy5yb3V0ZS1pbmZvJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50X3NlYXJjaCcpO1xyXG4gICAgICAgICAgICBjb25zdCBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHByZXNldCA9IGJ1aWxkUHJlc2V0KHRoaXMucHJlc2V0KTtcclxuXHJcbiAgICAgICAgICAgIGlmIChyZXNldCB8fCAhdGhpcy5zaW1Bbm5lYWwpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaW1Bbm5lYWwgPSB0aGlzLnVzZVByZXNldFxyXG4gICAgICAgICAgICAgICAgICAgID8gJHNpbUFubmVhbC5nZXRQcmVzZXRJbnN0YW5jZShwcmVzZXQsIHRoaXMubWF4VGVtcCwgdGhpcy5taW5UZW1wLCB0aGlzLmlzQ2xvc2VkKVxyXG4gICAgICAgICAgICAgICAgICAgIDogJHNpbUFubmVhbC5nZXRJbnN0YW5jZSh0aGlzLnBvaW50c051bWJlciwgdGhpcy5tYXBTaXplLCB0aGlzLm1heFRlbXAsIHRoaXMubWluVGVtcCwgdGhpcy5pc0Nsb3NlZCk7XHJcbiAgICAgICAgICAgICAgICBkcmF3UG9pbnRzKHRoaXMuc2ltQW5uZWFsLnBvaW50cywgZHJhd0VsZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2ltQW5uZWFsLnJlc2V0KCk7XHJcbiAgICAgICAgICAgIGNsZWFyQ2FudmFzKGN0eCk7XHJcbiAgICAgICAgICAgIGRyYXdSb3V0ZVNlcXVlbmNlKGN0eCwgdGhpcy5zaW1Bbm5lYWwsIHJvdXRlSW5mbyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5kcmF3U29sdXRpb24gPSAoaWR4KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zaW1Bbm5lYWwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHNjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29sdXRpb25fJyArIGlkeCk7XHJcbiAgICAgICAgICAgIGlmICghc2NhbnZhcyl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHRpbWVvdXQoKCkgPT4gdGhpcy5kcmF3U29sdXRpb24oaWR4KSwgNTApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAkdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzb2x1dGlvbiA9IHRoaXMuc2ltQW5uZWFsLmdldFNvbHV0aW9uKGlkeCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzY3R4ID0gc2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICAgICAgc29sdXRpb24uY29sb3IgPSB0aGlzLmdldENvbG9yKCk7XHJcbiAgICAgICAgICAgICAgICBkcmF3Um91dGUoc2N0eCwgc29sdXRpb24ucG9pbnRzLCBzb2x1dGlvbi5jb2xvcik7XHJcbiAgICAgICAgICAgIH0sIDApXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5hZGRTb2x1dGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXNldCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gYnVpbGRQcmVzZXQodGhpcy5wcmVzZXQpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2ltQW5uZWFsKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRyYXdFbGVtID0gJCgnLnJvdXRlLWRyYXctY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgICAgICBkcmF3UG9pbnRzKHBvaW50cywgZHJhd0VsZW0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaW1Bbm5lYWwgPSAkc2ltQW5uZWFsLmdldFByZXNldEluc3RhbmNlKHBvaW50cywgdGhpcy5tYXhUZW1wLCB0aGlzLm1pblRlbXApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaW1Bbm5lYWwuYWRkU29sdXRpb24ocG9pbnRzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZm9jdXNTb2x1dGlvbiA9IChpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZHJhd0VsZW0gPSAkKCcucm91dGUtZHJhdy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgZHJhd0VsZW0uZmluZCgnLnJvdXRlLXNvbHV0aW9uJykuZWFjaCgoaSwgZWxlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgJChlbGVtKS50b2dnbGVDbGFzcygnZm9jdXNlZC1zb2x1dGlvbicsIGkgPT09IGlkeCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZG93bmxvYWRTb2x1dGlvbiA9IChpZHgpID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50X3NlYXJjaCcpO1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhVXJsID0gc2NhbnZhcy50b0RhdGFVUkwoKTtcclxuICAgICAgICAgICAgaW5pdERvd25sb2FkKGRhdGFVcmwpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuc3RvcFJvdXRlU2VhcmNoID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc2ltQW5uZWFsKXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNpbUFubmVhbC5zdG9wKCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2ltQW5uZWFsLmdldExhc3RTb2x1dGlvbigpLmV4cG9ydCgpKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0Q29sb3IgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5jb2xvckl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgaWYgKCFpdGVtLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JJdGVyYXRvciA9IGNvbG9ycy52YWx1ZXMoKTtcclxuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmNvbG9ySXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGJ1aWxkUHJlc2V0KGRhdGEpe1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YSA/IGRhdGEuc3BsaXQoJ1xcbicpLm1hcCgoc3RyKSA9PlxyXG4gICAgICAgICAgICAgICAgcG9pbnRGYWN0b3J5LmdldFBvaW50KC4uLnN0clxyXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgnLCcpXHJcbiAgICAgICAgICAgICAgICAgICAgLm1hcCgodikgPT4gcGFyc2VJbnQodikpXHJcbiAgICAgICAgICAgICAgICApXHJcbiAgICAgICAgICAgICkgOiBbXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRyYXdSb3V0ZVNlcXVlbmNlKGN0eCwgc2ltQW5uZWFsLCBpbmZvRWxlbSwgbWluQ29zdCl7XHJcbiAgICAgICAgICAgIGlmIChzaW1Bbm5lYWwuaXNEb25lKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBQcm9jZXNzaW5nIGlzIGRvbmUgd2l0aCBjb3N0IG9mICR7c2ltQW5uZWFsLmdldExhc3RTb2x1dGlvbigpLmNvc3R9LiAke3NpbUFubmVhbC5zb2x1dGlvbnMubGVuZ3RofSBzb2x1dGlvbnMgaW4gc3RvY2tgKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNpbUFubmVhbC5nZXRMYXN0U29sdXRpb24oKS5leHBvcnQoKSk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckNhbnZhcyhjdHgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Q29zdCA9IHNpbUFubmVhbC5jdXJyZW50Q29zdDtcclxuICAgICAgICAgICAgaWYgKCFtaW5Db3N0IHx8IG1pbkNvc3QgPiBjdXJyZW50Q29zdCl7XHJcbiAgICAgICAgICAgICAgICBjbGVhckNhbnZhcyhjdHgpO1xyXG4gICAgICAgICAgICAgICAgZHJhd1JvdXRlKGN0eCwgc2ltQW5uZWFsLnBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICBtaW5Db3N0ID0gY3VycmVudENvc3Q7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaW5mb0VsZW0uaHRtbChgbWluLiBjb3N0OiA8Yj4ke21pbkNvc3R9PC9iPi4gJHtzaW1Bbm5lYWwuaW5mb31gKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChzaW1Bbm5lYWwubmV4dCgpKSB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJhd1JvdXRlU2VxdWVuY2UoY3R4LCBzaW1Bbm5lYWwsIGluZm9FbGVtLCBtaW5Db3N0KTtcclxuICAgICAgICAgICAgICAgIH0sIDUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRyYXdQb2ludHMocG9pbnRzLCBjb250YWluZXIpe1xyXG4gICAgICAgICAgICAkKGNvbnRhaW5lcikuZmluZCgnLnJvdXRlLXBvaW50JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNmID0gZ2V0U2NhbGVGYWN0b3IocG9pbnRzKTtcclxuXHJcbiAgICAgICAgICAgIHBvaW50cy5mb3JFYWNoKChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHQgPSBzZiAhPT0gMSA/IHBvaW50LmdldFNjYWxlZChzZikgOiBwb2ludC5jbG9uZSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHggPSBNYXRoLnJvdW5kKHB0LngpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcHkgPSBNYXRoLnJvdW5kKHB0LnkpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcGlkID0gWydycCcsIHBvaW50LngsIHBvaW50LnldLmpvaW4oJ18nKTtcclxuICAgICAgICAgICAgICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocGlkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9pbnRFbGVtID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2IGNsYXNzPVwicm91dGUtcG9pbnRcIiBpZD1cInJwXyR7cG9pbnQueH1fJHtwb2ludC55fVwiPjxzcGFuPiR7cG9pbnQueH14JHtwb2ludC55fTwvc3Bhbj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2ludEVsZW0uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBweSArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnQ6IHB4ICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lci5hcHBlbmQocG9pbnRFbGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRyYXdSb3V0ZShjdHgsIHBvaW50cywgY29sb3IgPSAnIzBENDdBMScpe1xyXG4gICAgICAgICAgICBjb25zdCBzZiA9IGdldFNjYWxlRmFjdG9yKHBvaW50cyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHB0cyA9IHNmICE9PSAxID8gcG9pbnRzLm1hcCgocHQpID0+IHB0LmdldFNjYWxlZChzZikpIDogcG9pbnRzLnNsaWNlKCk7XHJcblxyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBjb2xvcjtcclxuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgICAgICAgICAgIGN0eC5saW5lQ2FwID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgY3R4LmxpbmVKb2luID0gJ3JvdW5kJztcclxuXHJcbiAgICAgICAgICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgICAgICAgICAgY3R4Lm1vdmVUbyhwdHNbMF0ueCwgcHRzWzBdLnkpO1xyXG4gICAgICAgICAgICBwdHMuc2xpY2UoMSkuZm9yRWFjaCgocG9pbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGN0eC5saW5lVG8ocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgIG1hcmtTdGFydEVuZFBvaW50cyhwb2ludHMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gbWFya1N0YXJ0RW5kUG9pbnRzKHBvaW50cyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGRyYXdFbGVtID0gJCgnLnJvdXRlLWRyYXctY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZpZCA9IGAjcnBfJHtwb2ludHNbMF0ueH1fJHtwb2ludHNbMF0ueX1gO1xyXG4gICAgICAgICAgICBjb25zdCBsaWQgPSBgI3JwXyR7cG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXS54fV8ke3BvaW50c1twb2ludHMubGVuZ3RoIC0gMV0ueX1gO1xyXG4gICAgICAgICAgICBjb25zdCBmY2xhc3MgPSAncm91dGUtcG9pbnQtZmlyc3QnO1xyXG4gICAgICAgICAgICBjb25zdCBsY2xhc3MgPSAncm91dGUtcG9pbnQtbGFzdCc7XHJcbiAgICAgICAgICAgIGRyYXdFbGVtLmZpbmQoJy5yb3V0ZS1wb2ludCcpLnJlbW92ZUNsYXNzKGZjbGFzcykucmVtb3ZlQ2xhc3MobGNsYXNzKTtcclxuICAgICAgICAgICAgZHJhd0VsZW0uZmluZChmaWQpLmFkZENsYXNzKGZjbGFzcyk7XHJcbiAgICAgICAgICAgIGRyYXdFbGVtLmZpbmQobGlkKS5hZGRDbGFzcyhsY2xhc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gY2xlYXJDYW52YXMoY3R4KXtcclxuICAgICAgICAgICAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjdHguY2FudmFzLndpZHRoLCBjdHguY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBmYWN0b3JpYWwodmFsLCByZXMgPSAxKXtcclxuICAgICAgICAgICAgcmV0dXJuIHZhbCA+IDAgPyBmYWN0b3JpYWwodmFsIC0gMSwgdmFsICogcmVzKSA6IHJlcztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGdldFNjYWxlRmFjdG9yKHBvaW50cyl7XHJcbiAgICAgICAgICAgIGNvbnN0IGNudiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50X3NlYXJjaCcpO1xyXG4gICAgICAgICAgICBpZiAoIWNudil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IG1heERpbSA9IHBvaW50cy5tYXAoKHB0KSA9PiBNYXRoLm1heChwdC54LCBwdC55KSkuc29ydCgoYSwgYikgPT4gYiAtIGEpWzBdO1xyXG4gICAgICAgICAgICByZXR1cm4gY252LndpZHRoIC8gbWF4RGltO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5pdERvd25sb2FkICh1cmwpIHtcclxuICAgICAgICAgICAgY29uc3QgYW5jaG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG4gICAgICAgICAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdocmVmJywgdXJsKTtcclxuICAgICAgICAgICAgYW5jaG9yLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCAncm91dGUucG5nJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2ID0gbmV3IE1vdXNlRXZlbnQoJ2NsaWNrJyk7XHJcbiAgICAgICAgICAgIGFuY2hvci5kaXNwYXRjaEV2ZW50KGV2KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZvcm1hdHRlZEZhY3RvcmlhbChudW0pe1xyXG4gICAgICAgICAgICBjb25zdCBmYWN0ID0gZmFjdG9yaWFsKG51bSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvdyA9IHBhcnNlSW50KGZhY3QudG9TdHJpbmcoKS5zcGxpdCgnZSsnKVsxXSk7XHJcbiAgICAgICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGZhY3QgLyBNYXRoLnBvdygxMCwgcG93KSkudG9TdHJpbmcoKSArICgnMCcpLnJlcGVhdChwb3cpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLWRyYXctZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA3ODlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tY29udHJvbHNcXFwiIGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gc3RhcnRcXFwiPlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiNjBcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBjZW50ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg9XFxcIjQ1XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1zd2l0Y2ggbmctbW9kZWw9XFxcImN0cmwudXNlUHJlc2V0XFxcIiBhcmlhLWxhYmVsPVxcXCJVc2UgUHJlc2V0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBQcmVzZXQgUG9pbnRzXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLXN3aXRjaD5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLWNoZWNrYm94IG5nLW1vZGVsPVxcXCJjdHJsLmlzQ2xvc2VkXFxcIiBhcmlhLWxhYmVsPVxcXCJDbG9zZWQgcm91dGVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIENsb3NlZCByb3V0ZVxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1jaGVja2JveD5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleCBuZy1pZj1cXFwiY3RybC51c2VQcmVzZXRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyIGNsYXNzPVxcXCJtZC1ibG9ja1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+UG9pbnRzPC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBuZy1tb2RlbD1cXFwiY3RybC5wcmVzZXRcXFwiIHJvd3M9XFxcIjNcXFwiIG1heC1yb3dzPVxcXCIzXFxcIj48L3RleHRhcmVhPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4IG5nLWlmPVxcXCIhY3RybC51c2VQcmVzZXRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlNpemU8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtc2xpZGVyIG1pbj1cXFwiNTAwXFxcIiBtYXg9XFxcIjEyMDBcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLm1hcFNpemVcXFwiIGFyaWEtbGFiZWw9XFxcInJlZFxcXCIgaWQ9XFxcIm1hcC1zaXplLXNsaWRlclxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1kLXdhcm5cXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLm1hcFNpemVcXFwiIGFyaWEtbGFiZWw9XFxcIm1hcCBzaXplXFxcIiBhcmlhLWNvbnRyb2xzPVxcXCJtYXAtc2l6ZS1zbGlkZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj5Qb2ludHM8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtc2xpZGVyIG1pbj1cXFwiNFxcXCIgbWF4PVxcXCIxMDBcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLnBvaW50c051bWJlclxcXCIgYXJpYS1sYWJlbD1cXFwicmVkXFxcIiBpZD1cXFwicG9pbnRzLW51bWJlci1zbGlkZXJcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJtZC13YXJuXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtc2xpZGVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5wb2ludHNOdW1iZXJcXFwiIGFyaWEtbGFiZWw9XFxcInBvaW50cyBudW1iZXJcXFwiIGFyaWEtY29udHJvbHM9XFxcInBvaW50cy1udW1iZXItc2xpZGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg9XFxcIjMwXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gY2VudGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyIGNsYXNzPVxcXCJuby1lcnJvcnNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbD5tYXguIFQ8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLm1heFRlbXBcXFwiIGFyaWEtbGFiZWw9XFxcImluaXRpYWwgdGVtcGVyYXR1cmVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg9XFxcIjQ1XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgY2xhc3M9XFxcIm5vLWVycm9yc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPm1pbi4gVDwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwubWluVGVtcFxcXCIgYXJpYS1sYWJlbD1cXFwibWluaW1hbCB0ZW1wZXJhdHVyZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIGNlbnRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBjbGFzcz1cXFwibWQtcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcImN0cmwucmVidWlsZFJvdXRlKClcXFwiIGFyaWEtbGFiZWw9XFxcInJlYnVpbGQgcm91dGVcXFwiIG5nLWRpc2FibGVkPVxcXCJjdHJsLnNpbUFubmVhbCAmJiBjdHJsLnNpbUFubmVhbC5pc1J1bm5pbmdcXFwiPlJlcGVhdDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5yZWJ1aWxkUm91dGUodHJ1ZSlcXFwiIGFyaWEtbGFiZWw9XFxcInJlYnVpbGQgcm91dGVcXFwiIG5nLWRpc2FibGVkPVxcXCJjdHJsLnNpbUFubmVhbCAmJiBjdHJsLnNpbUFubmVhbC5pc1J1bm5pbmdcXFwiPlNlYXJjaDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwiY2VudGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5hZGRTb2x1dGlvbigpXFxcIiBhcmlhLWxhYmVsPVxcXCJyZWJ1aWxkIHJvdXRlXFxcIiBuZy1kaXNhYmxlZD1cXFwiIWN0cmwucHJlc2V0XFxcIj5BZGQ8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBjbGFzcz1cXFwibWQtd2FyblxcXCIgbmctY2xpY2s9XFxcImN0cmwuc3RvcFJvdXRlU2VhcmNoKClcXFwiIGFyaWEtbGFiZWw9XFxcInN0b3Agcm91dGUgc2VhcmNoXFxcIiBuZy1kaXNhYmxlZD1cXFwiIWN0cmwuc2ltQW5uZWFsIHx8ICFjdHJsLnNpbUFubmVhbC5pc1J1bm5pbmdcXFwiPlN0b3A8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYWxnby1iZW5jaG1hcmtcXFwiICBuZy1pZj1cXFwiY3RybC5iZXN0Um91dGVcXFwiPlxcclxcbiAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICA8cD48c3Ryb25nPlBlcm11dGF0aW9uczwvc3Ryb25nPjwvcD5cXHJcXG4gICAgICAgICAgICA8cD57e2N0cmwuYmVzdFJvdXRlLmxpbWl0IHwgcG93bnVtYmVyfX0gLyB7e2N0cmwuYmVzdFJvdXRlLnRvdGFsIHwgcG93bnVtYmVyfX08L3A+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxtZC1kaXZpZGVyPjwvbWQtZGl2aWRlcj5cXHJcXG4gICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgPHA+PHN0cm9uZz5EdXJhdGlvbjwvc3Ryb25nPjxicj57e2N0cmwuYmVzdFJvdXRlLmR1cmF0aW9ufX1tczwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPG1kLWRpdmlkZXI+PC9tZC1kaXZpZGVyPlxcclxcbiAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICA8cD48c3Ryb25nPlNpbmdsZSBzYW1wbGU8L3N0cm9uZz48YnI+e3tjdHJsLmJlc3RSb3V0ZS5iZW5jaH19bXM8L3A+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxtZC1kaXZpZGVyPjwvbWQtZGl2aWRlcj5cXHJcXG4gICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgPHA+PHN0cm9uZz5Fc3QuIGNhbGMuIHRpbWU8L3N0cm9uZz48YnI+e3tjdHJsLmJlc3RSb3V0ZS5lc3RpbWF0ZS55ZWFycygpIHwgcG93bnVtYmVyfX0geWVhcnM8L3A+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgPHA+PHN0cm9uZz5TdGFydCBjb3N0PC9zdHJvbmc+PGJyPnt7Y3RybC5iZXN0Um91dGUuY29zdH19PC9wPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8IS0tPGRpdiBjbGFzcz1cXFwiYWxnby1iZXN0LXJvdXRlXFxcIiBuZy1pZj1cXFwiY3RybC5iZXN0Um91dGUgJiYgY3RybC5wb2ludHNOdW1iZXIgPCAxMFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IG5nLXJlcGVhdD1cXFwiaXRlbSBpbiBjdHJsLmJlc3RSb3V0ZS5zdGF0ZSB0cmFjayBieSAkaW5kZXhcXFwiPnt7aXRlbS54fX0geCB7e2l0ZW0ueX19PC9kaXY+XFxyXFxuICAgIDwvZGl2Pi0tPlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLXNvbHV0aW9uc1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwicm93XFxcIlxcclxcbiAgICAgICAgICAgICBsYXlvdXQtYWxpZ249XFxcInN0YXJ0IGNlbnRlclxcXCJcXHJcXG4gICAgICAgICAgICAgbmctcmVwZWF0PVxcXCJzb2x1dGlvbiBpbiBjdHJsLnNpbUFubmVhbC5zb2x1dGlvbnNcXFwiXFxyXFxuICAgICAgICAgICAgIG5nLW1vdXNlZW50ZXI9XFxcImN0cmwuZm9jdXNTb2x1dGlvbigkaW5kZXgpXFxcIlxcclxcbiAgICAgICAgICAgICBuZy1tb3VzZWxlYXZlPVxcXCJjdHJsLmZvY3VzU29sdXRpb24oLTEpXFxcIiBuZy1jbGljaz1cXFwiY3RybC5kb3dubG9hZFNvbHV0aW9uKCRpbmRleClcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImxlZ2VuZC1idWxsZXRcXFwiIG5nLXN0eWxlPVxcXCJ7J2JhY2tncm91bmQtY29sb3InOiBzb2x1dGlvbi5jb2xvcn1cXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgZmxleD57e3NvbHV0aW9uLmNvc3R9fTwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLWRyYXctc2Nyb2xsZXJcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwicm91dGUtZHJhdy1jb250YWluZXJcXFwiIG5nLXN0eWxlPVxcXCJ7J21pbi13aWR0aCc6IGN0cmwubWFwU2l6ZSArICdweCcsICdtaW4taGVpZ2h0JzogY3RybC5tYXBTaXplICsgJ3B4J31cXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvdXRlLWluZm9cXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvdXRlLXNvbHV0aW9uXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgbmctcmVwZWF0PVxcXCJzb2x1dGlvbiBpbiBjdHJsLnNpbUFubmVhbC5zb2x1dGlvbnNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8Y2FudmFzIHdpZHRoPVxcXCJ7e2N0cmwubWFwU2l6ZX19XFxcIiBoZWlnaHQ9XFxcInt7Y3RybC5tYXBTaXplfX1cXFwiIGlkPVxcXCJzb2x1dGlvbl97eyRpbmRleH19XFxcIj48L2NhbnZhcz5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBuZy1pbml0PVxcXCJjdHJsLmRyYXdTb2x1dGlvbigkaW5kZXgpXFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3V0ZS1jdXJyZW50LXNlYXJjaFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxjYW52YXMgd2lkdGg9XFxcInt7Y3RybC5tYXBTaXplfX1cXFwiIGhlaWdodD1cXFwie3tjdHJsLm1hcFNpemV9fVxcXCIgaWQ9XFxcImN1cnJlbnRfc2VhcmNoXFxcIj48L2NhbnZhcz5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLWRyYXctdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDc5MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCl7XHJcbiAgICB2cnAuc2VydmljZSgncm91dGVQbG90dGVyJywgcm91dGVQbG90dGVyKTtcclxuICAgIHJvdXRlUGxvdHRlci4kaW5qZWN0ID0gWydwb2ludEZhY3RvcnknXTtcclxuXHJcbiAgICBmdW5jdGlvbiByb3V0ZVBsb3R0ZXIocG9pbnRGYWN0b3J5KXtcclxuICAgICAgICBjb25zdCBDT0xPUlMgPSBbXHJcbiAgICAgICAgICAgICcjMjE5NkYzJyxcclxuICAgICAgICAgICAgJyNGNDQzMzYnLFxyXG4gICAgICAgICAgICAnI0ZGQzEwNycsXHJcbiAgICAgICAgICAgICcjNENBRjUwJyxcclxuICAgICAgICAgICAgJyNGRjk4MDAnLFxyXG4gICAgICAgICAgICAnIzAwOTY4OCcsXHJcbiAgICAgICAgICAgICcjOUMyN0IwJyxcclxuICAgICAgICAgICAgJyNGRkVCM0InLFxyXG4gICAgICAgICAgICAnIzNGNTFCNScsXHJcbiAgICAgICAgICAgICcjQ0REQzM5J1xyXG4gICAgICAgIF07XHJcblxyXG5cclxuXHJcbiAgICAgICAgY2xhc3MgUm91dGVQbG90dGVyIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoZWxlbWVudCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZUluZm8gPSB0aGlzLmVsZW1lbnQuZmluZCgnLnJvdXRlLWluZm8nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRfc2VhcmNoJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvbG9ySXRlcmF0b3IgPSBDT0xPUlMudmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNmID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0Q29sb3IoKXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5jb2xvckl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvckl0ZXJhdG9yID0gQ09MT1JTLnZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmNvbG9ySXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldFBvaW50RWxlbShwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpLnRleHQocG9pbnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwb2ludC5jc3NTdHlsZS5mb3JFYWNoKChjc3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZENsYXNzKGNzcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRCZXN0U29sdXRpb24odnJwID0gdGhpcy52cnApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZycC5zb2x1dGlvbnMucmVkdWNlKChyZXMsIHNvbCkgPT4gc29sLmNvc3QgPCByZXMuY29zdCA/IHNvbCA6IHJlcywge2Nvc3Q6IE51bWJlci5NQVhfVkFMVUV9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFZlaGljbGVzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC52ZWhpY2xlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2cnAudmVoaWNsZXMuZm9yRWFjaCgodmhjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gdmhjLnN0YXJ0TG9jYXRpb24gPyB2aGMuc3RhcnRMb2NhdGlvbi5jb29yZCA6IHZoYy5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2ludCA9IG5ldyBSb3V0ZVBvaW50KHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ21hdGVyaWFsLWljb25zJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygndnJwLXZlaGljbGUnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0TmFtZSgnbG9jYWxfc2hpcHBpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzLnNldCh2aGMuaWQsIHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0U2hpcG1lbnRzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC5zaGlwbWVudHMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdnJwLnNoaXBtZW50cy5mb3JFYWNoKChzaGlwbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4OiBweCwgeTogcHl9ID0gc2hpcG1lbnQucGlja3VwLmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4OiBkeCwgeTogZHl9ID0gc2hpcG1lbnQuZGVsaXZlcnkubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxvYyA9IG5ldyBSb3V0ZVBvaW50KHB4LCBweSkuc2V0Q3NzKCd2cnAtcGlja3VwJykuc2V0TmFtZShzaGlwbWVudC5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGxvYyA9IG5ldyBSb3V0ZVBvaW50KGR4LCBkeSkuc2V0Q3NzKCd2cnAtZGVsaXZlcnknKS5zZXROYW1lKHNoaXBtZW50LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cy5zZXQoc2hpcG1lbnQuaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlja3VwOiBwbG9jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxpdmVyeTogZGxvYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHk6IHNoaXBtZW50LmNhcGFjaXR5RGVtYW5kIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Q6IE1hdGgucm91bmQocGxvYy5nZXREaXN0YW5jZShkbG9jKSAqIDEwKSAvIDEwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFJvdXRlcyh2cnApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2cnAuc29sdXRpb25zKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IGJlc3RTb2x1dGlvbiA9IHRoaXMuZ2V0QmVzdFNvbHV0aW9uKHZycCk7XHJcbiAgICAgICAgICAgICAgICBiZXN0U29sdXRpb24ucm91dGVzLmZvckVhY2goKHJvdXRlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9pbnRzID0gcm91dGUuYWN0LnJlZHVjZSgocmVzLCBhY3QpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hpcG1lbnRzLmhhcyhhY3Quc2hpcG1lbnRJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hwID0gdGhpcy5zaGlwbWVudHMuZ2V0KGFjdC5zaGlwbWVudElkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGFjdC50eXBlLnN0YXJ0c1dpdGgoJ3BpY2t1cCcpID8gc2hwLnBpY2t1cCA6IHNocC5kZWxpdmVyeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIFtdKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy52ZWhpY2xlcy5oYXMocm91dGUudmVoaWNsZUlkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50cy51bnNoaWZ0KHRoaXMudmVoaWNsZXMuZ2V0KHJvdXRlLnZlaGljbGVJZCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcy5zZXQocm91dGUudmVoaWNsZUlkLCB7Y29sb3I6IHRoaXMuZ2V0Q29sb3IoKSwgcG9pbnRzfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VlJQKHZycCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZycCA9IHZycDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFZlaGljbGVzKHZycClcclxuICAgICAgICAgICAgICAgICAgICAuc2V0U2hpcG1lbnRzKHZycClcclxuICAgICAgICAgICAgICAgICAgICAuc2V0Um91dGVzKHZycCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFBvaW50KHBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxQb2ludCA9IHBvaW50LmdldFNjYWxlZCh0aGlzLnNmKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHJlYWxQb2ludDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLmdldFBvaW50RWxlbShwb2ludCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB5IC0gMTIgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHggLSAxMiArICdweCdcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZChlbGVtKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTaGlwbWVudChzaGlwbWVudCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7cGlja3VwOiBwbG9jLCBkZWxpdmVyeTogZGxvY30gPSBzaGlwbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KHBsb2MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChkbG9jKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1JvdXRlKFtwbG9jLCBkbG9jXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZENhcGFjaXR5KHNoaXBtZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRDYXBhY2l0eShzaGlwbWVudCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7cGlja3VwOiBwbG9jLCBjYXBhY2l0eTogY2FwYWNpdHl9ID0gc2hpcG1lbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5XCI+PGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eS1saW5rXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHktZGF0YVwiPiR7Y2FwYWNpdHl9PC9kaXY+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBycCA9IHBsb2MuZ2V0U2NhbGVkKHRoaXMuc2YpO1xyXG4gICAgICAgICAgICAgICAgZWxlbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogcnAueSArIDEyICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBycC54IC0gMTIgKyAncHgnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRDbGFzcygndnJwLXBvaW50LWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZChlbGVtKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkcmF3Um91dGUocG9pbnRzLCBjb2xvcil7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9IGNvbG9yIHx8ICdyZ2JhKDAsIDAsIDAsIC4yMCknO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZVdpZHRoID0gMjtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVDYXAgPSAncm91bmQnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZUpvaW4gPSAncm91bmQnO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc2V0TGluZURhc2goY29sb3IgPyBbXSA6IFs4LCA4XSk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbFBvaW50cyA9IHBvaW50cy5tYXAoKHBvaW50KSA9PiBwb2ludC5nZXRTY2FsZWQodGhpcy5zZikpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHJlYWxQb2ludHNbMF0ueCwgcmVhbFBvaW50c1swXS55KTtcclxuICAgICAgICAgICAgICAgIHJlYWxQb2ludHMuc2xpY2UoMSkuZm9yRWFjaCgocG9pbnQsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludHNbaWR4XS5nZXREaXN0YW5jZShwb2ludHNbaWR4ICsgMV0pLnRvRml4ZWQoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWlkID0gcG9pbnRzW2lkeF0uZ2V0TWlkUG9pbnQocG9pbnRzW2lkeCArIDFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtZGlzdGFuY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtcG9pbnQtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldE5hbWUoZGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3JTdHlsZSA9IHsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yIHx8ICcjNDU1QTY0J307XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChtaWQpLmNzcyhjb2xvclN0eWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8ocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRyYXdTb2x1dGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1JvdXRlKGl0ZW0ucG9pbnRzLCBpdGVtLmNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsb3RWUlAoKXtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy52cnApe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcy5mb3JFYWNoKChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQocG9pbnQsIFRZUEVTLnZlaGljbGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cy5mb3JFYWNoKChzaHApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNoaXBtZW50KHNocCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsb3RTb2x1dGlvbigpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmVzdFNvbHV0aW9uID0gdGhpcy52cnAuc29sdXRpb25zLnJlZHVjZSgocmVzLCBzb2wpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc29sLmNvc3QgPCByZXMuY29zdCA/IHNvbCA6IHJlcztcclxuICAgICAgICAgICAgICAgIH0sIHtjb3N0OiBOdW1iZXIuTUFYX1ZBTFVFfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdTb2x1dGlvbihiZXN0U29sdXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNldCgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwbWVudHMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmNsZWFyUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5maW5kKCcudnJwLXBvaW50JykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFNjYWxlKHNmKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2YgPSBzZjtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRJbnN0YW5jZSA9IChlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUm91dGVQbG90dGVyKGVsZW0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL3RzcC9yb3V0ZS1wbG90dGVyLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc5MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLmRpcmVjdGl2ZSgndnJwRHJhdycsIHZycERyYXdEaXJlY3RpdmUpO1xyXG4gICAgdnJwRHJhd0RpcmVjdGl2ZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gdnJwRHJhd0RpcmVjdGl2ZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3ZycC1kcmF3LXRwbC5odG1sJyksXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdWcnBEcmF3Q29udHJvbGxlcicsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2N0cmwnXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB2cnAuY29udHJvbGxlcignVnJwRHJhd0NvbnRyb2xsZXInLCBWcnBEcmF3Q29udHJvbGxlcik7XHJcbiAgICBWcnBEcmF3Q29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAndnJwUGxvdHRlcicsICdhcGlSZXF1ZXN0J107XHJcblxyXG4gICAgZnVuY3Rpb24gVnJwRHJhd0NvbnRyb2xsZXIoJHNjb3BlLCAkZWxlbWVudCwgdnJwUGxvdHRlciwgYXBpUmVxdWVzdCkge1xyXG4gICAgICAgIGNvbnN0IHZycEVsZW0gPSAkKCcudnJwLXBvaW50LWNvbnRhaW5lcicpO1xyXG4gICAgICAgIGNvbnN0IHNldFJlcXVlc3QgPSBhcGlSZXF1ZXN0LmdldEluc3RhbmNlKHtcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS92cnAnLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgbGlzdFJlcXVlc3QgPSBhcGlSZXF1ZXN0LmdldEluc3RhbmNlKHtcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS92cnAvOnNldCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIHBhcmFtU2VyaWFsaXplcjogJ3RwbFF1ZXJ5U2VyaWFsaXplcidcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBzb2x1dGlvblJlcXVlc3QgPSBhcGlSZXF1ZXN0LmdldEluc3RhbmNlKHtcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS92cnAvOnNldC86c29sdXRpb24nLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBwYXJhbVNlcmlhbGl6ZXI6ICd0cGxRdWVyeVNlcmlhbGl6ZXInXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3Qgc2V0U3VtbWFyeVJlcXVlc3QgPSBhcGlSZXF1ZXN0LmdldEluc3RhbmNlKHtcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS92cnAvYWxsLzpmb2xkZXInLFxyXG4gICAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgICAgICBwYXJhbVNlcmlhbGl6ZXI6ICd0cGxRdWVyeVNlcmlhbGl6ZXInXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY29uc3QgZnVsbFN1bW1hcnlSZXF1ZXN0ID0gYXBpUmVxdWVzdC5nZXRJbnN0YW5jZSh7XHJcbiAgICAgICAgICAgIHVybDogJy9hcGkvdnJwL2FsbCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy52cnBEYXRhID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNvbHV0aW9uU2V0cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuc29sdXRpb25MaXN0ID0gW107XHJcbiAgICAgICAgdGhpcy5zb2x1dGlvbkxpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJzID0ge1xyXG4gICAgICAgICAgICBzaG93RGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dDYXBEZW1hbmQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93Q3VzdG9tU29sdXRpb25JbnB1dDogZmFsc2VcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRTb2x1dGlvbiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5yb3V0ZXMgPSBbXTtcclxuICAgICAgICB0aGlzLnBsb3R0ZXIgPSB2cnBQbG90dGVyLmdldEluc3RhbmNlKHZycEVsZW0pO1xyXG5cclxuICAgICAgICBzZXRSZXF1ZXN0LnNlbmQoKS50aGVuKChyZXNwKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc29sdXRpb25TZXRzID0gcmVzcC5kYXRhLnNsaWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gZnVsbFN1bW1hcnlSZXF1ZXN0LnNlbmQoKS50aGVuKChyZXNwKSA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHN1bW1hcnkgPSBJbW11dGFibGUuZnJvbUpTKHJlc3AuZGF0YSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IGNvbHVtbnMgPSBzdW1tYXJ5LmtleVNlcSgpLnRvQXJyYXkoKS5zb3J0KCk7XHJcbiAgICAgICAgLy8gICAgIGNvbnN0IHJvd3MgPSBzdW1tYXJ5LmZsYXR0ZW4oMCkua2V5U2VxKCkudG9BcnJheSgpLnNvcnQoKTtcclxuICAgICAgICAvLyAgICAgY29uc3QgZ3JpZCA9IFtbJ3Byb2JsZW0nLCAuLi5jb2x1bW5zXV0uY29uY2F0KHJvd3MubWFwKChyb3cpID0+IFtyb3csIC4uLmNvbHVtbnMubWFwKChjb2wpID0+IHN1bW1hcnkuZ2V0SW4oW2NvbCwgcm93XSkpXSkpO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhncmlkLm1hcCgocm93KSA9PiByb3cuam9pbignXFx0JykpLmpvaW4oJ1xcbicpKTtcclxuICAgICAgICAvLyB9KTtcclxuXHJcbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnY3RybC5maWx0ZXJzLnNob3dEaXN0JywgKG52YWwpID0+IHtcclxuICAgICAgICAgICAgJCgnLnZycC1kaXN0YW5jZScpLnRvZ2dsZUNsYXNzKCd2cnAtcG9pbnQtaGlkZGVuJywgIW52YWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjdHJsLmZpbHRlcnMuc2hvd0NhcERlbWFuZCcsIChudmFsKSA9PiB7XHJcbiAgICAgICAgICAgICQoJy52cnAtY2FwYWNpdHknKS50b2dnbGVDbGFzcygndnJwLXBvaW50LWhpZGRlbicsICFudmFsKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVTZXRDaGFuZ2UgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxpc3RSZXF1ZXN0LnNlbmQoe3NldDogdGhpcy5zZWxlY3RlZFNldH0pLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc29sdXRpb25MaXN0ID0gcmVzcC5kYXRhLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVTb2x1dGlvbkNoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgc29sdXRpb25SZXF1ZXN0LnNlbmQoe3NldDogdGhpcy5zZWxlY3RlZFNldCwgc29sdXRpb246IHRoaXMuc2VsZWN0ZWRTb2x1dGlvbn0pLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwLmRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbG90dGVyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5yZXNldCgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRWUlAocmVzcC5kYXRhKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucGxvdFZSUCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucGxvdFZSUCA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnZycERhdGEgJiYgIXRoaXMucGxvdHRlci52cnApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZycERhdGEpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdnJwID0gSlNPTi5wYXJzZSh0aGlzLnZycERhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbG90dGVyLnJlc2V0KCkuc2V0VlJQKHZycCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5wbG90dGVyLnBsb3RWUlAoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnBsb3RTb2x1dGlvbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnZycERhdGEgJiYgIXRoaXMucGxvdHRlci52cnApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZycERhdGEpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdnJwID0gSlNPTi5wYXJzZSh0aGlzLnZycERhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wbG90dGVyLnJlc2V0KCkuc2V0VlJQKHZycCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5yb3V0ZXMgPSBbLi4udGhpcy5wbG90dGVyLnJvdXRlcy52YWx1ZXMoKV07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMucm91dGVzLnJlZHVjZSgocmVzLCBpdGVtKSA9PiByZXMgKyBpdGVtLmRpc3RhbmNlLCAwKSlcclxuICAgICAgICAgICAgdGhpcy5wbG90dGVyLnBsb3RTb2x1dGlvbigpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy92cnAvdnJwLWRyYXctZGlyZWN0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA3OTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInZycC1jb250cm9sc1xcXCIgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBzdGFydFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCI1MFxcXCI+XFxyXFxuICAgICAgICAgICAgPG1kLXN3aXRjaCBuZy1tb2RlbD1cXFwiY3RybC5maWx0ZXJzLnNob3dDdXN0b21Tb2x1dGlvbklucHV0XFxcIiBhcmlhLWxhYmVsPVxcXCJTaG93IERpc3RhbmNlc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIFNob3cgY3VzdG9tIHNvbHV0aW9uIGlucHV0XFxyXFxuICAgICAgICAgICAgPC9tZC1zd2l0Y2g+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIGNlbnRlclxcXCIgbmctc2hvdz1cXFwiIWN0cmwuZmlsdGVycy5zaG93Q3VzdG9tU29sdXRpb25JbnB1dFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsPlNvbHV0aW9uIFNldDwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtc2VsZWN0IG5hbWU9XFxcInNvbHV0aW9uX3NldFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInNlbGVjdCBzb2x1dGlvbiBzZXRcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJjdHJsLnNlbGVjdGVkU2V0XFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jaGFuZ2U9XFxcImN0cmwuaGFuZGxlU2V0Q2hhbmdlKClcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtZC1vcHRpb24gbmctdmFsdWU9XFxcIml0ZW1cXFwiIG5nLXJlcGVhdD1cXFwiaXRlbSBpbiBjdHJsLnNvbHV0aW9uU2V0c1xcXCIgbmctc2VsZWN0ZWQ9XFxcIiRmaXJzdFxcXCI+e3tpdGVtfX08L21kLW9wdGlvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtc2VsZWN0PlxcclxcbiAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U29sdXRpb248L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLXNlbGVjdCBuYW1lPVxcXCJzb2x1dGlvblxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XFxcInNlbGVjdCBzb2x1dGlvblxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctbW9kZWw9XFxcImN0cmwuc2VsZWN0ZWRTb2x1dGlvblxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctY2hhbmdlPVxcXCJjdHJsLmhhbmRsZVNvbHV0aW9uQ2hhbmdlKClcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWRpc2FibGVkPVxcXCJjdHJsLnNvbHV0aW9uTGlzdExvYWRpbmdcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtZC1vcHRpb24gbWQtb3B0aW9uLWVtcHR5IG5nLXZhbHVlPVxcXCJudWxsXFxcIj5ub25lPC9tZC1vcHRpb24+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPG1kLW9wdGlvbiBuZy12YWx1ZT1cXFwiaXRlbVxcXCIgbmctcmVwZWF0PVxcXCJpdGVtIGluIGN0cmwuc29sdXRpb25MaXN0XFxcIj57e2l0ZW19fTwvbWQtb3B0aW9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1zZWxlY3Q+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgY2xhc3M9XFxcIm1kLWJsb2NrXFxcIiBuZy1zaG93PVxcXCJjdHJsLmZpbHRlcnMuc2hvd0N1c3RvbVNvbHV0aW9uSW5wdXRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8bGFiZWw+VlJQPC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgPHRleHRhcmVhIG5nLW1vZGVsPVxcXCJjdHJsLnZycERhdGFcXFwiIHJvd3M9XFxcIjZcXFwiIG1heC1yb3dzPVxcXCI2XFxcIj48L3RleHRhcmVhPlxcclxcbiAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCI0MFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXN3aXRjaCBuZy1tb2RlbD1cXFwiY3RybC5maWx0ZXJzLnNob3dEaXN0XFxcIiBhcmlhLWxhYmVsPVxcXCJTaG93IERpc3RhbmNlc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICBTaG93IGRpc3RhbmNlc1xcclxcbiAgICAgICAgICAgICAgICA8L21kLXN3aXRjaD5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXN3aXRjaCBuZy1tb2RlbD1cXFwiY3RybC5maWx0ZXJzLnNob3dDYXBEZW1hbmRcXFwiIGFyaWEtbGFiZWw9XFxcIlNob3cgcmVxdWlyZWQgY2FwYWNpdHlcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgU2hvdyByZXF1aXJlZCBjYXBhY2l0eVxcclxcbiAgICAgICAgICAgICAgICA8L21kLXN3aXRjaD5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwicm93XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIG5nLWNsaWNrPVxcXCJjdHJsLnBsb3R0ZXIucmVzZXQoKVxcXCIgYXJpYS1sYWJlbD1cXFwicmVzZXRcXFwiIG5nLWRpc2FibGVkPVxcXCIhY3RybC5wbG90dGVyXFxcIj5SZXNldDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5wbG90U29sdXRpb24oKVxcXCIgYXJpYS1sYWJlbD1cXFwiZHJhdyBTb2x1dGlvblxcXCIgbmctZGlzYWJsZWQ9XFxcIiFjdHJsLnBsb3R0ZXJcXFwiPlNvbHV0aW9uPC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gY2xhc3M9XFxcIm1kLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLnBsb3RWUlAoKVxcXCIgYXJpYS1sYWJlbD1cXFwiZHJhdyBWUlBcXFwiIG5nLWRpc2FibGVkPVxcXCIhY3RybC5wbG90dGVyXFxcIj5WUlA8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidnJwLWNvc3RcXFwiPlxcclxcbiAgICAgICAgU29sdXRpb24gY29zdDogPHNwYW4+e3tjdHJsLnBsb3R0ZXIgJiYgY3RybC5wbG90dGVyLmJlc3QgPyBjdHJsLnBsb3R0ZXIuYmVzdC5jb3N0IDogMCB8IG51bWJlciA6IDJ9fTwvc3Bhbj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInZycC1yb3V0ZXNcXFwiPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidnJwLXJvdXRlcy1pdGVtXFxcIiBuZy1yZXBlYXQ9XFxcIml0ZW0gaW4gY3RybC5yb3V0ZXNcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInZycC1yb3V0ZS1idWxsZXRcXFwiIG5nLXN0eWxlPVxcXCJ7J2JhY2tncm91bmQtY29sb3InOiBpdGVtLmNvbG9yfVxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdj48c3Ryb25nPnt7aXRlbS52ZWhpY2xlSWR9fTwvc3Ryb25nPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXY+ZDoge3tpdGVtLmRpc3RhbmNlIHwgbnVtYmVyIDogMn19PC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdj5jOiB7e2l0ZW0uY2FwYWNpdHl9fTwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ2cnAtZHJhdy1zY3JvbGxlclxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ2cnAtZHJhdy1jb250YWluZXJcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInZycC1wb2ludC1jb250YWluZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8Y2FudmFzIHdpZHRoPVxcXCI4MDBcXFwiIGhlaWdodD1cXFwiODAwXFxcIj48L2NhbnZhcz5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdnJwL3ZycC1kcmF3LXRwbC5odG1sXG4vLyBtb2R1bGUgaWQgPSA3OTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApe1xyXG4gICAgdnJwLnNlcnZpY2UoJ3ZycFBsb3R0ZXInLCB2cnBQbG90dGVyKTtcclxuICAgIHZycFBsb3R0ZXIuJGluamVjdCA9IFsncG9pbnRGYWN0b3J5J107XHJcblxyXG4gICAgZnVuY3Rpb24gdnJwUGxvdHRlcihwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNvbnN0IFRZUEVTID0ge1xyXG4gICAgICAgICAgICBkZWxpdmVyeToge1xyXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICd2cnAtZGVsaXZlcnkgbWF0ZXJpYWwtaWNvbnMnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2FyY2hpdmUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBpY2t1cDoge1xyXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICd2cnAtcGlja3VwIG1hdGVyaWFsLWljb25zJyxcclxuICAgICAgICAgICAgICAgIGljb246ICd1bmFyY2hpdmUnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHZlaGljbGU6IHtcclxuICAgICAgICAgICAgICAgIGNzc0NsYXNzOiAndnJwLXZlaGljbGUgbWF0ZXJpYWwtaWNvbnMnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ2xvY2FsX3NoaXBwaW5nJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBDT0xPUlMgPSBbXHJcbiAgICAgICAgICAgICcjMjE5NkYzJyxcclxuICAgICAgICAgICAgJyNGNDQzMzYnLFxyXG4gICAgICAgICAgICAnI0ZGQzEwNycsXHJcbiAgICAgICAgICAgICcjNENBRjUwJyxcclxuICAgICAgICAgICAgJyNGRjk4MDAnLFxyXG4gICAgICAgICAgICAnIzAwOTY4OCcsXHJcbiAgICAgICAgICAgICcjOUMyN0IwJyxcclxuICAgICAgICAgICAgJyNGRkVCM0InLFxyXG4gICAgICAgICAgICAnIzNGNTFCNScsXHJcbiAgICAgICAgICAgICcjQ0REQzM5J1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIGNsYXNzIFJvdXRlUG9pbnQgZXh0ZW5kcyBwb2ludEZhY3RvcnkuUlBvaW50IHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgICAgICAgICBzdXBlcih4LCB5KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzU3R5bGUgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNzc1N0eWxlLnB1c2goJ3ZycC1wb2ludCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRDc3MoY3NzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzU3R5bGUucHVzaChjc3MpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldE5hbWUobmFtZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIFZSUFBsb3R0ZXIge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcyA9IHRoaXMuZWxlbWVudC5maW5kKCdjYW52YXMnKVswXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZXMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JJdGVyYXRvciA9IENPTE9SUy52YWx1ZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNYID0gKHgpID0+IHg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zWSA9ICh5KSA9PiB5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy52cnAgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGlzRW1wdHkoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy52cnA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldENvbG9yKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuY29sb3JJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWl0ZW0udmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sb3JJdGVyYXRvciA9IENPTE9SUy52YWx1ZXMoKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5jb2xvckl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRQb2ludEVsZW0ocG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9ICAkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpKS50ZXh0KHBvaW50Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9pbnQuY3NzU3R5bGUuZm9yRWFjaCgoY3NzKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWxlbS5hZGRDbGFzcyhjc3MpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0QmVzdFNvbHV0aW9uKHZycCA9IHRoaXMudnJwKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2cnAuc29sdXRpb25zLnJlZHVjZSgocmVzLCBzb2wpID0+IHNvbC5jb3N0IDwgcmVzLmNvc3QgPyBzb2wgOiByZXMsIHtjb3N0OiBOdW1iZXIuTUFYX1ZBTFVFfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRWZWhpY2xlcyh2cnApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2cnAudmVoaWNsZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdnJwLnZlaGljbGVzLmZvckVhY2goKHZoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZoY0xvYyA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQ6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnRwOiB2aGMucmV0dXJuVG9EZXBvdFxyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZoYy5zdGFydExvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gdmhjLnN0YXJ0TG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZoY0xvYy5zdGFydCA9IG5ldyBSb3V0ZVBvaW50KHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCdtYXRlcmlhbC1pY29ucycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtdmVoaWNsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0TmFtZSgnbG9jYWxfc2hpcHBpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZoYy5lbmRMb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHZoYy5lbmRMb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmhjTG9jLmVuZCA9IG5ldyBSb3V0ZVBvaW50KHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCdtYXRlcmlhbC1pY29ucycpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtdmVoaWNsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2V0TmFtZSgnbG9jYWxfc2hpcHBpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF2aGMucmV0dXJuVG9EZXBvdCAmJiB2aGNMb2MuZW5kLmVxdWFscyh2aGNMb2Muc3RhcnQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZoY0xvYy5lbmQgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZXMuc2V0KHZoYy5pZCwgdmhjTG9jKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0U2hpcG1lbnRzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC5zaGlwbWVudHMgfHwgIXZycC5zaGlwbWVudHMubGVuZ3RoKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZycC5zaGlwbWVudHMuZm9yRWFjaCgoc2hpcG1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7eDogcHgsIHk6IHB5fSA9IHNoaXBtZW50LnBpY2t1cC5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7eDogZHgsIHk6IGR5fSA9IHNoaXBtZW50LmRlbGl2ZXJ5LmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBsb2MgPSBuZXcgUm91dGVQb2ludChweCwgcHkpLnNldENzcygndnJwLXBpY2t1cCcpLnNldE5hbWUoc2hpcG1lbnQuaWQuc2xpY2UoMykpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRsb2MgPSBuZXcgUm91dGVQb2ludChkeCwgZHkpLnNldENzcygndnJwLWRlbGl2ZXJ5Jykuc2V0TmFtZShzaGlwbWVudC5pZC5zbGljZSgzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGlwbWVudHMuc2V0KHNoaXBtZW50LmlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBpY2t1cDogcGxvYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGVsaXZlcnk6IGRsb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5OiBzaGlwbWVudC5jYXBhY2l0eURlbWFuZFswXSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0OiBNYXRoLnJvdW5kKHBsb2MuZ2V0RGlzdGFuY2UoZGxvYykgKiAxMCkgLyAxMFxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRTZXJ2aWNlcyh2cnApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2cnAuc2VydmljZXMgfHwgIXZycC5zZXJ2aWNlcy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdnJwLnNlcnZpY2VzLmZvckVhY2goKHNlcnZpY2UpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSBzZXJ2aWNlLmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYyA9IG5ldyBSb3V0ZVBvaW50KHgsIHkpLnNldENzcygndnJwLScgKyBzZXJ2aWNlLnR5cGUpLnNldE5hbWUoc2VydmljZS5pZC5zbGljZSgzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlcy5zZXQoc2VydmljZS5pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbjogbG9jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eTogc2VydmljZS5jYXBhY2l0eURlbWFuZFswXSB8fCAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFJvdXRlcyh2cnApe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2cnAuc29sdXRpb25zKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuYmVzdCA9IHRoaXMuZ2V0QmVzdFNvbHV0aW9uKHZycCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3Qucm91dGVzLmZvckVhY2goKHJvdXRlLCBpZHgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZWhpY2xlID0gdGhpcy52ZWhpY2xlcy5nZXQocm91dGUudmVoaWNsZUlkKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZlaGljbGUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bW1hcnkgPSByb3V0ZS5hY3QucmVkdWNlKChyZXMsIGFjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmV2TG9jID0gcmVzLnBvaW50c1tyZXMucG9pbnRzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbG9jID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNhcGFjaXR5ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hpcG1lbnRzLmhhcyhhY3Quam9iSWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNocCA9IHRoaXMuc2hpcG1lbnRzLmdldChhY3Quam9iSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jID0gc2hwLmRlbGl2ZXJ5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjdC50eXBlLnN0YXJ0c1dpdGgoJ3BpY2t1cCcpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2MgPSBzaHAucGlja3VwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5ID0gc2hwLmNhcGFjaXR5XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZXMuaGFzKGFjdC5qb2JJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ZjID0gdGhpcy5zZXJ2aWNlcy5nZXQoYWN0LmpvYklkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYyA9IHN2Yy5sb2NhdGlvbjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5ID0gc3ZjLmNhcGFjaXR5O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wb2ludHMucHVzaChsb2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuZGlzdGFuY2UgKz0gcHJldkxvYy5nZXREaXN0YW5jZShsb2MpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMuY2FwYWNpdHkgKz0gY2FwYWNpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludHM6IFt2ZWhpY2xlLnN0YXJ0XSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5OiAwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZlaGljbGUuZW5kKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeS5kaXN0YW5jZSArPSBzdW1tYXJ5LnBvaW50c1tzdW1tYXJ5LnBvaW50cy5sZW5ndGggLSAxXS5nZXREaXN0YW5jZSh2ZWhpY2xlLmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bW1hcnkucG9pbnRzLnB1c2godmVoaWNsZS5lbmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5LmNvbG9yID0gdGhpcy5nZXRDb2xvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnkudmVoaWNsZUlkID0gcm91dGUudmVoaWNsZUlkO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcy5zZXQoJ3JvdXRlJyArIGlkeCwgc3VtbWFyeSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXN0LnVuYXNzaWduZWRKb2JzLmZvckVhY2goKGpvYikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNoaXBtZW50cy5oYXMoam9iLmlkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNocCA9IHRoaXMuc2hpcG1lbnRzLmdldChqb2IuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaHAuZGVsaXZlcnkuc2V0Q3NzKCd2cnAtdW5hc3NpZ25lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaHAucGlja3VwLnNldENzcygndnJwLXVuYXNzaWduZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VydmljZXMuaGFzKGpvYi5pZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdmMgPSB0aGlzLnNlcnZpY2VzLmdldChqb2IuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdmMubG9jYXRpb24uc2V0Q3NzKCd2cnAtdW5hc3NpZ25lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VlJQKHZycCA9IHt9KXtcclxuICAgICAgICAgICAgICAgIHRoaXMudnJwID0gdnJwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0U2NhbGUodnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRWZWhpY2xlcyh2cnApXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFNoaXBtZW50cyh2cnApXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFNlcnZpY2VzKHZycClcclxuICAgICAgICAgICAgICAgICAgICAuc2V0Um91dGVzKHZycCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFBvaW50KHBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxQb2ludCA9IHBvaW50LmdldFRyYW5zZm9ybWVkKHRoaXMudHJhbnNYLCB0aGlzLnRyYW5zWSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSByZWFsUG9pbnQ7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gdGhpcy5nZXRQb2ludEVsZW0ocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgZWxlbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogeSAtIDEyICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiB4IC0gMTIgKyAncHgnXHJcbiAgICAgICAgICAgICAgICB9KS5hdHRyKCdpZCcsIHBvaW50LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZChlbGVtKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTZXJ2aWNlKHNlcnZpY2Upe1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzZXJ2aWNlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7bG9jYXRpb246IGxvY30gPSBzZXJ2aWNlO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQobG9jKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VydmljZUNhcGFjaXR5KHNlcnZpY2UpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFNlcnZpY2VDYXBhY2l0eShzZXJ2aWNlKXtcclxuICAgICAgICAgICAgICAgIGlmICghc2VydmljZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qge2xvY2F0aW9uOiBsb2MsIGNhcGFjaXR5OiBjYXBhY2l0eX0gPSBzZXJ2aWNlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eVwiPjxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHktbGlua1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5LWRhdGFcIj4ke2NhcGFjaXR5fTwvZGl2PjwvZGl2PmApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcnAgPSBsb2MuZ2V0VHJhbnNmb3JtZWQodGhpcy50cmFuc1gsIHRoaXMudHJhbnNZKTtcclxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHJwLnkgKyAxMCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogcnAueCAtIDEwICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkQ2xhc3MoJ3ZycC1wb2ludC1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkU2hpcG1lbnQoc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzaGlwbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BpY2t1cDogcGxvYywgZGVsaXZlcnk6IGRsb2N9ID0gc2hpcG1lbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChwbG9jKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQoZGxvYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdSb3V0ZShbcGxvYywgZGxvY10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTaGlwbWVudENhcGFjaXR5KHNoaXBtZW50KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTaGlwbWVudENhcGFjaXR5KHNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmICghc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwaWNrdXA6IHBsb2MsIGNhcGFjaXR5OiBjYXBhY2l0eX0gPSBzaGlwbWVudDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHlcIj48ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5LWxpbmtcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eS1kYXRhXCI+JHtjYXBhY2l0eX08L2Rpdj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJwID0gcGxvYy5nZXRUcmFuc2Zvcm1lZCh0aGlzLnRyYW5zWCwgdGhpcy50cmFuc1kpO1xyXG4gICAgICAgICAgICAgICAgZWxlbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogcnAueSArIDggKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJwLnggLSAxNiArICdweCdcclxuICAgICAgICAgICAgICAgIH0pLmFkZENsYXNzKCd2cnAtcG9pbnQtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRyYXdSb3V0ZShwb2ludHMsIGNvbG9yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgLjIwKSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZUNhcCA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChjb2xvciA/IFtdIDogWzgsIDhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsUG9pbnRzID0gcG9pbnRzLm1hcCgocG9pbnQpID0+IHBvaW50LmdldFRyYW5zZm9ybWVkKHRoaXMudHJhbnNYLCB0aGlzLnRyYW5zWSkpO1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubW92ZVRvKHJlYWxQb2ludHNbMF0ueCwgcmVhbFBvaW50c1swXS55KTtcclxuICAgICAgICAgICAgICAgIHJlYWxQb2ludHMuc2xpY2UoMSkuZm9yRWFjaCgocG9pbnQsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludHNbaWR4XS5nZXREaXN0YW5jZShwb2ludHNbaWR4ICsgMV0pLnRvRml4ZWQoMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWlkID0gcG9pbnRzW2lkeF0uZ2V0TWlkUG9pbnQocG9pbnRzW2lkeCArIDFdKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtZGlzdGFuY2UnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtcG9pbnQtaGlkZGVuJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldE5hbWUoZGlzdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29sb3JTdHlsZSA9IHsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yIHx8ICcjNDU1QTY0J307XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChtaWQpLmNzcyhjb2xvclN0eWxlKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lVG8ocG9pbnQueCwgcG9pbnQueSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRyYXdTb2x1dGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHJhd1JvdXRlKGl0ZW0ucG9pbnRzLCBpdGVtLmNvbG9yKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsb3RWUlAoKXtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy52cnApe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcy5mb3JFYWNoKCh2aGMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KHZoYy5zdGFydCwgVFlQRVMudmVoaWNsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZoYy5lbmQgJiYgIXZoYy5lbmQuZXF1YWxzKHZoYy5zdGFydCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KHZoYy5lbmQsIFRZUEVTLnZlaGljbGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwbWVudHMuZm9yRWFjaCgoc2hwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTaGlwbWVudChzaHApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VzLmZvckVhY2goKHN2YykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2VydmljZShzdmMpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHBsb3RTb2x1dGlvbigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3U29sdXRpb24oKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVzZXQoKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmQoJy52cnAtcG9pbnQsIC52cnAtY2FwYWNpdHknKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNYID0gKHgpID0+IHg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zWSA9ICh5KSA9PiB5O1xyXG4gICAgICAgICAgICAgICAgdGhpcy52cnAgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXN0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRTY2FsZSh2cnApe1xyXG4gICAgICAgICAgICAgICAgaWYgKHZycCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmhjTG9jcyA9IHZycC52ZWhpY2xlcy5yZWR1Y2UoKHJlcywgdmhjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aGMuc3RhcnRMb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge3gsIHl9ID0gdmhjLnN0YXJ0TG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNbMF0ucHVzaCh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1sxXS5wdXNoKHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2aGMuZW5kTG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHt4LCB5fSA9IHZoYy5lbmRMb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1swXS5wdXNoKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzFdLnB1c2goeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgICAgICB9LCBbW10sIFtdXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN2Y0xvY3MgPSB2cnAuc2VydmljZXMucmVkdWNlKChyZXMsIHN2YykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSBzdmMubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc1swXS5wdXNoKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNbMV0ucHVzaCh5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgICAgICB9LCBbW10sIFtdXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNocExvY3MgPSB2cnAuc2hpcG1lbnRzLnJlZHVjZSgocmVzLCBzaHApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNocC5waWNrdXAubG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHt4LCB5fSA9IHNocC5waWNrdXAubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNbMF0ucHVzaCh4KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1sxXS5wdXNoKHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaHAuZGVsaXZlcnkubG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHt4LCB5fSA9IHNocC5kZWxpdmVyeS5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1swXS5wdXNoKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzFdLnB1c2goeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgICAgICB9LCBbW10sIFtdXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHhNaW5NYXggPSB2aGNMb2NzWzBdLmNvbmNhdChzdmNMb2NzWzBdKS5jb25jYXQoc2hwTG9jc1swXSkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHlNaW5NYXggPSB2aGNMb2NzWzFdLmNvbmNhdChzdmNMb2NzWzFdKS5jb25jYXQoc2hwTG9jc1sxXSkuc29ydCgoYSwgYikgPT4gYSAtIGIpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHltaW4gPSB5TWluTWF4LnNoaWZ0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeW1heCA9IHlNaW5NYXgucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeG1pbiA9IHhNaW5NYXguc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB4bWF4ID0geE1pbk1heC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXhEaW0gPSBNYXRoLm1heCgoeG1heC14bWluKSwgKHltYXgteW1pbikpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhbeG1pbiwgeG1heCwgeW1pbiwgeW1heCwgbWF4RGltXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHZoY01heCA9IHZycC52ZWhpY2xlcy5tYXAoKHZoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgc21heCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBlbWF4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHZoYy5zdGFydExvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCB7eCwgeX0gPSB2aGMuc3RhcnRMb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHNtYXggPSBNYXRoLm1heCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmICh2aGMuZW5kTG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHt4LCB5fSA9IHZoYy5lbmRMb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGVtYXggPSBNYXRoLm1heCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBNYXRoLm1heChzbWF4LCBlbWF4KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KS5zb3J0KChhLCBiKSA9PiBiIC0gYSlbMF0gfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHN2Y01heCA9IHZycC5zZXJ2aWNlcy5tYXAoKHN2YykgPT4gTWF0aC5tYXgoc3ZjLmxvY2F0aW9uLmNvb3JkLngsIHN2Yy5sb2NhdGlvbi5jb29yZC55KSkuc29ydCgoYSwgYikgPT4gYiAtIGEpWzBdIHx8IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9cclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBzaHBNYXggPSB2cnAuc2hpcG1lbnRzLm1hcCgoc2hwKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBwbWF4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGRtYXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAoc2hwLnBpY2t1cC5sb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQge3gsIHl9ID0gc2hwLnBpY2t1cC5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIHBtYXggPSBNYXRoLm1heCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChzaHAuZGVsaXZlcnkubG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHt4LCB5fSA9IHNocC5kZWxpdmVyeS5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGRtYXggPSBNYXRoLm1heCh4LCB5KVxyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJldHVybiBNYXRoLm1heChwbWF4LCBkbWF4KTtcclxuICAgICAgICAgICAgICAgICAgICAvLyB9KS5zb3J0KChhLCBiKSA9PiBiIC0gYSlbMF0gfHwgMDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2NhbGUgPSB0aGlzLmNhbnZhcy53aWR0aCAvIG1heERpbTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgU2NhbGU6ICR7c2NhbGV9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc1ggPSAoeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHggLSB4bWluKSAqIHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc1kgPSAoeSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHkgLSB5bWluKSAqIHNjYWxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZ2V0SW5zdGFuY2UgPSAoZWxlbSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZSUFBsb3R0ZXIoZWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdnJwL3ZycC1wbG90dGVyLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc5NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5zZXJ2aWNlKCckZGJzY2FuJywgZGJzY2FuU2VydmljZSk7XHJcbiAgICBkYnNjYW5TZXJ2aWNlLiRpbmplY3QgPSBbJyRwZXJtdXRhdGlvbiddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRic2NhblNlcnZpY2UoJHBlcm11dGF0aW9uKXtcclxuICAgICAgICBjb25zdCBfcG9pbnRzID0gW107XHJcbiAgICAgICAgY29uc3QgX2Vwc0ZhY3RvciA9IDAuODtcclxuICAgICAgICBjb25zdCBfc2FtcGxlQ291bnQgPSAxMDA7XHJcbiAgICAgICAgY29uc3QgX3BvaW50U3RhdHVzID0ge1xyXG4gICAgICAgICAgICBOT0lTRTogMCxcclxuICAgICAgICAgICAgUEFSVF9PRl9DTFVTVEVSOiAxXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xyXG4gICAgICAgICAgICBwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIGdldDogKCkgPT4gX3BvaW50cyxcclxuICAgICAgICAgICAgICAgIHNldDogKHB0cykgPT4gX3BvaW50cy5zcGxpY2UoMCwgX3BvaW50cy5sZW5ndGgsIC4uLnB0cylcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZXBzRmFjdG9yOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6ICgpID0+IF9lcHNGYWN0b3JcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc2FtcGxlQ291bnQ6IHtcclxuICAgICAgICAgICAgICAgIGdldDogKCkgPT4gX3NhbXBsZUNvdW50XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHBvaW50U3RhdHVzOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6ICgpID0+IF9wb2ludFN0YXR1c1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICBjbGFzcyBDbHVzdGVyIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cyA9IEltbXV0YWJsZS5TZXQoKS5hc011dGFibGUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkUG9pbnQocG9pbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLmFkZChwb2ludCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldFBvaW50cygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50cy52YWx1ZVNlcSgpLnRvQXJyYXkoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZXF1YWxzKG9iail7XHJcbiAgICAgICAgICAgICAgICBpZiAob2JqID09PSB0aGlzKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGlmKCFvYmogfHwgb2JqLmNvbnN0cnVjdG9yICE9PSB0aGlzLmNvbnN0cnVjdG9yKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMuc2l6ZSA9PT0gb2JqLnBvaW50cy5zaXplXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy5wb2ludHMuaW50ZXJzZWN0KG9iai5wb2ludHMpLnNpemUgPT09IHRoaXMucG9pbnRzLnNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3MgSlNEQlNDQU4ge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihlcHMsIG1pblB0cyA9IDIsIGRpc3RhbmNlQ2FsY3VsYXRvciA9IEpTREJTQ0FOLmV1Y2xpZGVhbkRpc3RhbmNlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVwcyA9IGVwcztcclxuICAgICAgICAgICAgICAgIHRoaXMubWluUHRzID0gbWluUHRzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXN0YW5jZUNhbGN1bGF0b3IgPSBkaXN0YW5jZUNhbGN1bGF0b3I7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldEVwcygpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVwcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0RXBzKGVwcyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVwcyA9IGVwcztcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRNaW5QdHMoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5taW5QdHM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldE1pblB0cyhtaW5QdHMpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWluUHRzID0gbWluUHRzO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNsdXN0ZXIocG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbHVzdGVycyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmlzaXRlZCA9IEltbXV0YWJsZS5NYXAoKS5hc011dGFibGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuZ2V0TmVpZ2hib3JzKHBvaW50c1swXSwgcG9pbnRzKSlcclxuICAgICAgICAgICAgICAgIHBvaW50cy5mb3JFYWNoKChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdmlzaXRlZC5oYXMocG9pbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG5laWdoYm9ycyA9IHRoaXMuZ2V0TmVpZ2hib3JzKHBvaW50LCBwb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmVpZ2hib3JzLmxlbmd0aCA+PSB0aGlzLm1pblB0cykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2x1c3RlciA9IG5ldyBDbHVzdGVyKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVycy5wdXNoKHRoaXMuZXhwYW5kQ2x1c3RlcihjbHVzdGVyLCBwb2ludCwgbmVpZ2hib3JzLCBwb2ludHMsIHZpc2l0ZWQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWQuc2V0KHBvaW50LCBfcG9pbnRTdGF0dXMuTk9JU0UpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY2x1c3RlcnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV4cGFuZENsdXN0ZXIoY2x1c3RlciwgcG9pbnQsIG5laWdoYm9ycywgcG9pbnRzLCB2aXNpdGVkKSB7XHJcbiAgICAgICAgICAgICAgICBjbHVzdGVyLmFkZFBvaW50KHBvaW50KTtcclxuICAgICAgICAgICAgICAgIHZpc2l0ZWQuc2V0KHBvaW50LCBfcG9pbnRTdGF0dXMuUEFSVF9PRl9DTFVTVEVSKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWVkcyA9IG5laWdoYm9ycy5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIHNlZWRzLmZvckVhY2goKGN1cnJlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZpc2l0ZWQuaGFzKGN1cnJlbnQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50TmVpZ2hib3JzID0gdGhpcy5nZXROZWlnaGJvcnMoY3VycmVudCwgcG9pbnRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROZWlnaGJvcnMubGVuZ3RoID49IHRoaXMubWluUHRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWVkcyA9IHRoaXMubWVyZ2Uoc2VlZHMsIGN1cnJlbnROZWlnaGJvcnMpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpdGVkLmdldChjdXJyZW50KSA9PT0gX3BvaW50U3RhdHVzLk5PSVNFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2l0ZWQuc2V0KGN1cnJlbnQsIF9wb2ludFN0YXR1cy5QQVJUX09GX0NMVVNURVIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbHVzdGVyLmFkZFBvaW50KGN1cnJlbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNsdXN0ZXI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldE5laWdoYm9ycyhwb2ludCwgcG9pbnRzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9pbnRzLnJlZHVjZSgocmVzLCBuZWlnaGJvcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwb2ludCAhPT0gbmVpZ2hib3IgJiYgdGhpcy5kaXN0YW5jZUNhbGN1bGF0b3IobmVpZ2hib3IsIHBvaW50KSA8PSB0aGlzLmVwcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMucHVzaChuZWlnaGJvcik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCBbXSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIF9tZXJnZShvbmUsIHR3bykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgb25lU2V0ID0gbmV3IFNldChvbmUpO1xyXG4gICAgICAgICAgICAgICAgdHdvLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW9uZVNldC5oYXMoaXRlbSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb25lLnB1c2goaXRlbSlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvbmU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lcmdlKG9uZSwgdHdvKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBJbW11dGFibGUuU2V0Lm9mKG9uZSkudW5pb24odHdvKS52YWx1ZVNlcSgpLnRvQXJyYXkoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZXVjbGlkZWFuRGlzdGFuY2UgKHB0QSwgcHRCKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHRBLmdldERpc3RhbmNlKHB0Qik7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5jbHVzdGVyID0gKHBvaW50cykgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBlcHMgPSBzYW1wbGUocG9pbnRzKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZXBzKTtcclxuICAgICAgICAgICAgY29uc3QgZGJzY2FuID0gbmV3IEpTREJTQ0FOKGVwcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBkYnNjYW4uY2x1c3Rlcihwb2ludHMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIF9zYW1wbGUocG9pbnRzKXtcclxuICAgICAgICAgICAgbGV0IG1pbiA9IE51bWJlci5NQVhfVkFMVUUsIHN1bSA9IDA7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgX3NhbXBsZUNvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IFtwdDEsIHB0Ml0gPSAkcGVybXV0YXRpb24uZ2V0UmFuZG9tUGVybXV0YXRpb24ocG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBwdDEuZ2V0RGlzdGFuY2UocHQyKTtcclxuICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgbWluKSBtaW4gPSBkaXN0O1xyXG4gICAgICAgICAgICAgICAgc3VtICs9IGRpc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gKChzdW0gLyBfc2FtcGxlQ291bnQpIC0gbWluKSAqIF9lcHNGYWN0b3JcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIHNhbXBsZShwb2ludHMpe1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnc2FtcGxlIHN0YXJ0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3RzID0gJHBlcm11dGF0aW9uLmdldEFsbENvbWJpbmF0aW9uKHBvaW50cywgMikubWFwKChwYWlyKSA9PiBwYWlyWzBdLmdldERpc3RhbmNlKHBhaXJbMV0pKS5zb3J0KChhLGIpID0+IGEgLSBiKTtcclxuICAgICAgICAgICAgY29uc3QgbWlkID0gZGlzdHMuc2xpY2UoTWF0aC5yb3VuZChkaXN0cy5sZW5ndGggLyAzKSwgTWF0aC5yb3VuZChkaXN0cy5sZW5ndGggKiAyIC8gMykpO1xyXG4gICAgICAgICAgICBjb25zdCBzdW0gPSBtaWQucmVkdWNlKChyZXMsIGRpc3QpID0+IHJlcyArIGRpc3QpO1xyXG4gICAgICAgICAgICBjb25zdCBlcHMgPSAoKHN1bSAvIG1pZC5sZW5ndGgpIC0gZGlzdHNbMF0pICogX2Vwc0ZhY3RvcjtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3NhbXBsZSBmaW5pc2hlZCAnICsgZXBzKTtcclxuICAgICAgICAgICAgcmV0dXJuIGVwcztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDgwNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5kaXJlY3RpdmUoJ2Ric2NhbicsIGRic2NhbkRpcmVjdGl2ZSk7XHJcbiAgICBkYnNjYW5EaXJlY3RpdmUuJGluamVjdCA9IFtdO1xyXG5cclxuICAgIGZ1bmN0aW9uIGRic2NhbkRpcmVjdGl2ZSgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vZGJzY2FuLXRwbC5odG1sJyksXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdEYnNjYW5Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY3RybCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdnJwLmNvbnRyb2xsZXIoJ0Ric2NhbkNvbnRyb2xsZXInLCBEYnNjYW5Db250cm9sbGVyKTtcclxuICAgIERic2NhbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywnJHRpbWVvdXQnLCAnJGRic2NhbicsICckY29sb3JkZWYnLCAncG9pbnRGYWN0b3J5J107XHJcblxyXG4gICAgZnVuY3Rpb24gRGJzY2FuQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkZGJzY2FuLCAkY29sb3JkZWYsIHBvaW50RmFjdG9yeSl7XHJcbiAgICAgICAgY29uc3QgU1RZTEVTID0gWydyZWQtYmFjaycsICdibHVlLWJhY2snLCAnb3JhbmdlLWJhY2snLCAnbGltZS1iYWNrJywgJ3B1cnBsZS1iYWNrJywgJ2FxdWEtYmFjaycsICd5ZWxsb3ctYmFjaycsICdncmVlbi1iYWNrJywgJ3BpbmstYmFjaycsICdjeWFuLWJhY2snXTtcclxuICAgICAgICBjb25zdCBDT0xPUlMgPSBbJyNGNDQzMzYnLCAnIzIxOTZGMycsICcjRkY5ODAwJywgJyM4QkMzNEEnLCAnIzlDMjdCMCcsICcjMDA5Njg4JywgJyNGRkMxMDcnLCAnIzRDQUY1MCcsICcjRTkxRTYzJywgJyMwMEJDRDQnXTtcclxuICAgICAgICB0aGlzLnBvaW50Q291bnQgPSAxMDA7XHJcbiAgICAgICAgdGhpcy5yYW5kb21Qb2ludHMgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmF3UG9pbnRzID0gbnVsbDtcclxuICAgICAgICB0aGlzLmNsdXN0ZXJTdHlsZU1hcCA9IEltbXV0YWJsZS5NYXAoKS5hc011dGFibGUoKTtcclxuICAgICAgICB0aGlzLnN0eWxlID0gZ2V0SXRlbShTVFlMRVMpO1xyXG5cclxuICAgICAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY2x1c3RlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgdGhpcy5yZXNldFBvaW50cyA9ICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnRzRWxlbSA9ICQoJy5kYnMtcG9pbnQtY29udGFpbmVyJyk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnJhbmRvbVBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cyA9IHBvaW50RmFjdG9yeS5nZXRSYW5kb21Qb2ludHModGhpcy5wb2ludENvdW50LCBwb2ludHNFbGVtLndpZHRoKCksIHBvaW50c0VsZW0uaGVpZ2h0KCkpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMgPSB0aGlzLnJhd1BvaW50cy5zcGxpdCgnXFxuJykubWFwKChwYWlyKSA9PiBwb2ludEZhY3RvcnkuZ2V0UG9pbnQoLi4ucGFpci50cmltKCkuc3BsaXQoJywnKS5tYXAodiA9PiBwYXJzZUludCh2KSkpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRzY29wZS4kYXBwbHlBc3luYygpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXRDbHVzdGVycyA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jbHVzdGVyU3R5bGVNYXAuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKCcuZGJzLXBvaW50JykucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1c3RlclN0eWxlTWFwLmNsZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2x1c3RlcnMgPSAkZGJzY2FuLmNsdXN0ZXIodGhpcy5wb2ludHMpLmZpbHRlcigoY2x1c3RlcikgPT4gY2x1c3Rlci5nZXRQb2ludHMoKS5sZW5ndGggPiAxKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5jbHVzdGVycylcclxuICAgICAgICAgICAgdGhpcy5jbHVzdGVycy5mb3JFYWNoKChjbHVzdGVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc05hbWUgPSB0aGlzLnN0eWxlLm5leHQoKS52YWx1ZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3RlclN0eWxlTWFwLnNldChjbHVzdGVyLCBjbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsdXN0ZXIuZ2V0UG9pbnRzKCkuZm9yRWFjaCgocHQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHB0LnRvU3RyaW5nKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKGVsZW0pLmFkZENsYXNzKGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24qIGdldEl0ZW0obGlzdCl7XHJcbiAgICAgICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICAgICAgd2hpbGUodHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICB5aWVsZCBsaXN0WyhpKysgJSBsaXN0Lmxlbmd0aCldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLWRpcmVjdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gODA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9kYnNjYW4vZGJzY2FuLmNzc1xuLy8gbW9kdWxlIGlkID0gODA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9rLW1lYW4vay1tZWFuLmNzc1xuLy8gbW9kdWxlIGlkID0gODA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL2NvbG9ycy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDgxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiZGJzLWNvbnRyb2xzXFxcIiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg9XFxcIjQwXFxcIj5cXHJcXG4gICAgICAgICAgICA8bWQtc2xpZGVyLWNvbnRhaW5lciBuZy1pZj1cXFwiY3RybC5yYW5kb21Qb2ludHNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8c3Bhbj5Qb2ludHM8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCI1MFxcXCIgbWF4PVxcXCI1MDBcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLnBvaW50Q291bnRcXFwiIGFyaWEtbGFiZWw9XFxcInBvaW50IGNvdW50XFxcIiBjbGFzcz1cXFwibWQtd2FyblxcXCI+PC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5wb2ludENvdW50XFxcIiBhcmlhLWxhYmVsPVxcXCJwb2ludCBjb3VudFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDwvbWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyIGNsYXNzPVxcXCJtZC1ibG9ja1xcXCIgbmctc2hvdz1cXFwiIWN0cmwucmFuZG9tUG9pbnRzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGxhYmVsPlZSUDwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBuZy1tb2RlbD1cXFwiY3RybC5yYXdQb2ludHNcXFwiIHJvd3M9XFxcIjZcXFwiIG1heC1yb3dzPVxcXCI2XFxcIj48L3RleHRhcmVhPlxcclxcbiAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCI1MFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBmbGV4PjwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtc3dpdGNoIG5nLW1vZGVsPVxcXCJjdHJsLnJhbmRvbVBvaW50c1xcXCIgYXJpYS1sYWJlbD1cXFwidXNlIHJhbmRvbSBwb2ludHNcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbSBwb2ludHNcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtc3dpdGNoPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cXFwiY3RybC5yZXNldFBvaW50cygpXFxcIiBhcmlhLWxhYmVsPVxcXCJyZXNldFxcXCI+UmVzZXQ8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBjbGFzcz1cXFwibWQtcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcImN0cmwucmVzZXRDbHVzdGVycygpXFxcIiBhcmlhLWxhYmVsPVxcXCJjbHVzdGVyIHBvaW50c1xcXCI+Q2x1c3RlcjwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJkYnMtZHJhdy1zY3JvbGxlclxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkYnMtZHJhdy1jb250YWluZXJcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImRicy1wb2ludC1jb250YWluZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkYnMtcG9pbnRcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgbmctcmVwZWF0PVxcXCJwb2ludCBpbiBjdHJsLnBvaW50c1xcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICBpZD1cXFwie3twb2ludC50b1N0cmluZygpfX1cXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgbmctc3R5bGU9XFxcInsndG9wJzogcG9pbnQueSArICdweCcsICdsZWZ0JzogcG9pbnQueCArICdweCd9XFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICA8L2Rpdj5cXHJcXG48L2Rpdj5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvZGJzY2FuL2Ric2Nhbi10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gODExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=