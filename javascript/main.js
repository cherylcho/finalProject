$('.ui.fluid.large.teal.submit.button').click(function(){
   window.location.href = "plan.html";
})

$('.ui.fluid.large.teal.submit.button').click(onShowContentClicked);

function onShowContentClicked() {
	$('.js-container').html(weatherCards.join('\n')+eventCards.join('\n'))	
};

$('.js-container').html(weatherCards.join('\n')+eventCards.join('\n'));	

let today = new Date();
const weekday = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"];
const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const w = weekday[today.getDay()];
const m = month[today.getMonth()];
const d = today.getDate();
const y = today.getFullYear();

today = `${w} ${m} ${d}, ${y}`;
console.log(today);

const weatherObjects = [{
	imageSrc: 'assets/cloudRain.png',
	degrees: 45,
	precip: 70,
	message: 'Bring umbrella',
}, {
	imageSrc: 'assets/sun.png',
	degrees: 65,
	precip: 10,
	message: 'Rock those shades',
}, {
	imageSrc: 'assets/snowflake.png',
	degrees: 35,
	precip: 70,
	message: 'Break out snow boots',
}];

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
	location: 'Equinox',
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



const event = {
	eventName: 'Holiday Party',
	time: '7pm',
	location: 'The Standard (848 Washington St)',
}

const data = {
	weather: {
		degrees: '45 &#8457',
		precip: '80% Precip.',
	},
	events: [
		{
			eventName: 'Holiday Party',
			time: '7pm',
			location: 'The Standard (848 Washington St)',
		},
		{
			eventName: 'Yoga',
			time: '8pm',
			location: 'Yoga Herald Square (139 W. 35th St)',
		},
		{
			eventName: 'Meeting',
			time: '3:30pm',
			location: 'Gin',
		}
	]
}

const events = [
	{
		eventName: 'Holiday Party',
		time: '7pm',
		location: 'The Standard (848 Washington St)',
	},
	{
		eventName: 'Yoga',
		time: '8pm',
		location: 'Yoga Herald Square (139 W. 35th St)',
	},
	{
		eventName: 'Meeting',
		time: '3:30pm',
		location: 'Gin',
	}
]

console.log('events: ', events);

console.log('events sub: ', data.events[2].eventName);

