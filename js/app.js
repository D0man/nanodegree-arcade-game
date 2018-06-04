
// Enemies our player must avoid
var Enemy = function({x=-100,speed=1} = {}) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-cat-girl.png';
    this.x= x;
    this.y= [220,140,60][randomizer(2,0)];
    this.speed = speed*randomizer(100,50);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x+= this.speed*dt;
    if (this.x>0 && Math.abs(this.x-player.x)<10 &&this.y===player.y){
        player.alive=false;
        player.sprite= 'images/death-bug.png';
    }
    if (this.x-550>0 && player.alive){
        this.x=-200*randomizer(5,1);
        if(player.score >= 5 && allEnemies.length < 10){
        this.speed+= 10*randomizer(5,1);
        allEnemies.push(new Enemy());
        }
        if(player.score >= 10 && this.speed<1000){
            this.speed+= 100*randomizer(2,0.5);
            }
    }
    
    
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    this.x = 200;
    this.y = 380;
    this.sprite = 'images/enemy-bug.png';
    this.alive = true;
    this.score = 0;
    
}
//sending player back to green zone and gains score
Player.prototype.update = function() {
   
    if (this.y===-20){
        this.score++;
        this.y=380;
    }
    
}
//render image if player is death it show you score and gives option to restart
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y)
    ctx.fillStyle ='black';
    if (!this.alive){
        ctx.fillStyle = 'white';
        ctx.font="38px serif";
        ctx.fillText(`You loss! Score:${player.score}`, 120, 110);
        ctx.fillText(`Press space to play again`, 70, 450);

    }
};
Player.prototype.handleInput= function(e){
    if (this.alive){
        switch(e){
            case 'up':
                if ( this.y>0 ) this.y-=80;
                break;
            case 'down':
                if ( this.y<380 ) this.y+=80;
                break;
            case 'right': 
                if ( this.x<400 )this.x+=100;
                break;
            case 'left':
            if( this.x>0 ) this.x-=100;
                break;
        }
    }else if (e === 'space'){
     player = new Player();
     allEnemies =[new Enemy()];
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let player = new Player();
let allEnemies =[new Enemy({speed:4})];



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
//this gives random number between max and min
function randomizer(max,min){
    return Math.round(Math.random()*max-min)+min;
}
console.log(allEnemies);