import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CurrentUserContext from "../contexts/CurrentUserContext"

function RedirectHome() {
  const { currentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser?.id) {
      navigate("/home")
    } else {
      navigate("/login")
    }
  }, [currentUser, navigate])

  return null
}

export default RedirectHome