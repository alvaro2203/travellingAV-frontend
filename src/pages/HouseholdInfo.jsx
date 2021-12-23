import Header from "../components/Header"
import Footer from "../components/Footer"
import { Avatar, Box, Container, Divider, Flex, Heading, ListItem, Spacer, Spinner, Stack, Text, UnorderedList } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import UseHousehold from "../graphql/hooks/households/useHousehold"
import Carousel from "../components/Carousel"
import { Authentication } from "../utils/authentication"

export default function Household() {
    Authentication()
    const { householdId } = useParams()
    const { getHousehold, loadingHousehold, errorHousehold, refetchHousehold } = UseHousehold(householdId);

    if (loadingHousehold) return (
        <Container maxW="container.md" textAlign="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" />
        </Container>
    )

    if (errorHousehold) return (
        <Box>
            <Text>Error :( </Text>
        </Box>
    )
    refetchHousehold();

    const householdProps = getHousehold.household

    return (
        <div>
            <Header />

            <Carousel />

            <Container maxW="container.xl" mt="10">
                <Flex>
                    <Stack direction={['column', 'row']} spacing="42px" alignItems="center">
                        <Avatar
                            size="md"
                            name={householdProps.user.username}
                        />
                        <Heading>{householdProps.user.username}</Heading>
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                        >
                            {householdProps.bedrooms} habitaciones &bull; {householdProps.toilets} baños &bull; {householdProps.guests} huéspedes
                        </Box>
                    </Stack>
                    <Spacer />
                    <Text fontWeight="bold">
                        {householdProps.price}€ / noche
                    </Text>
                </Flex>

                <Divider mt="10" mb="10" />

                <Flex>
                    <Box>
                        <Heading>Ubicación</Heading>
                        <UnorderedList spacing="15" mt="5">
                            <ListItem>Localidad: {householdProps.location.place.name}</ListItem>
                            <ListItem>
                                Dirección: {householdProps.location.street}, {householdProps.location.number}, {householdProps.location.floor}
                                {householdProps.location.letter}
                            </ListItem>
                        </UnorderedList>
                    </Box>
                    <Spacer />
                    <Box>
                        <Heading>Contactar</Heading>

                        <UnorderedList spacing="15" mt="5">
                            <ListItem>Correo: {householdProps.user.email}</ListItem>
                            <ListItem>Teléfono: {householdProps.user.telephone}</ListItem>
                        </UnorderedList>
                    </Box>
                </Flex>

            </Container>

            <Footer />
        </div>
    )
}