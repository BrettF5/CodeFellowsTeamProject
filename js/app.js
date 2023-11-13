
//form
//selects elements from DOM
const form = document.getElementById('addCigarForm');
const cigarList = document.getElementById('cigar-list');

function handleSubmit(event){
	event.preventDefault();
	//stores values from form
	const cigarName = document.getElementById('cigar-name').value;
	const cigarQuantity = document.getElementById('cigar-quantity').value;
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