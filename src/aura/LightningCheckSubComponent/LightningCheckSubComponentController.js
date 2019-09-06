({
    handleComponentEvent : function(cmp, event) {
        //이벤트 발생시 class 확인하여 추가/제거
        var cmpTarget = cmp.find('modaltest');
        window.console.log(cmpTarget);
        $A.util.toggleClass(cmpTarget, 'slds-hide');
        //event의 ID 값 가져옴
        var VeliId = event.getParam("VeliId");
        //선언된 Attribute에 값 추가
        cmp.set("v.VeliId", VeliId);
        //현제 뜬 화면에 이벤트 방지
        //27은 Esc 키 이벤트 방지
        //13은 Enter 키 이벤트방지
        //textarea에서 키 이벤트 발생 방지
        window.addEventListener('keydown', function(ev){
            if(ev.keyCode === 27){
                ev.preventDefault();
                ev.stopImmediatePropagation();
            } else if(ev.keyCode === 13){
                if(ev.target.toString().toLowerCase().indexOf('textarea') == -1){
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                }
            }
        }, true);
    },
    hideModal : function(cmp, event) {
        //Cancle 및 x 표시 화면 닫기
        var cmpTarget = cmp.find('modaltest');
        $A.util.toggleClass(cmpTarget, 'slds-hide'); 
    },
    handlesubmit : function(component, event, helper) {     
        // submit 버튼 클릭시 화면 닫기
        // type이 submit으로 되어있어 저장과 화면 닫는 이벤트 발생   
        var cmpTarget = component.find('modaltest');
        $A.util.toggleClass(cmpTarget, 'slds-hide');
    }
})