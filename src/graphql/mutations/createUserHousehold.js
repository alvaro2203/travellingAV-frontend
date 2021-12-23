import { gql } from "@apollo/client"

export const CREATE_USER_HOUSEHOLD = gql`
  mutation addUserHousehold(
      $householdId: ID!, $userId: ID! 
  ){
      createUserHousehold(
      input:{
        data:{
          household: $householdId,
          user: $userId
        }
      }
      ){
          userHousehold{
              id
          }
      }
  }
`