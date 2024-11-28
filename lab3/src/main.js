class Insect {
    constructor(name, velocity, weight) {
        this.name = name;
        this.velocity = velocity;
        this.weight = weight;
    }
}

const showroomList = [];
let currentList = [];

const data = [
    { "name": "Housefly", "velocity": 5.0, "weight": 0.01 },
    { "name": "Dragonfly", "velocity": 60.0, "weight": 0.02 },
    { "name": "Butterfly", "velocity": 12.0, "weight": 0.3 },
    { "name": "Ant", "velocity": 0.3, "weight": 0.0005 },
    { "name": "Beetle", "velocity": 0.1, "weight": 0.5 },
    { "name": "Mosquito", "velocity": 1.5, "weight": 0.002 },
    { "name": "Locust", "velocity": 20.0, "weight": 0.05 },
    { "name": "Termite", "velocity": 0.2, "weight": 0.003 },
    { "name": "Termite", "velocity": 0.2, "weight": 0.003 }
];
data.forEach((insect) => {
    showroomList.push(new Insect(insect.name, insect.velocity, insect.weight));
});

const drawList = (list) => {
    const showroom = document.getElementById('showroom');
    showroom.innerHTML = '';
    list.forEach((el, idx) => {
        showroom.innerHTML += `
            <div id="showroom-${idx}" class="w-40 bg-slate-200 p-2 rounded-[12px] mr-3 mt-5 h-[130px] text-center shadow-xl">
                <p class="text-lg">${el.name}</p>
                <ul>
                    <li class="text-slate-500 text-sm">velocity: ${el.velocity}</li>
                    <li class="text-slate-500 text-sm">weight: ${el.weight}</li>
                </ul>
                <button class="mt-2 p w-24 border border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all" onClick="deleteCard('showroom-${idx}')">delete</button>
            </div>
        `
    })
}

const clearSearch = () => {
    drawList(showroomList);
}

const searchCard = () => {
    const search = document.getElementById('search-input').value;
    currentList = showroomList.filter((el) => el.name.toLowerCase().includes(search.toLowerCase()));
    drawList(currentList);
}

const deleteCard = (cardId) => {
    const showroom = document.getElementById('showroom');
    showroom.removeChild(document.getElementById(cardId));
    const cardIndex = +cardId.slice(9);
    showroomList.splice(cardIndex);
}

const sortCheckbox = (checkbox) => {
    // const checkbox = document.getElementById('vel-sort-checkbox');
    if (checkbox.checked) {
        currentList = [...showroomList];
        showroomList.length = 0;
        showroomList.push(...currentList);

        currentList.sort((a, b) => {
            if (a.velocity < b.velocity) {
                return 1;
            }
            else if (a.velocity > b.velocity) {
                return -1;
            }
            return 0;
        });
        drawList(currentList);
    } else {
        drawList(showroomList);
    }
}

const alertAverageVelocity = () => {
    const average = showroomList.reduce((accumulator, currentInsect, index, array) => {
        accumulator += currentInsect.velocity;
        if (index === array.length - 1) {
            return accumulator / showroomList.length;
        }
        return accumulator;
    }, 0);

    alert(average);
}

drawList(showroomList);
