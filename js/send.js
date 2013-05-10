$(function(){
	var mylat,mylong;
		if (navigator.geolocation) {
	    // Locate position
	        navigator.geolocation.getCurrentPosition(displayPosition, errorFunction);
	    } else {
	         alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
	    }
	    function displayPosition(pos){
		    	mylat = pos.coords.latitude;
		    	mylong = pos.coords.longitude;
	    	}
    	function errorFunction(pos) {alert('Error!');}

    	

	$('#submit').on('click',function(){
		var art = $('#articulo').val();
		var desc = $('#descripcion').val();
		var temp = $('#tiempo').val();
		var tlf= $('#telefono').val();
		//mylat =40,
     	//mylong=3;


    	// Store my position (“y=mylat”, “x=mylong”) in variable “lating”

		var pedido = {articulo:art, descipcion:desc,tiempo:temp,telefono:tlf,latitud:mylat,longitud:mylong};
		console.log(pedido);
		var jsone = JSON.stringify(pedido);
		//envia pedido
	});
});