// Global variables
let cigarNameInput = document.getElementById('cigar-name');
let cigarQuantityInput = document.getElementById('cigar-quantity');
let allCigars = [];
let cigarKey = 'cigar-key';
let cigarList = document.getElementById('cigar-list'); // Move this to the global scope

// Cigar constructor
function Cigar(brand, quantity) {
  this.brand = brand;
  this.quantity = quantity;
}

// Function to create new cigar instances
function initCigar(brand, quantity) {
  const cigarInstance = new Cigar(brand, quantity);
  allCigars.push(cigarInstance);
  storeCigars();
}

// Function to store cigars in local storage
function storeCigars() {
  localStorage.setItem(cigarKey, JSON.stringify(allCigars));
}

// Function to get cigars from local storage
function getCigar() {
  const storedCigarText = localStorage.getItem(cigarKey);
  return storedCigarText = JSON.parse(storedCigarText)  `Brand: ${brand}, Quantity: ${quantity}`;
}

// Function to render the cigar inventory
function renderCigarInventory(brand, quantity) {
  const uL = document.createElement('ul');
  cigarList.appendChild(uL); // Use cigarList here

  const lI = document.createElement('li');
  uL.appendChild(lI);
  lI.textContent = `Brand: ${brand}, Quantity: ${quantity}`;
}

// Event handler for form submission
function handleSubmit(event) {
  event.preventDefault();

  // Store values from form
  const cigarName = cigarNameInput.value;
  const cigarQuantity = cigarQuantityInput.value;

//selects elements from DOM
const form = document.getElementById('addCigarForm');
const cigarList = document.getElementById('cigar-list');
//Handles submit button
function handleSubmit(event){
	event.preventDefault();  
   
	//stores values from form
	cigarName = document.getElementById('cigar-name').value;
	cigarQuantity = document.getElementById('cigar-quantity').value;
    //checks for correct inputs TODO
    if (cigarName === '' || cigarQuantity === ''){
        alert('need an input');
        return
      }
    //changes number string to an integer
    let cigarQuantityInt = parseInt(cigarQuantity);
	//creates list element
	const cigarItem = document.createElement('li');
	cigarItem.className = 'cigar-Item';
	//creates div element
	const cigarDetails = document.createElement('div')
	cigarDetails.className = 'cigar-details';
	cigarDetails.innerHTML = `<span class="name">Name: ${cigarName}</span>  <span>Quantity: ${cigarQuantity}</span>
    <button class="delete-button">delete</button>
    <button id="buttonPlus" onclick="increase">+</button>
    <button id="button-minus" onclick="decrease">-</button>`
    //appends elements
	cigarItem.appendChild(cigarDetails);
	cigarList.appendChild(cigarItem);
	initCigar(cigarName, cigarQuantity);	
    event.target.reset();
    
}
// Function to increase quantity
function increaseQuantity() {
    cigarQuantityInt += 1;
    cigarDetails.innerHTML = `<span class="name">Name: ${cigarName}</span>  <span>Quantity: ${cigarQuantityInt}</span>`
}

// Function to decrease quantity
function decreaseQuantity() {
    cigarQuantityInt -= 1;
}


function handleDelete(event) {
  if (event.target.classList.contains('delete-button')) {
    const cigarItem = event.target.parentElement.parentElement;
    cigarList.removeChild(cigarItem);
  }
}
buttonPlus.addEventListener('click',increaseQuantity)
cigarList.addEventListener('click', handleDelete);

// Event listener for form submission
const form = document.getElementById('addCigarForm'); // Add this line
form.addEventListener('submit', handleSubmit);

// Example: Render the initial cigar inventory
const initialCigars = getCigar();
initialCigars.forEach(cigar => {
  renderCigarInventory(cigar.brand, cigar.quantity);
});
