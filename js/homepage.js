

document.getElementById('button').eventListener('click');

let localStorageData = localStorage.getItem('cigarKey');
let localStorageContent = localStorage.getElementById('localStorageContent');
localStorageContent.textContent = localStorageData;



function handleShowCigarsButton() {
  renderCigarInventory();
}


