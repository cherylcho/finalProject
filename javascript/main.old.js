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

const googKey = 'AIzaSyAcI0JUkfni3Do4HC9uf1d7LIK9_ZGIj0g';
const darkSkyKey = 'c2a8e9fddd67de169268702d428a554f';


// 790796644928-q7g8382df247mb9m2bmdt09m3s5qu3sh.apps.googleusercontent.com
// IKJdJw0J1QP7giJt_84jorVk -- s

// http://darksky.webscript.io/forecast?key=c2a8e9fddd67de169268702d428a554f&latLng=40.7595044,-73.9271643999999

function getWeather(zipcode) {
    console.log(zipcode)

    var lat = '';
    var lng = '';
    var address = zipcode
    new google.maps.Geocoder().geocode({
        'address': address
    }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
            console.log('Latitude: ' + lat + ' Logitude: ' + lng);

            const urlToRequest = `http://darksky.webscript.io/forecast?key=c2a8e9fddd67de169268702d428a554f&latLng=${lat},${lng}`;
            console.log(urlToRequest)

            const data = $.get(urlToRequest);

            data.then(onDataBack);
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });

}

function onDataBack(response) {
    const data = JSON.parse(response);
    console.log(data)

    const degreesFarenheit = data.currently.temperature;

    const chancePrecip = data.hourly.data[0].precipProbability;
    const percentPrecip = Math.round((chancePrecip * 100) / 10);
    const precipType = data.hourly.data[0].precipType;
    console.log(percentPrecip);
    console.log(precipType);

    console.log('-p------', precipType)


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
        weatherObjects['assets/snowflake.png', degreesFarenheit, percentPrecip, 'Break out snow boots'];
    }
    else {
    	weatherObjects.push({
        	imageSrc: 'assets/sun.png', 
        	degrees: degreesFarenheit, 
        	percip: percentPrecip, 
        	message: 'Sunz out gunz out'
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

    console.log(weatherCards);


    const eventObjects = [{
        imageSrc: 'assets/dress.jpg',
        name: 'Holiday Party',
        time: '7pm',
        location: 'The Standard (848 Washington St)',
        message: 'Formal attire',
    }, {
        imageSrc: 'assets/yoga.png',
        name: 'Yoga',
        time: '8am',
        location: 'Yoga Herald Square (139 W. 35th St)',
        message: 'Bring yoga-wear',
    }, {
        imageSrc: 'assets/meeting.png',
        name: 'Meeting',
        time: '3:30pm',
        location: 'Gin',
        message: 'Suit up',
    }, {
        imageSrc: 'assets/gym.png',
        name: 'Gym',
        time: '6:30pm',
        location: 'NYSC',
        message: 'Bring workout clothes',
    }];

    const eventCards = eventObjects.map(function(currentObj) {

        return `
	<div class="ui centered card clearfix">
      <div>
        <img src="${currentObj.imageSrc}" class="dressIcon">
        <div class="formal">${currentObj.name}: ${currentObj.time} @${currentObj.location}</div>
      </div>
      <div class="content">
        <div class="header">${currentObj.message}</div>
      </div>
    </div>

	`;
    });

    console.log(weatherCards);

    $('.js-container').html(weatherCards.join('\n') + eventCards.join('\n'));

}

function checkForZipcode() {
    const isPlanPage = $('.js-plan').length > 0;

    if (!isPlanPage) {
        return; // stop this funcion, we are done
    }

    // otherwise, we are on plan page, check for zipcode
    const queryParams = getQueryParams();
    // write an if statement that checks to see if zipcode exists

    if (typeof queryParams.zipcode === 'undefined') {
        window.location.href = 'index.html';
    } else {
        // do api stuff
        getWeather(queryParams.zipcode)
    }
}

// checkForZipcode();




// =======================================================

// $('.ui.fluid.large.teal.submit.button').click(onShowContentClicked);

// function onShowContentClicked() {
// 	$('.js-container').html(weatherCards.join('\n')+eventCards.join('\n'))	
// };

// get the zip code from the url
console.log(location.search, location);



let today = new Date();
const weekday = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const w = weekday[today.getDay()];
const m = month[today.getMonth()];
const d = today.getDate();
const y = today.getFullYear();

today = `${w} ${m} ${d}, ${y}`;
console.log(today);
const displayTodaysDate = $('.todaysDate');
displayTodaysDate.text(today);



// const event = {
// 	eventName: 'Holiday Party',
// 	time: '7pm',
// 	location: 'The Standard (848 Washington St)',
// }

// const data = {
// 	weather: {
// 		degrees: '45 &#8457',
// 		precip: '80% Precip.',
// 	},
// 	events: [
// 		{
// 			eventName: 'Holiday Party',
// 			time: '7pm',
// 			location: 'The Standard (848 Washington St)',
// 		},
// 		{
// 			eventName: 'Yoga',
// 			time: '8pm',
// 			location: 'Yoga Herald Square (139 W. 35th St)',
// 		},
// 		{
// 			eventName: 'Meeting',
// 			time: '3:30pm',
// 			location: 'Gin',
// 		}
// 	]
// }

// const events = [
// 	{
// 		eventName: 'Holiday Party',
// 		time: '7pm',
// 		location: 'The Standard (848 Washington St)',
// 	},
// 	{
// 		eventName: 'Yoga',
// 		time: '8pm',
// 		location: 'Yoga Herald Square (139 W. 35th St)',
// 	},
// 	{
// 		eventName: 'Meeting',
// 		time: '3:30pm',
// 		location: 'Gin',
// 	}
// ]

// console.log('events: ', events);

// console.log('events sub: ', data.events[2].eventName);