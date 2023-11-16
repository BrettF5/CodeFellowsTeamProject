const daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
const humidityInput = document.getElementById('humidity');
let humidityValue = [];
const btn = document.getElementById('submit-btn');
let chartInstance = null;
const humidityData = 'humidity-data';
let chart = document.querySelector('.chart');
let clicks = 0;
let storedHumidityData = humidityData

//Function that calculates the average daily humidity
function avgHumidty(){
const intArray = [];
clicks ++;

for (let i = 0; i < humidityValue.length; i++) {
  intArray.push(parseInt(humidityValue[i], 10));
}

  if (clicks === 5) {
    let sumHumidity = 0;

    for (let i = 0; i < intArray.length; i++) {
      sumHumidity += intArray[i];
    }
    const averageHumidity = sumHumidity / intArray.length;
    document.querySelector('.avgHumidity').textContent = `Your average daily humidity level is ${averageHumidity}%`;
  }

}
let humidityDays = humidityInput.value;
// ////////////////// Local Storage//////////////////////

function saveHumidity(value) {
  console.log(value);
    let existingData = getHumidityData();
    existingData.push(value);
    localStorage.setItem('humidityData', JSON.stringify(existingData));
  } 


function getHumidityData() {

    const storedHumidityData = localStorage.getItem('humidityData');
    return JSON.parse(storedHumidityData) || [];
  
  }


//function that handles button
function handleClick (event){
    event.preventDefault();
   humidityDays = humidityInput.value;
   console.log(humidityDays)
    humidityValue.push(humidityDays);
    chart.classList.remove('hidden')
    event.target.form.reset();
    avgHumidty();
    renderChart(humidityValue); 
    saveHumidity(humidityDays);
}
btn.addEventListener('click',handleClick);
renderChart(humidityValue); 


// Function to render the chart

function renderChart() {
  if (chartInstance) {
    chartInstance.destroy();

}
    const labels = daysOfWeek ;
    const data = {
      labels: labels,
      datasets: [{
        label: 'Humidity Data',
        data: humidityValue ,
        fill: false,
        borderColor: 'rgb(75, 192, 192)', 
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



// Check for existing data on page load and render chart if available
window.onload = function () {
  const existingData = getHumidityData();

  if (existingData.length > 0) {
    humidityValue = existingData;
    renderChart();
  }
}
