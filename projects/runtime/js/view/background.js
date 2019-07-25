
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
        var tree; 
        var buildings; 
        
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
            
            var backgroundFill = draw.rect(canvasWidth, groundY,'lightblack');
            background.addChild(backgroundFill);
            
            // TODO: 3 - Add a moon and starfield
            
            // var moon = draw.bitmap('https://sta.laits.utexas.edu/wp-content/uploads/2016/04/credits-background.png');
            // background.addChild(moon);
            
            var circle;
                for(var i=0;i<100;i++) {
                    circle = draw.circle(8,'white','LightGray',2);
                    circle.x = canvasWidth*Math.random();
                    circle.y = groundY*Math.random();
                    background.addChild(circle);
            
            var moon = draw.bitmap('img/moon.png');
            background.addChild(moon);
            moon.x = 1000;
            moon.y = 10;
            moon.scaleX = .5;
            moon.scaleY = .5;
            
            }
            
            // TODO: 5 - Add buildings!    Q: This is before TODO 4 for a reason! Why?
            
            var buildingHeight = 300;
            var building;
            buildings = [];
            var buildingColors = ["red", "lightgray", "purple", "yellow", "lightblue"]
            var buildingHeightDiff = [170, 150, 180, 160, 155]
            
            for(var i=0; i<5; ++i) {
                building = draw.rect(75,buildingHeightDiff[i],buildingColors[i],'Black',1);
                building.x = 150*i;
                building.y = groundY-buildingHeightDiff[i];
                background.addChild(building);
                buildings.push(building);
            }
            
            // TODO 4: Part 1 - Add a tree
            
            tree = draw.bitmap('https://cryptospacex.com/episode1/gamedoc/images/imperial-walker.png');
            tree.x = 400;
            tree.y = 75;
            background.addChild(tree);
        } 
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;

            // TODO 4: Part 2 - Move the tree!
            
            tree.x = tree.x - 1.5;
            if(tree.x < -200) {
                tree.x = canvasWidth;
            }

            // TODO 5: Part 2 - Parallax
            
            for (var i = 0; i < buildings.length; i++) {
                var building = buildings[i];
                building.x=building.x - .5;
                if (building.x < -200) {
                    building.x = canvasWidth;
                }
            }
            
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
