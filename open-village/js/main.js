document.addEventListener('DOMContentLoaded', function () {

//  XMLHttpRequest
function ajax(url, method, functionName, dataArray){
    const xhttp = new XMLHttpRequest();
    xhttp.open(method, url, true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send(dataArray); // Данные типа  name=vasya&test=primer

    xhttp.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
            // functionName(this);
            console.log(this);
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

	//Плавная прокрутка

	const link = document.querySelector('.js-button');
	
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const blockID = link.getAttribute('href');

        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

	//Отправка формы на почту

	const form = document.querySelector('form');
	
    const nameInput = form.querySelector('[name=name]'),
        phoneInput = form.querySelector('[name=phone]'),
        emailInput = form.querySelector('[name=email]'),
        companyInput = form.querySelector('[name=company]'),
        activityInput = form.querySelector('[name=activity]'),
        submitBtn = form.querySelector('.button');
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        let inputsArray = {}; // Объявляем объект	
        inputsArray.name = nameInput.value;
        inputsArray.phone = phoneInput.value;
        inputsArray.email = emailInput.value;
        inputsArray.company = companyInput.value;
        inputsArray.activity = activityInput.value;

        // requestData(inputsArray);
        ajax('../mail.php', 'POST', alert("Заявка отправлена."), requestData(inputsArray));
        // console.log(requestData(inputsArray));
    });
    
});