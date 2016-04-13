if (Meteor.isServer) {
	Meteor.startup(function(){
		//var cheerio = Meteor.npmRequire('cheerio');
		Meteor.methods({
			getTweets: function(){
				result = Meteor.http.get('http://jsonplaceholder.typicode.com/posts/');
				return result;
			},
			removeAllPosts: function() {
		    	return Data.remove({});
		    }
		});
	});
	/* =========== Publish Collections =========== */
	Meteor.publish('data', function() {
		return Data.find();
	});
	Meteor.publish('allProjects', function() {
		return Projects.find();
	});
	Meteor.publish('allPosts', function() {
		return UserPost.find();
	});

	Meteor.publish('allProjectImages', function() {
		return ProjectImages.find();
	});

	Meteor.publish('users', function() {
		return Meteor.user.find();
	});

	/* =========== Security functions - Allow/Deny =========== */
	Data.allow({
	    insert: function(userId, doc) {
	    	return true;
	    },
	    update: function(userId, doc) {
	    	return true;
	    },
	    remove: function(userId, doc) { 
	    	return true;
	    }
	});
	Projects.allow({
	    insert: function(userId, doc) {
	    	if(userId === 'AFPPTDm9sq68RqFWd'){
		    	return true;
		    }else{
		    	return false;
		    }
	    },
	    update: function(userId, doc) {
	    	if(userId === 'AFPPTDm9sq68RqFWd' && doc.userId === 'AFPPTDm9sq68RqFWd'){
		    	return true;
		    }else{
		    	return false;
		    }
	    },
	    remove: function(userId, doc) { 
	    	if(userId === 'AFPPTDm9sq68RqFWd'){
		    	return true;
		    }else{
		    	return false;
		    }
	    }
	});

	ProjectImages.allow({
	    insert: function(userId, doc) {
	    	if(userId === 'AFPPTDm9sq68RqFWd'){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    update: function(userId, doc) {
	    	if(userId === 'AFPPTDm9sq68RqFWd'){
	    		return true;
	    	}else{
	    		return false;
	    	}
	    },
	    remove: function(userId, doc) { 
	    	return true; 
	    },
	    download:function(userId, doc){ 
	    	return true;
	    }
	});

	Users.allow({
	    insert: function(userId, doc) {
	    	return !!userId;
	    },
	    update: function(userId, doc) {
	    	if(userId === 'AFPPTDm9sq68RqFWd'){
		    	return true;
		    }else{
		    	return false;
		    }
	    },
	    remove: function(userId, doc) { 
	    	if(userId === 'AFPPTDm9sq68RqFWd'){
		    	return true;
		    }else{
		    	return false;
		    }
	    }
	});

	UserPost.allow({
	    insert: function(userId, doc) {
	    	return !!userId;
	    },
	    update: function(userId, doc) {
	    	if(userId === 'AFPPTDm9sq68RqFWd'){
		    	return true;
		    }else{
		    	return false;
		    }
	    },
	    remove: function(userId, doc) {
	    	if(userId === 'AFPPTDm9sq68RqFWd'){
		    	return true;
		    }else{
		    	return false;
		    }
	    	 
	    }
	});
	/* =========== Meteor Methods =========== */
	Meteor.methods({
	    insertPost: function(title, body){
	    	UserPost.insert({
				title: title,
				body: body,
				userId: Meteor.userId(),
				username: Meteor.user().emails[0].address,
				createdAtFormated: moment().format('LL'),
                createdAt: new Date()
			});
	    },
	    insertProject: function(name, short_description, long_description, tags, category, imageLoc, imageId){
	    	Projects.insert({
	    		name: name,
                short_description: short_description,
                long_description: long_description,
                tags: tags,
                category: category,
                image: imageLoc,
                imageId: imageId,
                createdAtFormated: moment().format('LL'),
                createdAt: new Date(),
                userId: Meteor.userId()
	    	});
	    }
	});
}
