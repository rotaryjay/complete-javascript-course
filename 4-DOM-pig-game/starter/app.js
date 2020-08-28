/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


var scores, roundScore, activePlayer, dice, gamePlaying;

init();

//dice = Math.floor(Math.random() * 6) + 1;

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>';

//var x = document.querySelector('#score-0').textContent;
//console.log(x);



/*
function btn() {
    // Do something here
}
*/
//btn(); // Calls a function above (named btn)

//document.querySelector('.btn-roll').addEventListener('click', btn); // This is a "callback function". It calls back to the btn() above

document.querySelector('.btn-roll').addEventListener('click', function() { // this is an Anonymous Function. It isn't calling back to another function. Get it??!?!?
    if(gamePlaying) {
        // 1. Random  number
        dice = Math.floor(Math.random() * 6) + 1; // Scoping chain will allow us to get

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // 3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) { // !== different from OR not equal to
            // Add score
            roundScore += dice; // same as using roundScore = roundScore + dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer(); // Calls nextPlayer function below
        }
    }    
});

document.querySelector('.btn-hold').addEventListener('click', function() { // Another anonymous function
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game

        if (scores[activePlayer] >= 20) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer(); // Calls nextPlayer function below
        }
    }
});

function nextPlayer() {
    // Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; // Ternary operator. If activePlayer is 0, make activePlayer 1. Else activePlayer is 0.
    roundScore = 0; // Loses score for this round

    document.getElementById('current-0').textContent = '0'; // Updates the DOM
    document.getElementById('current-1').textContent = '0'; // Updates the DOM

    //document.querySelector('.player-0-panel').classList.remove('active'); // Removes active clasxs
    //document.querySelector('.player-1-panel').classList.add('active'); // Adds active class

    document.querySelector('.player-0-panel').classList.toggle('active'); // Removes active clasxs
    document.querySelector('.player-1-panel').classList.toggle('active'); // Adds active class

    document.querySelector('.dice').style.display = 'none'; // Hides the dice for the next player to start their round
    
}

document.querySelector('.btn-new').addEventListener('click', init); // Calls init function instead of using an anonymous function

function init() {
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

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