import React, { useState } from 'react';
import './OpenContracts.css'
import { Row, Col, Container, Form} from "react-bootstrap";

const OpenContracts = () => {

    const [contract, setContract] = useState('Los Angeles');

    return (
        <div>
            <h3 style={{fontSize: 34, color:'white', paddingTop:40, fontWeight:'bold', textAlign:'left'}}> Open Contracts </h3>
            <div style={{color:'white', textAlign:'left'}}>Browse open weather contracts below. </div>

            <Row>
                <div className='open-contract-box'>
                    <div className='contract'>
                        1. { contract }, CA | January 7, 2022 | Sunny | 0.2ETH
                    </div>
                    <div className='odds'>
                        Odds: 20%
                    </div>
                    <div >
                        <button className="btn btn-primary btn-md" style={{paddingLeft:'10px', display:'inline-block'}}>Enter Contract</button>
                    </div>

                </div>
            </Row>

        </div>
    );
  };
export default OpenContracts;
