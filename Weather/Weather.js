import React,{useState, useEffect} from 'react'
import './style.css'
import axios from 'axios'
const api = {
  key : '1c05f4b5e6cd5ed6e8445e2894dc586d',
  base : 'http://api.openweathermap.org/data/2.5/'
}

const Weather= ()=> {
  const [search, setSearch] = useState('')
  const [focus, setFocus] = useState('')
    

  const fetchweather = async (e) =>{
   
    const res = await axios(
      
      `${api.base}weather?q=${search}&units=metric&appid=${api.key} `
    )
      
    console.log(res.data)
    if (res.data) { 
      return setFocus(res.data)
   
    }
   
  
  }


useEffect(()=>{
  fetchweather()
}, []);




const dateBuilder = (d) =>{
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August','September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday'];

  const day = days[d.getDay()]
  const date = d.getDate()
  const month = months[d.getMonth()]
  const year= d.getFullYear();

  return  `${day} ${date} ${month} ${year}`

}




  return (
    
    <div className =  {(typeof focus.main != undefined) ? ((focus.main.temp >16 ) ? 'rain' : 'container') : 'container '}>
        <main>
          <div className = 'search_box'>
           
           
            <input 
            onChange = {(e) => setSearch(e.target.value)}
            className = 'search_bar'
            type = 'text'
            placeholder = 'Search'
            value = {search}
            onKeyPress = {fetchweather}
            
            />

          </div>

            <div className = 'location_box'>
  <div className = 'location'> {focus.name}, {focus.sys.country}</div>
              <div className = 'date'> {dateBuilder(new Date())}</div>
            </div>
            <div className = 'weather_box'>
              <div className = 'temp'>
              {Math.round(focus.main.temp)}°c
              </div>
              <div className = 'presure'>
                  {focus.main.pressure}mph
              </div>
              <div className = 'weather'>
                 {focus.weather[0].main}
                   
              </div>





            </div>


        </main>
    </div>
  )
}

export default Weather
