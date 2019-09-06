trigger CargoBeforeTrigger on CustomObject1__c (Before Update) {
    if(Trigger.isUpdate){
        List<CustomObject1__c> CO1 = [SELECT Field1__c,Field2__c,Field3__c,Id,IsDeleted,Name,OwnerId,s__c FROM CustomObject1__c];
        for(CustomObject1__c ch1 : CO1){
            if(ch1.Field2__c == '창고1'){
                
            }
            if(ch1.Field2__c == '창고2'){
                
            }
            if(ch1.Field2__c == '창고3'){
                
            }
        }
    }
}