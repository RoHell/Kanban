var board = {
	name: 'Tablica Kanban',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};

$('.create-column-btn').click(function() {
	$('.new-column-btn').slideToggle();
});

$('.new-column-ok').click(function() {
	var columnName = $('.new-column-input').val();

	$.ajax({
		url: baseUrl + '/column',
		method: 'POST',
		data: {
			name: columnName
		},
		success: function(response) {
			var column = new Column(response.id, columnName);
			// if (columnName == ('')) {
			//   return $('.new-column-input').val('Column name');
			// } else {
			  board.addColumn(column);
			// }
		}		
	});
	
	$('.new-column-btn').delay(1000).slideToggle();
	$('.new-column-input').val('');
});

function initSortable() {
	$('.column-list').sortable({
		connectWith: '.column-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}