let toDiscover = 0
function initGame(size){
    toDiscover = size ** 2
}

function xor(a, b){
    return a ^ b;
}

function checkMove(x, y){
    let divs = document.querySelectorAll('#tabela > div');
    let row = divs[x]
    let square = row.childNodes[y]
    let selectedImg = document.querySelector("#menu .active")

    if(!selectedImg) return;
    if(square.childNodes.length > 0) return;

    if(xor(x - 1, y - 1) != Number(selectedImg.attributes.value.nodeValue)){
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
