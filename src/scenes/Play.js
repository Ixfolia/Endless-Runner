class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // Load images/tile sprites
        this.load.path = './assets/'
        this.load.image("playBackground", "playBackground.png");
        this.load.atlas("playerRun", "UFO.png", "UFO.json")
        this.load.image("box", "Box Sprite.png")
        this.load.atlas("rocket", "Rocket.png")
    }

    create(){
        // Add background image
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "playBackground").setOrigin(0, 0).setScale(10.5);

        // Add player
        this.player = this.physics.add.sprite(game.config.width / 2 - 500, game.config.height / 2 + 220, "playerRun", "UFO 0.ase").setScale(10);
        this.player.body.setSize(12, 9, true);
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
        this.rocket.body.setSize(18, 8, true);

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
        this.box = this.physics.add.sprite(game.config.width / 2 + 500, game.config.height / 2 + 220, "box").setScale(10);
        this.box.body.setImmovable(true);
        this.box.body.setSize(6, 6, true);
        let boxVelocity = -200;


        // Add collision

            // box colliders
        this.physics.add.collider(this.player, this.box, () => {
            this.scene.start("playScene");
        })

            // rocket colliders
        this.physics.add.collider(this.player, this.rocket, () => {
            this.scene.start("playScene");
        })


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

        if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W).isDown){
            // Player moves up
            playerVector.y = -200
        }

        else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S).isDown){
            // Player moves down
            playerVector.y = 200
        }
        else {
            playerVector.y = 0
        }

        this.player.body.setVelocity(playerVector.x, playerVector.y);

    }

    rocketReset(){
        this.rocket.x = game.config.width;
        this.rocket.y = Phaser.Math.Between(100, game.config.height - 100);
    }

    boxReset(){
        this.box.x = game.config.width;
        this.box.y = Phaser.Math.Between(100, game.config.height - 100);
    }


}
