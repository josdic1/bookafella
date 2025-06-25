// src/components/Reservation.jsx (assuming this is the component showing individual reservation details)

import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReservationContext from "../contexts/ReservationContext";
import Loader from "../components/Loader"; // Make sure you import your Loader component

function Reservation() {
    const { id } = useParams(); // Get the ID from the URL
    const { reservations, loading } = useContext(ReservationContext); // Get reservations AND loading state
    const navigate = useNavigate();

    // Find the specific reservation
    const foundReservation = reservations.find(res => res.id === id);

    // --- Defensive Rendering Check ---
    // 1. If still loading initial data from the provider, show loader.
    if (loading && reservations.length === 0) {
        return <Loader />;
    }

    // 2. If not loading, but no reservation was found (e.g., bad ID, or not yet loaded properly)
    //    You could show a "Not Found" message or redirect.
    if (!foundReservation) {
        // Optionally, you could navigate to a 404 page or the dashboard
        // navigate('/reservations'); // or navigate('/404');
        return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h2>Reservation Not Found</h2>
                <p>The reservation with ID "{id}" could not be loaded or does not exist.</p>
                <button onClick={() => navigate('/reservations')}>Go to Reservations List</button>
            </div>
        );
    }

    // If we reach here, data is loaded and foundReservation exists, so it's safe to use.

    // --- Rest of your existing logic for displaying the reservation ---
    let displayDate = null;
    if (foundReservation.arrival) { // Use foundReservation here
        displayDate = new Date(foundReservation.arrival);
    }

    let formattedDisplayTime = '';
    if (displayDate && !isNaN(displayDate)) {
        formattedDisplayTime = new Intl.DateTimeFormat('en-US', {
            month: 'numeric', day: 'numeric', year: '2-digit',
            hour: 'numeric', minute: '2-digit', hour12: true
        }).format(displayDate).replace(', ', ' ');
    }

    // Convert guest_array back to a displayable string or array of strings
    const guestListDisplay = Array.isArray(foundReservation.guest_array)
                             ? foundReservation.guest_array.join(', ')
                             : foundReservation.guest_array; // For display, comma separation is fine

    return (
        <div className="reservation-detail-page">
            <h2>Reservation Details for {foundReservation.member}</h2>
            <p><strong>Reservation ID:</strong> {foundReservation.id}</p>
            <p><strong>Member:</strong> {foundReservation.member}</p>
            <p><strong>Room:</strong> {foundReservation.room.toUpperCase()}</p>
            <p><strong>Arrival:</strong> {formattedDisplayTime}</p>
            <p><strong>Party:</strong> {foundReservation.guests + 1}</p>
            {foundReservation.guest_array && foundReservation.guest_array.length > 0 && (
                <p><strong>Guest List:</strong> {guestListDisplay}</p>
            )}
            {foundReservation.notes && (
                <p><strong>Notes:</strong> {foundReservation.notes}</p>
            )}
            <button onClick={() => navigate(`/edit/reservation/${foundReservation.id}`)}>Edit</button>
            <button onClick={() => navigate('/reservationlist')}>Back to List</button>
        </div>
    );
}

export default Reservation;