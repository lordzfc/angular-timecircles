'use strict';

// jshint node:true

module.exports = function(grunt) {
  var files = [
      'bower_components/angular-svg-round-progressbar/build/roundProgress.min.js',
      'bower_components/lodash/lodash.min.js',
      'src/timecircles.js',
      'src/timecircles_factory.js',
      'src/timecircles_constants.js',
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'uglify': {
      'options': {
        'banner': '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      'build': {
        'src': files,
        'dest': 'build/timecircles.min.js'
      }
    },
    'concat': {
      'options': {
        separator: '\n',
      },
      'build': {
        src: files,
        dest: 'build/timecircles.js',
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['concat:build', 'uglify:build']);
};
