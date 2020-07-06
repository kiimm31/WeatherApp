import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import rainLogo from './icons8-rain-64.png';
import sunnyLogo from './icons8-sun-64.png';
import cloudLogo from './icons8-cloud-64.png';
export function CityTile(props) {
    const [temp, setTemp] = useState(props.data.temp);
    const [cityName, setCityName] = useState(props.data.cityName);
    const [weather, setWeather] = useState(props.data.weather);
    const [time, setTime] = useState(props.data.time);
    const [date, setDate] = useState(new Date().toLocaleTimeString());

    const [isShown, setIsShown] = useState(false);

    const rain = ['drizzle', 'rain']
    const cloud = ['clouds']
    //setTimeout(props.time * 60000);
    let url = `https://cors-anywhere.herokuapp.com/https://openweathermap.org/data/2.5/weather?q=${props.data.cityName}&appid=439d4b804bc8187953eb36d2a8c26a02`
    //setTemp(props.data.temp)
    //setCityName(props.data.cityName)
    //setWeather(props.data.weather)
    //setDate(new Date().toLocaleTimeString())

    function tick() {

        axios.get(url, {
            mode: 'no-cors',
        }).then(res => {

            const cityInfo = { temp: res['data']['main']['temp'], weather: res['data']['weather'][0]['main'] }

            setTemp(cityInfo.temp)
            setWeather(cityInfo.weather)
            setDate(new Date().toLocaleTimeString())
            console.log('hello')
        });
    }

    function checkRain(weather) {
        return rain.includes(weather.toLowerCase());
    }

    function checkCloud(weather) {
        return cloud.includes(weather.toLowerCase());
    }
    //useEffect(() => { setTimeout(tick, props.data.time * 60000); });

    useInterval(tick, props.data.time * 60000);

    if (checkRain(weather)) {
        return (
            <div style={{ backgroundColor: "lightblue", border: "solid" }} class="is-6" onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>

                <div class="row">
                    <div class="col-md-2">
                        <p>Temp: {temp}</p>
                    </div>
                    <div class="col-md-4">
                        <p>City: {cityName}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <p>Weather: {weather}</p>
                    </div>
                    <div class="col-md-4">
                        <img src={rainLogo} />
                    </div>
                    <div class="col-md-2">
                        {isShown && (<button onClick={props.delete}>Delete</button>)}
                    </div>
                </div>

                <p>Last Update: {date}.</p>
            </div>
        );
    }
    else if (checkCloud(weather)) {
        return (
            <div style={{ backgroundColor: "lightblue", border: "solid" }} class="is-6" onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>

                <div class="row">
                    <div class="col-md-2">
                        <p>Temp: {temp}</p>
                    </div>
                    <div class="col-md-4">
                        <p>City: {cityName}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <p>Weather: {weather}</p>
                    </div>
                    <div class="col-md-4">
                        <img src={cloudLogo} />
                    </div>
                    <div class="col-md-2">
                        {isShown && (<button onClick={props.delete}>Delete</button>)}
                    </div>
                </div>

                <p>Last Update: {date}.</p>
            </div>
        );
    }
    else {
        return (
            <div style={{ backgroundColor: "lightblue", border: "solid" }} class="is-6" onMouseEnter={() => setIsShown(true)}
                onMouseLeave={() => setIsShown(false)}>

                <div class="row">
                    <div class="col-md-2">
                        <p>Temp: {temp}</p>
                    </div>
                    <div class="col-md-4">
                        <p>City: {cityName}</p>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-2">
                        <p>Weather: {weather}</p>
                    </div>
                    <div class="col-md-4">
                        <img src={sunnyLogo} />
                    </div>
                    <div class="col-md-2">
                        {isShown && (<button onClick={props.delete}>Delete</button>)}
                    </div>
                </div>

                <p>Last Update: {date}.</p>
            </div>
        );

    }

}

function useInterval(callback, delay) {
    const savedCallback = useRef();

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current();
        }
        if (delay !== null) {
            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}


