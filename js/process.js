import global from './globalData.js';
import { modalRef } from './refs.js';

export default function start() {
    const result = Math.floor(Math.random()*37);
    // const result = 2;
    modalRef.numRes.textContent = `${result}`;
    const colorResult = ( result & 1 ) ? "red" : "black";
    modalRef.colorRes.textContent = `${colorResult}`;
    modalRef.colorRes.classList.add(`${colorResult}`);

    let win = 0;
// numbers win calculations
    global.numberBet.forEach(el => {
        if (el.bet === result) {
            win =  el.amount*10;
            setTimeout(() => {
                modalRef.winCalc.insertAdjacentHTML=('afterbegin', `<p>Поздравляем, вы выиграли ${win} монет !!!</p>`);
            }, 1000)
            global.money += win;
                // красиво отрисовать прибавление денег
        }
    })
// color win calculations
    if (global.colorBet.bet === colorResult) {
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