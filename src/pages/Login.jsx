import { Button, IconButton } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/input";
import { Box, Container, Heading, Link, Text } from "@chakra-ui/layout";
import { useState } from "react";
import Fade from 'react-reveal/Fade';

//icons
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function Login() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)

    return (
        <Fade left>
            <Container textAlign="center" boxShadow="lg" p={4} mt={10}>
                <Box >
                    <Heading>Bienvenido a TravellingAV</Heading>
                    <Text>Inicia sesión o <Link color="blue.500">regístrate</Link> </Text>
                </Box>

                <Box my={8}>
                    <form>
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

                        <Box textAlign="right" mt={4}>
                            <Link color="blue.500">¿Olvidaste tu contraseña?</Link>
                        </Box>

                        <Button bg="blue.500" width="full" mt={4}>Iniciar Sesíon</Button>
                    </form>
                </Box>
            </Container>
        </Fade>
    )
}