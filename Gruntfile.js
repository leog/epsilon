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
        app: 'src',
        widgets: 'src/ui/widgets',
        pages: 'src/ui/pages',
        apps: 'src/ui/apps',
        ui: 'src/ui',
        lib: 'src/lib'
    };

    /**
     *  Initial configuration
     */
    grunt.initConfig({
        epsilon: appConfig,
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
                '<%= epsilon.lib %>/**/*.js',
                '<%= epsilon.ui %>/**/*.js',
                '<%= epsilon.app %>/api/**/*.js',
                '!<%= epsilon.lib %>/bower_components/**/*.js'
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
            directives: {
                src: [
                    '<%= epsilon.lib %>/directives/content/less/*.less'
                ],
                dest: '<%= epsilon.lib %>/directives/content/stylesheets/directives.min.css'
            }
        },
        /**
         * Looks for gruntfiles inside components and runs specified tasks
         * @module grunt-hub
         * @todo Add subtask for other epsilon components
         * @prop {object} all
         * @param {object} widgets
         */
        hub: {
            all: {
                src: ['<%= epsilon.ui %>/**/Gruntfile.js'],
                tasks: ['compile']
            },
            apps: {
                src: [
                    '<%= epsilon.apps %>/**/Gruntfile.js',
                    '!<%= epsilon.apps %>/**/node_modules/**'
                ],
                tasks: ['compile']
            },
            pages: {
                src: [
                    '<%= epsilon.pages %>/**/Gruntfile.js',
                    '!<%= epsilon.pages %>/**/node_modules/**'
                ],
                tasks: ['compile']
            },
            widgets: {
                src: [
                    '<%= epsilon.widgets %>/**/Gruntfile.js',
                    '!<%= epsilon.widgets %>/**/node_modules/**'
                ],
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
                files: ['<%= epsilon.ui %>/**/*.html']
            },
            styles: {
                files: [
                    '<%= epsilon.apps %>/**/content/less/*.less',
                    '<%= epsilon.pages %>/**/content/less/*.less',
                    '<%= epsilon.widgets %>/**/content/less/*.less',
                    '<%= epsilon.lib %>/content/less/*',
                    '<%= epsilon.lib %>/directives/content/less/*.less'
                ],
                tasks: ['hub:apps', 'hub:pages', 'hub:widgets', 'less']
            },
            javascript: {
                files: [
                    '<%= epsilon.lib %>/**/*.js',
                    '<%= epsilon.widgets %>/**/*.js',
                    '<%= epsilon.pages %>/**/*.js',
                    '<%= epsilon.apps %>/**/*.js'
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
                                '!\\.html|\\.js|\\.eot|\\.svg|\\.ttf|\\.woff|\\.css|\\.png|\\.gif$ /ui/apps/myApp/index.html [L]'
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
        },
        /**
         * Used to run several tasks at once to speed up complex tasks
         * @module grunt-concurrent
         * @prop local
         * @prop dev
         * @prop mocked
         */
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            local: {
                tasks: ['hub:apps', 'hub:widgets', 'hub:pages']
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
            'concurrent:local',
            'connect:normal',
            'open:local',
            'watch'
        ]);
    });
};
