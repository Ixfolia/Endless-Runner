class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene');
    }

    create() {
        // Add background image
        this.add.image(0, 0, 'background').setOrigin(0);

        // Add title text
        this.add.text(this.game.config.width / 2, 100, 'Endless Runner', {
            fontFamily: 'Arial',
            fontSize: "64px",
            color: '#FAC898'
        }).setOrigin(0.5);

        // Add play text
        const playText = this.add.text(this.game.config.width / 2, 200, 'Press T to Play', {
            fontFamily: 'Arial',
            fontSize: "32px",
            color: '#FAC898'
        }).setOrigin(0.5);
    
        // Have T as input to start game
        this.keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

    }

    update() {
        // Check if the T key has been pressed
        if (Phaser.Input.Keyboard.JustDown(this.keyT)) {
            // Start the play scene
            this.scene.start("playScene");
        }
    }
}
