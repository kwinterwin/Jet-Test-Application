import {JetView} from "webix-jet";
import ActivitiesPopupView from "./activitiesPopup";
import DatatableView from "./datatableActivities";

export default class DataView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		let view = {
			rows:[
				{view:"button", type:"icon", icon:"plus-square", label:_("Add activity"), css:"rightButton", inputWidth:200, click:()=>{
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