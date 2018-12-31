declare type Plate = {
  id: string;
  text: string;
  done: boolean;
};
declare type controlStr = 'clear' | 'check' | 'uncheck';

const addItems = document.querySelector('.add-items') as HTMLFormElement;
const itemsList = document.querySelector('.plates') as HTMLUListElement;
const controls = document.querySelector('.plates__control') as HTMLElement;
const items: Plate[] = JSON.parse(localStorage.getItem('items') || '[]');
const fragment = document.createElement('template') as HTMLTemplateElement;

function addItem(this: HTMLFormElement, event: Event) {
  event.preventDefault();
  // HTMLFormControlsCollection
  const itemEl = this.elements.namedItem('item') as HTMLInputElement;
  const itemText: string = itemEl.value;
  if (!itemText.trim()) {
    return;
  }

  const plate: Plate = {
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

function renderItm(item: Plate): string {
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

function render(list: Plate[], target: Element) {
  itemsList.innerHTML = list.map(item => renderItm(item)).join('');
}

function toggleDone(itemId: string) {
  items.forEach(item => {
    if (item.id === itemId) {
      item.done = !item.done;
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
}

function handlePlateItems(type: string) {
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
itemsList.addEventListener('click', function(
  this: HTMLElement,
  event: MouseEvent
) {
  let ele: HTMLElement = event.target as HTMLElement;
  if (ele.matches('input')) {
    return;
  }
  while (!ele.matches('li[data-id]') && ele !== this) {
    if (ele.parentElement != null) {
      ele = ele.parentElement;
    }
  }
  const id = ele.dataset.id as string;
  toggleDone(id);
});

controls.addEventListener('click', function(event: MouseEvent) {
  if (!(<HTMLElement>event.target).matches('button[data-type]')) {
    return;
  }
  const type = (<HTMLElement>event.target).dataset.type as controlStr;
  handlePlateItems(type);
});

render(items, itemsList);
