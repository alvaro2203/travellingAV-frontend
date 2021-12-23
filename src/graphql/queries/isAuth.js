import { gql } from '@apollo/client'
import { ME_FRAGMENT } from '../fragments/me';


export const IS_AUTH = gql`
    query isAuth {
        me {
            ...MeParts
        }
    }
    ${ME_FRAGMENT}
`;
