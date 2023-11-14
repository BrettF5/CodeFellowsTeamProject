document.getElementById('button').addEventListener('click', handleShowCigarsButton);

function handleShowCigarsButton() {
  // Retrieve data from local storage with key 'cigarKey'
  let localStorageData = localStorage.getItem(cigarKey);
  console.log('Retrieved data:', localStorageData);

  // Get the element with the id 'localStorageContent'
  let localStorageContent = document.getElementById('localStorageContent');

  // Check if data exists in local storage
  if (localStorageData) {
    // Display the local storage data in the 'localStorageContent' element
    localStorageContent.textContent = localStorageData;
  } else {
    // If no data in local storage, display a message
    localStorageContent.textContent = 'No cigars found in local storage.';
  }
}
