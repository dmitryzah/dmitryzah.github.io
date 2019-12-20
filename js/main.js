window.addEventListener('DOMContentLoaded', () => {

  //Hamburger

  const menu = document.querySelector('.header__top'),
    menuItem = document.querySelectorAll('.main-menu__item'),
    hamburger = document.querySelector('.hamburger');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    menu.classList.toggle('is_active');
  });

  menuItem.forEach(item => {
    item.addEventListener('click', () => {
      hamburger.classList.toggle('is-active');
      menu.classList.toggle('is_active');
    });
  });

  //Плавная прокрутка

  const anchors = document.querySelectorAll('a.main-menu__link')

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()

      const blockID = anchor.getAttribute('href')

      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
  }

//Lazy Load

[].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = function () {
    img.removeAttribute('data-src');
  };
});

  //Swiper slider

  const mySwiper = new Swiper('.swiper-container', {
    // Optional parameters
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      // when window width is >= 320px
      420: {
        slidesPerView: 2
      },
      // when window width is >= 480px
      620: {
        slidesPerView: 3,
      },
      // when window width is >= 640px
      900: {
        slidesPerView: 4
      }
    }

  });

  //Прокрутка страницы вверх

  const topPage = document.querySelector('.header'),
    pageUpBtn = document.querySelector('.pageup');

  window.addEventListener('scroll', function () {
    if (window.pageYOffset > 600) {
      pageUpBtn.style.display = 'flex';
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

  //circular progress bar Counter  start

  var circleProgress = (function (selector) {
    var wrapper = document.querySelectorAll(selector);
    Array.prototype.forEach.call(wrapper, function (wrapper, i) {
      var wrapperWidth,
        wrapperHeight,
        percent,
        innerHTML,
        context,
        lineWidth,
        centerX,
        centerY,
        radius,
        newPercent,
        speed,
        from,
        to,
        duration,
        start,
        strokeStyle,
        text;

      var getValues = function () {
        wrapperWidth = parseInt(window.getComputedStyle(wrapper).width);
        wrapperHeight = wrapperWidth;
        percent = wrapper.getAttribute('data-cp-percentage');
        innerHTML = '<span class="percentage"><strong>' + percent + '</strong> %</span><canvas class="circleProgressCanvas" width="' + (wrapperWidth * 2) + '" height="' + wrapperHeight * 2 + '"></canvas>';
        wrapper.innerHTML = innerHTML;
        text = wrapper.querySelector(".percentage");
        canvas = wrapper.querySelector(".circleProgressCanvas");
        wrapper.style.height = canvas.style.width = canvas.style.height = wrapperWidth + "px";
        context = canvas.getContext('2d');
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        newPercent = 0;
        speed = 1;
        from = 0;
        to = percent;
        duration = 3000;
        lineWidth = 30;
        radius = canvas.width / 2 - lineWidth;
        strokeStyle = wrapper.getAttribute('data-cp-color');
        start = new Date().getTime();
      };

      function animate() {
        requestAnimationFrame(animate);
        var time = new Date().getTime() - start;
        if (time <= duration) {
          var x = easeInOutQuart(time, from, to - from, duration);
          newPercent = x;
          text.innerHTML = Math.round(newPercent) + " %";
          drawArc();
        }
      }

      function drawArc() {
        var circleStart = 1.5 * Math.PI;
        var circleEnd = circleStart + (newPercent / 50) * Math.PI;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        context.arc(centerX, centerY, radius, circleStart, 4 * Math.PI, false);
        context.lineWidth = lineWidth;
        context.strokeStyle = "#ddd";
        context.stroke();
        context.beginPath();
        context.arc(centerX, centerY, radius, circleStart, circleEnd, false);
        context.lineWidth = lineWidth;
        context.strokeStyle = strokeStyle;
        context.stroke();

      }
      var update = function () {
        getValues();
        animate();
      }
      update();

      var resizeTimer;
      window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          clearTimeout(resizeTimer);
          start = new Date().getTime();
          update();
        }, 250);
      });
    });

    //
    // http://easings.net/#easeInOutQuart
    //  t: current time
    //  b: beginning value
    //  c: change in value
    //  d: duration
    //
    function easeInOutQuart(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
      return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    }

  });

  // circleProgress('.counter');   //запуск прогресс бара

  //circular progress bar Counter  end

  // Включить circular progress bar Counter , когда элемент в зоне видимости start

  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  const progressBar = document.querySelector('.counter');
  let oneTime = 0; //чтобы заполнялась только 1 раз, когда мы ее видим
  window.addEventListener('scroll', function () {
    if (isElementInViewport(progressBar) && !oneTime) {
      oneTime++;
      circleProgress('.counter');
    }
  });

  // Включить circular progress bar Counter , когда элемент в зоне видимости  end

});



// jQuery

// $(document).ready(function(){
// 	$('.header__background-video').bgVideo({fadeIn: 2000});
// });