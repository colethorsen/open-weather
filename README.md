#Open Weather

A simple, lightweight jQuery plugin used to display the current weather and forecast of any city using the free <a href="http://openweathermap.org/api" target="_blank">OpenWeatherMap API</a>.

This plugin allows you to display the location, the current temperature, the current low temperature, the current high temperature, a description of the current weather, a weather icon, the humidity level, the wind speed, the pressure, the time the sun will rise, and the time the sun will set.

The plugin will also display the low temperature, the high temperrature, a description, a weather icon, the humidity level, and the pressure for the next 7 days.

<strong>An API key is not required but it is reccomended. <a href="http://openweathermap.org/register">Register here</a> to obtain an OpenWeatherMap API key for your application.</strong>

<a href="http://colethorsen.github.io/open-weather/" target="_blank">See demo</a>

##Instructions

Include jQuery and the plugin in the head or footer of your page.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    
<script src="/js/plugins/openWeather.js"></script>
```

The only default output is the current temperature.

To display the current temperature, create an element on your page where the current temperature will be displayed.

```html
<div class="weather-temperature"></div>
```
    
Initialize the plugin targeting the class, ID or element that you've created with either the 'city' option or 'lat' and 'lng' options set.

```js
$('.weather-temperature').openWeather({
	city: 'Toronto,ON'
});
```
	
OR

```js
$('.weather-temperature').openWeather({
	lat: 30,
	lng: 25
});
```
	
##Custom Icons

The OpenWeatherMap API returns their own set of icons, however, if you don't want to use them, the plugin also allows you to use 6 custom icons for both day and night, so 12 in total. Custom icons must be named as follows:

<ol>

	<p>clear.png</p>
	
	<p>clouds.png</p>
	
	<p>few.png</p>

	<p>rain.png</p>
	
	<p>snow.png</p>
	
	<p>storm.png</p>
	
	<p>mist.png</p>

</ol>

To use custom icons create a directory where the icons will live and inside of that directory create two more directories, "day" and "night."

	/img/icons/weather/day/
	/img/icons/weather/night/
	
Place your custom icons inside the "day" and "night" directories and initialize the plugin using the customIcons option.

```js
$('.weather-temperature').openWeather({
	city: 'Toronto,ON',
	customIcons: '/img/icons/weather/'
});
```
	
<em>* Note that if you are using custom icons you must include all 12 images.</em>

####Options

<p><em>key: integer</em>
<br />A string that defines the OpenWeatherMap API key for your application (default: null).
</p>

<p><em>lang: string</em>
<br />A string that defines the language (default: 'en').
<br />(English - en, Russian - ru, Italian - it, Spanish - sp, Ukrainian - ua, German - de, Portuguese - pt, Romanian - ro, Polish - pl, Finnish - fi, Dutch - nl, French - fr, Bulgarian - bg, Swedish - se, Chinese Traditional - zh_tw, Chinese Simplified - zh_cn, Turkish - tr)
</p>

<p><em>city: "city name, country / province/ state"</em>
<br />A string that defines the city (default: null).
</p>

<p><em>lat: integer</em>
<br />An integer that defines the latitude (default: null). 
</p>

<p><em>lng: integer</em>
<br />An integer that defines the longitude (default: null).
</p>

<p><em>units: "c / f"</em>
<br />A string that defines the type of units (default: 'c').
</p>

<p>customIcons: "path"</em>
<br />A string that defines the path to the custom icons (default: null).
</p>

<p>type: "weather / forecast / both"</em>
<br />A string that defines the type of weather report (default: weather).
</p>

<p><em>weatherTarget: "id / class / element"</em>
<br />A string that defines the ID, class or element that will contain the weather (default: null).
</p>

<p><em>weatherTemplate: "string"</em>
<br />A string that defines the content and structure of the weather display (default: null).
<br />Variable Options:	
	<ul>
		<li>{{icon}}</li>
		<li>{{location}}</li>
		<li>{{temp}}</li>
		<li>{{tempMin}}</li>
		<li>{{tempMax}}</li>
		<li>{{units}}</li>
		<li>{{description}}</li>
		<li>{{humidity}}</li>
		<li>{{windSpeed}}</li>
		<li>{{pressure}}</li>
		<li>{{sunrise}}</li>
		<li>{{sunset}}</li>
	</ul>
</p>

<p><em>forecastDays: integer</em>
<br />An integer that defines the number of days you wish to display for the forecast (default: 0).
</p>

<p><em>forecastTemplate: "string"</em>
<br />A string that defines the content and structure of the forecast display (default: null).
<br />Variable Options:	
	<ul>
		<li>{{day}}</li>
		<li>{{icon}}</li>
		<li>{{tempMin}}</li>
		<li>{{tempMax}}</li>
		<li>{{units}}</li>
		<li>{{description}}</li>
		<li>{{humidity}}</li>
		<li>{{pressure}}</li>
	</ul>
</p>

<p><em>forecastTarget: "id / class / element"</em>
<br />A string that defines the ID, class or element that will contain the forecast (default: null).
</p>

<p><em>success: function() {}</em>
<br />A function that runs after the plugin has successfully retrieved weather data. (default: function()).
</p>

<p><em>error: function() {}</em>
<br />A function that runs if there was an error retrieving weather data. (default: function(message)).
</p>

#####Example:

```js
$(function() {
		
	$('.weather-wrapper').openWeather({
		city: 'Toronto, ON',
		customIcons: '../src/img/icons/weather/',
		type: 'both',
		weatherTarget: '.weather',
		weatherTemplate: 
			'{{icon}}' +

			'<p><strong>Place</strong>' +
			'<br>{{location}}</p>' +
			
			'<p><strong>Temperature</strong>' +
			'<br>{{temp}}{{units}} ({{tempMin}}{{units}} - {{tempMax}}{{units}})</p>' +
			
			'<p><strong>Description</strong>' +
			'<br>{{description}}</p>' +
			
			'<p><strong>Humidity</strong>' +
			'<br>{{humidity}}</p>' +
			
			'<p><strong>Wind speed</strong>' +
			'<br>{{windSpeed}}</p>' +

			'<p><strong>Pressure</strong>' +
			'<br>{{pressure}}</p>' +
			
			'<p><strong>Sunrise</strong>' +
			'<br>{{sunrise}}</p>' +
			
			'<p><strong>Sunset</strong>' +
			'<br>{{sunset}}</p>',
		forecastDays: 5,
		forecastTarget: '.forecast',
		forecastTemplate:
			'<div class="entry">' +

				'<p><strong>{{day}}</strong></p>' +

				'{{icon}}' +

				'<p><strong>Temperature</strong>' +
				'<br>{{tempMin}}{{units}} - {{tempMax}}{{units}}</p>' +

				'<p><strong>Description</strong>' +
				'<br>{{description}}</p>' +

				'<p><strong>Humidity</strong>' +
				'<br>{{humidity}}</p>' +

				'<p><strong>Pressure</strong>' +
				'<br>{{pressure}}</p>' +
				
			'</div>',
		success: function() {
		
			//show weather
			$('.weather-wrapper').show();
			
		},
		error: function(message) {
		
			console.log(message);
		
		}
	});
	
});
```