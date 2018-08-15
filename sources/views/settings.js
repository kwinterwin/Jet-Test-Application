import {JetView} from "webix-jet";

export default class SettingsView extends JetView{
	config(){
		return {
			rows:[
				{view:"segmented", 
					value:1, options:[
						{ "id":"1", "value":"RU" }, 
						{ "id":"2", "value":"EN" }
					]}, {}
			]
		};
	}
	init(){
        
	}
}