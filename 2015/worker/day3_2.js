onmessage = function(e) {
    const input = e.data.split('');

    const houses = [{
        x: 0, y: 0
    }];
    const santaPosition = { x: 0, y: 0 };
    const robotPosition = { x: 0, y: 0 };
    input.forEach((direction, index) => {
        const currentPosition = index % 2 === 0 ? santaPosition : robotPosition;
        switch(direction) {
            case '^':
                currentPosition.y += 1;
                break;
            case 'v':
                currentPosition.y -= 1;
                break;
            case '<':
                currentPosition.x -= 1;
                break;
            case '>':
                currentPosition.x += 1;
                break;
        };
        visitHouse(houses, currentPosition);
    })

    postMessage(houses.length);
}

function visitHouse(houses, position) {
    const housesInSamePosition = houses.filter(({x, y}) => position.x === x && position.y === y);
    if (housesInSamePosition.length === 0) {
        const newHouse = { ...position };
        houses.push(newHouse);
    }
}