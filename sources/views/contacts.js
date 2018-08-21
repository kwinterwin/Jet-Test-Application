import {JetView} from "webix-jet";
import {ContactsData} from "models/contactsCollection";

export default class ContactsView extends JetView{
	config(){
		var list = {
			view:"list",
			localId:"list", 
			css:"contact",
			select: true, 
			gravity:1, 
			borderless:true,
			template:"#FirstName# #LastName#<br>#Email#",
			on: {
				"onAfterSelect":(id)=>{
					var path = "/top/contacts?id="+id + "/contactInformation";
					this.app.show(path);
				}
			}};

		let addButton = {
			view:"button",
			value:"Add contact",
			click:()=>{
				var path = "/top/contacts/contactForm";
				this.app.show(path);
			}
		};
	
		return {cols:[{rows:[list, addButton]},{$subview:true}]};
	}
	init(){
		this.$$("list").parse(ContactsData);

		ContactsData.waitData.then(()=>{
			var id = this.getParam("id") || ContactsData.getFirstId();
			if(ContactsData.exists(id)) {
				this.$$("list").select(id);
			}
		});
	}
	urlChange(){
		ContactsData.waitData.then(()=>{
			var id = this.getParam("id");
			if(ContactsData.exists(id)) {
				this.$$("list").select(id);
			}
		});
	}
}