import { Container, Box, Text, Flex, Stack, Button, Heading, Image } from "@chakra-ui/react"
import { APP_NAME } from '../utils/constans'

export default function TextBeginning({ title, text }) {
    return (
        <>
            <Container maxW={'7xl'}>
                <Stack
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 20, md: 28 }}
                    direction={{ base: 'column', md: 'row' }}>
                    <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                        <Heading
                            lineHeight={1.1}
                            fontWeight={600}
                            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}>
                            <Text
                                as={'span'}
                                position={'relative'}
                                _after={{
                                    content: "''",
                                    width: 'full',
                                    height: '30%',
                                    position: 'absolute',
                                    bottom: 1,
                                    left: 0,
                                    bg: 'blue.300',
                                    zIndex: -1,
                                }}>
                                {APP_NAME}
                            </Text>
                            <br />
                            <Text as={'span'} color={'blue.300'}>
                                {title}
                            </Text>
                        </Heading>
                        <Text color={'gray.500'}>
                            {text}
                        </Text>
                        <Stack
                            spacing={{ base: 4, sm: 6 }}
                            direction={{ base: 'column', sm: 'row' }}>
                            <Button
                                rounded={'full'}
                                size={'lg'}
                                fontWeight={'normal'}
                                px={6}
                                colorScheme={'red'}
                                bg={'blue.400'}
                                _hover={{ bg: 'blue.500' }}>
                                Get started
                            </Button>
                            <Button
                                rounded={'full'}
                                size={'lg'}
                                fontWeight={'normal'}
                                px={6}
                            >
                                How It Works
                            </Button>
                        </Stack>
                    </Stack>
                    <Flex
                        flex={1}
                        justify={'center'}
                        align={'center'}
                        position={'relative'}
                        w={'full'}>
                        <Box
                            position={'relative'}
                            height={'300px'}
                            rounded={'2xl'}
                            width={'full'}
                            overflow={'hidden'}
                            boxShadow="dark-lg"
                        >
                            <Image
                                alt={'Hero Image'}
                                fit={'cover'}
                                align={'center'}
                                w={'100%'}
                                h={'100%'}
                                src={
                                    'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dHJhdmVsbGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60'
                                }
                            />
                        </Box>
                    </Flex>
                </Stack>
            </Container>
        </>
    )
}