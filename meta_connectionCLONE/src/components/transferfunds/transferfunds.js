import React, {useState} from 'react'
import {ethers} from 'ethers'
import './TransferFunds.css'

const TransferFunds = () => {

    const [startDate, setStartDate] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
    const [textDescription, setTextDescription] = useState('Connect your crypto wallet using Chrome\'s built in MetaMask extension.')
    const [contractAddress, setContractAddress] = useState(null);
    const [contractAmount, setContractAmount] = useState(null);
    const [contractOutput, setContractOutput] = useState(null);
    const [transactionReport, setTransactionReport] = useState(null);

     const initializeContract = async () => {
        if (ethers.utils.getAddress(contractAddress)) {
            
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const transaction = await signer.sendTransaction({
                to: contractAddress, 
                value: ethers.utils.parseEther(contractAmount)
            });

            //setContractOutput('Deliver to: ' + contractAddress + ' , Amt. To Deliver:' + contractAmount + ' ETH.')
            setContractOutput('Transaction Summary')
            let tx_hash = transaction.hash
            let tx_blockNum = transaction.blockNumber
            let tx_gasprice = transaction.gasPrice.toString()
            let tx_to = transaction.to.toString()
            let tx_from = transaction.from.toString()
            let tx_value =  ethers.utils.formatEther(transaction.value).toString()

            setTransactionReport(
            <div>
                <div>
                    Hash: { tx_hash }
                </div>
                <div>
                    BlockNum: {tx_blockNum}
                </div>
                <div>
                    GasPrice: {tx_gasprice}
                    </div> 
                <div>
                    To: {tx_to}
                    </div> 
                <div>
                    From: {tx_from}
                    </div> 
                 <div>
                    Eth Value: {tx_value}
                    </div> 
            </div>)

        } else {
            setContractOutput('Invalid Address.');
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
        <div>
            {errorMessage}
            <div className='gpt3__header-content'>
                <div className="gpt3__header-content">

                    <div className='headerContent'>
                        <h3 style={{fontSize: 34, color:'white', paddingTop:20, fontWeight:'bold'}}> Transfer Funds </h3>
                    </div>

                    <div> 
                        <input style={{width:500}} placeholder="Recipient Address" onChange={event => setContractAddress(event.target.value)}/>
                    </div> 

                    <div style={{paddingTop: 10}} >
                        <input style={{width:100}} placeholder="Amount" onChange={event => setContractAmount(event.target.value)}/>
                        
                        <button className="btn btn-warning btn-sm m-3" onClick={initializeContract}>Submit Payment</button>
                    </div>

                    <div>
                        <h1 style={{fontSize: 24, textAlign: 'left', color: '#566573'}}>{ contractOutput }</h1>
                        <h1 style={{fontSize: 24, textAlign: 'left', color: '#34495E'}}>{ transactionReport }</h1>
                    </div>
                </div>
            </div>
        </div>
	)
    }

export default TransferFunds;