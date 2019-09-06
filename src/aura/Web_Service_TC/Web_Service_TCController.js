/*
    @file                     : Web_Service_TCController
    @path			          : Web_Service_TC > Web_Service_TCController
    @description              : Web Service를 이용하여 데이터 출력
    @author                   : DKMBC - chanho.choi
    @Additional modifiers     : DKMBC - chanho choi
    @Additional revision date : 2019-01-24
*/
({
    init: function (cmp, event, helper) {
    },
    //helper로 값전달
    getSearchWebServices: function (cmp, event, helper) {
        helper.WebServices(cmp, event);
    }

})