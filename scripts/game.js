let toDiscover = 0
let boardSize = 0
let generatorRep = new Array(boardSize)
let nums = new Array(boardSize)

function initGame(size){
    boardSize = size
    toDiscover = size ** 2
    
    generateOperation()
}

function generateOperation(){
    for(let i = 0; i < boardSize; i++){
        nums[i] = i;
    }
    nums.sort(()=> Math.random() - 0.5);

    for (let i = 0; i < boardSize; i++){
        generatorRep[nums[i]] = i + 1
    }
    
}

function checkMove(x, y){
    let divs = document.querySelectorAll('#tabela > div');
    let row = divs[x]
    let square = row.childNodes[y]
    let selectedImg = document.querySelector("#menu .active")

    if(!selectedImg) return;
    if(square.childNodes.length > 0) return;

    let reps = generatorRep[x - 1] + generatorRep[y - 1]
    if(reps > boardSize) reps -= boardSize
    if(nums[reps - 1] != Number(selectedImg.attributes.value.nodeValue)){
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
