import { gql } from "@apollo/client"

export const CREATE_HOUSEHOLD = gql`
mutation addHousehold(
    $price: Float!, $bedrooms: Int!, $toilets: Int!, $guests: Int!, $location: ID!, $user: ID!
){
    createHousehold(
     input:{
       data:{
         price: $price,
         bedrooms: $bedrooms,
         toilets: $toilets,
         guests: $guests,
         location: $location,
         user: $user
       }
     }
    ){
        household{
            id 
            price
            guests
        }
    }
}
`