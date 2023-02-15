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
    
    removeBetAmountField();
    walletRef.btnConfirm.focus();
    walletRef.betAmount.removeEventListener('submit', onWalletSubmit);
    walletRef.confirmText.textContent = `${global.current.amount} монет на ${global.current.bet}:`;    
    walletRef.start.disabled = true;
    removeBetListeners();
    showConfirmation();
    return;
}
function betAmountConfirm(evt) {

    if (evt.target.nodeName !== "BUTTON") return;
    if (evt.target.textContent !== "ок") {
        // set to initialState
        walletRef.confirmation.removeEventListener('click', betAmountConfirm);
        walletRef.start.disabled = false;
        if (typeof(global.current.bet) === "string") colorBetCancel(global.current.bet);
        if (typeof(global.current.bet) === "number") numberBetCancel(global.current.bet);
        hideConfirmation();
        walletRef.inputText.textContent = "Введите сумму ставки:";
        global.current = {};
        return;
    }
    // если ставка на цвет уже была и снова сумма на цвет ..
    if (global.colorBet.bet && typeof(global.current.bet) === 'string'){
        global.money += global.colorBet.amount;
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
        colorBetCancel(bet);
    } else {
        global.numberBet.push({bet, amount});
        walletRef.betResult.insertAdjacentHTML("afterbegin", `<li>Ставка  принята: <b>${global.current.amount}</b> монет
        на число <span class="bet-result-number">${bet}</span></li>`);
        numberBetCancel();
    }

    hideConfirmation();
    walletRef.start.classList.remove("visually-hidden");
    walletRef.inputText.textContent = "Введите сумму ставки:";
    return;
}

const begin = (e) => {
    // (e).preventDefault();
    walletRef.start.removeEventListener('click', begin);
    removeBetListeners();
    walletRef.start.classList.add("visually-hidden");
    modalRef.layout.classList.remove("visually-hidden");
    roulette();
    setTimeout(() => {
        modalRef.closeBtn.addEventListener('click', closeModal);
        modalRef.result.classList.add("animation");
        calcProcess ();
    }, 5000);    
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

export const makeBetAmount = () => {
    walletRef.betAmount.classList.remove("visually-hidden");
    walletRef.betAmount.addEventListener('submit', onWalletSubmit);
    walletRef.input.focus();
}

export const removeBetAmountField = () => {
    walletRef.betAmount.classList.add("visually-hidden");
    walletRef.betAmount.removeEventListener('submit', onWalletSubmit);
} 
const showConfirmation = () => {
    walletRef.confirmation.classList.remove("visually-hidden");
    walletRef.confirmation.addEventListener('click', betAmountConfirm);
}
const hideConfirmation = () => {
    walletRef.confirmation.classList.add("visually-hidden");
    walletRef.confirmation.removeEventListener('click', betAmountConfirm);
}