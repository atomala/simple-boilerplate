module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    'jshint-jsx': {
      dist: ['Gruntfile.js', 'src/**/*.(js|jsx)',]
    },
    babel: {
      options: {
        sourceMap: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.(jsx|js)'],
          dest: 'build/',
          ext: '.js'
        }]
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['build/**/*.js'],
        dest: 'dist/app.js',
      }
    },
    concat_css: {
      dist: {
        src: ['src/**/*.css'],
        dest: 'dist/styles.css'
      }
    },
    copy: {
      dist: {
        files: [
        {expand: true, cwd: 'src/', src:'**/*.!(jsx|js|css)', dest:'dist/' },
        ]
      }
    },
    watch: {
      js_compile: {
        files: ['src/**/*.(js|jsx)'],
        tasks: ['jshint-jsx', 'babel', 'concat'],
        options: {
          spawn: true,
          livereload: true
        }
      }, 
      css_compile: {
        files: ['src/**/*.css'],
        tasks: ['concat_css'],
        options: {
          spawn: true,
          livereload: true
        }
      }, 
      resource_move: {
        files: ['src/**/*.!(jsx|js|css)'],
        tasks: ['copy'],
        options: {
          spawn: true,
          livereload: true
        }
      }
    },
    connect: {
        server: {
          options: {
            port: 8000,
            hostname: '*',
            livereload: true,
            base: 'dist'
          }
        }
      }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint-jsx');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concat-css');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task(s).
  grunt.registerTask('build', ['jshint-jsx', 'babel', 'concat', 'concat_css', 'copy']);
  grunt.registerTask('server', ['jshint-jsx', 'babel', 'concat', 'concat_css', 'copy', 'connect', 'watch']);
};
