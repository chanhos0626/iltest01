/*
    @file                     : Web_service_TC_Controller.cls
    @path			          : Web_Service_TC
    @description              : Web Service를 이용하여 데이터 출력
    @author                   : DKMBC - chanho.choi
    @Additional modifiers     : DKMBC - chanho choi
    @Additional revision date : 2019-01-24
*/
public class Web_service_TC_Controller {
    @AuraEnabled
    public static Object  getCalloutResponseContents(String url, String recordId) {
        // Session Id 값을 가져옴
        String sessionId = fetchUserSessionId();
        // Http 통신에 이용
        // 관련 Url : https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_restful_http_http.htm#apex_classes_restful_http_http
        HTTP h = new HTTP();
        // http 요청시 사용
        // 관련 Url : https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_restful_http_httprequest.htm
        HTTPRequest req = new HTTPRequest();
        // 요청한 결과를 리턴 받을때 사용
        // 관련 Url : https://developer.salesforce.com/docs/atlas.en-us.apexcode.meta/apexcode/apex_classes_restful_http_httpresponse.htm#apex_classes_restful_http_httpresponse
        HttpResponse resp = new HttpResponse();
        // HTTP 의 GET메소드를 지정
        req.setMethod('GET');
        // HEADER 설정 - 해당 HEADER에 sessionId를 담아야함
        req.setHeader('Authorization', 'Bearer ' + sessionId);
        // Endpoint 지정
        req.setEndpoint(url+recordId);
        // HTTP 통신에 REQ 정보를 담아서 전달
        // 결과를 리턴받아 담음
        resp = h.send(req);
        // 결과를 리턴함
        return resp.getBody();
    }
    // visualforce page를 이용하여 session을 가져옴
    public static String fetchUserSessionId(){
        String sessionId = '';
        // visualforce page 호출
        PageReference reportPage = Page.GetSessionIdVF;
        // 호출한 visualforce page의 내용을 호출
        String vfContent = reportPage.getContent().toString();
        // Visualforce page의 내용중 'Start_Of_Session_Id'라는 텍스트의 위치와 'Start_Of_Session_Id'의 텍스트 길이를 합산하여 저장
        Integer startP = vfContent.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
        // Visualforce page의 내용중 'End_Of_Session_Id'라는 텍스트의 위치를 저장
                endP = vfContent.indexOf('End_Of_Session_Id');
        // 합산 및 위치를 이용하여 Session 값 추출
        sessionId = vfContent.substring(startP, endP);
        // Return Session Id
        return sessionId;
    }
}