// src/components/ReservationList.jsx (or wherever your Reservations list component is)

import { useContext, useEffect, useState } from "react";
import ReservationContext from "../contexts/ReservationContext";
import CurrentUserContext from "../contexts/CurrentUserContext";// <-- Import this
import Loader from "../components/Loader"; // Assuming you have a Loader
import { useNavigate } from "react-router-dom"; // For potential navigation after actions

function ReservationsList() {
    const { reservations, loading, handleDelete } = useContext(ReservationContext);
    const { currentUser } = useContext(CurrentUserContext); // <-- Get currentUser here

    const navigate = useNavigate();

    // --- Defensive Loading Check ---
    if (loading) {
        return <Loader />;
    }

    // --- Determine Filtering Logic ---
    const isAdmin = currentUser && currentUser.role === 'admin';
    const currentMemberId = currentUser ? currentUser.id : null; // Get current user's ID

    // Filter reservations based on role
    const filteredReservations = isAdmin
        ? reservations // If admin, show all reservations
        : reservations.filter(res => res.member_id === currentMemberId); // If user, filter by their member_id

    // Check if there are no reservations after filtering
    if (filteredReservations.length === 0) {
        return (
            <div className="reservations-container">
                <h2>{isAdmin ? "All Reservations" : "My Reservations"}</h2>
                <p>{isAdmin ? "No reservations found in the system." : "You have no active reservations."}</p>
                {!isAdmin && (
                    <button onClick={() => navigate('/new/reservation')}>Make a New Reservation</button>
                )}
            </div>
        );
    }

    return (
        <div className="reservations-container">
            <h2>{isAdmin ? "All Reservations" : "My Reservations"}</h2>

            <table>
                <thead>
                    <tr>
                        <th>View</th>
                        <th>Member</th>
                        <th>Room</th>
                        <th>Arrival</th>
                        <th>Guests</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredReservations.map(reservation => (
                        <tr key={reservation.id}>
                            <td> <button onClick={() => navigate(`/reservation/${reservation.id}`)}>View</button></td>
                            <td>{reservation.member}</td>
                            <td>{reservation.room}</td>
                            <td>{new Date(reservation.arrival).toLocaleString()}</td>
                            <td>{reservation.guests}</td>
                            <td>{reservation.notes}</td>
                            <td>
                                <button onClick={() => navigate(`/edit/reservation/${reservation.id}`)}>Edit</button>
                                <button onClick={() => handleDelete(reservation.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ReservationsList;