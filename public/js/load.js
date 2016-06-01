loadState = {
    // loads everything
    preload: function () {
        // units
        game.load.image('star', 'img/star.png');
        //game.load.spritesheet('dude', 'img/dude.png', 32, 48);
        game.load.image('wizard', 'img/wizard.png');

        // game objects
        game.load.image('redBlock', 'img/tiles/blockRed.png');
        game.load.image('background_img', 'img/background_img.png');

        game.load.image("playButton", "img/buttons/playbtn.png");
        game.load.image("helpButton", "img/buttons/helpbtn.png");
        game.load.image("backButton", "img/buttons/backbtn.png");
        game.load.image('reloadButton', 'img/buttons/yellow_button11.png');
        game.load.image('backButton2', 'img/buttons/red_button06.png');

        game.load.image("levelthumb", "img/levelthumb.png"); // level thumbnail
        game.load.image("levelpages", "img/levelpages.png"); // level pages at the bottom
        game.load.image("transp", "img/transp.png"); // transparent background used to scroll

        //game.load.tilemap('my_map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON)
        //game.load.image('tiles', 'img/tilesheet_complete.png')
        game.load.image("bullet", "img/bullet.png");
        game.load.image("fortress1", "img/fortress1.png");
        game.load.image("fortress2", "img/fortress2.png");

        //game.load.image("BG_MENU", "img/menuBG.png");
        //game.load.image("BG_MENU", "img/bg.png");
        game.load.image("BG_MENU", "img/bg.jpg");

        game.load.image("fireball", "img/fireball.png");
        game.load.image("cursor", "img/cursor.png");



        game.load.spritesheet("explosion_1", "img/explosion01.jpg", 200, 134)
        game.load.spritesheet("explosion_2", "img/explosion02.png", 100, 100)
        game.load.spritesheet("lf2_explosion", "img/lf2_explosion.png", 160, 160)
        game.load.spritesheet("lf2_fireball", "img/lf2_fireball.png", 80, 33)

        game.load.atlasXML('creatures', 'img/spritesheet_players.png', 'img/spritesheet_players.xml')

        // audio
        game.load.audio('fireball', 'assets/audio/fireball67.wav')
        game.load.audio('melee', 'assets/audio/attack95.wav')
        game.load.audio('end_game', 'assets/audio/m_end.wav')
        game.load.audio('win', 'assets/audio/win93.wav')
        game.load.audio('clickButton', 'assets/audio/DM-CGS-44.wav')
        game.load.audio('bullet', 'assets/audio/bullet.mp3')
        game.load.audio('bulletHit', 'assets/audio/bullethit.mp3')
        game.load.audio('fireballHit', 'assets/audio/fireballHit.mp3')
        game.load.audio('explosion', 'assets/audio/explosion.mp3')
        game.load.audio('start', 'assets/audio/win93.wav')
        game.load.audio('end', 'assets/audio/m_end.wav')

        // tilemap
        //game.load.tilemap('json_map', 'assets/tmp2.json', null, Phaser.Tilemap.TILED_JSON);
        //game.load.tilemap('csv_map_background', 'assets/tmp3_Background.csv', null, Phaser.Tilemap.CSV);
        //game.load.tilemap('csv_map_walls', 'assets/tmp3_walls.csv', null, Phaser.Tilemap.CSV);
        //game.load.image('tiles', 'img/tilesheet_complete_30x30.png')


    },

    create: function () {
        /*
        // csv
        var max_level = 3
        for (var i = 0; i < max_level; i++){
            map[i] = game.add.tilemap('csv_map_background', 30, 30)
            map[i].addTilesetImage('tiles')
            map2[i] = game.add.tilemap('csv_map_walls', 30, 30)
            map2[i].addTilesetImage('tiles')
        }*/
        /*
        level_2.map = game.add.tilemap('csv_map_background', 30, 30)
        level_2.map2 = game.add.tilemap('csv_map_walls', 30, 30)
        level_2.map.addTilesetImage('tiles')
        level_2.map2.addTilesetImage('tiles')
        */
        game.state.start('menu');
    }
};
