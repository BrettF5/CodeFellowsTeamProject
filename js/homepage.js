'use strict';

document.getElementById('button').addEventListener('click', handleShowCigarsButton);

let localStorageData = localStorage.getItem('cigarKey');
let localStorageContent = document.getElementById('localStorageContent');
localStorageContent.textContent = localStorageData;



function handleShowCigarsButton() {
  renderCigarInventory();
}


