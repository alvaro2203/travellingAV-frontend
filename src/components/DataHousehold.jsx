import {
    Container,
    Spinner,
    Box,
    Text,
    Button,
    Heading,
    Grid,
    Center,
    FormControl,
    FormLabel,
    Select,
    Input,
    useColorMode,
    useToast,
    Textarea,
    GridItem,
} from "@chakra-ui/react"
import { Formik } from 'formik'
import UsePlaces from "../graphql/hooks/usePlaces"
import { useMutation } from '@apollo/client'
import IsAuth from '../graphql/hooks/useAuth';
import { CREATE_LOCATION } from "../graphql/mutations/createLocation"
import { CREATE_HOUSEHOLD } from "../graphql/mutations/createHousehold"

export default function DataHousehold() {
    const { colorMode } = useColorMode()
    const { loading, error, getPlaces } = UsePlaces();
    const { me } = IsAuth();
    const toast = useToast()
    const [addLocation, { loading: loadingLocation, error: errorLocation }] = useMutation(CREATE_LOCATION)
    const [addHousehold, { loading: loadingHousehold, error: errorHousehold }] = useMutation(CREATE_HOUSEHOLD)

    const initialValues = {
        comunidad: "",
        ciudad: "",
        calle: "",
        numero: 0,
        piso: 0,
        letra: "",
        descripcion: "",
        precio: 0,
        habitaciones: 0,
        baños: 0,
        huespedes: 0
    }

    if (!me) return null

    if (loading || loadingLocation || loadingHousehold) return (
        <Container maxW="container.md" textAlign="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" />
        </Container>
    )

    if (error || errorLocation || errorHousehold) return (
        <Box>
            <Text>Error :( </Text>
        </Box>
    )

    const places = getPlaces.places

    return (
        <div>
            <Heading m="10">
                <Center><Text>Introduce aquí los datos de tu vivienda</Text></Center>
            </Heading>

            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true)
                    try {
                        if (!values.descripcion || !values.ciudad || !values.calle || !values.comunidad || !values.numero ||
                            !values.piso || !values.letra || !values.precio ||
                            !values.habitaciones || !values.baños || !values.huespedes) {
                            toast({
                                title: "Error",
                                description: "Introduce los campos necesarios",
                                status: "error",
                                position: "bottom-right",
                                duration: 3000,
                                isClosable: true
                            })
                        } else {
                            await addLocation({
                                variables: {
                                    city: values.ciudad,
                                    street: values.calle,
                                    number: values.numero,
                                    floor: values.piso,
                                    letter: values.letra,
                                    place: values.comunidad
                                }
                            }).then(async (data) => {
                                await addHousehold({
                                    variables: {
                                        description: values.descripcion,
                                        price: values.precio,
                                        bedrooms: values.habitaciones,
                                        toilets: values.baños,
                                        guests: values.huespedes,
                                        location: data.data.createLocation.location.id,
                                        user: me.id
                                    }
                                }).then(() => {
                                    toast({
                                        title: "Vivienda añadida",
                                        description: "Se ha añadido tu vivienda correctamente",
                                        status: "success",
                                        position: "bottom-right",
                                        duration: 3000,
                                        isClosable: true
                                    })
                                })
                            })
                        }
                    } catch (e) {
                        console.log(e)
                    }
                    setSubmitting(false)
                }}>
                {({
                    isSubmitting,
                    handleSubmit,
                    values,
                    handleChange
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Grid gridTemplateColumns="repeat(2, 1fr)" gap={10}>
                            <Box
                                bg={colorMode === "light" ? "gray.100" : "gray.850"}
                                my={8}
                                borderRadius="md"
                                p={6}
                            >
                                <Center>
                                    <Text>¿Donde se encuentra el alojamiento?</Text>
                                </Center>
                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">Comunidad: </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Select
                                                    name="comunidad"
                                                    value={values.comunidad}
                                                    onChange={handleChange}
                                                    placeholder="Selecciona una comunidad"
                                                    size="sm"
                                                >
                                                    {places.map(place => (
                                                        <option key={place.id} value={place.id}>{place.name}</option>
                                                    ))}
                                                </Select>
                                            </GridItem>
                                        </Grid>
                                    </Center>
                                </FormControl>

                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">Ciudad: </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Input
                                                    name="ciudad"
                                                    value={values.ciudad}
                                                    onChange={handleChange}
                                                    size="sm"
                                                    placeholder="Introduce la diudad de tu alojamiento"
                                                />
                                            </GridItem>
                                        </Grid>
                                    </Center>
                                </FormControl>

                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">Calle: </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Input
                                                    name="calle"
                                                    value={values.calle}
                                                    onChange={handleChange}
                                                    size="sm"
                                                    placeholder="Introduce la calle de tu alojamiento"
                                                />
                                            </GridItem>

                                        </Grid>
                                    </Center>
                                </FormControl>

                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">Número: </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Input
                                                    size="sm"
                                                    name="numero"
                                                    value={values.numero}
                                                    onChange={handleChange}
                                                    type="number"
                                                />
                                            </GridItem>

                                        </Grid>
                                    </Center>
                                </FormControl>

                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">Piso: </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Input
                                                    size="sm"
                                                    name="piso"
                                                    value={values.piso}
                                                    onChange={handleChange}
                                                    type="number"
                                                />
                                            </GridItem>

                                        </Grid>
                                    </Center>
                                </FormControl>

                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">Letra: </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Input
                                                    name="letra"
                                                    value={values.letra}
                                                    onChange={handleChange}
                                                    size="sm"
                                                    placeholder="Introduce la letra de tu piso"
                                                />
                                            </GridItem>

                                        </Grid>
                                    </Center>
                                </FormControl>
                            </Box>

                            <Box
                                bg={colorMode === "light" ? "gray.100" : "gray.850"}
                                my={8}
                                borderRadius="md"
                                p={6}
                            >
                                <Center>
                                    <Text>¿Cuáles son las características de tu vivienda?</Text>
                                </Center>
                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">
                                                Descripción:
                                            </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Textarea
                                                    size="md"
                                                    name="descripcion"
                                                    value={values.descripcion}
                                                    onChange={handleChange}
                                                    placeholder="Introduce una breve descripción de tu vivienda"
                                                />
                                            </GridItem>

                                        </Grid>
                                    </Center>
                                </FormControl>
                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">
                                                Precio:
                                            </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Input
                                                    size="sm"
                                                    name="precio"
                                                    value={values.precio}
                                                    onChange={handleChange}
                                                    type="number"
                                                />
                                            </GridItem>
                                        </Grid>
                                    </Center>
                                </FormControl>

                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">
                                                Habitaciones:
                                            </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Input
                                                    size="sm"
                                                    name="habitaciones"
                                                    value={values.habitaciones}
                                                    onChange={handleChange}
                                                    type="number"
                                                />
                                            </GridItem>

                                        </Grid>
                                    </Center>
                                </FormControl>

                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">
                                                Baños:
                                            </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Input
                                                    size="sm"
                                                    name="baños"
                                                    value={values.baños}
                                                    onChange={handleChange}
                                                    type="number"
                                                />
                                            </GridItem>

                                        </Grid>
                                    </Center>

                                </FormControl>

                                <FormControl mt={4}>
                                    <Center>
                                        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                                            <FormLabel textAlign="center">
                                                Huéspedes:
                                            </FormLabel>
                                            <GridItem colSpan={2}>
                                                <Input
                                                    size="sm"
                                                    name="huespedes"
                                                    value={values.huespedes}
                                                    onChange={handleChange}
                                                    type="number"
                                                />
                                            </GridItem>

                                        </Grid>
                                    </Center>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Box>
                            <Button
                                width="full"
                                type="submit"
                                colorScheme="gray"
                                borderRadius="lg"
                                disabled={isSubmitting}
                            >
                                Añadir
                            </Button>
                        </Box>
                    </form>
                )}

            </Formik>
        </div>
    )
}
