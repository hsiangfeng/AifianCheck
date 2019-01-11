//相關欄位
const aifiMoneyID = document.getElementById('aifiMoney');
const percentageID = document.getElementById('percentage');
const calculateID = document.getElementById('calculate');
//form
const fromListID = document.getElementById('fromList');
const containerID = document.querySelector('.container');
//setting localStorage
let aifianArrayList = JSON.parse(localStorage.getItem('aifianList')) || []
//firstIndex
loaclIndex(aifianArrayList);

function calculateTotalAifi(e) {
    e.preventDefault();
    const appAifianID = document.getElementById('appAifian');
    //count
    const dayYears = 365;
    const dayWeek = 7;
    const aifiPoint = parseInt(percentageID.value) / 100;
    const day365Money = parseFloat(aifiMoneyID.value) * aifiPoint;
    const day7Money = day365Money / dayYears * dayWeek;
    //get NowDateTime
    const nowDateTime = nowAifianDate();
    //settingArray
    const strList = {
        day365Money: day365Money.toFixed(2),
        day7Money: day7Money.toFixed(2),
        realMoney: Math.round(day7Money),
        dateTime: nowDateTime
    }
    let str = '';
    str = `
        <div class="h3">本次計算結果</div>
        <p>一年收益(365天)
            <em id="result365">${strList.day365Money}</em>元
        </p>
        <p>本週回饋金
            <em id="result7">${strList.day7Money}</em>元
        </p>
        <p>實際取得金額
            <em id="resultAifi">${strList.realMoney}</em>元
        </p>
        <p>紀錄時間
            <em id="dateTime">${strList.dateTime}</em>元
        </p>
    `;
    aifianArrayList.push(strList);
    localStorage.setItem('aifianList', JSON.stringify(aifianArrayList));
    appAifianID.innerHTML = str;
    loaclIndex(aifianArrayList);
    document.getElementById('fromList').reset();
}
//getLocalStorage
function loaclIndex(item) {
    let localAifianListID = document.getElementById('localAifianList');
    let str = '';
    item.forEach(function (item, index) {
        str += `
            <div class="row py-2 rounded">
                <div class="col-md-12">
                    <button type="button" class="close" aria-label="Close" data-index="${index}">
                        <i class="fas fa-trash-alt"></i><span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="col-md-12 bg-primary py-5 aifian-bg d-flex justify-content-center align-items-center flex-column">
                    <i class="fas fa-money-bill-alt fa-2x"></i>實際取得金額
                    <br/>
                    <div class="font-weight-bold">${item.realMoney}元</div>
                </div>
                <div class="col-md-4 result365 bg-secondary d-flex justify-content-center align-items-center flex-column">
                    <i class="fas fa-calendar-alt fa-2x"></i>一年收益(365天)
                    <br/>
                    <div class="font-weight-bold">${item.day365Money}元</div>
                </div>
                <div class="col-md-4 result7 bg-success d-flex justify-content-center align-items-center flex-column">
                    <i class="fas fa-calendar-check fa-2x"></i>本週回饋金
                    <br/>
                    <div class="font-weight-bold">${item.day7Money}元</div>
                </div>
                <div class="col-md-4 resultAifi text-white-50 bg-dark d-flex justify-content-center align-items-center flex-column">
                    <i class="fas fa-clock fa-2x"></i>紀錄時間
                    <br/>
                    <div class="font-weight-bold">${item.dateTime}</div>
                </div>
            </div>
        `;
    });
    localAifianListID.innerHTML = str;
}
function removeAifian(e) {
    let str = e.target.dataset.index;
    console.log(e.target.nodeName);
    if (e.target.nodeName == "BUTTON") {
        aifianArrayList.splice(str, 1);
        localStorage.setItem('aifianList', JSON.stringify(aifianArrayList));
        loaclIndex(aifianArrayList);
    }
}
//get NowDateTime
function nowAifianDate() {
    const now = new Date;
    const nowDateTime = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + '  ' + now.getHours() + ':' + now.getMinutes();
    return nowDateTime;
}
//Verify input null
function Verify(e) {
    var strinput = e.target.value;
    if (strinput == '') {
        alert('欄位不得為空值');
    }
}

//event
calculateID.addEventListener('click', calculateTotalAifi);
containerID.addEventListener('click', removeAifian)
aifiMoneyID.addEventListener('blur', Verify);
percentageID.addEventListener('blur', Verify);