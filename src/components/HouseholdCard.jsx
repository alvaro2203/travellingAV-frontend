import { Box, Text, Stack, Image, Center, Avatar, Badge } from "@chakra-ui/react"
import { Link } from "react-router-dom"

export default function HouseholdCard(props) {
    const householdProps = props.props

    return (
        <Center>
            <Link to={`/households/${householdProps?.id}`}>
                <Box
                    maxW="sm"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="dark-lg"
                    mb="14"
                    _hover={{
                        transform: 'translateY(4px)',
                        boxShadow: 'md',
                    }}
                >
                    <Image
                        src="https://media.istockphoto.com/photos/close-up-of-small-blue-gray-mobile-home-with-a-front-and-side-porch-picture-id1297687835?b=1&k=20&m=1297687835&s=170667a&w=0&h=Kj4yvWxQxYo_fc9801IJZrHCAXa06LNsiRLjovVfoQQ="
                    />

                    <Box p="6">
                        <Box display="flex" alignItems="baseline">
                            <Badge borderRadius="full" px="2" colorScheme="teal">
                                New
                            </Badge>
                            <Box
                                color="gray.500"
                                fontWeight="semibold"
                                letterSpacing="wide"
                                fontSize="xs"
                                textTransform="uppercase"
                                ml="2"
                            >
                                {householdProps?.bedrooms === 1
                                    ? householdProps?.bedrooms + " habitación"
                                    : householdProps?.bedrooms + " habitaciones"
                                } &bull; {" "}
                                {householdProps?.toilets === 1
                                    ? householdProps?.toilets + " baño"
                                    : householdProps?.toilets + " baños"
                                } &bull; {" "}
                                {householdProps?.guests === 1
                                    ? householdProps?.guests + " huésped"
                                    : householdProps?.guests + " huéspedes"
                                }
                            </Box>
                        </Box>

                        <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                        >
                            {householdProps?.location?.place?.name} - {householdProps?.location?.city} - {householdProps?.location?.street}
                        </Box>

                        <Box>
                            {householdProps?.price}€
                            <Box as="span" color="gray.500" fontSize="sm">
                                /semana
                            </Box>
                        </Box>
                        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                            <Avatar
                                src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
                                alt={'Author'}
                            />
                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                <Text fontWeight={600}>{householdProps?.user?.email}</Text>
                                <Text color={'gray.500'}>{householdProps?.created_at}</Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Link>

        </Center>
    )
}