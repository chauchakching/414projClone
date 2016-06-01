//makes the game itself
var game = new Phaser.Game(840, 550, Phaser.AUTO, "game");
/*
var map = []
var map2 = []
var backgroundLayer = []
var blockLayer = []
*/
//adds the game states
game.state.add("load", loadState);
game.state.add("play", playState);
game.state.add('levels', levelsState);
game.state.add("menu", menuState);
//game.state.add("shop", shopState);
game.state.add("help", helpState);

game.state.add('level_1', level_1)
game.state.add('level_2', level_2)
game.state.add('level_3', level_3)
game.state.add('level_4', level_4)
game.state.add('level_5', level_5)
game.state.add('level_6', level_6)
game.state.add('level_7', level_7)



game.state.start("load");
