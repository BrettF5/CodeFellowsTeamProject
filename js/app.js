/////////////////
///Global
////////////////
let cigarName = document.getElementById('cigar-name');
let cigarQuantity = document.getElementById('cigar-quantity');
let allCigars = [];
let cigarKey = 'cigar-key';
let cigarQuantityInt = 0;
let storedCigarText = "";
let storedCigars = "";

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
    console.log("new", allCigars);
    // storeCigars();
    return cigarInstance
}

////////////////////////////////
///Functions for local storage
///////////////////////////////
function storeCigars() {
    storedCigarText = localStorage.getItem(cigarKey);
    storedCigars = storedCigarText ? JSON.parse(storedCigarText) : {};
    console.log("parsed", storedCigars);
    storedCigars.forEach(element => {
        initCigar(element.brand, element.quantity);
    });
    // Update the retrieved data with new information
    // const newData = { cigars: allCigars };
    // Object.assign(storedCigars, newData);
    // console.log(storedCigars);

    localStorage.setItem(cigarKey, JSON.stringify(allCigars));
    console.log('Data is stored:', allCigars);
}

function getCigar() {
    storedCigarText = localStorage.getItem(cigarKey);
    return JSON.parse(storedCigarText) || [];
}



///////////////////////
///Form/Event Handler
//////////////////////

// selects elements from DOM
const form = document.getElementById('addCigarForm');
const cigarList = document.getElementById('cigar-list');
let newCigar;
console.log(allCigars);

// Handles submit button
function handleSubmit(event) {
    event.preventDefault();
    console.log(allCigars);
    
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
    storeCigars();
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
form.addEventListener('submit', handleSubmit);


