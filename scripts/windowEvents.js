window.addEventListener("resize",resizewindow);
window.addEventListener("load",resizewindow);

function resizewindow() {
    document.querySelector("main").style.minHeight=`calc(100% - ${document.querySelector("header").clientHeight}px)`
    document.querySelector("main").style.top = document.querySelector("header").clientHeight+"px";
};
