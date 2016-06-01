var numOfSoldier = 0;

function GamePlayer(side, game, fortress, soldiers, resources) {
    this.getSide = function () {        
        return side;    
    }
    this.getMyFortress = function () {        
        return fortress;    
    };
    this.getMySoldiers = function () {        
        return soldiers;    
    };
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
        var sight = new Phaser.Circle(orginal.x, orginal.y, 100);
        var target = null;

        // soldier in sight
        for (var i = 0; i < soldiers.total; i++) {
            var soldier = soldiers.children[i];
            // in range?
            if (sight.contains(soldier.x, soldier.y)) {
                if (!(soldier.id == orginal.id)) {
                    $(soldier).trigger("help" + side, orginal);
                    console.log(orginal.id + " send help to " + soldier.id);

                }
            }
        }
    }
    this.sendUnit = function (Unit, x, y) {
        if (resources > 10) {
            resources -= 10;
            return soldiers.add(new current_level.Soldier(game, x, y, side));
        }

    }
    this.send3Unit = function (Unit, x, y, x2, y2, x3, y3) {
        if (resources > 30) {
            resources -= 30;
            soldiers.add(new current_level.Soldier(game, x, y, side));
            soldiers.add(new current_level.Soldier(game, x2, y2, side));
            soldiers.add(new current_level.Soldier(game, x3, y3, side));
        }
    }

}

var current_level
var playState = (function () {
    this.p1 = {}
    this.p2 = {}
    this.getEnemy = function (my) {
        if (my == current_level.p1) {
            return current_level.p2.getMySoldiers().children;
        } else if (my == current_level.p2) {
            return current_level.p1.getMySoldiers().children;
        }
    }
    this.getEnemyFortress = function (my) {
        if (my == current_level.p1) {
            return current_level.p2.getMyFortress().children;
        } else if (my == current_level.p2) {
            return current_level.p1.getMyFortress().children;
        }
    }
    this.start_strategy1 = function () {
        this.soldiers1 = game.add.group();
        this.fortress1 = game.add.group();

        this.p1 = new GamePlayer(0, game, this.fortress1, this.soldiers1, 0);
        this.p1.createFortress(game.world.centerX / 4, game.world.centerY);
        var my = this.p1
        try {
            eval(startCode1)
        } catch (err) {
            console.log('p1 start code failed!')
        }
    }
    this.start_strategy2 = function () {
            this.soldiers2 = game.add.group();
            this.fortress2 = game.add.group();
            this.p2 = new GamePlayer(1, game, this.fortress2, this.soldiers2, 0);
            this.p2.createFortress(game.world.centerX * 7 / 4, game.world.centerY);
            var my = this.p2
            try {
                eval(startCode2)
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

        this.killText = game.add.text(20, 500, "kill", {
            font: "16pt Arial",
            fill: "#FF0000"
        });
        this.p1ResText = game.add.text(20, 20, "Player 1", {
            font: "16pt Arial",
            fill: "#FF0000"
        });
        this.p2ResText = game.add.text(400, 20, "Player 2", {
            font: "16pt Arial",
            fill: "#FF0000"
        });


        // a monster at center of map
        this.monsters.add(new this.Monster(game, game.world.centerX, game.world.centerY));

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

        this.bullets.setAll('power', 0.4)
        this.bullets.setAll('name', 'bullet')

        // generate units in constant time
        //game.time.events.loop (Phaser.Timer.SECOND, this.generateUnit, fortress0, this.Soldier, this.soldiers);
        //game.time.events.loop (Phaser.Timer.SECOND, this.generateUnit, fortress1, this.Soldier, this.soldiers);
        //game.time.events.loop (Phaser.Timer.SECOND * 8, this.clearGroup, this, this.soldiers);

        this.start_strategy1()
        this.start_strategy2()

    }

    this.clearGroup = function (unitGroup) {
        unitGroup.removeAll();
    }

    this.generateUnit = function (Unit, unitGroup) {
        var x = this.x;
        var y = this.y;
        unitGroup.add(new Unit(game, x, y, this.side));
    }

    this.destroyAllSoldiers = function () {

    }

    this.update = function () {
        // player resource grow
        p1Resource = this.p1.getResources();
        p1Resource += this.playerResourceGrowth;
        p1Resource = Math.min(p1Resource, this.playerResourceMax);
        this.p1.setResources(p1Resource);
        this.p1ResText.setText("Player 1 : " + Math.round(this.p1.getResources()), 0.00);

        p2Resource = this.p2.getResources();
        p2Resource += this.playerResourceGrowth;
        p2Resource = Math.min(p2Resource, this.playerResourceMax);
        this.p2.setResources(p2Resource);
        this.p2ResText.setText("Player 2 : " + Math.round(this.p2.getResources()), 0.00);

        // update text
        this.killText.setText('Kills: ' + this.kills);

        // collisions
        //game.physics.arcade.collide(this.soldiers, this.monsters);

        // click to place soldier
        if (game.input.activePointer.isDown && !clickLock) {
            var x = game.input.x;
            var y = game.input.y;
            //soldiers.push(new Soldier(game, x, y, boss, bullets));
            //this.soldiers.add(new this.Soldier(game, x, y, 1));
            this.p1.sendUnit("soldier", x, y); // Debug only
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

        // collision detection
        var pjt_list = [this.bullets, this.fireballs]
        var obj_list = [this.p1.getMySoldiers(), this.p2.getMySoldiers(), this.monsters, this.wizards, this.fortress]
        for (pjt_i in pjt_list) {
            var tmp_pjt = pjt_list[pjt_i]
            for (obj_i in obj_list) {
                var tmp_obj = obj_list[obj_i]

                game.physics.arcade.overlap(tmp_pjt, tmp_obj, projectile_Hit_b, null, this);
            }
        }
        /*
        game.physics.arcade.overlap(this.bullets, this.soldiers, projectile_Hit_b, null, this);
        game.physics.arcade.overlap(this.bullets, this.monsters, projectile_Hit_b, null, this);
        game.physics.arcade.overlap(this.bullets, this.wizards, projectile_Hit_b, null, this);
        game.physics.arcade.overlap(this.bullets, this.fortress, projectile_Hit_b, null, this);
        */

        // overlaps (damaging)
        //game.physics.arcade.overlap(this.soldiers, this.monsters, hitBoth, null, this);

    }

    this.addHealthBar = function (unit) {
            var barConfig = {
                width: 20,
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
        }
        // soldier type
    this.Soldier = function (game, x, y, side) {
        Phaser.Sprite.call(this, game, x, y, 'dude');
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // custom
        this.name = 'soldier';
        this.id = numOfSoldier++;
        this.vitality = 3;
        this.maxSpeed = 70;
        this.attackRange = 50;
        this.fireRate = 400;
        this.sightRange = 100;

        // other
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
    }


    // monster at center (a star)
    this.Monster = function (game, x, y) {
        Phaser.Sprite.call(this, game, x, y, 'star');
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // custom
        this.name = 'monster';
        this.vitality = 2;
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

    // fortress
    this.Fortress = function (game, x, y, side) {
        Phaser.Sprite.call(this, game, x, y, 'xp');
        game.physics.enable(this, Phaser.Physics.ARCADE);

        //custom
        this.name = 'fortress';
        this.vitality = 20;

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
        Phaser.Sprite.call(this, game, x, y, 'creatures');
        var move_frameNames = Phaser.Animation.generateFrameNames('playerRed_walk', 1, 5, '.png')
        for (var i = 0; i < 3; i++)
            move_frameNames.push('playerRed_walk' + String(4 - i) + '.png')
        this.animations.add('move', move_frameNames, 24, true)
        this.animations.add('idle', Phaser.Animation.generateFrameNames('playerRed_walk', 1, 5, '.png'), 20, true)
        this.play('move')
        game.physics.enable(this, Phaser.Physics.ARCADE);

        // custom
        this.name = 'soldier';
        this.vitality = 2;
        this.maxSpeed = 70;
        this.attackRange = 120;
        this.fireRate = 600;
        this.sightRange = 180;

        // other
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
    }

    /*
    addSoldier = function(x, y) 
    {
    	var soldier = playState.soldiers.create(x, y, 'dude');
    	soldier.anchor.setTo(0.5, 0.5);
    	soldier.attackRange = 10;
    	playState.game.physics.enable(soldier, Phaser.Physics.ARCADE);

    }
    */
    return this
})();
playState.Unit = function () {
    // code below would never be executed
    this.name = 'unit';
    console.log('unit created!')
}
playState.Unit.prototype = Object.create(Phaser.Sprite.prototype);
playState.Unit.prototype.update_HealthBar = function () {
    this.myHealthBar.setPosition(this.x, this.y - 25)
    this.myHealthBar.setPercent(this.health * 100)
        //console.log( this.health )

}
playState.Unit.prototype.moveRight = function () {
    this.body.velocity.x = this.maxSpeed;
}
playState.Unit.prototype.moveToXY = function (x, y) {
    var target = new Phaser.Point(x, y)
    var rotation = game.physics.arcade.angleBetween(this, target);
    this.body.velocity.x = Math.cos(rotation) * this.maxSpeed;
    this.body.velocity.y = Math.sin(rotation) * this.maxSpeed;

}
playState.Unit.prototype.moveTo = function (target) {
    if (target != null) {
        var rotation = game.physics.arcade.angleBetween(this, target);
        this.body.velocity.x = Math.cos(rotation) * this.maxSpeed;
        this.body.velocity.y = Math.sin(rotation) * this.maxSpeed;
    }
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
            this.approved_attack(target)
                // animation direction
            if (this.scale.x * (target.x - this.x) < 0)
                this.scale.x *= -1
        } else {
            //console.log('approach target to attack!')
            this.moveTo(target)
        }
    }
    // player command
    // check enemy in range
playState.Unit.prototype.enemy_in_range = function () {
    var enenmy_list = []
        //console.log('my unit type:',this.name)
        //console.log(current_level)
        //console.log('no. of types:',current_level.units.length)


    for (var i = 0; i < current_level.units.length; i++) {
        var tmp_group = current_level.units[i]
        for (var j = 0; j < tmp_group.children.length; j++) {
            var tmp_unit = tmp_group.children[j]

            //console.log(tmp_unit.name)
            if (tmp_unit.alive && (tmp_unit.side != this.side)) {
                //console.log(this.x,',',this.y)
                //console.log('distance to ',tmp_unit.name,':', this.distance(tmp_unit))
                if (this.distance(tmp_unit) < this.sightRange)
                    enenmy_list.push(tmp_unit)
            }

        }
    }
    // fortress
    for (i in current_level.fortress.children) {
        var tmp_fortress = current_level.fortress.children[i]
        if (tmp_fortress.alive && tmp_fortress.side != this.side) {
            enenmy_list.push(tmp_fortress)
        }
    }
    if (enenmy_list.length > 0) {
        var min_i = 0
        var min_d = this.distance(enenmy_list[0])
        for (i in enenmy_list) {
            var tmp_d = this.distance(enenmy_list[i])
            if (tmp_d < min_d) {
                min_i = i
                min_d = tmp_d
            }
        }
        //console.log('closest enemy in sight found!')
        //console.log( enenmy_list[min_i])

        return enenmy_list[min_i]
    }
    return false
}

playState.Soldier.prototype = Object.create(playState.Unit.prototype);
//playState.Soldier.prototype.constructor = playState.Soldier;
playState.Soldier.prototype.distance = function (target) {
    return game.physics.arcade.distanceBetween(this, target)
}

playState.Soldier.prototype.update = function () {
    // update animation direction
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
            eval(updateCode2)
            try {
                // $(this).off(HELP)


            } catch (err2) {
                //console.log('Side 1 did not setup getHelp')		
            }
        } catch (err) {
            console.log('p2 update failed!')
        }
    }
    return
    /*
	// find first living monster
	var theMonster;
	var distance;
	var theLivingMonster;
	if (playState.monsters.countLiving() > 0)
	{
		for (var i = 0; i < playState.monsters.children.length; i++)
		{
			if (playState.monsters.children[i].alive)
			{
				theLivingMonster = playState.monsters.children[i];
				break;
			}
		}
		distance = game.physics.arcade.distanceBetween(this, theLivingMonster);
	}
	// no living monster
	else return;
	
	// move ?
	if (distance > this.attackRange)
	{
		var rotation = game.physics.arcade.angleBetween(this, theLivingMonster);

		this.body.velocity.x = Math.cos(rotation) * this.maxSpeed;
		this.body.velocity.y = Math.sin(rotation) * this.maxSpeed;
	}
	// prepare to fire
	else {
		// stop moving
		this.body.velocity.setTo(0, 0);
		// shot frequency limit
		if (game.time.now > this.nextFire && playState.bullets.countDead() > 0)
		{
			// fire !!!!
			this.nextFire= game.time.now + this.fireRate;
			var bullet = playState.bullets.getFirstDead();
			bullet.reset(this.x, this.y);
			bullet.rotation = game.physics.arcade.moveToObject(bullet, theLivingMonster, 500);
		}
	}
    */
    // go destroy another fortress
    /*
    var oppositeFortress;
    playState.fortress.forEach(function (tmp) {
        if (tmp.side != this.side){
            oppositeFortress = tmp;
            break;
        }
        
    });*/
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
                this.nextFire= game.time.now + this.fireRate;
                var bullet = playState.bullets.getFirstDead();
                bullet.reset(this.x, this.y);
                bullet.rotation = game.physics.arcade.moveToObject(bullet, target, 500);
                bullet.side = this.side;
            }
            */
            playState.Shoot(this, playState.bullets, target, 500);
        }
    }

};
// internal attack command, provide type of attack of a special unit
playState.Soldier.prototype.approved_attack = function (target) {
    this.body.velocity.setTo(0, 0);
    // shot frequency limit
    if (!this.isAttacking() && current_level.bullets.countDead() > 0) {
        current_level.Shoot(this, current_level.bullets, target, 500);
    }
}
playState.Wizard.prototype = Object.create(playState.Unit.prototype);
playState.Wizard.prototype.update = playState.Soldier.prototype.update
playState.Wizard.prototype.approved_attack = function (target) {
    this.body.velocity.setTo(0, 0);
    // shot frequency limit
    if (!this.isAttacking() && current_level.fireballs.countDead() > 0) {
        current_level.Shoot(this, current_level.fireballs, target, 500);
    }
}

// generate function to produce bullet (shooting)
playState.Shoot = function (unit, projectileGroup, target, speed) {
    if (projectileGroup.countDead() > 0) {
        unit.nextFire = game.time.now + unit.fireRate;
        var projectile = projectileGroup.getFirstDead();
        projectile.reset(unit.x, unit.y);
        projectile.rotation = game.physics.arcade.moveToObject(projectile, target, speed);
        projectile.side = unit.side;
    }
}






// Monster
playState.Monster.prototype = Object.create(playState.Unit.prototype);
//playState.Monster.prototype.constructor = playState.Monster;
playState.Monster.prototype.update_HealthBar = function () {
    this.myHealthBar.setPosition(this.x, this.y - 25)
    this.myHealthBar.setPercent(this.health * 100)
}
playState.Monster.prototype.update = function () {
    // update healthBar position
    this.update_HealthBar()
};

// Fortress
playState.Fortress.prototype = Object.create(Phaser.Sprite.prototype);
//playState.Fortress.prototype.constructor = playState.Fortress;
playState.Fortress.prototype.update_HealthBar = function () {
    this.myHealthBar.setPosition(this.x, this.y - 25)
    this.myHealthBar.setPercent(this.health * 100)
}
playState.Fortress.prototype.update = function () {
    this.update_HealthBar()
}

current_level = playState
