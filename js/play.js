var numOfSoldier = 0;
var map
var layer

function GamePlayer(side, game, fortress, soldiers, wizards, resources) {
    this.getSide = function () {
        return side;
    }
    this.getMyFortress = function () {
        return fortress;
    };
    this.getMySoldiers = function () {
        return soldiers;
    };
    this.getMyWizards = function () {
        return wizards;
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
            eval(startCode1)


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
                eval(startCode2)

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
        /*
            update_strategy1 = function (that)
            {
                var my = that.p1
                eval( updateCode1 )
            }
            update_strategy2 = function (that)
            {
                var my = that.p2
                eval( updateCode2 )
            }*/

    this.create = function () {
            //this.background = 
            //this.playerResource = 0;
            this.playerResourceGrowth = 0.05;
            this.playerResourceMax = 1000;

            // groups
            //this.soldiers = game.add.group();
            this.monsters = game.add.group();
            this.bullets = game.add.group();
            this.fortress = game.add.group();

            this.p1ResText = game.add.text(20, 20, "Player 1", {
                font: "16pt Arial",
                fill: "#FF0000"
            });
            this.p2ResText = game.add.text(400, 20, "Player 2", {
                font: "16pt Arial",
                fill: "#FF0000"
            });


            // a monster at center of map
            this.monsters.add(new this.Monster(game, game.world.centerX, game.world.centerY * 1.5));

            // 2 Fortress
            //var fortress0 = this.fortress.add (new this.Fortress (game, game.world.centerX/4, game.world.centerY, 0));
            //var fortress1 = this.fortress.add (new this.Fortress (game, game.world.centerX*7/4, game.world.centerY, 1));

            // initialize bullets
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(100, 'bullet', 0, false);
            this.bullets.setAll('anchor.x', 0, 5);
            this.bullets.setAll('anchor.y', 0, 5);
            this.bullets.setAll('outOfBoundsKill', true);
            this.bullets.setAll('checkWorldBounds', true);

            this.bullets.setAll('power', 33, false, false, 0, true)
            console.log('power:', this.bullets.children[0].power)
            this.bullets.setAll('name', 'bullet', false, false, 0, true)

            // generate units in constant time
            //game.time.events.loop (Phaser.Timer.SECOND, this.generateUnit, fortress0, this.Soldier, this.soldiers);
            //game.time.events.loop (Phaser.Timer.SECOND, this.generateUnit, fortress1, this.Soldier, this.soldiers);
            //game.time.events.loop (Phaser.Timer.SECOND * 8, this.clearGroup, this, this.soldiers);

            this.start_strategy1()
            this.start_strategy2()

        }
        // return units and fortress in a given circle
    this.objsInCircle = function (x, y, radius) {
        var circle = new Phaser.Circle(x, y, radius * 2);
        var groups = [current_level.p1.getMySoldiers(),
                      current_level.p2.getMySoldiers(),
                      current_level.p1.getMyWizards(),
                      current_level.p2.getMyWizards(),
                      current_level.p1.getMyFortress(),
                      current_level.p2.getMyFortress(),
                      current_level.monsters]
        var objs = []
        for (i in groups) {
            var tmp_objs = groups[i].children
            for (j in tmp_objs) {
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

        // update text
        //this.killText.setText('Kills: ' + this.kills);

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
                this.p2.sendUnit("soldier", x, y); // Debug only
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

        // projectiles collision detection
        var pjt_list = [this.bullets,
                        this.fireballs]
        var obj_list = [this.p1.getMySoldiers(),
                        this.p2.getMySoldiers(),
                        this.monsters,
                        this.p1.getMyWizards(),
                        this.p2.getMyWizards(),
                        this.wizards,
                        this.p1.getMyFortress(),
                        this.p2.getMyFortress()]
        for (pjt_i in pjt_list) {
            var tmp_pjt = pjt_list[pjt_i]
            for (obj_i in obj_list) {
                var tmp_obj = obj_list[obj_i]
                game.physics.arcade.overlap(tmp_pjt, tmp_obj, projectile_Hit_b, null, this);
            }
        }
        // end game
        var winner
        if (!current_level.p1.getMyFortress().getFirstAlive()) {
            winner = 'Player 1'
        } else if (!current_level.p2.getMyFortress().getFirstAlive())
            winner = 'Player 2'
        if (winner && !this.gameEnded) {
            var x = game.world.centerX
            var y = game.world.centerY
            var winText = game.add.text(x, y, winner + ' wins!', {
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

            game.time.events.add(Phaser.Timer.SECOND * 3, this.backBtn, this);
            this.gameEnded = true
        }
    }

    this.addHealthBar = function (unit) {
            var barConfig = {
                width: 20 + unit.maxHealth / 50,
                height: 3,
                x: this.x,
                y: this.y,
                bg: {
                    color: '#651828'
                },
                bar: {
                    color: '#FEFF03'
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
        var move_frameNames = Phaser.Animation.generateFrameNames('playerGreen_walk', 1, 5, '.png')
        for (var i = 0; i < 3; i++)
            move_frameNames.push('playerGreen_walk' + String(4 - i) + '.png')
        this.animations.add('move', move_frameNames, 24, true)
        this.animations.add('idle', ['playerGreen_stand.png'], 24, true)
        this.animations.add('attack', ['playerGreen_switch1.png'], 7, false)
        this.play('move')
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // custom
        this.name = 'soldier';
        this.id = numOfSoldier++;
        this.maxHealth = 200
        this.health = this.maxHealth
        this.maxSpeed = 70;
        this.attackRange = 50;
        this.fireDelay = 400;
        this.sightRange = 100;
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
        current_level.addHealthBar(this)

        // circle
        var graphics = game.add.graphics(0, 0)
        graphics.beginFill(0xFFFF0B, 0.02);
        graphics.drawCircle(0, 0, this.sightRange * 2)
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
        Phaser.Sprite.call(this, game, x, y, 'fortress');
        game.physics.enable(this, Phaser.Physics.ARCADE);

        //custom
        this.name = 'fortress';
        this.maxHealth = 50
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

        }, this)

        // add health bar
        current_level.addHealthBar(this)
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
            current_level.addHealthBar(this)

            // circle
            var graphics = game.add.graphics(0, 0)
            graphics.beginFill(0xFFFF0B, 0.02);
            graphics.drawCircle(0, 0, this.sightRange * 2)
            this.addChild(graphics)
        }
    }

    this.reloadBtn = function () {
        game.state.start(game.state.current)

        if (typeof Cookies.get('code1') != 'undefined') {
            $.post("updateCode.php", {
                code: editor_start1.getValue(),
                id: Cookies.get('code1')
            });
            

            // have cookie
            console.log("code1 cookie set");

        } else {
            $.post("upload.php", {
                code: editor_start1.getValue()
            }).done(function (data) {
                document.cookie = "code1=" + data;
            });

        }
        if (typeof Cookies.get('code2') != 'undefined') {
            $.post("updateCode.php", {
                code: editor_update1.getValue(),
                id: Cookies.get('code2')
            });

            // have cookie
            console.log("code2 cookie set");
        } else {
            $.post("upload.php", {
                code: editor_update1.getValue()
            }).done(function (data) {
                document.cookie = "code2=" + data;

            });
        }

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
playState.Unit.prototype.moveToXY = function (x, y) {
    var target = new Phaser.Point(x, y)
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
    this.moveToXY(target.x, target.y)
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
            target = this.enemy_in_range()
        }
        // check target
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
    }
    // player command
    // check enemy in range
playState.Unit.prototype.enemy_in_range = function () {
        var enemyList = []
        var tmp_list = current_level.objsInCircle(this.x, this.y, this.sightRange)
            // only take enemies
        for (i in tmp_list) {
            var tmp_obj = tmp_list[i]
            if (tmp_obj.side != this.side) {
                enemyList.push(tmp_obj)
            }
        }
        //console.log('no. of nearby enemys:', enemyList.length)

        //console.log('my unit type:',this.name)
        //console.log(current_level)
        //console.log('no. of types:',current_level.units.length)

        /*
        for (var i = 0; i < current_level.units.length; i++) {
            var tmp_group = current_level.units[i]
            for (var j = 0; j < tmp_group.children.length; j++) {
                var tmp_unit = tmp_group.children[j]

                //console.log(tmp_unit.name)
                if (tmp_unit.alive && (tmp_unit.side != this.side)) {
                    //console.log(this.x,',',this.y)
                    //console.log('distance to ',tmp_unit.name,':', this.distance(tmp_unit))
                    if (this.distance(tmp_unit) < this.sightRange)
                        enemyList.push(tmp_unit)
                }

            }
        }
        // fortress
        for (i in current_level.fortress.children) {
            var tmp_fortress = current_level.fortress.children[i]
            if (tmp_fortress.alive && tmp_fortress.side != this.side) {
                enemyList.push(tmp_fortress)
            }
        }
        */
        // return cloest enemy
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
        return false

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

    enemyList = enemyList.concat(oppo.getMySoldiers().children)
        //console.log('no. of enemy soldiers:', oppo.getMySoldiers().children.length)
    enemyList = enemyList.concat(oppo.getMyWizards().children)
        //console.log('length of all enemy:', enemyList.length)
    var aliveEnemyList = []
        // return alive enemys
    for (i in enemyList) {
        var unit = enemyList[i]
        if (unit.alive)
            aliveEnemyList.push(unit)
    }
    return aliveEnemyList
}
playState.Unit.prototype.getEnemyFortress = function (my) {
    var oppo
    if (this.side == current_level.p1.getSide()) {
        oppo = current_level.p2
    } else if (this.side == current_level.p2.getSide()) {
        oppo = current_level.p1
    } else console.log('error in getEnemyFortress()')
    var enemyFortress = oppo.getMyFortress().children

    // return alive enemy fortresses
    var aliveEnemyFortress = []
    for (i in enemyFortress) {
        var fortress = enemyFortress[i]
        if (fortress.alive)
            aliveEnemyFortress.push(fortress)
    }
    return aliveEnemyFortress
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
        if (this.side == 0) {
            try {
                var HELP = "help0";
                my = current_level.p1
                eval(updateCode1)
                    /*
                    try {
                        $(this).on(HELP, function (e, orginal) {
                            if (!this.isAttacking()) {
                                this.moveTo(orginal);
                                console.log("Receive help message from " + orginal.id + " to " + this.id);
                            }
                        })

                    } catch (err2) {
                        //console.log('Side 0 did not setup getHelp')		
                    }*/
            } catch (err) {
                console.log('p1 update failed!')
                console.log(err)
            }
        } else {

            try {
                var HELP = "help1";
                my = current_level.p2
                eval(updateCode2)
                    /*try {
                        $(this).on(HELP, function (e, orginal) {
                            if (!this.isAttacking()) {
                                this.moveTo(orginal);
                                console.log("Receive help message from " + orginal.id + " to " + this.id);
                            }
                        })

                    } catch (err2) {
                        //console.log('Side 1 did not setup getHelp')
                    }*/
            } catch (err) {
                console.log('p2 update failed!')
            }
        }
        // update animation
        var currentAnim = this.animations.currentAnim
        if (currentAnim.name != 'attack' || currentAnim.isFinished) {
            if (this.body.velocity.x == 0 && this.body.velocity.y == 0)
                this.play('idle')
            else
                this.play('move')
        }

        return

        var oppositeFortress = playState.fortress.iterate('side', 1 - this.side, Phaser.Group.RETURN_CHILD);
        // if destroyed, win!
        if (oppositeFortress != null) {
            /*
                If enemy or opposite fortress in range, attack.
                Else move!
            */
            var sight = new Phaser.Circle(this.x, this.y, this.sightRange);
            var target = null;
            var soldiers = playState.soldiers;
            // soldier in sight
            for (var i = 0; i < soldiers.total; i++) {
                var soldier = soldiers.children[i];
                // in range?
                if (sight.contains(soldier.x, soldier.y)) {
                    // in opposite side?
                    if (soldier.side != this.side) {
                        target = soldier;
                        break;
                    }
                }
            }
            // fortress in sight
            if (sight.contains(oppositeFortress.x, oppositeFortress.y)) {
                target = oppositeFortress;
            }
            // move to fortress
            if (target == null) {
                var rotation = game.physics.arcade.angleBetween(this, oppositeFortress);

                this.body.velocity.x = Math.cos(rotation) * this.maxSpeed;
                this.body.velocity.y = Math.sin(rotation) * this.maxSpeed;
            } else {
                this.body.velocity.setTo(0, 0);
                // shot frequency limit
                /*
                if (game.time.now > this.nextFire && playState.bullets.countDead() > 0)
                {
                    // fire !!!!
                    this.nextFire= game.time.now + this.fireDelay;
                    var bullet = playState.bullets.getFirstDead();
                    bullet.reset(this.x, this.y);
                    bullet.rotation = game.physics.arcade.moveToObject(bullet, target, 500);
                    bullet.side = this.side;
                }
                */
                var pjt_speed = playState.bullets.children[0].speed
                playState.Shoot(this, playState.bullets, target, pjt_speed);
            }
        }
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

        var updateCode0 = updateCode1 // update animation direction
        if (this.scale.x * this.body.velocity.x < 0)
            this.scale.x *= -1
            // update healthBar position
        this.update_HealthBar()
            // execute player script
        if (this.side == 0) {
            try {
                var HELP = "help0";
                my = current_level.p1
                eval(updateCode0)
                try {
                    //$(this).off(HELP)

                } catch (err2) {
                    //console.log('Side 0 did not setup getHelp')       
                }
            } catch (err) {
                console.log('p1 update failed!')
                console.log(err)
            }
        } else {

            try {
                var HELP = "help1";
                my = current_level.p2
                eval(updateCode0)
                try {
                    // $(this).off(HELP)


                } catch (err2) {
                    //console.log('Side 1 did not setup getHelp')
                }
            } catch (err) {
                console.log('p2 update failed!')
            }
        }
        // update animation
        var currentAnim = this.animations.currentAnim
        if (currentAnim.name != 'attack' || currentAnim.isFinished) {
            if (this.body.velocity.x == 0 && this.body.velocity.y == 0)
                this.play('idle')
            else
                this.play('move')
        }
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
        projectile.side = unit.side;
        projectile.rotation = game.physics.arcade.angleBetween(projectile, target);
        game.physics.arcade.moveToObject(projectile, target, speed)
            // animation 
        projectile.play('idle')
            // audio
            //console.log('projectile name:', projectile.name)
        if (projectile.name == 'fireball')
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
