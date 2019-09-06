global class IF_Test_Base_Schedule implements Schedulable {
   global void execute(SchedulableContext sc) {
       //test();
       test2();
   }
    public void test(){
		//System.debug('ch');        
		IF_Test_Base b = new IF_Test_Base(); 
      	System.debug('ch');
        System.debug('query 1: '+b.Query);
      	database.executebatch(b); 
    }
    public void test2(){
        IF_Test_Base b = new IF_Test_Base();
        System.debug('ch');
        //b.tests();
        database.executebatch(b);
    }
}