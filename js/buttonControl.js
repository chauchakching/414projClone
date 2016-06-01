$('#reload_code').on('click', function(){
    //console.log(game)
    console.log('clicked!')
    game.state.start(game.state.current);
})