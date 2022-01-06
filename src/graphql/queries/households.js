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

export const FAVORITE_HOUSEHOLDS = gql`
    query favoriteHouseholds($user: String!){
        favoriteHouseholds(
            where:{
                user:{
                    username: $user
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

export const FAVORITE_HOUSEHOLD = gql`
    query favoriteHouseholds($user: ID!, $householdId: ID!){
        favoriteHouseholds(
            where:{
                user:$user
                household:$householdId
            }
        ){
            id
            user{
                username
            }
            household{
                price
            }
        }
    }
`