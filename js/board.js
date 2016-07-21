var board = {
	name: 'Tablica Kanban',
	addColumn: function(column) {
		this.$element.append(column.$element);
		initSortable();
	},
	$element: $('#board .column-container')
};


$('.create-column-btn').click(function() {
	$('.new-column-btn').slideToggle()
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
			  	board.addColumn(column);
		}
	});
	
	$('.new-column-btn').delay(1000).slideToggle();
	$('.new-column-input').val('');

	return false;

});

$('.new-column-input').on('keyup', function(e) {
    if (e.keyCode === 13) {
        $('.new-column-ok').click();
    }
});

function initSortable() {
	$('.column-list').sortable({
		connectWith: '.column-list',
		placeholder: 'card-placeholder'
	}).disableSelection();
}