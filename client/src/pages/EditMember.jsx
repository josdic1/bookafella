import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import MemberContext from "../contexts/MemberContext";
import Loader from "../components/Loader";

function EditMember() {
    // --- ALL HOOKS MUST BE DECLARED AT THE TOP LEVEL, UNCONDITIONALLY ---
    const { id } = useParams();
    const { members, loading, handleEdit } = useContext(MemberContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: "",
        member: "",
        role: ""
    });

    // Console log for debugging (keep this for now, it's helpful!)
    console.log("EditMember Render - Debug:", { idFromParams: id, membersArray: members, isLoading: loading });

    // --- useEffect to populate formData ---
    // This effect is now at the top level and will always be called.
    // Its logic will only execute when 'members' is ready and 'foundMember' is valid.
    useEffect(() => {
        // Only attempt to find a member and set form data if 'members' has data and 'id' is present
        if (!loading && members && members.length > 0 && id) {
            const currentFoundMember = members.find(mem => mem.id === id);
            if (currentFoundMember && formData.id !== currentFoundMember.id) {
                setFormData({
                    id: currentFoundMember.id,
                    member: currentFoundMember.member,
                    role: currentFoundMember.role
                });
            }
        }
    }, [id, members, loading, formData.id]); // Dependencies: Crucial for re-running when data changes

    // --- Defensive Rendering Logic (After Hooks, Before JSX) ---
    // These return statements can come after all hooks are declared.

    // 1. Show loader if data is still loading or if members array is empty (initial state)
    if (loading || (members && members.length === 0)) {
        return <Loader />;
    }

    // 2. Find the member *after* data is loaded.
    // This calculation is safe now because we've returned a loader if 'members' isn't ready.
    const foundMember = members.find(mem => mem.id === id);

    // 3. If no member was found after loading is complete, display a "Not Found" message.
    if (!foundMember) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Member Not Found</h2>
                <p>The member with ID "{id}" could not be found or does not exist.</p>
                <button onClick={() => navigate('/members')}>Back to Members List</button>
            </div>
        );
    }

    // --- Event Handlers (These can be declared anywhere in the component body) ---
    const onFormChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    function onSubmit(e) {
        e.preventDefault();
        const updatedMember = {
            ...formData,
            member: formData.member.toLowerCase(),
            role: formData.role || "user"
        };
        handleEdit(updatedMember);
        onCancel();
    }

    function onClear() {
        setFormData({
            id: "",
            member: "",
            role: ""
        });
    }

    function onCancel() {
        onClear()
        navigate('/home');
    }

    // --- Render the Form (Only if foundMember is defined and formData is ready) ---
    return (
        <>
            <form onSubmit={onSubmit}>
                <label htmlFor="member"> Member: </label>
                <input
                    type="text"
                    id="member"
                    name="member"
                    onChange={onFormChange}
                    value={formData.member}
                    placeholder="Member..."
                />
                <label htmlFor="role"> Role: </label>
                <select id="role" name="role" onChange={onFormChange} value={formData.role}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <label htmlFor="password">🔒 </label>
                <input disabled type="password" value={""} />
                <button type='submit'> Update </button>
                <button type='button' onClick={onCancel}> Cancel </button>
            </form>
        </>
    );
}

export default EditMember;