var Letter = require("./letter");

function Word(word) {
	this.letters = [];

	for (var i = 0; i < word.length; i++) {
		this.letters[i] = new Letter(word[i]);
	};

	this.guess = function (guess) {
		var correctGuess = false;
		this.letters.forEach(letter => {
			if (letter.guess(guess)) {
				correctGuess = true;
			}
		});

		return correctGuess;
	};

	this.reveal = function () {
		this.letters.forEach(letter => {
			letter.guessed = true;
		});
	};

	this.isGuessed = function () {
		var guessed = true;
		for (var i = 0; guessed && i < this.letters.length; i++) {
			guessed = this.letters[i].guessed;
		}

		return guessed;
	};

	this.getBlanks = function () {
		var str = "";

		this.letters.forEach(letter => {
			str += letter.blank() + " ";
		})

		return str.slice(0, -1);
	};
}


module.exports = Word;