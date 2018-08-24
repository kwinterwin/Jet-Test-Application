import {JetView, plugins} from "webix-jet";

export default class TopView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		var menu = {
			view:"menu", localId:"top:menu", 
			width:180, layout:"y", select:true,
			template:"<span class='webix_icon fa-#icon#'></span> #value# ",
			data:[
				{ value:_("Contacts"), id:"contacts", icon:"group" },
				{ value:_("Activities"),	id:"data",  icon:"calendar" },
				{ value:_("Settings"),		 id:"settings",  icon:"gears" }
			],
			on:{
				"onAfterSelect":()=>{
					this.$$("topToolbarLabel").setValue(this.getRoot().queryView({view:"menu"}).getSelectedItem().value);
				}
			}
		};

		var ui = {
			type:"line", rows:[{view:"toolbar",
				cols:[
					{view:"label", label:"#value#", id:"topToolbarLabel"},
				]},{cols:[
				{ type:"clean", css:"app-left-panel",
					padding:10, margin:20, borderless:true, rows: [menu ]},
				{ rows:[ { height:10}, 
					{ type:"clean", css:"app-right-panel", padding:4, rows:[
						{ $subview:true } 
					]}
				]}
			]}]
		};


		return ui;
	}
	init(){
		this.use(plugins.Menu, "top:menu"); 
	}
}