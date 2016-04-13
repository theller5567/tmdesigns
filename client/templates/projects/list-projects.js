if (Meteor.isClient) {
    Template.listProjects.helpers({

        projects: function() {
            return Projects.find({}, {
                sort: {
                    type: 1
                }
            });
        },
        color: function() { //coordinate colors with category for visual filter
            var data = Projects.findOne({
                _id: this._id
            });
            var category = data.category;
            var color;
            if (category === '4D Effects') {
                color = 'blue';
            } else if (category === 'animation') {
                color = 'green';
            } else if (category === 'illustration') {
                color = 'red';
            } else if (category === 'web') {
                color = 'orange';
            } else if (category === 'Video') {
                color = 'purple';
            } else {
                color = 'white';
            }
            return color;
        },
        typeWeb: function() {
            return Projects.find();
        }
    });
} //End of isClient code


   