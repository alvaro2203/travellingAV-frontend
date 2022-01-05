import { Box, Button, Container, FormControl, FormLabel, Heading, IconButton, Input, InputGroup, InputLeftElement, InputRightElement, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

//icons
import { MdAlternateEmail, MdLockOutline } from "react-icons/md";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function ResetPassword() {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <>
            <Container textAlign="center" boxShadow="lg" p={4} mt={10}>
                <Box>
                    <Heading>Resetea aquí tu contraseña</Heading>
                    <Text><Link to="/login" style={{ color: "#00AFFF" }}>Inicia sesión</Link> o <Link to="/register" style={{ color: "#00AFFF" }}>Regístrate</Link> </Text>
                </Box>

                <Box my={8}>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<MdAlternateEmail color="gray" />}
                            />
                            <Input
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

                    <FormControl mt={4}>
                        <FormLabel>Repite la contraseña</FormLabel>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<MdLockOutline color="gray" />}
                            />
                            <Input
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

                    <Button
                        bg="blue.500"
                        width="full"
                        mt={8}
                        type="submit"
                    // disabled={isSubmitting}
                    >
                        Establecer
                    </Button>
                </Box>
            </Container>
        </>
    )
}