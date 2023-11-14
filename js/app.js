/////////////////
///Global
////////////////
let cigarName = document.getElementById('cigar-name').value;
let cigarQuantity = document.getElementById('cigar-quantity').value;
let allCigars = [];
let cigarKey = 'cigar-key'


//////////////////////
///Cigar Constructor
/////////////////////
function Cigar(brand,quantity) {
this.brand = brand;
// this.strength = strength;// TO DO 
this.quantity = quantity;
}
/////////////////////////////////////////////
//Function that creates new cigar instances
////////////////////////////////////////////
function initCigar () {
const cigarInstance = new Cigar (cigarName, cigarQuantity);// 
allCigars.push(cigarInstance);
}

////////////////////////////////
///Functions for local storage
///////////////////////////////
function storeCigars()  {
	 localStorage.setItem(cigarKey, JSON.stringify(allCigars));

}

function getCigar() {
	const storedCigarText = localStorage.getItem(cigarKey);
}

function parseStoredCigars(storedCigarText) {
	const parsedCigarObjects = JSON.parse(storedCigarText);

}
const inventoryList = document.getElementById('inventory-list');

function renderCigarInventory() {
const uL = document.createElement('ul');
inventoryList.appendChild(uL);

const lI = document.createElement('li');
uL.appendChild(lI);
lI.textContent = 'hello' 
// edit text for page
}

renderCigarInventory();

///////////////////////
///Form/Event Handler
//////////////////////

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
	if(event.target.classList.contains('delete-button')){
		const cigarItem = event.target.parentElement.parentElement;
		cigarList.removeChild(cigarItem);
	}
}
buttonPlus.addEventListener('click',increaseQuantity)
cigarList.addEventListener('click', handleDelete);
form.addEventListener('submit', handleSubmit);


