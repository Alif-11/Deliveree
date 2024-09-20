import './MapBoxComponent.css'
import React, { useEffect, useState } from 'react';
import Map, { AttributionControl } from 'react-map-gl';
import GeocoderControl from '../GeocoderControl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapBoxComponent() {

  const TOKEN = "pk.eyJ1IjoiYWFsaWYxNzAxIiwiYSI6ImNtMGxzZjNzbjA5bWgya295cDAwMGwybngifQ.aVPaRA1WoYKpKVnpbaquow"

  return (
    <>
      <Map
        mapboxAccessToken={TOKEN}
        initialViewState={{
          longitude: -122.4,
          latitude: 37.8,
          zoom: 14
        }}
        style={{ width: 600, height: 400 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        attributionControl={false}
      >


      </Map>
    </>
  )

}

export default MapBoxComponent;

