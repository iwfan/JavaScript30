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
        const secondsDegree = seconds * (360 / 60);
        const minuteDegree = (minutes + (seconds / 60)) * (360 / 60);
        const hoursDegree = (hours + (minutes / 60) + (seconds / 60 / 60)) * (360 / 12);
        // 解决角度置为0， 指针跳动的问题
        secHand.style.transition = secondsDegree === 0 ? 'transform 0s' : ' transform .8s cubic-bezier(0.43, 1.69, 0.97, 1.3)';
        // (<HTMLDivElement>minHand).style.transitionDelay = minuteDegree === 0 ? '0' : '.8s';
        // (<HTMLDivElement>hourHand).style.transitionDelay = hoursDegree === 0 ? '0' : '.8s';
        secHand.style.transform = `rotate(${secondsDegree}deg)`;
        minHand.style.transform = `rotate(${minuteDegree}deg)`;
        hourHand.style.transform = `rotate(${hoursDegree}deg)`;
    }
    setInterval(updateDate, 1000);
    updateDate();
});
