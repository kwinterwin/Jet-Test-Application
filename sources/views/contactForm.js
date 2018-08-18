import {JetView} from "webix-jet";
import {StatusesData} from "../models/statusesCollection";
import {ContactsData} from "models/contactsCollection";

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
							{template:"<div class='photo'><img src='' class='image' style='display:block;'></div>", borderless:true}, //#Photo#
							{rows:[
								{},
								{view: "uploader", value:"Change photo"},
								{view:"button", value:"Delete photo", type:"form", click:()=>{

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
				{},{},
				{view:"button", value:"Cancel"},
				{view:"button", value:"", type:"form", localId:"addButton"}
			],
			padding:15,
			borderless:true
		};

		let view = {
			rows:[
				toolbar,
				{ view:"form", elements:elements, borderless:true},{},
				bottomButton
			],
			gravity:3
		};
		return view;
	}
	init(){
		var id = this.getParam("id", true);
		if(typeof id == "undefined"){
			this.$$("labelToolbar").setValue("Add new contact");
			this.$$("addButton").setValue("Add");
		}
		else {
			this.$$("labelToolbar").setValue("Edit contact");
			this.$$("addButton").setValue("Save");
		}
	}
	urlChange(){
				
	}
}