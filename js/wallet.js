import colorBetCancel from './colorBetCancel.js';
import global from './globalData.js';
import { numberBetCancel } from './numberBetCancell.js';
import start from './process.js';
import { walletRef } from './walletRef.js';

function onWalletSubmit (evt) {
    evt.preventDefault();
    global.current.amount = parseInt(evt.currentTarget.elements[0].value);
    console.log('onWalletSubmit:', global);

    if (!global.current.amount) return;
    if (global.current.amount > global.money) {
        walletRef.inputText.textContent = `Это больше, чем у Вас есть !!!`;
        return;
    }
    walletRef.input.classList.add("visually-hidden");
    walletRef.inputText.textContent = `Сумма ставки ${global.current.amount} денег`;    
    walletRef.wallet.removeEventListener('submit', onWalletSubmit);

    walletRef.confirmation.classList.remove("visually-hidden");
    walletRef.confirmation.addEventListener('click', betAmountConfirm);
    return;
}
function betAmountConfirm(evt) {
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
    console.log('Global перед вычитания суммы денег', global)
    global.money = global.money - global.current.amount;
    console.log('Global на момент вычитания суммы денег', global)
    let x = "";
    if (typeof(global.current.bet) === "string") {
        x = `цвет ${global.current.bet}`;
        global.colorBet = global.current;
    } else {
        x = `число ${global.current.bet}`;
        console.log("global before", global);
        global.numberBet.push(global.current);
        console.log("global after", global);
    }

    walletRef.money.textContent = `${global.money} монет`;
    walletRef.betResult.textContent = `Ставка  принята: ${global.current.amount} монет
    на ${x}`;
    hideInput();
    walletRef.confirmation.classList.add("visually-hidden");
    walletRef.confirmation.removeEventListener('click', betAmountConfirm);
    start();
    walletRef.betResult = "";
    global.numberBet = [];
    global.colorBet = {};
    global.current = {};
    return;
}

const hideInput = () => {
    walletRef.inputText.textContent = "Введите сумму ставки:";
    walletRef.input.classList.add("visually-hidden");
}

export const makeBetAmount = (colorBetCancel) => {
    walletRef.betAmount.classList.remove("visually-hidden");

    walletRef.wallet.addEventListener('submit', onWalletSubmit);
    return;
}

export const closeBetAmount = () => {
    walletRef.betAmount.classList.add("visually-hidden");
    walletRef.wallet.removeEventListener('submit', onWalletSubmit);
    walletRef.confirmation.classList.add("visually-hidden");
}
