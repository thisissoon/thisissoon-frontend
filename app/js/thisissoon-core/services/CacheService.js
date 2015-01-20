"use strict";
/**
 * Cache for data to share between scopes
 * Data can be stored in service by calling: CacheService.put("foo", 123),
 * where "foo" is the key/reference of the data item and 123 is the
 * data we want to store. You can then retrieve any data by using:
 * CacheService.get("foo") which will return the value of the key "foo" in
 * the service.
 * @module thisissoon.core
 * @author SOON_
 * @class  CacheService
 */
angular.module("thisissoon.core").service("CacheService",
    function($cacheFactory){
        return $cacheFactory("cache");
    }
)
