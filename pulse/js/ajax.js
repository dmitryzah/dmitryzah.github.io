//  XMLHttpRequest
function ajax(url, method, functionName, dataArray){
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(dataArray); // Данные типа  name=vasya&test=primer

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            functionName(this);
            // console.log(this);
        }
    };
}

function requestData(dataArr) {
    let out = '';
    for (let key in dataArr) {
        out += `${key}=${dataArr[key]}&`;
    }
    // console.log(out);
    return out;
}

// let a = {
//     "name": "ivan",
//     "age": 53
// };

// function f1(data) {
//     console.log(data);
// }

// ajax('back.php', 'POST', f1, requestData(a));