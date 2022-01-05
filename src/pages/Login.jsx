import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Box, Container, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useState } from "react";
import Fade from 'react-reveal/Fade';
import { Link, useHistory } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Formik } from 'formik'
import { AUTH_TOKEN, APP_NAME } from "../utils/constans";
import { client } from '../index'

//icons
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LOGIN = gql`
    mutation login($identifier: String!, $password: String!) {
        login(input: {identifier: $identifier, password: $password}) {
            jwt
        }
  }
`

export default function Login() {
    let navigate = useHistory();
    const [show, setShow] = useState(false)
    const [notExists, setNotExists] = useState(false)
    const handleClick = () => setShow(!show)
    const [login, { loading }] = useMutation(LOGIN)

    if (loading) return (
        <Container maxW="container.md" textAlign="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" />
        </Container>
    )

    return (
        <Fade left>
            <Container textAlign="center" boxShadow="lg" p={4} mt={10}>
                <Box >
                    <Heading>Bienvenido a {APP_NAME}</Heading>
                    <Text>Inicia sesión o <Link to="/register" style={{ color: "#00AFFF" }}>Regístrate</Link> </Text>
                </Box>

                <Box my={8}>
                    <Formik
                        initialValues={{
                            email: '',
                            password: ''
                        }}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true)
                            try {
                                await login({
                                    variables: {
                                        identifier: values.email,
                                        password: values.password
                                    }
                                }).then(data => {
                                    if (data) {
                                        localStorage.setItem(AUTH_TOKEN, data.data.login.jwt)
                                        client.resetStore()
                                        navigate.push("/")
                                    }
                                })

                            } catch (e) {
                                setNotExists(true)
                                setSubmitting(false)
                            }

                        }}
                    >
                        {({
                            values,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<MdAlternateEmail color="gray" />}
                                        />
                                        <Input
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            name="email"
                                            type="email"
                                            placeholder="Introduce tu email"
                                        />
                                    </InputGroup>

                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Contraseña</FormLabel>
                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<MdLockOutline color="gray" />}
                                        />
                                        <Input
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            name="password"
                                            type={show ? "text" : "password"}
                                            placeholder="Introduce tu contraseña"
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

                                </FormControl>

                                <Box textAlign="right" mt={4}>
                                    <Link to="/rstPassword" style={{ color: "#00AFFF" }}>¿Olvidaste tu contraseña?</Link>
                                </Box>

                                <Button type="submit" bg="blue.500" width="full" mt={4} disabled={isSubmitting}>Iniciar Sesíon</Button>
                            </form>
                        )}
                    </Formik>
                    {notExists
                        ? <Text mt={4} style={{ color: "red" }}>El usuario o la contraseña son incorrectos</Text>
                        : null
                    }
                </Box>
            </Container>
        </Fade>
    )
}