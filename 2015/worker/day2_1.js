onmessage = function(e) {
    const result = e.data
        .split(/\n/g)
        .filter(l => l.length)
        .map(parseLineString)
        .map(calculatePages)
        .map(calculateBoxTotal)
        .reduce(sum);
    postMessage(result);
}

function parseLineString(line) {
    const pattern = new RegExp(/([0-9]+)x([0-9]+)x([0-9]+)/, 'g');
    let [_, ...sizes] = pattern.exec(line);
    return sizes.map(n => parseInt(n));
}

function calculatePages(sizes) {
    const pages = [];
    for (let i = 0; i < sizes.length; i++) {
        for (let j = i + 1; j < sizes.length; j++) {
            pages.push(sizes[i] * sizes[j]);
        }
    }
    return pages;
}

function calculateBoxTotal(pages) {
    const minimal = Reflect.apply(Math.min, Math, pages);
    return minimal + (2 * pages.reduce(sum));
}

function sum (sum, curr) {
    return sum + curr;
}
