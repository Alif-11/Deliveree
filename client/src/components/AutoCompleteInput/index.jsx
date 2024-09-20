import './AutoCompleteInput.css'
import Greeting from '../Greeting';
import { useState } from 'react';
import getPlaces from '../../../API/getPlaces';

// available props:
// function setAddress
// function handleInputChange
// variable streetAndNumber

function AutoCompleteInput(props) {
  const [predictions, setPredictions] = useState([])

  const handleChange = (event) => {
    props.handleInputChange(event, "streetAndNumber");
    handleAutoCompleteInputChange(event.target.value);
  }

  const handleAutoCompleteInputChange = async (query) => {
    const queryPredictions = await getPlaces(query);
    setPredictions(queryPredictions);
  }

  const handlePredictionClick = (prediction) => {
    const streetAndNumber = prediction.place_name.split(",")[0];
    const longitude = prediction.center[0];
    const latitude = prediction.center[1];

    const address = {
      streetAndNumber: "",
      place: "",
      region: "",
      postcode: "",
      country: "",
      latitude: "",
      longitude: "",
    }

    prediction.context.forEach((elem) => {
      const idfier = elem.id.split(".")[0];

      address[idfier] = elem.text
    });

    props.setAddress(address);
    setPredictions([]);

  }

  return (
    <>
      <input
        id="address"
        type="text"
        placeholder="Address"
        value={props.streetAndNumber}
        onChange={handleAutoCompleteInputChange}
      />
      <ul>
        {predictions?.map((prediction, idx) => {
          <li key={idx} onClick={(event) => { handlePredictionClick(prediction) }}>
            {prediction.place_name}
          </li>
        })}
      </ul>
      <br />
      <br />
    </>);
}

export default AutoCompleteInput;