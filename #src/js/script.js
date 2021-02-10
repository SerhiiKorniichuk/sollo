$(document).ready(function() {


	function initMap() {
		
		let mapCenter = { lat:50.468173542251975, lng: 30.426773870223045}
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

})