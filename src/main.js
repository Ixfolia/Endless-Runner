/**
 * Brady Lin
 * Use multiple Scene classes (dictated by your game's style) (1) DONE...?
 * Properly transition between Scenes and allow the player to restart w/out having to reload the page (1) DONE
 * Include in-game instructions using text or other means (e.g., tooltips, tutorial, diagram, etc.) (1) DONE
 * Have some form of player input/control appropriate to your game design (1) DONE
 * Include one or more animated characters that use a texture atlas* (1) DONE
 * Simulate scrolling with a tileSprite (or equivalent means) (1) DONE
 * Implement proper collision detection (via Arcade Physics or a custom routine) (1) DONE
 * Have looping background music* (1)
 * Use a minimum of four sound effects for key mechanics, UI, and/or significant events appropriate to your game design (1)
 * Use randomness to generate escalating challenge, e.g. terrain, pickups, etc. (1) DONE
 * Include some metric of accomplishment that a player can improve over time, e.g., score, survival time, etc. (1) DONE (Time and Score)
 * Be theoretically endless (1) DONE
 * Be playable for at least 15 seconds for a new player of low to moderate skill (1) DONE
 * Run without significant crashes or errors (1)
 * Include in-game credits for all roles, assets, music, etc. (1)
 */

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true,
    },
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    },
    width: 1366,
    height: 768,
    scene: [ Menu, Play ],
    scale: {
        mode: Phaser.Scale.FIT,
    }
}

let game = new Phaser.Game(config);

// reserve keyboard vars
let keyF, keySpacebar;

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
