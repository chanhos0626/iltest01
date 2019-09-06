({
    init: function (cmp, event, helper) {
        var sObjectName = 'Contact',
        sListViewLabelId = '00B7F0000067WVhUAM',
        Dataname = 'My Contacts';
        cmp.set('v.ObjectName', sObjectName);
        cmp.set('v.ListViewLabel',Dataname);
        cmp.set('v.FilterId',sListViewLabelId);
        helper.getData(cmp);
    },
    filterCilck: function (cmp, event, helper) {
        var DataId = cmp.get('v.FilterId');
        for(var i=0;i<cmp.find('checkbox').length;i++){
            if(cmp.find('checkbox')[i].getElements()[0].classList[0] == DataId){
                if(cmp.find('checkbox')[i].getElements()[0].classList.length == 3){
                    $A.util.toggleClass(cmp.find('checkbox')[i].getElements()[0],'checknone');
                }
            }else{
                if(cmp.find('checkbox')[i].getElements()[0].classList.length == 2){
                    $A.util.toggleClass(cmp.find('checkbox')[i].getElements()[0],'checknone');
                }
            }
        }
        var cmpTarget = cmp.find('filterMain');
        $A.util.toggleClass(cmpTarget, 'FilterShow');
    },
    SearchFilter: function (cmp, event, helper) {
        var cmpTarget = cmp.find('SearchFilter');
        $A.util.toggleClass(cmpTarget, 'SearchFilterShow');
    },
    test: function (cmp, event, helper) {
        var current = event.currentTarget;
        var DataId = current.getAttribute('data-Id');
        var Dataname = current.getAttribute('data-Name');
        cmp.set('v.FilterId',DataId);
        cmp.set('v.ListViewLabel',Dataname);
        for(var i=0;i<cmp.find('checkbox').length;i++){
            if(cmp.find('checkbox')[i].getElements()[0].classList[0] == DataId){
                if(cmp.find('checkbox')[i].getElements()[0].classList.length == 3){
                    $A.util.toggleClass(cmp.find('checkbox')[i].getElements()[0],'checknone');
                }
            }else{
                if(cmp.find('checkbox')[i].getElements()[0].classList.length == 2){
                    $A.util.toggleClass(cmp.find('checkbox')[i].getElements()[0],'checknone');
                }
            }
        }
        var cmpTarget = cmp.find('filterMain');
        $A.util.toggleClass(cmpTarget, 'FilterShow');
        helper.getData(cmp);
    },
    SearchFIlterClick: function (cmp, event, helper) {
        var sObjectName = cmp.get('v.ObjectName'),
            combo = cmp.find('combobox').get('v.value'),
            filterText = cmp.find('filterText').get('v.value');
        var Label = 'Search Result - '+ combo +' : '+filterText;
        cmp.set('v.ListViewLabel',Label);
        var action = cmp.get('c.getSearchList');
        action.setParams({
            ObjectName:sObjectName,
            FilterSearch:combo,
            FilterText:filterText
        });
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                for(var i=0; i<response.getReturnValue().DataList.length;i++){
                    response.getReturnValue().DataList[i].Name1 = '/'+response.getReturnValue().DataList[i].Id;
                    window.console.log(response.getReturnValue().DataList[i].Name1);
                }
                cmp.set('v.Result', response.getReturnValue().DataList);
            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        window.console.log('fieldName >> '+fieldName);
        var sortDirection = event.getParam('sortDirection');
        window.console.log('sortDirection >> '+sortDirection);
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
   },
   createRecord : function (cmp, event, helper) {
       var createRecordEvent = $A.get("e.force:createRecord");
           createRecordEvent.setParams({
               "entityApiName": "Contact"
           });
           createRecordEvent.fire();
   }
})