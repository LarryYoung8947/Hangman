alert('JS Passed');

//INITIALIZE DRAW FUNCTIONS
let topLine = document.getElementById('topLine');
let sideLine = document.getElementById('sideLine');
let bottomLine = document.getElementById('bottomLine');
let scoreCard = document.getElementById('scoreCard');
let ctxTop = topLine.getContext('2d');
let ctxSide = sideLine.getContext('2d');
let ctxBottom = bottomLine.getContext('2d');
let fpsTop, fpsIntervalTop, startTimeTop, nowTop, thenTop, elapsedTop;
let fpsSide, fpsIntervalSide, startTimeSide, nowSide, thenSide, elapsedSide;
let fpsBottom, fpsIntervalBottom, startTimeBottom, nowBottom, thenBottom, elapsedBottom;
let currentPointTop = 130;
let currentPointSide = 11;
let currentPointBottom = 33;



let startAnimationTop = (fpsTop) => {
  fpsIntervalTop = 1000 / fpsTop;
    thenTop = performance.now();
    startTimeTop = thenTop;
    drawTop();
}

let startAnimationSide = (fpsSide) => {
  fpsIntervalSide = 1000 / fpsSide;
    thenSide = performance.now();
    startTimeSide = thenSide;
    drawSide();
}

let startAnimationBottom = (fpsBottom) => {
  fpsIntervalBottom = 1000 / fpsBottom;
    thenBottom = performance.now();
    startTimeBottom = thenBottom;
    drawBottom();
}

let drawTop = () => {
  requestAnimationFrame(drawTop);
  nowTop = performance.now();
  elapsedTop = nowTop - thenTop;
  if(elapsedTop > fpsIntervalTop && currentPointTop < 650) {
    thenTop = nowTop - (elapsedTop % fpsIntervalTop);
    ctxTop.clearRect(0,0,600,600);
    ctxTop.beginPath();
    ctxTop.moveTo(129, 27);
    ctxTop.lineTo(currentPointTop, 27);
    ctxTop.lineWidth = 5;
    ctxTop.strokeStyle = "black";
    ctxTop.stroke();
  }
  currentPointTop+=5;
}

let drawSide = () => {
  requestAnimationFrame(drawSide);
  nowSide = performance.now();
  elapsedSide = nowSide - thenSide;
  if(elapsedSide > fpsIntervalSide && currentPointSide < 485) {
    thenSide = nowSide - (elapsedSide % fpsIntervalSide);
    ctxSide.clearRect(0,0,600,600);
    ctxSide.beginPath();
    ctxSide.moveTo(20, 10);
    ctxSide.lineTo(20, currentPointSide);
    ctxSide.lineWidth = 5;
    ctxSide.strokeStyle = "black";
    ctxSide.stroke();
  }
  currentPointSide+=4;
}

let drawBottom = () => {
  requestAnimationFrame(drawBottom);
  nowBottom = performance.now();
  elapsedBottom = nowBottom - thenBottom;
  if(elapsedBottom > fpsIntervalBottom && currentPointBottom < 985) {
    thenBottom = nowBottom - (elapsedBottom % fpsIntervalBottom);
    ctxBottom.clearRect(0,0,600,600);
    ctxBottom.beginPath();
    ctxBottom.moveTo(32, 20);
    ctxBottom.lineTo(currentPointBottom, 20);
    ctxBottom.lineWidth = 5;
    ctxBottom.strokeStyle = "black";
    ctxBottom.stroke();
  }
  currentPointBottom+=8;
}

//INITIALIZE PUZZLE OBJECT//

let phrases = [['Vegetable', 'Celery'],
['Vegetable', 'Lettuce'],
['Vegetable', 'Tomato'],
['Vegetable', 'Potato'],
['Vegetable', 'Cucumber'],
['Vegetable', 'Squash'],
['Vegetable', 'Radish'],
['Vegetable', 'Onion'],
['Vegetable', 'Pepper'],
['Vegetable', 'Carrot'],
['Movie', 'Grease'],
['Movie', 'Secret Life Of Pets'],
['Movie', 'Black Panther'],
['Movie', 'The Incredibles'],
['Movie', 'Venom'],
['Movie', 'Avatar'],
['Movie', 'Titanic'],
['Movie', 'Jurassic Park'],
['Movie', 'Wallie'],
['Video Game', 'Super Mario'],
['Video Game', 'The Legend of Zelda'],
['Video Game', 'Final Fantasy'],
['Video Game', 'Resident Evil'],
['Video Game', 'Tetris'],
['Cartoon', 'Gravity Falls'],
['Cartoon', 'Teen Titans'],
['Cartoon', 'Courage the Cowardly Dog'],
['Cartoon', 'The Amazing World of Gumball'],
['Cartoon', 'The Flintstones'],
['Cartoon', 'Tom and Jerry'],
['Cartoon', 'Bugs Bunny'],
['Cartoon', 'Animaniacs'],
['Music', 'Riders on the Storm'],
['Music', 'Bob Dylan'],
['Music', 'Jimi Hendrix'],
['Music', 'Bruno Mars'],
['Music', 'Here Comes The Sun'],
['Music', 'Killswitch Engaged'],
['Music', 'Elvis Presley'],
['Music', 'Katy Perry'],
['Music', 'Michael Jackson'],
['Music', 'Stevie Wonder'],
['Board Game', 'Monopoly'],
['Board Game', 'Scrabble'],
['Board Game', 'Battleship'],
['Board Game', 'Jumanji'],
['Board Game', 'Clue'],
['Board Game', 'Sorry'],
['Metaphor', 'Kill Two Birds With One Stone']
];

let spaces = 0;
let getIndex = () => {
  return Math.floor( Math.random() * phrases.length ) + 1;
}
let index = getIndex();
let phrase = phrases[index][1];

let calcSpaces = () => {
  for(let i=0; i<phrase.length; i++) {
    if(phrase.charAt(i) === ' ') {
      spaces+=1;
    }
  }
}

calcSpaces();

class Puzzle {
  constructor (category, phrase, numOfChar, spaces) {
    this.category = category;
    this.phrase = phrase;
    this.numOfChar = numOfChar;
    this.spaces = spaces;
  }
}

//GET PUZZLE AND SET TO NEW OBJECT

let puzzle = new Puzzle(phrases[index][0], phrase, phrase.length, spaces);

//INITIALIZE LETTER AND SPACE GENERATOR

let letterIndex = 0;

let generateLetter = () => {
  let letterDiv = document.createElement('div');
  let letter = document.createElement('p');
  letterDiv.classList.add('character-item');
  letterDiv.setAttribute('id', `letter${letterIndex}`);
  letter.innerHTML = puzzle.phrase.charAt(letterIndex);
  letter.style.cssText = 'display:none;justify-content:center;align-items:center;font-size:2rem;';
  puzzleContainer.appendChild(letterDiv);
  letterDiv.appendChild(letter);
}

let puzzleContainer = document.getElementById('puzzleBoard')

let generateSpace = () => {
    let spaceDiv = document.createElement('div');
    spaceDiv.classList.add('space-item');
    puzzleContainer.appendChild(spaceDiv);
}

//INITIALIZE PUZZLE BOARD

let letterItems = 0;
let spaceItems = 0;
const puzzlePhrase = puzzle.phrase;

let buildPuzzle = () => {

  for(let i=0; i<puzzlePhrase.length; i++) {
    if(puzzlePhrase.charAt(i) === ' '){
      generateSpace();
      spaceItems+=1;
    } else {
      generateLetter();
      letterItems+=1;
    }
    letterIndex+=1;
  }
  let spaceItem = document.getElementsByClassName('.space-item');
  for(let i=0; i<spaceItem.length; i++){
    spaceItem.style.cssText = 'background-color:gray';
  }
}

//PROMPT A GUESS

let userGuess;

const guessButton = document.getElementById('guessLetter');

guessButton.addEventListener('click', () => {
  userGuess = prompt('Guess a letter!');
  checkGuess();
});

let correctGuess = 0

let checkGuess = () => {
  for(let i = 0; i<puzzlePhrase.length; i++) {
    if(userGuess.toLowerCase() === puzzlePhrase.charAt(i).toLowerCase()) {
      $(`#letter${i} p`).fadeIn(1000);
      $(`#letter${i} p`).css('display', 'inline-grid');
      correctGuess+=1;
    }
  }
  if(correctGuess === 0) {
    let incorrectGuessDiv = document.createElement('div');
    let incorrectGuess = document.createElement('p');
    incorrectGuessDiv.classList.add('incorrectGuessItem');
    incorrectGuess.innerHTML = userGuess.toUpperCase();
    incorrectGuess.style.cssText = 'justify-content:center;align-items:center;font-size:1.5rem;text-align:center;overflow:hidden;';
    scoreCard.appendChild(incorrectGuessDiv);
    incorrectGuessDiv.appendChild(incorrectGuess);
    //draw next stickman part//
  }
  correctGuess = 0;
}








startAnimationTop(60);
startAnimationSide(60);
startAnimationBottom(60);
buildPuzzle();
