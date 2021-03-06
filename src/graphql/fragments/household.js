import { gql } from '@apollo/client'

export const HOUSEHOLD_FRAGMENT = gql`
    fragment HouseholdParts on Households{
        id
        price
        bedrooms
        toilets
        guests
        description
        image1
        image2
        image3
        wifi
        pets
        garage
        date
        location{
            city
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
    }
`;