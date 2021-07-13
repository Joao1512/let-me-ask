import { useContext } from "react"
import { UserContext } from "../contexts/AuthContext"

export function useAuth(){
    let value = useContext(UserContext)
    return value
}