if (Meteor.isClient) {
	Meteor.subscribe('users');
	Template.users.events({
		'click .edit': function(event) {
            Session.set('currentId', this._id);
            Session.set('showMessage', true);
            $("html, body").animate({ scrollTop: 0 }, 500);
        },
        'click .yes': function(event) {
            var x = Session.get('currentId');
            if(UserPost.findOne({userId: x})){
                var green = UserPost.findOne({userId: x});
                UserPost.remove({_id: green._id})
            }
            Users.remove({_id: x});
            Session.set('showMessage', false);
        },
        'click .cancle': function(event) {
            Session.set('showMessage', false);
        },
        'click .quicknav': function(event) {
            Session.set('showMessage', false);
        }
	});
	Template.users.helpers({
        userEmail: function(){
            return this.emails[0].address; 
        },
		users: function() {
			return Meteor.users.find();
		},
		showMessage: function(){
            return Session.equals('showMessage', true);
        }
	});
}