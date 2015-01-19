module.exports = function(grunt) {
    "use strict";

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
                    jshintrc: '.jshintrc'
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

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-minify-html');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-build-lifecycle');
    grunt.loadNpmTasks('grunt-karma');

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

    grunt.registerTask('default', ['deploy']);
};
