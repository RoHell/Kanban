$(function() {

	function randomString() {
		var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
		var str = '';
		for (var i = 0; i < 10; i++) {
			str += chars[Math.floor(Math.random() * chars.length)];
		}
		return str;
	}

	function Column(name) {
		var self = this;

		this.id = randomString();
		this.name = name;
		this.$element = createColumn();

		function createColumn() {
			var $row = $('<div>').addClass('row')
			var $column = $('<div>').addClass('column col-s-2 col-sm-4 col-md-3 col-lg-2');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnList = $('<ul>').addClass('column-list');
			// var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			// var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
			var $icnRemove = $('<span>').addClass('glyphicon glyphicon-remove'); // RoHell
			var $btnAdd = $('<button>').text('Add Card').addClass('btn-add'); //RoHell
			var $icnAdd = $('<span>').addClass('glyphicon glyphicon-plus'); // RoHell

			$icnRemove.click(function() {
				self.removeColumn();
			});

			$btnAdd.click(function() {
				self.addCard(new Card(prompt('Wpisz nazwę karty', '... Empty Card...')));
			});

			$btnAdd.append($icnAdd);

			$row.append($column);
			$column.append($columnTitle)
					.append($icnRemove)
					.append($btnAdd)
					.append($columnList);

			return $column;
		}
	}

	Column.prototype.addCard = function(card) {
		this.$element.children('ul').append(card.$element);
	};

	Column.prototype.removeColumn = function() {
		this.$element.remove();
	};

	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard();

		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			// var $cardDelete = $('<button>').addClass('btn-delete').text('x');

			var $icnRemove = $('<span>').addClass('glyphicon glyphicon-remove'); // RoHell

			$icnRemove.click(function() {
				self.removeCard();
			});

			$card.append($icnRemove)
				.append($cardDescription);

			return $card;
		}
	}

	Card.prototype.removeCard = function() {
		this.$element.remove();
	};

	var board = {
		name: 'Tablica Kanban',
		addColumn: function(column) {
			this.$element.append(column.$element);
			initSortable();
		},
		$element: $('#board .column-container')
	};

	function initSortable() {
		$('.column-list').sortable({
			connectWith: '.column-list',
			placeholder: 'card-placeholder'
		}).disableSelection();
	}

	$('.create-column').click(function() {
		var name = prompt('Wpisz nazwę kolumny', 'Task');
		var column = new Column(name);
		board.addColumn(column);
	});

	// TWORZENIE KOLUMN
	var todoColumn = new Column('To Do');
	var doingColumn = new Column('In Progress');
	var verifyColumn = new Column('Verify');
	var doneColumn = new Column('Done');

	// DODAWANIE KOLUMN DO TABLICY
	board.addColumn(todoColumn);
	board.addColumn(doingColumn);
	board.addColumn(verifyColumn);
	board.addColumn(doneColumn);

	// TWORZENIE NOWYCH EGZEMPLARZY KART
	var card1 = new Card('Swobodnie kodować w JS i jQuery');
	var card2 = new Card('Swobodnie obsługiwać Grunt i Git');
	var card3 = new Card('Wykonać aplikację Kamień Nożyczki Papier');
	var card4 = new Card('Wykonać aplikację Kanban');
	var card5 = new Card('Znaleźć pracę jako Front-End Developer');
	var card6 = new Card('Nauczyć się React\'a');

	//DODAWANIE KART DO KOLUMN
	doingColumn.addCard(card1);
	doingColumn.addCard(card2);
	todoColumn.addCard(card5);
	doneColumn.addCard(card3);
	verifyColumn.addCard(card4);
	todoColumn.addCard(card6);
});