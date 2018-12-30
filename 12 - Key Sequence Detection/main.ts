declare const cornify_add: () => void;

const secretCode: string = 'susan';
const keySequence: string[] = [];

document.addEventListener('keyup', (event: KeyboardEvent) => {
  keySequence.push(event.key);
  keySequence.splice(
    -secretCode.length - 1,
    keySequence.length - secretCode.length
  );

  if (keySequence.join('').includes(secretCode)) {
    cornify_add();
  }
});
