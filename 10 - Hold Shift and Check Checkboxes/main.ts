const checkboxs: NodeListOf<HTMLInputElement> = document.querySelectorAll<HTMLInputElement>('.inbox input[type=checkbox]')
let lastCheckedItem: HTMLInputElement;

function handleClick(this: HTMLInputElement, event: MouseEvent) {
  if (event.shiftKey && this.checked) {
    let inBetween: boolean = false;
    checkboxs.forEach(checkbox => {
      if (checkbox === lastCheckedItem || checkbox === this) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
      }
    })
  }

  lastCheckedItem = this;
}

checkboxs.forEach(checkbox => checkbox.addEventListener('click', handleClick));
