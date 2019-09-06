global class LightningCheckClass {
	@AuraEnabled
	public static List<sObject> getCustomObject() { 
		List<sObject> test = [Select Name,test_test__c,Start_Date__c,End_Date__c,link__c,Key__c,Phone_Number__c,Email__c,Url__c From vail_test__c ORDER BY Name DESC limit 10];
		System.debug('test : '+test);
		return test;
	}
    
	@AuraEnabled
	public static List<vail_test__c> setCustomObject(String TestString) { 
		
		List<vail_test__c> testp = (List<vail_test__c>)JSON.deserialize(TestString, List<vail_test__c>.class);
		upsert testp;

		List<vail_test__c> test = [Select Name,test_test__c,Start_Date__c,End_Date__c,link__c,Key__c,Phone_Number__c,Email__c,Url__c From vail_test__c ORDER BY Name DESC limit 10];
		System.debug('test1 : '+test);
		return test;
	}
    
    @AuraEnabled
    public static List<vail_test__c> SearchTexts(String searchKey,String entersearch) {
        String query = 'Select Name,test_test__c,Start_Date__c,End_Date__c,link__c,Key__c,Phone_Number__c,Email__c,Url__c From vail_test__c WHERE '+searchKey+'=\''+entersearch+'\'';
        List<vail_test__c> test = Database.query(query);
        return test;
    }
}