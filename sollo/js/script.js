$(document).ready(function() {

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
	const section_reviews_swiper = new Swiper('#section_reviews .swiper-container', {

	loop: true,
	slidesPerView: 3,
	autoHeight: true,

	pagination: {
	  el: '#section_reviews .swiper-pagination',
	  clickable: true
	},
  
	navigation: {
	  nextEl: '#section_reviews .swiper-button-next',
	  prevEl: '#section_reviews .swiper-button-prev',
	},

	breakpoints: {
		0: {
		  slidesPerView: 1.25,

		},
		769: {
		  slidesPerView: 3,
		}
	}
  
});
	// === GOOGLE MAP

function initMap() {
		
	let coordinates = { lat: 50.46807110137982, lng: 30.431033169513142 }

	let map = new google.maps.Map(document.getElementById('map'), {
		zoom: 17,
		center: coordinates,
		disableDefaultUI: true,
	})

	let marker = new google.maps.Marker({
		position: coordinates,
		map: map
	})
}

initMap();

// === GOOGLE MAP /
	
})