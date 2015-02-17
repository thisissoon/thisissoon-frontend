describe( "thisissoon.core", function() {

    var runBlocks, rootScope, _cacheService, _resizeService;

    beforeEach( function() {
        var myModule = angular.module( "thisissoon.core" );

        runBlocks = myModule._runBlocks;
        myModule._runBlocks = [];

        module( "thisissoon.core" );
    });

    afterEach( function() {
        angular.module( "thisissoon.core" )._runBlocks = runBlocks;
    });

    describe( "when loaded", function() {

        beforeEach( inject( function( $rootScope, $injector ) {

            rootScope = $rootScope;

            _cacheService = $injector.get("CacheService");
            spyOn(_cacheService, "put");

            _resizeService = $injector.get("ResizeService");
            _resizeService.add = function(id, fn){
                fn.apply(this, [{}, { width: 1000, height: 200 }]);
            };
            spyOn(_resizeService, "add");

            for( var i = 0; i < runBlocks.length; ++i ) {
                $injector.invoke( runBlocks[i] );
            }
        }));

        afterEach(function(){

        });

        it("should set variables on rootScope", function(){

            expect(rootScope.cache).toEqual(_cacheService);
            expect(rootScope.env).toEqual(jasmine.any(Object));

        });

        it("should set view defaults in cache", function(){

            expect(_cacheService.put.calls.argsFor(0)).toEqual([ "navOpen", false ]);
            expect(_cacheService.put.calls.argsFor(1)).toEqual([ "loading", true ]);
            expect(_cacheService.put.calls.argsFor(2)).toEqual([ "projectList", false ]);

        });

        it("should set loading true on routeChangeStart", function(){

            rootScope.$broadcast("$routeChangeStart");

            expect(_cacheService.put.calls.argsFor(0)).toEqual([ "navOpen", false ]);
            expect(_cacheService.put.calls.argsFor(1)).toEqual([ "loading", true ]);

        });

        it("should set loading false on routeChangeSuccess", function(){

            _cacheService.put.calls.reset();
            rootScope.$broadcast("$routeChangeSuccess");

            expect(_cacheService.put.calls.argsFor(0)).toEqual([ "loading", false ]);

        });

        it("should call snSkrollr when window is correct size", function(){

            _cacheService.put.calls.reset();
            rootScope.$broadcast("$routeChangeSuccess");

            expect(_cacheService.put.calls.argsFor(0)).toEqual([ "loading", false ]);

        });

    });

});
