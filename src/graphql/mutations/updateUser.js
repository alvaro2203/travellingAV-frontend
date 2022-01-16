import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation UpdateUser(
        $id: ID!, $name: String!, $surname: String!, $telephone: Int, $avatar: String
    ){
        updateUser(
            input:{
                where:{id: $id}
                data:{
                    name: $name,
                    surname: $surname,
                    telephone: $telephone,
                    avatar: $avatar
                }
            }
        ){
            user{
                name
                surname
                telephone
                avatar
            }
        }
    }
`