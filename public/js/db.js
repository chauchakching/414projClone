// socket.io
if (!Array.prototype.last) {
    Array.prototype.last = (function () {
        return this[this.length - 1];
    });
}
var id = window.location.href.split('/').last();

var socket = io()
socket.emit('register', id)
    //socket.emit( 'download', id )


// receive sever data
socket.on('addVideo', function (data) {

})

socket.on('download', function (data) {
    var level = goto_level
    console.log('level:', level)
    if (data.length > 0) {
        // has saved scripts in server
        console.log('has saved scripts online!')
        for (var i = 0; i < data.length; i++) {
            console.log('received download data:', data[i])
            if (data[i].level != level)
                console.log('goto_level != level of scripts received!')

            if (data[i].type == 'start') {
                editor_playerStart.setValue(data[i].codes)
            }
            if (data[i].type == 'soldier') {
                editor_playerUpdateSoldier.setValue(data[i].codes)
            }
            if (data[i].type == 'wizard') {
                editor_playerUpdateWizard.setValue(data[i].codes)
            }
            /*
            if (data[i].type == 'wizard'){
            	playerUpdateCode['level_'+String(level)]['wizard'] = data[i].codes
            }*/

        }
    } else {
        // use default scripts
        console.log('use default scripts!')
        console.log('default start script:', playerStartCode['level_' + String(level)])
        editor_playerStart.setValue(playerStartCode['level_' + String(level)])
        editor_playerUpdateSoldier.setValue(playerUpdateCode['level_' + String(level)].soldier)
        editor_playerUpdateWizard.setValue(playerUpdateCode['level_' + String(level)].wizard)
    }
    // load enemy code (in default code)
    editor_enemyStart.setValue(enemyStartCode['level_' + String(level)])
    editor_enemyUpdateSoldier.setValue(enemyUpdateCode['level_' + String(level)].soldier)
    editor_enemyUpdateWizard.setValue(enemyUpdateCode['level_' + String(level)].wizard)


    // set cursor at the end
    var editors = [editor_playerStart,
                   editor_playerUpdateSoldier,
                   editor_playerUpdateWizard,
                   editor_enemyStart,
                   editor_enemyUpdateSoldier,
                   editor_enemyUpdateWizard]
    for (var i = 0; i < editors.length; i++)
        editors[i].gotoLine(editors[i].session.getLength() + 1)

    /*
	var default_start_code = playerStartCode['level_'+level]
        var default_start_code2 = enemyStartCode['level_'+level]
        var default_update_code = playerUpdateCode['level_'+level]['soldier']
        var default_update_code2 = enemyUpdateCode['level_'+level]['soldier']

        editor_playerStart.setValue(default_start_code)
        editor_enemyStart.setValue(default_start_code2)
        editor_playerUpdateSoldier.setValue(default_update_code)
        editor_enemyUpdateSoldier.setValue(default_update_code2)
        // set cursor at the end
        editor_playerStart.gotoLine(editor_playerStart.session.getLength()+1)
        editor_enemyStart.gotoLine(editor_enemyStart.session.getLength()+1)
        editor_playerUpdateSoldier.gotoLine(editor_playerUpdateSoldier.session.getLength()+1)
        editor_enemyUpdateSoldier.gotoLine(editor_enemyUpdateSoldier.session.getLength()+1)
        */
    game.state.start('level_' + String(level))
})

socket.on('download_random', function (data) {
    console.log('receive random download msg from server')
    var level = goto_level
    console.log('level:', level)
    console.log('default level 1 start script:', enemyStartCode.level_1)
    if (data.length > 0) {
        // has saved scripts in server
        console.log('has saved scripts online!')

        var sessionPick;

        sessionPick = data[Math.floor(Math.random() * data.length)].session;
        console.log('Which session VS? ', sessionPick)

        for (var i = 0; i < data.length; i++) {
            console.log('Random Record download data:', data[i])
            if (data[i].level != level)
                console.log('goto_level != level of scripts received!')

            if (sessionPick == data[i].session) {
                if (data[i].type == 'start') {
                    editor_enemyStart.setValue(data[i].codes)
                }
                if (data[i].type == 'soldier') {
                    editor_enemyUpdateSoldier.setValue(data[i].codes)
                }
                if (data[i].type == 'wizard'){
                    editor_enemyUpdateWizard.setValue(data[i].codes)
                }

            }

        }
    } else {
        // use default scripts
        console.log('use default scripts!')
        console.log('default start script:', enemyStartCode['level_' + String(level)])
        editor_enemyStart.setValue(enemyStartCode['level_' + String(level)])
        editor_enemyUpdateSoldier.setValue(enemyUpdateCode['level_' + String(level)].soldier)
    }
})
