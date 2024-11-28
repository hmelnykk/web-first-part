import { DELETE, GET, POST, PUT } from "./crud_operations.js";

const addNewBtn = document.getElementById('add-new-card');
const addModal = document.getElementById('add-modal');
const closeNewModal = document.getElementById('close-new-modal-btn');
const submitNewBtn = document.getElementById('new-modal-btn');

addNewBtn.addEventListener('click', () => {
    addModal.classList.toggle('hidden');
});
closeNewModal.addEventListener('click', () => {
    addModal.classList.toggle('hidden');
})

submitNewBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const newName = document.getElementById('new-card-name-input').value;
    const newVelocity = document.getElementById('new-card-vel-input').value;
    const newWeight = document.getElementById('new-card-weight-input').value;

    if ( !newName || !newVelocity || !newWeight ) {
        alert('all fields are required');
        return;
    }

    const newInsect = {name: newName, velocity: newVelocity, weight: newWeight};

    addModal.classList.add('hidden');

    window.location.reload();

    await POST(newInsect);
    drawList(await GET());
});


const editModal = document.getElementById('edit-modal');
const closeEditModalBtn = document.getElementById('close-edit-modal-btn');

closeEditModalBtn.addEventListener('click', () => {
    editModal.classList.add('hidden');
})

const editNameInput = document.getElementById('edit-card-name-input');
const editVelInput = document.getElementById('edit-card-vel-input');
const editWeightInput = document.getElementById('edit-card-weight-input');

const submitEditBtn = document.getElementById('edit-modal-btn');

submitEditBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    const newName = editNameInput.value;
    const newVelocity = editVelInput.value;
    const newWeight = editWeightInput.value;

    if ( !newName || !newVelocity || !newWeight ) {
        alert('all fields are required');
        return;
    }

    const newInsect = {id: editingItemId, name: newName, velocity: newVelocity, weight: newWeight};

    addModal.classList.add('hidden');

    window.location.reload();
    
    await PUT(newInsect);
})

const isArrayEmpty = (list) => {
    const counter = list.reduce((accumulator, currentValue) => accumulator += 1, 0);
    return counter == 0 ? true : false;
}

let editingItemId = -1;

const drawList = (list) => {
    const showroom = document.getElementById('showroom');
    showroom.innerHTML = '';

    if (isArrayEmpty(list)) {
        showroom.innerHTML = `
            <div class="w-[500px] h-[65px] border border-dashed border-slate-200 rounded-[12px] flex justify-center items-center">
                <h1 class="text-slate-300">Wow, it's really cold there!</h1>
            </div>`;
        return;
    }

    list.forEach((el) => {
        const card = document.createElement('div');
        card.id = `showroom-${el.id}`;
        card.classList.add('w-[500px]', 'h-[65px]', 'bg-slate-200', 'rounded-[12px]', 'flex', 'justify-between');

        const cardInfo = document.createElement('div');
        cardInfo.classList.add('card__info', 'p-2');

        const cardName = document.createElement('p');
        cardName.classList.add('text-lg');
        cardName.textContent = el.name;

        const cardValues = document.createElement('div');
        cardValues.classList.add('card__info-values');

        const velocitySpan = document.createElement('span');
        velocitySpan.classList.add('text-slate-500', 'text-sm');
        velocitySpan.textContent = `velocity: ${el.velocity}`;

        const weightSpan = document.createElement('span');
        weightSpan.classList.add('text-slate-500', 'text-sm');
        weightSpan.textContent = `weight: ${el.weight}`;

        cardValues.appendChild(velocitySpan);
        cardValues.appendChild(weightSpan);

        cardInfo.appendChild(cardName);
        cardInfo.appendChild(cardValues);

        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('card__buttons', 'flex', 'items-center');

        const editButton = document.createElement('button');
        editButton.id = `edit-card-${el.id}`;
        editButton.classList.add('m-2', 'h-[30px]', 'w-24', 'border', 'border-slate-300', 'rounded-full', 'text-black', 'transition-all', 'hover:bg-violet-600', 'hover:text-white');
        editButton.textContent = 'Edit';

        const deleteButton = document.createElement('button');
        deleteButton.id = `delete-card-${el.id}`;
        deleteButton.classList.add('m-2', 'h-[30px]', 'w-24', 'border', 'border-red-500', 'rounded-full', 'text-red-500', 'hover:bg-red-500', 'hover:text-white', 'transition-all');
        deleteButton.textContent = 'Delete';

        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);

        card.appendChild(cardInfo);
        card.appendChild(buttonsContainer);

        showroom.appendChild(card);

        editButton.addEventListener('click', () => {
            editingItemId = el.id;
            editNameInput.value = el.name;
            editVelInput.value = el.velocity;
            editWeightInput.value = el.weight;

            editModal.classList.toggle('hidden');
        });

        deleteButton.addEventListener('click', async () => {
            window.location.reload();
            console.log(el.id);
            await DELETE(el.id);
        });
    });
};

const startList = await GET();
drawList(startList);

const checkbox = document.getElementById('vel-sort-checkbox');
checkbox.addEventListener('click', async () => {
    const sortedList = await GET();
    if (checkbox.checked) {
        sortedList.sort((a, b) => b.velocity - a.velocity)
    }
    drawList(sortedList);
});

const countAverage = document.getElementById('count-average');
countAverage.addEventListener('click', async () => {
    const list = await GET();
    alert(list.reduce((acc, value) => {return acc += value.velocity}, 0) / list.length)
})

const search = document.getElementById('search-input');
const applySearch = document.getElementById('apply-search');
const clearSearch = document.getElementById('clear-search');

applySearch.addEventListener('click', async () => {
    const list = await GET();
    drawList(list.filter((el) => el.name.toLowerCase().includes(search.value)))
});

clearSearch.addEventListener('click', async () => {
    const list = await GET();
    drawList(list);
});
