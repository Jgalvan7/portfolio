const btnBurgerMenu = document.querySelector("#burgerMenu");
const btnCloseMenu = document.querySelector("#closeMenu");
const navList = document.querySelector(".nav__list");
const navIcon = document.querySelector(".nav__icon");
const resScreen = window.screen.width;
let menuCheck = false;

if(menuCheck === false) {
    menuCheck = true;
    if(resScreen < 992) {
        addRemoveClass(navList, "hidden");
    } else {
        addRemoveClass(navIcon, "hidden");
    }
}

function openCloseMenu() {
    addRemoveClass(btnBurgerMenu, "hidden");
    addRemoveClass(btnCloseMenu, "hidden");
    addRemoveClass(btnCloseMenu, "closeMenu");
    addRemoveClass(navList, "hidden");
}

function addRemoveClass(etiqueta, clase) {
    etiqueta.classList.contains(clase) ? etiqueta.classList.remove(clase) : etiqueta.classList.add(clase);
}