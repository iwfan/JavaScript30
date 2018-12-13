"use strict";
;
document.addEventListener("DOMContentLoaded", () => {
    const hourHand = document.querySelector('.hour-hand-hook');
    const minHand = document.querySelector('.min-hand-hook');
    const secHand = document.querySelector('.second-hand-hook');
    function updateDate() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const secondsDegree = (seconds / 60) * 360;
        secHand.style.transform = `rotate(${secondsDegree}deg)`;
    }
    setInterval(updateDate, 1000);
});
