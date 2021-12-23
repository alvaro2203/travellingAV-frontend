import { gql } from "@apollo/client";

export const ME_FRAGMENT = gql`
    fragment MeParts on UsersPermissionsMe {
        id
        username
        email
    }
`

export const ME_EXTENDED_FRAGMENT = gql`
    fragment MeExtendedParts on UsersPermissionsUser {
        id
        username
        email
        telephone
        name
        surname
        avatar
        households{
            price
            guests
        }
    }
`