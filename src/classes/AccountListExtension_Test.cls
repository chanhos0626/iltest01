@isTest
public class AccountListExtension_Test {
    public static Account ac1;
    public static Account ac2;
    public static Account ac3;
    
    static {
        ac1 = new Account(Name='check1',Phone='01034478007');
        insert ac1;
    }
    @isTest
    static void itShould()
    {
        PageReference pref = Page.AccountList;
        ApexPages.StandardController std = new ApexPages.StandardController(ac1);
        Test.setCurrentPageReference(pref);
        //Test.startTest();
        //Test.stopTest();
        AccountListExtension apc = new AccountListExtension(std);

    }
}