
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
                imgSrc.width = 270;
                imgSrc.height = 380;
                imgSrc.name = DB.itemNumber;
                itemLiA.setAttribute("class", "a");
                itemLiA.setAttribute("name", DB.itemNumber);
                itemLiA.innerText = DB.name;
                itemLiB.setAttribute("class", "b");
                itemLiB.innerText = DB.price;
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

function renderTraining() {

    let localItemDB = (JSON.parse(localStorage.getItem("DB"))).DB;
    let length = localItemDB.items.length;

    renderProduct(localItemDB,length, "category", "training")

}


function renderDetail(value) {

getCookie("clickId");

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
