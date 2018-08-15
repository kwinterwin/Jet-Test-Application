import {JetView} from "webix-jet";
import {ActivityData} from "../models/activityCollection";
import {ContactsData} from "../models/contactsCollection";
import {ActivityTypesData} from "../models/activityTypesCollection";
import ActivitiesPopupView from "./activitiesPopup";

export default class DataView extends JetView{
	config(){
		let view = {
			rows:[
				{view:"button", type:"icon", icon:"plus-square", label:"Add activity", css:"rightButton", inputWidth:110, click:()=>{
					this._jetPopup.addActivity("Add activity", "Add");
				}},
				{
					view:"datatable", 
					select: true,
					localId: "activityDatatable",
					columns:[
						{ template:"{common.checkbox()}", checkValue:"Close", uncheckValue:"Open", id:"State", width:55, header:""},
						{ id:"TypeID",   header:["Activity type", {content:"selectFilter"}], fillspace:2, sort:"string", options:ActivityTypesData},
						{ id:"DueDate",    header:["Due date", {content:"datepickerFilter"}], sort:"date", fillspace:2, format:function(value){
							let DateParser = webix.Date.dateToStr("%d-%m-%Y");
							value = DateParser(value);
							return value;
						}},
						{ id:"Details",   header:["Details",{content:"textFilter"}], fillspace:2, sort:"string"},
						{ id:"ContactID",   header:["Contact",{content:"selectFilter"}], sort:"string", options:ContactsData, fillspace:2},
						{ template:"<i class='fa fa-pencil-square-o edit'></i>", width:40},
						{ template:"<i class='fa fa-trash delete'></i>", width:40}
					],
					onClick: {
						delete: function (e, id) {
							webix.confirm({
								text: "Activity will be removed. Continue?", title: "Attention",
								ok: "Yes",
								cancel: "No",
								callback: (result)=> {
									if (result) {
										ActivityData.remove(id);
									}
								}
							});
							return false;
						},
						edit:(id, view)=> {
							let value = this.getRoot().queryView({view:"datatable"}).getItem(view.row);
							this._jetPopup.editActivity("Edit activity", "Save", value);
							return false;
						}
					}
				
				}
			]
		};
		return view;
	}
	init(view){
		view.queryView({view:"datatable"}).parse(ActivityData);
		this._jetPopup = this.ui(ActivitiesPopupView);
	}
}