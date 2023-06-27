import React, {Component} from 'react';
import loginBGimg from "../img/Login-bg.png"
// import LoginBackground from '../components/LoginBackground';

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
                    
                    {/* form box */}
                    <div className="Rectangle" style={{width: 466.05, height: 57.66, left: 486.98, top: 480.54, position: 'absolute', borderRadius: 4, borderLeft: '0.50px white solid', borderTop: '0.50px white solid', borderRight: '0.50px white solid', borderBottom: '0.50px white solid'}} />
                    <div className="Username" style={{width: 130.49, height: 25.63, left: 566.21, top: 497.20, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '300', textTransform: 'uppercase', lineHeight: 20, wordWrap: 'break-word'}}>Username</div>
                    <div className="User" style={{width: 31.07, height: 25.63, left: 505.62, top: 497.20, position: 'absolute'}}>
                        <div className="Vector" style={{width: 20.71, height: 6.41, left: 5.18, top: 16.02, position: 'absolute', border: '0.50px white solid'}}></div>
                        <div className="Vector" style={{width: 10.36, height: 8.54, left: 10.36, top: 3.20, position: 'absolute', border: '0.50px white solid'}}></div>
                    </div>
                    <div className="Rectangle" style={{width: 466.05, height: 57.66, left: 486.98, top: 563.83, position: 'absolute', borderRadius: 4, borderLeft: '0.50px white solid', borderTop: '0.50px white solid', borderRight: '0.50px white solid', borderBottom: '0.50px white solid'}} />
                    <div className="Password" style={{width: 132.05, height: 25.63, left: 566.21, top: 580.48, position: 'absolute', textAlign: 'center', color: 'white', fontSize: 14, fontFamily: 'Montserrat', fontWeight: '300', textTransform: 'uppercase', lineHeight: 20, wordWrap: 'break-word'}}>password</div>
                    <div className="Lock" style={{width: 31.07, height: 25.63, left: 505.62, top: 580.48, position: 'absolute'}}>
                        <div className="Vector" style={{width: 23.30, height: 11.75, left: 3.88, top: 11.75, position: 'absolute', border: '0.50px white solid'}}></div>
                        <div className="Vector" style={{width: 12.95, height: 9.61, left: 9.06, top: 2.14, position: 'absolute', border: '0.50px white solid'}}></div>
                    </div>
                    <div className="LoginBtn" style={{width: 501, height: 62.75, left: 469, top: 676.58, position: 'absolute'}}>
                        <div className="Rectangle" style={{width: 501, height: 62.75, left: 0, top: 0, position: 'absolute', background: 'white', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.30)', borderRadius: 4}} />
                        <div className="Login" style={{width: 90.18, height: 27.89, left: 205.41, top: 18.13, position: 'absolute', textAlign: 'center', color: '#2148C0', fontSize: 16, fontFamily: 'Montserrat', fontWeight: '600', textTransform: 'uppercase', lineHeight: 20, wordWrap: 'break-word'}}>login</div>
                    </div>
                    {/* login logo */}
                    <div className="Vector" style={{width: 185.47, height: 99.19, left: 627.21, top: 264, position: 'absolute', border: '1.88px white solid'}}></div>
                    <div className="Vector" style={{width: 42.46, height: 46.82, left: 713.61, top: 288.60, position: 'absolute', background: 'white'}}></div>
                    <div className="Vector" style={{width: 17.30, height: 14.28, left: 706.01, top: 375.09, position: 'absolute', border: '1.50px white solid'}}></div>
                    <div className="Vector" style={{width: 17.30, height: 14.28, left: 748.29, top: 375.09, position: 'absolute', border: '1.50px white solid'}}></div>
                </div>
            // </div>
        );
    }

}

export default Login;

