var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        if(!app) {
            throw new Error("Invaid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }

        // container which will be returned
        var background;
        
        // ANIMATION VARIABLES HERE:
        
        
        // add objects for display inb ackground
        // called at the start of game and whenever the page is resized
        function render() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            background.removeAllChildren();

            // this fills the background with a obnoxious yellow
            // you should modify this to suit your game
            
            var backgroundFill = draw.rect(canvasWidth, groundY,'beige');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            
            var moon = draw.bitmap('img/moon.png');
            background.addChild(moon);
            
            // var sun = draw.bitmap('data:image/png;base64,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');
            // background.addChild(sun);
            
            // TODO: 5 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            
            
            // TODO 4: Part 1 - Add a tree
            
        }
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            // TODO 4: Part 2 - Move the tree!
            
            
            // TODO 5: Part 2 - Parallax
            

        }

        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        app.addResizeable(background);
        app.addUpdateable(background);
        
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
