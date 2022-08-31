import global from './globalData.js';
import { walletRef } from './walletRef.js';

export default function start() {
    const result = Math.floor(Math.random()*37);
    console.log(`Выпала цифра ${result} !!!`);
    let win = 0;
    global.numberBet.forEach(el => {
        if (el.bet === result) {
            win =  el.amount*10;
            console.log('Поздравляю, вы выиграли ', win, ' монет !!!');
                // Идёт расчёт выигрыша
            global.money += win;
            console.log(`Теперь у вас ${global.money} монет`);
        }
    })

    const colorResult = ( result & 1 ) ? "red" : "black";
    console.log(`Цвет:  ${colorResult} !!!`)

    if (global.colorBet.bet === colorResult) {
        win = global.colorBet.amount*2;
        console.log('Поздравляю, вы выиграли ', win, ' монет !!!');
            // Идёт расчёт выигрыша
        global.money += win;
        console.log(`Теперь у вас ${global.money} монет`);
    }
    if (win === 0) console.log("Попробуйте ещё раз, вам обязательно повезёт");
    
    setTimeout(console.log('возврат через 5 секунд'), 5000);
    walletRef.betResult.innerHTML = "";
    return;
}