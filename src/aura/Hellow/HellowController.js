({
	doInit : function(component, event, helper) {
        var test =  component.get("v.recordId");
        console.log(component);
        console.log(test);
        component.set('v.recordId2',test)
	}
})