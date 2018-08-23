import {JetView} from "webix-jet";
import {ActivityTypesData} from "../models/activityTypesCollection";
import {StatusesData} from "../models/statusesCollection";

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
						console.log(this.getUrl());
						// var pathArray = window.location;
						// console.log(pathArray);
						// if(this.getUrl()=="SettingsActivitiesView")
						// console.log("njlnsdkd");
						// console.log(this.getUrl());
						// let data = this.$$("form").getValues();
						// console.log(this.app.getUrl());
						// let url = this.getUrl()
						// if (url == "contactsStatuses"){
						// 	StatusesData.add(data);
						// }
						// else
						// 	ActivityTypesData.add(data);
						// this.hideWindow();
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
    
	showWindow(label, buttonLabel) {
		this.$$("form").clear();	
		this.getRoot().show();
		this.$$("toolbarLabel").setValue(label);
		this.$$("addButton").setValue(buttonLabel);
	}

	hideWindow(){
		this.getRoot().hide();
	}
    
	urlChange(){
		
	}
}