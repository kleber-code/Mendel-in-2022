const elementIds = [
    ['c0l0','c0l1','c0l2','c0l3','c0l4','c0l5'],
    ['c1l0','c1l1','c1l2','c1l3','c1l4','c1l5'],
    ['c2l0','c2l1','c2l2','c2l3','c2l4','c2l5'],
    ['c3l0','c3l1','c3l2','c3l3','c3l4','c3l5'],
    ['c4l0','c4l1','c4l2','c4l3','c4l4','c4l5'],
    ['c5l0','c5l1','c5l2','c5l3','c5l4','c5l5'],
]
const map = [
    [
        ['@','','','','',''],
        ['','','','','',''],
        ['','','','','',''],
        ['','','','','',''],
        ['','','','','',''],
        ['','','','','','X'],
    ],
    [
        ['#','#','#','#','#','#'],
        ['@','','','','',''],
        ['','','','','',''],
        ['','','','','',''],
        ['','','','','','X'],
        ['#','#','#','#','#','#'],
    ],
    [
        ['#','#','#','#','#','#'],
        ['#','@','','','','#'],
        ['#','','','','','#'],
        ['#','','','','','#'],
        ['#','','','','X','#'],
        ['#','#','#','#','#','#'],
    ],
    [
        ['@','','','','',''],
        ['#','#','#','','#','#'],
        ['','','','','',''],
        ['','#','#','#','#','#'],
        ['','','','','',''],
        ['#','#','#','#','#','X'],
    ]
]
var gameMap = [
    ['@','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','','X'],
]

mosterQt = {
    'AA':0,
    'Aa':0,
    'aa':0
}

aaTime = 0;

playerTurns = 0;

var player = [0,0];
var playerInSpawn = false;

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
            if (player[0] < gameMap.length - 1) {    
                player[0] += 1;
            }
            break;
        case ('a'):
            if (player[1] > 0) {    
                player[1] -= 1;
            }
            break;
        case ('d'):
            if (player[1] < gameMap[0].length -1) {    
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

    function generatorNewMap () {
        const d = Math.floor(Math.random()*4);
        switch (d) {
            case 0:
                gameMap = [[]];
                gameMap = map[0];
                player = [0,0];
                gameMap[player[0]][player[1]] = '@';
                playerInSpawn = true;
                break;
            case 1:
                gameMap=[[]];
                gameMap = map[1];
                player = [1,0];
                gameMap[player[0]][player[1]] = '@';
                playerInSpawn = true;
                break;
            case 2:
                gameMap=[[]];
                gameMap = map[2];
                player = [1,1];
                gameMap[player[0]][player[1]] = '@';
                playerInSpawn = true;
                break;
            case 3:
                gameMap=[[]];
                gameMap = map[3];
                player = [0,0];
                gameMap[player[0]][player[1]] = '@';
                playerInSpawn = true;
                break;
        }
    }

    function playerChecker (oldPlayerPos) {
        if (gameMap[oldPlayerPos[0]][oldPlayerPos[1]] == '@' || playerInSpawn){
            switch (gameMap[player[0]][player[1]]) {
                case '#':
                    player = oldPlayerPos;
                    break;
                case '@':
                case '':
                    gameMap[oldPlayerPos[0]][oldPlayerPos[1]] = '';
                    gameMap[player[0]][player[1]] = '@';
                    playerInSpawn = false;
                    break;
                case 'AA':
                case 'Aa':
                case 'aa':
                    gameover()
                    break;
                case 'X':
                    gameMap[oldPlayerPos[0]][oldPlayerPos[1]] = '';
                    generatorNewMap();
                    draw()
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
        for (var y = 0; y < gameMap.length; y++) {
            for (var x = 0; x < gameMap[y].length; x++) {
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