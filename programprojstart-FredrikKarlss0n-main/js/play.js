var globalScore;
var enemyRespawnScore;
var playState = {


    create: function() {
        
        this.deathSound = game.add.audio('deathSound')

        this.jumpSound = game.add.audio('jumpSound')

        this.coinSound = game.add.audio('coinSound')

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.enableBody = true;
        this.background = game.add.sprite(0, 0, 'background');
        
        console.log("Spelet har startat");

        this.game.globalScore = 0;
        this.game.enemyRespawnScore = 0;

        this.scoreLabel = game.add.text(30, 30, 'Score: 0', {font: '16px Arial', fill:'#ffffff'});
        

      
        this.createWorld();


        this.player = game.add.sprite(120, 30, 'player');
        


        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 600;
        this.cursor = game.input.keyboard.createCursorKeys();

        this.player.animations.add('right', [0, 1], 5, true);
        this.player.animations.add('left', [2, 3], 5, true); 
        this.player.animations.add('jumpR', [4]);
        this.player.animations.add('jumpL', [5]);
        this.player.animations.add('jump', [6]); 
        this.player.animations.add('stand', [7]) 

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(1000, 'enemy');

        
        this.coin = game.add.sprite(150, 200, 'coin');
        this.coin.anchor.setTo(0.5,0.5);

        this.coin.animations.add('spin', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 8, true);

    },



    update: function() {
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.collide(this.player, this.layer);
        game.physics.arcade.collide(this.enemies, this.layer);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
        game.physics.arcade.collide(this.enemies, this.walls);



        this.movePlayer();

        if(this.game.globalScore > this.game.enemyRespawnScore){
            this.addEnemy();
            this.addEnemy();

            this.game.enemyRespawnScore +=10;
        }


        if(!this.player.inWorld) {
            this.playerDie();
            
        }


    },



    playerDie: function(){
        this.player.kill();
        this.deathSound.play();
        this.deathSound.volume = 0.3;
        this.game.time.events.add(1500, this.startMenu, this)
    },

    startMenu: function(){
        this.game.state.start('over');
    },

    addEnemy:function(){
        var enemy = this.enemies.getFirstDead();
        if(!enemy){
            return;
        };

        enemy.animations.add('move', [0, 1, 2, 3, 4], 10, true);
        enemy.animations.play('move');

        enemy.anchor.setTo(0.5,1);
        enemy.reset(game.world.centerX, 30);
        enemy.body.gravity.y = 500;
        enemy.body.bounce.x = 1;
        enemy.body.velocity.x = 100 * game.rnd.integerInRange(-3, -1), (1, 3);
        enemy.checkWorldBounce = true;
        enemy.outOfBoundsKill = true;


      
    },



    createWorld: function(){
        this.map = game.add.tilemap('map');
        this.tiles = this.map.addTilesetImage('tiles', 'tiles');
        this.layer = this.map.createLayer('Tile Layer 1');
        this.layer.resizeWorld();
        this.map.setCollisionBetween(1,16);

    }, 



    movePlayer: function(){

            if (this.cursor.left.isDown)
            {
                this.player.animations.play('left');
                this.player.body.velocity.x = -180;
            }
            else if (this.cursor.right.isDown)
            {
                this.player.animations.play('right');
                this.player.body.velocity.x = 180;
            }
            else 
            {
                this.player.animations.play('stand');
                this.player.body.velocity.x = 0;
            } 

            if(this.cursor.up.isDown && this.player.body.onFloor()) 
            {
                this.player.body.velocity.y = -450;
                this.jumpSound.play();
                this.jumpSound.volume = 0.0;

            }   
            
            if(!this.player.body.touching.down) 
            {
                this.player.animations.play('jump');
            }   

            if(!this.player.body.touching.down && this.cursor.right.isDown) 
            {
                this.player.animations.play('jumpR');
            }   

            if(!this.player.body.touching.down && this.cursor.left.isDown) 
            {
                this.player.animations.play('jumpL');
            }   


    },



    updateCoinPosition: function()
        
        {var coinPosition = [
            {x:140, y: 100}, {x: 360, y:60}, {x:60, y:140}, {x:30, y:30},  
            {x:450, y:30},  {x:50, y:300},  {x:270, y:200},  {x:450, y:300},
            {x:250, y:100},  {x:230, y:230},  {x:450, y:200}
        ];

            for(var i = 0; i < this.updateCoinPosition.length; i++);
            {
                if(coinPosition[i].x === this.coin.x){
                    coinPosition.splice(i, 1);
                }
            }

        var newPosition = coinPosition[game.rnd.integerInRange(0, coinPosition.length -1)];
        this.coin.reset(newPosition.x, newPosition.y);
        this.coin.animations.play('spin');

    },


    takeCoin: function(player, coin)
    {
        this.coin.kill();
        game.globalScore +=10;
        this.scoreLabel.text = 'Score: ' + game.globalScore;
        
        this.coinSound.play();

        this.coinSound.volume = 0.15;

        this.updateCoinPosition();

    
    }



} ;