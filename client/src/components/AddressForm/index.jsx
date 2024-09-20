import Greeting from '../Greeting';
import './AddressForm.css'
import AutoCompleteInput from '../AutoCompleteInput';

// available props:
// variable: address
// address object structure:
/*
address = {
    streetAndNumber: "",
    place: "",
    region: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
}
*/
// function: setAddress


function AddressForm(props) {
  const handleInputChange = (event, propertyToChange) => {
    const newAddress = { ...props.address }
    newAddress[propertyToChange] = event.target.value;

    props.setAddress(newAddress);
  }
  /*
  // add the below later - this code currently doesn't function
  <label htmlFor="address">Address</label>
      <AutoCompleteInput
        setAddress={props.setAddress}
        handleInputChange={handleInputChange}
        streetAndNumber={props.address.streetAndNumber}
      >
      </AutoCompleteInput>
  */
  return (
    <>



      <label htmlFor="city">City:</label>{" "}
      <input type="text" id="city" name="city" placeholder="City" value={props.address.place} onChange={(event) => {
        handleInputChange(event, "place");
      }} />
      <br></br>
      <br></br>

      <label htmlFor="state">State/Province/Region:</label>{" "}
      <input type="text" id="state" name="state" placeholder="State/Province/Region" value={props.address.region} onChange={(event) => {
        handleInputChange(event, "region");
      }} />
      <br></br>
      <br></br>

      <label htmlFor="postcode">Postcode:</label>{" "}
      <input type="text" id="postcode" name="postcode" placeholder="Postcode" value={props.address.postcode} onChange={(event) => {
        handleInputChange(event, "postcode");
      }} />
      <br></br>
      <br></br>

      <label htmlFor="country">Country:</label>{" "}
      <input type="text" id="country" name="country" placeholder="Country" value={props.address.country} onChange={(event) => {
        handleInputChange(event, "country");
      }} />
      <br></br>
      <br></br>

      <button onClick={(event) => {
        if (props.address.streetAndNumber) {
          console.log("Chosen Address:", address)
        }
      }}>Select Address</button >

      <button onClick={(event) => {
        props.setAddress({
          streetAndNumber: "",
          place: "",
          region: "",
          postcode: "",
          country: "",
          latitude: "",
          longitude: "",
        }
        )
      }}>Reset</button >
    </>);
}

export default AddressForm;