var tests = [];
for (var file in window.__karma__.files) {
    if (window.__karma__.files.hasOwnProperty(file)) {
        if (/\.spec\.js$/.test(file)) {
            tests.push(file);
        }
    }
}

requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
        // Bower libraries paths
        'angular': 'lib/bower_components/angular/angular',
        'angular-mocks': 'lib/bower_components/angular-mocks/angular-mocks',

        // Epsilon paths
        'api': 'api',
        'lib': 'lib',
        'apps': 'ui/apps',
        'pages': 'ui/pages',
        'widgets': 'ui/widgets',
        'bower': 'lib/bower_components',
        'filters': 'lib/filters',
        'directives': 'lib/directives'
    },

    'config': {
        'filters/fileSize.flt': {
            'constants': {
                'kb': 1024,
                'mb': 1048576,
                'gb': 1073741824
            }
        }
    },

    shim: {
        angular: {
            exports: "angular"
        },
        'angular-mocks': {
            deps: ['angular'],
            exports: 'angular.mock'
        }
    },

    // ask Require.js to load these files (all our tests)
    deps: tests,

    // start test run, once Require.js is done
    callback: window.__karma__.start
});