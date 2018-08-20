import {JetView} from "webix-jet";
import {FilesData} from "../models/filesCollection";

export default class FilesDatatableView extends JetView{

	sort_by_date(data1, data2){
		let year1 = data1.ChangeDate.split("-");
		let year2 = data2.ChangeDate.split("-");
		if(year1[2]==year2[2]){
			if(year1[1]==year2[1]){
				return year1[0]>year2[0] ? 1:-1;
			}
			else
				return year1[1]>year2[1] ? 1:-1;
		}
		else return year1[2]>year2[2] ? 1:-1;
	}

	config(){
		let datatable = {
			view:"datatable", 
			select: true,
			localId: "filesDatatable",
			scrollX:false,
			columns:[
				{ id:"Name", header:"Name", fillspace:2, sort:"string"},
				{ id:"ChangeDate", header:"Change Date", fillspace:1.1, sort:this.sort_by_date},
				{ id:"Size", header:"Size", fillspace:0.8, sort:"int", template:"#Size# kb"},
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
								FilesData.remove(id);
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
					{view: "uploader" , type:"iconButton", icon:"cloud-upload", label:"Upload file", css:"uploadButton",
						on:{     
							onBeforeFileAdd: (upload)=>{        
								var file = upload.file;
								var reader = new FileReader();  
								reader.onload = ()=>{
									let date = new Date();
									let dateFormat = date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
									FilesData.add({Name:upload.file.name, ChangeDate: dateFormat, Size: upload.file.size, ContactID: this.getParam("id", true)});
								};           
								reader.readAsDataURL(file);
								return false;
							},
							onFileUploadError:()=>{
								webix.alert("Error during file upload");
							}
						}
					},{}]}
			]
		};
	}
     
	init(){
		var id = this.getParam("id", true);
		FilesData.waitData.then(()=>{
			this.$$("filesDatatable").sync(FilesData, function(){
				this.filter(function(obj){
					return obj.ContactID == id;
				});
			});
		}); 
	}
    
	urlChange(){
		var id = this.getParam("id", true);
		FilesData.waitData.then(()=>{
			this.$$("filesDatatable").sync(FilesData, function(){
				this.filter(function(obj){
					return obj.ContactID == id;
				});
			});
		});
	}

}