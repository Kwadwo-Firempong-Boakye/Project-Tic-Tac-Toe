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

//Game global properties
const gameMetrics = (() => {
	let turnCount = 0;
	let playerTurn = 1;
	// const setPlayerTurn = (num) => {
	// 	_playerTurn = num;
	// };
	// const increaseTurnCount = () => {
	//     _turnCount++;
	// };
	return {
		playerTurn,
		turnCount,
		// setPlayerTurn,
		// increaseTurnCount,
	};
})();

//Instance of Game Metrics Factory Function
// let newMetrics = gameMetrics();

//Logic to control Game-play sequence
const gameLogic = (e) => {
	let gridItem = e.target;
	let gridItemState = e.target.dataset;
	let gridItemNum = e.target.dataset.key;
	let src;
	//If grid item has already been played on, show message
	if (gridItemState.played == "yes") {
		gameDOM.subDisplay.innerHTML = "Oops! Your opponent already played there.";
		gameDOM.subDisplay.style.opacity = 1;
		setTimeout(() => {
			gameDOM.subDisplay.style.opacity = 0;
		}, 2500);
	//If grid item has not been played on:
	} else if (gridItemState.played == "no") {
		//manipulate player turn, src value, game message
		if (gameMetrics.playerTurn == 1) {
			src = "./x-lg-svgrepo-com.svg";
			gameMetrics.playerTurn = 2;
			setTimeout(() => {
				gameDOM.startButton.classList.add("animate-text");
				gameDOM.startButton.innerHTML = `Hey <span>${player2.getPlayerName()}</span>, play your <span>O</span>`;
			}, 50);
			setTimeout(() => {
				gameDOM.startButton.classList.remove("animate-text");
			}, 1500);
		} else if (gameMetrics.playerTurn == 2) {
			src = "./circle-svgrepo-com.svg";
			gameMetrics.playerTurn = 1;
			setTimeout(() => {
				gameDOM.startButton.classList.add("animate-text");
				gameDOM.startButton.innerHTML = `Hey <span>${player1.getPlayerName()}</span>, play your <span>X</span>`;
			}, 50);
			setTimeout(() => {
				gameDOM.startButton.classList.remove("animate-text");
			}, 1500);
		}
		//set src on DOM and set grid state
		gridItem.children[0].setAttribute("src", src);
		gridItemState.played = "yes";
		//increase turn count
		gameMetrics.turnCount += 1;
		//
	}
	// console.log(gridItemState);
	// if (gameMetrics.playerTurn == 1 & gameMetrics.turnCount <= 9) {
	//     player1.addToPlayer()
	// }
	// gameMetrics.turnCount += 1;
};

//Game button to display converter
const beginGame = (status) => {
	//CHANGE START GAME BUTTON TO DISPLAY
	if (status == "init") {
		gameDOM.startButton.disabled = true;
		gameDOM.startButton.classList.remove("start-game-hover");
		gameDOM.startButton.style.width = "365px";
		gameDOM.startButton.style.padding = "30px";
		setTimeout(() => {
			gameDOM.startButton.classList.add("start-game-animate");
			gameDOM.gameGrid.classList.remove("game-grid-disable");
			gameDOM.gameGrid.style.cursor = "pointer";
			// gameDOM.startButton.style.color = "salmon";
			gameDOM.startButton.innerHTML = `Hey <span>${player1.getPlayerName()}</span>, it's your turn.`;
		}, 600);
	}
	// const turnAlternator = () => {
	// 	if (playerTurn == player1) {
	// 		playerTurn = player2;
	// 	} else {
	// 		playerTurn = player1;
	// 	}
	// };
};

//Create Game Player Details Collection Form
const showForm = () => {
	let key = 1;
	gameDOM.startButton.disabled = true;
	gameDOM.startButton.classList.remove("start-game-hover");
	setTimeout(() => {
		gameDOM.overlay.style.visibility = "visible";
		gameDOM.gameForm.style.visibility = "visible";
		gameDOM.gameForm.style.transform = "translate(-50%,-50%) scale(1)";
	}, 300);
	gameDOM.gameGridItems.forEach((item) => {
		item.setAttribute("data-key", key++);
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
	player1.setPlayerSymbol("./x-lg-svgrepo-com.svg");
	if (!gameDOM.checkBox.checked) {
		if (gameDOM.player2.value == "") {
			gameDOM.player2.setCustomValidity("Enter Player 2 Name");
			gameDOM.player2.reportValidity();
		} else {
			player2.setPlayerName(gameDOM.player2.value);
			player2.setPlayerSymbol("./circle-svgrepo-com.svg");
			hideForm();
			beginGame("init");
		}
	} else {
		player2.setPlayerName("Computer");
		player2.setPlayerSymbol("./circle-svgrepo-com.svg");
		hideForm();
		beginGame("init");
	}
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
	let gameGridItem = document.querySelector(".game-grid-item");
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
		gameGridItem,
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
	gameDOM.gameGrid.addEventListener("click", gameLogic);
})();
