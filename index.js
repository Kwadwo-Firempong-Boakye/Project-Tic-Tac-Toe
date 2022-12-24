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
        getPlayerArray
	};
};

const gameFlow = () => {
	const totalTurns = 9;
	const turnCount = 0;

    let playerValues = validateForm();
	let player1 = playerFactory();
	let player2 = playerFactory();

	player1.setPlayerName(playerValues.getPlayer1Value());
	player1.setPlayerSymbol("x");
	player2.setPlayerName(playerValues.getPlayer2Value());
	player2.setPlayerSymbol("o");

    let newGame = gameBoard()

    const playerTurn = player1;
    const turnAlternator = () => {
        if (playerTurn == player1) {
            playerTurn = player2;
        } else {
            playerTurn = player1
        }
    }
};

// Link Game to DOM in IIFE
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
	// gameDisplay.gameForm.reset();
};

// Create additional form validation and export player values
const validateForm = () => {
	let _player1Value = gameDisplay.player1.value;
	let _player2Value;
	if (!gameDisplay.checkBox.checked) {
		if (gameDisplay.player2.value == "") {
			gameDisplay.player2.setCustomValidity("Enter Player 2 Name");
			gameDisplay.player2.reportValidity();
		} else {
			_player2Value = gameDisplay.player2.value;
		}
	} else {
		_player2Value = "Computer";
	}

	const getPlayer1Value = () => _player1Value;
	const getPlayer2Value = () => _player2Value;
    hideForm();
    gameFlow();
	return {
		getPlayer1Value,
		getPlayer2Value,
	};
	// 	gameDisplay.gameGrid.style.border = "4px solid salmon";
	// 	gameDisplay.startButton.style.width = "375px";
	// 	gameDisplay.startButton.style.background = "rgb(255, 104, 84)";
	// 	gameDisplay.startButton.style.padding = "20px";
	// 	gameDisplay.startButton.innerHTML = "Player 1, its your turn!";
	// }
};

// Disable player 2 form input if computer checkbox is checked
const disableInput = (e) => {
	if (e.target.checked) {
		gameDisplay.player2.disabled = true;
		gameDisplay.player2.classList.add("grey-out");
	} else {
		gameDisplay.player2.disabled = false;
		gameDisplay.player2.classList.remove("grey-out");
	}
};

// Create Game Event Listeners in IIFE format
const gameEvents = (() => {
	gameDisplay.startButton.addEventListener("click", showForm);
	gameDisplay.checkBox.addEventListener("change", disableInput);
	gameDisplay.overlay.addEventListener("click", hideForm);
	gameDisplay.gameForm.addEventListener("submit", (e) => {
		e.preventDefault();
		validateForm();
	});
})();
