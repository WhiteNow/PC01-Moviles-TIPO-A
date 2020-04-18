Game = function(game){}

Game.prototype = {
	create:function(){
		this.physics.startSystem(Phaser.Physics.ARCADE);
		this.physics.arcade.gravity.y = 1000;

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    this.scale.pageAlignHorizontally = true;
	    this.scale.pageAlignVertically = true;

		this.levelData =  JSON.parse(this.cache.getText("level"));
		this.platforms = this.add.group();
		this.platforms.enableBody = true;
		this.fires = this.add.group();
		this.fires.enableBody = true;
		this.levelData.platformData.forEach(this.createPlatform,this);
		this.platforms.setAll("body.allowGravity",false);
		this.platforms.setAll("body.immovable",true);

		this.levelData.fireData.forEach(this.createFire,this);
		this.fires.setAll("body.allowGravity",false);


		this.ground = this.add.sprite(0,0,'ground');
		this.ground.y = this.game.height - this.ground.height;

		this.physics.arcade.enable(this.ground);
		this.ground.body.allowGravity = false;
		this.ground.body.immovable = true;
		this.createPlayer();

		this.barrels = this.game.add.group();
		this.barrels.enableBody = true;

		this.barrelFrequency = this.levelData.barrelFrequency * 1000;
		this.barrelSpeed = this.levelData.barrelSpeed;
		this.elapserdTime = 0;
	},
	createPlayer:function(){
		this.player = this.game.add.sprite(this.levelData.playerStart.x, this.levelData.playerStart.y, 'player_spritesheet');
		this.player.anchor.setTo(0.5);
		this.physics.arcade.enable(this.player);
		this.player.body.collideWorldBounds = true;
		this.player.animations.add("walking", [0,1,2,1], 15, true);
		this.keys = this.input.keyboard.createCursorKeys();
		this.playerActions = {left: false, right: false, up: false};
	},
	createFire:function(element){
		let fire = this.game.add.sprite(element.x,element.y,'fire_spritesheet');
	},
	createBarril: function() {
		let barrel = this.barrels.getFirstDead();
		if (!barrel) {
			barrel = this.game.add.sprite(this.levelData.goal.x, this.levelData.goal.y, 'barrel');
			this.barrels.add(barrel);
		} else {
			console.log("revive");
			barrel.reset(this.levelData.goal.x, this.levelData.goal.y);
		}

		barrel.body.velocity.x = 200
		barrel.body.collideWorldBounds = true;
		barrel.body.bounce.setTo(1, 0.5);
	},
	createButtons: function() {
		this.leftButton = this.game.add.sprite(0, 0, 'arrowButton');
		this.leftButton.inputEnabled = true;
		this.direction = "left";
		this.leftButton.y = this.game.height - this.leftButton.height;
		this.leftButton.events.onInputDown.add(this.pressButton, this);
		this.leftButton.events.onInputUp.add(this.releaseButton, this);

		this.rightButton = this.game.add.sprite(this.leftButton.width + 10.0, 0, 'arrowButton');
		this.rightButton.inputEnabled = true;
		this.direction = "right";
		this.rightButton.y = this.game.height - this.leftButton.height;
		this.rightButton.events.onInputDown.add(this.pressButton, this);
		this.rightButton.events.onInputUp.add(this.releaseButton, this);

		this.actionButton = this.game.add.sprite(0, 0, 'actionButton');
		this.actionButton.inputEnabled = true;
		this.actionButton.direction = "up";
		this.actionButton.x = this.game.width - this.actionButton.width;
		this.actionButton.y = this.game.height - this.actionButton.height;
		this.actionButton.events.onInputDown.add(this.pressButton, this);
		this.actionButton.events.onInputUp.add(this.releaseButton, this);
	},
	pressButton: function(sprite) {
		switch(sprite.direction) {
			case "left":

			case "right":

			case "up":
		}
 	},
	releaseButton: function(sprite) {
		switch(sprite.direction) {
			case "left":

			case "right":

			case "up":
		}
	},
	update:function(){
		this.physics.arcade.collide(this.player,this.ground);
		this.physics.arcade.collide(this.player,this.platforms);
		this.physics.arcade.collide(this.player, this.ground); 
		this.physics.arcade.collide(this.platforms, this.barrels);
		this.physics.arcade.collide(this.ground, this.barrels);

		this.elapserdTime += this.time.elapsed;
		
		this.barrels.forEach(function(element) {
			if (element.y >= 600) {
				element.kill();
			}
		}, this);

		if(this.elapserdTime >= this.barrelFrequency) {
			this.elapserdTime = 0;
			this.createBarril();
		}
	

		if(this.keys.left.isDown){
            this.player.animations.play('walking');
            this.player.scale.setTo(1);
            if(this.player.body.velocity.x>-200){
                this.player.body.velocity.x -= 10;
            }
        }else if(this.keys.right.isDown){
            this.player.animations.play('walking');
            this.player.scale.setTo(-1, 1);
            if(this.player.body.velocity.x<200){
                this.player.body.velocity.x += 10;
            }
        }else{
            if(this.player.body.velocity.x > 0){
                this.player.body.velocity.x -= 10;
            }else if(this.player.body.velocity.x < 0){
                this.player.body.velocity.x += 10;
            }
            this.player.frame = 3;
        }

		if (this.keys.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -550;
        }

	},
	createPlatform:function(element){
		//primera forma
		let platform = this.game.add.sprite(element.x,element.y,'platform');
		this.platforms.add(platform);

		//segunda forma
	}
}