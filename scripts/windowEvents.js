/*Essa função muda a variavel cor da página , modifica o tamanho do main (com o redimensionar da janela) e reinicia a página*/

window.addEventListener("resize",resizewindow);
window.addEventListener("load",resizewindow);

function resizewindow() {
    document.querySelector("main").style.minHeight=`calc(100% - ${document.querySelector("header").clientHeight}px)`
    document.querySelector("main").style.top = document.querySelector("header").clientHeight+"px";
};



let colors = ["#f25c5c","#d83f3f","#5fbf32","#53af25","#ffc850","#feb744"];
let index = 0;

function changeColor() {
    document.documentElement.style.setProperty("--gamemode",colors[index]);
    index += 1;
    if (index > 5) {index = 0}
    setTimeout(changeColor,3500);
}
setTimeout(changeColor,3500);

document.querySelector("header button").addEventListener("click",() => {
    window.location.href = "index.html";
})