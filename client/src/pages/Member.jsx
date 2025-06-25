// src/components/Member.jsx (assuming this is the component showing individual member details)

import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MemberContext from "../contexts/MemberContext"; // Make sure to import MemberContext
import Loader from "../components/Loader"; // Make sure you import your Loader component

function Member() {
    const { id } = useParams(); // Get the ID from the URL
    // Get members AND the loading state from MemberContext
    const { members, loading } = useContext(MemberContext);
    const navigate = useNavigate();

    // Find the specific member
    const foundMember = members.find(mem => mem.id === id);

    // --- Defensive Rendering Check ---
    // 1. If still loading initial data from the provider, show loader.
    //    Use members.length === 0 to ensure no data has arrived yet.
    if (loading && members.length === 0) {
        return <Loader />;
    }

    // 2. If not loading, but no member was found (e.g., bad ID, or not yet loaded properly)
    if (!foundMember) {
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Member Not Found</h2>
                <p>The member with ID "{id}" could not be loaded or does not exist.</p>
                <button onClick={() => navigate('/members')}>Go to Members List</button>
            </div>
        );
    }

    // If we reach here, data is loaded and foundMember exists, so it's safe to use.

    return (
        <div className="member-detail-page">
            <h2>Member Details: {foundMember.member.toUpperCase()}</h2>
            <p><strong>Member ID:</strong> {foundMember.id}</p>
            <p><strong>Username:</strong> {foundMember.member}</p>
            <p><strong>Role:</strong> {foundMember.role}</p>
         

            <button onClick={() => navigate(`/members/edit/${foundMember.id}`)}>Edit</button>
            <button onClick={() => navigate('/memberlist')}>Back to List</button>
        </div>
    );
}

export default Member;