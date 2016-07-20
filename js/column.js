function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'Column name';
	this.$element = createColumn();

	function createColumn() {
		// var $row = $('<div>').addClass('row')
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnList = $('<ul>').addClass('column-list');
		var $icnRemove = $('<span>').addClass('glyphicon glyphicon-remove');
		var $inputAddDiv = $('<div>').addClass('input-add-div');
		var $icnAdd = $('<span>').addClass('glyphicon glyphicon-ok');
  		var $inputAdd = $('<input>').attr({type: 'textbox', value: '', placeholder: 'Type card description + Enter'}).addClass('input-add');

		$icnRemove.click(function() {
			self.removeColumn();
		});

		// var e = jQuery.Event('keypress');
		// e.which = 13;
		// e.keyCode = 13;
		// $('.input-add').trigger(e);

		
		$inputAdd.keydown(function (e) {
		    if (e.which == '13') {
		        return ($inputAdd.val());
			}
		});

		

		$icnAdd.click(function() {
		var cardName = $inputAdd.val();

			$.ajax({
				url: baseUrl + '/card',
				method: 'POST',
				data: {
				name: cardName,
				bootcamp_kanban_column_id: self.id
				},
				success: function(response) {
					var card = new Card(response.id, cardName);
					self.addCard(card);
				}
			});

			// $inputAdd.val('');
		});

		$inputAddDiv.append($icnAdd)
              	.append($inputAdd);

		// $row.append($column);
		$column.append($columnTitle)
				.append($icnRemove)
      			.append($inputAddDiv)
				.append($columnList);

		return $column;
	}
}

Column.prototype.addCard = function(card) {
	this.$element.children('ul').append(card.$element);
};

Column.prototype.removeColumn = function() {
	var self = this;
	$.ajax({
		url: baseUrl + '/column/' + self.id,
		method: 'DELETE',
		success: function(response) {
			self.$element.remove();
		}
	});
};