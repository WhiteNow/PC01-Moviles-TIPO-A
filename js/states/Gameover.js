Gameover = function(game){}

Gameover.prototype = {
	create:function(){
		//set background image
        this.background = this.game.add.sprite(0, 0, 'bgWelcome');
        this.startGameButton = this.game.add.sprite(0, 0, 'welcome_playButton');
        this.startGameButton.anchor.setTo(0.5);
        this.startGameButton.y = this.game.world.centerY;
        this.startGameButton.x = this.game.world.centerX;
        this.startGameButton.inputEnabled = true;
        this.startGameButton.events.onInputDown.add(this.startGame, this);
    },
    startGame() {
        this.state.start("Game");
    }
}