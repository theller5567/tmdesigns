if(Meteor.isClient){
	//NAVBAR FUNCTIONALITY
	Template.layout.events({
		'click .wrapper':function(event){
			if(Session.get('navopen') === true || null){
				if($(event.target).closest('#navbar').length === 0) {
					closeNavbar();
				}
			}
		}
		//,
		// 'mouseleave li.login': function(){
		// 	if(Session.get('loginopen') === true || null){
		// 		console.log('mouse OFF');
		// 		$('.sign-in').css('right', '10px');
		// 		Session.set('loginopen', false);
		// 	}
		// }
	});

	
}