let cigarName = document.getElementById('cigar-name').value;
let cigarQuantity = document.getElementById('cigar-quantity').value;
let allCigars = [];



function Cigar(brand,quantity) {
this.brand = brand;
// this.strength = strength;// TO DO 
this.quantity = quantity;

}
 
function initCigar () {
const cigarInstance = new Cigar (cigarName, cigarQuantity);// 
allCigars.push(cigarInstance);
}

// initCigar('cigar 1', 20);
// console.log(initCigar);

function storeCigars()  {



}



//form
//selects elements from DOM
const form = document.getElementById('addCigarForm');
const cigarList = document.getElementById('cigar-list');



function handleSubmit(event){
	event.preventDefault();
	//stores values from form
	cigarName = document.getElementById('cigar-name').value;
	cigarQuantity = document.getElementById('cigar-quantity').value;
	//creates list element
	const cigarItem = document.createElement('li');
	cigarItem.className = 'cigar-Item';
	//creates div element
	const cigarDetails = document.createElement('div')
	cigarDetails.className = 'cigar-details';
	cigarDetails.innerHTML = `<span>Name: ${cigarName}</span>  <span>Quantity: ${cigarQuantity}</span>
	<button class="delete-button">delete</button>`
	//appends elements
	cigarItem.appendChild(cigarDetails);
	 cigarList.appendChild(cigarItem);
	initCigar(cigarName, cigarQuantity);
	event.target.reset();
}

function handleDelete(event) {
	if(event.target.classList.contains('delete-button')){
		const cigarItem = event.target.parentElement.parentElement;
		cigarList.removeChild(cigarItem);
	}
}
cigarList.addEventListener('click', handleDelete);
form.addEventListener('submit', handleSubmit);


