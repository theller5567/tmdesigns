if (Meteor.isClient) {
	Meteor.subscribe('users');

	Template.home.rendered = function(){
		Session.set('loginopen', false);
		var hipsterJesus = {
		  	html: function() {
		  	  return $.getJSON('http://hipsterjesus.com/api/').then(function(data) {
		  	    return data.text;
		  	  });
		  	}
		};
		hipsterJesus.html().done(function(html) {
		  $("#home").append(html);
		});
	}

	Template.navbar.rendered = function(){
		Session.set('showregister', false);
		Session.set('showsignin', true);
	}
	
	Template.navbar.events({
		'click #toggleMenu': function() {
			if ($("#navbar").hasClass('open')) {
				closeNavbar();
				if(Session.get('loginopen') === true){
					$('.sign-in').css('right', '10px');
					Session.set('loginopen', false);
				}
			} else {
				openNavbar();
			}
		},
		'click .link': function(){
			if ($("#navbar").hasClass('open')) {
				closeNavbar();
			}
		},
		'click li.login a': function(){
			if(Session.get('loginopen') === false || 'undefined'){
				$('.sign-in').css('right', '-250px');
				Session.set('loginopen', true);
			}
		 },
		'click .close': function(){
			$('.sign-in').css('right', '10px');
			Session.set('loginopen', false);
		},
		'click button.logout': function(event,t){
			event.preventDefault();
			Meteor.logout();
		},
		'click button.submitlogin': function(event,t){
			event.preventDefault();
			var email = t.$('.email').val();
			var password = t.$('.password').val();
		  	var submitButton = t.$("button.submitlogin");

		  	Meteor.loginWithPassword(email,password,function(error){
		    if(error){
		      return;
		    }else {
		    }
		    $('.sign-in').css('right', '10px');
			Session.set('loginopen', false);
		    t.$('.username').val('');
		    t.$('.password').val('');
		  });
		},
		"click .createAccount": function(){
			if(Session.get('showregister')){
				Session.set('showregister', false);
				Session.set('showsignin', true);
			}else {
				Session.set('showregister', true);
				Session.set('showsignin', false);
			}
		}
	});

	Template.register.events({
		"click .signin": function(){
			Session.set('showregister', false);
			Session.set('showsignin', true);
			
		}
	});
	Template.navbar.helpers({
		username: function(){
			if(Meteor.user()){
				return Meteor.user().emails[0].address;
			}
			return 'No User Found';
		},
		showregister: function(){
			if(Session.get('showregister')){
				return true;
			}
		},
		signinshow: function(){
			if(Session.get('showsignin')){
				return true;
			}
		}
	});
}

Template.register.events({
    'click .create-user' : function(e, t) {
      e.preventDefault();
      var email = t.find('#account-email').value
        , password = t.find('#account-password').value;

        // Trim and validate the input

      Accounts.createUser({email: email, password : password}, function(err){
          if (err) {
          } else {
            $('.sign-in').css('right', '10px');
			Session.set('loginopen', false);
          }

        });

      return false;
    }
  });