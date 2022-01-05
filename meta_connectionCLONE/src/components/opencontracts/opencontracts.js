import React, { useState, useEffect } from 'react';
import './OpenContracts.css'
import { Row } from "react-bootstrap";
import { db } from './../../firebase-config'
import { collection, getDocs } from "firebase/firestore";
import Modal from './../modal/modal.js'

const OpenContracts = () => {

    const [users, setUsers] = useState([]);
    const usersCollectionRef = collection(db, "contract");
    
    useEffect(() => {

        const getUsers = async () => {
        const data = await getDocs(usersCollectionRef);
        setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
        console.log(data)

        }

        getUsers()

    })

    const [openModal, setOpenModal] = useState(false);

    return (
        <div>
            <h3 style={{fontSize: 34, color:'white', paddingTop:40, fontWeight:'bold', textAlign:'left'}}> Open Contracts </h3>
            <div style={{color:'white', textAlign:'left'}}>Browse open weather contracts below. </div>
            {users.map((user, id) => {
            return (
                <div>
                    <Row>
                        <div className='open-contract-box'>
                            <div className='contract'>
                                {id+1}. { user.city } | {user.condition} | {user.amount}ETH | {user.month}/{user.day}/{user.year} 
                            </div>
                            <div className='odds'>
                                Clear: {user.clear}% Rain: {user.rain}% Snow: {user.snow}%
                            </div>
                            <div >
                                <button className="btn btn-primary btn-md" style={{paddingLeft:'10px', display:'inline-block'}} onClick={() => setOpenModal(true)}>Enter Contract</button>
                                {openModal && <Modal closeModal={setOpenModal} city={user.city} condit={user.condition} amount={user.amount} clear={user.clear} rain={user.rain} snow={user.snow} walletAddress='COMING'/>}
                            </div>
                        </div>
                    </Row>    
                </div>);
            })}
        </div>
    );
  };
export default OpenContracts;
