'use strict'

// CONSTS
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceeEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// starting conditions 
let scores, currentScore, activePayer, playing;
  const init = function() {
    scores = [0, 0]
    currentScore = 0;
    activePayer = 0;
    playing = true;
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
  

    diceeEl.classList.add('hidden')
    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')
    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
  }
  init();

  const switchPlayer=function () {
    document.getElementById(`current--${activePayer}`).textContent=0;

    activePayer = activePayer === 0 ? 1 : 0;
    currentScore = 0;
    
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
  }

  //    staring rolling
  btnRoll.addEventListener('click' ,function() {
    if(playing === true) {
      //  1 generating a random dice roll
      const dice = Math.trunc( Math.random() * 6 ) + 1
      //  console.log(dice)
      // 2 display dice
      diceeEl.classList.remove('hidden')
      diceeEl.src =`/./images/dice-${dice}.png` // dice src constant
      // 3 check for rolled1
      if(dice !== 1) {
        currentScore += dice
        // current0El.textContent=currentScore;
        document.getElementById(`current--${activePayer}`).textContent=currentScore;
      }
      else {
        switchPlayer();
      }

  }})

  btnHold.addEventListener('click',function() {
    if(playing) {
      scores[activePayer] += currentScore; 
      // console.log(scores[activePayer]);
      document.getElementById(`score--${activePayer}`).textContent = scores[activePayer]

      if(scores[activePayer] >= 20) {
        diceeEl.classList.remove('hidden')
        playing = false;
        document.querySelector(`.player--${activePayer}`).classList.add('.player--winner')
        document.querySelector(`.player--${activePayer}`).classList.remove('.player--active')
      }
      else {
        switchPlayer();
      }
  
}})
  btnNew.addEventListener('click', init);