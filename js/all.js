"use strict";

//countAifiTitle
function calculateTotalAifi(e) {
  e.preventDefault();
  var appAifianID = document.getElementById('appAifian');
  var dayYears = 365;
  var dayWeek = 7;
  var aifiPoint = parseInt(percentageID.value) / 100;
  var day365Money = parseFloat(aifiMoneyID.value) * aifiPoint;
  var day7Money = day365Money / dayYears * dayWeek;
  var nowDateTime = nowAifianDate();
  var strList = {
    day365Money: day365Money.toFixed(2),
    day7Money: day7Money.toFixed(2),
    realMoney: Math.round(day7Money),
    dateTime: nowDateTime
  };
  var str = '';
  str = "\n        <div class=\"h3\">\u672C\u6B21\u8A08\u7B97\u7D50\u679C</div>\n        <p>\u4E00\u5E74\u6536\u76CA(365\u5929)\n            <em id=\"result365\">".concat(strList.day365Money, "</em>\u5143\n        </p>\n        <p>\u672C\u9031\u56DE\u994B\u91D1\n            <em id=\"result7\">").concat(strList.day7Money, "</em>\u5143\n        </p>\n        <p>\u5BE6\u969B\u53D6\u5F97\u91D1\u984D\n            <em id=\"resultAifi\">").concat(strList.realMoney, "</em>\u5143\n        </p>\n        <p>\u7D00\u9304\u6642\u9593\n            <em id=\"dateTime\">").concat(strList.dateTime, "</em>\u5143\n        </p>\n    ");
  aifianArrayList.push(strList);
  localStorage.setItem('aifianList', JSON.stringify(aifianArrayList));
  appAifianID.innerHTML = str;
  loaclIndex(aifianArrayList);
  document.getElementById('fromList').reset();
} //getLocalStorage


function loaclIndex(data) {
  var localAifianListID = document.getElementById('localAifianList');
  var str = '';
  data.forEach(function (item, index) {
    str += "\n            <div class=\"row py-2 rounded\">\n                <div class=\"col-md-12\">\n                    <button type=\"button\" class=\"close fas fa-trash-alt\" aria-label=\"Close\" data-index=\"".concat(index, "\">\n                        &times;\n                    </button>\n                </div>\n                <div class=\"col-md-12 bg-primary py-5 aifian-bg d-flex justify-content-center align-items-center flex-column\">\n                    <i class=\"fas fa-money-bill-alt fa-2x\"></i>\u5BE6\u969B\u53D6\u5F97\u91D1\u984D\n                    <br/>\n                    <div class=\"font-weight-bold\">").concat(item.realMoney, "\u5143</div>\n                </div>\n                <div class=\"col-md-4 result365 bg-secondary d-flex justify-content-center align-items-center flex-column\">\n                    <i class=\"fas fa-calendar-alt fa-2x\"></i>\u4E00\u5E74\u6536\u76CA(365\u5929)\n                    <br/>\n                    <div class=\"font-weight-bold\">").concat(item.day365Money, "\u5143</div>\n                </div>\n                <div class=\"col-md-4 result7 bg-success d-flex justify-content-center align-items-center flex-column\">\n                    <i class=\"fas fa-calendar-check fa-2x\"></i>\u672C\u9031\u56DE\u994B\u91D1\n                    <br/>\n                    <div class=\"font-weight-bold\">").concat(item.day7Money, "\u5143</div>\n                </div>\n                <div class=\"col-md-4 resultAifi text-white-50 bg-dark d-flex justify-content-center align-items-center flex-column\">\n                    <i class=\"fas fa-clock fa-2x\"></i>\u7D00\u9304\u6642\u9593\n                    <br/>\n                    <div class=\"font-weight-bold\">").concat(item.dateTime, "</div>\n                </div>\n            </div>\n        ");
  });
  localAifianListID.innerHTML = str;
}

function removeAifian(e) {
  var str = e.target.dataset.index;

  if (e.target.nodeName !== "BUTTON") {
    return;
  }

  aifianArrayList.splice(str, 1);
  localStorage.setItem('aifianList', JSON.stringify(aifianArrayList));
  loaclIndex(aifianArrayList);
} //get NowDateTime


function nowAifianDate() {
  var now = new Date();
  var nowDateTime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + '  ' + now.getHours() + ':' + now.getMinutes();
  return nowDateTime;
} //Verify input null


function Verify(e) {
  var strinput = e.target.value;

  if (strinput == '') {
    alert('欄位不得為空值');
  }
} //dowload JSON


var xhr = new XMLHttpRequest();

var _data;

xhr.open('get', 'https://hsiangfeng.github.io/AifianCheck/data/data.json');
xhr.send(null);

xhr.onload = function () {
  _data = JSON.parse(xhr.responseText);
  defaultData();
};

function defaultData() {
  var data = _data;
  var arrayList = '';
  data.forEach(function (item, index) {
    arrayList += "\n            <tr>\n                <th scope=\"row\">".concat(index + 1, "</th>\n                <td>").concat(item.日期, "</td>\n                <td>").concat(item.歷史收益, "</td>\n                <td>").concat(item.一年收益, "</td>\n                <td>").concat(item.七天收益, "</td>\n                <td>").concat(item.七天實際收益, "</td>\n                <td>").concat(item.備註, "</td>\n                <td>").concat(item.數值參照, "</td>\n            </tr>\n        ");
  });
  tableID.innerHTML = arrayList;
}
//# sourceMappingURL=all.js.map
