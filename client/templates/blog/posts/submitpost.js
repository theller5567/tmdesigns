if (Meteor.isClient) {
	
	Template.submitpost.events({
		'submit form': function(event, tmpl) {
			event.preventDefault();
			var form = $('#submitpost'),
			    title = event.target.title.value,
			    body = event.target.body.value,
			    userid = Meteor.userId(),
			    username = Meteor.user().emails[0].address;
			//Insert Post
			Meteor.call('insertPost', title, body, function(error){
				if(error){
					FlashMessages.sendError('' + error + '');
			 		return false;
				}
				else{
					FlashMessages.sendSuccess('Post added');
			 		form.toggleClass('fade');
			 		return true;
				}
			});
			event.target.title.value = '';
			event.target.body.value = '';
			return false;
		},
		'click .cancle': function(event) {
			event.preventDefault();
			var form = $('#submitpost');
			form.toggleClass('fade');
		}
	});
}