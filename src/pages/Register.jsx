import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Box, Container, Grid, Heading, Text } from "@chakra-ui/layout";
import { useState } from "react";
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom'

//icons
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaUser, FaPencilAlt } from "react-icons/fa";

export default function Register() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Fade left>
            <Container maxW="container.md" textAlign="center" boxShadow="lg" p={4} mt={4} >
                <Box >
                    <Heading>Bienvenido a TravellingAV</Heading>
                    <Text><Link to="/login" style={{color: "#00AFFF"}}>Inicia sesión</Link> o <Link to="/register">Regístrate</Link> </Text>
                </Box>

                <Grid gridTemplateColumns="repeat(2, 1fr)" gap={6}>
                    <Box my={8} w="100%">

                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FaPencilAlt color="gray" />}
                                />
                                <Input type="email" placeholder="Introduce tu nombre" />
                            </InputGroup>

                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Apellido</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FaPencilAlt color="gray" />}
                                />
                                <Input type="email" placeholder="Introduce tu apellido" />
                            </InputGroup>

                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Nombre de usuario</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<FaUser color="gray" />}
                                />
                                <Input type="email" placeholder="Introduce tu nombre de usuario" />
                            </InputGroup>

                        </FormControl>
                    </Box>

                    <Box my={8} w="100%">
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<MdAlternateEmail color="gray" />}
                                />
                                <Input type="email" placeholder="Introduce tu email" />
                            </InputGroup>

                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Contraseña</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<MdLockOutline color="gray" />}
                                />
                                <Input type={show ? "text" : "password"} placeholder="Introduce tu contraseña" />
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

                        <FormControl mt={4}>
                            <FormLabel>Repite la contraseña</FormLabel>
                            <InputGroup>
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<MdLockOutline color="gray" />}
                                />
                                <Input type={show ? "text" : "password"} placeholder="Introduce tu contraseña" />
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
                    </Box>

                </Grid>
                <Button bg="blue.500" width="full" mt={4}>Registrase</Button>
            </Container>
        </Fade>
    )
}