const aifiMoneyID = document.getElementById('aifiMoney').value;
const percentageID = document.getElementById('percentage').value;
const calculateID = document.getElementById('calculate');

function calculateTotalAifi(e) {
    e.preventDefault();
    const appAifianID = document.getElementById('appAifian');
    str = '';
    const dayYears = 365;
    const aifiPoint = percentageID / 100;
    const day365Money = (aifiMoneyID * aifiPoint);
    const day7Money = (day365Money / dayYears * 7);
    str = `
        <p>一年收益(365天)
            <em id="result365">${day365Money.toFixed(2)}</em>元
        </p>
        <p>本週回饋金
            <em id="result7">${day7Money.toFixed(2)}</em>元
        </p>
        <p>實際取得金額
            <em id="resultAifi">${Math.round(day7Money)}</em>元
        </p>
    `;
    localStorage.setItem('aifianList',str);
    appAifianID.innerHTML = str;
}



calculateID.addEventListener('click', calculateTotalAifi);