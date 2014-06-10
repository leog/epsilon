/*global require*/
require.config({
    'baseUrl': 'http://127.0.0.1',
    'paths': {
        // Bower libraries paths
        'i18n': 'lib/bower_components/requirejs-i18n/i18n',
        'jquery': 'lib/bower_components/jquery/jquery',
        'angular': 'lib/bower_components/angular/angular',
        'angular-ui-router': 'lib/bower_components/angular-ui-router/release/angular-ui-router.min',
        'angular-truncate': 'lib/bower_components/angular-truncate/src/truncate',
        'bootstrap': 'lib/bower_components/bootstrap/dist/js/bootstrap.min',

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
    'shim': {
        'bootstrap': {
            'deps': ['jquery']
        },
        'angular': {
            'exports': 'angular'
        },
        'angular-ui-router': {
            'deps': ['angular']
        },
        'jquery': {
            'exports': 'jQuery'
        }
    },
    'map': {
        '*': {
            'css': 'bower/require-css/css'
        }
    },
    'config': {
        'filters/fileSize.flt': {
            'constants': {
                'kb': 1024,
                'mb': 1048576,
                'gb': 1073741824
            }
        }
    }
});