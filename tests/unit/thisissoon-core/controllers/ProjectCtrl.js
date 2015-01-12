"use strict";

describe("ProjectCtrl", function (){

    var scope, _modal, _sce, _dataStore, _sections, _project, _projects;


    beforeEach(function(){
        module("thisissoon.core");
    });

    beforeEach(inject(function ($rootScope, $injector, $controller) {

        scope = $rootScope.$new();

        _modal = $injector.get("$modal");
        _sce = $injector.get("$sce");
        _dataStore = $injector.get("DataStore");
        _sections = $injector.get("SECTIONS");

        _project = {
            title: [""],
            judges_comments: [""],
            early_ideas: [""],
            answers: [""],
            project_stats: [""],
            screenshots: [""]
        };

        _projects = {
            list: []
        };

        $controller("ProjectCtrl", {
            $scope: scope,
            $modal: _modal,
            $sce: _sce,
            DataStore: _dataStore,
            SECTIONS: _sections,
            project: _project,
            projects: _projects
        });

    }));

    it("should have a project detail object and projects array in scope", function (){
        expect(scope.project).toEqual(jasmine.any(Object));
        expect(scope.projects).toEqual([]);
    });

    it("should assign the correct numbers to sections", function (){
        expect(scope.sections.info.no).toBe("01");
        expect(scope.sections.judges.no).toBe("02");
        expect(scope.sections.ideas.no).toBe("03");
        expect(scope.sections.questions.no).toBe("04");
        expect(scope.sections.stats.no).toBe("05");
        expect(scope.sections.final.no).toBe("06");

        angular.extend(scope.sections, {
            "info2": {
                "no": null,
                "data": "title",
                "display": false
            },
            "judges2": {
                "no": null,
                "data": "judges_comments",
                "display": false
            },
            "ideas2": {
                "no": null,
                "data": "early_ideas",
                "display": false
            },
            "questions2": {
                "no": null,
                "data": "answers",
                "display": false
            },
            "stats2": {
                "no": null,
                "data": "project_stats",
                "display": false
            },
            "final2": {
                "no": null,
                "data": "screenshots",
                "display": false
            }
        });
        scope.assignSectionNo()

        expect(scope.sections.info2.no).toBe("07");
        expect(scope.sections.judges2.no).toBe("08");
        expect(scope.sections.ideas2.no).toBe("09");
        expect(scope.sections.questions2.no).toBe("10");
        expect(scope.sections.stats2.no).toBe("11");
        expect(scope.sections.final2.no).toBe("12");
    });

    it("should assign the correct numbers to sections with some section data missing", function (){
        _project.judges_comments = [];
        _project.project_stats = [];

        scope.assignSectionNo()

        expect(scope.sections.info.no).toBe("01");
        expect(scope.sections.judges.no).toBe(null);
        expect(scope.sections.ideas.no).toBe("02");
        expect(scope.sections.questions.no).toBe("03");
        expect(scope.sections.stats.no).toBe(null);
        expect(scope.sections.final.no).toBe("04");
    });

    it("should convert hex to valid rgba value", function (){
        expect(scope.hexToRgba("#468499", .5)).toBe("70,132,153,0.5");
        expect(scope.hexToRgba("#DB4437")).toBe("219,68,55,1");
        expect(scope.hexToRgba("#00FFBF", 1)).toBe("0,255,191,1");
        expect(scope.hexToRgba("#F0F", 0.3)).toBe("255,0,255,0.3");
        expect(scope.hexToRgba("dfjg45348657", 0.3)).toBe(null);
    });


});
