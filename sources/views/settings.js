import {JetView, plugins} from "webix-jet";

export default class SettingsView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		
		let menu = {
			view:"menu", localId:"top:menu", 
			width:180, layout:"y", select:true,template:"#title#",
			data:[
				{ id:"settingsActivityType", title:_("Activity type")},
				{ id:"contactsStatuses", title:_("Contact status")},
				{ id:"language", title:_("Language")}
			]
		};
		
		return {
			cols:[
				menu,
				{ $subview:true } 
			]
		};
	}
	init(){
		this.use(plugins.Menu, "top:menu"); 
	}
}