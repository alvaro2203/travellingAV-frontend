import { gql } from '@apollo/client'

export const IS_AUTH = gql`
    query isAuth {
        me {
            id
            username
            email
        }
    }
`