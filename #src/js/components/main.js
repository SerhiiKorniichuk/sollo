$('.header-mob-menu-btn').on('click', function(e) {
	e.preventDefault()
	$(this).toggleClass('_active')
	$('.header__mob-info').slideToggle('fast')
})


$('button[data-popup]').on('click', function (e) {
	e.preventDefault()
	let attrVal = $(this).data('popup')
	$(`div[data-popup='${attrVal}']`).addClass('_active')
})

$('.popup').find('.popup-btn-close').on('click', function () {
	$(this).closest('div.popup').removeClass('_active')
})


$(document).mouseup(function (e) {

	const target = e.target		
	const popup = '.popup'

	if ($(target).is('.popup._active') && $(popup).has(target).length === 0) {
		$(target).removeClass('_active')
	}
})


$(window).resize(function() {

	const window_width = $(window).width();

	if(window_width >= 769) {
		$('.header-mob-menu-btn').removeClass('_active')
		$('.header__mob-info').css({'display': 'none'})
	}
})