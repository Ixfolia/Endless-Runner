class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // Load images/tile sprites
        this.load.path = './assets/'
        this.load.image("playBackground", "playBackground.png");
    }

    create(){
        // Add background image
        this.bg = this.add.tileSprite(0, 0, game.config.width, game.config.height, "playBackground").setOrigin(0, 0).setScale(5);
   
    }

    update(){
        // Scroll the background
        this.bg.tilePositionX += 0.5;
    }
}
