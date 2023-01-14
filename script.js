const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

var squirtleWinsDoc = document.getElementById("squirtleWins");
var charmanderWinsDoc = document.getElementById("charmanderWins");
var bulbasaurWinsDoc = document.getElementById("bulbasaurWins");

var startButtonText = document.getElementById("startButtonText");
var startButton = document.getElementById("startButton");

const pokemons = ['bulbasaur', 'charmander', 'squirtle']; // emojis for rock, paper, and scissors
const particleCount = 18; // number of particles in the system
const particles = []; // array to hold the particles
const particleSize = 45; // size of each particle
const particleSpeed = 0.1; // speed of each particle


var bulbasaurWinCount = 0;
var charmanderWinCount = 0;
var squirtleWinCount = 0;

var bulbasaurWin = false;
var charmanderWin = false;
var squirtleWin = false;

var playTriggered = false;


function changeTheVariable() {
  playTriggered = true
}
// create the particles and add them to the particles array

function runSimulator() {
  startButtonText.innerHTML = "In play"
  startButton.disabled = true;
  startButton.style.display = "none";

  const particles = []; // array to hold the particles
  var bulbasaurCount = 0;
  var charmanderCount = 0;
  var squirtleCount = 0;

  for (let i = 0; i < particleCount; i++) {
    const x = (Math.random() * (canvas.width - 40)); // random x position
    const y = (Math.random() * (canvas.height - 40)); // random y position
    const dx = Math.random() * 1.0 + 0.5;
    const dy = Math.random() * 1.0 + 0.5;
    const image = new Image()
    // const emoji = emojis[Math.floor(Math.random() * emojis.length)]; // random emoji
    const pokemon = pokemons[Math.floor(Math.random() * pokemons.length)]; // random emoji
    image.src = pokemon + '.png'
    const particle = {
      x,
      y,
      dx,
      dy,
      pokemon,
      image
    };

    particles.push(particle);
  }

  // update the particles by checking for collisions and updating their positions
  function update() {
    for (let i = 0; i < particleCount; i++) {
      const particle = particles[i];
      var isCollision = false;
      // check for collisions with other particles
      for (let j = 0; j < particleCount; j++) {

        if (i === j) continue; // don't check for collision with self

        const other = particles[j];

        // calculate the distance between the two particles
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // if the particles are touching, change the emoji of one of them
        if (distance < particleSize) {
          // console.log(particle.image.src)
          if (particle.pokemon == 'squirtle' && other.pokemon == 'charmander') {
            particle.pokemon = 'squirtle'
            other.pokemon = 'squirtle'
            particle.image.src = 'squirtle.png'
            other.image.src = 'squirtle.png'
            isCollision = true
          } else if (particle.pokemon == 'bulbasaur' && other.pokemon == 'squirtle') {
            particle.pokemon = 'bulbasaur'
            other.pokemon = 'bulbasaur'
            particle.image.src = 'bulbasaur.png'
            other.image.src = 'bulbasaur.png'
            isCollision = true
          } else if (particle.pokemon == 'charmander' && other.pokemon == 'bulbasaur') {
            particle.pokemon = 'charmander'
            other.pokemon = 'charmander'
            particle.image.src = 'charmander.png'
            other.image.src = 'charmander.png'
            isCollision = true
          };

        }
      }

      if (isCollision) {

        particle.dx = -particle.dx;
        particle.dy = -particle.dy;

      }
      particle.x += particle.dx;
      particle.y += particle.dy;


      if (particle.x > (canvas.width - 40) || particle.x < 0) {
        particle.dx = -particle.dx;
      }
      if (particle.y > (canvas.height - 40) || particle.y < 0) {
        particle.dy = -particle.dy;
      }
    }

    squirtleCount = particles.reduce((accumulator, particle) => {
      return particle.pokemon === "squirtle" ? accumulator + 1 : accumulator;
    }, 0);

    charmanderCount = particles.reduce((accumulator, particle) => {
      return particle.pokemon === "charmander" ? accumulator + 1 : accumulator;
    }, 0);


    bulbasaurCount = particles.reduce((accumulator, particle) => {
      return particle.pokemon === "bulbasaur" ? accumulator + 1 : accumulator;
    }, 0);



  }

  // render the particles on the canvas
  function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particleCount; i++) {
      const particle = particles[i];
      context.drawImage(particle.image, particle.x, particle.y);
    }
  }

  // main game loop
  function loop() {
    if (squirtleCount == particleCount) {
      squirtleWinCount += 1;
      squirtleWin = true;
      console.log("squirtle wins")
      // runSimulator()
      console.log(squirtleWinCount)
      squirtleWinsDoc.innerHTML = squirtleWinCount.toString()
      startButtonText.innerHTML = "Play again"
      startButton.disabled = false;
      startButton.style.display = "block";

    } else if (charmanderCount == particleCount) {
      charmanderWinCount += 1;
      charmanderWin = true;
      console.log("charmander wins")
      console.log(charmanderWinCount)
      startButtonText.innerHTML = "Play again"
      startButton.disabled = false;
      startButton.style.display = "block";

      charmanderWinsDoc.innerHTML = charmanderWinCount.toString()
      // runSimulator()
    } else if (bulbasaurCount == particleCount) {
      bulbasaurWinCount += 1;
      bulbasaurWin = true;
      console.log("bulbasaur wins")
      console.log(bulbasaurWinCount)
      bulbasaurWinsDoc.innerHTML = bulbasaurWinCount.toString();
      startButtonText.innerHTML = "Play again"
      startButton.disabled = false;
      startButton.style.display = "block";



      // runSimulator()
    } else {
      update();
      render();
      requestAnimationFrame(loop);
    }

  }

  loop(); // start the game loop
}

// if (playTriggered) {
// runSimulator()
  // playTriggered = false
// }
