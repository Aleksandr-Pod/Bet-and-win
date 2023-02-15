import global from "./globalData.js";
import { modalRef } from "./refs.js";

export const roulette = () => {
    for (let i = 3; i <= 10; i += 1 ){
        setTimeout(() => {
            const result = Math.floor(Math.random()*37);
            const colorResult = ( result & 1 ) ? "red" : "black";
            modalRef.result.innerHTML = `<p class="result-number ${colorResult}">${result}</p>`;
            if (i === 10) {
                global.results = {result, colorResult};
            }
        }, i*i*50);
    };
}   