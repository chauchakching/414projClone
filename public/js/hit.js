hitBoth = function (p1, p2) {
    p1.kill();
    p2.kill();
    this.kills++;
};

projectile_Hit_b = function (pjt, b) {
    //console.log('hit ',b.name)
    // no friendly fire
    if (pjt.side != b.side) {
        //pjt.body.velocity.setTo(0, 0);
        // damage objects
        b.damage(pjt.power)
            //console.log(pjt.power)
            //console.log(parseFloat(b.vitality))
        console.log(pjt.name, ' damage ', pjt.power, ' to ', b.name)

        if (pjt.name == 'bullet') {
            this.playAudio('bulletHit');
        }
        if (pjt.name == 'fireball') {
            this.playAudio('fireballHit');
        }

        //console.log('remaining health:', b.health);

        // destroy projectile

        //explosion
        var explosion
        if (pjt.name == 'bullet' && current_level.bullet_explosions.countDead() > 0) {
            explosion = current_level.bullet_explosions.getFirstDead();
            explosion.reset(pjt.x, pjt.y);
        } else if (pjt.name == 'fireball' && current_level.explosions.countDead() > 0 && !pjt.exploded) {
            pjt.exploded = true
            explosion = current_level.explosions.getFirstDead();
            console.log('explosion created')
            var direction = pjt.body.velocity
                //console.log('direction:', direction)
            var magnitude = direction.getMagnitude()
                //console.log('magnitude:', magnitude)
            var tmp = 12
            var delta_x = direction.x / magnitude * tmp
            var delta_y = direction.y / magnitude * tmp
                //console.log('delta_x:', delta_x)
                //console.log('delta_y:', delta_y)
            explosion.reset(pjt.x + delta_x, pjt.y + delta_y);

            // damage all enemy in range
            var explosion_area_enemy = current_level.objsInCircle(explosion.x, explosion.y, explosion.radius);
            console.log(explosion_area_enemy.length, ' enemies in explosion area')
            for (var i = 0; i < explosion_area_enemy.length; i++) {
                var tmp_obj = explosion_area_enemy[i]
                    //console.log(tmp_obj)
                if (tmp_obj.side != pjt.side) {
                    tmp_obj.damage(explosion.power)
                    console.log(explosion.name, ' damage ', explosion.power, ' to ', tmp_obj.name, ', remaining hp:', tmp_obj.health)
                    if (tmp_obj.health <= 0)
                        console.log(tmp_obj.name + ' die')
                }
            }
        } else {
            console.log('unknown projectile or projectile used up')
            return
        }
        explosion.side = pjt.side;
        explosion.play('explosion', 15, false, true)
            /* play(animaiton name, 
                    frames per second, 
                    false: don't loop animation, 
                    kill sprite at the end of animation)
            */
            /*
            if (b.health < 0) {
                console.log(b.name+' die')
                b.kill()
            }
            */
        pjt.kill()
    }
}
