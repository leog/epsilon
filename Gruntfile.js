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

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt, {
        pattern: ['grunt-*', '!grunt-template-jasmine-requirejs']
    });

    var appConfig = {
        app: 'app',
        lib: 'app/lib',
        pages: 'app/pages',
        widgets: 'app/widgets',
        directives: 'app/lib/directives'
    };

    grunt.initConfig({
        appConfig: appConfig,
        eslint: {
            options: {
                config: "eslint.json"
            },
            all: [
                '<%= appConfig.directives %>/**/*.js',
                '<%= appConfig.widgets %>/**/*.js',
                '<%= appConfig.pages %>/api/**/*.js',
                '!<%= appConfig.lib %>/bower_components/**/*.js'
            ]
        },
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
        connect: {
            options: {
                port: 80,
                protocol: 'http',
                hostname: '127.0.0.1',
                keepalive: true,
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
            },
            test: {
                options: {
                    protocol: 'http',
                    port: 8888,
                    keepalive: false,
                    debug: false,
                    middleware: function (connect, options, middlewares) {
                        middlewares.unshift(function (req, res, next) {
                            if (/^image\//.test(req.headers.accept)) {
                                res.setHeader('Content-Type', 'image/png');
                                res.end('')
                            } else {
                                return next();
                            }
                        });
                        return middlewares;
                    }
                }
            }
        },
        'gh-pages': {
            options: {
                base: 'app',
                add: true,
                push: false
            },
            src: ['**']
        },
        jasmine: {
            test: {
                options: {
                    keepRunner: true,
                    specs: [
                        'spec/unit/**/*.spec.js'
                    ],
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'app/main.js',
                        requireConfig: {
                            baseUrl: '../app',
                            paths: {
                                'angular-mocks': 'lib/vendor/bower_components/angular-mocks/angular-mocks'
                            },
                            shim: {
                                'angular-mocks': ['angular']
                            },
                            deps: ['css!lib/styles/myApp.min.css']
                        }
                    },
                    summary: true,
                    host: 'http://127.0.0.1:8888/'
                }
            }
        }
    });

    grunt.registerTask('server', function () {
        grunt.task.run([
            'eslint',
            'less',
            'connect:normal'
        ]);
    });

    grunt.registerTask('test', function () {
        grunt.task.run([
            'connect:test',
            'jasmine'
        ]);
    });
};
