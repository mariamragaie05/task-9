const images = [
  "https://iheartcraftythings.com/wp-content/uploads/2021/05/Circle-DRAWING-%E2%80%93-STEP-10.jpg",
  "https://illustoon.com/photo/7291.png",
  "https://as1.ftcdn.net/v2/jpg/05/06/72/54/1000_F_506725496_kvJPVTdPAdmjHO6b9TOkHzm3Zqn5cILX.jpg",
  "https://upload.wikimedia.org/wikipedia/de/f/ff/Wegzeichen_-_Strich_rot.PNG",
  "https://www.shutterstock.com/image-vector/pink-trapezoid-basic-simple-shapes-260nw-1357982375.jpg",
  "https://thumbs.dreamstime.com/b/red-parallelogram-basic-simple-shapes-d-shape-symbol-isolated-white-background-geometric-icon-clip-art-kids-learning-292010156.jpg",
  "https://illustoon.com/photo/7412.png",
  "https://illustoon.com/photo/7414.png",
  "https://iheartcraftythings.com/wp-content/uploads/2021/05/Circle-DRAWING-%E2%80%93-STEP-10.jpg",
  "https://illustoon.com/photo/7291.png",
  "https://as1.ftcdn.net/v2/jpg/05/06/72/54/1000_F_506725496_kvJPVTdPAdmjHO6b9TOkHzm3Zqn5cILX.jpg",
  "https://upload.wikimedia.org/wikipedia/de/f/ff/Wegzeichen_-_Strich_rot.PNG",
  "https://www.shutterstock.com/image-vector/pink-trapezoid-basic-simple-shapes-260nw-1357982375.jpg",
  "https://thumbs.dreamstime.com/b/red-parallelogram-basic-simple-shapes-d-shape-symbol-isolated-white-background-geometric-icon-clip-art-kids-learning-292010156.jpg",
  "https://illustoon.com/photo/7412.png",
  "https://illustoon.com/photo/7414.png",
];
let flippedCards = [];
let matchedPairs = 0;
let flipTimeout;

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function createBoard() {
  const board = document.getElementById("game-board");
  //   board.innerHTML = "";
  const shuffledImages = shuffle(images);
  shuffledImages.forEach((image) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div class="front"></div>
            <div class="back" style="background-image: url('${image}')"></div>
        `;
    card.addEventListener("click", () => flipCard(card));
    board.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains("flip")) return;

  card.classList.add("flip");
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  } else {
    flipTimeout = setTimeout(() => {
      card.classList.remove("flip");
      flippedCards = [];
    }, 5000);
  }
}

function checkMatch() {
  clearTimeout(flipTimeout);

  const [firstCard, secondCard] = flippedCards;
  const isMatch =
    firstCard.querySelector(".back").style.backgroundImage ===
    secondCard.querySelector(".back").style.backgroundImage;

  if (isMatch) {
    firstCard.classList.add("hidden");
    secondCard.classList.add("hidden");
    matchedPairs++;
    if (matchedPairs === images.length / 2) {
      document.getElementById("message").textContent = "You won!";
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }, 1000);
  }

  flippedCards = [];
}

function resetGame() {
  matchedPairs = 0;
  document.getElementById("message").textContent = "";
  createBoard();
}

document.getElementById("reset-btn").addEventListener("click", resetGame);

createBoard();
