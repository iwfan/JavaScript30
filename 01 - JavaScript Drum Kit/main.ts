document.addEventListener('DOMContentLoaded', () => {

  function playSound({keyCode}: KeyboardEvent): void {
    const audioEl = document.querySelector<HTMLAudioElement>(`audio[data-key="${keyCode}"]`)
    const keyEl = document.querySelector<HTMLDivElement>(`.key[data-key="${keyCode}"]`)
    if (!audioEl || !keyEl) return
    // 按住按键不放时，可以连续的播放声音。
    // 否则需要等到上次的音乐播放完毕后，才可以继续播放。
    audioEl.currentTime = 0;
    audioEl.play();
    keyEl.classList.add('playing');
  }

  function removeTransition({ target, propertyName }: TransitionEvent): void {
    if (propertyName !== 'transform') return
    (<HTMLDivElement>target).classList.remove('playing');
  }

  const keys = Array.from(document.querySelectorAll('.key'))
  keys.forEach(key => key.addEventListener('transitionend', <EventListener>removeTransition))
  document.addEventListener('keydown', playSound)
})