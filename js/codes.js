var playerStartCode = {}
var enemyStartCode = {}
var playerUpdateCode = {}
var enemyUpdateCode = {}

playerUpdateCode['level_1'] = {}
playerUpdateCode['level_2'] = {}
playerUpdateCode['level_3'] = {}
playerUpdateCode['level_4'] = {}
playerUpdateCode['level_5'] = {}
playerUpdateCode['level_6'] = {}

enemyUpdateCode['level_1'] = {}
enemyUpdateCode['level_2'] = {}
enemyUpdateCode['level_3'] = {}
enemyUpdateCode['level_4'] = {}
enemyUpdateCode['level_5'] = {}
enemyUpdateCode['level_6'] = {}



// level 1
playerStartCode['level_1'] = ''
playerUpdateCode['level_1']['soldier'] = 'this.moveToXY(600, 300);'
enemyStartCode['level_1'] = ''
enemyUpdateCode['level_1']['soldier'] = 'this.moveToXY(600, 300);'

// level 2
playerStartCode['level_2'] = ''
playerUpdateCode['level_2']['soldier'] = 'this.moveToXY(600, 300);'
enemyStartCode['level_2'] = ''
enemyUpdateCode['level_2']['soldier'] = 'this.moveToXY(600, 300);'

// level 3
playerStartCode['level_2'] = ''
playerUpdateCode['level_2']['soldier'] = 'this.moveToXY(600, 300);'
enemyStartCode['level_2'] = ''
enemyUpdateCode['level_2']['soldier'] = 'this.moveToXY(600, 300);'

// level 4
playerStartCode['level_4'] = 'my.val_1 = 500;\n\n\
my.sendStrategy = function () {\n\
    if(my.getMyWizards().length < my.getMySoldiers().length)\n\
        my.sendUnit("wizard", 100, 100);\n\
    else\n\
        my.sendUnit("soldier", 100, 100);\n\
}'
playerUpdateCode['level_4']['soldier'] = 'this.moveToXY(500,350)\n\
var enemy = this.enemy_in_range();\n\
if (enemy){\n\
    this.attack();\n\
    my.sendHelp(this);\n\
}\n'

enemyStartCode['level_4'] = 'my.val_1 = 100;\n\
my.sendStrategy = function () {\n\
        my.sendUnit("soldier", 300, 300);\n\
}'
enemyUpdateCode['level_4']['soldier'] = 'this.moveToXY(400,500);\n\
var enemy = this.enemy_in_range()\n\
if (enemy){\n\
    this.attack()\n\
}'