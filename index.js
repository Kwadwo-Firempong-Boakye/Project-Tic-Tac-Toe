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

	const replay = () => {
		_playerArray = [];
	};

	return {
		getPlayerName,
		getPlayerSymbol,
		setPlayerName,
		setPlayerSymbol,
		addToPlayer,
		getPlayerArray,
		replay,
	};
};

//Player Objects
const player1 = playerFactory();
const player2 = playerFactory();

//Game global properties
const gameMetrics = (() => {
	let turnCount = 0;
	let playerTurn = 1;
	let winnerFound = "false";
	let aiType;
	return {
		playerTurn,
		turnCount,
		winnerFound,
		aiType,
	};
})();

const playWithAi = () => {
	const winArray = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	];

	const randomAi = () => {
		let unplayedGridItems = [];
		gameDOM.gameGridItems.forEach((item) => {
			if (item.dataset.played == "no") {
				unplayedGridItems.push(item.dataset.key);
			}
		});
		let randomIndex = Math.floor(Math.random() * unplayedGridItems.length);
		let keyToPlay = unplayedGridItems[randomIndex];
		let item = document.querySelector(`[data-key = "${keyToPlay}"]`);

		player2.addToPlayer(+keyToPlay);
		let src = "./circle-svgrepo-com.svg";
		gameMetrics.playerTurn = 1;
		gameDOM.startButton.innerHTML = `Hey <span>${player1.getPlayerName()}</span>, play your <span>X</span>`;
		gameDOM.startButton.classList.remove("animate-text");

		item.children[0].setAttribute("src", src);
		item.dataset.played = "yes";
		gameMetrics.turnCount += 1;
		gameDOM.gameGrid.classList.remove("game-grid-disable");

		if (gameMetrics.turnCount > 4) {
			winCondition();
		}
	};

	const smartAi = () => {
		if (gameDOM.gameGridItems[4].dataset.played == "no") {
			player2.addToPlayer(5);
			let src = "./circle-svgrepo-com.svg";
			gameMetrics.playerTurn = 1;
			gameDOM.startButton.innerHTML = `Hey <span>${player1.getPlayerName()}</span>, play your <span>X</span>`;
			gameDOM.startButton.classList.remove("animate-text");

			gameDOM.gameGridItems[4].children[0].setAttribute("src", src);
			gameDOM.gameGridItems[4].dataset.played = "yes";
			gameMetrics.turnCount += 1;
			gameDOM.gameGrid.classList.remove("game-grid-disable");

			if (gameMetrics.turnCount > 4) {
				winCondition();
			}
		} else if (gameMetrics.turnCount < 3) {
			randomAi();
		} else if (gameMetrics.turnCount > 2) {
			let opponentArray = player1.getPlayerArray();
			let aiArray = player2.getPlayerArray();
			let unplayedGridItems = [];
			let allPlayer1Combinations = [];
			let allPlayer2Combinations = [];
			let blockWin = [];
			let takeWin = [];

			gameDOM.gameGridItems.forEach((item) => {
				if (item.dataset.played == "no") {
					unplayedGridItems.push(item.dataset.key);
				}
			});

			unplayedGridItems.forEach((item) => {
				allPlayer1Combinations.push(opponentArray.concat(+item));
				allPlayer2Combinations.push(aiArray.concat(+item));
			});

			//Take each Win Array sub-array
			winArray.forEach((subArr) => {
				//For each winning sub-array, take each potential play combination
				if (blockWin.length == 0) {
					allPlayer1Combinations.forEach((possibility) => {
						//find out if any of the possibilities contains all of that winning sub-array's numbers
						if (
							blockWin.length == 0 &&
							subArr.every((num) => {
								return possibility.includes(num);
							})
						) {
							//If it does contain a winning combination, push the last number of the possibility array to a block-win array
							blockWin.push(possibility[possibility.length - 1]);
						}
					});
				}

				if (takeWin.length == 0) {
					allPlayer2Combinations.forEach((possibility) => {
						if (
							takeWin.length == 0 &&
							subArr.every((num) => {
								return possibility.includes(num);
							})
						) {
							takeWin.push(possibility[possibility.length - 1]);
						}
					});
				}
			});

			if (blockWin.length == 0 && takeWin.length == 0) {
				randomAi();
			} else {
				let keyToPlay;
				if (takeWin.length > 0) {
					keyToPlay = takeWin[0];
				} else {
					keyToPlay = blockWin[0];
				}
				let item = document.querySelector(`[data-key = "${keyToPlay}"]`);

				player2.addToPlayer(+keyToPlay);
				let src = "./circle-svgrepo-com.svg";
				gameMetrics.playerTurn = 1;
				gameDOM.startButton.innerHTML = `Hey <span>${player1.getPlayerName()}</span>, play your <span>X</span>`;
				gameDOM.startButton.classList.remove("animate-text");

				item.children[0].setAttribute("src", src);
				item.dataset.played = "yes";
				gameMetrics.turnCount += 1;
				gameDOM.gameGrid.classList.remove("game-grid-disable");

				if (gameMetrics.turnCount > 4) {
					winCondition();
				}
			}
		}
	};

	let playStyle = Math.floor(Math.random() * 10);

	if (!gameMetrics.aiType) {
		if (playStyle < 4) {
			gameMetrics.aiType = "random";
		} else {
			gameMetrics.aiType = "smart";
		}
	}

	if (gameMetrics.aiType == "random") {
		randomAi();
	} else if (gameMetrics.aiType == "smart") {
		smartAi();
	}
};

//Logic to control Game-play sequence
const gameLogic = (e) => {
	if (player2.getPlayerName() == "Computer") {
		gameDOM.gameGrid.classList.add("game-grid-disable");
	}
	let gridItem = e.target;
	let gridItemState = e.target.dataset;
	let gridItemNum = e.target.dataset.key;
	let src;
	//If grid item has already been played on, show message
	if (gridItemState.played == "yes") {
		gameDOM.subDisplay.innerHTML = "Oops! That space is already taken.";
		gameDOM.subDisplay.style.opacity = 1;
		setTimeout(() => {
			gameDOM.subDisplay.style.opacity = 0;
		}, 2000);

		//If grid item has not been played on:
	} else if (gridItemState.played == "no") {
		//manipulate player turn, src value, game message
		if (gameMetrics.playerTurn == 1) {
			player1.addToPlayer(+gridItemNum);
			src = "./x-lg-svgrepo-com.svg";
			gameMetrics.playerTurn = 2;
			setTimeout(() => {
				gameDOM.startButton.classList.add("animate-text");
				gameDOM.startButton.innerHTML = `Hey <span>${player2.getPlayerName()}</span>, play your <span>O</span>`;
			}, 50);
			setTimeout(() => {
				gameDOM.startButton.classList.remove("animate-text");
				if (
					player2.getPlayerName() == "Computer" &&
					gameMetrics.playerTurn == 2 &&
					gameMetrics.winnerFound == "false"
				) {
					playWithAi();
				}
			}, 1200);
		} else if (gameMetrics.playerTurn == 2) {
			player2.addToPlayer(+gridItemNum);
			src = "./circle-svgrepo-com.svg";
			gameMetrics.playerTurn = 1;
			setTimeout(() => {
				gameDOM.startButton.classList.add("animate-text");
				gameDOM.startButton.innerHTML = `Hey <span>${player1.getPlayerName()}</span>, play your <span>X</span>`;
			}, 50);
			setTimeout(() => {
				gameDOM.startButton.classList.remove("animate-text");
			}, 1200);
		}
		//set src on DOM, set grid state and increase turn count
		gridItem.children[0].setAttribute("src", src);
		gridItemState.played = "yes";
		gameMetrics.turnCount += 1;
	}

	// if (gameMetrics.turnCount > 4) {
	winCondition();
	// }
};

//Function to store and check win condition
const winCondition = () => {
	//win combinations
	const winArray = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	];

	//Matching game win combination
	let isWin;
	let winner;

	if (gameMetrics.playerTurn == 2) {
		let player1Arr = player1.getPlayerArray();
		winArray.forEach((subArr) => {
			if (
				subArr.every((item) => {
					return player1Arr.includes(item);
				})
			) {
				isWin = subArr;
			}
		});
	} else if (gameMetrics.playerTurn == 1) {
		let player2Arr = player2.getPlayerArray();
		winArray.forEach((subArr) => {
			if (
				subArr.every((item) => {
					return player2Arr.includes(item);
				})
			) {
				isWin = subArr;
			}
		});
	}

	if (isWin) {
		gameMetrics.winnerFound = "true";
		if (gameMetrics.playerTurn == 1) {
			winner = player2.getPlayerName();
		} else if (gameMetrics.playerTurn == 2) {
			winner = player1.getPlayerName();
		}
		console.log(isWin, winner);
		endGame(isWin, winner);
	} else if (gameMetrics.turnCount == 9) {
		drawGame();
	} else {
		console.log("not yet");
	}
};

//Game button to display converter
const beginGame = (status) => {
	//CHANGE START GAME BUTTON TO DISPLAY
	if (status == "init") {
		gameDOM.startButton.disabled = true;
		gameDOM.startButton.classList.remove("start-game-hover");
		gameDOM.startButton.style.width = "345px";
		gameDOM.startButton.style.padding = "30px";
		setTimeout(() => {
			gameDOM.startButton.classList.add("start-game-animate");
			gameDOM.gameGrid.classList.remove("game-grid-disable");
			gameDOM.gameGrid.style.cursor = "pointer";
			gameDOM.startButton.innerHTML = `Hey <span>${player1.getPlayerName()}</span>, it's your turn.`;
		}, 600);
	}
};

const endGame = (arr, player) => {
	console.log("end game triggered", arr);
	gameDOM.gameGrid.classList.add("game-grid-disable");
	gameDOM.gameSymbols.forEach((symbol) => {
		if (
			(arr,
			symbol.parentElement.dataset.key,
			arr.includes(+symbol.parentElement.dataset.key))
		) {
			symbol.style.zIndex = 2;
			symbol.parentElement.style.background = "var(--tac-yellow)";
		}

		gameDOM.startButton.classList.remove("start-game-animate", "animate-text");
		gameDOM.startButton.style.transform = "scale(0)";
		setTimeout(() => {
			gameDOM.startButton.classList.add("player-wins");
			gameDOM.startButton.style.transform = "scale(1)";
			if (player != "Computer") {
				gameDOM.startButton.innerHTML = `${player} wins!!! 🥳`;
			} else {
				gameDOM.startButton.innerHTML = `${player} wins... 😭`;
			}
			gameDOM.resetButton.style.opacity = "1";
			gameDOM.restartButton.style.opacity = "1";
			gameDOM.resetButton.scrollIntoView({ behavior: "smooth" });
		}, 1000);
	});
	setTimeout(() => {
		gameDOM.resetButton.style.display = "block";
		gameDOM.restartButton.style.display = "block";
		gameDOM.resetButton.scrollIntoView({ behavior: "smooth" });
	}, 3000);
};

const drawGame = () => {
	gameMetrics.winnerFound = "draw";
	gameDOM.gameGrid.classList.add("game-grid-disable");
	gameDOM.gameSymbols.forEach((symbol) => {
		symbol.style.zIndex = 2;
		symbol.parentElement.style.background = "var(--animate-text)";
	});
	gameDOM.startButton.classList.remove("start-game-animate", "animate-text");
	gameDOM.startButton.style.transform = "scale(0)";
	gameDOM.resetButton.style.display = "block";

	setTimeout(() => {
		gameDOM.startButton.classList.add("player-wins");
		gameDOM.startButton.style.transform = "scale(1)";
		gameDOM.startButton.innerHTML = `Its a tie 🤝`;
		gameDOM.resetButton.style.opacity = "1";
		gameDOM.restartButton.style.opacity = "1";
	}, 1000);
	setTimeout(() => {
		gameDOM.resetButton.style.display = "block";
		gameDOM.restartButton.style.display = "block";
		gameDOM.resetButton.scrollIntoView();
	}, 3000);
};

const playAgain = () => {
	player1.replay();
	player2.replay();
	gameMetrics.turnCount = 0;
	gameMetrics.playerTurn = 1;
	gameMetrics.winnerFound = "false";
	gameMetrics.aiType = undefined;
	gameDOM.gameGridItems.forEach((item) => {
		item.children[0].setAttribute("src", "");
	});
	gameDOM.gameSymbols.forEach((symbol) => {
		symbol.style.zIndex = -3;
		symbol.parentElement.style.background = "none";
		symbol.parentElement.style.background = "none";
	});
	gameDOM.startButton.classList.remove("player-wins");
	gameDOM.resetButton.style.opacity = "1";
	gameDOM.restartButton.style.opacity = "1";
	gameDOM.resetButton.style.display = "none";
	gameDOM.restartButton.style.display = "none";
	showForm();
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
	let startButtonText = document.querySelector(".button-text");
	let subDisplay = document.querySelector(".sub-display");
	let gameGrid = document.querySelector(".game-grid");
	let gameGridItems = document.querySelectorAll(".game-grid-item");
	let gameGridItem = document.querySelector(".game-grid-item");
	let gameSymbols = document.querySelectorAll(".game-symbol");
	let gameForm = document.querySelector("form");
	let checkBox = gameForm.querySelector('input[type="checkbox"]');
	let player1 = gameForm.querySelector('input[name="player1"]');
	let player2 = gameForm.querySelector('input[name="player2"]');
	let overlay = document.querySelector(".overlay");
	let resetButton = document.querySelector(".reset");
	let restartButton = document.querySelector(".restart");
	return {
		gameInfo,
		startButton,
		startButtonText,
		subDisplay,
		gameGrid,
		gameGridItems,
		gameGridItem,
		gameSymbols,
		gameForm,
		overlay,
		checkBox,
		player1,
		player2,
		resetButton,
		restartButton,
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
	gameDOM.subDisplay.addEventListener("dblclick", () => {
		window.location.reload();
	});
	gameDOM.resetButton.addEventListener("click", () => {
		window.location.reload();
	});
	gameDOM.restartButton.addEventListener("click", playAgain);
})();
