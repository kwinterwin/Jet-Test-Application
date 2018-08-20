import {JetView} from "webix-jet";
import {ActivityData} from "../models/activityCollection";
import {ContactsData} from "../models/contactsCollection";
import {ActivityTypesData} from "../models/activityTypesCollection";
import ActivitiesPopupView from "./activitiesPopup";

export default class DatatableView extends JetView{
	config(){
		let datatable = {
			view:"datatable", 
			select: true,
			scrollX:false,
			localId: "activityDatatable",
			columns:[
				{ template:"{common.checkbox()}", checkValue:"Close", uncheckValue:"Open", id:"State", width:55, header:""},
				{ id:"TypeID",   header:["Activity type", {content:"selectFilter"}], fillspace:2, sort:"string", options:ActivityTypesData},
				{ id:"DueDate",    header:["Due date", {content:"datepickerFilter"}], sort:"date", fillspace:2, format:function(value){
					let DateParser = webix.Date.dateToStr("%d-%m-%Y %H:%i");
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
					let value = this.$$("activityDatatable").getItem(view.row);
					this._jetPopup.showWindow("Edit activity", "Save", value);
					return false;
				}
			}

		};
        
		return {
			rows:[
				datatable,
				{view:"button", localId:"addButton", type:"icon", icon:"plus-square", label:"Add activity", css:"blueButton", inputWidth:200, click:()=>{
					let value = this.getParam("id", true);
					this._jetPopup.showWindow("Add activity", "Add", value);
				}}
			],
			localId:"layout"
		};
	}
    
	showDatatable(){
		var id = this.getParam("id", true);
		if(typeof id == "undefined"){
			this.$$("addButton").hide();
			ActivityData.waitData.then(()=>{
				this.$$("activityDatatable").parse(ActivityData);
			});	
		}
		else {
			ActivityData.waitData.then(()=>{
				this.$$("activityDatatable").sync(ActivityData, function(){
					this.filter(function(obj){
						return obj.ContactID == id;
					});
				});
			});            
		}
	}
    
	init(){
		this.showDatatable();	
		this._jetPopup = this.ui(ActivitiesPopupView);
	}
    
	urlChange(){
		this.showDatatable();
		this._jetPopup = this.ui(ActivitiesPopupView);	
	}

}