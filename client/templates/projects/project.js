if(Meteor.isClient){
	Template.project.helpers({
		sameDate: function(){
			if(this.updatedAt === this.createdAtFormatted){
				return true;
				console.log('created and updarted on same day.');
			}
			else {
				return false;
				console.log('created and updarted on Different day.');
			}
			
		}
	});
}