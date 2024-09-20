import axios from 'axios'
import { accessToken } from 'mapbox-gl';

async function getPlaces(query) {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
      {
        params: {
          access_token: import.meta.env.VITE_TOKEN,
        },
      }
    );

    return response.data.features;
  }
  catch (error) {
    console.error("There was an issue in fetching places:", error)
  }

}

export default getPlaces;