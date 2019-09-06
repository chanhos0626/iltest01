({
    openModal: function(component, event) {
		// for Display Modal,set the "isOpen" attribute to "true"
		window.console.log('open clicked');
        var existing = component.get("v.existing");
        component.set("v.existMap", this.list2map(existing));
        window.console.log(existing);
        window.console.log(component.get("v.existMap"));
        component.set("v.selected", []);
        component.set("v.selectMap", {});
        component.set("v.available", []);
        component.set("v.availMap", {});
        if(component.get("v.accountId") != ''){
            component.set("v.hasAccount", true);
        }
        
		this.queryPerson(
            true,
            component,
            component.get("v.selType"),
            component.get("v.accountId"),
            ""
        );
	},

    addAttendee: function(component, event) {
        console.log('add new attendee to event');
        var selected = component.get("v.selected");
        if(selected.length > 0){
            var persons = [];
            selected.forEach(function(el, idx, arr){
                persons.push(el.Id);
            });

            var eventId = component.get("v.eventId");
            var action = component.get("c.addEventAttendee");
            action.setParams({
                eventId : eventId,
                persons : persons
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (component.isValid() && state === "SUCCESS") {
                    // for Hide/Close Modal,set the "isOpen" attribute to "Fasle"
                    var cmpEvent = component.getEvent("addEvent");
                    cmpEvent.fire();
                    component.set("v.isOpen", false);
                }
            });
            console.log('call addAttendee in Apex');
            $A.enqueueAction(action);
        }
    },
    list2map: function(lst){
        var mtmp = {};
        if(lst.length > 0){
            lst.forEach(function(el, idx, arr){
                mtmp[el.Id] = el.Name;
            });
        }
        return mtmp;
    },
    queryPerson: function(isOpen, cmp, typ, accId, search){
        var action = cmp.get("c.queryPerson");
		action.setParams({
            selType : typ,
            accountId : accId,
            searchText : search
        });
        action.setCallback(this, function(response) {
			var state = response.getState();
			if (cmp.isValid() && state === "SUCCESS") {
                var lp = response.getReturnValue();
                cmp.set("v.available", lp);
                cmp.set("v.availMap", this.list2map(lp));
                window.console.log('query and set');
                window.console.log(cmp.get("v.available"));
                window.console.log(cmp.get("v.availMap"));
                if(isOpen) cmp.set("v.isOpen", true);
                this.makeTargetOption(cmp);
			}
		});
        $A.enqueueAction(action);        
    },
    makeTargetOption: function(cmp){
        window.console.log('make available option');
		var avail = cmp.find("target"),
            lst = cmp.get("v.available"),
        	existMap = cmp.get("v.existMap"),
        	ownerId = cmp.get("v.ownerId"),
    		opts=[];
    	if(lst.length > 0){
            lst.forEach(function(el, idx, arr){
                if((el.Id in existMap) != true && el.Id != ownerId)
                	opts.push({"class": "optionClass", label: el.Name, value: el.Id})
            });
		}
    	avail.set("v.options", opts);
	}/*,

    onChangeType: function(component, event){
		console.log('onchange search with type change');
		this.queryPerson(
            false,
            component,
            component.get("v.selType"),
            component.get("v.accountId"),
            ''
        );
    },

    onChangeSearch: function(component, event){
		console.log('onchange search with text');
		this.queryPerson(
            false,
            component,
            component.get("v.selType"),
            component.get("v.accountId"),
            component.find("searchText").get("v.value")
        );
    },

    queryPerson: function(isOpen, cmp, typ, accId, search){
        var action = cmp.get("c.queryPerson");
		action.setParams({
            selType : typ,
            accountId : accId,
            searchText : search
        });
        action.setCallback(this, function(response) {
			var state = response.getState();
			if (cmp.isValid() && state === "SUCCESS") {
                var lp = response.getReturnValue();
                cmp.set("v.available", lp);
                cmp.set("v.availMap", this.list2map(lp));
                console.log('query and set');
                console.log(cmp.get("v.available"));
                console.log(cmp.get("v.availMap"));
                if(isOpen) cmp.set("v.isOpen", true);
                this.makeTargetOption(cmp);
			}
		});
        $A.enqueueAction(action);        
	},

    list2map: function(lst){
        var mtmp = {};
        if(lst.length > 0){
            lst.forEach(function(el, idx, arr){
                mtmp[el.Id] = el.Name;
            });
        }
        return mtmp;
    },

    makeTargetOption: function(cmp){
        console.log('make available option');
		var avail = cmp.find("target"),
            lst = cmp.get("v.available"),
        	existMap = cmp.get("v.existMap"),
        	ownerId = cmp.get("v.ownerId"),
    		opts=[];
    	if(lst.length > 0){
            lst.forEach(function(el, idx, arr){
                if((el.Id in existMap) != true && el.Id != ownerId)
                	opts.push({"class": "optionClass", label: el.Name, value: el.Id})
            });
		}
    	avail.set("v.options", opts);
	},

    makeInviteOption: function(cmp){
        console.log('make selected option');
		var select = cmp.find("invite"),
            lst = cmp.get("v.selected"),
    		opts=[];
        cmp.set("v.selectMap", this.list2map(lst));
    	if(lst.length > 0){
            lst.forEach(function(el, idx, arr){
                opts.push({"class": "optionClass", label: el.Name, value: el.Id})
            });
		}
    	select.set("v.options", opts);
	},

    addToBuffer: function(component, event) {
		console.log('click addToBuffer');
        var availMap = component.get("v.availMap"),
        	selected = component.get("v.selected"),
        	selectMap = component.get("v.selectMap"),
        	existMap = component.get("v.existMap"),
        	target = component.get("v.target"),
        	strarr = target.split(';');
        console.log(strarr);
        if(strarr.length > 0){
            strarr.forEach(function(el, idx, arr){
                if((el in selectMap) != true && (el in existMap) != true){
                    var o = {};
                    o.Id = el;
                    o.Name = availMap[el];
                    selected.push(o);
                }
            });
            this.makeInviteOption(component);
            component.set("v.available", this.rebuildObjectArray(strarr, component.get("v.available")));
            this.makeTargetOption(component);
            
        }
    },

    removeFromBuffer: function(component, event) {
		console.log('click removeFromBuffer');
        var selectMap = component.get("v.selectMap"),
        	available = component.get("v.available"),
        	availMap = component.get("v.availMap"),
        	invite = component.get("v.invite"),
        	strarr = invite.split(';');
        console.log(strarr);
        if(strarr.length > 0){
            strarr.forEach(function(el, idx, arr){
                var o = {};
                o.Id = el;
                o.Name = selectMap[el];
                available.push(o);
            });
            component.set("v.available", available);
            this.makeTargetOption(component);
            component.set("v.selected", this.rebuildObjectArray(strarr, component.get("v.selected")));
            this.makeInviteOption(component);
            
        }
    },

    rebuildObjectArray: function(src, tgt){
        var updarr = [];
        tgt.forEach(function(tel, tidx, tarr){
            var hasId = false;
            src.forEach(function(sel, sidx, sarr){
                if(tel.Id == sel) hasId = true;
            });
            if(!hasId) updarr.push(tel);
        });
        return updarr
    }*/
})