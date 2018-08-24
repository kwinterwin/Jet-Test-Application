import {JetView} from "webix-jet";
import {ActivityData} from "../models/activityCollection";
import {ContactsData} from "../models/contactsCollection";
import {ActivityTypesData} from "../models/activityTypesCollection";

export default class ActivitiesPopupView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		let form = {
			view:"form",
			localId: "form",
			elements:[
				{ view:"textarea", label:_("Details"), labelWidth:100, name:"Details"},
				{ view:"richselect", name:"TypeID", labelWidth:100,  label:_("Type"), required:true, options:{body:{template:"#Value#", data: ActivityTypesData}}},
				{ view:"richselect", name:"ContactID", labelWidth:100,  label:_("Contact"), required:true, options:{body:{template:"#FirstName# #LastName#", data: ContactsData}} },
				{cols:[
					{view:"datepicker", label:_("Date"), labelWidth:100, name:"DueDate",  format:"%d-%m-%Y"},
					{view:"datepicker", type:"time", labelWidth:100,  label:_("Time"), name:"Time"}
				]},
				{view:"checkbox", labelRight:_("Completed"), labelAlign:"right", labelWidth:100,  name:"State", checkValue:"Close", uncheckValue:"Open"},
				{cols:[
					{},{},
					{ view:"button", value:"", localId:"addButton", type:"form", inputWidth:100, click:()=>{
						if(this.$$("form").validate()){
							let values = this.$$("form").getValues();

							if (values.id && ActivityData.exists(values.id))
								ActivityData.updateItem(values.id, values);
							else
								ActivityData.add(values); 
							this.hideWindow();
						}
						else webix.message({text: _("Validation is unsuccess"), type: "error"});
					} },
					{ view:"button", value:_("Cancel"), inputWidth:100,  click:()=>this.hideWindow()},
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
		const _ = this.app.getService("locale")._;
		if(typeof values == "undefined")
			this.$$("form").clear();	
		else if (typeof values !== "object"){
			this.$$("form").elements.ContactID.setValue(values);
			this.$$("form").elements.ContactID.disable();
		}
		else
			this.$$("form").setValues(values);
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