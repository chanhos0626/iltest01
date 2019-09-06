public with sharing class AccountListExtension {

    public Account acct{get;set;}
    
    public AccountListExtension(ApexPages.StandardController stdController) {
        this.acct = (Account)stdController.getRecord();
    }
}