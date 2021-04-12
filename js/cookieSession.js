// 세션 대신 사용할 쿠키 설정
var setCookie = function(name, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + exp*24*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

//params : name 에서 받은 이름으로 쿠키 검색
var getCookie = function(name) {
    var value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
};

// 쿠키 지우기
var deleteCookie = function(name) {
    setCookie(name, "", -1);
}

/**
 * @author 최제현
 * @date 2021/04/12 - 수정
 *
 * 로그인을 했을때, 불필요한 버튼들을 안보이게 해주는 함수.
 */
function changeLoginBtn() {

    const registerBtn = document.getElementById("registerBtn");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const bagBtn = document.getElementById("bagBtn");
    const profileBtn = document.getElementById("profileBtn")



    if(getCookie("currentUser") != null){
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
    }else{
        logoutBtn.style.display = "none";
        bagBtn.style.display = "none"
        profileBtn.style.display = "none";
    }

}


/**
 * @author 최제현
 * @date 2021/03/28
 *
 * 로그아웃을 요청하는 함수.
 */
function logout() {

    if(getCookie("currentUser") != null){
        deleteCookie("currentUser");
        alert('로그아웃되었습니다.');
        window.location.href = "index.html";
    }else{
        alert('이미 로그아웃되어있습니다.');
    }

}

/**
 * @author 최제현
 *
 * 상품 상세정보를 출력하기 위한 clicklistner
 *
 * 2021/04/11 - 버그로 인한 잠시 삭제
 */
// function addDetailViewCookie() {
//
//     let getItemNumber = document.getElementById("")
//
// }

// function nameClickListner() {
//
//     document.addEventListener('click', function idCookieMaker(event) {
//         const clickTarget = event.target;
//         const id = clickTarget.getAttribute("name");
//         setCookie("clickId", id, 4)
//     })
//
//
// }
