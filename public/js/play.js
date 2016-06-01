var numOfSoldier = 0;

function GamePlayer(side, game, fortress, soldiers, wizards, resources) {
    this._fortressGroup = fortress
    this._soldierGroup = soldiers
    this._wizardGroup = wizards

    this.getSide = function () {
        return side;
    }
    this.getMyFortress = function () {
        return this._fortressGroup.children;
    };
    this.getMySoldiers = function () {
        return this._soldierGroup.children;
    };
    this.getMyWizards = function () {
        return this._wizardGroup.children;
    }
    this.getResources = function () {
        return resources;
    };
    this.setResources = function (newValue) {
        resources = newValue;
    };
    // this.createSoldiers = function (x, y) {  
    //     return soldiers.add(new current_level.Soldier(game, x, y, side));
    // };
    this.createFortress = function (x, y) {
        return fortress.add(new current_level.Fortress(game, x, y, side));
    };
    this.sendHelp = function (orginal) {
        var sight = new Phaser.Circle(orginal.x, orginal.y, 300);
        var target = null;

        // soldier in sight
        for (var i = 0; i < soldiers.total; i++) {
            var soldier = soldiers.children[i];
            // in range?
            if (sight.contains(soldier.x, soldier.y)) {
                if (soldier.id != orginal.id && !soldier.isAttacking()) {

                    //  console.log(orginal.id + ">" + soldier.id ＋ "- " + soldier.lastHelpSent);
                    //console.log(">" + soldier.lastHelpSent + "vs now" + game.time.now);
                    //console.log(">" + (game.time.now - soldier.lastHelpSent))
                    if (game.time.now - soldier.lastHelpSent > 20000) {
                        soldier.lastHelpSent = game.time.now;
                        $(soldier).trigger("help" + side, orginal);
                        console.log(orginal.id + " send help to " + soldier.id);
                    }
                }
            }
        }
    };
    this.sendUnit = function (unit, x, y) {
        //console.log('try to send a unit:', unit)
        var required_resource
        var unit_group
        switch (unit) {
            case 'soldier':
                //console.log('send a soldier')
                required_resource = 10
                unit_group = soldiers
                break
            case 'wizard':
                required_resource = 15
                unit_group = wizards
                break
            default:
                unit = null
        }
        if (unit != null) {
            if (resources > required_resource) {

                //console.log('send !')
                resources -= required_resource;
                if (unit === 'soldier')
                    soldier = unit_group.add(new current_level.Soldier(game, x, y, side));
                if (unit === 'wizard')
                    soldier = unit_group.add(new current_level.Wizard(game, x, y, side));

                try {
                    $(soldier).on("help" + side, function (e, orginal) {
                        if (!soldier.isAttacking()) {
                            soldier.moveTo(orginal);
                            console.log("Receive help message from " + orginal.id + " to " + this.id);
                        }
                    });
                } catch (err2) {}

                return soldier;
            }
        }
    }
}

var current_level
var playState = (function () {

    this.level_i = 0
    this.p1 = {}
    this.p2 = {}

    this.gameEnded = false
    this.start_strategy1 = function () {
        this.soldiers1 = game.add.group();
        this.fortress1 = game.add.group();
        this.wizards1 = game.add.group();

        this.p1 = new GamePlayer(0, game, this.fortress1, this.soldiers1, this.wizards1, 0);
        this.p1.createFortress(game.world.centerX / 4, game.world.centerY);
        var my = this.p1
        try {
            eval(this.playerStartCode)

            try {
                if (typeof my.sendStrategy !== 'undefined') {
                    game.time.events.loop(Phaser.Timer.SECOND, my.sendStrategy, this);
                }
            } catch (err) {
                console.log('p1 sendStrategy code not set!')
            }
        } catch (err) {
            console.log('p1 start code failed!')
        }
    }
    this.start_strategy2 = function () {
        this.soldiers2 = game.add.group();
        this.fortress2 = game.add.group();
        this.wizards2 = game.add.group();

        this.p2 = new GamePlayer(1, game, this.fortress2, this.soldiers2, this.wizards2, 0);
        this.p2.createFortress(game.world.centerX * 7 / 4, game.world.centerY);
        var my = this.p2
        try {
            eval(this.enemyStartCode)

            try {
                if (typeof my.sendStrategy !== 'undefined') {
                    game.time.events.loop(Phaser.Timer.SECOND, my.sendStrategy, this);
                }
            } catch (err) {
                console.log('p2 sendStrategy code not set!')
            }
        } catch (err) {
            console.log('p2 start code failed!')
        }
    }

    this.create = function () {
            game.time.advancedTiming = true;

            // background img
            var back_img = game.add.sprite(0, 0, 'background_img')
            back_img.scale.setTo(game.width / 1.0 / back_img.width, game.height / 1.0 / back_img.height)

            console.log('this.level_i:', this.level_i)
                // prevent pop up if right mouse click
            game.canvas.oncontextmenu = function (e) {
                    e.preventDefault();
                }
                // buttons
            this.backButton = game.add.button(0, 0, 'backButton2', this.backBtn)
            this.backButton.anchor.setTo(0.5, 0.5)
            this.backButton.x = this.backButton.width / 2 + 0
            this.backButton.y = game.world.height - this.backButton.height / 2 - 10
            var back_text = game.add.text(0, 0, "Back", {
                font: "16px Arial",
                fill: "#ffffff"
            });
            back_text.anchor.setTo(0.5, 0.5)
            this.backButton.addChild(back_text);

            this.reloadButton = game.add.button(0, 0, 'reloadButton', this.reloadBtn, this)
            this.reloadButton.anchor.setTo(0.5, 0.5)
            this.reloadButton.x = this.backButton.x + this.backButton.width / 2 + 10 + this.reloadButton.width / 2
            this.reloadButton.y = this.backButton.y
            var reload_text = game.add.text(0, 0, "Reload", {
                font: "16px Arial",
                fill: "#ffffff"
            });
            reload_text.anchor.setTo(0.5, 0.5)
            this.reloadButton.addChild(reload_text);

            // audio
            this.audios = {}
            this.maxAudioCoies = 6
            this.audio_names = ['fireball',
                            'melee',
                            'end_game',
                            'win',
                            'clickButton',
                           'bullet', 'bulletHit', 'fireballHit', 'explosion', 'start', 'end']
            for (i in this.audio_names) {
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

            this.blocks = game.add.group()

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
            this.p2ResText = game.add.text(650, 20, "Player 2", {
                font: "16pt Arial",
                fill: "#FF0000"
            });
            this.p1CursorX = game.add.text(20, 45, "x : ", {
                font: "16pt Arial",
                fill: "#FF0000"
            });

            this.p1CursorY = game.add.text(20, 70, "y : ", {
                font: "16pt Arial",
                fill: "#FF0000"
            });


            // a monster at center of map
            //this.monsters.add(new this.Monster(game, game.world.centerX, game.world.centerY*1.5));

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
            this.fireballs.setAll('anchor.x', 0.5)
            this.fireballs.setAll('anchor.y', 0.5)
            this.fireballs.setAll('outOfBoundsKill', true);
            this.fireballs.setAll('checkWorldBounds', true);

            this.fireballs.setAll('power', 5, false, false, 0, true)
            this.fireballs.setAll('speed', 200, false, false, 0, true)
            this.fireballs.setAll('name', 'fireball', false, false, 0, true)
            this.fireballs.setAll('exploded', false, false, false, 0, true)
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
            this.explosions.setAll('anchor.y', 0.5)

            this.explosions.setAll('power', 15, false, false, 0, true)
            this.explosions.setAll('radius', 50, false, false, 0, true)
            this.explosions.setAll('name', 'fireball_explosion', false, false, 0, true)

            this.explosions.forEach(function (obj) {
                // animation
                obj.animations.add('explosion', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 24, false)
                    // scale
                var ratio = 0.7
                obj.scale.set(ratio, ratio)
            })

            // blocks
            this.blocks.enableBody = true
            this.blocks.physicsBodyType = Phaser.Physics.ARCADE
            this.blocks.createMultiple(10, 'redBlock')
            this.blocks.setAll('anchor.x', 0.5)
            this.blocks.setAll('anchor.y', 0.5)
            this.blocks.setAll('body.immovable', true)



            // Default code
            // save code for loading
            this.playerStartCode = editor_playerStart.getValue()
            this.enemyStartCode = editor_enemyStart.getValue()

            this.playerUpdateSoldierCode = editor_playerUpdateSoldier.getValue()
            this.playerUpdateWizardCode = editor_playerUpdateWizard.getValue()
            this.enemyUpdateSoldierCode = editor_enemyUpdateSoldier.getValue()
            this.enemyUpdateWizardCode = editor_enemyUpdateWizard.getValue()

            this.start_strategy1();
            this.start_strategy2()
                /*
                // generate units for the first 5 seconds
                //this.auto_gen = game.time.events.loop (Phaser.Timer.SECOND, this.generateUnit, fortress0, this.Soldier, this.soldiers);
                //this.auto_gen12 = game.time.events.loop(Phaser.Timer.SECOND, this.generateUnit, this.p2._fortressGroup, this.Wizard, this.wizards);


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
                */
            this.units = [this.p1._soldierGroup,
                  this.p2._soldierGroup,
                  this.monsters,
                  this.p1._wizardGroup,
                  this.p2._wizardGroup]
                //console.log(this.units);

            // initialize resources
            this.p1.setResources(100)
            this.p2.setResources(100)

            this.gameEnded = false

            this.playAudio('start');

            // Cursor
            game.physics.startSystem(Phaser.Physics.ARCADE);

            this.cursor = game.add.sprite(game.world.centerX, game.world.centerY, 'cursor');
            this.cursor.scale.setTo(0.5, 0.5);

            this.cursor.anchor.set(0.5);

            //  And enable the Sprite to have a physics body:
            game.physics.arcade.enable(this.cursor);


        }
        // return units and fortress in a given circle
    this.objsInCircle = function (x, y, radius) {
        var circle = new Phaser.Circle(x, y, radius * 2);
        var groups = [current_level.p1._soldierGroup,
                      current_level.p2._soldierGroup,
                      current_level.p1._wizardGroup,
                      current_level.p2._wizardGroup,
                      current_level.p1._fortressGroup,
                      current_level.p2._fortressGroup,
                      current_level.monsters]
        var objs = []
        for (var i = 0; i < groups.length; i++) {
            var tmp_objs = groups[i].children
            for (var j = 0; j < tmp_objs.length; j++) {
                var tmp_obj = tmp_objs[j]
                if (tmp_obj.alive && circle.contains(tmp_obj.x, tmp_obj.y)) {
                    objs.push(tmp_obj)
                }
            }
        }
        return objs
    }

    this.clearGroup = function (unitGroup) {
        unitGroup.removeAll();
    }

    this.generateUnit = function (Unit, unitGroup) {
        var x = this.x;
        var y = this.y;
        unitGroup.add(new Unit(game, x, y, this.side));
    }


    this.update = function () {
        // player resource grow
        // p1
        p1Resource = this.p1.getResources();
        p1Resource += this.playerResourceGrowth;
        p1Resource = Math.min(p1Resource, this.playerResourceMax);
        this.p1.setResources(p1Resource);
        this.p1ResText.setText("Player 1 : " + Math.round(this.p1.getResources()), 0.00);
        // p2
        p2Resource = this.p2.getResources();
        p2Resource += this.playerResourceGrowth;
        p2Resource = Math.min(p2Resource, this.playerResourceMax);
        this.p2.setResources(p2Resource);
        this.p2ResText.setText("Player 2 : " + Math.round(this.p2.getResources()), 0.00);

        this.p1CursorX.setText("X : " + game.input.x);
        this.p1CursorY.setText("Y : " + game.input.y);

        // update text
        //this.killText.setText('Kills: ' + this.kills);

        /*
        //  ************ for game testing **************
        // click to place soldier
        var leftClick = game.input.activePointer.leftButton.isDown
        var rightClick = game.input.activePointer.rightButton.isDown
        if ((leftClick || rightClick) && !clickLock) {
            this.playAudio('fireball')
            console.log('mouse click!')
            var x = game.input.x;
            var y = game.input.y;

            if (leftClick)
                this.p1.sendUnit("soldier", x, y); // Debug only
            if (rightClick)
                this.p2.sendUnit("wizard", x, y); // Debug only
            clickLock = true;
        }
        if (game.input.activePointer.isUp)
            clickLock = false;

        // respawn a monster at random place when all die
        if (this.monsters.countLiving() == 0) {
            var randomX = game.rnd.integerInRange(0, 600);
            var randomY = game.rnd.integerInRange(0, 600);
            this.monsters.add(new this.Monster(game, randomX, randomY));
        }
        // *********************************************
        */
        // projectiles collision detection
        var pjt_list = [this.bullets,
                        this.fireballs]
        var obj_list = [this.p1._soldierGroup,
                        this.p2._soldierGroup,
                        this.monsters,
                        this.p1._wizardGroup,
                        this.p2._wizardGroup,
                        this.wizards,
                        this.p1._fortressGroup,
                        this.p2._fortressGroup]
        for (pjt_i in pjt_list) {
            var tmp_pjt = pjt_list[pjt_i]
            for (obj_i in obj_list) {
                var tmp_obj = obj_list[obj_i]
                game.physics.arcade.overlap(tmp_pjt, tmp_obj, projectile_Hit_b, null, this);
            }
        }
        // collision
        /*
        obj_list.push(this.blocks)
        var collide_group = game.add.group()
        for (i in obj_list){
            collide_group.add(obj_list[i])
        }
        game.physics.arcade.collide(collide_group)
        */
        for (i in obj_list) {
            game.physics.arcade.collide(this.blocks, obj_list[i])
        }

        // end game
        var winner
        var endgameMsg
        if (this)
            if (!this.p1._fortressGroup.getFirstAlive()) {
                winner = 'Player 2'
                endgameMsg = "You Lose!"
            } else if (!this.p2._fortressGroup.getFirstAlive()) {
            winner = 'Player 1'
            endgameMsg = "Victory!"
        }
        if (winner && !this.gameEnded) {
            var x = game.world.centerX
            var y = game.world.centerY
            var winText = game.add.text(x, y, endgameMsg, {
                font: "32px Arial",
                fill: "#ffffff"
            });
            winText.anchor.setTo(0.5, 0.5)
            winText.alpha = 0
            game.add.tween(winText).to({
                alpha: 1
            }, 2000, Phaser.Easing.Default, true, 0, 0, false)
            game.add.tween(game.world).to({
                alpha: 0.8
            }, 2000, Phaser.Easing.Default, true, 0, 0, false)

            if (winner == 'Player 1'){
                game.time.events.add(Phaser.Timer.SECOND * 3, this.backBtn, this);
            }
            this.gameEnded = true
            this.playAudio('end');

        }

        // Cursor
        //  If the sprite is > 8px away from the pointer then let's move to it
        if (game.physics.arcade.distanceToPointer(this.cursor, game.input.activePointer) > 8) {
            //  Make the object seek to the active pointer (mouse or touch).
            game.physics.arcade.moveToPointer(this.cursor, 300);
        } else {
            //  Otherwise turn off velocity because we're close enough to the pointer
            this.cursor.body.velocity.set(0);
        }

    }

    this.addHealthBar = function (unit, side) {
            var barColor;
            if (side === 0) {
                barColor = '#FEFF03';
            } else if (side === 1) {
                barColor = '#40ff00';
            } else {
                barColor = '#ff0040';
            }

            var barConfig = {
                width: 20 + unit.maxHealth / 50,
                height: 3,
                x: this.x,
                y: this.y,
                bg: {
                    color: '#651828'
                },
                bar: {
                    color: barColor
                },
                animationDuration: 100,
                flipped: false
            }
            unit.myHealthBar = new HealthBar(this.game, barConfig)
            unit.myHealthBar.height = unit.height / 2 + 8
        }
        // soldier type
    this.Soldier = function (game, x, y, side) {
        //Phaser.Sprite.call(this, game, x, y, 'dude');
        Phaser.Sprite.call(this, game, x, y, 'creatures');
        if (side === 1) {
            var move_frameNames = Phaser.Animation.generateFrameNames('playerGreen_walk', 1, 5, '.png')
            for (var i = 0; i < 3; i++)
                move_frameNames.push('playerGreen_walk' + String(4 - i) + '.png')
            this.animations.add('move', move_frameNames, 24, true)
            this.animations.add('idle', ['playerGreen_stand.png'], 24, true)
            this.animations.add('attack', ['playerGreen_switch1.png'], 7, false)
            this.animations.add('die', ['playerGreen_dead.png'], 7, false)

        } else if (side === 0) {
            var move_frameNames = Phaser.Animation.generateFrameNames('playerBlue_walk', 1, 5, '.png')
            for (var i = 0; i < 3; i++)
                move_frameNames.push('playerBlue_walk' + String(4 - i) + '.png')
            this.animations.add('move', move_frameNames, 24, true)
            this.animations.add('idle', ['playerBlue_stand.png'], 24, true)
            this.animations.add('attack', ['playerBlue_switch1.png'], 7, false)
            this.animations.add('die', ['playerBlue_dead.png'], 7, false)
        }
        game.physics.arcade.enable(this)
        this.body.collideWorldBounds = true


        this.play('move')
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // custom
        this.name = 'soldier';
        this.id = numOfSoldier++;
        this.maxHealth = 90
        this.health = this.maxHealth
        this.maxSpeed = 70;
        this.attackRange = 60;
        this.fireDelay = 400;
        this.sightRange = 300;
        this.lastHelpSent = game.time.now;

        // other
        this.scale.set(0.7, 0.7)
        this.alive = true
        this.anchor.setTo(0.5, 0.5);
        this.nextFire = 0;
        this.side = side;
        console.log('a soldier of side \'', side, '\' and id ' + this.id + ' created.');

        //events
        this.events.onKilled.add(function () {
            // show die animation

            // remove healthBar
            this.myHealthBar.bgSprite.kill()
            this.myHealthBar.barSprite.kill()
        }, this)

        // add health bar
        current_level.addHealthBar(this, side)

        // circle
        var graphics = game.add.graphics(0, 0)
        graphics.beginFill(0xFFFF0B, 0.01);
        graphics.drawCircle(0, 0, this.sightRange * 2 + 250)
        //console.log(this.sightRange * 2)
        graphics.lineStyle(1, 0xff0000, 0.2);
        graphics.drawCircle(0, 0, this.attackRange * 2);
        this.addChild(graphics)
    }

    // monster at center (a star)
    this.Monster = function (game, x, y) {
        if (this.alive) {
            Phaser.Sprite.call(this, game, x, y, 'star');
            game.physics.enable(this, Phaser.Physics.ARCADE);

            // custom
            this.name = 'monster';
            this.maxHealth = 150
            this.health = this.maxHealth
                //this.health = this.maxHealth
                // other
            this.alive = true;
            this.anchor.setTo(0.5, 0.5);

            //events
            this.events.onKilled.add(function () {
                // show die animation

                // remove healthBar
                this.myHealthBar.bgSprite.kill()
                this.myHealthBar.barSprite.kill()
            }, this)

            // add health bar
            current_level.addHealthBar(this)
        }
    }

    // fortress
    this.Fortress = function (game, x, y, side) {
        if (side === 0) {
            Phaser.Sprite.call(this, game, x, y, 'fortress1');

        } else if (side === 1) {
            Phaser.Sprite.call(this, game, x, y, 'fortress2');

        }
        game.physics.enable(this, Phaser.Physics.ARCADE);

        //custom
        this.name = 'fortress';
        this.maxHealth = 300
        this.health = this.maxHealth

        this.scale.set(0.3, 0.3)
        this.alive = true;
        this.anchor.setTo(0.5, 0.5);
        this.side = side;

        //events
        this.events.onKilled.add(function () {
            // show die animation

            // remove healthBar
            this.myHealthBar.bgSprite.kill()
            this.myHealthBar.barSprite.kill()

            current_level.playAudio('explosion');

        }, this)

        // add health bar
        current_level.addHealthBar(this, side)
    }

    // soldier type
    this.Wizard = function (game, x, y, side) {
        if (this.alive) {
            Phaser.Sprite.call(this, game, x, y, 'creatures');
            var move_frameNames = Phaser.Animation.generateFrameNames('playerRed_walk', 1, 5, '.png')
            for (var i = 0; i < 3; i++)
                move_frameNames.push('playerRed_walk' + String(4 - i) + '.png')
            this.animations.add('move', move_frameNames, 24, true)
            this.animations.add('idle', ['playerRed_stand.png'], 24, true)
            this.animations.add('attack', ['playerRed_switch1.png'], 7, false)
            this.play('move')
            game.physics.enable(this, Phaser.Physics.ARCADE);
            this.body.collideWorldBounds = true

            // custom
            this.name = 'wizard';
            this.maxHealth = 120
            this.health = this.maxHealth
            this.maxSpeed = 60;
            this.attackRange = 200;
            this.fireDelay = 1300;
            this.sightRange = 300;

            // other
            this.scale.set(0.7, 0.7)
            this.alive = true
            this.anchor.setTo(0.5, 0.5);
            this.nextFire = 0;
            this.side = side;
            console.log('a wizard of side \'', side, '\' created.');

            //events
            this.events.onKilled.add(function () {
                // show die animation

                // remove healthBar
                this.myHealthBar.bgSprite.kill()
                this.myHealthBar.barSprite.kill()

            }, this)

            // add health bar
            current_level.addHealthBar(this, side)

            // circle
            var graphics = game.add.graphics(0, 0)
            graphics.beginFill(0xFFFF0B, 0.01);
            graphics.drawCircle(0, 0, this.sightRange * 2)
            graphics.lineStyle(1, 0xff0000, 0.2);
            graphics.drawCircle(0, 0, this.attackRange * 2);
            this.addChild(graphics)
        }
    }

    this.reloadBtn = function (level) {
        console.log('emit save code msg!')
        var id = window.location.href.split('/').last();
        var startCode = editor_playerStart.getValue()
        var soldierCode = editor_playerUpdateSoldier.getValue()
        var wizardCode = editor_playerUpdateWizard.getValue()
        console.log('soldier code:')
            // start code
        var startData = {
            session: id,
            level: this.level_i,
            type: 'start',
            codes: startCode
        }
        var soldierData = {
            session: id,
            level: this.level_i,
            type: 'soldier',
            codes: soldierCode
        }
        var wizardData = {
            session: id,
            level: level_i,
            type: 'wizard',
            codes: wizardCode
        }
        socket.emit('addVideo', startData)
        socket.emit('addVideo', soldierData)
        socket.emit('addVideo', wizardData)

        game.state.start(game.state.current)

        //game.time.desiredFps = 120;
        //game.time.slowMotion = 0.5;
    }
    this.backBtn = function () {
        game.state.start('levels')
    }

    this.playAudio = function (audio_name) {
        this.audios[audio_name].play()
    }

    return this
})();
playState.Unit = function () {
    // code below would never be executed
    this.name = 'unit';
    console.log('unit created!')
}
playState.Unit.prototype = Object.create(Phaser.Sprite.prototype);
playState.Unit.prototype.update_HealthBar = function () {
    this.myHealthBar.setPosition(this.x, this.y - this.myHealthBar.height)
    this.myHealthBar.setPercent(this.health * 100.0 / this.maxHealth)
        //console.log( this.health )
}
playState.Unit.prototype.moveRight = function () {
    this.body.velocity.x = this.maxSpeed;
}
playState.Unit.prototype.moveToXY = function (xy) {
    var target = new Phaser.Point(xy[0], xy[1])
    var rotation = game.physics.arcade.angleBetween(this, target);
    if (this.distance(target) > this.maxSpeed * 0.2) {
        this.body.velocity.x = Math.cos(rotation) * this.maxSpeed;
        this.body.velocity.y = Math.sin(rotation) * this.maxSpeed;
        return false
    } else {
        this.body.velocity.x = 0
        this.body.velocity.y = 0
        return true
    }
}
playState.Unit.prototype.moveTo = function (target) {
    this.moveToXY([target.x, target.y])
}
playState.Unit.prototype.distance = function (target) {
    return game.physics.arcade.distanceBetween(this, target)
}
playState.Unit.prototype.isAttacking = function () {
        if (game.time.now > this.nextFire)
            return false
        return true
    }
    // player command
    // attack command for all kinds of units in general
playState.Unit.prototype.attack = function (target) {
        //console.log('attack command received.')
        // if no target provided, search target
        if (!target) {
            //console.log('no target provided to attack, search target')
            target = this.getClosestEnemy()
        }
        // check target
        if (target) {
            //console.log('target object:', target)
            //console.log('attack target:', target.name)
            //console.log('distance to attack target:', this.distance(target))
            if (this.distance(target) < this.attackRange) {
                //console.log('target in fire range, attack!')

                this.body.velocity.setTo(0, 0);
                // shot frequency limit
                if (!this.isAttacking() && current_level.bullets.countDead() > 0) {
                    this.approved_attack(target)
                        // animation
                    this.play('attack')
                }
            } else {
                //console.log('approach target to attack!')
                this.moveTo(target)
            }
        } else {
            this.moveTo(this)
                //console.log('no enemy to attack')
        }
    }
    // player command
    // return cloest enemy
playState.Unit.prototype.getClosestEnemy = function () {
    var enemyList = this.getAllEnemy()
    if (enemyList.length > 0) {
        var min_i = 0
        var min_d = this.distance(enemyList[0])
        for (i in enemyList) {
            var tmp_d = this.distance(enemyList[i])
            if (tmp_d < min_d) {
                min_i = i
                min_d = tmp_d
            }
        }
        //console.log('closest enemy in sight found!')
        //console.log( enemyList[min_i])

        return enemyList[min_i]
    }
    //console.log('no enemy')
    return null
}
playState.Unit.prototype.getUnitsInRangeBySide = function (side) {
        var unitList = []
        var tmp_list = current_level.objsInCircle(this.x, this.y, this.sightRange)
            // only take enemies
        for (var i = 0; i < tmp_list.length; i++) {
            var tmp_obj = tmp_list[i]
                //console.log(tmp_obj)
            if (tmp_obj.side == side) {
                unitList.push(tmp_obj)
            }
        }
        return unitList
    }
    // get all enemy in range
playState.Unit.prototype.getEnemyInRange = function () {
    return this.getUnitsInRangeBySide(!this.side)
}
playState.Unit.prototype.getAllyInRange = function () {
        return this.getUnitsInRangeBySide(this.side)
    }
    // get all enemy(units) game object
playState.Unit.prototype.getAllEnemy = function () {
    var oppo
    var enemyList = []
    if (this.side == current_level.p1.getSide()) {
        oppo = current_level.p2
    } else if (this.side == current_level.p2.getSide()) {
        oppo = current_level.p1
    } else console.log('error in getAllEnemy()')

    enemyList = enemyList.concat(oppo.getMySoldiers())
        //console.log('no. of enemy soldiers:', oppo.getMySoldiers().length)
    enemyList = enemyList.concat(oppo.getMyWizards())
        //console.log('length of all enemy:', enemyList.length)
    enemyList = enemyList.concat(oppo.getMyFortress())
        //console.log('no. of enemy:', enemyList.length)
    var aliveEnemyList = []
        // return alive enemys
    for (var i = 0; i < enemyList.length; i++) {
        var unit = enemyList[i]
        if (unit.alive)
            aliveEnemyList.push(unit)
    }
    //console.log('no. of alive enemy:', aliveEnemyList.length)
    return aliveEnemyList
}
playState.Unit.prototype.getEnemyFortress = function () {
    var oppo
    if (this.side == current_level.p1.getSide()) {
        oppo = current_level.p2
    } else if (this.side == current_level.p2.getSide()) {
        oppo = current_level.p1
    } else console.log('error in getEnemyFortress()')
    var enemyFortress = oppo.getMyFortress()

    // return alive enemy fortresses
    var aliveEnemyFortress = []
    for (i in enemyFortress) {
        var fortress = enemyFortress[i]
        if (fortress.alive)
            aliveEnemyFortress.push(fortress)
    }
    return aliveEnemyFortress
}
playState.Unit.prototype.getCoor = function () {
    var coor = [this.x, this.y]
    return coor
}
playState.Unit.prototype.getHP = function () {
    var hp = this.health
    return hp
}
playState.Unit.prototype.getName = function () {
    var name = this.name
    return name
}


playState.Soldier.prototype = Object.create(playState.Unit.prototype);
//playState.Soldier.prototype.constructor = playState.Soldier;
playState.Soldier.prototype.distance = function (target) {
    return game.physics.arcade.distanceBetween(this, target)
}

playState.Soldier.prototype.update = function () {
    if (this.alive) { // update animation direction
        if (this.scale.x * this.body.velocity.x < 0)
            this.scale.x *= -1
            // update healthBar position
        this.update_HealthBar()
            // execute player script
        var hasBug = false
        if (this.side == 0) {
            try {
                var HELP = "help0";
                my = current_level.p1
                eval(current_level.playerUpdateSoldierCode)
            } catch (err) {
                //console.log('p1 update failed!')
                //console.log(err)
                hasBug = true
            }
        } else {

            try {
                var HELP = "help1";
                my = current_level.p2
                eval(current_level.enemyUpdateSoldierCode)
            } catch (err) {
                //console.log('p2 update failed!')
                hasBug = true
            }
        }
        // update animation
        if (!hasBug) {
            var currentAnim = this.animations.currentAnim
            if (currentAnim.name != 'attack' || currentAnim.isFinished) {
                if (this.body.velocity.x == 0 && this.body.velocity.y == 0)
                    this.play('idle')
                else
                    this.play('move')
            }
        } else
            this.play('die')
    }
};
// internal attack command, provide type of attack of a special unit
playState.Soldier.prototype.approved_attack = function (target) {
    var pjt_speed = current_level.bullets.children[0].speed
    current_level.Shoot(this, current_level.bullets, target, pjt_speed);
}
playState.Wizard.prototype = Object.create(playState.Unit.prototype);
//playState.Wizard.prototype.update = playState.Soldier.prototype.update
playState.Wizard.prototype.update = function () {
    if (this.alive) {
        // update animation direction
        if (this.scale.x * this.body.velocity.x < 0)
            this.scale.x *= -1
            // update healthBar position
        this.update_HealthBar()
            // execute player script
        var hasBug = false

        if (this.side == 0) {
            try {
                var HELP = "help0";
                my = current_level.p1
                eval(current_level.playerUpdateWizardCode)
            } catch (err) {
                //console.log('p1 update failed!')
                //console.log(err)
                // die
                hasBug = true
                this.play('die')
            }
        } else {

            try {
                var HELP = "help1";
                my = current_level.p2
                eval(current_level.enemyUpdateWizardCode)
            } catch (err) {
                //console.log('p2 update failed!')
                hasBug = true
                this.play('die')
            }
        }
        // update animation
        if (!hasBug) {
            var currentAnim = this.animations.currentAnim
            if (currentAnim.name != 'attack' || currentAnim.isFinished) {
                if (this.body.velocity.x == 0 && this.body.velocity.y == 0)
                    this.play('idle')
                else
                    this.play('move')
            }
        } else
            this.play('die')
    }
}
playState.Wizard.prototype.approved_attack = function (target) {
    this.body.velocity.setTo(0, 0);
    // shot frequency limit
    if (!this.isAttacking() && current_level.fireballs.countDead() > 0) {
        var pjt_speed = current_level.fireballs.children[0].speed
        current_level.Shoot(this, current_level.fireballs, target, pjt_speed);
    }
}

// generate function to produce bullet (shooting)
playState.Shoot = function (unit, projectileGroup, target, speed) {
    if (projectileGroup.countDead() > 0) {
        unit.nextFire = game.time.now + unit.fireDelay;
        var projectile = projectileGroup.getFirstDead();
        projectile.reset(unit.x, unit.y);
        if (projectile.name == 'fireball')
            projectile.exploded = false
        projectile.side = unit.side;
        projectile.rotation = game.physics.arcade.angleBetween(projectile, target);
        game.physics.arcade.moveToObject(projectile, target, speed)
            // animation 
        projectile.play('idle')
            // audio
            //console.log('projectile name:', projectile.name)
        if (projectile.name == 'fireball')
            current_level.playAudio(projectile.name)

        if (projectile.name == 'bullet')
            current_level.playAudio(projectile.name)

    }
}

// Monster
playState.Monster.prototype = Object.create(playState.Unit.prototype);
//playState.Monster.prototype.constructor = playState.Monster;
playState.Monster.prototype.update_HealthBar = function () {
    this.myHealthBar.setPosition(this.x, this.y - this.myHealthBar.height)
    this.myHealthBar.setPercent(this.health * 100.0 / this.maxHealth)
}
playState.Monster.prototype.update = function () {
    // update healthBar position
    this.update_HealthBar()
};

// Fortress
playState.Fortress.prototype = Object.create(Phaser.Sprite.prototype);
//playState.Fortress.prototype.constructor = playState.Fortress;
playState.Fortress.prototype.update_HealthBar = function () {
    this.myHealthBar.setPosition(this.x, this.y - this.myHealthBar.height)
    this.myHealthBar.setPercent(this.health * 100.0 / this.maxHealth)
}
playState.Fortress.prototype.update = function () {
    this.update_HealthBar()
}


// audio
function MultiSound(game, key, maxSounds) {
    this.game = game; // phaser game object    
    this.maxSounds = maxSounds || 4; // same sounds max at one time    
    this.key = key; // key of the audiosprite     
    this.sounds = [];
    var self = this;
    var i = 0,
        n = this.maxSounds;
    while (i < n) {
        var sound = this.game.add.audio(this.key);
        this.sounds.push(sound);
        i++;
    }
    return this
}
MultiSound.prototype.play = function (volume) {
    var key = this.key
    if (typeof volume === 'undefined') {
        volume = 1;
    }
    var i = 0,
        n = this.sounds.length;
    var started = false;
    while (i < n) {
        var markerSound = this.sounds[i];
        if (!markerSound.isPlaying) {
            markerSound.play();
            started = true;
            break;
        }
        i++;
    }
    if (!started) { // restart the first available        
        this.sounds[0].play();
    }
};

current_level = playState
