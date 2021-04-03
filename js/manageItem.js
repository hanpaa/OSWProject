/**
 * @author 최제현
 * @date 2021/03/28
 * @type
 *
 *
 * localStorage에 저장될 Item DB
 */



const itemDB = {
    "items" : [
        {"itemNumber" : "0",
            "category" : "top",
            "name" : "대충 베이지색 운동",
            "price" : "248,000원",
            "image1" : "product1_1",
            "image2" : "product1_2",
            "image3" : "product1_3",
            "new" : "0"
        },
        {"itemNumber" : "1",
            "category" : "bottom",
            "name" : "대충 짱이쁜 파란색 하의",
            "price" : "980,000원",
            "image1" : "product2_1",
            "image2" : "product2_2",
            "image3" : "product2_3",
            "new" : "1"
        },
        {"itemNumber" : "2",
            "category" : "training",
            "name" : "물통",
            "price" : "50,000원",
            "image1" : "product3_1",
            "image2" : "product3_2",
            "image3" : "product3_3",
            "new" : "0"
        },
        {"itemNumber" : "3",
            "category" : "top",
            "name" : "신상 한정판 흰색상의 ",
            "price" : "248,000원",
            "image1" : "product4_1",
            "image2" : "product4_2",
            "image3" : "product4_3",
            "new" : "1"
        },
        {"itemNumber" : "4",
            "category" : "top",
            "name" : "겁나편한 회색 상의",
            "price" : "120,000원",
            "image1" : "product5_1",
            "image2" : "product5_2",
            "image3" : "product5_3",
            "new" : "0"
        },
        {"itemNumber" : "5",
            "category" : "bottom",
            "name" : "땀 잘 마르는 진한회색 하의",
            "price" : "300,000원",
            "image1" : "product6_1",
            "image2" : "product6_2",
            "image3" : "product6_3",
            "new" : "0"
        },
        {"itemNumber" : "6",
            "category" : "bottom",
            "name" : "살려줘",
            "price" : "750,000원",
            "image1" : "product7_1",
            "image2" : "product7_2",
            "image3" : "product7_3",
            "new" : "1"
        }


    ]

    /**
     * @author 최제현
     * @date 2021/03/28
     *
     * localStorage에 ItemDB를 저장하는 기능
     */
}
function setItemDB() {

    localStorage.setItem("DB", JSON.stringify({DB : itemDB}));
}

/**
 * @author 최제현
 * @date 2021/03/27
 *
 * user가 check한 Checkbox를 찾아 해당하는 item의 이름을 localStorage에 저장
 */
function getChooseItem() {

    // 고를 수 있는 item 의 리스트를 받아옵니다.
    let chooseItem = document.getElementsByName("chooseItem");
    const chooseItemLength = chooseItem.length;
    //현재 로그인중인 유저 찾기.
    const currentUser = getCookie("currentUser").toString();
    const storageName = currentUser + "userItemList" ;
    let choosedItemList = new Array();


    if(currentUser == null){
        alert('로그인하세요');
        window.location.href = "manageUser.html";
    }

    try {
        let currentStorage = JSON.parse(localStorage.getItem(storageName));
        for(let i =0; i < currentStorage.length; i++){
            choosedItemList.push(currentStorage[i])
        }

        for(let i =0; i<chooseItemLength; i++){
            if(chooseItem[i].checked == true){
                let itemName = document.getElementsByName("chooseItem")[i].value;

                //JSON 의 Key 이름을 동적으로 저장합니다.
                let itemJson = {"item" : itemName};

                choosedItemList.push(itemJson);
            }


        }

        let resultList = choosedItemList.filter((value, index) => {
            const JsonValue = JSON.stringify(value);
            return index === choosedItemList.findIndex(obj => {
                return JSON.stringify(obj) === JsonValue;
            });
        })

        localStorage.setItem(storageName, JSON.stringify(resultList));

    }catch (e) {
        localStorage.setItem(storageName, null);

        for (let i = 0; i < chooseItemLength; i++) {
            if (chooseItem[i].checked == true) {
                let itemName = document.getElementsByName("chooseItem")[i].value;
                //JSON 의 Key 이름을 동적으로 저장합니다.
                let itemJson = {"item": itemName};
                choosedItemList.push(itemJson);
            }
            localStorage.setItem(storageName, JSON.stringify(choosedItemList));
        }
    }


    //localStorage에 고른 상품들을 저장합니다.


    alert('장바구니에 담겼습니다.');

}


