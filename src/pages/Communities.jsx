import Header from "../components/Header"
import Footer from "../components/Footer"
import { Box, Container, Grid, Heading, Select, Spinner, Text } from "@chakra-ui/react"
import UsePlaces from "../graphql/hooks/usePlaces"
import { Authentication } from "../utils/authentication"
import UseHouseholds from "../graphql/hooks/households/useHouseholds"
import HouseholdCard from "../components/HouseholdCard"
import { useEffect, useState } from "react"

export default function Communities() {
    Authentication()
    const { loading, error, getPlaces } = UsePlaces();
    const { loadingHouseholds, errorHouseholds, getHouseholds, refetchHouseholds } = UseHouseholds();
    const [community, setCommunity] = useState("Madrid")
    const [data, setData] = useState([getHouseholds?.households])

    const handleData = (e) => {
        setCommunity(e.target.value)
    }

    useEffect(() => {
        let results = []

        results = getHouseholds?.households?.filter(h =>
            h?.location?.place?.name?.includes(community))

        setData(results)
    }, [community, getHouseholds?.households])

    if (loading || loadingHouseholds) return (
        <Container maxW="container.md" textAlign="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" />
        </Container>
    )

    if (error || errorHouseholds) return (
        <Box>
            <Text>Error :( </Text>
        </Box>
    )

    const places = getPlaces.places
    refetchHouseholds()

    return (
        <>
            <Header />

            <Container maxW="container.xl" my="10">
                <Box my="10" textAlign="center">
                    <Heading>¿A que zona te gustaría viajar?</Heading>
                </Box>

                <Box>
                    <Select onChange={handleData} value={community}>
                        {places.map(place => (
                            <option key={place.id} value={place.name}>{place.name}</option>
                        ))}
                    </Select>
                </Box>

                <Box my="10">
                    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                        {data?.length === 0
                            ? <Box><Heading>No se han encontrado coincidencias</Heading></Box>
                            : data?.map(household => (
                                <HouseholdCard key={household.id} props={household} />
                            ))}
                    </Grid>
                </Box>
            </Container>

            <Footer />
        </>
    )
}