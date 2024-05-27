
const baseUrl = 'http://localhost:3000';

//printCurrentWeather('Irland');

function onClickSearch() {
    var cityInputValue = document.getElementById("cityInput").value;
    printCurrentWeather(cityInputValue);
}

async function printCurrentWeather(city) {
    const currentWeatherData = await getCurrentWeather(city);
    if(currentWeatherData) {
        console.log(currentWeatherData);
        const message = `It is "${currentWeatherData.weather_descriptions[0]}" in ${city}
        and The temprature is ${currentWeatherData.temperature}, and the humidity is: ${currentWeatherData.humidity}`

        document.getElementById("currentWeather").innerHTML = message;
    }
}

async function getCurrentWeather(city) {
    try {
      const response = await axios.get(`/weather`, {
        params: {
            city
        }
      });
      if(!response.data.success) {
        alert(response.data.message);
        return undefined;
      }

      return response.data.results;

    } catch (error) {
      console.error(error);
      return undefined;
    }
  }