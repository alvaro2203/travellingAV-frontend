import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { GET_HOUSEHOLD } from "../../queries/households"

const UseHousehold = (id) => {
    const { loading: loadingHousehold, error: errorHousehold, data: dataHousehold, refetch: refetchHousehold } = useQuery(GET_HOUSEHOLD, {
        variables: { id }
    })

    const getHousehold = useMemo(() => {
        return dataHousehold
    }, [dataHousehold])

    return {
        getHousehold,
        loadingHousehold,
        errorHousehold,
        refetchHousehold,
    }
}

export default UseHousehold;