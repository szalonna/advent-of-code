onmessage = function(e) {
    const input = e.data;
    let level = 0;
    input.split('')
        .every((currentChar, index) => {
            level += currentChar === '(' ? 1 : -1;
            if (level < 0) {
                postMessage(index + 1);
                return false;
            }
            return true;
        })
}