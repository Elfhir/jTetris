/**
 * 	jTetris
 *  Author : Elfhir - Jérémy Ta
 *  Licence : MIT
 */

"use strict";
var jTetris = {

	// Vars
	wrapper		:	null,
	that		:	null,
	infoZone	:	null,
	gameZone	:	null,
	keysZone	:	null,
	tetriminoes	:	null,
	score		:	null,

	keys : {
		left	:	37,
		up		:	38,
		right	:	39,
		down	:	40,
		z		:	90,
		q		:	81,
		s		:	83,
		d		:	68,
		space	:	32
	},

	speed					:	0.1,
	frequence				:	2000,
	down					:	null,

	current_x				:	0,
	current_y				:	0,
	current_theta			:	0,

	stage_width				:	200,
	stage_height			:	360,
	score_height			:	200,
	score_width				:	100,
	preview_height			:	100,
	preview_width			:	100,
	square_size				:	20,
	stroke_size				:	2,

	colors : {
		white:		"#ffffff",
		cream:		"#dddddd",
		grey:		"#aaaaaa",
		greyBlack:	"#888888",
		blackGrey:	"#222222",
		black:		"#000000",
		orange:		"#ff400d",
		cyan:		"#00eeff",
		blue:		"#0088ff",
		marine:		"#0000ff",
		violet:		"#6000ff"
	},

	currentLayer: null,

	// Methods
	
	init : function() {
		// Put your initialization code here
		jTetris.setup();
		jTetris.setupKinetic();
		jTetris.keyboardListener();
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
					jTetris.rotate(90);
				break;
			}
		});
	},

	setup : function() {
		jTetris.wrapper = document.getElementById("jTetris-wrapper");
		jTetris.that = document.getElementById("jTetris");
		jTetris.infoZone = document.getElementById("jTetris-info-zone");
		jTetris.gameZone = document.getElementById("jTetris-game-zone");
		jTetris.scoreInfo = document.getElementById("jTetris-score-info");
		jTetris.preview = document.getElementById("jTetris-tetriminoes-info");
	},

	rotate : function(alpha) {
		
		console.log("before : " + jTetris.current_theta);
		//if(jTetris.current_theta == 360) {jTetris.current_theta = 0 ;}
		//console.log("after : " + jTetris.current_theta);
		

			if (jTetris.current_theta == 0) {
				//console.log("theta : 0");
				jTetris.current_theta = 90;
				jTetris.currentLayer.setRotationDeg(alpha);
				jTetris.currentLayer.setPosition(jTetris.current_x + jTetris.square_size, jTetris.current_y + jTetris.square_size);
			}

			else if (jTetris.current_theta == 90) {
				//console.log("theta : 90");
				jTetris.current_theta = 180;
				jTetris.currentLayer.setRotationDeg(alpha*2);
				jTetris.currentLayer.setPosition(jTetris.current_x + 3*jTetris.square_size, jTetris.current_y + jTetris.square_size);
			}

			else if (jTetris.current_theta == 180) {
				//console.log("theta : 180");
				jTetris.current_theta = 270;
				jTetris.currentLayer.setRotationDeg(alpha*3);
				jTetris.currentLayer.setPosition(jTetris.current_x - jTetris.square_size, jTetris.current_y + jTetris.square_size);
			}

			else if (jTetris.current_theta == 270) {
				//console.log("theta : 270");
				jTetris.current_theta = 0;
				jTetris.currentLayer.setRotationDeg(0);
				jTetris.currentLayer.setPosition(jTetris.current_x - 3*jTetris.square_size, jTetris.current_y - jTetris.square_size);
			}
		
	},

	// Game Zone #jTetris
	gamePlayground : function () {
		var gameLayer = new Kinetic.Layer({
			width:		(4*jTetris.square_size),
			height:		(4*jTetris.square_size)
		});

		var line = new LineTetris();
	
		for(var i = 0; i < 4; ++i) {
			gameLayer.add(line.squares[i]);
		}
		return gameLayer;
	},

	setupKinetic : function() {

		jTetris.currentLayer = jTetris.gamePlayground();
		
		var count = 0;
		jTetris.down = new Kinetic.Animation(
			function() {
				jTetris.current_y = jTetris.currentLayer.getY();
				jTetris.current_x = jTetris.currentLayer.getX();
				//jTetris.currentLayer.setRotationDeg(jTetris.current_theta);
				
				jTetris.currentLayer.setPosition(jTetris.current_x, count*jTetris.square_size);
			}, jTetris.currentLayer);

		var runTime = setCustomTimer( function(){
			// Call here any routine function
			jTetris.down.stop();
			count++;
			jTetris.down.start();

		}, jTetris.frequence, 0 );


		var gameStage = new Kinetic.Stage({
			container:	jTetris.that,
			width:		jTetris.stage_width,
			height:		jTetris.stage_height
		});
		gameStage.add(jTetris.currentLayer);

		// tetriminoes preview Zone #jTetris-info-zone
		var previewStage = new Kinetic.Stage({
			container:	jTetris.preview,
			width:		jTetris.preview_width,
			height:		jTetris.preview_height
		});

		var previewLayer = new Kinetic.Layer();
		previewStage.add(previewLayer);

		// Score Zone #jTetris-info-zone
		var scoreStage = new Kinetic.Stage({
			container:	jTetris.scoreInfo,
			width:		jTetris.score_width,
			height:		jTetris.score_height
		});

		var scoreLayer = new Kinetic.Layer();
		var score = new Kinetic.Text({
			x: scoreStage.getWidth()/6,
			y: 15,
			text:"0000",
			fontSize: 12,
			fontFamily: "Calibri",
			fill: jTetris.colors.cyan
		});

		scoreLayer.add(score);
		scoreStage.add(scoreLayer);
	}
};

function LineTetris() {
	this.squares = new Array(4);
	for(var i = 0; i < 4; ++i) {
		this.squares[i] = new Kinetic.Rect({
			x: 0 + (i*jTetris.square_size),
			y: 0,
			width:			jTetris.square_size,
			height:			jTetris.square_size,
			fill:			jTetris.colors.violet,
			stroke:			jTetris.colors.blackGrey,
			strokeWidth:	jTetris.stroke_size
		});
	}
}

// Globa utils function

/**
	* Custom "setInterval" with internal function modifying the interval
	*
	* @param callback The function to call various times
	* intervals A duration using seconds
	* index
	*
	*/
	function setCustomTimer(callback, intervals, index) {
		var internalCallback = function() {
			return function() {
				// Call our internal callback routine with different interval of time
				window.setTimeout(internalCallback, intervals);
				// We don't care of the internal routine, that's the callback we really want :)
				callback();
			}
		}(intervals, 0);

		window.setTimeout(internalCallback, intervals);
	};

jTetris.init();
