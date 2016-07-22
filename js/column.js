function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || 'Column name';
	this.$element = createColumn();

	function createColumn() {
		var $row = $('<div>').addClass('row')
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnList = $('<ul>').addClass('column-list');
		var $icnRemove = $('<span>').addClass('glyphicon glyphicon-remove'); // RoHell
		var $inputAddDiv = $('<div>').addClass('input-add-div'); //RoHell
		var $icnAdd = $('<span>').addClass('glyphicon glyphicon-ok add-card-ok'); // RoHell
  		var $inputAdd = $('<input>').attr({type: 'textbox', value: '', placeholder: 'Type card description +Enter'}).addClass('input-add input-card'); //RoHell

		$icnRemove.click(function() {
			self.removeColumn();
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

			$inputAdd.val('');

			return false;

		});

		$inputAddDiv.append($icnAdd)
              	.append($inputAdd);

		$row.append($column);
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