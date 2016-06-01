hitBoth = function (p1, p2) {
    p1.kill();
    p2.kill();
    this.kills++;
};

projectile_Hit_b = function (pjt, b) {
    //console.log('hit ',b.name)
    // no friendly fire
    if (pjt.side != b.side) {
        pjt.body.velocity.setTo(0, 0);
        // damage objects
        b.damage(pjt.power)
            //console.log(pjt.power)
            //console.log(parseFloat(b.vitality))
        console.log(pjt.name, ' damage ', pjt.power, ' to ', b.name)
        //console.log('remaining health:', b.health);

        // destroy projectile

        //explosion
        if (current_level.explosions.countDead() > 0) {
            var explosion
            if (pjt.name == 'bullet')
                explosion = current_level.bullet_explosions.getFirstDead();
            if (pjt.name == 'fireball')
                explosion = current_level.explosions.getFirstDead();
            explosion.reset(pjt.x, pjt.y);
            explosion.side = pjt.side;
            explosion.play('explosion', 15, false, true)
            // damage all enemy in range
            var explosion_area = new Phaser.Circle(explosion.x, explosion.y, explosion.radius);


        }
        /* play(animaiton name, 
                frames per second, 
                false: don't loop animation, 
                kill sprite at the end of animation)
        */
        if (b.health < 0) {
            b.kill()
        }
        pjt.kill()
    }
}
