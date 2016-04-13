Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'spinner',
	data: function() {
		return Projects.find();
	}
});

Router.map(function() {

	this.route('home', {
		path: '/',
		template: 'home',
	});

	this.route('about');

	this.route('projects', {
		subscriptions: function() {
		    return Meteor.subscribe('allProjects');
    		return Meteor.subscribe('allProjectImages');
		  },
	    action: function () {
	      if (this.ready()) {
	        this.render();
	      } else {
	        this.render('spinner');
	      }
	    },
		path: '/projects',
		data: function() {
			return Projects.find();
		}
	});

	this.route('project/:_id', {
		subscriptions: function() {
		    return Meteor.subscribe('allProjects');
    		return Meteor.subscribe('allProjectImages');
		  },
	    action: function () {
	      if (this.ready()) {
	        this.render();
	      } else {
	        this.render('spinner');
	      }
	    },
		path: '/project/:_id',
		template: 'project',
		data: function() {
			return Projects.findOne(this.params._id);

		}
	});

	this.route('admin');

	this.route('mypost');

	this.route('removeprojects', {
		subscriptions: function() {
		    return Meteor.subscribe('allProjects');
    		return Meteor.subscribe('allProjectImages');
		  },
	    action: function () {
	      if (this.ready()) {
	        this.render();
	      } else {
	        this.render('spinner');
	      }
	    },
		data: function() {
			return Projects.find();
		}
	});

	this.route('updateprojects', {
		subscriptions: function() {
		    return Meteor.subscribe('allProjects');
    		return Meteor.subscribe('allProjectImages');
		  },
	    action: function () {
	      if (this.ready()) {
	        this.render();
	      } else {
	        this.render('spinner');
	      }
	    },
		data: function() {
			return Projects.find();
		}
	});

	this.route('/users', {
		name: 'users',
		data: function() {
			return Users.find();
		}
	});

	this.route('updateprojects/:_id', {
		subscriptions: function() {
		    return Meteor.subscribe('allProjects');
    		return Meteor.subscribe('allProjectImages');
		  },
	    action: function () {
	      if (this.ready()) {
	        this.render();
	      } else {
	        this.render('spinner');
	      }
	    },
		path: '/updateprojects/:_id',
		template: 'updateproject',
		name: 'update-project',
		data: function() {
			return Projects.findOne(this.params._id);

		}
	});

	this.route('addproject');

	this.route('contact');

	this.route('blog');
});