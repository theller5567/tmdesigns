if (Meteor.isClient) {
    Template.addproject.events({
        "click .submit": function(event) {
            event.preventDefault();
            var name = $("input[name='name']").val(),
                short_description = $("textarea[name='short_description']").val(),
                long_description = $("textarea[name='long_description']").val(),
                tag = $("input[name='tags']").val(),
                category = $("select[name='category']").val(),
                form = $("#add-project"),
                tags = tag.split(','),
                time = moment().format('LL'),
                file = $('#projectImage').get(0).files[0];

            if (file) {
                fsFile = new FS.File(file);

                ProjectImages.insert(fsFile, function(error, result) {
                    if (error) {
                        FlashMessages.sendError('There was an issue with the upload: ' + error);
                    } else {
                        var imageLoc = '/cfs/files/ProjectImages/' + result._id;
                        var imageId = result._id;
                        Meteor.call('insertProject', name, short_description, long_description, tags, category, imageLoc, imageId, function(error){
                            if (error) {
                                console.log('Error: ' + error);
                                 $("#message").addClass('error').text(error);
                             } else {
                                 name = "";
                                 short_description = "";
                                 long_description = "";
                                 tag = "";
                                 category = "";
                                 Router.go('projects');
                             }
                        });
                    }
                });
            }
        }  
    });
}