class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload(){
        // Load images/tile sprites
        this.load.path = './assets/'
        this.load.image("background", "testbg.png");
    }


    create(){

        // Define key inputs
        // keySpacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Add background image
        // this.bg = this.add.tileSprite(0, 0, "background").setOrigin(0, 0);

    }




}







