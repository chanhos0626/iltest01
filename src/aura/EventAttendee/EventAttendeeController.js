({
	doInit : function(component, event, helper) {
        window.console.log('recordId',component.get("v.recordid"));
		//helper.initEventAttendee(component);
		//application
		 helper.initEventAttendee(component);
	},
    clickAdd : function(component, event, helper) {
        window.console.log(component.get("v.recordId"));
        helper.clickAdd(component);
    },
    selectMenu : function(component, event, helper) {
        //helper.selectMenu(component, event);
    },
    reloadAttendee : function(component, event, helper) {
        //helper.reloadAttendee(component, event);
    }
})