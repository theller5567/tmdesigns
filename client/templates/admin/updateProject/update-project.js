if (Meteor.isClient) {
    Template.updateproject.events({
        "submit form": function(event) {

            event.preventDefault();

            var name = event.target.name.value,
                short_description = event.target.short_description.value,
                long_description = event.target.long_description.value,
                tag = event.target.tags.value,
                category = event.target.category.value,
                form = $("#add-project"),
                tags = tag.split(','),
                file = $('#projectImage').get(0).files[0],
                projectId = $('#add-project').attr('data-id'),
                imageId = $('#add-project').attr('data-img');

            //if New image is being added do this
            if (file) {
                fsFile = new FS.File(file);

                ProjectImages.insert(fsFile, function(error, result) {
                    if (error) {
                        FlashMessages.sendError('There was an issue with the upload');
                    } else {
                        var imageLoc = '/cfs/files/ProjectImages/' + result._id;
                        //remove old image
                        ProjectImages.remove({
                            _id: imageId
                        });
                        //update Project
                        Projects.update({
                            _id: projectId
                        }, {
                            $set: {
                                name: name,
                                short_description: short_description,
                                long_description: long_description,
                                tags: tags,
                                category: category,
                                image: imageLoc,
                                imageId: result._id,
                                updatedAt: moment().format("LL")
                            }
                        }, function(error, result) {
                            if (!error) {
                                Router.go('updateprojects');
                            } else {
                                $("#message").addClass('error').text(error);
                            }
                        });
                    }
                });
                $('#message').fadeIn();
                setTimeout(function() { //calls click event after a certain time
                    $('#message').fadeOut();
                }, 10000);
                return false;
            } else {
                Projects.update({
                    _id: projectId
                }, {
                    $set: {
                        name: name,
                        short_description: short_description,
                        long_description: long_description,
                        tags: tags,
                        category: category,
                        updatedAt: moment().format("LL")
                    }
                }, function(error, result) {
                    if (!error) {
                        Router.go('updateprojects');
                    } else {
                        console.log(error);
                    }
                });
            }

            $('#message').fadeIn();

            setTimeout(function() { //calls click event after a certain time
                $('#message').fadeOut();
            }, 10000);
            return false;
        }
    });

}