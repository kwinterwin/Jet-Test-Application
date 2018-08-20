import {JetView} from "webix-jet";
import {ContactsData} from "../models/contactsCollection";
import {StatusesData} from "../models/statusesCollection";
import TabviewView from "./contactsTabview";
import {icon} from "../models/userIcon";

export default class ContactInformationView extends JetView{
	config(){

		let toolbar = {
			view:"toolbar",
			cols:[
				{view:"label", label:"#FirstName# #LastName#"},
				{},
				{view:"button", label:"Delete", type: "icon", icon: "trash", width:100, click:()=>{
					webix.confirm({
						text: "Contact will be removed. Continue?", title: "Attention",
						ok: "Yes",
						cancel: "No",
						callback: (result)=> {
							if (result) {
								let id = this.getParam("id", true);
								ContactsData.remove(id);
								id = ContactsData.getFirstId();
								var path = "/top/contacts?id="+id +"/contactForm";
								this.app.show(path);
							}
						}
					});
				}},
				{view:"button", label:"Edit", type:"icon", icon:"pencil-square-o", width:100, 
					click:()=>{
						let id = this.getParam("id", true);
						var path = "/top/contacts?id="+id + "/contactForm";
						this.app.show(path);
					}}
			]
		};
		let information = {
			view:"template",
			localId:"template",
			css: "information",
			template:"<div class='photo'><img src='#Photo#' class='image' style='display:block;'> <span style='text-align:center;'>#StatusValue# #StatusIcon#</span></div>" + 
			"<div style='float:top;'><span><i class='fa fa-envelope'></i>#Email#</span><span><i class='fa fa-skype'></i>#Skype#</span>"
		+ "<span><i class='fa fa-tag'></i>#Job#</span><span><i class='fa fa-briefcase'></i>#Company#</span></div>"+
			"<div><span><i class='fa fa-calendar'></i>#Birthday#</span><span><i class='fa fa-map-marker'></i>#Address#</span></div>"
		};

		let view = {
			rows:[
				toolbar,
				information,
				TabviewView
			],
			gravity:3
		};
		return view;
	}
	init(){
	
	}
	urlChange(view){
		var id = this.getParam("id", true);
		webix.promise.all([
			ContactsData.waitData,
			StatusesData.waitData
		]).then(()=>{
			let item = ContactsData.getItem(id);
			let status = StatusesData.getItem(item.StatusID);
			if(id && ContactsData.exists(id)){
				view.queryView({view:"label"}).setValue(item.FirstName + " " + item.LastName);
				if(StatusesData.exists(item.StatusID)){
					item.StatusValue = status.Value;
					item.StatusIcon = status.Icon;
				}
				else{
					item.StatusValue = "";
					item.StatusIcon = "";
				}
				if(item.Photo==" " || item.Photo=="")
					item.Photo = icon;
				this.$$("template").setValues(item);
			}
		});

		
		
	}
}