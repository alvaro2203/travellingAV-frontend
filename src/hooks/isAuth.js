import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { IS_AUTH } from "../queries/isAuth"

const IsAuth = () => {
    const { data, loading } = useQuery(IS_AUTH);

    const me = useMemo(() => {
        return data;

    }, [data])

    return {
        me,
        loading
    }
}

export default IsAuth;