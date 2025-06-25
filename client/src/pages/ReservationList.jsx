import { useContext, useEffect } from "react";
import ReservationContext from "../contexts/ReservationContext";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ReservationCard from "../components/ReservationsCard";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

function ReservationsList() {
  const { reservations, loading, handleDelete } = useContext(ReservationContext);
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();

  // --- Defensive Loading Check ---
  if (loading) {
    return <Loader />;
  }

  // --- Determine Filtering Logic ---
  const isAdmin = currentUser && currentUser.role === "admin";
  const currentMemberId = currentUser ? currentUser.id : null;

  // Filter reservations based on role
  const filteredReservations = isAdmin
    ? reservations
    : reservations.filter((res) => res.member_id === currentMemberId);

  // --- Separate Reservations into Today, Upcoming, and Past ---
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Normalize to start of day

  const todayReservations = filteredReservations.filter((res) => {
    const arrivalDate = new Date(res.arrival);
    arrivalDate.setHours(0, 0, 0, 0);
    return arrivalDate.getTime() === today.getTime();
  });

  const upcomingReservations = filteredReservations
    .filter((res) => {
      const arrivalDate = new Date(res.arrival);
      arrivalDate.setHours(0, 0, 0, 0);
      return arrivalDate.getTime() > today.getTime();
    })
    .sort((a, b) => new Date(a.arrival).getTime() - new Date(b.arrival).getTime()); // Sort from most recent to farthest

  const pastReservations = filteredReservations
    .filter((res) => {
      const arrivalDate = new Date(res.arrival);
      arrivalDate.setHours(0, 0, 0, 0);
      return arrivalDate.getTime() < today.getTime();
    })
    .sort((a, b) => new Date(b.arrival).getTime() - new Date(a.arrival).getTime()); // Sort from most recent to oldest

  // Check if there are no reservations after filtering
  if (filteredReservations.length === 0) {
    return (
      <div className="reservations-container">
        <h2>{isAdmin ? "All Reservations" : "My Reservations"}</h2>
        <p>
          {isAdmin
            ? "No reservations found in the system."
            : "You have no active reservations."}
        </p>
        {!isAdmin && (
          <button
            className="btn btn-primary"
            onClick={() => navigate("/new/reservation")}
          >
            Make a New Reservation
          </button>
        )}
      </div>
    );
  }

  // Common table rendering function
  const renderTable = (reservations, title) => {
    if (reservations.length === 0) return null;
    return (
      <div className="reservation-section">
        <h3>{title}</h3>
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Room</th>
              <th>Arrival</th>
              <th>Guests</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
        {reservations.map((reservation) => (
  <ReservationCard
    key={reservation.id}
    reservation={reservation}
    onListClick={(id, action) => {
      if (action === "view") navigate(`/reservation/${id}`);
      if (action === "edit") navigate(`/edit/reservation/${id}`);
      if (action === "delete") handleDelete(id);
    }}
  />
))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="reservations-container">
      <h2>{isAdmin ? "All Reservations" : "My Reservations"}</h2>
      {renderTable(todayReservations, "Today")}
      {renderTable(upcomingReservations, "Upcoming")}
      {renderTable(pastReservations, "Past")}
      {!isAdmin && (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/new/reservation")}
        >
          Make a New Reservation
        </button>
      )}
    </div>
  );
}

export default ReservationsList;