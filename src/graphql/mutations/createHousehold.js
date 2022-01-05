import { gql } from "@apollo/client"

export const CREATE_HOUSEHOLD = gql`
mutation addHousehold(
    $description: String!, $price: Float!, $bedrooms: Int!, $toilets: Int!, $guests: Int!, $location: ID!, $user: ID!
){
    createHousehold(
     input:{
       data:{
         description: $description,
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