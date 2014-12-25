module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: ['components/**/dist', 'tests/coverage', 'docs'],

        jshint: {
            options: {
                ignores: ['components/**/lib/**/*.js']
            },
            all: ['components/**/src/*.js']
        },

        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            }
        },

        concat: {
            dist: {
                files: {
                    'components/dynamic-slider/dist/dynamic-slider.js': ['components/dynamic-slider/src/*.js'],
                    'components/key-enter/dist/key-enter.js': ['components/key-enter/src/*.js'],
                    'components/loader/dist/loader.js': ['components/loader/src/*.js'],
                    'components/map/dist/map.js': ['components/map/src/*.js'],
                    'components/match/dist/match.js': ['components/match/src/*.js'],
                    'components/pager/dist/pager.js': ['components/pager/src/*.js'],
                    'components/pillbox/dist/pillbox.js': ['components/pillbox/src/*.js'],
                    'components/scroller/dist/scroller.js': ['components/scroller/src/*.js'],
                    'components/smart-pager/dist/smart-pager.js': ['components/smart-pager/src/*.js'],
                    'components/swipe-menu/dist/swipe-menu.js': ['components/swipe-menu/src/*.js'],
                    'components/toastr/dist/toastr.js': ['components/toastr/src/*.js']
                }
            }
        },

        uglify: {
            options: {
                banner: '/*! wt-ui <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'components/dynamic-slider/dist/dynamic-slider.min.js': ['components/dynamic-slider/src/*.js'],
                    'components/key-enter/dist/key-enter.min.js': ['components/key-enter/src/*.js'],
                    'components/loader/dist/loader.min.js': ['components/loader/src/*.js'],
                    'components/map/dist/map.min.js': ['components/map/src/*.js'],
                    'components/match/dist/match.min.js': ['components/match/src/*.js'],
                    'components/pager/dist/pager.min.js': ['components/pager/src/*.js'],
                    'components/pillbox/dist/pillbox.min.js': ['components/pillbox/src/*.js'],
                    'components/scroller/dist/scroller.min.js': ['components/scroller/src/*.js'],
                    'components/smart-pager/dist/smart-pager.min.js': ['components/smart-pager/src/*.js'],
                    'components/swipe-menu/dist/swipe-menu.min.js': ['components/swipe-menu/src/*.js'],
                    'components/toastr/dist/toastr.min.js': ['components/toastr/src/*.js']
                }
            }
        },

        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: ['js'],
                    outdir: 'docs/'
                }
            }
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');

    // Test task
    grunt.registerTask('test', function () {
        grunt.task.run('karma');
    });

    // Default task
    grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify']);

};