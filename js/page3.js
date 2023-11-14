'use strict';

const askUserQuestions = []; // Array to store AskQuestion objects
let q1 = null; // Variable to store the current AskQuestion object
let countClick = 0;
const maxClick = 3;
let mildCount = 0;
let mediumCount = 0;
let leftProduct = 0;
let centerProduct = 0;

// Your HTML elements
const questionAskID = document.getElementById('question');
const leftImg = document.getElementById('img1');
const centerImg = document.getElementById('img2');
const returnCigarUser = document.getElementById('returnCigar');

// Constructor function for AskQuestion objects
function AskQuestion(question, img1, img2) {
    this.question = question;
    this.img1 = img1;
    this.img2 = img2;
}

// Sample AskQuestion instances
const questionOne = new AskQuestion('Which Food do you prefer?', 'https://placehold.co/200x300?text=mild+food', 'https://placehold.co/200x300?text=medium+food');
askUserQuestions.push(questionOne);
const questionTwo = new AskQuestion('Which whisky do you prefer?', 'https://placehold.co/200x300?text=mild+whiskey', 'https://placehold.co/200x300?text=medium+whiskey');
askUserQuestions.push(questionTwo);
const questionThree = new AskQuestion('Which beer do you prefer?', 'https://placehold.co/200x300?text=mild+beer', 'https://placehold.co/200x300?text=medium+beer');
askUserQuestions.push(questionThree);

function renderQuestion() {
    if (countClick === maxClick) {
        endClick();
        return;
    }

    q1 = askUserQuestions.pop();

    // Display the question text in the questionAskID element
    questionAskID.textContent = q1.question;

    // Set the src attribute for the left and center images
    leftImg.setAttribute('src', q1.img1);
    centerImg.setAttribute('src', q1.img2);

    countClick += 1;
}

function initEventListener() {
    leftImg.addEventListener('click', handleLeftProductClick);
    centerImg.addEventListener('click', handleCenterProductClick);
}

function handleLeftProductClick() {
    // Handle the click on the left image
    leftProduct += 1;
    renderQuestion();
}

function handleCenterProductClick() {
    // Handle the click on the center image
    centerProduct += 1;
    renderQuestion();
}

function endClick() {
    // Remove event listeners when maxClick is reached
    leftImg.removeEventListener('click', handleLeftProductClick);
    centerImg.removeEventListener('click', handleCenterProductClick);
    returnCigarType(); // Render the cigar type to user
}

function returnCigarType() {
    if (leftProduct > centerProduct) {
        returnCigarUser.textContent = 'I recommend a mild cigar';
    } else {
        returnCigarUser.textContent ='I recommend a medium cigar';
    }
}

// Start App
initEventListener(); // Initialize event listeners
renderQuestion(); // Render the initial question

