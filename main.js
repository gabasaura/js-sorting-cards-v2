window.onload = function() {
    const suits = ["spade", "diamond", "heart", "club"];
    const values = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K"
    ];
  
    // HTML CALLINGS
    const drawButton = document.getElementById("drawButton");
    const sortButton = document.getElementById("sortButton");
    const numCardDrawInput = document.getElementById("numCardDrawInput");
    const cardContainer = document.getElementById("cardContainer");
    const sortedCardContainer = document.getElementById("sortedCardContainer");
    const sortingStepsDiv = document.getElementById("sortingSteps");
  
    // TO GET RANDOM ITEM
    function getRandomItem(array) {
      return array[Math.floor(Math.random() * array.length)];
    }
  
    // GET RANDOM CARD
    function drawRandomCard() {
      const randomSuit = getRandomItem(suits);
      const randomValue = getRandomItem(values);
      return { suit: randomSuit, value: randomValue };
    }
  
    // DRAW CARDS
    const drawnCards = [];
    drawButton.addEventListener("click", function() {
      const numCardsToDraw = parseInt(numCardDrawInput.value);
      if (!isNaN(numCardsToDraw) && numCardsToDraw > 0 && numCardsToDraw <= 9) {
        // Clear existing cards
        cardContainer.innerHTML = "";
        drawnCards.length = 0; // Clear drawn cards array
  
        // DRAW NEW
        for (let i = 0; i < numCardsToDraw; i++) {
          const randomCard = drawRandomCard();
          drawnCards.push(randomCard);
          const card = document.createElement("div");
          card.className = "p-3 m-2 border border-success rounded-2 card";
          card.classList.add(randomCard.suit);
          card.innerHTML = `
            <div class="topSymbol"></div>
            <div class="num">${randomCard.value}</div>
            <div class="bottomSymbol"></div>
          `;
          cardContainer.appendChild(card);
        }
      } else {
        alert("Enter a number between 1 and 9.");
      }
    });
  
    // SORT CARDS
    function sortCards(arr) {
      const len = arr.length;
      const log = []; 
      sortingStepsDiv.innerHTML = "";
  
      for (let i = 0; i < len - 1; i++) {
        let min = i;
        for (let j = i + 1; j < len; j++) {
          const valueAIndex = values.indexOf(arr[j].value);
          const valueBIndex = values.indexOf(arr[min].value);
  
          if (valueAIndex < valueBIndex) {
            min = j;
          }
        }
  
        if (min !== i) {
          const temp = arr[i];
          arr[i] = arr[min];
          arr[min] = temp;
          sortingStepsDiv.innerHTML += `<div class="container text-center">${step}</div>`;
        }
      }
      return arr;
    }
  

   


    // SORT BUTTON CLICK EVENT
    sortButton.addEventListener("click", function() {
      const result = sortCards([...drawnCards]); // Sort the drawn cards
      const sortedCards = result; // Get the sorted cards array from the result
      sortedCardContainer.innerHTML = "";
  
      for (let i = 0; i < sortedCards.length; i++) {
        const card = sortedCards[i];
        const sortedCard = document.createElement("div");
        sortedCard.className = "p-3 m-2 border border-success rounded-2 card";
        sortedCard.classList.add(card.suit);
        sortedCard.innerHTML = `
          <div class="topSymbol"></div>
          <div class="num">${card.value}</div>
          <div class="bottomSymbol"></div>
        `;
        sortedCardContainer.appendChild(sortedCard);
      }
    });
  };
  