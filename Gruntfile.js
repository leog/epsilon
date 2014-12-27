'use strict';
var modRewrite = require('connect-modrewrite');
var corsMiddleware = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

/**
 * @param grunt
 */
module.exports = function (grunt) {
    /**
     * Load all tasks
     * @module load-grunt-tasks
     */
    require('load-grunt-tasks')(grunt);

    /**
     * Load grunt-hub task and rename watch to hub-watch so it doesn't conflict with other grunt-contrib-watch task
     */
    grunt.loadNpmTasks('grunt-hub');
    grunt.renameTask('watch', 'hubWatch');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-eslint');

    /**
     * @type {{app: string, widgets: string, shared: string, pages: string, apps: string}}
     */

    var appConfig = {
        app: 'app',
        lib: 'app/lib',
        pages: 'app/pages',
        widgets: 'app/widgets',
        directives: 'app/lib/directives'
    };

    /**
     *  Initial configuration
     */
    grunt.initConfig({
        appConfig: appConfig,
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        eslint: {
            options: {
                config: "eslint.json"
            },
            all: [
                '<%= appConfig.lib %>/**/*.js',
                '<%= appConfig.widgets %>/**/*.js',
                '<%= appConfig.pages %>/api/**/*.js',
                '!<%= appConfig.lib %>/bower_components/**/*.js'
            ]
        },
        /**
         * Less task
         */
        less: {
            options: {
                compress: true,
                ieCompat: true,
                yuicompress: true
            },
            app: {
                src: '<%= appConfig.lib %>/styles/myApp.less',
                dest: '<%= appConfig.lib %>/styles/myApp.min.css'
            },
            directives: {
                expand: true,
                cwd: '<%= appConfig.directives %>',
                src: '**/*.less',
                dest: '<%= appConfig.directives %>',
                ext: '.dir.min.css'
            },
            pages: {
                expand: true,
                cwd: '<%= appConfig.pages %>',
                src: '**/*.less',
                dest: '<%= appConfig.pages %>',
                ext: '.min.css'
            },
            widgets: {
                expand: true,
                cwd: '<%= appConfig.widgets %>',
                src: '**/*.less',
                dest: '<%= appConfig.widgets %>',
                ext: '.min.css'
            }
        },
        /**
         * Looks for gruntfiles inside components and runs specified tasks
         * @module grunt-hub
         * @prop {object} all
         * @param {object} widgets
         */
        hub: {
            widgets: {
                src: ['<%= appConfig.widgets %>/**/Gruntfile.js'],
                tasks: ['compile']
            }
        },
        /**
         * Watch files for change and run specified tasks
         * @module grunt-contrib-watch
         * @prop {object} all
         * @prop {object} styles
         */
        watch: {
            all: {
                options: {livereload: true},
                files: ['<%= appConfig %>/**/*.html']
            },
            styles: {
                files: [
                    '<%= appConfig.pages %>/**/styles/*.less',
                    '<%= appConfig.widgets %>/**/styles/*.less',
                    '<%= appConfig.lib %>/styles/less/*.less',
                    '<%= appConfig.directives %>/**/*.less'
                ],
                tasks: ['hub:widgets', 'less']
            },
            javascript: {
                files: [
                    '<%= appConfig.lib %>/**/*.js',
                    '<%= appConfig.widgets %>/**/*.js',
                    '<%= appConfig.pages %>/**/*.js',
                    '<%= appConfig.apps %>/**/*.js',
                ],
                tasks: ['eslint']
            }
        },
        /**
         * Creates a nodejs server with or without livereload
         * @module grunt-contrib-connect
         * @prop {object} livereload
         * @prop {object} prod
         * @prop normal
         */
        connect: {
            options: {
                port: 80,
                protocol: 'http',
                hostname: '127.0.0.1',
                base: '',
                livereload: false
            },
            normal: {
                options: {
                    middleware: function (connect) {
                        return [
                            modRewrite([
                                '!\\.html|\\.js|\\.eot|\\.svg|\\.ttf|\\.woff|\\.css|\\.png|\\.gif$ /index.html [L]'
                            ]),
                            corsMiddleware,
                            mountFolder(connect, appConfig.app)
                        ];
                    }
                }
            }
        },
        /**
         * Opens a browser tab on the defined location
         * @module grunt-open
         */
        open: {
            local: {
                url: '<%= connect.options.protocol %>://<%= connect.options.hostname %>:<%= connect.options.port %>/<%= connect.options.base %>'
            }
        }
    });

    /**
     * Server Task
     * @namespace server
     */
    grunt.registerTask('server', function () {
        grunt.task.run([
            'eslint',
            'less',
            //'hub:widgets',
            'connect:normal',
            'open:local',
            //'watch'
        ]);
    });
};
