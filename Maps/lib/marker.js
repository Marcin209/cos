/**
 * Created by msobczak on 8/23/2016.
 */


function initMap() {
    var markers = [];

    var myLatlng = {lat: 51.1032725, lng: 17.0284586999};



    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: myLatlng,
        disableDefaultUI: false
    });

    map.event.addListener(map, 'click', function (event) {
        addMarker(event.latLng);
    });
    addMarker(myLatlng);


    function addMarker(location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        markers.push(marker);
    }

    function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    }


    function clearMarkers() {
        setMapOnAll(null);
    }


    function showMarkers() {
        setMapOnAll(map);
    }


    function deleteMarkers() {
        clearMarkers();
        markers = [];
    }

}




    // var marker = new google.maps.Marker({
    //     position: myLatlng,
    //     map: map,
    //     title: 'Click to zoom'
    // });
    // var marker2 = new google.maps.Marker({
    //     position: myLatlng2,
    //     map: map,
    //     title: 'Click to zoom'
    // });
    //
    //
    //
    // marker.addListener('click', function() {
    //     map.setZoom(19);
    //     map.setCenter(marker.getPosition());
    // });
    // marker2.addListener('click', function() {
    //     map.setZoom(19);
    //     map.setCenter(marker2.getPosition());
    // });
