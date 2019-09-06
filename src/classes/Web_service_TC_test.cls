/**
 * Created by DKBMC on 2019-01-22.
 */

@IsTest
private class Web_service_TC_test {
    @isTest
    static void getAccountId() {
        Id recordId = createTestRecord();
// Set up a test request
        RestRequest request = new RestRequest();
        request.requestUri =
                'https://chikpale-dev-ed.my.salesforce.com/services/apexrest/AccountTCList/'
                        + recordId;
        request.httpMethod = 'GET';
        RestContext.request = request;
// Call the method to test
        Object thisAccount = Web_service_TC.getAccountId();
// Verify results
        System.debug(thisAccount);
        //System.debug('Test record'+thisAccount.Name);
    }// Helper method
    static Id createTestRecord() {
        // Create test record
        Account AccountTest = new Account(
                Name='Test record',
                Description='New'
                );
        insert AccountTest;
        return AccountTest.Id;
    }
}