module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        lifecycle: {
            validate: [
                'jshint'
            ],
            compile: [],
            test: [
                'karma:phantom'
            ],
            'package': [
                'concat',
                'uglify'
            ],
            'integration-test': [],
            verify: [],
            install: [],
            deploy: []
        },

        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '../app/components/.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: '../app/components/.jshintrc'
                },
                src: ['../app/components/**/*.js', '!../app/components/**/*.min.js']
            },
            libSrc: {
                options: {
                    jshintrc: '../app/lib/com/rpi/.jshintrc'
                },
                src: ['../app/lib/com/rpi/**/*.js', '!../app/lib/com/rpi/**/*.min.js']
            }
        },

        karma: {
            options: {
                configFile: '../karma.conf.js'
            },
            unit: {
                singleRun: true
            },
            phantom: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            debug: {
                singleRun: false
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

                    mainConfigFile: "../app/main.js",

                    baseUrl: "../app",

                    include: [
                        'main',
                        "requireLib"
                    ],
                    out: "../app/app-full.min.js",
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
                    '../app/app.js',
                    '../app/app.*.js',
                    '../app/main.js',
                    '../app/bootstrap.js',
                    '../app/components/**/*.js',
                    '!../app/components/**/*.min.js',
                    '../app/lib/**/*.js',
//                    '!../app/lib/**/*.min.js',
//                    '!../app/lib/ckeditor/**'
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
                    '../app/components/**/*.html',
                    '!../app/components/**/*.min.html',
                    '../app/lib/**/*.html',
                    '!../app/lib/**/*.min.html'
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
                    '../app/**/*.min.js',
                    '../app/components/**/*.min.js',
                    '../app/lib/**/*.min.js',
                    '../app/components/**/*.min.html',
                    '../app/lib/**/*.min.html',
                    '!../app/bower_components/**/*.js',
                    '!../app/lib/angular/schema-form/**/*.js'
                ])
            }
        },

        compass: {
            dev: {
                options: {
                    basePath: '../src/main/sass',
                    environment: 'dev',
                    config: '../src/main/sass/config.rb',
                    force: grunt.option('force'),
                    outputStyle: "expanded",
                    debugInfo: true
                }
            },
            release: {
                options: {
                    basePath: '../src/main/sass',
                    environment: 'production',
                    config: '../src/main/sass/config.rb',
                    outputStyle: 'compressed',
                    force: grunt.option('force')
                }
            }
        },

        'recursive-compass': {
            dev: {
                src: ['../app/components/**/*.{scss,sass}'],
                options: {
//                    basePath: '../src/main/sass',
//                    appDir: '../app',
//                    sassDir: '.',
//                    cssDir: '../components',

                    sassDir: '.',
                    cssDir: '.',

                    environment: 'dev',
//                    config: '../src/main/sass/config.rb',
//                    force: grunt.option('force'),
                    outputStyle: "expanded",
                    debugInfo: true,
                    force: grunt.option('force')
                }
            },
            release: {
                src: ['../app/components/**/*.{scss,sass}'],
                options: {
                    outputStyle: 'compressed',
                    sassDir: '.',
                    cssDir: '.',
                    force: grunt.option('force')
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

    grunt.registerTask('build', ['jshint', 'uglify', 'minifyHtml', 'requirejs', 'compass:dev', 'recursive-compass:dev']);
    grunt.registerTask('compile', ['jshint',  'requirejs', 'compass:dev', 'recursive-compass:dev']);
    grunt.registerTask('sass', ['recursive-compass:dev', 'compass:dev']);

    grunt.registerTask('production', ['jshint', 'uglify', 'minifyHtml', 'requirejs', 'compass:release', 'recursive-compass:release']);

    grunt.registerTask('default', ['compile']);
};
