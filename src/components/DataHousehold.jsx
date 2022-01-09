import {
    Container, Spinner, Box, Text, Button, Heading, Grid, Center,
    FormControl, FormLabel, Select, Input, useToast, Textarea, GridItem, Switch, Stack,
} from "@chakra-ui/react"
import { Formik } from 'formik'
import UsePlaces from "../graphql/hooks/usePlaces"
import { useMutation } from '@apollo/client'
import IsAuth from '../graphql/hooks/useAuth';
import { CREATE_LOCATION } from "../graphql/mutations/createLocation"
import { CREATE_HOUSEHOLD } from "../graphql/mutations/createHousehold"
import { useState } from "react";
import AWS from 'aws-sdk'

const S3_BUCKET = 'travellingav'
const REGION = 'eu-west-3'

AWS.config.update({
    // accessKeyId: process.env.REACT_APP_ACCESS_KEY,
    // secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    accessKeyId: 'AKIAYP7EIJRTZO7OS6OB',
    secretAccessKey: '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',
})

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION,
})

export default function DataHousehold() {
    const { loading, error, getPlaces } = UsePlaces();
    const { me } = IsAuth();
    const toast = useToast()
    const [addLocation, { loading: loadingLocation, error: errorLocation }] = useMutation(CREATE_LOCATION)
    const [addHousehold, { loading: loadingHousehold, error: errorHousehold }] = useMutation(CREATE_HOUSEHOLD)
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [image3, setImage3] = useState(null)

    const handleFileInput = (e) => {
        const filesList = Object.values(e.target.files)

        filesList.map(file => {
            console.log(file.name)
            //uploadFile(file)
        })

        setImage1(e.target.files[0])
        setImage2(e.target.files[1])
        setImage3(e.target.files[2])
    }

    const uploadFile = (file) => {
        const params = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET,
            Key: file.name
        };

        myBucket.putObject(params)
            .send((err) => {
                if (err) console.log(err)
            })
    }

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
        huespedes: 0,
        wifi: false,
        garage: false,
        pets: false,
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
                            !values.precio || !values.habitaciones || !values.baños ||
                            !values.huespedes || !values.descripcion || image1 === null) {
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
                                // if (image1 !== null) uploadFile(image1)
                                // if (image2 !== null) uploadFile(image2)
                                // if (image3 !== null) uploadFile(image3)

                                await addHousehold({
                                    variables: {
                                        description: values.descripcion,
                                        price: values.precio,
                                        bedrooms: values.habitaciones,
                                        toilets: values.baños,
                                        guests: values.huespedes,
                                        location: data.data.createLocation.location.id,
                                        user: me.id,
                                        image1: image1.name,
                                        image2: image2.name,
                                        image3: image3.name,
                                        wifi: values.wifi,
                                        garage: values.garage,
                                        pets: values.pets
                                    }
                                }).then((data) => {
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
                        <Container
                            maxW='container.sm'
                            my={8}
                            p={2}
                        >
                            <Text textAlign='center'>¿Donde se encuentra el alojamiento?</Text>
                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign='center'>Comunidad: </FormLabel>
                                    <GridItem colSpan={4}>
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
                            </FormControl>

                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">Ciudad: </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Input
                                            name="ciudad"
                                            value={values.ciudad}
                                            onChange={handleChange}
                                            size="sm"
                                            placeholder="Introduce la diudad de tu alojamiento"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>

                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">Calle: </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Input
                                            name="calle"
                                            value={values.calle}
                                            onChange={handleChange}
                                            size="sm"
                                            placeholder="Introduce la calle de tu alojamiento"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>

                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">Número: </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Input
                                            size="sm"
                                            name="numero"
                                            value={values.numero}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>

                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">Piso: </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Input
                                            size="sm"
                                            name="piso"
                                            value={values.piso}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>

                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">Letra: </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Input
                                            name="letra"
                                            value={values.letra}
                                            onChange={handleChange}
                                            size="sm"
                                            placeholder="Introduce la letra de tu piso"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>
                        </Container>

                        <Container
                            maxW='container.sm'
                            my={8}
                            p={2}
                        >
                            <Text textAlign='center'>¿Cuáles son las características de tu vivienda?</Text>
                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">
                                        Descripción:
                                    </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Textarea
                                            size="md"
                                            name="descripcion"
                                            value={values.descripcion}
                                            onChange={handleChange}
                                            placeholder="Introduce una breve descripción de tu vivienda"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>
                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">
                                        Precio:
                                    </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Input
                                            size="sm"
                                            name="precio"
                                            value={values.precio}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>

                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">
                                        Habitaciones:
                                    </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Input
                                            size="sm"
                                            name="habitaciones"
                                            value={values.habitaciones}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>

                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">
                                        Baños:
                                    </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Input
                                            size="sm"
                                            name="baños"
                                            value={values.baños}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </GridItem>
                                </Grid>

                            </FormControl>

                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">
                                        Huéspedes:
                                    </FormLabel>
                                    <GridItem colSpan={4}>
                                        <Input
                                            size="sm"
                                            name="huespedes"
                                            value={values.huespedes}
                                            onChange={handleChange}
                                            type="number"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>
                        </Container>

                        <Container
                            maxW='container.sm'
                            my={8}
                            p={2}
                            textAlign='center'
                        >
                            <Text>Detalles que ofrece tu vivienda</Text>
                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(6, 1fr)" gap={1}>
                                    <GridItem colSpan={2}>
                                        <Stack direction={['column', 'row']} spacing='10px'>
                                            <FormLabel textAlign='center' fontSize='18px'>
                                                Wifi
                                            </FormLabel>
                                            <Switch size='lg' name='wifi' value={values.wifi} onChange={handleChange} />
                                        </Stack>
                                    </GridItem>

                                    <GridItem colSpan={2}>
                                        <Stack direction={['column', 'row']} spacing='10px'>
                                            <FormLabel textAlign='center' fontSize='18px'>
                                                Garaje
                                            </FormLabel>
                                            <Switch size='lg' name="garage" value={values.garage} onChange={handleChange} />
                                        </Stack>
                                    </GridItem>

                                    <GridItem colSpan={2}>
                                        <Stack direction={['column', 'row']} spacing='10px'>
                                            <FormLabel textAlign='center' fontSize='16px' mt='0.3'>
                                                Permite mascotas
                                            </FormLabel>
                                            <Switch size='lg' name="pets" value={values.pets} onChange={handleChange} />
                                        </Stack>
                                    </GridItem>
                                </Grid>
                            </FormControl>
                        </Container>

                        <Container
                            maxW='container.sm'
                            my={6}
                            p={2}
                        >
                            <Text textAlign='center'>Introduce las imágenes de tu vivienda (máximo 3 imágenes)</Text>
                            <FormControl mt={4}>
                                <Grid gridTemplateColumns="repeat(5, 1fr)" gap={1}>
                                    <FormLabel textAlign="center">
                                        Imágenes:
                                    </FormLabel>
                                    <GridItem colSpan={4}>
                                        <input
                                            onChange={handleFileInput}
                                            multiple
                                            type="file"
                                        />
                                    </GridItem>
                                </Grid>
                            </FormControl>
                        </Container>

                        <Container maxW='container.sm' mb='10'>
                            <Button
                                width="full"
                                type="submit"
                                bg='blue.500'
                                color='black'
                                borderRadius="md"
                                disabled={isSubmitting}
                            >
                                Añadir
                            </Button>
                        </Container>
                    </form>
                )}

            </Formik>
        </div>
    )
}
