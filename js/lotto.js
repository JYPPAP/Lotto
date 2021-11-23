"use strict";

document.addEventListener("DOMContentLoaded", function () {
  /*###################
        번호 추천
  ###################*/
  var todayShow = document.getElementById("today");
  var today = new Date();
  var checkBtn = document.getElementById("checkBtn");
  var lottoNumber = Array.prototype.slice.call(document.getElementsByClassName("lottoNumber"));
  var totalNumber = [];
  var clickFlag = false

  /* 오늘 날짜 */
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var day = ('0' + (today.getDate())).slice(-2);
  todayShow.textContent = "("+year+". "+month+". "+day+")";

  /* 로또 숫자배열 생성 */
  for (var i = 0; i < 45; i++) {totalNumber[i] = i + 1;}

  checkBtn.onclick = function() {
    if(clickFlag) return true;
    lottoNumber.map(function (num) {
      num.textContent = "";
      num.style.visibility = "hidden";
    });
    clickFlag = true;
    return clickFlag, randomNumber();
  }
  /* 배열에서 무작위의 숫자 7개를 추출하기 */
  function randomNumber() {
    var randomArray = [];
    for (var i = 0; i < 7; i++) {
      var randomNum = Math.floor(Math.random() * 45) + 1;
      randomArray[i] = randomNum;
    }
    return checkNum(randomArray);
  }

  function checkNum (randomArray) {
    /* 중복 확인 */
    var filterArray = randomArray.filter(function(item, index) {
      if (randomArray.indexOf(item) == index)
      return item;
    });
    if (filterArray.length !== 7) {
      console.log("중복: "+filterArray);
      return randomNumber();
    } else {
      console.log("통과: "+filterArray);
      return sortNumber(filterArray);
    }
  }
  function sortNumber(filterArray) {
    var lastNum = filterArray.pop();
    var sortArray = filterArray.sort(function(a, b) {
      if (a > b) return 1;
      if ( a === b) return 0;
      if (a < b) return -1;
    });
    return setNumber(lastNum, sortArray);
  }
  function setNumber(lastNum, sortArray) {
    for (var i = 0; i < sortArray.length; i++) {
      lottoNumber[i].textContent = sortArray[i];
      checkColor();
    }
    lottoNumber[lottoNumber.length-1].textContent = lastNum;
    checkColor();
    return showNumber();
  }
  function checkColor() {
    lottoNumber.map(function (num) {
      if (num.textContent < 10) {
        num.classList.add("yellowNum");
      } else if (num.textContent < 20) {
        num.classList.add("blueNum");
      } else if (num.textContent < 30) {
        num.classList.add("redNum");
      } else if (num.textContent < 40) {
        num.classList.add("greenNum");
      } else {
        num.classList.add("grayNum");
      }
    });
  }
  function showNumber() {
    for (var i=0; i<lottoNumber.length; i++) {
      var showCount = 0;
      setTimeout(function() {
        lottoNumber[showCount].style.visibility ="visible";
        showCount++;
      }, (1000*i));
    }
    setTimeout(function() {
      clickFlag = false;
    }, (1000 * lottoNumber.length));
    return clickFlag
  }
  /*###################
        적중 내역
  ###################*/
  var slideItem = Array.prototype.slice.call(document.getElementsByClassName("slide_item"));
  var leftBtn = document.getElementById("slideLeftBtn");
  var rightBtn = document.getElementById("slideRightBtn");
  var slideCount = 0;

  /*###################
        Ajax
  ###################*/
  var xhr = new XMLHttpRequest();

  xhr.open('GET', 'json/lotto.json');
  xhr.send();

  xhr.onreadystatechange = function () {
    console.log("["+ xhr.status+"] : "+xhr.statusText);
    // 서버 응답 완료 && 정상 응답
    if (xhr.readyState !== XMLHttpRequest.DONE) return;

    if (xhr.status === 200) {

      // Deserializing (String → Object)
      // var responseObject = JSON.parse(xhr.responseText);
      // var rArray = JSON.stringify(responseObject);
      // console.log("responseObject의 TYPE: "+typeof(responseObject));
      console.log("###############");
      console.log(xhr);
      var valueee = JSON.parse(xhr.response);
      console.log("typeof(valueee)의 TYPE: "+typeof(valueee));
      console.log("");
      console.log("valueee");
      console.log(valueee);
      console.log("");

      console.log("");
      console.log("valueee[875]");
      console.log(valueee[875]);
      console.log("");
      console.log('valueee[875]["3st"]');
      console.log(valueee[875]["3st"]);
      console.log("###############");
      
      // JSON → HTML String

      // document.getElementById('content').innerHTML = newContent;
    } else {
      console.log("["+xhr.status+"] : "+xhr.statusText);
    }
  };

  /* JSON AJAX END */

  /* 슬라이드 배치 함수 */
  function slideMove (slideCount) {
    for(var i=0; i<slideItem.length; i++) {
      slideItem[i].style.left = 343 * (i-slideCount)+ "px";
    }
  }
  slideMove(slideCount);

  /* 슬라이드 버튼 토글 함수 */
  function btnToggle (slideCount) {
    if(slideCount === 0) {
      leftBtn.style.display = "none";
    } else if(slideCount === (slideItem.length -3)) {
      rightBtn.style.display = "none";
    } else {
      leftBtn.style.display = "block";
      rightBtn.style.display = "block";
    }
  }

  leftBtn.onclick = function leftClick() {
    slideCount--;
    btnToggle(slideCount);
    slideMove(slideCount);
    return slideCount;
  }
  rightBtn.onclick = function rightClick() {
    slideCount++;
    btnToggle(slideCount);
    slideMove(slideCount);
    return slideCount;
  }
});