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
					{view:"datepicker", label:"Date", name:"DueDate",  format:"%d-%m-%Y"},
					{view:"datepicker", type:"time",  label:"Time", name:"Time"}
				]},
				{view:"checkbox", labelRight:"Completed", labelAlign:"right", name:"State", checkValue:"Close", uncheckValue:"Open"},
				{cols:[
					{},{},
					{ view:"button", value:"", localId:"addButton", type:"form", inputWidth:100, click:()=>{
						if(this.$$("form").validate()){
							let values = this.$$("form").getValues();

							if (ActivityData.exists(values.id))
								ActivityData.updateItem(values.id, values);
							else
								ActivityData.add(values); 
							this.hideWindow();
						}
						else webix.message({text: "Validation is unsuccess", type: "error"});
					} },
					{ view:"button", value:"Cancel", inputWidth:100,  click:()=>this.hideWindow()},
				]}
			],
			rules: {
				TypeID: webix.rules.isNotEmpty,
				ContactID: webix.rules.isNotEmpty
			}
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
    
	showWindow(label, buttonLabel, values) {
		if(typeof values == "undefined")
			this.$$("form").clear();	
		else if (isNaN(values)==false){
			this.$$("form").elements.ContactID.setValue(values);
			this.$$("form").elements.ContactID.disable();
		}
		else
			this.$$("form").setValues(values);
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