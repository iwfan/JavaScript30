"use strict";
;
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll("input");
    function handleUpdate(event) {
        console.log(1);
        const suffix = this.dataset.sizing || "";
        document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }
    inputs.forEach((input) => input.addEventListener("change", handleUpdate));
    inputs.forEach((input) => input.addEventListener("mousemove", handleUpdate));
});
