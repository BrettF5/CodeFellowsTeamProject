let daysOfWeek = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
let humidityInput = document.getElementById('humidity');
let humidityValue = [];
let btn = document.getElementById('submit-btn');
let chartInstance = null;
let humidityData = 'humidity-data';
let chart = document.querySelector('.chart');
btn.addEventListener('click',handleClick);

function handleClick (event){
    event.preventDefault();
    console.log('button Clicked')
    let humidityDays = humidityInput.value;
    console.log(humidityDays);
    humidityValue.push(humidityDays);
    chart.classList.remove('hidden')
  event.target.form.reset();
  renderChart();
}
//////////////////
///Local Storage
//////////////////


  if (humidityValue.trim() !== '') {
    saveHumidity(humidityValue);
    renderChart();
    event.target.form.reset();
  } else {
    alert('Please enter a valid humidity value.');
  }
}


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

// Function to save humidity data to local storage
function saveHumidity(value) {
  var existingData = getHumidityData();
  existingData.push(value);
  localStorage.setItem('humidityData', JSON.stringify(existingData));
  console.log('Humidity Data Saved:', existingData);
}

// Function to get humidity data from local storage
function getHumidityData() {
  return JSON.parse(localStorage.getItem('humidityData')) || [];
}

// Check for existing data on page load and render chart if available
window.onload = function () {
  const existingData = getHumidityData();
  console.log('Existing Humidity Data:', existingData);

  if (existingData.length > 0) {
    renderChart();
  }
};
