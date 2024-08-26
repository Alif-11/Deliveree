import './LoginPage.css';
import React from 'react';
import { useState } from 'react';
import Greeting from '../Greeting';
import HomePage from '../HomePage';
import PatronPage from '../PatronPage';
import RunnerPage from '../RunnerPage';
import PatronAccountPage from '../PatronAccountPage';
import RunnerAccountPage from '../RunnerAccountPage';

function ValidationMessage(props) {
  return (<p style={{ color: "orange" }}>{props.failMessage}</p>);
}

function LoginPage(props) {

  const [parent, setParent] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [login, setLogin] = useState(true);
  const [success, setSuccess] = useState(true); // success determines whether the user 
  // was able to sign up successfully.
  const [failMessage, setFailMessage] = useState("");
  const [newUserData, setNewUserData] = useState({});

  if (!parent && login) {
    return (
      <>
        {!success ? <ValidationMessage failMessage={failMessage} /> : ''}
        <Greeting title="Login" />
        <label htmlFor="user_name">User Name:</label> {" "}
        <input type="text" id="user_name" name="user_name" value={user} onChange={(e) => {
          setUser(e.target.value);
        }} />
        <br />
        <br />
        <label htmlFor="pass_word">Pass Word:</label> {" "}
        <input type="text" id="pass_word" name="pass_word" value={pass} onChange={(e) => {
          setPass(e.target.value);
        }} />
        <br />
        <br />
        <button onClick={async () => {
          if (user === '' || pass === '') {
            setLogin(true);
            setParent(false);
            setSuccess(false);
            setFailMessage("Login failed. Please fill in all fields.")
          } else {
            const res = await fetch("http://localhost:8080/login", {
              method: "POST",
              body: JSON.stringify({
                username: user,
                password: pass,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }).then(response => {
              return response.json();
            }).then(data => {
              console.log("Nice!");
              console.log(data);
              if (data.data.length === 0) { // this user does not exist
                console.log("doesn't exist")
                setFailMessage("Login failed. User does not exist.")
                setLogin(true);
                setParent(false);
                setSuccess(false);
              } else {
                console.log("does exist")
                setLogin(false);
                setParent(false);
                setSuccess(true);
                console.log("huh");
                console.log(data.data);
                setNewUserData(data.data);
              }


            }).catch(err => {
              console.log("Sad!")
            });
          }

        }}>Submit</button >
        <button onClick={() => {
          setParent(true);
          setLogin(false);
        }}>Go Back</button>
      </>
    );
  }

  else if (!login && !parent) {
    if (success) {
      if (props.parent === "patron") {
        return (<PatronAccountPage data={newUserData} />);
      }

      else if (props.parent === "runner") {
        return (<RunnerAccountPage data={newUserData} />);
      }
    }

    else {
      setParent(false);
      setLogin(true);
    }

  }

  // we covered not wanting to go to parent and 
  // - wanting to log in (show the log in form)
  // - not wanting to log in up 
  // - - if you successfully log in, go to your corresponding page
  // - - else, re-render the log in page

  else if (props.parent === "patron") {
    return (<PatronPage />);
  }

  else if (props.parent === "runner") {
    return (<RunnerPage />);
  }



}

export default LoginPage;