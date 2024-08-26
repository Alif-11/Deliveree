import React from 'react'
import './PokemonPage.css';
import { useState, useEffect } from 'react';


function PokemonPage() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/pokemon')
      const data = await response.json()
      setData(data)
    }

    fetchData()
  }, []);

  return (
    <>
      <h1>Pokemon</h1>
      <ul>
        {data.map((pokemon, index) => {
          return (
            <li key={index}>
              This pokemon is {pokemon.name}! Their type is {pokemon.type}!
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default PokemonPage;
