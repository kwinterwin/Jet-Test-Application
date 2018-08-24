import ContactsView from "../views/contacts";

export var ContactsData = new webix.DataCollection({
	scheme:{
		$init:function(obj){ 
			obj.value = obj.FirstName + " " + obj.LastName; 
			let DateParser = webix.Date.strToDate("%d-%m-%Y");
			obj.Birthday = DateParser(obj.Birthday);
			obj.StartDate = DateParser(obj.StartDate);
		},
		$save:function(obj){
			let DateParser = webix.Date.dateToStr("%d-%m-%Y");
			obj.Birthday = DateParser(obj.Birthday);
			obj.StartDate = DateParser(obj.StartDate);
		}
	},
	url:"http://localhost:8096/api/v1/contacts/",
	save:"rest->http://localhost:8096/api/v1/contacts/"
});