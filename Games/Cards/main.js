(function () {
  function checkCards(deck, chars) {
  	return deck.filter(function(item, index) {
  		return item.indexOf(chars) == 0;
  	});
  }

  var cardShuffle = {
	nums: [1,2,3,4,5,6,7,8,9,10,11,12,13],
	faces: ["H", "D", "C", "S"],
	createDeck: function() {
		var cards = [];

		for (var i = 0; i < cardShuffle.nums.length; i++ ) {
			for (var j = 0; j < cardShuffle.faces.length; j++) {
				cards.push(cardShuffle.nums[i] + "-" + cardShuffle.faces[j])
			}
		}

		return cards
	},
	shuffleDeck: function(cards) {

		if (cards == undefined) {
			return;
		}

		var shuffled = [];

		while (cards.length) {
			var rnd = Math.floor(Math.random() * cards.length) + 0;
			shuffled.push(cards[rnd]);
	    	cards.splice(rnd,1);
		}

		return shuffled;
	}
}

  var game = {
	cards: [],
	shuffled: [],
	fivecards: [],
	els: {
		deal: document.getElementById('deal-cards'),
		done: document.getElementById('iamok-btn'),
		replace: document.getElementById('replace-cards'),
		results: document.getElementById('results'),
		pts_left: document.getElementById('pts_left'),
		reset: document.getElementById('reset')
	},
	result: 5,

	setupDeck: function() {
		game.cards, game.shuffled, game.fivecards = [];
		game.els.deal.className = "";

		for (var i = 0; i < 5; ++i) {
			document.querySelectorAll('.cards')[i].className = "cards";
		}

		game.cards = cardShuffle.createDeck();
		game.shuffled = cardShuffle.shuffleDeck(game.cards);
	},

	getFiveCards: function() {
		game.fivecards = [];

		for (var i = 0; i < 5; ++i) {
			game.fivecards.push(game.shuffled[0]);
			game.shuffled.splice(0,1);
		}
	},

	cardFunction: function() {

		if (game.fivecards.length > 1 && !this.children[0].classList.contains("replacement") && !this.children[0].classList.contains("dealt-already")) {
			var card = this.children[0].className.split(' ')[1].replace("card-","");

			var index = game.fivecards.indexOf(card);
			game.fivecards.splice(index, 1);

			this.children[0].className = 'cards replacement'
		}

	},

	displayCards: function() {
		if (!game.els.deal.classList.contains('dealt')) {
			for (var i = 0; i < document.querySelectorAll('.cards').length; i++) {

				document.querySelectorAll('.cards')[i].className += ' card-' + game.fivecards[i];
			}
		}

		game.els.deal.className += " dealt";
	},

	checkCardResults: function() {
		var numbers = [],
			suits = [],
			pairs = 0, threes = 0, fours = 0;
		var cardcount = {}, colorcount = {};
		var flush = false, ascending = false;;

		function compareNumbers(a, b) {
			return a - b;
		}

		function checkAscending(arr) {
			var check = [];

			for (var i = 0; i < arr.length + 1; i++) {
			    if (arr[i + 1] == arr[i] + 1) {
			        check.push(true);
			    }
			}

			if (arr[0] == 1 && arr[1] == 10 && check.length == 3) {
				return true;
			} else if (check.length == 4) {
				return true;
			} else {
				return false;
			}
		}


		// Split card values and suits
		for (var i = 0; i < 5; i++) {
			numbers.push(parseInt(game.fivecards[i].split("-")[0]));
			suits.push(game.fivecards[i].split("-")[1]);
		}

		// Sort Numbers
		numbers.sort(compareNumbers);

    	// Get Numbers of numbers and suits
		numbers.forEach(function(i) {
			cardcount[i] = (cardcount[i] || 0) + 1;
		});

		suits.forEach(function(i) {
			colorcount[i] = (colorcount[i] || 0) + 1;
		});

		// check for flush
		for (var nums in colorcount) {
			if (colorcount[nums] == 5) {
				flush = true;
			}
		}

		// Lets check if numbers ascend by 1
		if (checkAscending(numbers)) {
			ascending = true;
		}

		// check for pairs, threes and four of a kind
		for (var nums in cardcount) {
			if (cardcount[nums] == 2) {
				pairs++;
			} else if (cardcount[nums] == 3) {
				threes++;
			} else if (cardcount[nums] == 4) {
				fours++;
			}
		}

		// Now for Results
		var parentElement = document.getElementById('results'),
			theFirstChild = parentElement.firstChild,
			paragraph = document.createElement("p");

		if (ascending && flush && numbers[0] == 1 && numbers[1] == 10) {
			paragraph.innerHTML = "Royal Flush"; // 2500
			game.result += 2500;
		} else if (ascending && flush) {
			paragraph.innerHTML = "Straight Flush"; // 250
			game.result += 250;
		} else if (fours == 1) {
			paragraph.innerHTML = "Four of a Kind"; // 100
			game.result += 100;
		} else if (threes == 1 && pairs == 1) {
			paragraph.innerHTML = "Full House"; // 50
			game.result += 50;
		} else if (flush) {
			paragraph.innerHTML = "Flush"; // 20
			game.result += 20;
		} else if (ascending) {
			paragraph.innerHTML = "Straight"; // 15
			game.result += 10;
		} else if (threes == 1) {
			paragraph.innerHTML = "Three of a kind"; // 4
			game.result += 3;
		} else if (pairs == 2){
			paragraph.innerHTML = "Two Pairs"; // 3
			game.result += 2;
		} else if (pairs == 1) {
			paragraph.innerHTML = "Pair"; // 2
			game.result += 1;
		} else {
			paragraph.innerHTML = "Nothing";
			game.result -= 1;
		}

		parentElement.insertBefore(paragraph, theFirstChild);

		game.displayResults();

		for (var i = 0; i < document.querySelectorAll('.cards').length; i++) {
			document.querySelectorAll('.cards')[i].className += ' dealt-already';
		}

		if (game.result == 0) {
			game.els.deal.style.display = "none";
			game.els.replace.style.display = "none";
			game.els.reset.style.display = "block";
		} else {
			game.els.deal.style.display = "block";
			game.els.replace.style.display = "none";
		}
	},

	displayResults: function() {
		game.els.pts_left.children[0].innerHTML = game.result;

		if (game.result == 0) {
			game.els.pts_left.children[0].innerHTML = "No More credits";
		}
	},

	bindDeal: function() {
		game.els.deal.addEventListener('click', function() {
			game.setupDeck();
			this.style.display = "none";
			game.els.replace.style.display = "block";
			game.getFiveCards();
			game.displayCards();

		});
	},

	bindCardClicks: function() {
		document.getElementById('card-one').addEventListener('click', game.cardFunction);
		document.getElementById('card-two').addEventListener('click', game.cardFunction);
		document.getElementById('card-three').addEventListener('click', game.cardFunction);
		document.getElementById('card-four').addEventListener('click', game.cardFunction);
		document.getElementById('card-five').addEventListener('click', game.cardFunction);
	},

	bindReplaceCards: function() {
		game.els.replace.addEventListener('click', function() {
			var replacement_length = document.querySelectorAll(".replacement").length;

				for (var i = 0; i < replacement_length; i++) {
					game.fivecards.push(game.shuffled[0]);
					document.querySelectorAll(".replacement")[0].className = "cards card-" + game.shuffled[0];
					game.shuffled.splice(0,1);

				}
				game.checkCardResults();
		});
	},

	bindReset: function() {
		game.els.reset.addEventListener('click', function(e) {
			e.preventDefault();

			game.result = 5;
			game.els.pts_left.children[0].innerHTML = game.result;
			game.setupDeck();
			game.els.deal.style.display = "block";
			this.style.display = "none";

			var element = game.els.results;
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
		})
	},

	init: function() {
		game.displayResults();
		game.bindCardClicks();
		game.bindDeal();
		game.bindReplaceCards();
		game.bindReset();
	}
}

  game.init();
})();
