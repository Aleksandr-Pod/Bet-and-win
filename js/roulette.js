import global from "./globalData.js";
import { modalRef } from "./refs.js";

export const roulette = async () => {
    for (let i = 1; i <= 10; i += 0.5) {
        await setTimeout(() => {
            const result = Math.floor(Math.random()*37);
            const colorResult = ( result & 1 ) ? "red" : "black";
            modalRef.result.innerHTML = `<p class="results-color ${colorResult}">${result}</p>`;
            if (i === 10) {
                global.results = {result, colorResult};
                modalRef.result.classList.add("animation");
            }
        }, i*i*80);
    };
}   