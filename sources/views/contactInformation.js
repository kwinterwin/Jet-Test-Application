import {JetView} from "webix-jet";
import {ContactsData} from "../models/contactsCollection";
import {StatusesData} from "../models/statusesCollection";

export default class ContactInformationView extends JetView{
	config(){

		let toolbar = {
			view:"toolbar",
			cols:[
				{view:"label", label:"#FirstName# #LastName#"},
				{},
				{view:"button", label:"Delete", type: "icon", icon: "trash", width:100},
				{view:"button", label:"Edit", type:"icon", icon:"pencil-square-o", width:100}
			]
		};
        
		let information = {
			cols:[
				{
					view:"template",
					localId:"template1",
					borderless: true,
					template:"<img src='#Photo#' class='image' style='display:block;'> <span style='text-align:center;'>#StatusValue# #StatusIcon#</span>"
				},
				{
					view:"template", 
					localId:"template2",
					template:"<span><i class='fa fa-envelope'></i>#Email#</span><span><i class='fa fa-skype'></i>#Skype#</span>"
                     + "<span><i class='fa fa-tag'></i>#Job#</span><span><i class='fa fa-briefcase'></i>#Company#</span>", 
					borderless:true
				},
				{
					view:"template",
					localId:"template3",
					template:"<span><i class='fa fa-calendar'></i>#Birthday#</span><span><i class='fa fa-map-marker'></i>#Address#</span>", 
					borderless:true
				}
			]
		};
		let view = {
			rows:[
				toolbar,
				information,
				{}
			],
			gravity:3
		};
		return view;
	}
	init(){
	
	}
	urlChange(view){
		var id = this.getParam("id");
		ContactsData.waitData.then(()=>{
			if(id && ContactsData.exists(id)){
				view.queryView({view:"label"}).setValue(ContactsData.getItem(id).FirstName + " " + ContactsData.getItem(id).LastName);
				// console.log(StatusesData.getItem(1).Icon);
				if(StatusesData.exists(ContactsData.getItem(id).StatusID)){
					ContactsData.getItem(id).StatusValue = StatusesData.getItem(ContactsData.getItem(id).StatusID).Value;
					ContactsData.getItem(id).StatusIcon = StatusesData.getItem(ContactsData.getItem(id).StatusID).Icon;
				}
				else{
					ContactsData.getItem(id).StatusValue = "";
					ContactsData.getItem(id).StatusIcon = "";
				}
				this.$$("template1").setValues(ContactsData.getItem(id));
				this.$$("template2").setValues(ContactsData.getItem(id));
				this.$$("template3").setValues(ContactsData.getItem(id));
			}
		});
	}
}