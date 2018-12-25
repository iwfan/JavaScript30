;document.addEventListener('DOMContentLoaded', () => {

  const panels: NodeListOf<HTMLDivElement> = document.querySelectorAll('.panel');

  function toggleOpen(this: HTMLDivElement) {
    this.classList.toggle('open');
  }

  function toggleActive(this: HTMLDivElement, event: TransitionEvent) {
    if (event.propertyName.includes('flex')) {
      this.classList.toggle('open-active');
    }
  }

  panels.forEach(panel => panel.addEventListener('click', toggleOpen));
  panels.forEach(panel => panel.addEventListener('transitionend', toggleActive as EventListener));
});