/*!

Name: Open Weather
Dependencies: jQuery, OpenWeatherMap API
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 28, 2013
Date Modified: Octover 7, 2014
Modified by: Cole Thorsen (impulsestudios.ca)
Licensed under the MIT license

*/

;(function($) {

	$.fn.openWeather  = function(options) {
	
		//return if no element was bound
		//so chained events can continue
		if(!this.length) {
			return this;
		}

		//define default parameters
		var defaults = {
			customIcons: null,
			units: 'c',
			city: null,
			lat: null,
			lng: null,
			key: null,
			lang: 'en',
			type: 'weather', //options are weather|forecast|both
			weatherTarget: null,
			weatherTemplate : null,
			forecastDays: 0,
			forecastTarget: null,
			forecastTemplate : null,
			success: function() {},
			error: function(message) {}
		};

		//define plugin
		var plugin = this;

		//define element
		var el = $(this);
		
		//api URL
		var apiURL;

		//define settings
		plugin.settings = {};
 
		//merge defaults and options
		plugin.settings = $.extend({}, defaults, options);
		
		//define settings namespace
		var s = plugin.settings;
		
		//define basic api endpoint
		apiURL = 'http://api.openweathermap.org/data/2.5/%type%?lang='+s.lang;
		
		//if city isn't null
		if(s.city !== null) {
			
			//define API url using city (and remove any spaces in city)
			apiURL += '&q='+s.city.replace(' ', '');
			
		} else if(s.lat !== null && s.lng !== null) {
			
			//define API url using lat and lng
			apiURL += '&lat='+s.lat+'&lon='+s.lng;
		}
		
		//if api key was supplied
		if(s.key !== null) {
			
			//append api key paramater
			apiURL += '&APPID=' + s.key;
			
		}
		
		//format time function
		var formatTime = function(unixTimestamp) {
			
			//define milliseconds using unix time stamp
			var milliseconds = unixTimestamp * 1000;
			
			//create a new date using milliseconds
			var date = new Date(milliseconds);
			
			//define hours
			var hours = date.getHours();
		
			var period = 'AM';
	
			if (hours >= 12) {
		
				hours = hours - 12;
		
				period = 'PM';
			}
	
			//correct for midnight.
			if (hours === 0) {
			
				hours = 12;
			
			}

			//define minutes
			var minutes = date.getMinutes();
			
			//convert minutes to a string
			minutes = minutes.toString();
			
			//if minutes has less than 2 characters
			if(minutes.length < 2) {
				
				//add a 0 to minutes
				minutes = 0 + minutes;
			}
			
			//construct time using hours and minutes
			var time = hours + ':' + minutes + ' ' + period;
			
			return time;
		};

		var formatDay = function(unixTimestamp) {

			//define milliseconds using unix time stamp
			var milliseconds = unixTimestamp * 1000;
			
			//create a new date using milliseconds
			var date = new Date(milliseconds);

			var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	
			return days[date.getDay()];
		};

		var formatTemperature = function(temp) {

			//if units are 'f'
			if(s.units == 'f') {
			
				//define temperature as fahrenheit
				temp = Math.round(((temp - 273.15) * 1.8) + 32);
							
			} else {
				
				//define temperature as celsius
				temp = Math.round(temp - 273.15);
						
			}
			//TODO: add support for kalvin
			return temp;
		};

		var setIcon = function(weather) {
			if(s.iconTarget !== null && weather.icon !== null) {
				
				var iconURL;

				//if customIcons isn't null
				if(s.customIcons !== null) {
				
					//define the variables
					var defaultIconFileName = weather.icon,
						iconName,
						timeOfDay;
					
					//if default icon name contains the letter 'd'
					if(defaultIconFileName.indexOf('d') != -1) {
						
						//define time of day as day
						timeOfDay = 'day';
						
					} else {
						
						//define time of day as night
						timeOfDay = 'night';
					}
					
					//figure out which custom icon to use.
					switch(defaultIconFileName.substring(0,2)) {
						case '01' :
							iconName = 'clear'; //icon for clear sky
							break;
						case '02' :
							iconName = 'few'; //icon for few clouds
							break;
						case '03' :
						case '04' :
							iconName = 'clouds'; //icon for clouds
							break;
						case '09' :
						case '10' :
							iconName = 'rain'; //icon for rain
							break;
						case '11' :
							iconName = 'storm'; //icon for thunderstorm
							break;
						case '13' :
							iconName = 'snow'; //icon for snow
							break;
						case '50' :
							iconName = 'mist'; //icon for mist
							break;
					}
					
					//define custom icon URL
					iconURL = s.customIcons+timeOfDay+'/'+iconName+'.png';
					
				} else {

					//define icon URL using default icon
					iconURL = 'http://openweathermap.org/img/w/'+weather.icon+'.png';

				}
				
				return '<img class="weather_icon" src="' + iconURL + '" alt="' + weather.main + '">';
			}
		};

		var formatUnits = function() {

			return '&deg' + s.units.toUpperCase();

		};

		//if type is both or weather get weather.
		if(s.type != 'forecast') {

			$.ajax({
				type: 'GET',
				url: apiURL.replace('%type%', 'weather'),
				dataType: 'jsonp',
				success: function(data) {

					var output = s.weatherTemplate;

					if(s.weatherTemplate === null) {

						//set temperature
						el.html(formatTemperature(data.main.temp) + formatUnits());

					} else {

						output = output.replace('{{temp}}', formatTemperature(data.main.temp))
							.replace('{{tempMin}}', formatTemperature(data.main.temp_min))
							.replace('{{tempMax}}', formatTemperature(data.main.temp_max))
							.replace('{{description}}', data.weather[0].description)
							.replace('{{icon}}', setIcon(data.weather[0]))
							.replace('{{location}}', data.name + ', ' + data.sys.country)
							.replace('{{windSpeed}}', Math.round(data.wind.speed) + ' Mph') //TODO: add support for different units
							.replace('{{pressure}}', data.main.pressure + ' hPa') //TODO: add support for different units
							.replace('{{humidity}}', data.main.humidity + '%')
							.replace('{{sunrise}}', formatTime(data.sys.sunrise))
							.replace('{{sunset}}', formatTime(data.sys.sunset))
							.replace(/{{units}}/g, formatUnits());
						
						$(s.weatherTarget).html(output);

					}

					//run success callback
					s.success.call(this);
					
				},
				
				error: function(jqXHR, textStatus, errorThrown) {
					
					//run error callback
					s.error.call(this, textStatus);
				}
				
			});//ajax
		
		}//if

		//if type is both or forecast get forecast.
		if(s.type != 'weather' && s.forecastDays > 0) {

			$.ajax({
				type: 'GET',
				url: apiURL.replace('%type%', 'forecast/daily'),
				dataType: 'jsonp',
				success: function(data) {
					
					//loop through the number of days set.
					for (i = 0; i < s.forecastDays; i++) {

						var output = s.forecastTemplate,
							forecast = data.list[i];

						console.log(forecast);

						output = output.replace('{{tempMin}}', formatTemperature(forecast.temp.min))
							.replace('{{tempMax}}', formatTemperature(forecast.temp.max))
							.replace('{{description}}', forecast.weather[0].description)
							.replace('{{icon}}', setIcon(forecast.weather[0]))
							.replace('{{pressure}}', forecast.pressure + ' hPa') //TODO: add support for different units
							.replace('{{humidity}}', forecast.humidity + '%')
							.replace('{{day}}', formatDay(forecast.dt))
							.replace(/{{units}}/g, formatUnits());
						
						$(s.forecastTarget).append(output);

					}

				},

				error: function(jqXHR, textStatus, errorThrown) {
					
					//run error callback
					s.error.call(this, textStatus);
				}
			});//ajax
		
		}//if
		
	};//fn

})(jQuery);