const player: HTMLDivElement = document.querySelector(
  '.player'
) as HTMLDivElement;
const video: HTMLVideoElement = document.querySelector(
  '.player__video'
) as HTMLVideoElement;
const toggleBtn: HTMLButtonElement = document.querySelector(
  '.toggle'
) as HTMLButtonElement;
const skipBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
  '.player [data-skip]'
);
const sliders: NodeListOf<HTMLInputElement> = document.querySelectorAll(
  '.player input[type="range"]'
);

const progress: HTMLDivElement = document.querySelector(
  '.progress'
) as HTMLDivElement;

const progresFilled: HTMLDivElement = document.querySelector(
  '.progress__filled'
) as HTMLDivElement;

const fullScreenBtn: HTMLButtonElement = document.querySelector(
  '.full__screen'
) as HTMLButtonElement;

function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}

function switcToggleBtnContent(this: HTMLVideoElement) {
  toggleBtn.textContent = this.paused ? '▶' : '⏸';
}

function skip(this: HTMLButtonElement) {
  video.currentTime += parseFloat(this.dataset.skip as string);
}

function AdjustmentVolum(this: HTMLInputElement) {
  video[this.name === 'volume' ? 'volume' : 'playbackRate'] = parseFloat(
    this.value
  );
}

function AdjustmentProgress(ele: HTMLDivElement, event: MouseEvent) {
  video.currentTime = (event.offsetX / ele.offsetWidth) * video.duration;
}

function updateProgressFilled(this: HTMLVideoElement) {
  progresFilled.style.flexBasis = `${(video.currentTime / video.duration) *
    100}%`;
}

function toggleFullScreen(element: HTMLElement) {
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement &&
    !document.msFullscreenElement
  ) {
    // current working methods
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
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
progress.addEventListener(
  'mousemove',
  e => mousedown && AdjustmentProgress(progress, e)
);

fullScreenBtn.addEventListener('click', () => {
  toggleFullScreen(player);
});
