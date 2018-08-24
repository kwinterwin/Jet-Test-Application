import {JetView} from "webix-jet";
import DatatableView from "./datatableActivities";
import FilesDatatableView from "./filesDatatable";
// import {ContactsData} from "models/contactsCollection";

export default class TabviewView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		let tabview = {
			view:"tabview",
			animate: true,
			cells:[     
				{
					header:_("Activities"),
					body:{
						rows:[DatatableView]
					}      
				},
				{ header:_("Files"), 
					body:{
						rows:[FilesDatatableView]
					} 
				}
			]
		};
        
		return tabview;
	}
	init(){
		
	}
	urlChange(){
		
		
	}
}