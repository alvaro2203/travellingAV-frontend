import {
    Container,
    Flex,
    Box,
    Heading,
    Text,
    IconButton,
    Button,
    VStack,
    HStack,
    Wrap,
    WrapItem,
    useColorMode,
    Link,
} from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';
import { Authentication } from '../utils/authentication';
import {
    MdPhone,
    MdEmail,
    MdLocationOn,
    MdFacebook,
} from 'react-icons/md';
import { BsGithub, BsDiscord } from 'react-icons/bs';

export default function Contact() {
    Authentication()
    const { colorMode } = useColorMode()

    return (
        <>
            <Header />
            <Container maxW="full" mt={20} centerContent overflow="hidden">
                <Flex mb={16}>
                    <Box
                        color={colorMode === 'dark' ? 'white' : 'black'}
                        borderRadius="lg"
                        m={{ sm: 4, md: 16, lg: 10 }}
                        p={{ sm: 5, md: 5, lg: 16 }}>
                        <Box p={4}>
                            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
                                <WrapItem>
                                    <Box>
                                        <Heading>Contáctanos</Heading>
                                        <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                                            Aqui la información de contacto
                                        </Text>
                                        <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                                            <VStack pl={0} spacing={3} alignItems="flex-start">
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color={colorMode === 'dark' ? "#DCE2FF" : 'black'}
                                                    _hover={{ border: '2px solid #1C6FEB' }}
                                                    leftIcon={<MdPhone color="#1970F1" size="20px" />}>
                                                    +34-654489721
                                                </Button>
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color={colorMode === 'dark' ? "#DCE2FF" : 'black'}
                                                    _hover={{ border: '2px solid #1C6FEB' }}
                                                    leftIcon={<MdEmail color="#1970F1" size="20px" />}>
                                                    soporte@travenllingAV.com
                                                </Button>
                                                <Button
                                                    size="md"
                                                    height="48px"
                                                    width="200px"
                                                    variant="ghost"
                                                    color={colorMode === 'dark' ? "#DCE2FF" : 'black'}
                                                    _hover={{ border: '2px solid #1C6FEB' }}
                                                    leftIcon={<MdLocationOn color="#1970F1" size="20px" />}>
                                                    Móstoles, España
                                                </Button>
                                            </VStack>
                                        </Box>
                                        <HStack
                                            mt={{ lg: 10, md: 10 }}
                                            spacing={5}
                                            px={5}
                                            alignItems="flex-start">
                                            <Link href='https://facebook.com'>
                                                <IconButton
                                                    aria-label="facebook"
                                                    variant="ghost"
                                                    size="lg"
                                                    isRound={true}
                                                    _hover={{ bg: '#0D74FF' }}
                                                    icon={<MdFacebook size="28px" />}
                                                />
                                            </Link>
                                            <Link href={'https://github.com'}>
                                                <IconButton
                                                    aria-label="github"
                                                    variant="ghost"
                                                    size="lg"
                                                    isRound={true}
                                                    _hover={{ bg: '#0D74FF' }}
                                                    icon={<BsGithub size="28px" />}
                                                />
                                            </Link>
                                            <Link href={'https://discord.com'}>
                                                <IconButton
                                                    aria-label="discord"
                                                    variant="ghost"
                                                    size="lg"
                                                    isRound={true}
                                                    _hover={{ bg: '#0D74FF' }}
                                                    icon={<BsDiscord size="28px" />}
                                                />
                                            </Link>
                                        </HStack>
                                    </Box>
                                </WrapItem>
                            </Wrap>
                        </Box>
                    </Box>
                </Flex>
            </Container>
            <Footer />
        </>
    );
}