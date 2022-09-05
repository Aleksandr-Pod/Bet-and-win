import global from './globalData.js';
import {colorBetRef, numberBetRef, walletRef} from './refs.js';
import {makeBetAmount, closeBetAmount} from './wallet.js';
import {removeAccent} from './numberBetCancel.js';
import {numberBetCancel} from './numberBetCancel.js';
import {colorBetCancel} from './colorBetCancel.js';

global.money = 100;

colorBetRef.section.addEventListener('click', onColorBet);

export function onColorBet(evt) {
    const color = evt.target.className;

    if (global.colorBet.amount) changeColorBet();
    switch (color) {
        case "red colorBet":
            betOnRed.call(colorBetRef, "red");
            break;
        case "black colorBet":
            betOnBlack();
            break;
        default:
            colorBetCancel();
    } // Можно сделать одну функцию обработки ставки!
}
function changeColorBet() {
    console.log("global.colorBet", global.colorBet);
    walletRef.betMessage.textContent = "Cставка на цвет ПОМЕНЯЕТСЯ !";
}

function betOnRed (colorBetCancel) {
    global.current.bet = "red";
    this.text.textContent = "Ставка на красный";
    this.text.style.backgroundColor = "yellow";
    this.fieldRed.style.opacity = "100%";
    this.fieldRed.classList.add("animation");
    this.fieldBlack.style.opacity = "60%";
    this.fieldBlack.classList.remove("animation");
    numberBetRef.field.removeEventListener('click', onNumberBet);
    makeBetAmount();
    return;
}

function betOnBlack (colorBetCancel) {
    global.current.bet = "black";
    colorBetRef.text.textContent = "Ставка на чёрный";
    colorBetRef.text.style.backgroundColor = "yellow";
    colorBetRef.fieldBlack.style.opacity = "100%";
    colorBetRef.fieldBlack.classList.add("animation"); // название класса без точки !
    colorBetRef.fieldRed.style.opacity = "60%";
    colorBetRef.fieldRed.classList.remove("animation");
    numberBetRef.field.removeEventListener('click', onNumberBet);
    makeBetAmount();
    return;
}
//        Генерируем поле цифр
const numbers = [];
for (let i = 1; i <= 37; i++) {
    const numberEl = document.createElement("button");
    numberEl.textContent = i;
    numberEl.classList.add("numberBet", `n${i}`);
    numbers.push(numberEl)
}
numberBetRef.field.append(...numbers);
//        Поле Cancel
const numberCancel = document.querySelector(".n37")
numberCancel.style.width = "420px";
numberCancel.style.backgroundColor = "goldenrod";
numberCancel.textContent = "Отменить ставку на число";

//         Слушаем поле цифр
numberBetRef.field.addEventListener('click', onNumberBet);

export function onNumberBet(evt) {
    if (evt.target.nodeName !== "BUTTON") return;
    removeAccent();
    if (evt.target.classList.contains("n37")) {
        closeBetAmount();
        numberBetCancel();
        return;
    } else {
        global.current = {bet: (parseInt(evt.target.textContent))};
        evt.target.classList.add("accent");
        numberBetRef.text.textContent = `Ставка на число: ${global.current.bet}`;
        numberBetRef.text.style.backgroundColor = "yellow";
    }
    // выбрана ставка на цифру, пока отключим ставку на цвет
    colorBetRef.section.removeEventListener('click', onColorBet);
    makeBetAmount();
    return;
}
