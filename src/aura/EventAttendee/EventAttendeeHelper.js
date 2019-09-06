({
    initEventAttendee : function(component) {
        var eventId = component.get("v.recordId"),
            UserId,
            action;
        if(eventId == ''||eventId == undefined||eventId == null){
            action = component.get("c.getSystemUserId");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state === "SUCCESS") {
                    UserId = response.getReturnValue();
                    action = component.get("c.queryEventInfo");
                    action.setParams({ eventId : UserId });
                    action.setCallback(this, function(response) {
                        var state = response.getState();
                        if (component.isValid() && state === "SUCCESS") {
                            var ev = response.getReturnValue();
                            window.console.log('ev',ev);
                            component.set("v.ownerId", ev.OwnerId);
                            component.set("v.accountId", ev.AccountId);
                            component.set("v.Subject", ev.Subject);
                            window.console.log(component.get("v.Subject"));
                            if(eventId == ''||eventId == undefined||eventId == null){
                                this.getEventAttendee(component, ev.Id);
                            }else{
                                this.getEventAttendee(component, eventId);
                            }
                        }
                    });
                    $A.enqueueAction(action);
                }                
            });
            $A.enqueueAction(action);
        }        
    },
    selectMenu : function(component, event) {
        var eventId = component.get("v.recordId");
        var selectedItem = event.getParam("value");
        var param = selectedItem.split(':');
        console.log(param);
        
        var action = component.get("c.deleteEventAttendee");
        action.setParams({ attendeeId : param[1] });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                this.getEventAttendee(component, eventId);
            }
        });
        $A.enqueueAction(action);
    },
    getEventAttendee : function(cmp, eventId) {
        var action = cmp.get("c.queryEventAttendee");
        action.setParams({ eventId : eventId });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (cmp.isValid() && state === "SUCCESS") {
                var attendee = response.getReturnValue();
                window.console.log('attendee',attendee);
                cmp.set("v.attendee", attendee);
                
                if(attendee.length > 0){
                    var existing = [];
                    attendee.forEach(function(element, index, array){
                        var o = {};
                        o.Id = element.Relation.Id;
                        o.Name = element.Relation.Name;
                        existing.push(o);
                    });
                    console.log('make existing');
                    cmp.set("v.existing", existing);
                    //console.log(existing);
                }
                //console.log(attendee);
            }
        });
        $A.enqueueAction(action);
    },
    clickAdd : function(cmp) {
        var action = cmp.get("c.queryUserId");
        //var action = component.get("c.getSystemUserId");
        action.setCallback(this, function(response) {
            var state = response.getState();
            window.console.log(state);
            if (cmp.isValid() && state === "SUCCESS") {
                var userId = response.getReturnValue();
                if(cmp.get("v.ownerId") != userId){
                    alert('Are you sure join to this event?');
                    this.addMySelf(cmp, userId);
                } else {
                    alert('open modal from parent');
                    var ev = cmp.find("addModal");
                    ev.openModal();
                }
                Window.console.log(cmp);
            }
        });
        $A.enqueueAction(action);
    },
    reloadAttendee : function(component, event, helper) {
        console.log('event fired from child for reload attendee');
        var eventId = component.get("v.recordId");
        this.getEventAttendee(component, eventId);
    },
    addMySelf: function(cmp, uid){
        var persons = [],
            eventId = cmp.get("v.recordId");
        persons.push(uid);
        var action = component.get("c.addEventAttendee");
        action.setParams({
            eventId : eventId,
            persons : persons
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                this.getEventAttendee(cmp, eventId);
            }
        });
        console.log('call addAttendee in Apex');
        $A.enqueueAction(action);
    }
})