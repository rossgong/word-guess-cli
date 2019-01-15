var Word = require("./libs/word");
var inquirer = require("inquirer");
var fs = require("fs");
var dict = [];

//Get words from dictionary
fs.readFile("./dict.txt", "utf8", function (err, data) {
	if (err) {
		console.log(err);
	} else {
		dict = data.split("\n");

		//These are important to ensure the termainal control characters that allow the terminal to update
		//lines instead of printing each turns results.
		new Game(dict[Math.floor(Math.random() * dict.length)]).playGame();
	}
});

function Game(word) {
	var word = new Word(word);

	var guesses = [];

	var validateGuess = function (input) {
		if (typeof input != "string" || input.length != 1) {
			return "Guess must be a single character";
		} else if (guesses.includes(input.toUpperCase())) {
			return "This guess must be new";
		} else if (/[A-Z]*/.test(input.toUpperCase())) {
			return "Must be a letter A-Z";
		} else {
			return true;
		}
	}

	var turn = function (wrongs) {
		console.log("" + word);

		if (word.isGuessed()) {
			console.log("Congratulations!")
			askForAnotherGame();
		} else if (wrongs < 5) {
			console.log("Guesses so far: " + guesses.join(" ") + " (" + (5 - wrongs) + " wrongs left)");

			inquirer.prompt([
				{ message: "Which letter do you guess?", name: "guess", validate: validateGuess }
			]).then(function (response) {
				guesses.push(response.guess.toUpperCase());
				if (!word.guess(response.guess)) {
					wrongs++;
					console.log("\x1b[31mWRONG GUESS!!\x1b[0m");
				} else {
					console.log("\x1b[32mCORRECT!\x1b[0m");
				}
				turn(wrongs);
			});
		} else {
			word.reveal();
			console.log(word + " was the word!");
			askForAnotherGame();
		}
	}

	var askForAnotherGame = function () {
		inquirer.prompt([
			{ message: "Would you like to play again?", name: "confirm", type: "confirm" }
		]).then(function (response) {
			if (response.confirm) {
				new Game(dict[Math.floor(Math.random() * dict.length)]).playGame();
			}
		});
	}

	this.playGame = function () {
		guesses = [];

		turn(0);
	}
}

