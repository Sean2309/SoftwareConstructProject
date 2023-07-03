import React, {Component} from 'react';
// import loginBGimg from "../img/Login-bg.png"
import loginLogo from "../img/Login-logo.png"
import LoginPage from "../components/LoginPage"

import '../css/login-styles.css'
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
            // TODO: redo this trainwreck later
            // <div style={backgroundStyle} >
                // the background
                <body className="login-page-bg">
                    {/* login logo */}

                    <div className="logo-box" >
                        <img src={loginLogo}></img>
                    </div>
                    
                    {/* <img src={loginLogo} style={{left: 600, top: 288.60, position: 'relative', zIndex: 1}} /> */}
                    
                    {/* form box */}
                    {/* <div className="form-box" >
                        <img src={userLogo} />
                    </div> */}
                    {/* <div className="Username" style={{width: 130.49, height: 25.63, left: 566.21, top: 497.20, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '300', textTransform: 'uppercase', lineHeight: 20, wordWrap: 'break-word'}}>Username</div> */}
                    {/* <div className="User" style={{width: 31.07, height: 25.63, left: 505.62, top: 497.20, position: 'absolute'}}>
                        <img src={userLogo} style={{position: 'relative'}} />
                    </div> */}
                    {/* <div className="form-box">
                        <img src={passwordLogo}/>
                    </div> */}
                    {/* <div className="Password" style={{width: 132.05, height: 25.63, left: 566.21, top: 580.48, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '300', textTransform: 'uppercase', lineHeight: 20, wordWrap: 'break-word'}}>password</div> */}
                    {/* <div className="Lock" style={{width: 31.07, height: 25.63, left: 505.62, top: 580.48, position: 'absolute'}}>
                        <img src={passwordLogo} style={{position: 'relative'}} />
                    </div> */}
                    {/* <div className="LoginBtn" style={{width: 501, height: 62.75, left: 469, top: 676.58, position: 'absolute'}}>
                        <div className="Login" style={{position: 'relative', textAlign: 'center', color: '#2148C0', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '600', textTransform: 'uppercase', lineHeight: 20, wordWrap: 'break-word'}}>login</div>
                        <div className="Rectangle" style={{width: 501, height: 62.75, left: 0, top: 0, position: 'absolute', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.30)', borderRadius: 4}} />
                        
                    </div> */}

                    <div className="login-form">
                        <LoginPage/>
                    </div>
                    

                        
                    {/* <div className="Rectangle">
                        <Link to="/">
                            <button type="button" style={{width: 500, position: 'relative', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.30)', borderRadius: 4}}>
                                <p>Login!</p>
                            </button>
                        </Link>
                    </div> */}


                </body>
            // </div>
        );
    }

}

export default Login;

