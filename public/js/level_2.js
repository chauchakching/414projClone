//
// Level 2
// let player try to move across the middle blocks
//
level_2 = Object.create(playState)

level_2.create = function () {
    this.level_i = 2

    // initialization
    playState.create.bind(this)()
    current_level = this

    // initial soldier for player
    //this.generateUnit(this.Soldier, current_level.p1.getMySoldiers())
    this.p1.sendUnit('soldier', 180, 275)
    this.p2.getMyFortress()[0].health = 50


    this.p2.sendUnit('soldier', 430, 500)
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
