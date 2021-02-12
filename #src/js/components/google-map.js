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