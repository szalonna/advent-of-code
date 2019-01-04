const TWO_SIGNAL_GATE = /^([a-zA-Z0-9]+) (AND|OR|RSHIFT|LSHIFT) ([a-zA-Z0-9]+) -> ([a-zA-Z0-9]+)/;
const NEGATE_GATE = /^(NOT) ([a-zA-Z0-9]+) -> ([a-zA-Z0-9]+)/;
const CONSTANT_MAPPING = /^([a-zA-Z0-9]+) -> ([a-zA-Z0-9]+)/;
const UINT16_LIMIT = 65536;

const values = {};

onmessage = function (e) {
    const input = e.data.split(/\n/g).filter(l => l.length);

    const nodes = input.map(line => getTwoGate(line) || getNegate(line) || getConstantMapping(line));

    while(nodes.length) {
        const node = nodes.shift();
        const solved = calculateNode(node);
        if (!solved) {
            nodes.push(node);
        }
    }

    postMessage(values.a);
}

function calculateNode(node) {
    const [type, arg1, arg2, res] = node;
    const val1 = typeof arg1 === 'number' ? arg1 : values[arg1];
    const val2 = typeof arg2 === 'number' ? arg2 : values[arg2];
    if ((val1 !== 0 && !val1) || (arg2 !== null && val2 !== 0 && !val2)) {
        return false;
    } else {
        switch(type) {
            case 'MAP':
                handleMap(val1, res);
                break;
            case 'NOT':
                handleNot(val1, res);
                break;
            case 'OR':
                handleOr(val1, val2, res);
                break;
            case 'AND':
                handleAnd(val1, val2, res);
                break;
            case 'RSHIFT':
                handleRShift(val1, val2, res);
                break;
            case 'LSHIFT':
                handleLShift(val1, val2, res);
                break;
        }
        return true;
    }
}

function handleMap(val, res) {
    values[res] = val % UINT16_LIMIT;
}

function handleNot(val, res) {
    values[res] = ~val % UINT16_LIMIT;
}

function handleAnd(val1, val2, res) {
    values[res] = (val1 & val2) % UINT16_LIMIT;
}

function handleOr(val1, val2, res) {
    values[res] = (val1 | val2) % UINT16_LIMIT;
}

function handleRShift(val1, val2, res) {
    values[res] = (val1 >> val2) % UINT16_LIMIT;
}

function handleLShift(val1, val2, res) {
    values[res] = (val1 << val2) % UINT16_LIMIT;
}

function getTwoGate(line) {
    const pattern = new RegExp(TWO_SIGNAL_GATE, 'g');
    const found = pattern.exec(line);
    if (found) {
        return [
            found[2],
            num(found[1]),
            num(found[3]),
            num(found[4])
        ]
    } else {
        return false;
    }
}

function getNegate(line) {
    const pattern = new RegExp(NEGATE_GATE, 'g');
    const found = pattern.exec(line);
    if (found) {
        return [
            found[1],
            num(found[2]),
            null,
            found[3]
        ];
    } else {
        return false;
    }
}

function getConstantMapping(line) {
    const pattern = new RegExp(CONSTANT_MAPPING, 'g');
    const found = pattern.exec(line);
    if (found) {
        return [
            'MAP',
            num(found[1]),
            null,
            found[2]
        ];
    } else {
        return false;
    }
}

function num(value) {
    const parsed = parseInt(value);
    if (isNaN(parsed)) {
        return value;
    }
    return parsed;
}