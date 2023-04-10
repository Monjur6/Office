import React, { useState } from 'react';
import "../CSS/Login.css";
function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [location, setLocation] = useState('');
    // Define register function that will be called when user clicks "Create Account" button
    
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            const location = data.city || data.locality || data.principalSubdivision || data.countryName;
            setLocation(location);
          } catch (error) {
            console.log(error.message);
          }
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const userData = {
      firstName,
      lastName,
      username: userName,
      dateOfBirth,
      email,
      password,
      location
    };
  
    try {
      const response = await fetch('https://localhost:7209/api/Authenticate/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (response.ok) {
        // handle successful registration
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  

  return (
    <div class="container d-flex flex-column justify-content-center align-items-center vh-100">
  <div class="card p-4">
    <form onSubmit={handleSubmit}>
      <div class="mb-3 row">
        <div class="col">
          <label for="firstName" class="form-label">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            class="form-control"
          />
        </div>
        <div class="col">
          <label for="lastName" class="form-label">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            class="form-control"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col">
          <label for="username" class="form-label">Username:</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(event) => setUserName(event.target.value)}
            class="form-control"
          />
        </div>
        <div class="col">
          <label for="dateOfBirth" class="form-label">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
            class="form-control"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col">
          <label for="email" class="form-label">Email:</label>
          <input //type="email" id="email" name="email" required className="form-control"  placeholder="Enter Email"
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            class="form-control"
          />
        </div>
      </div>
      <div class="mb-3 row">
        <div class="col">
          <label for="password" class="form-label">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            class="form-control"
          />
        </div>
        <div class="col">
          <label for="confirmPassword" class="form-label">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            class="form-control"
          />
        </div>
      </div>
      <div class="mb-3 row">
      </div>
      <div class="mb-3 row">
        <div class="col-3 align-self-center">
          <button type="button" onClick={getLocation} class="btn btn-secondary mt-2 get_location">Get Location</button>
        </div>
        <div class="col-9">
          <input type="text" id="location" value={location} onChange={(event) => setLocation(event.target.value)} readOnly class="form-control" />
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
  </div>
</div>


  );
}

export default Register;
