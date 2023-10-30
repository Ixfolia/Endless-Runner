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
        this.rocket = this.physics.add.sprite(game.config.width / 2 + 500, game.config.height / 2 + 220, "rocket").setScale(10);
        this.textures.addSpriteSheetFromAtlas("Rocket 0.ase", {frameHeight: 32, frameWidth: 16, atlas: "rocket", frame: "Rocket 0.ase"})
        this.rocket.body.setImmovable(true);
        // this.rocket.setX(Phaser.Math.Between(game.config.length, game.config.width - this.rocket.width / 2))

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
        this.rocket.setVelocityX(-200);


        // Add box
        this.box = this.physics.add.sprite(game.config.width / 2 + 500, game.config.height / 2 + 220, "box").setScale(10);
        this.box.body.setImmovable(true);
        this.box.body.setSize(6, 6, true);



        // Add collision

            // box colliders
        this.physics.add.collider(this.player, this.box, () => {
            this.scene.start("playScene");
        })


   
    }

    update(){
        let playerVector = new Phaser.Math.Vector2(0,0)

        // Scroll the background
        this.bg.tilePositionX += 0.5;

        // Box moving towards player
        this.box.x -= 1;

        // Rocket moving towards player
        this.rocket.x -= 2;

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

}
