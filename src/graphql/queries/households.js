import { gql } from "@apollo/client";
import { HOUSEHOLD_FRAGMENT } from "../fragments/household";

export const GET_HOUSEHOLDS = gql`
    query getHouseholds {
        households{
            ...HouseholdParts
        }
    }
    ${HOUSEHOLD_FRAGMENT}
`

export const GET_HOUSEHOLD = gql`
    query getHousehold($id: ID!) {
        household(
            id: $id
        ){
            ...HouseholdParts
        }
    }
    ${HOUSEHOLD_FRAGMENT}
`