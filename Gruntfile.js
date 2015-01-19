module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        lifecycle: {
            validate: [
                'jshint'
            ],
            compile: [
                'requirejs',
                'recursive-compass:release',
                'compass:release'
            ],
            test: [
                'karma:unit'
            ],
            'package': [
                'uglify',
                'minifyHtml'
            ],
            'integration-test': [],
            verify: [],
            install: [],
            deploy: []
        },

        jshint: {
            gruntfile: {
                options: {
                    jshintrc: 'app/components/.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: 'app/components/.jshintrc'
                },
                src: ['app/components/**/*.js', '!app/components/**/*.min.js', '!**/*Spec.js']
            },
            libSrc: {
                options: {
                    jshintrc: 'app/lib/com/rpi/.jshintrc'
                },
                src: ['app/lib/com/rpi/**/*.js', '!app/lib/com/rpi/**/*.min.js', '!**/*Spec.js']
            },
            spec: {
                options: {
                    "curly": true,
                    "eqeqeq": true,
                    "immed": true,
                    "latedef": true,
                    "newcap": true,
                    "noarg": true,
                    "sub": true,
                    "undef": true,
                    "unused": true,
                    "boss": true,
                    "eqnull": true,
                    "browser": true,
                    "predef": [
                        "beforeEach",
                        "afterEach",
                        "describe",
                        "inject",
                        "it",
                        "expect",
                        "module",
                        "define",
                        "console"
                    ]
                },
                src: ['app/**/*Spec.js']
            }
        },

        karma: {
            options: {
                configFile: 'test/karma.conf.js'
            },
            unit: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            debug: {
                singleRun: false,
                browsers: ['Chrome']
            }
        },

        requirejs: {
            compile: {
                options: {
                    preserveLicenseComments: false,

                    paths: {
                        requireLib: "lib/requirejs/require"
                    },

                    deps: [
                        'components/navBar/navBarController',

                        'components/main/mainController',
                        'components/about/aboutController',

                        'lib/com/rpi/angular/widgets/installed/installedController',
                        'lib/com/rpi/angular/widgets/available/availableController',

                        'components/demo/editorDemo/editorDemoController'
                    ],

//                    optimize: "none",

                    mainConfigFile: "app/main.js",

                    baseUrl: "app",

                    include: [
                        'main',
                        "requireLib"
                    ],
                    out: "app/app-full.min.js",
                    stubModules: ['lib/requirejs/text', 'lib/com/rpi/requirejs/angularjsView']
//                    config: {
//                        'routeResolver': {
//                            useMinified: true
//                        }
//                    }
//                    wrap: {
//                        start: "(function() {",
//                        end: "}());"
//                    }
                }
            }
        },

        uglify: {
            build: {
                files: grunt.file.expandMapping([
                    'app/app.js',
                    'app/app.*.js',
                    'app/main.js',
                    'app/bootstrap.js',
                    'app/components/**/*.js',
                    '!app/components/**/*.min.js',
                    'app/lib/**/*.js',
                    '!app/lib/**/*.min.js',
                    '!app/lib/ckeditor/**'
                ], '', {
                    rename: function(destBase, destPath) {
                        return destBase+destPath.replace('.js', '.min.js');
                    }
                })
            }
        },

        minifyHtml: {
            options: {
                cdata: true
            },
            dist: {
                files: grunt.file.expandMapping([
                    'app/components/**/*.html',
                    '!app/components/**/*.min.html',
                    'app/lib/**/*.html',
                    '!app/lib/**/*.min.html'
                ], '', {
                    rename: function(destBase, destPath) {
                        return destBase+destPath.replace('.html', '.min.html');
                    }
                })
            }
        },

        clean: {
            build: {
                options: {
                    force: true
                },
                files: grunt.file.expandMapping([
                    'app/**/*.min.js',
                    'app/components/**/*.min.js',
                    'app/lib/**/*.min.js',
                    'app/components/**/*.min.html',
                    'app/lib/**/*.min.html',
                    '!app/bower_components/**/*.js',
                    '!app/lib/angular/schema-form/**/*.js'
                ])
            }
        },

        compass: {
            dev: {
                options: {
                    basePath: 'src/main/sass',
                    environment: 'dev',
                    config: 'src/main/sass/config.rb',
                    force: grunt.option('force'),
                    outputStyle: "expanded",
                    debugInfo: true
                }
            },
            release: {
                options: {
                    basePath: 'src/main/sass',
                    environment: 'production',
                    config: 'src/main/sass/config.rb',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        },

        'recursive-compass': {
            dev: {
                src: ['app/components/**/*.{scss,sass}'],
                options: {
                    sassDir: 'app/components',
                    cssDir: 'app/components',
                    outputStyle: "expanded",
                    debugInfo: true,
                    force: grunt.option('force')
                }
            },
            release: {
                src: ['app/components/**/*.{scss,sass}'],
                options: {
                    sassDir: 'app/components',
                    cssDir: 'app/components',
                    config: 'src/main/sass/config.rb',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        }
    });

//    require('matchdep').filter('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-minify-html');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-recursive-compass');
    grunt.loadNpmTasks('grunt-build-lifecycle');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', ['deploy']);
};
