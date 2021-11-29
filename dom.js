//            Example - 1
// const menuItem = document.querySelector(".menu-item1");
// console.log(menuItem.textContent);
// menuItem.textContent = "Hello";
// menuItem.classList.add("greating"); // Добавляем класс "greating"
// console.log(menuItem.classList); // "menu-item1 greating"
// menuItem.style.backgroundColor = "teal";

//            Ставка на цвет:
let colorBet = "";
const fieldRed = document.querySelector(".red");
fieldRed.addEventListener('click', betOnRed);
const fieldBlack = document.querySelector(".black");
fieldBlack.addEventListener('click', betOnBlack);

function betOnRed () {
    colorBet = "red";
    document.querySelector(".bet").textContent = "Ставка на красный";
    fieldRed.style.opacity = "100%";
    fieldRed.classList.add("animation");
    fieldBlack.style.opacity = "60%";
    fieldBlack.classList.remove("animation");
}

function betOnBlack () {
    colorBet = "black";
    document.querySelector(".bet").textContent = "Ставка на чёрный";
    fieldBlack.style.opacity = "100%";
    fieldBlack.classList.add("animation"); // название класса без точки !
    fieldRed.style.opacity = "60%";
    fieldRed.classList.remove("animation");
}