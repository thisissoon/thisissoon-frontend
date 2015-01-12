"use strict";

describe("ThisissoonAPI", function (){
    var service, $httpBackend;

    beforeEach(function (){
        module("thisissoon.api");
    });

    beforeEach(inject(function ($injector, ThisissoonAPI){

        service = ThisissoonAPI;

        $httpBackend = $injector.get('$httpBackend');

        $httpBackend
            .when("GET", "http://lovies.soon.build/api/projects/1/")
            .respond({
                "id": 1
            });

        $httpBackend
            .when("GET", "http://lovies.soon.build/api/projects/")
            .respond([{
                "id": 1
            },{
                "id": 2
            }]);

        $httpBackend
            .when("GET", "http://lovies.soon.build/api/categories/")
            .respond({
                "categories": [{
                    "title": "Advertising",
                    "slug": "advertising"
                }, {
                    "title": "Social",
                    "slug": "social"
                }],
                "google_products": [{
                    "title": "Google Play",
                    "slug": "google-play"
                }, {
                    "title": "YouTube",
                    "slug": "youtube"
                }]
            });

    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should return project detail object on getProjectDetail service call", function (){
        var id;
        service.getProjectDetail(1).then(function (response){
            id = response.id;
        });
        $httpBackend.flush();
        expect(id).toEqual(1);
        expect(id).not.toEqual(2);
    });

    it("should reject the promise when the server returns an error on getProjectDetail service call", function (){
        $httpBackend.when("GET", "http://lovies.soon.build/api/projects/1/").respond(500,"");

        var response;
        service.getProjectDetail(1).catch(function (data){
            data = response;
        });
        $httpBackend.flush();
        expect(response).toEqual(undefined);

    });

    it("should return an array of projects on getProjects service call", function (){
        var projectList;
        service.getProjects().then(function (response){
            projectList = response;
        });
        $httpBackend.flush();
        expect(projectList.length).toBe(2);
        expect(projectList.length).not.toBe(1);
        expect(projectList[0].id).toEqual(1);
        expect(projectList[1].id).toEqual(2);
    });

    it("should reject the promise when the server returns an error on getProjects service call", function (){
        $httpBackend.when("GET", "http://lovies.soon.build/api/projects/").respond(500,"");

        var response;
        service.getProjects().catch(function (data){
            data = response;
        });
        $httpBackend.flush();
        expect(response).toEqual(undefined);

    });

    it("should return categories object on getCategories service call", function (){
        var categories;
        service.getCategories().then(function (response){
            categories = response;
        });
        $httpBackend.flush();
        expect(categories.categories.length).toBe(2);
        expect(categories.google_products.length).not.toBe(1);
        expect(categories.google_products.length).toBe(2);
        expect(categories.categories[0].slug).toEqual("advertising");
        expect(categories.google_products[1].title).toEqual("YouTube");
    });

    it("should reject the promise when the server returns an error on getCategories service call", function (){
        $httpBackend.when("GET", "http://lovies.soon.build/api/categories/").respond(500,"");

        var response;
        service.getCategories().catch(function (data){
            response = data;
        });
        $httpBackend.flush();
        expect(response).toEqual(undefined);

    });


});
