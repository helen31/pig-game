/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score or the points which he will put  wins the game
*/
var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if(gamePlaying) {
        // 1. Random number
        var dice1 = Math.floor(Math.random() * 6) +1;
        var dice2 = Math.floor(Math.random() * 6) +1;
        var resultOfDices = dice1 + dice2;

        // 2. Display the result
        var diceDom1 = document.getElementById('dice-1');
        var diceDom2 = document.getElementById('dice-2');
        diceDom1.style.display = 'block';
        diceDom2.style.display = 'block';
        diceDom1.src = 'dice-' + dice1 + '.png';
        diceDom2.src = 'dice-' + dice2 + '.png';

        // 3. Update the round score If the rolled number was not a 1
        if (dice1 !== 1 && dice2 !==1) {
            // Add score
            roundScore += resultOfDices;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add Current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var finalScore = document.querySelector('.final-score').value;
        var winnerScore;

        if (finalScore) {
            winnerScore = finalScore;
        } else {
            winnerScore = 100;
        }
        //check if player won the game
        if (scores[activePlayer] >= winnerScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{ nextPlayer();}
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    gamePlaying = true;
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

