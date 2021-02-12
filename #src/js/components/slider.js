const section_reviews_swiper = new Swiper('#section_reviews .swiper-container', {

	loop: true,
	slidesPerView: 3,
	autoHeight: true,
	centeredSlides: true,
	centeredSlidesBounds: true,

	pagination: {
	  el: '#section_reviews .swiper-pagination',
	  clickable: true
	},
  
	navigation: {
	  nextEl: '#section_reviews .swiper-button-next',
	  prevEl: '#section_reviews .swiper-button-prev',
	},
  
});