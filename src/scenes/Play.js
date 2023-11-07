class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // Load images/tile sprites
        // this.load.path = './assets/'
        // this.load.image("playBackground", "playBackground.png");
        // this.load.atlas("playerRun", "UFO.png", "UFO.json");
        // this.load.image("box", "Box Sprite.png");
        // this.load.atlas("rocket", "Rocket.png");
        // this.load.image("coin", "Coin.png");
        // this.load.audio("BGM", "BGM.mp3");
        // this.load.audio("coinSound", "pickupCoin.wav");
        // this.load.audio("explosion", "explosion.wav");
        // this.load.audio("ufo fire sound", "UFO sound effect.wav");
        // this.load.audio("box explosion", "boxExplosion.wav")

        this.load.image("playBackground", "./assets/playBackground.png");
        this.load.atlas("playerRun", "./assets/UFO.png", "./assets/UFO.json");
        this.load.image("box", "./assets/Box Sprite.png");
        this.load.atlas("rocket", "./assets/Rocket.png", "./assets/Rocket.json");
        this.load.image("coin", "./assets/Coin.png");
        this.load.audio("BGM", "./assets/BGM.mp3");
        this.load.audio("coinSound", "./assets/pickupCoin.wav");
        this.load.audio("explosion", "./assets/explosion.wav");
        this.load.audio("ufo fire sound", "./assets/UFO sound effect.wav");
        this.load.audio("box explosion", "./assets/boxExplosion.wav")
        
    }

    create(){
        // Add background image
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "playBackground").setOrigin(0, 0).setScale(10.5);

        // Add player
        this.player = this.physics.add.sprite(game.config.width / 2 - 500, game.config.height / 2 + 220, "playerRun", "UFO 0.ase").setScale(10);
        this.player.body.setSize(11.5, 8, true);
        this.player.body.setCollideWorldBounds(true);

        this.textures.addSpriteSheetFromAtlas("UFO 0.ase", {frameHeight: 32, frameWidth: 16, atlas: "playerRun", frame: "UFO 0.ase"})
        
        this.anims.create({
            key: "run",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNames("playerRun", {
                prefix: "UFO ",
                start: 0,
                end: 3,
                suffix: ".ase"
            })
        })
        

        this.player.anims.play("run");

        // Add Rocket
        
        this.rocket = this.physics.add.sprite(game.config.width / 2 + 500, Phaser.Math.Between(100, game.config.height - 100), "rocket").setScale(10);
        // this.rocket = this.physics.add.sprite(game.config.width / 2 + 500, game.config.height / 2 + 220, "rocket").setScale(10);
        this.textures.addSpriteSheetFromAtlas("Rocket 0.ase", {frameHeight: 32, frameWidth: 16, atlas: "rocket", frame: "Rocket 0.ase"})
        this.rocket.body.setImmovable(true);
        this.rocket.body.setSize(18, 6, true);


        this.anims.create({
            key: "rocket",
            frameRate: 4,
            repeat: -1,
            frames: this.anims.generateFrameNames("rocket", {
                prefix: "Rocket ",
                start: 0,
                end: 3,
                suffix: ".ase"
            })

        })                    

        this.rocket.anims.play("rocket");
        let rocketVelocity = -400;


        // Add box
        this.box = this.physics.add.sprite(game.config.width / 2 + 500, Phaser.Math.Between(100, game.config.height - 100), "box").setScale(10);
        this.box.body.setImmovable(true);
        this.box.body.setSize(6, 6, true);
        let boxVelocity = -200;

        // Add coin
        this.coin = this.physics.add.sprite(game.config.width / 2 + 500, Phaser.Math.Between(100, game.config.height - 100), "coin").setScale(5);
        this.coin.body.setImmovable(true);
        this.coin.body.setSize(10, 13, true);
        let coinVelocity = -400;
        this.coin.setVelocityX(coinVelocity)


        // Add collision

            // box colliders
        this.physics.add.collider(this.player, this.box, () => {
            // this.scene.start("playScene");
            this.boxExplosion.play();
            this.gameOver = true;
        })

            // rocket colliders
        this.physics.add.collider(this.player, this.rocket, () => {
            // this.scene.start("playScene");
            this.explosion.play();
            this.gameOver = true;
        })

            // coin colliders
        this.physics.add.overlap(this.player, this.coin, this.collectCoin, null, this);


        // Increase difficulty every 3 seconds
        this.time.addEvent({
            delay: 3000, // 3 seconds
            callback: () => {
                rocketVelocity -= 50;
                boxVelocity -= 20;
                this.rocket.setVelocityX(rocketVelocity);
                this.box.setVelocityX(boxVelocity);
            },
            callbackScope: this,
            loop: true
        });

        // Create Timer
        let timerConfig = {
            fontFamily: "Courier",
            fontSize: "28px",
            backgroundColor: "F3B141",
            color: "#FFFFFF",
            align: "center",
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        };

        this.totalTime = 0;
        this.timeLeft = this.add.text(game.config.width/2, borderUISize + borderPadding, this.totalTime, timerConfig).setOrigin(0.5, 0);

        
        // Create timer event to count up every second
        this.time.addEvent({
            delay: 1000, // 1 second
            callback: () => {
                this.totalTime++;
                this.timeLeft.setText(this.totalTime);
            },
            callbackScope: this,
            loop: true
        });

        this.Score = 0;
        this.TotalScore = this.add.text(game.config.width/2, borderUISize + borderPadding + 50, "SCORE " + this.Score, timerConfig).setOrigin(0.5, 0);

        // GAME OVER flag
        this.gameOver = false;

        // Add gameOver text
        this.gameOverText = this.add.text(game.config.width / 2, game.config.height / 2, 'Game Over\nPress R to Restart', { fontSize: '32px', fill: '#f00', backgroundColor: "#000" });
        this.gameOverText.visible = false;

        // Add BGM
        this.BGM = this.sound.add("BGM", {volume: 0.2, loop: true});
        this.BGM.play();

        // Add coin sound
        this.coinSound = this.sound.add("coinSound", {volume: 0.3});
        
        // Add explosion sound
        this.explosion = this.sound.add("explosion", {volume: 0.4});
   
        // Add UFO sound effect
        this.ufoSound = this.sound.add("ufo fire sound", {volume: 0.2});

        // Add box explosion sound
        this.boxExplosion = this.sound.add("box explosion", {volume: 0.2});

    }

    update(){
        let playerVector = new Phaser.Math.Vector2(0,0)

        // Scroll the background
        this.bg.tilePositionX += 0.5;

        // Reset rocket position
        if (this.rocket.x <= 0 - this.rocket.width){
            this.rocketReset();
        }

        // Reset box position
        if (this.box.x <= 0 - this.box.width){
            this.boxReset();
        }

        // Reset coin position
        if (this.coin.x <= 0 - this.coin.width){
            this.coinReset();
        }

        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown){
            // Player moves up
            playerVector.y = -300
            this.ufoSound.play();
        }

        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown){
            // Player moves down
            playerVector.y = 300
        }
        else {
            playerVector.y = 0
        }

        // Reset Game
        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R).isDown){
            this.textures.remove("UFO 0.ase");
            this.textures.remove("Rocket 0.ase");
            this.scene.restart();
        }


        this.player.body.setVelocity(playerVector.x, playerVector.y);

        // Check for game over
        if(this.gameOver){
            this.physics.pause();
            this.gameOverText.visible = true;
        }
    }

    rocketReset(){
        this.rocket.x = game.config.width;
        // Randomize Y axis for rocket
        this.rocket.y = Phaser.Math.Between(100, game.config.height - 100);
    }

    boxReset(){
        this.box.x = game.config.width;
        // Randomize Y axis for box
        this.box.y = Phaser.Math.Between(100, game.config.height - 100);
    }

    coinReset(){
        this.coin.x = game.config.width;
        // Randomize Y axis for coin
        this.coin.y = Phaser.Math.Between(100, game.config.height - 100);
    }

    collectCoin(player, coin) {
    
        // Add 10 to score
        this.Score += 10;
        this.TotalScore.setText(this.Score);
        this.coinSound.play();
    
        // Reset coin
        this.coinReset();
    }



}
