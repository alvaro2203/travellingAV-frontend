import {
    Box,
    Container,
    Stack,
    Text,
    Flex,
    VStack,
    Button,
    Heading,
    SimpleGrid,
    StackDivider,
    List,
    ListItem,
    Spinner,
    useColorMode,
    Avatar,
    Grid,
    GridItem,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
} from '@chakra-ui/react';
import { useParams } from "react-router-dom"
import { Authentication } from "../utils/authentication"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Carousel from "../components/Carousel"
import UseHousehold from '../graphql/hooks/households/useHousehold';
import useAuth from "../graphql/hooks/useAuth"
import UpdateHousehold from '../components/UpdateHousehold';

//icons
import { MdLocalShipping } from 'react-icons/md';

export default function HouseholdInfo() {
    Authentication()
    const { me } = useAuth()
    const { householdId } = useParams()
    const { getHousehold, loadingHousehold, errorHousehold, refetchHousehold } = UseHousehold(householdId);
    const { colorMode } = useColorMode()
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
        <>
            <Header />

            <Container maxW={'7xl'}>
                <SimpleGrid
                    columns={{ base: 1, lg: 1 }}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 18, md: 20 }}>
                    <Flex>
                        <Carousel />
                    </Flex>
                    <Stack spacing={{ base: 6, md: 10 }}>
                        <Grid templateColumns="repeat(4, 1fr)" gap={10}>
                            <GridItem colSpan={3}>
                                <Box as={'header'}>
                                    <Heading
                                        lineHeight={1.1}
                                        fontWeight={600}
                                        fontSize={{ base: '2xl', sm: '4xl', lg: '5xl' }}>
                                        Casa en {householdProps.location.place.name}
                                    </Heading>
                                    <Text
                                        color={colorMode === "light" ? "gray.900" : "gray.400"}
                                        fontWeight={300}
                                        fontSize={'2xl'}>
                                        <b>{householdProps.price}€</b>/noche
                                    </Text>
                                </Box>
                            </GridItem>

                            <Stack direction={['column', 'row']} spacing="30px" alignItems="center">
                                <Text
                                    color={colorMode === "light" ? "gray.500" : "gray.400"}
                                    fontSize={'2xl'}
                                    fontWeight={'300'}>
                                    Propiedad de {householdProps.user.username}
                                </Text>
                                <Avatar
                                    size="md"
                                    name={householdProps.user.username}
                                />
                            </Stack>
                        </Grid>

                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={'column'}
                            divider={
                                <StackDivider
                                    borderColor={colorMode === "light" ? "gray.200" : "gray.600"}
                                />
                            }>
                            <VStack spacing={{ base: 4, sm: 6 }}>

                                <Text fontSize={'lg'}>
                                    {householdProps.description}
                                </Text>
                            </VStack>

                            <Grid templateColumns="repeat(4, 1fr)" gap={10}>
                                <GridItem colSpan={3}>
                                    <Box>
                                        <Text
                                            fontSize={{ base: '16px', lg: '18px' }}
                                            color={colorMode === "light" ? "blue.500" : "blue.300"}
                                            fontWeight={'500'}
                                            textTransform={'uppercase'}
                                            mb={'4'}>
                                            Características
                                        </Text>

                                        <List spacing={2}>
                                            <ListItem>
                                                {householdProps.bedrooms === 1
                                                    ? householdProps.bedrooms + " habitación"
                                                    : householdProps.bedrooms + " habitaciones"
                                                }
                                            </ListItem>
                                            <ListItem>
                                                {householdProps.toilets === 1
                                                    ? householdProps.toilets + " baño"
                                                    : householdProps.toilets + " baños"
                                                }
                                            </ListItem>{' '}
                                            <ListItem>
                                                {householdProps.guests === 1
                                                    ? householdProps.guests + " huesped"
                                                    : householdProps.guests + " huéspedes"
                                                }
                                            </ListItem>
                                        </List>
                                    </Box>
                                </GridItem>

                                <GridItem>
                                    <Box>
                                        <Text
                                            fontSize={{ base: '16px', lg: '18px' }}
                                            color={colorMode === "light" ? "blue.500" : "blue.300"}
                                            fontWeight={'500'}
                                            textTransform={'uppercase'}
                                            mb={'4'}>
                                            Contactar
                                        </Text>
                                        <List spacing={2}>
                                            <ListItem>
                                                {householdProps.user.email}
                                            </ListItem>
                                            <ListItem>
                                                {householdProps.user.telephone}
                                            </ListItem>{' '}
                                        </List>
                                    </Box>
                                </GridItem>
                            </Grid>

                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={colorMode === "light" ? "blue.500" : "blue.300"}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    Detalles
                                </Text>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
                                    <List spacing={2}>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Between lugs:
                                            </Text>{' '}
                                            20 mm
                                        </ListItem>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Bracelet:
                                            </Text>{' '}
                                            leather strap
                                        </ListItem>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Case:
                                            </Text>{' '}
                                            Steel
                                        </ListItem>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Case diameter:
                                            </Text>{' '}
                                            42 mm
                                        </ListItem>
                                    </List>

                                    <List spacing={2}>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Dial color:
                                            </Text>{' '}
                                            Black
                                        </ListItem>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Crystal:
                                            </Text>{' '}
                                            Domed, scratch‑resistant sapphire crystal with anti‑reflective
                                            treatment inside
                                        </ListItem>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Water resistance:
                                            </Text>{' '}
                                            5 bar (50 metres / 167 feet){' '}
                                        </ListItem>
                                    </List>
                                </SimpleGrid>
                            </Box>

                            <Box>
                                <Text
                                    fontSize={{ base: '16px', lg: '18px' }}
                                    color={colorMode === "light" ? "blue.500" : "blue.300"}
                                    fontWeight={'500'}
                                    textTransform={'uppercase'}
                                    mb={'4'}>
                                    Ubicación
                                </Text>

                                <List spacing={2}>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Localidad:
                                        </Text>{' '}
                                        {householdProps.location.place.name}
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Ciudad:
                                        </Text>{' '}
                                        {householdProps.location.city}
                                    </ListItem>
                                    <ListItem>
                                        <Text as={'span'} fontWeight={'bold'}>
                                            Dirección:
                                        </Text>{' '}
                                        {householdProps.location.street}, {householdProps.location.number}, {householdProps.location.floor}
                                        {householdProps.location.letter}
                                    </ListItem>
                                </List>
                            </Box>
                        </Stack>

                        {householdProps.user.email === me.email
                            ? <Button
                                rounded={'none'}
                                w={'full'}
                                mt={8}
                                size={'lg'}
                                py={'7'}
                                bg={colorMode === "light" ? "blue.700" : "gray.50"}
                                color={colorMode === "light" ? "white" : "gray.900"}
                                textTransform={'uppercase'}
                                _hover={{
                                    transform: 'translateY(2px)',
                                    boxShadow: 'lg',
                                }}
                                onClick={onOpen}>
                                Editar
                            </Button>
                            : null}

                        <Modal isOpen={isOpen} onClose={onClose} size="md">
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Edita la información de tu vivienda</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    <UpdateHousehold householdProps={householdProps} />
                                </ModalBody>
                            </ModalContent>
                        </Modal>

                        <Stack direction="row" alignItems="center" justifyContent={'center'}>
                            <MdLocalShipping />
                            <Text>2-3 business days delivery</Text>
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>

            <Footer />
        </>
    );
}