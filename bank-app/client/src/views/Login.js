import React, {Component} from 'react';
import loginBGimg from "../img/Login-bg.png"
import loginLogo from "../img/Login-logo.png"
import userLogo from "../img/User-logo.png"
import passwordLogo from "../img/Password-logo.png"
import { Link } from 'react-router-dom';
// import LoginBackground from '../components/LoginBackground';

// TODO: note that login success will either post user to loginsuccess page
// or somewhere else, who knows?

class Login extends Component {
    render () {
        // const backgroundStyle={
        //     // this has to be back ticks, not single quotes. why.
        //     backgroundImage: `url(${loginBGimg})`,
        //     backgroundSize: 'cover',
        //     backgroundRepeat: 'no-repeat',
            
        // };
        return (
            // <div style={backgroundStyle} >
                // the background
                <div className="LoginPageBG" style={{width: 1440, height: 1024, position: 'relative', backgroundImage: `url(${loginBGimg})`}}>
                    {/* login logo */}
                    
                    <img src={loginLogo} style={{left: 600, top: 288.60, position: 'relative'}} />
                    
                    {/* form box */}
                    <div className="Rectangle" style={{width: 466.05, height: 57.66, left: 486.98, top: 480.54, position: 'absolute', borderRadius: 4, borderLeft: '0.50px white solid', borderTop: '0.50px white solid', borderRight: '0.50px white solid', borderBottom: '0.50px white solid'}} />
                    {/* <div className="Username" style={{width: 130.49, height: 25.63, left: 566.21, top: 497.20, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '300', textTransform: 'uppercase', lineHeight: 20, wordWrap: 'break-word'}}>Username</div> */}
                    <div className="User" style={{width: 31.07, height: 25.63, left: 505.62, top: 497.20, position: 'absolute'}}>
                        <img src={userLogo} style={{position: 'relative'}} />
                    </div>
                    <div className="Rectangle" style={{width: 466.05, height: 57.66, left: 486.98, top: 563.83, position: 'absolute', borderRadius: 4, borderLeft: '0.50px white solid', borderTop: '0.50px white solid', borderRight: '0.50px white solid', borderBottom: '0.50px white solid'}} />
                    {/* <div className="Password" style={{width: 132.05, height: 25.63, left: 566.21, top: 580.48, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '300', textTransform: 'uppercase', lineHeight: 20, wordWrap: 'break-word'}}>password</div> */}
                    <div className="Lock" style={{width: 31.07, height: 25.63, left: 505.62, top: 580.48, position: 'absolute'}}>
                        <img src={passwordLogo} style={{position: 'relative'}} />
                    </div>
                    {/* <div className="LoginBtn" style={{width: 501, height: 62.75, left: 469, top: 676.58, position: 'absolute'}}>
                        <div className="Login" style={{position: 'relative', textAlign: 'center', color: '#2148C0', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '600', textTransform: 'uppercase', lineHeight: 20, wordWrap: 'break-word'}}>login</div>
                        <div className="Rectangle" style={{width: 501, height: 62.75, left: 0, top: 0, position: 'absolute', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.30)', borderRadius: 4}} />
                        
                    </div> */}
                    <div className="Rectangle" style={{width: 1000, height: 62.75, left: 480, top: 676.58, position: 'absolute'}}>
                        <Link to="/">
                            <button type="button" style={{width: 500, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.30)', borderRadius: 4}}>
                                <p>Login!</p>
                            </button>
                        </Link>
                    </div>


                </div>
            // </div>
        );
    }

}

export default Login;

