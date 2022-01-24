//            Казино

let colorBet = "";
let numberBet = 0;
let money = 100;
let betAmount = 0;

const colorBetRef = {
    text: document.querySelector(".bet-text"),
    fieldRed: document.querySelector(".red"),
    fieldBlack: document.querySelector(".black"),
    fieldCancel: document.querySelector(".cancel"),
    section: document.querySelector(".colorBetSection")
}
const walletRef = {
    wallet: document.querySelector(".wallet"),
    walletBet: document.querySelector(".betAmount"),
    money: document.querySelector(".money"),
    input: document.querySelector("input"),
    confirmation: document.querySelector(".confirmation"),
    inputText: document.querySelector(".wallet-input-text")
}
colorBetRef.section.addEventListener('click', onColorBet);

function onColorBet(evt) {
    const className = evt.target.className;
    switch (className) {
        case "red colorBet":
            betOnRed.call(colorBetRef, "red");
            break;
        case "black colorBet":
            betOnBlack();
            break;
        default:
            makeBetAmountBack();
    } // Можно сделать одну функцию обработки ставки!
}
function betOnRed () {
    colorBet = "red";
    this.text.textContent = "Ставка на красный";
    this.text.style.backgroundColor = "yellow";
    this.fieldRed.style.opacity = "100%";
    this.fieldRed.classList.add("animation");
    this.fieldBlack.style.opacity = "60%";
    this.fieldBlack.classList.remove("animation");
    numberBetRef.field.removeEventListener('click', onNumberBet);
    makeBetAmount("300px", "250px");
    return;
}

function betOnBlack () {
    colorBet = "black";
    colorBetRef.text.textContent = "Ставка на чёрный";
    colorBetRef.text.style.backgroundColor = "yellow";
    colorBetRef.fieldBlack.style.opacity = "100%";
    colorBetRef.fieldBlack.classList.add("animation"); // название класса без точки !
    colorBetRef.fieldRed.style.opacity = "60%";
    colorBetRef.fieldRed.classList.remove("animation");
    numberBetRef.field.removeEventListener('click', onNumberBet);
    makeBetAmount("300px", "250px");
    return;
}

function colorBetCancel() {
    colorBet = "";
    colorBetRef.text.textContent = "Делайте ставку !";
    colorBetRef.text.style.backgroundColor = "inherit";
    colorBetRef.fieldBlack.classList.remove("animation");
    colorBetRef.fieldRed.classList.remove("animation");
    colorBetRef.fieldBlack.style.opacity = "60%";
    colorBetRef.fieldRed.style.opacity = "60%";
    numberBetRef.field.addEventListener('click', onNumberBet);
    return;
}
function makeBetAmount (top, left) {
    walletRef.wallet.classList.remove("visually-hidden");
    walletRef.wallet.style.top = `${top}`;
    walletRef.wallet.style.left =`${left}`;
    walletRef.wallet.addEventListener('submit', onWalletSubmit);
    return;
}
function makeBetAmountBack() {
    walletRef.wallet.classList.add("visually-hidden");
    walletRef.wallet.removeEventListener('submit', onWalletSubmit);
    betAmount = 0;
    walletRef.inputText.classList.remove("visually-hidden");
    walletRef.input.classList.remove("visually-hidden");
    walletRef.confirmation.classList.add("visually-hidden");
    walletRef.walletBet.textContent = "";
    colorBetCancel();
    numberBetCancel();
    return;
}
function onWalletSubmit (evt) {
    evt.preventDefault();
    betAmount = parseInt(evt.currentTarget.elements[0].value);

    if (betAmount > money) {
        walletRef.walletBet.textContent = `Это больше, чем у Вас есть !!!`;
        return;
    }
    if (!betAmount) return;
    walletRef.inputText.classList.add("visually-hidden");
    walletRef.walletBet.textContent = `Сумма ставки ${betAmount} денег`;    
    walletRef.wallet.removeEventListener('submit', onWalletSubmit);
    walletRef.input.classList.add("visually-hidden");
    walletRef.confirmation.classList.remove("visually-hidden");
    walletRef.confirmation.addEventListener('click', betAmountConfirm);
    evt.currentTarget.reset();
  
    return;
}
function betAmountConfirm(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== "BUTTON") {
        return;
    }
    if (evt.target.textContent !== "OK") {
        walletRef.confirmation.removeEventListener('click', betAmountConfirm);
        makeBetAmountBack();
        return;
    }
    money -= betAmount;
    let x;
    colorBet ? x = `цвет ${colorBet}` : x = `число ${numberBet}`;
    walletRef.wallet.classList.add("animation");
    walletRef.money.textContent = `${money} денег`;
    walletRef.walletBet.textContent = `Ставка  принята: ${betAmount} денег
    на ${x} `;
    walletRef.confirmation.classList.add("visually-hidden");
    walletRef.confirmation.removeEventListener('click', betAmountConfirm);

    setTimeout(gameInProcess, 3000);
    return;
}
function gameInProcess() {
    walletRef.wallet.classList.remove("animation");
    console.log("colorBet - ", colorBet);
    console.log("numberBet - ", numberBet);
    console.log("BetAmount - ", betAmount);
    console.log("Осталось денег - ", money)
    makeBetAmountBack();
    console.log("Выпала цифра 15 !!!"); // Тут случайно выпадает цифра !!!
    // Идёт расчёт выигрыша
    return;
}


const numberBetRef = {
    field: document.querySelector(".numberBet-field"),
    text: document.querySelector(".numberBet-text"),
}
//        Генерируем поле цифр
const numbers = [];
for (i = 1; i <= 37; i++) {
    const numberEl = document.createElement("button");
    numberEl.textContent = i;
    numberEl.classList.add("numberBet", `n${i}`);
    numbers.push(numberEl)
}
numberBetRef.field.append(...numbers);
//        Поле Cancel
numberCancel = document.querySelector(".n37")
numberCancel.style.width = "420px";
numberCancel.style.backgroundColor = "goldenrod";
numberCancel.textContent = "Отменить ставку на число";

//         Слушаем поле цифр
numberBetRef.field.addEventListener('click', onNumberBet);

function onNumberBet(evt) {
    if (evt.target.nodeName !== "BUTTON") {
        return;
    }
    removeAccent();
    if (evt.target.classList.contains("n37")) {
        makeBetAmountBack();
        return;
    }else {
        numberBet = (parseInt(evt.target.textContent));
        evt.target.classList.add("accent");
        numberBetRef.text.textContent = `Ставка на число: ${numberBet}`;
        numberBetRef.text.style.backgroundColor = "yellow";
    }
    colorBetRef.section.removeEventListener('click', onColorBet);
    makeBetAmount("50px", "250px");
    return;
}
function removeAccent() {
    const withAccent = document.querySelector(".accent");
    withAccent?.classList.remove("accent");
    return;
}
function numberBetCancel() {
    removeAccent();
    numberBet = 0;
    numberBetRef.text.textContent = "Делайте ставку !"
    numberBetRef.text.style.backgroundColor = "inherit";
        colorBetRef.section.addEventListener('click', onColorBet);
}
