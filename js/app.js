// function randomString() {
// 	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'.split();
// 	var str = '';
// 	for (var i = 0; i < 10; i++) {
// 		str += chars[Math.floor(Math.random() * chars.length)];
// 	}
// 	return str;
// }

// // TWORZENIE KOLUMN
// var todoColumn = new Column('To Do');
// var doingColumn = new Column('In Progress');
// var verifyColumn = new Column('Verify');
// var doneColumn = new Column('Done');

// // DODAWANIE KOLUMN DO TABLICY
// board.addColumn(todoColumn);
// board.addColumn(doingColumn);
// board.addColumn(verifyColumn);
// board.addColumn(doneColumn);

// // TWORZENIE NOWYCH EGZEMPLARZY KART
// var card1 = new Card('Swobodnie kodować w JS i jQuery');
// var card2 = new Card('Swobodnie obsługiwać Grunt i Git');
// var card3 = new Card('Wykonać aplikację Kamień Nożyczki Papier');
// var card4 = new Card('Wykonać aplikację Kanban');
// var card5 = new Card('Znaleźć pracę jako Front-End Developer');
// var card6 = new Card('Nauczyć się React\'a');

// //DODAWANIE KART DO KOLUMN
// doingColumn.addCard(card1);
// doingColumn.addCard(card2);
// todoColumn.addCard(card5);
// doneColumn.addCard(card3);
// verifyColumn.addCard(card4);
// todoColumn.addCard(card6);

//AJAX Setup
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
	'X-Client-Id': '16',
	'X-Auth-Token': '72c34b01532a9de1d8c49f69ac067d3f'
};

$.ajaxSetup({
	headers: myHeaders
});

$.ajax({
	url: baseUrl + '/board',
	method: 'GET',
	success: function(response) {
		setupColumns(response.columns);
	}
});

function setupColumns(columns) {
	columns.forEach(function (column) {
		var col = new Column(column.id, column.name);
		board.addColumn(col);
		setupCards(col, column.cards);
	});
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
		var card = new Card(card.id, card.name, card.bootcamp_kanban_column_id);
		col.addCard(card);
	})
}