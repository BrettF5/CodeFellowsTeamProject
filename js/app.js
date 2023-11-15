/////////////////
///Global
////////////////
let cigarName = document.getElementById('cigar-name');
let cigarQuantity = document.getElementById('cigar-quantity');
let allCigars = [];
let cigarKey = 'cigar-key';
let cigarQuantityInt = 0;
let cigarDetails;

//////////////////////
///Cigar Constructor
/////////////////////
function Cigar(brand, quantity) {
    this.brand = brand;
    // this.strength = strength;// TO DO 
    this.quantity = quantity;
}

/////////////////////////////////////////////
//Function that creates new cigar instances
////////////////////////////////////////////
function initCigar() {
    const cigarInstance = new Cigar(cigarName.value, cigarQuantity.value);
    allCigars.push(cigarInstance);
    storeCigars();
}

////////////////////////////////
///Functions for local storage
///////////////////////////////
function storeCigars() {
    localStorage.setItem(cigarKey, JSON.stringify(allCigars));
}

function getCigar() {
    const storedCigarText = localStorage.getItem(cigarKey);
    return storedCigarText ? JSON.parse(storedCigarText) : [];
}


const inventoryList = document.getElementById('inventory-list');

function renderCigarInventory() {
    const uL = document.createElement('ul');
    inventoryList.appendChild(uL);

    // Get the stored cigars
    const storedCigars = getCigar();

    // Loop through the stored cigars and render them
    storedCigars.forEach(cigar => {
        const lI = document.createElement('li');
        uL.appendChild(lI);
        lI.textContent = `Name: ${cigar.brand}, Quantity: ${cigar.quantity}`;
    });
}

renderCigarInventory();

///////////////////////
///Form/Event Handler
//////////////////////

// selects elements from DOM
const form = document.getElementById('addCigarForm');
const cigarList = document.getElementById('cigar-list');

// Handles submit button
function handleSubmit(event) {
    event.preventDefault();

    // stores values from form
    const cigarNameValue = document.getElementById('cigar-name').value;
    const cigarQuantityValue = document.getElementById('cigar-quantity').value;

    // checks for correct inputs TODO
    if (cigarNameValue === '' || cigarQuantityValue === '') {
        alert('need an input');
        return;
    }

     // changes number string to an integer
     const cigarQuantityIntValue = parseInt(cigarQuantityValue);

    // creates list element
    const cigarItem = document.createElement('li');
    cigarItem.className = 'cigar-Item';

    // creates div element
    cigarDetails = document.createElement('div');
    cigarDetails.className = 'cigar-details';
    cigarDetails.innerHTML = `<span class="name">Name: ${cigarNameValue}</span>  <span>Quantity: ${cigarQuantityValue}</span>
    <button class="delete-button">delete</button>
    <button id="buttonPlus" onclick="changeQuantity(1)">+</button>
    <button id="button-minus" onclick="changeQuantity(-1)">-</button>`;

    // appends elements
    cigarItem.appendChild(cigarDetails);
    cigarList.appendChild(cigarItem);
    initCigar(cigarNameValue, cigarQuantityValue);
    event.target.reset();
}

function changeQuantity(amount, buttonElement) {
    cigarQuantityInt += amount;
    updateCigarDetails(buttonElement);
}

// Function to update cigar details in the DOM
function updateCigarDetails(buttonElement) {
    cigarDetails.innerHTML = `<span class="name">Name: ${cigarName.value}</span>  <span>Quantity: ${cigarQuantityInt}</span> <button class="delete-button">delete</button> <button id="buttonPlus" onclick="changeQuantity(1, this)">+</button> <button id="button-minus" onclick="changeQuantity(-1, this)">-</button>`;
}


function handleDelete(event) {
    if (event.target.classList.contains('delete-button')) {
        const cigarItem = event.target.parentElement.parentElement;
        cigarList.removeChild(cigarItem);
    }
}

// Event listeners
cigarList.addEventListener('click', handleDelete);
form.addEventListener('submit', handleSubmit);
