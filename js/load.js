loadState = {
	// loads everything
	preload: function()
	{
		game.load.image('star', 'img/star.png');
		//game.load.spritesheet('dude', 'img/dude.png', 32, 48);
		game.load.image('wizard', 'img/wizard.png');

        game.load.image("playButton", "img/buttons/playbtn.png");
        game.load.image("helpButton", "img/buttons/helpbtn.png");
        game.load.image("backButton", "img/buttons/backbtn.png");
        game.load.image('reloadButton', 'img/buttons/yellow_button11.png');
        game.load.image('backButton2', 'img/buttons/red_button06.png');
		
		game.load.image("levelthumb", "img/levelthumb.png");	// level thumbnail
		game.load.image("levelpages", "img/levelpages.png");	// level pages at the bottom
		game.load.image("transp", "img/transp.png");     // transparent background used to scroll

		//game.load.tilemap('my_map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON)
		//game.load.image('tiles', 'img/tilesheet_complete.png')
        game.load.image("bullet", "img/bullet.png");
        game.load.image("fortress", "img/fortress1.png");
        game.load.image("BG_MENU", "img/menuBG.png");
        game.load.image("fireball", "img/fireball.png");
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
    },

    create: function () {
        game.state.start('menu');
    }
};
