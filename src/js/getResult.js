//======================================
//    YIM START
//======================================
//all radios
const radios = document.querySelectorAll('input[class="field__radio"]');
let result = 0;
// radio 선택으로 페이지 이동
radios.forEach(function (elem) {
  elem.addEventListener("click", function () {
    //라디오 버튼 값이 변하면
    //네비게이션 값 바꿔주기
    let curNum = parseInt(elem.getAttribute("name"));
    let nextNum = curNum + 1;
    document
      .getElementById(`mbti-${curNum}`)
      .classList.remove("is-flex-active");
    document.getElementById(`mbti-${nextNum}`).classList.add("is-flex-active");

      result += parseInt(elem.getAttribute("value"));
    });
});


// 결과 페이지로 값 보내기
const getResult = document.getElementById("getResult");
getResult.addEventListener("click", function(){
  let resultFinal;
  if(result<6){
    resultFinal = 1;
  }else if(result< 16){
    resultFinal = 2;
  }else if(result < 21){
    resultFinal = 3;
  }else{
    resultFinal = 4;
  }
  getResult.setAttribute("href", `./mbti-r-${resultFinal}.html`);
});