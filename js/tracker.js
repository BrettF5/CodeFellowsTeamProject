let daysOfWeek = ['Mon','Tues','Wed','Thurs','Fri','Sat','Sun'];
let weekDays = document.getElementById('week-days').value;
let humidityDays = document.getElementById('humidity').value;

function getResults(){
   const form = document.getElementById('humidity-form');
   
}

function handleClick (event){
    event.preventDefault();
    
    weekDays = document.getElementById('week-days').value;
    humidityDays = document.getElementById('humidity').value;

}
getResults();
function renderChart() {
    const labels = daysOfWeek ;
    const data = {
      labels: labels,
      datasets: [{
        label: 'Humidity Data',
        data: daysOfWeek ,
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
    new Chart(ctx, config);
  }

  renderChart();