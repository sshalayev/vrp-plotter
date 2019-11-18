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
