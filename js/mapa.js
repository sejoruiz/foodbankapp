$(function(){


// Success callback function
function displayPosition(mylat,mylong,tlf) {

    //Load Google Map
    var latlng = new google.maps.LatLng(mylat, mylong);
    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map($("#map_canvas")[0], myOptions); // hacer con document.getElementById sino



    //Add marker actual
    var marker1 = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"Lugar de recogida"
    });
    //Add marker anterior
}

//evento 1
$('#butContactar').on('click',function(){
        var call= tel.dial(tlf);
    });
//evento 3
    $(window).on('beforeunload',function(){

    });

});

// Error callback function
function errorFunction(pos) {
    alert('Error!');
}