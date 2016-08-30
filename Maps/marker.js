/**
 * Created by msobczak on 8/23/2016.
 */


var elevation ;
var azimut ;
var obj;

function loadJSON(url) {

    $.ajax({
        type: 'GET',
        url: url,
        dataType: "json",

        success: function (json_obj) {
            //  elevation = json_obj.Elevation;
            //azimut =json_obj.Azimut;
           callbacks.ok(json_obj);
           // obj = json_obj;
           //  cb(json_obj);

        },
        error: function () {
           callbacks.nie();
            // console.log("nie");
        }

    });

}

//
var callbacks = {
    ok: function (data) {
        elevation=data.Elevation;
        azimut=data.Azimut;

        console.log(elevation);
    },
    nie: function () {
        console.log('error');
    }
};

// function dzialaj(json_obj)
// {
//     // console.log(json_obj);
//     elevation=json_obj.Elevation;
//     azimut=json_obj.Azimut;
// }


function initMap() {
  

    //Tablica przechowujaca markery
    var markers = [];

    // Nazwy markerow w postaci liter z alfabetu Opcja
    // var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    // index nadaje label markerom
    var index = 0;

    // zmienna przechowywujaca wspolrzedene punktu do ktorego zoomujemy mape
    var myLatlng = {lat: 51.103316, lng: 17.028387};

    // Tu tworzymy nasza mape
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: myLatlng,
        disableDefaultUI: false,
        marker: markers
    });

    //Funkcja tworzaca nasz Pin Markera na mapie
    function pinSymbol(color) {
        return {
            path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
            fillColor: color,
            fillOpacity: 1,
            strokeColor: '#000',
            strokeWeight: 1,
            scale: 1
        };
    }

    //Fuunkcja dodajaca Okno czyli dwa markery
    function addWindow() {
        var marker = new MarkerWithLabel({
            position: {lat: 51.103316 + index * 0.000020, lng: 17.028387 + index * 0.000020},
            labelContent: (index+1).toString(),
            labelClass: "labels",
            labelAnchor: new google.maps.Point(9, 35),
            labelInBackground: false,
            icon: pinSymbol('red'),
            map: map,
            draggable: true,
            title: 'Info:'

        });

        var marker2 = new MarkerWithLabel({
            position: {lat: 51.103313 + (index) * 0.000020, lng: 17.028405 + (index) * 0.000020},
            labelContent: (index+1).toString(),
            labelClass: "labels",
            labelAnchor: new google.maps.Point(9, 35),
            labelInBackground: false,
            icon: pinSymbol('red'),
            map: map,
            title: 'Info:',
            draggable: true
        });

        markers.push(marker);
        markers.push(marker2);

        addInfoWindow(markers[index*2],markers[(index*2)+1],index);


        dataSource1.add({
            id:index+1,
            wsp:marker.position,
            wsk:marker2.position,
            od: calcDistance(markers[index*2].position, markers[(index*2)+1].position),
            zn: ''
        });
        index++;

    }
    function znak(marker, marker2) {
            var lng = marker.getPosition().lng();
            var lat = marker.getPosition().lat();
            var elevation_mark ;

            var url = "http://compute-informations-about-sun.azurewebsites.net/api/SunVector/GetSunVector?date=2016-08-13T08%3A11%3A12%2B02%3A00&latitude=" + lat + "&longitude=" + lng;
             loadJSON(url);
            elevation_mark = elevation;
            //var azimut_mark = azimut;

            console.log(url);
            console.log(elevation_mark);


            //dalej rozwijamy o dwwa markery
            var lng2 = marker2.getPosition().lng();
            var lat2 = marker2.getPosition().lat();
            var url2 = "http://compute-informations-about-sun.azurewebsites.net/api/SunVector/GetSunVector?date=2016-08-13T08%3A11%3A12%2B02%3A00&latitude=" + lat2 + "&longitude=" + lng2;
            loadJSON(url2);
              var elevation_mark2 = elevation;
           // var azimut_mark2 = azimut;
            console.log(url2);
            console.log(elevation_mark2);


            //
            // console.log("elewacja 1 : "+elevation_mark);
            // console.log("azimut 1 :" +azimut_mark);

            // var url = "http://compute-informations-about-sun.azurewebsites.net/api/SunVector?date=2016-08-13T08%3A11%3A12%2B02%3A00&latitude=57&longitude=12";
            //
            // console.log("elewacja 2 : "+elevation_mark2);
            // console.log("azimut 2 :" +azimut_mark2);


            if (elevation_mark >= 0.0 && elevation_mark2 >= 0.0) {
                console.log("el 1 " + elevation_mark + " el 2 " + elevation_mark2 + " +");
                return '+';
            }
            else
                console.log("el 1 " + elevation_mark + " el 2 " + elevation_mark2 + "-");

            return '-';

        }

    function addInfoWindow(marker,marker2,id1) {
        google.maps.event.addListener(marker, 'click', function () {
            var infoWindow = new google.maps.InfoWindow({
                content: '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">Okno '+ id1 +'</h1>'+
                '<div id="bodyContent">'+
                '<p> Szeroksoc okna :' + calcDistance(marker.position, marker2.position) +' [m]</p>' +
                //'<p> Wektor slonca : ' + znak(marker,marker2) + '</p>' +
                 '</div>' +'</div>'
            });
            infoWindow.open(map, marker);
        });

        google.maps.event.addListener(marker2, 'click', function () {
            var infoWindow2 = new google.maps.InfoWindow({
                content: '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">Okno '+ id1 +'</h1>'+
                '<div id="bodyContent">'+
                '<p> Szeroksoc okna :' + calcDistance(marker.position, marker2.position) +' [m]' +
            //    '<p> Wektor slonca : ' + znak(marker,marker2) + '</p>' +
                '</div>' +'</div>'
            });
            infoWindow2.open(map, marker2);
        });
    }

    function refresh(){
        for (var j=0; j<(index) ; j++) {
            dataSource1.pushUpdate({
                id: j+1,
                wsp: markers[(j*2)].position,
                wsk: markers[(j*2)+1].position,
                od: calcDistance(markers[j*2].position, markers[(j*2)+1].position),
                zn: znak(markers[(j*2)],markers[(j*2)+1])
            });
        }
    }
    

    function calcDistance(p1, p2) {
        var od = google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(2);
        return od;
    }

    document.getElementById("add").onclick = function () {
        addWindow();
        //Po dodaniu nowgo elementu uaktualniane sa wartosci w gridzie
        //refresh();
    };
    document.getElementById("refresh").onclick = function () {
        refresh();
    };
    function sprawdz() {


    }

    document.getElementById("info").onclick = function () {
      sprawdz();

    };
    var dataSource1 = new kendo.data.DataSource({
            schema: {
                model: {
                    id: '',
                    wsp: '',
                    wsk: '',
                    od: '',
                    zn: ''
                }
            }
        });





    $(document).ready(function () {
        $("#grid").kendoGrid({
            dataSource: dataSource1,
            height: 550,
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [{
                field: "id",
                title: "Okno"
            }, {
                field: "wsp",
                title: "Ws pocz"
            }, {
                field: "wsk",
                title: "ws konc"
            }, {
                field: "od",
                title: "Odleglosc [m]"
            }, {
                field: "zn",
                title: "+ / -"
                }]
        });
    });
}
