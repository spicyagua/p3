module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    jsSrcRoot: "app/scripts",

    concat: {
      dist: {
        src: [
          "<%= jsSrcRoot %>/libs/jquery-2.1.1.js",
          "<%= jsSrcRoot %>/one.js",
          "<%= jsSrcRoot %>/two.js",
          "<%= jsSrcRoot %>/three.js",
        ],
        dest: "dist/<%= pkg.name %>.js",
        banner: "This is a banner"
      }
    },
    jshint: {
      all: ["<%= jsSrcRoot %>/*.js"]
    },
    uglify: {
      my_target: {
        options: {
          sourceMap: true,
        },
        files: {
          "dist/<%= pkg.name %>.min.js": ["dist/<%= pkg.name %>.js"]
        }
      }
    },
    copy: {
      main: {
        files: [
          {src: ["app/index.html"], dest: "dist/", expand: true, flatten: true}
        ]
      }
    },
    clean: ["dist/"]
  });

  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask("default", ["concat:dist", "uglify", "copy"]);

};