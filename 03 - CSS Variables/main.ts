;document.addEventListener('DOMContentLoaded', () => {
  const inputs: NodeListOf<HTMLInputElement> = document.querySelectorAll("input");

  function handleUpdate(this: HTMLInputElement, event: any): void {
    console.log(1);
    const suffix = this.dataset.sizing || "";
    (<HTMLElement>document.documentElement).style.setProperty(`--${ this.name }`, this.value + suffix);
  }

  inputs.forEach((input: Node) => input.addEventListener("change", handleUpdate));
  inputs.forEach((input: Node) => input.addEventListener("mousemove", handleUpdate))
});