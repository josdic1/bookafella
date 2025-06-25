// client/src/components/NavBar.jsx
import { NavLink, useNavigate } from "react-router-dom" // Import useNavigate
import { useContext } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext"

function NavBar() {
    const { currentUser, isLoggedIn, handleLogout } = useContext(CurrentUserContext)
    const navigate = useNavigate(); // Initialize useNavigate hook

    function onClick() {
        handleLogout(); // Perform logout action first
        navigate('/login'); // Then navigate
    }

    let roleDisplay;

    if(isLoggedIn) {
        if(currentUser.role === "admin") {
            roleDisplay = (
                <nav>
                    <NavLink to="/home"> Home </NavLink>
                    <NavLink to="/new/reservation"> NEW Reservation </NavLink>
                    <NavLink to="/reservationlist"> VIEW Reservations </NavLink>
                    <NavLink to="/new/member"> NEW Member </NavLink>
                    <NavLink to="/memberlist"> VIEW Members </NavLink>

 <button className="btn btn-secondary"  type="button" onClick={onClick} > Logout </button> {/* Added ml-auto for Tailwind-like spacing, adjust with your CSS */}
                </nav>
            );
        } else {
            roleDisplay = (
                <nav>
                    <NavLink to="/home"> Home </NavLink>
                    <NavLink to="/new/reservation"> Make New Reservation </NavLink> {/* Added link for user */}
                    <NavLink to="/reservationlist"> View My Reservations </NavLink> {/* Added link for user */}

<button type="button" onClick={onClick} className="btn btn-info"> Logout </button> 
                </nav>
            );
        }
    } else {
        roleDisplay = <h1>Please Log In</h1>;
    }

    return (
        <>
            {roleDisplay}
        </>
    );
}

export default NavBar;