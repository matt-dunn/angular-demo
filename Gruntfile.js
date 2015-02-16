/**!
 *
 * All rights reserved. Copyright (c) RPI Ltd 2015
 *
 * @author Matt Dunn
 *
 */

/*global module:true */
module.exports = function(grunt) {
    "use strict";

    var target = grunt.option('target') || 'dev',
        buildOptions = grunt.file.readJSON("build/lifecycle." + target + ".json");

    (function(options){
        options.dirs.resources = (options.dirs.resourcesBase + options.dirs.resourcesTarget) || "./";
        options.dirs.resourcesUrl = (options.dirs.resourcesBase + options.dirs.resourcesTarget) || "";
    }(buildOptions));

    console.info("Building target '" + target + "'");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Main build lifecycle:
        lifecycle: buildOptions.phases,

        // Task configurations:
        jshint: {
            gruntfile: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: 'Gruntfile.js'
            },
            src: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'app/**/*.js',
                    '!app/**/*.min.js',
                    '!**/*Spec.js']
            },
            testSrc: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: [
                    'src/test/test-main.js',
                    'src/test/**/*Spec.js',
                    'src/test/**/*Scenario.js']
            }
        },

        version: {
            options: {
                pkg: {
                    version: '<%= grunt.template.getVersion() %>'
                }
            },
            dev: {
                src: ['package.json', 'bower.json', buildOptions.dirs.build + 'app/main.js']
            },
            devHtml: {
                options: {
                    prefix: '\\?version=*'
                },
                src: [buildOptions.dirs.build + 'app/index*.html']
            },
            devHtmlMeta: {
                options: {
                    prefix: '<meta\\s*name="version"\\s*content="*'
                },
                src: [buildOptions.dirs.build + 'app/index*.html']
            },
            release: {
                options: {
                    release: "patch"
                },
                src: ['package.json', 'bower.json', buildOptions.dirs.build + 'app/main.js']
            },
            releaseHtml: {
                options: {
                    prefix: '\\?version=*'
                },
                src: [buildOptions.dirs.build + 'app/index*.html']
            },
            releaseHtmlMeta: {
                options: {
                    prefix: '<meta\\s*name="version"\\s*content="*'
                },
                src: [buildOptions.dirs.build + 'app/index*.html']
            }
        },

        karma: {
            options: {
                configFile: 'src/test/karma.conf.js'
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

        protractor: {
            dev: {
                configFile: buildOptions.dirs.build + "src/test/e2e/protractor-conf.js",
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                options: {
                    args: {
                        baseUrl: 'http://localhost:8001/' + buildOptions.dirs.resourcesUrl
                    }
                }
            },
            release: {
                configFile: buildOptions.dirs.build + "src/test/e2e/protractor-conf.js",
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                options: {
                    args: {
                        baseUrl: 'http://localhost:8001/' + buildOptions.dirs.resources
                    }
                }
            }
        },

        requirejs: {
            options: {
                preserveLicenseComments: false,

                mainConfigFile: buildOptions.dirs.build + "app/main.js",
                baseUrl: buildOptions.dirs.build + "app",
                out: buildOptions.dirs.build + "app/app-full.min.js",

                deps: [
                    'components/navBar/navBarController',

                    'pages/main/mainController',
                    'pages/about/aboutController',

                    'lib/com/rpi/angular/widgets/installed/installedController',
                    'lib/com/rpi/angular/widgets/available/availableController',

                    'components/demo/editorDemo/editorDemoController'
                ],
                include: [
                    'main',
                    "requireLib"
                ],
                stubModules: [
                    '../bower_components/requirejs-text/text',
                    'lib/com/rpi/requirejs/angularjsView',
                    'lib/com/rpi/requirejs/buildVersion'
                ]
//                    wrap: {
//                        start: "(function() {",
//                        end: "}());"
//                    }
            },
            dev: {
                options: {
                    paths: {
                        requireLib: "../bower_components/requirejs/require"
                    }
                }
            },
            release: {
                options: {
                    paths: {
                        requireLib: "../bower_components/requirejs/require",
                        'config/app.config': 'config/app.config.production',
                        'config/ckeditor.config': 'config/ckeditor.config.production'
                    }
                }
            }
        },

        uglify: {
            dev: {},
            release: {
                files: grunt.file.expandMapping([
                    'app/app.js',
                    'app/app.*.js',
                    'app/main.js',
                    'app/bootstrap.js',
                    'app/components/**/*.js',
                    '!app/components/**/*.min.js',
                    'app/pages/**/*.js',
                    '!app/pages/**/*.min.js'
                ], '', {
                    rename: function(destBase, destPath) {
                        return buildOptions.dirs.build + destBase + destPath.replace('.js', '.min.js');
                    }
                })
            }
        },

        minifyHtml: {
            options: {
                cdata: true
            },
            dev: {},
            release: {
                files: grunt.file.expandMapping([
                    'app/components/**/*.html',
                    '!app/components/**/*.min.html',
                    'app/pages/**/*.html',
                    '!app/pages/**/*.min.html'
                ], '', {
                    rename: function(destBase, destPath) {
                        return buildOptions.dirs.build + destBase + destPath.replace('.html', '.min.html');
                    }
                })
            }
        },

        clean: {
            release: {
                options: {
                    force: true
                },
                files: grunt.file.expandMapping([
                    'reports',
                    'app/**/*.css',
                    'app/**/*.map',
                    'app/**/*.min.js',
                    'app/**/*.min.html'
                ])
            }
        },

        compass: {
            options: {
                basePath: buildOptions.dirs.build + 'src/main/sass',
                config: buildOptions.dirs.build + 'src/main/sass/config.rb'
            },
            dev: {
                options: {
                    environment: 'dev',
                    outputStyle: "expanded",
                    force: grunt.option('force'),
                    sourcemap: true,
                    debugInfo: true
                }
            },
            release: {
                options: {
                    environment: 'production',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        },

        'recursive-compass': {
            dev: {
                src: [buildOptions.dirs.build + 'app/components/**/*.{scss,sass}'],
                options: {
                    sourcemap: true,
                    sassDir: 'app/components',
                    cssDir: 'app/components',
                    outputStyle: "expanded",
                    debugInfo: true,
                    force: grunt.option('force')
                }
            },
            release: {
                src: [buildOptions.dirs.build + 'app/components/**/*.{scss,sass}'],
                options: {
                    sassDir: buildOptions.dirs.build + 'app/components',
                    cssDir: buildOptions.dirs.build + 'app/components',
                    config: buildOptions.dirs.build + 'src/main/sass/config.rb',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        },

        processhtml: {
            options: {
            },
            release: {
                files: [
                    {
                        src: buildOptions.dirs.build + 'app/index.html',
                        dest: buildOptions.dirs.build + 'app/index.html'
                    }
                ]
            }
        },

        copy: {
            release: {
                files: [
                    {
                        expand: true,
                        src: [
                            "bower_components/**",
                            "app/**",
                            "resources/**",
                            "src/**"
                        ],
                        dest: buildOptions.dirs.build,
                        filter: 'isFile'
                    }
                ]
            },
            resources: {
                files: [
                    {
                        cwd: buildOptions.dirs.build,
                        expand: true,
                        src: [
                            "app/*.html",
                            "app/css/**/*",
                            "app/i/**/*",
                            "app/*.min.js",
                            "resources/**/*",
                            "app/*.md",
                            "app/components/demo/**/*"
                        ],
                        dest: buildOptions.dirs.resources,
                        filter: 'isFile'
                    },
                    {
                        cwd: "bower_components",
                        expand: true,
                        src: [
                            "ckeditor/**/*"
                        ],
                        dest: buildOptions.dirs.resources,
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    require("./bower_components/rpi-library/grunt/grunt-templates/getVersion");

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-version');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-minify-html');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-build-lifecycle');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadTasks('./bower_components/rpi-library/grunt/grunt-tasks/compass');
    grunt.loadTasks('./bower_components/rpi-library/grunt/grunt-tasks/recursive-compass');

    // Tasks:
    grunt.registerTask('default', ['install']);

    // Helper tasks:
    grunt.registerTask('run-tests', ['karma:unit',  'protractor']);
};
