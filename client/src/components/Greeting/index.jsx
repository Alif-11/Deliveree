import './Greeting.css'
import React from 'react'

function Greeting(props) {
  return (
    <>
      <h1>{props.title}</h1>
      <p>Hello. Welcome to {props.title}!</p>
    </>
  );
}

export default Greeting;