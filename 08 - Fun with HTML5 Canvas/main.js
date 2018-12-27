"use strict";
const _canvas = document.querySelector('#draw');
const canvas = _canvas;
const _ctx = canvas.getContext('2d');
const ctx = _ctx;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;
function draw(e) {
    if (!isDrawing)
        return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    [lastX, lastY] = [e.offsetX, e.offsetY];
    ctx.lineTo(lastX, lastY);
    if (hue >= 360) {
        hue = 0;
    }
    hue++;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
    }
    if (direction) {
        ctx.lineWidth += 1;
    }
    else {
        ctx.lineWidth -= 1;
    }
    ctx.stroke();
}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (evt) => {
    isDrawing = true;
    [lastX, lastY] = [evt.offsetX, evt.offsetY];
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
