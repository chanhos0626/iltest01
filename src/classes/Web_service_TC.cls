/*
    @file                     : Web_service_TC.cls
    @path			          : Web_Service_TC
    @description              : Web Service를 이용하여 데이터 출력
    @author                   : DKMBC - chanho.choi
    @Additional modifiers     : DKMBC - chanho choi
    @Additional revision date : 2019-01-24
*/
// mapping 할 url 지정
// 전역번수(global)로 지정해야함
// 관련 url : https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_rest_resource.htm
@RestResource(urlMapping='/AccountTCList/*')
global with sharing class Web_service_TC {
    // method 가 get 형식일때 진행
    // 관련 url : https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_annotation_http_get.htm
    @HttpGet
    global static Account getAccountId() {
        // RESTful 웹서비스 메서드로 데이터를 전달하는 데 사용합니다.
        // 관련 url : https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_restrequest.htm
        // RestContext는 Rest 웹서비스에서 전달받은 데이터를 가져옵니다.
        // 관련 url : https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_methods_system_restcontext.htm#apex_methods_system_restcontext
        RestRequest request = RestContext.request;
        // 전달받은 url 중 '/'의 위치 이후의 문자열 추출
        String AccountId = request.requestURI.substring(request.requestURI.lastIndexOf('/')+1);
        // 추출한 문자열을 이용하여 조회
        Account accresult = Database.query('SELECT ID,NAME,OWNER.Name,Description FROM Account WHERE Id = \''+AccountId+'\'');
        // 조회된 결과를 리턴
        return accresult;
    }
}