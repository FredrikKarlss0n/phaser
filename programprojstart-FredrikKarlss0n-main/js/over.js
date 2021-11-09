var overState = {


    
    create: function() {
        //todo skapa en egen menu label
        this.background = game.add.sprite(0, 0, 'mainMenu');
       var button = game.add.button(game.world.centerX, 130, 'button', this.start, this);
       button.anchor.set(0.5,0.5);
       button.scale.set(1);
        // add a start button or start text when key is pressed
        var gamename = game.add.text(game.world.centerX, 50, 'You died! Play again?', 
        { font: '30px Arial', fill: '#ffffff' } ) ;
        gamename.anchor.setTo(0.5, 0.5) ;
        
        if(game.sound.mute) {
                this.mute.frame = 1;
            }
            
    
            this.mute = game.add.button(20, 20, 'mute', this.toggleSound, this);
            this.mute.input.useHandCursor = true;
        
    },


   start: function() {
        game.state.start('play') ;

    },

    toggleSound: function() {
        game.sound.mute = ! game.sound.mute;

        this.mute.frame = game.sound.mute ? 1 : 0;
    }

} ;