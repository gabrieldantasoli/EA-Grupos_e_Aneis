function generateWindow(){
    setTable();
    setImages();
}

function setTable(){
    document.querySelector("#gameOptions").style.display = "none";
    document.querySelector("#tabela").style.display = "block";

    let tamanho = document.querySelector("input[type='radio']:checked").getAttribute("data-number");
    let size = 100 / tamanho;
    let divPai = document.querySelector("#tabela");
    let divs = document.querySelectorAll("#tabela div");
    divs.forEach(item => {
        divPai.removeChild(item);
    })

    let divContainer = document.createElement("div");
    divContainer.style.height = size + "%";
    let div = document.createElement("div");
    divContainer.appendChild(div);

    for (let a = 0; a <= tamanho; a++) {
        let divContainer = document.createElement("div");
        divContainer.style.height = size + "%";

        for (let b = 0; b <= tamanho; b++) {
            let div = document.createElement("div");
            if((b == 0 && a != 0) || (a == 0 && b != 0)){
                div.setAttribute("class", "imgContainer")
            }
            divContainer.appendChild(div);
        }
        divPai.appendChild(divContainer);
    }
}

function setImages(){
    const images = ["images/banana.png", "images/cereja.png", "images/laranja.png", "images/maca.png", "images/macaVerde.png", "images/manga.png", "images/melancia.png", "images/nozes.png", "images/pera.png", "images/tomate.png", "images/umbu.png", "images/uva.png"];
    images.sort(()=> Math.random() - 0.5);
    let imgContainers = document.querySelectorAll(".imgContainer");
    const tamanho = document.querySelector("input[type='radio']:checked").getAttribute("data-number");
    let cont = 0;
    imgContainers.forEach(item =>{
        let img = document.createElement("img");
        img.setAttribute("class", "imgIcon")
        img.setAttribute("src", images[cont % tamanho]);
        cont++;
        item.appendChild(img);
    })
}
