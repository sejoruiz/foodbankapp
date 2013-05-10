
$(function(){
 // Inicio y recibir del socket
 var arrayMessages=[];
 var i=0;
 $('#index').show();
 $('#mapa').hide();
 $('#send').hide();
 var client = new WebSocket("ws://172.16.5.65:4000", "broadcast-protocol");
//evento llegan cosas por el socket
    client.onmessage= function(event){
    	var message = JSON.parse(event.data);
    	arrayMessages.push(message);

        $('#lista').append('<div class="listItem" id="' + i + '"><p> Articulo: ' + message.articulo  + " Tiempo restante: " + message.tiempo + '</p></div>');
        $('#'+i).click(function () {

           $('#index').hide();
           $('#send').hide();
           $('#mapa').show();

           var i = parseInt($(this).attr('id'));
           var lati=(arrayMessages[i].latitud || 40.4519812);
           var longi=(arrayMessages[i].longitud || -3.7266664);
           var tlf=arrayMessages[i].telefono;
		 	$('#locationinfo').html('<p>La longitud es :' +
        				longi + ' y la latitud es ' + lati+ '>');
		 	$('#tiempo').html('<p>El tiempo disponible para la recogida es: '+ arrayMessages[i].tiempo +'</br>');

           displayPosition(lati, longi,tlf);
        });
        i++;
    };

	$('#enviar').click(function (){
		$('#index').hide();
        $('#send').show();
        $('#mapa').hide();
	});

var mylat,mylong;
		if (navigator.geolocation) {
	    // Locate position
	        navigator.geolocation.getCurrentPosition(displayPosition2, errorFunction);
	    } else {
	         alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
	    }
	    function displayPosition2(pos){
		    	mylat = pos.coords.latitude;
		    	mylong = pos.coords.longitude;
	    	}
    	function errorFunction(pos) {alert('Error!');}
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


	$('#submit').on('click',function(){
		var art = $('#articulo').val();
		var desc = $('#descripcion').val();
		var temp = $('#tiempo').val();
		var tlf= $('#telefono').val();


		var pedido = {articulo:art, descipcion:desc,tiempo:temp,telefono:tlf,latitud:mylat,longitud:mylong};
		console.log(pedido);
		var jsone = JSON.stringify(pedido);
		client.send(jsone);

        alert('gracias por ayudar!');
	});
  $('#butContactar').on('click',function(){
        var call= tel.dial(tlf);
    });

});

