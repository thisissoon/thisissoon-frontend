"use strict";

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe("thisissoon", function() {

    beforeEach(function(){
        browser.driver.manage().window().setSize(1366, 768);
        browser.get("http://127.0.0.1:8000/");
        browser.waitForAngular();
        browser.driver.sleep(2000);
    });

    describe("home", function() {

        it("should automatically redirect to / when location hash/fragment is empty", function() {
            expect(browser.getLocationAbsUrl()).toMatch("/");
        });

        it("should render home partial when user navigates to /", function() {

            expect(element.all(by.css("h2")).first().getText()).toContain("We design and build digital products, services and brands.");

            element.all(by.css("h1")).then(function(headings) {
                expect(headings.length).toBe(6);
                expect(headings[1].getText()).toContain("Latest");
                expect(headings[2].getText()).toContain("Services");
                expect(headings[3].getText()).toContain("About");
                expect(headings[4].getText()).toContain("Join");
                expect(headings[5].getText()).toContain("Say hello");
            });
        });

        it("should navigate to 'Services' section", function() {

            element.all(by.cssContainingText("nav.navbar li a", "Services")).click();
            browser.driver.sleep(1000);
            browser.executeScript("return window.pageYOffset").then( function(x){
                expect(x).toBe(1350);
            });
        });

        it("should navigate to 'About' section", function() {

            element.all(by.cssContainingText("nav.navbar li a", "About")).click();
            browser.driver.sleep(1000);
            browser.executeScript("return window.pageYOffset").then( function(x){
                expect(x).toBe(2049);
            });
        });

        it("should navigate to 'Join' section", function() {

            element.all(by.cssContainingText("nav.navbar li a", "Join")).click();
            browser.driver.sleep(1000);
            browser.executeScript("return window.pageYOffset").then( function(x){
                expect(x).toBe(2781);
            });
        });

        it("should navigate to 'Contact' section", function() {

            element.all(by.cssContainingText("nav.navbar li a", "Contact")).click();
            browser.driver.sleep(1000);
            browser.executeScript("return window.pageYOffset").then( function(x){
                expect(x).toBe(3630);
            });
        });

    });

    describe("casestudies", function() {
        beforeEach(function(){
            element(by.cssContainingText("nav.navbar li a", "Casestudies")).click();
        });

        it("should render casestudies list", function() {
            expect(element(by.css(".project-list")).isDisplayed()).toBeTruthy();
        });
    });

    describe("project detail", function() {
        beforeEach(function(){
            browser.driver.manage().window().setSize(1366, 768);
            browser.get("http://127.0.0.1:8000/#/projects/4");
            browser.waitForAngular();
            browser.driver.sleep(2000);
        });

        it("should render project partial when user navigates to /projects/{id}", function() {

            expect(element.all(by.css("h1")).first().getText()).toContain("Do-it.org");

        });
    });

});
