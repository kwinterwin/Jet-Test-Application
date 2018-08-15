export var ActivityData = new webix.DataCollection({
	scheme:{
		$save: function(obj) {
			let DateParser = webix.Date.dateToStr("%d-%m-%Y");
			obj.DueDate = DateParser(obj.DueDate);
		},
		$init: function(obj) {
			let DateParser = webix.Date.strToDate("%d-%m-%Y");
			obj.DueDate = DateParser(obj.DueDate);
		}
	},
	url:"http://localhost:8096/api/v1/activities/",
	save:"rest->http://localhost:8096/api/v1/activities/"
});