//makes the game itself
var game = new Phaser.Game(840, 550, Phaser.AUTO, "game");

//adds the game states
game.state.add("load", loadState);
game.state.add("play", playState);
game.state.add('levels', levelsState);
game.state.add("menu", menuState);
//game.state.add("shop", shopState);
game.state.add("help", helpState);

game.state.add('level_1', level_1)

game.state.start("load");
