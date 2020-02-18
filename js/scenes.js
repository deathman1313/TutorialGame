class BaseScene extends Phaser.Scene {
    map;
    exit;

    constructor(key) {
        super(key);
    }

    create() {
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.map.landscape = this.map.addTilesetImage('spritesheet_ground', 'landscape-image');
        this.map.props = this.map.addTilesetImage('spritesheet_tiles', 'props-image');
        this.createLayers();
    }

    createLayers() {
        this.map.createStaticLayer('background', [this.map.landscape, this.map.props], 0, 0);
        this.map.createStaticLayer('platforms', [this.map.landscape, this.map.props], 0, 0);
        this.exit = this.map.createDynamicLayer('exit', [this.map.landscape, this.map.props], 0, 0);
        this.map.createStaticLayer('foreground', [this.map.landscape, this.map.props], 0, 0);
    }
}

class Scene1 extends BaseScene {
    constructor() {
        super('scene1');
    }

    preload() {
        this.load.image('landscape-image', 'assets/spritesheet_ground.png');
        this.load.image('props-image', 'assets/spritesheet_tiles.png');
        this.load.tilemapTiledJSON('level1', 'assets/level1.json');
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
        this.load.tilemapTiledJSON('level1', 'assets/level2.json');
    }

    create() {
        this.map = this.make.tilemap({
            key: 'level2'
        });
        super.create();
    }
}