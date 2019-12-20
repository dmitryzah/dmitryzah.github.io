// событие сработает когда страница будет загружена.
document.addEventListener('DOMContentLoaded', function () {

	// Tiny slider  https://github.com/ganlanyuan/tiny-slider

	const slider = tns({
		container: '.carousel__inner',
		items: 1,
		slideBy: 'page',
		controls: false,
		nav: false,
		mouseDrag: true
	});

	document.querySelector('.prev').addEventListener('click', () => slider.goTo('prev'));
	document.querySelector('.next').addEventListener('click', () => slider.goTo('next'));

	// Tabs 

	let tab = function () {
		const tabNav = document.querySelectorAll('.catalog__tab'),
			tabContent = document.querySelectorAll('.catalog__content');
		let tabName;
		tabNav.forEach(item => {
			item.addEventListener('click', selectTabNav);
		});

		function selectTabNav() {
			tabNav.forEach(item => {
				item.classList.remove('catalog__tab_active');
				this.classList.add('catalog__tab_active');
				tabName = this.getAttribute('data-tab-name');
				selectTabContent(tabName);
			});
			// console.log(this);
		}

		function selectTabContent(tabName) {
			tabContent.forEach(item => {
				item.classList.contains(tabName) ?
					item.classList.add('catalog__content_active') : item.classList.remove('catalog__content_active');
			});
		}
	};

	tab();

	// Ссылки Подробнее и назад

	const cards = document.querySelectorAll('.catalog-item'),
		buyModal = document.getElementById('order');

	cards.forEach(card => {
		const link = card.querySelector('.catalog-item__link'),
			content = card.querySelector('.catalog-item__content'),
			list = card.querySelector('.catalog-item__list'),
			back = card.querySelector('.catalog-item__back'),
			buyBtn = card.querySelector('.button_mini'),
			cardTitle = card.querySelector('.catalog-item__subtitle');
		link.addEventListener('click', toggleContent);
		back.addEventListener('click', toggleContent);
		buyBtn.addEventListener('click', function (e) {
			e.preventDefault();
			overlay.style.display = 'block';
			buyModal.querySelector('.modal__descr').textContent = cardTitle.textContent;
			buyModal.style.display = 'block';
		});

		function toggleContent(e) {
			e.preventDefault();
			content.classList.toggle('catalog-item__content_active');
			list.classList.toggle('catalog-item__list_active');
		}
	});

	// Модальные окна

	const consultationBtn = document.querySelectorAll('[data-modal=consultation]'),
		overlay = document.querySelector('.overlay'),
		closeBtn = document.querySelectorAll('.modal__close');

	consultationBtn.forEach(btn => {
		btn.addEventListener('click', function (e) {
			e.preventDefault();
			const modalId = this.getAttribute('data-modal');
			const modalElem = document.getElementById(modalId);
			overlay.style.display = 'block';
			modalElem.style.display = 'block';
		});
	});
	closeBtn.forEach(btn => {
		btn.addEventListener('click', function () {
			overlay.style.display = '';
			this.parentNode.style.display = '';
		});
	});
	// overlay.addEventListener('click', () => overlay.style.display = '');

	//Прокрутка страницы вверх

	const topPage = document.querySelector('.promo'),
		pageUpBtn = document.querySelector('.pageup');

	window.addEventListener('scroll', function () {
		if (window.pageYOffset > 600) {
			pageUpBtn.style.display = 'block';
		} else {
			pageUpBtn.style.display = '';
		}
	});

	pageUpBtn.addEventListener('click', (e) => {
		e.preventDefault();
		topPage.scrollIntoView({
			behavior: 'smooth'
		});
	});

	//Отправка форм на почту

	const forms = document.querySelectorAll('form');
	forms.forEach(form => {
		const nameInput = form.querySelector('[name=name]'),
			phoneInput = form.querySelector('[name=phone]'),
			emailInput = form.querySelector('[name=email]'),
			submitBtn = form.querySelector('.button');
		submitBtn.addEventListener('click', function (e) {
			e.preventDefault();
			let inputsArray = {}; // Объявляем объект	
			inputsArray.name = nameInput.value;
			inputsArray.phone = phoneInput.value;
			inputsArray.email = emailInput.value;

			// requestData(inputsArray);
			ajax('mailer/back.php', 'POST', modalThanks, requestData(inputsArray));
			// console.log(requestData(inputsArray));
		});

		function modalThanks() {
			form.querySelectorAll('input').forEach(input => {
				input.value = '';
			});
			form.parentNode.style.display = '';
			document.querySelector('.overlay').style.display = 'block';
			document.getElementById('thanks').style.display = 'block';
			form.reset();
			// console.log(form);
		}
	});

	// скрипты писать сюда

}); //конец главного блока