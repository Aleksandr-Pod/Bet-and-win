import global from './globalData.js';
import { modalRef, walletRef } from './refs.js';

export default function start() {
    const result = Math.floor(Math.random()*37);
    modalRef.numRes.textContent = `${result}`;
    console.log(`Выпала цифра ${result} !!!`);
    let win = 0;
    global.numberBet.forEach(el => {
        if (el.bet === result) {
            win =  el.amount*10;
            modalRef.winCalc.insertAdjacentHTML('afterend', `Поздравляем, вы выиграли ${win} монет !!!` );
            console.log('---Поздравляю, вы выиграли ', win, ' монет !!!');
                // Идёт расчёт выигрыша
            global.money += win;
                // красиво отрисовать прибавление денег
        }
    })

    const colorResult = ( result & 1 ) ? "red" : "black";
    modalRef.colorRes.textContent = `${colorResult}`;
    modalRef.colorRes.classList.add(`${colorResult}`);

    if (global.colorBet.bet === colorResult) {
        win = global.colorBet.amount*2;
        modalRef.winCalc.insertAdjacentHTML('afterend', `Поздравляем, вы выиграли ${win} монет !!!` )
            // Идёт расчёт выигрыша
        global.money += win;
            // красиво отрисовать прибавление денег
    }
    if (win === 0) console.log("Попробуйте ещё раз, вам обязательно повезёт");
    return;
}