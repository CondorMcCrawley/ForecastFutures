   // import Web3 from 'web3';
// import WeatherSmartContract from './truffle/build/contracts/weatherSmartContract.json'

   
    // const web3 = new Web3(provider)
    // const newtworkId = await web3.eth.getId();
    
    // const weatherContract = new web3.eth.Contract(WeatherSmartContract.abi, weatherContract.newtworks[networkId].address)


            //setTransactionReport(transaction.blockNumber);

            for (let [key, value] of Object.entries(transaction)) {
                console.log(key, value);
            }

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import { Row, Col, Container} from "react-bootstrap";
import './Submit.css'

const Submit = () => {

    var nextWeek = new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);

    const [startDate, setStartDate] = useState(nextWeek);
            <Row>

                <DatePicker 
                    selected={startDate} 
                    onChange={(date) => setStartDate(date)}
                    dateFormat={'MM/dd/yyyy'}
                    minDate={new Date()}
                    //maxDate={}
                    isClearable
                    showYearDropdown
                    scrollableYearDropdown 
                    />

                </Row>


import fb from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBVPAXysuJ70qUO60GiyIFBE95DXEIc058",
  authDomain: "forecastfuturesdb.firebaseapp.com",
  projectId: "forecastfuturesdb",
  storageBucket: "forecastfuturesdb.appspot.com",
  databaseURL: "https://forecastfuturesdb-default-rtdb.firebaseio.com/",
  messagingSenderId: "240868430476",
  appId: "1:240868430476:web:5fd4c700bdcff07bbc21a9"
};

function initFirebase() {
    if (!fb.apps.length) {
        fb.initializeApp(firebaseConfig);
    }
}

initFirebase();


export default { fb };

// Push Function
import { firebase } from './../../firebase.js';

const database = firebase.database();
    const Push = () => {
            database.ref("contract").set({
            city: selectedCity,
            type: showPopup,
            data: month,
            type2: viewport2.type,
            clear: weatherOdds1.chanceClear,
            rain: weatherOdds1.chanceRain,
            snow: weatherOdds1.chanceSnow,

        }).catch(alert);
    }
