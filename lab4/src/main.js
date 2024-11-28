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
];

data.forEach((insect) => {
    showroomList.push(new Insect(insect.name, insect.velocity, insect.weight));
});

const isArrayEmpty = (list) => {
    counter = list.reduce((accumulator, currentValue) => accumulator += 1, 0);
    return counter == 0 ? true : false;
}

const drawList = (list) => {
    const showroom = document.getElementById('showroom');
    showroom.innerHTML = '';

    if ( isArrayEmpty(list) ) {
        showroom.innerHTML = `
            <div class="w-[500px] h-[65px] border border-dashed border-slate-200 rounded-[12px] flex justify-center items-center">
                <h1 class="text-slate-300">Wow, it's really cold there!</h1>
            </div>`;
        return;
    }

    list.forEach((el, idx) => {
        showroom.innerHTML += `
            <div id="showroom-${idx}" class="w-[500px] h-[65px] bg-slate-200 rounded-[12px] flex justify-between">
                <div class="card__info p-2">
                    <p class="text-lg">${el.name}</p>
                    <div class="card__info-values">
                        <span class="text-slate-500 text-sm">velocity: ${el.velocity}</span>
                        <span class="text-slate-500 text-sm">weight: ${el.weight}</span>
                    </div>
                </div>
                <div class="card__buttons flex items-center">
                    <button onclick="editCard(${idx})" class="m-2 h-[30px] w-24 border border-slate-300 rounded-full text-black transition-all hover:bg-violet-600 hover:text-white">Edit</button>
                    <button class="m-2 h-[30px] w-24 border border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-all" onClick="deleteCard('showroom-${idx}')">delete</button>
                </div>
            </div>
        `;
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
    const cardIndex = +cardId.slice(9);
    showroomList.splice(cardIndex, 1);
    drawList(showroomList);
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

const addNewNodal = document.getElementById('add-modal');
const editModal = document.getElementById('edit-modal');

const addNewCard = (newName = '', newVelocity = '', newWeight = '') => {
    addNewNodal.classList.toggle('hidden');
}

const closeEditModal = () => {
    editModal.classList.toggle('hidden');
}

const cardNameInput = document.getElementById('edit-card-name-input');
const cardVelocity = document.getElementById('edit-card-vel-input');
const cardWeight = document.getElementById('edit-card-weight-input');

let editing_card;

const editCard = (idx) => {
    editModal.classList.toggle('hidden');

    const insectCurrent = showroomList[idx];
    editing_card = idx;

    cardNameInput.value = insectCurrent.name;
    cardVelocity.value = insectCurrent.velocity;
    cardWeight.value = insectCurrent.weight;

    console.log(cardNameInput)
}

const newModalBtn = document.getElementById('new-modal-btn');
newModalBtn.addEventListener('click', (e) => {
    e.preventDefault();
    confirmChanges();

    addNewNodal.classList.toggle('hidden');
})

const editModalBtn = document.getElementById('edit-modal-btn');
editModalBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if ( !cardNameInput.value || !cardVelocity.value || !cardWeight.value ) {
        alert('enter correct data');
        return;
    }

    const editedCard = {
        name: cardNameInput.value,
        velocity: cardVelocity.value,
        weight: cardWeight.value,
    };

    showroomList[editing_card] = editedCard;
    
    editModal.classList.toggle('hidden');
    drawList(showroomList);

})

const confirmChanges = (index = -1) => {
    const newName = document.getElementById('new-card-name-input').value;
    const newVelocity = document.getElementById('new-card-vel-input').value;
    const newWeight = document.getElementById('new-card-weight-input').value;
    if (index != -1) {
        const card = showroomList[index];

        if (newName == '' || newVelocity == '' || newWeight == '') {
            alert('All inputs are necessary! Complete the form!');
            editCard(index);
        } else {
            card.name = newName;
            card.velocity = newVelocity;
            card.weight = newWeight;

            drawList(showroomList);
        }
    } else {
        if (newName == '' || newVelocity == '' || newWeight == '') {
            alert('All inputs are necessary! Complete the form!');
            addNewCard(newName, newVelocity, newWeight);
        } else {
            const newCard = new Insect(newName, newVelocity, newWeight);
        
            showroomList.push(newCard);
            drawList(showroomList);
        }
    }

    document.getElementById('new-card-name-input').value = '';
    document.getElementById('new-card-vel-input').value = '';
    document.getElementById('new-card-weight-input').value = '';
}

drawList(showroomList);
