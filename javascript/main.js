function getQueryParams() {
    const search = window.location.search;

    if (search === "") return {}

    const params = search.split('?').pop();

    return params.split('&').reduce((hash, current) => {
        const bits = current.split('=');
        hash[bits[0]] = bits[1];

        return hash;
    }, {});
}

// 790796644928-q7g8382df247mb9m2bmdt09m3s5qu3sh.apps.googleusercontent.com
// IKJdJw0J1QP7giJt_84jorVk -- s

// http://darksky.webscript.io/forecast?key=c2a8e9fddd67de169268702d428a554f&latLng=40.7595044,-73.9271643999999

function getWeather(zipcode) {
	const darkSkyKey = 'c2a8e9fddd67de169268702d428a554f';
	new google.maps.Geocoder().geocode({
        'address': zipcode
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            const lat = results[0].geometry.location.lat();
            const lng = results[0].geometry.location.lng();

            const urlToRequest = `http://darksky.webscript.io/forecast?key=${darkSkyKey}&latLng=${lat},${lng}`;
            const data = $.get(urlToRequest);
            data.then(onDataBack);
        } else {
            alert("Geocode was not successful for the following reason: " + status + '. Redirecting you to homepage');
            window.location.href = 'index.html';
        }
    });

}

function onDataBack(response) {
    const data = JSON.parse(response);
    console.log(data);
    const degreesFarenheit = data.currently.temperature;

    const chancePrecip = data.hourly.data[0].precipProbability;
    const percentPrecip = Math.round((chancePrecip * 100) / 10);
    const precipType = data.hourly.data[0].precipType;


    const weatherObjects = [];

    if (precipType === 'rain') {
        weatherObjects.push({
        	imageSrc: 'assets/cloudRain.png', 
        	degrees: degreesFarenheit, 
        	percip: percentPrecip, 
        	message: 'Bring umbrella'
        });
    } else if (precipType === 'snow') {
        weatherObjects.push({
        	imageSrc:'assets/snowflake.png', 
        	degrees: degreesFarenheit, 
        	percip: percentPrecip, 
        	message:'Break out snow boots',
    	});
    } else if (precipType === 'sleet') {
        weatherObjects.push({
        	imageSrc:'assets/snowflake.png', 
        	degrees: degreesFarenheit, 
        	percip: percentPrecip, 
        	message:'Break out snow boots',
    	});
    }
    else {
    	weatherObjects.push({
        	imageSrc: 'assets/sun.png', 
        	degrees: degreesFarenheit, 
        	percip: percentPrecip, 
        	message: 'Rock those shades'
        });
    }

    // } else if //NEED HELP: when precipType doesn't show up (it's an optional field), i want to display sun icon


    const weatherCards = weatherObjects.map(function(currentObj) {

        return `
	<div class="ui centered card clearfix">
	  <div>
	    <img src="${currentObj.imageSrc}" class="cloudRainIcon">
	     <div class="weathertext">${currentObj.degrees} &#8457 / ${currentObj.precip}% Precip.</div>
	  </div>
	  <div class="content">
	    <div class="header">${currentObj.message}</div>
	  </div>
	</div>
	`;
    });

    $('.js-container').append(weatherCards.join('\n'));

}

function displayCalendarEvents(events) {
	console.log(events)
	
	function displayImage(event) {
		if (event.colorId = "11") {
			return 'assets/dress.jpg';
		}
		else if (event.colorId = "10") {
			return 'assets/gym.png';
		}
		else if (event.colorId = "5") {
			return 'casual.png';
		}
	}

	function displayMessage(event) {
		if (event.colorId = "11") {
			return 'Formal attire';
		}
		else if (event.colorId = "10") {
			return 'Bring workout clothes';
		}
		else if (event.colorId = "5") {
			return 'Casual Wear';
		}
	}
			
	function formatDate (date) {
		let formattedDate = date.split('T')[0]
		return formattedDate;
	}

	let date = formatDate(events[0].start.dateTime)

		const formatType = 'h:mm:ss a';
		// const formattedTime = events[0].start.dateTime.split('T')[1];
		
		// const startTimeRaw = formattedTime.split('-')[0]
		
		// const startTimeFormatted = startTimeRaw.split(':')[0] + ":" + startTimeRaw.split(':')[1]
		// console.log(startTimeFormatted)
		
	 	const eventObjects = Array.apply(null, Array(6)).map((curr, index) => {
	 		return {
	 			imageSrc: displayImage(events[index]),
        name: events[index].summary,
        time: moment(events[index].start.dateTime).format(formatType),
        location: events[index].location,
        message: displayMessage(events[index]),
        rawTime: events[index].start.dateTime,
	 		};
	 	})


	// const eventObjects = [{
 //        imageSrc: displayImage(events[0]),
 //        name: events[0].summary,
 //        time: moment(events[0].start.dateTime).format(formatType),
 //        location: events[0].location,
 //        message: displayMessage(events[0]),
 //    }, 
 //    {
 //        imageSrc: displayImage(events[1]),
 //        name: events[1].summary,
 //        time: events[1].start.dateTime,
 //        location: events[1].location,
 //        message: displayMessage(events[1]),
 //    }, {
 //        imageSrc: displayImage(events[2]),
 //        name: events[2].summary,
 //        time: events[2].start.dateTime,
 //        location: events[2].location,
 //        message: displayMessage(events[2]),
 //    }, {
 //        imageSrc: displayImage(events[3]),
 //        name: events[3].summary,
 //        time: events[3].start.dateTime,
 //        location: events[3].location,
 //        message: displayMessage(events[3]),
 //    }, {
 //        imageSrc: displayImage(events[4]),
 //        name: events[4].summary,
 //        time: events[4].start.dateTime,
 //        location: events[4].location,
 //        message: displayMessage(events[4]),
 //    }, {
 //        imageSrc: displayImage(events[5]),
 //        name: events[5].summary,
 //        time: events[5].start.dateTime,
 //        location: events[5].location,
 //        message: displayMessage(events[5]),
 //    }, {
 //        imageSrc: displayImage(events[6]),
 //        name: events[6].summary,
 //        time: events[6].start.dateTime,
 //        location: events[6].location,
 //        message: displayMessage(events[6]),
 //  }];

  function getToday() {
  	let today = new Date()
  	let year = today.getFullYear()
  	let day = today.getDate()
  	let month = today.getMonth()+1

  	return year+'-'+month+'-'+day
  }	

  const eventCards = eventObjects.map(function(currentObj) {
  	console.log(currentObj)

  	const objDate = moment(currentObj.rawTime);
  	const nowDate = moment();

  	const isSameDate = objDate.date() === nowDate.date();
  	const isSameMonth = objDate.month() === nowDate.month();
  	const isSameYear = objDate.year() === nowDate.year();

  	if ( isSameDate && isSameMonth && isSameYear ) {
  		
  	    return `
				<div class="ui centered card clearfix">
		      <div>
		        <img src="${currentObj.imageSrc}" class="dressIcon">
		        <div class="formal">${currentObj.name}: ${currentObj.time} @${currentObj.location}</div>
		      </div>
		      <div class="content">
		        <div class="header">${currentObj.message}</div>
		      </div>
			  </div>`;
		
		}
		else {
			return '';
		}
  });

  $('.js-container').append(eventCards.join('\n'));
  
}

// THIS METHOD IS RUN BY THE GOOGLE APIS CALL
function initAppFromGoogleScript() {
    const isPlanPage = $('.js-plan').length > 0;

    if (!isPlanPage) {
        return; // stop this funcion, we are done
    }

    // on plan page, print out today's date
    getDateAsText();

    //on plan page, check for zipcode
    const queryParams = getQueryParams();

    // write an if statement that checks to see if zipcode exists
    if (typeof queryParams.zipcode === 'undefined') {
        window.location.href = 'index.html';
    } else {
    	// do api stuff
    	// load weather regardless
    	getWeather(queryParams.zipcode)
    	// get google permissions and *then* load calendar info
    	getGoogleCalAuth(true)
    		.then(() => loadCalendarData())
    		.then((events) => displayCalendarEvents(events))
    		.catch(() => {
    			// handle failure here :/
    			$('.js-container').append(`
<div class="ui centered card clearfix js-login">
	<div>
		<div>Please click below to log into Google Calendar</div>
	</div>
	<div class="content">
		<button class="ui fluid button"  onclick="getAuthorization()">Log in</button>
	</div>
</div>
    			`);
    		});
        
    }
}

function getAuthorization() {
	$('.js-login').remove();
	getGoogleCalAuth(false)
		.then(() => loadCalendarData())
		.then((events) => displayCalendarEvents(events))
		.catch(() => {
			// handle failure here :/
			$('.js-container').append(`
<div class="ui centered card clearfix js-login">
	<div>
		<div>Please click below to log into to Google Calendar</div>
	</div>
	<div class="content">
		<button class="ui fluid button" onclick="getAuthorization()">Log in</button>
	</div>
</div>
    		`);
    	});	
}


function getDateAsText() {
	let today = new Date();
	const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
	const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const w = weekday[today.getDay()];
	const m = month[today.getMonth()];
	const d = today.getDate();
	const y = today.getFullYear();

	today = `${w} ${m} ${d}, ${y}`;
	
	const displayTodaysDate = $('.todaysDate');
	displayTodaysDate.text(today);	
}

// get google auth
function getGoogleCalAuth(immediate) {
	const CLIENT_ID = '790796644928-q7g8382df247mb9m2bmdt09m3s5qu3sh.apps.googleusercontent.com';
  const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
	const permissionsOpts = {
		client_id: CLIENT_ID,
		scope: SCOPES,
		immediate: immediate,
	};

	return new Promise((resolve, reject) => {
		gapi.auth.authorize(permissionsOpts, (authResult) => {
			if (authResult && !authResult.error) {
				resolve();
			} else {
				reject();
			}
		});	
	});
}

// function load google client
function loadGoogleClient(clientName, version) {
	return new Promise((resolve, reject) => {
		gapi.client.load(clientName, version, () => {
			resolve();
		})
	});
}

// get aclendar data
function loadCalendarData() {
	return loadGoogleClient('calendar', 'v3')
		.then(() => listUpcomingEvents());
}

// get upcoming events
function listUpcomingEvents() {
	return new Promise((resolve, reject) => {

		const request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
        	resolve(resp.items)
        });
	});
}