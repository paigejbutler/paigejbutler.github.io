var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400, y:groundY-85},
                {type: 'sawblade',x:1000,y:groundY-85},
                {type: 'sawblade',x:2100,y:groundY-85},
                {type: 'box',x:750,y:groundY-35},
                {type: 'box',x:1600,y:groundY-35},
                {type: 'box',x:3000,y:groundY-35},
                {type: 'enemy', x:1200,y:groundY-70},
                {type: 'enemy', x:2800,y:groundY-70},
                {type: 'enemy', x:2600,y:groundY-70},
                {type: 'reward', x:350,y:groundY-65},
                {type: 'reward', x:795,y:groundY-65},
                {type: 'reward', x:1675,y:groundY-65},
            ]
        };
            
        for (var i = 0; i <= levelData.gameItems.length-1; i++) {
            var gameItem = levelData.gameItems[i];
            var type = gameItem.type;
            
            if (type === 'sawblade') {
                createSawBlade(gameItem.x, gameItem.y);
            }
            else if (type === 'box'){
                createBox(gameItem.x, gameItem.y);
            }
            else if (type === 'enemy'){
                    createEnemy(gameItem.x,gameItem.y);
            }
            if (type === 'reward'){
                    createReward(gameItem.x,gameItem.y);
            }

        }
        
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);
        
        // BEGIN EDITING YOUR CODE HERE
        
        function createSawBlade(x,y) {
            var hitZonesSize = 25;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZonesSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            
            var obstacleImage = draw.bitmap('img/sawblade.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }
        
        // createSawBlade(400, groundY -100);
        // createSawBlade(300, groundY -140);
        // createSawBlade(225, groundY -90);
            
        function createBox(x,y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 20;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            
            game.addGameItem(myObstacle);
                
            var obstacleImage = draw.bitmap('https://i.dlpng.com/static/png/1596492_thumb.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25; 
            obstacleImage.y = -30; 
            obstacleImage.scaleX = .1;
            obstacleImage.scaleY = .1;
        }
        
        function createEnemy(x,y) {
            var enemy = game.createGameItem("enemy", 30);
            enemy.x = x;
            enemy.y = y;
            enemy.velocityX = -1;
            
            var redSquare = draw.bitmap('https://i.pinimg.com/originals/67/ac/a1/67aca1dfd7bd8bf5604946f4ed2fcd38.png');
            redSquare.x = -45;
            redSquare.y = -45;
            redSquare.scaleX = .2;
            redSquare.scaleY = .2;
            enemy.addChild(redSquare);
        
        
        enemy.velocityX = -1;
        enemy.rotationalVelocity = 10;
        
        game.addGameItem(enemy);
        
        enemy.onPlayerCollision = function () {
            game.changeIntegrity(-10);
            enemy.fadeOut();
        };
        
        enemy.onProjectileCollision = function() {
            game.increaseScore(50);
            enemy.fadeOut();
        };

        }
        
    function createReward(x,y) {
            var reward = game.createGameItem("reward", 17);
            reward.x = x;
            reward.y = y;
            reward.velocityX = -1;
            
            var blueSquare = draw.bitmap('https://vignette.wikia.nocookie.net/starwars/images/3/3d/Sith-Trooper-Hot-Toys.png/revision/latest?cb=20190711002956');
            blueSquare.x = -45;
            blueSquare.y = -45;
            blueSquare.scaleX = .1;
            blueSquare.scaleY = .1;
    
            reward.addChild(blueSquare); 
    
            reward.addGameItem(reward);
            
            reward.onPlayerCollision = function () {
                game.changeIntegrity(25);
                reward.fadeOut();
            };
    }
};      

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
}; 