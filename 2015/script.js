(function () {

    function process(workerName, data) {
        return new Promise((resolve, reject) => {
            const processorWorker = new Worker(`./worker/${workerName}.js`);
            processorWorker.addEventListener('message', (e) => {
                resolve(e.data);
                processorWorker.terminate();
            });
            processorWorker.addEventListener('error', (e) => {
                console.error(e);
                reject();
                processorWorker.terminate();
            })
            processorWorker.postMessage(data);
        });
    }

    function registerPuzzle(triggerButton) {
        triggerButton.addEventListener('click', () => {
            document.getElementById('puzzle_result_value').textContent = 'Processing...';

            const input = document.getElementById('puzzle_input').value;
            process(triggerButton.dataset.puzzle, input).then((result) => {
                document.getElementById('puzzle_result_value').textContent = result;
            });
        })
    }

    Array.from(document.getElementById('puzzle_buttons').children)
        .forEach(registerPuzzle);
})();