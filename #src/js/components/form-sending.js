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