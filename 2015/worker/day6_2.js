onmessage = function (e) {
    const input = e.data.split(/\n/g);

    const lamps = Array.from({ length: 1000 })
        .map(() => Array.from({ length: 1000 }).map(() => 0));

    input.map(parseCommand)
        .forEach((command) => {
            for(let x = command.start.x; x <= command.stop.x; x++) {
                for(let y = command.start.y; y <= command.stop.y; y++) {
                    runCommand(x, y, command.command);
                }
            }
        });

    const poweredOn = lamps
        .map(row => row.reduce((acc, curr) => acc + curr, 0))
        .reduce((acc, curr) => acc + curr, 0);
    
    postMessage(poweredOn);

    function runCommand(x, y, command) {
        switch(command) {
            case 'TURN_ON':
                lamps[x][y] += 1;
                break;
            case 'TURN_OFF':
                lamps[x][y] = Math.max(0, lamps[x][y] - 1);
                break;
            case 'TOGGLE':
                lamps[x][y] += 2;
                break;
        }
    }
}

function parseCommand(raw) {
    const pattern = new RegExp(/([a-z ]+)([0-9]{1,3}),([0-9]{1,3})[a-z ]+([0-9]{1,3}),([0-9]{1,3})/, 'g');
    const found = pattern.exec(raw);

    return convertParamArrayToCommand(...found);
}

function convertParamArrayToCommand (_, rawCommandType, rawStartX, rawStartY, rawStopX, rawStopY) {
    let command;
    switch(rawCommandType) {
        case 'toggle ':
            command = 'TOGGLE';
            break;
        case 'turn off ':
            command = 'TURN_OFF';
            break;
        case 'turn on ':
            command = 'TURN_ON';
            break;
    }

    return {
        command,
        start: {
            x: parseInt(rawStartX),
            y: parseInt(rawStartY)
        },
        stop: {
            x: parseInt(rawStopX),
            y: parseInt(rawStopY)
        },

    }
}