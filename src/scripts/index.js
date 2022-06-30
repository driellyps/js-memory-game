import '../styles/index.scss';

const images = [
  'crab',
  'eel',
  'jellyfish',
  'octopus',
  'shell',
  'starfish',
]

const score = document.querySelector('.score span')

const handleScore = () => {
  const bestScore = localStorage.getItem('bestScore')
  if(!bestScore || bestScore > turns) {
    score.textContent = turns
    return localStorage.setItem('bestScore', turns)
  }

  score.textContent = bestScore
}

const shuffleCards = () => {
  const cardsContainer = document.querySelector('.cards-container')
  //make sure container is empty before adding new cards
  cardsContainer.innerHTML = ''
  //duplicate images and sort it randomly
  const imagePairs = [...images, ...images]
    .sort(() => Math.random() > 0.5 ? 1 : -1)

  //add cards to html more dynamically
  for(let i = 0; i < images.length * 2; i++) {
    const newCard = document.createElement('li')
    newCard.classList.add('card')
    newCard.innerHTML = `
      <div class="back">
        <img src="card-back.svg" alt="mosaic image">
      </div>
      <div class="front">
        <img src="icons8-${imagePairs[i]}-64.png" alt="${imagePairs[i]} image">
      </div>`
    cardsContainer.appendChild(newCard)
  }
}

handleScore()
shuffleCards()

const refreshButton = document.querySelector('#refresh')
const cards = document.querySelectorAll('.card');
const turnsIndicator = document.querySelector('.turns span')
let firstCard = null;
let firstCardImg = null;
let secondCard = null;
let secondCardImg = null;
let turns = 0;
let numberOfMatches = 0

const prepareNewRound = () => {
  //clear variables for new round and adjust number of turns
  firstCard = null
  secondCard = null
  firstCardImg = null;
  secondCardImg = null;
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
    numberOfMatches += 1
    if(numberOfMatches === images.length) {
      handleScore()
    }
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
      turns += 1
      secondCard = cardSelected
      secondCardImg = secondCard.querySelector('.front img').src
      checkCardsMatch(firstCardImg, secondCardImg)
    }
  }
}

const handleRefresh = () => {
  turns = 0
  turnsIndicator.innerHTML = turns
  shuffleCards()
  const newCards = document.querySelectorAll('.card');
  newCards.forEach(card => {
    card.addEventListener('click', handleFlipCard)
    card.addEventListener('touch', handleFlipCard)
  })
}

//add event listener to all cards to add flip effect when they are clicked
cards.forEach(card => {
  card.addEventListener('click', handleFlipCard)
  card.addEventListener('touch', handleFlipCard)
})

refreshButton.addEventListener('click', handleRefresh)
refreshButton.addEventListener('touch', handleRefresh)
