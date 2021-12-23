import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { GET_HOUSEHOLDS } from "../../queries/households"

const UseHouseholds = () => {
  const { loading: loadingHouseholds, error: errorHouseholds, data: dataHouseholds, refetch: refetchHouseholds } = useQuery(GET_HOUSEHOLDS)

  const getHouseholds = useMemo(() => {
    return dataHouseholds
  }, [dataHouseholds])

  return {
    refetchHouseholds,
    loadingHouseholds,
    errorHouseholds,
    getHouseholds
  }
}

export default UseHouseholds;