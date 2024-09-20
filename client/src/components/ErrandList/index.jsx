import './ErrandList.css'
import ErrandPage from '../ErrandPage';
import { useState } from 'react';

function ErrandList(props) {

  const [errandPage, setErrandPage] = useState(false)
  console.log("Inside ErrandList", props.errandsList)

  // the props errandsList should have a length greater than 0, according to our errandList code.
  if (!errandPage) {
    return (
      <>
        <ul className="no-bullet-points">
          {props.errandsList.map((errand_dict) => {
            return <>
              <li>A New Errand!</li>
              <li>"Item Name": {errand_dict["item_name"]}</li>
              <li>"Item Description": {errand_dict["item_description"]}</li>
              <li>"Pickup Location": {errand_dict["pickup_location"]}</li>
              <li>"Dropoff Location": {errand_dict["dropoff_location"]}</li>
              {/*
              <button onClick={() => {
                setErrandPage(true);
              }}>View Errand</button> */}
              <br />
            </>
          })}
        </ul>
        <br />


      </>)
  } else if (errandPage) {
    return (<ErrandPage></ErrandPage>);
  }
}

export default ErrandList;