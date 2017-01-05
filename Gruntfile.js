// Generated on 2015-02-28 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);
var modRewrite = require('connect-modrewrite');
  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);
  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    cdnify: 'grunt-google-cdn'
  });
  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist',
    distRoot: __dirname + '/dist'
  };

  // Project configuration.
  var pkg = require('./package.json');

  var aws_ed2_pkg = require('./aws-ec2.json');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
        tasks: ['newer:jshint:all'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      server: {
        files: [
          'server.js',
          'service/**.js'
        ],
        tasks: ['express:dev'],
        options: {
          spawn: false,
          livereload: false
        }
      },
      jsTest: {
        files: ['test/spec/{,*/}*.js'],
        tasks: ['newer:jshint:test', 'karma']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,*/}*.css'],
        tasks: ['newer:copy:styles', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      less: {
        files: [
          '<%= yeoman.app %>/assets/less/*.less',
          '<%= yeoman.app %>/assets/less/**/*.less',
          '<%= yeoman.app %>/scripts/**/*.less'
        ],
        tasks: ['less:dev'],
        options: {
          livereload: true
        }
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9999,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        // Modrewrite rule, connect.static(path) for each path in target's base
        middleware: function (connect, options) {
          var optBase = (typeof options.base === 'string') ? [options.base] : options.base;
          return [require('connect-modrewrite')(['!(\\..+)$ / [L]'])].concat(
            optBase.map(function(path){ return connect.static(path); }));
        }
      },
      livereload: {
        options: {
          open: {
            server: {
              url: 'http://localhost:<%= connect.options.port %>'
            }
          },
          middleware: function (connect) {
            return [
              modRewrite(['^[^\\.]*$ /index.html [L]']),
              connect.static('.tmp'),
              connect().use('/bower_components', 
              connect.static('./bower_components')),
              connect().use('/app/styles', connect.static('./app/styles')),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('test'),
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      },
      server: {
        options: {
          port: 9090,
          base: 'build',
          middleware: function(connect, options) {
            // Return array of whatever middlewares you want
            return [
              // redirect all urls to index.html in build folder
              urlRewrite('build', 'index.html'),

              // Serve static files.
              connect.static(options.base),

              // Make empty directories browsable.
              connect.directory(options.base)
            ];
          }
        }
      }
    },

    express: {
      options: {
        port: 3000
      },
      dev: {
        options: {
          script: 'service/mongodb/server.js'
       //   ,
       //   debug: true
        }
      },
      prod: {
        options: {
          script: 'service/mongodb/server.js',
          node_env: 'production'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '<%= yeoman.app %>/scripts/{,*/}*.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
     //     '<%= yeoman.dist %>/controllers/{,*/}*.js',
      //    '<%= yeoman.dist %>/configs/{,*/}*.js',
     //     '<%= yeoman.dist %>/constants/{,*/}*.js',
     //     '<%= yeoman.dist %>/directives/{,*/}*.js',
    //      '<%= yeoman.dist %>/services/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
      //    '<%= yeoman.dist %>/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/{,*/}*.html',
      options: {
        dest: '<%= yeoman.dist %>',
        root: './',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
        }
      }
    },

    less: {
      dev: {
        options: {
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= yeoman.app %>/assets/css/application.css.map',
          sourceMapFilename: '<%= yeoman.app %>/assets/css/application.css.map',
        },
        files: [{
          src: '<%= yeoman.app %>/assets/less/application.less',
          dest: '<%= yeoman.app %>/assets/css/application.css'
        }]
      }
    },

    imagemin: {
      dist: {
        options: {
          optimizationLevel: 5
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{ico,png,jpg,jpeg,gif}',   
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          // collapseWhitespace: true,
          // conservativeCollapse: true,
          // collapseBooleanAttributes: true,
          // removeCommentsFromCDATA: true,
          // removeOptionalTags: true

          collapseBooleanAttributes:      true,
          collapseWhitespace:             true,
          removeAttributeQuotes:          true,
          removeComments:                 true, // Only if you don't use comment directives!
          removeEmptyAttributes:          true,
          removeRedundantAttributes:      true,
          removeScriptTypeAttributes:     true,
          removeStyleLinkTypeAttributes:  true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', 'views/{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/controllers/',
          src: '*.js',
          dest: '<%= yeoman.dist %>/controllers/'
        }]
      }
    },
    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
     cssmin: {
       dist: {
         files: {
           '<%= yeoman.dist %>/styles/styles.css': [
             '.tmp/styles/{,*/}*.css',
             '<%= yeoman.app %>/styles/{,*/}*.css'
           ]
        }
       }
     },
    uglify: {
      
      options: {mangle: false },
       dist: {
         files: 
         [ 
               { dest: '<%= yeoman.dist %>/scripts/vendor.js',
                src: [ '.tmp/concat/scripts/vendor.js' ] },
              { dest: '<%= yeoman.dist %>/scripts/scripts.js',
                src: [ '.tmp/concat/scripts/scripts.js' ] } 
          ] 
       }
        // generated: 
        // { 
        //   options: {
        //     mangle: false,
        //     compress: true
        //   },
        //   files: 
        //     [ 
        //       { dest: '<%= yeoman.dist %>/scripts/vendor.js',
        //         src: [ '.tmp/concat/scripts/vendor.js' ] },
        //       { dest: '<%= yeoman.dist %>/scripts/scripts.js',
        //         src: [ '.tmp/concat/scripts/scripts.js' ] } 
        //     ] 
        // } 
    },

     concat:
      { generated: 
       { files: 
          [ { dest: '.tmp/concat/styles/vendor.css',
              src: 
              [ 
                'bower_components/BrandButtons/dist/brand-buttons.min.css' ,
                'bower_components/angularjs-datepicker/dist/angular-datepicker.min.css',
                'bower_components/bootstrap/dist/css/bootstrap.css',
                'bower_components/fontawesome/css/font-awesome.css',
                'bower_components/bootstrap-social/bootstrap-social.css',
                'bower_components/ng-table/dist/ng-table.min.css',
                'bower_components/animate.css/animate.css',
                'bower_components/sweetalert2/dist/sweetalert2.css',
                'bower_components/textAngular/dist/textAngular.css',
                'bower_components/ng-tags-input/ng-tags-input.css',
                'bower_components/hover/css/hover.css',
                'bower_components/angular-growl-v2/build/angular-growl.css',
                'bower_components/bootstrap-star-rating/css/star-rating.min.css',
                'bower_components/select2/select2.css',
                'bower_components/select2-bootstrap-css/select2-bootstrap.css',
                'bower_components/angular-aside/dist/css/angular-aside.css'
              ] 
            },

            { dest: '.tmp/concat/styles/main.css',
              src: [ '{.tmp,app}/styles/main.css' ] 
            },

            { dest: '.tmp/concat/styles/styles.css',
              src: 
              [ 
                '{.tmp,app}/styles/search.css',
                '{.tmp,app}/styles/step.css',
                '{.tmp,app}/styles/screen-device.css',
                '{.tmp,app}/styles/kzh-navbar.css',
                '{.tmp,app}/styles/kzh-side-menu.css',
                '{.tmp,app}/styles/kzh-footer.css',
                '{.tmp,app}/styles/kzh-technician.css',
                '{.tmp,app}/styles/kzh-google-map.css',
              ] 
            },

            { dest: '.tmp/concat/scripts/vendor.js',
              src: 
               [ 'bower_components/jquery/dist/jquery.js',
                 'bower_components/angular/angular.js',
                 'bower_components/angular-animate/angular-animate.js',
                 'bower_components/angular-facebook/lib/angular-facebook.js',
                 'bower_components/lodash/lodash.js',
                 'bower_components/angular-recaptcha/release/angular-recaptcha.js',
                 'bower_components/angular-translate/angular-translate.js',
                 'bower_components/angularjs-datepicker/dist/angular-datepicker.min.js' ,
                 'bower_components/bootstrap/dist/js/bootstrap.js',
                 'bower_components/layzr.js/dist/layzr.js',
                 'bower_components/less/dist/less.js',
                 'bower_components/ng-file-upload/ng-file-upload.js',
                 'bower_components/ng-file-upload-shim/ng-file-upload-shim.js',
                 'bower_components/ng-password-strength/dist/scripts/ng-password-strength.js',
                 'bower_components/ng-table/dist/ng-table.min.js',
                 'bower_components/platform/platform.js',
                 'bower_components/oauth-js/dist/oauth.min.js',
                 'bower_components/sweetalert/dist/sweetalert.min.js',
                 'bower_components/angular-cookies/angular-cookies.js',
                 'bower_components/angular-route/angular-route.js',
                 'bower_components/angular-spinners/dist/angular-spinners.min.js',
                 'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
                 'bower_components/angular-aside/dist/js/angular-aside.js',
                 'bower_components/es6-promise/promise.js',
                 'bower_components/sweetalert2/dist/sweetalert2.js',
                 'bower_components/rangy/rangy-core.js',
                 'bower_components/rangy/rangy-classapplier.js',
                 'bower_components/rangy/rangy-highlighter.js',
                 'bower_components/rangy/rangy-selectionsaverestore.js',
                 'bower_components/rangy/rangy-serializer.js',
                 'bower_components/rangy/rangy-textrange.js',
                 'bower_components/textAngular/dist/textAngular.js',
                 'bower_components/textAngular/dist/textAngular-sanitize.js',
                 'bower_components/textAngular/dist/textAngularSetup.js',
                 'bower_components/ng-tags-input/ng-tags-input.js',
                 'bower_components/moment/moment.js',
                 'bower_components/angular-moment/angular-moment.j',
                 'bower_components/ngGeolocation/ngGeolocation.js',
                 'bower_components/angular-growl-v2/build/angular-growl.js',
                 'bower_components/angular-loading-overlay/dist/angular-loading-overlay.js',
                 'bower_components/Chart.js/dist/Chart.js',
                 'bower_components/angular-update-meta/dist/update-meta.js'
                ] 
            },

            { dest: '.tmp/concat/scripts/scripts.js',
              src: 
                [ 
                  'app/scripts/app.js',
                  'app/scripts/controllers/main-controller.js',
                  'app/scripts/controllers/header-controller.js',
                  'app/scripts/controllers/body-controller.js',
                  'app/scripts/controllers/footer-controller.js',
                  'app/scripts/controllers/article-controller.js',
                  'app/scripts/controllers/history-controller.js',
                  'app/scripts/controllers/contact-controller.js',
                  'app/scripts/controllers/cart-controller.js',
                  'app/scripts/controllers/login-controller.js',
                  'app/scripts/controllers/shipment-controller.js',
                  'app/scripts/controllers/payment-controller.js',
                  'app/scripts/controllers/supplier-controller.js',
                  'app/scripts/controllers/technician-controller.js',
                  'app/scripts/controllers/entrepreneur-controller.js',

                  'app/scripts/configs/app-translate.js',
                  'app/scripts/configs/app-route.js',

                  'app/scripts/constants/constants.js',

                  'app/scripts/directives/enter-directive.js',
                  'app/scripts/directives/menu-directive.js',
                  'app/scripts/directives/menu-item-directive.js',
                  'app/scripts/directives/focus-directive.js',
                  'app/scripts/directives/scroll-on-click-directive.js',
                  'app/scripts/directives/product-type-directive.js',
                  'app/scripts/directives/product-directive.js',
                  'app/scripts/directives/article-directive.js',
                  'app/scripts/directives/technician-directive.js',

                  'app/scripts/services/menu-service.js', 
                  'app/scripts/services/locale-service.js', 
                  'app/scripts/services/receipt-order-service.js', 
                  'app/scripts/services/user-service.js', 
                  'app/scripts/services/currency-service.js', 
                  'app/scripts/services/company-service.js', 
                  'app/scripts/services/product-service.js', 
                  'app/scripts/services/credential-service.js', 
                  'app/scripts/services/social-service.js', 
                  'app/scripts/services/email-service.js', 
                  'app/scripts/services/crypto-service.js', 
                  'app/scripts/services/product-type-service.js', 
                  'app/scripts/services/product-category-service.js', 
                  'app/scripts/services/uom-service.js', 
                  'app/scripts/services/province-service.js', 
                  'app/scripts/services/district-service.js', 
                  'app/scripts/services/sub-district-service.js', 
                  'app/scripts/services/weight-rate-service.js', 
                  'app/scripts/services/app-config-service.js', 
                  'app/scripts/services/aws-service.js', 
                  'app/scripts/services/paypal-service.js', 
                  'app/scripts/services/feedback-service.js', 
                  'app/scripts/services/article-service.js', 
                  'app/scripts/services/utility-service.js', 
                  'app/scripts/services/subscribe-service.js',
                  'app/scripts/services/technician-service.js',
                  'app/scripts/services/entrepreneur-service.js', 
                  'app/scripts/services/geolocation-service.js',
                  'app/scripts/services/service-service.js',

                  'app/scripts/filters/html-filter.js',
                  'app/scripts/filters/cut-more-filter.js',
                  'app/scripts/factories/data-model-factory.js',

                  'app/scripts/scripts/main.js',
                  'app/scripts/scripts/google-map.js',
                  'app/scripts/scripts/step.js'
              
                ] 
            } 
          ] 
        } 
      },
  //   concat: {
  //      options: {
          // define a string to put between each file in the concatenated output
 //         separator: ';'
 //       },
 //       dist: {
          // the files to concatenate
//          src: ['<%= yeoman.dist %>/scripts/scripts.js', '<%= yeoman.dist %>/controllers/controllers.js',
 //         '<%= yeoman.dist %>/constants/constants.js', '<%= yeoman.dist %>/directives/directives.js',
//          '<%= yeoman.dist %>/services/services.js'],
          // the location of the resulting JS file
 //         dest: '<%= yeoman.dist %>/scripts/scripts.js'
  //      }
  //    },
    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'views/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: 'bower_components/fontawesome',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      },
      nodejs: {
        expand: true,
        cwd: 'service',
        dest: '<%= yeoman.dist %>/service',
        src: ['{,*/}*.*', '{,*/}*/{,*/}*/*']
      },
      configfile: {
        expand: true,
        cwd: './',
        dest: '<%= yeoman.dist %>',
        src: ['bower.json', 'package.json', 'Procfile', '.bowerrc']
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'KZHWEB',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= yeoman.app %>',
        src: 'views/{,*/}*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    },
    buildcontrol: {
      options: {
        dir: '<%= yeoman.dist %>',
        commit: true,
        push: true,
        connectCommits: false,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:panyaxbo/KZHWEB.git',
          branch: 'gh-pages'
        }
      },
      heroku: {
        options: {
          remote: 'git@heroku.com:kzh-parts.git',
          branch: 'master',
          tag: pkg.version
        }
      },
      testheroku: {
        options: {
          remote: 'git@heroku.com:test-kzh-parts.git',
          branch: 'master',
          tag: pkg.version
        }
      },
      local: {
        options: {
          remote: '../',
          branch: 'build'
        }
      }
    },

  ngconstant: {
      options: {
        space: '  ',
        deps: ['ngLocale'],
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name : 'CONFIG'
      },
      // Environment targets
      development: {
        options :{
          dest: '<%= yeoman.app %>/scripts/constants/constants.js'
        },
        constants: {
          ENV: {
            name: 'development',
            apiEndpoint: 'http://localhost:3000'
          }
        }
      },
      test: {
        options: {
          dest: '<%= yeoman.app %>/scripts/constants/constants.js'
        },
        constants: {
          ENV: {
            name: 'test',
            apiEndpoint: 'https://test-kzh-parts.herokuapp.com'
          }
        }
      },
      production: {
        options: {
          dest: '<%= yeoman.app %>/scripts/constants/constants.js'
        },
        constants: {
          ENV: {
            name: 'production',
            apiEndpoint: 'https://www.kzhparts.com'
          }
        }
      }
    },

    comments: {
      html: {
        // Target-specific file lists and/or options go here. 
        options: {
            singleline: true,
            multiline: true
        },
        src: [ '<%= yeoman.app %>/{,*/}*.html'] // files to remove comments from 
      },
      js: {
        // Target-specific file lists and/or options go here. 
        options: {
            singleline: true,
            multiline: true
        },
        src: [ '<%= yeoman.app %>/scripts/{,*/}*.js'] // files to remove comments from 
      }
    },

    removelogging: {
      dist: {
        src: ".tmp/concat/scripts/script.js" // Each file will be overwritten with the output!
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
      'clean:server',
      'ngconstant:development',
      'wiredep',
      'concurrent:server',
   //   'less:dev',
      'autoprefixer:server',
      'connect:livereload',
      'express:dev',
      'watch'
    ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', [
    'clean:server',
    'wiredep',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('test-build', [
    'clean:dist',
    'ngconstant:test',
    'wiredep',
    'useminPrepare',
    'ngtemplates',
    'concat',
  //  'removelogging',
     'ngAnnotate',
    'copy:dist',
//    'concurrent:dist',
    'copy:styles',
    'copy:nodejs',
    'copy:configfile',
        'imagemin',
        'svgmin',
    'autoprefixer',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:production',
    'wiredep',
    'useminPrepare',
    'ngtemplates',
    'concat',
 //   'removelogging',
    'ngAnnotate',
    'copy:dist',
//    'concurrent:dist',
    'copy:styles',
    'copy:nodejs',
    'copy:configfile',
        'imagemin',
        'svgmin',
    'autoprefixer',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    'test',
    'build'
  ]);
  grunt.registerTask('heroku:development', 'clean less mincss');

  grunt.registerTask('heroku:production', [
    'clean:dist',
    'ngconstant:production',
    'wiredep',
    'useminPrepare',
//    'concurrent:dist',
    'copy:styles',
    'copy:nodejs',
    'copy:configfile',
        'imagemin',
        'svgmin',
    'autoprefixer',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
    ]);
};
