
let card = document.getElementsByClassName("card");
let cards = [...card];
const deck = document.getElementById("deck-o-cards");

let moves = 0;
let counter = document.querySelector(".moves");

const stars = document.querySelectorAll(".fa-star");

let matchedCard = document.getElementsByClassName("match");

let closeButton = document.querySelector(".close");

let popUp = document.getElementById("popup1");

var faceUpCards = [];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
