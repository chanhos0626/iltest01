global class IF_Test_Base implements Database.Batchable<sObject>{
    public String Query {get;set;}
    global void tests(){
        Query = 'SELECT Id,Name FROM Account';
    }
    global void tests2(String querys){
        Query = querys;
    }
    global Database.QueryLocator start(Database.BatchableContext BC){
        System.debug('check!!!!01');
        System.debug('query2 : '+Query);
        System.debug('BC : '+BC);
        return Database.getQueryLocator(Query);
    }
    global void execute(Database.BatchableContext BC, List<sObject> scope){
        /*for(sobject s : scope){
            s.put(Field,Value); 
        }
        update scope;*/
        System.debug('check!!!!02');
    }
    global void finish(Database.BatchableContext BC){
        System.debug('check!!!!03');
    }
}