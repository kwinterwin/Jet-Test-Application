import {JetView} from "webix-jet";
import {ActivityTypesData} from "../models/activityTypesCollection";
import SettingPopupView from "./settingsPopup";

export default class SettingsActivitiesView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
        
		return  {
			rows:[
				{view:"button", value:_("Add activity type"), inputWidth:300, css:"rightButton", click:()=>{
					this._jetPopup.showWindow("Add activity type", "Add");
				}},
				{view:"datatable",
					editable: true,
					editaction: "dblclick",
					localId:"activityTypeDatatable",
					scrollX:false,
					borderless:true,
					columns:[
						{ id:"Value", header:_("Value"), fillspace:2, editor: "text"},
						{ id:"Icon",   header:_("Icon"), fillspace:2, editor: "text"},
						{ template:"<i class='fa fa-trash delete'></i>", width:40}
					],
					onClick: {
						delete: function (e, id) {
							webix.confirm({
								text: _("Activity will be removed. Continue?"), title: _("Attention"),
								ok: "Yes",
								cancel: "No",
								callback: (result)=> {
									if (result) {
										ActivityTypesData.remove(id);
									}
								}
							});
							return false;
						},
					}
				}
			]
		};
	}
	init(){
		ActivityTypesData.waitData.then(()=>{
			this.$$("activityTypeDatatable").parse(ActivityTypesData);
		});
		this._jetPopup = this.ui(SettingPopupView);
	}

	add(values){
		ActivityTypesData.add(values);
	}
}