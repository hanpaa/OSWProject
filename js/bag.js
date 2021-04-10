let basket = {
    totalCount: 0,
    totalPrice: 0,
    //체크한 장바구니 상품 비우기
    delCheckedItem: function(){
        const checkedList = document.getElementsByName("buy");
        const currentUser = getCookie("currentUser");
        const userItemList = JSON.parse(localStorage.getItem(currentUser+"userItemList"));

        for(let i =0; i < checkedList.length; i++){

            let thisItemid = checkedList[i].value;

            if(checkedList[i].checked == true){
                for(let i =0; i < userItemList.length; i++) {
                    if (userItemList[i].item === thisItemid) {
                        delete userItemList.splice(i, 1);
                    }
                }
            }

        }

        const newJson = JSON.stringify(userItemList);
        localStorage.setItem(currentUser+"userItemList", newJson);

        this.reCalc();
        this.updateUI();

        window.location.href = 'mybag.html';
        //AJAX 서버 업데이트 전송

    },
    //장바구니 전체 비우기
    delAllItem: function(){

        window.location.href = 'mybag.html';

        this.reCalc();
        this.updateUI();

    },
    //재계산
    reCalc: function(){
        this.totalCount = 0;
        this.totalPrice = 0;
        document.querySelectorAll(".p_num").forEach(function (item) {
            var count = parseInt(item.getAttribute('value'));
            this.totalCount += count;
            var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
            this.totalPrice += count * price;
        }, this); // forEach 2번째 파라메터로 객체를 넘겨서 this 가 객체리터럴을 가리키도록 함. - thisArg
    },
    //화면 업데이트
    updateUI: function () {
        document.querySelector('#sum_p_num').textContent = '상품갯수: ' + this.totalCount.formatNumber() + '개';
        document.querySelector('#sum_p_price').textContent = '합계금액: ' + this.totalPrice.formatNumber() + '원';
    },
    //개별 수량 변경
    changePNum: function (pos) {
        var item = document.querySelector('input[name=p_num'+pos+']');
        var p_num = parseInt(item.getAttribute('value'));
        var newval = event.target.classList.contains('up') ? p_num+1 : event.target.classList.contains('down') ? p_num-1 : event.target.value;

        if (parseInt(newval) < 1 || parseInt(newval) > 99) { return false; }

        item.setAttribute('value', newval);
        item.value = newval;

        var price = item.parentElement.parentElement.previousElementSibling.firstElementChild.getAttribute('value');
        item.parentElement.parentElement.nextElementSibling.textContent = (newval * price).formatNumber()+"원";
        //AJAX 업데이트 전송

        //전송 처리 결과가 성공이면
        this.reCalc();
        this.updateUI();
    },
    delItem: function (thisItemid) {

        const currentUser = getCookie("currentUser").toString();
        const userItemList = JSON.parse(localStorage.getItem(currentUser+"userItemList"));

        for(let i =0; i < userItemList.length; i++){
            if(userItemList[i].item === thisItemid){
                delete userItemList.splice(i, 1);
            }
        }

        const newJson = JSON.stringify(userItemList);
        localStorage.setItem(currentUser+"userItemList", newJson);
        window.location.href = 'mybag.html';


    }
}

// 숫자 3자리 콤마찍기
Number.prototype.formatNumber = function(){
    if(this==0) return 0;
    let regex = /(^[+-]?\d+)(\d{3})/;
    let nstr = (this + '');
    while (regex.test(nstr)) nstr = nstr.replace(regex, '$1' + ',' + '$2');
    return nstr;
};

function bagOrder() {

    let choosedItemList = new Array();
    const currentUser = getCookie("currentUser");
    const storageName = currentUser + "userBuyItemList" ;

    // let itemJson = {};

    // //default 갯수는 1개입니다.

    for(let i = 1; i < 99; i++){

        try{
            const selectedItem = document.getElementById("p_num"+i);
            const itemNo = selectedItem.getAttribute("ItemNo");
            const itemNum = selectedItem.getAttribute("value");
        }catch (e) {
            continue;
        }
        const selectedItem = document.getElementById("p_num"+i);
        const itemNo = selectedItem.getAttribute("ItemNo");
        const itemNum = selectedItem.getAttribute("value");
        if(itemNum == 0) continue;
        const sumPrice = document.getElementById("sum_p_price").innerText;
        const totalnumber = document.getElementById("sum_p_num").innerText;
        let itemJson = {itemNo : itemNo, itemNum : itemNum};
        choosedItemList.push(itemJson);
        const newJson = JSON.stringify({items : choosedItemList, totalmoney : sumPrice, totalnumber : totalnumber});
        localStorage.setItem(storageName, newJson);

    }



}
