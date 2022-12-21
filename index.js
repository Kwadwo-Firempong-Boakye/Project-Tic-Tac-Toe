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
//input disallowed if data-attribute is filled
