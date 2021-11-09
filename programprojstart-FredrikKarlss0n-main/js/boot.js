var tiles;

var bootState = {


    preload: function() {

        //load a progressBar in here
        game.load.image('progressBar', 'assets/images/progressBar.png');
        
    },

    create: function () {

        //here we start the physics in the game
        //set backgroundColor in the game
        game.stage.backgroundColor = "#3498db";
        game.physics.startSystem(Phaser.Physics.ARCADE) ;

        game.state.start('load');

    },



} ;