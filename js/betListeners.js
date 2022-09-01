import { colorBetRef, numberBetRef } from "./refs.js";
import { onColorBet, onNumberBet } from "./App.js";

export const addBetListeners = () => {
    colorBetRef.section.addEventListener('click', onColorBet)
    numberBetRef.field.addEventListener('click', onNumberBet);
}
export const removeBetListeners = () => {
    colorBetRef.section.removeEventListener('click', onColorBet)
    numberBetRef.field.removeEventListener('click', onNumberBet);
}