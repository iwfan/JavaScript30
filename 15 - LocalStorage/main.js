"use strict";
const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const controls = document.querySelector('.plates__control');
const items = JSON.parse(localStorage.getItem('items') || '[]');
const fragment = document.createElement('template');
function addItem(event) {
    event.preventDefault();
    // HTMLFormControlsCollection
    const itemEl = this.elements.namedItem('item');
    const itemText = itemEl.value;
    if (!itemText.trim()) {
        return;
    }
    const plate = {
        id: Date.now().toString(32),
        text: itemText,
        done: false
    };
    items.push(plate);
    localStorage.setItem('items', JSON.stringify(items));
    fragment.innerHTML = renderItm(plate);
    itemsList.appendChild(fragment.content);
    this.reset();
    fragment.innerHTML = '';
}
function renderItm(item) {
    return `
  <li data-id=${item.id}>
      <input
        type=checkbox
        id=${item.id}
        ${item.done ? 'checked' : ''}
        />
      <label
        for=${item.id}>
        ${item.text}
      </label>
    </li>
  `;
}
function render(list, target) {
    itemsList.innerHTML = list.map(item => renderItm(item)).join('');
}
function toggleDone(itemId) {
    items.forEach(item => {
        if (item.id === itemId) {
            item.done = !item.done;
        }
    });
    localStorage.setItem('items', JSON.stringify(items));
}
function handlePlateItems(type) {
    switch (type) {
        case 'clear':
            items.length = 0;
            break;
        default:
            items.forEach(item => {
                item.done = type === 'check';
            });
    }
    localStorage.setItem('items', JSON.stringify(items));
    render(items, itemsList);
}
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', function (event) {
    let ele = event.target;
    if (ele.matches('input')) {
        return;
    }
    while (!ele.matches('li[data-id]') && ele !== this) {
        if (ele.parentElement != null) {
            ele = ele.parentElement;
        }
    }
    const id = ele.dataset.id;
    toggleDone(id);
});
controls.addEventListener('click', function (event) {
    if (!event.target.matches('button[data-type]')) {
        return;
    }
    const type = event.target.dataset.type;
    handlePlateItems(type);
});
render(items, itemsList);
