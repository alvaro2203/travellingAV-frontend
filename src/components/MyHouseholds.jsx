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

    refetchHouseholds()

    return (
        <div>
            {getHouseholds.households.length === 0
                ? <Text>Aún no tienes viviendas publicadas</Text>
                : <>
                    <Heading m="10">
                        <Center><Text>Estas son tus viviendas publicadas</Text></Center>
                    </Heading>

                    <Grid templateColumns='repeat(3, 1fr)' mt="16" gap={6} align="left">
                        {getHouseholds.households.map(household => {
                            if (household.user.username === me.username) {
                                return (
                                    <HouseholdCard key={household.id} props={household} />
                                )
                            }
                        })}
                    </Grid>
                </>
            }
        </div>
    )
}