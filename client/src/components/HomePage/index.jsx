import React from 'react'
import './HomePage.css'
import PatronPage from '../PatronPage';
import RunnerPage from '../RunnerPage';
import Greeting from '../Greeting';
import { useState } from 'react';

function HomePage() {
  const [patron, setPatron] = useState(false);
  const [runner, setRunner] = useState(false);
  if (!patron && !runner) {
    return (
      <>
        <Greeting title={"Deliveree"} />
        <p>Please select the type of user you are to get started.</p>
        <button onClick={() => {
          setPatron(true);
          setRunner(false);
        }}>Patron</button>
        <button onClick={() => {
          setPatron(false);
          setRunner(true);
        }}>Runner</button>
      </>
    );
  } else if (patron) {
    return (<PatronPage />);
  }

  else if (runner) {
    return (<RunnerPage />);
  }
}

export default HomePage;