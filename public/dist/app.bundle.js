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

module.exports = "<div class=\"algo-container\" layout=\"column\" layout-align=\"start center\" md-theme=\"algo\" ap-md-color=\"{'background-color': 'algo::primary'}\">\r\n    <md-tabs md-border-bottom md-selected=\"vm.activeTabIndex\">\r\n        <md-tab label=\"VRP\">\r\n            <div class=\"algo-wrapper\">\r\n                <vrp-draw></vrp-draw>\r\n            </div>\r\n        </md-tab>\r\n        <md-tab label=\"TSP\">\r\n            <div class=\"algo-wrapper\">\r\n                <route-draw></route-draw>\r\n            </div>\r\n        </md-tab>\r\n        <md-tab label=\"k-Means\">\r\n            <div class=\"algo-wrapper\">\r\n                <k-mean></k-mean>\r\n            </div>\r\n        </md-tab>\r\n    </md-tabs>\r\n</div>"

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

/***/ })

},[748]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMgLmNzcyQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLWRyYXcuY3NzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy5jc3MiLCJ3ZWJwYWNrOi8vLy4vY3NzIC5jc3MkIiwid2VicGFjazovLy8uL2Nzcy9hZ2dyaWQuY3NzIiwid2VicGFjazovLy8uL2Nzcy9jaGVja2lvLmNzcyIsIndlYnBhY2s6Ly8vLi9jc3MvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vY3NzL3Njcm9sbHBhZC5jc3MiLCJ3ZWJwYWNrOi8vLy4vYXBwL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yZXNvdXJjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yZXNvdXJjZS9hbmd1bGFyLXJlc291cmNlLmpzIiwid2VicGFjazovLy8uL2FwcC90ZW1wbGF0ZXMvYWxnby5odG1sIiwid2VicGFjazovLy8uL2FwcC9jb25zdGFudHMgLitcXC5qcyQiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnN0YW50cy9hcGktcmVxdWVzdHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnN0YW50cy9tZC1jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbnRyb2xsZXJzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9jb250cm9sbGVycy9yb3V0ZS1jb250cm9sbGVyLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL2FwLW1kLWNvbG9yLmpzIiwid2VicGFjazovLy8uL2FwcC9kaXJlY3RpdmVzL3Jlc2l6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzIC4rXFwuanMkIiwid2VicGFjazovLy8uL2FwcC9zZXJ2aWNlcy9jb2xvci1kZWYtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvZGF0ZS11dGlscy1wcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvZG91YmxlLXNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL3NlcnZpY2VzL2V2ZW50LWVtaXR0ZXItc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvcmVzaXplLXNlbnNvci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvc2xhc2gtcGFyYW0tc2VyaWFsaXplci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvc2VydmljZXMvc3RvcmFnZS1wcm92aWRlci5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cyAuK1xcLmpzJCIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL2JpZ251bWJlci1maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYWxnby9nZW5ldGljLWZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYWxnby9wZXJtdXRhdGlvbi1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2FsZ28vcG9pbnQtZmFjdG9yeS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hbGdvL3NpbS1hbm5lYWwtc2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9hcGkvYXBpLXJlcXVlc3QtcHJvdmlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXBpL3NsYXNoLXBhcmFtLXNlcmlhbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvYXBpL3RwbC1xdWVyeS1zZXJpYWxpemVyLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tdHBsLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvay1tZWFuL2stbWVhbi1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3RzcC9yb3V0ZS1kcmF3LWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy10cGwuaHRtbCIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtcGxvdHRlci1zZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvdnJwL3ZycC1kcmF3LXRwbC5odG1sIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL3ZycC92cnAtcGxvdHRlci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7QUFDQTtBQUNBOztBQUVBLDRCQUE0QixtQkFBTyxDQUFDLEdBQWlDO0FBQ3JFOztBQUVBLCtCQUErQix3QkFBK0M7QUFDOUUsK0JBQStCLHdCQUEyQzs7QUFFMUUsWUFBWSxtQkFBTyxDQUFDLEdBQVU7O0FBRTlCLHlCQUF5Qix3QkFBZ0Q7QUFDekUsNENBQTRDLDJDQUEyQzs7QUFFdkYsMkJBQTJCLHdCQUFrRDtBQUM3RSw4Q0FBOEMsNkNBQTZDOztBQUUzRiwwQkFBMEIsd0JBQWlEO0FBQzNFLDZDQUE2Qyw0Q0FBNEM7O0FBRXpGLHdCQUF3Qix3QkFBK0M7QUFDdkUsMkNBQTJDLDBDQUEwQzs7QUFFckYsMEJBQTBCLHdCQUFpRDtBQUMzRSw2Q0FBNkMsNENBQTRDOzs7Ozs7Ozs7Ozs7OztBQ3pCekY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixvQkFBb0IsSUFBSSxRQUFRO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFdBQVc7QUFDdEM7QUFDQTtBQUNBOzs7Ozs7Ozs7QUM5REE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxJQUFJO0FBQ25EO0FBQ0EsMkJBQTJCLElBQUk7QUFDL0IsMEJBQTBCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixRQUFRO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLElBQUk7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDMU1BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixHQUFHO0FBQzNCLDZCQUE2QixjQUFjO0FBQzNDLDZCQUE2QixvQkFBb0I7QUFDakQsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0Esd0NBQXdDLHFCQUFxQjtBQUM3RCxvQ0FBb0MscUJBQXFCO0FBQ3pEO0FBQ0EsMkNBQTJDLHNCQUFzQjs7QUFFakU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUsS0FBSztBQUNqRjtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsZUFBZTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsU0FBUztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGLGVBQWUsOEJBQThCO0FBQzlIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtB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Q0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLEdBQUcsc0JBQXNCO0FBQzlDO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsMENBQTBDLHdDQUF3QztBQUNsRixpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUNuUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBLDJD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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBLDRGQUE0Rix1QkFBdUI7QUFDbkg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLEtBQUs7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLGFBQWE7QUFDeEMsMkJBQTJCLGFBQWE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLEtBQUs7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QixLQUFLO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixjQUFjOztBQUVyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixrQ0FBa0M7QUFDekQ7QUFDQSxzREFBc0QsU0FBUztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsNkJBQTZCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUNBQWlDO0FBQ3hEO0FBQ0Esc0RBQXNELFNBQVM7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLEtBQUs7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsS0FBSztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQSwrQkFBK0IsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQSxpQ0FBaUMsS0FBSztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxLQUFLO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsS0FBSztBQUN6QztBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7O0FBRXhCO0FBQ0EsMENBQTBDLE1BQU07QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRSIsImZpbGUiOiJhcHAuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgVXNlciBvbiAxNi4wNS4xNy5cclxuICovXHJcblxyXG5jb25zdCBhbmd1bGFyUmVzb3VyY2VVdGlsID0gcmVxdWlyZSgnd2VicGFjay1hbmd1bGFyLXJlc291cmNlLXBsdWdpbicpO1xyXG4vLyBTVFlMRVNcclxuXHJcbmFuZ3VsYXJSZXNvdXJjZVV0aWwucmVxdWlyZUFsbChyZXF1aXJlLmNvbnRleHQoXCIuL2NvbXBvbmVudHMvXCIsIHRydWUsIC8uY3NzJC8pKTtcclxuYW5ndWxhclJlc291cmNlVXRpbC5yZXF1aXJlQWxsKHJlcXVpcmUuY29udGV4dChcIi4vLi4vY3NzL1wiLCB0cnVlLCAvLmNzcyQvKSk7XHJcblxyXG5jb25zdCB2cnAgPSByZXF1aXJlKCcuL2FwcC5qcycpO1xyXG5cclxuY29uc3QgY29udGV4dENvbnN0YW50cyA9IHJlcXVpcmUuY29udGV4dCgnLi9jb25zdGFudHMvJywgdHJ1ZSwgLy4rXFwuanMkLyk7XHJcbmNvbnRleHRDb25zdGFudHMua2V5cygpLm1hcChmdW5jdGlvbiAoa2V5KSB7IGNvbnRleHRDb25zdGFudHMuYXBwbHkobnVsbCwgW2tleV0pKHZycCkgfSk7XHJcblxyXG5jb25zdCBjb250ZXh0Q29udHJvbGxlcnMgPSByZXF1aXJlLmNvbnRleHQoJy4vY29udHJvbGxlcnMvJywgdHJ1ZSwgLy4rXFwuanMkLyk7XHJcbmNvbnRleHRDb250cm9sbGVycy5rZXlzKCkubWFwKGZ1bmN0aW9uIChrZXkpIHsgY29udGV4dENvbnRyb2xsZXJzLmFwcGx5KG51bGwsIFtrZXldKSh2cnApIH0pO1xyXG5cclxuY29uc3QgY29udGV4dERpcmVjdGl2ZXMgPSByZXF1aXJlLmNvbnRleHQoJy4vZGlyZWN0aXZlcy8nLCB0cnVlLCAvLitcXC5qcyQvKTtcclxuY29udGV4dERpcmVjdGl2ZXMua2V5cygpLm1hcChmdW5jdGlvbiAoa2V5KSB7IGNvbnRleHREaXJlY3RpdmVzLmFwcGx5KG51bGwsIFtrZXldKSh2cnApIH0pO1xyXG5cclxuY29uc3QgY29udGV4dFNlcnZpY2VzID0gcmVxdWlyZS5jb250ZXh0KCcuL3NlcnZpY2VzLycsIHRydWUsIC8uK1xcLmpzJC8pO1xyXG5jb250ZXh0U2VydmljZXMua2V5cygpLm1hcChmdW5jdGlvbiAoa2V5KSB7IGNvbnRleHRTZXJ2aWNlcy5hcHBseShudWxsLCBba2V5XSkodnJwKSB9KTtcclxuXHJcbmNvbnN0IGNvbnRleHRDb21wb25lbnRzID0gcmVxdWlyZS5jb250ZXh0KCcuL2NvbXBvbmVudHMvJywgdHJ1ZSwgLy4rXFwuanMkLyk7XHJcbmNvbnRleHRDb21wb25lbnRzLmtleXMoKS5tYXAoZnVuY3Rpb24gKGtleSkgeyBjb250ZXh0Q29tcG9uZW50cy5hcHBseShudWxsLCBba2V5XSkodnJwKSB9KTtcclxuXHJcblxyXG5cclxuXHJcblxyXG5cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDc0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vdHNwL3JvdXRlLWRyYXcuY3NzXCI6IDc1MCxcblx0XCIuL3ZycC92cnAtZHJhdy5jc3NcIjogNzUxXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNzQ5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMgLmNzcyRcbi8vIG1vZHVsZSBpZCA9IDc0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLWRyYXcuY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy5jc3Ncbi8vIG1vZHVsZSBpZCA9IDc1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWdncmlkLmNzc1wiOiA3NTMsXG5cdFwiLi9jaGVja2lvLmNzc1wiOiA3NTQsXG5cdFwiLi9tYWluLmNzc1wiOiA3NTUsXG5cdFwiLi9zY3JvbGxwYWQuY3NzXCI6IDc1NlxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDc1MjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2NzcyAuY3NzJFxuLy8gbW9kdWxlIGlkID0gNzUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jc3MvYWdncmlkLmNzc1xuLy8gbW9kdWxlIGlkID0gNzUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jc3MvY2hlY2tpby5jc3Ncbi8vIG1vZHVsZSBpZCA9IDc1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyByZW1vdmVkIGJ5IGV4dHJhY3QtdGV4dC13ZWJwYWNrLXBsdWdpblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY3NzL21haW4uY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Nzcy9zY3JvbGxwYWQuY3NzXG4vLyBtb2R1bGUgaWQgPSA3NTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXHJcbmNvbnN0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XHJcbmNvbnN0IG1hdGggPSByZXF1aXJlKCdtYXRoanMnKTtcclxuXHJcbm1hdGguY29uZmlnKHtudW1iZXI6ICdCaWdOdW1iZXInLCBwcmVjaXNpb246IDY0fSk7XHJcblxyXG5jb25zdCB2cnAgPSBhbmd1bGFyLm1vZHVsZSgnVlJQUGxvdHRlcicsIFtcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItdWktcm91dGVyJyksXHJcbiAgICByZXF1aXJlKCdhbmd1bGFyLWFuaW1hdGUnKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItcmVzb3VyY2UnKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItbWVzc2FnZXMnKSxcclxuICAgIHJlcXVpcmUoJ2FuZ3VsYXItYXJpYScpLFxyXG4gICAgcmVxdWlyZSgnYW5ndWxhci1tYXRlcmlhbCcpLFxyXG4gICAgcmVxdWlyZSgnYW5ndWxhci1maWx0ZXInKVxyXG5dKTtcclxuXHJcbnZycC5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLCAnJGxvY2F0aW9uUHJvdmlkZXInLCAnJG1kVGhlbWluZ1Byb3ZpZGVyJyxcclxuICAgIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJG1kVGhlbWluZ1Byb3ZpZGVyKSB7XHJcbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaHRtbDVNb2RlKHtcclxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcclxuICAgICAgICAgICAgcmVxdWlyZUJhc2U6IGZhbHNlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnZGVmYXVsdCcpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgncmVkJylcclxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ29yYW5nZScpXHJcbiAgICAgICAgICAgIC53YXJuUGFsZXR0ZSgncHVycGxlJyk7XHJcblxyXG4gICAgICAgICRtZFRoZW1pbmdQcm92aWRlci50aGVtZSgnYWxnbycpXHJcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYmx1ZScpXHJcbiAgICAgICAgICAgIC5hY2NlbnRQYWxldHRlKCdvcmFuZ2UnKVxyXG4gICAgICAgICAgICAud2FyblBhbGV0dGUoJ3BpbmsnKTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2FsZ28nKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKFwiYWxnb1wiLCB7XHJcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnUm91dGVDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ3ZtJyxcclxuICAgICAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL3RlbXBsYXRlcy9hbGdvLmh0bWwnKSxcclxuICAgICAgICAgICAgICAgIHVybDogXCIvYWxnb1wiLFxyXG4gICAgICAgICAgICAgICAgb25FbnRlcjogZnVuY3Rpb24gKCRyb290U2NvcGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLnBhZ2VUaXRsZSA9ICdSb3V0aW5nIGFsZ29yaXRobXMgZGVtbyc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfV0pO1xyXG5cclxudnJwLnJ1bihcclxuICAgIFsnJHJvb3RTY29wZScsICckc3RhdGUnLCAnJHN0YXRlUGFyYW1zJyxcclxuICAgICAgICBmdW5jdGlvbiAoJHJvb3RTY29wZSwgJHN0YXRlLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kc3RhdGUgPSAkc3RhdGU7XHJcbiAgICAgICAgICAgICRyb290U2NvcGUuJHN0YXRlUGFyYW1zID0gJHN0YXRlUGFyYW1zO1xyXG5cclxuICAgICAgICAgICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN1Y2Nlc3MnLCBmdW5jdGlvbiAoZXZlbnQsIHRvLCB0b1BhcmFtcywgZnJvbSwgZnJvbVBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgJHJvb3RTY29wZS5wcmVTdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBmcm9tLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBmcm9tLnVybCxcclxuICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IGZyb21QYXJhbXNcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAkcm9vdFNjb3BlLmN1clN0YXRlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHRvLm5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgdXJsOiB0by51cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiB0b1BhcmFtc1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgXVxyXG4pO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHZycDtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDc1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJyZXF1aXJlKCcuL2FuZ3VsYXItcmVzb3VyY2UnKTtcbm1vZHVsZS5leHBvcnRzID0gJ25nUmVzb3VyY2UnO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYW5ndWxhci1yZXNvdXJjZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNzU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQGxpY2Vuc2UgQW5ndWxhckpTIHYxLjcuOFxuICogKGMpIDIwMTAtMjAxOCBHb29nbGUsIEluYy4gaHR0cDovL2FuZ3VsYXJqcy5vcmdcbiAqIExpY2Vuc2U6IE1JVFxuICovXG4oZnVuY3Rpb24od2luZG93LCBhbmd1bGFyKSB7J3VzZSBzdHJpY3QnO1xuXG52YXIgJHJlc291cmNlTWluRXJyID0gYW5ndWxhci4kJG1pbkVycignJHJlc291cmNlJyk7XG5cbi8vIEhlbHBlciBmdW5jdGlvbnMgYW5kIHJlZ2V4IHRvIGxvb2t1cCBhIGRvdHRlZCBwYXRoIG9uIGFuIG9iamVjdFxuLy8gc3RvcHBpbmcgYXQgdW5kZWZpbmVkL251bGwuICBUaGUgcGF0aCBtdXN0IGJlIGNvbXBvc2VkIG9mIEFTQ0lJXG4vLyBpZGVudGlmaWVycyAoanVzdCBsaWtlICRwYXJzZSlcbnZhciBNRU1CRVJfTkFNRV9SRUdFWCA9IC9eKFxcLlthLXpBLVpfJEBdWzAtOWEtekEtWl8kQF0qKSskLztcblxuZnVuY3Rpb24gaXNWYWxpZERvdHRlZFBhdGgocGF0aCkge1xuICByZXR1cm4gKHBhdGggIT0gbnVsbCAmJiBwYXRoICE9PSAnJyAmJiBwYXRoICE9PSAnaGFzT3duUHJvcGVydHknICYmXG4gICAgICBNRU1CRVJfTkFNRV9SRUdFWC50ZXN0KCcuJyArIHBhdGgpKTtcbn1cblxuZnVuY3Rpb24gbG9va3VwRG90dGVkUGF0aChvYmosIHBhdGgpIHtcbiAgaWYgKCFpc1ZhbGlkRG90dGVkUGF0aChwYXRoKSkge1xuICAgIHRocm93ICRyZXNvdXJjZU1pbkVycignYmFkbWVtYmVyJywgJ0RvdHRlZCBtZW1iZXIgcGF0aCBcIkB7MH1cIiBpcyBpbnZhbGlkLicsIHBhdGgpO1xuICB9XG4gIHZhciBrZXlzID0gcGF0aC5zcGxpdCgnLicpO1xuICBmb3IgKHZhciBpID0gMCwgaWkgPSBrZXlzLmxlbmd0aDsgaSA8IGlpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKG9iaik7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIG9iaiA9IChvYmogIT09IG51bGwpID8gb2JqW2tleV0gOiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBzaGFsbG93IGNvcHkgb2YgYW4gb2JqZWN0IGFuZCBjbGVhciBvdGhlciBmaWVsZHMgZnJvbSB0aGUgZGVzdGluYXRpb25cbiAqL1xuZnVuY3Rpb24gc2hhbGxvd0NsZWFyQW5kQ29weShzcmMsIGRzdCkge1xuICBkc3QgPSBkc3QgfHwge307XG5cbiAgYW5ndWxhci5mb3JFYWNoKGRzdCwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIGRlbGV0ZSBkc3Rba2V5XTtcbiAgfSk7XG5cbiAgZm9yICh2YXIga2V5IGluIHNyYykge1xuICAgIGlmIChzcmMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhKGtleS5jaGFyQXQoMCkgPT09ICckJyAmJiBrZXkuY2hhckF0KDEpID09PSAnJCcpKSB7XG4gICAgICBkc3Rba2V5XSA9IHNyY1trZXldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBkc3Q7XG59XG5cbi8qKlxuICogQG5nZG9jIG1vZHVsZVxuICogQG5hbWUgbmdSZXNvdXJjZVxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVGhlIGBuZ1Jlc291cmNlYCBtb2R1bGUgcHJvdmlkZXMgaW50ZXJhY3Rpb24gc3VwcG9ydCB3aXRoIFJFU1RmdWwgc2VydmljZXNcbiAqIHZpYSB0aGUgJHJlc291cmNlIHNlcnZpY2UuXG4gKlxuICogU2VlIHtAbGluayBuZ1Jlc291cmNlLiRyZXNvdXJjZVByb3ZpZGVyfSBhbmQge0BsaW5rIG5nUmVzb3VyY2UuJHJlc291cmNlfSBmb3IgdXNhZ2UuXG4gKi9cblxuLyoqXG4gKiBAbmdkb2MgcHJvdmlkZXJcbiAqIEBuYW1lICRyZXNvdXJjZVByb3ZpZGVyXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKlxuICogVXNlIGAkcmVzb3VyY2VQcm92aWRlcmAgdG8gY2hhbmdlIHRoZSBkZWZhdWx0IGJlaGF2aW9yIG9mIHRoZSB7QGxpbmsgbmdSZXNvdXJjZS4kcmVzb3VyY2V9XG4gKiBzZXJ2aWNlLlxuICpcbiAqICMjIERlcGVuZGVuY2llc1xuICogUmVxdWlyZXMgdGhlIHtAbGluayBuZ1Jlc291cmNlIH0gbW9kdWxlIHRvIGJlIGluc3RhbGxlZC5cbiAqXG4gKi9cblxuLyoqXG4gKiBAbmdkb2Mgc2VydmljZVxuICogQG5hbWUgJHJlc291cmNlXG4gKiBAcmVxdWlyZXMgJGh0dHBcbiAqIEByZXF1aXJlcyBuZy4kbG9nXG4gKiBAcmVxdWlyZXMgJHFcbiAqIEByZXF1aXJlcyBuZy4kdGltZW91dFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQSBmYWN0b3J5IHdoaWNoIGNyZWF0ZXMgYSByZXNvdXJjZSBvYmplY3QgdGhhdCBsZXRzIHlvdSBpbnRlcmFjdCB3aXRoXG4gKiBbUkVTVGZ1bF0oaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9SZXByZXNlbnRhdGlvbmFsX1N0YXRlX1RyYW5zZmVyKSBzZXJ2ZXItc2lkZSBkYXRhIHNvdXJjZXMuXG4gKlxuICogVGhlIHJldHVybmVkIHJlc291cmNlIG9iamVjdCBoYXMgYWN0aW9uIG1ldGhvZHMgd2hpY2ggcHJvdmlkZSBoaWdoLWxldmVsIGJlaGF2aW9ycyB3aXRob3V0XG4gKiB0aGUgbmVlZCB0byBpbnRlcmFjdCB3aXRoIHRoZSBsb3cgbGV2ZWwge0BsaW5rIG5nLiRodHRwICRodHRwfSBzZXJ2aWNlLlxuICpcbiAqIFJlcXVpcmVzIHRoZSB7QGxpbmsgbmdSZXNvdXJjZSBgbmdSZXNvdXJjZWB9IG1vZHVsZSB0byBiZSBpbnN0YWxsZWQuXG4gKlxuICogQnkgZGVmYXVsdCwgdHJhaWxpbmcgc2xhc2hlcyB3aWxsIGJlIHN0cmlwcGVkIGZyb20gdGhlIGNhbGN1bGF0ZWQgVVJMcyxcbiAqIHdoaWNoIGNhbiBwb3NlIHByb2JsZW1zIHdpdGggc2VydmVyIGJhY2tlbmRzIHRoYXQgZG8gbm90IGV4cGVjdCB0aGF0XG4gKiBiZWhhdmlvci4gIFRoaXMgY2FuIGJlIGRpc2FibGVkIGJ5IGNvbmZpZ3VyaW5nIHRoZSBgJHJlc291cmNlUHJvdmlkZXJgIGxpa2VcbiAqIHRoaXM6XG4gKlxuICogYGBganNcbiAgICAgYXBwLmNvbmZpZyhbJyRyZXNvdXJjZVByb3ZpZGVyJywgZnVuY3Rpb24oJHJlc291cmNlUHJvdmlkZXIpIHtcbiAgICAgICAvLyBEb24ndCBzdHJpcCB0cmFpbGluZyBzbGFzaGVzIGZyb20gY2FsY3VsYXRlZCBVUkxzXG4gICAgICAgJHJlc291cmNlUHJvdmlkZXIuZGVmYXVsdHMuc3RyaXBUcmFpbGluZ1NsYXNoZXMgPSBmYWxzZTtcbiAgICAgfV0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHVybCBBIHBhcmFtZXRlcml6ZWQgVVJMIHRlbXBsYXRlIHdpdGggcGFyYW1ldGVycyBwcmVmaXhlZCBieSBgOmAgYXMgaW5cbiAqICAgYC91c2VyLzp1c2VybmFtZWAuIElmIHlvdSBhcmUgdXNpbmcgYSBVUkwgd2l0aCBhIHBvcnQgbnVtYmVyIChlLmcuXG4gKiAgIGBodHRwOi8vZXhhbXBsZS5jb206ODA4MC9hcGlgKSwgaXQgd2lsbCBiZSByZXNwZWN0ZWQuXG4gKlxuICogICBJZiB5b3UgYXJlIHVzaW5nIGEgdXJsIHdpdGggYSBzdWZmaXgsIGp1c3QgYWRkIHRoZSBzdWZmaXgsIGxpa2UgdGhpczpcbiAqICAgYCRyZXNvdXJjZSgnaHR0cDovL2V4YW1wbGUuY29tL3Jlc291cmNlLmpzb24nKWAgb3IgYCRyZXNvdXJjZSgnaHR0cDovL2V4YW1wbGUuY29tLzppZC5qc29uJylgXG4gKiAgIG9yIGV2ZW4gYCRyZXNvdXJjZSgnaHR0cDovL2V4YW1wbGUuY29tL3Jlc291cmNlLzpyZXNvdXJjZV9pZC46Zm9ybWF0JylgXG4gKiAgIElmIHRoZSBwYXJhbWV0ZXIgYmVmb3JlIHRoZSBzdWZmaXggaXMgZW1wdHksIDpyZXNvdXJjZV9pZCBpbiB0aGlzIGNhc2UsIHRoZW4gdGhlIGAvLmAgd2lsbCBiZVxuICogICBjb2xsYXBzZWQgZG93biB0byBhIHNpbmdsZSBgLmAuICBJZiB5b3UgbmVlZCB0aGlzIHNlcXVlbmNlIHRvIGFwcGVhciBhbmQgbm90IGNvbGxhcHNlIHRoZW4geW91XG4gKiAgIGNhbiBlc2NhcGUgaXQgd2l0aCBgL1xcLmAuXG4gKlxuICogQHBhcmFtIHtPYmplY3Q9fSBwYXJhbURlZmF1bHRzIERlZmF1bHQgdmFsdWVzIGZvciBgdXJsYCBwYXJhbWV0ZXJzLiBUaGVzZSBjYW4gYmUgb3ZlcnJpZGRlbiBpblxuICogICBgYWN0aW9uc2AgbWV0aG9kcy4gSWYgYSBwYXJhbWV0ZXIgdmFsdWUgaXMgYSBmdW5jdGlvbiwgaXQgd2lsbCBiZSBjYWxsZWQgZXZlcnkgdGltZVxuICogICBhIHBhcmFtIHZhbHVlIG5lZWRzIHRvIGJlIG9idGFpbmVkIGZvciBhIHJlcXVlc3QgKHVubGVzcyB0aGUgcGFyYW0gd2FzIG92ZXJyaWRkZW4pLiBUaGVcbiAqICAgZnVuY3Rpb24gd2lsbCBiZSBwYXNzZWQgdGhlIGN1cnJlbnQgZGF0YSB2YWx1ZSBhcyBhbiBhcmd1bWVudC5cbiAqXG4gKiAgIEVhY2gga2V5IHZhbHVlIGluIHRoZSBwYXJhbWV0ZXIgb2JqZWN0IGlzIGZpcnN0IGJvdW5kIHRvIHVybCB0ZW1wbGF0ZSBpZiBwcmVzZW50IGFuZCB0aGVuIGFueVxuICogICBleGNlc3Mga2V5cyBhcmUgYXBwZW5kZWQgdG8gdGhlIHVybCBzZWFyY2ggcXVlcnkgYWZ0ZXIgdGhlIGA/YC5cbiAqXG4gKiAgIEdpdmVuIGEgdGVtcGxhdGUgYC9wYXRoLzp2ZXJiYCBhbmQgcGFyYW1ldGVyIGB7dmVyYjogJ2dyZWV0Jywgc2FsdXRhdGlvbjogJ0hlbGxvJ31gIHJlc3VsdHMgaW5cbiAqICAgVVJMIGAvcGF0aC9ncmVldD9zYWx1dGF0aW9uPUhlbGxvYC5cbiAqXG4gKiAgIElmIHRoZSBwYXJhbWV0ZXIgdmFsdWUgaXMgcHJlZml4ZWQgd2l0aCBgQGAsIHRoZW4gdGhlIHZhbHVlIGZvciB0aGF0IHBhcmFtZXRlciB3aWxsIGJlXG4gKiAgIGV4dHJhY3RlZCBmcm9tIHRoZSBjb3JyZXNwb25kaW5nIHByb3BlcnR5IG9uIHRoZSBgZGF0YWAgb2JqZWN0IChwcm92aWRlZCB3aGVuIGNhbGxpbmcgYWN0aW9uc1xuICogICB3aXRoIGEgcmVxdWVzdCBib2R5KS5cbiAqICAgRm9yIGV4YW1wbGUsIGlmIHRoZSBgZGVmYXVsdFBhcmFtYCBvYmplY3QgaXMgYHtzb21lUGFyYW06ICdAc29tZVByb3AnfWAgdGhlbiB0aGUgdmFsdWUgb2ZcbiAqICAgYHNvbWVQYXJhbWAgd2lsbCBiZSBgZGF0YS5zb21lUHJvcGAuXG4gKiAgIE5vdGUgdGhhdCB0aGUgcGFyYW1ldGVyIHdpbGwgYmUgaWdub3JlZCwgd2hlbiBjYWxsaW5nIGEgXCJHRVRcIiBhY3Rpb24gbWV0aG9kIChpLmUuIGFuIGFjdGlvblxuICogICBtZXRob2QgdGhhdCBkb2VzIG5vdCBhY2NlcHQgYSByZXF1ZXN0IGJvZHkpLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0LjxPYmplY3Q+PX0gYWN0aW9ucyBIYXNoIHdpdGggZGVjbGFyYXRpb24gb2YgY3VzdG9tIGFjdGlvbnMgdGhhdCB3aWxsIGJlIGF2YWlsYWJsZVxuICogICBpbiBhZGRpdGlvbiB0byB0aGUgZGVmYXVsdCBzZXQgb2YgcmVzb3VyY2UgYWN0aW9ucyAoc2VlIGJlbG93KS4gSWYgYSBjdXN0b20gYWN0aW9uIGhhcyB0aGUgc2FtZVxuICogICBrZXkgYXMgYSBkZWZhdWx0IGFjdGlvbiAoZS5nLiBgc2F2ZWApLCB0aGVuIHRoZSBkZWZhdWx0IGFjdGlvbiB3aWxsIGJlICpvdmVyd3JpdHRlbiosIGFuZCBub3RcbiAqICAgZXh0ZW5kZWQuXG4gKlxuICogICBUaGUgZGVjbGFyYXRpb24gc2hvdWxkIGJlIGNyZWF0ZWQgaW4gdGhlIGZvcm1hdCBvZiB7QGxpbmsgbmcuJGh0dHAjdXNhZ2UgJGh0dHAuY29uZmlnfTpcbiAqXG4gKiAgICAgICB7XG4gKiAgICAgICAgIGFjdGlvbjE6IHttZXRob2Q6PywgcGFyYW1zOj8sIGlzQXJyYXk6PywgaGVhZGVyczo/LCAuLi59LFxuICogICAgICAgICBhY3Rpb24yOiB7bWV0aG9kOj8sIHBhcmFtczo/LCBpc0FycmF5Oj8sIGhlYWRlcnM6PywgLi4ufSxcbiAqICAgICAgICAgLi4uXG4gKiAgICAgICB9XG4gKlxuICogICBXaGVyZTpcbiAqXG4gKiAgIC0gKipgYWN0aW9uYCoqIOKAkyB7c3RyaW5nfSDigJMgVGhlIG5hbWUgb2YgYWN0aW9uLiBUaGlzIG5hbWUgYmVjb21lcyB0aGUgbmFtZSBvZiB0aGUgbWV0aG9kIG9uXG4gKiAgICAgeW91ciByZXNvdXJjZSBvYmplY3QuXG4gKiAgIC0gKipgbWV0aG9kYCoqIOKAkyB7c3RyaW5nfSDigJMgQ2FzZSBpbnNlbnNpdGl2ZSBIVFRQIG1ldGhvZCAoZS5nLiBgR0VUYCwgYFBPU1RgLCBgUFVUYCxcbiAqICAgICBgREVMRVRFYCwgYEpTT05QYCwgZXRjKS5cbiAqICAgLSAqKmBwYXJhbXNgKiog4oCTIHtPYmplY3Q9fSDigJMgT3B0aW9uYWwgc2V0IG9mIHByZS1ib3VuZCBwYXJhbWV0ZXJzIGZvciB0aGlzIGFjdGlvbi4gSWYgYW55IG9mXG4gKiAgICAgdGhlIHBhcmFtZXRlciB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCBpdCB3aWxsIGJlIGNhbGxlZCBldmVyeSB0aW1lIHdoZW4gYSBwYXJhbSB2YWx1ZSBuZWVkcyB0b1xuICogICAgIGJlIG9idGFpbmVkIGZvciBhIHJlcXVlc3QgKHVubGVzcyB0aGUgcGFyYW0gd2FzIG92ZXJyaWRkZW4pLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBwYXNzZWQgdGhlXG4gKiAgICAgY3VycmVudCBkYXRhIHZhbHVlIGFzIGFuIGFyZ3VtZW50LlxuICogICAtICoqYHVybGAqKiDigJMge3N0cmluZ30g4oCTIEFjdGlvbiBzcGVjaWZpYyBgdXJsYCBvdmVycmlkZS4gVGhlIHVybCB0ZW1wbGF0aW5nIGlzIHN1cHBvcnRlZCBqdXN0XG4gKiAgICAgbGlrZSBmb3IgdGhlIHJlc291cmNlLWxldmVsIHVybHMuXG4gKiAgIC0gKipgaXNBcnJheWAqKiDigJMge2Jvb2xlYW49fSDigJMgSWYgdHJ1ZSB0aGVuIHRoZSByZXR1cm5lZCBvYmplY3QgZm9yIHRoaXMgYWN0aW9uIGlzIGFuIGFycmF5LFxuICogICAgIHNlZSBgcmV0dXJuc2Agc2VjdGlvbi5cbiAqICAgLSAqKmB0cmFuc2Zvcm1SZXF1ZXN0YCoqIOKAk1xuICogICAgIGB7ZnVuY3Rpb24oZGF0YSwgaGVhZGVyc0dldHRlcil8QXJyYXkuPGZ1bmN0aW9uKGRhdGEsIGhlYWRlcnNHZXR0ZXIpPn1gIOKAk1xuICogICAgIFRyYW5zZm9ybSBmdW5jdGlvbiBvciBhbiBhcnJheSBvZiBzdWNoIGZ1bmN0aW9ucy4gVGhlIHRyYW5zZm9ybSBmdW5jdGlvbiB0YWtlcyB0aGUgaHR0cFxuICogICAgIHJlcXVlc3QgYm9keSBhbmQgaGVhZGVycyBhbmQgcmV0dXJucyBpdHMgdHJhbnNmb3JtZWQgKHR5cGljYWxseSBzZXJpYWxpemVkKSB2ZXJzaW9uLlxuICogICAgIEJ5IGRlZmF1bHQsIHRyYW5zZm9ybVJlcXVlc3Qgd2lsbCBjb250YWluIG9uZSBmdW5jdGlvbiB0aGF0IGNoZWNrcyBpZiB0aGUgcmVxdWVzdCBkYXRhIGlzXG4gKiAgICAgYW4gb2JqZWN0IGFuZCBzZXJpYWxpemVzIGl0IHVzaW5nIGBhbmd1bGFyLnRvSnNvbmAuIFRvIHByZXZlbnQgdGhpcyBiZWhhdmlvciwgc2V0XG4gKiAgICAgYHRyYW5zZm9ybVJlcXVlc3RgIHRvIGFuIGVtcHR5IGFycmF5OiBgdHJhbnNmb3JtUmVxdWVzdDogW11gXG4gKiAgIC0gKipgdHJhbnNmb3JtUmVzcG9uc2VgKiog4oCTXG4gKiAgICAgYHtmdW5jdGlvbihkYXRhLCBoZWFkZXJzR2V0dGVyLCBzdGF0dXMpfEFycmF5LjxmdW5jdGlvbihkYXRhLCBoZWFkZXJzR2V0dGVyLCBzdGF0dXMpPn1gIOKAk1xuICogICAgIFRyYW5zZm9ybSBmdW5jdGlvbiBvciBhbiBhcnJheSBvZiBzdWNoIGZ1bmN0aW9ucy4gVGhlIHRyYW5zZm9ybSBmdW5jdGlvbiB0YWtlcyB0aGUgSFRUUFxuICogICAgIHJlc3BvbnNlIGJvZHksIGhlYWRlcnMgYW5kIHN0YXR1cyBhbmQgcmV0dXJucyBpdHMgdHJhbnNmb3JtZWQgKHR5cGljYWxseSBkZXNlcmlhbGl6ZWQpXG4gKiAgICAgdmVyc2lvbi5cbiAqICAgICBCeSBkZWZhdWx0LCB0cmFuc2Zvcm1SZXNwb25zZSB3aWxsIGNvbnRhaW4gb25lIGZ1bmN0aW9uIHRoYXQgY2hlY2tzIGlmIHRoZSByZXNwb25zZSBsb29rc1xuICogICAgIGxpa2UgYSBKU09OIHN0cmluZyBhbmQgZGVzZXJpYWxpemVzIGl0IHVzaW5nIGBhbmd1bGFyLmZyb21Kc29uYC4gVG8gcHJldmVudCB0aGlzIGJlaGF2aW9yLFxuICogICAgIHNldCBgdHJhbnNmb3JtUmVzcG9uc2VgIHRvIGFuIGVtcHR5IGFycmF5OiBgdHJhbnNmb3JtUmVzcG9uc2U6IFtdYFxuICogICAtICoqYGNhY2hlYCoqIOKAkyBge2Jvb2xlYW58Q2FjaGV9YCDigJMgQSBib29sZWFuIHZhbHVlIG9yIG9iamVjdCBjcmVhdGVkIHdpdGhcbiAqICAgICB7QGxpbmsgbmcuJGNhY2hlRmFjdG9yeSBgJGNhY2hlRmFjdG9yeWB9IHRvIGVuYWJsZSBvciBkaXNhYmxlIGNhY2hpbmcgb2YgdGhlIEhUVFAgcmVzcG9uc2UuXG4gKiAgICAgU2VlIHtAbGluayAkaHR0cCNjYWNoaW5nICRodHRwIENhY2hpbmd9IGZvciBtb3JlIGluZm9ybWF0aW9uLlxuICogICAtICoqYHRpbWVvdXRgKiog4oCTIGB7bnVtYmVyfWAg4oCTIFRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzLjxiciAvPlxuICogICAgICoqTm90ZToqKiBJbiBjb250cmFzdCB0byB7QGxpbmsgbmcuJGh0dHAjdXNhZ2UgJGh0dHAuY29uZmlnfSwge0BsaW5rIG5nLiRxIHByb21pc2VzfSBhcmVcbiAqICAgICAqKm5vdCoqIHN1cHBvcnRlZCBpbiBgJHJlc291cmNlYCwgYmVjYXVzZSB0aGUgc2FtZSB2YWx1ZSB3b3VsZCBiZSB1c2VkIGZvciBtdWx0aXBsZSByZXF1ZXN0cy5cbiAqICAgICBJZiB5b3UgYXJlIGxvb2tpbmcgZm9yIGEgd2F5IHRvIGNhbmNlbCByZXF1ZXN0cywgeW91IHNob3VsZCB1c2UgdGhlIGBjYW5jZWxsYWJsZWAgb3B0aW9uLlxuICogICAtICoqYGNhbmNlbGxhYmxlYCoqIOKAkyBge2Jvb2xlYW59YCDigJMgSWYgdHJ1ZSwgdGhlIHJlcXVlc3QgbWFkZSBieSBhIFwibm9uLWluc3RhbmNlXCIgY2FsbCB3aWxsIGJlXG4gKiAgICAgY2FuY2VsbGVkIChpZiBub3QgYWxyZWFkeSBjb21wbGV0ZWQpIGJ5IGNhbGxpbmcgYCRjYW5jZWxSZXF1ZXN0KClgIG9uIHRoZSBjYWxsJ3MgcmV0dXJuXG4gKiAgICAgdmFsdWUuIENhbGxpbmcgYCRjYW5jZWxSZXF1ZXN0KClgIGZvciBhIG5vbi1jYW5jZWxsYWJsZSBvciBhbiBhbHJlYWR5IGNvbXBsZXRlZC9jYW5jZWxsZWRcbiAqICAgICByZXF1ZXN0IHdpbGwgaGF2ZSBubyBlZmZlY3QuXG4gKiAgIC0gKipgd2l0aENyZWRlbnRpYWxzYCoqIOKAkyBge2Jvb2xlYW59YCDigJMgV2hldGhlciB0byBzZXQgdGhlIGB3aXRoQ3JlZGVudGlhbHNgIGZsYWcgb24gdGhlXG4gKiAgICAgWEhSIG9iamVjdC4gU2VlXG4gKiAgICAgW1hNTEh0dHBSZXF1ZXN0LndpdGhDcmVkZW50aWFsc10oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0L3dpdGhDcmVkZW50aWFscylcbiAqICAgICBmb3IgbW9yZSBpbmZvcm1hdGlvbi5cbiAqICAgLSAqKmByZXNwb25zZVR5cGVgKiog4oCTIGB7c3RyaW5nfWAg4oCTIFNlZVxuICogICAgIFtYTUxIdHRwUmVxdWVzdC5yZXNwb25zZVR5cGVdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9YTUxIdHRwUmVxdWVzdC9yZXNwb25zZVR5cGUpLlxuICogICAtICoqYGludGVyY2VwdG9yYCoqIOKAkyBge09iamVjdD19YCDigJMgVGhlIGludGVyY2VwdG9yIG9iamVjdCBoYXMgZm91ciBvcHRpb25hbCBtZXRob2RzIC1cbiAqICAgICBgcmVxdWVzdGAsIGByZXF1ZXN0RXJyb3JgLCBgcmVzcG9uc2VgLCBhbmQgYHJlc3BvbnNlRXJyb3JgLiBTZWVcbiAqICAgICB7QGxpbmsgbmcuJGh0dHAjaW50ZXJjZXB0b3JzICRodHRwIGludGVyY2VwdG9yc30gZm9yIGRldGFpbHMuIE5vdGUgdGhhdFxuICogICAgIGByZXF1ZXN0YC9gcmVxdWVzdEVycm9yYCBpbnRlcmNlcHRvcnMgYXJlIGFwcGxpZWQgYmVmb3JlIGNhbGxpbmcgYCRodHRwYCwgdGh1cyBiZWZvcmUgYW55XG4gKiAgICAgZ2xvYmFsIGAkaHR0cGAgaW50ZXJjZXB0b3JzLiBBbHNvLCByZWplY3Rpbmcgb3IgdGhyb3dpbmcgYW4gZXJyb3IgaW5zaWRlIHRoZSBgcmVxdWVzdGBcbiAqICAgICBpbnRlcmNlcHRvciB3aWxsIHJlc3VsdCBpbiBjYWxsaW5nIHRoZSBgcmVzcG9uc2VFcnJvcmAgaW50ZXJjZXB0b3IuXG4gKiAgICAgVGhlIHJlc291cmNlIGluc3RhbmNlIG9yIGNvbGxlY3Rpb24gaXMgYXZhaWxhYmxlIG9uIHRoZSBgcmVzb3VyY2VgIHByb3BlcnR5IG9mIHRoZVxuICogICAgIGBodHRwIHJlc3BvbnNlYCBvYmplY3QgcGFzc2VkIHRvIGByZXNwb25zZWAvYHJlc3BvbnNlRXJyb3JgIGludGVyY2VwdG9ycy5cbiAqICAgICBLZWVwIGluIG1pbmQgdGhhdCB0aGUgYXNzb2NpYXRlZCBwcm9taXNlIHdpbGwgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgdGhlXG4gKiAgICAgcmVzcG9uc2UgaW50ZXJjZXB0b3JzLiBNYWtlIHN1cmUgeW91IHJldHVybiBhbiBhcHByb3ByaWF0ZSB2YWx1ZSBhbmQgbm90IHRoZSBgcmVzcG9uc2VgXG4gKiAgICAgb2JqZWN0IHBhc3NlZCBhcyBpbnB1dC4gRm9yIHJlZmVyZW5jZSwgdGhlIGRlZmF1bHQgYHJlc3BvbnNlYCBpbnRlcmNlcHRvciAod2hpY2ggZ2V0cyBhcHBsaWVkXG4gKiAgICAgaWYgeW91IGRvbid0IHNwZWNpZnkgYSBjdXN0b20gb25lKSByZXR1cm5zIGByZXNwb25zZS5yZXNvdXJjZWAuPGJyIC8+XG4gKiAgICAgU2VlIHtAbGluayBuZ1Jlc291cmNlLiRyZXNvdXJjZSN1c2luZy1pbnRlcmNlcHRvcnMgYmVsb3d9IGZvciBhbiBleGFtcGxlIG9mIHVzaW5nXG4gKiAgICAgaW50ZXJjZXB0b3JzIGluIGAkcmVzb3VyY2VgLlxuICogICAtICoqYGhhc0JvZHlgKiog4oCTIGB7Ym9vbGVhbn1gIOKAkyBJZiB0cnVlLCB0aGVuIHRoZSByZXF1ZXN0IHdpbGwgaGF2ZSBhIGJvZHkuXG4gKiAgICAgSWYgbm90IHNwZWNpZmllZCwgdGhlbiBvbmx5IFBPU1QsIFBVVCBhbmQgUEFUQ0ggcmVxdWVzdHMgd2lsbCBoYXZlIGEgYm9keS4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgSGFzaCB3aXRoIGN1c3RvbSBzZXR0aW5ncyB0aGF0IHNob3VsZCBleHRlbmQgdGhlXG4gKiAgIGRlZmF1bHQgYCRyZXNvdXJjZVByb3ZpZGVyYCBiZWhhdmlvci4gIFRoZSBzdXBwb3J0ZWQgb3B0aW9ucyBhcmU6XG4gKlxuICogICAtICoqYHN0cmlwVHJhaWxpbmdTbGFzaGVzYCoqIOKAkyB7Ym9vbGVhbn0g4oCTIElmIHRydWUgdGhlbiB0aGUgdHJhaWxpbmdcbiAqICAgc2xhc2hlcyBmcm9tIGFueSBjYWxjdWxhdGVkIFVSTCB3aWxsIGJlIHN0cmlwcGVkLiAoRGVmYXVsdHMgdG8gdHJ1ZS4pXG4gKiAgIC0gKipgY2FuY2VsbGFibGVgKiog4oCTIHtib29sZWFufSDigJMgSWYgdHJ1ZSwgdGhlIHJlcXVlc3QgbWFkZSBieSBhIFwibm9uLWluc3RhbmNlXCIgY2FsbCB3aWxsIGJlXG4gKiAgIGNhbmNlbGxlZCAoaWYgbm90IGFscmVhZHkgY29tcGxldGVkKSBieSBjYWxsaW5nIGAkY2FuY2VsUmVxdWVzdCgpYCBvbiB0aGUgY2FsbCdzIHJldHVybiB2YWx1ZS5cbiAqICAgVGhpcyBjYW4gYmUgb3ZlcndyaXR0ZW4gcGVyIGFjdGlvbi4gKERlZmF1bHRzIHRvIGZhbHNlLilcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBBIHJlc291cmNlIFwiY2xhc3NcIiBvYmplY3Qgd2l0aCBtZXRob2RzIGZvciB0aGUgZGVmYXVsdCBzZXQgb2YgcmVzb3VyY2UgYWN0aW9uc1xuICogICBvcHRpb25hbGx5IGV4dGVuZGVkIHdpdGggY3VzdG9tIGBhY3Rpb25zYC4gVGhlIGRlZmF1bHQgc2V0IGNvbnRhaW5zIHRoZXNlIGFjdGlvbnM6XG4gKiAgIGBgYGpzXG4gKiAgIHtcbiAqICAgICAnZ2V0JzogICAge21ldGhvZDogJ0dFVCd9LFxuICogICAgICdzYXZlJzogICB7bWV0aG9kOiAnUE9TVCd9LFxuICogICAgICdxdWVyeSc6ICB7bWV0aG9kOiAnR0VUJywgaXNBcnJheTogdHJ1ZX0sXG4gKiAgICAgJ3JlbW92ZSc6IHttZXRob2Q6ICdERUxFVEUnfSxcbiAqICAgICAnZGVsZXRlJzoge21ldGhvZDogJ0RFTEVURSd9XG4gKiAgIH1cbiAqICAgYGBgXG4gKlxuICogICBDYWxsaW5nIHRoZXNlIG1ldGhvZHMgaW52b2tlIHtAbGluayBuZy4kaHR0cH0gd2l0aCB0aGUgc3BlY2lmaWVkIGh0dHAgbWV0aG9kLCBkZXN0aW5hdGlvbiBhbmRcbiAqICAgcGFyYW1ldGVycy4gV2hlbiB0aGUgZGF0YSBpcyByZXR1cm5lZCBmcm9tIHRoZSBzZXJ2ZXIgdGhlbiB0aGUgb2JqZWN0IGlzIGFuIGluc3RhbmNlIG9mIHRoZVxuICogICByZXNvdXJjZSBjbGFzcy4gVGhlIGFjdGlvbnMgYHNhdmVgLCBgcmVtb3ZlYCBhbmQgYGRlbGV0ZWAgYXJlIGF2YWlsYWJsZSBvbiBpdCBhcyBtZXRob2RzIHdpdGhcbiAqICAgdGhlIGAkYCBwcmVmaXguIFRoaXMgYWxsb3dzIHlvdSB0byBlYXNpbHkgcGVyZm9ybSBDUlVEIG9wZXJhdGlvbnMgKGNyZWF0ZSwgcmVhZCwgdXBkYXRlLFxuICogICBkZWxldGUpIG9uIHNlcnZlci1zaWRlIGRhdGEgbGlrZSB0aGlzOlxuICogICBgYGBqc1xuICogICB2YXIgVXNlciA9ICRyZXNvdXJjZSgnL3VzZXIvOnVzZXJJZCcsIHt1c2VySWQ6ICdAaWQnfSk7XG4gKiAgIFVzZXIuZ2V0KHt1c2VySWQ6IDEyM30pLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24odXNlcikge1xuICogICAgIHVzZXIuYWJjID0gdHJ1ZTtcbiAqICAgICB1c2VyLiRzYXZlKCk7XG4gKiAgIH0pO1xuICogICBgYGBcbiAqXG4gKiAgIEl0IGlzIGltcG9ydGFudCB0byByZWFsaXplIHRoYXQgaW52b2tpbmcgYSBgJHJlc291cmNlYCBvYmplY3QgbWV0aG9kIGltbWVkaWF0ZWx5IHJldHVybnMgYW5cbiAqICAgZW1wdHkgcmVmZXJlbmNlIChvYmplY3Qgb3IgYXJyYXkgZGVwZW5kaW5nIG9uIGBpc0FycmF5YCkuIE9uY2UgdGhlIGRhdGEgaXMgcmV0dXJuZWQgZnJvbSB0aGVcbiAqICAgc2VydmVyIHRoZSBleGlzdGluZyByZWZlcmVuY2UgaXMgcG9wdWxhdGVkIHdpdGggdGhlIGFjdHVhbCBkYXRhLiBUaGlzIGlzIGEgdXNlZnVsIHRyaWNrIHNpbmNlXG4gKiAgIHVzdWFsbHkgdGhlIHJlc291cmNlIGlzIGFzc2lnbmVkIHRvIGEgbW9kZWwgd2hpY2ggaXMgdGhlbiByZW5kZXJlZCBieSB0aGUgdmlldy4gSGF2aW5nIGFuIGVtcHR5XG4gKiAgIG9iamVjdCByZXN1bHRzIGluIG5vIHJlbmRlcmluZywgb25jZSB0aGUgZGF0YSBhcnJpdmVzIGZyb20gdGhlIHNlcnZlciB0aGVuIHRoZSBvYmplY3QgaXNcbiAqICAgcG9wdWxhdGVkIHdpdGggdGhlIGRhdGEgYW5kIHRoZSB2aWV3IGF1dG9tYXRpY2FsbHkgcmUtcmVuZGVycyBpdHNlbGYgc2hvd2luZyB0aGUgbmV3IGRhdGEuIFRoaXNcbiAqICAgbWVhbnMgdGhhdCBpbiBtb3N0IGNhc2VzIG9uZSBuZXZlciBoYXMgdG8gd3JpdGUgYSBjYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhlIGFjdGlvbiBtZXRob2RzLlxuICpcbiAqICAgVGhlIGFjdGlvbiBtZXRob2RzIG9uIHRoZSBjbGFzcyBvYmplY3Qgb3IgaW5zdGFuY2Ugb2JqZWN0IGNhbiBiZSBpbnZva2VkIHdpdGggdGhlIGZvbGxvd2luZ1xuICogICBwYXJhbWV0ZXJzOlxuICpcbiAqICAgLSBcImNsYXNzXCIgYWN0aW9ucyB3aXRob3V0IGEgYm9keTogYFJlc291cmNlLmFjdGlvbihbcGFyYW1ldGVyc10sIFtzdWNjZXNzXSwgW2Vycm9yXSlgXG4gKiAgIC0gXCJjbGFzc1wiIGFjdGlvbnMgd2l0aCBhIGJvZHk6IGBSZXNvdXJjZS5hY3Rpb24oW3BhcmFtZXRlcnNdLCBwb3N0RGF0YSwgW3N1Y2Nlc3NdLCBbZXJyb3JdKWBcbiAqICAgLSBpbnN0YW5jZSBhY3Rpb25zOiBgaW5zdGFuY2UuJGFjdGlvbihbcGFyYW1ldGVyc10sIFtzdWNjZXNzXSwgW2Vycm9yXSlgXG4gKlxuICpcbiAqICAgV2hlbiBjYWxsaW5nIGluc3RhbmNlIG1ldGhvZHMsIHRoZSBpbnN0YW5jZSBpdHNlbGYgaXMgdXNlZCBhcyB0aGUgcmVxdWVzdCBib2R5IChpZiB0aGUgYWN0aW9uXG4gKiAgIHNob3VsZCBoYXZlIGEgYm9keSkuIEJ5IGRlZmF1bHQsIG9ubHkgYWN0aW9ucyB1c2luZyBgUE9TVGAsIGBQVVRgIG9yIGBQQVRDSGAgaGF2ZSByZXF1ZXN0XG4gKiAgIGJvZGllcywgYnV0IHlvdSBjYW4gdXNlIHRoZSBgaGFzQm9keWAgY29uZmlndXJhdGlvbiBvcHRpb24gdG8gc3BlY2lmeSB3aGV0aGVyIGFuIGFjdGlvblxuICogICBzaG91bGQgaGF2ZSBhIGJvZHkgb3Igbm90IChyZWdhcmRsZXNzIG9mIGl0cyBIVFRQIG1ldGhvZCkuXG4gKlxuICpcbiAqICAgU3VjY2VzcyBjYWxsYmFjayBpcyBjYWxsZWQgd2l0aCAodmFsdWUgKE9iamVjdHxBcnJheSksIHJlc3BvbnNlSGVhZGVycyAoRnVuY3Rpb24pLFxuICogICBzdGF0dXMgKG51bWJlciksIHN0YXR1c1RleHQgKHN0cmluZykpIGFyZ3VtZW50cywgd2hlcmUgYHZhbHVlYCBpcyB0aGUgcG9wdWxhdGVkIHJlc291cmNlXG4gKiAgIGluc3RhbmNlIG9yIGNvbGxlY3Rpb24gb2JqZWN0LiBUaGUgZXJyb3IgY2FsbGJhY2sgaXMgY2FsbGVkIHdpdGggKGh0dHBSZXNwb25zZSkgYXJndW1lbnQuXG4gKlxuICogICBDbGFzcyBhY3Rpb25zIHJldHVybiBhbiBlbXB0eSBpbnN0YW5jZSAod2l0aCB0aGUgYWRkaXRpb25hbCBwcm9wZXJ0aWVzIGxpc3RlZCBiZWxvdykuXG4gKiAgIEluc3RhbmNlIGFjdGlvbnMgcmV0dXJuIGEgcHJvbWlzZSBmb3IgdGhlIG9wZXJhdGlvbi5cbiAqXG4gKiAgIFRoZSBSZXNvdXJjZSBpbnN0YW5jZXMgYW5kIGNvbGxlY3Rpb25zIGhhdmUgdGhlc2UgYWRkaXRpb25hbCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgJHByb21pc2VgOiBUaGUge0BsaW5rIG5nLiRxIHByb21pc2V9IG9mIHRoZSBvcmlnaW5hbCBzZXJ2ZXIgaW50ZXJhY3Rpb24gdGhhdCBjcmVhdGVkIHRoaXNcbiAqICAgICBpbnN0YW5jZSBvciBjb2xsZWN0aW9uLlxuICpcbiAqICAgICBPbiBzdWNjZXNzLCB0aGUgcHJvbWlzZSBpcyByZXNvbHZlZCB3aXRoIHRoZSBzYW1lIHJlc291cmNlIGluc3RhbmNlIG9yIGNvbGxlY3Rpb24gb2JqZWN0LFxuICogICAgIHVwZGF0ZWQgd2l0aCBkYXRhIGZyb20gc2VydmVyLiBUaGlzIG1ha2VzIGl0IGVhc3kgdG8gdXNlIGluIHRoZVxuICogICAgIHtAbGluayBuZ1JvdXRlLiRyb3V0ZVByb3ZpZGVyIGByZXNvbHZlYCBzZWN0aW9uIG9mIGAkcm91dGVQcm92aWRlci53aGVuKClgfSB0byBkZWZlciB2aWV3XG4gKiAgICAgcmVuZGVyaW5nIHVudGlsIHRoZSByZXNvdXJjZShzKSBhcmUgbG9hZGVkLlxuICpcbiAqICAgICBPbiBmYWlsdXJlLCB0aGUgcHJvbWlzZSBpcyByZWplY3RlZCB3aXRoIHRoZSB7QGxpbmsgbmcuJGh0dHAgaHR0cCByZXNwb25zZX0gb2JqZWN0LlxuICpcbiAqICAgICBJZiBhbiBpbnRlcmNlcHRvciBvYmplY3Qgd2FzIHByb3ZpZGVkLCB0aGUgcHJvbWlzZSB3aWxsIGluc3RlYWQgYmUgcmVzb2x2ZWQgd2l0aCB0aGUgdmFsdWVcbiAqICAgICByZXR1cm5lZCBieSB0aGUgcmVzcG9uc2UgaW50ZXJjZXB0b3IgKG9uIHN1Y2Nlc3MpIG9yIHJlc3BvbmNlRXJyb3IgaW50ZXJjZXB0b3IgKG9uIGZhaWx1cmUpLlxuICpcbiAqICAgLSBgJHJlc29sdmVkYDogYHRydWVgIGFmdGVyIGZpcnN0IHNlcnZlciBpbnRlcmFjdGlvbiBpcyBjb21wbGV0ZWQgKGVpdGhlciB3aXRoIHN1Y2Nlc3Mgb3JcbiAqICAgICAgcmVqZWN0aW9uKSwgYGZhbHNlYCBiZWZvcmUgdGhhdC4gS25vd2luZyBpZiB0aGUgUmVzb3VyY2UgaGFzIGJlZW4gcmVzb2x2ZWQgaXMgdXNlZnVsIGluXG4gKiAgICAgIGRhdGEtYmluZGluZy4gSWYgdGhlcmUgaXMgYSByZXNwb25zZS9yZXNwb25zZUVycm9yIGludGVyY2VwdG9yIGFuZCBpdCByZXR1cm5zIGEgcHJvbWlzZSxcbiAqICAgICAgYCRyZXNvbHZlZGAgd2lsbCB3YWl0IGZvciB0aGF0IHRvby5cbiAqXG4gKiAgIFRoZSBSZXNvdXJjZSBpbnN0YW5jZXMgYW5kIGNvbGxlY3Rpb25zIGhhdmUgdGhlc2UgYWRkaXRpb25hbCBtZXRob2RzOlxuICpcbiAqICAgLSBgJGNhbmNlbFJlcXVlc3RgOiBJZiB0aGVyZSBpcyBhIGNhbmNlbGxhYmxlLCBwZW5kaW5nIHJlcXVlc3QgcmVsYXRlZCB0byB0aGUgaW5zdGFuY2Ugb3JcbiAqICAgICAgY29sbGVjdGlvbiwgY2FsbGluZyB0aGlzIG1ldGhvZCB3aWxsIGFib3J0IHRoZSByZXF1ZXN0LlxuICpcbiAqICAgVGhlIFJlc291cmNlIGluc3RhbmNlcyBoYXZlIHRoZXNlIGFkZGl0aW9uYWwgbWV0aG9kczpcbiAqXG4gKiAgIC0gYHRvSlNPTmA6IEl0IHJldHVybnMgYSBzaW1wbGUgb2JqZWN0IHdpdGhvdXQgYW55IG9mIHRoZSBleHRyYSBwcm9wZXJ0aWVzIGFkZGVkIGFzIHBhcnQgb2ZcbiAqICAgICB0aGUgUmVzb3VyY2UgQVBJLiBUaGlzIG9iamVjdCBjYW4gYmUgc2VyaWFsaXplZCB0aHJvdWdoIHtAbGluayBhbmd1bGFyLnRvSnNvbn0gc2FmZWx5XG4gKiAgICAgd2l0aG91dCBhdHRhY2hpbmcgQW5ndWxhckpTLXNwZWNpZmljIGZpZWxkcy4gTm90aWNlIHRoYXQgYEpTT04uc3RyaW5naWZ5YCAoYW5kXG4gKiAgICAgYGFuZ3VsYXIudG9Kc29uYCkgYXV0b21hdGljYWxseSB1c2UgdGhpcyBtZXRob2Qgd2hlbiBzZXJpYWxpemluZyBhIFJlc291cmNlIGluc3RhbmNlXG4gKiAgICAgKHNlZSBbTUROXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9KU09OL3N0cmluZ2lmeSN0b0pTT04lMjglMjlfYmVoYXZpb3IpKS5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICMjIyBCYXNpYyB1c2FnZVxuICpcbiAgIGBgYGpzXG4gICAgIC8vIERlZmluZSBhIENyZWRpdENhcmQgY2xhc3NcbiAgICAgdmFyIENyZWRpdENhcmQgPSAkcmVzb3VyY2UoJy91c2Vycy86dXNlcklkL2NhcmRzLzpjYXJkSWQnLFxuICAgICAgIHt1c2VySWQ6IDEyMywgY2FyZElkOiAnQGlkJ30sIHtcbiAgICAgICAgIGNoYXJnZToge21ldGhvZDogJ1BPU1QnLCBwYXJhbXM6IHtjaGFyZ2U6IHRydWV9fVxuICAgICAgIH0pO1xuXG4gICAgIC8vIFdlIGNhbiByZXRyaWV2ZSBhIGNvbGxlY3Rpb24gZnJvbSB0aGUgc2VydmVyXG4gICAgIHZhciBjYXJkcyA9IENyZWRpdENhcmQucXVlcnkoKTtcbiAgICAgICAgIC8vIEdFVDogL3VzZXJzLzEyMy9jYXJkc1xuICAgICAgICAgLy8gc2VydmVyIHJldHVybnM6IFt7aWQ6IDQ1NiwgbnVtYmVyOiAnMTIzNCcsIG5hbWU6ICdTbWl0aCd9XVxuXG4gICAgIC8vIFdhaXQgZm9yIHRoZSByZXF1ZXN0IHRvIGNvbXBsZXRlXG4gICAgIGNhcmRzLiRwcm9taXNlLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgdmFyIGNhcmQgPSBjYXJkc1swXTtcblxuICAgICAgIC8vIEVhY2ggaXRlbSBpcyBhbiBpbnN0YW5jZSBvZiBDcmVkaXRDYXJkXG4gICAgICAgZXhwZWN0KGNhcmQgaW5zdGFuY2VvZiBDcmVkaXRDYXJkKS50b0VxdWFsKHRydWUpO1xuXG4gICAgICAgLy8gTm9uLUdFVCBtZXRob2RzIGFyZSBtYXBwZWQgb250byB0aGUgaW5zdGFuY2VzXG4gICAgICAgY2FyZC5uYW1lID0gJ0ouIFNtaXRoJztcbiAgICAgICBjYXJkLiRzYXZlKCk7XG4gICAgICAgICAgIC8vIFBPU1Q6IC91c2Vycy8xMjMvY2FyZHMvNDU2IHtpZDogNDU2LCBudW1iZXI6ICcxMjM0JywgbmFtZTogJ0ouIFNtaXRoJ31cbiAgICAgICAgICAgLy8gc2VydmVyIHJldHVybnM6IHtpZDogNDU2LCBudW1iZXI6ICcxMjM0JywgbmFtZTogJ0ouIFNtaXRoJ31cblxuICAgICAgIC8vIE91ciBjdXN0b20gbWV0aG9kIGlzIG1hcHBlZCBhcyB3ZWxsIChzaW5jZSBpdCB1c2VzIFBPU1QpXG4gICAgICAgY2FyZC4kY2hhcmdlKHthbW91bnQ6IDkuOTl9KTtcbiAgICAgICAgICAgLy8gUE9TVDogL3VzZXJzLzEyMy9jYXJkcy80NTY/YW1vdW50PTkuOTkmY2hhcmdlPXRydWUge2lkOiA0NTYsIG51bWJlcjogJzEyMzQnLCBuYW1lOiAnSi4gU21pdGgnfVxuICAgICB9KTtcblxuICAgICAvLyBXZSBjYW4gY3JlYXRlIGFuIGluc3RhbmNlIGFzIHdlbGxcbiAgICAgdmFyIG5ld0NhcmQgPSBuZXcgQ3JlZGl0Q2FyZCh7bnVtYmVyOiAnMDEyMyd9KTtcbiAgICAgbmV3Q2FyZC5uYW1lID0gJ01pa2UgU21pdGgnO1xuXG4gICAgIHZhciBzYXZlUHJvbWlzZSA9IG5ld0NhcmQuJHNhdmUoKTtcbiAgICAgICAgIC8vIFBPU1Q6IC91c2Vycy8xMjMvY2FyZHMge251bWJlcjogJzAxMjMnLCBuYW1lOiAnTWlrZSBTbWl0aCd9XG4gICAgICAgICAvLyBzZXJ2ZXIgcmV0dXJuczoge2lkOiA3ODksIG51bWJlcjogJzAxMjMnLCBuYW1lOiAnTWlrZSBTbWl0aCd9XG5cbiAgICAgc2F2ZVByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAvLyBPbmNlIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkLCB0aGUgY3JlYXRlZCBpbnN0YW5jZVxuICAgICAgIC8vIGlzIHBvcHVsYXRlZCB3aXRoIHRoZSBkYXRhIHJldHVybmVkIGJ5IHRoZSBzZXJ2ZXJcbiAgICAgICBleHBlY3QobmV3Q2FyZC5pZCkudG9FcXVhbCg3ODkpO1xuICAgICB9KTtcbiAgIGBgYFxuICpcbiAqIFRoZSBvYmplY3QgcmV0dXJuZWQgZnJvbSBhIGNhbGwgdG8gYCRyZXNvdXJjZWAgaXMgYSByZXNvdXJjZSBcImNsYXNzXCIgd2hpY2ggaGFzIG9uZSBcInN0YXRpY1wiXG4gKiBtZXRob2QgZm9yIGVhY2ggYWN0aW9uIGluIHRoZSBkZWZpbml0aW9uLlxuICpcbiAqIENhbGxpbmcgdGhlc2UgbWV0aG9kcyBpbnZva2VzIGAkaHR0cGAgb24gdGhlIGB1cmxgIHRlbXBsYXRlIHdpdGggdGhlIGdpdmVuIEhUVFAgYG1ldGhvZGAsXG4gKiBgcGFyYW1zYCBhbmQgYGhlYWRlcnNgLlxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogIyMjIEFjY2Vzc2luZyB0aGUgcmVzcG9uc2VcbiAqXG4gKiBXaGVuIHRoZSBkYXRhIGlzIHJldHVybmVkIGZyb20gdGhlIHNlcnZlciB0aGVuIHRoZSBvYmplY3QgaXMgYW4gaW5zdGFuY2Ugb2YgdGhlIHJlc291cmNlIHR5cGUgYW5kXG4gKiBhbGwgb2YgdGhlIG5vbi1HRVQgbWV0aG9kcyBhcmUgYXZhaWxhYmxlIHdpdGggYCRgIHByZWZpeC4gVGhpcyBhbGxvd3MgeW91IHRvIGVhc2lseSBzdXBwb3J0IENSVURcbiAqIG9wZXJhdGlvbnMgKGNyZWF0ZSwgcmVhZCwgdXBkYXRlLCBkZWxldGUpIG9uIHNlcnZlci1zaWRlIGRhdGEuXG4gKlxuICAgYGBganNcbiAgICAgdmFyIFVzZXIgPSAkcmVzb3VyY2UoJy91c2Vycy86dXNlcklkJywge3VzZXJJZDogJ0BpZCd9KTtcbiAgICAgVXNlci5nZXQoe3VzZXJJZDogMTIzfSkuJHByb21pc2UudGhlbihmdW5jdGlvbih1c2VyKSB7XG4gICAgICAgdXNlci5hYmMgPSB0cnVlO1xuICAgICAgIHVzZXIuJHNhdmUoKTtcbiAgICAgfSk7XG4gICBgYGBcbiAqXG4gKiBJdCdzIHdvcnRoIG5vdGluZyB0aGF0IHRoZSBzdWNjZXNzIGNhbGxiYWNrIGZvciBgZ2V0YCwgYHF1ZXJ5YCBhbmQgb3RoZXIgbWV0aG9kcyBnZXRzIGNhbGxlZCB3aXRoXG4gKiB0aGUgcmVzb3VyY2UgaW5zdGFuY2UgKHBvcHVsYXRlZCB3aXRoIHRoZSBkYXRhIHRoYXQgY2FtZSBmcm9tIHRoZSBzZXJ2ZXIpIGFzIHdlbGwgYXMgYW4gYCRodHRwYFxuICogaGVhZGVyIGdldHRlciBmdW5jdGlvbiwgdGhlIEhUVFAgc3RhdHVzIGNvZGUgYW5kIHRoZSByZXNwb25zZSBzdGF0dXMgdGV4dC4gU28gb25lIGNvdWxkIHJld3JpdGVcbiAqIHRoZSBhYm92ZSBleGFtcGxlIGFuZCBnZXQgYWNjZXNzIHRvIEhUVFAgaGVhZGVycyBhcyBmb2xsb3dzOlxuICpcbiAgIGBgYGpzXG4gICAgIHZhciBVc2VyID0gJHJlc291cmNlKCcvdXNlcnMvOnVzZXJJZCcsIHt1c2VySWQ6ICdAaWQnfSk7XG4gICAgIFVzZXIuZ2V0KHt1c2VySWQ6IDEyM30sIGZ1bmN0aW9uKHVzZXIsIGdldFJlc3BvbnNlSGVhZGVycykge1xuICAgICAgIHVzZXIuYWJjID0gdHJ1ZTtcbiAgICAgICB1c2VyLiRzYXZlKGZ1bmN0aW9uKHVzZXIsIHB1dFJlc3BvbnNlSGVhZGVycykge1xuICAgICAgICAgLy8gYHVzZXJgID0+IHNhdmVkIGBVc2VyYCBvYmplY3RcbiAgICAgICAgIC8vIGBwdXRSZXNwb25zZUhlYWRlcnNgID0+IGAkaHR0cGAgaGVhZGVyIGdldHRlclxuICAgICAgIH0pO1xuICAgICB9KTtcbiAgIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogIyMjIENyZWF0aW5nIGN1c3RvbSBhY3Rpb25zXG4gKlxuICogSW4gdGhpcyBleGFtcGxlIHdlIGNyZWF0ZSBhIGN1c3RvbSBtZXRob2Qgb24gb3VyIHJlc291cmNlIHRvIG1ha2UgYSBQVVQgcmVxdWVzdDpcbiAqXG4gICBgYGBqc1xuICAgICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbJ25nUmVzb3VyY2UnXSk7XG5cbiAgICAgIC8vIFNvbWUgQVBJcyBleHBlY3QgYSBQVVQgcmVxdWVzdCBpbiB0aGUgZm9ybWF0IFVSTC9vYmplY3QvSURcbiAgICAgIC8vIEhlcmUgd2UgYXJlIGNyZWF0aW5nIGFuICd1cGRhdGUnIG1ldGhvZFxuICAgICAgYXBwLmZhY3RvcnkoJ05vdGVzJywgWyckcmVzb3VyY2UnLCBmdW5jdGlvbigkcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuICRyZXNvdXJjZSgnL25vdGVzLzppZCcsIHtpZDogJ0BpZCd9LCB7XG4gICAgICAgICAgdXBkYXRlOiB7bWV0aG9kOiAnUFVUJ31cbiAgICAgICAgfSk7XG4gICAgICB9XSk7XG5cbiAgICAgIC8vIEluIG91ciBjb250cm9sbGVyIHdlIGdldCB0aGUgSUQgZnJvbSB0aGUgVVJMIHVzaW5nIGAkbG9jYXRpb25gXG4gICAgICBhcHAuY29udHJvbGxlcignTm90ZXNDdHJsJywgWyckbG9jYXRpb24nLCAnTm90ZXMnLCBmdW5jdGlvbigkbG9jYXRpb24sIE5vdGVzKSB7XG4gICAgICAgIC8vIEZpcnN0LCByZXRyaWV2ZSB0aGUgY29ycmVzcG9uZGluZyBgTm90ZWAgb2JqZWN0IGZyb20gdGhlIHNlcnZlclxuICAgICAgICAvLyAoQXNzdW1pbmcgYSBVUkwgb2YgdGhlIGZvcm0gYC4uLi9ub3Rlcz9pZD1YWVpgKVxuICAgICAgICB2YXIgbm90ZUlkID0gJGxvY2F0aW9uLnNlYXJjaCgpLmlkO1xuICAgICAgICB2YXIgbm90ZSA9IE5vdGVzLmdldCh7aWQ6IG5vdGVJZH0pO1xuXG4gICAgICAgIG5vdGUuJHByb21pc2UudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBub3RlLmNvbnRlbnQgPSAnSGVsbG8sIHdvcmxkISc7XG5cbiAgICAgICAgICAvLyBOb3cgY2FsbCBgdXBkYXRlYCB0byBzYXZlIHRoZSBjaGFuZ2VzIG9uIHRoZSBzZXJ2ZXJcbiAgICAgICAgICBOb3Rlcy51cGRhdGUobm90ZSk7XG4gICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCBQVVQgL25vdGVzL0lEIHdpdGggdGhlIG5vdGUgb2JqZWN0IGFzIHRoZSByZXF1ZXN0IHBheWxvYWRcblxuICAgICAgICAgIC8vIFNpbmNlIGB1cGRhdGVgIGlzIGEgbm9uLUdFVCBtZXRob2QsIGl0IHdpbGwgYWxzbyBiZSBhdmFpbGFibGUgb24gdGhlIGluc3RhbmNlXG4gICAgICAgICAgLy8gKHByZWZpeGVkIHdpdGggYCRgKSwgc28gd2UgY291bGQgcmVwbGFjZSB0aGUgYE5vdGUudXBkYXRlKClgIGNhbGwgd2l0aDpcbiAgICAgICAgICAvL25vdGUuJHVwZGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICAgIH1dKTtcbiAgIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogIyMjIENhbmNlbGxpbmcgcmVxdWVzdHNcbiAqXG4gKiBJZiBhbiBhY3Rpb24ncyBjb25maWd1cmF0aW9uIHNwZWNpZmllcyB0aGF0IGl0IGlzIGNhbmNlbGxhYmxlLCB5b3UgY2FuIGNhbmNlbCB0aGUgcmVxdWVzdCByZWxhdGVkXG4gKiB0byBhbiBpbnN0YW5jZSBvciBjb2xsZWN0aW9uIChhcyBsb25nIGFzIGl0IGlzIGEgcmVzdWx0IG9mIGEgXCJub24taW5zdGFuY2VcIiBjYWxsKTpcbiAqXG4gICBgYGBqc1xuICAgICAvLyAuLi5kZWZpbmluZyB0aGUgYEhvdGVsYCByZXNvdXJjZS4uLlxuICAgICB2YXIgSG90ZWwgPSAkcmVzb3VyY2UoJy9hcGkvaG90ZWxzLzppZCcsIHtpZDogJ0BpZCd9LCB7XG4gICAgICAgLy8gTGV0J3MgbWFrZSB0aGUgYHF1ZXJ5KClgIG1ldGhvZCBjYW5jZWxsYWJsZVxuICAgICAgIHF1ZXJ5OiB7bWV0aG9kOiAnZ2V0JywgaXNBcnJheTogdHJ1ZSwgY2FuY2VsbGFibGU6IHRydWV9XG4gICAgIH0pO1xuXG4gICAgIC8vIC4uLnNvbWV3aGVyZSBpbiB0aGUgUGxhblZhY2F0aW9uQ29udHJvbGxlci4uLlxuICAgICAuLi5cbiAgICAgdGhpcy5vbkRlc3RpbmF0aW9uQ2hhbmdlZCA9IGZ1bmN0aW9uIG9uRGVzdGluYXRpb25DaGFuZ2VkKGRlc3RpbmF0aW9uKSB7XG4gICAgICAgLy8gV2UgZG9uJ3QgY2FyZSBhYm91dCBhbnkgcGVuZGluZyByZXF1ZXN0IGZvciBob3RlbHNcbiAgICAgICAvLyBpbiBhIGRpZmZlcmVudCBkZXN0aW5hdGlvbiBhbnkgbW9yZVxuICAgICAgIGlmICh0aGlzLmF2YWlsYWJsZUhvdGVscykge1xuICAgICAgICAgdGhpcy5hdmFpbGFibGVIb3RlbHMuJGNhbmNlbFJlcXVlc3QoKTtcbiAgICAgICB9XG5cbiAgICAgICAvLyBMZXQncyBxdWVyeSBmb3IgaG90ZWxzIGluIGBkZXN0aW5hdGlvbmBcbiAgICAgICAvLyAoY2FsbHM6IC9hcGkvaG90ZWxzP2xvY2F0aW9uPTxkZXN0aW5hdGlvbj4pXG4gICAgICAgdGhpcy5hdmFpbGFibGVIb3RlbHMgPSBIb3RlbC5xdWVyeSh7bG9jYXRpb246IGRlc3RpbmF0aW9ufSk7XG4gICAgIH07XG4gICBgYGBcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICMjIyBVc2luZyBpbnRlcmNlcHRvcnNcbiAqXG4gKiBZb3UgY2FuIHVzZSBpbnRlcmNlcHRvcnMgdG8gdHJhbnNmb3JtIHRoZSByZXF1ZXN0IG9yIHJlc3BvbnNlLCBwZXJmb3JtIGFkZGl0aW9uYWwgb3BlcmF0aW9ucywgYW5kXG4gKiBtb2RpZnkgdGhlIHJldHVybmVkIGluc3RhbmNlL2NvbGxlY3Rpb24uIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSwgdXNlcyBgcmVxdWVzdGAgYW5kIGByZXNwb25zZWBcbiAqIGludGVyY2VwdG9ycyB0byBhdWdtZW50IHRoZSByZXR1cm5lZCBpbnN0YW5jZSB3aXRoIGFkZGl0aW9uYWwgaW5mbzpcbiAqXG4gICBgYGBqc1xuICAgICB2YXIgVGhpbmcgPSAkcmVzb3VyY2UoJy9hcGkvdGhpbmdzLzppZCcsIHtpZDogJ0BpZCd9LCB7XG4gICAgICAgc2F2ZToge1xuICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICBpbnRlcmNlcHRvcjoge1xuICAgICAgICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgICAgICAgICAvLyBCZWZvcmUgdGhlIHJlcXVlc3QgaXMgc2VudCBvdXQsIHN0b3JlIGEgdGltZXN0YW1wIG9uIHRoZSByZXF1ZXN0IGNvbmZpZ1xuICAgICAgICAgICAgIGNvbmZpZy5yZXF1ZXN0VGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICAgICB9LFxuICAgICAgICAgICByZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAvLyBHZXQgdGhlIGluc3RhbmNlIGZyb20gdGhlIHJlc3BvbnNlIG9iamVjdFxuICAgICAgICAgICAgIHZhciBpbnN0YW5jZSA9IHJlc3BvbnNlLnJlc291cmNlO1xuXG4gICAgICAgICAgICAgLy8gQXVnbWVudCB0aGUgaW5zdGFuY2Ugd2l0aCBhIGN1c3RvbSBgc2F2ZUxhdGVuY3lgIHByb3BlcnR5LCBjb21wdXRlZCBhcyB0aGUgdGltZVxuICAgICAgICAgICAgIC8vIGJldHdlZW4gc2VuZGluZyB0aGUgcmVxdWVzdCBhbmQgcmVjZWl2aW5nIHRoZSByZXNwb25zZS5cbiAgICAgICAgICAgICBpbnN0YW5jZS5zYXZlTGF0ZW5jeSA9IERhdGUubm93KCkgLSByZXNwb25zZS5jb25maWcucmVxdWVzdFRpbWVzdGFtcDtcblxuICAgICAgICAgICAgIC8vIFJldHVybiB0aGUgaW5zdGFuY2VcbiAgICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICB9XG4gICAgIH0pO1xuXG4gICAgIFRoaW5nLnNhdmUoe2ZvbzogJ2Jhcid9KS4kcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHRoaW5nKSB7XG4gICAgICAgY29uc29sZS5sb2coJ1RoYXQgdGhpbmcgd2FzIHNhdmVkIGluICcgKyB0aGluZy5zYXZlTGF0ZW5jeSArICdtcy4nKTtcbiAgICAgfSk7XG4gICBgYGBcbiAqXG4gKi9cbmFuZ3VsYXIubW9kdWxlKCduZ1Jlc291cmNlJywgWyduZyddKS5cbiAgaW5mbyh7IGFuZ3VsYXJWZXJzaW9uOiAnMS43LjgnIH0pLlxuICBwcm92aWRlcignJHJlc291cmNlJywgZnVuY3Rpb24gUmVzb3VyY2VQcm92aWRlcigpIHtcbiAgICB2YXIgUFJPVE9DT0xfQU5EX0lQVjZfUkVHRVggPSAvXmh0dHBzPzpcXC9cXC9cXFtbXlxcXV0qXVteL10qLztcblxuICAgIHZhciBwcm92aWRlciA9IHRoaXM7XG5cbiAgICAvKipcbiAgICAgKiBAbmdkb2MgcHJvcGVydHlcbiAgICAgKiBAbmFtZSAkcmVzb3VyY2VQcm92aWRlciNkZWZhdWx0c1xuICAgICAqIEBkZXNjcmlwdGlvblxuICAgICAqIE9iamVjdCBjb250YWluaW5nIGRlZmF1bHQgb3B0aW9ucyB1c2VkIHdoZW4gY3JlYXRpbmcgYCRyZXNvdXJjZWAgaW5zdGFuY2VzLlxuICAgICAqXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWVzIHNhdGlzZnkgYSB3aWRlIHJhbmdlIG9mIHVzZWNhc2VzLCBidXQgeW91IG1heSBjaG9vc2UgdG8gb3ZlcndyaXRlIGFueSBvZlxuICAgICAqIHRoZW0gdG8gZnVydGhlciBjdXN0b21pemUgeW91ciBpbnN0YW5jZXMuIFRoZSBhdmFpbGFibGUgcHJvcGVydGllcyBhcmU6XG4gICAgICpcbiAgICAgKiAtICoqc3RyaXBUcmFpbGluZ1NsYXNoZXMqKiDigJMgYHtib29sZWFufWAg4oCTIElmIHRydWUsIHRoZW4gdGhlIHRyYWlsaW5nIHNsYXNoZXMgZnJvbSBhbnlcbiAgICAgKiAgIGNhbGN1bGF0ZWQgVVJMIHdpbGwgYmUgc3RyaXBwZWQuPGJyIC8+XG4gICAgICogICAoRGVmYXVsdHMgdG8gdHJ1ZS4pXG4gICAgICogLSAqKmNhbmNlbGxhYmxlKiog4oCTIGB7Ym9vbGVhbn1gIOKAkyBJZiB0cnVlLCB0aGUgcmVxdWVzdCBtYWRlIGJ5IGEgXCJub24taW5zdGFuY2VcIiBjYWxsIHdpbGwgYmVcbiAgICAgKiAgIGNhbmNlbGxlZCAoaWYgbm90IGFscmVhZHkgY29tcGxldGVkKSBieSBjYWxsaW5nIGAkY2FuY2VsUmVxdWVzdCgpYCBvbiB0aGUgY2FsbCdzIHJldHVyblxuICAgICAqICAgdmFsdWUuIEZvciBtb3JlIGRldGFpbHMsIHNlZSB7QGxpbmsgbmdSZXNvdXJjZS4kcmVzb3VyY2V9LiBUaGlzIGNhbiBiZSBvdmVyd3JpdHRlbiBwZXJcbiAgICAgKiAgIHJlc291cmNlIGNsYXNzIG9yIGFjdGlvbi48YnIgLz5cbiAgICAgKiAgIChEZWZhdWx0cyB0byBmYWxzZS4pXG4gICAgICogLSAqKmFjdGlvbnMqKiAtIGB7T2JqZWN0LjxPYmplY3Q+fWAgLSBBIGhhc2ggd2l0aCBkZWZhdWx0IGFjdGlvbnMgZGVjbGFyYXRpb25zLiBBY3Rpb25zIGFyZVxuICAgICAqICAgaGlnaC1sZXZlbCBtZXRob2RzIGNvcnJlc3BvbmRpbmcgdG8gUkVTVGZ1bCBhY3Rpb25zL21ldGhvZHMgb24gcmVzb3VyY2VzLiBBbiBhY3Rpb24gbWF5XG4gICAgICogICBzcGVjaWZ5IHdoYXQgSFRUUCBtZXRob2QgdG8gdXNlLCB3aGF0IFVSTCB0byBoaXQsIGlmIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSBhIHNpbmdsZVxuICAgICAqICAgb2JqZWN0IG9yIGEgY29sbGVjdGlvbiAoYXJyYXkpIG9mIG9iamVjdHMgZXRjLiBGb3IgbW9yZSBkZXRhaWxzLCBzZWVcbiAgICAgKiAgIHtAbGluayBuZ1Jlc291cmNlLiRyZXNvdXJjZX0uIFRoZSBhY3Rpb25zIGNhbiBhbHNvIGJlIGVuaGFuY2VkIG9yIG92ZXJ3cml0dGVuIHBlciByZXNvdXJjZVxuICAgICAqICAgY2xhc3MuPGJyIC8+XG4gICAgICogICBUaGUgZGVmYXVsdCBhY3Rpb25zIGFyZTpcbiAgICAgKiAgIGBgYGpzXG4gICAgICogICB7XG4gICAgICogICAgIGdldDoge21ldGhvZDogJ0dFVCd9LFxuICAgICAqICAgICBzYXZlOiB7bWV0aG9kOiAnUE9TVCd9LFxuICAgICAqICAgICBxdWVyeToge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9LFxuICAgICAqICAgICByZW1vdmU6IHttZXRob2Q6ICdERUxFVEUnfSxcbiAgICAgKiAgICAgZGVsZXRlOiB7bWV0aG9kOiAnREVMRVRFJ31cbiAgICAgKiAgIH1cbiAgICAgKiAgIGBgYFxuICAgICAqXG4gICAgICogIyMjIyBFeGFtcGxlXG4gICAgICpcbiAgICAgKiBGb3IgZXhhbXBsZSwgeW91IGNhbiBzcGVjaWZ5IGEgbmV3IGB1cGRhdGVgIGFjdGlvbiB0aGF0IHVzZXMgdGhlIGBQVVRgIEhUVFAgdmVyYjpcbiAgICAgKlxuICAgICAqIGBgYGpzXG4gICAgICogICBhbmd1bGFyLlxuICAgICAqICAgICBtb2R1bGUoJ215QXBwJykuXG4gICAgICogICAgIGNvbmZpZyhbJyRyZXNvdXJjZVByb3ZpZGVyJywgZnVuY3Rpb24gKCRyZXNvdXJjZVByb3ZpZGVyKSB7XG4gICAgICogICAgICAgJHJlc291cmNlUHJvdmlkZXIuZGVmYXVsdHMuYWN0aW9ucy51cGRhdGUgPSB7XG4gICAgICogICAgICAgICBtZXRob2Q6ICdQVVQnXG4gICAgICogICAgICAgfTtcbiAgICAgKiAgICAgfV0pO1xuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogT3IgeW91IGNhbiBldmVuIG92ZXJ3cml0ZSB0aGUgd2hvbGUgYGFjdGlvbnNgIGxpc3QgYW5kIHNwZWNpZnkgeW91ciBvd246XG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqICAgYW5ndWxhci5cbiAgICAgKiAgICAgbW9kdWxlKCdteUFwcCcpLlxuICAgICAqICAgICBjb25maWcoWyckcmVzb3VyY2VQcm92aWRlcicsIGZ1bmN0aW9uICgkcmVzb3VyY2VQcm92aWRlcikge1xuICAgICAqICAgICAgICRyZXNvdXJjZVByb3ZpZGVyLmRlZmF1bHRzLmFjdGlvbnMgPSB7XG4gICAgICogICAgICAgICBjcmVhdGU6IHttZXRob2Q6ICdQT1NUJ30sXG4gICAgICogICAgICAgICBnZXQ6ICAgIHttZXRob2Q6ICdHRVQnfSxcbiAgICAgKiAgICAgICAgIGdldEFsbDoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6dHJ1ZX0sXG4gICAgICogICAgICAgICB1cGRhdGU6IHttZXRob2Q6ICdQVVQnfSxcbiAgICAgKiAgICAgICAgIGRlbGV0ZToge21ldGhvZDogJ0RFTEVURSd9XG4gICAgICogICAgICAgfTtcbiAgICAgKiAgICAgfSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKi9cbiAgICB0aGlzLmRlZmF1bHRzID0ge1xuICAgICAgLy8gU3RyaXAgc2xhc2hlcyBieSBkZWZhdWx0XG4gICAgICBzdHJpcFRyYWlsaW5nU2xhc2hlczogdHJ1ZSxcblxuICAgICAgLy8gTWFrZSBub24taW5zdGFuY2UgcmVxdWVzdHMgY2FuY2VsbGFibGUgKHZpYSBgJGNhbmNlbFJlcXVlc3QoKWApXG4gICAgICBjYW5jZWxsYWJsZTogZmFsc2UsXG5cbiAgICAgIC8vIERlZmF1bHQgYWN0aW9ucyBjb25maWd1cmF0aW9uXG4gICAgICBhY3Rpb25zOiB7XG4gICAgICAgICdnZXQnOiB7bWV0aG9kOiAnR0VUJ30sXG4gICAgICAgICdzYXZlJzoge21ldGhvZDogJ1BPU1QnfSxcbiAgICAgICAgJ3F1ZXJ5Jzoge21ldGhvZDogJ0dFVCcsIGlzQXJyYXk6IHRydWV9LFxuICAgICAgICAncmVtb3ZlJzoge21ldGhvZDogJ0RFTEVURSd9LFxuICAgICAgICAnZGVsZXRlJzoge21ldGhvZDogJ0RFTEVURSd9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuJGdldCA9IFsnJGh0dHAnLCAnJGxvZycsICckcScsICckdGltZW91dCcsIGZ1bmN0aW9uKCRodHRwLCAkbG9nLCAkcSwgJHRpbWVvdXQpIHtcblxuICAgICAgdmFyIG5vb3AgPSBhbmd1bGFyLm5vb3AsXG4gICAgICAgICAgZm9yRWFjaCA9IGFuZ3VsYXIuZm9yRWFjaCxcbiAgICAgICAgICBleHRlbmQgPSBhbmd1bGFyLmV4dGVuZCxcbiAgICAgICAgICBjb3B5ID0gYW5ndWxhci5jb3B5LFxuICAgICAgICAgIGlzQXJyYXkgPSBhbmd1bGFyLmlzQXJyYXksXG4gICAgICAgICAgaXNEZWZpbmVkID0gYW5ndWxhci5pc0RlZmluZWQsXG4gICAgICAgICAgaXNGdW5jdGlvbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbixcbiAgICAgICAgICBpc051bWJlciA9IGFuZ3VsYXIuaXNOdW1iZXIsXG4gICAgICAgICAgZW5jb2RlVXJpUXVlcnkgPSBhbmd1bGFyLiQkZW5jb2RlVXJpUXVlcnksXG4gICAgICAgICAgZW5jb2RlVXJpU2VnbWVudCA9IGFuZ3VsYXIuJCRlbmNvZGVVcmlTZWdtZW50O1xuXG4gICAgICBmdW5jdGlvbiBSb3V0ZSh0ZW1wbGF0ZSwgZGVmYXVsdHMpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICB0aGlzLmRlZmF1bHRzID0gZXh0ZW5kKHt9LCBwcm92aWRlci5kZWZhdWx0cywgZGVmYXVsdHMpO1xuICAgICAgICB0aGlzLnVybFBhcmFtcyA9IHt9O1xuICAgICAgfVxuXG4gICAgICBSb3V0ZS5wcm90b3R5cGUgPSB7XG4gICAgICAgIHNldFVybFBhcmFtczogZnVuY3Rpb24oY29uZmlnLCBwYXJhbXMsIGFjdGlvblVybCkge1xuICAgICAgICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgICAgIHVybCA9IGFjdGlvblVybCB8fCBzZWxmLnRlbXBsYXRlLFxuICAgICAgICAgICAgdmFsLFxuICAgICAgICAgICAgZW5jb2RlZFZhbCxcbiAgICAgICAgICAgIHByb3RvY29sQW5kSXB2NiA9ICcnO1xuXG4gICAgICAgICAgdmFyIHVybFBhcmFtcyA9IHNlbGYudXJsUGFyYW1zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgICBmb3JFYWNoKHVybC5zcGxpdCgvXFxXLyksIGZ1bmN0aW9uKHBhcmFtKSB7XG4gICAgICAgICAgICBpZiAocGFyYW0gPT09ICdoYXNPd25Qcm9wZXJ0eScpIHtcbiAgICAgICAgICAgICAgdGhyb3cgJHJlc291cmNlTWluRXJyKCdiYWRuYW1lJywgJ2hhc093blByb3BlcnR5IGlzIG5vdCBhIHZhbGlkIHBhcmFtZXRlciBuYW1lLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEobmV3IFJlZ0V4cCgnXlxcXFxkKyQnKS50ZXN0KHBhcmFtKSkgJiYgcGFyYW0gJiZcbiAgICAgICAgICAgICAgKG5ldyBSZWdFeHAoJyhefFteXFxcXFxcXFxdKTonICsgcGFyYW0gKyAnKFxcXFxXfCQpJykudGVzdCh1cmwpKSkge1xuICAgICAgICAgICAgICB1cmxQYXJhbXNbcGFyYW1dID0ge1xuICAgICAgICAgICAgICAgIGlzUXVlcnlQYXJhbVZhbHVlOiAobmV3IFJlZ0V4cCgnXFxcXD8uKj06JyArIHBhcmFtICsgJyg/OlxcXFxXfCQpJykpLnRlc3QodXJsKVxuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXFxcOi9nLCAnOicpO1xuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKFBST1RPQ09MX0FORF9JUFY2X1JFR0VYLCBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgICAgICAgcHJvdG9jb2xBbmRJcHY2ID0gbWF0Y2g7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBwYXJhbXMgPSBwYXJhbXMgfHwge307XG4gICAgICAgICAgZm9yRWFjaChzZWxmLnVybFBhcmFtcywgZnVuY3Rpb24ocGFyYW1JbmZvLCB1cmxQYXJhbSkge1xuICAgICAgICAgICAgdmFsID0gcGFyYW1zLmhhc093blByb3BlcnR5KHVybFBhcmFtKSA/IHBhcmFtc1t1cmxQYXJhbV0gOiBzZWxmLmRlZmF1bHRzW3VybFBhcmFtXTtcbiAgICAgICAgICAgIGlmIChpc0RlZmluZWQodmFsKSAmJiB2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgaWYgKHBhcmFtSW5mby5pc1F1ZXJ5UGFyYW1WYWx1ZSkge1xuICAgICAgICAgICAgICAgIGVuY29kZWRWYWwgPSBlbmNvZGVVcmlRdWVyeSh2YWwsIHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVuY29kZWRWYWwgPSBlbmNvZGVVcmlTZWdtZW50KHZhbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UobmV3IFJlZ0V4cCgnOicgKyB1cmxQYXJhbSArICcoXFxcXFd8JCknLCAnZycpLCBmdW5jdGlvbihtYXRjaCwgcDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZW5jb2RlZFZhbCArIHAxO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKG5ldyBSZWdFeHAoJygvPyk6JyArIHVybFBhcmFtICsgJyhcXFxcV3wkKScsICdnJyksIGZ1bmN0aW9uKG1hdGNoLFxuICAgICAgICAgICAgICAgICAgbGVhZGluZ1NsYXNoZXMsIHRhaWwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFpbC5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRhaWw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBsZWFkaW5nU2xhc2hlcyArIHRhaWw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIHN0cmlwIHRyYWlsaW5nIHNsYXNoZXMgYW5kIHNldCB0aGUgdXJsICh1bmxlc3MgdGhpcyBiZWhhdmlvciBpcyBzcGVjaWZpY2FsbHkgZGlzYWJsZWQpXG4gICAgICAgICAgaWYgKHNlbGYuZGVmYXVsdHMuc3RyaXBUcmFpbGluZ1NsYXNoZXMpIHtcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC8rJC8sICcnKSB8fCAnLyc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ29sbGFwc2UgYC8uYCBpZiBmb3VuZCBpbiB0aGUgbGFzdCBVUkwgcGF0aCBzZWdtZW50IGJlZm9yZSB0aGUgcXVlcnkuXG4gICAgICAgICAgLy8gRS5nLiBgaHR0cDovL3VybC5jb20vaWQvLmZvcm1hdD9xPXhgIGJlY29tZXMgYGh0dHA6Ly91cmwuY29tL2lkLmZvcm1hdD9xPXhgLlxuICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKC9cXC9cXC4oPz1cXHcrKCR8XFw/KSkvLCAnLicpO1xuICAgICAgICAgIC8vIFJlcGxhY2UgZXNjYXBlZCBgL1xcLmAgd2l0aCBgLy5gLlxuICAgICAgICAgIC8vIChJZiBgXFwuYCBjb21lcyBmcm9tIGEgcGFyYW0gdmFsdWUsIGl0IHdpbGwgYmUgZW5jb2RlZCBhcyBgJTVDLmAuKVxuICAgICAgICAgIGNvbmZpZy51cmwgPSBwcm90b2NvbEFuZElwdjYgKyB1cmwucmVwbGFjZSgvXFwvKFxcXFx8JTVDKVxcLi8sICcvLicpO1xuXG5cbiAgICAgICAgICAvLyBzZXQgcGFyYW1zIC0gZGVsZWdhdGUgcGFyYW0gZW5jb2RpbmcgdG8gJGh0dHBcbiAgICAgICAgICBmb3JFYWNoKHBhcmFtcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgaWYgKCFzZWxmLnVybFBhcmFtc1trZXldKSB7XG4gICAgICAgICAgICAgIGNvbmZpZy5wYXJhbXMgPSBjb25maWcucGFyYW1zIHx8IHt9O1xuICAgICAgICAgICAgICBjb25maWcucGFyYW1zW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuXG4gICAgICBmdW5jdGlvbiByZXNvdXJjZUZhY3RvcnkodXJsLCBwYXJhbURlZmF1bHRzLCBhY3Rpb25zLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciByb3V0ZSA9IG5ldyBSb3V0ZSh1cmwsIG9wdGlvbnMpO1xuXG4gICAgICAgIGFjdGlvbnMgPSBleHRlbmQoe30sIHByb3ZpZGVyLmRlZmF1bHRzLmFjdGlvbnMsIGFjdGlvbnMpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGV4dHJhY3RQYXJhbXMoZGF0YSwgYWN0aW9uUGFyYW1zKSB7XG4gICAgICAgICAgdmFyIGlkcyA9IHt9O1xuICAgICAgICAgIGFjdGlvblBhcmFtcyA9IGV4dGVuZCh7fSwgcGFyYW1EZWZhdWx0cywgYWN0aW9uUGFyYW1zKTtcbiAgICAgICAgICBmb3JFYWNoKGFjdGlvblBhcmFtcywgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpKSB7IHZhbHVlID0gdmFsdWUoZGF0YSk7IH1cbiAgICAgICAgICAgIGlkc1trZXldID0gdmFsdWUgJiYgdmFsdWUuY2hhckF0ICYmIHZhbHVlLmNoYXJBdCgwKSA9PT0gJ0AnID9cbiAgICAgICAgICAgICAgbG9va3VwRG90dGVkUGF0aChkYXRhLCB2YWx1ZS5zdWJzdHIoMSkpIDogdmFsdWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGlkcztcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRlZmF1bHRSZXNwb25zZUludGVyY2VwdG9yKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLnJlc291cmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gUmVzb3VyY2UodmFsdWUpIHtcbiAgICAgICAgICBzaGFsbG93Q2xlYXJBbmRDb3B5KHZhbHVlIHx8IHt9LCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIFJlc291cmNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgZGF0YSA9IGV4dGVuZCh7fSwgdGhpcyk7XG4gICAgICAgICAgZGVsZXRlIGRhdGEuJHByb21pc2U7XG4gICAgICAgICAgZGVsZXRlIGRhdGEuJHJlc29sdmVkO1xuICAgICAgICAgIGRlbGV0ZSBkYXRhLiRjYW5jZWxSZXF1ZXN0O1xuICAgICAgICAgIHJldHVybiBkYXRhO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZvckVhY2goYWN0aW9ucywgZnVuY3Rpb24oYWN0aW9uLCBuYW1lKSB7XG4gICAgICAgICAgdmFyIGhhc0JvZHkgPSBhY3Rpb24uaGFzQm9keSA9PT0gdHJ1ZSB8fCAoYWN0aW9uLmhhc0JvZHkgIT09IGZhbHNlICYmIC9eKFBPU1R8UFVUfFBBVENIKSQvaS50ZXN0KGFjdGlvbi5tZXRob2QpKTtcbiAgICAgICAgICB2YXIgbnVtZXJpY1RpbWVvdXQgPSBhY3Rpb24udGltZW91dDtcbiAgICAgICAgICB2YXIgY2FuY2VsbGFibGUgPSBpc0RlZmluZWQoYWN0aW9uLmNhbmNlbGxhYmxlKSA/XG4gICAgICAgICAgICAgIGFjdGlvbi5jYW5jZWxsYWJsZSA6IHJvdXRlLmRlZmF1bHRzLmNhbmNlbGxhYmxlO1xuXG4gICAgICAgICAgaWYgKG51bWVyaWNUaW1lb3V0ICYmICFpc051bWJlcihudW1lcmljVGltZW91dCkpIHtcbiAgICAgICAgICAgICRsb2cuZGVidWcoJ25nUmVzb3VyY2U6XFxuJyArXG4gICAgICAgICAgICAgICAgICAgICAgICcgIE9ubHkgbnVtZXJpYyB2YWx1ZXMgYXJlIGFsbG93ZWQgYXMgYHRpbWVvdXRgLlxcbicgK1xuICAgICAgICAgICAgICAgICAgICAgICAnICBQcm9taXNlcyBhcmUgbm90IHN1cHBvcnRlZCBpbiAkcmVzb3VyY2UsIGJlY2F1c2UgdGhlIHNhbWUgdmFsdWUgd291bGQgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICdiZSB1c2VkIGZvciBtdWx0aXBsZSByZXF1ZXN0cy4gSWYgeW91IGFyZSBsb29raW5nIGZvciBhIHdheSB0byBjYW5jZWwgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICdyZXF1ZXN0cywgeW91IHNob3VsZCB1c2UgdGhlIGBjYW5jZWxsYWJsZWAgb3B0aW9uLicpO1xuICAgICAgICAgICAgZGVsZXRlIGFjdGlvbi50aW1lb3V0O1xuICAgICAgICAgICAgbnVtZXJpY1RpbWVvdXQgPSBudWxsO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIFJlc291cmNlW25hbWVdID0gZnVuY3Rpb24oYTEsIGEyLCBhMywgYTQpIHtcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSB7fSwgZGF0YSwgb25TdWNjZXNzLCBvbkVycm9yO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIG9uRXJyb3IgPSBhNDtcbiAgICAgICAgICAgICAgICBvblN1Y2Nlc3MgPSBhMztcbiAgICAgICAgICAgICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGEyKSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGlzRnVuY3Rpb24oYTEpKSB7XG4gICAgICAgICAgICAgICAgICAgIG9uU3VjY2VzcyA9IGExO1xuICAgICAgICAgICAgICAgICAgICBvbkVycm9yID0gYTI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MgPSBhMjtcbiAgICAgICAgICAgICAgICAgIG9uRXJyb3IgPSBhMztcbiAgICAgICAgICAgICAgICAgIC8vIGZhbGxzIHRocm91Z2hcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcGFyYW1zID0gYTE7XG4gICAgICAgICAgICAgICAgICBkYXRhID0gYTI7XG4gICAgICAgICAgICAgICAgICBvblN1Y2Nlc3MgPSBhMztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBmYWxscyB0aHJvdWdoXG4gICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBpZiAoaXNGdW5jdGlvbihhMSkpIG9uU3VjY2VzcyA9IGExO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGhhc0JvZHkpIGRhdGEgPSBhMTtcbiAgICAgICAgICAgICAgICBlbHNlIHBhcmFtcyA9IGExO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIDA6IGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93ICRyZXNvdXJjZU1pbkVycignYmFkYXJncycsXG4gICAgICAgICAgICAgICAgICAnRXhwZWN0ZWQgdXAgdG8gNCBhcmd1bWVudHMgW3BhcmFtcywgZGF0YSwgc3VjY2VzcywgZXJyb3JdLCBnb3QgezB9IGFyZ3VtZW50cycsXG4gICAgICAgICAgICAgICAgICBhcmd1bWVudHMubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGlzSW5zdGFuY2VDYWxsID0gdGhpcyBpbnN0YW5jZW9mIFJlc291cmNlO1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gaXNJbnN0YW5jZUNhbGwgPyBkYXRhIDogKGFjdGlvbi5pc0FycmF5ID8gW10gOiBuZXcgUmVzb3VyY2UoZGF0YSkpO1xuICAgICAgICAgICAgdmFyIGh0dHBDb25maWcgPSB7fTtcbiAgICAgICAgICAgIHZhciByZXF1ZXN0SW50ZXJjZXB0b3IgPSBhY3Rpb24uaW50ZXJjZXB0b3IgJiYgYWN0aW9uLmludGVyY2VwdG9yLnJlcXVlc3QgfHwgdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIHJlcXVlc3RFcnJvckludGVyY2VwdG9yID0gYWN0aW9uLmludGVyY2VwdG9yICYmIGFjdGlvbi5pbnRlcmNlcHRvci5yZXF1ZXN0RXJyb3IgfHxcbiAgICAgICAgICAgICAgdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlSW50ZXJjZXB0b3IgPSBhY3Rpb24uaW50ZXJjZXB0b3IgJiYgYWN0aW9uLmludGVyY2VwdG9yLnJlc3BvbnNlIHx8XG4gICAgICAgICAgICAgIGRlZmF1bHRSZXNwb25zZUludGVyY2VwdG9yO1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlRXJyb3JJbnRlcmNlcHRvciA9IGFjdGlvbi5pbnRlcmNlcHRvciAmJiBhY3Rpb24uaW50ZXJjZXB0b3IucmVzcG9uc2VFcnJvciB8fFxuICAgICAgICAgICAgICAkcS5yZWplY3Q7XG4gICAgICAgICAgICB2YXIgc3VjY2Vzc0NhbGxiYWNrID0gb25TdWNjZXNzID8gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICAgIG9uU3VjY2Vzcyh2YWwsIHJlc3BvbnNlLmhlYWRlcnMsIHJlc3BvbnNlLnN0YXR1cywgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG4gICAgICAgICAgICB9IDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgdmFyIGVycm9yQ2FsbGJhY2sgPSBvbkVycm9yIHx8IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciB0aW1lb3V0RGVmZXJyZWQ7XG4gICAgICAgICAgICB2YXIgbnVtZXJpY1RpbWVvdXRQcm9taXNlO1xuICAgICAgICAgICAgdmFyIHJlc3BvbnNlO1xuXG4gICAgICAgICAgICBmb3JFYWNoKGFjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgICAgICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICBodHRwQ29uZmlnW2tleV0gPSBjb3B5KHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BhcmFtcyc6XG4gICAgICAgICAgICAgICAgY2FzZSAnaXNBcnJheSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnaW50ZXJjZXB0b3InOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGxhYmxlJzpcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFpc0luc3RhbmNlQ2FsbCAmJiBjYW5jZWxsYWJsZSkge1xuICAgICAgICAgICAgICB0aW1lb3V0RGVmZXJyZWQgPSAkcS5kZWZlcigpO1xuICAgICAgICAgICAgICBodHRwQ29uZmlnLnRpbWVvdXQgPSB0aW1lb3V0RGVmZXJyZWQucHJvbWlzZTtcblxuICAgICAgICAgICAgICBpZiAobnVtZXJpY1RpbWVvdXQpIHtcbiAgICAgICAgICAgICAgICBudW1lcmljVGltZW91dFByb21pc2UgPSAkdGltZW91dCh0aW1lb3V0RGVmZXJyZWQucmVzb2x2ZSwgbnVtZXJpY1RpbWVvdXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChoYXNCb2R5KSBodHRwQ29uZmlnLmRhdGEgPSBkYXRhO1xuICAgICAgICAgICAgcm91dGUuc2V0VXJsUGFyYW1zKGh0dHBDb25maWcsXG4gICAgICAgICAgICAgIGV4dGVuZCh7fSwgZXh0cmFjdFBhcmFtcyhkYXRhLCBhY3Rpb24ucGFyYW1zIHx8IHt9KSwgcGFyYW1zKSxcbiAgICAgICAgICAgICAgYWN0aW9uLnVybCk7XG5cbiAgICAgICAgICAgIC8vIFN0YXJ0IHRoZSBwcm9taXNlIGNoYWluXG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLlxuICAgICAgICAgICAgICByZXNvbHZlKGh0dHBDb25maWcpLlxuICAgICAgICAgICAgICB0aGVuKHJlcXVlc3RJbnRlcmNlcHRvcikuXG4gICAgICAgICAgICAgIGNhdGNoKHJlcXVlc3RFcnJvckludGVyY2VwdG9yKS5cbiAgICAgICAgICAgICAgdGhlbigkaHR0cCk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcCkge1xuICAgICAgICAgICAgICB2YXIgZGF0YSA9IHJlc3AuZGF0YTtcblxuICAgICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIC8vIE5lZWQgdG8gY29udmVydCBhY3Rpb24uaXNBcnJheSB0byBib29sZWFuIGluIGNhc2UgaXQgaXMgdW5kZWZpbmVkXG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkoZGF0YSkgIT09ICghIWFjdGlvbi5pc0FycmF5KSkge1xuICAgICAgICAgICAgICAgICAgdGhyb3cgJHJlc291cmNlTWluRXJyKCdiYWRjZmcnLFxuICAgICAgICAgICAgICAgICAgICAgICdFcnJvciBpbiByZXNvdXJjZSBjb25maWd1cmF0aW9uIGZvciBhY3Rpb24gYHswfWAuIEV4cGVjdGVkIHJlc3BvbnNlIHRvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICdjb250YWluIGFuIHsxfSBidXQgZ290IGFuIHsyfSAoUmVxdWVzdDogezN9IHs0fSknLCBuYW1lLCBhY3Rpb24uaXNBcnJheSA/ICdhcnJheScgOiAnb2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgaXNBcnJheShkYXRhKSA/ICdhcnJheScgOiAnb2JqZWN0JywgaHR0cENvbmZpZy5tZXRob2QsIGh0dHBDb25maWcudXJsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFjdGlvbi5pc0FycmF5KSB7XG4gICAgICAgICAgICAgICAgICB2YWx1ZS5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgZm9yRWFjaChkYXRhLCBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKG5ldyBSZXNvdXJjZShpdGVtKSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWQgSlNPTiB2YWx1ZXMgbWF5IGJlIHN0cmluZyBsaXRlcmFscywgYW5kIHRoZXNlIHNob3VsZCBub3QgYmUgY29udmVydGVkXG4gICAgICAgICAgICAgICAgICAgICAgLy8gaW50byBvYmplY3RzLiBUaGVzZSBpdGVtcyB3aWxsIG5vdCBoYXZlIGFjY2VzcyB0byB0aGUgUmVzb3VyY2UgcHJvdG90eXBlXG4gICAgICAgICAgICAgICAgICAgICAgLy8gbWV0aG9kcywgYnV0IHVuZm9ydHVuYXRlbHkgdGhlcmVcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSB2YWx1ZS4kcHJvbWlzZTsgICAgIC8vIFNhdmUgdGhlIHByb21pc2VcbiAgICAgICAgICAgICAgICAgIHNoYWxsb3dDbGVhckFuZENvcHkoZGF0YSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgdmFsdWUuJHByb21pc2UgPSBwcm9taXNlOyAgICAgICAgIC8vIFJlc3RvcmUgdGhlIHByb21pc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXNwLnJlc291cmNlID0gdmFsdWU7XG4gICAgICAgICAgICAgIHJlc3BvbnNlID0gcmVzcDtcbiAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlSW50ZXJjZXB0b3IocmVzcCk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbihyZWplY3Rpb25PclJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHJlamVjdGlvbk9yUmVzcG9uc2UucmVzb3VyY2UgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgcmVzcG9uc2UgPSByZWplY3Rpb25PclJlc3BvbnNlO1xuICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2VFcnJvckludGVyY2VwdG9yKHJlamVjdGlvbk9yUmVzcG9uc2UpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHByb21pc2UgPSBwcm9taXNlWydmaW5hbGx5J10oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHZhbHVlLiRyZXNvbHZlZCA9IHRydWU7XG4gICAgICAgICAgICAgIGlmICghaXNJbnN0YW5jZUNhbGwgJiYgY2FuY2VsbGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS4kY2FuY2VsUmVxdWVzdCA9IG5vb3A7XG4gICAgICAgICAgICAgICAgJHRpbWVvdXQuY2FuY2VsKG51bWVyaWNUaW1lb3V0UHJvbWlzZSk7XG4gICAgICAgICAgICAgICAgdGltZW91dERlZmVycmVkID0gbnVtZXJpY1RpbWVvdXRQcm9taXNlID0gaHR0cENvbmZpZy50aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFJ1biB0aGUgYHN1Y2Nlc3NgL2BlcnJvcmAgY2FsbGJhY2tzLCBidXQgZG8gbm90IGxldCB0aGVtIGFmZmVjdCB0aGUgcmV0dXJuZWQgcHJvbWlzZS5cbiAgICAgICAgICAgIHByb21pc2UudGhlbihzdWNjZXNzQ2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICBpZiAoIWlzSW5zdGFuY2VDYWxsKSB7XG4gICAgICAgICAgICAgIC8vIHdlIGFyZSBjcmVhdGluZyBpbnN0YW5jZSAvIGNvbGxlY3Rpb25cbiAgICAgICAgICAgICAgLy8gLSBzZXQgdGhlIGluaXRpYWwgcHJvbWlzZVxuICAgICAgICAgICAgICAvLyAtIHJldHVybiB0aGUgaW5zdGFuY2UgLyBjb2xsZWN0aW9uXG4gICAgICAgICAgICAgIHZhbHVlLiRwcm9taXNlID0gcHJvbWlzZTtcbiAgICAgICAgICAgICAgdmFsdWUuJHJlc29sdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgIGlmIChjYW5jZWxsYWJsZSkgdmFsdWUuJGNhbmNlbFJlcXVlc3QgPSBjYW5jZWxSZXF1ZXN0O1xuXG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaW5zdGFuY2UgY2FsbFxuICAgICAgICAgICAgcmV0dXJuIHByb21pc2U7XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNhbmNlbFJlcXVlc3QodmFsdWUpIHtcbiAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaChub29wKTtcbiAgICAgICAgICAgICAgaWYgKHRpbWVvdXREZWZlcnJlZCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRpbWVvdXREZWZlcnJlZC5yZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH07XG5cblxuICAgICAgICAgIFJlc291cmNlLnByb3RvdHlwZVsnJCcgKyBuYW1lXSA9IGZ1bmN0aW9uKHBhcmFtcywgc3VjY2VzcywgZXJyb3IpIHtcbiAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKHBhcmFtcykpIHtcbiAgICAgICAgICAgICAgZXJyb3IgPSBzdWNjZXNzOyBzdWNjZXNzID0gcGFyYW1zOyBwYXJhbXMgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBSZXNvdXJjZVtuYW1lXS5jYWxsKHRoaXMsIHBhcmFtcywgdGhpcywgc3VjY2VzcywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC4kcHJvbWlzZSB8fCByZXN1bHQ7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFJlc291cmNlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzb3VyY2VGYWN0b3J5O1xuICAgIH1dO1xuICB9KTtcblxuXG59KSh3aW5kb3csIHdpbmRvdy5hbmd1bGFyKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2FuZ3VsYXItcmVzb3VyY2UvYW5ndWxhci1yZXNvdXJjZS5qc1xuLy8gbW9kdWxlIGlkID0gNzU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJhbGdvLWNvbnRhaW5lclxcXCIgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGxheW91dC1hbGlnbj1cXFwic3RhcnQgY2VudGVyXFxcIiBtZC10aGVtZT1cXFwiYWxnb1xcXCIgYXAtbWQtY29sb3I9XFxcInsnYmFja2dyb3VuZC1jb2xvcic6ICdhbGdvOjpwcmltYXJ5J31cXFwiPlxcclxcbiAgICA8bWQtdGFicyBtZC1ib3JkZXItYm90dG9tIG1kLXNlbGVjdGVkPVxcXCJ2bS5hY3RpdmVUYWJJbmRleFxcXCI+XFxyXFxuICAgICAgICA8bWQtdGFiIGxhYmVsPVxcXCJWUlBcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZ28td3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDx2cnAtZHJhdz48L3ZycC1kcmF3PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9tZC10YWI+XFxyXFxuICAgICAgICA8bWQtdGFiIGxhYmVsPVxcXCJUU1BcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImFsZ28td3JhcHBlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxyb3V0ZS1kcmF3Pjwvcm91dGUtZHJhdz5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvbWQtdGFiPlxcclxcbiAgICAgICAgPG1kLXRhYiBsYWJlbD1cXFwiay1NZWFuc1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiYWxnby13cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGstbWVhbj48L2stbWVhbj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvbWQtdGFiPlxcclxcbiAgICA8L21kLXRhYnM+XFxyXFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC90ZW1wbGF0ZXMvYWxnby5odG1sXG4vLyBtb2R1bGUgaWQgPSA3NjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL2FwaS1yZXF1ZXN0cy5qc1wiOiA3NjIsXG5cdFwiLi9tZC1jb25zdGFudHMuanNcIjogNzYzXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNzYxO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbnN0YW50cyAuK1xcLmpzJFxuLy8gbW9kdWxlIGlkID0gNzYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuY29uc3RhbnQoJ2FwaVJlcXVlc3RDb25maWcnLCB7XHJcblxyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbnN0YW50cy9hcGktcmVxdWVzdHMuanNcbi8vIG1vZHVsZSBpZCA9IDc2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ3JlYXRlZCBieSB1c2VyIG9uIDEyLjA5LjIwMTYuXHJcbiAqIE1hdGVyaWFsIERlc2lnbiBjb25zdGFudHNcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuY29uc3RhbnQoJ21kQ29uc3RhbnRzJywge1xyXG4gICAgICAgIGF2YXRhclNpemU6IDQwLFxyXG4gICAgICAgIHBhZGRpbmdTaXplOiAxNixcclxuICAgICAgICBzdGRUZXh0Q29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuODcpJ1xyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbnN0YW50cy9tZC1jb25zdGFudHMuanNcbi8vIG1vZHVsZSBpZCA9IDc2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vcm91dGUtY29udHJvbGxlci5qc1wiOiA3NjVcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3NjQ7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29udHJvbGxlcnMgLitcXC5qcyRcbi8vIG1vZHVsZSBpZCA9IDc2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCkge1xyXG4gICAgdnJwLmNvbnRyb2xsZXIoJ1JvdXRlQ29udHJvbGxlcicsIFJvdXRlQ29udHJvbGxlcik7XHJcbiAgICBSb3V0ZUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gUm91dGVDb250cm9sbGVyICgkc2NvcGUpIHtcclxuICAgICAgICB0aGlzLmFjdGl2ZVRhYkluZGV4ID0gMDtcclxuICAgICAgICBjb25zb2xlLmxvZygnUm91dGUgQ3RybCBpbml0JylcclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb250cm9sbGVycy9yb3V0ZS1jb250cm9sbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIG1hcCA9IHtcblx0XCIuL2FwLW1kLWNvbG9yLmpzXCI6IDc2Nyxcblx0XCIuL3Jlc2l6ZXIuanNcIjogNzY4XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNzY2O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2RpcmVjdGl2ZXMgLitcXC5qcyRcbi8vIG1vZHVsZSBpZCA9IDc2NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ3JlYXRlZCBieSBwYXN0b3Igb24gNi8yNS8yMDE2LlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5kaXJlY3RpdmUoJ2FwTWRDb2xvcicsIGFwTWRDb2xvckRpcmVjdGl2ZSk7XHJcbiAgICBhcE1kQ29sb3JEaXJlY3RpdmUuJGluamVjdCA9IFsnJG1kVGhlbWluZycsICckbWRDb2xvclBhbGV0dGUnLCAnJGNvbG9yZGVmJ107XHJcbiAgICBmdW5jdGlvbiBhcE1kQ29sb3JEaXJlY3RpdmUoJG1kVGhlbWluZywgJG1kQ29sb3JQYWxldHRlLCAkY29sb3JkZWYpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICAvL3Njb3BlOiB7XHJcbiAgICAgICAgICAgIC8vICAgIG1kQ29sb3I6ICc9YXBNZENvbG9yJ1xyXG4gICAgICAgICAgICAvL30sXHJcbiAgICAgICAgICAgIGxpbms6IGxpbmtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xyXG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB7fTtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkbWRDb2xvclBhbGV0dGUpO1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCRtZFRoZW1pbmcuVEhFTUVTLmRlZmF1bHQpO1xyXG4gICAgICAgICAgICB2YXIgY29sb3IgPSBzY29wZS4kZXZhbChhdHRycy5hcE1kQ29sb3IpO1xyXG5cclxuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGNvbG9yLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVba2V5XSA9ICRjb2xvcmRlZi5nZXRDb2xvcih2YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgZWxlbWVudC5jc3Moc3R5bGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvZGlyZWN0aXZlcy9hcC1tZC1jb2xvci5qc1xuLy8gbW9kdWxlIGlkID0gNzY3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMjIuMDUuMjAxNy5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLmRpcmVjdGl2ZSgncmVzaXplcicsIHJlc2l6ZXJEaXJlY3RpdmUpO1xyXG4gICAgcmVzaXplckRpcmVjdGl2ZS4kaW5qZWN0ID0gWyckcScsICckdGltZW91dCcsICdyZXNpemVTZW5zb3InXTtcclxuICAgIGZ1bmN0aW9uIHJlc2l6ZXJEaXJlY3RpdmUoJHEsICR0aW1lb3V0LCByZXNpemVTZW5zb3IpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0EnLFxyXG4gICAgICAgICAgICBsaW5rOiBsaW5rXHJcbiAgICAgICAgfTtcclxuICAgICAgICBmdW5jdGlvbiBsaW5rIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcclxuICAgICAgICAgICAgY29uc3QgcnMgPSByZXNpemVTZW5zb3IuZ2V0SW5zdGFuY2UoZWxlbWVudC5wYXJlbnQoKSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG9mZnNldCA9IHBhcnNlSW50KGF0dHJzLnJlc2l6ZXIsIDEwKSB8fCAwO1xyXG5cclxuICAgICAgICAgICAgaXNBdHRhY2hlZChlbGVtZW50LnBhcmVudCgpKS50aGVuKChpbmZvKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTaXplKGVsZW1lbnQsIGluZm8ucmVjdC53aWR0aCwgaW5mby5yZWN0LmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICBycy5hdHRhY2hSZXNpemVFdmVudCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHcsIGg7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaCA9IGVsZW1lbnQucGFyZW50KClbMF0ub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3ID0gZWxlbWVudC5wYXJlbnQoKVswXS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFJTIGZpcmVkOiAke3d9IHggJHtofWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaCAmJiAhaXNOYU4oaCkgJiYgaCAhPT0gZWxlbWVudFswXS5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNpemUoZWxlbWVudCwgdywgaCArIG9mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBzY29wZS4kb24oJyRkZXN0cm95JywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcnMuZGV0YWNoUmVzaXplRXZlbnQoKTtcclxuICAgICAgICAgICAgICAgIHJzLnF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVTaXplIChlbCwgdywgaCkge1xyXG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyKCdzdHlsZScpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAnd2lkdGgnOiB3ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICdoZWlnaHQnOiBoICsgJ3B4J1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaXNBdHRhY2hlZCAoZWxlbSwgY291bnQgPSAwKSB7XHJcbiAgICAgICAgICAgIGxldCBlbGVtUmVjdDtcclxuICAgICAgICAgICAgcmV0dXJuICRxKChyZXNvbHZlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkdGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbVJlY3QgPSBlbGVtWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGVsZW1SZWN0LndpZHRoICYmIGVsZW1SZWN0LmhlaWdodCkgfHwgY291bnQgPiAxMDAwMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh7cmVjdDogZWxlbVJlY3QsIGNvdW50OiBjb3VudH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgJ0VsZW1lbnQgbm90IGluIERPTSB5ZXQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb3VudCA8IDEwMDAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXNBdHRhY2hlZChlbGVtLCBjb3VudCArIDEwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWN0OiB7d2lkdGg6IDAsIGhlaWdodDogMH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNvdW50XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9kaXJlY3RpdmVzL3Jlc2l6ZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc2OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vY29sb3ItZGVmLXNlcnZpY2UuanNcIjogNzcwLFxuXHRcIi4vZGF0ZS11dGlscy1wcm92aWRlci5qc1wiOiA3NzEsXG5cdFwiLi9kb3VibGUtc2VydmljZS5qc1wiOiA3NzIsXG5cdFwiLi9ldmVudC1lbWl0dGVyLXNlcnZpY2UuanNcIjogNzczLFxuXHRcIi4vcmVzaXplLXNlbnNvci5qc1wiOiA3NzQsXG5cdFwiLi9zbGFzaC1wYXJhbS1zZXJpYWxpemVyLmpzXCI6IDc3NSxcblx0XCIuL3N0b3JhZ2UtcHJvdmlkZXIuanNcIjogNzc2XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gNzY5O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzIC4rXFwuanMkXG4vLyBtb2R1bGUgaWQgPSA3Njlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgcGFzdG9yIG9uIDgvMjEvMjAxNi5cclxuICogU2ltcGxlIHNlcnZpY2UgdG8gZ2V0IGNzcy1mb3JtYXR0ZWQgY29sb3JzIGZyb20gbWRUaGVtaW5nIGFuZCBtZENvbG9yUGFsZXR0ZSdzXHJcbiAqIFZhbGlkIHN0cmluZyBmb3JtYXRzOlxyXG4gKiAncGFsZXR0ZTo6bGlnaHQtYmx1ZTo6QTIwMCdcclxuICogJ3BhbGV0dGU6OnJlZDo6MjAwJ1xyXG4gKiAnY3VzdG9tVGhlbWU6OnByaW1hcnknXHJcbiAqICdjdXN0b21UaGVtZTo6cHJpbWFyeTo6aHVlLTInXHJcbiAqICd3YXJuJ1xyXG4gKiAnYWNjZW50OjpodWUtMidcclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuc2VydmljZSgnJGNvbG9yZGVmJywgY29sb3JEZWZTZXJ2aWNlKTtcclxuICAgIGNvbG9yRGVmU2VydmljZS4kaW5qZWN0ID0gWyckbWRUaGVtaW5nJywgJyRtZENvbG9yUGFsZXR0ZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGNvbG9yRGVmU2VydmljZSgkbWRUaGVtaW5nLCAkbWRDb2xvclBhbGV0dGUpIHtcclxuICAgICAgICBjb25zdCBpbnRlbnRpb25zID0gWydwcmltYXJ5JywgJ2FjY2VudCcsICd3YXJuJywgJ2JhY2tncm91bmQnXTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRSR0IgPSAoZGVmU3RyaW5nKSA9PiB7XHJcbiAgICAgICAgICAgIGRlZlN0cmluZyA9IGRlZlN0cmluZyB8fCAncHJpbWFyeSc7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlZkFycmF5ID0gZGVmU3RyaW5nLnNwbGl0KCc6OicpO1xyXG4gICAgICAgICAgICBjb25zdCBjb2xvckRlZiA9IHt9O1xyXG4gICAgICAgICAgICBsZXQgaW50ZW50O1xyXG5cclxuICAgICAgICAgICAgaWYgKGRlZkFycmF5WzBdID09PSAncGFsZXR0ZScpIHtcclxuICAgICAgICAgICAgICAgIGNvbG9yRGVmLnBhbGV0dGUgPSBkZWZBcnJheVsxXTtcclxuICAgICAgICAgICAgICAgIGNvbG9yRGVmLnZhcmlhbnQgPSBkZWZBcnJheVsyXTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpbnRlbnRpb25zLmluZGV4T2YoZGVmQXJyYXlbMF0pID4gLTEpIHsgLy9kZWZBcnJheVswXSAhPT0gJ2RlZmF1bHQnIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgZGVmQXJyYXkudW5zaGlmdCgnZGVmYXVsdCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKCFkZWZBcnJheVsyXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZkFycmF5WzJdID0gJ2RlZmF1bHQnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaW50ZW50ID0gJG1kVGhlbWluZy5USEVNRVNbZGVmQXJyYXlbMF1dLmNvbG9yc1tkZWZBcnJheVsxXV07XHJcbiAgICAgICAgICAgICAgICBjb2xvckRlZi5wYWxldHRlID0gaW50ZW50Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb2xvckRlZi52YXJpYW50ID0gaW50ZW50Lmh1ZXNbZGVmQXJyYXlbMl1dO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiAkbWRDb2xvclBhbGV0dGVbY29sb3JEZWYucGFsZXR0ZV1bY29sb3JEZWYudmFyaWFudF0udmFsdWU7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdldENvbG9yID0gKGRlZlN0cmluZywgb3BhY2l0eSA9IDEpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcmVzQ29sb3IgPSB0aGlzLmdldFJHQihkZWZTdHJpbmcpO1xyXG4gICAgICAgICAgICByZXR1cm4gYHJnYmEoJHtyZXNDb2xvci5qb2luKCcsICcpfSwgJHtvcGFjaXR5fSlgO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5udW1Ub0NvbG9yID0gKG51bSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5udW1Ub1JnYmEobnVtKS5tYXAoKHJnYmEpID0+IHRoaXMucmdiYVRvQ1NTKHJnYmEpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMubnVtVG9SZ2JhID0gKG51bSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIW51bSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gW1swLCAwLCAwLCAwLjEyXSwgWzAsIDAsIDAsIDAuNzhdXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHNoYWRlcyA9IFs1MDAsIDQwMCwgNjAwLCAzMDAsIDcwMF07XHJcbiAgICAgICAgICAgIGNvbnN0IHBhbGV0dGVzID0gT2JqZWN0LmtleXMoJG1kQ29sb3JQYWxldHRlKTtcclxuICAgICAgICAgICAgY29uc3QgY29kZSA9IG51bS50b1N0cmluZygxMCkucGFkU3RhcnQoNSwgJzAnKTtcclxuICAgICAgICAgICAgY29uc3QgbWFpbiA9IHBhbGV0dGVzW3BhcnNlSW50KGNvZGUuc2xpY2UoLTIpKSAlIHBhbGV0dGVzLmxlbmd0aF07XHJcbiAgICAgICAgICAgIGNvbnN0IHNoYWRlID0gc2hhZGVzW3BhcnNlSW50KGNvZGUuc2xpY2UoMCwgLTIpKSAlIHNoYWRlcy5sZW5ndGhdLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBbJG1kQ29sb3JQYWxldHRlW21haW5dW3NoYWRlXS52YWx1ZS5jb25jYXQoWzFdKSwgJG1kQ29sb3JQYWxldHRlW21haW5dW3NoYWRlXS5jb250cmFzdC5zbGljZSgpXVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5yZ2JhVG9DU1MgPSAoYXJyKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBgcmdiYSgke2Fyci5qb2luKCl9KWBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9jb2xvci1kZWYtc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLnByb3ZpZGVyKCdkYXRlVXRpbHMnLCBkYXRlVXRpbHNQcm92aWRlcik7XHJcbiAgICBkYXRlVXRpbHNQcm92aWRlci4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gZGF0ZVV0aWxzUHJvdmlkZXIoKSB7XHJcbiAgICAgICAgY29uc3QgX2RhdGVSZWdFeHAgPSB7XHJcbiAgICAgICAgICAgIGh1bWFuRGF0ZTogL15cXGQrKFsuXFwtXFwvXFxcXF0pXFxkK1suXFwtXFwvXFxcXF1cXGQrJC8sXHJcbiAgICAgICAgICAgIG1vbnRoRGF0ZTogL15bQS1aYS16XStbXFxzXFwtXycuXStcXGR7Miw0fSQvLFxyXG4gICAgICAgICAgICBkb3RuZXREYXRlOiAvXFwvRGF0ZVxcKFtcXGRcXC1dK1xcKVxcLy8sXHJcbiAgICAgICAgICAgIHVuaXhEYXRlOiAvXlxcZHsxMyx9JC8sXHJcbiAgICAgICAgICAgIGlzb0RhdGU6IC9eXFxkezR9LVxcZHsyfS1cXGR7Mn1ULiokL1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgX2RhdGVGb3JtYXQgPSB7XHJcbiAgICAgICAgICAgIGh1bWFuRGF0ZTogWydERC5NTS5ZWVlZJywgJ0RELk1NLllZJywgJ0RELU1NLVlZWVknLCAnWVlZWS1NTS1ERCcsICdERC1NTS1ZWScsICdNTS9ERC9ZWScsICdNTS9ERC9ZWVlZJ10sXHJcbiAgICAgICAgICAgIG1vbnRoRGF0ZTogWydNTU0gWVlZWScsICdNTU0gWVknLCAnTU1NTSBZWVlZJywgJ01NLllZJywgJ01NL1lZJywgJ01NLllZWVknLCAnTU0vWVlZWSddXHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgX2luc3RhbmNlID0gbnVsbDtcclxuXHJcbiAgICAgICAgY2xhc3MgQVBEYXRlVXRpbHMge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0ZVJlZ0V4cCA9IF9kYXRlUmVnRXhwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZGF0ZUZvcm1hdCA9IF9kYXRlRm9ybWF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBkYXRlUmVnRXhwKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZVJlZ0V4cFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBkYXRlRm9ybWF0KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZGF0ZUZvcm1hdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBub3coKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQoKS5zdGFydE9mKCdEJykudG9EYXRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgcHJldk1vbnRoKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KCkuc3VidHJhY3QoMSwgJ00nKS5zdGFydE9mKCdEJykudG9EYXRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbmV4dE1vbnRoKCl7XHJcbiAgICAgICAgICAgICAgICBtb21lbnQoKS5hZGQoMSwgJ00nKS5zdGFydE9mKCdEJykudG9EYXRlKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgcHJldlllYXIoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQoKS5zdWJ0cmFjdCgxLCAnWScpLnN0YXJ0T2YoJ0QnKS50b0RhdGUoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBuZXh0WWVhcigpe1xyXG4gICAgICAgICAgICAgICAgbW9tZW50KCkuYWRkKDEsICdZJykuc3RhcnRPZignRCcpLnRvRGF0ZSgpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXJ0T2ZNb250aChtb250aCA9IG5ldyBEYXRlKCkuZ2V0TW9udGgoKSwgeWVhciA9IG5ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKSwgZGF0ZSA9IG5ldyBEYXRlKCkpe1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vbnRoIGluc3RhbmNlb2YgRGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1vbWVudCh0aGlzLnV0Y0FzTG9jYWwobW9udGgpKS5zdGFydE9mKCdNJykuc3RhcnRPZignRCcpLnRvRGF0ZSgpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9tZW50KFt5ZWFyLCBtb250aCwgMTVdKS5zdGFydE9mKCdNJykuc3RhcnRPZignRCcpLnRvRGF0ZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZW5kT2ZNb250aCAobW9udGggPSBuZXcgRGF0ZSgpLmdldE1vbnRoKCksIHllYXIgPSBuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCksIGRhdGUgPSBuZXcgRGF0ZSgpKXtcclxuICAgICAgICAgICAgICAgIGlmIChtb250aCBpbnN0YW5jZW9mIERhdGUpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQodGhpcy51dGNBc0xvY2FsKG1vbnRoKSkuZW5kT2YoJ00nKS5zdGFydE9mKCdEJykudG9EYXRlKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBtb21lbnQoW3llYXIsIG1vbnRoLCAxNV0pLmVuZE9mKCdNJykuc3RhcnRPZignRCcpLnRvRGF0ZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcGFyc2VEYXRlKGlucHV0KSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgb3V0cHV0ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlucHV0KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mKGlucHV0KSA9PT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGVSZWdFeHAuaHVtYW5EYXRlLnRlc3QoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbWVudChpbnB1dCwgdGhpcy5kYXRlRm9ybWF0Lmh1bWFuRGF0ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0ZVJlZ0V4cC5tb250aERhdGUudGVzdChpbnB1dCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBvdXRwdXQgPSBtb21lbnQoaW5wdXQucmVwbGFjZSgvW15BLVphLXowLTldL2csICcgJykucmVwbGFjZSgvXFxzKy9nLCAnICcpLnRyaW0oKSwgdGhpcy5kYXRlRm9ybWF0Lm1vbnRoRGF0ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0ZVJlZ0V4cC51bml4RGF0ZS50ZXN0KGlucHV0KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dHB1dCA9IG1vbWVudChwYXJzZUludChpbnB1dCkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuZGF0ZVJlZ0V4cC5kb3RuZXREYXRlLnRlc3QoaW5wdXQpIHx8IHRoaXMuZGF0ZVJlZ0V4cC5pc29EYXRlLnRlc3QoaW5wdXQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gbW9tZW50KGlucHV0KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGlucHV0IGluc3RhbmNlb2YgRGF0ZSB8fCB0aGlzLmRhdGVSZWdFeHAudW5peERhdGUudGVzdChpbnB1dC50b1N0cmluZygpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ID0gbW9tZW50KGlucHV0KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3V0cHV0ICYmIG91dHB1dC5pc1ZhbGlkKCkgJiYgb3V0cHV0LnRvRGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZvcm1hdERhdGUoZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0ZSA/IG1vbWVudChkYXRlKS5mb3JtYXQoJ0RELk1NLllZJykgOiAnJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldEZvcm1hdChkYXRlU3RyaW5nID0gJycpe1xyXG4gICAgICAgICAgICAgICAgZGF0ZVN0cmluZyA9IGRhdGVTdHJpbmcudHJpbSgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZm9ybWF0cyA9IHRoaXMuZGF0ZVJlZ0V4cC5odW1hbkRhdGUudGVzdChkYXRlU3RyaW5nKSA/IHRoaXMuZGF0ZUZvcm1hdC5odW1hbkRhdGUgOiB0aGlzLmRhdGVGb3JtYXQubW9udGhEYXRlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1hdHMuZmluZCgoaXRlbSkgPT4gZGF0ZVN0cmluZy5sZW5ndGggPT09IGl0ZW0ubGVuZ3RoICYmIG1vbWVudChkYXRlU3RyaW5nLCBpdGVtLCB0cnVlKS5pc1ZhbGlkKCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZpbmRNb250aE5hbWUocGFydCwgZm9ybWF0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtZGF0ZSA9IG1vbWVudChbMjAwMCwgMCwgMV0pO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbW9udGhGb3JtYXQgPSBmb3JtYXQucmVwbGFjZSgvW15NXS9nLCcnKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTI7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1vbnRoTmFtZSA9IG1kYXRlLmZvcm1hdChtb250aEZvcm1hdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG1vbnRoTmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgocGFydC50b0xvd2VyQ2FzZSgpKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtb250aE5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIG1kYXRlLmFkZCgxLCAnbW9udGgnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxvY2FsQXNVdGMoZGF0ZSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eiA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRkYXRlID0gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0ZS5nZXRIb3VycygpID09PSAwICYmIHR6ICE9PSAwKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodHogPiAwKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGRhdGUuc2V0TWludXRlcygtMSAqIHR6KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZGF0ZS5zZXRIb3Vycyh0aGlzLmdldFRaSG91cnMoZGF0ZSkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0ZGF0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB1dGNBc0xvY2FsKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGUuZ2V0SG91cnMoKSAhPT0gMCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSwgZGF0ZS5nZXRVVENNb250aCgpLCBkYXRlLmdldFVUQ0RhdGUoKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERhdGUoZGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0VFpIb3VycyhkYXRlKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR6ID0gZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHR6ID4gMCA/IDI0IC0gTWF0aC5jZWlsKHR6IC8gNjApIDogTWF0aC5mbG9vcihNYXRoLmFicyh0eikgLyA2MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2FtZURhdGUoZGF0ZUEsIGRhdGVCKXtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGVBLmdldEZ1bGxZZWFyKCkgPT09IGRhdGVCLmdldEZ1bGxZZWFyKCkgJiZcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0ZUEuZ2V0TW9udGgoKSA9PT0gZGF0ZUIuZ2V0TW9udGgoKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRlQS5nZXREYXRlKCkgPT09IGRhdGVCLmdldERhdGUoKTtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtYXhEYXRlKC4uLmRhdGVzKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkRGF0ZXMgPSBkYXRlcy5maWx0ZXIoKGQpID0+ICEhZCAmJiBkIGluc3RhbmNlb2YgRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsaWREYXRlcy5sZW5ndGggPyB2YWxpZERhdGVzLnJlZHVjZSgocmVzLCBkYXRlKSA9PiBkYXRlID49IHJlcyA/IGRhdGUgOiByZXMsIG5ldyBEYXRlKG51bGwpKSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWluRGF0ZSguLi5kYXRlcyl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZERhdGVzID0gZGF0ZXMuZmlsdGVyKChkKSA9PiAhIWQgJiYgZCBpbnN0YW5jZW9mIERhdGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkRGF0ZXMubGVuZ3RoID8gdmFsaWREYXRlcy5yZWR1Y2UoKHJlcywgZGF0ZSkgPT4gZGF0ZSA8PSByZXMgPyBkYXRlIDogcmVzLCBuZXcgRGF0ZSgpKSA6IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXNXZWVrZW5kKGRhdGUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF5TnVtID0gZGF0ZS5nZXREYXkoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBkYXlOdW0gPT09IDAgfHwgZGF5TnVtID09PSA2O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldERhdGVGaWx0ZXIoc3RhcnQsIGVuZCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKGQpID0+ICghc3RhcnQgfHwgIXN0YXJ0LmdldFRpbWUgfHwgZC5nZXRUaW1lKCkgPj0gc3RhcnQuZ2V0VGltZSgpKSAmJiAoIWVuZCB8fCAhZW5kLmdldFRpbWUgfHwgZC5nZXRUaW1lKCkgPD0gZW5kLmdldFRpbWUoKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXREYXRlQXJyYXkoc3RhcnQsIGVuZCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZCA9IG1vbWVudC5pc01vbWVudChzdGFydCkgPyBzdGFydCA6IG1vbWVudChzdGFydCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlZCA9IG1vbWVudC5pc01vbWVudChlbmQpID8gZW5kIDogbW9tZW50KGVuZCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNbcmVzLmxlbmd0aF0gPSBzZC50b0RhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICBzZC5hZGQoMSwgJ2QnKTtcclxuICAgICAgICAgICAgICAgIH0gd2hpbGUgKHNkLmlzU2FtZU9yQmVmb3JlKGVkKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybU9iamVjdChvYmosIGlzU3JjTG9jYWwpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlciA9IGlzU3JjTG9jYWwgPyB0aGlzLmxvY2FsQXNVdGMuYmluZCh0aGlzKSA6IHRoaXMudXRjQXNMb2NhbC5iaW5kKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFvYmope1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Yob2JqKSA9PT0gJ3N0cmluZycpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZShvYmopO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkodGhpcy50cmFuc2Zvcm1PYmplY3QocmVzdWx0LCBpc1NyY0xvY2FsKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucGFyc2VEYXRlKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQgPyBoYW5kbGVyKHJlc3VsdCkgOiBvYmo7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0ZSA9IHRoaXMucGFyc2VEYXRlKG9iaik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRhdGUgPyBoYW5kbGVyKGRhdGUpIDogb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqLm1hcCgoaXRlbSkgPT4gdGhpcy50cmFuc2Zvcm1PYmplY3QoaXRlbSwgaXNTcmNMb2NhbCkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2Yob2JqKSA9PT0gJ29iamVjdCcpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmopLnJlZHVjZSgocmVzLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzW2tleV0gPSB0aGlzLnRyYW5zZm9ybU9iamVjdChvYmpba2V5XSwgaXNTcmNMb2NhbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwge30pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBfaW5zdGFuY2UgPSBuZXcgQVBEYXRlVXRpbHMoKTtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XHJcbiAgICAgICAgICAgIHV0aWxzOiB7XHJcbiAgICAgICAgICAgICAgICBnZXQ6ICgpID0+IF9pbnN0YW5jZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy4kZ2V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBfaW5zdGFuY2U7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9kYXRlLXV0aWxzLXByb3ZpZGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuc2VydmljZSgnJGRvdWJsZScsIGRvdWJsZVNlcnZpY2UpO1xyXG4gICAgZG91YmxlU2VydmljZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gZG91YmxlU2VydmljZSgpe1xyXG4gICAgICAgIHRoaXMuZG91YmxlVG9Mb25nQml0cyA9IChudW1iZXIsIHByZWNpc2lvbkJpdHMgPSAyMywgZXhwb25lbnRCaXRzID0gOCkgPT4ge1xyXG4gICAgICAgICAgICB2YXIgYmlhcyA9IE1hdGgucG93KDIsIGV4cG9uZW50Qml0cyAtIDEpIC0gMSwgbWluRXhwID0gLWJpYXMgKyAxLCBtYXhFeHAgPSBiaWFzLCBtaW5Vbm5vcm1FeHAgPSBtaW5FeHAgLSBwcmVjaXNpb25CaXRzLFxyXG4gICAgICAgICAgICAgICAgc3RhdHVzID0gaXNOYU4obiA9IHBhcnNlRmxvYXQobnVtYmVyKSkgfHwgIU51bWJlci5pc0Zpbml0ZShuKSA/IG4gOiAwLFxyXG4gICAgICAgICAgICAgICAgZXhwID0gMCwgbGVuID0gMiAqIGJpYXMgKyAxICsgcHJlY2lzaW9uQml0cyArIDMsIGJpbiA9IG5ldyBBcnJheShsZW4pLFxyXG4gICAgICAgICAgICAgICAgc2lnbmFsID0gKG4gPSBzdGF0dXMgIT09IDAgPyAwIDogbikgPCAwLCBuID0gTWF0aC5hYnMobiksIGludFBhcnQgPSBNYXRoLmZsb29yKG4pLCBmbG9hdFBhcnQgPSBuIC0gaW50UGFydCxcclxuICAgICAgICAgICAgICAgIGksIGxhc3RCaXQsIHJvdW5kZWQsIGosIHJlc3VsdDtcclxuICAgICAgICAgICAgZm9yKGkgPSBsZW47IGk7IGJpblstLWldID0gMCk7XHJcbiAgICAgICAgICAgIGZvcihpID0gYmlhcyArIDI7IGludFBhcnQgJiYgaTsgYmluWy0taV0gPSBpbnRQYXJ0ICUgMiwgaW50UGFydCA9IE1hdGguZmxvb3IoaW50UGFydCAvIDIpKTtcclxuICAgICAgICAgICAgZm9yKGkgPSBiaWFzICsgMTsgZmxvYXRQYXJ0ID4gMCAmJiBpOyAoYmluWysraV0gPSAoKGZsb2F0UGFydCAqPSAyKSA+PSAxKSAtIDApICYmIC0tZmxvYXRQYXJ0KTtcclxuICAgICAgICAgICAgZm9yKGkgPSAtMTsgKytpIDwgbGVuICYmICFiaW5baV07KTtcclxuICAgICAgICAgICAgaWYoYmluWyhsYXN0Qml0ID0gcHJlY2lzaW9uQml0cyAtIDEgKyAoaSA9IChleHAgPSBiaWFzICsgMSAtIGkpID49IG1pbkV4cCAmJiBleHAgPD0gbWF4RXhwID8gaSArIDEgOiBiaWFzICsgMSAtIChleHAgPSBtaW5FeHAgLSAxKSkpICsgMV0pe1xyXG4gICAgICAgICAgICAgICAgaWYoIShyb3VuZGVkID0gYmluW2xhc3RCaXRdKSlcclxuICAgICAgICAgICAgICAgICAgICBmb3IoaiA9IGxhc3RCaXQgKyAyOyAhcm91bmRlZCAmJiBqIDwgbGVuOyByb3VuZGVkID0gYmluW2orK10pO1xyXG4gICAgICAgICAgICAgICAgZm9yKGogPSBsYXN0Qml0ICsgMTsgcm91bmRlZCAmJiAtLWogPj0gMDsgKGJpbltqXSA9ICFiaW5bal0gLSAwKSAmJiAocm91bmRlZCA9IDApKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBmb3IoaSA9IGkgLSAyIDwgMCA/IC0xIDogaSAtIDM7ICsraSA8IGxlbiAmJiAhYmluW2ldOyk7XHJcblxyXG4gICAgICAgICAgICAoZXhwID0gYmlhcyArIDEgLSBpKSA+PSBtaW5FeHAgJiYgZXhwIDw9IG1heEV4cCA/ICsraSA6IGV4cCA8IG1pbkV4cCAmJlxyXG4gICAgICAgICAgICAgICAgKGV4cCAhPT0gYmlhcyArIDEgLSBsZW4gJiYgZXhwIDwgbWluVW5ub3JtRXhwICYmIHRoaXMud2FybihcImVuY29kZUZsb2F0OjpmbG9hdCB1bmRlcmZsb3dcIiksIGkgPSBiaWFzICsgMSAtIChleHAgPSBtaW5FeHAgLSAxKSk7XHJcbiAgICAgICAgICAgIChpbnRQYXJ0IHx8IHN0YXR1cyAhPT0gMCkgJiYgKHRoaXMud2FybihpbnRQYXJ0ID8gXCJlbmNvZGVGbG9hdDo6ZmxvYXQgb3ZlcmZsb3dcIiA6IFwiZW5jb2RlRmxvYXQ6OlwiICsgc3RhdHVzKSxcclxuICAgICAgICAgICAgICAgIGV4cCA9IG1heEV4cCArIDEsIGkgPSBiaWFzICsgMiwgc3RhdHVzID09PSAtSW5maW5pdHkgPyBzaWduYWwgPSAxIDogaXNOYU4oc3RhdHVzKSAmJiAoYmluW2ldID0gMSkpO1xyXG4gICAgICAgICAgICBmb3IobiA9IE1hdGguYWJzKGV4cCArIGJpYXMpLCBqID0gZXhwb25lbnRCaXRzICsgMSwgcmVzdWx0ID0gXCJcIjsgLS1qOyByZXN1bHQgPSAobiAlIDIpICsgcmVzdWx0LCBuID0gbiA+Pj0gMSk7XHJcbiAgICAgICAgICAgIGZvcihuID0gMCwgaiA9IDAsIGkgPSAocmVzdWx0ID0gKHNpZ25hbCA/IFwiMVwiIDogXCIwXCIpICsgcmVzdWx0ICsgYmluLnNsaWNlKGksIGkgKyBwcmVjaXNpb25CaXRzKS5qb2luKFwiXCIpKS5sZW5ndGgsIHIgPSBbXTtcclxuICAgICAgICAgICAgICAgIGk7IG4gKz0gKDEgPDwgaikgKiByZXN1bHQuY2hhckF0KC0taSksIGogPT09IDcgJiYgKHJbci5sZW5ndGhdID0gbiwgbiA9IDApLCBqID0gKGogKyAxKSAlIDgpO1xyXG4gICAgICAgICAgICByW3IubGVuZ3RoXSA9IG4gfHwgMDtcclxuICAgICAgICAgICAgci5yZXZlcnNlKCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUludChyLm1hcCh2ID0+IHYudG9TdHJpbmcoMikucGFkU3RhcnQoOCwgJzAnKSkuam9pbignJyksIDIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9kb3VibGUtc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzcyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHVzZXIgb24gMDcuMDIuMjAxOC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLnNlcnZpY2UoJyRhcGVlJywgZXZlbnRFbWl0dGVyU2VydmljZSk7XHJcbiAgICBldmVudEVtaXR0ZXJTZXJ2aWNlLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiBldmVudEVtaXR0ZXJTZXJ2aWNlKCl7XHJcbiAgICAgICAgY29uc3Qgcm9vbXMgPSBbXTtcclxuXHJcbiAgICAgICAgY2xhc3MgQVBFdmVudEVtaXR0ZXIge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciAoaWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaWQgPSBpZCB8fCBnZW5lcmF0ZUlkKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vbmVUaW1lcnMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb24odHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuZXJzW3R5cGVdLnB1c2goY2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uY2UodHlwZSwgY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25lVGltZXJzLnB1c2goe3R5cGUsIGNhbGxiYWNrfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb2ZmKHR5cGUsIGNhbGxiYWNrKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoISh0eXBlIGluIHRoaXMubGlzdGVuZXJzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGVuID0gdGhpcy5saXN0ZW5lcnNbdHlwZV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxpc3RlbmVyc1t0eXBlXVtpXSAhPT0gY2FsbGJhY2spIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0ucHVzaChjYWxsYmFjayk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbdHlwZV0uc3BsaWNlKDAsIGxlbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm9uZVRpbWVycyA9IHRoaXMub25lVGltZXJzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50eXBlICE9PSB0eXBlICYmIGl0ZW0uY2FsbGJhY2sgIT09IGNhbGxiYWNrKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbWl0KHR5cGUsIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlmICghKHR5cGUgaW4gdGhpcy5saXN0ZW5lcnMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFjayA9IHRoaXMubGlzdGVuZXJzW3R5cGVdO1xyXG4gICAgICAgICAgICAgICAgc3RhY2suZm9yRWFjaCgoY2IpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjYi5jYWxsKHRoaXMsIGRhdGEpXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMub25lVGltZXJzID0gdGhpcy5vbmVUaW1lcnMuZmlsdGVyKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gdHlwZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uY2FsbGJhY2suY2FsbCh0aGlzLCBkYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlbW92ZUFsbExpc3RlbmVycygpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGlkKSA9PiB7XHJcbiAgICAgICAgICAgIGxldCBpZHggPSByb29tcy5maW5kSW5kZXgoKGVlKSA9PiBlZS5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoaWR4ID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgcm9vbXMucHVzaChuZXcgQVBFdmVudEVtaXR0ZXIoaWQpKTtcclxuICAgICAgICAgICAgICAgIGlkeCA9IHJvb21zLmxlbmd0aCAtIDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gcm9vbXNbaWR4XVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5kZXN0cm95SW5zdGFuY2UgPSAoaWQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWR4ID0gcm9vbXMuZmluZEluZGV4KChlZSkgPT4gZWUuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICByb29tcy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5lZSA9IG5ldyBBUEV2ZW50RW1pdHRlcignc3ZjJyk7XHJcblxyXG4gICAgICAgIHRoaXMuQVBFdmVudEVtaXR0ZXIgPSBBUEV2ZW50RW1pdHRlcjtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2VuZXJhdGVJZChsZW4gPSA4KSB7XHJcbiAgICAgICAgICAgIGxldCBpZCA9ICcnO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgKytpKSB7XHJcbiAgICAgICAgICAgICAgICBpZCArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzNikudG9TdHJpbmcoMzYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBpZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvc2VydmljZXMvZXZlbnQtZW1pdHRlci1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiogQ3JlYXRlZCBieSB1c2VyIG9uIDA1LjEwLjIwMTYuXHJcbiovXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuc2VydmljZSgncmVzaXplU2Vuc29yJywgcmVzaXplU2Vuc29yU2VydmljZSk7XHJcblxyXG4gICAgcmVzaXplU2Vuc29yU2VydmljZS4kaW5qZWN0ID0gWyckd2luZG93JywgJyR0aW1lb3V0J107XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzaXplU2Vuc29yU2VydmljZSgkd2luZG93LCAkdGltZW91dCkge1xyXG4gICAgICAgIC8vIE9ubHkgdXNlZCBmb3IgdGhlIGRpcnR5IGNoZWNraW5nLCBzbyB0aGUgZXZlbnQgY2FsbGJhY2sgY291bnQgaXMgbGltdGVkIHRvIG1heCAxIGNhbGwgcGVyIGZwcyBwZXIgc2Vuc29yLlxyXG4gICAgICAgIC8vIEluIGNvbWJpbmF0aW9uIHdpdGggdGhlIGV2ZW50IGJhc2VkIHJlc2l6ZSBzZW5zb3IgdGhpcyBzYXZlcyBjcHUgdGltZSwgYmVjYXVzZSB0aGUgc2Vuc29yIGlzIHRvbyBmYXN0IGFuZFxyXG4gICAgICAgIC8vIHdvdWxkIGdlbmVyYXRlIHRvbyBtYW55IHVubmVjZXNzYXJ5IGV2ZW50cy5cclxuICAgICAgICBjb25zdCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSAkd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICAkd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICAkd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxyXG4gICAgICAgICAgICBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkdGltZW91dChmbiwgMjApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBjbGFzcyBFdmVudFF1ZXVlIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IgKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xID0gW107XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGxlbmd0aCAoKSB7cmV0dXJuIHRoaXMucS5sZW5ndGh9XHJcbiAgICAgICAgICAgIGFkZCAoZXYpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucS5wdXNoKGV2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYWxsICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucS5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jYWxsKCk7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJlbW92ZSAoZXYpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJlZCA9IHRoaXMucS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGV2KTtcclxuICAgICAgICAgICAgICAgIHRoaXMucS5zcGxpY2UoMCwgdGhpcy5xLmxlbmd0aCwgLi4uZmlsdGVyZWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGZsdXNoICgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucS5zcGxpY2UoMCwgdGhpcy5xLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsYXNzIFJlc2l6ZVNlbnNvciB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYXNlU3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IDAsICd0b3AnOiAwLCAncmlnaHQnOiAwLCAnYm90dG9tJzogMCxcclxuICAgICAgICAgICAgICAgICAgICAnb3ZlcmZsb3cnOiAnaGlkZGVuJyxcclxuICAgICAgICAgICAgICAgICAgICAnei1pbmRleCc6IC0xLFxyXG4gICAgICAgICAgICAgICAgICAgICd2aXNpYmlsaXR5JzogJ2hpZGRlbidcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZFN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICdwb3NpdGlvbic6ICdhYnNvbHV0ZScsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xlZnQnOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICd0b3AnOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgICd0cmFuc2l0aW9uJzogJ2FsbCAwcydcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZSA9IG5ldyBFdmVudFF1ZXVlKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZENoaWxkID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PicpLmNzcyhjaGlsZFN0eWxlKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hyaW5rQ2hpbGQgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+JykuY3NzKGFuZ3VsYXIuZXh0ZW5kKHt9LCBjaGlsZFN0eWxlLCB7d2lkdGg6ICcyMDAlJywgaGVpZ2h0OiAnMjAwJSd9KSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZCA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdj4nKS5hZGRDbGFzcyhcInJlc2l6ZS1zZW5zb3ItZXhwYW5kXCIpLmNzcyhiYXNlU3R5bGUpLmFwcGVuZCh0aGlzLmV4cGFuZENoaWxkKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hyaW5rID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2PicpLmFkZENsYXNzKFwicmVzaXplLXNlbnNvci1zaHJpbmtcIikuY3NzKGJhc2VTdHlsZSkuYXBwZW5kKHRoaXMuc2hyaW5rQ2hpbGQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZW5zb3IgPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXY+JykuYWRkQ2xhc3MoJ3Jlc2l6ZS1zZW5zb3InKS5jc3MoYmFzZVN0eWxlKS5hcHBlbmQodGhpcy5leHBhbmQpLmFwcGVuZCh0aGlzLnNocmluayk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpcnR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc2V0ICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5wYXNzaXZlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmRDaGlsZFswXS5zdHlsZS53aWR0aCA9IDEwMDAwMCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmRDaGlsZFswXS5zdHlsZS5oZWlnaHQgPSAxMDAwMDAgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kWzBdLnNjcm9sbExlZnQgPSAxMDAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmRbMF0uc2Nyb2xsVG9wID0gMTAwMDAwO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hyaW5rWzBdLnNjcm9sbExlZnQgPSAxMDAwMDA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaHJpbmtbMF0uc2Nyb2xsVG9wID0gMTAwMDAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkaXJ0eUNoZWNrICgpIHtcclxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5xdWV1ZSB8fCB0aGlzLnBhc3NpdmUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kaXJ0eSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVldWUuY2FsbCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGlydHkgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vZWxzZSBpZiAoZnJhbWUgJSAyMDAgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gICAgdGhpcy5vblNjcm9sbCgpO1xyXG4gICAgICAgICAgICAgICAgLy99XHJcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuZGlydHlDaGVjay5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgb25TY3JvbGwgKCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYWNoZWRXaWR0aCA9IHRoaXMuZWxlbWVudFswXS5vZmZzZXRXaWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FjaGVkSGVpZ2h0ID0gdGhpcy5lbGVtZW50WzBdLm9mZnNldEhlaWdodDtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNhY2hlZFdpZHRoICE9PSB0aGlzLmxhc3RXaWR0aCB8fCB0aGlzLmNhY2hlZEhlaWdodCAhPT0gdGhpcy5sYXN0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaXJ0eSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sYXN0V2lkdGggPSB0aGlzLmNhY2hlZFdpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdEhlaWdodCA9IHRoaXMuY2FjaGVkSGVpZ2h0O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTY3JvbGxFdmVudCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbdHlwZV1bMF0uYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3R5cGVdWzBdLmF0dGFjaEV2ZW50KCdvbnNjcm9sbCcsIHRoaXMub25TY3JvbGwuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdHlwZV1bMF0uYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZW1vdmVTY3JvbGxFdmVudCAodHlwZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbdHlwZV1bMF0uZGV0YWNoRXZlbnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzW3R5cGVdWzBdLmRldGFjaEV2ZW50KCdvbnNjcm9sbCcsIHRoaXMub25TY3JvbGwuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXNbdHlwZV1bMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYXR0YWNoUmVzaXplRXZlbnQgKGNiKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlLmFkZChjYik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NpdmUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQodGhpcy5zZW5zb3IpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKHRoaXMuZWxlbWVudFswXSwgJ3Bvc2l0aW9uJykgPT09ICdzdGF0aWMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50WzBdLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmRpcnR5Q2hlY2suYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNjcm9sbEV2ZW50KCdleHBhbmQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkU2Nyb2xsRXZlbnQoJ3NocmluaycpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXRhY2hSZXNpemVFdmVudCAoKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5xdWV1ZSAmJiB0aGlzLnF1ZXVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlLmZsdXNoKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhc3NpdmUgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVTY3JvbGxFdmVudCgnZXhwYW5kJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVNjcm9sbEV2ZW50KCdzaHJpbmsnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Vuc29yLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XHJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgcHJvcFxyXG4gICAgICAgICAqIEByZXR1cm5zIHtTdHJpbmd8TnVtYmVyfVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIGZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgcHJvcCkge1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5jdXJyZW50U3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LmN1cnJlbnRTdHlsZVtwcm9wXTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgkd2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnN0eWxlW3Byb3BdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSZXNpemVTZW5zb3IoZWxlbWVudCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcclxuXHJcblxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9yZXNpemUtc2Vuc29yLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5zZXJ2aWNlKCdzbGFzaFBhcmFtU2VyaWFsaXplcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBmdW5jdGlvbiBzZXJpYWxpemVWYWx1ZSh2KSB7XHJcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KHYpKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc0RhdGUodikgPyB2LnRvSVNPU3RyaW5nKCkgOiBhbmd1bGFyLnRvSnNvbih2KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBsZFBhcmFtU2VyaWFsaXplcihwYXJhbXMpIHtcclxuICAgICAgICAgICAgaWYgKCFwYXJhbXMpIHJldHVybiAnJztcclxuICAgICAgICAgICAgdmFyIHBhcnRzID0gW107XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaChrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJhbXNba2V5XSAmJiAhYW5ndWxhci5pc09iamVjdChwYXJhbXNba2V5XSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0udG9TdHJpbmcoKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8lMjAvZywgJysnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXC5cXCpcXCFcXH5cXChcXCldL2csICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcJVxcd3syfS9nLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2godmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gJy8nICsgcGFydHMuam9pbignLycpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9zZXJ2aWNlcy9zbGFzaC1wYXJhbS1zZXJpYWxpemVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3NzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgdXNlciBvbiAxMi4wNC4yMDE2LlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApIHtcclxuICAgIHZycC5jb25zdGFudCgnJGFwc3RvcmVDb25maWcnLCB7XHJcbiAgICAgICAgc3RvcmFnZVR5cGU6ICdsb2NhbFN0b3JhZ2UnXHJcbiAgICB9KTtcclxuICAgIHZycC5wcm92aWRlcignJGFwc3RvcmUnLCBbJyRhcHN0b3JlQ29uZmlnJywgZnVuY3Rpb24gKGNvbmZpZykge1xyXG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcclxuICAgICAgICAgICAgc3RvcmFnZVR5cGU6IHtcclxuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBjb25maWcuc3RvcmFnZVR5cGU7IH0sXHJcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7IGNvbmZpZy5zdG9yYWdlVHlwZSA9IHZhbHVlOyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdGhpcy4kZ2V0ID0gWyckYXBzdG9yZUNvbmZpZycsICckd2luZG93JywgJyRsb2cnLCBmdW5jdGlvbiAoY29uZmlnLCAkd2luZG93LCAkbG9nKSB7XHJcbiAgICAgICAgICAgIHZhciAkYXBzdG9yZSA9IHt9O1xyXG4gICAgICAgICAgICB2YXIgYmtwc3RvcmUgPSB7fTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGxvY2FsU3RvcmFnZSBvciBzZXNzaW9uU3RvcmFnZSBpcyBhdmFpbGFibGUgb3IgZW5hYmxlZFxyXG4gICAgICAgICAgICB2YXIgaXNTdG9yYWdlQXZhaWxhYmxlID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VwcG9ydGVkID0gY29uZmlnLnN0b3JhZ2VUeXBlIGluICR3aW5kb3cgJiYgJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdICE9PSBudWxsO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc3VwcG9ydGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrZXkgPSBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5zZXRJdGVtKGtleSwgJycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0ucmVtb3ZlSXRlbShrZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRlZDtcclxuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgICAgIGlmICghaXNTdG9yYWdlQXZhaWxhYmxlKSB7XHJcbiAgICAgICAgICAgICAgICAkbG9nLndhcm4oY29uZmlnLnN0b3JhZ2VUeXBlICsgJyBpcyBub3QgYXZhaWxhYmxlLicpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICRhcHN0b3JlLnNldFN0b3JhZ2VUeXBlID0gZnVuY3Rpb24odHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLnN0b3JhZ2VUeXBlID0gdHlwZTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUuZ2V0ID0gZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9ICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5nZXRJdGVtKGtleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChyZXN1bHQpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc0RhdGUocmVzdWx0KSkgcmV0dXJuIG5ldyBEYXRlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShyZXN1bHQpIHx8IGFuZ3VsYXIuaXNPYmplY3QocmVzdWx0KSkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhyZXN1bHQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBhbmd1bGFyLmZyb21Kc29uKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0ID0gYmtwc3RvcmVba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUuc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzT2JqZWN0KHZhbHVlKSB8fCBhbmd1bGFyLmlzQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gYW5ndWxhci50b0pzb24odmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLnNldEl0ZW0oa2V5LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBia3BzdG9yZVtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRhcHN0b3JlLnJlbW92ZSA9IGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzU3RvcmFnZUF2YWlsYWJsZSA/ICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5yZW1vdmVJdGVtKGtleSk6IGRlbGV0ZSBia3BzdG9yZVtrZXldO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkYXBzdG9yZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzU3RvcmFnZUF2YWlsYWJsZSA/ICR3aW5kb3dbY29uZmlnLnN0b3JhZ2VUeXBlXS5jbGVhcigpOiBia3BzdG9yZSA9IHt9O1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAkYXBzdG9yZS5rZXkgPSBmdW5jdGlvbihudW0pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpc1N0b3JhZ2VBdmFpbGFibGUgPyAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0ua2V5KG51bSk6IGJrcHN0b3JlW09iamVjdC5rZXlzKGJrcHN0b3JlKVtudW1dXTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgJGFwc3RvcmUuYWxsS2V5cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzU3RvcmFnZUF2YWlsYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ndGggPSAkd2luZG93W2NvbmZpZy5zdG9yYWdlVHlwZV0ubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzLnB1c2goJHdpbmRvd1tjb25maWcuc3RvcmFnZVR5cGVdLmtleShpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gT2JqZWN0LmtleXMoYmtwc3RvcmUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICRhcHN0b3JlLmZpbmRLZXlzID0gZnVuY3Rpb24ocmVnZXhwKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgYWxsX2tleXMgPSAkbHN0b3JlLmFsbEtleXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbGxfa2V5cy5maWx0ZXIoZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHJlZ2V4cC50ZXN0KHYpIH0pO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gJGFwc3RvcmU7XHJcbiAgICAgICAgfV07XHJcbiAgICB9XSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL3NlcnZpY2VzL3N0b3JhZ2UtcHJvdmlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc3NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYWxnby9iaWdudW1iZXItZmlsdGVyLmpzXCI6IDc3OCxcblx0XCIuL2FsZ28vZ2VuZXRpYy1mYWN0b3J5LmpzXCI6IDc3OSxcblx0XCIuL2FsZ28vcGVybXV0YXRpb24tc2VydmljZS5qc1wiOiA3ODAsXG5cdFwiLi9hbGdvL3BvaW50LWZhY3RvcnkuanNcIjogNzgxLFxuXHRcIi4vYWxnby9zaW0tYW5uZWFsLXNlcnZpY2UuanNcIjogNzgyLFxuXHRcIi4vYXBpL2FwaS1yZXF1ZXN0LXByb3ZpZGVyLmpzXCI6IDc4Myxcblx0XCIuL2FwaS9zbGFzaC1wYXJhbS1zZXJpYWxpemVyLmpzXCI6IDc4NCxcblx0XCIuL2FwaS90cGwtcXVlcnktc2VyaWFsaXplci5qc1wiOiA3ODUsXG5cdFwiLi9rLW1lYW4vay1tZWFuLWRpcmVjdGl2ZS5qc1wiOiA3ODYsXG5cdFwiLi9rLW1lYW4vay1tZWFuLXNlcnZpY2UuanNcIjogNzg4LFxuXHRcIi4vdHNwL3JvdXRlLWRyYXctZGlyZWN0aXZlLmpzXCI6IDc4OSxcblx0XCIuL3RzcC9yb3V0ZS1wbG90dGVyLXNlcnZpY2UuanNcIjogNzkxLFxuXHRcIi4vdnJwL3ZycC1kcmF3LWRpcmVjdGl2ZS5qc1wiOiA3OTIsXG5cdFwiLi92cnAvdnJwLXBsb3R0ZXItc2VydmljZS5qc1wiOiA3OTRcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSA3Nzc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cyAuK1xcLmpzJFxuLy8gbW9kdWxlIGlkID0gNzc3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5maWx0ZXIoJ2JpZ251bWJlcicsIGJpZ251bWJlckZpbHRlcik7XHJcbiAgICB2cnAuZmlsdGVyKCdwb3dudW1iZXInLCBwb3dudW1iZXJGaWx0ZXIpO1xyXG4gICAgZnVuY3Rpb24gYmlnbnVtYmVyRmlsdGVyKCl7XHJcbiAgICAgICAgcmV0dXJuICh2YWwpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG1hdGguZm9ybWF0KHZhbCwge2xvd2VyRXhwOiAtMzAwLCB1cHBlckV4cDogMzAwfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiBwb3dudW1iZXJGaWx0ZXIoKXtcclxuICAgICAgICByZXR1cm4gKHZhbCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwYXJ0cyA9IG1hdGguZm9ybWF0KHZhbCwge2xvd2VyRXhwOiAtMiwgdXBwZXJFeHA6IDIsIHByZWNpc2lvbjogM30pLnNwbGl0KCdlKycpO1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJ34nICsgcGFydHNbMF07XHJcbiAgICAgICAgICAgIGlmIChwYXJ0c1sxXSl7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gYCB4IDEwXiR7cGFydHNbMV19YFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvYWxnby9iaWdudW1iZXItZmlsdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA3Nzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih2cnApe1xyXG4gICAgdnJwLnNlcnZpY2UoJ0dlbmV0aWNGYWN0b3J5JywgZ2VuZXRpY0ZhY3RvcnlTZXJ2aWNlKTtcclxuICAgIGdlbmV0aWNGYWN0b3J5U2VydmljZS4kaW5qZWN0ID0gWyckcGVybXV0YXRpb24nXTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZW5ldGljRmFjdG9yeVNlcnZpY2UoJHBlcm11dGF0aW9uKXtcclxuICAgICAgICBjbGFzcyBHZW5lIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoY29kZSA9IFtdKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuX2NvZGUgPSBjb2RlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52dWxuZXJhYmlsaXR5ID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGNvZGUgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGUuc2xpY2UoKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXQgY29kZSAoY29kZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fY29kZS5zcGxpY2UoMCwgdGhpcy5fY29kZS5sZW5ndGgsIC4uLmNvZGUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgc2l6ZSAoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9jb2RlLmxlbmd0aDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IGdlbm9tICgpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4ID0gdGhpcy5fY29kZS5zbGljZSgpLnNvcnQoKGEsIGIpID0+IGIgLSBhKVswXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBhZCA9IChgJHttYXh9YCkubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvZGUubWFwKCh2KSA9PiAoJycgKyB2KS5wYWRTdGFydChwYWQsICcwJykpLmpvaW4oKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpc0VxdWFsKGdlbm9tKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbm9tID09PSBnZW5vbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmVwcm9kdWNlIChnZW5lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbFNldCA9ICRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZSh0aGlzLmNvZGUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG11dHVhbFNldCA9IHRoaXMuY29kZS5tYXAoKHZhbCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbCA9PT0gZ2VuZS5jb2RlW2lkeF0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsU2V0LnNwbGljZShjZWxsU2V0LmluZGV4T2YodmFsKSwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoY2VsbFNldC5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm11dGF0ZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm11dGF0ZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJHBlcm11dGF0aW9uLmdldFJhbmRvbUxpbWl0ZWRQZXJtdXRhdGlvbnMoY2VsbFNldCwgTUFYX0NISUxEUkVOKS5mb3JFYWNoKChtdXQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjaGlsZCA9IG5ldyBHZW5lKG11dHVhbFNldC5tYXAoKHZhbCkgPT4gdmFsIHx8IG11dC5zaGlmdCgpKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZHJlbjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbXV0YXRlKGRlcHRoID0gTWF0aC5mbG9vcih0aGlzLnNpemUgLyAzKSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtY2VsbHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZSA9IHRoaXMuY29kZTtcclxuICAgICAgICAgICAgICAgIGRvIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLnNpemUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtY2VsbHMuaW5kZXhPZihzYW1wbGVbaWR4XSkgPT09IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWNlbGxzLnB1c2goc2FtcGxlW2lkeF0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzYW1wbGVbaWR4XSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAobWNlbGxzLmxlbmd0aCA8IGRlcHRoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgR2VuZShzYW1wbGUubWFwKHYgPT4gdiB8fCBtY2VsbHMuc2hpZnQoKSkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbGFzcyBHZW5lcmF0aW9uIHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IobnVtKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubnVtYmVyID0gbnVtO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZWNlcyA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBzcGllY2VzICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGllY2VzLnNsaWNlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0IHNwaWVjZXMgKGFycikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BpZWNlcy5zcGxpY2UoMCwgdGhpcy5fc3BpZWNlcy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGFyciAmJiBBcnJheS5pc0FycmF5KGFycikpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwaWVjZXMucHVzaCguLi5hcnIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBzaXplKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwaWVjZXMubGVuZ3RoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IGF2Z1Z1bG5lcmFiaWxpdHkgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NwaWVjZXMucmVkdWNlKChyZXMsIGdlbmUpID0+IHJlcyArIChnZW5lLnZ1bG5lcmFiaWxpdHkgLyB0aGlzLnNpemUpLCAwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBtaW5WdWxuZXJhYmlsaXR5ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGllY2VzLnJlZHVjZSgocmVzLCBnZW5lKSA9PiAhcmVzIHx8IGdlbmUudnVsbmVyYWJpbGl0eSA8IHJlcyA/IGdlbmUudnVsbmVyYWJpbGl0eSA6IHJlcywgbnVsbClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbWF4VnVsbmVyYWJpbGl0eSAoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3BpZWNlcy5yZWR1Y2UoKHJlcywgZ2VuZSkgPT4gIXJlcyB8fCBnZW5lLnZ1bG5lcmFiaWxpdHkgPiByZXMgPyBnZW5lLnZ1bG5lcmFiaWxpdHkgOiByZXMsIG51bGwpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IG1pblZ1bG5lcmFibGVTYW1wbGUgKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICB0aGlzLl9zcGllY2VzLmZpbmQoKGdlbmUpID0+IGdlbmUudnVsbmVyYWJpbGl0eSA9PT0gdGhpcy5taW5WdWxuZXJhYmlsaXR5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBtYXhWdWxuZXJhYmxlU2FtcGxlICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAgdGhpcy5fc3BpZWNlcy5maW5kKChnZW5lKSA9PiBnZW5lLnZ1bG5lcmFiaWxpdHkgPT09IHRoaXMubWF4VnVsbmVyYWJpbGl0eSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgY3N2ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zcGllY2VzLm1hcCgoZ2VuZSkgPT4gYCR7dGhpcy5udW1iZXJ9LC0tLCR7Z2VuZS5nZW5vbX0sJHtnZW5lLnZ1bG5lcmFiaWxpdHl9YCkuam9pbignXFxuJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgc3VtbWFyeSAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBvdXQgPSBbXHJcbiAgICAgICAgICAgICAgICAgICAgYEdlbmVyYXRpb24gJHt0aGlzLm51bWJlcn1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGBQb3B1bGF0aW9uOiAke3RoaXMuc2l6ZX1gLFxyXG4gICAgICAgICAgICAgICAgICAgIGBWdWxuZXJhYmlsaXR5IChtaW4vYXZnL21heCk6ICR7dGhpcy5taW5WdWxuZXJhYmlsaXR5fSAvICR7dGhpcy5hdmdWdWxuZXJhYmlsaXR5fSAvICR7dGhpcy5tYXhWdWxuZXJhYmlsaXR5fWAsXHJcbiAgICAgICAgICAgICAgICAgICAgYE1vc3QgdmlhYmxlIHNhbXBsZTogJHt0aGlzLm1pblZ1bG5lcmFibGVTYW1wbGUuZ2Vub219YCxcclxuICAgICAgICAgICAgICAgICAgICAnLS0nXHJcbiAgICAgICAgICAgICAgICBdO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG91dC5qb2luKCdcXG4nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3MgUG9wdWxhdGlvbiB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yIChjb25maWcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGlvbnMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2l6ZSA9IGNvbmZpZy5zaXplO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9iZSA9IGNvbmZpZy5wcm9iZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3Vydml2ZSA9IGNvbmZpZy5zdXJ2aXZlIHx8IDAuMjU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbm9tTGVuZ3RoID0gY29uZmlnLmdlbm9tTGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zYW1wbGUgPSBjb25maWcuc2FtcGxlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5taW5WdWxuZXJhYmxlR2VuZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBhYnNNaW5WdWxuZXJhYmlsaXR5ICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZVRvdGFsID0gdGhpcy5zYW1wbGUucmVkdWNlKChyZXMsIHZhbCkgPT4gcmVzICsgdmFsLCAwKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVUb3RhbCA9ICh0aGlzLnNhbXBsZS5sZW5ndGggKyAxKSAqIHRoaXMuc2FtcGxlLmxlbmd0aCAvIDI7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2FtcGxlVG90YWwgLSBnZW5lVG90YWw7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBtaW5WdWxuZXJhYmlsaXR5ICgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2JlKCRwZXJtdXRhdGlvbi5nZXRPcHRpbWFsUGVybXV0YXRpb24odGhpcy5zYW1wbGUpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwb3B1bGF0ZSAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpdGVtcyA9ICRwZXJtdXRhdGlvbi5nZXROdW1iZXJTZXF1ZW5jZSh0aGlzLmdlbm9tTGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRpb24gPSBuZXcgR2VuZXJhdGlvbigwKTtcclxuICAgICAgICAgICAgICAgIGdlbmVyYXRpb24uc3BpZWNlcyA9ICRwZXJtdXRhdGlvbi5nZXRSYW5kb21MaW1pdGVkUGVybXV0YXRpb25zKGl0ZW1zLCB0aGlzLnNpemUpLm1hcCgoc2VxKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3R2VuZSA9IG5ldyBHZW5lKHNlcSk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3R2VuZS52dWxuZXJhYmlsaXR5ID0gdGhpcy5wcm9iZShuZXdHZW5lLmNvZGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdHZW5lO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRpb25zLnB1c2goZ2VuZXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VsZWN0IChnZW5JZHggPSB0aGlzLmdlbmVyYXRpb25zLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1heE51bWJlciA9IE1hdGguZmxvb3IodGhpcy5nZW5lcmF0aW9uc1tnZW5JZHhdLnNpemUgKiB0aGlzLnN1cnZpdmUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuZXJhdGlvbnNbZ2VuSWR4XS5zcGllY2VzXHJcbiAgICAgICAgICAgICAgICAgICAgLnNvcnQoKGdlbkEsIGdlbkIpID0+IGdlbkEudnVsbmVyYWJpbGl0eSAtIGdlbkIudnVsbmVyYWJpbGl0eSlcclxuICAgICAgICAgICAgICAgICAgICAuc2xpY2UoMCwgbWF4TnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zb3J0KChnZW5BLCBnZW5CKSA9PiBnZW5BLmdlbm9tIC0gZ2VuQi5nZW5vbSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVlZChtYXhHZW5lcmF0aW9ucyA9IDEwMDAsIHN0b3BPbk1pbmltdW0gPSB0cnVlKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG9sZEdlbmVyYXRpb24gPSB0aGlzLnNlbGVjdCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG9sZEdlbmVyYXRpb24ubGVuZ3RoIDwgMiB8fCBtYXhHZW5lcmF0aW9ucyA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5taW5WdWxuZXJhYmxlR2VuZSA9IHRoaXMuZmluZFJlbGF0aXZlTWluKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdHZW5lcmF0aW9uID0gbmV3IEdlbmVyYXRpb24odGhpcy5nZW5lcmF0aW9ucy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgbmV3R2VuZXJhdGlvbi5zcGllY2VzID0gb2xkR2VuZXJhdGlvbi5yZWR1Y2UoKHJlcywgZ2VuZSwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dEdlbmUgPSBvbGRHZW5lcmF0aW9uW2lkeCArIDFdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dEdlbmUpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbiA9IGdlbmUucmVwcm9kdWNlKG5leHRHZW5lKS5tYXAoKGNoaWxkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZC52dWxuZXJhYmlsaXR5ID0gdGhpcy5wcm9iZShjaGlsZC5jb2RlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKC4uLmNoaWxkcmVuKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1xyXG4gICAgICAgICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0aW9ucy5wdXNoKG5ld0dlbmVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0dlbmVyYXRpb24ubWluVnVsbmVyYWJpbGl0eSA9PT0gdGhpcy5taW5WdWxuZXJhYmlsaXR5ICYmIHN0b3BPbk1pbmltdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWluVnVsbmVyYWJsZUdlbmUgPSBuZXdHZW5lcmF0aW9uLm1pblZ1bG5lcmFibGVTYW1wbGU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5taW5WdWxuZXJhYmxlR2VuZSA/IHRoaXMgOiB0aGlzLmJyZWVkKG1heEdlbmVyYXRpb25zIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZmluZFJlbGF0aXZlTWluKCl7XHJcbiAgICAgICAgICAgICAgICBsZXQgbXZzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0aW9ucy5mb3JFYWNoKChnbnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzYW1wbGUgPSBnbnIubWluVnVsbmVyYWJsZVNhbXBsZTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIW12cyB8fCBtdnMudnVsbmVyYWJpbGl0eSA+IHNhbXBsZS52dWxuZXJhYmlsaXR5KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXZzID0gc2FtcGxlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG12cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRHZW5lID0gKGNvZGUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHZW5lKGNvZGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRHZW5lcmF0aW9uID0gKHNpemUpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBHZW5lcmF0aW9uKHNpemUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRQb3B1bGF0aW9uID0gKGNvbmZpZykgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFBvcHVsYXRpb24oY29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hbGdvL2dlbmV0aWMtZmFjdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gNzc5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5mYWN0b3J5KCckcGVybXV0YXRpb24nLCBwZXJtdXRhdGlvbkZhY3RvcnkpO1xyXG4gICAgcGVybXV0YXRpb25GYWN0b3J5LiRpbmplY3QgPSBbJyRxJ107XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHBlcm11dGF0aW9uRmFjdG9yeSgkcSl7XHJcbiAgICAgICAgY2xhc3MgUGVybXV0YXRpb24ge1xyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0QWxsUGVybXV0YXRpb25zKGl0ZW1zKXtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA9PT0gMSA/IFtpdGVtc106IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVybXV0YXRpb25zID0gW107XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gR2V0IGFsbCBwZXJtdXRhdGlvbnMgb2YgbGVuZ3RoIChuIC0gMSkuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBwcmV2SXRlbXMgPSBpdGVtcy5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBJbnNlcnQgbGFzdCBvcHRpb24gaW50byBldmVyeSBwb3NzaWJsZSBwb3NpdGlvbiBvZiBldmVyeSBwcmV2aW91cyBwZXJtdXRhdGlvbi5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RJdGVtID0gaXRlbXMuc2xpY2UoLTEpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZQZXJtdXRhdGlvbnMgPSBQZXJtdXRhdGlvbi5nZXRBbGxQZXJtdXRhdGlvbnMocHJldkl0ZW1zKTtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldlBlcm11dGF0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQZXJtdXRhdGlvbiA9IHByZXZQZXJtdXRhdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5zZXJ0IGxhc3Qgb3B0aW9uIGludG8gZXZlcnkgcG9zc2libGUgcG9zaXRpb24gb2YgY3VycmVudFBlcm11dGF0aW9uLlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDw9IGN1cnJlbnRQZXJtdXRhdGlvbi5sZW5ndGg7IGorKykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwZXJtdXRhdGlvblByZWZpeCA9IGN1cnJlbnRQZXJtdXRhdGlvbi5zbGljZSgwLCBqKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcGVybXV0YXRpb25TdWZmaXggPSBjdXJyZW50UGVybXV0YXRpb24uc2xpY2Uoaik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlcm11dGF0aW9ucy5wdXNoKHBlcm11dGF0aW9uUHJlZml4LmNvbmNhdChsYXN0SXRlbSwgcGVybXV0YXRpb25TdWZmaXgpKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcGVybXV0YXRpb25zO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0QWxsUGVybXV0YXRpb25zQXN5bmMoaXRlbXMpe1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW1zLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJHEucmVzb2x2ZShpdGVtcy5sZW5ndGggPT09IDEgPyBbaXRlbXNdOiBbXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0SXRlbSA9IGl0ZW1zLnBvcCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiBQZXJtdXRhdGlvbi5nZXRBbGxQZXJtdXRhdGlvbnNBc3luYyhpdGVtcykudGhlbigocHJldlBlcm11dGF0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2UGVybXV0YXRpb25zLm1hcCgoY3VycmVudFBlcm11dGF0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGVybXV0YXRpb24ucmVkdWNlKChyLCB2LCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnIsIFsuLi5jdXJyZW50UGVybXV0YXRpb24uc2xpY2UoMCwgaSArIDEpLCBsYXN0SXRlbSwgLi4uY3VycmVudFBlcm11dGF0aW9uLnNsaWNlKGkgKyAxKV1dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCBbW2xhc3RJdGVtLCAuLi5jdXJyZW50UGVybXV0YXRpb25dXSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdGF0aWMgZ2V0TGltaXRlZFBlcm11dGF0aW9ucyhpdGVtcywgbGltaXQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbGltaXRCYXNlID0gZmluZE5lYXJlc3RGYWN0b3JpYWwobGltaXQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFRvIGdldCAke2xpbWl0fSBzYW1wbGVzIHdlIHNldCBiYXNlIGF0ICR7bGltaXRCYXNlfWApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWFpblNldCA9IFBlcm11dGF0aW9uLmdldEFsbFBlcm11dGF0aW9ucyhpdGVtcy5zbGljZSgwLCBsaW1pdEJhc2UpKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGVwcyA9IG1hdGguY2VpbChsaW1pdCAvIG1haW5TZXQubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtYWluU2V0LnJlZHVjZSgocmVzLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHN0ZXBzOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXh0U2V0ID0gUGVybXV0YXRpb24uZ2V0UmFuZG9tUGVybXV0YXRpb24oaXRlbXMuc2xpY2UobGltaXRCYXNlKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5wdXNoKGl0ZW0uY29uY2F0KGV4dFNldCkpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCBbXSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldFJhbmRvbUxpbWl0ZWRQZXJtdXRhdGlvbnMoaXRlbXMsIGxpbWl0KXtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtcy5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLmxlbmd0aCA9PT0gMSA/IFtpdGVtc106IFtdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF4TnVtID0gbWF0aC5mYWN0b3JpYWwoaXRlbXMubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGlmIChsaW1pdCA+PSBtYXhOdW0pe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQZXJtdXRhdGlvbi5nZXRBbGxQZXJtdXRhdGlvbnMoaXRlbXMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgcGVybXV0YXRpb25zID0gW107XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3UGVybXV0YXRpb24gPSBQZXJtdXRhdGlvbi5nZXRSYW5kb21QZXJtdXRhdGlvbihpdGVtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gcGVybXV0YXRpb25zLmZpbmRJbmRleCgocGVybSkgPT4gcGVybS5qb2luKCkgPT09IG5ld1Blcm11dGF0aW9uLmpvaW4oKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PT0gLTEpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwZXJtdXRhdGlvbnMucHVzaChuZXdQZXJtdXRhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAocGVybXV0YXRpb25zLmxlbmd0aCA8IGxpbWl0KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwZXJtdXRhdGlvbnM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXRSYW5kb21QZXJtdXRhdGlvbihpdGVtcykge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3JjID0gaXRlbXMuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcy5tYXAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHNyYy5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzcmMuc3BsaWNlKGlkeCwgMSlbMF07XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldE5vblVuaXF1ZU51bWJlclNlcXVlbmNlKGxlbiwgbWluVG90YWwgPSAobGVuICsgMSkgKiBsZW4gLyAyKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXhUb3RhbCA9IGxlbiAqIGxlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhcmdldFRvdGFsID0gbWluVG90YWwgKyBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4VG90YWwgLSBtaW5Ub3RhbCkpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1bSA9IGxlbjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IEFycmF5LmFwcGx5KG51bGwsIEFycmF5KGxlbikpLmZpbGwoMSk7XHJcbiAgICAgICAgICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbGVuKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0W2lkeF0gPCBsZW4pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W2lkeF0rKztcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtKys7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoc3VtIDwgdGFyZ2V0VG90YWwpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGdldE51bWJlclNlcXVlbmNlKGxlbiwgc3RhcnQgPSAxKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBBcnJheS5hcHBseShudWxsLCBBcnJheShsZW4pKS5tYXAoKHYsIGkpID0+IGkgKyBzdGFydCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBnZXRPcHRpbWFsUGVybXV0YXRpb24oaXRlbXMpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcCgodiwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7dmFsOiB2LCBpZHg6IGl9XHJcbiAgICAgICAgICAgICAgICB9KS5zb3J0KChhLCBiKSA9PiBhLnZhbCAtIGIudmFsKS5tYXAoKHYsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB2LmNlbGwgPSBpICsgMTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdjtcclxuICAgICAgICAgICAgICAgIH0pLnNvcnQoKGEsIGIpID0+IGEuaWR4IC0gYi5pZHgpLm1hcCgodikgPT4gdi5jZWxsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB3aW5kb3cuUGVybXV0YXRpb24gPSBQZXJtdXRhdGlvbjtcclxuICAgICAgICByZXR1cm4gUGVybXV0YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmluZE5lYXJlc3RGYWN0b3JpYWwodGFyZ2V0LCBiYXNlID0gMSl7XHJcbiAgICAgICAgcmV0dXJuIG1hdGguZmFjdG9yaWFsKGJhc2UgKyAxKSA+IHRhcmdldCA/IGJhc2UgOiBmaW5kTmVhcmVzdEZhY3RvcmlhbCh0YXJnZXQsIGJhc2UgKyAxKVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvYWxnby9wZXJtdXRhdGlvbi1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3ODBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAuc2VydmljZSgncG9pbnRGYWN0b3J5JywgcG9pbnRGYWN0b3J5KTtcclxuICAgIHBvaW50RmFjdG9yeS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24gcG9pbnRGYWN0b3J5KCl7XHJcbiAgICAgICAgY2xhc3MgUlBvaW50IHtcclxuICAgICAgICAgICAgY29uc3RydWN0b3IoeCwgeSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb3ZlKGR4LCBkeSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggKz0gZHg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgKz0gZHk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtb3ZlVG8oeCwgeSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldERpc3RhbmNlKHJwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkeCA9IE1hdGguYWJzKHJwb2ludC54IC0gdGhpcy54KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGR5ID0gTWF0aC5hYnMocnBvaW50LnkgLSB0aGlzLnkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgoZHggKiBkeCkgKyAoZHkgKiBkeSkpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0TWlkUG9pbnQocnBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG14ID0gdGhpcy54ICsgKHJwb2ludC54IC0gdGhpcy54KSAvIDI7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBteSA9IHRoaXMueSArIChycG9pbnQueSAtIHRoaXMueSkgLyAyO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29weSA9IG5ldyB0aGlzLmNvbnN0cnVjdG9yKG14LCBteSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjb3B5LCB0aGlzLl9nZXRQcm9wc0NvcHkoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0U2NhbGVkKHNmKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLnggKiBzZiwgdGhpcy55ICogc2YpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oY29weSwgdGhpcy5fZ2V0UHJvcHNDb3B5KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldFRyYW5zZm9ybWVkKHhUcmFuc0ZuLCB5VHJhbnNGbil7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjb3B5ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoeFRyYW5zRm4odGhpcy54KSwgeVRyYW5zRm4odGhpcy55KSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjb3B5LCB0aGlzLl9nZXRQcm9wc0NvcHkoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xvbmUoKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNvcHkgPSBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih0aGlzLngsIHRoaXMueSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihjb3B5LCB0aGlzLl9nZXRQcm9wc0NvcHkoKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZXF1YWxzKHJwb2ludCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jb25zdHJ1Y3RvciA9PT0gcnBvaW50LmNvbnN0cnVjdG9yXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgdGhpcy54ID09PSBycG9pbnQueFxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMueSA9PT0gcnBvaW50Lnk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG9TdHJpbmcoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBgW3g9JHt0aGlzLnh9XVt5PSR7dGhpcy55fV1gO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIF9nZXRQcm9wc0NvcHkoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzKS5yZWR1Y2UoKHJlcywga2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSAhPT0gJ3gnICYmIGtleSAhPT0gJ3knKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzW2tleV0gPSB0aGlzW2tleV07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCB7fSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3MgUlZlY3RvciB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHN0YXJ0LCBlbmQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydCA9IHN0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmQgPSBlbmQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IFgoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmVuZC54IC0gdGhpcy5zdGFydC54O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBZKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmQueSAtIHRoaXMuc3RhcnQueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgbGVuZ3RoKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMuWCwgMikgKyBNYXRoLnBvdyh0aGlzLlksIDIpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgX2FkZChydmVjdG9yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZW5kLm1vdmUocnZlY3Rvci5YLCBydmVjdG9yLlkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgX21vdmUoZHgsIGR5KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnQubW92ZShkeCwgZHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmQubW92ZShkeCwgZHkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHJhbnNsYXRlKGR4LCBkeSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9uZSgpLl9tb3ZlKGR4LCBkeSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc3VtKHJ2ZWN0b3Ipe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvbmUoKS5fYWRkKHJ2ZWN0b3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG1lYW4ocnZlY3Rvcil7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBkeCA9IHJ2ZWN0b3Iuc3RhcnQueCAtIHRoaXMuc3RhcnQueDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGR5ID0gcnZlY3Rvci5zdGFydC55IC0gdGhpcy5zdGFydC55O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbXYgPSBydmVjdG9yLnRyYW5zbGF0ZShkeCwgZHkpO1xyXG4gICAgICAgICAgICAgICAgbXYuZW5kLnggPSAobXYuZW5kLnggKyB0aGlzLmVuZC54KSAvIDI7XHJcbiAgICAgICAgICAgICAgICBtdi5lbmQueSA9IChtdi5lbmQueSArIHRoaXMuZW5kLnkpIC8gMjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBtdjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjbG9uZSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBSVmVjdG9yKHRoaXMuc3RhcnQuY2xvbmUoKSwgdGhpcy5lbmQuY2xvbmUoKSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5SUG9pbnQgPSBSUG9pbnQ7XHJcbiAgICAgICAgdGhpcy5SVmVjdG9yID0gUlZlY3RvcjtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRQb2ludCA9ICh4LCB5KSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUlBvaW50KHgsIHkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRSYW5kb21Qb2ludHMgPSAoYW1vdW50LCBtYXhYLCBtYXhZKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgQXJyYXkoYW1vdW50KS5maWxsKDApLm1hcCgoKSA9PiBuZXcgUlBvaW50KHRoaXMuZ2V0UmFuZG9tQ29vcmQobWF4WCksIHRoaXMuZ2V0UmFuZG9tQ29vcmQobWF4WSkpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0UmFuZG9tUG9pbnQgPSAobWF4WCwgbWF4WSkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFJQb2ludCh0aGlzLmdldFJhbmRvbUNvb3JkKG1heFgpLCB0aGlzLmdldFJhbmRvbUNvb3JkKG1heFkpKVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRSYW5kb21Db29yZCA9IChtYXgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2FsZ28vcG9pbnQtZmFjdG9yeS5qc1xuLy8gbW9kdWxlIGlkID0gNzgxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5zZXJ2aWNlKCckc2ltQW5uZWFsJywgc2ltQW5uZWFsU2VydmljZSk7XHJcbiAgICBzaW1Bbm5lYWxTZXJ2aWNlLiRpbmplY3QgPSBbJyRxJywgJyRwZXJtdXRhdGlvbicsICckYXBlZScsICckZG91YmxlJywgJ3BvaW50RmFjdG9yeSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNpbUFubmVhbFNlcnZpY2UoJHEsICRwZXJtdXRhdGlvbiwgJGFwZWUsICRkb3VibGUsIHBvaW50RmFjdG9yeSl7XHJcbiAgICAgICAgY29uc3QgQkZMSU1JVCA9IDVlNTtcclxuICAgICAgICBjbGFzcyBTaW1Bbm5lYWxTb2x1dGlvbiB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKHBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb3N0ID0gLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9pbnRzKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFBvaW50cyhwb2ludHMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgbGVuZ3RoKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wb2ludHMubGVuZ3RoO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZXRQb2ludHMocG9pbnRzKXtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzLnNwbGljZSgwLCB0aGlzLnBvaW50cy5sZW5ndGgsIC4uLnBvaW50cyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNvc3QgPSB0aGlzLmdldENvc3QoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRDb3N0KCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gU2ltQW5uZWFsU29sdXRpb24uY2FsY3VsYXRlQ29zdCh0aGlzLnBvaW50cyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGV4cG9ydCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLm1hcCgocG9pbnQpID0+IFtwb2ludC54LCBwb2ludC55XS5qb2luKCkpLmpvaW4oJ1xcbicpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlcXVhbHMoc29sdXRpb24pe1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMgPT09IHNvbHV0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICghKHNvbHV0aW9uIGluc3RhbmNlb2YgU2ltQW5uZWFsU29sdXRpb24pKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydEluZGV4ID0gc29sdXRpb24ucG9pbnRzLmZpbmRJbmRleCgocG9pbnQpID0+IHBvaW50LmVxdWFscyh0aGlzLnBvaW50c1swXSkpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YXJ0SW5kZXggPiAtMVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMuY29zdCA9PT0gc29sdXRpb24uY29zdFxyXG4gICAgICAgICAgICAgICAgICAgICYmIHRoaXMubGVuZ3RoID09PSBzb2x1dGlvbi5sZW5ndGhcclxuICAgICAgICAgICAgICAgICAgICAmJiB0aGlzLnBvaW50cy5ldmVyeSgocCwgaSwgYSkgPT4gcC5lcXVhbHMoc29sdXRpb24ucG9pbnRzWyhpICsgc3RhcnRJbmRleCkgJSBhLmxlbmd0aF0pKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc3RhdGljIGNhbGN1bGF0ZUNvc3QocG9pbnRzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwb2ludHMucmVkdWNlKChyZXMsIHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5wcmV2KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmNvc3QgKz0gcmVzLnByZXYuZ2V0RGlzdGFuY2UocG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXMucHJldiA9IHBvaW50O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB9LCB7Y29zdDogMCwgcHJldjogbnVsbH0pLmNvc3RcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjbGFzcyBTaW1Bbm5lYWwgZXh0ZW5kcyAkYXBlZS5BUEV2ZW50RW1pdHRlciB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yIChiYXNlLCBtYXhUZW1wZXJhdHVyZSwgbWluVGVtcGVyYXR1cmUsIGlzQ2xvc2VkKXtcclxuICAgICAgICAgICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYmFzZS5sZW5ndGggPCAzKXtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NpbUFubmVhbCBhY2NlcHRzIG9ubHkgc2VxdWVuY2VzIHdpdGggbGVuZ3RoIDMrJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBsYXN0ID0gYmFzZVtiYXNlLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ2xvc2VkICYmIGxhc3QgJiYgYmFzZVswXSAmJiAhbGFzdC5lcXVhbHMoYmFzZVswXSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGJhc2UucHVzaChiYXNlWzBdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRoaXMuX2Jhc2UgPSBiYXNlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSAkcGVybXV0YXRpb24uZ2V0UmFuZG9tUGVybXV0YXRpb24oJHBlcm11dGF0aW9uLmdldE51bWJlclNlcXVlbmNlKGJhc2UubGVuZ3RoLCAwKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGVwID0gMTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0ID0gbWF4VGVtcGVyYXR1cmU7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wZXJhdHVyZSA9IG1heFRlbXBlcmF0dXJlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fbGltaXQgPSBtaW5UZW1wZXJhdHVyZTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3VsdHMgPSBbXTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3NvbHV0aW9ucyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fZXhhY3QgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2Jhc2UubGVuZ3RoIDwgMTApe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYnJ1dGVGb3JjZSgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9leGFjdCA9IG5ldyBTaW1Bbm5lYWxTb2x1dGlvbihyZXN1bHQuc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9oYXNoID0gdGhpcy5oYXNoQ29kZSgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgY3VycmVudENvc3QoKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYWxjdWxhdGVDb3N0KHRoaXMuX3N0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgY3VycmVudFN0YXRlKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0YXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldCBjdXJyZW50U3RhdGUoc3RhdGUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXRlLnNwbGljZSgwLCB0aGlzLl9zdGF0ZS5sZW5ndGgsIC4uLnN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgcG9pbnRzKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGdldCBpc0RvbmUoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAodGhpcy5fdGVtcGVyYXR1cmUgPD0gdGhpcy5fbGltaXQgfHwgKHRoaXMuX2V4YWN0ICYmIHRoaXMuX2V4YWN0LmNvc3QgPT09IHRoaXMuY3VycmVudENvc3QpKSAmJiB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXQgaXNEb25lKGJvb2wpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCEhYm9vbCl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdG9wKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgaXNSdW5uaW5nKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RlcCA+IDEgJiYgdGhpcy5fdGVtcGVyYXR1cmUgPiB0aGlzLl9saW1pdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBnZXQgaW5mbygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGBSb3V0ZSBsZW5ndGg6ICR7dGhpcy5jdXJyZW50Q29zdH0gU3RlcDogJHt0aGlzLl9zdGVwfSBUZW1wZXJhdHVyZTogJHt0aGlzLl90ZW1wZXJhdHVyZX1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZ2V0IHNvbHV0aW9ucygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvbHV0aW9ucztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaGFzaENvZGUoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYXNlLnJlZHVjZSgocmVzLCBpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSAkZG91YmxlLmRvdWJsZVRvTG9uZ0JpdHMoaXRlbS54KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzID0gTWF0aC5pbXVsKDMxLCByZXMpICsgaXRlbS55IHwgMDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBNYXRoLmltdWwoMzEsIHJlcykgKyBpdGVtLnggfCAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXMgPSBNYXRoLmltdWwoMzEsIHJlcykgKyBpdGVtLnkgfCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwgMClcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0U3RhdGUoc3RhdGUgPSB0aGlzLl9zdGF0ZSl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUubWFwKCh2KSA9PiB0aGlzLl9iYXNlW3ZdKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjYWxjdWxhdGVDb3N0KHN0YXRlKXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50cyA9IHRoaXMuZ2V0U3RhdGUoc3RhdGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFNpbUFubmVhbFNvbHV0aW9uLmNhbGN1bGF0ZUNvc3QocG9pbnRzKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY2FsY3VsYXRlUHJvYmFiaWxpdHkoZGVsdGFDb3N0KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmV4cCgtMSAqIGRlbHRhQ29zdCAvIHRoaXMuX3RlbXBlcmF0dXJlKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZWNyZWFzZVRlbXBlcmF0dXJlKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wZXJhdHVyZSA9ICh0aGlzLl9zdGFydCAqIDAuMykgLyB0aGlzLl9zdGVwO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RlcCsrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRDYW5kaWRhdGUoKXtcclxuICAgICAgICAgICAgICAgIGxldCBhID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5fc3RhdGUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGxldCBiID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5fc3RhdGUubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgIGlmIChhID4gYil7XHJcbiAgICAgICAgICAgICAgICAgICAgW2EsIGJdID0gW2IsIGFdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZWdtZW50ID0gdGhpcy5fc3RhdGUuc2xpY2UoYSwgYikucmV2ZXJzZSgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFsuLi50aGlzLl9zdGF0ZS5zbGljZSgwLCBhKSwgLi4uc2VnbWVudCwgLi4udGhpcy5fc3RhdGUuc2xpY2UoYildXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJydXRlRm9yY2UobGltaXQgPSBCRkxJTUlUKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkcSgocmVzb2x2ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGl0ZW1zID0gJHBlcm11dGF0aW9uLmdldE51bWJlclNlcXVlbmNlKHRoaXMuX2Jhc2UubGVuZ3RoLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSAkcGVybXV0YXRpb24uZ2V0TGltaXRlZFBlcm11dGF0aW9ucyhpdGVtcywgbGltaXQpLnJlZHVjZSgocmVzLCBzdGF0ZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBjb3N0ID0gdGhpcy5jYWxjdWxhdGVDb3N0KHN0YXRlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5jb3N0IDwgMCB8fCBjb3N0IDwgcmVzLmNvc3Qpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLmNvc3QgPSBjb3N0O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnN0YXRlID0gdGhpcy5nZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgICAgICB9LCB7c3RhdGU6IG51bGwsIGNvc3Q6IC0xfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYmVuY2htYXJrKGxpbWl0ID0gQkZMSU1JVCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGFydCA9IG1vbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuYnJ1dGVGb3JjZShsaW1pdCkudGhlbigocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW5kID0gbW9tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGR1cmF0aW9uID0gZW5kLmRpZmYoc3RhcnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJlbmNoID0gbWF0aC5kaXZpZGUoZHVyYXRpb24sIGxpbWl0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b3RhbCA9IG1hdGguZmFjdG9yaWFsKHRoaXMuX2Jhc2UubGVuZ3RoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlc3RpbWF0ZSA9IG1vbWVudC5kdXJhdGlvbih0b3RhbCAqIGJlbmNoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe2JlbmNoLCBkdXJhdGlvbiwgZXN0aW1hdGUsIGxpbWl0LCB0b3RhbH0sIHJlc3VsdClcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG5leHQoKXtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzRG9uZSB8fCB0aGlzLl9zdGVwID4gMTAwMDAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgY2FuZGlkYXRlID0gdGhpcy5nZXRDYW5kaWRhdGUoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhbmRpZGF0ZUNvc3QgPSB0aGlzLmNhbGN1bGF0ZUNvc3QoY2FuZGlkYXRlKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb3N0ID0gdGhpcy5jdXJyZW50Q29zdDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRlbHRhQ29zdCA9IGNhbmRpZGF0ZUNvc3QgLSBjdXJyZW50Q29zdDtcclxuICAgICAgICAgICAgICAgIGlmIChkZWx0YUNvc3QgPCAwKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IGNhbmRpZGF0ZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvYmFiaWxpdHkgPSB0aGlzLmNhbGN1bGF0ZVByb2JhYmlsaXR5KGRlbHRhQ29zdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdHJpZ2dlciA9IE1hdGgucmFuZG9tKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyaWdnZXIgPD0gcHJvYmFiaWxpdHkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IGNhbmRpZGF0ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlY3JlYXNlVGVtcGVyYXR1cmUoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXN1bHRzLnB1c2goY3VycmVudENvc3QpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRDb3N0O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzdG9wKCl7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc3RlcCA9PT0gMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wZXJhdHVyZSA9IDA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5hZGRTb2x1dGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNldCgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RlcCA9IDE7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90ZW1wZXJhdHVyZSA9IHRoaXMuX3N0YXJ0O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzdWx0cyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSAkcGVybXV0YXRpb24uZ2V0UmFuZG9tUGVybXV0YXRpb24oJHBlcm11dGF0aW9uLmdldE51bWJlclNlcXVlbmNlKHRoaXMuX2Jhc2UubGVuZ3RoLCAwKSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkU29sdXRpb24ocG9pbnRzID0gdGhpcy5wb2ludHMpe1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc29sdXRpb24gPSBuZXcgU2ltQW5uZWFsU29sdXRpb24ocG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHByZXZTb2x1dGlvbiA9IHRoaXMuZ2V0TGFzdFNvbHV0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXByZXZTb2x1dGlvbiB8fCAhcHJldlNvbHV0aW9uLmVxdWFscyhzb2x1dGlvbikpe1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvbHV0aW9ucy5wdXNoKHNvbHV0aW9uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRMYXN0U29sdXRpb24oKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zb2x1dGlvbnNbdGhpcy5fc29sdXRpb25zLmxlbmd0aCAtIDFdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldEJlc3RTb2x1dGlvbigpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvbHV0aW9ucy5yZWR1Y2UoKGEsIGIpID0+IGEuY29zdCA8IGIuY29zdCA/IGEgOiBiKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRTb2x1dGlvbihpZHgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NvbHV0aW9uc1tpZHhdXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHN0YXRpYyBjYWxjdWxhdGVTZWdtZW50Q29zdChwb2ludEEsIHBvaW50Qil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnNxcnQoTWF0aC5wb3coKHBvaW50QS54IC0gcG9pbnRCLngpLCAyKSArIE1hdGgucG93KChwb2ludEEueSAtIHBvaW50Qi55KSwgMikpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2V0UHJlc2V0SW5zdGFuY2UgPSAoYmFzZSwgbWF4VCwgbWluVCwgaXNDbG9zZWQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgU2ltQW5uZWFsKGJhc2UsIG1heFQsIG1pblQsIGlzQ2xvc2VkKTtcclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlLmFkZFNvbHV0aW9uKGluc3RhbmNlLl9iYXNlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2V0SW5zdGFuY2UgPSAoYW1vdW50LCByYW5nZSwgbWF4VCwgbWluVCwgaXNDbG9zZWQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgYmFzZSA9IHBvaW50RmFjdG9yeS5nZXRSYW5kb21Qb2ludHMoYW1vdW50LCByYW5nZSwgcmFuZ2UpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFNpbUFubmVhbChiYXNlLCBtYXhULCBtaW5ULCBpc0Nsb3NlZCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLlNpbUFubmVhbCA9IFNpbUFubmVhbDtcclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2FsZ28vc2ltLWFubmVhbC1zZXJ2aWNlLmpzXG4vLyBtb2R1bGUgaWQgPSA3ODJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLypQcm92aWRlciB0byBwcm9kdWNlIGluZGVwZW5kZW50IGluc3RhbmNlcyBvZiBBUEkgcmVxdWVzdHMuXHJcbiAqIFVzYWdlOiAkYXByZXF1ZXN0LmJ5TmFtZShuYW1lKS5zZW5kKHBhcmFtcyxkYXRhKS50aGVuKClcclxuICogQG5hbWU6IG5hbWUgb2YgY29uZmlnIHRlbXBsYXRlXHJcbiAqIEBwYXJhbXM6IG9iamVjdCB0byBzZXJpYWxpemUgYW5kIGFkZCB0byB0aGUgVVJMLiBCeSBkZWZhdWx0IHNlcmlhbGl6ZWQgdG8gVVJMIHN0cmluZywgYnV0IGNhbiBiZSBvdmVycmlkZW4gd2l0aCBjdXN0b20gc2VydmljZVxyXG4gKiAgICAgICBieSBzZXR0aW5nIHBhcmFtU2VyaWFsaXplciBwcm9wZXJ0eSBpbiBjb25maWcgdGVtcGxhdGUuIHNsYXNoUGFyYW1TZXJpYWxpemVyIGNvbnZlcnRzIHBhcmFtcyB0byAva2V5MS92YWx1ZTEva2V5Mi92YWx1ZTIvXHJcbiAqIEBkYXRhOiBvYmplY3QgcGFzc2VkIHdpdGhpbiByZXF1ZXN0IGJvZHlcclxuICogKi9cclxubW9kdWxlLmV4cG9ydHMgPSAodnJwKSA9PiB7XHJcbiAgICB2cnAucHJvdmlkZXIoJ2FwaVJlcXVlc3QnLCBbZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICB0aGlzLiRnZXQgPSBbJyR0aW1lb3V0JywgJyRxJywgJyRodHRwJywgJyRpbmplY3RvcicsIGZ1bmN0aW9uICgkdGltZW91dCwgJHEsICRodHRwLCAkaW5qZWN0b3IpIHtcclxuICAgICAgICAgICAgY29uc3QgaW5qZWN0ID0gdGhpcy4kaW5qZWN0O1xyXG4gICAgICAgICAgICBjbGFzcyBBcGlSZXF1ZXN0IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0cnVjdG9yIChvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wYXJhbXMgPSBvYmoucGFyYW1zO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RhdGEgPSBvYmouZGF0YTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91cmwgPSBvYmoudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21ldGhvZCA9IG9iai5tZXRob2Q7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGVhZGVycyA9IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhlYWRlcnMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMuX2hlYWRlcnMsIG9iai5oZWFkZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5wYXJhbVNlcmlhbGl6ZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBhcmFtU2VyaWFsaXplciA9ICRpbmplY3Rvci5nZXQob2JqLnBhcmFtU2VyaWFsaXplcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9wYXJhbXMgJiYgdGhpcy5wYXJhbVNlcmlhbGl6ZXIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXJsID0gdGhpcy5wYXJhbVNlcmlhbGl6ZXIodGhpcy5fcGFyYW1zLCB0aGlzLl91cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZ2V0IHBhcmFtcygpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhdGhpcy5wYXJhbVNlcmlhbGl6ZXIgPyBPYmplY3QuYXNzaWduKHt9LCB0aGlzLl9wYXJhbXMpIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdldCBkYXRhKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRoaXMuX2RhdGEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZ2V0IHVybCgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl91cmw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBnZXQgbWV0aG9kKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21ldGhvZDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGdldCBoZWFkZXJzKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWRlcnM7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgYnVpbGRVcmwocGFyYW1zKXtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGFyYW1TZXJpYWxpemVyIHx8ICFwYXJhbXMpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJhbVNlcmlhbGl6ZXIocGFyYW1zLCB0aGlzLl91cmwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNlbmQgKHBhcmFtcywgZGF0YSwgdXJsRm9ybWF0QXJncyA9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wYXJhbXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW5ndWxhci5leHRlbmQocGFyYW1zIHx8IHt9LCB0aGlzLnBhcmFtcylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbmd1bGFyLmV4dGVuZChkYXRhIHx8IHt9LCB0aGlzLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZih1cmxGb3JtYXRBcmdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmb3JtYXQgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjcmVhdGUgOiAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHJlZ2V4cCA9IC97KFtee10rKX0vZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHN0ciwgbykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RyLnJlcGxhY2UocmVnZXhwLCBmdW5jdGlvbihpZ25vcmUsIGtleSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gIShrZXkgPSBvW2tleV0pID8gJycgOiBrZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKClcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybWF0dGVkVXJsID0gZm9ybWF0LmNyZWF0ZSh0aGlzLnVybCwgdXJsRm9ybWF0QXJncyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtYXR0ZWRVcmwgPSB0aGlzLmJ1aWxkVXJsKHBhcmFtcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogdGhpcy5tZXRob2QsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiAvXlxcLy4rLy50ZXN0KHRoaXMuZm9ybWF0dGVkVXJsICkgPyB0aGlzLmZvcm1hdHRlZFVybCAgOiBgLyR7dGhpcy5mb3JtYXR0ZWRVcmwgfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtczogdGhpcy5wYXJhbVNlcmlhbGl6ZXIgPyBudWxsIDogcGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkYXRhXHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJGh0dHAoY29uZmlnKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2VuZE11bHRpcGFydChwYXJhbXMsIGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZkID0gbmV3IEZvcm1EYXRhKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmtleXMoZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhW2tleV0gaW5zdGFuY2VvZiBGaWxlKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZkLmFwcGVuZChrZXksIGRhdGFba2V5XSwgZGF0YVtrZXldLm5hbWUpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZC5hcHBlbmQoa2V5LCBkYXRhW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXJsID0gcGFyYW1zID8gdGhpcy5idWlsZFVybChwYXJhbXMpIDogdGhpcy51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6IHVuZGVmaW5lZH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybVJlcXVlc3Q6IGFuZ3VsYXIuaWRlbnRpdHlcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAkaHR0cFt0aGlzLm1ldGhvZC50b0xvd2VyQ2FzZSgpXSh1cmwsIGZkLCBjb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBmdW5jdGlvbiBieUNvbmZpZyAoY29uZmlnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEFwaVJlcXVlc3QoY29uZmlnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZnVuY3Rpb24gcmVzdGZ1bCAocGFyYW1zLCBtZXRob2QgPSAnR0VUJywgdXJsID0gJy9hcGkvJykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY29uZmlnID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZCxcclxuICAgICAgICAgICAgICAgICAgICB1cmwsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtU2VyaWFsaXplcjogJ3NsYXNoUGFyYW1TZXJpYWxpemVyJ1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgQXBpUmVxdWVzdChjb25maWcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICAgICAgZ2V0SW5zdGFuY2U6IGJ5Q29uZmlnLFxyXG4gICAgICAgICAgICAgICAgZ2V0UmVzdEluc3RhbmNlOiByZXN0ZnVsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XTtcclxuICAgIH1dKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hcGkvYXBpLXJlcXVlc3QtcHJvdmlkZXIuanNcbi8vIG1vZHVsZSBpZCA9IDc4M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IChhcGZyb250KSA9PiB7XHJcbiAgICBhcGZyb250LnNlcnZpY2UoJ3NsYXNoUGFyYW1TZXJpYWxpemVyJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIHNlcmlhbGl6ZVZhbHVlKHYpIHtcclxuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNPYmplY3QodikpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzRGF0ZSh2KSA/IHYudG9JU09TdHJpbmcoKSA6IGFuZ3VsYXIudG9Kc29uKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB2O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHBhcmFtU2VyaWFsaXplcihwYXJhbXMsIHVybCkge1xyXG4gICAgICAgICAgICBpZiAoIXBhcmFtcykgcmV0dXJuIHVybDtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB1cmwgKyBPYmplY3Qua2V5cyhwYXJhbXMpLnJlZHVjZSgocmVzLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwYWlyID0gW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zW2tleV0gJiYgIWFuZ3VsYXIuaXNPYmplY3QocGFyYW1zW2tleV0pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFpci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba2V5XS50b1N0cmluZygpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvJTIwL2csICcrJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1tcXC5cXCpcXC1cXCFcXH5cXChcXCldL2csICcnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXFwlXFx3ezJ9L2csICcnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gWy4uLnJlcywgLi4ucGFpcl1cclxuICAgICAgICAgICAgfSwgW10pLmpvaW4oJy8nKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9hcGkvc2xhc2gtcGFyYW0tc2VyaWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gNzg0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXBmcm9udCkge1xyXG4gICAgYXBmcm9udC5zZXJ2aWNlKCd0cGxRdWVyeVNlcmlhbGl6ZXInLCB0cGxRdWVyeVNlcmlhbGl6ZXIpO1xyXG4gICAgdHBsUXVlcnlTZXJpYWxpemVyLiRpbmplY3QgPSBbJyRodHRwUGFyYW1TZXJpYWxpemVyJywgJ2RhdGVVdGlscyddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRwbFF1ZXJ5U2VyaWFsaXplcigkaHR0cFBhcmFtU2VyaWFsaXplciwgJGFwRGF0ZVV0aWxzKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChwYXJhbXMsIHVybCkge1xyXG4gICAgICAgICAgICBpZiAoIXBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHVybFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0ge307XHJcbiAgICAgICAgICAgIGxldCBwYXJzZWRVcmwgPSBPYmplY3Qua2V5cyhwYXJhbXMpLnJlZHVjZSgocmVzLCBrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVzLmluY2x1ZGVzKCc6JyArIGtleSkpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGUgPSAkYXBEYXRlVXRpbHMucGFyc2VEYXRlKHBhcmFtc1trZXldKTtcclxuICAgICAgICAgICAgICAgICAgICBxdWVyeVtrZXldID0gZGF0ZSA/ICRhcERhdGVVdGlscy5sb2NhbEFzVXRjKGRhdGUpIDogcGFyYW1zW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzLnJlcGxhY2UoJzonICsga2V5LCBlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0gPyBwYXJhbXNba2V5XS50b1N0cmluZygpIDogJzAnKSlcclxuICAgICAgICAgICAgfSwgdXJsKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhxdWVyeSkubGVuZ3RoID8gcGFyc2VkVXJsICsgJz8nICsgJGh0dHBQYXJhbVNlcmlhbGl6ZXIocXVlcnkpIDogcGFyc2VkVXJsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2FwaS90cGwtcXVlcnktc2VyaWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gNzg1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gKHZycCkgPT4ge1xyXG4gICAgdnJwLmRpcmVjdGl2ZSgna01lYW4nLCBrTWVhbkRpcmVjdGl2ZSk7XHJcbiAgICBrTWVhbkRpcmVjdGl2ZS4kaW5qZWN0ID0gW107XHJcblxyXG4gICAgZnVuY3Rpb24ga01lYW5EaXJlY3RpdmUoKXtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiByZXF1aXJlKCcuL2stbWVhbi10cGwuaHRtbCcpLFxyXG4gICAgICAgICAgICBiaW5kVG9Db250cm9sbGVyOiB0cnVlLFxyXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnS01lYW5Db250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY3RybCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdnJwLmNvbnRyb2xsZXIoJ0tNZWFuQ29udHJvbGxlcicsIEtNZWFuQ29udHJvbGxlcik7XHJcbiAgICBLTWVhbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGttZWFuJywgJyRjb2xvcmRlZiddO1xyXG5cclxuICAgIGZ1bmN0aW9uIEtNZWFuQ29udHJvbGxlcigka21lYW4sICRjb2xvcmRlZil7XHJcbiAgICAgICAgdGhpcy5wb2ludENvdW50ID0gMTAwO1xyXG4gICAgICAgIHRoaXMuY2x1c3RlckNvdW50ID0gMztcclxuICAgICAgICB0aGlzLm1hcFdpZHRoID0gNjQwO1xyXG4gICAgICAgIHRoaXMubWFwSGVpZ2h0ID0gNDgwO1xyXG4gICAgICAgIHRoaXMua21lYW4gPSAka21lYW4uZ2V0SW5zdGFuY2UodGhpcy5wb2ludENvdW50LCB0aGlzLmNsdXN0ZXJDb3VudCwgdGhpcy5tYXBXaWR0aCwgdGhpcy5tYXBIZWlnaHQpO1xyXG4gICAgICAgIHRoaXMuY29sb3JzID0gWycjRjQ0MzM2JywgJyMyMTk2RjMnLCAnI0ZGOTgwMCcsICcjOEJDMzRBJywgJyM5QzI3QjAnLCAnIzAwOTY4OCcsICcjRkZDMTA3JywgJyM0Q0FGNTAnLCAnI0U5MUU2MycsICcjMDBCQ0Q0J107XHJcblxyXG4gICAgICAgIHRoaXMucmVzZXRDbHVzdGVycyA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rbWVhbiAmJiB0aGlzLmttZWFuLnJlc2V0QWxsQ2x1c3RlcnMoKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLnJ1bkNsdXN0ZXJpbmdTdGVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmttZWFuICYmIHRoaXMua21lYW4uY2x1c3RlcmluZ1N0ZXAoKVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucmVidWlsZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5rbWVhbiA9ICRrbWVhbi5nZXRJbnN0YW5jZSh0aGlzLnBvaW50Q291bnQsIHRoaXMuY2x1c3RlckNvdW50LCB0aGlzLm1hcFdpZHRoLCB0aGlzLm1hcEhlaWdodCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvay1tZWFuL2stbWVhbi1kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDc4NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgbmctc3R5bGU9XFxcInsnbWF4LXdpZHRoJzogKGN0cmwubWFwV2lkdGggKyAxNjApICsgJ3B4J31cXFwiIGZsZXg+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tY29udHJvbHNcXFwiIGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gc3RhcnRcXFwiPlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8c3Bhbj5XaWR0aDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjUwMFxcXCIgbWF4PVxcXCIxMjAwXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXBXaWR0aFxcXCIgYXJpYS1sYWJlbD1cXFwibWFwIHdpZHRoXFxcIiBjbGFzcz1cXFwibWQtd2FyblxcXCI+PC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXBXaWR0aFxcXCIgYXJpYS1sYWJlbD1cXFwibWFwIHdpZHRoXFxcIiBhcmlhLWNvbnRyb2xzPVxcXCJtYXAtc2l6ZS1zbGlkZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L21kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPG1kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuPkhlaWdodDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjUwMFxcXCIgbWF4PVxcXCIxMjAwXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5tYXBIZWlnaHRcXFwiIGFyaWEtbGFiZWw9XFxcIm1hcCBoZWlnaHRcXFwiIGNsYXNzPVxcXCJtZC13YXJuXFxcIj48L21kLXNsaWRlcj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLm1hcEhlaWdodFxcXCIgYXJpYS1sYWJlbD1cXFwibWFwIGhlaWdodFxcXCIgYXJpYS1jb250cm9scz1cXFwibWFwLXNpemUtc2xpZGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPC9tZC1zbGlkZXItY29udGFpbmVyPlxcclxcblxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgPG1kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxzcGFuPlBvaW50czwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjRcXFwiIG1heD1cXFwiMzAwXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5wb2ludENvdW50XFxcIiBhcmlhLWxhYmVsPVxcXCJwb2ludHNcXFwiIGNsYXNzPVxcXCJtZC13YXJuXFxcIj48L21kLXNsaWRlcj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLnBvaW50Q291bnRcXFwiIGFyaWEtbGFiZWw9XFxcInBvaW50cyBudW1iZXJcXFwiIGFyaWEtY29udHJvbHM9XFxcInBvaW50cy1udW1iZXItc2xpZGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPC9tZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8c3Bhbj5DbHVzdGVyczwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLXNsaWRlciBtaW49XFxcIjJcXFwiIG1heD1cXFwiMTBcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLmNsdXN0ZXJDb3VudFxcXCIgYXJpYS1sYWJlbD1cXFwicG9pbnRzXFxcIiBjbGFzcz1cXFwibWQtd2FyblxcXCI+PC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5jbHVzdGVyQ291bnRcXFwiIGFyaWEtbGFiZWw9XFxcImNsdXN0ZXIgY291bnRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L21kLXNsaWRlci1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJjZW50ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gbmctY2xpY2s9XFxcImN0cmwucmVidWlsZCgpXFxcIiBhcmlhLWxhYmVsPVxcXCJyZWJ1aWxkXFxcIj5OZXc8L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBuZy1jbGljaz1cXFwiY3RybC5yZXNldENsdXN0ZXJzKClcXFwiIGFyaWEtbGFiZWw9XFxcInJlc2V0IGNsdXN0ZXJzXFxcIj5SZXNldDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5ydW5DbHVzdGVyaW5nU3RlcCgpXFxcIiBhcmlhLWxhYmVsPVxcXCJydW4gY2x1c3RlcmluZyBzdGVwXFxcIj5OZXh0PC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tZHJhdy1zY3JvbGxlclxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrLW1lYW4tY29udGFpbmVyXFxcIiBuZy1zdHlsZT1cXFwieydoZWlnaHQnOiBjdHJsLm1hcEhlaWdodCArICdweCcsICd3aWR0aCc6IGN0cmwubWFwV2lkdGggKyAncHgnfVxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLWxheWVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLXBvaW50LXdyYXBwZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBuZy1yZXBlYXQ9XFxcInBvaW50IGluIGN0cmwua21lYW4ucG9pbnRzXFxcIiBjbGFzcz1cXFwiay1tZWFuLXBvaW50XFxcIiBuZy1zdHlsZT1cXFwieyd0b3AnOiBwb2ludC55ICsgJ3B4JywgJ2xlZnQnOiBwb2ludC54ICsgJ3B4J31cXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJrLW1lYW4tbGF5ZXJcXFwiIG5nLXJlcGVhdD1cXFwiY2x1c3RlciBpbiBjdHJsLmttZWFuLmNsdXN0ZXJzXFxcIiBuZy1zdHlsZT1cXFwieyd6LWluZGV4JzogKGNsdXN0ZXIuaW5kZXggKyAxKSAqIDEwfVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImstbWVhbi1wb2ludC13cmFwcGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcImstbWVhbi1wb2ludFxcXCIgbmctcmVwZWF0PVxcXCJwb2ludCBpbiBjbHVzdGVyLnBvaW50c1xcXCIgbmctc3R5bGU9XFxcInsndG9wJzogcG9pbnQueSArICdweCcsICdsZWZ0JzogcG9pbnQueCArICdweCcsICdib3JkZXItY29sb3InOiBjdHJsLmNvbG9yc1tjbHVzdGVyLmluZGV4XX1cXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwiay1tZWFuLXBvaW50IGstbWVhbi1jZW50cm9pZFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgbmctc3R5bGU9XFxcInsndG9wJzogY2x1c3Rlci5jZW50cm9pZC55ICsgJ3B4JyxcXHJcXG4gICAgICAgICAgICAgICAgICAgICAnbGVmdCc6IGNsdXN0ZXIuY2VudHJvaWQueCArICdweCcsXFxyXFxuICAgICAgICAgICAgICAgICAgICAgJ2JvcmRlci1jb2xvcic6IGN0cmwuY29sb3JzW2NsdXN0ZXIuaW5kZXhdLFxcclxcbiAgICAgICAgICAgICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogY3RybC5jb2xvcnNbY2x1c3Rlci5pbmRleF19XFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuPC9kaXY+XCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL2stbWVhbi9rLW1lYW4tdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDc4N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9ICh2cnApID0+IHtcclxuICAgIHZycC5zZXJ2aWNlKCcka21lYW4nLCBrTWVhblNlcnZpY2UpO1xyXG4gICAga01lYW5TZXJ2aWNlLiRpbmplY3QgPSBbJ3BvaW50RmFjdG9yeSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIGtNZWFuU2VydmljZShwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNsYXNzIENsdXN0ZXIge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihpbmRleCwgY2VudHJvaWQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jZW50cm9pZCA9IGNlbnRyb2lkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wb2ludHMgPSBbXTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0IHNpemUoKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnBvaW50cy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNhbGN1bGF0ZUNlbnRyb2lkKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBbYXZnWCwgYXZnWV0gPSB0aGlzLnBvaW50cy5yZWR1Y2UoKHJlcywgcnApID0+IFtyZXNbMF0gKyBycC54LCByZXNbMV0gKyBycC55XSwgWzAsIDBdKS5tYXAoKGNvb3JkKSA9PiBjb29yZCAvIHRoaXMuc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNlbnRyb2lkID0gbmV3IHBvaW50RmFjdG9yeS5SUG9pbnQoYXZnWCwgYXZnWSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkUG9pbnQocnBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMucG9pbnRzLmZpbmRJbmRleCgocCkgPT4gcC5lcXVhbHMocnBvaW50KSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaWR4ID09PSAtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wb2ludHMucHVzaChycG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlbW92ZVBvaW50KHJwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnBvaW50cy5maW5kSW5kZXgoKHApID0+IHAuZXF1YWxzKHJwb2ludCkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlkeCA+IC0xKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5zcGxpY2UoaWR4LCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNldCgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucG9pbnRzLnNwbGljZSgwLCB0aGlzLnBvaW50cy5sZW5ndGgpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBlcXVhbHMoY2x1c3Rlcil7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zaXplID09PSBjbHVzdGVyLnNpemUgJiYgdGhpcy5wb2ludHMucmVkdWNlKChyZXMsIHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gY2x1c3Rlci5wb2ludHMuZmluZEluZGV4KChjcHQpID0+IGNwdC5lcXVhbHMocG9pbnQpKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaWR4ID4gLTEgPyByZXMgKyAxIDogcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwgMCkgPT09IHRoaXMuc2l6ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjbGFzcyBLTWVhbkNsdXN0ZXJze1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvciAobnBvaW50cywgbmNsdXN0ZXJzLCB3aWR0aCwgaGVpZ2h0KXtcclxuICAgICAgICAgICAgICAgIGlmIChuY2x1c3RlcnMgPj0gbnBvaW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RoZXJlIHNob3VsZCBiZSBsYXNzIGNsdXN0ZXJzIHRoYW4gcG9pbnRzJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodCB8fCB3aWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMucG9pbnRzID0gcG9pbnRGYWN0b3J5LmdldFJhbmRvbVBvaW50cyhucG9pbnRzLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2x1c3RlcnMgPSBuZXcgQXJyYXkobmNsdXN0ZXJzKS5maWxsKDApLm1hcCgodiwgaSkgPT4gbmV3IENsdXN0ZXIoaSwgcG9pbnRGYWN0b3J5LmdldFJhbmRvbVBvaW50KHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KSkpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldCBtYXhEaXN0YW5jZSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCgodGhpcy53aWR0aCAqIHRoaXMud2lkdGgpICsgKHRoaXMuaGVpZ2h0ICogdGhpcy5oZWlnaHQpKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjbHVzdGVyaW5nU3RlcCgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldEFsbENsdXN0ZXJzKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBvaW50cy5mb3JFYWNoKChwb2ludCwgcGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5jbHVzdGVycy5yZWR1Y2UoKHJlcywgY2x1c3RlciwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5nZXREaXN0YW5jZShjbHVzdGVyLmNlbnRyb2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhgRGlzdGFuY2UgYmV0d2VlbiBwb2ludHMgJHtwb2ludC50b1N0cmluZygpfSBhbmQgJHtjbHVzdGVyLmNlbnRyb2lkLnRvU3RyaW5nKCl9ID0gJHtkaXN0fS4gTWF4IGRpc3RhbmNlIGlzICR7dGhpcy5tYXhEaXN0YW5jZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc1swXSA8IGRpc3QgPyByZXMgOiBbZGlzdCwgaWR4XVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIFt0aGlzLm1heERpc3RhbmNlLCAtMV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coYFBvaW50ICR7cGlkeH06ICR7cG9pbnQudG9TdHJpbmcoKX0gYmVsb25ncyB0byB0aGUgY2x1c3RlciAke2luZGV4fWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2x1c3RlcnNbaW5kZXhbMV1dICYmIHRoaXMuY2x1c3RlcnNbaW5kZXhbMV1dLmFkZFBvaW50KHBvaW50KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yZWNhbGNBbGxDbHVzdGVycygpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZWNhbGNBbGxDbHVzdGVycygpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2x1c3RlcnMuZm9yRWFjaCgoY2x1c3RlcikgPT4gY2x1c3Rlci5jYWxjdWxhdGVDZW50cm9pZCgpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXNldEFsbENsdXN0ZXJzKCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbHVzdGVycy5mb3JFYWNoKChjbHVzdGVyKSA9PiBjbHVzdGVyLnJlc2V0KCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKG5wb2ludHMsIG5jbHVzdGVycywgd2lkdGgsIGhlaWdodCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IEtNZWFuQ2x1c3RlcnMobnBvaW50cywgbmNsdXN0ZXJzLCB3aWR0aCwgaGVpZ2h0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy9rLW1lYW4vay1tZWFuLXNlcnZpY2UuanNcbi8vIG1vZHVsZSBpZCA9IDc4OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCl7XHJcbiAgICB2cnAuZGlyZWN0aXZlKCdyb3V0ZURyYXcnLCByb3V0ZURyYXdEaXJlY3RpdmUpO1xyXG4gICAgcm91dGVEcmF3RGlyZWN0aXZlLiRpbmplY3QgPSBbJyRxJywgJyR0aW1lb3V0J107XHJcblxyXG4gICAgZnVuY3Rpb24gcm91dGVEcmF3RGlyZWN0aXZlKCRxLCAkdGltZW91dCl7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogcmVxdWlyZSgnLi9yb3V0ZS1kcmF3LXRwbC5odG1sJyksXHJcbiAgICAgICAgICAgIGJpbmRUb0NvbnRyb2xsZXI6IHRydWUsXHJcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdSb3V0ZURyYXdDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY3RybCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZycC5jb250cm9sbGVyKCdSb3V0ZURyYXdDb250cm9sbGVyJywgUm91dGVEcmF3Q29udHJvbGxlcik7XHJcbiAgICBSb3V0ZURyYXdDb250cm9sbGVyLiRpbmplY3QgPSBbJyRlbGVtZW50JywgJyR0aW1lb3V0JywgJyRzaW1Bbm5lYWwnLCAncG9pbnRGYWN0b3J5J107XHJcblxyXG4gICAgZnVuY3Rpb24gUm91dGVEcmF3Q29udHJvbGxlcigkZWxlbWVudCwgJHRpbWVvdXQsICRzaW1Bbm5lYWwsIHBvaW50RmFjdG9yeSl7XHJcbiAgICAgICAgY29uc3QgY29sb3JzID0gW1xyXG4gICAgICAgICAgICAnIzIxOTZGMycsXHJcbiAgICAgICAgICAgICcjRjQ0MzM2JyxcclxuICAgICAgICAgICAgJyNGRkMxMDcnLFxyXG4gICAgICAgICAgICAnIzRDQUY1MCcsXHJcbiAgICAgICAgICAgICcjRkY5ODAwJyxcclxuICAgICAgICAgICAgJyMwMDk2ODgnLFxyXG4gICAgICAgICAgICAnIzlDMjdCMCcsXHJcbiAgICAgICAgICAgICcjRkZFQjNCJyxcclxuICAgICAgICAgICAgJyMzRjUxQjUnLFxyXG4gICAgICAgICAgICAnI0NEREMzOSdcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMubWFwU2l6ZSA9ICRlbGVtZW50WzBdLm9mZnNldFdpZHRoIC0gMTY7XHJcbiAgICAgICAgdGhpcy5tYXhUZW1wID0gMTA7XHJcbiAgICAgICAgdGhpcy5taW5UZW1wID0gMC4wMDAwNTtcclxuICAgICAgICB0aGlzLnBvaW50c051bWJlciA9IDIwO1xyXG4gICAgICAgIHRoaXMuc2ltQW5uZWFsID0gbnVsbDtcclxuICAgICAgICB0aGlzLmJlc3RSb3V0ZSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy51c2VQcmVzZXQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzQ2xvc2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5wcmVzZXQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuY29sb3JJdGVyYXRvciA9IGNvbG9ycy52YWx1ZXMoKTtcclxuXHJcbiAgICAgICAgdGhpcy5yZWJ1aWxkUm91dGUgPSAocmVzZXQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgZHJhd0VsZW0gPSAkKCcucm91dGUtZHJhdy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgY29uc3Qgcm91dGVJbmZvID0gZHJhd0VsZW0uZmluZCgnLnJvdXRlLWluZm8nKTtcclxuICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRfc2VhcmNoJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgcHJlc2V0ID0gYnVpbGRQcmVzZXQodGhpcy5wcmVzZXQpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHJlc2V0IHx8ICF0aGlzLnNpbUFubmVhbCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpbUFubmVhbCA9IHRoaXMudXNlUHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgPyAkc2ltQW5uZWFsLmdldFByZXNldEluc3RhbmNlKHByZXNldCwgdGhpcy5tYXhUZW1wLCB0aGlzLm1pblRlbXAsIHRoaXMuaXNDbG9zZWQpXHJcbiAgICAgICAgICAgICAgICAgICAgOiAkc2ltQW5uZWFsLmdldEluc3RhbmNlKHRoaXMucG9pbnRzTnVtYmVyLCB0aGlzLm1hcFNpemUsIHRoaXMubWF4VGVtcCwgdGhpcy5taW5UZW1wLCB0aGlzLmlzQ2xvc2VkKTtcclxuICAgICAgICAgICAgICAgIGRyYXdQb2ludHModGhpcy5zaW1Bbm5lYWwucG9pbnRzLCBkcmF3RWxlbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zaW1Bbm5lYWwucmVzZXQoKTtcclxuICAgICAgICAgICAgY2xlYXJDYW52YXMoY3R4KTtcclxuICAgICAgICAgICAgZHJhd1JvdXRlU2VxdWVuY2UoY3R4LCB0aGlzLnNpbUFubmVhbCwgcm91dGVJbmZvKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmRyYXdTb2x1dGlvbiA9IChpZHgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnNpbUFubmVhbCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgc2NhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb2x1dGlvbl8nICsgaWR4KTtcclxuICAgICAgICAgICAgaWYgKCFzY2FudmFzKXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAkdGltZW91dCgoKSA9PiB0aGlzLmRyYXdTb2x1dGlvbihpZHgpLCA1MCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNvbHV0aW9uID0gdGhpcy5zaW1Bbm5lYWwuZ2V0U29sdXRpb24oaWR4KTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNjdHggPSBzY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgICAgICBzb2x1dGlvbi5jb2xvciA9IHRoaXMuZ2V0Q29sb3IoKTtcclxuICAgICAgICAgICAgICAgIGRyYXdSb3V0ZShzY3R4LCBzb2x1dGlvbi5wb2ludHMsIHNvbHV0aW9uLmNvbG9yKTtcclxuICAgICAgICAgICAgfSwgMClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmFkZFNvbHV0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucHJlc2V0KXtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCBwb2ludHMgPSBidWlsZFByZXNldCh0aGlzLnByZXNldCk7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zaW1Bbm5lYWwpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZHJhd0VsZW0gPSAkKCcucm91dGUtZHJhdy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgICAgIGRyYXdQb2ludHMocG9pbnRzLCBkcmF3RWxlbSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpbUFubmVhbCA9ICRzaW1Bbm5lYWwuZ2V0UHJlc2V0SW5zdGFuY2UocG9pbnRzLCB0aGlzLm1heFRlbXAsIHRoaXMubWluVGVtcCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNpbUFubmVhbC5hZGRTb2x1dGlvbihwb2ludHMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5mb2N1c1NvbHV0aW9uID0gKGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkcmF3RWxlbSA9ICQoJy5yb3V0ZS1kcmF3LWNvbnRhaW5lcicpO1xyXG4gICAgICAgICAgICBkcmF3RWxlbS5maW5kKCcucm91dGUtc29sdXRpb24nKS5lYWNoKChpLCBlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKGVsZW0pLnRvZ2dsZUNsYXNzKCdmb2N1c2VkLXNvbHV0aW9uJywgaSA9PT0gaWR4KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5kb3dubG9hZFNvbHV0aW9uID0gKGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRfc2VhcmNoJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGFVcmwgPSBzY2FudmFzLnRvRGF0YVVSTCgpO1xyXG4gICAgICAgICAgICBpbml0RG93bmxvYWQoZGF0YVVybCk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5zdG9wUm91dGVTZWFyY2ggPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5zaW1Bbm5lYWwpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2ltQW5uZWFsLnN0b3AoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5zaW1Bbm5lYWwuZ2V0TGFzdFNvbHV0aW9uKCkuZXhwb3J0KCkpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5nZXRDb2xvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNvbG9ySXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICBpZiAoIWl0ZW0udmFsdWUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvckl0ZXJhdG9yID0gY29sb3JzLnZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuY29sb3JJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYnVpbGRQcmVzZXQoZGF0YSl7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhID8gZGF0YS5zcGxpdCgnXFxuJykubWFwKChzdHIpID0+XHJcbiAgICAgICAgICAgICAgICBwb2ludEZhY3RvcnkuZ2V0UG9pbnQoLi4uc3RyXHJcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCcsJylcclxuICAgICAgICAgICAgICAgICAgICAubWFwKCh2KSA9PiBwYXJzZUludCh2KSlcclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgKSA6IFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhd1JvdXRlU2VxdWVuY2UoY3R4LCBzaW1Bbm5lYWwsIGluZm9FbGVtLCBtaW5Db3N0KXtcclxuICAgICAgICAgICAgaWYgKHNpbUFubmVhbC5pc0RvbmUpe1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYFByb2Nlc3NpbmcgaXMgZG9uZSB3aXRoIGNvc3Qgb2YgJHtzaW1Bbm5lYWwuZ2V0TGFzdFNvbHV0aW9uKCkuY29zdH0uICR7c2ltQW5uZWFsLnNvbHV0aW9ucy5sZW5ndGh9IHNvbHV0aW9ucyBpbiBzdG9ja2ApO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc2ltQW5uZWFsLmdldExhc3RTb2x1dGlvbigpLmV4cG9ydCgpKTtcclxuICAgICAgICAgICAgICAgIGNsZWFyQ2FudmFzKGN0eCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRDb3N0ID0gc2ltQW5uZWFsLmN1cnJlbnRDb3N0O1xyXG4gICAgICAgICAgICBpZiAoIW1pbkNvc3QgfHwgbWluQ29zdCA+IGN1cnJlbnRDb3N0KXtcclxuICAgICAgICAgICAgICAgIGNsZWFyQ2FudmFzKGN0eCk7XHJcbiAgICAgICAgICAgICAgICBkcmF3Um91dGUoY3R4LCBzaW1Bbm5lYWwucG9pbnRzKTtcclxuICAgICAgICAgICAgICAgIG1pbkNvc3QgPSBjdXJyZW50Q29zdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpbmZvRWxlbS5odG1sKGBtaW4uIGNvc3Q6IDxiPiR7bWluQ29zdH08L2I+LiAke3NpbUFubmVhbC5pbmZvfWApO1xyXG5cclxuICAgICAgICAgICAgaWYgKHNpbUFubmVhbC5uZXh0KCkpIHtcclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkcmF3Um91dGVTZXF1ZW5jZShjdHgsIHNpbUFubmVhbCwgaW5mb0VsZW0sIG1pbkNvc3QpO1xyXG4gICAgICAgICAgICAgICAgfSwgNSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhd1BvaW50cyhwb2ludHMsIGNvbnRhaW5lcil7XHJcbiAgICAgICAgICAgICQoY29udGFpbmVyKS5maW5kKCcucm91dGUtcG9pbnQnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgY29uc3Qgc2YgPSBnZXRTY2FsZUZhY3Rvcihwb2ludHMpO1xyXG5cclxuICAgICAgICAgICAgcG9pbnRzLmZvckVhY2goKHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwdCA9IHNmICE9PSAxID8gcG9pbnQuZ2V0U2NhbGVkKHNmKSA6IHBvaW50LmNsb25lKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBweCA9IE1hdGgucm91bmQocHQueCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBweSA9IE1hdGgucm91bmQocHQueSk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwaWQgPSBbJ3JwJywgcG9pbnQueCwgcG9pbnQueV0uam9pbignXycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2ludEVsZW0gPSBhbmd1bGFyLmVsZW1lbnQoYDxkaXYgY2xhc3M9XCJyb3V0ZS1wb2ludFwiIGlkPVwicnBfJHtwb2ludC54fV8ke3BvaW50Lnl9XCI+PHNwYW4+JHtwb2ludC54fXgke3BvaW50Lnl9PC9zcGFuPjwvZGl2PmApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvaW50RWxlbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3A6IHB5ICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogcHggKyAncHgnXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZChwb2ludEVsZW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhd1JvdXRlKGN0eCwgcG9pbnRzLCBjb2xvciA9ICcjMEQ0N0ExJyl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNmID0gZ2V0U2NhbGVGYWN0b3IocG9pbnRzKTtcclxuICAgICAgICAgICAgY29uc3QgcHRzID0gc2YgIT09IDEgPyBwb2ludHMubWFwKChwdCkgPT4gcHQuZ2V0U2NhbGVkKHNmKSkgOiBwb2ludHMuc2xpY2UoKTtcclxuXHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGNvbG9yO1xyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMjtcclxuICAgICAgICAgICAgY3R4LmxpbmVDYXAgPSAncm91bmQnO1xyXG4gICAgICAgICAgICBjdHgubGluZUpvaW4gPSAncm91bmQnO1xyXG5cclxuICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgICAgICAgICBjdHgubW92ZVRvKHB0c1swXS54LCBwdHNbMF0ueSk7XHJcbiAgICAgICAgICAgIHB0cy5zbGljZSgxKS5mb3JFYWNoKChwb2ludCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY3R4LmxpbmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICAgICAgbWFya1N0YXJ0RW5kUG9pbnRzKHBvaW50cyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBtYXJrU3RhcnRFbmRQb2ludHMocG9pbnRzKXtcclxuICAgICAgICAgICAgY29uc3QgZHJhd0VsZW0gPSAkKCcucm91dGUtZHJhdy1jb250YWluZXInKTtcclxuICAgICAgICAgICAgY29uc3QgZmlkID0gYCNycF8ke3BvaW50c1swXS54fV8ke3BvaW50c1swXS55fWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGxpZCA9IGAjcnBfJHtwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdLnh9XyR7cG9pbnRzW3BvaW50cy5sZW5ndGggLSAxXS55fWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGZjbGFzcyA9ICdyb3V0ZS1wb2ludC1maXJzdCc7XHJcbiAgICAgICAgICAgIGNvbnN0IGxjbGFzcyA9ICdyb3V0ZS1wb2ludC1sYXN0JztcclxuICAgICAgICAgICAgZHJhd0VsZW0uZmluZCgnLnJvdXRlLXBvaW50JykucmVtb3ZlQ2xhc3MoZmNsYXNzKS5yZW1vdmVDbGFzcyhsY2xhc3MpO1xyXG4gICAgICAgICAgICBkcmF3RWxlbS5maW5kKGZpZCkuYWRkQ2xhc3MoZmNsYXNzKTtcclxuICAgICAgICAgICAgZHJhd0VsZW0uZmluZChsaWQpLmFkZENsYXNzKGxjbGFzcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBjbGVhckNhbnZhcyhjdHgpe1xyXG4gICAgICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIGN0eC5jYW52YXMud2lkdGgsIGN0eC5jYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGZhY3RvcmlhbCh2YWwsIHJlcyA9IDEpe1xyXG4gICAgICAgICAgICByZXR1cm4gdmFsID4gMCA/IGZhY3RvcmlhbCh2YWwgLSAxLCB2YWwgKiByZXMpIDogcmVzO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZ2V0U2NhbGVGYWN0b3IocG9pbnRzKXtcclxuICAgICAgICAgICAgY29uc3QgY252ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRfc2VhcmNoJyk7XHJcbiAgICAgICAgICAgIGlmICghY252KXtcclxuICAgICAgICAgICAgICAgIHJldHVybiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgbWF4RGltID0gcG9pbnRzLm1hcCgocHQpID0+IE1hdGgubWF4KHB0LngsIHB0LnkpKS5zb3J0KChhLCBiKSA9PiBiIC0gYSlbMF07XHJcbiAgICAgICAgICAgIHJldHVybiBjbnYud2lkdGggLyBtYXhEaW07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBpbml0RG93bmxvYWQgKHVybCkge1xyXG4gICAgICAgICAgICBjb25zdCBhbmNob3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XHJcbiAgICAgICAgICAgIGFuY2hvci5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCB1cmwpO1xyXG4gICAgICAgICAgICBhbmNob3Iuc2V0QXR0cmlidXRlKCdkb3dubG9hZCcsICdyb3V0ZS5wbmcnKTtcclxuICAgICAgICAgICAgY29uc3QgZXYgPSBuZXcgTW91c2VFdmVudCgnY2xpY2snKTtcclxuICAgICAgICAgICAgYW5jaG9yLmRpc3BhdGNoRXZlbnQoZXYpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZm9ybWF0dGVkRmFjdG9yaWFsKG51bSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGZhY3QgPSBmYWN0b3JpYWwobnVtKTtcclxuICAgICAgICAgICAgY29uc3QgcG93ID0gcGFyc2VJbnQoZmFjdC50b1N0cmluZygpLnNwbGl0KCdlKycpWzFdKTtcclxuICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoZmFjdCAvIE1hdGgucG93KDEwLCBwb3cpKS50b1N0cmluZygpICsgKCcwJykucmVwZWF0KHBvdylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy1kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDc4OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwiYWxnby1jb250cm9sc1xcXCIgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBzdGFydFxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PVxcXCI2MFxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIGNlbnRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLXN3aXRjaCBuZy1tb2RlbD1cXFwiY3RybC51c2VQcmVzZXRcXFwiIGFyaWEtbGFiZWw9XFxcIlVzZSBQcmVzZXRcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIFByZXNldCBQb2ludHNcXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtc3dpdGNoPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtY2hlY2tib3ggbmctbW9kZWw9XFxcImN0cmwuaXNDbG9zZWRcXFwiIGFyaWEtbGFiZWw9XFxcIkNsb3NlZCByb3V0ZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgQ2xvc2VkIHJvdXRlXFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLWNoZWNrYm94PlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4IG5nLWlmPVxcXCJjdHJsLnVzZVByZXNldFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgY2xhc3M9XFxcIm1kLWJsb2NrXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Qb2ludHM8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIG5nLW1vZGVsPVxcXCJjdHJsLnByZXNldFxcXCIgcm93cz1cXFwiM1xcXCIgbWF4LXJvd3M9XFxcIjNcXFwiPjwvdGV4dGFyZWE+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXggbmctaWY9XFxcIiFjdHJsLnVzZVByZXNldFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+U2l6ZTwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCI1MDBcXFwiIG1heD1cXFwiMTIwMFxcXCIgbmctbW9kZWw9XFxcImN0cmwubWFwU2l6ZVxcXCIgYXJpYS1sYWJlbD1cXFwicmVkXFxcIiBpZD1cXFwibWFwLXNpemUtc2xpZGVyXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cXFwibWQtd2FyblxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLXNsaWRlcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwubWFwU2l6ZVxcXCIgYXJpYS1sYWJlbD1cXFwibWFwIHNpemVcXFwiIGFyaWEtY29udHJvbHM9XFxcIm1hcC1zaXplLXNsaWRlclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1zbGlkZXItY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlBvaW50czwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1zbGlkZXIgbWluPVxcXCI0XFxcIiBtYXg9XFxcIjEwMFxcXCIgbmctbW9kZWw9XFxcImN0cmwucG9pbnRzTnVtYmVyXFxcIiBhcmlhLWxhYmVsPVxcXCJyZWRcXFwiIGlkPVxcXCJwb2ludHMtbnVtYmVyLXNsaWRlclxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm1kLXdhcm5cXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1zbGlkZXI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVxcXCJudW1iZXJcXFwiIG5nLW1vZGVsPVxcXCJjdHJsLnBvaW50c051bWJlclxcXCIgYXJpYS1sYWJlbD1cXFwicG9pbnRzIG51bWJlclxcXCIgYXJpYS1jb250cm9scz1cXFwicG9pbnRzLW51bWJlci1zbGlkZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtc2xpZGVyLWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD1cXFwiMzBcXFwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiIGxheW91dC1hbGlnbj1cXFwic3BhY2UtYmV0d2VlbiBjZW50ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg9XFxcIjQ1XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1pbnB1dC1jb250YWluZXIgY2xhc3M9XFxcIm5vLWVycm9yc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsPm1heC4gVDwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XFxcIm51bWJlclxcXCIgbmctbW9kZWw9XFxcImN0cmwubWF4VGVtcFxcXCIgYXJpYS1sYWJlbD1cXFwiaW5pdGlhbCB0ZW1wZXJhdHVyZVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLWlucHV0LWNvbnRhaW5lcj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgZmxleD1cXFwiNDVcXFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibm8tZXJyb3JzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWw+bWluLiBUPC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cXFwibnVtYmVyXFxcIiBuZy1tb2RlbD1cXFwiY3RybC5taW5UZW1wXFxcIiBhcmlhLWxhYmVsPVxcXCJtaW5pbWFsIHRlbXBlcmF0dXJlXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gY2VudGVyXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBmbGV4PjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC1wcmltYXJ5XFxcIiBuZy1jbGljaz1cXFwiY3RybC5yZWJ1aWxkUm91dGUoKVxcXCIgYXJpYS1sYWJlbD1cXFwicmVidWlsZCByb3V0ZVxcXCIgbmctZGlzYWJsZWQ9XFxcImN0cmwuc2ltQW5uZWFsICYmIGN0cmwuc2ltQW5uZWFsLmlzUnVubmluZ1xcXCI+UmVwZWF0PC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gY2xhc3M9XFxcIm1kLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLnJlYnVpbGRSb3V0ZSh0cnVlKVxcXCIgYXJpYS1sYWJlbD1cXFwicmVidWlsZCByb3V0ZVxcXCIgbmctZGlzYWJsZWQ9XFxcImN0cmwuc2ltQW5uZWFsICYmIGN0cmwuc2ltQW5uZWFsLmlzUnVubmluZ1xcXCI+U2VhcmNoPC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJjZW50ZXJcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gY2xhc3M9XFxcIm1kLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLmFkZFNvbHV0aW9uKClcXFwiIGFyaWEtbGFiZWw9XFxcInJlYnVpbGQgcm91dGVcXFwiIG5nLWRpc2FibGVkPVxcXCIhY3RybC5wcmVzZXRcXFwiPkFkZDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtYnV0dG9uIGNsYXNzPVxcXCJtZC13YXJuXFxcIiBuZy1jbGljaz1cXFwiY3RybC5zdG9wUm91dGVTZWFyY2goKVxcXCIgYXJpYS1sYWJlbD1cXFwic3RvcCByb3V0ZSBzZWFyY2hcXFwiIG5nLWRpc2FibGVkPVxcXCIhY3RybC5zaW1Bbm5lYWwgfHwgIWN0cmwuc2ltQW5uZWFsLmlzUnVubmluZ1xcXCI+U3RvcDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJhbGdvLWJlbmNobWFya1xcXCIgIG5nLWlmPVxcXCJjdHJsLmJlc3RSb3V0ZVxcXCI+XFxyXFxuICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgIDxwPjxzdHJvbmc+UGVybXV0YXRpb25zPC9zdHJvbmc+PC9wPlxcclxcbiAgICAgICAgICAgIDxwPnt7Y3RybC5iZXN0Um91dGUubGltaXQgfCBwb3dudW1iZXJ9fSAvIHt7Y3RybC5iZXN0Um91dGUudG90YWwgfCBwb3dudW1iZXJ9fTwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPG1kLWRpdmlkZXI+PC9tZC1kaXZpZGVyPlxcclxcbiAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICA8cD48c3Ryb25nPkR1cmF0aW9uPC9zdHJvbmc+PGJyPnt7Y3RybC5iZXN0Um91dGUuZHVyYXRpb259fW1zPC9wPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8bWQtZGl2aWRlcj48L21kLWRpdmlkZXI+XFxyXFxuICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgIDxwPjxzdHJvbmc+U2luZ2xlIHNhbXBsZTwvc3Ryb25nPjxicj57e2N0cmwuYmVzdFJvdXRlLmJlbmNofX1tczwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPG1kLWRpdmlkZXI+PC9tZC1kaXZpZGVyPlxcclxcbiAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICA8cD48c3Ryb25nPkVzdC4gY2FsYy4gdGltZTwvc3Ryb25nPjxicj57e2N0cmwuYmVzdFJvdXRlLmVzdGltYXRlLnllYXJzKCkgfCBwb3dudW1iZXJ9fSB5ZWFyczwvcD5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICA8cD48c3Ryb25nPlN0YXJ0IGNvc3Q8L3N0cm9uZz48YnI+e3tjdHJsLmJlc3RSb3V0ZS5jb3N0fX08L3A+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDwhLS08ZGl2IGNsYXNzPVxcXCJhbGdvLWJlc3Qtcm91dGVcXFwiIG5nLWlmPVxcXCJjdHJsLmJlc3RSb3V0ZSAmJiBjdHJsLnBvaW50c051bWJlciA8IDEwXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbmctcmVwZWF0PVxcXCJpdGVtIGluIGN0cmwuYmVzdFJvdXRlLnN0YXRlIHRyYWNrIGJ5ICRpbmRleFxcXCI+e3tpdGVtLnh9fSB4IHt7aXRlbS55fX08L2Rpdj5cXHJcXG4gICAgPC9kaXY+LS0+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tc29sdXRpb25zXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiXFxyXFxuICAgICAgICAgICAgIGxheW91dC1hbGlnbj1cXFwic3RhcnQgY2VudGVyXFxcIlxcclxcbiAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcInNvbHV0aW9uIGluIGN0cmwuc2ltQW5uZWFsLnNvbHV0aW9uc1xcXCJcXHJcXG4gICAgICAgICAgICAgbmctbW91c2VlbnRlcj1cXFwiY3RybC5mb2N1c1NvbHV0aW9uKCRpbmRleClcXFwiXFxyXFxuICAgICAgICAgICAgIG5nLW1vdXNlbGVhdmU9XFxcImN0cmwuZm9jdXNTb2x1dGlvbigtMSlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLmRvd25sb2FkU29sdXRpb24oJGluZGV4KVxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibGVnZW5kLWJ1bGxldFxcXCIgbmctc3R5bGU9XFxcInsnYmFja2dyb3VuZC1jb2xvcic6IHNvbHV0aW9uLmNvbG9yfVxcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBmbGV4Pnt7c29sdXRpb24uY29zdH19PC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcImFsZ28tZHJhdy1zY3JvbGxlclxcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJyb3V0ZS1kcmF3LWNvbnRhaW5lclxcXCIgbmctc3R5bGU9XFxcInsnbWluLXdpZHRoJzogY3RybC5tYXBTaXplICsgJ3B4JywgJ21pbi1oZWlnaHQnOiBjdHJsLm1hcFNpemUgKyAncHgnfVxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm91dGUtaW5mb1xcXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwicm91dGUtc29sdXRpb25cXFwiXFxyXFxuICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcInNvbHV0aW9uIGluIGN0cmwuc2ltQW5uZWFsLnNvbHV0aW9uc1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxjYW52YXMgd2lkdGg9XFxcInt7Y3RybC5tYXBTaXplfX1cXFwiIGhlaWdodD1cXFwie3tjdHJsLm1hcFNpemV9fVxcXCIgaWQ9XFxcInNvbHV0aW9uX3t7JGluZGV4fX1cXFwiPjwvY2FudmFzPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IG5nLWluaXQ9XFxcImN0cmwuZHJhd1NvbHV0aW9uKCRpbmRleClcXFwiPjwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcInJvdXRlLWN1cnJlbnQtc2VhcmNoXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPGNhbnZhcyB3aWR0aD1cXFwie3tjdHJsLm1hcFNpemV9fVxcXCIgaGVpZ2h0PVxcXCJ7e2N0cmwubWFwU2l6ZX19XFxcIiBpZD1cXFwiY3VycmVudF9zZWFyY2hcXFwiPjwvY2FudmFzPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy90c3Avcm91dGUtZHJhdy10cGwuaHRtbFxuLy8gbW9kdWxlIGlkID0gNzkwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKXtcclxuICAgIHZycC5zZXJ2aWNlKCdyb3V0ZVBsb3R0ZXInLCByb3V0ZVBsb3R0ZXIpO1xyXG4gICAgcm91dGVQbG90dGVyLiRpbmplY3QgPSBbJ3BvaW50RmFjdG9yeSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIHJvdXRlUGxvdHRlcihwb2ludEZhY3Rvcnkpe1xyXG4gICAgICAgIGNvbnN0IENPTE9SUyA9IFtcclxuICAgICAgICAgICAgJyMyMTk2RjMnLFxyXG4gICAgICAgICAgICAnI0Y0NDMzNicsXHJcbiAgICAgICAgICAgICcjRkZDMTA3JyxcclxuICAgICAgICAgICAgJyM0Q0FGNTAnLFxyXG4gICAgICAgICAgICAnI0ZGOTgwMCcsXHJcbiAgICAgICAgICAgICcjMDA5Njg4JyxcclxuICAgICAgICAgICAgJyM5QzI3QjAnLFxyXG4gICAgICAgICAgICAnI0ZGRUIzQicsXHJcbiAgICAgICAgICAgICcjM0Y1MUI1JyxcclxuICAgICAgICAgICAgJyNDRERDMzknXHJcbiAgICAgICAgXTtcclxuXHJcblxyXG5cclxuICAgICAgICBjbGFzcyBSb3V0ZVBsb3R0ZXIge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3RvcihlbGVtZW50KXtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9ICQoZWxlbWVudCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlSW5mbyA9IHRoaXMuZWxlbWVudC5maW5kKCcucm91dGUtaW5mbycpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudF9zZWFyY2gnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29sb3JJdGVyYXRvciA9IENPTE9SUy52YWx1ZXMoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2YgPSAxO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRDb2xvcigpe1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmNvbG9ySXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtLnZhbHVlKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbG9ySXRlcmF0b3IgPSBDT0xPUlMudmFsdWVzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuY29sb3JJdGVyYXRvci5uZXh0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS52YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0UG9pbnRFbGVtKHBvaW50KXtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSAgJChkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSkudGV4dChwb2ludC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHBvaW50LmNzc1N0eWxlLmZvckVhY2goKGNzcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZW0uYWRkQ2xhc3MoY3NzKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldEJlc3RTb2x1dGlvbih2cnAgPSB0aGlzLnZycCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdnJwLnNvbHV0aW9ucy5yZWR1Y2UoKHJlcywgc29sKSA9PiBzb2wuY29zdCA8IHJlcy5jb3N0ID8gc29sIDogcmVzLCB7Y29zdDogTnVtYmVyLk1BWF9WQUxVRX0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0VmVoaWNsZXModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnZlaGljbGVzKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZycC52ZWhpY2xlcy5mb3JFYWNoKCh2aGMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSB2aGMuc3RhcnRMb2NhdGlvbiA/IHZoYy5zdGFydExvY2F0aW9uLmNvb3JkIDogdmhjLmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBvaW50ID0gbmV3IFJvdXRlUG9pbnQoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldENzcygnbWF0ZXJpYWwtaWNvbnMnKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0Q3NzKCd2cnAtdmVoaWNsZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXROYW1lKCdsb2NhbF9zaGlwcGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZXMuc2V0KHZoYy5pZCwgcG9pbnQpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRTaGlwbWVudHModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnNoaXBtZW50cyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2cnAuc2hpcG1lbnRzLmZvckVhY2goKHNoaXBtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3g6IHB4LCB5OiBweX0gPSBzaGlwbWVudC5waWNrdXAubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qge3g6IGR4LCB5OiBkeX0gPSBzaGlwbWVudC5kZWxpdmVyeS5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwbG9jID0gbmV3IFJvdXRlUG9pbnQocHgsIHB5KS5zZXRDc3MoJ3ZycC1waWNrdXAnKS5zZXROYW1lKHNoaXBtZW50LmlkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkbG9jID0gbmV3IFJvdXRlUG9pbnQoZHgsIGR5KS5zZXRDc3MoJ3ZycC1kZWxpdmVyeScpLnNldE5hbWUoc2hpcG1lbnQuaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRzLnNldChzaGlwbWVudC5pZCwge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwaWNrdXA6IHBsb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGl2ZXJ5OiBkbG9jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXBhY2l0eTogc2hpcG1lbnQuY2FwYWNpdHlEZW1hbmQgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdDogTWF0aC5yb3VuZChwbG9jLmdldERpc3RhbmNlKGRsb2MpICogMTApIC8gMTBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0Um91dGVzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC5zb2x1dGlvbnMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3QgYmVzdFNvbHV0aW9uID0gdGhpcy5nZXRCZXN0U29sdXRpb24odnJwKTtcclxuICAgICAgICAgICAgICAgIGJlc3RTb2x1dGlvbi5yb3V0ZXMuZm9yRWFjaCgocm91dGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwb2ludHMgPSByb3V0ZS5hY3QucmVkdWNlKChyZXMsIGFjdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGlwbWVudHMuaGFzKGFjdC5zaGlwbWVudElkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzaHAgPSB0aGlzLnNoaXBtZW50cy5nZXQoYWN0LnNoaXBtZW50SWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnB1c2goYWN0LnR5cGUuc3RhcnRzV2l0aCgncGlja3VwJykgPyBzaHAucGlja3VwIDogc2hwLmRlbGl2ZXJ5KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgW10pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnZlaGljbGVzLmhhcyhyb3V0ZS52ZWhpY2xlSWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnVuc2hpZnQodGhpcy52ZWhpY2xlcy5nZXQocm91dGUudmVoaWNsZUlkKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVzLnNldChyb3V0ZS52ZWhpY2xlSWQsIHtjb2xvcjogdGhpcy5nZXRDb2xvcigpLCBwb2ludHN9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRWUlAodnJwKXtcclxuICAgICAgICAgICAgICAgIHRoaXMudnJwID0gdnJwO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0VmVoaWNsZXModnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRTaGlwbWVudHModnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRSb3V0ZXModnJwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkUG9pbnQocG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbFBvaW50ID0gcG9pbnQuZ2V0U2NhbGVkKHRoaXMuc2YpO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gcmVhbFBvaW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IHRoaXMuZ2V0UG9pbnRFbGVtKHBvaW50KTtcclxuICAgICAgICAgICAgICAgIGVsZW0uY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICB0b3A6IHkgLSAxMiArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogeCAtIDEyICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFNoaXBtZW50KHNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmICghc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwaWNrdXA6IHBsb2MsIGRlbGl2ZXJ5OiBkbG9jfSA9IHNoaXBtZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQocGxvYyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KGRsb2MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kcmF3Um91dGUoW3Bsb2MsIGRsb2NdKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkQ2FwYWNpdHkoc2hpcG1lbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZENhcGFjaXR5KHNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgIGlmICghc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtwaWNrdXA6IHBsb2MsIGNhcGFjaXR5OiBjYXBhY2l0eX0gPSBzaGlwbWVudDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSBhbmd1bGFyLmVsZW1lbnQoJzxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHlcIj48ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5LWxpbmtcIj48L2Rpdj4nICtcclxuICAgICAgICAgICAgICAgICAgICBgPGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eS1kYXRhXCI+JHtjYXBhY2l0eX08L2Rpdj48L2Rpdj5gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJwID0gcGxvYy5nZXRTY2FsZWQodGhpcy5zZik7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBycC55ICsgMTIgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHJwLnggLSAxMiArICdweCdcclxuICAgICAgICAgICAgICAgIH0pLmFkZENsYXNzKCd2cnAtcG9pbnQtaGlkZGVuJyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRyYXdSb3V0ZShwb2ludHMsIGNvbG9yKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnN0cm9rZVN0eWxlID0gY29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgLjIwKSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lV2lkdGggPSAyO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHgubGluZUNhcCA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lSm9pbiA9ICdyb3VuZCc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChjb2xvciA/IFtdIDogWzgsIDhdKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCByZWFsUG9pbnRzID0gcG9pbnRzLm1hcCgocG9pbnQpID0+IHBvaW50LmdldFNjYWxlZCh0aGlzLnNmKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8ocmVhbFBvaW50c1swXS54LCByZWFsUG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICAgICAgcmVhbFBvaW50cy5zbGljZSgxKS5mb3JFYWNoKChwb2ludCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50c1tpZHhdLmdldERpc3RhbmNlKHBvaW50c1tpZHggKyAxXSkudG9GaXhlZCgxKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtaWQgPSBwb2ludHNbaWR4XS5nZXRNaWRQb2ludChwb2ludHNbaWR4ICsgMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC1kaXN0YW5jZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC1wb2ludC1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0TmFtZShkaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvclN0eWxlID0geydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3IgfHwgJyM0NTVBNjQnfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KG1pZCkuY3NzKGNvbG9yU3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZHJhd1NvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Um91dGUoaXRlbS5wb2ludHMsIGl0ZW0uY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxvdFZSUCgpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZycCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzLmZvckVhY2goKHBvaW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChwb2ludCwgVFlQRVMudmVoaWNsZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hpcG1lbnRzLmZvckVhY2goKHNocCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkU2hpcG1lbnQoc2hwKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxvdFNvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiZXN0U29sdXRpb24gPSB0aGlzLnZycC5zb2x1dGlvbnMucmVkdWNlKChyZXMsIHNvbCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzb2wuY29zdCA8IHJlcy5jb3N0ID8gc29sIDogcmVzO1xyXG4gICAgICAgICAgICAgICAgfSwge2Nvc3Q6IE51bWJlci5NQVhfVkFMVUV9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1NvbHV0aW9uKGJlc3RTb2x1dGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHJlc2V0KCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcy5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmZpbmQoJy52cnAtcG9pbnQnKS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0U2NhbGUoc2Ype1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZiA9IHNmO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmdldEluc3RhbmNlID0gKGVsZW0pID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBSb3V0ZVBsb3R0ZXIoZWxlbSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vYXBwL2NvbXBvbmVudHMvdHNwL3JvdXRlLXBsb3R0ZXItc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzkxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odnJwKSB7XHJcbiAgICB2cnAuZGlyZWN0aXZlKCd2cnBEcmF3JywgdnJwRHJhd0RpcmVjdGl2ZSk7XHJcbiAgICB2cnBEcmF3RGlyZWN0aXZlLiRpbmplY3QgPSBbXTtcclxuXHJcbiAgICBmdW5jdGlvbiB2cnBEcmF3RGlyZWN0aXZlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoJy4vdnJwLWRyYXctdHBsLmh0bWwnKSxcclxuICAgICAgICAgICAgYmluZFRvQ29udHJvbGxlcjogdHJ1ZSxcclxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1ZycERyYXdDb250cm9sbGVyJyxcclxuICAgICAgICAgICAgY29udHJvbGxlckFzOiAnY3RybCdcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHZycC5jb250cm9sbGVyKCdWcnBEcmF3Q29udHJvbGxlcicsIFZycERyYXdDb250cm9sbGVyKTtcclxuICAgIFZycERyYXdDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckZWxlbWVudCcsICd2cnBQbG90dGVyJywgJ2FwaVJlcXVlc3QnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBWcnBEcmF3Q29udHJvbGxlcigkc2NvcGUsICRlbGVtZW50LCB2cnBQbG90dGVyLCBhcGlSZXF1ZXN0KSB7XHJcbiAgICAgICAgY29uc3QgdnJwRWxlbSA9ICQoJy52cnAtcG9pbnQtY29udGFpbmVyJyk7XHJcbiAgICAgICAgY29uc3Qgc2V0UmVxdWVzdCA9IGFwaVJlcXVlc3QuZ2V0SW5zdGFuY2Uoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXBpL3ZycCcsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCdcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBsaXN0UmVxdWVzdCA9IGFwaVJlcXVlc3QuZ2V0SW5zdGFuY2Uoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXBpL3ZycC86c2V0JyxcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcclxuICAgICAgICAgICAgcGFyYW1TZXJpYWxpemVyOiAndHBsUXVlcnlTZXJpYWxpemVyJ1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNvbnN0IHNvbHV0aW9uUmVxdWVzdCA9IGFwaVJlcXVlc3QuZ2V0SW5zdGFuY2Uoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXBpL3ZycC86c2V0Lzpzb2x1dGlvbicsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIHBhcmFtU2VyaWFsaXplcjogJ3RwbFF1ZXJ5U2VyaWFsaXplcidcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBzZXRTdW1tYXJ5UmVxdWVzdCA9IGFwaVJlcXVlc3QuZ2V0SW5zdGFuY2Uoe1xyXG4gICAgICAgICAgICB1cmw6ICcvYXBpL3ZycC9hbGwvOmZvbGRlcicsXHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgICAgIHBhcmFtU2VyaWFsaXplcjogJ3RwbFF1ZXJ5U2VyaWFsaXplcidcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zdCBmdWxsU3VtbWFyeVJlcXVlc3QgPSBhcGlSZXF1ZXN0LmdldEluc3RhbmNlKHtcclxuICAgICAgICAgICAgdXJsOiAnL2FwaS92cnAvYWxsJyxcclxuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLnZycERhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc29sdXRpb25TZXRzID0gW107XHJcbiAgICAgICAgdGhpcy5zb2x1dGlvbkxpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLnNvbHV0aW9uTGlzdExvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmZpbHRlcnMgPSB7XHJcbiAgICAgICAgICAgIHNob3dEaXN0OiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0NhcERlbWFuZDogZmFsc2UsXHJcbiAgICAgICAgICAgIHNob3dDdXN0b21Tb2x1dGlvbklucHV0OiBmYWxzZVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNldCA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZFNvbHV0aW9uID0gbnVsbDtcclxuICAgICAgICB0aGlzLnJvdXRlcyA9IFtdO1xyXG4gICAgICAgIHRoaXMucGxvdHRlciA9IHZycFBsb3R0ZXIuZ2V0SW5zdGFuY2UodnJwRWxlbSk7XHJcblxyXG4gICAgICAgIHNldFJlcXVlc3Quc2VuZCgpLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zb2x1dGlvblNldHMgPSByZXNwLmRhdGEuc2xpY2UoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBmdWxsU3VtbWFyeVJlcXVlc3Quc2VuZCgpLnRoZW4oKHJlc3ApID0+IHtcclxuICAgICAgICAvLyAgICAgY29uc3Qgc3VtbWFyeSA9IEltbXV0YWJsZS5mcm9tSlMocmVzcC5kYXRhKTtcclxuICAgICAgICAvLyAgICAgY29uc3QgY29sdW1ucyA9IHN1bW1hcnkua2V5U2VxKCkudG9BcnJheSgpLnNvcnQoKTtcclxuICAgICAgICAvLyAgICAgY29uc3Qgcm93cyA9IHN1bW1hcnkuZmxhdHRlbigwKS5rZXlTZXEoKS50b0FycmF5KCkuc29ydCgpO1xyXG4gICAgICAgIC8vICAgICBjb25zdCBncmlkID0gW1sncHJvYmxlbScsIC4uLmNvbHVtbnNdXS5jb25jYXQocm93cy5tYXAoKHJvdykgPT4gW3JvdywgLi4uY29sdW1ucy5tYXAoKGNvbCkgPT4gc3VtbWFyeS5nZXRJbihbY29sLCByb3ddKSldKSk7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGdyaWQubWFwKChyb3cpID0+IHJvdy5qb2luKCdcXHQnKSkuam9pbignXFxuJykpO1xyXG4gICAgICAgIC8vIH0pO1xyXG5cclxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdjdHJsLmZpbHRlcnMuc2hvd0Rpc3QnLCAobnZhbCkgPT4ge1xyXG4gICAgICAgICAgICAkKCcudnJwLWRpc3RhbmNlJykudG9nZ2xlQ2xhc3MoJ3ZycC1wb2ludC1oaWRkZW4nLCAhbnZhbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ2N0cmwuZmlsdGVycy5zaG93Q2FwRGVtYW5kJywgKG52YWwpID0+IHtcclxuICAgICAgICAgICAgJCgnLnZycC1jYXBhY2l0eScpLnRvZ2dsZUNsYXNzKCd2cnAtcG9pbnQtaGlkZGVuJywgIW52YWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZVNldENoYW5nZSA9ICgpID0+IHtcclxuICAgICAgICAgICAgbGlzdFJlcXVlc3Quc2VuZCh7c2V0OiB0aGlzLnNlbGVjdGVkU2V0fSkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zb2x1dGlvbkxpc3QgPSByZXNwLmRhdGEuc2xpY2UoKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB0aGlzLmhhbmRsZVNvbHV0aW9uQ2hhbmdlID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBzb2x1dGlvblJlcXVlc3Quc2VuZCh7c2V0OiB0aGlzLnNlbGVjdGVkU2V0LCBzb2x1dGlvbjogdGhpcy5zZWxlY3RlZFNvbHV0aW9ufSkudGhlbigocmVzcCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3AuZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3V0ZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsb3R0ZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnJlc2V0KClcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnNldFZSUChyZXNwLmRhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5wbG90VlJQKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5wbG90VlJQID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudnJwRGF0YSAmJiAhdGhpcy5wbG90dGVyLnZycCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudnJwRGF0YSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2cnAgPSBKU09OLnBhcnNlKHRoaXMudnJwRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsb3R0ZXIucmVzZXQoKS5zZXRWUlAodnJwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnBsb3R0ZXIucGxvdFZSUCgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucGxvdFNvbHV0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudnJwRGF0YSAmJiAhdGhpcy5wbG90dGVyLnZycCl7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMudnJwRGF0YSl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2cnAgPSBKU09OLnBhcnNlKHRoaXMudnJwRGF0YSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsb3R0ZXIucmVzZXQoKS5zZXRWUlAodnJwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnJvdXRlcyA9IFsuLi50aGlzLnBsb3R0ZXIucm91dGVzLnZhbHVlcygpXTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5yb3V0ZXMucmVkdWNlKChyZXMsIGl0ZW0pID0+IHJlcyArIGl0ZW0uZGlzdGFuY2UsIDApKVxyXG4gICAgICAgICAgICB0aGlzLnBsb3R0ZXIucGxvdFNvbHV0aW9uKCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2FwcC9jb21wb25lbnRzL3ZycC92cnAtZHJhdy1kaXJlY3RpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDc5MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdiBsYXlvdXQ9XFxcImNvbHVtblxcXCIgZmxleD5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidnJwLWNvbnRyb2xzXFxcIiBsYXlvdXQ9XFxcInJvd1xcXCIgbGF5b3V0LWFsaWduPVxcXCJzcGFjZS1iZXR3ZWVuIHN0YXJ0XFxcIj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg9XFxcIjUwXFxcIj5cXHJcXG4gICAgICAgICAgICA8bWQtc3dpdGNoIG5nLW1vZGVsPVxcXCJjdHJsLmZpbHRlcnMuc2hvd0N1c3RvbVNvbHV0aW9uSW5wdXRcXFwiIGFyaWEtbGFiZWw9XFxcIlNob3cgRGlzdGFuY2VzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgU2hvdyBjdXN0b20gc29sdXRpb24gaW5wdXRcXHJcXG4gICAgICAgICAgICA8L21kLXN3aXRjaD5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwicm93XFxcIiBsYXlvdXQtYWxpZ249XFxcInNwYWNlLWJldHdlZW4gY2VudGVyXFxcIiBuZy1zaG93PVxcXCIhY3RybC5maWx0ZXJzLnNob3dDdXN0b21Tb2x1dGlvbklucHV0XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBmbGV4PVxcXCI0NVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bGFiZWw+U29sdXRpb24gU2V0PC9sYWJlbD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxtZC1zZWxlY3QgbmFtZT1cXFwic29sdXRpb25fc2V0XFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwic2VsZWN0IHNvbHV0aW9uIHNldFxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctbW9kZWw9XFxcImN0cmwuc2VsZWN0ZWRTZXRcXFwiXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5nLWNoYW5nZT1cXFwiY3RybC5oYW5kbGVTZXRDaGFuZ2UoKVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPG1kLW9wdGlvbiBuZy12YWx1ZT1cXFwiaXRlbVxcXCIgbmctcmVwZWF0PVxcXCJpdGVtIGluIGN0cmwuc29sdXRpb25TZXRzXFxcIiBuZy1zZWxlY3RlZD1cXFwiJGZpcnN0XFxcIj57e2l0ZW19fTwvbWQtb3B0aW9uPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPC9tZC1zZWxlY3Q+XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtaW5wdXQtY29udGFpbmVyPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtaW5wdXQtY29udGFpbmVyIGZsZXg9XFxcIjQ1XFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbD5Tb2x1dGlvbjwvbGFiZWw+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8bWQtc2VsZWN0IG5hbWU9XFxcInNvbHV0aW9uXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZWhvbGRlcj1cXFwic2VsZWN0IHNvbHV0aW9uXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1tb2RlbD1cXFwiY3RybC5zZWxlY3RlZFNvbHV0aW9uXFxcIlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZy1jaGFuZ2U9XFxcImN0cmwuaGFuZGxlU29sdXRpb25DaGFuZ2UoKVxcXCJcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmctZGlzYWJsZWQ9XFxcImN0cmwuc29sdXRpb25MaXN0TG9hZGluZ1xcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPG1kLW9wdGlvbiBtZC1vcHRpb24tZW1wdHkgbmctdmFsdWU9XFxcIm51bGxcXFwiPm5vbmU8L21kLW9wdGlvbj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8bWQtb3B0aW9uIG5nLXZhbHVlPVxcXCJpdGVtXFxcIiBuZy1yZXBlYXQ9XFxcIml0ZW0gaW4gY3RybC5zb2x1dGlvbkxpc3RcXFwiPnt7aXRlbX19PC9tZC1vcHRpb24+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8L21kLXNlbGVjdD5cXHJcXG4gICAgICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPG1kLWlucHV0LWNvbnRhaW5lciBjbGFzcz1cXFwibWQtYmxvY2tcXFwiIG5nLXNob3c9XFxcImN0cmwuZmlsdGVycy5zaG93Q3VzdG9tU29sdXRpb25JbnB1dFxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxsYWJlbD5WUlA8L2xhYmVsPlxcclxcbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbmctbW9kZWw9XFxcImN0cmwudnJwRGF0YVxcXCIgcm93cz1cXFwiNlxcXCIgbWF4LXJvd3M9XFxcIjZcXFwiPjwvdGV4dGFyZWE+XFxyXFxuICAgICAgICAgICAgPC9tZC1pbnB1dC1jb250YWluZXI+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgbGF5b3V0PVxcXCJjb2x1bW5cXFwiIGZsZXg9XFxcIjQwXFxcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGxheW91dD1cXFwiY29sdW1uXFxcIiBmbGV4PlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc3dpdGNoIG5nLW1vZGVsPVxcXCJjdHJsLmZpbHRlcnMuc2hvd0Rpc3RcXFwiIGFyaWEtbGFiZWw9XFxcIlNob3cgRGlzdGFuY2VzXFxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIFNob3cgZGlzdGFuY2VzXFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtc3dpdGNoPlxcclxcbiAgICAgICAgICAgICAgICA8bWQtc3dpdGNoIG5nLW1vZGVsPVxcXCJjdHJsLmZpbHRlcnMuc2hvd0NhcERlbWFuZFxcXCIgYXJpYS1sYWJlbD1cXFwiU2hvdyByZXF1aXJlZCBjYXBhY2l0eVxcXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICBTaG93IHJlcXVpcmVkIGNhcGFjaXR5XFxyXFxuICAgICAgICAgICAgICAgIDwvbWQtc3dpdGNoPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDxkaXYgbGF5b3V0PVxcXCJyb3dcXFwiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGZsZXg+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gbmctY2xpY2s9XFxcImN0cmwucGxvdHRlci5yZXNldCgpXFxcIiBhcmlhLWxhYmVsPVxcXCJyZXNldFxcXCIgbmctZGlzYWJsZWQ9XFxcIiFjdHJsLnBsb3R0ZXJcXFwiPlJlc2V0PC9tZC1idXR0b24+XFxyXFxuICAgICAgICAgICAgICAgIDxtZC1idXR0b24gY2xhc3M9XFxcIm1kLXByaW1hcnlcXFwiIG5nLWNsaWNrPVxcXCJjdHJsLnBsb3RTb2x1dGlvbigpXFxcIiBhcmlhLWxhYmVsPVxcXCJkcmF3IFNvbHV0aW9uXFxcIiBuZy1kaXNhYmxlZD1cXFwiIWN0cmwucGxvdHRlclxcXCI+U29sdXRpb248L21kLWJ1dHRvbj5cXHJcXG4gICAgICAgICAgICAgICAgPG1kLWJ1dHRvbiBjbGFzcz1cXFwibWQtcHJpbWFyeVxcXCIgbmctY2xpY2s9XFxcImN0cmwucGxvdFZSUCgpXFxcIiBhcmlhLWxhYmVsPVxcXCJkcmF3IFZSUFxcXCIgbmctZGlzYWJsZWQ9XFxcIiFjdHJsLnBsb3R0ZXJcXFwiPlZSUDwvbWQtYnV0dG9uPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVxcXCJ2cnAtY29zdFxcXCI+XFxyXFxuICAgICAgICBTb2x1dGlvbiBjb3N0OiA8c3Bhbj57e2N0cmwucGxvdHRlciAmJiBjdHJsLnBsb3R0ZXIuYmVzdCA/IGN0cmwucGxvdHRlci5iZXN0LmNvc3QgOiAwIHwgbnVtYmVyIDogMn19PC9zcGFuPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cXFwidnJwLXJvdXRlc1xcXCI+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJ2cnAtcm91dGVzLWl0ZW1cXFwiIG5nLXJlcGVhdD1cXFwiaXRlbSBpbiBjdHJsLnJvdXRlc1xcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidnJwLXJvdXRlLWJ1bGxldFxcXCIgbmctc3R5bGU9XFxcInsnYmFja2dyb3VuZC1jb2xvcic6IGl0ZW0uY29sb3J9XFxcIj48L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2PjxzdHJvbmc+e3tpdGVtLnZlaGljbGVJZH19PC9zdHJvbmc+PC9kaXY+XFxyXFxuICAgICAgICAgICAgPGRpdj5kOiB7e2l0ZW0uZGlzdGFuY2UgfCBudW1iZXIgOiAyfX08L2Rpdj5cXHJcXG4gICAgICAgICAgICA8ZGl2PmM6IHt7aXRlbS5jYXBhY2l0eX19PC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XFxcInZycC1kcmF3LXNjcm9sbGVyXFxcIj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInZycC1kcmF3LWNvbnRhaW5lclxcXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwidnJwLXBvaW50LWNvbnRhaW5lclxcXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxjYW52YXMgd2lkdGg9XFxcIjgwMFxcXCIgaGVpZ2h0PVxcXCI4MDBcXFwiPjwvY2FudmFzPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgIDwvZGl2PlxcclxcbjwvZGl2PlwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy92cnAvdnJwLWRyYXctdHBsLmh0bWxcbi8vIG1vZHVsZSBpZCA9IDc5M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHZycCl7XHJcbiAgICB2cnAuc2VydmljZSgndnJwUGxvdHRlcicsIHZycFBsb3R0ZXIpO1xyXG4gICAgdnJwUGxvdHRlci4kaW5qZWN0ID0gWydwb2ludEZhY3RvcnknXTtcclxuXHJcbiAgICBmdW5jdGlvbiB2cnBQbG90dGVyKHBvaW50RmFjdG9yeSl7XHJcbiAgICAgICAgY29uc3QgVFlQRVMgPSB7XHJcbiAgICAgICAgICAgIGRlbGl2ZXJ5OiB7XHJcbiAgICAgICAgICAgICAgICBjc3NDbGFzczogJ3ZycC1kZWxpdmVyeSBtYXRlcmlhbC1pY29ucycsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnYXJjaGl2ZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcGlja3VwOiB7XHJcbiAgICAgICAgICAgICAgICBjc3NDbGFzczogJ3ZycC1waWNrdXAgbWF0ZXJpYWwtaWNvbnMnLFxyXG4gICAgICAgICAgICAgICAgaWNvbjogJ3VuYXJjaGl2ZSdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdmVoaWNsZToge1xyXG4gICAgICAgICAgICAgICAgY3NzQ2xhc3M6ICd2cnAtdmVoaWNsZSBtYXRlcmlhbC1pY29ucycsXHJcbiAgICAgICAgICAgICAgICBpY29uOiAnbG9jYWxfc2hpcHBpbmcnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IENPTE9SUyA9IFtcclxuICAgICAgICAgICAgJyMyMTk2RjMnLFxyXG4gICAgICAgICAgICAnI0Y0NDMzNicsXHJcbiAgICAgICAgICAgICcjRkZDMTA3JyxcclxuICAgICAgICAgICAgJyM0Q0FGNTAnLFxyXG4gICAgICAgICAgICAnI0ZGOTgwMCcsXHJcbiAgICAgICAgICAgICcjMDA5Njg4JyxcclxuICAgICAgICAgICAgJyM5QzI3QjAnLFxyXG4gICAgICAgICAgICAnI0ZGRUIzQicsXHJcbiAgICAgICAgICAgICcjM0Y1MUI1JyxcclxuICAgICAgICAgICAgJyNDRERDMzknXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgY2xhc3MgUm91dGVQb2ludCBleHRlbmRzIHBvaW50RmFjdG9yeS5SUG9pbnQge1xyXG4gICAgICAgICAgICBjb25zdHJ1Y3Rvcih4LCB5KXtcclxuICAgICAgICAgICAgICAgIHN1cGVyKHgsIHkpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3NTdHlsZSA9IFtdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uYW1lID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3NzU3R5bGUucHVzaCgndnJwLXBvaW50Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldENzcyhjc3Mpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jc3NTdHlsZS5wdXNoKGNzcyk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0TmFtZShuYW1lKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xhc3MgVlJQUGxvdHRlciB7XHJcbiAgICAgICAgICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gJChlbGVtZW50KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzID0gdGhpcy5lbGVtZW50LmZpbmQoJ2NhbnZhcycpWzBdO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwbWVudHMgPSBuZXcgTWFwKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcyA9IG5ldyBNYXAoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVzID0gbmV3IE1hcCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xvckl0ZXJhdG9yID0gQ09MT1JTLnZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc1ggPSAoeCkgPT4geDtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNZID0gKHkpID0+IHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZycCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3QgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXQgaXNFbXB0eSgpe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICF0aGlzLnZycDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZ2V0Q29sb3IoKXtcclxuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5jb2xvckl0ZXJhdG9yLm5leHQoKTtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS52YWx1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb2xvckl0ZXJhdG9yID0gQ09MT1JTLnZhbHVlcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmNvbG9ySXRlcmF0b3IubmV4dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0udmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGdldFBvaW50RWxlbShwb2ludCl7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gICQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JykpLnRleHQocG9pbnQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwb2ludC5jc3NTdHlsZS5mb3JFYWNoKChjc3MpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGVtLmFkZENsYXNzKGNzcyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBnZXRCZXN0U29sdXRpb24odnJwID0gdGhpcy52cnApe1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHZycC5zb2x1dGlvbnMucmVkdWNlKChyZXMsIHNvbCkgPT4gc29sLmNvc3QgPCByZXMuY29zdCA/IHNvbCA6IHJlcywge2Nvc3Q6IE51bWJlci5NQVhfVkFMVUV9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFZlaGljbGVzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC52ZWhpY2xlcyl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2cnAudmVoaWNsZXMuZm9yRWFjaCgodmhjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmhjTG9jID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogbnVsbCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZW5kOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBydHA6IHZoYy5yZXR1cm5Ub0RlcG90XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmhjLnN0YXJ0TG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB7eCwgeX0gPSB2aGMuc3RhcnRMb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmhjTG9jLnN0YXJ0ID0gbmV3IFJvdXRlUG9pbnQoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ21hdGVyaWFsLWljb25zJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC12ZWhpY2xlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXROYW1lKCdsb2NhbF9zaGlwcGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodmhjLmVuZExvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qge3gsIHl9ID0gdmhjLmVuZExvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2aGNMb2MuZW5kID0gbmV3IFJvdXRlUG9pbnQoeCwgeSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ21hdGVyaWFsLWljb25zJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC12ZWhpY2xlJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZXROYW1lKCdsb2NhbF9zaGlwcGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXZoYy5yZXR1cm5Ub0RlcG90ICYmIHZoY0xvYy5lbmQuZXF1YWxzKHZoY0xvYy5zdGFydCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmhjTG9jLmVuZCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52ZWhpY2xlcy5zZXQodmhjLmlkLCB2aGNMb2MpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRTaGlwbWVudHModnJwKXtcclxuICAgICAgICAgICAgICAgIGlmICghdnJwLnNoaXBtZW50cyB8fCAhdnJwLnNoaXBtZW50cy5sZW5ndGgpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdnJwLnNoaXBtZW50cy5mb3JFYWNoKChzaGlwbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4OiBweCwgeTogcHl9ID0gc2hpcG1lbnQucGlja3VwLmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4OiBkeCwgeTogZHl9ID0gc2hpcG1lbnQuZGVsaXZlcnkubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGxvYyA9IG5ldyBSb3V0ZVBvaW50KHB4LCBweSkuc2V0Q3NzKCd2cnAtcGlja3VwJykuc2V0TmFtZShzaGlwbWVudC5pZC5zbGljZSgzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGxvYyA9IG5ldyBSb3V0ZVBvaW50KGR4LCBkeSkuc2V0Q3NzKCd2cnAtZGVsaXZlcnknKS5zZXROYW1lKHNoaXBtZW50LmlkLnNsaWNlKDMpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cy5zZXQoc2hpcG1lbnQuaWQsIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGlja3VwOiBwbG9jLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxpdmVyeTogZGxvYyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHk6IHNoaXBtZW50LmNhcGFjaXR5RGVtYW5kWzBdIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3Q6IE1hdGgucm91bmQocGxvYy5nZXREaXN0YW5jZShkbG9jKSAqIDEwKSAvIDEwXHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHNldFNlcnZpY2VzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC5zZXJ2aWNlcyB8fCAhdnJwLnNlcnZpY2VzLmxlbmd0aCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2cnAuc2VydmljZXMuZm9yRWFjaCgoc2VydmljZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHNlcnZpY2UubG9jYXRpb24uY29vcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbG9jID0gbmV3IFJvdXRlUG9pbnQoeCwgeSkuc2V0Q3NzKCd2cnAtJyArIHNlcnZpY2UudHlwZSkuc2V0TmFtZShzZXJ2aWNlLmlkLnNsaWNlKDMpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2VzLnNldChzZXJ2aWNlLmlkLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uOiBsb2MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhcGFjaXR5OiBzZXJ2aWNlLmNhcGFjaXR5RGVtYW5kWzBdIHx8IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2V0Um91dGVzKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZycC5zb2x1dGlvbnMpe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdGhpcy5iZXN0ID0gdGhpcy5nZXRCZXN0U29sdXRpb24odnJwKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuYmVzdC5yb3V0ZXMuZm9yRWFjaCgocm91dGUsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlaGljbGUgPSB0aGlzLnZlaGljbGVzLmdldChyb3V0ZS52ZWhpY2xlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghdmVoaWNsZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3VtbWFyeSA9IHJvdXRlLmFjdC5yZWR1Y2UoKHJlcywgYWN0KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHByZXZMb2MgPSByZXMucG9pbnRzW3Jlcy5wb2ludHMubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBsb2MgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgY2FwYWNpdHkgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zaGlwbWVudHMuaGFzKGFjdC5qb2JJZCkpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hwID0gdGhpcy5zaGlwbWVudHMuZ2V0KGFjdC5qb2JJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2MgPSBzaHAuZGVsaXZlcnk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWN0LnR5cGUuc3RhcnRzV2l0aCgncGlja3VwJykpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvYyA9IHNocC5waWNrdXA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHkgPSBzaHAuY2FwYWNpdHlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlcy5oYXMoYWN0LmpvYklkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdmMgPSB0aGlzLnNlcnZpY2VzLmdldChhY3Quam9iSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jID0gc3ZjLmxvY2F0aW9uO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHkgPSBzdmMuY2FwYWNpdHk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzLnBvaW50cy5wdXNoKGxvYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5kaXN0YW5jZSArPSBwcmV2TG9jLmdldERpc3RhbmNlKGxvYyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcy5jYXBhY2l0eSArPSBjYXBhY2l0eTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcclxuICAgICAgICAgICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50czogW3ZlaGljbGUuc3RhcnRdLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FwYWNpdHk6IDBcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmVoaWNsZS5lbmQpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdW1tYXJ5LmRpc3RhbmNlICs9IHN1bW1hcnkucG9pbnRzW3N1bW1hcnkucG9pbnRzLmxlbmd0aCAtIDFdLmdldERpc3RhbmNlKHZlaGljbGUuZW5kKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3VtbWFyeS5wb2ludHMucHVzaCh2ZWhpY2xlLmVuZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHN1bW1hcnkuY29sb3IgPSB0aGlzLmdldENvbG9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VtbWFyeS52ZWhpY2xlSWQgPSByb3V0ZS52ZWhpY2xlSWQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVzLnNldCgncm91dGUnICsgaWR4LCBzdW1tYXJ5KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3QudW5hc3NpZ25lZEpvYnMuZm9yRWFjaCgoam9iKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc2hpcG1lbnRzLmhhcyhqb2IuaWQpKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hwID0gdGhpcy5zaGlwbWVudHMuZ2V0KGpvYi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNocC5kZWxpdmVyeS5zZXRDc3MoJ3ZycC11bmFzc2lnbmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNocC5waWNrdXAuc2V0Q3NzKCd2cnAtdW5hc3NpZ25lZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZXJ2aWNlcy5oYXMoam9iLmlkKSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN2YyA9IHRoaXMuc2VydmljZXMuZ2V0KGpvYi5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN2Yy5sb2NhdGlvbi5zZXRDc3MoJ3ZycC11bmFzc2lnbmVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRWUlAodnJwID0ge30pe1xyXG4gICAgICAgICAgICAgICAgdGhpcy52cnAgPSB2cnA7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zZXRTY2FsZSh2cnApXHJcbiAgICAgICAgICAgICAgICAgICAgLnNldFZlaGljbGVzKHZycClcclxuICAgICAgICAgICAgICAgICAgICAuc2V0U2hpcG1lbnRzKHZycClcclxuICAgICAgICAgICAgICAgICAgICAuc2V0U2VydmljZXModnJwKVxyXG4gICAgICAgICAgICAgICAgICAgIC5zZXRSb3V0ZXModnJwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkUG9pbnQocG9pbnQpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcmVhbFBvaW50ID0gcG9pbnQuZ2V0VHJhbnNmb3JtZWQodGhpcy50cmFuc1gsIHRoaXMudHJhbnNZKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHJlYWxQb2ludDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsZW0gPSB0aGlzLmdldFBvaW50RWxlbShwb2ludCk7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB5IC0gMTIgKyAncHgnLFxyXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHggLSAxMiArICdweCdcclxuICAgICAgICAgICAgICAgIH0pLmF0dHIoJ2lkJywgcG9pbnQudG9TdHJpbmcoKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kKGVsZW0pO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW07XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFNlcnZpY2Uoc2VydmljZSl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNlcnZpY2Upe1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGNvbnN0IHtsb2NhdGlvbjogbG9jfSA9IHNlcnZpY2U7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChsb2MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJ2aWNlQ2FwYWNpdHkoc2VydmljZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYWRkU2VydmljZUNhcGFjaXR5KHNlcnZpY2Upe1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzZXJ2aWNlKXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7bG9jYXRpb246IGxvYywgY2FwYWNpdHk6IGNhcGFjaXR5fSA9IHNlcnZpY2U7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtID0gYW5ndWxhci5lbGVtZW50KCc8ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5XCI+PGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eS1saW5rXCI+PC9kaXY+JyArXHJcbiAgICAgICAgICAgICAgICAgICAgYDxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHktZGF0YVwiPiR7Y2FwYWNpdHl9PC9kaXY+PC9kaXY+YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBycCA9IGxvYy5nZXRUcmFuc2Zvcm1lZCh0aGlzLnRyYW5zWCwgdGhpcy50cmFuc1kpO1xyXG4gICAgICAgICAgICAgICAgZWxlbS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgIHRvcDogcnAueSArIDEwICsgJ3B4JyxcclxuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBycC54IC0gMTAgKyAncHgnXHJcbiAgICAgICAgICAgICAgICB9KS5hZGRDbGFzcygndnJwLXBvaW50LWhpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZChlbGVtKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBlbGVtO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBhZGRTaGlwbWVudChzaGlwbWVudCl7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNoaXBtZW50KXtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7cGlja3VwOiBwbG9jLCBkZWxpdmVyeTogZGxvY30gPSBzaGlwbWVudDtcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KHBsb2MpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQb2ludChkbG9jKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZHJhd1JvdXRlKFtwbG9jLCBkbG9jXSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFNoaXBtZW50Q2FwYWNpdHkoc2hpcG1lbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGFkZFNoaXBtZW50Q2FwYWNpdHkoc2hpcG1lbnQpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCFzaGlwbWVudCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgY29uc3Qge3BpY2t1cDogcGxvYywgY2FwYWNpdHk6IGNhcGFjaXR5fSA9IHNoaXBtZW50O1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWxlbSA9IGFuZ3VsYXIuZWxlbWVudCgnPGRpdiBjbGFzcz1cInZycC1jYXBhY2l0eVwiPjxkaXYgY2xhc3M9XCJ2cnAtY2FwYWNpdHktbGlua1wiPjwvZGl2PicgK1xyXG4gICAgICAgICAgICAgICAgICAgIGA8ZGl2IGNsYXNzPVwidnJwLWNhcGFjaXR5LWRhdGFcIj4ke2NhcGFjaXR5fTwvZGl2PjwvZGl2PmApO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcnAgPSBwbG9jLmdldFRyYW5zZm9ybWVkKHRoaXMudHJhbnNYLCB0aGlzLnRyYW5zWSk7XHJcbiAgICAgICAgICAgICAgICBlbGVtLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9wOiBycC55ICsgOCArICdweCcsXHJcbiAgICAgICAgICAgICAgICAgICAgbGVmdDogcnAueCAtIDE2ICsgJ3B4J1xyXG4gICAgICAgICAgICAgICAgfSkuYWRkQ2xhc3MoJ3ZycC1wb2ludC1oaWRkZW4nKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmQoZWxlbSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZHJhd1JvdXRlKHBvaW50cywgY29sb3Ipe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSBjb2xvciB8fCAncmdiYSgwLCAwLCAwLCAuMjApJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVXaWR0aCA9IDI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5saW5lQ2FwID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVKb2luID0gJ3JvdW5kJztcclxuICAgICAgICAgICAgICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKGNvbG9yID8gW10gOiBbOCwgOF0pO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlYWxQb2ludHMgPSBwb2ludHMubWFwKChwb2ludCkgPT4gcG9pbnQuZ2V0VHJhbnNmb3JtZWQodGhpcy50cmFuc1gsIHRoaXMudHJhbnNZKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguYmVnaW5QYXRoKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5tb3ZlVG8ocmVhbFBvaW50c1swXS54LCByZWFsUG9pbnRzWzBdLnkpO1xyXG4gICAgICAgICAgICAgICAgcmVhbFBvaW50cy5zbGljZSgxKS5mb3JFYWNoKChwb2ludCwgaWR4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdCA9IHBvaW50c1tpZHhdLmdldERpc3RhbmNlKHBvaW50c1tpZHggKyAxXSkudG9GaXhlZCgxKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtaWQgPSBwb2ludHNbaWR4XS5nZXRNaWRQb2ludChwb2ludHNbaWR4ICsgMV0pXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC1kaXN0YW5jZScpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXRDc3MoJ3ZycC1wb2ludC1oaWRkZW4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0TmFtZShkaXN0KTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb2xvclN0eWxlID0geydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3IgfHwgJyM0NTVBNjQnfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBvaW50KG1pZCkuY3NzKGNvbG9yU3R5bGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3R4LmxpbmVUbyhwb2ludC54LCBwb2ludC55KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZHJhd1NvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmF3Um91dGUoaXRlbS5wb2ludHMsIGl0ZW0uY29sb3IpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxvdFZSUCgpe1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnZycCl7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZlaGljbGVzLmZvckVhY2goKHZoYykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQodmhjLnN0YXJ0LCBUWVBFUy52ZWhpY2xlKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodmhjLmVuZCAmJiAhdmhjLmVuZC5lcXVhbHModmhjLnN0YXJ0KSl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUG9pbnQodmhjLmVuZCwgVFlQRVMudmVoaWNsZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNoaXBtZW50cy5mb3JFYWNoKChzaHApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFNoaXBtZW50KHNocCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZXMuZm9yRWFjaCgoc3ZjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRTZXJ2aWNlKHN2Yyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGxvdFNvbHV0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRyYXdTb2x1dGlvbigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICByZXNldCgpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaGlwbWVudHMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VydmljZXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmVoaWNsZXMuY2xlYXIoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMucm91dGVzLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQuZmluZCgnLnZycC1wb2ludCwgLnZycC1jYXBhY2l0eScpLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc1ggPSAoeCkgPT4geDtcclxuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNZID0gKHkpID0+IHk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZycCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJlc3QgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldFNjYWxlKHZycCl7XHJcbiAgICAgICAgICAgICAgICBpZiAodnJwKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aGNMb2NzID0gdnJwLnZlaGljbGVzLnJlZHVjZSgocmVzLCB2aGMpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZoYy5zdGFydExvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB7eCwgeX0gPSB2aGMuc3RhcnRMb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1swXS5wdXNoKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzFdLnB1c2goeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZoYy5lbmRMb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge3gsIHl9ID0gdmhjLmVuZExvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzBdLnB1c2goeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNbMV0ucHVzaCh5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIFtbXSwgW11dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ZjTG9jcyA9IHZycC5zZXJ2aWNlcy5yZWR1Y2UoKHJlcywgc3ZjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHt4LCB5fSA9IHN2Yy5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzBdLnB1c2goeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc1sxXS5wdXNoKHkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIFtbXSwgW11dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hwTG9jcyA9IHZycC5zaGlwbWVudHMucmVkdWNlKChyZXMsIHNocCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hwLnBpY2t1cC5sb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge3gsIHl9ID0gc2hwLnBpY2t1cC5sb2NhdGlvbi5jb29yZDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc1swXS5wdXNoKHgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzFdLnB1c2goeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNocC5kZWxpdmVyeS5sb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQge3gsIHl9ID0gc2hwLmRlbGl2ZXJ5LmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzWzBdLnB1c2goeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNbMV0ucHVzaCh5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIFtbXSwgW11dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeE1pbk1heCA9IHZoY0xvY3NbMF0uY29uY2F0KHN2Y0xvY3NbMF0pLmNvbmNhdChzaHBMb2NzWzBdKS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeU1pbk1heCA9IHZoY0xvY3NbMV0uY29uY2F0KHN2Y0xvY3NbMV0pLmNvbmNhdChzaHBMb2NzWzFdKS5zb3J0KChhLCBiKSA9PiBhIC0gYik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeW1pbiA9IHlNaW5NYXguc2hpZnQoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB5bWF4ID0geU1pbk1heC5wb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB4bWluID0geE1pbk1heC5zaGlmdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHhtYXggPSB4TWluTWF4LnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1heERpbSA9IE1hdGgubWF4KCh4bWF4LXhtaW4pLCAoeW1heC15bWluKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFt4bWluLCB4bWF4LCB5bWluLCB5bWF4LCBtYXhEaW1dKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgdmhjTWF4ID0gdnJwLnZlaGljbGVzLm1hcCgodmhjKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBzbWF4ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGVtYXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZiAodmhjLnN0YXJ0TG9jYXRpb24pe1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgbGV0IHt4LCB5fSA9IHZoYy5zdGFydExvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgc21heCA9IE1hdGgubWF4KHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHZoYy5lbmRMb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQge3gsIHl9ID0gdmhjLmVuZExvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZW1heCA9IE1hdGgubWF4KHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIE1hdGgubWF4KHNtYXgsIGVtYXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pLnNvcnQoKGEsIGIpID0+IGIgLSBhKVswXSB8fCAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qgc3ZjTWF4ID0gdnJwLnNlcnZpY2VzLm1hcCgoc3ZjKSA9PiBNYXRoLm1heChzdmMubG9jYXRpb24uY29vcmQueCwgc3ZjLmxvY2F0aW9uLmNvb3JkLnkpKS5zb3J0KChhLCBiKSA9PiBiIC0gYSlbMF0gfHwgMDtcclxuICAgICAgICAgICAgICAgICAgICAvL1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHNocE1heCA9IHZycC5zaGlwbWVudHMubWFwKChzaHApID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IHBtYXggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgZG1heCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmIChzaHAucGlja3VwLmxvY2F0aW9uKXtcclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGxldCB7eCwgeX0gPSBzaHAucGlja3VwLmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcG1heCA9IE1hdGgubWF4KHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYgKHNocC5kZWxpdmVyeS5sb2NhdGlvbil7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBsZXQge3gsIHl9ID0gc2hwLmRlbGl2ZXJ5LmxvY2F0aW9uLmNvb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZG1heCA9IE1hdGgubWF4KHgsIHkpXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgcmV0dXJuIE1hdGgubWF4KHBtYXgsIGRtYXgpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pLnNvcnQoKGEsIGIpID0+IGIgLSBhKVswXSB8fCAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzY2FsZSA9IHRoaXMuY2FudmFzLndpZHRoIC8gbWF4RGltO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBTY2FsZTogJHtzY2FsZX1gKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zWCA9ICh4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoeCAtIHhtaW4pICogc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zWSA9ICh5KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoeSAtIHltaW4pICogc2NhbGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5nZXRJbnN0YW5jZSA9IChlbGVtKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVlJQUGxvdHRlcihlbGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9hcHAvY29tcG9uZW50cy92cnAvdnJwLXBsb3R0ZXItc2VydmljZS5qc1xuLy8gbW9kdWxlIGlkID0gNzk0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=