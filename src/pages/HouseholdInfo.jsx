import Header from "../components/Header"
import Footer from "../components/Footer"
import { Avatar, Box, Button, Container, Divider, Flex, Heading, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Spinner, Stack, Text, UnorderedList, useDisclosure } from "@chakra-ui/react"
import { useParams } from "react-router-dom"
import UseHousehold from "../graphql/hooks/households/useHousehold"
import Carousel from "../components/Carousel"
import { Authentication } from "../utils/authentication"
import useAuth from "../graphql/hooks/useAuth"
import DataHousehold from "../components/DataHousehold"

export default function Household() {
    Authentication()
    const { me } = useAuth()
    const { householdId } = useParams()
    const { getHousehold, loadingHousehold, errorHousehold, refetchHousehold } = UseHousehold(householdId);
    const { isOpen, onOpen, onClose } = useDisclosure();

    if (!me) return null

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

                {householdProps.user.email === me.email
                    ? <Box my="10" textAlign="center">
                        <Button
                            onClick={onOpen}
                            bg="blue.600"
                        >Editar</Button>
                    </Box>
                    : null}

                <Modal isOpen={isOpen} onClose={onClose} size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edita la información de tu vivienda</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            infos
                        </ModalBody>

                        <ModalFooter>
                            <Button bg="blue.600" mr={3} onClick={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </Container>

            <Footer />
        </div>
    )
}