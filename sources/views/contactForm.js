import {JetView} from "webix-jet";
import {StatusesData} from "../models/statusesCollection";
import {ContactsData} from "models/contactsCollection";
import {icon} from "../models/userIcon";

export default class ContactFormView extends JetView{

	config(){
		let toolbar = {
			view:"toolbar",
			cols:[
				{view:"label", label:"", localId:"labelToolbar"}
			]
		};
        
		let elements = [
			{cols:[
				{ rows:[
					{ view:"text", label:"First Name", labelWidth:100, name:"FirstName"},
					{ view:"text", label:"Last Name", labelWidth:100, name:"LastName" },
					{ view:"datepicker", label:"Joining date", labelWidth:100, name:"StartDate" },
					{ view:"richselect", name:"StatusID",  label:"Status", labelWidth:100,  options:{body:{template:"#Icon#", data: StatusesData}}},
					{ view:"text", label:"Job", labelWidth:100, name:"Job" },
					{ view:"text", label:"Company", labelWidth:100, name:"Company" },
					{ view:"text", label:"Website", labelWidth:100, name:"Website" },
					{ view:"textarea", label:"Address", labelWidth:100, height:100, name:"Address" }    			
				], paddingX:10},
				{ rows:[ 
					{ view:"text", label:"Email", labelWidth:100, name:"Email" },
					{ view:"text", label:"Skype", labelWidth:100, name:"Skype" },
					{ view:"text", label:"Phone", labelWidth:100, name:"Phone" },
					{ view:"datepicker", label:"Birthday", labelWidth:100, name:"Birthday" },
					{
						cols:[
							{template:"<div class='photo'><img src='#Photo#' class='image' style='display:block;'></div>", borderless:true, localId:"templatePhoto"}, //#Photo#
							{rows:[
								{},
								{view: "uploader", value:"Change photo", autosend:false, 
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
								{view:"button", value:"Delete photo", type:"form", click:()=>{
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
				{view:"button", value:"Cancel", click:()=>{
					var id = this.getParam("id", true);
					if(typeof id == "undefined"){
						id=ContactsData.getFirstId();
						var path = "/top/contacts?id=" + id + "/contactInformation";
						this.show(path);
					}
					else {
						let path = "/top/contacts?id=" + id + "/contactInformation";
						this.show(path);
					}
				}},
				{view:"button", value:"", type:"form", localId:"addButton", click:()=>{
					var id = this.getParam("id", true);
					let values = this.$$("form").getValues();
					if(typeof id == "undefined"){
						if(values.hasOwnProperty("Photo")==false)
							values.Photo = " ";							
						ContactsData.add(values);
						ContactsData.data.attachEvent("onIdChange", (oldid,newid)=>{
							let path = "/top/contacts?id=" + newid +"/contactInformation";
							this.show(path);
						});

					}
					else {
						ContactsData.updateItem(id, values);
						let path = "/top/contacts?id=" + id + "/contactInformation";
						this.show(path);
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
		
		var id = this.getParam("id", true);
		let item = ContactsData.getItem(id);
		if(typeof id == "undefined"){
			this.$$("labelToolbar").setValue("Add new contact");
			this.$$("addButton").setValue("Add");
			this.$$("templatePhoto").setValues({Photo: icon});
		}
		else {
			if(item.Photo==" " || item.Photo=="")
				this.$$("templatePhoto").setValues({Photo: icon});
			else this.$$("templatePhoto").setValues({Photo:ContactsData.getItem(id).Photo});
			this.$$("labelToolbar").setValue("Edit contact");
			this.$$("addButton").setValue("Save");
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