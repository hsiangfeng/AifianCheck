const aifiMoneyID = document.getElementById('aifiMoney');
const percentageID = document.getElementById('percentage');
const calculateID = document.getElementById('calculate');
const fromListID = document.getElementById('fromList');

function calculateTotalAifi(e) {
    e.preventDefault();
    const appAifianID = document.getElementById('appAifian');
    str = '';
    const dayYears = 365;
    const aifiPoint = percentageID.value / 100;
    const day365Money = aifiMoneyID.value * aifiPoint;
    const day7Money = day365Money / dayYears * 7;
    const strList = {
        day365Money: day365Money.toFixed(2),
        day7Money: day7Money.toFixed(2),
        realMoney: Math.round(day7Money)
    }
    str = `
        <p>一年收益(365天)
            <em id="result365">${strList.day365Money}</em>元
        </p>
        <p>本週回饋金
            <em id="result7">${strList.day7Money}</em>元
        </p>
        <p>實際取得金額
            <em id="resultAifi">${strList.realMoney}</em>元
        </p>
    `;
    localStorage.setItem('aifianList', JSON.stringify(strList));
    
    appAifianID.innerHTML = str;
    document.getElementById('fromList').reset();
}



calculateID.addEventListener('click', calculateTotalAifi);