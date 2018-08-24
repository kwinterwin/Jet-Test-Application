import {JetView} from "webix-jet";
import {ContactsData} from "models/contactsCollection";

export default class ContactsView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		let search =
		{
			view: "search", localId: "search", placeholder: "Search..",
			on:{
				onTimedKeyPress :()=>{
					let value = this.$$("search").getValue().toLowerCase();
					this.app.callEvent("list:filter", [value]);
				}
			}
		};
	

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
			value:_("Add contact"),
			click:()=>{
				var path = "/top/contacts/contactForm";
				this.show(path);
			}
		};
	
		return {cols:[{rows:[search,list, addButton]},{$subview:true}]};
	}
	init(){
		this.$$("list").parse(ContactsData);

		ContactsData.waitData.then(()=>{
			var id = this.getParam("id") || ContactsData.getFirstId();
			if(ContactsData.exists(id)) {
				this.$$("list").select(id);
			}
		});

		ContactsData.data.attachEvent("onIdChange", (oldid,newid)=>{
			this.$$("list").select(newid);
		});

		this.on(this.app, "list:filter", (value) => {
			this.$$("list").filter((obj) => {
				let name = obj.FirstName.toLowerCase().indexOf(value) == 0;
				let email = obj.Email.toLowerCase().indexOf(value) == 0;
				let surname = obj.LastName.toLowerCase().indexOf(value) == 0;
				return name || email || surname;
			});
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
	
	destroy(){
		ContactsData.data.detachEvent("onIdChange");
	}
}