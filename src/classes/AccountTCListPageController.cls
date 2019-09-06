/**
 * Created by DKBMC on 2019-01-17.
 */

public class AccountTCListPageController {
    public List<Account> acct {get;set;}
    /*public AccountTCListPageController(ApexPages.StandardController stdController) {
        this.acct = (Account)stdController.getRecord();
    }
    public String getGreeting() {
        return 'Hello ' + acct.name + ' (' + acct.id + ')';
    }*/
    public AccountTCListPageController() {
        acct = [SELECT Id, Name,Phone,site,OwnerId,Owner.Name FROM Account];
        System.debug()
    }

    public List<Account> SearchResult(String picklistvalue, String textvalue) {
        //acct = [SELECT Id, Name,Phone,site,OwnerId,Owner.Name FROM Account];
        String query = 'SELECT Id, Name,Phone,site,OwnerId,Owner.Name FROM Account WHERE '+picklistvalue+'='+textvalue;
        acct = Database.query(query);
        return null;
    }
    public AccountTCListPageController(ApexPages.StandardSetController controller) {
        System.debug(controller);
    }
    public PageReference GoToAccountTCListPage(){
        PageReference pr = new PageReference('/apex/AccountTCListPage');
        pr.setRedirect(true);
        return pr;
    }
    public PageReference GoToAccountTCListPage02(){
        PageReference pr = new PageReference('/apex/AccountTCListPage02');
        pr.setRedirect(true);
        return pr;
    }
    public PageReference GoToAccountTCListPage03(){
        PageReference pr = new PageReference('/apex/AccountTCListPage03');
        pr.setRedirect(true);
        return pr;
    }
    public PageReference GoToAccountTCListPage04(){
        PageReference pr = new PageReference('/apex/AccountTCListPage04');
        pr.setRedirect(true);
        return pr;
    }
}


