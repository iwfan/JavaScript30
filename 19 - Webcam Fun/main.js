"use strict";
const videoPlayer = document.querySelector('.player');
const snapAudio = document.querySelector('.snap');
const stripEl = document.querySelector('.strip');
const canvasBoard = document.querySelector('.photo');
const videoUrl = '../11 - Custom Video Player/652333414.mp4';
function getVideo() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(localMediaStream => {
        console.log(localMediaStream);
        videoPlayer.srcObject = localMediaStream;
        videoPlayer.autoplay = true;
    })
        .catch(err => {
        console.warn('OH! NO!', err);
        videoPlayer.src = videoUrl;
        videoPlayer.autoplay = true;
        videoPlayer.loop = true;
    });
}
function paintToCanvas(video) {
    const { videoWidth: width, videoHeight: height } = video;
    canvasBoard.width = width;
    canvasBoard.height = height;
    const ctx = canvasBoard.getContext('2d');
    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);
        let pixels = ctx.getImageData(0, 0, width, height);
        // pixels = rgbSplit(pixels);
        ctx.putImageData(pixels, 0, 0);
    }, 16);
}
function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
    }
    return pixels;
}
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}
function takePhoto() {
    snapAudio.currentTime = 0;
    snapAudio.play();
    const img = canvasBoard.toDataURL('image/jpeg');
    const a = document.createElement('a');
    a.innerHTML = `
    <img src=${img} alt="">
  `;
    a.setAttribute('href', img);
    a.setAttribute('download', 'handsome');
    stripEl.insertBefore(a, stripEl.firstElementChild);
}
getVideo();
videoPlayer.addEventListener('click', () => {
    videoPlayer.play();
});
videoPlayer.addEventListener('canplay', () => {
    paintToCanvas(videoPlayer);
});
