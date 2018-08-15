import {JetView} from "webix-jet";
import {ContactsData} from "models/contactsCollection";
import ContactInformationView from "./contactInformation";

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
					var path = "/top/contacts?id="+id;
					this.app.show(path);
				}
			}};
	
		
		return {cols:[{rows:[list,{}]},ContactInformationView]};
	}
	init(view){
		view.queryView({view:"list"}).parse(ContactsData);  
	}
	urlChange(view){
		ContactsData.waitData.then(()=>{
			var id = this.getParam("id") || ContactsData.getFirstId();
			if(ContactsData.exists(id)) {
				view.queryView({view:"list"}).select(id);
			}
		});
		
	}
}