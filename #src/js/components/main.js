$('.header-mob-menu-btn').on('click', function(e) {
	e.preventDefault()
	$(this).toggleClass('_active')
	$('.header__mob-info').slideToggle('fast')
})



$(window).resize(function() {

	const window_width = $(window).width();

	if(window_width >= 769) {
		$('.header-mob-menu-btn').removeClass('_active')
		$('.header__mob-info').css({'display': 'none'})
	}
})