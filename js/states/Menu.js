Menu = function(game){}

Menu.prototype = {
	create:function(){
        //set background image
        this.background = this.game.add.sprite(0, 0, 'bgWelcome');
        
        //setup Title
        this.gameTitle = this.game.add.sprite(0, 0, 'welcome_title');
        this.gameTitle.anchor.setTo(0.5);
        this.gameTitle.x = this.game.world.centerX;
        this.gameTitle.y = this.gameTitle.height/2;
     
        //setup Hero
        this.hero = this.game.add.sprite(0, 0, 'welcome_hero');
        this.hero.anchor.setTo(0.5);
		this.hero.x = this.game.world.centerX;
        this.hero.y = this.game.world.centerY;

        //setup Buttons
        this.startGameButton = this.game.add.sprite(0, 0, 'welcome_playButton');
        this.aboutGameButton = this.game.add.sprite(0, 0, 'welcome_aboutButton');
        this.startGameButton.anchor.setTo(0.5);
        this.aboutGameButton.anchor.setTo(0.5);
        this.startGameButton.y = this.hero.y + this.hero.height/2 + 30;
        this.startGameButton.x = this.game.world.centerX;
        this.aboutGameButton.y = this.startGameButton.y + this.startGameButton.height;
        this.aboutGameButton.x = this.game.world.centerX;

        //
        this.startGameButton.inputEnabled = true;
        this.startGameButton.events.onInputDown.add(this.startGame, this);
    },
    startGame() {
        this.state.start("Game");
    }
}