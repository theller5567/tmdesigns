if (Meteor.isClient) {
	Meteor.subscribe('users');
	Template.showpost.events({
	    'click .edit': function(event) {
	        Session.set('currentId', this._id);
	        Session.set('showMessage', true);
	        $("html, body").animate({ scrollTop: 0 }, 500);
	    },
	    'click .yes': function(event) {
	        var x = Session.get('currentId');
	        UserPost.remove({_id: x});
	        Session.set('showMessage', false);
	    },
	    'click .cancle': function(event) {
	        Session.set('showMessage', false);
	    },
	    'click .quicknav': function(event) {
	        Session.set('showMessage', false);
	    }
	});
	Template.showpost.helpers({
		post: function() {
			return UserPost.find({}, {
				sort: {
					createdAt: -1
				}
			});
		},
		showMessage: function(){
	        return Session.equals('showMessage', true);
	    }
	});
}
