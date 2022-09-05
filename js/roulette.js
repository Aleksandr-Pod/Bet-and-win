import global from "./globalData.js";
import { modalRef } from "./refs.js";

export const roulette = async () => {
    for (let i = 1; i <= 15; i += 1 ){
        await setTimeout(() => {
            const result = Math.floor(Math.random()*37);
            const colorResult = ( result & 1 ) ? "red" : "black";
            modalRef.result.innerHTML = `<p class="result-number ${colorResult}">${result}</p>`;
            if (i === 15) {
                global.results = {result, colorResult};
                
            }
        }, i*i*40);
    };
}   