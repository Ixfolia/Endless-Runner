class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // Load images/tile sprites
        this.load.path = './assets/'
        this.load.image("playBackground", "playBackground.png");
        // this.load.spritesheet("playerRun", "PlayerRun.png", {
        //     frameWidth: 32,
        //     frameHeight: 32
        // })
        this.load.atlas("playerRun", "Sprite-0001.png", "Sprite-0001.json")
    }

    create(){
        // Add background image
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "playBackground").setOrigin(0, 0).setScale(10.5);

        // Add player image
        this.player = this.add.sprite(this.game.config.width / 2 - 500, this.game.config.height / 2 + 220, "playerRun").setScale(10);

        // this.textures.addSpriteSheet("playerRun", {
        //     atlas: "playerRun",
        //     frameMax: 4,
        //     frameMin: 0,
        //     startFrame: 0,
        //     endFrame: 0,
        //     margin: 0,
        //     spacing: 0
        // })

        this.textures.addSpriteSheetFromAtlas("playerRun", {
            atlas: "playerRun",
            frameMax: 3,
            frameMin: 0,
            startFrame: 0,
            endFrame: 0,
            margin: 0,
            spacing: 0
        })

        // Add player animation
        this.anims.create({
            key: "run",
            frameRate: 2,
            repeat: -1,
            frames: this.anims.generateFrameNumbers("playerRun", {
                prefix: "Sprite-0001 ",
                start: 0,
                end: 3,
                suffix: ".LibreSprite"
            })

        })
        
        this.player.anims.play("run");


    
   
    }

    update(){
        // Scroll the background
        this.bg.tilePositionX += 0.5;


    }
}
