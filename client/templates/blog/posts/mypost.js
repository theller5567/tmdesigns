if (Meteor.isClient) {
    Meteor.subscribe('users');
    Template.mypost.events({
        'click .edit': function(event) {
            Session.set('currentId', this._id);
            Session.set('showMessage', true);
            $("html, body").animate({ scrollTop: 0 }, 500);
            console.log(Iron.Location.get());
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

    Template.mypost.helpers({
        myPost: function() {
            var userId = Meteor.userId();
            return UserPost.find({ userId: userId}, {sort: {createdAt: -1}});
        },
        showMessage: function(){
            return Session.equals('showMessage', true);
        },
        username: function(){
            if(Meteor.user()){
                var str = Meteor.user().emails[0].address;
                var tt = str.split('@')[0];
                return tt;
            }
            return 'No User Found';
        },
    });


    Template.blog.events({
        "click form": function(event, tmpl){
            var self = event;
            console.log(this);
        }
    });

}

