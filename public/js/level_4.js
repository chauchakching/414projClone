//
// Level 2
// let player try to move across the middle blocks
//
level_4 = Object.create(playState)

level_4.create = function () {
    this.level_i = 4

    // initialization
    playState.create.bind(this)()
    current_level = this

    // place middle blocks
    var n_blocks = 1
    for (var i = 0; i < n_blocks; i++) {
        var middleBlock = this.blocks.getFirstDead()
        var h = middleBlock.height
        middleBlock.reset(game.world.centerX, game.world.centerY - (n_blocks - 1) / 2.0 * h + i * h)
    }

    // initial soldier for player
    this.p1.sendUnit('soldier', 100, 400)
    this.p1.sendUnit('soldier', 150, 275)
    this.p1.sendUnit('soldier', 100, 140)

    this.p2.sendUnit('soldier', game.width - 100, 400)
    this.p2.sendUnit('soldier', game.width - 150, 275)
    this.p2.sendUnit('soldier', game.width - 100, 140)

    $('#editors_div a').hide()
    $('#startLink').show()
    $('#soldierLink').show()
    $('#tutLink').show()

}
