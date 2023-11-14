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
// put cigars in local storage
function storeCigars()  {
	 localStorage.setItem(cigarKey, JSON.stringify(allCigars));

}
// get cigars from local storage
function getCigar() {
	const storedCigarText = localStorage.getItem(cigarKey);
	if(storedCigarText) {
	return JSON.parse(storedCigarText);
} else
return [];
}

storeCigars();
const retrievedCigars = getCigars();
console.log(retrievedCigars)


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
    //checks for correct inputs TODO


    
	//stores values from form
	cigarName = document.getElementById('cigar-name').value;
	cigarQuantity = document.getElementById('cigar-quantity').value;
	//creates list element
	const cigarItem = document.createElement('li');
	cigarItem.className = 'cigar-Item';
	//creates div element
	const cigarDetails = document.createElement('div')
	cigarDetails.className = 'cigar-details';
	cigarDetails.innerHTML = `<span class="name">Name: ${cigarName}</span>  <span>Quantity: ${cigarQuantity}</span>
    <button class="delete-button">delete</button>
    <button class="button" onclick="increase">+</button>
    <button class="button" onclick="decrease">-</button>`
    //appends elements
	cigarItem.appendChild(cigarDetails);
	cigarList.appendChild(cigarItem);
	initCigar(cigarName, cigarQuantity);	event.target.reset();
}
// Function to increase quantity
function increaseQuantity() {

}

// Function to decrease quantity
function decreaseQuantity() {
   
}

function handleDelete(event) {
	if(event.target.classList.contains('delete-button')){
		const cigarItem = event.target.parentElement.parentElement;
		cigarList.removeChild(cigarItem);
	}
}
cigarList.addEventListener('click', handleDelete);
form.addEventListener('submit', handleSubmit);


