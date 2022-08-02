let toDiscover = 0
let boardSize = 0
let answers;

function initGame(size){
    boardSize = size
    toDiscover = size ** 2
    answers = new Array(boardSize)
        for(let i = 0; i < boardSize; i++){
            answers[i] = new Array(boardSize)
        }
    
    generateOperation()
}

function generateOperation(){
    const nums = new Array(boardSize)
    for(let i = 0; i < boardSize; i++){
        nums[i] = i;
    }

    let identidade = Math.floor(Math.random() * nums.length);
    nums.sort(()=> Math.random() - 0.5);

    for(let i = 0; i < boardSize; i++){
        const inversosCandidatos = new Array(boardSize - i)
        for(let k = i; k < boardSize; k++){
            inversosCandidatos[k - i] = k
        }
        let inverso = inversosCandidatos[Math.floor(Math.random() * inversosCandidatos.length)]
        while(inverso == identidade){
            inverso = inversosCandidatos[Math.floor(Math.random() * inversosCandidatos.length)]
        }

        for(let j = i; j < boardSize; j++){
            if(i == identidade){
                answers[i][j] = j
                answers[j][i] = j
            }else if (j == identidade){
                answers[i][j] = i
                answers[j][i] = i
            }else if(j == inverso || i == inverso){
                answers[i][j] = identidade
                answers[j][i] = identidade
            }else{
                let ans = Math.floor(Math.random() * nums.length);
                while(ans == identidade){
                    ans = Math.floor(Math.random() * nums.length);
                }
                answers[i][j] = ans
                answers[j][i] = ans
            }
        }
    }
}

function checkMove(x, y){
    let divs = document.querySelectorAll('#tabela > div');
    let row = divs[x]
    let square = row.childNodes[y]
    let selectedImg = document.querySelector("#menu .active")

    if(!selectedImg) return;
    if(square.childNodes.length > 0) return;

    if(answers[x - 1][y - 1] != Number(selectedImg.attributes.value.nodeValue)){
        playFailSong()
        return;
    }

    let img = document.createElement("img");
    img.setAttribute("class", "imgIcon");
    img.setAttribute("src", `images/${selectedImg.classList[0]}`);
    square.appendChild(img);
    playSucessSong()
    toDiscover--;
    if(toDiscover == 0) playWindSound()
}

function playFailSong(){
    let failSong = new Audio();
    failSong.src = './audios/errou.mp3'
    failSong.play();
}

function playSucessSong(){
    let sucessSong = new Audio();
    sucessSong.src = './audios/acertou.mp3'
    sucessSong.play()
}

function playWindSound(){
    let winSong = new Audio();
    winSong.src = './audios/ganhou.mp3'
    winSong.play()
}
