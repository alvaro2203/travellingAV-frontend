import { useQuery, gql } from '@apollo/client'
import { Container, Select, Spinner, Box, Text } from "@chakra-ui/react"
import { useState } from "react"
import Fade from 'react-reveal/Fade';

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

  const handleChange = (e) => setSelectPlace(e.target.value)

  if (loading) return (
    <Container maxW="container.md" textAlign="center">
      <Spinner size="xl" thickness="4px" speed="0.65s" />
    </Container>
  )

  if (error) return (
    <Box>
      <Text>Error :( </Text>
    </Box>
  )

  return (
    <div className="App">
      <Container maxW="container.xl">
        <Fade up>
          <Container maxW="container.sm">
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

          <Container maxW="container.xl">
            <LandingMap />
          </Container>
        </Fade>

      </Container>
    </div>
  );
}