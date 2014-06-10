/*global module*/
var config = {
    nodeRoot: '../../../../node_modules/'
};

module.exports = function (grunt) {
    "use strict";
    grunt.file.expand(config.nodeRoot + 'grunt-*/tasks').forEach(grunt.loadTasks);
    grunt.initConfig({
        less: {
            compile: {
                options: {
                    compress: true,
                    ieCompat: true,
                    yuicompress: true
                },
                src: ['content/less/*.less'],
                dest: 'content/stylesheets/main.min.css'
            }
        }
    });
    grunt.registerTask('compile', [
        'less:compile'
    ]);
};
