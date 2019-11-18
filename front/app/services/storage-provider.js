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
