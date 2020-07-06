import React, { Component } from 'react';
import axios from 'axios';
import { CityTile } from './CityTile.js';
import state, { useState } from 'react';
import cityJson from './city.list.json'
const options = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
]

export class SearchBar extends Component {
    static displayName = SearchBar.name;

    //constructor(props) {
    //    super(props);
    //    this.state = { currentCount: 0 };
    //    this.incrementCounter = this.incrementCounter.bind(this);
    //}
    //const[city, setCity] = useState(0);




    state = { term: '', cities: [], time: 1 };
    //items
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        className='input'
                        placeholder='Enter City'
                        value={this.state.term}
                        onChange={(e) => this.setState({ term: e.target.value })}
                    />
                    <br/>
                    <label > Refresh Rate (min) :
                        <select id='elemRefreshRate' name='Refresh Rate' value={this.state.time} onChange={this.handleChange}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                    </label>
                    <br/>
                    <button className='button'>Search</button>
                </form>
                {this.state.cities.map((city, index) => (

                    <CityTile key={city.cityName} data={city} delete={this.deleteEvent.bind(this, index)} />

                ))}
            </div>
        );
    };

    deleteEvent = (index) => {
        const copyCity = Object.assign([], this.state.cities);

        copyCity.splice(index, 1);

        this.setState({ cities: copyCity });

        alert('Deleted');
    }




    handleChange = (event) => {
        event.preventDefault();
        this.setState({ time: event.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();

        //let id = checkIdGivenCityName(this.state.term);

        let url = `https://cors-anywhere.herokuapp.com/https://openweathermap.org/data/2.5/weather?q=${this.state.term}&appid=439d4b804bc8187953eb36d2a8c26a02`
        //alert(postResult);

        axios.get(url, {
            mode: 'no-cors',
        }).then(res => {
            console.log(res)
            //alert(this.state.time)
            //alert(res['data']['weather'][0]['main'])

            const cityInfo = { temp: res['data']['main']['temp'], weather: res['data']['weather'][0]['main'], cityName: this.state.term, time: this.state.time }

            this.setState({
                cities: [...this.state.cities, cityInfo],
                term: '',
                time: 1
            });
        });
    }

}
//function checkIdGivenCityName(city) {
//    console.log(cityJson);

//    const found = cityJson.find(elem => elem['name'].toLowerCase() == city.toLowerCase());
//    console.log(found);
//}
