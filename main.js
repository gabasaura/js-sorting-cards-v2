window.onload = function () {
  const suits = ["♦", "♥", "♠", "♣"];
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];


  function drawRandomCard() {
      const suit = suits[Math.floor(Math.random() * suits.length)];
      const value = values[Math.floor(Math.random() * values.length)];
      return { suit: suit, value: value };
  }

  // HTML CALLINGS
  const drawButton = document.getElementById("drawButton");
  const sortButton = document.getElementById("sortButton");
  const cardContainer = document.getElementById("cardContainer");
  const sortedCardContainer = document.getElementById("sortedCardContainer");
  const numCardDrawInput = document.getElementById("numCardDrawInput");
  const sortingStepsDiv = document.getElementById("sortingStepsDiv");

  // DRAW CARDS
  const drawnCards = [];
  drawButton.addEventListener("click", function () {
      const numCardsToDraw = parseInt(numCardDrawInput.value);
      if (!isNaN(numCardsToDraw)) {
          // Clear existing cards
          cardContainer.innerHTML = "";
          drawnCards.length = 0; // Clear drawn cards array

          // DRAW NEW
          for (let i = 0; i < numCardsToDraw; i++) {
              const randomCard = drawRandomCard();
              drawnCards.push(randomCard);
              const card = document.createElement("div");
              card.className = "p-2 m-2 border border-success rounded-2 card";
              card.classList.add(randomCard.suit);
              card.innerHTML = `
                  <div class="topSymbol">${randomCard.suit}</div>
                  <div class="num">${randomCard.value}</div>
                  <div class="bottomSymbol">${randomCard.suit}</div>
              `;
              cardContainer.appendChild(card);
          }
      } else {
          alert("duh");
      }
  });

  // SELECTION SORT
  const selectionSort = cards => {
      const log = [];

      for (let min = 0; min < cards.length - 1; min++) {
          for (let i = min + 1; i < cards.length; i++) {
              if (parseInt(cards[min].value) > parseInt(cards[i].value)) {
                  const aux = cards[min];
                  cards[min] = cards[i];
                  cards[i] = aux;

                  // Log the state
                  log.push({ state: [...cards] });
                  console.log([...cards])
              }
          }
      }

      // Display log
      sortingStepsDiv.innerHTML = ""; // Clear previous logs
      log.forEach(step => {
          const stepElement = document.createElement("div");
          stepElement.className = "sorting-step d-flex";
          const stepCards = document.createElement("div");
          stepCards.className = "d-flex";
          step.state.forEach(card => {
              const cardElement = document.createElement("div");
              cardElement.className = "p-2 m-2 border border-success rounded-2 card";
              cardElement.classList.add(card.suit);
              cardElement.innerHTML = `
                  <div class="topSymbol">${card.suit}</div>
                  <div class="num">${card.value}</div>
                  <div class="bottomSymbol">${card.suit}</div>
              `;
              stepCards.appendChild(cardElement);
          });

          stepElement.appendChild(stepCards);
          sortingStepsDiv.appendChild(stepElement);
      });

      return cards;
  }

  // SORT BUTTON CLICK EVENT
  sortButton.addEventListener("click", function () {
      const sortedCards = selectionSort([...drawnCards]); // Sort the drawn cards
      sortedCardContainer.innerHTML = "";

      for (let i = 0; i < sortedCards.length; i++) {
          const card = sortedCards[i];
          const sortedCard = document.createElement("div");
          sortedCard.className = "p-2 m-2 border border-success rounded-2 card";
          sortedCard.classList.add(card.suit);
          sortedCard.innerHTML = `
              <div class="topSymbol">${card.suit}</div>
              <div class="num">${card.value}</div>
              <div class="bottomSymbol">${card.suit}</div>
          `;
          sortedCardContainer.appendChild(sortedCard);
      }
  });
}