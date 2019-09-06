public class VFPageController {
    public String test0 {get;set;}
    public String test1 {get;set;}
    public String test2 {get;set;}
    public List<Account> accList {get;set;}
    public VFPageController(){
        accList=[SELECT ID, NAME FROM Account];
    }
    public void check(){
        System.debug('Test : '+test0+','+test1+','+test2);
    }
}