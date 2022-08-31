import global from "./globalData.js";
import { closeBetAmount } from "./wallet.js";
import { colorBetRef } from "./colorBetRef.js";

export const colorBetCancel = () => {
        global.current.bet = "";
        colorBetRef.text.textContent = "Делайте ставку !";
        colorBetRef.text.style.backgroundColor = "inherit";
        colorBetRef.fieldBlack.classList.remove("animation");
        colorBetRef.fieldRed.classList.remove("animation");
        colorBetRef.fieldBlack.style.opacity = "60%";
        colorBetRef.fieldRed.style.opacity = "60%";
        // numberBetRef.field.addEventListener('click', onNumberBet);
        closeBetAmount();
        return;
}