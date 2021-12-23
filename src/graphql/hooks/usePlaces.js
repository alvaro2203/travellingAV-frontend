import { useQuery, gql } from '@apollo/client'
import { useMemo } from 'react'

const GET_PLACES = gql`
  query getPlaces {
    places {
      id
      name
    }
  }
`

const UsePlaces = () => {
    const { loading, error, data } = useQuery(GET_PLACES)

    const getPlaces = useMemo(() => {
        return data
    }, [data])

    return {
        loading,
        error,
        getPlaces
    }
}

export default UsePlaces