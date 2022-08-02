function generateWindow(){
    setTable();
    setImages();
    animateMenu();
    initGame(Number(document.querySelector(".gamedificulty input[type='radio']:checked").getAttribute("data-number")));
}

//Criando a tabela das frutas .
function setTable(){
    document.querySelector("#gameOptions").style.display = "none";
    document.querySelector("#tabela").style.display = "block";
    document.querySelector("#menu").style.display = "flex";
    document.querySelector("#game").style.display = "block";


    let tamanho = document.querySelector(".gamedificulty input[type='radio']:checked").getAttribute("data-number");
    let size = 100 / tamanho;
    let divPai = document.querySelector("#tabela");
    let divs = document.querySelectorAll("#tabela div");
    divs.forEach(item => {
        divPai.removeChild(item);
    })

    for (let a = 0; a <= tamanho; a++) {
        let divContainer = document.createElement("div");
        divContainer.style.height = size + "%";

        for (let b = 0; b <= tamanho; b++) {
            let div = document.createElement("div");
            if (b > 0) {
                div.setAttribute("class", "divFruta");
                div.setAttribute("onclick", `checkMove(${a}, ${b})`);
            }
            if((b == 0 && a != 0) || (a == 0 && b != 0)){
                div.setAttribute("class", "imgContainer");
                div.style.background = "rgb(128,128,128)";
                div.style.zIndex=-1;
            }
            divContainer.appendChild(div);
        }
        divPai.appendChild(divContainer);
    }
}

//Adicionando imagens na tabela e no menu de frutas .
function setImages(){
    const images = ["images/banana.png", "images/cereja.png", "images/laranja.png", "images/maca.png", "images/macaVerde.png", "images/manga.png", "images/melancia.png", "images/nozes.png", "images/pera.png", "images/tomate.png", "images/umbu.png", "images/uva.png"];
    images.sort(()=> Math.random() - 0.5);
    let imgContainers = document.querySelectorAll(".imgContainer");
    const tamanho = document.querySelector(".gamedificulty input[type='radio']:checked").getAttribute("data-number");
    let cont = 0;

    // adicionando as frutas na tabela .
    imgContainers.forEach(item =>{
        let img = document.createElement("img");
        img.setAttribute("class", "imgIcon");
        img.setAttribute("src", images[cont % tamanho]);
        cont++;
        item.appendChild(img);
    })

    // Adicionando frutas ao menu .
    let menu = document.querySelector("#menu");
    menu.style.aspectRatio = `1 / ${1/(tamanho+1) * 10}`;
    for (let a = 0; a < tamanho; a++) {
        let img = document.createElement("img");
        img.style.width = 100 / tamanho + "%";
        img.setAttribute("class",`${images[a].replace("images/"," ")}`)
        img.setAttribute("value", `${a}`)
        img.setAttribute("src", images[a]);
        menu.appendChild(img);
    }
}

function animateMenu(){
    document.querySelector("#menu").addEventListener("click",(e) => {
        let images = document.querySelectorAll("#menu img");
        images.forEach(item => {
            item.classList.remove("active");
        })
        e.target.classList.add("active");
    })

}
