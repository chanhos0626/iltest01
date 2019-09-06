@isTest
private class AccountPageController_Test
{
    public static Account ac1;
    public static Account ac2;
    public static Account ac3;
    
    static {
        ac1 = new Account(Name='check1',Phone='01034478007');
        ac2 = new Account(Name='check2',Phone='01034488007');
        ac3 = new Account(Name='check3',Phone='01034498007');
        insert ac1;
        insert ac2;
        insert ac3;
    }
	@isTest
	static void itShould()
	{
        List<Account> acList = [SELECT Id FROM Account];
        System.debug('size : '+acList.size());
        PageReference pref = Page.AccountPage;
        Test.setCurrentPageReference(pref);
        //Test.startTest();
        //Test.stopTest();
        AccountPageController apc = new AccountPageController();
        apc.refreshAccount();
	}
}