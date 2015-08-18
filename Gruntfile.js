module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    compass: {
      dev: {
        options: {
          sassDir: 'dev',
          cssDir: 'public',
          sourcemap: true
        }
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'dev/*.js']
    },
    uglify: {
      options: {
        compress: {
          drop_console: false
        }
      },
      build: {
        src: 'dev/*.js',
        dest: 'public/scripts.min.js'
      }
    },
    watch: {
      gruntfile: {
        files: ['Gruntfile.js']
      },
      all: {
        files: [
              'public/*.html'
        ],
        options: {
          livereload: true,
        }
      },
      js: {
        files: ['dev/*.js'],
        tasks: ['jshint' , 'uglify'],
        options: {
          livereload: true,
        }
      },
      css: {
        files: ['dev/*.scss'],
        tasks: ['compass:dev'],
        options: {
          livereload: false,
        }
      }
    }
  });

  grunt.registerTask('dev', ['compass:dev', 'watch']);
  grunt.registerTask('default', ['dev']);

};
