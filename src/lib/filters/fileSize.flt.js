/*global define*/
define([
    'module',
    'angular'
], function (module, angular) {
	"use strict";
    var config = module.config();
    var settings = { moduleName: 'FileSizeFilter' };
    angular
        .module(settings.moduleName, [])
        .filter('fileSizeFlt', function () {
            return function (input) {
                if (input > config.constants.gb) {
                    return Math.round(input / config.constants.gb, 1) + " GB";
                }
                if (input > config.constants.mb) {
                    return Math.round(input / config.constants.mb, 1) + " MB";
                }
                if (input > config.constants.kb) {
                    return Math.round(input / config.constants.kb, 1) + " KB";
                }
                return input + " b";
            };
        });
    return settings;
});