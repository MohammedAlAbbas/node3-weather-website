import axios from 'axios';
import Response from '../classes/Response.js';

const baseUrl = 'http://api.weatherstack.com';
const _CITY = 'Dammam';

const printCurrentWeather = async function () {
    try {
        //var currentWeather = await getCurrentWeather(_CITY);
        var currentWeather = await getCurrentWeather2(_CITY);
        if(!currentWeather.success) {
            return console.log(currentWeather.message);
        }
        const { temperature, humidity, weather_descriptions } = currentWeather.data;
        console.log(weather_descriptions[0]);
        console.log(`It is currently ${temperature} degrees in ${_CITY}. and the humidty is ${humidity}`);
    } catch (e) {
        console.log(e);
    }

}

const getCurrentWeather = function (city) {
    return new Promise((resolve, reject) => {
        axios.get(`${baseUrl}/current`, {
            params: {
                access_key: '76c698b97cdb81cc04119b126c7d8c26',
                query: city,
                units: 'm'
            }
        })
            .then(response => {
                if (response.data.error) {
                    reject(response.data.error.info);
                }
                resolve(response.data.current);
            })
            .catch(error => {
                reject(error);
            });
    });
}

const getCurrentWeather2 = async function (city) {
    try {
        const response = await axios.get(`${baseUrl}/current`, {
            params: {
                access_key: '76c698b97cdb81cc04119b126c7d8c26',
                query: city,
                units: 'm'
            }
        });
        if (response.data.error) {
            return new Response(false, undefined, response.data.error.info).getResponse();
        }
        
        return new Response(true, response.data.current, '').getResponse();

    } catch (e) {
        return new Response(false, undefined, e.message).getResponse();
    }

    // .then(response => {
    //     if (response.data.error) {
    //         reject(response.data.error.info);
    //     }
    //     resolve(response.data.current);
    // })

}

export default { printCurrentWeather, getCurrentWeather2 }