// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        // add object to existing scene
        scene.add.existing(this);
        this.moveSpeed = 200;
    }

    preload(){
        this.load.atlas("rocket", "Rocket.png")
    }

    create(){
        // this.rocket = this.physics.add.sprite(game.config.width / 2 + 500, game.config.height / 2 + 220, "rocket").setScale(10);
        // this.textures.addSpriteSheetFromAtlas("Rocket 0.ase", {frameHeight: 32, frameWidth: 16, atlas: "rocket", frame: "Rocket 0.ase"})
        // this.rocket.body.setImmovable(true);
        // this.rocket.setX(Phaser.Math.Between(game.config.length, game.config.width - this.rocket.width / 2))

        // this.anims.create({
        //     key: "rocket",
        //     frameRate: 4,
        //     repeat: -1,
        //     frames: this.anims.generateFrameNames("rocket", {
        //         prefix: "Rocket ",
        //         start: 0,
        //         end: 3,
        //         suffix: ".ase"
        //     })

        // })                    

        // this.rocket.anims.play("rocket");
        // this.rocket.setVelocityX(-200);
    }

    update(){
        // move Rocket left
        this.x -= this.moveSpeed;

        // wrapping around from left edge to right edge
        if(this.x <= 0 - this.width){
            this.x = game.config.width;
        }
    }

    reset(){
        this.x = game.config.width;
    }
    
}

