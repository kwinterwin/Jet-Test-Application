export var ContactsData = new webix.DataCollection({
	scheme:{
		$init:function(obj){ 
			obj.value = obj.FirstName + " " + obj.LastName; 
			let DateParser = webix.Date.dateToStr("%d-%m-%Y %H:%i");
			obj.Birthday = DateParser(obj.Birthday);},
		$save:function(obj){
			let DateParser = webix.Date.dateToStr("%d-%m-%Y %H:%i");
			obj.Birthday = DateParser(obj.Birthday);
		}
	},
	url:"http://localhost:8096/api/v1/contacts/",
	save:"rest->http://localhost:8096/api/v1/contacts/"
});