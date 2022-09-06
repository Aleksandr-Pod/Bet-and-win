import global from "./globalData.js";
import { closeBetAmount } from "./wallet.js";
import { colorBetRef, walletRef } from "./refs.js";
import {addBetListeners} from "./betListeners.js";
import { removeAnimation } from "./App.js";

export const colorBetCancel = () => {
    global.current.bet = null;
    colorBetRef.text.textContent = "Делайте ставку !";
    colorBetRef.text.style.backgroundColor = "inherit";
    removeAnimation('red');
    removeAnimation('black');
    addBetListeners();
    walletRef.betMessage.textContent = "";
    closeBetAmount();
    return;
}
// function removeAnimation () {
//     colorBetRef.fieldBlack.classList.remove("animation");
//     colorBetRef.fieldRed.classList.remove("animation");
// }
// function setOpacity(value){
//     colorBetRef.fieldBlack.style.opacity = value;
//     colorBetRef.fieldRed.style.opacity = value;
// }