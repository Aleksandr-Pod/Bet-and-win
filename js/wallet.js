import global from './globalData.js';
import { numberBetCancel } from './numberBetCancel.js';
import {colorBetCancel} from './colorBetCancel.js';
import calcProcess from './process.js';
import { walletRef, modalRef } from './refs.js';
import { addBetListeners, removeBetListeners } from './betListeners.js';
import {roulette} from "./roulette.js";

function onWalletSubmit (evt) {
    evt.preventDefault();
    global.current.amount = parseInt(evt.currentTarget.elements[0].value);

    if (!global.current.amount) return;
    if (global.current.amount > global.money) {
        walletRef.inputText.textContent = `Это больше, чем у Вас есть !`;
        return;
    }
    if (global.current.amount <= 0) {
        walletRef.inputText.textContent = `сумма должна быть больше нуля !`;
        return;
    }
    walletRef.input.classList.add("visually-hidden");
    walletRef.amountSubmit.classList.add("visually-hidden");
    walletRef.inputText.textContent = `${global.current.amount} монет на ${global.current.bet}:`;    
    walletRef.wallet.removeEventListener('submit', onWalletSubmit);
    walletRef.start.disabled = true;
    removeBetListeners();
    
    walletRef.confirmation.classList.remove("visually-hidden");
    walletRef.confirmation.addEventListener('click', betAmountConfirm);
    return;
}
function betAmountConfirm(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== "BUTTON") return;
    if (evt.target.textContent !== "ок") {
        // set to initialState
        walletRef.confirmation.removeEventListener('click', betAmountConfirm);
        walletRef.start.disabled = false;

        hideInput()
        global.current = {bet: "", amount: 0};
        console.log("Сброс текущей ставки..", global.current)
        addBetListeners();
        numberBetCancel();
        colorBetCancel();
        closeBetAmount();
        return;
    }
    global.money -= global.current.amount;
    walletRef.money.textContent = `${global.money}`;
    walletRef.start.disabled = false;
    // start eventListenet only at first.
    if (!(global.colorBet.amount || global.numberBet[0]?.amount)) {
        console.log("start - add listener ..")
        walletRef.start.addEventListener('click', begin);
    }

    const {bet, amount} = global.current;
    if (typeof(bet) === "string") {
        global.colorBet = {bet, amount};
        walletRef.betColorResult.innerHTML = `Ставка  принята: <b>${global.current.amount}</b> монет
        на цвет <span class="selectedBet ${bet}"></span>`;
    } else {
        global.numberBet.push({bet, amount});
        walletRef.betResult.insertAdjacentHTML("afterbegin", `<li>Ставка  принята: <b>${global.current.amount}</b> монет
        на число <span class="bet-result-number">${bet}</span></li>`);
    }

    hideInput();
    walletRef.confirmation.classList.add("visually-hidden");
    walletRef.confirmation.removeEventListener('click', betAmountConfirm);
    walletRef.input.classList.remove("visually-hidden");
    walletRef.start.classList.remove("visually-hidden");
    numberBetCancel();
    colorBetCancel();
    closeBetAmount();
    return;
}

const begin = (e) => {
    (e).preventDefault();
    walletRef.start.removeEventListener('click', begin);
    removeBetListeners();
    walletRef.start.classList.add("visually-hidden");
    modalRef.layout.classList.remove("visually-hidden");
    roulette();
    setTimeout(() => {
        modalRef.closeBtn.addEventListener('click', closeModal);
        modalRef.result.classList.add("animation");
        calcProcess ();
    }, 9500);    
}

function closeModal () {
    walletRef.betResult.innerHTML = "";
    walletRef.betColorResult.innerHTML = "",
    walletRef.money.textContent = `${global.money}`;
    modalRef.layout.classList.add("visually-hidden");
    modalRef.closeBtn.removeEventListener('click', closeModal);
    modalRef.winCalc.innerHTML = "";
    modalRef.result.classList.remove("animation");
    global.colorBet = {};
    global.numberBet = [];
    global.current = {};
    addBetListeners();
}

const hideInput = () => {
    walletRef.inputText.textContent = "Введите сумму ставки:";
    walletRef.betAmount.classList.add("visually-hidden");
}

export const makeBetAmount = () => {
    walletRef.betAmount.classList.remove("visually-hidden");
    walletRef.amountSubmit.classList.remove("visually-hidden");
    walletRef.betAmount.addEventListener('submit', onWalletSubmit);
    walletRef.input.focus();
}

export const closeBetAmount = () => {
    walletRef.betAmount.classList.add("visually-hidden");
    walletRef.betAmount.removeEventListener('submit', onWalletSubmit);
    walletRef.confirmation.classList.add("visually-hidden");
}
