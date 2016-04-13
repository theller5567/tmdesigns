if (Meteor.isClient) {
	Meteor.subscribe('allPosts');

	Template.blog.events({
		'click .logout': function(event) {
			event.preventDefault();
			Meteor.logout();
			Router.go('blog');
		},
		'click #logout': function(){
			$('.overlay').fadeIn();
		},
		'click #login-sign-in-link': function(){
			console.log('blog signin clicked');
			$('.overlay').fadeIn();
		},
		'click .login-close-text': function(){
			console.log('blog close button clicked');
			$('.overlay').fadeOut();
		},
		'click #login-buttons-password': function(){
			$('.overlay').fadeOut();
		}
	});
	Template.blog.events({
		'click .addpost': function(event) {
			event.preventDefault();
			$('#submitpost').toggleClass('fade');
		}
	});
}