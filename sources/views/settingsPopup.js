import {JetView} from "webix-jet";
// import {ActivityTypesData} from "../models/activityTypesCollection";
// import {StatusesData} from "../models/statusesCollection";

export default class SettingPopupView extends JetView{
	
	config(){
		const _ = this.app.getService("locale")._;
		let form = {
			view:"form",
			localId: "form",
			elements:[
				{ view:"text", label:_("Value"), labelWidth:100, name:"Value"},
				{ view:"text", label:_("Icon"), labelWidth:100, name:"Icon"},
				{cols:[
					{},{},
					{ view:"button", value:"", localId:"addButton", type:"form", inputWidth:100, click:()=>{
						let values = this.$$("form").getValues();
						this.getMaster().add(values);
						this.hideWindow();
					}
					},
					{ view:"button", value:_("Cancel"), inputWidth:100,  click:()=>this.hideWindow()},
				]}
			]
		};
          
		let popup = {
			view:"popup",
			localId:"my_popup",
			width:600,
			position:"center",
			modal:true,
			body:{
				rows:[
					{view:"toolbar", cols:[{view:"label", label:"", localId:"toolbarLabel"}]},
					form
				]
			}
		};
		return popup;
	}

	setMaster(value){
		this.master = value;
	}

	getMaster(){
		return this.master;
	}
    
	showWindow(label, buttonLabel, collection) {
		const _ = this.app.getService("locale")._;
		this.$$("form").clear();
		this.setMaster(collection);	
		this.getRoot().show();
		this.$$("toolbarLabel").setValue(_(label));
		this.$$("addButton").setValue(_(buttonLabel));
	}

	hideWindow(){
		this.getRoot().hide();
	}
    
	urlChange(){
		
	}
}