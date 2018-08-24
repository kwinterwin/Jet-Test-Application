import {JetView} from "webix-jet";
import {ActivityData} from "../models/activityCollection";
import {ContactsData} from "../models/contactsCollection";
import {ActivityTypesData} from "../models/activityTypesCollection";
import ActivitiesPopupView from "./activitiesPopup";

export default class DatatableView extends JetView{
	config(){
		const _ = this.app.getService("locale")._;
		let datatable = {
			view:"datatable", 
			select: true,
			scrollX:false,
			localId: "activityDatatable",
			columns:[
				{ template:"{common.checkbox()}", checkValue:"Close", uncheckValue:"Open", id:"State", width:55, header:""},
				{ id:"TypeID",   header:[_("Activity type"), {content:"selectFilter"}], fillspace:2, sort:"string", options:ActivityTypesData},
				{ id:"DueDate",    header:[_("Due date"), {content:"datepickerFilter"}], sort:"date", fillspace:2, format:function(value){
					let DateParser = webix.Date.dateToStr("%d-%m-%Y %H:%i");
					value = DateParser(value);
					return value;
				}},
				{ id:"Details",   header:[_("Details"),{content:"textFilter"}], fillspace:2, sort:"string"},
				{ id:"ContactID",   header:[_("Contact"),{content:"selectFilter"}], sort:"string",hidden:true, options:ContactsData, fillspace:2},
				{ template:"<i class='fa fa-pencil-square-o edit'></i>", width:40},
				{ template:"<i class='fa fa-trash delete'></i>", width:40}
			],
			on:{
				onAfterFilter: () => {
					let id = this.getParam("id", true);
					if (typeof id != "undefined")
						this.$$("activityDatatable").filter((obj) => {
							return obj.ContactID == id;
						}, "", true);
				},
			},
			onClick: {
				delete: function (e, id) {
					webix.confirm({
						text: _("Activity will be removed. Continue?"), title: _("Attention"),
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
				{view:"button", localId:"addButton", type:"icon", icon:"plus-square", label:_("Add activity"), css:"blueButton", inputWidth:200, click:()=>{
					let value = this.getParam("id", true);
					this._jetPopup.showWindow("Add activity", "Add", value);
				}}
			],
			localId:"layout"
		};
	}
    
	showDatatable(){
		var url = this.getUrl();
		var id = this.getParam("id", true);
		if(url[0].page=="data"){
			this.$$("addButton").hide();
			ActivityData.waitData.then(()=>{
				this.$$("activityDatatable").parse(ActivityData);
			});	
			// this.$$("activityDatatable").showColumn("ContactID");
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