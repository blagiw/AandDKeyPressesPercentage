var startTime, endTime;
var keyHitsA = 0;
var keyHitsD = 0;
var totalAttempts = 0;
var percentageData = [];

document.addEventListener('keydown', function(event) {
    if (event.key === 'a' || event.key === 'd') {
        totalAttempts++;
        if (totalAttempts === 1) {
            startTime = new Date();
        }
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'a' || event.key === 'd') {
        if (totalAttempts > 0) {
            endTime = new Date();
            var timeDiff = endTime - startTime;
            var seconds = timeDiff / 1000;

            var timingDisplay = document.getElementById('timing');
            timingDisplay.textContent = 'Timing: ' + seconds.toFixed(2) + ' seconds';

            if (event.key === 'a') {
                keyHitsA++;
            } else if (event.key === 'd') {
                keyHitsD++;
            }

            var accuracyA = (keyHitsA / totalAttempts) * 100;
            var accuracyDisplayA = document.getElementById('accuracyA');
            accuracyDisplayA.textContent = 'Accuracy A: ' + accuracyA.toFixed(2) + '%';

            var accuracyD = (keyHitsD / totalAttempts) * 100;
            var accuracyDisplayD = document.getElementById('accuracyD');
            accuracyDisplayD.textContent = 'Accuracy D: ' + accuracyD.toFixed(2) + '%';

            var tracker = document.getElementById('tracker');
            var indicator = document.getElementById('indicator');
            var trackerWidth = tracker.offsetWidth;
            var indicatorPos = (keyHitsA - keyHitsD) * (trackerWidth / totalAttempts) + (trackerWidth / 2);
            indicator.style.left = indicatorPos + 'px';

            percentageData.push({ time: seconds.toFixed(2), accuracyA: accuracyA.toFixed(2), accuracyD: accuracyD.toFixed(2) });
            updateGraph();
        }
    }
});

function updateGraph() {
    var graph = document.getElementById('graph');
    graph.innerHTML = '';

    for (var i = 0; i < percentageData.length; i++) {
        var dataPoint = percentageData[i];

        var bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = dataPoint.accuracyA + 'px';
        bar.style.left = (i * 20) + 'px';
        bar.title = 'Time: ' + dataPoint.time + 's, Accuracy A: ' + dataPoint.accuracyA + '%, Accuracy D: ' + dataPoint.accuracyD + '%';

        graph.appendChild(bar);
    }
}
