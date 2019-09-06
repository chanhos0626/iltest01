({
	init : function(component, event, helper) {
        component.set('v.Test',[
            {Name:'check',AccountId:'0017F00000AAd0MQAT',Id:'0037F00000CbtNUQAZ',
             Department:'Finance',Title:'CFO',Contact_Level__c:'0',
             ReportsToId:'',dp_order__c:'0',Retired__c:'false',My_Step__c:'' },
            {Name:'check2',AccountId:'0017F00000AAd0MQAQ',Id:'0037F00000CbtNUQAY',
             Department:'Finance',Title:'CFO',Contact_Level__c:'1',
             ReportsToId:'0037F00000CbtNUQAZ',dp_order__c:'1',Retired__c:'false',
             My_Step__c:'0037F00000CbtNUQAZ^'},
            {Name:'check3',AccountId:'0017F00000AAd0MQAC',Id:'0037F00000CbtNUQAS',
             Department:'Finance',Title:'CFO',Contact_Level__c:'2',
             ReportsToId:'0037F00000CbtNUQAY',dp_order__c:'2',Retired__c:'false',
             My_Step__c:'0037F00000CbtNUQAZ^0037F00000CbtNUQAY^'}
        ]);
        var Ids = localStorage.getItem('Id');
        //console.log(Ids);
	},
    depth : function(component, event, helper) {
        var target = event.target;
        var Id = target.parentElement.dataset.id;
        var accountId = target.parentElement.dataset.accountId;
        var parentId = target.parentElement.dataset.parentId;
		var parent = $('tr[data-My-Step-id*="'+Id+'"]');
        if(parent[0].style.display != "none"){
            for(var i=0;i<parent.length;i++){
                parent[i].style.display="none";
                localStorage.setItem('Id',parent[i].dataset.parentId);
                localStorage.setItem('hidden','none');
                $('div[id="'+Id+'"]').addClass('spin');
            }
        }else{
            parent[0].style.display=""
            localStorage.removeItem('Id');
            localStorage.removeItem('hidden');
            $('div[id="'+Id+'"]').removeClass('spin');
        }
	}    
})