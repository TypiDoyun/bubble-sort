const shuffleButton = document.getElementsByClassName("shuffle")[0]! as HTMLSpanElement;
const bars: HTMLDivElement[] = [];
const indices: number[] = [];

const shuffle = (data: number[]) => {
    data.sort(() => Math.random() - 0.5);
}

let canShuffle = true;
let canSort = true;

const sortElements = async () => { // 바를 정렬
    if (!canSort || !canShuffle) return;
    canSort = false;

    for (let count = 0; count < bars.length; count++) {
        let index = 0;
        await new Promise((resolve, reject) => {
            const sorter2 = setInterval(() => {
                if (index + 1 >= bars.length) {
                    resolve(undefined);
                    return clearInterval(sorter2);
                }

                if (indices[index + 1] < indices[index]) {
                    [indices[index], indices[index + 1]] = [indices[index + 1], indices[index]]
                    const sound = new Audio("./assets/sound-effect.mp3");
                    sound.play();
                    sound.preservesPitch = false;
                    sound.playbackRate = 2 ** ((indices[index] * (48/99)) / 12);
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
        };
    }
    canSort = true;
}

const shuffleElements = () => { // 바를 랜덤으로 셔플
    if (!canShuffle || !canSort) return;
    canShuffle = false;
    shuffleButton.style.background = "#9c1515";
    
    shuffle(indices);

    console.log(indices);
    
    let index = 0;
    
    const shuffler = setInterval(async () => {
        if (index >= bars.length) {
            canShuffle = true;
            shuffleButton.style.background = "#0000a1";
            return clearInterval(shuffler);
        }
        const sound = new Audio("./assets/sound-effect.mp3");
        sound.play();
        sound.preservesPitch = false;
        sound.playbackRate = 2 ** ((indices[index] * (48/99)) / 12);
        sound.volume = 0.1;
        console.log(`index: ${index}, indices[index]: ${indices[index]}`);
        bars[index].style.setProperty("--index", `${indices[index]}`);
        index++;
    }, 5);
}

addEventListener("load", () => { // 페이지가 로딩되면 바를 100개 생성
    const main = document.querySelector("main");

    if (!main) return;

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