/**
 * Created by msobczak on 8/23/2016.
 */


function initMap() {
   //Tablica przechowujaca markery
    var markers = [];
    // Nazwy markerow w postaci liter z alfabetu Opcja
    // var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // index nadaje label markerom
    var index = 0;

    // zmienna przechowywujaca wspolrzedene punktu do ktorego zoomujemy mape
    var myLatlng = {lat:  51.103316  , lng: 17.028387 };

    // Tu tworzymy nasza mape
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: myLatlng,
        disableDefaultUI: false,
        marker: markers
    });

    function addMarkers(){
        var marker = new google.maps.Marker({
            position: {lat:  51.103316 + index*0.000020 , lng: 17.028387 +index*0.000020},
            label: index.toString(),
            map: map,
            draggable: true,
            title: 'Click to zoom'
        });
        var marker2 = new google.maps.Marker({
            position: {lat: 51.103313 +(index)*0.000020 , lng: 17.028405 +(index)*0.000020},
            label: (index++).toString(),
            map: map,
            title: 'Click to zoom',
            draggable: true
        });
        markers.push(marker);
        markers.push(marker2);

    }
    function calcDistance(p1, p2) {
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
    }

    document.getElementById("add").onclick = function() {
        addMarkers();
    };
    
    document.getElementById("info").onclick = function() {
        document.getElementById("w1").innerHTML=markers[0].position;
        document.getElementById("w2").innerHTML=markers[1].position;
        document.getElementById("od").innerHTML=calcDistance(markers[0].position,markers[1].position);

    };

   

}
