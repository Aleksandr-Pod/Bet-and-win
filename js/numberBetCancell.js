import global from "./globalData.js";
import { colorBetRef } from "./colorBetRef.js";
import { numberBetRef } from "./numberBetRef.js";
import { removeAccent } from "./removeAccent.js";
import { onColorBet } from "./App.js";
import { walletRef } from "./walletRef.js";

export const numberBetCancel = () => {
    removeAccent();
    global.current.bet = 0;
    numberBetRef.text.textContent = "Делайте ставку !"
    numberBetRef.text.style.backgroundColor = "inherit";
    walletRef.input.classList.remove("visually-hidden");
    colorBetRef.section.addEventListener('click', onColorBet);
}
