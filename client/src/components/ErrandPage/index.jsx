import './ErrandPage.css'

function ErrandPage(props) {
  console.log("Inside ErrandPage", props.errandsList)

  // the props errandsList should have a length greater than 0, according to our errandList code.
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
            <br />
          </>
        })}
      </ul>
      <br />

    </>);
}

export default ErrandPage;