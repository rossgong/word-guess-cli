function Letter(char) {
	if (typeof char != "string" || !/[A-Z]/.test(char.toUpperCase())) {
		throw "Letter can only represent characters of the Latin alphabet";
	} else if (char.length != 1) {
		throw "\"" + char + "\" is invalid. A Letter can only represent a single character";
	}

	this.char = char.toUpperCase();
	this.guessed = false;

	this.guess = function (guess) {
		if (guess.toUpperCase() === this.char) {
			this.guessed = true;
			return true;
		} else {
			return false;
		}
	}

	this.blank = function () {
		if (this.guessed) {
			return this.char;
		} else {
			return "_";
		}
	}
}

module.exports = Letter;