require.config({
    'paths': {
        // Bower libraries paths
        'i18n': 'lib/vendor/bower_components/requirejs-i18n/i18n',
        'jquery': 'lib/vendor/bower_components/jquery/dist/jquery',
        'angular': 'lib/vendor/bower_components/angular/angular',
        'angular-ui-router': 'lib/vendor/bower_components/angular-ui-router/release/angular-ui-router',
        'angular-truncate': 'lib/vendor/bower_components/angular-truncate/src/truncate',
        'bootstrap': 'lib/vendor/bower_components/bootstrap/dist/js/bootstrap.min',

        // Epsilon paths
        'lib': 'lib',
        'pages': 'pages',
        'widgets': 'widgets',
        'filters': 'lib/filters',
        'providers': 'lib/providers',
        'directives': 'lib/directives',
        "epsilon": "lib/modules/epsilon",
        'bower': 'lib/vendor/bower_components'
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
    },
    deps: ['myApp.cfg']
});