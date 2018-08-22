import {JetView} from "webix-jet";
import ActivitiesPopupView from "./activitiesPopup";
import DatatableView from "./datatableActivities";

export default class DataView extends JetView{
	config(){
		let view = {
			rows:[
				{view:"button", type:"icon", icon:"plus-square", label:"Add activity", css:"rightButton", inputWidth:110, click:()=>{
					this._jetPopup.showWindow("Add activity", "Add");
				}},
				DatatableView
			]
		};
		return view;
	}
	init(){
		this._jetPopup = this.ui(ActivitiesPopupView);
	}
}