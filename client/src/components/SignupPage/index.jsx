import './SignupPage.css';
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

function SignupPage(props) {

  const [parent, setParent] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [signup, setSignup] = useState(true);
  const [success, setSuccess] = useState(true); // success determines whether the user 
  // was able to sign up successfully.
  const [failMessage, setFailMessage] = useState("");
  const [newUserData, setNewUserData] = useState({});

  if (!parent && signup) {
    return (
      <>
        {!success ? <ValidationMessage failMessage={failMessage} /> : ''}
        <Greeting title="Signup" />
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
            setSignup(true);
            setParent(false);
            setSuccess(false);
            setFailMessage("Signup failed. Please fill in all fields.")
          } else {
            const res = await fetch("http://localhost:8080/signup", {
              method: "POST",
              body: JSON.stringify({
                username: user,
                password: pass,
                parent: props.parent
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
            }).then(response => {
              return response.json();
            }).then(data => {
              console.log("Nice!");
              console.log(data);
              if (data.data.length !== 0) { // this user does not exist
                console.log("doesn't exist")
                setSignup(false);
                setParent(false);
                setSuccess(true);
                console.log("huh");
                console.log(data.data);
                setNewUserData(data.data);
              } else {
                console.log("does exist")
                setFailMessage("Signup failed. User already exists.")
                setSignup(true);
                setParent(false);
                setSuccess(false);
              }


            }).catch(err => {
              console.log("Sad!")
            });
          }

        }}>Submit</button >
        <button onClick={() => {
          setParent(true);
          setSignup(false);
        }}>Go Back</button>
      </>
    );
  }

  else if (!signup && !parent) {
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
      setSignup(true);
    }

  }

  // we covered not wanting to go to parent and 
  // - wanting to sign up (show the sign up form)
  // - not wanting to sign up 
  // - - if you successfully signed up, go to your corresponding page
  // - - else, re-render the signup page

  else if (props.parent === "patron") {
    return (<PatronPage />);
  }

  else if (props.parent === "runner") {
    return (<RunnerPage />);
  }



}

export default SignupPage;