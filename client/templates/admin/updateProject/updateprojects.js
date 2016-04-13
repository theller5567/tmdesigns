if (Meteor.isClient) {
    Template.updateprojects.events({
        'click .edit': function(event) {
            Session.set('currentId', this._id);
            Session.set('showMessage', true);
            $("html, body").animate({ scrollTop: 0 }, 500);
        },
        'click .yes': function(event) {
            var x = Session.get('currentId');
            Session.set('showMessage', false);
            Router.go('update-project', {
                _id: x
            });
        },
        'click .cancle': function(event) {
            Session.set('showMessage', false);
        },
        'click .quicknav': function(event) {
            Session.set('showMessage', false);
        }

    });
    Template.updateprojects.helpers({
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