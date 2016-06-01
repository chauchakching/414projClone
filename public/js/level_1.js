level_1 = Object.create(playState)
level_1.create = function () {
    playState.create.bind(this)()
    this.level_i = 1
    current_level = this


    this.p2.getMyFortress()[0].health = 50

    this.p1.sendUnit('soldier', 200, game.height / 2)
    $('#editors_div a').hide()
    $('#soldierLink').show()
    $('#tutLink').show()

    // documentation
    $('.f_doc').hide()
    $('#attack_f').show()
    $('#moveToXY_f').show()
}
