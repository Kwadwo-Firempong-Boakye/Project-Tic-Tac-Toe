//SUMMARY
//tic tac toe is a game of 2 players and one board

//PLAYERS
//each player has a unique symbol identifier
//each player has a turn count
//each player can make a play on alternating counts

//GAME FLOW
//game has a maximum of 9 turns
//player that starts the game has 5 turns and plays on odd counts
//player that follows has 4 turns plays on even counts
//game has a win condition checker each turn after 5 turns have been played
//game has a draw condition checker on the 8th turn.

//WIN CONDITION CHECKER
//each grid item will have a data attribute of a number
//win condition will check the data attribute numbers for win combinations
//win combinations will be pre-programmed into an array

//DRAW CONDITION CHECKER
//function will check if win condition exists if that last grid item receives alternative marker

//GAME DISPLAY
//game has a 3X3 grid board
//each grid item will have an src filled by the player symbol
//each grid item will have a data-attribute carrying the player symbol
//each grid item will have a data-attribute indicating if it has been played in
//input disallowed if data-attribute is filled

//Create Player API
const playerFactory = () => {
	let _playerName = "";
	let _playerSymbol = "";
	const getPlayerName = () => {
		return _playerName;
	};
	const getPlayerSymbol = () => {
		return _playerSymbol;
	};
	const setPlayerName = (newName) => {
		_playerName = newName;
	};
	const setPlayerSymbol = (symbol) => {
		_playerSymbol = symbol;
	};

	return {
		getPlayerName,
		getPlayerSymbol,
		setPlayerName,
		setPlayerSymbol,
	};
};

const gameBoard = () => {
    const _player1Array = [];
    const _player2Array = [];
    const addToArray = (arrName, val) => {
        arrName.push(val);
    }
    return {
        addToArray
    }
};

// Link Game to DOM
const gameDisplay = (() => {
	let gameContainer = document.querySelector("#game-container");
	let gameInfo = document.querySelector(".game-info");
	let startButton = document.querySelector(".start-game");
	let subDisplay = document.querySelector(".sub-display");
	let gameGrid = document.querySelector(".game-grid");
	let gameGridItems = document.querySelectorAll(".game-grid-item");
	let gameForm = document.querySelector("form");
	let checkBox = gameForm.querySelector('input[type="checkbox"]');
	let player1 = gameForm.querySelector('input[name="player1"]');
	let player2 = gameForm.querySelector('input[name="player2"]');
	let overlay = document.querySelector(".overlay");
	return {
		gameInfo,
		startButton,
		subDisplay,
		gameGrid,
		gameGridItems,
		gameForm,
		overlay,
		checkBox,
		player1,
		player2,
	};
})();

//Create Game Player Details Collection Form
const showForm = () => {
	let _key = 0;
	gameDisplay.startButton.disabled = true;
	gameDisplay.startButton.classList.remove("start-game-hover");
	setTimeout(() => {
		gameDisplay.overlay.style.visibility = "visible";
		gameDisplay.gameForm.style.visibility = "visible";
		gameDisplay.gameForm.style.transform = "translate(-50%,-50%) scale(1)";
	}, 300);
	gameDisplay.gameGridItems.forEach((item) => {
		item.setAttribute("data-key", _key++);
		item.setAttribute("data-played", "no");
	});
};

//Create form disappearing sequence
const hideForm = () => {
	gameDisplay.gameForm.style.transform = "translate(-50%,-50%) scale(0)";
	setTimeout(() => {
		gameDisplay.gameForm.style.visibility = "hidden";
		gameDisplay.overlay.style.visibility = "hidden";
	}, 300);
	gameDisplay.startButton.disabled = false;
	gameDisplay.startButton.classList.add("start-game-hover");
	gameDisplay.gameForm.reset();
};

// Create game starting protocol
const validateForm = () => {
	if (!gameDisplay.checkBox.checked) {
		if (gameDisplay.player2.value == "") {
			gameDisplay.player2.setCustomValidity("Enter Player 2 Name");
			gameDisplay.player2.reportValidity();
		}
	} else {
		createPlayers();
	}

	// player1Value,
	// player2Value

	// if (gameDisplay.checkBox.checked) {
	// 	gameDisplay.player2.removeAttribute("required");
	// 	hideForm();
	// 	gameDisplay.gameGrid.style.border = "4px solid salmon";
	// 	gameDisplay.startButton.style.width = "375px";
	// 	gameDisplay.startButton.style.background = "rgb(255, 104, 84)";
	// 	gameDisplay.startButton.style.padding = "20px";
	// 	gameDisplay.startButton.innerHTML = "Player 1, its your turn!";
	// }
};

const disableInput = (e) => {
	if (e.target.checked) {
		gameDisplay.player2.disabled = true;
		gameDisplay.player2.classList.add("grey-out");
	} else {
		gameDisplay.player2.disabled = false;
		gameDisplay.player2.classList.remove("grey-out");
	}
};

// Create Game Event Listeners
const gameEvents = (() => {
	gameDisplay.startButton.addEventListener("click", showForm);
	gameDisplay.checkBox.addEventListener("change", disableInput);
	gameDisplay.overlay.addEventListener("click", hideForm);
	gameDisplay.gameForm.addEventListener("submit", (e) => {
		e.preventDefault();
		validateForm();
	});
	// console.log(gameDisplay.startButton);
})();
