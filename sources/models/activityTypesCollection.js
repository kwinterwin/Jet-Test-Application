
export var ActivityTypesData = new webix.DataCollection({
	scheme:{
		$init:function(obj){ obj.value = obj.Value; }
	},
	url:"http://localhost:8096/api/v1/activitytypes/",
	save:"rest->http://localhost:8096/api/v1/activitytypes/"
});