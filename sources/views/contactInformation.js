import {JetView} from "webix-jet";
import {ContactsData} from "../models/contactsCollection";
import {StatusesData} from "../models/statusesCollection";
import TabviewView from "./contactsTabview";
import {icon} from "../models/userIcon";

export default class ContactInformationView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		let toolbar = {
			view:"toolbar",
			cols:[
				{view:"label", label:"#FirstName# #LastName#"},
				{},
				{view:"button", label:_("Delete"), type: "icon", icon: "trash", width:100, click:()=>{
					webix.confirm({
						text: _("Contact will be removed. Continue?"), title: _("Attention"),
						ok: "Yes",
						cancel: "No",
						callback: (result)=> {
							if (result) {
								let id = this.getParam("id", true);
								ContactsData.remove(id);
								id = ContactsData.getFirstId();
								var path = "/top/contacts?id="+id +"/contactInformation";
								this.app.show(path);
							}
						}
					});
				}},
				{view:"button", label:_("Edit"), type:"icon", icon:"pencil-square-o", width:200, 
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
			template:function(obj){ return "<div class='photo'><img src='" + obj.Photo + "' class='image' style='display:block;'> <span style='text-align:center;'>" + obj.StatusValue + " " + obj.StatusIcon + "</span></div>" + 
			"<div style='float:top;'><span><i class='fa fa-envelope'></i>" + obj.Email + "</span><span><i class='fa fa-skype'></i>" + obj.Skype + "</span>"
		+ "<span><i class='fa fa-tag'></i>" + obj.Job + "</span><span><i class='fa fa-briefcase'></i>" + obj.Company + "</span></div>"+
			"<div><span><i class='fa fa-calendar'></i>" +  webix.i18n.longDateFormatStr(obj.Birthday) + "</span><span><i class='fa fa-map-marker'></i>" + obj.Address + "</span></div>";
			}};

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