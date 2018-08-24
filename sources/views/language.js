import {JetView} from "webix-jet";

export default class LanguageView extends JetView{
	config(){

		return {rows:[{
			view:"segmented", 
			value:1, options:[
				{ "id":"ru", "value":"Русский" }, 
				{ "id":"en", "value":"English" }
			], click:() => {
				const langs = this.app.getService("locale");
				const value = this.getRoot().queryView({view:"segmented"}).getValue();
				langs.setLang(value);
			}
		},{}]}; 
	}
	init(){
		
	}
}