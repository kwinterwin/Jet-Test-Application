import {JetView} from "webix-jet";
import DatatableView from "./datatableActivities";
import FilesDatatableView from "./filesDatatable";
// import {ContactsData} from "models/contactsCollection";

export default class TabviewView extends JetView{
	config(){
		let tabview = {
			view:"tabview",
			animate: true,
			cells:[     
				{
					header:"Activities",
					body:{
						rows:[DatatableView]
					}      
				},
				{ header:"Files", 
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