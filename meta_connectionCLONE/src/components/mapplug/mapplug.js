import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import './MapPlug.css';
import './WeatherCard.css'
import { Row, Col, Form} from "react-bootstrap";
import { View } from 'react-native';  
import sunImg from './../../assets/sunny.png'
import rainImg from './../../assets/rainy.png'
import snowImg from './../../assets/snow.png'
import weatherImg from './../../assets/weathericon.png'
import { db } from './../../firebase-config'
import { collection, addDoc} from "firebase/firestore";

export default function MapPlug() {

    const [viewport, setViewport] = useState({
        center: [0,0],
        width:'500px',
        height: '450px',
        latitude: 35.7667,
        longitude: -97.3666,
        zoom: 2, 
        pitch:30, 
        apiPath: ''
    });

    const [viewport2, setViewport2] = useState({
        id: 0,
        type:'Select Type',
        image:weatherImg
    });

    const [weatherOdds1, setWeatherOdds1] = useState({
        chanceClear:'.2',
        chanceRain:'.2',
        chanceSnow:'.2',
    
    });

    
    const [selectedCity, setSelectedCity] = useState('Set Location');
    const [showPopup, setShowPopup] = useState(0);

    // weather card 

    const apiKey = 'f83db30e731e479eaf451052213012'

    const [weatherInfo, setWeatherInfo] = useState(null);
    const [currTemp, setCurrTemp] = useState(null);
    const [weatherDesc, setWeatherDesc] = useState(null);
    const [apiCity, setApiCity] = useState(null)

    const WeatherApiCall = () => {
        useEffect(() => {
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=f83db30e731e479eaf451052213012&q=${apiCity}&days=4&aqi=no&alerts=no?key=${apiKey}&q=lond`)
                .then(res =>  res.json())
                .then(res => setWeatherInfo(res.forecast.forecastday.map(dailyforecast =>{
                    return {clear: 100-dailyforecast.day.daily_chance_of_rain, rain: dailyforecast.day.daily_chance_of_rain, snow: dailyforecast.day.daily_chance_of_snow}
                })
                ))
        });
        useEffect(() => {
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=f83db30e731e479eaf451052213012&q=${apiCity}&days=4&aqi=no&alerts=no?key=${apiKey}&q=lond`
                )
                .then(res =>  res.json())
                .then(res => setCurrTemp(res.current.feelslike_f))
                .then(res=>{{setWeatherOdds1({chanceClear: weatherInfo[2].clear, chanceRain: weatherInfo[2].rain, chanceSnow:weatherInfo[2].snow})}})
                .then(res =>  res.json())
                .then(res => setWeatherDesc(res.current.condition.text))
                ;
        });
    
        useEffect(() => {
            fetch(`http://api.weatherapi.com/v1/forecast.json?key=f83db30e731e479eaf451052213012&q=${apiCity}&days=4&aqi=no&alerts=no?key=${apiKey}&q=lond`
                )
                .then(res =>  res.json())
                .then(res => setWeatherDesc(res.current.condition.text))
                ;
        });
        return (
            <div>
            </div>
        )
    }

    const WeatherDay = ({clear, rain, snow, date}) => {

        return (
            <div className='backup'>
                <div>
                    <div>
                        +{date}d
                    </div>
                    <div className={viewport2.clearStyle}>
                        Clear: {clear}%
                    </div>
                    <div  className={viewport2.rainStyle}>
                        Rain: {rain}%
                    </div>
                    <div  className={viewport2.snowStyle}>
                        Snow: {snow}%
                    </div>
                </div>
            </div>
        )
    }
    
    const WeatherOddsSubmit = ({choice, clear, rain, snow, amount}) => {

        let odds = 0
        let forecast = 0

        if (choice==='CLEAR SKIES') {
            odds = 100-clear
            forecast = clear
        } else if (choice==='RAIN') {
            odds=100-rain
            forecast = rain
        } else if (choice==='SNOW') {
            odds = 100-snow
            forecast = snow
        }

        let winAmt = (amount*odds/100)

        if (odds===100) {
            winAmt = 0
        }
        if (odds===0) {
            winAmt = 0 
        }

        return (
            <div className='backup' style={{textAlign:'left'}}>
                <div>
                    <div>
                        <h3 style={{fontSize: 24, color:'white', fontWeight:'bold', textAlign:'left'}}>Payout</h3>
                    </div>
                    <div>
                        <h3 style={{fontSize: 24, color:'white', fontWeight:'bold', textAlign:'left'}}>W: {winAmt}</h3>
                        <h3 style={{fontSize: 24, color:'white', fontWeight:'bold', textAlign:'left'}}>L  : {amount}</h3>            
                    </div>
                    <div>
                    <Row>
                        <h3 style={{fontSize: 24, color:'white', paddingTop:20, paddingLeft:20, fontWeight:'bold', textAlign:'left'}}>Forecast</h3>    
                    </Row>
                    <Row>
                        <h3 style={{fontSize: 24, color:'white', paddingTop:0, paddingLeft:20, fontWeight:'bold', textAlign:'left'}}>{forecast}% </h3>    
                    </Row>

                    </div>
                </div>
            </div>
        )
    }

    //submit
    
    const submitContract = async (city, amount, m, d, y, condition, clear, rain, snow) => {
    
        const usersCollectionRef = collection(db, "contract");
        await addDoc(usersCollectionRef, 
            {city: city,
            clear: clear,
            month: m,
            day: d,
            year: y,
            rain: rain,
            snow: snow, 
            amount: amount,
            condition: condition
        });
    }

    const [submitStatus, setSubmitStatus] = useState(null);

    let newDate = new Date()
    let date = newDate.getDate();
    let contractDate = newDate.getDate()+3;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();


    return (
        <div>
            <Row>
                <div style={{color: 'white', fontSize:'40px', fontWeight:'bold'}}>
                    Create Contract
                </div>
            </Row>
            <Row>
                <Col style={{paddingLeft:'40px'}}>
                    <div>
                        <View style={{width: '100%'}}>
                            <div>
                                <h3 style={{fontSize: 34, color:'white', paddingTop:20, fontWeight:'bold', textAlign: 'left'}}> Select Type </h3>
                            </div> 

                                <Form style={{textAlign:'left', color:'white'}}>
                                    {['radio'].map((type) => (
                                        <div key={`inline-${type}`} className="mb-3">
                                            <Form.Check
                                                inline
                                                label="CLEAR SKIES"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-2`}
                                                onChange={e => {
                                                    e.preventDefault();
                                                    setViewport2({  
                                                        id:0,
                                                        type:'CLEAR SKIES',
                                                        image: sunImg,
                                                        clearStyle:'weatherPick',
                                                        rainStyle:'',
                                                        snowStyle:'',

                                                     })}}
                                            />
                                            <Form.Check
                                                inline
                                                label="RAIN"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-2`}
                                                onChange={e => {
                                                    e.preventDefault();
                                                    setViewport2({  
                                                        id:1,
                                                        type:'RAIN',
                                                        image: rainImg,
                                                        clearStyle:'',
                                                        rainStyle:'weatherPick',
                                                        snowStyle:'', 
                                                     })}}
                                            />
                                            <Form.Check
                                                inline
                                                name="2"
                                                label="SNOW"
                                                name="group1"
                                                type={type}
                                                id={`inline-${type}-3`}
                                                onChange={e => {
                                                    e.preventDefault();
                                                    setViewport2({  
                                                        id:2,
                                                        type:'SNOW',
                                                        image: snowImg,
                                                        clearStyle:'',
                                                        rainStyle:'',
                                                        snowStyle:'weatherPick',
                                                     })}}
                                            />
                                    </div>
                                ))}
                            </Form>

                        </View>
                    </div>                    
                    <div>
                        <View style={{width: '100%'}}>
                            <div style={{marginTop: '10px'}}>
                                <Row>
                                    <h3 style={{fontSize: 34, color:'white', paddingLeft:'20px', fontWeight:'bold', textAlign: 'left'}}> Enter Amount </h3>
                                    <input style={{width:100, height: '35px', paddingLeft:'10px', marginLeft:'10px'}} placeholder="0.0 ETH" onChange={event=>{setShowPopup(event.target.value)}}/>
                                </Row>
                                
                            </div> 
                        </View>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{color:'gray'}}>
                
                        <div>
                            <h2 style={{fontSize: 34, color:'white', paddingTop:20, fontWeight:'bold', textAlign:'left'}}> Select Location </h2>
                        </div>

                        <div >
                            <ReactMapGL className='section'
                                {...viewport} 
                                mapboxApiAccessToken={"pk.eyJ1IjoiY29uZG9yZmx5aW5nbWVzc2VuZ2VyIiwiYSI6ImNreHFuMXh0YTRkcDkydm9rOWsyN20xbTYifQ.nDUY1RJTeicwR8ru4O96vQ"}
                                // mapStyle="mapbox://styles/condorflyingmessenger/ckxqpk9y41r3i14ljj3r2gen2"
                                onViewportChange={viewport => {
                                    setViewport(viewport);
                                }}>
                                        <Marker latitude={34.0522} longitude={-118.2437}>
                                            <button class='marker-btn' onClick={e => {
                                                e.preventDefault();
                                                setSelectedCity('Los Angeles')
                                                setApiCity('los angeles');
                                                setViewport({  
                                                    width:'500px',
                                                    height: '450px',      
                                                    latitude: 34.0552,
                                                    longitude: -118.2437,
                                                    zoom: 5, 
                                                    pitch:0, })
                                            }}>*</button>
                                                
                                        </Marker>
                                        <Marker latitude={40.7128} longitude={-74.0060}>
                                            <button class='marker-btn' onClick={e => {
                                                    e.preventDefault();
                                                    setSelectedCity('New York')
                                                    setApiCity('new york')
                                                    setViewport({  
                                                        width:'500px',
                                                        height: '450px',     
                                                        latitude: 40.7128,
                                                        longitude: -74.0060,
                                                        zoom: 5, 
                                                        pitch:0, })
                                                }}>*</button>
                                        </Marker>
                                        <Marker latitude={25.7617} longitude={-80.1918}>
                                            <button class='marker-btn' onClick={e => {
                                                        e.preventDefault();
                                                        setSelectedCity('Miami')
                                                        setApiCity('miami fl')
                                                        setViewport({  
                                                            width:'500px',
                                                            height: '450px',      
                                                            latitude: 25.7617,
                                                            longitude: -80.1918,
                                                            zoom: 5, 
                                                            pitch:0, })
                                                    }}>*</button>
                                        </Marker>
                                        <Marker latitude={32.7767} longitude={-96.7970}>
                                            <button class='marker-btn' onClick={e => {
                                                        e.preventDefault();
                                                        setSelectedCity('Dallas')
                                                        setApiCity('dallas')
                                                        setViewport({  
                                                            width:'500px',
                                                            height: '450px',      
                                                            latitude: 32.7767,
                                                            longitude: -96.7970,
                                                            zoom: 5, 
                                                            pitch:0, })
                                                    }}>*</button>
                                        </Marker>
                                        <Marker latitude={47.6062} longitude={-122.3321}>
                                            <button class='marker-btn' onClick={e => {
                                                        e.preventDefault();
                                                        setSelectedCity('Seattle')
                                                        setApiCity('seattle washington')
                                                        setViewport({  
                                                            width:'500px',
                                                            height: '450px',     
                                                            latitude: 47.6062,
                                                            longitude: -122.3321,
                                                            zoom: 5, 
                                                            pitch:0, })
                                                    }}>*</button>
                                        </Marker>
            
                                        <Marker latitude={41.8781} longitude={-87.6298}>
                                            <button class='marker-btn' onClick={e => {
                                                        e.preventDefault();
                                                        setSelectedCity('Chicago')
                                                        setApiCity('chicago Illinois')
                                                        setViewport({  
                                                            width:'500px',
                                                            height: '450px',     
                                                            latitude: 41.8781,
                                                            longitude: -87.6298,
                                                            zoom: 5, 
                                                            pitch:0, })
                                                    }}>*</button>
                                        </Marker>
            
                                        <Marker latitude={viewport.latitude} longitude={viewport.longitude} offsetLeft={-20} offsetTop={-10}>
                                                
                                        </Marker>

                                        {selectedCity ? (
                                            <Popup 
                                                latitude={viewport.latitude} 
                                                longitude={viewport.longitude} 
                                                onClose={()=> {
                                                    setSelectedCity(null);
                  
                                                }}>
                                                <WeatherApiCall/>
                                                <div>
                                                    {selectedCity}
                                                </div>
                                            </Popup>
                                        ): null}
                            </ReactMapGL>

                        </div>
                        <div style={{textAlign:'left'}}>
                            {viewport.latitude}, {viewport.longitude} {selectedCity}
                        </div>
                        
                    </div> 
                </Col>
                <Col>
                <div >
                    <h3 style={{fontSize: 34, color:'white', paddingTop:20, fontWeight:'bold', textAlign: 'left'}}> Current Weather </h3>
                    <div className='weather-section' style={{ width:'500px',height: '450px',}}>
                        
                        <div className='weather-box'>
                            <Row>
                                <Col sm={6}>                    
                                    <div className="temp" >
                                        <div style={{textAlign:'left', fontSize:28}}>
                                            {selectedCity}
                                        </div>
                                        <div style={{textAlign:'center'}}>
                                            {currTemp}°F
                                        </div>
                                        <div style={{textAlign:'center'}}>
                                            {weatherDesc}
                                        </div>
                                    </div>
                                </Col>
                                <Col sm>
                                    <div className="weather-box" style={{margin:5}}>
                                        <img src={viewport2.image} style={{width:'140px', paddingRight:'10px', paddingTop:'10px'}}></img>
                                    </div>
                                </Col>
                            </Row>



                        <div style={{display:'flex'}} className='weather-box temp2'>
                            {!!weatherInfo && weatherInfo.map((i, index) => (
                            <div key={index}>
                                <Row >
                                    <WeatherDay clear={100-i.rain} rain={i.rain} snow={i.snow} date={index+1}/>
                                </Row>
                                
                            </div>
                                ))}
                        </div>
                    </div>
                    </div>

                </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{marginTop:30}}>
                        <View style={{width: '100%'}}>
                            <div className='section2' style={{marginTop: '20px'}}>
                                <h3 style={{fontSize: 34, color:'white', paddingTop:20, fontWeight:'bold', textAlign:'left'}}> Submit Contract </h3>
                                <div>
                                    <Row>
                                        <Col>
                                            <Row>
                                                <h3 style={{fontSize: 24, color:'white', paddingTop:20, paddingLeft:20, fontWeight:'bold', textAlign:'left'}}>Location: {selectedCity}</h3>
                                            </Row>
                                            <Row>
                                                <h3 style={{fontSize: 24, color:'white', paddingTop:20, paddingLeft:20, fontWeight:'bold', textAlign:'left'}}>Type: {viewport2.type}</h3>
                                            </Row>

                                            <Row>
                                                <h3 style={{fontSize: 24, color:'white', paddingTop:20, paddingLeft:20, fontWeight:'bold', textAlign:'left'}}>Amount: {showPopup} </h3>
                                                
                                            </Row>

                                            <Row>
                                                <h3 style={{fontSize: 24, color:'white', paddingTop:20, paddingLeft:20, fontWeight:'bold', textAlign:'left', paddingRight: '190px'}}>Date: {month}/{date}/{year}</h3>
                                            </Row>
                                        </Col>

                                        <Col>
                                            <Row>
                                                <WeatherOddsSubmit choice={viewport2.type} clear={weatherOdds1.chanceClear} rain={weatherOdds1.chanceRain} snow={weatherOdds1.chanceSnow} amount={showPopup}/>
                                            </Row>

                                            <Row>
                                                <h3 style={{fontSize: 24, color:'white', paddingTop:20, paddingLeft:20, fontWeight:'bold', textAlign:'left'}}>Contract Date: {month}/{contractDate}/{year}</h3>
                                            </Row>
                                        </Col>

                                        <Col>
                                            <Row>
                                                <button className="btn btn-warning btn-lg m-5" onClick={()=>{submitContract(selectedCity, showPopup, month, contractDate, year, viewport2.type, weatherOdds1.chanceClear, weatherOdds1.chanceRain, weatherOdds1.chanceSnow)}}>Submit Contract</button>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            </div> 
                        </View>
                    </div>
                </Col>
            </Row>
        </div>
        
    );
}
