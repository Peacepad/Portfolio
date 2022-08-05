const cards = document.querySelectorAll(".card");

function shuffleCards() {
  cards.forEach((card) => {
    const randomPos = Math.trunc(Math.random() * 12);
    card.style.order = randomPos;
  });
}

shuffleCards();

cards.forEach((card) => card.addEventListener("click", handleClick));

let clickCount = 0;
let canClick = true;

function handleClick(e) {
  if (canClick) {
    clickCount++;
    e.target.firstElementChild.classList.add("active");
    canClick = false;
    verifyAttr(e, clickCount, canClick);
    if (clickCount === 2) {
      displayScore();
      clickCount = 0;
    }
  }
}

let previousAttr = "";

function verifyAttr(e, clickCount) {
  if (previousAttr == "") {
    // S'il n'y avait pas de carte avant
    previousAttr = e.target.getAttribute("data-attr");
    canClick = true;
  } else if (previousAttr == e.target.getAttribute("data-attr")) {
    // Si même signe que la précédente
    canClick = true;
    previousAttr = "";
  } else {
    
    // si pas même signe que la précédente

    // Je cherche les cartes qui ont l'attribut précédent

    // Je retourne la carte que je viens de retourner
    setTimeout(function () {
      wrongCard(e);
      canClick = true;
    }, 500);

    function wrongCard(e) {
      e.target.firstElementChild.classList.remove("active");

      cards.forEach((card) => {
        if (card.getAttribute("data-attr") == previousAttr) {
          card.firstElementChild.classList.remove("active");
        }
      });
      previousAttr = "";
    }
  }

  if (clickCount == 2) {
    setTimeout(function () {
      previousAttr = "";
    }, 500);
  }
}

let scoreCount = 0;

const score = document.querySelector(".score");

function displayScore() {
  scoreCount++;
  score.textContent = `Nombre de coups : ${scoreCount}`;
  verifyScore(scoreCount);
}

const advice = document.querySelector(".advice");

function verifyScore(scoreCount) {
  let cardCount = 0;
  cards.forEach((card) => {
    if (card.firstElementChild.classList.contains("active")) {
      cardCount++;
      if (cardCount == cards.length) {
        advice.textContent = `Bravo ! Appuyez sur "espace" pour relancer une partie.`;
        score.textContent = `Votre score final: ${scoreCount}`;
      }
    }
  });
}

window.addEventListener("keydown", handleRestart)

function handleRestart(e) {
    if(e.keyCode === 32) {
        cards.forEach(card => card.firstElementChild.classList.remove('active'));
        setTimeout(shuffleCards,500);
        advice.textContent = `Tentez de gagner avec le moins d'essais possible.`;
        score.textContent = `Nombre de coups : 0`;
        scoreCount = 0
        cardCount = 0
    }
}