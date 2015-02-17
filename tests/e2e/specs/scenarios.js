"use strict";

/* https://github.com/angular/protractor/blob/master/docs/getting-started.md */

describe("thisissoon", function() {

    describe("home", function() {

        beforeEach(function(){
            browser.driver.manage().window().setSize(1366, 768);
            browser.get("http://127.0.0.1:8000/");
            browser.waitForAngular();
            browser.driver.sleep(2000);
        });

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

            var initTop = 0;
            var initLeft = 0;

            browser.driver.executeScript("window.scrollBy(0,200)", "");
            browser.driver.sleep(4000);
        });

    });

    describe("navbar", function() {
        beforeEach(function(){
            browser.driver.manage().window().setSize(1366, 768);
            browser.get("http://127.0.0.1:8000/");
            browser.waitForAngular();
            browser.driver.sleep(2000);
        });

        it("should ...", function() {

            browser.driver.executeScript("window.scrollBy(0,200)", "");
            expect(element(by.css("nav.navbar.navbar-hide"))).toBeTruthy();
            browser.driver.sleep(1000);

        });
    });

});
