import global from './globalData.js';

export default function gameInProcess() {
    const result = Math.floor(Math.random()*36);
    console.log(`Выпала цифра ${result} !!!`);
    let win;
    global.numberBet.forEach(el => {
        if (el.number === result) {
            win =  el.amount*10;
            console.log('Поздравляю, вы выиграли ', win, ' монет !!!');
                // Идёт расчёт выигрыша
            global.money += win;
            console.log(`Теперь у вас ${global.money} монет`);
        }
    })

    const colorResult = ( result & 1 ) ? "red" : "black";
    console.log(`Цвет:  ${colorResult} !!!`)

    if (global.colorBet.color === colorResult) {
        win = global.betAmount*2;
        console.log('Поздравляю, вы выиграли ', win, ' монет !!!');
            // Идёт расчёт выигрыша
        global.money += win;
        console.log(`Теперь у вас ${global.money} монет`);
    }
if (win === 0) console.log("Попробуйте ещё раз, вам обязательно повезёт");

    return;
}