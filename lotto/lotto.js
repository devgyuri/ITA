const candidate = Array(45).fill().map((v, i) => i + 1);
const shuffle = [];
while(candidate.length > 0) {
  const random = Math.floor(Math.random() * candidate.length); // index random으로 뽑기
  const spliceArray = candidate.splice(random, 1);
  const value = spliceArray[0]; // random index의 값을 빼내어 shuffle에 넣기
  shuffle.push(value);
}
console.log(shuffle);
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b); 
const bonus = shuffle[6];
console.log(winBalls, bonus);

const $result = document.querySelector('#result');
const $bonus = document.querySelector('#bonus');
const colorBall = (number, $ball) => {
  let color;
  let textColor = 'black';
  if(number < 10) {
    color = 'red';
    textColor = 'white';
  }
  else if(number < 20) {
    color = 'gold';
  }
  else if(number < 30) {
    color = 'lawngreen';
  }
  else {
    color = 'dodgerblue';
    textColor = 'white';
  }
  $ball.style.backgroundColor = color;
  $ball.style.color = textColor;
}
const drawBall = (number, $target) => {
  const $ball = document.createElement('div');
  $ball.className = 'ball';
  $ball.textContent = number;
  colorBall(number, $ball);
  $target.appendChild($ball);
};
for(let i=0; i<6; i++) {
  setTimeout(() => {
    drawBall(winBalls[i], $result);
  }, 1000*(i+1));
}
setTimeout(() => {
  drawBall(bonus, $bonus);
}, 7000);
