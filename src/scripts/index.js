import '../styles/index.scss';

const cards = document.querySelectorAll('.card');
const turnsIndicator = document.querySelector('.turns span')
let firstCard = null;
let firstCardImg = null;
let secondCard = null;
let secondCardImg = null;
let turns = 0;

const prepareNewRound = () => {
  //clear variables for new round and adjust number of turns
  firstCard = null
  secondCard = null
  firstCardImg = null;
  secondCardImg = null;
  turns += 1
  turnsIndicator.innerHTML = turns
}

const unflipCards = () => {
  firstCard.classList.remove('flipped')
  secondCard.classList.remove('flipped')
  prepareNewRound()
}

const checkCardsMatch = (img1, img2) => {
  if (img1 === img2) {
    //it's a match, just prepare a new round
    prepareNewRound()
  } else {
    //flip cards to initial state and prepare for a new round
    setTimeout(() => unflipCards(), 500)
  }
  
}

const handleFlipCard = (event) => {
  const cardSelected = event.target
  cardSelected.classList.add('flipped')

  if(!firstCard) {
    firstCard = cardSelected
    firstCardImg = firstCard.querySelector('.front img').src
  } else {
    if(cardSelected !== firstCard) {
      secondCard = cardSelected
      secondCardImg = secondCard.querySelector('.front img').src
      checkCardsMatch(firstCardImg, secondCardImg)
    }
  }
}

//add event listener to all cards to add flip effect when they are clicked
cards.forEach(card => {
  card.addEventListener('click', handleFlipCard)
  card.addEventListener('touch', handleFlipCard)
})

