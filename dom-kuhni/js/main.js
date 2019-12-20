window.addEventListener('DOMContentLoaded', () => {
	const menu = document.querySelector('.menu'),
		menuItem = document.querySelectorAll('.menu__item'),
		hamburger = document.querySelector('.hamburger');

	hamburger.addEventListener('click', () => {
		hamburger.classList.toggle('hamburger_active');
		menu.classList.toggle('menu_active');
	});

	menuItem.forEach(item => {
		item.addEventListener('click', () => {
			hamburger.classList.toggle('hamburger_active');
			menu.classList.toggle('menu_active');
		});
	});

	// Старт видео

	const videoBtn = document.querySelector('.video__btn');
	const video = document.querySelector('#video');

	video.addEventListener('click', function () {
		if (video.paused) {
			videoBtn.classList.add('no-visible');
		} else {
			videoBtn.classList.remove('no-visible');
		}
	});

	//Плавная прокрутка

	const anchors = document.querySelectorAll('.menu__link');
	for (let anchor of anchors) {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();

			const blockID = anchor.getAttribute('href');

			document.querySelector(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	}

	//Раскрываем BRENDS

	const moreBrands = document.querySelector('.brends__more');
	moreBrands.addEventListener('click', function () {
		const brands = document.querySelector('.brends__wrap');
		if (!moreBrands.classList.contains('brends__more-visible')) {
			brands.style.height = '720px';
			setTimeout(toggleArrow, 500);
			moreBrands.innerHTML = 'Свернуть';
		} else {
			brands.style.height = '';
			setTimeout(toggleArrow, 500);
			moreBrands.innerHTML = 'Показать больше';
		}

	});

	function toggleArrow() {
		moreBrands.classList.toggle('brends__more-visible');
	}


	//Фиксированное меню

	const nav = document.querySelector('.header__nav');
	document.addEventListener('scroll', function () {
		if (window.pageYOffset >= 800) {
			nav.classList.add('fixed');
		} else {
			nav.classList.remove('fixed');
		}
	});


	// Tiny slider  https://github.com/ganlanyuan/tiny-slider

	const slider = tns({
		container: '.works__slider',
		// mode:'gallery',
		speed: 500,
		items: 1,
		slideBy: 'page',
		controls: false,
		nav: false,
		autoplay: true,
		mouseDrag: true,
		autoplayButtonOutput: false
	});

	document.querySelector('.works__prev').addEventListener('click', () => slider.goTo('prev'));
	document.querySelector('.works__next').addEventListener('click', () => slider.goTo('next'));

	//Slider for mobile

	const aboutSlider1 = tns({
		container: '.js-about-us__img-slider-1',
		// mode:'gallery',
		speed: 500,
		items: 1,
		slideBy: 'page',
		controls: false,
		nav: true,
		navPosition: 'bottom',
		autoplay: true,
		mouseDrag: true,
		autoplayButtonOutput: false
	});
	const aboutSlider2 = tns({
		container: '.js-about-us__img-slider-2',
		// mode:'gallery',
		speed: 500,
		items: 1,
		slideBy: 'page',
		controls: false,
		nav: true,
		navPosition: 'bottom',
		autoplay: true,
		mouseDrag: true,
		autoplayButtonOutput: false
	});

	//замена ссылки

	btnToHref();
	changeMunu();

	// При изменении размера

	window.onresize = function (event) {
		btnToHref();
		changeMunu();
	};

	//меняем текст в пунктах меню
	function changeMunu(){
		const menuLinks = document.querySelectorAll('.menu__link');
		menuLinks.forEach(link => {
			let linkText = link.textContent;
			if (window.innerWidth < 767){
				if(linkText == 'Узнать стоимость') {
					link.textContent = 'Получить 15 тысяч в подарок';
				}
				if(linkText == 'Отзывы') {
					link.textContent = 'Карта';
				}
				
			} else {
				if(linkText == 'Получить 15 тысяч в подарок') {
					link.textContent = 'Узнать стоимость';
				}
				if(linkText == 'Карта') {
					link.textContent = 'Отзывы';
				}
			}
		});
	}
	//замена ссылки
	function btnToHref(){
		const phoneBtn = document.querySelectorAll('.js-phone-btn-mobile');
		const hrefBtn = document.querySelector('.js-button-href');
		const formBtn = document.querySelector('a.js-open-form');
		phoneBtn.forEach(btn => {
			if (window.innerWidth < 767) {
				btn.setAttribute('onclick', 'location.href="tel:8275283758";');
			} else {
				btn.removeAttribute('onclick');
			}

		});
		if (window.innerWidth < 767) {
			formBtn.setAttribute('href', 'tel:8275283758');
			hrefBtn.setAttribute('href', 'tel:8275283758');
			hrefBtn.removeAttribute('target');
		} else {
			formBtn.setAttribute('href', '#form');
			hrefBtn.setAttribute('href', 'https://mrqz.me/5ceebf2bf1cffa00449b5b12');
			hrefBtn.setAttribute('target', '_blank');
		}
	}
	//Lazy Load

	[].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
		img.setAttribute('src', img.getAttribute('data-src'));
		img.onload = function () {
			img.removeAttribute('data-src');
		};
	});

	//TIMER

	function initializeTimer() {
		const endDate = new Date(2022, 11, 14, 20, 0, 0); // от номера месяца отнимаем 1

		let currentDate = new Date();
		let seconds = (endDate - currentDate) / 1000;
		if (seconds > 0) {
			let minutes = seconds / 60;
			let hours = minutes / 60;
			let days = hours / 24;
			minutes = (hours - Math.floor(hours)) * 60;
			days = Math.floor(days);
			hours = Math.floor(hours) - days * 24;

			seconds = Math.floor((minutes - Math.floor(minutes)) * 60);
			minutes = Math.floor(minutes);

			setTimePage(days, hours, minutes, seconds);

			function secOut() {
				if (seconds == 0) {
					if (minutes == 0) {
						if (hours == 0) {
							if (days == 0) {
								showMessage(timerId);
							} else {
								days--;
								hours = 24;
								minutes = 59;
								seconds = 59;
							}
						} else {
							hours--;
							minutes = 59;
							seconds = 59;
						}
					} else {
						minutes--;
						seconds = 59;
					}
				} else {
					seconds--;
				}
				setTimePage(days, hours, minutes, seconds);
			}
			let timerId = setInterval(secOut, 1000);
		} else {
			alert("Установленая дата уже прошла");
		}
	}

	window.onload = function () {
		initializeTimer();
	};

	function setTimePage(d, h, m, s) {
		const days = document.querySelectorAll('[data-id=days]');
		const hours = document.querySelectorAll('[data-id=hours]');
		const minutes = document.querySelectorAll('[data-id=minutes]');
		const seconds = document.querySelectorAll('[data-id=seconds]');

		days.forEach(day => day.innerHTML = d);
		hours.forEach(hour => hour.innerHTML = h);
		minutes.forEach(minute => minute.innerHTML = m);
		seconds.forEach(second => second.innerHTML = s);

	}

});

$(document).ready(function () {

	if ($(window).width() > 767) {
		$('.js-about-us-1').magnificPopup({
			items: [{
					src: './img/about_us_slider-1.jpg'
				},
				{
					src: './img/about_us_slider-2.jpg'
				},
				{
					src: './img/about_us_slider-3.jpg'
				},
				{
					src: './img/about_us_slider-4.jpg'
				},
				{
					src: './img/about_us_slider-5.jpg'
				},
				{
					src: './img/about_us_slider-6.jpg'
				},
				{
					src: './img/about_us_slider-7.jpg'
				}

			],
			gallery: {
				enabled: true
			},
			type: 'image' // this is a default type
		});
		$('.js-about-us-2').magnificPopup({
			items: [{
					src: './img/about_us-slider2-5.jpg'
				},
				{
					src: './img/about_us-slider2-2.jpg'
				},
				{
					src: './img/about_us-slider2-3.jpg'
				},
				{
					src: './img/about_us-slider2-4.jpg'
				},
				{
					src: './img/about_us-slider2-1.jpg'
				}


			],
			gallery: {
				enabled: true
			},
			type: 'image' // this is a default type
		});
	}


	// Модальное окно

	$('.js-open-form').magnificPopup({
		// type: 'inline',
		preloader: false,
		// closeBtnInside:true,
		showCloseBtn: true,
		focus: '#name',
		disableOn: function () {
			if ($(window).width() < 767) {
				return false;
			}
			return true;
		},
		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function () {
				if ($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = '#name';
				}
			}
		}
	});

	//Отправка почты

	$("#form").on('submit', function (e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mail.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$("#form").hide();
			document.location = "thanks.html";

		});
		return false;
	});


});