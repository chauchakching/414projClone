soldierUpdate = function() {
	var distance = this.game.math.distance(this.x, this.y, this.target.x, this.target.y);

    // If the distance > MIN_DISTANCE then move
    if (distance > playState.soldier.minDist) {
        // Calculate the angle to the target
        var rotation = this.game.math.angleBetween(this.x, this.y, this.target.x, this.target.y);

        // Calculate velocity vector based on rotation and this.MAX_SPEED
        this.body.velocity.x = Math.cos(rotation) * this.MAX_SPEED;
        this.body.velocity.y = Math.sin(rotation) * this.MAX_SPEED;
    } else {
        this.body.velocity.setTo(0, 0);
    }
};