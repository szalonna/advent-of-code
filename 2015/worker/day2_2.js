onmessage = function(e) {
    const result = e.data
        .split(/\n/g)
        .filter(l => l.length)
        .map(parseLineString)
        .map(calculateRibbonLength)
        .reduce(sum);
    postMessage(result);
}

function parseLineString(line) {
    const pattern = new RegExp(/([0-9]+)x([0-9]+)x([0-9]+)/, 'g');
    let [_, ...sizes] = pattern.exec(line);
    return sizes.map(n => parseInt(n));
}

function calculateRibbonLength(sizes) {
    const longestSide = Reflect.apply(Math.max, Math, sizes);
    const longestSideIndex = sizes.indexOf(longestSide);
    const shortestSides = sizes.filter((_, index) => index !== longestSideIndex);
    const directRibbonLength = 2 * shortestSides.reduce(sum);

    const bowLength = sizes.reduce((acc, curr) => acc * curr);

    return directRibbonLength + bowLength;
}

function sum (sum, curr) {
    return sum + curr;
}
