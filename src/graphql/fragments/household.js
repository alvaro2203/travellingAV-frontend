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
                place
            }
        }
    }
`;