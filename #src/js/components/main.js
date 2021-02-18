
// === Header mob menu & button

$('.header-mob-menu-btn').on('click', function(e) {
	e.preventDefault()
	$(this).toggleClass('_active')
	$('.header__mob-info').slideToggle('fast')
})

// === Header mob menu & button /


// === Opening popups

$('button[data-popup]').on('click', function (e) {
	e.preventDefault()
	let attrVal = $(this).data('popup')
	$(`div[data-popup='${attrVal}']`).addClass('_active')
})

// === Opening popups /


// === Closing popups on button click

$('.popup').find('.popup-btn-close').on('click', function () {
	$(this).closest('div.popup').removeClass('_active')
})

// === Closing popups on button click /


$(document).mouseup(function (e) {

	// === Closing popups by clicking outside the window

	const target = e.target		
	const popup = '.popup'

	if ($(target).is('.popup._active') && $(popup).has(target).length === 0) {
		$(target).removeClass('_active')
	}

	// === Closing popups by clicking outside the window /

})


$(window).resize(function() {

	const window_width = $(window).width();

	// === Change the display of elements when resizing

	if(window_width >= 769) {
		$('.header-mob-menu-btn').removeClass('_active')
		$('.header__mob-info').css({'display': 'none'})
	}

	// === Change the display of elements when resizing /
	
})