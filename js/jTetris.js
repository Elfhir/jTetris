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

	stage_width				:	300,
	stage_height			:	300,
	score_height			:	200,
	score_width				:	100,
	preview_height			:	100,
	preview_width			:	100,
	square_size				:	10,
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

	// Methods
	
	init : function() {
		// Put your initialization code here
		jTetris.setup();
		jTetris.keyboardListener();
		
		jTetris.setupKinetic();
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
		jTetris.scoreInfo = document.getElementById("jTetris-score-info");
		jTetris.preview = document.getElementById("jTetris-tetriminoes-info");
	},

	setupKinetic : function() {
		// Game Zone #jTetris
		var gameStage = new Kinetic.Stage({
			container: 	jTetris.that,
			width: 		jTetris.stage_width,
			height: 	jTetris.stage_height
		});

		// tetriminoes preview Zone #jTetris-info-zone
		var previewStage = new Kinetic.Stage({
			container:	jTetris.preview,
			width:		jTetris.preview_width,
			height:		jTetris.preview_height
		});

		// Score Zone #jTetris-info-zone
		var scoreStage = new Kinetic.Stage({
			container:	jTetris.scoreInfo,
			width:		jTetris.score_width,
			height:		jTetris.score_height
		});

		var gameLayer = new Kinetic.Layer();
		var scoreLayer = new Kinetic.Layer();
		var previewLayer = new Kinetic.Layer();

		var rect = new Kinetic.Rect({
			x: 0,
			y: 0,
			width:			jTetris.square_size,
			height:			jTetris.square_size,
			fill:			jTetris.colors.violet,
			stroke:			jTetris.colors.blackGrey,
			strokeWidth:	jTetris.stroke_size
		});

		var score = new Kinetic.Text({
			x: scoreStage.getWidth()/6,
  			y: 15,
			text:"0000",
			fontSize: 12,
			fontFamily: 'Calibri',
			fill: jTetris.colors.cyan
		});

		scoreLayer.add(score);
		gameLayer.add(rect);
		
		gameStage.add(gameLayer);
		scoreStage.add(scoreLayer);
		previewStage.add(previewLayer);

	}

};

jTetris.init();