var playerStartCode = {}
var enemyStartCode = {}
var solutionStartCode = {}

var playerUpdateCode = {}
var enemyUpdateCode = {}
var solutionUpdateCode = {}


playerUpdateCode['level_1'] = {}
playerUpdateCode['level_2'] = {}
playerUpdateCode['level_3'] = {}
playerUpdateCode['level_4'] = {}
playerUpdateCode['level_5'] = {}
playerUpdateCode['level_6'] = {}
playerUpdateCode['level_7'] = {}

enemyUpdateCode['level_1'] = {}
enemyUpdateCode['level_2'] = {}
enemyUpdateCode['level_3'] = {}
enemyUpdateCode['level_4'] = {}
enemyUpdateCode['level_5'] = {}
enemyUpdateCode['level_6'] = {}
enemyUpdateCode['level_7'] = {}

solutionUpdateCode['level_1'] = {}
solutionUpdateCode['level_2'] = {}
solutionUpdateCode['level_3'] = {}
solutionUpdateCode['level_4'] = {}
solutionUpdateCode['level_5'] = {}
solutionUpdateCode['level_6'] = {}
solutionUpdateCode['level_7'] = {}



// level 1 ( attack() )
playerStartCode['level_1'] = ''
playerUpdateCode['level_1']['soldier'] = '//this.attack()\n\
'
playerUpdateCode['level_1'].wizard = ''

enemyStartCode['level_1'] = ''
enemyUpdateCode['level_1']['soldier'] = ''
enemyUpdateCode['level_1']['wizard'] = ''

// level 2 ( moveToXY() )
playerStartCode['level_2'] = ''
playerUpdateCode['level_2']['soldier'] = '// level 2\n\
this.moveToXY(200, 200);'
playerUpdateCode['level_2']['wizard'] = ''

enemyStartCode['level_2'] = ''
enemyUpdateCode['level_2']['soldier'] = '// level 2\n\
if (this.getEnemyInRange().length > 0){\n\
    this.attack();\n\
}'
enemyUpdateCode['level_2']['wizard'] = ''

solutionStartCode['level_2'] = ''
solutionUpdateCode['level_2'] = 'if (this.getEnemyInRange().length == 0)\n\
    this.moveToXY([600, 50]);\n\
else\n\
    this.attack()'

// level 3
playerStartCode['level_3'] = ''
playerUpdateCode['level_3']['soldier'] = 'this.moveToXY([600, 300]);'
playerUpdateCode['level_3']['wizard'] = ''

enemyStartCode['level_3'] = ''
enemyUpdateCode['level_3']['soldier'] = 'if (this.getEnemyInRange().length > 0){\n\
    this.attack()\n\
}'
enemyUpdateCode['level_3']['wizard'] = ''

solutionStartCode['level_3'] = ''
solutionUpdateCode['level_3'].soldier = 'my.enemies = this.getEnemyInRange();\n\
if (my.enemies.length > 0){\n\
    if (!(my.enemies.length == 1 && my.enemies[0].getName()=="fortress")){\n\
        for (var i = 0; i < my.enemies.legnth; i++){\n\
            if (my.enemies[i].getName() != "fortress"){\n\
                this.attack();\n\
                break;\n\
            }\n\
        }\n\
    }\n\
}'

// level 4
playerStartCode['level_4'] = ''
playerUpdateCode['level_4']['soldier'] = 'this.moveToXY([500,350])\n\
var enemy = this.enemy_in_range();\n\
if (enemy){\n\
    this.attack();\n\
    my.sendHelp(this);\n\
}\n'
playerUpdateCode['level_4']['wizard'] = ''

enemyStartCode['level_4'] = ''
enemyUpdateCode['level_4']['soldier'] = 'this.moveToXY([400,500]);\n\
var enemy = this.enemy_in_range()\n\
if (enemy){\n\
    this.attack()\n\
}'
enemyUpdateCode['level_4']['wizard'] = ''

solutionStartCode['level_4'] = 'my.points = [[300, 500], \n\
             [800, 300]]\n\
my.p = 0'
solutionUpdateCode['level_4']['soldier'] = 'if (my.p < 2){\n\
    if ( this.moveToXY(my.points[my.p]) ){\n\
        console.log(\'arrive a point\');\n\
        my.p += 1;\n\
    }\n\
}\n\
else this.attack()'

// level 5 
playerStartCode['level_5'] = ''
playerUpdateCode['level_5']['soldier'] = ''
playerUpdateCode['level_5']['wizard'] = ''

enemyStartCode['level_5'] = ''
enemyUpdateCode['level_5']['soldier'] = ''
enemyUpdateCode['level_5']['wizard'] = 'if (this.getEnemyInRange().length > 0){\n\
    this.attack()\n\
}'

solutionStartCode.level_5 = ''
solutionUpdateCode.level_5.soldier = 'var enemy = this.getEnemyInRange();\n\
if (enemy.length > 1){\n\
    for (var i = 0; i < enemy.length; i++){\n\
        if (enemy[i].getName() != "fortress"){\n\
            this.attack(enemy[i])\n\
        }\n\
    }\n\
}\n\
else\n\
    this.attack()'

// level 6
playerStartCode['level_6'] = ''
playerUpdateCode['level_6']['soldier'] = ''
playerUpdateCode['level_6']['wizard'] = ''

enemyStartCode['level_6'] = ''
enemyUpdateCode['level_6']['soldier'] = ''
enemyUpdateCode['level_6']['wizard'] = ''

// level 7
playerStartCode['level_7'] = '\
my.sendStrategy = function () {\n\
        //my.sendUnit("soldier", 300, 300);\n\
}'
playerUpdateCode['level_7']['soldier'] = 'this.moveToXY(400,500);\n\
var enemy = this.enemy_in_range()\n\
if (enemy){\n\
    this.attack()\n\
}'
playerUpdateCode['level_7']['wizard'] = 'this.moveToXY(400,500);\n\
var enemy = this.enemy_in_range()\n\
if (enemy){\n\
    this.attack()\n\
}'

enemyStartCode['level_7'] = ''
enemyUpdateCode['level_7']['soldier'] = ''
enemyUpdateCode['level_7']['wizard'] = ''

var tutorialCode = {}
tutorialCode['level_1'] = {}
tutorialCode['level_2'] = {}
tutorialCode['level_3'] = {}
tutorialCode['level_4'] = {}
tutorialCode['level_5'] = {}
tutorialCode['level_6'] = {}




tutorialCode['level_1'] = '<div>attack() \n\
basic fortress, soldier \n\
only need player to use moveToXY() and attack() to move soldier to enemy fortress and destroy it;</div>'


tutorialCode['level_2'] = 'moveToXY(), getEnemyInRange() \
lots of enemy below the map, but with very weak fortress \
Enemy attack player if in range.\
';

tutorialCode['level_3'] = 'getEnemyInRange()\
with some standing enemy behind fortress\
enemy attack player if in range\
player need to kill the enemy soldiers first\
';

tutorialCode['level_4'] = 'make use of variables initiated in create()';

tutorialCode['level_5'] = '';

tutorialCode['level_6'] = 'make use of variables initiated in create() \
a map with a big obstacle in the middle of the map \
let player try to move in certain route, e.g. point 1 -> point 2 -> ... \
';