import './PatronAccountPage.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Greeting from '../Greeting'
import ErrandForm from '../ErrandForm'
import PatronPage from '../PatronPage'



function PatronAccountPage(props) {

  const [errand, setErrand] = useState(false);
  const [logout, setLogout] = useState(false);
  const [yourErrands, setYourErrands] = useState([]);

  useEffect(() => {
    const fetchErrands = async () => {
      const response = await fetch('http://localhost:8080/getErrand', {
        method: "GET"
      }).then(response => {
        return response.json();
      }).then(data => {
        console.log("Patron Account Data")
        console.log("fetchErrands data", data);
        setYourErrands(data);
      })
    }

    fetchErrands();
  }, [])

  console.log("Patron Account Props");
  console.log(props);

  if (!errand && !logout) {
    return (
      <>
        <Greeting title="Patron Account" />
        <p>Hey {props.data.username}! How is it going?</p>
        <h2>Your Errands</h2>
        <button onClick={() => {
          setErrand(true);
          setLogout(false);
        }}>Make An Errand</button>
        <button onClick={() => {
          setErrand(false);
          setLogout(true);
        }}>Log Out</button>
      </>);
  }

  else if (errand && !logout) {
    return (<ErrandForm data={props.data} />);
  }

  else if (logout && !errand) {
    return (<PatronPage data={props.data} />);
  }
}

export default PatronAccountPage;

