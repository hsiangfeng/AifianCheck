//dowload JSON
var xhr = new XMLHttpRequest();
xhr.open('get', 'https://hsiangfeng.github.io/AifianCheck/data/data.json');
xhr.send(null);
xhr.onload = function () {
    _data = JSON.parse(xhr.responseText);
    defaultData()
}

let tableID = document.getElementById('table');

function defaultData() {
    let data = _data;
    let arrayList = '';
    data.forEach(function (item, index) {
        arrayList +=
            `
            <tr>
                <th scope="row">${index+1}</th>
                <td>${item.日期}</td>
                <td>${item.歷史收益}</td>
                <td>${item.一年收益}</td>
                <td>${item.七天收益}</td>
                <td>${item.七天實際收益}</td>
                <td>${item.備註}</td>
                <td>${item.數值參照}</td>
            </tr>
        `;
    })
    tableID.innerHTML = arrayList;
}