import { useQuery, gql } from '@apollo/client'
import { Container, Select } from "@chakra-ui/react"
import { useState } from "react"

import LandingMap from "../components/LandingMap"

const PLACES = gql`
  query getPlaces {
    places {
      place
    }
  }
`

export default function LandingPage() {

  const { loading, error, data } = useQuery(PLACES);
  const [selectPlace, setSelectPlace] = useState("Madrid");

  const handleChange = (e) => {
    setSelectPlace(e.target.value)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :( </p>

  return (
    <div className="App">
      <Container maxW="container.xl">
        <Container>
          <Select
            variant="filled"
            mb="10"
            value={selectPlace}
            onChange={handleChange}
            placeholder="Selecciona una comunidad"
            size="lg">
            {data.places.map(place => (
              <option key={place.id} value={place.place}>{place.place}</option>
            ))}
          </Select>
        </Container>

        <LandingMap />

      </Container>
    </div>
  );
}