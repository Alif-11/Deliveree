import React from 'react'
import { useState } from 'react'
import Greeting from '../Greeting';
import './RunnerPage.css'
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';

function RunnerPage() {
  const [homePage, setHomePage] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [signupPage, setSignupPage] = useState(false);
  if (!homePage && !loginPage && !signupPage) {
    return (
      <>
        <Greeting title={"Runner"} />
        <p>What would you like to do?</p>
        <button onClick={() => {
          setHomePage(true);
          setLoginPage(false);
          setSignupPage(false);
        }}>Back To Home Page</button>
        <button onClick={() => {
          setHomePage(false);
          setLoginPage(false);
          setSignupPage(true);
        }}>Sign Up</button>
        <button onClick={() => {
          setHomePage(false);
          setLoginPage(true);
          setSignupPage(false);
        }}>Log In</button>
      </>
    );
  } else if (homePage) {
    return (<HomePage />);
  }

  else if (loginPage) {
    return (<LoginPage parent="runner" />);
  }

  else if (signupPage) {
    return (<SignupPage parent="runner" />);
  }
}

export default RunnerPage;