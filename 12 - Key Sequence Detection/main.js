"use strict";
const secretCode = 'susan';
const keySequence = [];
document.addEventListener('keyup', (event) => {
    keySequence.push(event.key);
    keySequence.splice(-secretCode.length - 1, keySequence.length - secretCode.length);
    if (keySequence.join('').includes(secretCode)) {
        cornify_add();
    }
});
