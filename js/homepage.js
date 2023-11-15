
let cigarName = document.getElementById('cigar-name');
let cigarQuantity = document.getElementById('cigar-quantity');
let allCigars = [];
let cigarKey = 'cigar-key';
let cigarQuantityInt = 0;

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
function initCigar(name,quantity) {
    const cigarInstance = new Cigar(name,quantity);
    allCigars.push(cigarInstance);
    storeCigars();
    return cigarInstance
}

////////////////////////////////
///Functions for local storage
///////////////////////////////
function storeCigars() {
    localStorage.setItem(cigarKey, JSON.stringify(allCigars));
}

function getCigar() {
    const storedCigarText = localStorage.getItem(cigarKey);
    return JSON.parse(storedCigarText) || [];
}

///////////////////////
///Form/Event Handler
//////////////////////

// selects elements from DOM
const form = document.getElementById('addCigarForm');
const cigarList = document.getElementById('cigar-list');
let newCigar;

// Handles submit button
function handleSubmit(event) {
    event.preventDefault();
    
    // stores values from form
     cigarName = document.getElementById('cigar-name').value;
     cigarQuantity = document.getElementById('cigar-quantity').value;

    // checks for correct inputs TODO
    if (cigarName === '' || cigarQuantity === '') {
        alert('need an input');
        return;
    }

     // changes number string to an integer
     cigarQuantityInt = parseInt(cigarQuantity);

    // creates list element
    const cigarItem = document.createElement('li');
    cigarItem.className = 'cigar-Item';

    // creates div element
    cigarDetails = document.createElement('div');
    cigarDetails.className = 'cigar-details';
    cigarDetails.innerHTML = `<span class="name">Name: ${cigarName}</span>  <span>Quantity: ${cigarQuantityInt}</span>
    <button class="delete-button">delete</button>
    <button id="button-increase">+</button>
    <button id="button-decrease">-</button>`;
    
    // appends elements
    cigarItem.appendChild(cigarDetails);
    cigarList.appendChild(cigarItem);

    newCigar = initCigar(cigarName, cigarQuantityInt);
    let btnIncrease = document.getElementById('button-increase');
    let btnDecrease = document.getElementById('button-decrease');
    btnIncrease.addEventListener('click',handleIncrease)
    btnDecrease.addEventListener('click',handleDecrease)
     event.target.reset();
     
}

function handleIncrease() {
    console.log('button clicked')
    cigarQuantityInt ++;
     
    updateCigarQuantity(newCigar, cigarQuantityInt);
}

function handleDecrease() {
    console.log('button clicked')
    cigarQuantityInt --;
     
    updateCigarQuantity(newCigar, cigarQuantityInt);
}
function updateCigarQuantity(cigar, newQuantity) {
    cigar.quantity = newQuantity;

    const quantitySpan = document.querySelector('.cigar-details span:nth-child(2)');
    quantitySpan.textContent = `Quantity: ${newQuantity}`;

    storeCigars();
}


function handleDelete(event) {
    if (event.target.classList.contains('delete-button')) {
        const cigarItem = event.target.parentElement.parentElement;
        cigarList.removeChild(cigarItem);
    }
}

// Event listeners
cigarList.addEventListener('click', handleDelete);
//form.addEventListener('submit', handleSubmit);

document.getElementById('button').addEventListener('click', handleShowCigarsButton);

function handleShowCigarsButton() {
  // Retrieve data from local storage with key 'cigarKey'
  let localStorageData = localStorage.getItem(cigarKey);
  console.log('Retrieved data:', localStorageData);

  // Get the element with the id 'localStorageContent'
  let localStorageContent = document.getElementById('localStorageContent');
  renderCigarInventory()
  // Check if data exists in local storage
  if (localStorageData) {
   
    // Display the local storage data in the 'localStorageContent' element
    //localStorageContent.textContent = localStorageData;
  } else {
    // If no data in local storage, display a message
    localStorageContent.textContent = 'No cigars found in local storage.';
  }
}
let inventoryList = document.getElementById('localStorageContent');

function renderCigarInventory() {
    const ul = document.createElement('ul');
    inventoryList.appendChild(ul);

    // Get the stored cigars
    const storedCigars = getCigar();

    // Loop through the stored cigars and render them
    storedCigars.forEach(cigar => {
        const li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `Name: ${cigar.brand}, Quantity: ${cigar.quantity}`;
    });
}

renderCigarInventory();
