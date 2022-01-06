import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { FAVORITE_HOUSEHOLDS } from "../../queries/households"

const UseFavoriteHouseholds = (user) => {
    const { loading, error, data, refetch } = useQuery(FAVORITE_HOUSEHOLDS, {
        variables: { user }
    })

    const favoriteHouseholds = useMemo(() => {
        return data
    }, [data])

    return {
        favoriteHouseholds,
        refetch,
        loading,
        error,
        data
    }
}

export default UseFavoriteHouseholds;