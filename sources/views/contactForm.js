import {JetView} from "webix-jet";
import {StatusesData} from "../models/statusesCollection";
import {ContactsData} from "models/contactsCollection";
import {icon} from "../models/userIcon";

export default class ContactFormView extends JetView{

	config(){

		const _ = this.app.getService("locale")._;
		let toolbar = {
			view:"toolbar",
			cols:[
				{view:"label", label:"", localId:"labelToolbar"}
			]
		};
        
		let elements = [
			{cols:[
				{ rows:[
					{ view:"text", label:_("First Name"), labelWidth:100, name:"FirstName"},
					{ view:"text", label:_("Last Name"), labelWidth:100, name:"LastName" },
					{ view:"datepicker", label:_("Joining date"), labelWidth:100, name:"StartDate" },
					{ view:"richselect", name:"StatusID",  label:_("Status"), labelWidth:100,  options:{body:{template:"#Icon#", data: StatusesData}}},
					{ view:"text", label:_("Job"), labelWidth:100, name:"Job" },
					{ view:"text", label:_("Company"), labelWidth:100, name:"Company" },
					{ view:"text", label:_("Website"), labelWidth:100, name:"Website" },
					{ view:"textarea", label:_("Address"), labelWidth:100, height:100, name:"Address" }    			
				], paddingX:10},
				{ rows:[ 
					{ view:"text", label:_("Email"), labelWidth:100, name:"Email" },
					{ view:"text", label:_("Skype"), labelWidth:100, name:"Skype" },
					{ view:"text", label:_("Phone"), labelWidth:100, name:"Phone" },
					{ view:"datepicker", label:_("Birthday"), labelWidth:100, name:"Birthday" },
					{
						cols:[
							{template:"<div class='photo'><img src='#Photo#' class='image' style='display:block;'></div>", borderless:true, localId:"templatePhoto"}, //#Photo#
							{rows:[
								{},
								{view: "uploader", value:_("Change photo"), autosend:false, 
									multiple:false,
									on:{        
										onBeforeFileAdd: (upload)=>{        
											var file = upload.file;
											var reader = new FileReader();  
											reader.onload = (event)=>{
												var dataurl = event.target.result;
												this.$$("templatePhoto").setValues({Photo:dataurl});
												this.$$("form").setValues({Photo:dataurl}, true);
											};           
											reader.readAsDataURL(file);
											return false;
										}}
								},
								{view:"button", value:_("Delete photo"), type:"form", click:()=>{
									this.$$("templatePhoto").setValues({Photo:icon});
									this.$$("form").setValues({Photo:" "}, true);
								}}
							]
							}
						]
					}
				]}
			]
			}
		];
        
		let bottomButton = {
			cols:[
				{gravity:2},
				{view:"button", value:_("Cancel"), click:()=>{
					var id = this.getParam("id", true);
					if(typeof id == "undefined"){
						id=ContactsData.getFirstId();
						let path = "?id=" + id + "/contactInformation";
						this.getParentView().show(path);
					}
					else {
						let path = "?id=" + id + "/contactInformation";
						this.getParentView().show(path);
					}
				}},
				{view:"button", value:"", type:"form", localId:"addButton", click:()=>{
					var id = this.getParam("id", true);
					let values = this.$$("form").getValues();
					if(typeof id == "undefined"){
						if(values.hasOwnProperty("Photo")==false)
							values.Photo = " ";							
						ContactsData.add(values);

					}
					else {
						ContactsData.updateItem(id, values);
						let path = "?id=" + id + "/contactInformation";
						this.getParentView().show(path);
					}
				}}
			],
			padding:15,
			borderless:true
		};

		let view = {
			rows:[
				toolbar,
				{ view:"form", elements:elements, borderless:true, localId:"form"},{},
				bottomButton
			],
			gravity:3
		};

		return view;
	}

	init(){
		const _ = this.app.getService("locale")._;
		var id = this.getParam("id", true);
		let item = ContactsData.getItem(id);
		if(typeof id == "undefined"){
			this.$$("labelToolbar").setValue(_("Add new contact"));
			this.$$("addButton").setValue(_("Add"));
			this.$$("templatePhoto").setValues({Photo: icon});
		}
		else {
			if(item.Photo==" " || item.Photo=="")
				this.$$("templatePhoto").setValues({Photo: icon});
			else this.$$("templatePhoto").setValues({Photo:ContactsData.getItem(id).Photo});
			this.$$("labelToolbar").setValue(_("Edit contact"));
			this.$$("addButton").setValue(_("Save"));
		}
	}
	urlChange(){
		var id = this.getParam("id", true);
		ContactsData.waitData.then(()=>{
			if (typeof id == "undefined"){
				this.$$("form").clear();
			}
			else {
				this.$$("form").setValues(ContactsData.getItem(id));
			}
		});	
	}
}