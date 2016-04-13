if(Meteor.isClient){
	Meteor.subscribe('data');
	Meteor.call('removeAllPosts');
	// Meteor.call('getTweets', function(error, result){
	// 	if(error){
	// 		console.log("error", error);
	// 	}
	// 	// var dataLength = result.data.length;
	// 	// for(var i=0;i<dataLength;i++){
	// 	// 	Data.insert({userId: result.data[i].userId, title: result.data[i].title, body: result.data[i].body});
	// 	// }
	// });

	Template.home.rendered = function(){

		if(Session.get('navopen') === true){
			console.log('true');
		}else {
			openNavbar();
		}
	}

	Template.home.helpers({
		rasp: function(){
			return Data.find();
		}
	});
}

