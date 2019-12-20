$(document).ready(function() {

//Наведение мыши на дом

$('.zoom').mouseover(function(){
	$('.zoom_img',this).css('transform', 'scale(1.0, 1.0)').css('opacity', 1);
}).mouseout(function(){
	$('.zoom_img',this).css('transform', 'scale(0.5, 0.5)').css('opacity', 0.01);
});

//Высота блока с картинкой в advantages

var imgHeight = $('.advantages img').height();
$('.adv_desc').height(imgHeight);
//При изменении размера экрана

$(window).resize(function(){
        imgHeight = $('.advantages img').height();
        $('.adv_desc').height(imgHeight);
    });

//Слайдер каталог проектов

   $('.projects .bxslider').bxSlider({
        nextSelector: '.pj_next, .arrow-next', //Эти блоки в верстке добавляем вручную
        prevSelector: '.pj_prev, .arrow-prev', //и им назначаем фунции управления
        nextText: ' ',
        prevText: ' '
    });

   //Подгрузка ппроектов в каталог при клике

     var projects = {};

    $.getJSON("settings/projects.json", function(data) {
        projects = data;

        $('*[data-action=open_project]').click(function() {
            var id = $(this).data('id');
            $.ajax({
                type: "POST",
                url: "ajax/options.php",
                data: projects[id],
                cache: false,
                success: function(response) {
                    $('#project-content').html(response);  //Содержимое модального окна
                    $('#project-content form.sender').cl_sender();  //Отправка формы на почту sender.js
                    $("input[name=phone]").mask('9 (999) 999-99-99');  //Маска телефона maskedinput.js
                    $('#project-content').modal('show');  //Модальное окно Bootstrap
					
					checkform();
					
                }
            })
        });
    });

//Включаем анимацию при скролле

var mobile = navigator.userAgent.toLowerCase().match(/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i);
if(mobile != null) {
	$('html').css('width', window.innerWidth + 'px');
} else {
	$('head').append('<link rel="stylesheet" href="css/animations.css" />');
	$('head').append('<style>.animation{visibility:hidden}</style>');
	$('.scroll-animate').each(function () {
		var block = $(this);
		$(window).scroll(function() {
			var top = block.offset().top;
			var bottom = block.height()+top;

			top = top - $(window).height() + 100;
			var scroll_top = $(this).scrollTop();
			if ((scroll_top > top) && (scroll_top < bottom)) {
				if (!block.hasClass('animate')) {
					block.addClass('animate');
					block.trigger('animateIn');
				}
			} else {
				block.removeClass('animate');
				block.trigger('animateOut');
			}
		});
	});
//Коды анимации
/*
$('.dw1').on('animateIn', function() {
			var inter = 0;
			$(this).find('.animation').each(function() {
				var block = $(this);
				setTimeout(function() {
					block.addClass('fadeInRight');
				}, inter*200);
				inter++;
			});
		}).on('animateOut', function() {
			$(this).find('.animation').each(function() {
				$(this).removeClass('fadeInRight');
			});
		});

		$('.dw2').on('animateIn', function() {
			var inter = 0;
			$(this).find('.animation').each(function() {
				var block = $(this);
				setTimeout(function() {
					block.addClass('fadeInLeft');
				}, inter*200);
				inter++;
			});
		}).on('animateOut', function() {
			$(this).find('.animation').each(function() {
				$(this).removeClass('fadeInLeft');
			});
		});

		$('#projects').on('animateIn', function() {
			$(this).find('.wrap').addClass('fadeInDown');
		}).on('animateOut', function() {
            $(this).find('.wrap').removeClass('fadeInDown');
		});

		$('.techs').on('animateIn', function() {
			var inter = 0;
			$(this).find('.animation').each(function() {
				var block = $(this);
				setTimeout(function() {
					block.addClass('expandOpen');
				}, inter*200);
				inter++;
			});
		}).on('animateOut', function() {
			$(this).find('.animation').each(function() {
				$(this).removeClass('expandOpen');
			});
		});

		$('.period').on('animateIn', function() {
			var inter = 0;
			$(this).find('.animation').each(function() {
				var block = $(this);
				setTimeout(function() {
					block.addClass('fadeInDown');
				}, inter*200);
				inter++;
			});
		}).on('animateOut', function() {
			$(this).find('.animation').each(function() {
				$(this).removeClass('fadeInDown');
			});
		});
*/

};
//Анимация зума

$('.house').on('animateIn', function() {
	var inter = 0;
	$(this).find('.animation').each(function() {
		var block = $(this);
		setTimeout(function() {
			block.addClass('expandOpen');
		}, inter*200);
		inter++;
	});
}).on('animateOut', function() {
	$(this).find('.animation').each(function() {
		$(this).removeClass('expandOpen');
	});
});

/*
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
	*/
	
	
});