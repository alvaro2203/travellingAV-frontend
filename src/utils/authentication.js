import { useHistory } from 'react-router-dom'
import { AUTH_TOKEN } from "./constans";

export const Authentication = () => {
    let navigate = useHistory()
    if (!localStorage.getItem(AUTH_TOKEN)) {
        navigate.push("/login")
    }
}