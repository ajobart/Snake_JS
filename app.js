document.addEventListener('DOMContentLoaded', () => {

  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('span');
  const stratBtn = document.querySelector('.start');

  const width = 10;
  //Première div sur la grille
  let currentIndex = 0;
  //Premuère div sur la grille
  let appleIndex = 0;
  let currentSnake = [2,1,0];
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;


  //Pour débuté ou recommencer le jeu
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    direction = 1;
    scoreDisplay.innerText = score;
    intervalTime = 1000;
    currentSnake = [2,1,0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutComes, intervalTime);
    randomApple();
  }

  //fonction qui traite de tout les résultats du serpent.
  function moveOutComes() {
    //Cas du serpent qui frappe la frontière et du serpent qui se frappe lui-même.
    if (
      //Si le serpent touche le mur bas
      (currentSnake[0] + width >= (width * width) && direction === width) ||
      //Si le serpent touche le mur drois
      (currentSnake[0] % width === width -1 && direction === 1) ||
      //Si le serpent touche le mur gauche
      (currentSnake[0] % width === 0 && direction === -1) ||
      //Si le serpent touche le mur du haut
      (currentSnake[0] - width < 0 && direction === -width) ||
      //Si le serpent se touche lui même
      squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
      return clearInterval(interval)
      }

    //Supprime le dernie ites du tableau et l'affiche
    const tail = currentSnake.pop();
    //Supprime la classe du serpent sur 'tail'
    squares[tail].classList.remove('snake');
    //Donne la direction à la tête du tableau
    currentSnake.unshift(currentSnake[0] + direction)


    //Si le serpent mange une pomme
   if(squares[currentSnake[0]].classList.contains('apple')) {
     squares[currentSnake[0]].classList.remove('apple');
     squares[tail].classList.add('snake');
     currentSnake.push(tail);
     randomApple();
     score++;
     scoreDisplay.textContent = score;
     clearInterval(interval);
     intervalTime = intervalTime * speed;
     interval = setInterval(moveOutComes, intervalTime);
   }

    squares[currentSnake[0]].classList.add('snake');
  }

  //Créer une nouvelle pomme quand une est mangée
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
   }


   //On attribue des fonctions aux touches du clavier
  function control(e) {
    squares[currentIndex].classList.remove('snake');

    if (e.keyCode === 39) {
      direction = 1;
    } else if (e.keyCode === 38) {
      direction = -width;
    } else if (e.keyCode === 37) {
      direction = -1;
    } else if (e.keyCode === 40) {
      direction = +width;
    }
  }


  document.addEventListener('keyup', control);
  stratBtn.addEventListener('click', startGame);
})
