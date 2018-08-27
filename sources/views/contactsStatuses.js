import {JetView} from "webix-jet";
import {StatusesData} from "../models/statusesCollection";
import SettingPopupView from "./settingsPopup";

export default class ContactStatusesView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
        
		return  {
			rows:[
				{view:"button", value:_("Add status"), inputWidth:300, css:"rightButton", click:()=>{
					this._jetPopup.showWindow("Add contact statuses", "Add", StatusesData);
				}},
				{view:"datatable",
					editable: true,
					editaction: "dblclick",
					localId:"statusesDatatable",
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
										StatusesData.remove(id);
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
		StatusesData.waitData.then(()=>{
			this.$$("statusesDatatable").parse(StatusesData);
		});
		this._jetPopup = this.ui(SettingPopupView);
	}

}