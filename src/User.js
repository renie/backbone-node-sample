var User = Backbone.Model.extend({
	urlRoot: '/users',
	idAttribute: '_id'
});

var Users = Backbone.Collection.extend({
	model: User,
	url: '/users'
});