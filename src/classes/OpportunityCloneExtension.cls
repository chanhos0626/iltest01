public with sharing class OpportunityCloneExtension {
	public RecordType oprt {get;set;}
	public Opportunity oppty {get;set;}
	public List<OpportunityContactRole> opptyCtRoleList {get;set;}
	public Opportunity newOppty {get;set;}


    public OpportunityCloneExtension(ApexPages.StandardController stdCon) {
		oppty = (Opportunity)stdCon.getRecord();

		if (oppty.Id != null) {
			oppty = [SELECT Id
							, Name
							, Type
							, Amount
							, AccountId
							, StageName
							, CloseDate
							, oppty_service_category1__c
						FROM 
							Opportunity 
						WHERE 
							Id = :oppty.Id];
//, CurrencyIsoCode
			opptyCtRoleList = [SELECT Id
									, ContactId
									, OpportunityId
									, Role
								FROM
									OpportunityContactRole 
								WHERE 
									OpportunityId = :oppty.Id];
		}
	}

	public PageReference cloneOpportunity() {
		try {
			newOppty = new Opportunity();

			newOppty.Name = oppty.Name;
			newOppty.Type = oppty.Type;
			newOppty.Amount = oppty.Amount;
			newOppty.AccountId = oppty.AccountId;
			newOppty.oppty_service_category1__c = oppty.oppty_service_category1__c;
			if (oppty.oppty_service_category1__c == 'Express') {
				newOppty.StageName = 'Propose';
			} else {
				newOppty.StageName = 'Define';
			}
			newOppty.CloseDate = oppty.CloseDate;

			insert newOppty;

			if (opptyCtRoleList.size() > 0) {
				List<OpportunityContactRole> cloneContactRole = new List<OpportunityContactRole>();
				for (OpportunityContactRole opptyCtRole : opptyCtRoleList) {
					OpportunityContactRole opcr = new OpportunityContactRole();

					opcr.ContactId = opptyCtRole.ContactId;
					opcr.Role = opptyCtRole.Role;
					opcr.OpportunityId = newOppty.Id;
					cloneContactRole.add(opcr);
				}

				insert cloneContactRole;
			}
		} catch (Exception e) {
			System.debug(e.getMessage());
			oppty.addError(e.getMessage());
		}

		PageReference pref = new PageReference('/' + newOppty.Id + '/e?retURL=' + newOppty.Id);
		pref.setRedirect(true);
		return pref;
	}
}