level_1 = Object.create( playState )
level_1.create = function()
{
    // prevent pop up if right mouse click
    game.canvas.oncontextmenu = function (e) { e.preventDefault(); }
    // buttons
    this.backButton = game.add.button(0, 0, 'backButton2', this.backBtn)
    this.backButton.anchor.setTo(0.5, 0.5)
    this.backButton.x = this.backButton.width/2 + 30
    this.backButton.y = game.world.height - this.backButton.height/2 - 10
    var back_text = game.add.text(0, 0, "Back", {font: "16px Arial", fill: "#ffffff"});
    back_text.anchor.setTo(0.5, 0.5)
    this.backButton.addChild(back_text);

    this.reloadButton = game.add.button(0, 0, 'reloadButton', this.reloadBtn)
    this.reloadButton.anchor.setTo(0.5, 0.5)
    this.reloadButton.x = this.backButton.x+this.backButton.width/2 + 10 + this.reloadButton.width/2
    this.reloadButton.y = this.backButton.y
    var reload_text = game.add.text(0, 0, "Reload", {font: "16px Arial", fill: "#ffffff"});
    reload_text.anchor.setTo(0.5, 0.5)
    this.reloadButton.addChild(reload_text);

    // audio
    this.audios = {}
    this.maxAudioCoies = 6
    this.audio_names = ['fireball',
                        'melee',
                        'end_game',
                        'win',
                        'clickButton']
    for (i in this.audio_names){
        var audio_name = this.audio_names[i]
        this.audios[audio_name] = new MultiSound(game, audio_name, this.maxAudioCoies)
    }

    //
    this.playerResource = 0;
    this.playerResourceGrowth = 0.05;
    this.playerResourceMax = 1000;

    // groups
    //this.soldiers = game.add.group();
    this.monsters = game.add.group();
    this.fortress = game.add.group();
    this.wizards = game.add.group()

    this.bullets = game.add.group();
    this.fireballs = game.add.group();

    this.bullet_explosions = game.add.group()
    this.explosions = game.add.group()

    /*
    this.killText = game.add.text(20, 500, "kill", {
        font: "16pt Arial",
        fill: "#FF0000"
    });
    */
    this.p1ResText = game.add.text(20, 20, "Player 1", {
        font: "16pt Arial",
        fill: "#FF0000"
    });
    this.p2ResText = game.add.text(400, 20, "Player 2", {
        font: "16pt Arial",
        fill: "#FF0000"
    });

    // a monster at center of map
    this.monsters.add(new this.Monster(game, game.world.centerX, game.world.centerY*1.5));

    // 2 Fortress
    //var fortress0 = this.fortress.add (new this.Fortress (game, game.world.centerX/4, game.world.centerY+10, 0));
    //var fortress1 = this.fortress.add (new this.Fortress (game, game.world.centerX*7/4, game.world.centerY-10, 1));

    // initialize bullets
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(100, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5)
    this.bullets.setAll('anchor.y', 0.5)
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

    
    this.bullets.setAll('power', 10, false, false, 0, true)
    this.bullets.setAll('speed', 450, false, false, 0, true)
    this.bullets.setAll('name', 'bullet', false, false, 0, true)

    // fireballs
    this.fireballs.enableBody = true;
    this.fireballs.physicsBodyType = Phaser.Physics.ARCADE;
    this.fireballs.createMultiple(100, 'lf2_fireball', 0, false);
    this.fireballs.setAll('anchor.x', 0.95)
    this.fireballs.setAll('anchor.y', 0.5)
    this.fireballs.setAll('outOfBoundsKill', true);
    this.fireballs.setAll('checkWorldBounds', true);

    this.fireballs.setAll('power', 20, false, false, 0, true)
    this.fireballs.setAll('speed', 200, false, false, 0, true)
    this.fireballs.setAll('radius', 70, false, false, 0, true)
    this.fireballs.setAll('name', 'fireball', false, false, 0, true)
    this.fireballs.forEach(function (obj) {
        // animation
        obj.animations.add('idle', [0, 1, 2, 3, 4, 5], 24, true)
        // scale
        var ratio = 0.6
        obj.scale.set(ratio, ratio)
    })

    // bullet explosion
    this.bullet_explosions.enableBody = true
    this.bullet_explosions.physicsBodyType = Phaser.Physics.ARCADE
    this.bullet_explosions.createMultiple(100, 'explosion_2')
    this.bullet_explosions.setAll('anchor.x', 0.5)
    this.bullet_explosions.setAll('anchor.y', 0.5)
    this.bullet_explosions.forEach(function (obj) {
        obj.animations.add('explosion', [0, 1, 2, 3, 4, 5], 20, false)
        // scale
        var ratio = 0.4
        obj.scale.set(ratio, ratio)
    })

    // explosion
    this.explosions.enableBody = true
    this.explosions.physicsBodyType = Phaser.Physics.ARCADE
    this.explosions.createMultiple(100, 'lf2_explosion')
    this.explosions.setAll('anchor.x', 0.5)
    this.explosions.setAll('anchor.y', 0.65)
    this.explosions.forEach(function (obj) {
        // animation
        obj.animations.add('explosion', [0,1,2,3,4,5,6,7,8,9,10], 24, false)
        // scale
        var ratio = 0.7
        obj.scale.set(ratio, ratio)
    })


    // Default code
    // save code for loading
    startCode1 = editor_start1.getValue()
    startCode2 = editor_start2.getValue()
    updateCode1 = editor_update1.getValue()
    updateCode2 = editor_update2.getValue()

    this.start_strategy1()
    this.start_strategy2()

    // generate units for the first 5 seconds
    //this.auto_gen = game.time.events.loop (Phaser.Timer.SECOND, this.generateUnit, fortress0, this.Soldier, this.soldiers);
    //this.auto_gen12 = game.time.events.loop(Phaser.Timer.SECOND, this.generateUnit, this.p2.getMyFortress(), this.Wizard, this.wizards);


    this.stop_the_gen = function () {
        game.time.events.remove(this.auto_gen)
    }
    this.stop_gen_all = function () {
        //game.time.events.remove(this.auto_gen)
        //game.time.events.remove(this.auto_gen2)
        game.time.events.remove(this.auto_gen12)
    }

    this.stop_gen = game.time.create()
    this.stop_gen.add(1000, this.stop_gen_all, this)
    this.stop_gen.start()
        //this.auto_gen2 = game.time.events.loop (Phaser.Timer.SECOND, this.generateUnit, fortress1, this.Soldier, this.soldiers);

    this.units = [this.p1.getMySoldiers(), this.p2.getMySoldiers(), this.monsters, this.wizards]
    //console.log(this.units);

    // initialize resources
    this.p1.setResources(20)
    this.p2.setResources(20)

    this.gameEnded = false
}
current_level = level_1
