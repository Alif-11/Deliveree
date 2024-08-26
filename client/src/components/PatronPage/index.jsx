import React from 'react'
import { useState } from 'react'
import Greeting from '../Greeting';
import './PatronPage.css'
import HomePage from '../HomePage';
import LoginPage from '../LoginPage';
import SignupPage from '../SignupPage';

function PatronPage() {
  const [homePage, setHomePage] = useState(false);
  const [loginPage, setLoginPage] = useState(false);
  const [signupPage, setSignupPage] = useState(false);
  if (!homePage && !loginPage && !signupPage) {
    return (
      <>
        <Greeting title={"Patron"} />
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
    return (<LoginPage parent="patron" />);
  }

  else if (signupPage) {
    return (<SignupPage parent="patron" />);
  }
}

export default PatronPage;