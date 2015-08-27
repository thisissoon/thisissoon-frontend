describe( "thisissoon", function() {

    var runBlocks, rootScope, _cacheService, _resizeService, _window, _snSkrollr;

    beforeEach( function() {
        var myModule = angular.module( "thisissoon" );

        runBlocks = myModule._runBlocks;
        myModule._runBlocks = [];

        module( "thisissoon" );
    });

    afterEach( function() {
        angular.module( "thisissoon" )._runBlocks = runBlocks;
    });

    describe( "when loaded", function() {

        beforeEach( inject( function( $rootScope, $injector ) {

            rootScope = $rootScope;

            _cacheService = $injector.get("CacheService");
            spyOn(_cacheService, "put");

            _resizeService = $injector.get("ResizeService");
            _resizeService.add = function(id, fn){
                fn.apply(this, [{}, { width: 1025, height: 200 }]);
            };
            spyOn(_resizeService, "add");

            _window = $injector.get("$window");
            _window.innerWidth = 1025;

            _snSkrollr = $injector.get("snSkrollr");
            spyOn(_snSkrollr, "init");
            spyOn(_snSkrollr, "destroy");

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

        it("should call snSkrollr.destroy on routeChangeStart", function(){

            rootScope.skrollrInitialised = true;
            rootScope.$broadcast("$routeChangeStart");

            expect(_snSkrollr.destroy).toHaveBeenCalled();

        });

        it("should call snSkrollr.init on routeChangeSuccess if window size is greater than 1024", function(){

            _cacheService.put.calls.reset();
            _window.innerWidth = 1025;
            rootScope.$broadcast("$routeChangeSuccess");

            expect(_snSkrollr.init).toHaveBeenCalled();

        });

    });

});
