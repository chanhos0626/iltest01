({
    openModal: function(component, event, helper) {
		helper.openModal(component, event);
	},

	closeModal: function(component, event, helper) {
		// for Hide/Close Modal,set the "isOpen" attribute to "Fasle"
		component.set("v.isOpen", false);
	},

    addAttendee: function(component, event, helper) {
		//helper.addAttendee(component, event);
	},

    onChangeSearch: function(component, event, helper) {
		//helper.onChangeSearch(component, event);
    },

    onChangeType: function(component, event, helper) {
        //helper.onChangeType(component, event);
    },

    addToBuffer: function(component, event, helper) {
		//helper.addToBuffer(component, event);
    },

    removeFromBuffer: function(component, event, helper) {
		//helper.removeFromBuffer(component, event);
    },

})