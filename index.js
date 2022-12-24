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
	let _playerName;
	let _playerSymbol;
	let _playerArray = [];
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
	const addToPlayer = (val) => {
		_playerArray.push(val);
	};
	const getPlayerArray = () => {
		return _playerArray;
	};

	return {
		getPlayerName,
		getPlayerSymbol,
		setPlayerName,
		setPlayerSymbol,
		addToPlayer,
		getPlayerArray,
	};
};

//Player Objects
const player1 = playerFactory();
const player2 = playerFactory();

//Game Flow Logic
const gameFlow = () => {
	const _totalTurns = 9;
	const _turnCount = 0;
	const playerTurn = 1;

	const turnAlternator = () => {
		if (playerTurn == player1) {
			playerTurn = player2;
		} else {
			playerTurn = player1;
		}
	};
};

//Create Game Player Details Collection Form
const showForm = () => {
	let _key = 0;
	gameDOM.startButton.disabled = true;
	gameDOM.startButton.classList.remove("start-game-hover");
	setTimeout(() => {
		gameDOM.overlay.style.visibility = "visible";
		gameDOM.gameForm.style.visibility = "visible";
		gameDOM.gameForm.style.transform = "translate(-50%,-50%) scale(1)";
	}, 300);
	gameDOM.gameGridItems.forEach((item) => {
		item.setAttribute("data-key", _key++);
		item.setAttribute("data-played", "no");
	});
};

//Create form disappearing sequence
const hideForm = () => {
	gameDOM.gameForm.style.transform = "translate(-50%,-50%) scale(0)";
	setTimeout(() => {
		gameDOM.gameForm.style.visibility = "hidden";
		gameDOM.overlay.style.visibility = "hidden";
	}, 300);
	gameDOM.startButton.disabled = false;
	gameDOM.startButton.classList.add("start-game-hover");
	// gameDOM.gameForm.reset();
};

// Create additional form validation and export player values
const validateForm = () => {
	player1.setPlayerName(gameDOM.player1.value);
	player1.setPlayerSymbol("x");
	if (!gameDOM.checkBox.checked) {
		if (gameDOM.player2.value == "") {
			gameDOM.player2.setCustomValidity("Enter Player 2 Name");
			gameDOM.player2.reportValidity();
		} else {
			player2.setPlayerName(gameDOM.player2.value);
			player2.setPlayerSymbol("o");
			hideForm();
			gameFlow();
		}
	} else {
		player2.setPlayerName("Computer");
		player2.setPlayerSymbol("o");
		hideForm();
		gameFlow();
	}
	// 	gameDOM.gameGrid.style.border = "4px solid salmon";
	// 	gameDOM.startButton.style.width = "375px";
	// 	gameDOM.startButton.style.background = "rgb(255, 104, 84)";
	// 	gameDOM.startButton.style.padding = "20px";
	// 	gameDOM.startButton.innerHTML = "Player 1, its your turn!";
	// }
};

// Disable player 2 form input if computer checkbox is checked
const disableInput = (e) => {
	if (e.target.checked) {
		gameDOM.player2.disabled = true;
		gameDOM.player2.classList.add("grey-out");
	} else {
		gameDOM.player2.disabled = false;
		gameDOM.player2.classList.remove("grey-out");
	}
};

// Link Game to DOM in IIFE
const gameDOM = (() => {
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

// Create Game Event Listeners in IIFE format
const gameEvents = (() => {
	gameDOM.startButton.addEventListener("click", showForm);
	gameDOM.checkBox.addEventListener("change", disableInput);
	gameDOM.overlay.addEventListener("click", hideForm);
	gameDOM.gameForm.addEventListener("submit", (e) => {
		e.preventDefault();
		validateForm();
	});
	gameDOM.gameGrid.addEventListener("click", (e) => {
		console.log(e.target);
	});
})();
