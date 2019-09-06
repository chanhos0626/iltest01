@isTest(SeeAllData=true)
public class IF_Test_Base_Schedule_Test {
    static testmethod void test() {
        Test.startTest();
        String CRON_EXP = '0 0 0 3 9 ? 2022';

        String jobId = System.schedule('test01',CRON_EXP,new IF_Test_Base_Schedule());
        CronTrigger ct = [SELECT Id, CronExpression, TimesTriggered,NextFireTime FROM CronTrigger WHERE id = :jobId];
        IF_Test_Base_Schedule IFtest = new IF_Test_Base_Schedule();
        IF_Test_Base IFBases = new IF_Test_Base();
        //IFBases.Query = 'SELECT Id,Name FROM Account';
        //IFBases.Query = 'SELECT Id,Name FROM Account';
        //System.debug('IFBases.query : '+IFBases.query);
        IFBases.tests2('SELECT Id,Name FROM Account limit 2');
        IFtest.execute(null);
        Test.stopTest();

    }
}