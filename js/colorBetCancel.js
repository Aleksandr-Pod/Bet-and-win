import global from "./globalData.js";
import { removeBetAmountField } from "./wallet.js";
import { colorBetRef, walletRef } from "./refs.js";
import {addBetListeners} from "./betListeners.js";
import { removeAnimation } from "./App.js";

export const colorBetCancel = (color) => {
    colorBetRef.text.textContent = "Делайте ставку !";
    colorBetRef.text.style.backgroundColor = "rgba(0, 255, 255, 0.3)";
    removeAnimation(color);
    // removeAnimation(color);
    addBetListeners();
    walletRef.betMessage.textContent = "";
    removeBetAmountField();
    global.current = {};
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