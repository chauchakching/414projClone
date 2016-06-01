//
// Level 2
// let player try to move across the middle blocks
//
level_7 = Object.create(playState)

level_7.create = function () {
    this.level_i = 7

    // initialization
    playState.create.bind(this)()
    current_level = this

    $('#editors_div a').hide()
    $('#soldierLink').show()
    $('#tutLink').show()
    $('#startLink').show()
    $('#wizardLink').show()

}
