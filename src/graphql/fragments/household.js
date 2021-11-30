import { gql } from '@apollo/client'

export const HOUSEHOLD_FRAGMENT = gql`
    fragment HouseholdParts on Households{
        id
        price
        bedrooms
        toilets
        squareMeters
        location{
            street
            number
            floor
            letter
            coordinate{
                altitude
                latitude
            }
            place{
                place
            }
        }
    }
`;