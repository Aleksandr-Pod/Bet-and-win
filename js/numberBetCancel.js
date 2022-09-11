import global from "./globalData.js";
import { walletRef, numberBetRef } from "./refs.js";
import { removeBetAmountField } from "./wallet.js";
import {addBetListeners} from "./betListeners.js";

export const numberBetCancel = () => {
    removeAccent();
    numberBetRef.text.textContent = "Делайте ставку !"
    numberBetRef.text.style.backgroundColor = "rgba(0, 255, 255, 0.3)";
    addBetListeners();
    removeBetAmountField();
}
export const removeAccent = () => {
    const withAccent = document.querySelector(".accent");
    withAccent?.classList.remove("accent");
    return;
}