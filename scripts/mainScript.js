function setTable() {
    document.querySelector("#gameOptions").style.display = "none";
    document.querySelector("#tabela").style.display = "block";

    let tamanho = document.querySelector("input[type='radio']:checked").getAttribute("data-number");
    let size = 100 / tamanho;
    let divPai = document.querySelector("#tabela");
    let divs = document.querySelectorAll("#tabela div");
    divs.forEach(item => {
        divPai.removeChild(item);
    })

    for (let a = 0; a < tamanho; a++) {
        let divContainer = document.createElement("div");
        divContainer.style.height = size + "%";
        for (let b = 0; b < tamanho; b++) {
            let div = document.createElement("div");
            divContainer.appendChild(div);
        }
        divPai.appendChild(divContainer);
    }
}