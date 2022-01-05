import { gql } from "@apollo/client";
import { HOUSEHOLD_FRAGMENT } from "../fragments/household";

export const DELETE_HOUSEHOLD = gql`
    mutation DeleteHousehold(
        $id: ID!,
    ){
        deleteHousehold(
            input:{
                where:{id: $id}
            }
        ){
            household{
                ...HouseholdParts
            }
        }
    }
    ${HOUSEHOLD_FRAGMENT}
`