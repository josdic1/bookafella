import { FaRegStickyNote, FaUsers } from 'react-icons/fa';

function ReservationCard({ reservation, onListClick }) {
  let displayDate = reservation.arrival ? new Date(reservation.arrival) : null;

  let formattedDisplayTime = '';
  if (displayDate && !isNaN(displayDate)) {
    formattedDisplayTime = new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(displayDate).replace(', ', ' ');
  }

  const handleClick = (e) => {
    const { id, name } = e.target;
    onListClick(id, name);
  };

  return (
    <tr id={reservation.id}>
      <td>{reservation.member.charAt(0).toUpperCase() + reservation.member?.slice(1)}</td>
      <td>{reservation.room.toUpperCase()}</td>
      <td>{formattedDisplayTime}</td>
      <td>{reservation.guests + 1}</td>
      <td>
        {reservation.notes && (
          <FaRegStickyNote title="Has Notes" style={{ color: '#007bff', marginRight: '5px' }} />
        )}
        {reservation.guest_array?.length > 0 && (
          <FaUsers title="Has Additional Guests" style={{ color: '#28a745' }} />
        )}
      </td>
      <td>
        <button id={reservation.id} type="button" name="view" className="btn btn-secondary" onClick={handleClick}>
          View
        </button>
      </td>
      <td>
        <button id={reservation.id} type="button" name="edit" className="btn btn-dark" onClick={handleClick}>
          Edit
        </button>
      </td>
      <td>
        <button id={reservation.id} type="button" name="delete" className="btn btn-danger" onClick={handleClick}>
          Del
        </button>
      </td>
    </tr>
  );
}

export default ReservationCard;
