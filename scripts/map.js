function initMap() {

    const data = {
        center: {
            lat: 51.0856401,
            lng: 17.0107958
        },
        zoom: 15
    }

    const map = new google.maps.Map(document.querySelector('.mapframe'), data);

    const request = {
        query: 'Kościół Kierunek',
        fields: ['geometry']
    };

    function createMarker(place) {
        const marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
        });
    }

    const service = new google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK){
            results.forEach(result => createMarker(result));
        }
    });
}