function Column(id, name) {
	var self = this;

	this.id = id;
	this.name = name || '... Column ...';
	this.$element = createColumn();

	function createColumn() {
		var $row = $('<div>').addClass('row')
		var $column = $('<div>').addClass('column');
		var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
		var $columnList = $('<ul>').addClass('column-list');
		var $icnRemove = $('<span>').addClass('glyphicon glyphicon-remove confirm'); // RoHell
		var $inputAddDiv = $('<div>').addClass('input-add-div'); //RoHell
		var $icnAdd = $('<span>').addClass('glyphicon glyphicon-ok add-card-ok'); // RoHell
		var $inputAdd = $('<input>').attr({type: 'textbox', value: '', placeholder: 'Type card description + Enter'}).addClass('input-add input-card'); //RoHell

		var columnName = $('.new-column-input').val();
		var columnContainer = document.querySelector('.column-container');
		var columnsLength = columnContainer.querySelectorAll('.column').length;

		if (columnsLength > 9) {
			$.alert({
				icon: 'glyphicon glyphicon-exclamation-sign',
				title: "Max column nr is 10!",
				content: "Please delete any column to create the new one.",
				confirmButton: 'OK',
				closeIcon: true,
				closeIconClass: 'glyphicon glyphicon-remove',
				confirm: function() {
					self.removeColumn();
				}
			});
		}

		$inputAdd.on('keyup', function(e) {
			if (e.keyCode === 13) {
				$icnAdd.click();
			}
		});

		

	$icnRemove.click(function(event){
		var resulttt = event.currentTarget.parentNode.querySelector('.column-list');
		var listElementsPresent = resulttt.querySelector('li');
		if (!listElementsPresent) {
			return self.removeColumn();
		}
		$.confirm({
			icon: 'glyphicon glyphicon-warning-sign',
			title: "Warning!",
			content: "This column contains Cards. Are you sure?",
			confirmButton: 'Yes, Remove It',
			cancelButton: 'No, Leave It!',
			closeIcon: true,
			closeIconClass: 'glyphicon glyphicon-remove',
			confirm: function() {
				self.removeColumn();
			},
			cancel: function() {
			}
		});
	});

	$icnAdd.click(function() {
		var cardName = $inputAdd.val();
		function ajaxCardName() {
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
		}

		if (!cardName) {
			$.confirm({
				icon: 'glyphicon glyphicon-warning-sign',
				title: "Type card description!",
				content: "Type some description or leave it default",
				confirmButton: "Default",
				cancelButton: "Let me type",
				closeIcon: true,
				closeIconClass: 'glyphicon glyphicon-remove',
				confirm: function() {
					ajaxCardName();
				}
			});
		}
		else {
			ajaxCardName();
		}

		$('.input-card').val('');

	});

		$inputAddDiv.append($icnAdd)
			  	.append($inputAdd);

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

