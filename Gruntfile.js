/*global module:true, process:true */
module.exports = function(grunt) {
    "use strict";

    var buildOptions = {
        dirs: {
            build: "target/build/",
            resources: "target/resources/"
        },
        target: grunt.option('target') || 'dev'
    };

    console.info("Building target '" + buildOptions.target + "'");

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        lifecycle: {
            'initialize': [
                'jshint',
                'copy:' + buildOptions.target,
                'version:' + buildOptions.target,
                'version:' + buildOptions.target + "Html",
                'version:' + buildOptions.target + "HtmlMeta"
            ],
            compile: [
                'requirejs:' + buildOptions.target,
                'compass:' + buildOptions.target,
                'processhtml:' + buildOptions.target
            ],
            test: [
                'karma:unit'
            ],
            'prepare-package': [
                'copy:resources'
//                'uglify:' + buildOptions.target,
//                'minifyHtml:' + buildOptions.target,
            ],
            'integration-test': [
                'protractor:' + buildOptions.target
            ],
            verify: [],
            install: [],
            deploy: []
        },

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
                    '!app/bower_components/**/*.js',
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
                // Example of extracting version from 'pom.xml':
//                pkg: (function() {
//                    var filename = "pom.xml",
//                        parseString = require('xml2js').parseString,
//                        version = null;
//
//                    parseString(grunt.file.read(filename), {normalize: true, ignoreAttrs: true, async: false}, function (err, result) {
//                        try {
//                            version = result.project.parent[0].version[0];
//                            console.info("Extracted version '" + version + "' from '" + filename + "'");
//                        } catch (ex) {
//                            throw new Error("No version found in '" + filename + "'");
//                        }
//                    });
//
//                    return {version: version};
//                })()
            },
            dev: {
                src: ['package.json', 'bower.json', 'app/main.js']
            },
            devHtml: {
                options: {
                    prefix: '\\?version=*'
                },
                src: ['app/index*.html']
            },
            devHtmlMeta: {
                options: {
                    prefix: '<meta\\s*name="version"\\s*content="*'
                },
                src: ['app/index*.html']
            },
            release: {
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
                configFile: "src/test/e2e/protractor-conf.js",
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false // If true, protractor will not use colors in its output.
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

                deps: [
                    'components/navBar/navBarController',

                    'pages/main/mainController',
                    'pages/about/aboutController',

                    'lib/com/rpi/angular/widgets/installed/installedController',
                    'lib/com/rpi/angular/widgets/available/availableController',

                    'components/demo/editorDemo/editorDemoController'                ],

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
                    },
                    mainConfigFile: "app/main.js",
                    baseUrl: "app",
                    out: "app/app-full.min.js"
                }
            },
            release: {
                options: {
                    paths: {
                        requireLib: "../bower_components/requirejs/require",
                        'config/app.config': 'config/app.config.production'
                    },
                    mainConfigFile: buildOptions.dirs.build + "app/main.js",
                    baseUrl: buildOptions.dirs.build + "app",
                    out: buildOptions.dirs.build + "app/app-full.min.js"
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
            build: {
                options: {
                    force: true
                },
                files: grunt.file.expandMapping([
                    buildOptions.dirs.build,
                    buildOptions.dirs.resources,
                    'reports',
                    'app/css/**/*.css',
                    'app/css/**/*.map',
                    'app/**/*.min.js',
                    'app/components/**/*.min.js',
                    'app/components/**/*.min.html',
                    'app/pages/**/*.min.js',
                    'app/pages/**/*.min.html',
                    '!app/bower_components/**/*.js',
                ])
            }
        },

        compass: {
            dev: {
                options: {
                    sourcemap: true,
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
                    basePath: buildOptions.dirs.build + 'src/main/sass',
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
                    sassDir: 'app/components',
                    cssDir: 'app/components',
                    config: 'src/main/sass/config.rb',
                    outputStyle: 'compressed',
                    force: true
                }
            }
        },

        processhtml: {
            options: {
            },
            dev: {},
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
            dev: {},
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
                        cwd: 'target/build',
                        expand: true,
                        src: [
                            "app/*.html",
                            "app/css/**/*",
                            "app/i/**/*",
                            "app/*.min.js",
                            "resources/**/*",
                            "app/components/demo/**/*",
                        ],
                        dest: buildOptions.dirs.resources,
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

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

    // Tasks:
    grunt.registerTask('default', ['clean', 'install']);

    grunt.registerTask('phase-compile-mvn', [
        'requirejs:' + buildOptions.target,
        'processhtml:' + buildOptions.target
    ]);

    // Helper tasks:
    grunt.registerTask('run-tests', ['karma:unit',  'protractor']);
    grunt.registerTask('gh-pages', ['version', 'processhtml', 'install']);

    // ================================================================================================================================================
    // Locally override 'grunt-recursive-compass':
    //      The original task did not return the process return status to grunt and therefore did not fail the build if there was a compilation issue.
//    grunt.loadNpmTasks('grunt-recursive-compass');
    (function() {
        var cmd = process.platform === 'win32' ? 'compass.bat' : 'compass';
        var dargs = require('dargs');
        var path = require('path');
        var sassPartialReg = /^_/;

        function compile(args, cb) {
            var child = grunt.util.spawn({
                cmd: cmd,
                args: args
            }, function(err, result, code) {
                var success = code === 0;

                if (err) {
                    grunt.log.warn(err);
                }

                if (code === 1 && /Nothing to compile/g.test(result.stderr)) {
                    success = true;
                }

                cb(success);
            }).on('exit', function(code){
                if (code === 127) {
                    grunt.log.warn(
                        'You need to have Ruby and Compass installed ' +
                            'and in your system PATH for this task to work. ' +
                            'More info: https://github.com/psyrendust/grunt-recursive-compass'
                    );
                }
            });
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        }

        grunt.registerMultiTask('recursive-compass', 'Recursively compile Compass to CSS.', function() {
            var options = this.options();
            var filesToProcess = [];
            var myArgs = ['compile'].concat(dargs(options));
            var cb = this.async();

            // Iterate over all specified file groups.
            this.files.forEach(function(f) {
                filesToProcess = filesToProcess.concat(f.src.filter(function(filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        grunt.log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    }
                    if (grunt.file.isFile(filepath)) {
                        return !sassPartialReg.test(path.basename(filepath));
                    }
                    return false;
                }));
            });

            grunt.verbose.writeflags(options, 'Options');

            myArgs = myArgs.concat(filesToProcess);

            compile(myArgs, function (success) {
                cb(success);
            });
        });
    })();

    // Locally override 'grunt-contrib-compass':
    //      The original task did not return the process return status to grunt and therefore did not fail the build if there was a compilation issue.
//    grunt.loadNpmTasks('grunt-contrib-compass');
    (function() {
        var compass = require('grunt-contrib-compass/tasks/lib/compass').init(grunt);

        function compile(args, cb) {
            var child = grunt.util.spawn({
                cmd: args.shift(),
                args: args
            }, function (err, result, code) {
                var success = code === 0;

                if (code === 127) {
                    return grunt.warn(
                        'You need to have Ruby and Compass installed ' +
                            'and in your system PATH for this task to work. ' +
                            'More info: https://github.com/gruntjs/grunt-contrib-compass'
                    );
                }

                // `compass compile` exits with 1 and outputs "Nothing to compile"
                // on stderr when it has nothing to compile.
                // https://github.com/chriseppstein/compass/issues/993
                // Don't fail the task in this situation.
                if (code === 1 && /Nothing to compile/g.test(result.stderr)) {
                    success = true;
                }

                cb(success);
            });
            child.stdout.pipe(process.stdout);
            child.stderr.pipe(process.stderr);
        }

        grunt.registerMultiTask('compass', 'Compile Sass to CSS using Compass', function () {
            var options = this.options();
            var cb = this.async();

            // display compilation time
            if (!options.clean) {
                options.time = true;
            }

            // create a function to retroactively add a banner to the top of the
            // generated files, if specified
            var bannerCallback = compass.buildBannerCallback(grunt, options);
            // create a temporary config file if there are 'raw' options or
            // settings not supported as CLI arguments
            var configContext = compass.buildConfigContext(options);
            // get the array of arguments for the compass command
            var args = compass.buildArgsArray(options);

            configContext(function (err, path) {
                if (err) {
                    grunt.fail.warn(err);
                }

                if (path) {
                    args.push('--config', path);
                }

                compile(args, function (success) {
                    bannerCallback();
                    cb(success);
                });
            });
        });
    })();
};
