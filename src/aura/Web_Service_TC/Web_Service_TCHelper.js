/*
    @file                     : Web_Service_TCHelper
    @path			          : Web_Service_TC > Web_Service_TCHelper
    @description              : Web Service를 이용하여 데이터 출력
    @author                   : DKMBC - chanho.choi
    @Additional modifiers     : DKMBC - chanho choi
    @Additional revision date : 2019-01-24
*/
({
    // 전달받은 값으로 apex에 값을 넘기고 결과를 받음
    WebServices : function (cmp, event) {
        // component를 찾음(aura:id 선언된것)
        var recordIds = cmp.find('recordIds');
        // apex class의 method 지정
        var action = cmp.get('{!c.getCalloutResponseContents}');
        // 값 전달
        action.setParams({ url : 'https://chikpale-dev-ed.my.salesforce.com/services/apexrest/AccountTCList/', recordId : recordIds.get('v.value')});
        // 리턴 값 확인
        action.setCallback(this, function(response){
            // 리턴 결과 확인
            var state = response.getState();
            // 값리턴 완료
            if( (state === 'SUCCESS' || state ==='DRAFT') && cmp.isValid()){
                //attribute에 리턴받은 데이터를 json형태로 가공하여 전달
                cmp.set('v.data',JSON.parse(response.getReturnValue()));
            //에러 처리
            } else if( state === 'INCOMPLETE'){
                console.log("User is offline, device doesn't support drafts.");
            } else if( state === 'ERROR'){
                console.log('Problem saving record, error: ' + JSON.stringify(response.getError()));
            } else{
                console.log('Unknown problem, state: ' + state + ', error: ' + JSON.stringify(response.getError()));
            }
        });
        // action 진행 - 이부분을 작성하지않으면 진행되지 않음
        $A.enqueueAction(action);
    }
})