import { gql } from "@apollo/client"

export const CREATE_LOCATION = gql`
mutation addLocation(
    $city: String!, $street: String!, $number: Int!, $floor: Int!, $letter: String!, $place: ID! 
){
    createLocation(
      input:{
        data:{
          city: $city
          street: $street,
          number: $number,
          floor: $floor,
          letter: $letter,
          place: $place,
        }
      }
    ){
        location{
            id
        }
    }
  }
`