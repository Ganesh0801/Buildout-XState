
import axios from 'axios'
import React from 'react'
import styles from "./State.module.css"
import { useEffect , useState } from 'react'

const State = () => {
  const [countries , setCountries] = useState([])
  const [selectCountry,setSelectCountry] = useState("")
  const [states , setStates] = useState([])
  const [selectState,setSelectState] = useState("")
  const [cities , setCities] = useState([])
  const [selectCity, setSelectCity] = useState("")
  
  useEffect(()=>{
    const fetchCountry = async()=>{
        try {
          let response = await axios.get(`https://crio-location-selector.onrender.com/countries`)
         console.log(response.data)
          setCountries(response.data)
        }catch(e) {
          console.log("fetching error while country load")
        }
    }
    fetchCountry();
  },[])
 
  useEffect(()=>{
    const fetchState = async()=>{
      if (selectCountry)
      try {
         let res = await axios.get(`https://crio-location-selector.onrender.com/country=${selectCountry}/states`)
         setStates(res.data)
         setSelectState("")
         setCities([])
         setSelectCity("")
        }catch(e) {
         console.log("error accured while state load")
      }
    }
   fetchState();
  },[selectCountry])
   
   useEffect(()=>{
     const fetchCity = async()=> {
      if (selectCountry && selectState) {
        try {
          let response = await axios.get(
            `https://crio-location-selector.onrender.com/country=${selectCountry}/state=${selectState}/cities`
          );
          setCities(response.data);
          setSelectCity("");
       
        }catch(e) {
          console.log("error on fecth cities");
        }
      }
    }

    fetchCity()
  }, [selectCountry, selectState]);
   
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Select Location</h1>
      <div className={styles.dropDowns}>
            <select  value={selectCountry} onChange={(e)=> setSelectCountry(e.target.value)}>
              <option value="">select country</option>
              {countries.map((country,idx)=>(
                <option value={country} key={idx}>{country}</option> 
              ))}
            </select>
        
            <select  value={selectState} onChange={(e)=> setSelectState(e.target.value)}>
              <option value="">Select Country</option>
              {states.map((state,idx)=>(
                <option value={state} key={idx}>{state}</option> 
              ))}
            </select>
        
            <select value={selectCity} onChange={(e)=> setSelectCity(e.target.value)}>
              <option value="">select country</option>
              {cities.map((city,idx)=>(
                <option value={city} key={idx}>{city}</option> 
              ))}
            </select>
      </div>
      
      {selectCity && (
        // <h3 style={{textAlign:"center"}}>
        //   <span className={styles.first}>You selected </span>
        //   <span className={styles.city}>{selectCity},</span>
        //   <span className={styles.fade}>
        //        {" "}
        //       {selectState}, {selectCountry}
        //   </span>
        // </h3>

        //<p>You selected {selectCity}, {selectState}, {selectCountry}</p>
        <h3>
          You selected 
          <span className={styles.city}> {selectCity},</span>
          <span className={styles.state}> {selectState},</span>
          <span className={styles.state}> {selectCountry}</span>
        </h3>

      )}
    </div>
  )
}

export default State;


