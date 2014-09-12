module.exports = function(grunt) {

  /*
    Neat trick to load all tasks defined in "package.json" marked as
    dev dependencies
  */
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    //TODO Move all of this hardcoded, redundant
    //file path crap into variables

    pkg: grunt.file.readJSON("package.json"),

    jsSrcRoot: "app/scripts",

    env: {
      prod: {
        NODE_ENV: "PRODUCTION"
      },
      dev: {
        NODE_ENV: "DEVELOPMENT"
      }
    },

    preprocess: {
      prod: {
        src: "app/index.html",
        dest: "tmp/index.html"
      },
      dev: {
        src: "app/index.html",
        dest: "tmp/index.html"
      }
    },

    concat: {
      prod: {
        src: [
          "<%= jsSrcRoot %>/libs/jquery-2.1.1.js",
          "<%= jsSrcRoot %>/one.js",
          "<%= jsSrcRoot %>/two.js",
          "<%= jsSrcRoot %>/three.js",
        ],
        dest: "tmp/<%= pkg.name %>.js",
//        banner: "This is a banner"
      }
    },
    jshint: {
      all: ["<%= jsSrcRoot %>/*.js"]
    },
    uglify: {
      prod: {
        options: {
          sourceMap: true,
        },
        files: {
          "tmp/<%= pkg.name %>.min.js": ["tmp/<%= pkg.name %>.js"]
        }
      }
    },
    copy: {
      prod: {
        files: [
          {src: ["tmp/index.html"], dest: "dist/", expand: true, flatten: true},
          {src: ["tmp/<%= pkg.name %>.min.js"], dest: "dist/", expand: true, flatten: true}
        ]
      },
      dev: {
        files: [
          {src: ["tmp/index.html"], dest: "dist/", expand: true, flatten: true},
          {cwd: "app/scripts", src: ["**/*.js"], dest: "dist/", expand: true, flatten: false}
        ]
      }
    },
    clean: ["dist/"],
    //TODO More granular
    watch: {
      files: ["app/**/*"],
      tasks: ["copy:dev"]
    }
  });
/*
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-watch");
*/

  grunt.registerTask("dev", ["env:dev", "preprocess:dev", "copy:dev"]);
  grunt.registerTask("prod", ["env:prod", "preprocess:prod", "concat:prod", "uglify:prod", "copy:prod"]);
  grunt.registerTask("default", ["dev"]);

};