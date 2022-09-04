import global from './globalData.js';
import { modalRef } from './refs.js';

export default function calcProcess() {

    let win = 0;
// numbers win calculations
    global.numberBet.forEach(el => {
        if (el.bet === global.results.result) {
            win =  el.amount*10;
            setTimeout(() => {
                modalRef.winCalc.insertAdjacentHTML=('afterbegin', `<p>Поздравляем, вы выиграли ${win} монет !!!</p>`);
            }, 1000)
            global.money += win;
                // красиво отрисовать прибавление денег
        }
    })
// color win calculations
    if (global.colorBet.bet === global.results.colorResult) {
        win = global.colorBet.amount*2;
        modalRef.winCalc.insertAdjacentHTML('afterbegin', `<p>Поздравляем, вы выиграли ${win} монет !!!</p>`);
        global.money += win;
            // красиво отрисовать прибавление денег
    }
    if (win === 0) modalRef.winCalc.insertAdjacentHTML(
        'afterbegin', `<p>Попробуйте ещё раз, вам обязательно повезёт !</p>`
    )
    return;
}
function showNumber (result) {
    console.log("showNumber")
    const colorResult = ( result & 1 ) ? "red" : "black";
    modalRef.result.innerHTML = `<p class="results-color" class=${colorResult}>${result}</p>`;
} 
function hideNumber () {
    modalRef.result.innerHTML = ``;
}