//
// Level 2
// let player try to move across the middle blocks
//
level_6 = Object.create(playState)

level_6.create = function () {
    this.level_i = 6

    // initialization
    playState.create.bind(this)()
    current_level = this
    /*
    // place middle blocks
    var n_blocks = 5
    for (var i = 0; i < n_blocks; i++){
	    var middleBlock = this.blocks.getFirstDead()
    	var h = middleBlock.height
	    middleBlock.reset(game.world.centerX*0.7, game.world.centerY*1.5 - (n_blocks-1)/2.0*h + i*h)
    }
    for (var i = 0; i < n_blocks; i++){
        var middleBlock = this.blocks.getFirstDead()
        var h = middleBlock.height
        middleBlock.reset(game.world.centerX*1.3, game.world.centerY*0.5 - (n_blocks-1)/2.0*h + i*h)
    }
    */
    // initial soldier for player
    this.p1.sendUnit('soldier', 150, 275)

    this.p2.sendUnit('soldier', game.width - 100, 400)
    this.p2.sendUnit('soldier', game.width - 150, 275)
    this.p2.sendUnit('soldier', game.width - 100, 140)

    $('#editors_div a').hide()
    $('#soldierLink').show()
    $('#enemySoldierLink').show()
    $('#tutLink').show()
    $('#startLink').show()

}
