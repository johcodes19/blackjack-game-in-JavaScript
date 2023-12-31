document.addEventListener("DOMContentLoaded", () => {
    const gameDiv = document.getElementById("gameDiv");
    const elements = ["label", "input", "button"];
    const [label, input, submit] = elements.map(el => document.createElement(el));
    let start;  // Define 'start' here
    let h3, scoreHeading, anotherBtn, displayMsg;  // Define these variables here

    label.textContent = "What is your name?";
    submit.textContent = "SUBMIT";
    [label, input, submit].forEach(el => gameDiv.appendChild(el));

    submit.addEventListener("click", () => {
        let name = input.value;
        if (!name) return alert("Please enter your name!!!!");

        let player = document.createElement("h4");
        player.innerHTML = `Player: ${name}`;
        gameDiv.appendChild(player);
        [label, input, submit].forEach(el => el.style.display="none");

        start = createButton("START GAME");  // Assign 'start' here
        gameDiv.appendChild(start);
        start.addEventListener("click", () => {
            // Remove previous game elements if they exist
            if (h3) h3.remove();
            if (scoreHeading) scoreHeading.remove();
            if (anotherBtn) anotherBtn.remove();
            if (displayMsg) displayMsg.remove();

            start.disabled = true;  // disable the start button when game starts
            startGame();
        });
    });

    function createButton(text) {
        let btn = document.createElement("button");
        btn.innerHTML = text;
        return btn;
    }

    function randomCard() {
        let card = Math.floor(Math.random() * 13 + 1);
        return card === 1 || card > 10 ? 10 : card;
    }

    function startGame() {
        
        let [random1, random2] = [randomCard(), randomCard()];
        let sum = random1 + random2;
        h3 = document.createElement("h3");
        h3.innerHTML = `The cards you have selected are: ${random1} , ${random2}`;
        gameDiv.appendChild(h3);

        scoreHeading = document.createElement("h3");
        scoreHeading.innerHTML = `SUM: ${sum}`;
        gameDiv.appendChild(scoreHeading);

        if (sum < 27) {
            anotherBtn = createButton("Another Card");
            gameDiv.appendChild(anotherBtn);
            anotherBtn.addEventListener("click", () => {
                let anotherCard = randomCard();
                h3.innerHTML += `, ${anotherCard}`;
                sum += anotherCard;
                scoreHeading.innerHTML = `SUM: ${sum}`

                if (sum > 27 || sum === 27) {
                    anotherBtn.disabled = true;
                    displayMessage(sum > 27 ? `OOOPS!!! YOU ARE OUT OF THE GAME!!!` : `WOOAAH!!!! YOU HAVE WON THE GAME!!!`);
                    // Add a delay before enabling the start button
                    setTimeout(() => {
                        start.disabled = false;  // enable the start button when game is over
                    }, 10000);  // delay of 10 seconds
                }
            });
        }
    }

    function displayMessage(msg) {
        displayMsg = document.createElement("h3");
        displayMsg.innerHTML = msg;
        
        // Add animation
        displayMsg.style.animationName = "colorfulAnimation";
        displayMsg.style.animationDuration = "10s";
        
        gameDiv.appendChild(displayMsg);
    }
});
