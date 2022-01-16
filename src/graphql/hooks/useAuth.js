import { useMemo } from "react"
import { useQuery } from "@apollo/client"
import { IS_AUTH } from "../queries/isAuth"

const IsAuth = () => {
    const { data: dataMe, loading: loadingMe, refetch } = useQuery(IS_AUTH);

    const me = useMemo(() => {
        if (!dataMe) return
        return dataMe.me;
    }, [dataMe])

    return {
        me,
        loadingMe,
        refetch
    }
}

export default IsAuth;