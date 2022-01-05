import { Heading, Center, Text, Container, Spinner, Box, Grid } from "@chakra-ui/react"
import UseHouseholds from "../graphql/hooks/households/useHouseholds"
import IsAuth from '../graphql/hooks/useAuth';
import HouseholdCard from "./HouseholdCard";

export default function MyHouseholds() {
    const { loadingHouseholds, errorHouseholds, getHouseholds, refetchHouseholds } = UseHouseholds();
    const { me } = IsAuth();

    if (loadingHouseholds) return (
        <Container maxW="container.md" textAlign="center">
            <Spinner size="xl" thickness="4px" speed="0.65s" />
        </Container>
    )

    if (errorHouseholds) return (
        <Box>
            <Text>Error :( </Text>
        </Box>
    )

    const households = getHouseholds?.households

    let cont = 0
    households.forEach(household => {
        if (household?.user?.username === me?.username) {
            cont++
        }
    })

    refetchHouseholds()

    return (
        <>
            {cont === 0
                ? <>
                    <Center>
                        <Heading m="10">
                            <Text>Aún no tienes viviendas publicadas</Text>
                        </Heading>
                    </Center>
                    <Text>¿A qué estás esperando?</Text>
                </>

                : <>
                    <Heading m="10">
                        <Center><Text>Estas son tus viviendas publicadas</Text></Center>
                    </Heading>

                    <Grid templateColumns='repeat(3, 1fr)' mt="16" gap={6} align="left">
                        {households.map(household => (
                            household.user.username === me.username
                                ? <HouseholdCard key={household.id} props={household} />
                                : null
                        ))}
                    </Grid>
                </>
            }
        </>
    )
}