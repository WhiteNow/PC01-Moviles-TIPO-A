Preload = function(game){}

Preload.prototype = {
	preload : function(){
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
		this.load.image("bgLayer1","assets/images/bgLayer1.png");
		this.load.image("bgWelcome","assets/images/bgWelcome.jpg");
		this.load.image("loading-bar","assets/images/loading-bar.png");
		this.load.spritesheet("candy","assets/images/candy.png", 81, 97);
		this.load.image("gameover","assets/images/gameover.png");
		this.load.image("welcome_aboutButton","assets/images/welcome_aboutButton.png");
		this.load.image("welcome_hero","assets/images/welcome_hero.png");
		this.load.spritesheet("hero","assets/images/hero.png",156,76);    
		this.load.image("welcome_playButton","assets/images/welcome_playButton.png");
		this.load.image("welcome_title","assets/images/welcome_title.png");
	},
	create:function(){
		this.state.start("Menu");
	}
}