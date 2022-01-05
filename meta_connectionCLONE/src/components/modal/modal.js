import React from 'react';
import './Modal.css';
import { Row } from "react-bootstrap";
import { db } from './../../firebase-config'
import { collection, doc, deleteDoc } from "firebase/firestore";

function Modal({ closeModal, city, condit, amount, clear, rain, snow, walletAddress}) {

    let oppositeType = ''
    let odds = 0

    if (condit==='RAIN') {
        oppositeType='CLEAR SKIES'
        odds = clear
    } else if (condit==='SNOW') {
        oppositeType='CLEAR SKIES'
        odds = snow
    } else if (condit==='CLEAR SKIES') {
        oppositeType='RAIN'
        odds = rain 
    }

    let loseAmt = amount*odds/100
    let winAmt = amount-loseAmt

    if (odds===100) {
        winAmt = 0
    }
    if (odds===100) {
        winAmt = 0 
    }

    const usersCollectionRef = collection(db, "contract");

    const initializeSmartContract = async (id) => {
        // submit to smart contract
        // add to next db, show in closed contracts 
        
        const userDoc = doc(db, "contract", id)
        await deleteDoc(userDoc);
      }

    return (
        <div className='modalBackground'>
            
            <div className='modalContainer'>
                
                <div className='title'>
                    <h1>Contract Details</h1>
                </div>
                    
                <div className='body'>
                    <Row>
                        {city} | {oppositeType} | date 
                    </Row>
                    <Row>
                        Send {loseAmt} eth to submit.
                    </Row>
                    <Row>
                        Win: {winAmt} eth Odds: {odds}%
                    </Row>
                     

                </div>
                    
                <div className='footer'>
                    <button onClick={() => closeModal(false)}>Continue</button>
                    <button onClick={() => closeModal(false)} id="cancelBtn">Cancel</button>

                </div>

            </div>

        </div>
    );

}

export default Modal;
