var loadState = {

    preload: function() {

        //here comes the main graphics in

        game.load.image('button', 'assets/images/play.png');

        var loadingLabel = game.add.text(game.world.centerX, 150, 'Loading game assets', 
        { font: '30px Arial', fill: '#ffffff' } ) ;
        loadingLabel.anchor.setTo(0.5, 0.5) ;

        var progressBar = game.add.sprite(game.world.centerX, 200, 'progressBar');
        progressBar.anchor.setTo(0.5, 0.5);
        game.load.setPreloadSprite(progressBar, 0);


        game.load.image('mainMenu', 'assets/images/mainMenu.png');
        game.load.image('background', 'assets/images/background.png');
        game.load.spritesheet('coin', 'assets/images/coin.png', 16, 16);
        game.load.spritesheet('enemy', 'assets/images/enemy.png', 20, 20);
        game.load.image('pixel', 'assets/images/pixel.png');
        game.load.spritesheet('player', 'assets/images/player.png', 32, 32);
        game.load.image('WallH', 'assets/images/WallHorizontal.png');
        game.load.image('WallV', 'assets/images/WallVertical.png');

        game.load.audio('backgroundMusic', 'assets/audio/backgroundMusic.ogg');
        game.load.audio('backgroundMusic', 'assets/audio/backgroundMusic.mp3');

        game.load.audio('coinSound', 'assets/audio/coin.ogg');
        game.load.audio('jumpSound', 'assets/audio/jump.ogg');
        game.load.audio('deathSound', 'assets/audio/death.ogg');

        game.load.spritesheet('mute', 'assets/images/mute.png', 20, 20);

        game.load.image('tiles', 'assets/images/tiles.png');
        game.load.tilemap('map', 'assets/images/map.json', null, Phaser.Tilemap.TILED_JSON);

    },

    create: function() {
        
        game.state.start('menu') ;

    }

} ;