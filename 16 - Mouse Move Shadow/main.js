"use strict";
const hero = document.querySelector('.hero');
const h1 = document.querySelector('h1');
hero.addEventListener('mousemove', e => {
    let { offsetX, offsetY } = e;
    const { offsetWidth: width, offsetHeight: height } = hero;
    const target = e.target;
    if (target.matches('h1')) {
        offsetX += target.offsetLeft;
        offsetY += target.offsetTop;
    }
    console.log(offsetX, offsetY);
    const walk = 150; // 100px
    const originX = width / 2;
    const originY = height / 2;
    let coordx = 0;
    let coordy = 0;
    if (offsetX < originX) {
        coordx = Math.min(originX - offsetX, walk);
    }
    else {
        coordx = Math.max(originX - offsetX, -walk);
    }
    if (offsetY < originY) {
        coordy = Math.min(originY - offsetY, walk);
    }
    else {
        coordy = Math.max(originY - offsetY, -walk);
    }
    document.documentElement.style.setProperty('--coordx', `${coordx}px`);
    document.documentElement.style.setProperty('--coordy', `${coordy}px`);
    //   const xWalk = Math.round((offsetX / width) * walk - walk / 2);
    //   const yWalk = Math.round((offsetY / height) * walk - walk / 2);
    //   h1.style.textShadow = `
    //       ${xWalk}px ${yWalk}px 0 rgba(255,0,255,0.7),
    //       ${xWalk * -1}px ${yWalk}px 0 rgba(0,255,255,0.7),
    //       ${yWalk}px ${xWalk * -1}px 0 rgba(0,255,0,0.7),
    //       ${yWalk * -1}px ${xWalk}px 0 rgba(0,0,255,0.7)
    //     `;
});
