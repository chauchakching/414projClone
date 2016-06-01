menuState = {
    create: function () {
        //var bg = game.add.sprite(200, 200, "BG_MENU");
        var bg = game.add.sprite(0, 0, "BG_MENU");
        bg.scale.setTo(0.25,0.25);

        // game title
        this.game.add.text(20, 0, "G1");

        // play button
        this.playButton = this.game.add.button(40, 70, "playButton", this.playBtn);

        // initial game information
        playState.kills = 0;

        // help button
        this.controlsButtons = this.game.add.button(40, 170, 'helpButton', this.helpBtn);


    },

    update: function () {},

    playBtn: function () {
        var id = window.location.href.split('/').last();
        game.state.start('levels');
    },

    helpBtn: function () {
        game.state.start('help');
    }
};

helpState = {
    create: function () {
        //var bg = game.add.sprite(200, 200, "BG_MENU");
        var bg = game.add.sprite(0, 0, "BG_MENU");
        bg.scale.setTo(0.25,0.25);


        this.game.add.text(20, 0, "G1");

        this.game.add.text(20, 50, "Left click : place soldier");

        this.controlsButton = this.game.add.button(20, 190, 'backButton', this.menuBtn);
    },

    update: function () {},

    menuBtn: function () {
        game.state.start('menu');
    }
};
