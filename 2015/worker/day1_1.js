onmessage = function(e) {
    const input = e.data;
    const result = input.split('').reduce((currentValue, currentChar) => currentValue + (currentChar === '(' ? 1 : -1), 0);
    postMessage(result);
}