//
// Level 2
// let player try to move across the middle blocks
//
level_5 = Object.create(playState)

level_5.create = function () {
    this.level_i = 5

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
    this.p1.sendUnit('soldier', 90, 275)
    this.p1.sendUnit('soldier', 110, 275)

    this.p2.sendUnit('wizard', 490, 275 + 70)
    this.p2.sendUnit('wizard', 490, 275 - 70)
        //this.p2.sendUnit('wizard', 480, 275-30)

    $('#editors_div a').hide()
    $('#soldierLink').show()
    $('#enemyWizardLink').show()
    $('#tutLink').show()

}
