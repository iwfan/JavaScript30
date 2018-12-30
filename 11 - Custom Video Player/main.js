"use strict";
const player = document.querySelector('.player');
const video = document.querySelector('.player__video');
const toggleBtn = document.querySelector('.toggle');
const skipBtns = document.querySelectorAll('.player [data-skip]');
const sliders = document.querySelectorAll('.player input[type="range"]');
const progress = document.querySelector('.progress');
const progresFilled = document.querySelector('.progress__filled');
const fullScreenBtn = document.querySelector('.full__screen');
function togglePlay() {
    video[video.paused ? 'play' : 'pause']();
}
function switcToggleBtnContent() {
    toggleBtn.textContent = this.paused ? '▶' : '⏸';
}
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}
function AdjustmentVolum() {
    video[this.name === 'volume' ? 'volume' : 'playbackRate'] = parseFloat(this.value);
}
function AdjustmentProgress(ele, event) {
    video.currentTime = (event.offsetX / ele.offsetWidth) * video.duration;
}
function updateProgressFilled() {
    progresFilled.style.flexBasis = `${(video.currentTime / video.duration) *
        100}%`;
}
function toggleFullScreen(element) {
    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement &&
        !document.msFullscreenElement) {
        // current working methods
        if (element.requestFullscreen) {
            element.requestFullscreen();
        }
        else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
        else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        }
        else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        }
    }
    else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
        else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        }
        else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }
}
video.addEventListener('click', togglePlay);
video.addEventListener('play', switcToggleBtnContent);
video.addEventListener('pause', switcToggleBtnContent);
video.addEventListener('timeupdate', updateProgressFilled);
toggleBtn.addEventListener('click', togglePlay);
skipBtns.forEach(btn => btn.addEventListener('click', skip));
sliders.forEach(range => range.addEventListener('click', AdjustmentVolum));
sliders.forEach(range => range.addEventListener('mousemove', AdjustmentVolum));
let mousedown = false;
progress.addEventListener('click', e => AdjustmentProgress(progress, e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));
progress.addEventListener('mousemove', e => mousedown && AdjustmentProgress(progress, e));
fullScreenBtn.addEventListener('click', () => {
    toggleFullScreen(player);
});
