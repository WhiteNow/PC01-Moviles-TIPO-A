Game = function(game){}

Game.prototype = {
	create:function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);

		//set background image
		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height,'bgLayer1');
		this.background.autoScroll(-100, 0);

		//setup Hero
		this.hero = this.game.add.sprite(0, 0, 'hero');
		this.hero.anchor.setTo(0.5);
		this.hero.x = this.game.world.centerX;
		this.hero.y = this.game.world.centerY;
		this.hero.animations.add("fly", [0,1,2,3,4,5,6,7,8,9,10], 20, true);
		this.hero.animations.play('fly');
		this.game.physics.arcade.enable(this.hero);
		this.keys = this.input.keyboard.createCursorKeys();
		this.heroActions = {down: false, up: false};
		this.candies = this.game.add.group();
		this.spawnCandy = 0;
		this.lifes = 4

	},
	update: function() {
		this.spawnCandy += this.game.time.elapsed;
		if (this.spawnCandy > 4000) {
			this.spawnCandy = 0;
			this.createCandy();
		}

		this.candies.forEach(function(candy) {
			if(candy.x < 0) {
				candy.kill()
			}
		},this);

		if(this.keys.up.isDown){
            if (this.hero.y - this.hero.height/2 > 0) {
				this.hero.y -= 10;
			} 
        }else if(this.keys.down.isDown){
            if (this.hero.y + this.hero.height/2 < this.game.height) {
				this.hero.y += 10;
			} 
		} 
		this.physics.arcade.overlap(this.hero, this.candies, null, this.checkCollision, this);
		if (this.lifes == 0) {
			this.state.start("Gameover");
		}
	},
	createCandy() {
		let candyY = this.game.rnd.integerInRange(0, this.game.height);
		this.generateCandy(candyY);
	},
	generateCandy: function(candyY) {
		let type = this.game.rnd.integerInRange(0, 4);
		let candy = this.candies.getFirstDead();
		if (candy) {
			candy.reset(this.game.width, candyY);
		} else {
			candy = this.game.add.sprite(this.game.width, candyY, 'candy');
			candy.frame = type
		}
		
		this.game.physics.arcade.enable(candy);
		candy.body.velocity.x = -200;
		candy.body.immovable = true;
		candy.body.allowGravity = false;
		this.candies.add(candy);
	},
	checkCollision: function(player, candy) {
		if(candy.frame == 0 || candy.frame == 1) {
			this.lifes -= 2;
		} else if(candy.frame == 2) {
			this.lifes += 1;
		}  else if(candy.frame == 3) {
			this.lifes -= 1;
		} 
		console.log("Te quedan " + this.lifes + " vidas");
		candy.kill();
	}

}