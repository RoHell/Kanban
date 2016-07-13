module.exports = function(grunt) {
	grunt.initConfig({
		sass: {

  			options: {
    			sourceMap: true
  			},
	  		dist: {
	    		files: {
	          'css/style.css': 'scss/style.scss'
	    		}
	  		}
    	},

    	watch: {

	  		scripts: {
	    		files: ['**/*.scss'],
	    		tasks: ['sass'],
	    		options: {
	        		spawn: false,
	    		}
	  		}
		},

		browserSync: {
	      	server: {
	        	bsFiles: {
	          		src : [
	            		'css/*.css',
	            		'*.html',
	            		'js/*.js',
	            		'scss/*.scss'
	          		]
	        	},
	        	options: {
	          		watchTask: true,
	          		server: {
	          			baseDir: './'
	          		}
	        	}
	      	}
	    }
	});

	grunt.loadNpmTasks('grunt-sass');	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	grunt.registerTask('default', ['browserSync', 'sass', 'watch']);
};