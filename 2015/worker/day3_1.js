onmessage = function(e) {
    const input = e.data.split('');

    const houses = [{
        x: 0, y: 0
    }];
    const currentPosition = { x: 0, y: 0 };
    input.forEach((direction) => {
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