({
    select:function(cmp,event){
        //조회에 사용
        var action = cmp.get("{!c.getCustomObject}");
        action.setCallback(this, function(a){
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                cmp.set('v.data',rtnValue);
            }
        });
        $A.enqueueAction(action);
    },
    saveEdition: function (cmp, event, draftValues) {
        //inline의 저장에 사용
        var draftValuesLength=0,
            ListValue=cmp.get('v.data'),
            datatags=[],
            idStrings='',
            draftValuesStrings='';
        //row 값 추출하여 string으로 형변환
        if(draftValues != null){
            draftValuesLength = draftValues.length;
            for(var i=0; i<draftValuesLength; i++){
                datatags.push(draftValues[i].id);
                idStrings=draftValues[i].id
                draftValues[i].id = ListValue[idStrings[4]].Id;
            }
            draftValuesStrings = JSON.stringify(draftValues,false,false);
        }
        //형 변환된 값이 class로 전달됨

        var action = cmp.get("{!c.setCustomObject}");
        action.setParams({ 'TestString' : draftValuesStrings });
        action.setCallback(this,function(b){            
            cmp.set('v.data','');
            var rtnValue = b.getReturnValue();
            if (rtnValue !== null) {
                cmp.set('v.data',rtnValue);
                $A.get('e.force:refreshView').fire();
            }
        });
        $A.enqueueAction(action);
    },
    showRowDetails: function (cmp,row) {
        //버튼클릭시 attribute에 값 전달
        cmp.set('v.TestRecordId',row.Id);
        cmp.set('v.TestRecordId2',row.Id);
        cmp.set('v.TestRecordName',row.Name);
    },
    searchResult:function(cmp,event,searchKey,entersearch){
        //검색과 관련된 값을 class에 전달
        var action = cmp.get("{!c.SearchTexts}");
        action.setParams({ 'searchKey' : searchKey, 'entersearch' : entersearch });
        action.setCallback(this, function(a){
            var rtnValue = a.getReturnValue();
            if (rtnValue !== null) {
                cmp.set('v.data',rtnValue);
            }
        });
        $A.enqueueAction(action);
    },
    fireComponentEvent : function(cmp, event,TestRecordId2) {  
        //event에 값전달
        var cmpEvent = $A.get("e.c:LightningCheckEvent");
            cmpEvent.setParams({
               "VeliId": TestRecordId2});
            cmpEvent.fire();
    },
    
})