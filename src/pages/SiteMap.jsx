import { Box, Container, Heading, ListItem, UnorderedList, Link } from "@chakra-ui/react"
import { Authentication } from "../utils/authentication"
import useMe from "../graphql/hooks/useMe"

export default function SiteMap() {
    Authentication()
    const { meExtended: me } = useMe()

    if (!me) return null

    return (
        <Container maxW='container.xl' m={10} p={10}>
            <Heading>Mapa del sitio</Heading>
            <Box m={5}>
                <UnorderedList>
                    <ListItem><Link href='/'>Inicio</Link></ListItem>
                    <ListItem><Link href={`profile/${me?.id}`}>Mi perfil</Link></ListItem>
                    <ListItem><Link href='/myHousehold'>Ofrece tu alojamiento</Link></ListItem>
                    <ListItem><Link href='/favorites'>Favoritos</Link></ListItem>
                    <ListItem><Link href='/contact'>Contáctanos</Link></ListItem>
                </UnorderedList>
            </Box>
        </Container>
    )
}