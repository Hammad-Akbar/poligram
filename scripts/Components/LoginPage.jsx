import React from 'react';
import GoogleLogin, { GoogleLogout } from 'react-google-login';

import Swal from 'sweetalert2';
import socket from './Socket';
import './styles/home.css';

export function LoginPage({ setIsAuth }) {
  function responseGoogleSuccess(response) {
    setIsAuth(true);
    if ('profileObj' in response) {
      const { email, name, imageUrl } = response.profileObj;
      socket.emit('connect user', {
        email,
        name,
        imageUrl,
      });
    }
  }

  // eslint-disable-next-line no-unused-vars
  function responseGoogleFailure(error) {
    Swal.fire({ icon: 'error', text: 'Login failed. Try again.' });
  }

  return (
    <div className="login-page">
      <div>
        <GoogleLogin
          clientId="326998400447-ku2me5to6bp01icn5m4pr7lgd1jbkfet.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogleSuccess}
          onFailure={responseGoogleFailure}
          cookiePolicy="single_host_origin"
        />
      </div>
    </div>
  );
}

export function LogoutPage({ setIsAuth }) {
  // eslint-disable-next-line no-unused-vars
  function logout(response) {
    setIsAuth(false);

    socket.emit('user logout');
  }
  return (
    <div className="login-page">
      <div>
        <GoogleLogout
          clientId="326998400447-ku2me5to6bp01icn5m4pr7lgd1jbkfet.apps.googleusercontent.com"
          buttonText="Logout"
          onLogoutSuccess={logout}
        />
      </div>
    </div>
  );
}
