({
    getData : function(cmp) {
        var sObjectName = cmp.get('v.ObjectName'),
            sListViewLabelId = cmp.get('v.FilterId'),
            action = cmp.get('c.getContactListId');
        action.setParams({
            ObjectName:sObjectName,
            ListViewLabelId:sListViewLabelId
        });
        action.setCallback(this, $A.getCallback(function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set('v.ObjectName', sObjectName);
                cmp.set('v.Result', response.getReturnValue().DataList);//FilterList
                cmp.set('v.FilterList', response.getReturnValue().FilterList);//FilterList
                cmp.set('v.ListHeaderLabel', response.getReturnValue().ListHeaderLabel);//FilterList

                for(var i=0; i<response.getReturnValue().DataList.length;i++){
                    response.getReturnValue().DataList[i].Name1 = '/'+response.getReturnValue().DataList[i].Id;
                    ///window.console.log(response.getReturnValue().DataList[i].Name1);
                }
                var columns = [];
                for(var i=0; i<response.getReturnValue().ListHeaderLabel.length;i++){
                    if(response.getReturnValue().ListHeaderLabel[i] == 'Name'){// type: 'url'
                        columns.push({label: response.getReturnValue().ListHeaderLabel[i], fieldName: response.getReturnValue().fieldNameOrPath[i]+'1' , type: 'url', sortable: true, typeAttributes:{label: { fieldName: response.getReturnValue().ListHeaderLabel[i]}}});
                    }else{
                        columns.push({label: response.getReturnValue().ListHeaderLabel[i], fieldName: response.getReturnValue().fieldNameOrPath[i] , type: 'text', sortable: true});
                    }
                }

                cmp.set('v.mycolumns',columns);


            } else if (state === "ERROR") {
                var errors = response.getError();
                console.error(errors);
            }
        }));
        $A.enqueueAction(action);
    },
    sortData: function (cmp, fieldName, sortDirection) {
            var data = cmp.get("v.Result");
            var reverse = sortDirection !== 'asc';
            if (fieldName == 'Name1') {
                data.sort(this.sortBy('Name', reverse))
            } else {
    	        data.sort(this.sortBy(fieldName, reverse));
            }
            cmp.set("v.Result", data);
    },
    sortBy: function (field, reverse, primer) {
        var key = primer ?
        function(x) {return primer(x.hasOwnProperty(field) ? (typeof x[field] === 'string' ? x[field].toLowerCase() : x[field]) : 'aaa')} :
        function(x) {return x.hasOwnProperty(field) ? (typeof x[field] === 'string' ? x[field].toLowerCase() : x[field]) : 'aaa'};
        reverse = !reverse ? 1 : -1;
        return function (a, b) {
            // return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
            window.console.log(a);
            window.console.log(b);
            window.console.log(key(a));
            window.console.log(key(b));
            return a = key(a)?key(a):'', b = key(b)?key(b):'', reverse * ((a > b) - (b > a));
        }
    }
})