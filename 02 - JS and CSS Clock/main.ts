;document.addEventListener("DOMContentLoaded", () => {

    const hourHand = document.querySelector<HTMLDivElement>('.hour-hand-hook');
    const minHand = document.querySelector<HTMLDivElement>('.min-hand-hook');
    const secHand = document.querySelector<HTMLDivElement>('.second-hand-hook');

    function updateDate() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();


        const secondsDegree = (seconds / 60) * 360;

      (<HTMLDivElement>secHand).style.transform = `rotate(${secondsDegree}deg)`;
    }

    setInterval(updateDate, 1000);
});