import React, { useState } from 'react';
import './styles/reduction.scss';
import './App.css';
import Home from './pages/home/Home';
import SignIn from './pages/signIn/signIn';
import PageSpinner from './components/PageSpinner';
import getViewport from './lib/viewpoint';
import Response from './lib/Response';
import apiClient from './lib/apiClient';
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from './config/settings';

function App() {
  let [accessToken, setAccessToken] = useState();
  let [adminId, setAdminId] = useState();
  let [inProgress, setInProgress] = useState(false);
  let [accessTokenValid, setAccessTokenValid] = useState(false);

  //function to update the accessToken
  const updateAccessToken = (token, id) => {
    setAccessToken(token);
    setAdminId(id);
    setAccessTokenValid(true);
  };

  //function to reset the accessToken
  const resetAccessToken = () => {
    setAccessToken(null);
    setAdminId(null)
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(USER_ID_KEY);
  };

  //function to check the existing accesstoekn is valid or not
  const validateAccessToken = () => {
    if (inProgress) return;
    apiClient('/adminGetSubscriptionList', 'GET', null, {admin_id:adminId,access_token:accessToken,other_player_id:adminId}).then(res => {
      if (res.responseCode === Response.STATUS_OK) {
        setAccessTokenValid(true);
      } else if (res.responseCode === Response.TOKEN_EXPIRED) {
        resetAccessToken();
      } else {
        resetAccessToken();
        console.log(res.responseMessage);
      }
      setInProgress(false);
    });
  };

  return (
    <div className="bg-light">
      {!accessToken &&
        localStorage.getItem(ACCESS_TOKEN_KEY) &&
        setAccessToken(localStorage.getItem(ACCESS_TOKEN_KEY))}
         
        {!adminId &&
        localStorage.getItem(USER_ID_KEY) &&
        setAdminId(localStorage.getItem(USER_ID_KEY))}

      {/* if accesstoken is not valid then signin component will be called */}
      {!accessToken && !adminId &&
        ((
          <SignIn
            onAccessTokenUpdate={updateAccessToken}
          />
        ))}

      {/* if accesstoken is valid then home componet will be called*/}
      {accessToken && adminId && !accessTokenValid && (!inProgress && (setInProgress(true) || (!validateAccessToken() || <React.Suspense fallback={<PageSpinner />}><PageSpinner /></React.Suspense>)))}
      {accessToken && adminId && ((accessTokenValid && (
        <Home
          accessToken={accessToken}
          adminId = {adminId}
          resetAccessToken={resetAccessToken}
          breakpoint={getViewport()}
        />
      )))}
    </div>
  );
}

export default App;
