module.exports = function (grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration
        bower_concat: {
            all: {
                dest: 'dist/concat/bundle.js',
                mainFiles: {
                    'angular': ['angular.js'],
                    'jquery': ['dist/jquery.js']
                },
                dependencies: {
                    'angular': 'jquery'
                },
                includeDev: true,
                bowerOptions: {
                    relative: true
                }
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            combine: {
                files: {
                    'css/release.min.css': [
                        'css/bootstrap/css/bootstrap.min.css',
                        'css/font-awesome.min.css',
                        'css/*.css',
                        'app/components/profile/profile.css',
                        'app/components/lesson/quotes/quote.css',
                        'app/components/footer/setting/setting.css',
                        'app/components/lesson/challenge-new/challenge.css',
                        'app/components/mission/style.css',
                    ]
                }
            }
        },
        uglify: {
            bower: {
                files: {
                    'libs/bundle.min.js': ['dist/concat/bundle.js']
                }
            },
            config: {
                files: {
                    'libs/config.min.js': ['app/configs/env.js', 'dist/concat/config.js']
                }
            },
            services: {
                files: {
                    'libs/release.min.js': ['dist/concat/main.js', 'dist/concat/module.js', 'dist/concat/services.js', 'dist/concat/component.js', 'dist/concat/controller.js']
                }
            }
        },
        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        src: [
                            'app/components/*/*/*.js',
                            'app/components/*/*/*/*.js',
                            'app/components/*/*/*/*/*.js',
                            'app/components/*/*.js',
                            'app/shares/*.js',
                            'app/*.js'
                        ],
                        dest: 'dist/annotated/'
                    }
                ]
            }
        },
        concat: {
            config: {
              files: {
                'dist/concat/config.js': [
                    'app/configs/config.js',
                    'app/configs/index.js',
                    'app/configs/topics.js',
                    'app/configs/schoolList.js',
                    'libs/sweetalert.min.js',
                    'css/bootstrap/js/bootstrap.min.js',
                    'libs/google-text-to-speech.js',
                    'libs/roundProgress.min.js',
                    'libs/circle-progress.min.js',
                    'libs/sparkle.js',
                    'libs/amcharts.js',
                    'libs/pie.js', ]
              }
            },
            main: {
                files: {
                  'dist/concat/main.js' : [
                    'dist/annotated/app/app.module.js',
                    'dist/annotated/app/app.controller.js',
                    'dist/annotated/app/shares/*.directive.js',
                  ]
                }
            },
            services: {
              files: {
                'dist/concat/services.js': [
                  'dist/annotated/app/shares/MainService.js',
                  'dist/annotated/app/components/*/*.service.js',
                  'dist/annotated/app/shares/*.service.js',
                  'dist/annotated/app/shares/*.filter.js'
                ]
              }
            },
            component: {
              files: {
                'dist/concat/component.js': [
                  'dist/annotated/app/components/*/*/*.component.js',
                  'dist/annotated/app/components/*/*/*/*.component.js',
                  'dist/annotated/app/components/*/*.component.js',
                  'dist/annotated/app/components/footer/setting/setting.directive.js',
                  'dist/annotated/app/components/lesson/words/game.directive.js',
                    'dist/annotated/app/components/*/*.directive.js',
                    'dist/annotated/app/components/*/*.locales.js',
                    'dist/annotated/app/components/*/*/*.locales.js'
                ]
              }
            },
            module: {
              files: {
                'dist/concat/module.js': [
                  'dist/annotated/app/components/*/*/*.module.js',
                  'dist/annotated/app/components/*/*.module.js'
                ]
              }
            },
            controller: {
                files: {
                    'dist/concat/controller.js': [
                        'dist/annotated/app/components/*/*/*/*/*.controller.js'
                    ]
                }
            }
        },
        less: {
            war: {
                files: {
                    'css/war.css': ['css/war.less']
                }
            }
        },
        clean: {
            dist: ['dist'],
            release: ['libs/release.min.js'],
            bundle: ['libs/bundle.min.js'],
            config: ['libs/config.min.js'],
            cssmin: ['css/release.min.css']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jssemicoloned');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('default', ['clean', 'ngAnnotate','bower_concat','concat','uglify', 'cssmin', 'less']);
};
