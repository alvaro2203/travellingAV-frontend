import { gql } from "@apollo/client"

export const CREATE_HOUSEHOLD = gql`
mutation addHousehold(
    $description: String!, $price: Float!, $bedrooms: Int!, $toilets: Int!, $guests: Int!, 
    $location: ID!, $user: ID!, $image1: String!, $image2: String!, $image3: String!,
    $wifi: Boolean!, $pets: Boolean!, $garage: Boolean!
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
         image1: $image1,
         image2: $image2,
         image3: $image3,
         wifi: $wifi,
         pets: $pets,
         garage: $garage,
         user: $user
       }
     }
    ){
        household{
            id 
            price
            guests
            image1
            image2
            image3
            wifi
            pets
            garage
        }
    }
}
`