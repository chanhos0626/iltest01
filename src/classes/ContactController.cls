public with sharing class ContactController {
    @AuraEnabled
    public static Map<String,List<Object>> getContactListId(String ObjectName,String ListViewLabelId) {
        Map<String,List<Object>> TotalResult = new Map<String,List<Object>>();
        //필더 목록 조회
        TotalResult.put('FilterList',getFilterList(ObjectName));
        //List<sObject> RestAPIList = getRestAPI(ObjectName,ListViewLabelId);

        //TotalResult.put('DataList',getRestAPI(ObjectName,ListViewLabelId));
        Map<String, Object> test = getRestAPI(ObjectName,ListViewLabelId);
        String querys = (String)test.get('query');
        List<Object> ObjectDataList = Database.query(querys);
        TotalResult.put('DataList',ObjectDataList);

        List<Object> reqs = (List<Object>)test.get('columns');
        List<Object> Listlabel = new List<Object>();
        List<Object> fieldNameOrPath = new List<Object>();
        for(Object a:reqs){
            Map<String,Object> test1 = (Map<String,Object>)a;
            System.debug(test1.get('label'));
            System.debug(test1.get('fieldNameOrPath'));
            System.debug(test1.get('hidden'));
            if(test1.get('hidden') == false){
                System.debug((String)test1.get('label'));
                Listlabel.add(test1.get('label'));
                fieldNameOrPath.add((String)test1.get('fieldNameOrPath'));
            }
        }
        System.debug(Listlabel);
        TotalResult.put('ListHeaderLabel',Listlabel);
        TotalResult.put('fieldNameOrPath',fieldNameOrPath);

        return TotalResult;
    }
    @AuraEnabled
    public static Map<String,List<Object>> getSearchList(String ObjectName,String FilterSearch,String FilterText) {
        Map<String,List<Object>> TotalResult = new Map<String,List<Object>>();
        //'SELECT Name, Account.Name, Title, Phone, Email, Owner.Alias, Id, CreatedDate, LastModifiedDate, SystemModstamp, Account.Id, AccountId, Owner.Id, OwnerId FROM Contact USING SCOPE mine ORDER BY Name ASC NULLS FIRST, Id ASC NULLS FIRST'
        String Querys ='SELECT Name, Account.Name, Title, Phone, Email, Owner.Alias, Id, CreatedDate, LastModifiedDate, '
                +'SystemModstamp, Account.Id, AccountId, Owner.Id, OwnerId FROM '+ObjectName+' USING SCOPE mine '
                +' WHERE '+FilterSearch+' LIKE \''+FilterText+'' + '\' ORDER BY Name ASC NULLS FIRST, Id ASC NULLS FIRST';
        System.debug(Querys);
        List<Object> ListResult = Database.query(Querys);
        TotalResult.put('DataList',ListResult);
        return TotalResult;
    }

    @AuraEnabled
    public static List<Object> getFilterList(String ObjectNames) {
        List<Object> FilterList = [SELECT Id,DeveloperName,Name FROM ListView WHERE SObjectType = :ObjectNames];
        return FilterList;
    }

    @AuraEnabled
    public static Map<String, Object> getRestAPI(String ObjectName,String ListViewLabelId) {
        //Rest API와 연동
        HTTP http=new HTTP();
        HTTPRequest hres=new HTTPRequest();
        String url = '/services/data/v43.0/sobjects/'+ObjectName+'/listviews/'+ListViewLabelId+'/describe';
        hres.setEndpoint('callout:RestTestCredentials'+url);
        hres.setMethod('GET');
        hres.setHeader('Authorization','Bearer {!$Credential.OAuthToken}');//Magic happens here
        HttpResponse response=http.send(hres);
        Map<String, Object> test = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
        return test;
    }
}