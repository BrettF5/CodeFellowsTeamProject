
let cigarKey = 'cigar-key';

//form.addEventListener('submit', handleSubmit);

document.getElementById('button').addEventListener('click', handleShowCigarsButton);

function handleShowCigarsButton() {
    // Clear previous inventory
    inventoryList.innerHTML = '';

    // Retrieve data from local storage with key 'cigarKey'
    let localStorageData = localStorage.getItem(cigarKey);
    console.log('Retrieved data:', localStorageData);

    // Get the element with the id 'localStorageContent'
    let localStorageContent = document.getElementById('localStorageContent');

    // Check if data exists in local storage
    if (localStorageData) {
        disableButton();
        // Display the local storage data in the 'localStorageContent' element
        //localStorageContent.textContent = localStorageData;
        renderCigarInventory();
    } else {
        // If no data in local storage, display a message
        localStorageContent.textContent = 'No cigars found in local storage.';
    }
}


function disableButton() {
    document.getElementById('button').disabled = true;
}

let inventoryList = document.getElementById('localStorageContent');

function getCigar() {
    storedCigarText = localStorage.getItem(cigarKey);
    return JSON.parse(storedCigarText) || [];
}

function renderCigarInventory() {
    const ul = document.createElement('ul');
    inventoryList.appendChild(ul);

    // Get the stored cigars
    const storedCigars = getCigar();


    // Loop through the stored cigars and render them
    console.log(storedCigars);
    storedCigars.forEach(cigar => {storedCigars
        const li = document.createElement('li');
        ul.appendChild(li);
        li.textContent = `Name: ${cigar.brand}, Quantity: ${cigar.quantity}`;
    });
}


