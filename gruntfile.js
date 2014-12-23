module.exports = function (grunt) {
    'use strict';
    
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        clean: ['dist', 'tests/coverage', 'docs'],
        
        jshint: {
            all: ['src/**/src/*.js']
        },
        
        karma: {
            unit: {
                configFile: 'config/karma.conf.js'
            }
        },
        
        concat: {
            dist: {
                src: ['components/**/src/*.js'],
                dest: 'dist/ui_<%= pkg.version %>.js'
            }
        },
        
        uglify: {
            options: {
                banner: '/*! UI <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'dist/ui_<%= pkg.version %>.js',
                dest: 'dist/ui_<%= pkg.version %>.min.js'
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