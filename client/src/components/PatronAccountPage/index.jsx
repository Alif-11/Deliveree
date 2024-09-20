import './PatronAccountPage.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import Greeting from '../Greeting'
import ErrandForm from '../ErrandForm'
import PatronPage from '../PatronPage'
import ErrandList from '../ErrandList'



function PatronAccountPage(props) {

  const [errand, setErrand] = useState(false);
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


  console.log("where", yourErrands)
  console.log("Patron Account Props");
  console.log(props);

  if (!errand && !logout) {
    /*
    const errands_list = []
    for (let errand_idx = 0; errand_idx < yourErrands.length; errand_idx++) {
      errands_list.push(<p>Item Name: {yourErrands.errands_list[errand_idx].item_name}</p>)
    }
    console.log("errandsoooo", yourErrands.errands_list)//.errands_list[0].item_name, errands_list)*/
    console.log("runtime", errandsList)
    if (errandsList.length > 0) {
      console.log("Success", errandsList[0])
    }
    return (
      <>
        <Greeting title="Patron Account" />
        <p>Hey {props.data.username}! How is it going?</p>
        <h2>Active Errands</h2>
        {errandsList.length == 0 ? '' : <ErrandList errandsList={errandsList} />}
        {/*<p>{String(!yourErrands["success"])}</p>*/}
        {/*<p>{yourErrands["list"][0].item_name}</p>*/}
        {/*{yourErrands["list"].map(errand_from_list => {
          <p>{errand_from_list["item_name"]}</p>
        })}*/}
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

