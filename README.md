# finalProject

This is an app that will help the end user plan the day's outfit based on weather and appointments.

## How Will This Work?

1. User loads the page
2. User inputs zip code
3. User authenticates Outlook
4. User is taken to view with today's weather and list of scheduled events from outlook calendar. 
5. Based on weather conditions and perhaps importance levels of events, the app should suggest various accessories (ie: umbrella, jacket, etc)

### Stretch Goals

1. Zip code saves automatically and loads after initial input
2. Access token is saved and stored if possible
3. Multiple calendars can be loaded and/or saved (preference)
4. Geolocation api automatically ascertains the user's location on Earth
5. Save configurations.


## Technologies Used

1. Some sort of frontent framework...? [Bootstrap](http://getbootstrap.com/), [Materialize](http://materializecss.com/), [Semantic-UI](http://semantic-ui.com/)
2. [Outlook Calendar API](https://msdn.microsoft.com/en-us/office/office365/api/calendar-rest-operations)
3. [Weather API](http://openweathermap.org/)
