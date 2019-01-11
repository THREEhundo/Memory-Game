
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

  for (var i = 0; i < stars.length; i++) {
    stars[i].style.visibility = "visible";
  }

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
    if (faceUpCards[0].dataset.card === faceUpCards[1].dataset.card) {
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
  if (moves > 8 && moves < 12) {
    for (var i = 0; i < 3; i++) {
      if (i > 1) {
        stars[i].style.visibility = "collapse";
      }
    }
  } else if (moves > 13) {
    for (var i = 0; i < 3; i++) {
      if(i > 0) {
        stars[i].style.visibility = "collapse";
      }
    }
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

function winner(){
  if (matchedCard.length == 16) {
    clearInterval(interval);
    finalTime = timer.innerHTML;
    popUp.classList.add("show");
    var starRating = document.querySelector(".stars").innerHTML;
    document.getElementById("totalMoves").innerHTML = moves;
    document.getElementById("totalTime").innerHTML = finalTime;
    document.getElementById("starRating").innerHTML = starRating;
    closePopUp();
  };
}

function closePopUp(){
  closeButton.addEventListener("click", function(z){
    popUp.classList.remove("show");
    startGame();
  });
}

function playAgain(){
  popUp.classList.remove("show");
  startGame();
}

for (var i = 0; i < cards.length; i++) {
  card = cards[i];
  card.addEventListener("click", showCard);
  card.addEventListener("click", openCards);
  card.addEventListener("click", winner);
};
