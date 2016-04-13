if (Meteor.isClient) {
    Template.users.events({
        'click .edit': function(event) {
            Session.set('currentId', this._id);
            Session.set('showMessage', true);
            $("html, body").animate({ scrollTop: 0 }, 500);
        },
        'click .yes': function(event) {
            var x = Session.get('currentId');
            Users.remove({_id: x});
            if(UserPost.findOne({UserId: x})){
                UserPost.remove({UserId: x});
            }
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
        projects: function() {
            return Projects.find({}, {
                sort: {
                    type: 1
                }
            });
        },
         showMessage: function(){
            return Session.equals('showMessage', true);
        }
    });
} //End of isClient code