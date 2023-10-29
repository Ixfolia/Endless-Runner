class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    preload() {
        // Load images/tile sprites
        this.load.path = './assets/'
        this.load.image("background", "testbg.png");
        this.load.image("playButton", "Play Button.png"); // Load the play button image
    }

    create() {
        // Add background image
        this.add.image(0, 0, 'background').setOrigin(0)

        // Add title text
        this.add.text(this.game.config.width / 2, 100, 'Endless Runner', {
            fontFamily: 'Arial',
            fontSize: "64px",
            color: '#FAC898'
        }).setOrigin(0.5);

        
        // Add play button
        const playButton = this.add.image(this.game.config.width / 2, this.game.config.height / 2, 'playButton').setOrigin(0.5);
        playButton.setInteractive(); // Make the button interactive
        playButton.setScale(7);

        // Add event listener to the play button
        playButton.on('pointerdown', () => {
            // Start the play scene
            this.scene.start("playScene");
        });
    }
}
