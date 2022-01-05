import { gql } from "@apollo/client";
import { HOUSEHOLD_FRAGMENT } from "../fragments/household";

export const UPDATE_HOUSEHOLD = gql`
    mutation UpdateHousehold(
        $id: ID!,
        $price: Float!,
        $guests: Int!,
        $toilets: Int!,
        $bedrooms: Int!
    ){
        updateHousehold(
            input:{
                where:{id: $id}
                data:{
                    price: $price,
                    guests: $guests,
                    toilets: $toilets,
                    bedrooms: $bedrooms
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