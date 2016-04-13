Users = Meteor.users;
Data = new Mongo.Collection('data');
Projects = new Mongo.Collection('projects');
Projects.attachSchema(new SimpleSchema({
	name: {
		type: String,
		label: 'Name'
	},
	short_description: {
		type: String,
		min: 10,
		max: 150
	},
	long_description: {
		type: String,
		min: 10,
		max: 500,
		label: 'Long Description'
	},
	tags: {
		type: [String],
		label: 'Tags'
	},
	category: {
		type: String,
		label: 'Category'
	},
	image: {
		type: String,
		label: 'Image'
	},
	imageId: {
		type: String,
		label: 'Image ID'
	},
	createdAtFormated: {
		type: String,
		label: 'Project was created at in a Formatted Form'
	},
	createdAt: {
		type: Date,
		label: 'Project was created at'
	},
	updatedAt: {
		type: String,
		label: 'This Project was updated at this date/time',
		optional: true
	},
	userId: {
		type: String,
		label: 'User ID'
	}
}));
ProjectImages = new FS.Collection('ProjectImages', {
	stores: [
		new FS.Store.GridFS('ProjectImages')
	],
    filter: {
        allow: {
            contentTypes: ['image/*']
        }
    }
});

UserPost = new Meteor.Collection('UserPosts');
UserPost.attachSchema(new SimpleSchema({
	userId: {
		type: String,
		label: 'User ID'
	},
	body: {
		type: String,
		min: 10,
		max: 500,
		label: 'Body of Post Message'
	},
	title: {
		type: String,
		min: 5,
		label: 'Title of Post'
	},
	createdAtFormated: {
		type: String,
		label: 'Project was created at in a Formatted Form'
	},
	createdAt: {
		type: Date,
		label: 'Project was created at'
	},
	username: {
		type: String,
		label: 'Username'
	}
}));

