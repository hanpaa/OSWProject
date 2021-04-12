/**
 * @author 최제현
 * @date 2021/04/03
 * @param model
 * @param length
 * @param JSONKey
 * @param condition
 *
 * 각 카테고리별 상품을 자동으로 html출력해주는 함수
 * 04/04 수정 localStorage에 있는 모든 상품 출력에서 카테고리별 출력으로 수정 *
 */
function renderProduct(model, length, JSONKey, condition) {

        for(let i = 0; i<length; i++) {

            try {
                let DB = model.items[i]
            }catch(e){
                alert('잘못된 접근입니다.');
                window.location.href = "index.html";
                return;
            }


           let DB = model.items[i];

            if (DB[JSONKey] == condition) {

                // 렌더링 할 html 오브젝트  생성
                let divBox = document.getElementById("divBox");
                let itemUl = document.createElement("ul");
                let itemInput = document.createElement("input");
                let itemLiImg = document.createElement("li");
                let imgSrc = document.createElement("img");
                let itemLiA = document.createElement("li");
                let itemLiB = document.createElement("li");
                let itemLiC = document.createElement("li");
                let itemAHref = document.createElement("a");

                //각 오브젝트 attribute 수정
                itemUl.setAttribute("class", "best_items");
                itemInput.setAttribute("type", "checkbox");
                itemInput.setAttribute("name", "chooseItem");
                itemInput.setAttribute("value", DB.itemNumber)
                imgSrc.src = "../css/image/" + DB.image1 + ".jpg";
                imgSrc.width = 200;
                imgSrc.height = 270;
                imgSrc.name = DB.itemNumber;
                itemLiA.setAttribute("class", "a");
                itemLiA.setAttribute("name", DB.itemNumber);
                itemLiA.innerText = DB.name;
                itemLiB.setAttribute("class", "b");
                itemLiB.innerText = DB.price + "원";
                itemLiC.setAttribute("class", "c");
                itemAHref.href = "detail_view.html";

                //자식노드로 삽입
                divBox.appendChild(itemUl);
                itemUl.appendChild(itemInput);
                itemLiImg.appendChild(imgSrc);
                itemAHref.appendChild(itemLiImg);
                itemUl.appendChild(itemAHref);
                itemUl.appendChild(itemLiA);
                itemUl.appendChild(itemLiB);
                itemUl.appendChild(itemLiC);



            } else {
                continue;
            }
        }
}


function renderTop() {

    let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
    let length = localItemDB.items.length;

    renderProduct(localItemDB,length, "category", "top")

}

function renderBottom() {

    let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
    let length = localItemDB.items.length;

    renderProduct(localItemDB,length, "category", "bottom")
}

function renderNew() {

    let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
    let length = localItemDB.items.length;

    renderProduct(localItemDB,length, "new", "1")

}


function renderBest() {

    let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
    let length = localItemDB.items.length;

    renderProduct(localItemDB,length, "best", "1")

}

function renderTraining() {

    let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
    let length = localItemDB.items.length;

    renderProduct(localItemDB,length, "category", "training")

}

/**
 * @author 최제현
 * @date 2021/04/04
 * @param value
 *
 * 상세정ㅇ보 페이지 html생성하는 함수.
 */
function renderDetail(value) {

if(getCookie("clickId")===null){
    alert('잘못된 접근입니다.');
    window.location.href = "index.html"
}else{

    let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;

    let productThumb = document.getElementById("productThumb");
    let productText = document.getElementById("productText");
    let productTable = document.getElementById("productTable");
    let productPrice = document.getElementById("productPrice");
    let productImages = document.getElementById("productImages");

    let itemNumber = getCookie("clickId");
    let Item = localItemDB.items[itemNumber];
    let itemName = Item.name;
    let itemPrice = Item.price;
    let itemThumbSrc = Item.image1;
    let itemImageSrc2 = Item.image2;
    let itemImageSrc3 = Item.image3;
    let itemDetail = Item.detail;

    let itemNameH3 = document.createElement("h3");
    itemNameH3.innerText = itemName;
    let itemDetailP = document.createElement("p");
    itemDetailP.innerText = itemDetail;

    productText.appendChild(itemNameH3);
    productText.appendChild(itemDetailP);

    let itemThumb = document.createElement("img");
    itemThumb.src = "../css/image/" + itemThumbSrc + ".jpg";
    itemThumb.width = 500;
    itemThumb.height = 750;
    productThumb.appendChild(itemThumb);

    // let itemPriceTotal = document.createElement("p");
    // itemPriceTotal.innerHTML = "총 상품금액 <span>"+ itemPrice +"</span>원";
    // productPrice.appendChild(itemPriceTotal);


    let itemPriceTd = document.createElement("td");
    itemPriceTd.innerText = itemPrice + "원";
    productTable.appendChild(itemPriceTd);

    let itemImage1 = document.createElement("img");
    itemImage1.src = "../css/image/" + itemThumbSrc + ".jpg";
    itemImage1.width = 500;
    itemImage1.height = 750;

    let itemImage2 = document.createElement("img");
    itemImage2.src = "../css/image/" + itemImageSrc2 + ".jpg";
    itemImage2.width = 500;
    itemImage2.height = 750;

    let itemImage3 = document.createElement("img");
    itemImage3.src = "../css/image/" + itemImageSrc3 + ".jpg";
    itemImage3.width = 500;
    itemImage3.height = 750;

    productImages.appendChild(itemImage1);
    productImages.appendChild(itemImage2);
    productImages.appendChild(itemImage3);


}

}

/**
 * @author 최제현
 * @date 2021/04/05
 *
 * 장바구니 페이지에 html를 생성하는 함수
 * 04/10 수정 형식에 맞추어 html생성
 */
function renderMyBag() {

    //

    try{
        let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
        localItemDB.length;
        let currentUser = getCookie("currentUser");
        let myBagDB = (JSON.parse((localStorage.getItem((currentUser+"userItemList")))));
        myBagDB.length;
    }catch (e) {
        alert('잘못된 접근입니다. 장바구니에 제품들을 추가해주세요.');
        window.location.href="index.html";
    }

    let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
    let currentUser = getCookie("currentUser");
    let myBagDB = (JSON.parse((localStorage.getItem((currentUser+"userItemList")))));
    const divBasketDiv = document.getElementById("basket");

    for(let i = 0; i < myBagDB.length; i++){
        const thisItemNumber = myBagDB[i].item;
        const thisItem = localItemDB.items[thisItemNumber];

        //<div class="row data">
        const divRowData = document.createElement("div");
        divRowData.setAttribute("class", "row data");

        //<div class="subdiv">
        const divSubDiv1 = document.createElement("div");
        divSubDiv1.setAttribute("class", "subdiv")
        divRowData.appendChild(divSubDiv1);

        //<div class="check"><input type="checkbox" name="buy" value="260" checked="">&nbsp;</div>
        const divCheck = document.createElement("div");
        divCheck.setAttribute("class", "check");
        const inputBuy = document.createElement("input");
        inputBuy.type = "checkbox";
        inputBuy.name = "buy";
        inputBuy.setAttribute("value", thisItemNumber);
        inputBuy.checked = "";
        inputBuy.innerHTML = "&nbsp;";
        divCheck.appendChild(inputBuy);
        divSubDiv1.appendChild(divCheck);


         // <div class="img"><img src="./img/basket1.jpg" width="60"></div>
        const divImg = document.createElement("div");
        divImg.setAttribute("class", "img");
        const itemImg = document.createElement("img");
        itemImg.src = "../css/image/" + thisItem.image1 + ".jpg";
        itemImg.height = 60;
        itemImg.width = 40;
        divImg.appendChild(itemImg);
        divSubDiv1.appendChild(divImg);

        //<div class="pname">
        const divPName = document.createElement("div");
        divPName.setAttribute("class", "pname");

        //<span>상품명</span>        const spanItemName = document.createElement("span");
        const spanItemName = document.createElement("span");
        spanItemName.innerText = thisItem.name;
        divPName.appendChild(spanItemName);
        divSubDiv1.appendChild(divPName);

        //<div class="subdiv">
        const divSubDiv2 = document.createElement("div");
        divSubDiv2.setAttribute("class", "subdiv");



        //<div class="basketprice"><input type="hidden" name="p_price" id="p_price1" class="p_price" value="20000">20,000원</div>
        const divBasketPrice = document.createElement("div");
        divBasketPrice.setAttribute("class", "basketprice");
        divBasketPrice.innerText = thisItem.price + "";
        const inputPPrice = document.createElement("input");
        inputPPrice.type = "hidden";
        inputPPrice.name = "p_price";
        inputPPrice.setAttribute("value", thisItem.price.replace(",", ""));
        inputPPrice.setAttribute("id", "p_price" + (i+1));
        inputPPrice.setAttribute("class", "p_price");

        divBasketPrice.appendChild(inputPPrice);
        divSubDiv2.appendChild(divBasketPrice);

        //<div class="num">
        const divNum = document.createElement("div");
        divNum.setAttribute("class", "num");

        //<div class="updown">
        const divUpdown = document.createElement("div");
        divUpdown.setAttribute("class", "updown");

        //<input type="text" name="p_num1" id="p_num1" size="2" maxlength="4" class="p_num" value="2" onkeyup="javascript:basket.changePNum(1);">
        const inputPNum = document.createElement("input");
        inputPNum.type = "text";
        inputPNum.name = "p_num" + (i+1);
        inputPNum.setAttribute("id", "p_num" +(i+1));
        inputPNum.size = 2;
        inputPNum.setAttribute("class", "p_num");
        inputPNum.maxLength = 4;
        inputPNum.setAttribute("value", "0");
        inputPNum.setAttribute("ItemNo", thisItemNumber);
        //숫자를 바꾸었을때 함수 생
        inputPNum.setAttribute("onkeyup", "javascript:basket.changePNum(" + (i+1) + ");");
        divUpdown.appendChild(inputPNum);

        //span onclick
        const spanOnclick1 = document.createElement("span");
        spanOnclick1.setAttribute("onclick", "javascript:basket.changePNum(" + (i+1) + ");");

        const iCircleUp = document.createElement("i");
        iCircleUp.setAttribute("class", "fas fa-arrow-alt-circle-up up");

        spanOnclick1.appendChild(iCircleUp);
        divUpdown.appendChild(spanOnclick1);

        const spanOnclick2 = document.createElement("span");
        spanOnclick2.setAttribute("onclick", "javascript:basket.changePNum(" + (i+1) + ");");

        const iCircleDown = document.createElement("i");
        iCircleDown.setAttribute("class", "fas fa-arrow-alt-circle-down down");

        spanOnclick2.appendChild(iCircleDown);
        divUpdown.appendChild(spanOnclick2);

        const divSum = document.createElement("div");
        divSum.setAttribute("class", "sum");
        divSum.setAttribute("id", "totalMoney"+(i+1));
        divSum.innerText = thisItem.price + "원";

        divNum.appendChild(divUpdown);
        divSubDiv2.appendChild(divNum);
        divSubDiv2.appendChild(divSum);
        divRowData.appendChild(divSubDiv2);

        const divSubDiv3 = document.createElement("div");
        divSubDiv3.setAttribute("class", "subdiv");

        const divBasketCmd = document.createElement("div");
        divBasketCmd.setAttribute("class", "basketcmd");
        const aAbutton = document.createElement("a");
        aAbutton.setAttribute("class", "abutton");
        aAbutton.setAttribute("id", thisItemNumber);
        //아이템 개별 삭제 함수 생성 (args => 해당 아이템의 id)
        aAbutton.setAttribute("onclick", "javascript:basket.delItem(this.id);");
        aAbutton.setAttribute("href", "javascript:void(0)");
        aAbutton.setAttribute("value", i);

        aAbutton.innerText = "삭제";

        divBasketCmd.appendChild(aAbutton);
        divSubDiv3.appendChild(divBasketCmd);
        divRowData.appendChild(divSubDiv3);

        divBasketDiv.appendChild(divRowData);



    }




}

function renderUserProfile() {

    let userKey = getCookie("currentUser");
    let thisUser = JSON.parse(localStorage.getItem(userKey.toString()));

    let trProfileName = document.getElementById("profileName");
    let trProfileNumber = document.getElementById("profileNumber");
    let trProfileAddress = document.getElementById("profileAddress");
    let trProfileMail = document.getElementById("profileMail");

    let DBProfileName = thisUser.username;
    let DBProfileNumber = thisUser.contact;
    let DBprofileMail = thisUser.email;
    let DBProfileAddress = thisUser.address;

    let profileNameTd = document.createElement("td");
    profileNameTd.innerText = DBProfileName;
    trProfileName.appendChild(profileNameTd);

    let profileNumberTd = document.createElement("td");
    profileNumberTd.innerText = DBProfileNumber;
    trProfileNumber.appendChild(profileNumberTd);

    let profileMailTd = document.createElement("td");
    profileMailTd.innerText = DBprofileMail;
    trProfileMail.appendChild(profileMailTd);

    let profileAddressTd = document.createElement("td");
    profileAddressTd.innerText = DBProfileAddress;
    trProfileAddress.appendChild(profileAddressTd);


}


// function renderProfile() {
//
//     const userKey = getCookie("currentUser");
//     const userItemList = JSON.parse(localStorage.getItem(userKey+"userItemList"));
//     const localItemDb = JSON.parse(localStorage.getItem("DB"));
//     const userProfile = localStorage.getItem(userKey);
//     let contents = document.getElementById("contents");
//
//     if(userItemList !== null){
//
//
//         for(let i = 0; i<userItemList.items.length; i++){
//
//             let thisItem = "item" + i.toString();
//             let itemNumber = userItemList.items[i][thisItem];
//
//
//             let acover = document.createElement("a");
//             acover.setAttribute("class", "cover");
//             acover.setAttribute("href","#");
//             let Div = document.createElement("div");
//             Div.setAttribute("id", "mybag");
//             acover.appendChild(Div);
//             let newCheckBtn = document.createElement("input");
//             newCheckBtn.setAttribute("type", "checkbox");
//             newCheckBtn.setAttribute("name", "chooseBuy");
//             acover.appendChild(newCheckBtn);
//             Div.innerHTML = itemNumber + "번 item";
//
//             contents.appendChild(acover);
//
//         }
//
//
//
//
//     }
//
//
//
// }


/**
 * @author 최제현
 * @date 2021/04/05
 *
 * 주문목록 페이지에 html를 생성하는 함수
 * 04/10 수정 형식에 맞추어 html생성
 */
function renderMyOrder() {

    //

    try{
        let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
        localItemDB.length;
        let currentUser = getCookie("currentUser");
        let myBagDB = (JSON.parse((localStorage.getItem((currentUser+"userBuyItemList")))));
        myBagDB.length;
    }catch (e) {
        alert('잘못된 접근입니다. 장바구니에서 제품을 구매해주세요.');
        window.location.href="index.html";
    }

    let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
    let currentUser = getCookie("currentUser");
    let myBagDB = (JSON.parse((localStorage.getItem((currentUser+"userBuyItemList")))));

    const divBasketDiv = document.getElementById("basket");

    for(let i = 0; i < myBagDB["items"].length; i++){
        const buyItem = myBagDB["items"][i];
        const buyItemNumber = myBagDB["items"][i].itemNo;
        const thisItem = localItemDB.items[buyItemNumber];

        //<div class="row data">
        const divRowData = document.createElement("div");
        divRowData.setAttribute("class", "row data");



        //<div class="subdiv">
        const divSubDiv1 = document.createElement("div");
        divSubDiv1.setAttribute("class", "subdiv")
        divRowData.appendChild(divSubDiv1);

        //<div class="check"><input type="checkbox" name="buy" value="260" checked="">&nbsp;</div>
        const divCheck = document.createElement("div");
        divCheck.setAttribute("class", "check");
        divCheck.innerText = i+1;
        divSubDiv1.appendChild(divCheck);


        // <div class="img"><img src="./img/basket1.jpg" width="60"></div>
        const divImg = document.createElement("div");
        divImg.setAttribute("class", "img");
        const itemImg = document.createElement("img");
        itemImg.src = "../css/image/" + thisItem.image1 + ".jpg";
        itemImg.height = 60;
        itemImg.width = 40;
        divImg.appendChild(itemImg);
        divSubDiv1.appendChild(divImg);

        //<div class="pname">
        const divPName = document.createElement("div");
        divPName.setAttribute("class", "pname");

        //<span>상품명</span>        const spanItemName = document.createElement("span");
        const spanItemName = document.createElement("span");
        spanItemName.innerText = thisItem.name;
        divPName.appendChild(spanItemName);
        divSubDiv1.appendChild(divPName);

        //<div class="subdiv">
        const divSubDiv2 = document.createElement("div");
        divSubDiv2.setAttribute("class", "subdiv");



        //<div class="basketprice"><input type="hidden" name="p_price" id="p_price1" class="p_price" value="20000">20,000원</div>
        const divBasketPrice = document.createElement("div");
        divBasketPrice.setAttribute("class", "basketprice");
        divBasketPrice.innerText = thisItem.price + "";
        const inputPPrice = document.createElement("input");
        inputPPrice.type = "hidden";
        inputPPrice.name = "p_price";
        inputPPrice.setAttribute("value", thisItem.price.replace(",", ""));
        inputPPrice.setAttribute("id", "p_price" + (i+1));
        inputPPrice.setAttribute("class", "p_price");

        divBasketPrice.appendChild(inputPPrice);
        divSubDiv2.appendChild(divBasketPrice);

        //<div class="num">
        const divNum = document.createElement("div");
        divNum.setAttribute("class", "num");

        const divPNum = document.createElement("div");
        divPNum.setAttribute("id", "p_num" +(i+1));
        divPNum.innerText = buyItem.itemNum + "개";


        const divSum = document.createElement("div");
        divSum.setAttribute("class", "sum");
        divSum.innerText = buyItem.itemPrice;

        divNum.appendChild(divPNum);
        divSubDiv2.appendChild(divNum);
        divSubDiv2.appendChild(divSum);
        divRowData.appendChild(divSubDiv2);

        const divSubDiv3 = document.createElement("div");
        divSubDiv3.setAttribute("class", "subdiv");

        const divBasketOrder = document.createElement("div");
        divBasketOrder.setAttribute("class", "num");
        divBasketOrder.innerText = "주문완료";


        divSubDiv3.appendChild(divBasketOrder);
        divRowData.appendChild(divSubDiv3);

        divBasketDiv.appendChild(divRowData);

        const orderForm = document.getElementById("orderform");

        //<div class="bigtext right-align sumcount" id="sum_p_num">상품갯수: 0개</div>
        const divSumCount = document.createElement("div");
        divSumCount.setAttribute("class", "bigtext right-align sumcount");
        divSumCount.setAttribute("id", "sum_p_num");
        divSumCount.innerText = myBagDB["totalnumber"];


        //<div class="bigtext right-align box blue summoney" id="sum_p_price">합계금액: 0원</div>
        const divTotalMoney = document.createElement("div");
        divTotalMoney.setAttribute("class", "bigtext right-align box blue summoney");
        divTotalMoney.setAttribute("id", "sum_p_price");
        divTotalMoney.innerText = myBagDB["totalmoney"];

        const divGoorder = document.createElement("div");
        divGoorder.setAttribute("id", "goorder");
        divGoorder.innerHTML = "<div class=\"clear\"></div> <div class=\"buttongroup center-align cmd\"> </div>";



        orderForm.appendChild(divSumCount);
        orderForm.appendChild(divTotalMoney);
        orderForm.appendChild(divGoorder);



    }




}

