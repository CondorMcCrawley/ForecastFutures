import './App.css';
import WalletCard from './components/walletcard/WalletCard.js';
import Counter from './components/counter/counter.jsx';
import { Row, Col, Container} from "react-bootstrap";
import MapPlug from './components/mapplug/mapplug.js';
import TransferFunds from './components/transferfunds/transferfunds.js'
import OpenContracts from './components/opencontracts/opencontracts.js'

function App() {
  return (
    <div className="App">
      <div className="gradient__bg">

        <Container>

          <Row>
            <WalletCard/>
          </Row>

          <Row>
            <MapPlug/>
          </Row>

          <Row>
            <OpenContracts/>
          </Row>

          <Row>
            <TransferFunds/>
          </Row>

        </Container>

        <Row>
            <Counter/>  
        </Row>
    

      </div>
    </div>
  );
}

export default App;
