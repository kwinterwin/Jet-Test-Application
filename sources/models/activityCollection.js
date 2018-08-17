export var ActivityData = new webix.DataCollection({
	scheme:{
		$save: function(obj) {
			let DateParser = webix.Date.dateToStr("%d-%m-%Y %H:%i");
			obj.DueDate.setHours(obj.Time.getHours());
			obj.DueDate.setMinutes(obj.Time.getMinutes());
			obj.DueDate = DateParser(obj.DueDate);
		},
		$init: function(obj) {
			let DateParser = webix.Date.strToDate("%d-%m-%Y %H:%i");
			let TimeParser = webix.Date.strToDate("%H:%i");
			obj.DueDate = DateParser(obj.DueDate);
			obj.Time = TimeParser(obj.DueDate);
		}
	},
	url:"http://localhost:8096/api/v1/activities/",
	save:"rest->http://localhost:8096/api/v1/activities/"
});