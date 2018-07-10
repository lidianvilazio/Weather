import React, { Component } from 'react';
import './App.css';


import Title from './Components/Title'
import Form from './Components/Form'
import Weather from './Components/Weather'

const API_KEY = "62ccecea1641a5e65b637171676c9b22"

class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  getWeather = async (e) => {

    e.preventDefault()

    const city = e.target.city.value
    const country = e.target.country.value

    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`)

    const data = await api_call.json()

    if(city && country) {

      this.setState({
        temperature: data.main.temp,
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: undefined
      })
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter the value."
      })
    }


  }


  render() {

    return (
      <div>
        <div className='wrapper'>
          <div className='main'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-5 title-container'>
                  <Title/>
                </div>
                <div className='col-xs-7 form-container'>
                  <Form getWeather={this.getWeather}/>
                  <Weather
                  temperature={this.state.temperature}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  error={this.state.error}
                   />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default App;
