function debounce(func: () => any, wait = 20, immediate = true) {
  var timeout: number | undefined;
  return function(this: any) {
    var context = this,
      args: unknown = arguments;
    var later = function() {
      timeout = undefined;
      if (!immediate) func.apply(context, args as []);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args as []);
  };
}

const slideImages = document.querySelectorAll<HTMLImageElement>('.slide-in');

const checkSlide = () => {
  slideImages.forEach(slideImage => {
    const slideInAt =
      window.scrollY + window.innerHeight - slideImage.height / 2;
    const imageBottom = slideImage.offsetTop + slideImage.height;
    const isHalfShown = slideInAt > slideImage.offsetTop;
    const isNotScrollPast = window.scrollY < imageBottom;

    if (isHalfShown && isNotScrollPast) {
      slideImage.classList.add('active');
    } else {
      slideImage.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', debounce(checkSlide, 100));
