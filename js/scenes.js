class BaseScene extends Phaser.Scene {
    map;
    player;
    cursors;
    camera;
    exit;

    constructor(key) {
        super(key);
    }

    create() {
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.map.landscape = this.map.addTilesetImage('spritesheet_ground', 'landscape-image');
        this.map.props = this.map.addTilesetImage('spritesheet_tiles', 'props-image');
        this.setCamera();
        this.map.background = this.add.image(this.camera.centerX, this.camera.centerY, 'background-image');
        this.map.background.setScrollFactor(0);
        this.map.background.setScale(this.camera.height / this.map.background.height);
        this.createLayers();
        this.camera.startFollow(this.player);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.anims.create({
            key: 'move',
            frames: this.anims.generateFrameNumbers('player', {
                start: 9,
                end: 10
            }),
            frameRate: 10,
            repeat: -1
        });
    }

    update() {
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-500);
            this.player.anims.play('move', true);
            this.player.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(500);
            this.player.anims.play('move', true);
            this.player.flipX = false;
        } else {
            this.player.setVelocityX(0);
            this.player.setFrame(3);
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursors.space)) {
            this.player.setVelocityY(-900);
        }
    }

    setCamera() {
        this.camera = this.cameras.getCamera('');
        this.camera.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }
    
    createLayers() {
        this.map.createStaticLayer('background', [this.map.landscape, this.map.props], 0, 0);
        this.map.createStaticLayer('platforms', [this.map.landscape, this.map.props], 0, 0);
        this.exit = this.map.createDynamicLayer('exit', [this.map.landscape, this.map.props], 0, 0);
        this.map.getObjectLayer('objects').objects.forEach(function(object){
            if (object.type === 'playerSpawn') {
                this.createPlayer(object.x, object.y);
            }
        }, this);        
        this.map.createStaticLayer('foreground', [this.map.landscape, this.map.props], 0, 0);
    }

    createPlayer(x, y) {
        this.player = this.physics.add.sprite(x, y, 'player', 3);
        this.player.setCollideWorldBounds(true);
        this.collisionLayer = this.map.getLayer('platforms').tilemapLayer;
        this.collisionLayer.setCollisionBetween(0, this.map.getLayer('platforms').tilemapLayer.tilesTotal);
        this.physics.add.collider(this.player, this.collisionLayer);
    }    
}

class Scene1 extends BaseScene {
    constructor() {
        super('scene1');
    }

    preload() {
        this.load.image('landscape-image', 'assets/spritesheet_ground.png');
        this.load.image('props-image', 'assets/spritesheet_tiles.png');
        this.load.image('background-image', 'assets/blue_grass.png');
        this.load.tilemapTiledJSON('level1', 'assets/level1.json');
        this.load.spritesheet('player', 'assets/alienYellow.png', {
            frameWidth: 128,
            frameHeight: 143
        });        
    }

    create() {
        this.map = this.make.tilemap({
            key: 'level1'
        });
        super.create();
    }
}

class Scene2 extends BaseScene {
    constructor() {
        super('scene2');
    }

    preload() {
        this.load.image('landscape-image', 'assets/spritesheet_ground.png');
        this.load.image('props-image', 'assets/spritesheet_tiles.png');
        this.load.image('background-image', 'assets/blue_grass.png');
        this.load.tilemapTiledJSON('level1', 'assets/level2.json');
        this.load.spritesheet('player', 'assets/alienYellow.png', {
            frameWidth: 128,
            frameHeight: 143
        });        
    }

    create() {
        this.map = this.make.tilemap({
            key: 'level2'
        });
        super.create();
    }
}