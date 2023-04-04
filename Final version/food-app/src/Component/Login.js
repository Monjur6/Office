import React, { useState } from 'react';
import "../CSS/Login.css";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import FacebookLogin from "react-facebook-login";
import { useNavigate } from 'react-router-dom';
import axios from "axios"


function Login() {
    // Declare state variables for username, password, and token
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //const [token, setToken] = useState('');
    // Get a reference to the navigate function from the react-router-dom library
    const navigate = useNavigate();

    // // Define register function that will be called when user clicks "Create Account" button
    // const register = async () => {
    //   // Get the email and password input values from the HTML form
    //   const email = document.getElementById('email').value;
    //   const password = document.getElementById('password').value;

    //   try {
    //     // Send a POST request to the server with the email and password data
    //     const response = await fetch('https://localhost:7209/api/Authenticate/register', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify({ email, password })
    //     });
    //     // Parse the response as JSON
    //     const result = await response.json();
    //     // If the response is not OK (i.e. there was an error), throw an error with the error message from the server
    //     if (!response.ok) {
    //       const errorMessage = result.message || 'Failed to create account';
    //       throw new Error(errorMessage);
    //     }

    //     // Display success message
    //     alert('Account created successfully!');

    //   } catch (error) {
    //     // If there was an error (e.g. server error or network error), display an error message to the user
    //     const errorMessage = error.message || 'Failed to create account';
    //     alert(`Error: ${errorMessage}`);
    //   }
    // };

    // Declare a function that logs in using an API
    const ProceedLoginusiingAPI=(e)=>{
      e.preventDefault();
      // Make a POST request to an API endpoint to log in
      fetch('https://localhost:7209/api/Authenticate/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username, password:password })
      })
      .then((response) => {
        return response.text(); // Convert response to plain text
     })
     .then((responseJson) => {
      // Save the response token in local storage
        localStorage.setItem('token', responseJson);
        // Navigate to the home page after successful login
        navigate("/home");

     })

      .catch(error => console.error(error));
    };
    // Declare a function that logs in using Google OAuth
    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            try{
              // Make a GET request to the Google OAuth userinfo API to get user data
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
      // Declare a function that logs in using Facebook OAuth
      const responseFacebook = async (response) => {
        try {
          const {accessToken, username} = response;
          // Make a GET request to the Facebook API to get user data
          const data = await axios.get(`https://graph.facebook.com/${username}?fields=id,name,email&access_token=${accessToken}`)
          console.log(data);
        } catch(err) {
          console.log(err);
        }
      }
      // Render the login form and buttons
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
                        {/* <form onSubmit={register}>
                        <div className="form-group " >
                            <input type="email" id="email" name="email" required className="form-control login-info"  placeholder="Enter Email"  />
                        </div>
                        <div className="form-group ">
                            <input type="password" id="password" name="password" required className="form-control login-info"  placeholder="Password" />
                        </div>
                        <button className="btn btn-success font-weight-bold" style={{width:"240px", borderRadius:"8px"}} type="submit">Create Account</button>
                        </form> */}

                    <p style={{marginTop:"10px"}}>or</p>

                    <button className="btn login-with d-flex align-items-center" onClick={login}> {/* This button component allows the user to login with their Google account. */}
                    <FcGoogle/>
                        <span className="mx-auto">Continue with Google</span>
                    </button>

                    {/* <button className="btn login-with d-flex align-items-center" style={{marginBottom:"30px"}} >
                        <i class="fa-brands fa-facebook mr-2" style={{color:"#0E8DF1"}}/>
                        <span className="mx-auto">Continue with Facebook</span>
                    </button> */}

                     <FacebookLogin /* This button component allows the user to login with their Facebook account. */
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
