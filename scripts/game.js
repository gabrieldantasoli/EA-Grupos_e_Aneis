let toDiscover = 0
let boardSize = 0
let vidas = 5;
let erros = 0;
let time = -1;
let acabou = false;
let generatorRep = new Array(boardSize)
let nums = new Array(boardSize)

function initGame(size){
    boardSize = size
    toDiscover = size ** 2
    
    generateOperation()
    fillInitialValues()
    updateTime()
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

function fillInitialValues(){
    for(let i = 0; i < Math.floor(toDiscover / 2); i++){
        let divs = document.querySelectorAll('#tabela > div');
        let x = Math.floor(Math.random() * boardSize + 1)
        let y = Math.floor(Math.random() * boardSize + 1);
        let square = divs[x].childNodes[y]
        while(square.childNodes.length > 0){
            x = Math.floor(Math.random() * boardSize + 1)
            y = Math.floor(Math.random() * boardSize + 1);
            square = divs[x].childNodes[y]
        }

        fillSquare(x, y);
    }

    toDiscover -= Math.floor(toDiscover / 2)
}

function checkMove(x, y){
    let divs = document.querySelectorAll('#tabela > div');
    let square = divs[x].childNodes[y]
    let selectedImg = document.querySelector("#menu .active")

    if(!selectedImg) return;
    if(square.childNodes.length > 0) return;

    let reps = generatorRep[x - 1] + generatorRep[y - 1]
    if(reps > boardSize) reps -= boardSize
    if(nums[reps - 1] != Number(selectedImg.attributes.value.nodeValue)){
        playFailSong()
        erros += 1;
        document.querySelector("#erros").textContent = erros;
        if (document.body.classList == "dinamico") {
            vidas -= 1;
            document.querySelectorAll("#lifes img")[vidas].style.background = "white";
        }  
        if (vidas == 0 && document.body.classList == "dinamico") {
            document.querySelector("#tabela").style.pointerEvents = "none";
            fixTable();
            acabou = true;
        }
        return;
    }

    fillSquare(x, y);
    playSucessSong();
    toDiscover--;
    if(toDiscover == 0) {
        playWindSound();
        fixTable();
        acabou = true;
    }
}

function fillSquare(x, y){
    let divs = document.querySelectorAll('#tabela > div');
    let square = divs[x].childNodes[y]

    let reps = generatorRep[x - 1] + generatorRep[y - 1]
    if(reps > boardSize) reps -= boardSize
    let selectedImg = document.querySelector("#menu").childNodes[nums[reps - 1] + 1];
    let img = document.createElement("img");
    img.setAttribute("class", "imgIcon");
    img.setAttribute("src", `images/${selectedImg.classList[0]}`);
    square.appendChild(img);
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

function fixTable() {
    let size = document.querySelectorAll("#tabela > div").length - 1;
    for (let a = 1; a <= size; a++) {
        for (let b = 1; b <= size; b++){
            let div = document.querySelectorAll("#tabela > div")[a].querySelectorAll("div")[b]
            if (div.innerHTML == ""){
                div.style.background = "rgba(207, 31, 31, 0.5)";
                fillSquare(a,b);
            }else{
                div.style.background = "rgba(31, 207, 31, 0.5)";
            }
        }
    }
}

function updateTime() {
    time += 1;
    let y = time % 60;
    let x = Math.floor(time / 60);
    if (y < 10) {
        y = "0" + y;
    }
    if (x < 10) {
        x = "0" + x;
    }
    document.querySelector("#time").textContent =  x + ":" + y;
    if (!acabou){
        setTimeout(updateTime,1000);
    }
}
