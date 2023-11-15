////////////////
///Global
////////////////
let cigarName = document.getElementById('cigar-name');
let cigarQuantity = document.getElementById('cigar-quantity');
let allCigars = [];
let cigarKey = 'cigar-key';

// Function to handle quantity change
function changeQuantity(amount, index) {
    allCigars[index].quantity += amount;
    storeCigars();
    renderCigarInventory();
}

// Function to update cigar details in the DOM
function updateCigarDetails(cigar, index) {
    return `<span class="name">Name: ${cigar.brand}</span>  <span>Quantity: ${cigar.quantity}</span>
        <button class="delete-button" onclick="handleDelete(${index})">delete</button>
        <button class="buttonPlus" onclick="changeQuantity(1, ${index})">+</button>
        <button class="button-minus" onclick="changeQuantity(-1, ${index})">-</button>`;
}

//////////////////////
///Cigar Constructor
/////////////////////
function Cigar(brand, quantity) {
    this.brand = brand;
    this.quantity = quantity;
}

/////////////////////////////////////////////
//Function that creates new cigar instances
////////////////////////////////////////////
function initCigar() {
    const cigarInstance = new Cigar(cigarName.value, parseInt(cigarQuantity.value));
    allCigars.push(cigarInstance);
    storeCigars();
    renderCigarInventory();
}


////////////////////////////////
///Functions for local storage
///////////////////////////////
function storeCigars() {
    localStorage.setItem(cigarKey, JSON.stringify(allCigars));
}

function getCigars() {
    const storedCigarText = localStorage.getItem(cigarKey);
    return storedCigarText ? JSON.parse(storedCigarText) : [];
}

const inventoryList = document.getElementById('inventory-list');

function renderCigarInventory() {
    inventoryList.innerHTML = ''; // Clear the list before rendering

    // Get the stored cigars
    allCigars = getCigars();

    // Loop through the stored cigars and render them
    allCigars.forEach((cigar, index) => {
        const lI = document.createElement('li');
        inventoryList.appendChild(lI);

        const cigarItem = document.createElement('div');
        cigarItem.className = 'cigar-Item';

        const cigarDetails = document.createElement('div');
        cigarDetails.className = 'cigar-details';
        cigarDetails.innerHTML = updateCigarDetails(cigar, index);

        cigarItem.appendChild(cigarDetails);
        lI.appendChild(cigarItem);
    });
}

renderCigarInventory();

///////////////////////
///Form/Event Handler
//////////////////////

// selects elements from DOM
const form = document.getElementById('addCigarForm');

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

    // creates list element
    initCigar();
    event.target.reset();
}

function handleDelete(index) {
    allCigars.splice(index, 1);
    storeCigars();
    renderCigarInventory();
}

// Event listeners
form.addEventListener('submit', handleSubmit);

