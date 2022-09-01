import global from "./globalData.js";
import { walletRef, numberBetRef } from "./refs.js";
import {addBetListeners} from "./betListeners.js";

export const numberBetCancel = () => {
    removeAccent();
    global.current.bet = null;
    numberBetRef.text.textContent = "Делайте ставку !"
    numberBetRef.text.style.backgroundColor = "inherit";
    walletRef.input.classList.remove("visually-hidden");
    addBetListeners();
}
export const removeAccent = () => {
    const withAccent = document.querySelector(".accent");
    withAccent?.classList.remove("accent");
    return;
}