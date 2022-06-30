const $computer = document.querySelector('.container');
const $image = document.querySelector('.image');
const $result = document.querySelector('.result');
const $score = document.querySelector('.score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const ROCK_URL = './images/rock.png'
const SCISSORS_URL = './images/rock.png'
const PAPER_URL = './images/rock.png'
const URL = {
  rock: './images/rock.png',
  scissors: './images/scissors.png',
  paper: './images/paper.png',
}

$image.style.background = `url(${URL.paper})`;
$image.style.backgroundSize = '200px 200px';

let computerChoice = 'rock'; // 가위 바위 보 결정
const changeComputerHand = () => {
  if(computerChoice === 'rock') { 
    computerChoice = 'scissors';
  } else if (computerChoice === 'scissors') {
    computerChoice = 'paper';
  } else if (computerChoice === 'paper') {
    computerChoice = 'rock';
  }
  $image.style.background = `url(${URL[computerChoice]})`;
  $image.style.backgroundSize = '200px 200px';
};
const timeInterval = 50;

let intervalID = setInterval(changeComputerHand, timeInterval);

const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

let total_m_score = 0;
let total_c_score = 0;
let message;
const winOrLose = function (myTarget) {
  const myChoice = myTarget.id;
  const myScore = scoreTable[myChoice];
  const computerScore = scoreTable[computerChoice];
  const diff = myScore - computerScore;

  if([2, -1].includes(diff)) {
    total_m_score += 1;
    message = 'Win!'
  } else if([-2, 1].includes(diff)) {
    total_c_score += 1;
    message = 'Lose!'
  } else if(diff === 0) {
    message = 'Draw!'
  }

  $result.textContent = message;
};

let clickable = true; // flag 변수
const clickButton = () => {
  if(clickable) {
    clearInterval(intervalID);
    clickable = false;
    const myTarget = event.target;
    winOrLose(myTarget);
    if(total_m_score === 3) {
      $score.textContent = `Final Result - I win!\n[${total_m_score}:${total_c_score}]`;
    } else if(total_c_score === 3) {
      $score.textContent = `Final Result - Computer win!\n[${total_m_score}:${total_c_score}]`;
    } else {
      $score.textContent = 'me:' + total_m_score + '\tcomputer:' + total_c_score;
      setTimeout(() => {
        intervalID = setInterval(changeComputerHand, timeInterval);
        clickable = true;
      }, 3000); // 다시 실행
    }
  }
};
$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);