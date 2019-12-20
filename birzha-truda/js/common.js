$(document).ready(function() {

	var ww = document.body.clientWidth;  // ширина экрана


	if(ww < 992) $("#salary").attr('placeholder','от 500 EUR');
	if(ww < 768) {
		// $(".site_title h1").text("Работа в Польше");
		// $(".find_prof").html("<i class='fa fa-search'></i>");
		$("#profession").attr('placeholder','Поиск, например: сварщик');
	}


	$(window).resize(function(event) {
		if($(window).width() <= 992) {
			$("#salary").attr('placeholder','от 500 EUR');
		} else $("#salary").attr('placeholder','Зарплата от 500 EUR');
		if($(window).width() <= 768) {
			// $(".site_title h1").text("Работа в Польше");
			$("#profession").attr('placeholder','Поиск, например: сварщик');
			// $(".find_prof").html("<i class='fa fa-search'></i>");
		// } else {
		// 	$(".site_title h1").text("Работа в Польше для украинцев");
		$("#profession").attr('placeholder','Например: сварщик');
			// $(".find_prof").html("Найти вакансию");
		}
	});

//Кнопка ВВЕРХ

$(window).scroll(function() {
	if($(this).scrollTop() != 0) {
		$('a.to_top').fadeIn();
	} else {
		$('a.to_top').fadeOut();
	}
});
$('a.to_top').click(function (e) {
	e.preventDefault();
	$('body,html').animate({scrollTop: 0}, 800);
});

//Плавный переход на нужный блок

$(".top_menu").on("click","a", function (event) {
		//отменяем стандартную обработку нажатия по ссылке
		// event.preventDefault();

		//забираем идентификатор бока с атрибута href
		var id  = $(this).attr('href'),

		//узнаем высоту от начала страницы до блока на который ссылается якорь
		top = $(id).offset().top;
		
		//анимируем переход на расстояние - top за 1500 мс
		$('body,html').animate({scrollTop: top}, 1500);
	});


	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("#form").submit(function() {
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				
				$("#form").trigger("reset");
			}, 1000);
		});
		return false;
	});


});