define([
    'jquery'
], function ($) {
    'use strict';
    return {
        deps: function (args) {
            return $.map(args, function (e) {
                return e && e.moduleName;
            });
        },
        depsWith: function (args, plus) {
            return this.deps(args).concat(plus);
        },
        testDeps: function (args) {
            $.each(this.deps(args), function (i, e) {
                beforeEach(module(e));
            });
        },
        testDepsWith: function (args, plus) {
            $.each(this.depsWith(args, plus), function (i, e) {
                beforeEach(module(e));
            });
        }
    };
});
