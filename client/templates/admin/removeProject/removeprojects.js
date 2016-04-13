if (Meteor.isClient) {
    Template.removeprojects.events({
        'click .edit': function(event) {
            Session.set('currentId', this._id);
            Session.set('showMessage', true);
            $("html, body").animate({ scrollTop: 0 }, 500);
        },
        'click .yes': function(event) {
            var x = Session.get('currentId');
            Projects.remove({_id: x});
            Session.set('showMessage', false);
        },
        'click .cancle': function(event) {
            Session.set('showMessage', false);
        },
        'click .quicknav': function(event) {
            Session.set('showMessage', false);
        }
    });
    Template.removeprojects.helpers({
        projects: function() {
            return Projects.find({}, {
                sort: {
                    createAt: -1
                }
            });
        },
         showMessage: function(){
            return Session.equals('showMessage', true);
        }
    });
} //End of isClient code