//
// Level 2
// let player try to move across the middle blocks
//
level_3 = Object.create(playState)

level_3.create = function () {
    this.level_i = 3

    // initialization
    playState.create.bind(this)()
    current_level = this

    // move fortress to near middle
    this.p2.getMyFortress()[0].x = 450
    this.p2.getMyFortress()[0].y = 270

    // initial soldier for player
    this.p1.sendUnit('soldier', 100, 300)
    this.p1.sendUnit('soldier', 120, 275)
    this.p1.sendUnit('soldier', 100, 240)

    this.p2.sendUnit('soldier', 450, 500)
    this.p2.sendUnit('soldier', 450, 500 + 20)
    this.p2.sendUnit('soldier', 450, 500 - 20)

    $('#editors_div a').hide()
    $('#soldierLink').show()
    $('#enemySoldierLink').show()
    $('#tutLink').show()

    // documentation
    $('.f_doc').hide()
    $('#getEnemyInRange_f').show()
    $('#attack_f').show()
    $('#moveToXY_f').show()
}
