import React, { useContext, useEffect } from 'react'
import { NavContext } from '../App.js'
import Identicon from 'identicon.js'
import "../App.css"

function Navbar() {
    const { accounts } = useContext(NavContext); 
    const [data, setData] = React.useState(undefined); 

    useEffect(() => {
        if(accounts){
            var data = new Identicon(accounts, 30).toString();
            setData(data);
        }
      }, [accounts]);

    return (
        <div>
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="https://tolgakmbl.github.io/" target="_blank">Tolga Kümbül | Todo List</a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small><span id="account-address"> {accounts} </span></small>

                        { accounts
                            ? <img
                                className="ml-2"
                                width='30'
                                height='30'
                                src={`data:image/png;base64,${data}`} 
                                alt=""
                            />
                            : <span></span>
                        }
                    </li>
                </ul>
            </nav>            
        </div>
    )
}

export default Navbar
