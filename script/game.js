const elementIds = [
    ['c0l0','c0l1','c0l2','c0l3','c0l4','c0l5','c0l6','c0l7','c0l8','c0l9'],
    ['c1l0','c1l1','c1l2','c1l3','c1l4','c1l5','c1l6','c1l7','c1l8','c1l9'],
    ['c2l0','c2l1','c2l2','c2l3','c2l4','c2l5','c2l6','c2l7','c2l8','c2l9'],
    ['c3l0','c3l1','c3l2','c3l3','c3l4','c3l5','c3l6','c3l7','c3l8','c3l9'],
    ['c4l0','c4l1','c4l2','c4l3','c4l4','c4l5','c4l6','c4l7','c4l8','c4l9'],
    ['c5l0','c5l1','c5l2','c5l3','c5l4','c5l5','c5l6','c5l7','c5l8','c5l9'],
    ['c6l0','c6l1','c6l2','c6l3','c6l4','c6l5','c6l6','c6l7','c6l8','c6l9'],
    ['c7l0','c7l1','c7l2','c7l3','c7l4','c7l5','c7l6','c7l7','c7l8','c7l9'],
    ['c8l0','c8l1','c8l2','c8l3','c8l4','c8l5','c8l6','c8l7','c8l8','c8l9'],
    ['c9l0','c9l1','c9l2','c9l3','c9l4','c9l5','c9l6','c9l7','c9l8','c9l9']
]
var playerMap = [
    ['@','','#','#','#','#','#','#','#','#'],
    ['','','#','#','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#','E']
]
var gameMap = [
    ['@','','','','','','','','',''],
    ['','','','','','Aa','','','',''],
    ['','','','','','','','','aa',''],
    ['','','','','','','','','',''],
    ['','','Aa','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','AA','','','',''],
    ['','','','','','','','','',''],
    ['','','','','','','','','','X']
]

mosterQt = {
    'AA':0,
    'Aa':0,
    'aa':0
}

aaTime = 0;

playerTurns = 0;

var player = [0,0]

document.addEventListener ('keypress', (event) => {
    const oldPlayer = [player[0],player[1]];
    const key = event.key;
    console.log(key)
    switch (key) {
        case ('w'):
            if (player[0] > 0) {    
                player[0] -= 1;
            }
            break;
        case ('s'):
            if (player[0] < 9) {    
                player[0] += 1;
            }
            break;
        case ('a'):
            if (player[1] > 0) {    
                player[1] -= 1;
            }
            break;
        case ('d'):
            if (player[1] < 9) {    
                player[1] += 1;
            }
            break;
    }
    console.log(oldPlayer);
    console.log(player);
    if (oldPlayer != player) {
        game(oldPlayer);
    }
});

function game (oldPlayerPos) {
    playerTurns += 1;
    playerChecker(oldPlayerPos);
    draw();
    enemyChecker();
    draw();   

    function playerChecker(oldPlayerPos) {
        if (gameMap[oldPlayerPos[0]][oldPlayerPos[1]] == '@'){
            switch (gameMap[player[0]][player[1]]) {
                case '@':
                case '':
                    gameMap[oldPlayerPos[0]][oldPlayerPos[1]] = '';
                    gameMap[player[0]][player[1]] = '@';
                    break;
                case 'AA':
                case 'Aa':
                case 'aa':
                    gameover()
                    break;
                case 'X':
                    alert('Parabéns você sobreviveu!')
                    location.reload();
                    break;
            }
        } else {
            gameover()
        }
    }

    function enemyChecker(oldPlayerPos) {
        for (var y = 0; y < 10; y++) {
            for (var x = 0; x < 10; x++) {
                const id = elementIds[y][x];
                const d20 = Math.floor(Math.random()*20);
                switch (gameMap[y][x]) {
                    case 'AA':
                        if (d20 > 15 && mosterQt['AA'] < 15) {
                            const pos = Math.floor((Math.random()*4));
                            switch (pos) {
                                case 0:
                                    if (gameMap[y-1][x]==''){
                                        gameMap[y-1][x]='AA';
                                        mosterQt['AA'] += 1;
                                    };
                                    break;
                                case 1:
                                    if (gameMap[y+1][x]==''){
                                        gameMap[y+1][x]='AA';
                                        mosterQt['AA'] += 1;
                                    };
                                    break;
                                case 2:
                                    if (gameMap[y][x-1]==''){
                                        gameMap[y][x-1]='AA';
                                        mosterQt['AA'] += 1;
                                    };
                                    break;
                                case 3:
                                    if (gameMap[y][x+1]==''){
                                        gameMap[y][x+1]='AA';
                                        mosterQt['AA'] += 1;
                                    };
                                    break;
                            }
                        }
                        break;
                    case 'Aa':
                        if (gameMap[y-1][x] == '@') {
                            gameMap[y-1][x]='AA';
                            gameMap[y-2][x]='Aa';
                            gameMap[y-3][x]='Aa';
                            gameMap[y-4][x]='aa';
                        } else if (gameMap[y+1][x] == '@') {
                            gameMap[y+1][x]='AA';
                            gameMap[y+2][x]='Aa';
                            gameMap[y+3][x]='Aa';
                            gameMap[y+4][x]='aa';
                        } else if (gameMap[y][x-1] == '@') {
                            gameMap[y][x-1]='AA';
                            gameMap[y][x-2]='Aa';
                            gameMap[y][x-3]='Aa';
                            gameMap[y][x-4]='aa';
                        } else if (gameMap[y][x+1] == '@') {
                            gameMap[y][x+1]='AA';
                            gameMap[y][x+2]='Aa';
                            gameMap[y][x+3]='Aa';
                            gameMap[y][x+4]='aa';
                        }
                        break;
                    case 'aa':
                        if (aaTime >= 2) {
                            aaTime = 0;
                            let track_y = y;
                            let track_x = x;
                            if (player[0] > y) {
                                track_y += 1;
                            } else if (player[0] < y) {
                                track_y -= 1;
                            }
                            if (player[1] > x) {
                                track_x += 1;
                            } else if (player[1] < x) {
                                track_x -= 1;
                            }
                            if (gameMap[track_y][track_x]!='X'){
                                gameMap[y][x]='';
                                gameMap[track_y][track_x]='aa';
                            }
                        } else {
                            aaTime += 1;
                        }
                        break;
                }                
            }
        }
    }

    function draw () {
        for (var y = 0; y < 10; y++) {
            for (var x = 0; x < 10; x++) {
                const id = elementIds[y][x];
                document.getElementById(id).innerHTML = gameMap[y][x];
                if (gameMap[y][x] == '@'){
                    document.getElementById(id).style.color = '#1F1';
                    document.getElementById(id).style.backgroundColor = '1F1';
                    document.getElementById(id).style.borderColor = '1F1';
                }else if (gameMap[y][x] == 'X'){
                    document.getElementById(id).style.color = '#FF1';
                    document.getElementById(id).style.backgroundColor = 'FF1';
                }else if (gameMap[y][x] == 'AA' || gameMap[y][x] == 'Aa' || gameMap[y][x] == 'aa'){
                    document.getElementById(id).style.color = '#F11';
                    document.getElementById(id).style.backgroundColor = 'F11';
                }else {
                    document.getElementById(id).style.color = '#444';
                    document.getElementById(id).style.backgroundColor = 'F00';
                }
            }
        }
        document.title = `turno: ${playerTurns}`
    }
    function gameover () {
        alert('Você morreu!!!');
        location.reload();
    }
}