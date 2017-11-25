var watchID;
var prevTimeStamp;
var accelerometerOptions = {
    frequency: 2000
}; // Update every 2 seconds
accelerometerOptions.frequency = 3000; //changed my mind - now 3 seconds

//when the page is created...
$(document).on("pagecreate", "#page1", function() {
    //setup listener for the toggle switch
    $("#flipswitch").on("change", function() {
        if ($(this).val() == "on") startSensor();
        else if ($(this).val() == "off") stopSensor();
    });

    //setup listener for the slider
    $("#slider").on("slidestop", function() {
        //the value from the slider is text - it needs to be turned into an integer
        var freq = parseInt($(this).val());

        updateFreq(freq);
    });
});

function startSensor() {
	watchID = navigator.accelerometer.watchAcceleration( accelerometerSuccess, accelerometerError, accelerometerOptions);
}

function stopSensor() {
	navigator.accelerometer.clearWatch(watchID);
	$('#sensorX').val("");
	$('#sensorY').val("");
	$('#sensorZ').val("");
	$('#timestamp').val("");
}

function accelerometerSuccess(acceleration) {
	$('#sensorX').val(acceleration.x);
	$('#sensorY').val(acceleration.y);
	$('#sensorZ').val(acceleration.z);
	// DATE + TIME
    // position.timestamp returuns type domTimeStamp
	var domTimeStamp = acceleration.timestamp;
    // convert domTimeStamp to Date which browsers recognise
    var date = new Date(domTimeStamp);
    // convert to formated time string
    var time = date.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
	$('#timestamp').val(time);
	// Display delay since last accelration packet
	$('#delay').val(domTimeStamp - prevTimeStamp);

	prevTimeStamp = domTimeStamp;
}

function accelerometerError() {
   alert('Error');
}

function updateFreq(freq) {
	//do something to update freq. here.
    // Added code: change frequency to new slider value
    stopSensor();
    accelerometerOptions.frequency = freq; // alter frequency for restart
    startSensor();
	// turn toggle switch on
	$("#flipswitch").val("on").slider("refresh");
}


















//
////----------- CORDOVA ONLOAD ---------------- //
//
//// Cordova device event listener - will not work in browser
//document.addEventListener("deviceready", onDeviceReady, false);
//
//// Cordova device event triggered function
//function onDeviceReady() {
//
//	// Add other event listeners here if needed (pause, resume, backbutton etc)
//
//    // updates display
//	// updateDisplay();
//
//	console.log("device ready");
//}
//
////----------- CORDOVA ONLOAD ---------------- //
//
////----------- HTML ONLOAD ---------------- //
//
//// JQuery ready event listener
//$( document ).ready( onReady );
//// or... $( window ).on( "load", readyFn );
//
//// JQuery DOM loaded event triggered function
//function onReady( jQuery  ) {
//    // MAIN CODE HERE
//    console.log("onReady");
//
//    updateDisplay();
//}
//
////----------- HTML ONLOAD ---------------- //
//
//
//// USE FOR ALL DISPLAY CODE
//function updateDisplay() {
//	$("#linked").text("Text replaced by updateDisplay");
//}
