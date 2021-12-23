import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { ME_EXTENDED } from "../queries/me";

const useMe = () => {
    const { data, refetch, loading } = useQuery(ME_EXTENDED);

    const meExtended = useMemo(() => {
        if (!data) return
        return data.meExtended
    }, [data])

    return {
        meExtended,
        refetch,
        loading
    }
}

export default useMe