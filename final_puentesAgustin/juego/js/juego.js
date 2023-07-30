
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics:{
        default: 'arcade',
        arcade:{
            gravity: {y:300},
            debug: false
        }
    },
    preload: preload,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}
// Crear el objeto del juego
const game = new Phaser.Game(config);

// Funciones de la escena
function preload() {
    this.load.image('cielo', 'img/cielo.png');
    this.load.image('plataforma', 'img/plataforma.png');
    this.load.image('pincel', 'img/pincel.png');
    this.load.image('bomba', 'img/bomba.png');
    this.load.spritesheet('personaje', 'img/personaje.png', {frameWidth: 32, frameHeight:48})
}

function create() {
    this.add.image(400, 300, 'cielo');
    plataformas = this.physics.add.staticGroup();
    plataformas.create(400, 568, 'plataforma').setScale(2).refreshBody();
    plataformas.create(600, 400, 'plataforma');
    plataformas.create(50, 250, 'plataforma');
    plataformas.create(750, 220, 'plataforma');
    jugador = this.physics.add.sprite(100, 450, 'personaje');
    jugador.setCollideWorldBounds(true)
    jugador.setBounce(0.2)

    this.anims.create({
        key: 'izquierda',
        frames: this.anims.generateFrameNumbers('personaje', {start:0, end:3}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'medio',
        frames: [{key: 'personaje', frame:4}],
        frameRate: 20
    });

    this.anims.create({
        key: 'derecha',
        frames: this.anims.generateFrameNumbers('personaje', {start:5, end:8}),
        frameRate: 10,
        repeat: -1
    });

    jugador.body.setGravityY(300);

    this.physics.add.collider(jugador, plataformas);

    cursores = this.input.keyboard.createCursorKeys();

}

function update() {
    if(cursores.left.isDown){
        jugador.setVelocityX(-160)
        jugador.anims.play('izquierda', true)
    }else if(cursores.right.isDown){
        jugador.setVelocityX(160)
        jugador.anims.play('derecha', true)
    }
}

// Escena del juego
const gameScene = new Phaser.Scene('Game');

gameScene.preload = preload;
gameScene.create = create;
gameScene.update = update;

// Agregar la escena al juego
game.scene.add('Game', gameScene, true);
