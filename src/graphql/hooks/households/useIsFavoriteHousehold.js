import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { FAVORITE_HOUSEHOLD } from "../../queries/households"

const UseIsFavoriteHousehold = (user, householdId) => {
    const { loading, error, data, refetch } = useQuery(FAVORITE_HOUSEHOLD, {
        variables: { user, householdId }
    })

    const favoriteHousehold = useMemo(() => {
        return data
    }, [data])

    return {
        favoriteHousehold,
        refetch,
        loading,
        error,
        data
    }
}

export default UseIsFavoriteHousehold;