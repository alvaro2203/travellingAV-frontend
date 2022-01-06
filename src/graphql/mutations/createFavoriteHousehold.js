import { gql } from "@apollo/client"

export const CREATE_FAVORITE_HOUSEHOLD = gql`
mutation createFavoriteHousehold(
    $user: ID!, $household: ID!
){
    createFavoriteHousehold(
     input:{
       data:{
         user: $user
         household: $household
       }
     }
    ){
        favoriteHousehold{
            user{
                username
            }
            household{
                id 
                price
                guests
            }
        }
    }
}
`