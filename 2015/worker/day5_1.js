const blackListed = checkPattern(/(ab|cd|pq|xy)/);
const containsThreeVowels = checkPattern(/(a|e|i|o|u)/, found =>
    found !== null && found.length >= 3);
const containsDoubleLetter = checkPattern(/(.)\1/);

onmessage = function (e) {
    const result = e.data
        .split(/\n/g)
        .filter(l => l.length)
        .filter(l => niceString(l));

    postMessage(result.length);
}

function niceString (candidate) {
    return !blackListed(candidate) && containsThreeVowels(candidate) && containsDoubleLetter(candidate);
}

function checkPattern(regExpPattern, validator) {
    return function(candidate) {
        const pattern = new RegExp(regExpPattern, 'g');
        const found = candidate.match(pattern);
        return validator ? validator(found) : found !== null;
    }
}
