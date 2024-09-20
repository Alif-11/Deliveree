import './ErrandForm.css';
import React from 'react';
import Greeting from '../Greeting';
import PatronAccountPage from '../PatronAccountPage';
import { useState } from 'react';
import MapBox from '../MapBoxComponent';
import MapBoxComponent from '../MapBoxComponent';

function handleSubmit(e) {
  e.preventDefault();
  console.log("Form Reload (which is the form's default behavior) prevented!")
}

function ErrandForm(props) {

  const [desc, setDesc] = useState("");
  const [pLoc, setPLoc] = useState("");
  const [dLoc, setDLoc] = useState("");
  const [name, setName] = useState("");
  const [patron, setPatron] = useState(false);
  console.log("errand")
  console.log(props)
  if (!patron) {
    return (
      <>
        <Greeting title="Errand Form" />
        <label htmlFor="item_name">Item Name:</label> {" "}



        <input type="text" id="item_name" name="item_name" value={name} onChange={(e) => {
          setName(e.target.value);
        }} />
        <br />
        <br />
        <label htmlFor="item_description">Item Description:</label>
        <br />
        <textarea type="text" id="item_description" name="item_description" value={desc} onChange={(e) => {
          setDesc(e.target.value);
        }}> </textarea>
        <br />
        <br />
        <label htmlFor="pickup_location">Pickup Location:</label>
        <br />
        <textarea type="text" id="pickup_location" name="pickup_location" value={pLoc} onChange={(e) => {
          setPLoc(e.target.value);
        }}></textarea>
        <br />
        <br />
        <label htmlFor="dropoff_location">Dropoff Location:</label>
        <br />
        <textarea type="text" id="dropoff_location" name="pickup_location" value={dLoc} onChange={(e) => {
          setDLoc(e.target.value);
        }}></textarea>
        <br />
        <br />
        {/* <MapBoxComponent /> - uncomment this only if you get AddressForm, AutoCompleteInput, and MapBoxComponent working. */}

        <br />
        <br />
        <br />

        <MapBoxComponent></MapBoxComponent>

        <br />
        <br />

        <br />
        <br />

        <button onClick={async () => {
          const res = await fetch("http://localhost:8080/createErrand", {
            method: "POST",
            body: JSON.stringify(
              {
                item_name: name,
                item_description: desc,
                pickup_location: pLoc,
                dropoff_location: dLoc
              }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            }
          }).then(response => {
            return response.json();
          }).then(data => {
            console.log("Errand Nice!");
            console.log(data);
          }).catch(err => {
            console.log("Errand Sad!")
            console.log(err);
          });
          setPatron(true); // if it turns out 
          // that the errand couldn't successfully be completed
          // for some reason, 

          setDesc("");
          setPLoc("");
          setDLoc("");

        }}>Submit</button >
        <button onClick={() => {
          setPatron(true);
        }}>Go Back</button>

      </>

    );
  }

  else {
    return (<PatronAccountPage data={props.data} />)
  }
}

export default ErrandForm;