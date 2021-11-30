import { useMemo } from "react"
import { gql, useQuery } from "@apollo/client"
import { HOUSEHOLD_FRAGMENT } from "../fragments/household"

const GET_HOUSEHOLDS = gql`
  query getHouseholds {
    userLocations{
        id
        users_permissions_user{
            email
        }
        location{
            household{
                ...HouseholdParts
            }
            coordinate{
                altitude
                latitude
            }
        }
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