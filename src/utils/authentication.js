import { useNavigate } from 'react-router-dom'
import { AUTH_TOKEN } from "../constans";

export const Authentication = () => {
    let navigate = useNavigate()
    if (!localStorage.getItem(AUTH_TOKEN)) navigate("/login")
}