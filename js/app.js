
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

startGame();

function startGame(){

  cards = shuffle(cards);

  for (var i = 0; i < cards.length; i++) {
      deck.innerHTML = "";
      [].forEach.call(cards, function(item) {
        deck.appendChild(item);
      });
      cards[i].classList.remove("show", "open", "match", "disabled");
  }
  moves = 0;
  counter.innerHTML = moves;

  second = 0;
  minute = 0;
  hour = 0;
  var timer = document.querySelector(".timer");
  timer.innerHTML = "0 minutes 0 seconds";
  clearInterval(interval);
}

var showCard = function (){
  this.classList.toggle("open");
  this.classList.toggle("show");
  this.classList.toggle("disabled");
};

function openCards() {
  faceUpCards.push(this);
  var lengthOfCard = faceUpCards.length;
  if(lengthOfCard == 2) {
    //add function for counting moves
    countingMoves();
    if (faceUpCards[0].type === faceUpCards[1].type) {
      //add match classes
      match();
    } else {
      //remove match classes
      unmatched();
    }
  }
};

function match(){
  faceUpCards[0].classList.add("match", "disabled");
  faceUpCards[1].classList.add("match", "disabled");
  faceUpCards[0].classList.remove("show", "open");
  faceUpCards[1].classList.remove("show", "open");
  faceUpCards = [];
}

function unmatched(){
  disable();
  setTimeout(function(){
    faceUpCards[0].classList.remove("show", "open", )
    faceUpCards[1].classList.remove("show", "open", )
    enable();
    faceUpCards = [];
  }, 1000);
}

function disable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.add('disabled');
  });
}

function enable(){
  Array.prototype.filter.call(cards, function(card){
    card.classList.remove('disabled');
    for (var i = 0; i < matchedCard.length; i++) {
      matchedCard[i].classList.add("disabled");
    }
  });
}

function countingMoves(){
  moves++;
  counter.innerHTML = moves;
  if (moves == 1) {
    second = 0;
    minute = 0;
    hour = 0;
    startTimer();
  }
}

var second = 0;
var minute = 0;
var hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
  interval = setInterval(function(){
    timer.innerHTML = minute + "minute(s) " + second + "second(s)";
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}
