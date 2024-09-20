import './RunnerAccountPage.css'
import React from 'react'
import { useState, useEffect } from 'react'
import Greeting from '../Greeting'
import RunnerPage from '../RunnerPage'
import ErrandList from '../ErrandList'

function RunnerAccountPage(props) {
  const [logout, setLogout] = useState(false);
  const [yourErrands, setYourErrands] = useState([]);
  const [errandsList, setErrandsList] = useState([]);

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
        console.log("what?", data["list"])
        console.log("first fetchErrands element", data["list"][0])
      })
    }
    fetchErrands();
  }, [])

  let list_of_errands = []
  useEffect(() => {
    console.log("why", yourErrands);
    if (yourErrands.length != 0) {
      console.log("my errands", yourErrands["list"])
      for (let i = 0; i < yourErrands["list"].length; i++) {
        console.log(yourErrands["list"][i])
        list_of_errands.push(yourErrands["list"][i])
        console.log("first element list_of_errands", list_of_errands[0]["item_name"])
      }
      setErrandsList(list_of_errands);
    }
  }, [yourErrands])

  if (!logout) {
    return (
      <>
        <Greeting title="Runner Account" />
        <p>Hey {props.data.username}! How is it going?</p>
        <h2>Active Errands</h2>
        {errandsList.length == 0 ? '' : <ErrandList errandsList={errandsList} />}
        {/*
        <button onClick={() => {
          setErrand(true);
          setLogout(false);
        }}>Make An Errand</button> */}
        <button onClick={() => {
          {/*setErrand(false);*/ }
          setLogout(true);
        }}>Log Out</button>
      </>
    );
  }

  else if (logout) {
    return (<RunnerPage data={props.data} />);
  }

}

export default RunnerAccountPage;
