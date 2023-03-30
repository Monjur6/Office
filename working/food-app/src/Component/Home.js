import React from 'react';
import jwt_decode from 'jwt-decode';

function Home() {
  // Check if user is authenticated
  const token = localStorage.getItem('token');
  let decoded = null;
  try {
    decoded = jwt_decode(token);
  } catch (error) {
    // Invalid token
  }
  const isAuthenticated = decoded && decoded.username === 'admin';

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Access Denied</h1>
        <p>You need to log in as admin to access this page.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Hello Bangladesh</h1>
    </div>
  );
}

export default Home;
