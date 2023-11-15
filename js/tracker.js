let daysOfWeek = ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];
let humidityInput = document.getElementById('humidity');
let humidDays = [];
let btn = document.getElementById('submit-btn');
let chartInstance = null;

btn.addEventListener('click',handleClick);

function handleClick (event){
    event.preventDefault();
    console.log('button Clicked')
    let humidityDays = humidityInput.value;
    console.log(humidityDays);
    humidDays.push(humidityDays);

event.target.form.reset();
renderChart();
}


function renderChart() {

  if (chartInstance) {
    chartInstance.destroy();
}
    const labels = daysOfWeek ;
    const data = {
      labels: labels,
      datasets: [{
        label: 'Humidity Data',
        data: humidDays ,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const options = {
        scales: {
          y: {
            beginAtZero: true, 
            stepSize: 20, 
            max: 100, 
          }
        }
      };

    const config = {
      type: 'line',
      data: data,
      options: options,
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    chartInstance = new Chart(ctx, config);
  }

  