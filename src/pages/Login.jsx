import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Box, Container, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { useState } from "react";
import Fade from 'react-reveal/Fade';
import { Link, useNavigate } from 'react-router-dom'
import { useMutation, gql } from '@apollo/client'
import { Formik } from 'formik'

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
    let navigate = useNavigate();
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [login, { data, loading, error }] = useMutation(LOGIN)

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
            <Container textAlign="center" boxShadow="lg" p={4} mt={10}>
                <Box >
                    <Heading>Bienvenido a TravellingAV</Heading>
                    <Text><Link to="/login">Inicia sesión</Link> o <Link to="/register" style={{ color: "#00AFFF" }}>Regístrate</Link> </Text>
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
                                    console.log(data.data.login.jwt)
                                    navigate("/")
                                })
                                
                            } catch (e){
                                alert(e)
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
                                    <Link to="/changePassword" style={{ color: "#00AFFF" }}>¿Olvidaste tu contraseña?</Link>
                                </Box>

                                <Button type="submit" bg="blue.500" width="full" mt={4} disabled={isSubmitting}>Iniciar Sesíon</Button>
                            </form>
                        )}
                    </Formik>

                </Box>
            </Container>
        </Fade>
    )
}