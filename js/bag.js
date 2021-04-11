/**
 *
 * 장바구니를 동적으로 관리하는 기능입니다.
 *
 */

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
                    //아이템 id가 같다면 장바구니에서 제거합니다.
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


/**
 * @author "최제현"
 * @date 2021/04/11
 * 장바구니에서 갯수를 입력한 물건들을 주문 신청합니다.
 */
function bagOrder() {

    let choosedItemList = new Array();
    const currentUser = getCookie("currentUser");
    const storageName = currentUser + "userBuyItemList" ;
    let errorNo = false;
    for(let i = 1; i < 99; i++){

        //선택한 물건이 없을때의 예외처리
        try{
            const selectedItem = document.getElementById("p_num"+i);
            const itemNo = selectedItem.getAttribute("ItemNo");
            const itemNum = selectedItem.getAttribute("value");
        }catch (e) {
            continue;
        }


        //선택한 물건이 있는경우
        const selectedItem = document.getElementById("p_num"+i);
        const itemNo = selectedItem.getAttribute("ItemNo");
        const itemNum = selectedItem.getAttribute("value");
        //선택한 물건의 갯수가 0 이 아닌경우, 가격, 총갯수, 아이템 정보를 저장합니다.
        if(!(itemNum >= 0)){
            alert('유효하지 않는 값입니다.');
            // localStorage.removeItem(storageName);
            errorNo = true;
            window.location.href = "mybag.html";
            break;
        }

        if(itemNum == 0) continue;

        const totalMoney = document.getElementById("totalMoney"+(i+1)).innerText;
        const sumPrice = document.getElementById("sum_p_price").innerText;
        const totalnumber = document.getElementById("sum_p_num").innerText;
        let itemJson = {itemNo : itemNo, itemNum : itemNum, itemPrice : totalMoney};
        choosedItemList.push(itemJson);
        const newJson = JSON.stringify({items : choosedItemList, totalmoney : sumPrice, totalnumber : totalnumber});
        localStorage.setItem(storageName, newJson);

    }

    if(!errorNo){
        alert('주문이 완료되었습니다.');
        window.location.href = 'myorder.html';
    }



}
