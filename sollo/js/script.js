$(document).ready(function() {

	
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

"use strict"

document.addEventListener('DOMContentLoaded', function () {

	const forms = document.querySelectorAll('.form');

	forms.forEach( form => {

		form.addEventListener('submit', formSend);
	
		async function formSend(e) {
			
			e.preventDefault();

			const currentForm = e.target;

			let error = formValidate(currentForm);
			let formData = new FormData(currentForm);
			
			if (error === 0) {

				currentForm.classList.add('_sending');

				let response = await fetch('sendmail.php', {
					method: 'POST',
					body: formData
				});

				if (response.ok) {
					let result = await response.json();
					console.log(result.message);
					document.getElementById('thanks_popup').classList.add('_active');
					currentForm.reset();
					currentForm.classList.remove('_sending');
				} else {
					console.log('Ошибка: Форма не была отправлена');
					currentForm.classList.remove('_sending');
				}
				
			} else {
				console.log('Ошибка: Заполните обязательные поля');
			}
		}

		function formValidate(form) {
			
			let error = 0;
			let formReq = form.querySelectorAll('._req');

			for (let index = 0; index < formReq.length; index++) {
				const input = formReq[index];
				formRemoveError(input);
				
				if (input.getAttribute("type") === "checkbox" && input.checked === false) {
					formAddError(input);
					error++;
				} else {
					if (input.value === '') {
						formAddError(input);
						error++;
					}
				}
			}
			return error;
		}

		function formAddError(input) {
			input.parentElement.classList.add('_error');
			input.classList.add('_error');
		}
		
		function formRemoveError(input) {
			input.parentElement.classList.remove('_error');
			input.classList.remove('_error');
		}
	})
});