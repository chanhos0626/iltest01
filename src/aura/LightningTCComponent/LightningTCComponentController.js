({
    init: function (cmp, event, helper) {
        //columns 구성
        cmp.set('v.columns', [
            {
                label:'vail test Number',
                fieldName:'Name',
                type: 'text',
                editable: true,
                typeAttributes: { required: true }
            },
            {
                label: 'test test',
                fieldName: 'test_test__c',
                type: 'Text',
                editable: true
            },
            {
                label: "Start date",
                fieldName: "Start_Date__c",
                type: "date-local",
                editable: true,
                typeAttributes:{
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }
            },
            {
                label: "End date",
                fieldName: "End_Date__c",
                type: "date-local",
                editable: true,
                typeAttributes:{
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }
            },
            {
                label: 'link',
                fieldName: 'link__c',
                type: 'text'
            },
            {
                label: 'Key',
                fieldName: 'Key__c',
                type: 'text'
            },
            {
                label: 'Phone',
                fieldName: 'Phone_Number__c',
                type: 'phone',
                editable: true
            },
            {
                label: 'Email',
                fieldName: 'Email__c',
                type: 'email',
                editable: true
            },
            {
                label: 'url',
                fieldName: 'Url__c',
                type: 'url',
                typeAttributes: { target: '_parent' },
                editable: true
            }
        ]);
        //helper에 있는 select를 사용
        helper.select(cmp,event);
    },
    handleSaveEdition: function (cmp, event, helper) {
        //inline edit의 저장에 사용
        var draftValues = event.getParam('draftValues');
        helper.saveEdition(cmp, event, draftValues);
    },
    handleKeyUp : function (cmp, evt, helper){
        //검색 관련 기능 처리
        var isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            var selectKey = 'test_test__c';
            var entersearch = cmp.find('enter-search').get('v.value');
            helper.searchResult(cmp, evt,selectKey,entersearch);
        }
    },
    handleSearch : function (cmp, evt, helper){
        var selectKey = 'test_test__c';
        var entersearch = cmp.find('enter-search').get('v.value');
        helper.searchResult(cmp, evt,selectKey,entersearch);
    }
})