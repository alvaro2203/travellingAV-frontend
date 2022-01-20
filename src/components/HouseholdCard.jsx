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
                        src={`https://travellingav.s3.eu-west-3.amazonaws.com/${householdProps?.image1}`}
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
                                src={`https://travellingav.s3.eu-west-3.amazonaws.com/${householdProps?.user?.avatar}`}
                                alt={'Author'}
                            />
                            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                                <Text fontWeight={600}>{householdProps?.user?.email}</Text>
                                <Text color={'gray.500'}>{householdProps?.date}</Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
            </Link>

        </Center>
    )
}