import { gql } from "@apollo/client";
import { HOUSEHOLD_FRAGMENT } from "../fragments/household";

export const UPDATE_HOUSEHOLD = gql`
    mutation UpdateHousehold(
        $id: ID!,
        $price: Float!,
        $guests: Int!,
        $toilets: Int!,
        $bedrooms: Int!
        $description: String!,
        $wifi: Boolean!,
        $garage: Boolean!,
        $pets: Boolean!
    ){
        updateHousehold(
            input:{
                where:{id: $id}
                data:{
                    price: $price,
                    guests: $guests,
                    toilets: $toilets,
                    bedrooms: $bedrooms,
                    description: $description,
                    wifi: $wifi,
                    garage: $garage,
                    pets: $pets
                }
            }
        ){
            household{
                ...HouseholdParts
            }
        }
    }
    ${HOUSEHOLD_FRAGMENT}
`