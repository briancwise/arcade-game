// Sets an initial player score of 0.
var score = 0;
document.getElementById('userScore').innerHTML = score;


// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemy's position
// Parameter: set the dt (a time delta between ticks)

Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 505) {
        this.x += (200 * dt);
    }
    else {this.x = -100;}

    // Sets the collision between enemy and player:
    if (this.x <= player.x + 50 && this.x + 70 >= player.x) {
    if (this.y <= player.y + 50 && this.y + 30 >= player.y) {
        score--;
        document.getElementById('userScore').innerHTML = score;
        var snd = new Audio('sounds/collision.mp3');
        snd.play();
        player.reset();
    }
}
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Sets player class, which requires an update(), render() and a handleInput() method.

var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 420;
};


Player.prototype.update = function() {

    // The player reaches the water:
    if (this.y < 10) {
        score++;
        this.reset();
        document.getElementById('userScore').innerHTML = score;
        if (score === 5) {
            alert("5 Points! Keep Going!");
        }
        if (score === 10) {
            alert("10 Points! Great job!");
        }
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var snd = new Audio('sounds/player-move.mp3');

Player.prototype.handleInput = function(direction) {

    if (direction === "right" && this.x < 400) {
        this.x += 50;
        snd.play();
    }

        if (direction === "left" && this.x > 0) {
        this.x -= 50;
        snd.play();
    } 

    if (direction === "up" && this.y > 5) {
        this.y -= 60;
        snd.play();
    }

    if (direction === "down" && this.y < 400) {
        snd.play();
        this.y += 60;
    }
};

// Called when the player is sent back to the beginning:
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 420;
};

//loops music theme and sets mute function
var audio = document.getElementById("theme");
audio.autoplay = true;
audio.load();
audio.loop = true;

function enableMute() { 
    audio.muted = true;
} 

function disableMute() { 
    audio.muted = false;
} 

// Instantiation of enemies and player objects
// Place all enemy objects in an array called allEnemies
var allEnemies = []; 

(function displayEnemies() {
    'use strict';
    allEnemies.push(new Enemy(10, 60));
    allEnemies.push(new Enemy(120, 140));
    allEnemies.push(new Enemy(60, 230));
    allEnemies.push(new Enemy(-350, 140));
    allEnemies.push(new Enemy(-850, 230));
}());

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
