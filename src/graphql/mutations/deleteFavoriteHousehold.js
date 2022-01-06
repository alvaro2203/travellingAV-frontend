import { gql } from "@apollo/client"

export const DELETE_FAVORITE_HOUSEHOLD = gql`
mutation deleteFavoriteHousehold(
    $id: ID!
){
    deleteFavoriteHousehold(
     input:{
       where:{id:$id}
     }
    ){
        favoriteHousehold{
            user{
                username
            }
            household{
                id 
            }
        }
    }
}
`