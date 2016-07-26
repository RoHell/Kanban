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

  		const columnContainer = document.querySelector('.column-container');
		const columnsLength = columnContainer.querySelectorAll('.column').length;

		if (columnsLength >= 10) {
			alert('delete sth');
		}

		$inputAdd.on('keyup', function(e) {
		    if (e.keyCode === 13) {
		        $icnAdd.click();
		    }
		});

		

	$icnRemove.click(function(event){
		console.log('event', event);
		var resulttt = event.currentTarget.parentNode.querySelector('.column-list');
		console.log('resulttt', resulttt);
		// resultttt jest naszym UL
		var listElementsPresent = resulttt.querySelector('li');
		if (!listElementsPresent) {
			console.log('uciekam z funkcji, nic nie robie');
			return self.removeColumn();
		}
		$.confirm({
			text: "This column contains Cards. Are you sure?",
			title: "Warning!",
		    confirmButton: "Yes, Remove It",
		    cancelButton: "No, Not Yet",
			confirm: function() {
				console.log('confirmed');
				self.removeColumn();
			},
			cancel: function() {
			console.log('cancelled');
			}
		});
	});

	$icnAdd.click(function() {

		var cardName = $inputAdd.val();		

		if (!cardName) {
			$.confirm({
				title: "Warning!",
				text: "Press 'Default' to leave default card description or Press 'Exit' and do nothing",
			    confirmButton: "Default",
			    cancelButton: "Exit",
				confirm: function() {
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
			});
		} else {
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

		$('.input-card').val('');

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

