import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Box, Container, Grid, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useState } from "react";
import Fade from 'react-reveal/Fade';
import { Link, useHistory } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Formik } from 'formik'
import { APP_NAME, AUTH_TOKEN } from "../utils/constans";

//icons
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { client } from "..";

const REGISTER = gql`
    mutation Register($username: String!, $email: String!, $password: String!) {
        register(input: {username: $username, email: $email, password: $password}) {
            jwt
            user {
                username
                email
            }
        }
  }
`

export default function Register() {
    let navigate = useHistory();
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const handleClick = () => setShow(!show)
    const handleClick2 = () => setShow2(!show2)
    const [register, { loading, error }] = useMutation(REGISTER)

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
        <Fade left>
            <Container maxW="container.md" textAlign="center" boxShadow="lg" p={4} mt={4} >
                <Box >
                    <Heading>Bienvenido a {APP_NAME}</Heading>
                    <Text><Link to="/login" style={{ color: "#00AFFF" }}>Inicia sesión</Link> o <Link to="/register">Regístrate</Link> </Text>
                </Box>

                <Formik
                    initialValues={{
                        username: '',
                        email: '',
                        password: '',
                        rptPassword: ''
                    }}
                    validate={values => {
                        const errors = {}

                        if (!values.username) {
                            errors.username = "Required"
                        }

                        if (!values.email) {
                            errors.email = "Required"
                        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                            errors.email = 'Invalid email address';
                        }

                        if (!values.password) {
                            errors.password = "Required"
                        }

                        if (!values.rptPassword) {
                            errors.rptPassword = "Required"
                        } else if (values.rptPassword !== values.password) {
                            errors.rptPassword = "La contraseña no coincide"
                        }

                        return errors;
                    }}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true)
                        try {
                            await register({
                                variables: {
                                    username: values.username,
                                    email: values.email,
                                    password: values.password
                                }
                            }).then(data => {
                                localStorage.setItem(AUTH_TOKEN, data.data.register.jwt)
                                client.resetStore()
                                navigate.push("/");
                            })
                        } catch (e) {
                            console.log(e)
                            setSubmitting(false)
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Grid gridTemplateColumns="repeat(2, 1fr)" gap={6}>
                                <Box my={8} w="100%">
                                    <FormControl mt={4} isInvalid={errors.username && touched.username}>
                                        <FormLabel>Nombre de usuario</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<FaUser color="gray" />}
                                            />
                                            <Input
                                                type="text"
                                                placeholder="Introduce tu nombre de usuario"
                                                name="username"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.username}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{errors.username}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt={4} isInvalid={errors.email && touched.email}>
                                        <FormLabel>Email</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<MdAlternateEmail color="gray" />}
                                            />
                                            <Input
                                                type="email"
                                                placeholder="Introduce tu email"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                            />
                                        </InputGroup>
                                        <FormErrorMessage>{errors.email}</FormErrorMessage>
                                    </FormControl>
                                </Box>

                                <Box my={8} w="100%">
                                    <FormControl mt={4} isInvalid={errors.password && touched.password}>
                                        <FormLabel>Contraseña</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<MdLockOutline color="gray" />}
                                            />
                                            <Input
                                                type={show ? "text" : "password"}
                                                placeholder="Introduce tu contraseña"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                            />
                                            <InputRightElement>
                                                <IconButton
                                                    aria-label="Mostrar Contraseña"
                                                    variant="ghost"
                                                    colorScheme="blue"
                                                    size="md"
                                                    onClick={handleClick}
                                                    icon={show ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>{errors.password}</FormErrorMessage>
                                    </FormControl>

                                    <FormControl mt={4} isInvalid={errors.rptPassword && touched.rptPassword}>
                                        <FormLabel>Repite la contraseña</FormLabel>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<MdLockOutline color="gray" />}
                                            />
                                            <Input
                                                type={show2 ? "text" : "password"}
                                                placeholder="Introduce tu contraseña"
                                                name="rptPassword"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.rptPassword}
                                            />
                                            <InputRightElement>
                                                <IconButton
                                                    aria-label="Mostrar Contraseña"
                                                    variant="ghost"
                                                    colorScheme="blue"
                                                    size="md"
                                                    onClick={handleClick2}
                                                    icon={show2 ? <AiFillEyeInvisible /> : <AiFillEye />}
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                        <FormErrorMessage>{errors.rptPassword}</FormErrorMessage>
                                    </FormControl>
                                </Box>
                            </Grid>

                            <Button
                                bg="blue.500"
                                width="full"
                                mt={4}
                                type="submit"
                                disabled={isSubmitting}
                            >
                                Registrarse
                            </Button>
                        </form>
                    )}
                </Formik>
            </Container>
        </Fade>
    )
}