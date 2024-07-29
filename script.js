// script.js
document.addEventListener('DOMContentLoaded', () => {
    let workoutHistory = JSON.parse(localStorage.getItem('workoutHistory')) || [];

    const pushupInput = document.getElementById('pushupInput');
    const newWorkoutButton = document.getElementById('newWorkoutButton');
    const clearDataButton = document.getElementById('clearDataButton');
    const workoutChartCtx = document.getElementById('workoutChart').getContext('2d');
    let workoutChart;

    const updateWorkoutChart = () => {
        if (workoutChart) {
            workoutChart.destroy(); // Destroy the old chart instance
        }
        workoutChart = new Chart(workoutChartCtx, {
            type: 'line',
            data: {
                labels: workoutHistory.map((_, index) => `Workout ${index + 1}`),
                datasets: [{
                    label: 'Push-ups',
                    data: workoutHistory,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    updateWorkoutChart();

    newWorkoutButton.addEventListener('click', () => {
        const pushups = parseInt(pushupInput.value, 10);
        if (!isNaN(pushups) && pushups > 0) {
            workoutHistory.push(pushups);
            localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
            updateWorkoutChart();
            pushupInput.value = '';
        }
    });

    clearDataButton.addEventListener('click', () => {
        localStorage.removeItem('workoutHistory');
        workoutHistory = [];
        updateWorkoutChart();
    });
});