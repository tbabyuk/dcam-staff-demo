import { AuthContext } from "@components/context/AuthContext"
import { useContext } from "react"


export const useAuthContext = () => {
    return useContext(AuthContext)
}