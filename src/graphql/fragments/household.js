import { gql } from '@apollo/client'

export const HOUSEHOLD_FRAGMENT = gql`
    fragment HouseholdParts on Households{
        id
        price
        bedrooms
        toilets
        guests
        location{
            street
            number
            floor
            letter
            place{
                name
            }
        }
        user{
            username
            email
            telephone
            avatar
        }
        created_at
    }
`;