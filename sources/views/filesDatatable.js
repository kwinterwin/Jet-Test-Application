// 

import {JetView} from "webix-jet";

export default class FilesDatatableView extends JetView{
	config(){
		let datatable = {
			view:"datatable", 
			select: true,
			localId: "filesDatatable",
			columns:[
				{ id:"Name", header:"Name", fillspace:2},
				{ id:"ChangeDate", header:"Change Date", fillspace:1.1},
				{ id:"Size", header:"Size", fillspace:0.8},
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
								//
							}
						}
					});
					return false;
				}
			}

		};
        
		return {
			rows:[
				datatable,
				{cols:[{},
					{view: "uploader" , type:"iconButton", icon:"cloud-upload", label:"Upload file", css:"uploadButton"},{}]}
			]
		};
	}
     
	init(){
	
	}
    
	urlChange(){
	
	}

}