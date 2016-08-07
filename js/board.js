// Board
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
	function ajaxColumnName() {
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
	}

	if (!columnName) {
		$.confirm({
			icon: 'glyphicon glyphicon-warning-sign',
			title: "Type column name!",
			content: "Type column name or create default title",
			confirmButton: "Default",
			cancelButton: "Let me type",
			closeIcon: true,
			closeIconClass: 'glyphicon glyphicon-remove',
			confirm: function() {
				ajaxColumnName();
			}

		});
	} else {
		ajaxColumnName();
	}
	
	
	$('.new-column-btn').delay(500).slideToggle();
	$('.new-column-input').val('');

});

$('.new-column-input').on('keyup', function(e) {
	if (e.keyCode === 13) {
		$('.new-column-ok').click();
	}
});

// Sortable
function initSortable() {
	$('.column-list').sortable({
		connectWith: '.column-list',
		placeholder: 'card-placeholder',
	}).disableSelection();
}