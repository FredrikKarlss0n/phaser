// initialize Phaser

var game = new Phaser.Game(500, 350, Phaser.AUTO, 'gameDiv');

// define States

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('over', overState);
game.state.add('play', playState);

//start the boot state
game.state.start('boot');