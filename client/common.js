if (Meteor.isClient) {
	//GLOBAL FUNCTIONS
	 openNavbar = function() {
		var mainText = $('ul.nav li').find('p');
		Session.set('navopen', true);
		var welcome = $('.welcome');
		$("#navbar").addClass('open');
			welcome.fadeIn('slow');
		var tween = TweenMax.staggerTo(mainText, 0.35, {
			opacity: '1',
			left: '50%'
		}, 0.3);
	}

	closeNavbar = function() {
		var mainText = $('ul.nav li').find('p');
		Session.set('navopen', false);
		var welcome = $('.welcome');
		welcome.fadeOut('fast');
		var tween = TweenMax.staggerTo(mainText, 0.1, {
			opacity: '0',
			left: '-20px'
		}, 0.1, function() {
			$("#navbar").removeClass('open');
		});
		if(Session.get('loginopen') === true){
			$('.sign-in').css('right', '10px');
			Session.set('loginopen', false);
		}
	}

	//SHOW TOTAL PROJECTS COUNT
	Template.registerHelper('projectCount', function() {
		return Projects.find().count();
	});
	var projectCount = UI._globalHelpers.projectCount();



	//SHOW TOTAL ILLUSTRATION COUNT
	Template.registerHelper('illustrationCount', function() {
		return Projects.find({
			category: "illustration"
		}).count();
	});
	var illustrationCount = UI._globalHelpers.illustrationCount();


	//SHOW TOTAL WEB COUNT
	Template.registerHelper('webCount', function() {
		return Projects.find({
			category: "web"
		}).count();
	});
	var webCount = UI._globalHelpers.webCount();



	//SHOW TOTAL ANIMATION COUNT
	Template.registerHelper('animationCount', function() {
		return Projects.find({
			category: "animation"
		}).count();
	});
	var animationCount = UI._globalHelpers.animationCount();

	//SHOW TOTAL VIDEO COUNT
	Template.registerHelper('videoCount', function() {
		return Projects.find({
			category: "video"
		}).count();
	});
	var videoCount = UI._globalHelpers.videoCount();

	//SHOW TOTAL 4D COUNT
	Template.registerHelper('fourdCount', function() {
		return Projects.find({
			category: "effect"
		}).count();
	});
	var fourdCount = UI._globalHelpers.fourdCount();



	//SHOW TOTAL OTHER COUNT
	Template.registerHelper('otherCount', function() {
		return Projects.find({
			category: "other"
		}).count();
	});
	var otherCount = UI._globalHelpers.otherCount();

	Template.registerHelper('getLoggedInUser', function() {
		if (Meteor.user()) {
			return 'Welcome ' + Meteor.user().username;
		}else{
			return 'No one is logged in';
		}
	});
	var getLoggedInUser = UI._globalHelpers.getLoggedInUser();

	Template.registerHelper('userLoggedIn', function() {
		if (Meteor.user()) {
			return true;
		} else {
			return false;
		}
	});
	var userLoggedIn = UI._globalHelpers.userLoggedIn();

	//IS USER TRAVIS OR SOME IMPOSTER
	Template.registerHelper('admin', function() {
		if (Meteor.user()) {
			if (Meteor.user().emails[0].address === 'theller5567@gmail.com') {
				return true;
			} else {
				return false
			}
		}
	});
	var admin = UI._globalHelpers.admin();

	Accounts.ui.config({
		passwordSignupFields: 'EMAIL_ONLY',
	});

	//CONFIGURE OPTIONS FOR SPINNER
	Meteor.Spinner.options = {
	    lines: 13, // The number of lines to draw
	    length: 10, // The length of each line
	    width: 5, // The line thickness
	    radius: 15, // The radius of the inner circle
	    corners: 0.7, // Corner roundness (0..1)
	    rotate: 0, // The rotation offset
	    direction: 1, // 1: clockwise, -1: counterclockwise
	    color: '#fff', // #rgb or #rrggbb
	    speed: 1, // Rounds per second
	    trail: 60, // Afterglow percentage
	    shadow: true, // Whether to render a shadow
	    hwaccel: false, // Whether to use hardware acceleration
	    className: 'spinner', // The CSS class to assign to the spinner
	    zIndex: 2e9, // The z-index (defaults to 2000000000)
	    top: 'auto', // Top position relative to parent in px
	    left: 'auto' // Left position relative to parent in px
	};

	Meteor.startup(function() {
		AccountsEntry.config({
			homeRoute: '/',
			dashboardRoute: '/'
		});
	});

	//Add comma and space to Tags array items
	Template.registerHelper('tagsl', function() {
		var tags = Projects.find({}, {
			fields: {
				tags: 1
			}
		}).fetch();
		if (tags) {
			var tag = [];
			var length = tags.length;
			var taglength;
			for (var i = 0; i <= length + 1; i++) {
				if (this.tags) {
					taglength = this.tags.length - 1;
					if (this.tags[i] !== undefined) {
						if (i === taglength) {
							tag += ' and ' + this.tags[i];
						} else {
							tag += this.tags[i] + ', ';
						}
					}
				}
			}
			return tag;
		}
	});
	var tagsl = UI._globalHelpers.tagsl();

}