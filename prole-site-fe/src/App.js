import React from 'react';
import ProleTitle from "./common-build/components/prole-title";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "./home";
import Try from "./try";
import About from "./about";
import Button from "@material-ui/core/Button";
import Data from "./data";
import {isMobile} from 'react-device-detect';

const buttonStyle = {
    textTransform: 'none',
};

const wrapperStyle = isMobile ? {
    marginLeft: '20px'
} : {
    justifyContent: 'center', width: '100%', display: 'flex'
};

function App() {

    return (
        <div style={wrapperStyle}>
            <div style={{ width: isMobile ? '90%' : '30%', marginTop: isMobile ? '50px' : '200px' }}>
                <ProleTitle size='60px' weight={100}/>
                <div style={{marginTop: isMobile ? '50px' : '150px', width: isMobile ? '100%' : '400px'}}>
                    <BrowserRouter>
                        <div style={{ display: 'flex', flexGrow: 1, marginBottom: '50px'}}>
                            <Button style={buttonStyle} href="/" color="black">home</Button>
                            <Button style={buttonStyle} href="/try" color="black">try</Button>
                            <Button style={buttonStyle} href={process.env.REACT_APP_CHROME_EXTENSION_INSTALL_LOC} color="black" target="_blank" rel="noopener noreferrer">install</Button>
                            <Button style={buttonStyle} href="/about" color="black">about</Button>
                            <Button style={buttonStyle} href="/data" color="black">data</Button>
                        </div>
                        <Route exact path='/' component={Home}/>
                        <Route path='/try' component={Try}/>
                        <Route path='/about' component={About}/>
                        <Route path='/data' component={Data}/>
                    </BrowserRouter>
                </div>
            </div>

        </div>
    );
}

export default App;
