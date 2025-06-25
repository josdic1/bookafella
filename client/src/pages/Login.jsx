// client/src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import MemberContext from "../contexts/MemberContext";

function Login() {
    const { members } = useContext(MemberContext);
    const { handleLogin } = useContext(CurrentUserContext);

    const [formData, setFormData] = useState({
        member: ""
    });

    // Initialize user state carefully. It should not be derived directly in useEffect
    // if it also serves as a dependency for that same effect in a way that causes loops.
    // It's better to use a state that holds the *potential* user and set it once.
    const [potentialUser, setPotentialUser] = useState(null); // Use null initially

    // This effect finds the matching member based on formData.member and members list
    useEffect(() => {
        const match = members.find(m => (
            m.member.toLowerCase() === formData.member.toLowerCase()
        ));
        // Only update potentialUser if it's truly different to prevent unnecessary re-renders
        if (match && (!potentialUser || potentialUser.id !== match.id)) {
            setPotentialUser(match);
        } else if (!match && potentialUser) { // If no match and potentialUser was previously set
            setPotentialUser(null);
        }
    }, [members, formData.member, potentialUser]); // Dependencies: members list and input field value

    const navigate = useNavigate();

    const onFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // Use potentialUser here, which is updated by the useEffect
        if (potentialUser) {
            handleLogin(potentialUser); // Pass the found user object
            navigate('/home');
            onClear();
        } else {
            console.error("Login failed: User not found.");
            // Optionally show a user-friendly message in the UI
        }
    };

    function onClear() {
        setFormData({
            member: ""
        });
        setPotentialUser(null); // Clear potential user as well
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="member">🔒 </label>
                <input type="text" name="member" id="member" onChange={onFormChange} value={formData.member} placeholder="User Login..." />
                {/* Only show login button if a potential user is found */}
                {potentialUser ? <button type="submit">Login</button> : <button type="button" disabled>Enter Username</button>}
                <button type="button" onClick={onClear}> Clear </button>
            </form>
        </>
    );
}

export default Login;