trigger TriggerTestBeforeTrigger on TriggerTest__c (before insert, before update,before delete) {
	if(Label.Trigger_Switch == 'ON'){
		if (Trigger.isBefore) {
			List<TriggerTest__c> vtList = new List<TriggerTest__c>();
			if(Trigger.isinsert){
				for(TriggerTest__c T1 : Trigger.New){
					System.debug('Insert 값이 찍혀요!!! '+T1.Name);
				}
			}
			if(Trigger.isUndelete){
				for(TriggerTest__c T1 : Trigger.new){
					if(T1.Name ==Trigger.oldMap.get(T1.Id).Name){
						System.debug('Update 값이 찍혀요!!! '+T1.Name);
					}
				}
			}			
		}
	}	
}