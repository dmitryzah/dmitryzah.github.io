$(document).ready(function() {

    var ww = document.body.clientWidth;  // ширина экрана

	//Выпадающие города

	// $(".town").hover(
	// 	function(){
	// 		// $(".towns").show();
	// 		$(this).addClass("active");
 //            $(".towns").stop(true, true);
 //            $(".towns").slideDown();
	// 	},
	// 	function(){
	// 		// $(".towns").hide();
 //            $(".towns").slideUp('slow');
	// 		$(this).removeClass("active");
	// 	}
	// );



	// $(".towns").hover(
	// 	function(){
	// 		// $(".towns").show();
	// 		$(".town").addClass("active");
 //            $(this).stop(true, true);
 //            $(this).show();
	// 	},
	// 	function(){
	// 		// $(".towns").hide();
	// 		$(".town").removeClass("active");
 //            $(this).slideUp('slow');
	// 	}
	// );

    //города по клику 

     $('.town').click(function() {
        if($(this).hasClass("active")){
            $(this).removeClass("active");
            $(".towns").slideUp(200);
        } else {
            $(this).addClass("active");
            $(".towns").slideDown(200);
        } ;
    });


	//Партнеры-отзывы

	$(".tabs").lightTabs();


	//Фиксированное меню


	var $menu = $("nav");

        $(window).scroll(function(){
            if ( $(this).scrollTop() > 400 && $menu.hasClass("default") ){
                $menu.removeClass("default").addClass("fixed");
            } else if($(this).scrollTop() <= 400 && $menu.hasClass("fixed")) {
                $menu.removeClass("fixed").addClass("default");
            }
        });//scroll


        //Раскрывающееся меню ТИПЫ УСЛУГ

    // $("#types-list ul")
    //     .hide()
    //     .click(function(event) {
    //         event.stopPropagation();
    //     });


    $('#types-list > li> a').click(function() {
        if($(this).parent().hasClass("active")){
            $(this).parent().removeClass("active").find('ul').slideUp(200);
            return false;
        } else if($(this).parent().find('ul').length){
            $(this).parent().addClass("active").find('ul').slideDown(200);
            return false;
        } return false;
    });

    //PopUp Login-form

    $("#popup").hide();

    $(".header-top .login").click(function(){
        $("#popup").show();
    });

    $("#popup .login-form .close").click(function(){
        $("#popup").hide();
    });

    // lang-toggle

    
    if(ww < 795){
        $(".toggle-lang-wrap .lang").hide();
    }
    $(window).resize(function(){
        $(".toggle-lang-wrap .lang").removeAttr("style");
    });
    $(".toggle-lang").click(function(e){
        e.preventDefault();
        $(".toggle-lang-wrap .lang").toggle();
    });


    //login-toggle

    $(window).resize(function(){
        $(".header-top .log-nav").removeAttr("style");
    });
    $(".toggle-log").click(function(e){
        e.preventDefault();
        $(".header-top .log-nav").toggle();
    });

    //nav-toggle

    $(window).resize(function(){
        $(".main-header nav ul").removeAttr("style");
    });
    $(".toggle-nav").click(function(e){
        e.preventDefault();
        $(".main-header nav ul").toggle();
    });

    // hide request and calc

    if(ww < 430) {
        $(".request a").text("Заявка");
        $(".calc a").text("Рассчитать");
    }
    $(window).resize(function(){
        var ww = document.body.clientWidth;
        if(ww < 430) {
        $(".request a").text("Заявка");
        $(".calc a").text("Рассчитать");
        }else {
            $(".request a").text("Сделать заявку");
            $(".calc a").text("Калькулятор стоимости");
        }
    });

});

(function($){				
    jQuery.fn.lightTabs = function(options){

        var createTabs = function(){
            tabs = this;
            i = 0;
            
            showPage = function(i){
                $(tabs).children("div").children("div").hide();
                $(tabs).children("div").children("div").eq(i).show();
                $(tabs).children("div").children("h2").removeClass("active");
                $(tabs).children("div").children("h2").eq(i).addClass("active");
            }
                                
            showPage(0);				
            
            $(tabs).children("div").children("h2").each(function(index, element){
                $(element).attr("data-page", i);
                i++;                        
            });
            
            $(tabs).children("div").children("h2").click(function(){
                showPage(parseInt($(this).attr("data-page")));
            });				
        };		
        return this.each(createTabs);
    };	
})(jQuery);