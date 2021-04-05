
/**
     * @author 최제현
     * @date 2021/03/28
     *
     * localStorage에 ItemDB를 저장하는 기능
     */

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

/**
 * @author 최제현
 * @date 2021/03/28
 * @type
 *
 *
 * localStorage에 저장될 Item DB
 */

const itemDB = {
    "items": [
        {
            "itemNumber": "0",
            "category": "top",
            "name": "대충 베이지색 운동",
            "price": "248,000",
            "image1": "product1_1",
            "image2": "product1_2",
            "image3": "product1_3",
            "new": "0",
            "detail": "가볍고 탄탄한 sweethome의 신작입니다."
        },
        {
            "itemNumber": "1",
            "category": "bottom",
            "name": "대충 짱이쁜 파란색 하의",
            "price": "980,000",
            "image1": "product2_1",
            "image2": "product2_2",
            "image3": "product2_3",
            "new": "1",
            "detail": "가볍고 탄탄한 sweethome의 신작입니다."
        },
        {
            "itemNumber": "2",
            "category": "top",
            "name": "12번상의",
            "price": "50,000",
            "image1": "product3_1",
            "image2": "product3_2",
            "image3": "product3_3",
            "new": "0",
            "detail": "이건 사실상 물통 광고지 않나"
        },
        {
            "itemNumber": "3",
            "category": "top",
            "name": "신상 한정판 흰색상의 ",
            "price": "248,000",
            "image1": "product4_1",
            "image2": "product4_2",
            "image3": "product4_3",
            "new": "1",
            "detail": "가볍고 탄탄한 sweethome의 신작입니다."
        },
        {
            "itemNumber": "4",
            "category": "top",
            "name": "겁나편한 회색 상의",
            "price": "120,000",
            "image1": "product5_1",
            "image2": "product5_2",
            "image3": "product5_3",
            "new": "0",
            "detail": "가볍고 탄탄한 sweethome의 신작입니다."
        },
        {
            "itemNumber": "5",
            "category": "bottom",
            "name": "땀 잘 마르는 진한회색 하의",
            "price": "300,000",
            "image1": "product6_1",
            "image2": "product6_2",
            "image3": "product6_3",
            "new": "0",
            "detail": "가볍고 탄탄한 sweethome의 신작입니다."
        },
        {
            "itemNumber": "6",
            "category": "bottom",
            "name": "살려줘",
            "price": "750,000",
            "image1": "product7_1",
            "image2": "product7_2",
            "image3": "product7_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "7",
            "category": "bottom",
            "name": "4번하의",
            "price": "750,000",
            "image1": "product8_1",
            "image2": "product8_2",
            "image3": "product8_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "8",
            "category": "bottom",
            "name": "5번하의",
            "price": "750,000",
            "image1": "product9_1",
            "image2": "product9_2",
            "image3": "product9_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "9",
            "category": "bottom",
            "name": "6번하의",
            "price": "750,000",
            "image1": "product10_1",
            "image2": "product10_2",
            "image3": "product10_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "10",
            "category": "bottom",
            "name": "7번하의",
            "price": "750,000",
            "image1": "product11_1",
            "image2": "product11_2",
            "image3": "product11_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "11",
            "category": "bottom",
            "name": "8번하의",
            "price": "750,000",
            "image1": "product12_1",
            "image2": "product12_2",
            "image3": "product12_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "12",
            "category": "bottom",
            "name": "9번하의",
            "price": "750,000",
            "image1": "product13_1",
            "image2": "product13_2",
            "image3": "product13_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "13",
            "category": "bottom",
            "name": "10번하의",
            "price": "750,000",
            "image1": "product14_1",
            "image2": "product14_2",
            "image3": "product14_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "14",
            "category": "bottom",
            "name": "11번하의",
            "price": "750,000",
            "image1": "product15_1",
            "image2": "product15_2",
            "image3": "product15_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "15",
            "category": "bottom",
            "name": "12번하의",
            "price": "750,000",
            "image1": "product16_1",
            "image2": "product16_2",
            "image3": "product16_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "16",
            "category": "top",
            "name": "4번상의",
            "price": "750,000",
            "image1": "product17_1",
            "image2": "product17_2",
            "image3": "product17_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "17",
            "category": "top",
            "name": "5번상의",
            "price": "750,000",
            "image1": "product18_1",
            "image2": "product18_2",
            "image3": "product18_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "18",
            "category": "top",
            "name": "6번상의",
            "price": "750,000",
            "image1": "product19_1",
            "image2": "product19_2",
            "image3": "product19_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "19",
            "category": "top",
            "name": "7번상의",
            "price": "750,000",
            "image1": "product20_1",
            "image2": "product20_2",
            "image3": "product20_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "20",
            "category": "top",
            "name": "8번상의",
            "price": "750,000",
            "image1": "product21_1",
            "image2": "product21_1",
            "image3": "product21_1",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "21",
            "category": "top",
            "name": "9번상의",
            "price": "750,000",
            "image1": "product22_2",
            "image2": "product22_2",
            "image3": "product22_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "22",
            "category": "top",
            "name": "10번상의",
            "price": "750,000",
            "image1": "product23_1",
            "image2": "product23_2",
            "image3": "product23_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "23",
            "category": "top",
            "name": "11번상의",
            "price": "750,000",
            "image1": "product24_1",
            "image2": "product24_2",
            "image3": "product24_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "24",
            "category": "training",
            "name": "케틀벨1",
            "price": "750,000",
            "image1": "product25_1",
            "image2": "product25_2",
            "image3": "product25_3",
            "new": "0",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "25",
            "category": "training",
            "name": "헥사곤아령1",
            "price": "750,000",
            "image1": "product26_1",
            "image2": "product26_2",
            "image3": "product26_2",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "26",
            "category": "training",
            "name": "런닝머신",
            "price": "750,000",
            "image1": "product27_1",
            "image2": "product27_2",
            "image3": "product27_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "27",
            "category": "training",
            "name": "자전거운동기구",
            "price": "750,000",
            "image1": "product28_1",
            "image2": "product28_2",
            "image3": "product28_3",
            "new": "0",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "28",
            "category": "training",
            "name": "파랑 요가메트",
            "price": "750,000",
            "image1": "product29_1",
            "image2": "product29_2",
            "image3": "product29_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "29",
            "category": "training",
            "name": "고탄력 벤드",
            "price": "750,000",
            "image1": "product30_1",
            "image2": "product30_2",
            "image3": "product30_3",
            "new": "0",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "30",
            "category": "training",
            "name": "아령 3KG",
            "price": "750,000",
            "image1": "product31_1",
            "image2": "product31_2",
            "image3": "product31_2",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "31",
            "category": "training",
            "name": "검정 요가메트",
            "price": "750,000",
            "image1": "product32_1",
            "image2": "product32_2",
            "image3": "product32_3",
            "new": "1",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "32",
            "category": "training",
            "name": "케틀벨2",
            "price": "750,000",
            "image1": "product33_1",
            "image2": "product33_2",
            "image3": "product33_3",
            "new": "0",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        },
        {
            "itemNumber": "33",
            "category": "training",
            "name": "스카이워커",
            "price": "750,000",
            "image1": "product34_1",
            "image2": "product34_2",
            "image3": "product34_3",
            "new": "0",
            "detail": "동적인 기능이 늘어날때마다 제가 많이 힘들어집니다. "
        }


    ]
}
