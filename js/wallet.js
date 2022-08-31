import {colorBetCancel} from './colorBetCancel.js';
import global from './globalData.js';
import { numberBetCancel } from './numberBetCancell.js';
import start from './process.js';
import { walletRef } from './walletRef.js';

function onWalletSubmit (evt) {
    evt.preventDefault();
    global.current.amount = parseInt(evt.currentTarget.elements[0].value);

    if (!global.current.amount) return;
    if (global.current.amount > global.money) {
        walletRef.inputText.textContent = `Это больше, чем у Вас есть !!!`;
        return;
    }
    walletRef.input.classList.add("visually-hidden");
    walletRef.inputText.textContent = `Сумма ставки ${global.current.amount} монет, подтвердите..`;    
    walletRef.wallet.removeEventListener('submit', onWalletSubmit);

    walletRef.confirmation.classList.remove("visually-hidden");
    walletRef.confirmation.addEventListener('click', betAmountConfirm);
    return;
}
function betAmountConfirm(evt, bet, amount) {
    evt.preventDefault();
    if (evt.target.nodeName !== "BUTTON") return;
    if (evt.target.textContent !== "OK") {
        // set to initialState
        walletRef.confirmation.removeEventListener('click', betAmountConfirm);
        hideInput()
        global.current = {bet: "", amount: 0};
        console.log("Сброс текущей ставки..", global.current)
        numberBetCancel();
        colorBetCancel();
        closeBetAmount();
        return;
    }

    global.money -= global.current.amount;
    let x = "";
    if (typeof(global.current.bet) === "string") {
        x = `цвет ${global.current.bet}`;
        global.colorBet = global.current;
        console.log("global after", global);
    } else {
        x = `число ${global.current.bet}`;
        global.numberBet.push(global.current);
        console.log("global after", global);
    }

    walletRef.money.textContent = `${global.money} монет`;
  
    walletRef.betResult.insertAdjacentHTML("afterbegin", `<li>Ставка  принята: ${global.current.amount} монет
    на ${x}</li>`);
    hideInput();
    walletRef.confirmation.classList.add("visually-hidden");
    walletRef.confirmation.removeEventListener('click', betAmountConfirm);
    walletRef.input.classList.remove("visually-hidden");
    walletRef.start.classList.remove("visually-hidden");
    walletRef.start.addEventListener('click', begin);

    // walletRef.betResult = "";
    // global.numberBet = [];
    // global.colorBet = {};
    // global.current = {};
    return;
}

const begin = () => {
    start ();
    walletRef.start.removeEventListener('click', begin);
    walletRef.start.classList.add("visually-hidden");
}

const hideInput = () => {
    walletRef.inputText.textContent = "Введите сумму ставки:";
    walletRef.betAmount.classList.add("visually-hidden");
}

export const makeBetAmount = () => {
    walletRef.betAmount.classList.remove("visually-hidden");
    walletRef.wallet.addEventListener('submit', onWalletSubmit);
    return;
}

export const closeBetAmount = () => {
    walletRef.betAmount.classList.add("visually-hidden");
    walletRef.wallet.removeEventListener('submit', onWalletSubmit);
    walletRef.confirmation.classList.add("visually-hidden");
}
