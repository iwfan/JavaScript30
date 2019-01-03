const videoItems = document.querySelectorAll<HTMLLIElement>(
  '.videos [data-time]'
);

let totalSecond = Array.from(videoItems)
  .map(item => item.dataset.time)
  .map(timeStr => {
    const [min, sec] = (<string>timeStr).split(':').map(parseFloat);
    return min * 60 + sec;
  })
  .reduce((p, c) => (p += c), 0);

const hours = Math.floor(totalSecond / 3600);

totalSecond -= hours * 3600;

const minutes = Math.floor(totalSecond / 60);

totalSecond -= minutes * 60;

console.log(hours, minutes, totalSecond);
