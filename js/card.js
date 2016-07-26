function Card(id, name) {
	var self = this;

	this.id = id;
	this.name = name || '... Default card description...';
	this.$element = addCard();

	function addCard() {
		var $card = $('<li>').addClass('card');
		var $cardDescription = $('<p>').addClass('card-description').text(self.name);

		var $icnRemove = $('<span>').addClass('glyphicon glyphicon-remove');

		$icnRemove.click(function() {
			self.removeCard();
		});

		$card.append($icnRemove)
			.append($cardDescription);

		return $card;
	}
}


Card.prototype.removeCard = function() {
	var self = this;
	$.ajax({
		url: baseUrl + '/card/' + self.id,
		method: 'DELETE',
		success: function() {
			self.$element.remove();
		}
	});
};