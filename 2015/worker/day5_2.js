const pairOfTwoLetters = checkPattern(/(..)[a-z]*\1/);
const letterPair = checkPattern(/(.)(.)\1/);

onmessage = function (e) {
    const result = e.data
        .split(/\n/g)
        .filter(l => l.length)
        .filter(niceString)

    postMessage(result.length);
}

function niceString (candidate) {
    return pairOfTwoLetters(candidate) && letterPair(candidate);
}

function checkPattern(regExpPattern) {
    return function(candidate) {
        const pattern = new RegExp(regExpPattern, 'g');
        const found = candidate.match(pattern);
        return found !== null;
    }
}