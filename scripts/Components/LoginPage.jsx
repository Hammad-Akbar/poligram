import React, {useState} from 'react';
import GoogleLogin from 'react-google-login';
import socket from './Socket';


function LoginPage ({setIsAuth}) {
  function responseGoogleSuccess (response) {

    setIsAuth(true);
    if ('profileObj' in response) {
      const { email, name, imageUrl } = response.profileObj;
      socket.emit('connect user', {
        email,
        name,
        imageUrl,
      });
    }
  };

  function responseGoogleFailure (error) {
    alert(error);
  };

  return (
    <div className="login-page">
      <div>
        <h3> Please Login to Access Poligram </h3>
      </div>
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
};

export default LoginPage;