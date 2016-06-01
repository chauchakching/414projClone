menuState = {
    create: function () {
        var bg = game.add.sprite(200, 200, "BG_MENU");

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
        //game.state.start('play');
        var default_start_code =
            'my.val_1 = 500;\n\n\
my.sendStrategy = function () {\n\
    if(my.getMyWizards().length < my.getMySoldiers().length)\n\
        my.sendUnit("wizard", 100, 100);\n\
    else\n\
        my.sendUnit("soldier", 100, 100);\n\
};'

        var default_start_code2 = 'my.val_1 = 100;\n\
my.sendStrategy = function () {\n\
        my.sendUnit("soldier", 300, 300);\n\
};'

        var default_update_code =
            'this.moveToXY(500,350)\n\
var enemy = this.enemy_in_range();\n\
if (enemy){\n\
    this.attack();\n\
    my.sendHelp(this);\n\
}\n'

        var default_update_code2 = 'this.moveToXY(400,500);\nvar enemy = this.enemy_in_range()\nif (enemy){\n    this.attack()}'


        if (!!editor_start1.getValue()) {
            console.log("No change for es1")

        } else {
            console.log("set default code for es1")

            editor_start1.setValue(default_start_code)
        }
        if (!!editor_start2.getValue()) {
            console.log("No change for es2")

        } else {
            console.log("set default code for es2")

            editor_start2.setValue(default_start_code2)
        }
        if (!!editor_update1.getValue()) {
            console.log("No change for ep1")

        } else {
            console.log("set default code for ep1")

            editor_update1.setValue(default_update_code)
        }
        if (!!editor_update2.getValue()) {
            console.log("No change for ep2")

        } else {
            console.log("set default code for ep2")

            editor_update2.setValue(default_update_code2)
        }
        // set cursor at the end
        editor_start1.gotoLine(editor_start1.session.getLength() + 1)
        editor_start2.gotoLine(editor_start2.session.getLength() + 1)
        editor_update1.gotoLine(editor_update1.session.getLength() + 1)
        editor_update2.gotoLine(editor_update2.session.getLength() + 1)

        game.state.start('levels');
    },

    helpBtn: function () {
        game.state.start('help');
    }
};

helpState = {
    create: function () {
        var bg = game.add.sprite(200, 200, "BG_MENU");
        this.game.add.text(20, 0, "G1");

        this.game.add.text(20, 50, "Left click : place soldier");

        this.controlsButton = this.game.add.button(20, 190, 'backButton', this.menuBtn);
    },

    update: function () {},

    menuBtn: function () {
        game.state.start('menu');
    }
};
