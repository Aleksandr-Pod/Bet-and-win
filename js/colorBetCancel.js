import global from "./globalData.js";
import { closeBetAmount } from "./wallet.js";
import { colorBetRef, walletRef } from "./refs.js";
import {addBetListeners} from "./betListeners.js"

export const colorBetCancel = (onNumberBet) => {
    global.current.bet = null;
    colorBetRef.text.textContent = "Делайте ставку !";
    colorBetRef.text.style.backgroundColor = "inherit";
    removeAnimation();
    setOpacity("60%");
    addBetListeners();
    walletRef.betMessage.textContent = "";
    closeBetAmount();
    return;
}
function removeAnimation () {
    colorBetRef.fieldBlack.classList.remove("animation");
    colorBetRef.fieldRed.classList.remove("animation");
}
function setOpacity(value){
    colorBetRef.fieldBlack.style.opacity = value;
    colorBetRef.fieldRed.style.opacity = value;
}