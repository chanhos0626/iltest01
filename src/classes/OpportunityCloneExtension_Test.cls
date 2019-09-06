@isTest
public class OpportunityCloneExtension_Test {
    public static Date D1;
    public static Account ac1;
    public static Contact C1;
    public static Opportunity Opp1;
    public static Opportunity Opp2;
    public static OpportunityContactRole OppC1;
    
    static {
        D1 = Date.newInstance(2017,12,22);
        ac1 = new Account(Name='Acheck1',Phone='021112222');
        insert ac1;
        C1 = new Contact(FirstName='Mani',LastName='Test',Phone='01034478007',AccountId=ac1.Id);
        insert C1;
        Opp1 = new Opportunity(Name='United Oil Office Portable Generators1',oppty_service_category1__c = 'Express',StageName='Propose', CloseDate=D1, AccountId = ac1.Id);
        insert Opp1;
        Opp2 = new Opportunity(Name='United Oil Office Portable Generators2',oppty_service_category1__c = 'Express1',StageName='Define', CloseDate=D1, AccountId = ac1.Id);
        insert Opp2;
        OppC1 = new OpportunityContactRole(ContactId=C1.Id, OpportunityId=Opp1.Id);
        insert OppC1;
    }
    @isTest
    static void OpportunityCloneExtension_Test()
    {
        PageReference pref = Page.AccountList;
        ApexPages.StandardController std = new ApexPages.StandardController(Opp1);
        ApexPages.StandardController std2 = new ApexPages.StandardController(Opp2);
        Test.setCurrentPageReference(pref);

        OpportunityCloneExtension apc = new OpportunityCloneExtension(std);
        apc.cloneOpportunity();
        OpportunityCloneExtension apc2 = new OpportunityCloneExtension(std2);
        apc2.cloneOpportunity();

    }
}