module.exports = function(response, views) {
	this.response = response;
	this.views = views;
};
module.exports.prototype = {
	extend: function(properties) {
		var Child = module.exports;
		Child.prototype = module.exports.prototype;
		for(var key in properties) {
			Child.prototype[key] = properties[key];
		}
		return Child;
	},
	render: function(data) {
		if(this.response && this.views) {
			this.response.render(this.views, data);
		}
	}
}
