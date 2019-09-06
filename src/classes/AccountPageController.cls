public with sharing class AccountPageController {
	public string str {get;set;}
    public List<Account> acList {get;set;}
	public AccountPageController() {
		str = 'Hello worldss!!!!';
        acList = [SELECT Id,Name,Phone FROM Account limit 5];
	}
    public void refreshAccount(){
        acList = [SELECT Id,Name,Phone FROM Account limit 1];
    }
}