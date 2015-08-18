var App = function(){
	var self = this;
	self.numBoxes = 0;

	self.init = function(initBoxes){
		self.numBoxes = Number(initBoxes);

		self.createStructure();
		self.createBoxes();
	}

	self.createStructure = function(){
		var html = '<div id="jqueryBoxAdder"><button>Add Box</button><div class="jqueryBoxDisplay"></div></div>';
		$('#jquery .content').append(html);
	}

	self.createBoxes = function(){
		var $cont = $('.jqueryBoxDisplay');
		$cont.html('');

		for(var i = self.numBoxes; i > 0; i--){
			var html = '<div class="box"><span class="title">Box</span><span class="number">' + i + '</span></div>';

			$cont.append(html);
		}
	}

	self.addBox = function(){
		self.numBoxes++;
		self.createBoxes();
	}
}

$(function(){
	var a = new App();

	a.init(3);

	$('#jqueryBoxAdder > button').on('click', function(){
		a.addBox();
	});
})