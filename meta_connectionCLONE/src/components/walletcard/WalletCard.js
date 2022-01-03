import React, {useState} from 'react'
import {ethers, Signer} from 'ethers'
import './Walletcard.css'

const WalletCard = () => {

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [textDescription, setTextDescription] = useState('Connect your crypto wallet using Chrome\'s built in MetaMask extension.')

    const connectWalletHandler = () => {
        if (window.ethereum) {
            //metamask is installed
            window.ethereum.request({method: 'eth_requestAccounts'})
            .then(result => {
                accountChangedHandler(result[0]);

            })
        } else {
            //install metamask extension to continue
            setErrorMessage('Install Chrome\'s MetaMask extension to continue.');
        }
    }

    const accountChangedHandler = (newAccount) => {
        setDefaultAccount("Account:" + newAccount);
        getUserBalance(newAccount.toString());
        setConnButtonText('Uptade')

        
    }

    const getUserBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
        .then(balance => {
            setUserBalance("Balance: " + ethers.utils.formatEther(balance)+" ETH");
            setTextDescription(null)
        })
    }

    const chainChangedHandler = () => {
        window.location.reload();
    }

    window.ethereum.on('accountsChanged', accountChangedHandler);

    window.ethereum.on('chainChanged', chainChangedHandler);

	return (
        <div className='gpt3__header' id="home">
            {errorMessage}
            <div className='gpt3__header-content'>
                <div className="gpt3__header-content">

                    
                    <h1 style={{color: "white", paddingTop: 30}}>forecast futures</h1>
                    <h4 style={{color: "white", textAlign:'left', flex:0}}> { textDescription } </h4>

                    <div className="headerContent">
                        <h3 style={{color:'white', textAlign: 'left'}}> {defaultAccount}</h3>
                    </div>			

                    <div className='headerContent'>
                        <h3 style={{color:'white'}}> {userBalance} </h3>
                    </div>

                    <div>
                        <button style={{ fontSize: 24 }} className="btn btn-primary btn-sm m-1" onClick={connectWalletHandler}>{connButtonText}</button>
                    </div>
                </div>
            </div>
        </div>
	)
    }

export default WalletCard;