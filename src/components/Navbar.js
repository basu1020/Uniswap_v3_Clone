import React, { useContext, useState, useEffect } from 'react'
import PageButton from './PageButton'
import userContext from './context/userContext'
import { ethers } from 'ethers'

const Navbar = () => {
    const context = useContext(userContext)
    const {
        onClickConnector,
        disconnectWallet,
        account,
        ethersProvider,
        userETHbalance,
        expProvider,
        web3Modal,
    } = context

    const [userBalance, setUserBalance] = useState(null)
    // const [provid, setProvid] = useState(ethersProvider)
    const displayAddress = `${account?.substring(0, 10)}...`

    const onClickConnectWallet = () => {
        if (!account) {
            onClickConnector()
        }
    }

    useEffect(() => {
        const gettingIt = async (acc) => {
            const bal = await expProvider.getBalance(acc)
            setUserBalance(String(bal / 10 ** 18))
        }

        if (account && expProvider) {
            gettingIt(account)
        }
        
    }, [account, userBalance, expProvider])
    
    return (
        <div className="appNav">
            <img src="https://seeklogo.com/images/U/uniswap-logo-782F5E6363-seeklogo.com.png" alt="uniswap-logo" style={{ height: "30px", width: "auto", position: "absolute", left: "10%", top: "2%" }} />

            <div className="rightNav">
                <div className="connectButtonContainer">
                    {userBalance && account ?
                        <div 
                            className="btn my-2 connectButton"
                        >
                            {userBalance ? userBalance.substring(0,5) + " gorETH" : ""}
                        </div>
                    : ""    
                }
                    <div
                        className="btn my-2 connectButton"
                        onClick={onClickConnectWallet}
                    >
                        {account ? displayAddress : "Connect Wallet"}
                    </div>
                    {account &&
                        <div
                            className="btn my-2 connectButton"
                            onClick={disconnectWallet}>
                            Disconnect
                        </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default Navbar