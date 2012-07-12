/**
* @name     Demo Codes - demo.js - 2633AD.js
* @project  NESCode
* @author <codes>      mediaHACK - http://mediahack.com
* @date         2011.01.24
* @version      11.01.24
*
* @licence  New BSD License.
* @licence  Creative-Commons BY
* 
* Some sample cheats. The file live on the web is called 2633 A.D. because thats
* the date the original Japanese version of Contra for NES takes place.
*
**/
function MyCheats(){ 			
	
    var debug = true;
    var scriptHost = "http://code.mediahack.com/apps/NESCode/"; 

    var audioEmbed = function( aUrl, callback, settings )
	{
            var obj = this;
            var settings = settings || {};
            var id = settings.id || "cheatAudio";
            var audio = document.getElementById( id ) || document.createElement("embed");								
            
		    audio.id = id; 
		    audio.src = aUrl; 
		    audio.autostart = settings.autostart || false; 
		    audio.hidden = settings.hidden || true; 
		    audio.loop = settings.loop || false;
		    audio.onload = ( callback != undefined )  ? callback() : function(){};
			
            document.getElementsByTagName("body")[0].appendChild( audio );		

            obj[ id ] = document.getElementById(id);
           
	};

    this.brand = function()
    {
      var div = document.createElement("div");
      div.innerHTML = "NESCode. Get yours @ mh";
      document.getElementsByTagName("body")[0].appendChild(div);
    };


	this.doRandomShit = function()
	{
		console.log("lololol");	
	};
		
	this.turtlePower = function()
	{
		// Music provided by http://8bc.org/music/Klopfenpop/T.U.R.T.L.E.+Power+%28feat.+Random%29/
		var audioUrl = scriptHost + "audio/Turtle_Power_rough.mp3";
		audioEmbed( audioUrl );
         _gaq.push(['_trackEvent', 'NES Code', 'Turtle Power', window.location.href]);
				
	};
		
	this.moldova = function(){
        
	    var cheats = this;
        var resources = [
            {id: "saxguy", type: "img", src: "img/esg.png"},
            {id: "trackMoldova", type: "audio", src: scriptHost+"audio/Epic_Sax_Guy_NES_Remix.mp3"}
        ];
       
		var showGuy = function(){
			var h1 = document.getElementsByTagName("h1")[0].childNodes[0];
			//h1.style.backgroundImage = "url(" + scriptHost + "img/esg.gif)";			
		};

		// Music provided by http://8bc.org/music/Klopfenpop/T.U.R.T.L.E.+Power+%28feat.+Random%29/
		var audioUrl = scriptHost + "audio/Epic_Sax_Guy_NES_Remix.mp3";
		audioEmbed( audioUrl,  showGuy, {id: "epicSaxGuy", autostart: true, loop: true} );
        
        // Call the branding
        setTimeout( function(){ cheats.brand(); }, 1500);
		
         _gaq.push(['_trackEvent', 'NES Code', 'Moldova Epic Sax Guy', window.location.href]);

	};
	
	/**
	* 
	**/
	this.rockYourFace = function()
	{
		
		this.start = function()
		{	
            if( debug ) console.log("Start this cheat");

			if( debug) console.log( "Is cheat already running? " + hax["contra"].running );
			
            // if its already running then return
			if( hax["contra"].running ){
				console.log("BLAM sorry already running!");
				return;
			}
			
			hax["contra"].running = true;			
			

            document.getElementsByTagName("h1")[0].childNodes[0].style.backgroundImage = "none";

			theScreen = document.createElement( "div" );
			theScreen.id = "contraAction";
			
			// add to the 
			var h1 = document.getElementsByTagName("h1")[0]; //.appendChild(theScreen);
			h1.parentNode.appendChild(theScreen);
			articleToAttack = document.getElementsByTagName("article")[0];
			//console.log( articleToAttack.offsetLeft );		
			
			this.advanceTimeline();			

		};
		
				
		
		this.createFloatingPlatforms = function()
		{							
			var platforms = [ 
				{ id: "A", position: {x: 40, y: 110} },
				{ id: "B", position: {x: 80, y: 80} }
			];			
			
			this.floatingPlatform( platforms[ platformIndex ] );			
		};
		
		this.floatingPlatform = function( o ){
			if( debug ) console.log( "Building platform " + o.id ); 	
			
			var movie = this;
			var sprite = this.createSprite({ 
				position: o.position, 
				id: ("platform" + platformIndex ), 
				width: 36,
				height: 36,
				framePosition: { x: 0, y: 100 }				
			});		
			
			this[ "platform" + platformIndex ] = document.getElementById( sprite.id );
			
			platformIndex++;
			
			theScreen.appendChild( sprite );	
			
			sprite.interval = setInterval( function(){ 							
				if( sprite.opacityCounter > 1 ){ 
					clearInterval( sprite.interval ); 
					sprite.animationComplete = true; 
					movie.advanceTimeline();
				}
				sprite.opacityCounter += sprite.increment
				sprite.style.opacity =  sprite.opacityCounter;
			}, sprite.speed );			
			
		};
		
        this.buffstuff = function( sprite )
        {
            //backBuffer.style.backgroundImage = sprite.style.backgroundImage;
            //backBuffer.style.backgroundPosition = this.calcBackgroundPositions( sprite );
            sprite.style.backgroundPosition = this.calcBackgroundPositions( sprite );	
        };

		this.flipIn = function()
		{
			if( debug ) console.log( "flipping in from left" );
			var movie = this;
			player1 = this.createSprite({ 	
				id: "player1",
				position: { x: 17, y: 65 },				
				speed: 20,
				increment: 1,
				frames: 4,
				frameSpeed: 50,
				framePosition: { x: -2, y: 76 },								
				width: 24,
				height: 24,
				style: { 					
					opacity: 1 
				} 
			});
			
			var sprite = player1;
			
			//theScreen.appendChild( sprite );
			
			// Handle to the first platform
			flip0 = document.getElementById( sprite.id );
			platform0 = document.getElementById( "platform0" );
						
			var destination = { x: platform0.position.x, y: platform0.position.y };
			
			// start flip animation
			sprite.animationInterval = setInterval( function(){
				movie.buffstuff( sprite );			
			}, sprite.frameSpeed );
			
			// Animate him landing on the first block
			sprite.interval = setInterval( function(){ 	
				var x = sprite.position.x;
				var newX =  destination.x + 7 ;
				
				if( x <= newX ){ 
					sprite.position.x += sprite.increment;
					sprite.style.left = sprite.position.x + "px";
				}
				
				var y = sprite.position.y;
				var newY = destination.y - sprite.height;
				
				if( y <= newY ){ 					
					sprite.position.y += sprite.increment;
					sprite.style.top = sprite.position.y + "px";
				}
				
				if( x >= newX && y >= newY )
				{
					// SET standing animation
					sprite.style.height = "36px";
					sprite.style.backgroundPosition = "0 -37px";					
					
					// clear the animation interval
					clearInterval( sprite.animationInterval );
					
					// Clear this interval 
					clearInterval( sprite.interval );
					
					// call next function
					movie.advanceTimeline();
				}
				
			}, sprite.speed );		
			
		};
		
		this.flipToB = function()
		{
			if( debug ) console.log( "flipping in from platform A to B" );
			
			var movie = this;
			player1 = this.createSprite({ 
				id: "player1",
				position: { x: flip0.position.x, y: flip0.position.y },				
				speed: 20,
				increment: 1,
				frames: 4,
				frameSpeed: 50,
				framePosition: { x: -2, y: 76 },								
				width: 24,
				height: 24,
				style: { 					
					opacity: 1,
					height: "24px"
				} 
			});
			
			// alias to our player1 sprite node
			var sprite = player1;
			
			// Handle to the first platform
			flip1 = document.getElementById( sprite.id );
			platform1 = document.getElementById( "platform1" );
						
			var destination = { x: platform1.offsetLeft, y: platform1.offsetTop };
			
			sprite.position.x = flip0.position.x;
			sprite.position.y = flip0.position.y;
						
			// start flip animation
			sprite.animationInterval = setInterval( function(){
				sprite.style.backgroundPosition = movie.calcBackgroundPositions( sprite );				
			}, sprite.frameSpeed );
						
			// Animate him landing on the first block
			sprite.interval = setInterval( function(){ 	
				
				var newX =  destination.x + 7 ;
				
				if( sprite.position.x <= newX ){ 
					sprite.position.x += sprite.increment;
					sprite.style.left = sprite.position.x + "px";
				}
				
				var newY = destination.y - sprite.height;
				
				if( sprite.position.y >= newY ){ 					
					sprite.position.y -= sprite.increment;
					sprite.style.top = sprite.position.y + "px";
				}
				
				
				if( sprite.position.x >= newX && sprite.position.y <= newY )
				{
					// SET standing animation
					sprite.style.height = "36px";
					sprite.style.backgroundPosition = "0 -37px";					
					
					// clear the animation interval
					clearInterval( sprite.animationInterval );
					
					// Clear this interval 
					clearInterval( sprite.interval );
					
					// call next function
					movie.advanceTimeline();
				}
				
			}, sprite.speed );		
			
		};
		
        this.turnLeft = function()
        {
            if( debug ) console.log( "turning left" );
			var movie = this;
			player1 = this.createSprite({ 	
				id: "player1",
				position: { x: flip1.position.x, y: flip1.position.y },				
				speed: 500,
				increment: 1,
				frames: 4,
				frameSpeed: 50,
				framePosition: { x: 0, y: -37 },								
				width: 24,
				height: 24,
				style: { 					
					opacity: 1 
				} 
			});
			
			var sprite = player1;
            
            var toTheLeft = function( s ){
                sprite.style.height = "36px";
                sprite.style.backgroundPosition = "-58px -36px";
            };
            /*
            sprite.interval = setInterval( 
                function(){
                    sprite.style.backgroundPosition = " -54px 36px";

                        sprite.interval2 = setInterval( 
                            function(){
                                sprite.style.backgroundPosition = flip1.framePosition.x + "px " + flip1.framePosition.y + "px";

                                // Clear this interval 
					            clearInterval( sprite.interval );
                                clearInterval( sprite.interval2 );
					
					            // call next function
					            movie.advanceTimeline();


                            }, sprite.speed
                        );

                }, sprite.speed
            );
            */
        };

        this.turnRight = function(){
        
        };

		this.flipToGb = function()
		{
			if( debug ) console.log( "flipping in from platform B to top of Gameboy" );
			
			var movie = this;
			player1 = this.createSprite({ 
				id: "player1",
				position: { x: flip1.position.x, y: flip1.position.y },
				speed: 10,
				increment: 1,
				frames: 4,
				frameSpeed: 50,
				framePosition: { x: -2, y: 76 },								
				width: 24,
				height: 24,
				style: { 					
					opacity: 1,
					height: "24px"
				} 
			});
			
			// alias to our player1 sprite node
			var sprite = player1;
			
			//theScreen.appendChild( sprite );
			
			// Handle to the first platform		
			flip2 = document.getElementById( sprite.id );
			platform1 = document.getElementById( "platform1" );
						
			var destination = { x: flip1.position.x, y: 9 };
			
			sprite.position.x = flip1.position.x;
			sprite.position.y = flip1.position.y;
						
			// start flip animation
			sprite.animationInterval = setInterval( function(){
				sprite.style.backgroundPosition = movie.calcBackgroundPositions( sprite );				
			}, sprite.frameSpeed );
						
			// Animate him landing on the first block
			sprite.interval = setInterval( function(){ 	
				
				var newX =  destination.x;
				var newY = destination.y;
				
				if( sprite.position.y >= newY ){ 					
					sprite.position.y -= sprite.increment;
					sprite.style.top = sprite.position.y + "px";
				}
				
				
				if( sprite.position.y <= newY )
				{
					// SET standing animation
					sprite.style.height = "36px";
					sprite.style.backgroundPosition = "0 -37px";					
					
					// clear the animation interval
					clearInterval( sprite.animationInterval );
					
					// Clear this interval 
					clearInterval( sprite.interval );
					
					// call next function
					movie.advanceTimeline();
				}
				
			}, sprite.speed );		
			
		};
		
		this.aimAndShoot = function()
		{
			if( debug ) console.log( "shooting from top of Gameboy" );
			
			var movie = this;
			var x = player1.position.x;
			var y = player1.position.y;
			
			player1 = this.createSprite({ 
				id: "player1",	
				position: { x: x, y: y }, 
				speed: 1700,
				increment: 1,
				frames: 1,
				frameSpeed: 50,
				framePosition: { x: -74, y: 36 },								
				width: 24,
				height: 36,
				style: { 					
					opacity: 1
				} 
			});
			
			// alias to our player1 sprite node
			var sprite = player1;			
									
			// Animate him landing on the first block
			sprite.interval = setTimeout( function(){ 					
				
				// SET standing animation				
				sprite.style.backgroundPosition = "0 -37px";					
					
				// call next function
		 		movie.advanceTimeline();			
				
			}, sprite.speed );		
			
			this.firegun( player1, 3);
			
		};
		
		/**
		*
		**/
		this.firegun = function( player, num )		
		{
            if( debug ) console.log("Firing Gun");
			
            var movie = this;
            var bulletCount = 0;
			var bullets = [];
			var articles = document.getElementsByTagName("article")[0];			
			var destination = { x: articles.offsetLeft, y: 0 };
			var x = player1.position.x + 18;
			var y = player1.position.y + 20;
			
			for( var i = 0; i < num; i++ )
			{				
				bullets[ i ] = movie.createSprite({ 
					id: "bullet" + i,
					position: { x: x, y: y },
					speed: 10,
					increment: 1,				
					framePosition: { x: -10, y: 202 },								
					width: 6,
					height: 6,
					style: { 					
						opacity: 1					
					} 
				});				
				
			}

            movie.advanceTimeline();

		}; // this.firegun = function( num ) 
		
        this.win = function(){
            
           if( debug ) console.log("win!");
           //this.audioEmbed( trackWin.path );
           
           // This tells us that once we reload the src play autmatically
           this.trackWin.setAttribute("autostart", "true"); 
           // We reset the src to itself and BLAMO! the music is already downloaded so we get instant play
           this.trackWin.setAttribute("src", (this.trackWin.src + "?t=" + new Date().getTime()) ) ;

           this.advanceTimeline();
           
        };

        this.tracker = function(){
            //_trackEvent("NES Code", "Konami", "page", window.location.href);    
            _gaq.push(['_trackEvent', 'NES Code', 'Konami', window.location.href]);
        };
       
        this.advanceTimeline = function()
		{
			if( playhead < timeline.length )
			{
				var current = timeline[ playhead ];
				var timer = current.delay || 0;
				
				if( current.action != null && current.action != undefined )
				{					
					var func = timeline[ playhead++ ].action;
					var obj = this;
					
					if( typeof obj[func] == "function" )
						timeout = setTimeout( function(){ obj[func](); }, timer ); 
				}
			}
		};

		this.calcBackgroundPositions = function( mySprite )
		{
			
			var pos = "";
			var currentFrame = ( mySprite.frameIndex != undefined ) ? mySprite.frameIndex : 0;
			
			if( currentFrame >= mySprite.frames - 1 ) currentFrame = 0;
			
			if( mySprite.framePosition != undefined ){
				var x = mySprite.framePosition.x + ( mySprite.width * currentFrame ) * -1;
				pos = x + "px " + ( mySprite.framePosition.y * -1 ) + "px";				 
			}
			else{		
                pos = "0 0";
			}

		    //mySprite.frameIndex++;
			if( mySprite.frameIndex++ >= mySprite.frames - 1 ) mySprite.frameIndex = 0;			
			
			return pos;
		};
		
		this.createSprite = function( mySprite )
		{	
            if( debug ) console.info("creating sprite");

			spriteCounter++;	
			var spriteId = mySprite.id || "sprite" + spriteCounter;			
			var sprite = null;
			
			if( document.getElementById( spriteId ) != null )
				sprite = document.getElementById( spriteId )
			else
			{
				sprite = document.createElement("div");
				theScreen.appendChild( sprite );				
			}
			
			sprite.id = spriteId;
			sprite.fade = mySprite.fade || 0;
			sprite.interval = mySprite.interval || null;
			sprite.speed = mySprite.speed || 100;
			sprite.increment = mySprite.increment || .1;
			sprite.position = mySprite.position || { x: 0, y: 0 };
			sprite.width = mySprite.width || 36; // resizing, this image is actually 36px
			sprite.height = mySprite.height || 36; // resizing
			sprite.frames = mySprite.frames || 1;
			sprite.frameIndex = mySprite.frameIndex || 0;
			sprite.frameSpeed = mySprite.frameSpeed || 250;
			sprite.framePosition = mySprite.framePosition || {x: 0, y: 0};
			sprite.mapdata = mySprite.mapData || { x: 0, y: 0 };
			sprite.animationInterval = mySprite.animationInterval || null;
			sprite.opacityCounter = mySprite.opacityCounter || 0;
			
			if( mySprite.style == undefined )
                mySprite.style = { position: "absolute" };
			
			sprite.style.position = mySprite.style.position || "absolute";
			sprite.style.top = mySprite.style.top || sprite.position.y + "px"; 
			sprite.style.left = mySprite.style.left ||  sprite.position.x + "px";
			sprite.style.width = mySprite.style.width || sprite.width + "px";
			sprite.style.height = mySprite.style.height || sprite.height + "px";
			sprite.style.opacity = mySprite.style.opacity || 0;
			sprite.style.backgroundImage = mySprite.style.backgroundImage || "url(" + spritePath + ")";						
			sprite.style.textIndent = mySprite.style.textIndent || "-9000px";
			sprite.style.overflow = mySprite.style.overflow || "hidden";
			sprite.style.backgroundRepeat = "none";
			
			sprite.style.backgroundPosition = this.calcBackgroundPositions( mySprite );
						
			sprite.animationComplete = mySprite.animationComplete || false;		
			
			return sprite;
			
		};

        this.audioEmbed = function( aUrl, callback, settings )
	    {
            var movie = this;
            var settings = settings || {};
            var id = settings.id || "cheatAudio";
            var audio = document.getElementById( id ) || document.createElement("embed");								
            
		    audio.id = id; 
            audio.setAttribute("type","audio/mpeg");
  		    audio.setAttribute("autostart", ( settings.autostart || "false" ) ); 
		    audio.setAttribute("hidden", ( settings.hidden || "true") ); 
		    audio.setAttribute("loop", ( settings.loop || "false") );
		    audio.onload = ( callback != undefined )  ? callback() : function(){};
            audio.src = aUrl; 
			
            document.getElementsByTagName("body")[0].appendChild( audio );		
           
            movie[ id ] = document.getElementById(id);

	    };
        
        this.loader = function()
        {
            var movie = this;
            
            // Set loading animation
                       
            if( loadIndex < resources.length ){
                
                if( debug ) console.log("loading resources #" + loadIndex); 

                var id = resources[loadIndex].id;
                var src = resources[loadIndex].src;
                var type = resources[loadIndex].type;
                
                loadIndex++;
                    
                if( type == "img" ){
                    movie[ id ] = new Image();
                    movie[ id ].src = src;
                    movie[ id ].onload = function(){ movie.loader(); };
                }
                else if( type == "audio" ){
                    movie.audioEmbed( src, function(){ movie.loader(); }, {id: id} );
                    // next loader call is handeled by the second param in the audioEmbed command above.
                }
                else{
                    if( debug ) console.log("we don't handle this type of resource. moving on.");
                    movie.loader();
                }
               
            }
            else{
                if( debug ) console.log("all done, should stop loading animation now and start the awesome");
                movie.start();
            }

            return 0;
            
        };
	     
		var debug = true;
		var platformIndex = 0;
		var playhead = 0;
		var running; // = false;  // the new obj
		var timeout = null;
		var timeline = [ 
			{ action: "createFloatingPlatforms", delay: 0 },
			{ action: "createFloatingPlatforms", delay: 250 },
			{ action: "flipIn", delay: 400},
			{ action: "flipToB", delay: 250},
			//{ action: "flipToGb", delay: 250},
            //{ action: "turnLeft", delay: 100 },
			//{ action: "aimAndShoot", delay: 250},
			//{ action: "explode", delay: 0},
			{ action: "win", delay: 250},
            { action: "tracker", delay: 0},
			{ action: "turnRight", delay: 100},
			{ action: "flipToGb", delay: 100}
		];
		
		var theScreen;		
		var articleToAttack;
				
		var platform0; // reference to the 1st platform
		var platform1; // reference to the 2nd platform 
		var flip0; // reference to first flip into the screen
		var player1;
		var backBuffer = document.createElement("div");

		var spriteCounter = 0;
		var spritePath = scriptHost + "img/contra_gb.gif";
		
        var trackWin = { src: "http://nescode.googlecode.com/files/Contra_G_Probotector_StageComplete.mp3" };

        var resources = [ 
            { id: "spritemap", type: "img", src: spritePath },
            { id: "trackWin", type: "audio", src: trackWin.src } 
        ];
        
        var loadIndex = 0;

        this.loader();

	}; // this.rockYourFace = function()
		
}; // function MyCheats()

var hax = { 
	"cowabunga": { code: [38,39,39,40,40,40,37,37,37,37,66,65,13], callback: function(){ new MyCheats().turtlePower(); } },				
	"contra": { callback: function(){ new MyCheats().rockYourFace(); }, running: false },
	"moldova": { code: [37,39,37,39,38,38,40,40,65,65,66,66,13], callback: function(){ new MyCheats().moldova(); }, running: false }
};

nes = new NESCode( { "customCheats": hax } );


