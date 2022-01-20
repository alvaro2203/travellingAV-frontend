import {
    Box, Button, Container, FormControl, FormLabel, Grid, GridItem, Input, SimpleGrid, Spinner, Text, useColorMode, useToast, AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    Textarea,
    Stack,
    Switch,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useMutation } from "@apollo/client";
import { UPDATE_HOUSEHOLD } from "../graphql/mutations/updateHousehold";
import { DELETE_HOUSEHOLD } from "../graphql/mutations/deleteHousehold";
import { useHistory } from "react-router-dom";
import { useState, useRef } from "react"

export default function UpdateHousehold(householdProps) {
    const [updateHousehold, { loading, error }] = useMutation(UPDATE_HOUSEHOLD)
    const [deleteHousehold, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_HOUSEHOLD)
    const [isOpen, setIsOpen] = useState(false)
    let navigate = useHistory();
    const { colorMode } = useColorMode()
    const toast = useToast()
    const props = householdProps.householdProps

    const onClose = () => setIsOpen(false)
    const cancelRef = useRef()

    const initialValues = {
        price: props.price,
        guests: props.guests,
        bedrooms: props.bedrooms,
        toilets: props.toilets,
        description: props.description,
        wifi: props.wifi,
        garage: props.garage,
        pets: props.pets,
    }

    const handleDelete = async () => {
        await deleteHousehold({
            variables: {
                id: props.id
            }
        }).then((data) => {
            if (data) {
                toast({
                    title: "Vivienda eliminada",
                    description: "Se ha eliminado tu vivienda correctamente",
                    status: "success",
                    position: "bottom-right",
                    duration: 3000,
                    isClosable: true
                })
                navigate.push("/myHousehold")
            }
        })
    }

    if (loading || deleteLoading) return (
        <Container maxW="container.md" textAlign="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" />
        </Container>
    )

    if (error || deleteError) return (
        <Box>
            <Text>Error :( </Text>
        </Box>
    )

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true)
                try {
                    if (!values.price || !values.guests || !values.bedrooms || !values.toilets || !values.description) {
                        toast({
                            title: "Error",
                            description: "Introduce los campos necesarios",
                            status: "error",
                            position: "bottom-right",
                            duration: 3000,
                            isClosable: true
                        })
                    } else {
                        await updateHousehold({
                            variables: {
                                id: props.id,
                                price: values.price,
                                guests: values.guests,
                                toilets: values.toilets,
                                bedrooms: values.bedrooms,
                                description: values.description,
                                wifi: values.wifi,
                                garage: values.garage,
                                pets: values.pets,
                            }
                        }).then(() => {
                            toast({
                                title: "Vivienda actualizada",
                                description: "Se han actualizado los datos de tu vivienda",
                                status: "success",
                                position: "bottom-right",
                                duration: 3000,
                                isClosable: true
                            })
                        })
                    }
                } catch (e) {
                    console.log(e)
                }
                setSubmitting(false)
            }}
        >{({
            isSubmitting,
            values,
            handleChange
        }) => (
            <Form>
                <FormControl mt={4}>
                    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                        <FormLabel textAlign="center">Descripción: </FormLabel>
                        <GridItem colSpan={2}>
                            <Textarea
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                size="sm"
                                placeholder="Introduce una breve descripción de tu vivienda"
                            />
                        </GridItem>
                    </Grid>
                </FormControl>

                <FormControl mt={4}>
                    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                        <FormLabel textAlign="center">Precio: </FormLabel>
                        <GridItem colSpan={2}>
                            <Input
                                name="price"
                                value={values.price}
                                onChange={handleChange}
                                type="number"
                                size="sm"
                                placeholder="Introduce el precio de tu alojamiento"
                            />
                        </GridItem>
                    </Grid>
                </FormControl>

                <FormControl mt={4}>
                    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                        <FormLabel textAlign="center">Huéspedes: </FormLabel>
                        <GridItem colSpan={2}>
                            <Input
                                name="guests"
                                value={values.guests}
                                onChange={handleChange}
                                size="sm"
                                type="number"
                                placeholder="Introduce los huéspedes de tu alojamiento"
                            />
                        </GridItem>
                    </Grid>
                </FormControl>

                <FormControl mt={4}>
                    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                        <FormLabel textAlign="center">Habitaciones: </FormLabel>
                        <GridItem colSpan={2}>
                            <Input
                                name="bedrooms"
                                value={values.bedrooms}
                                onChange={handleChange}
                                type="number"
                                size="sm"
                                placeholder="Introduce las habitaciones de tu alojamiento"
                            />
                        </GridItem>
                    </Grid>
                </FormControl>

                <FormControl mt={4}>
                    <Grid gridTemplateColumns="repeat(3, 1fr)" gap={1}>
                        <FormLabel textAlign="center">Baños: </FormLabel>
                        <GridItem colSpan={2}>
                            <Input
                                name="toilets"
                                value={values.toilets}
                                onChange={handleChange}
                                type="number"
                                size="sm"
                                placeholder="Introduce los baños de tu alojamiento"
                            />
                        </GridItem>
                    </Grid>
                </FormControl>

                <FormControl mt={8}>
                    <Grid gridTemplateColumns="repeat(6, 1fr)" gap={1}>
                        <GridItem colSpan={2}>
                            <Stack direction={['column', 'row']} spacing='10px'>
                                <FormLabel textAlign='center' fontSize='18px'>
                                    Wifi
                                </FormLabel>
                                <Switch size='lg' name='wifi'
                                    value={values.wifi}
                                    onChange={handleChange}
                                    isChecked={values.wifi ? true : false}
                                />
                            </Stack>
                        </GridItem>

                        <GridItem colSpan={2}>
                            <Stack direction={['column', 'row']} spacing='10px'>
                                <FormLabel textAlign='center' fontSize='18px'>
                                    Garaje
                                </FormLabel>
                                <Switch size='lg' name="garage"
                                    value={values.garage}
                                    onChange={handleChange}
                                    isChecked={values.garage ? true : false}
                                />
                            </Stack>
                        </GridItem>

                        <GridItem colSpan={2}>
                            <Stack direction={['column', 'row']} spacing='10px'>
                                <FormLabel textAlign='center' fontSize='16px' mt='0.3'>
                                    Permite mascotas
                                </FormLabel>
                                <Switch size='lg' name="pets"
                                    value={values.pets}
                                    onChange={handleChange}
                                    isChecked={values.pets ? true : false}
                                />
                            </Stack>
                        </GridItem>
                    </Grid>
                </FormControl>

                <SimpleGrid my="6" columns={2} spacing={5}>
                    <Box>
                        <Button
                            type="submit"
                            bg="blue.600"
                            w="full"
                            color={colorMode === "dark" ? "black" : "white"}
                            disabled={isSubmitting}
                        >
                            Actualizar
                        </Button>
                    </Box>

                    <Box>
                        <Button
                            w="full"
                            bg="red"
                            color="white"
                            disabled={isSubmitting}
                            onClick={() => setIsOpen(true)}
                        >
                            Eliminar
                        </Button>
                    </Box>
                </SimpleGrid>

                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader fontSize="lg" fontWeight="bold">
                                Eliminar vivienda
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                ¿Estás seguro de que quieres eliminarla?
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancelar
                                </Button>

                                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                                    Eliminar
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>

            </Form>
        )}
        </Formik>
    )
}