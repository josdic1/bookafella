// src/components/Dashboard.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ReservationContext from "../contexts/ReservationContext";
import MemberContext from "../contexts/MemberContext";
import Loader from "../components/Loader";

function Dashboard() {
    const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
    const { reservations, loading: reservationsLoading } = useContext(ReservationContext);
    const { members, loading: membersLoading } = useContext(MemberContext);
    const navigate = useNavigate();

    // Combine loading states: Dashboard is loading if either context is loading its data
    const isLoadingData = reservationsLoading || membersLoading;

    // --- Authentication Check ---
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    // Render nothing or a "Redirecting..." message while authentication is being checked
    if (!isLoggedIn) {
        return null;
    }

    // --- Role Determination ---
    const isAdmin = currentUser.role === 'admin';
    const currentMemberId = currentUser.id;

    // --- Initial Loading State for Dashboard Content ---
    if (isLoadingData) {
        // Using the new loader classes defined in the stylesheet
        return (
             <div className="loader">
                <p>Loading dashboard data...</p>
                <div className="loader-spinner"></div>
            </div>
        );
    }

    // --- Render based on User Role ---
    return (
        <div className="dashboard-container"> {/* Main container for the dashboard content */}
            <h1 className="text-primary-heading">Welcome back, {currentUser.member}</h1> {/* Main welcome heading */}

            {isAdmin ? (
                // ==== ADMIN DASHBOARD VIEW ====
                <div className="admin-dashboard-content">
                    {/* Admin Summary Card */}
                    <div className="card">
                        <h2>Admin Control Panel Overview</h2>
                        <p>You have full administrative privileges to manage bookings and members.</p>
                        <div className="summary-section">
                            <h3>Summary:</h3>
                            <p>Total Reservations: <strong>{reservations.length}</strong></p>
                            <p>Total Members: <strong>{members.length}</strong></p>
                        </div>
                    </div>

                    {/* Admin Quick Actions Card */}
                    <div className="card">
                        <h3>Quick Actions:</h3>
                        <ul className="action-list"> {/* Use a ul for lists of buttons */}
                            <li><button className="btn btn-primary" onClick={() => navigate('/reservationlist')}>View All Reservations</button></li>
                            <li><button className="btn btn-secondary" onClick={() => navigate('/members')}>Manage All Members</button></li>
                            <li><button className="btn btn-primary" onClick={() => navigate('/new/reservation')}>Create New Reservation</button></li>
                            {/* Add more admin-specific links/buttons here */}
                        </ul>
                    </div>
                </div>
            ) : (
                // ==== REGULAR USER DASHBOARD VIEW ====
                <div className="user-dashboard-content">
                    {/* User Overview Card */}
                    <div className="card">
                        <h2>Your Personal Overview</h2>
                        <p>Access your profile and manage your personal reservations quickly.</p>
                    </div>

                    {/* User Information Card */}
                    <div className="card">
                        <h3>Your Information:</h3>
                        <ul className="action-list">
                            <li>
                                <button className="btn btn-secondary" onClick={() => navigate(`/edit/member/${currentMemberId}`)}>Edit My Profile</button>
                                {/* Role display - use a span for styling, not a p inside li */}
                                <span className="text-secondary" style={{ marginLeft: '1rem' }}>Role: {currentUser.role}</span>
                            </li>
                        </ul>
                    </div>

                    {/* User Reservations Actions Card */}
                    <div className="card">
                        <h3>Your Reservations:</h3>
                        <ul className="action-list">
                            <li><button className="btn btn-primary" onClick={() => navigate('/reservationlist')}>View My Reservations</button></li>
                            <li><button className="btn btn-primary" onClick={() => navigate('/new/reservation')}>Make a New Reservation</button></li>
                        </ul>
                        {/* Display a quick count of *their* reservations */}
                        <p className="reservation-count-summary">You have <strong>{reservations.filter(res => res.member_id === currentMemberId).length}</strong> active reservations.</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;