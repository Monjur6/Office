import React, { useState } from 'react';
import "./Login.css";
import { FcGoogle } from "react-icons/fc";
// import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from "react-facebook-login";
import { useNavigate, Navigate } from 'react-router-dom';

import axios from "axios"
// import { toast } from "react-toastify";
// import userEvent from '@testing-library/user-event';

  
function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    const ProceedLoginusiingAPI=(e)=>{
      e.preventDefault();
          
      fetch('https://localhost:7296/api/Auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Username: username, Password: password })
      })
      .then(response => response.json())
      .then(data => {
        localStorage.setItem('token', data.token);
        sessionStorage.setItem('token', data.token);
        console.log('Local Storage token:', localStorage.getItem('token'));
        console.log('Session Storage token:', sessionStorage.getItem('token'));
        setToken(data.token);
        navigate("/home");
        return <Navigate to='/home' />;
      })
      .catch(error => console.error(error));
    };
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try{
                    const data = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",{
                    headers:{"Authorization": `Bearer ${tokenResponse}`}
                })
                console.log(data)
            }
            catch(err){
                console.data(err)
            }
        }
      });
      const responseFacebook = async (response) => {
        try {
          const {accessToken, username} = response;
          const data = await axios.get(`https://graph.facebook.com/${username}?fields=id,name,email&access_token=${accessToken}`)
          console.log(data);
        } catch(err) {
          console.log(err);
        }
      }
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="container" style={{ maxWidth: "800px", height: "500px" }}>
            <div className="row d-flex login-row h-100 w-100">
                <div className="col-12 col-md-6 order-md-first text-center d-flex flex-column justify-content-center align-items-center text-center login-left-col">
                    <h2 className="font-weight-bold" style={{marginTop:"10px"}}>Welcome Back!</h2>
                    <p>To Keep Connected with us please <br/> login with your personal info</p>
                    <p>Have an account?</p>
                    <button className="btn font-weight-bold sign-in-button" style={{}}>SIGN IN</button>
                </div>
                <div className="col-12 col-md-6 order-first text-center d-flex flex-column justify-content-center align-items-center text-center login-right-col">
                    <h4 style={{color:"#3D1E19"}}>Get Started With Food App</h4>
                    <p style={{color:"7d443c"}}>Getting started is free and easy</p>
                    <br/>
                        <form onSubmit={ProceedLoginusiingAPI}>
                        <div className="form-group " >
                            <input type="text" className="form-control login-info" value={username} placeholder="Enter Email" onChange={(event)=>{setUsername(event.target.value)}} />
                        </div>
                        <div className="form-group ">
                            <input type="password" className="form-control login-info" value={password} placeholder="Password" onChange={(event)=>{setPassword(event.target.value)}}/>
                        </div>
                        <button className="btn btn-success font-weight-bold" style={{width:"240px", borderRadius:"8px"}} type="submit">Create Account</button>
                        </form>
                    <p style={{marginTop:"10px"}}>or</p>
                    <button className="btn login-with d-flex align-items-center" onClick={login}>
                    <FcGoogle/>
                        <span className="mx-auto">Continue with Google</span>
                    </button>
                    
                    {/* <button className="btn login-with d-flex align-items-center" style={{marginBottom:"30px"}} >
                        <i class="fa-brands fa-facebook mr-2" style={{color:"#0E8DF1"}}/>
                        <span className="mx-auto">Continue with Facebook</span>
                    </button> */}
                    {/* <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse.credential);
                            var decoded = jwt_decode(credentialResponse.credential);
                            console.log(decoded);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    /> */} <FacebookLogin
                      appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                      fields="name,email,picture"
                      callback={responseFacebook}
                      icon={<i className="fa-brands fa-facebook mr-2" style={{color:"#0E8DF1"}}/>}
                      textButton="Continue with facebook"
                      cssClass="btn login-with d-flex align-items-center"
                      style={{marginBottom:"30px"}}
                    />
                </div>
            </div>
      </div>   
      </div>
  );
}

export default Login;
