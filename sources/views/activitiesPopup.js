import {JetView} from "webix-jet";
import {ActivityData} from "../models/activityCollection";
import {ContactsData} from "../models/contactsCollection";
import {ActivityTypesData} from "../models/activityTypesCollection";

export default class ActivitiesPopupView extends JetView{
	config(){
		let form = {
			view:"form",
			localId: "form",
			elements:[
				{ view:"textarea", label:"Details", name:"Details"},
				{ view:"richselect", name:"TypeID",  label:"Type",  options:{body:{template:"#Value#", data: ActivityTypesData}}},
				{ view:"richselect", name:"ContactID",  label:"Contact", options:{body:{template:"#FirstName# #LastName#", data: ContactsData}} },
				{cols:[
					{view:"datepicker", label:"Date", name:"DueDate",  format:"%d-%m-%Y"},{view:"datepicker", type:"time",  label:"Time"}
				]},
				{view:"checkbox", labelRight:"Completed", labelAlign:"right", name:"State"},
				{cols:[
					{},{},
					{ view:"button", value:"", localId:"addButton", type:"form", inputWidth:100, click:()=>{
						if(this.$$("form").validate()){
							let values = this.$$("form").getValues();
							if(this.getRoot().queryView({name:"State"}).getValue()==1)
								values.State = "Close";
							else values.State = "Open";
							if (ActivityData.exists(values.id))
								ActivityData.updateItem(values.id, values);
							else
								ActivityData.add(values); 
							this.hideWindow();
						}
						else webix.message({text: "Validation is unsuccess", type: "error"});
					} },
					{ view:"button", value:"Cancel", inputWidth:100,  click:()=>this.hideWindow()}
				]}
			],
			rules: {
				TypeID: webix.rules.isNotEmpty,
				ContactID: webix.rules.isNotEmpty
			}
		};
          
		let popup = {
			view:"popup",
			id:"my_popup",
			width:600,
			position:"center",
			modal:true,
			body:{
				rows:[
					{view:"toolbar", cols:[{view:"label", label:""}]},
					form
				]
			}
		};
		return popup;
	}
    
	showWindow() {
		this.getRoot().show();
	}
    
	addActivity(label, buttonLabel){
		this.showWindow();
		this.getRoot().queryView({view:"label"}).setValue(label);
		this.$$("addButton").setValue(buttonLabel);
	}
    
	editActivity(label, buttonLabel, value){
		this.showWindow();
		this.getRoot().queryView({view:"label"}).setValue(label);
		this.$$("addButton").setValue(buttonLabel);
		this.getRoot().queryView({view:"form"}).setValues(value);
	}

	hideWindow(){
		this.getRoot().hide();
	}
    
	urlChange(){
		
	}
}