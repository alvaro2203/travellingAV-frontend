import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!, $name: String!, $surname: String!, $telephone: Int!
    ){
        updateUser(
            input:{
                where:{id: $id}
                data:{
                    name: $name,
                    surname: $surname,
                    telephone: $telephone
                }
            }
        ){
            user{
                name
                surname
                telephone
            }
        }
    }
`