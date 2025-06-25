import { useState, useEffect } from "react"; // Import useEffect
import CurrentUserContext from "../contexts/CurrentUserContext";

function CurrentUserProvider({ children }) {
    // 1. Initialize state from localStorage
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            return storedUser ? JSON.parse(storedUser) : {
                id: "",
                member: "",
                role: ""
            };
        } catch (error) {
            console.error("Failed to parse stored user from localStorage:", error);
            return {
                id: "",
                member: "",
                role: ""
            };
        }
    });

    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        try {
            const storedLoggedIn = localStorage.getItem("isLoggedIn");
            // Check if storedLoggedIn is 'true' string
            return storedLoggedIn === "true";
        } catch (error) {
            console.error("Failed to parse isLoggedIn from localStorage:", error);
            return false;
        }
    });

    // 2. Persist state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
        localStorage.setItem("isLoggedIn", isLoggedIn.toString()); // Store boolean as string
    }, [currentUser, isLoggedIn]); // Dependencies: run this effect when currentUser or isLoggedIn changes

    const handleLogin = (user) => {
        // In a real app, you'd likely get a token from a backend here
        // and store that token, not the full user object with password.
        // For this example, we'll store the user object.
        setCurrentUser(user);
        setIsLoggedIn(true);
        // localStorage.setItem("currentUser", JSON.stringify(user)); // This is now handled by the useEffect
        // localStorage.setItem("isLoggedIn", "true");                // This is now handled by the useEffect
    };

    const handleLogout = () => {
        setCurrentUser({
            id: "",
            member: "",
            role: ""
        });
        setIsLoggedIn(false);
        // localStorage.removeItem("currentUser"); // This is now handled by the useEffect (by setting to empty)
        // localStorage.removeItem("isLoggedIn");  // This is now handled by the useEffect (by setting to false)
    };

    return (
        <CurrentUserContext.Provider
            value={{ currentUser, isLoggedIn, handleLogin, handleLogout }}
        >
            {children}
        </CurrentUserContext.Provider>
    );
}

export default CurrentUserProvider;