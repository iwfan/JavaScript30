"use strict";
const checkboxs = document.querySelectorAll('.inbox input[type=checkbox]');
let lastCheckedItem;
function handleClick(event) {
    if (event.shiftKey && this.checked) {
        let inBetween = false;
        checkboxs.forEach(checkbox => {
            if (checkbox === lastCheckedItem || checkbox === this) {
                inBetween = !inBetween;
            }
            if (inBetween) {
                checkbox.checked = true;
            }
        });
    }
    lastCheckedItem = this;
}
checkboxs.forEach(checkbox => checkbox.addEventListener('click', handleClick));
