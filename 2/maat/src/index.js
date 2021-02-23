import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'


const FilterView = ({filterstring, onChangeHandler, nresults}) => {

  return (
    <div>
      <form>
        Enter country name: <input value={filterstring} onChange={onChangeHandler}></input>
      </form>
    </div>
  )
}

const Weather = ({weather}) => {
  if (weather) {
    return (
    <div>
      <h3>Weather now:</h3>
      <p>{weather.main.temp} °C</p>
      <p>{weather.main.pressure} hPa</p>
      <p>{weather.weather[0].main} ({weather.weather[0].description})</p>
    </div>
    )
  }
  else return null
}

const SingleCountry = ({country}) => {

  const [weather, setWeather] = useState(null)

  useEffect(() => {
      const options = {
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        params: {
          q: country.capital,
          units: 'metric',
          appid: process.env.REACT_APP_WEATHER_API_KEY
        },
      };

      axios.request(options).then((response) => {
        console.log(response.data)
        setWeather(response.data)
      }).catch(e => {
        console.log(e)
      })
  }, [country.capital])


  return (
    <div>
      <h1>{country.name}</h1>
      <div style={{width:'20%'}}>
        <img src={country.flag} alt={`flag of ${country.name}`} width='100%' height='100%'/>
      </div>
      <p>Population: {(country.population/1000000).toFixed(2)} million</p>
      <p>Capital: {country.capital}</p>
      <p>Languages:</p>
      {country.languages.map(lang => <p key={lang.name}> - {lang.name}</p>)}
      <Weather weather={weather}/>
   </div>
  )
}

const CollapsedCountry = ({country,showClickHandler}) => {
    return (
      <div>
        <h2>{country.name}</h2>
        <button onClick={showClickHandler}>show</button>
      </div>
    )
}

const App = () => {
  const [countries, updateCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      updateCountries(response.data)
      console.log(response.data)
    })
  }, [])

  const [current, setCurrent] = useState(null)

  const updateCountry_if = (newFilter) => {

    if (!newFilter) {
      setCurrent(null)
      return
    }

    const searchLower = (s) => s.in.toLowerCase().search(s.s.toLowerCase()) 

    const f = countries.filter(c => searchLower({in: c.name, s: newFilter}) === 0) /*only find in beginning*/

    if (f.length >= 1) setCurrent(f)
    else setCurrent(null)
  }

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
    updateCountry_if(newFilter)
  }

  const onFilterChange = (event) => {
    changeFilter(event.target.value)
  }

  const displayCountry = () => {
    if (!current) return null
    if (current.length === 1) {
      return <SingleCountry country={current[0]}/>
    }
    else return (
      <div>
        <ul style={{'listStyleType':'none'}}>
        {current.map(c => <li key={c.name}><CollapsedCountry country={c} showClickHandler={() => { changeFilter(c.name) }}/> </li>)}
        </ul>
      </div>
    )

  }

  return (
    <div>
      <h2>Countries yo</h2>
      <FilterView currentCountry={current} filterstring={filter} onChangeHandler={onFilterChange} nresults={current ? current.length : 0}/>
      {displayCountry()}
    </div>
  )
}

ReactDOM.render(<App/>,
  document.getElementById('root')
)

