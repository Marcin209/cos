/**
 * Created by msobczak on 8/23/2016.
 */
// $(function() {
//
//
//     var mapa = $("#map").goMap({
//         latitude: 51.000000,
//         longitude: 17.000000,
//         zoom: 19,
//         maptype: 'ROADMAP',
//         navigationControl: false,
//         mapTypeControl: false,
//         scrollwheel: true,
//         disableDoubleClickZoom: true,
//         markers: [{
//             latitude: 51.103316,
//             longitude: 17.028387,
//             title: 'marker title 1',
//             id: 'marker1',
//             draggable: false,
//
//         },
//             {
//                 latitude: 51.103309,
//                 longitude: 17.028414,
//                 title: 'marker title 2',
//                 id: 'marker2',
//                 draggable: false
//             }
//         ]
//     });
//
//     var p1 = new google.maps.LatLng(mapa.markers[0].latitude, mapa.markers[0].longitude);
//     var p2 = new google.maps.LatLng(mapa.markers[1].latitude,mapa.markers[1].longitude);
//
//     function calcDistance(p1, p2) {
//         return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
//     }
//
//     $("#info").click(function(){
//         alert(calcDistance(p1, p2));
//
//     });
//
// });