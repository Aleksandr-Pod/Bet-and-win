import global from './globalData.js';
import {colorBetRef, numberBetRef, walletRef} from './refs.js';
import {makeBetAmount} from './wallet.js';
import {removeAccent} from './numberBetCancel.js';
import {numberBetCancel} from './numberBetCancel.js';
import {colorBetCancel} from './colorBetCancel.js';

global.money = 100;

colorBetRef.section.addEventListener('click', onColorBet);

export function onColorBet(evt) {
    const [color] = evt.target.className.split(' ');

    if (global.colorBet.amount) warningColorBetChange();

    if  (color !== 'red' && color !== 'black') {
        console.log('cancelling color bet');
        if (colorBetRef.red.classList.value.includes('animation')) colorBetCancel('red');
        if (colorBetRef.black.classList.value.includes('animation')) colorBetCancel('black');
        return;
    }
    betOnColor(color);
}
function warningColorBetChange() {
    walletRef.betMessage.textContent = "Cтавка на цвет ПОМЕНЯЕТСЯ !";
}
function betOnColor (color) {
    global.current.bet = color;
    colorBetRef.text.style.backgroundColor = "yellow";
    const colorText = color === "red" ? "красный" : "чёрный";
    colorBetRef.text.textContent = `Ставка на ${colorText}`;
    addAnimation(color);
    removeAnimation(color === 'red' ? 'black' : 'red');

    // выбрана ставка на цвет, пока отключим ставку на цифры
    numberBetRef.field.removeEventListener('click', onNumberBet);
    makeBetAmount();
    return;
}
function addAnimation(field) {
    colorBetRef[field].style.opacity = "100%";
    colorBetRef[field].classList.add("animation");
}
export function removeAnimation(field) {
    colorBetRef[field].style.opacity = "60%";
    colorBetRef[field].classList.remove("animation");
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
