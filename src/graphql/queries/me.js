import { gql } from '@apollo/client'
import { ME_EXTENDED_FRAGMENT } from '../fragments/me';

export const ME_EXTENDED = gql`
    query meExtended {
        meExtended{
            ...MeExtendedParts
        }
    }
    ${ME_EXTENDED_FRAGMENT}
`