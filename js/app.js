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
  return storedCigarText ? JSON.parse(storedCigarText) : [];
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

  // Create list element
  const cigarItem = document.createElement('li');
  cigarItem.className = 'cigar-Item';

  // Create div element
  const cigarDetails = document.createElement('div');
  cigarDetails.className = 'cigar-details';
  cigarDetails.innerHTML = `<span class="name">Name: ${cigarName}</span>  <span>Quantity: ${cigarQuantity}</span>
    <button class="delete-button">delete</button>
    <button class="button" onclick="increaseQuantity()">+</button>
    <button class="button" onclick="decreaseQuantity()">-</button>`;

  // Append elements
  cigarItem.appendChild(cigarDetails);
  cigarList.appendChild(cigarItem);

  // Initialize a new cigar
  initCigar(cigarName, cigarQuantity);

  // Reset the form
  event.target.reset();
}

// Event handler for delete button
function handleDelete(event) {
  if (event.target.classList.contains('delete-button')) {
    const cigarItem = event.target.parentElement.parentElement;
    cigarList.removeChild(cigarItem);
  }
}

// Event listener for delete button clicks
cigarList.addEventListener('click', handleDelete);

// Event listener for form submission
const form = document.getElementById('addCigarForm'); // Add this line
form.addEventListener('submit', handleSubmit);

// Example: Render the initial cigar inventory
const initialCigars = getCigar();
initialCigars.forEach(cigar => {
  renderCigarInventory(cigar.brand, cigar.quantity);
});
