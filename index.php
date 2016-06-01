<?php include("config.php") ?>
    <html>

    <head>
        <title>G1</title>

        <link rel="stylesheet" href="font-awesome-4.6.1/css/font-awesome.min.css">
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="css/styles.css">

        <script type='text/javascript' src='js/lib/jquery-1.11.3.min.js'></script>
        <script type="text/javascript" src="js/lib/phaser.min.js"></script>
        <script type="text/javascript" src="js/lib/HealthBar.standalone.js"></script>
        <script type="text/javascript" src="js/lib/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/lib/js.cookie.js"></script>

        <script type='text/javascript' src='js/codes.js'></script>
        <script type='text/javascript' src='js/levels.js'></script>
        <script type='text/javascript' src='js/menu.js'></script>
        <script type='text/javascript' src='js/load.js'></script>
        <script type='text/javascript' src='js/play.js'></script>

        <script type='text/javascript' src='js/level_1.js'></script>

        <script type='text/javascript' src='js/hit.js'></script>
        <script type='text/javascript' src='js/game.js'></script>

    </head>

    <body>
        <div class='container-fluid'>
            <div id='head_div'>

            </div>
            <div id='game_div_all'>
                <div id='game_div'>
                    <div id='game' class=''></div>
                </div>
                <div id='editors_div' class=''>
                    <ul id='editors_tabs_div' class='nav nav-pills'>
                        <li class='active'><a data-toggle='pill' href='#start'>Start</a></li>
                        <li><a data-toggle='pill' href='#soldier'>Soldier</a></li>
                        <li><a data-toggle='pill' href='#start2'>Start 2</a></li>
                        <li><a data-toggle='pill' href='#soldier2'>Soldier 2</a></li>
                    </ul>
                    <div class='tab-content'>

                        <div id='start' class='tab-pane  in active'>
                            <div id="editor_start1" class='editor_div'></div>
                        </div>
                        <div id='soldier' class='tab-pane '>
                            <div id="editor_update1" class='editor_div'></div>
                        </div>
                        <div id='start2' class='tab-pane '>
                            <div id="editor_start2" class='editor_div'></div>
                        </div>
                        <div id='soldier2' class='tab-pane '>
                            <div id="editor_update2" class='editor_div'></div>
                        </div>
                    </div>
                    <script src="ace-builds/src-min-noconflict/ace.js" type="text/javascript" charset="utf-8"></script>
                    <script>
                        var editor_start1 = ace.edit("editor_start1");
                        var editor_start2 = ace.edit("editor_start2");
                        var editor_update1 = ace.edit("editor_update1");
                        var editor_update2 = ace.edit("editor_update2");

                        editor_start1.setTheme("ace/theme/monokai");
                        editor_update1.setTheme("ace/theme/monokai");
                        editor_start2.setTheme("ace/theme/kuroir");
                        editor_update2.setTheme("ace/theme/kuroir");

                        editor_start1.getSession().setMode("ace/mode/javascript");
                        editor_start2.getSession().setMode("ace/mode/javascript");
                        editor_update1.getSession().setMode("ace/mode/javascript");
                        editor_update2.getSession().setMode("ace/mode/javascript");

                        $(document).ready(function() {
                            var regExp = new RegExp(/\?code1=(\d*)&code2=(\d*)/);

                            var matches = regExp.exec($(location).attr('search'));

                            console.log("Code1 from Cookie:" + Cookies.get('code1'));
                            console.log("Code2 from Cookie:" + Cookies.get('code2'));


                            try {
                                if (typeof Cookies.get('code1') != 'undefined') {
                                    console.log("get the code1 from cookie");
                                    $.get("<?php echo $webserver ?>/returnCode.php?id=" + Cookies.get('code1'), function(data) {
                                        editor_start1.setValue(data);
                                    });

                                }
                                if (typeof Cookies.get('code2') != 'undefined') {
                                    console.log("get the code2 from cookie");

                                    $.get("<?php echo $webserver ?>/returnCode.php?id=" + Cookies.get('code2'), function(data) {
                                        editor_update1.setValue(data);
                                    });

                                }

                                if (!!matches[1]) {

                                    $.get("<?php echo $webserver ?>/returnCode.php?id=" + matches[1], function(data) {
                                        editor_start1.setValue(data);
                                        Cookies.set('code1', matches[1]);

                                    });
                                }

                                if (!!matches[2]) {

                                    $.get("<?php echo $webserver ?>/returnCode.php?id=" + matches[2], function(data) {
                                        editor_update1.setValue(data);
                                        Cookies.set('code2', matches[2]);

                                    });
                                }

                            } catch (err) {
                                //console.log(err);
                            }

                            var regExp2 = new RegExp(/code3=(\d*)&code4=(\d*)/);

                            var matches2 = regExp2.exec($(location).attr('search'));

                            try {
                                if (!!matches2[1]) {
                                    $.get("<?php echo $webserver ?>/returnCode.php?id=" + matches2[1], function(data) {
                                        editor_start2.setValue(data);
                                    });
                                }
                                if (!!matches2[2]) {
                                    $.get("<?php echo $webserver ?>/returnCode.php?id=" + matches2[2], function(data) {
                                        editor_update2.setValue(data);
                                    });
                                }

                            } catch (err) {}




                        });

                    </script>
                </div>
            </div>
        </div>
    </body>
    <script src='js/buttonControl.js'></script>

    </html>
