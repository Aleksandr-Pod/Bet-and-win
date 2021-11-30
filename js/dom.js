//            Ставка на цвет:
let colorBet = "";
const fieldRed = document.querySelector(".red");
fieldRed.addEventListener('click', betOnRed);
const fieldBlack = document.querySelector(".black");
fieldBlack.addEventListener('click', betOnBlack);
const fieldCancel = document.querySelector(".cancel");
fieldCancel.addEventListener('click', colorBetCancel);

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

function colorBetCancel() {
    colorBet = "";
    document.querySelector(".bet").textContent = "Делайте ставку !"
    fieldBlack.classList.remove("animation");
    fieldRed.classList.remove("animation");
    fieldBlack.style.opacity = "60%";
    fieldRed.style.opacity = "60%";
}