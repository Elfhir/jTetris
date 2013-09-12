/**
 * 	jTetris
 *  Author : Elfhir - Jérémy Ta
 *  Licence : MIT
 */

jQuery.noConflict();
(function($){
	$.jTetris = function(el, options){
		// To avoid scope issues, use 'base' instead of 'this'
		// to reference this class from internal events and functions.
		var base = this;
		
		// Access to jQuery and DOM versions of element
		base.$el = $(el);
		base.el = el;
		
		// Add a reverse reference to the DOM object
		base.$el.data("jTetris", base);
		
		base.init = function(){
			base.options = $.extend({},$.jTetris.defaultOptions, options);
			
			// Put your initialization code here
			base.keyboard();
		};

		base.keyboard = function(){
			$(document).keypress(function(event) {
				
				var keyCode = event.keyCode || event.which,
				keys = {left: 37, up: 38, right: 39, down: 40, space: 32 };

				switch (keyCode) {
					case keys.left:
						event.preventDefault();
						$('.jTetris-key-info').text("<");
					break;
					case keys.up:
						event.preventDefault();
						$('.jTetris-key-info').text("^");
					break;
					case keys.right:
						event.preventDefault();
						$('.jTetris-key-info').text(">");
					break;
					case keys.down:
						event.preventDefault();
						$('.jTetris-key-info').text("v");
					break;
					case keys.space:
						event.preventDefault();
						$('.jTetris-key-info').text("space");
					break;
				}

			});
		};

		// set design, size
		base.setup = function(){
			var canvas = document.getElementById(base);
    		var context = canvas.getContext('2d');
		};

		base.createTetrominoes = function(){

		};
		
		// Sample Function, Uncomment to use
		// base.functionName = function(paramaters){
		// 
		// };
		
		// Run initializer
		base.init();
	};
	
	$.jTetris.defaultOptions = {
	};
	
	$.fn.jTetris = function(options){
		return this.each(function(){
			(new $.jTetris(this, options));
		});
	};
	
	// This function breaks the chain, but returns
	// the jTetris if it has been attached to the object.
	$.fn.getjTetris = function(){
		this.data("jTetris");
	};
	
})(jQuery);
