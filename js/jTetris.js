/**
 * 	jTetris
 *  Author : Elfhir - Jérémy Ta
 *  Licence : MIT
 */

"use strict";
var jTetris = {

	// Vars
	wrapper : null,
	that : null,
	infoZone : null,
	gameZone : null,
	keysZone : null,

	keys : {
		left: 37,
		up: 38,
		right: 39,
		down: 40,
		z: 90,
		q: 81,
		s: 83,
		d: 68,
		space: 32
	},

	// Methods
	
	init : function() {
		// Put your initialization code here
		jTetris.setup();
		jTetris.keyboardListener();
		
		jTetris.setupKinetic();
		window.console.log(jTetris.that.style.offsetHeight);
		//jTetris.createTetrominoes();
	},
	
	keyboardListener : function() {
		document.addEventListener("keydown", function (e) {			
			switch (e.keyCode) {
				case jTetris.keys.left :
				case jTetris.keys.q :
					e.preventDefault();
					window.console.log("left");
				break;

				case jTetris.keys.up :
				case jTetris.keys.z :
					e.preventDefault();
					window.console.log("up");
				break;

				case jTetris.keys.right :
				case jTetris.keys.d :
					e.preventDefault();
					window.console.log("right");
				break;

				case jTetris.keys.down :
				case jTetris.keys.s :
					e.preventDefault();
					window.console.log("down");
				break;

				case jTetris.keys.space :
					e.preventDefault();
					window.console.log("space");
				break;
			}
		});
	},

	setup : function() {
		jTetris.wrapper = document.getElementById("jTetris-wrapper");
		jTetris.that = document.getElementById("jTetris");
		jTetris.infoZone = document.getElementById("jTetris-info-zone");
		jTetris.gameZone = document.getElementById("jTetris-game-zone");
		jTetris.tetriminoesInfo = document.getElementById("jTetris-tetriminoes-info");
	},

	setupKinetic : function() {
		var stage = new Kinetic.Stage({
			container: jTetris.that,
			width: 300,
			height: 300
		});

		var gameLayer = new Kinetic.Layer();

		var rect = new Kinetic.Rect({
	        x: 239,
	        y: 75,
	        width: 100,
	        height: 50,
	        fill: 'green',
	        stroke: 'black',
	        strokeWidth: 4
	      });

	      // add the shape to the layer
	      gameLayer.add(rect);

	      // add the layer to the stage
	      stage.add(gameLayer);

	}

};

jTetris.init();