import { useMemo } from "react"
import { gql, useQuery } from "@apollo/client"
import { HOUSEHOLD_FRAGMENT } from "../fragments/household"

const GET_HOUSEHOLDS = gql`
  query getHouseholds {
    userHouseholds{
        id
        household{
          ...HouseholdParts
        }
        user{
            username
            email
        }
        created_at
      }
  }
  ${HOUSEHOLD_FRAGMENT}
`

const UseHouseholds = () => {
    const { loading: loadingHousehold, error: errorHousehold, data } = useQuery(GET_HOUSEHOLDS)

    const getHouseholds = useMemo(() => {
        return data
    }, [data])

    return {
        loadingHousehold,
        errorHousehold,
        getHouseholds
    }
}

export default UseHouseholds;