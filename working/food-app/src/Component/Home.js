import React from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate} from 'react-router-dom';
function Home() {
  // Get a reference to the navigate function from the react-router-dom library
  const navigate = useNavigate();
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  let decoded = null;
  try {
    decoded = jwt_decode(token);
console.log(decoded);
  } catch (error) {
    // Invalid token
  }
  // Define logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };
  // Check if user is authenticated as admin
  const isAuthenticated = decoded && decoded.UserName === 'admin';
// Render content based on authentication status
  if (isAuthenticated) {
    return (
      <div>
      <h1>Hello Bangladesh</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
    );
  }
  else{
    return (
    
      <div>
      <h1>Access Denied</h1>
      <p>You need to log in as admin to access this page.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
    );
  }
  
}

export default Home;
