import global from './globalData.js';
import { numberBetCancel } from './numberBetCancel.js';
import {colorBetCancel} from './colorBetCancel.js';
import start from './process.js';
import { walletRef, modalRef } from './refs.js';
import { addBetListeners, removeBetListeners } from './betListeners.js';

function onWalletSubmit (evt) {
    evt.preventDefault();
    global.current.amount = parseInt(evt.currentTarget.elements[0].value);

    if (!global.current.amount) return;
    if (global.current.amount > global.money) {
        walletRef.inputText.textContent = `Это больше, чем у Вас есть !!!`;
        return;
    }
    walletRef.input.classList.add("visually-hidden");
    walletRef.inputText.textContent = `${global.current.amount} монет на ${global.current.bet}, подтвердите..`;    
    walletRef.wallet.removeEventListener('submit', onWalletSubmit);
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

    // start eventListenet only at first.
    if (!(global.colorBet.amount || global.numberBet[0]?.amount)) {
        console.log("start - add listener ..")
        walletRef.start.addEventListener('click', begin);
    }

    const {bet, amount} = global.current;
    if (typeof(bet) === "string") {
        global.colorBet = {bet, amount};
        console.log("global.colorBet:", global.colorBet)
        walletRef.betColorResult.innerHTML = `Ставка  принята: ${global.current.amount} монет
        на цвет <span class="selectedBet ${bet}"></span>`;
    } else {
        global.numberBet.push({bet, amount});
        walletRef.betResult.insertAdjacentHTML("afterbegin", `<li>Ставка  принята: ${global.current.amount} монет
        на число <span class="results-number">${bet}</span></li>`);
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
    removeBetListeners();
    walletRef.start.classList.add("visually-hidden");
    modalRef.layout.classList.remove("visually-hidden");
    modalRef.closeBtn.addEventListener('click', closeModal);
    start ();
    
    // setTimeout(() => {
    //     walletRef.betResult.innerHTML = "";
    //     walletRef.betColorResult.innerHTML = "",
    //     walletRef.money.textContent = `${global.money} `;
    //     modalRef.layout.classList.add("visually-hidden");
    //     modalRef.closeBtn.removeEventListener('click', closeModal);
    //     modalRef.winCalc.innerHTML = "";
    //     global.colorBet = {};
    //     global.numberBet = [];
    //     global.current = {};
    //     addBetListeners();
    //     return;
    // }, 5000);
}
function closeModal () {
    walletRef.betResult.innerHTML = "";
    walletRef.betColorResult.innerHTML = "",
    walletRef.money.textContent = `${global.money} `;
    modalRef.layout.classList.add("visually-hidden");
    modalRef.closeBtn.removeEventListener('click', closeModal);
    modalRef.winCalc.innerHTML = "";
    modalRef.colorRes.classList.remove(`${global.results.colorResult}`);
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
    if (walletRef.betAmount.classList.contains("visually-hidden")) {
        walletRef.betAmount.classList.remove("visually-hidden");
        walletRef.wallet.addEventListener('submit', onWalletSubmit);
        walletRef.input.focus();
        // removeBetListeners();
    }
    return;
}

export const closeBetAmount = () => {
    walletRef.betAmount.classList.add("visually-hidden");
    walletRef.wallet.removeEventListener('submit', onWalletSubmit);
    walletRef.confirmation.classList.add("visually-hidden");
    // addBetListeners()
}
