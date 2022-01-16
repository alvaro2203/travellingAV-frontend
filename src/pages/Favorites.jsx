import Header from "../components/Header"
import Footer from "../components/Footer"
import { Box, Center, Container, Grid, Heading, Spinner, Text } from "@chakra-ui/react"
import { Authentication } from "../utils/authentication"
import HouseholdCard from "../components/HouseholdCard"
import UseFavoriteHouseholds from "../graphql/hooks/households/useFavoriteHouseholds"
import IsAuth from "../graphql/hooks/useAuth"
import { Link } from "react-router-dom"

export default function Favorites() {
    Authentication()
    const { me } = IsAuth()
    const { data, loading, error, refetch } = UseFavoriteHouseholds(me?.username)

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

    const favorites = data.favoriteHouseholds
    refetch()

    return (
        <>
            <Header />

            <Container maxW="container.xl" mt={20}>
                {favorites?.length === 0
                    ? <Box mb='20'>
                        <Center>
                            <Heading my='20'>Aún no has añadido ninguna vivienda a tus favoritos..</Heading>
                        </Center>
                        <Center>
                            <Text my='20'><Link to='/' style={{ color: "#00AFFF" }}>Haz click aquí para empezar a buscar vivendas</Link></Text>
                        </Center>
                    </Box>
                    : <>
                        <Box mt={10}>
                            <Center>
                                <Heading my={10}>Estas son tus viviendas favoritas !</Heading>
                            </Center>
                        </Box>

                        <Box mt={10} mb={16}>
                            <Grid
                                templateColumns={{ lg: "repeat(3, 1fr)", md: "repeat(2, 1fr)", base: "repeat(1, 1fr)" }}
                                gap={{ lg: 6, md: 3, base: 1 }}
                            >
                                {favorites?.map((household, index) => (
                                    <HouseholdCard key={index} props={household.household} />
                                ))}
                            </Grid>
                        </Box>
                    </>
                }
            </Container>

            <Footer />
        </>
    )
}