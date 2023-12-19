"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const shuffleButton = document.getElementsByClassName("shuffle")[0];
const bars = [];
const indices = [];
const shuffle = (data) => {
    data.sort(() => Math.random() - 0.5);
};
let canShuffle = true;
let canSort = true;
const sortElements = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!canSort || !canShuffle)
        return;
    canSort = false;
    for (let count = 0; count < bars.length; count++) {
        let index = 0;
        yield new Promise((resolve, reject) => {
            const sorter2 = setInterval(() => {
                if (index + 1 >= bars.length) {
                    resolve(undefined);
                    return clearInterval(sorter2);
                }
                if (indices[index + 1] < indices[index]) {
                    [indices[index], indices[index + 1]] = [indices[index + 1], indices[index]];
                    const sound = new Audio("./assets/sound-effect.mp3");
                    sound.play();
                    sound.preservesPitch = false;
                    sound.playbackRate = 2 ** ((indices[index] * (48 / 99)) / 12);
                    sound.volume = 0.1;
                }
                bars[index].style.setProperty("--index", `${indices[index]}`);
                bars[index + 1].style.setProperty("--index", `${indices[index + 1]}`);
                index++;
            }, 5);
        });
        if (indices.join(",") === indices.map((_) => _).sort((a, b) => a - b).join(",")) {
            canSort = true;
            break;
        }
        ;
    }
    canSort = true;
});
const shuffleElements = () => {
    if (!canShuffle || !canSort)
        return;
    canShuffle = false;
    shuffleButton.style.background = "#9c1515";
    shuffle(indices);
    console.log(indices);
    let index = 0;
    const shuffler = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        if (index >= bars.length) {
            canShuffle = true;
            shuffleButton.style.background = "#0000a1";
            return clearInterval(shuffler);
        }
        const sound = new Audio("./assets/sound-effect.mp3");
        sound.play();
        sound.preservesPitch = false;
        sound.playbackRate = 2 ** ((indices[index] * (48 / 99)) / 12);
        sound.volume = 0.1;
        console.log(`index: ${index}, indices[index]: ${indices[index]}`);
        bars[index].style.setProperty("--index", `${indices[index]}`);
        index++;
    }), 5);
};
addEventListener("load", () => {
    const main = document.querySelector("main");
    if (!main)
        return;
    for (let index = 0; index < 100; index++) {
        // const bar = `<div class="bar" style="--index: ${index}"></div>`;
        // main.innerHTML += bar;
        const bar = document.createElement("div");
        bar.style.setProperty("--index", `${index}`);
        bar.classList.add("bar");
        bars.push(main.appendChild(bar));
        indices.push(index);
    }
});
